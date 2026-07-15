---
title: "JDBC 数据库编程"
order: 20
---

# JDBC 数据库编程

> JDBC（Java Database Connectivity）是 Java 操作数据库的标准 API，支持连接任何提供 JDBC 驱动的数据库。

## JDBC 基本流程

```
1. 加载驱动 → 2. 建立连接 → 3. 创建 Statement → 4. 执行SQL → 5. 处理结果 → 6. 关闭资源
```

### 完整示例

```java
import java.sql.*;

public class JdbcDemo {
    public static void main(String[] args) {
        // 数据库连接信息
        String url = "jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC&characterEncoding=UTF-8";
        String username = "root";
        String password = "123456";

        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            // 1. 加载驱动（JDBC 4.0 以上可省略）
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 2. 建立连接
            conn = DriverManager.getConnection(url, username, password);
            System.out.println("数据库连接成功");

            // 3. 创建 Statement
            stmt = conn.createStatement();

            // 4. 执行 SQL（查询）
            String sql = "SELECT id, name, age FROM user";
            rs = stmt.executeQuery(sql);

            // 5. 处理结果集
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                int age = rs.getInt("age");
                System.out.printf("id=%d, name=%s, age=%d%n", id, name, age);
            }
        } catch (ClassNotFoundException e) {
            System.out.println("找不到驱动类");
        } catch (SQLException e) {
            System.out.println("数据库操作失败: " + e.getMessage());
        } finally {
            // 6. 关闭资源（从内到外依次关闭）
            try { if (rs != null) rs.close(); } catch (SQLException e) { }
            try { if (stmt != null) stmt.close(); } catch (SQLException e) { }
            try { if (conn != null) conn.close(); } catch (SQLException e) { }
        }
    }
}
```

### Maven 依赖

```xml
<!-- MySQL 驱动 -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>8.2.0</version>
</dependency>

<!-- PostgreSQL 驱动 -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.7.1</version>
</dependency>

<!-- H2 内存数据库（测试用） -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <version>2.2.224</version>
    <scope>test</scope>
</dependency>
```

## Statement vs PreparedStatement

### Statement — 直接拼接 SQL

```java
// ❌ SQL 注入风险
String name = "张三";
String sql = "SELECT * FROM user WHERE name = '" + name + "'";
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery(sql);
```

### PreparedStatement — 预编译 SQL（推荐）

```java
// ✅ 防止 SQL 注入，性能更好
String sql = "SELECT * FROM user WHERE name = ? AND age > ?";
PreparedStatement pstmt = conn.prepareStatement(sql);

// 设置参数（索引从 1 开始）
pstmt.setString(1, "张三");    // 第一个 ?
pstmt.setInt(2, 18);           // 第二个 ?

ResultSet rs = pstmt.executeQuery();  // 查询
// int rows = pstmt.executeUpdate();  // 增删改
```

## 增删改查（CRUD）

### 建表

```java
String createTable = """
    CREATE TABLE IF NOT EXISTS user (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        age INT NOT NULL,
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""";
stmt.execute(createTable);
```

### 插入（INSERT）

```java
String sql = "INSERT INTO user (name, age, email) VALUES (?, ?, ?)";
try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setString(1, "张三");
    pstmt.setInt(2, 25);
    pstmt.setString(3, "zhangsan@example.com");
    int rows = pstmt.executeUpdate();  // 返回受影响的行数
    System.out.println("插入了 " + rows + " 行");
}
```

### 查询（SELECT）

```java
String sql = "SELECT * FROM user WHERE age > ? ORDER BY age DESC";
try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setInt(1, 20);
    ResultSet rs = pstmt.executeQuery();

    while (rs.next()) {
        int id = rs.getInt("id");
        String name = rs.getString("name");
        int age = rs.getInt("age");
        String email = rs.getString("email");
        // 处理结果
    }
}
```

### 更新（UPDATE）

```java
String sql = "UPDATE user SET email = ? WHERE id = ?";
try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setString(1, "newemail@example.com");
    pstmt.setInt(2, 1);
    int rows = pstmt.executeUpdate();
    System.out.println("更新了 " + rows + " 行");
}
```

### 删除（DELETE）

```java
String sql = "DELETE FROM user WHERE id = ?";
try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setInt(1, 1);
    int rows = pstmt.executeUpdate();
    System.out.println("删除了 " + rows + " 行");
}
```

## 事务管理

```java
try {
    // 关闭自动提交
    conn.setAutoCommit(false);

    // 执行多个操作
    String sql1 = "UPDATE account SET balance = balance - 100 WHERE id = 1";
    String sql2 = "UPDATE account SET balance = balance + 100 WHERE id = 2";

    try (PreparedStatement pstmt1 = conn.prepareStatement(sql1);
         PreparedStatement pstmt2 = conn.prepareStatement(sql2)) {
        pstmt1.executeUpdate();
        pstmt2.executeUpdate();
    }

    // 提交事务
    conn.commit();
    System.out.println("转账成功");
} catch (SQLException e) {
    // 出现异常，回滚事务
    try {
        conn.rollback();
        System.out.println("转账失败，已回滚");
    } catch (SQLException ex) {
        ex.printStackTrace();
    }
    e.printStackTrace();
} finally {
    try {
        conn.setAutoCommit(true);  // 恢复自动提交
    } catch (SQLException e) {
        e.printStackTrace();
    }
}
```

## 批量处理

```java
String sql = "INSERT INTO user (name, age) VALUES (?, ?)";
try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    // 关闭自动提交
    conn.setAutoCommit(false);

    // 批量添加
    for (int i = 0; i < 1000; i++) {
        pstmt.setString(1, "用户" + i);
        pstmt.setInt(2, 20 + (i % 30));
        pstmt.addBatch();  // 添加到批处理

        // 每 500 条执行一次
        if (i % 500 == 0) {
            pstmt.executeBatch();
        }
    }
    // 执行剩余的
    pstmt.executeBatch();
    conn.commit();
}
```

## 连接池

每次创建数据库连接开销很大，连接池可以复用连接。

### HikariCP（推荐）

```xml
<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>5.1.0</version>
</dependency>
```

```java
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public class DataSourceConfig {
    private static HikariDataSource dataSource;

    static {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:mysql://localhost:3306/mydb");
        config.setUsername("root");
        config.setPassword("123456");
        config.setDriverClassName("com.mysql.cj.jdbc.Driver");

        config.setMaximumPoolSize(10);      // 最大连接数
        config.setMinimumIdle(2);            // 最小空闲连接
        config.setConnectionTimeout(30000);  // 连接超时（毫秒）
        config.setIdleTimeout(600000);       // 空闲超时
        config.setMaxLifetime(1800000);      // 最大存活时间

        dataSource = new HikariDataSource(config);
    }

    public static Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }
}

// 使用
try (Connection conn = DataSourceConfig.getConnection()) {
    // 直接使用连接，用完后自动归还到连接池
}
```

## 封装 DAO 层

```java
public class UserDao {
    private DataSource dataSource;

    public UserDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public User findById(int id) throws SQLException {
        String sql = "SELECT * FROM user WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                return mapRow(rs);
            }
            return null;
        }
    }

    public List<User> findAll() throws SQLException {
        String sql = "SELECT * FROM user";
        List<User> users = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                users.add(mapRow(rs));
            }
        }
        return users;
    }

    public void save(User user) throws SQLException {
        String sql = "INSERT INTO user (name, age, email) VALUES (?, ?, ?)";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, user.getName());
            pstmt.setInt(2, user.getAge());
            pstmt.setString(3, user.getEmail());
            pstmt.executeUpdate();
        }
    }

    public void update(User user) throws SQLException {
        String sql = "UPDATE user SET name = ?, age = ?, email = ? WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, user.getName());
            pstmt.setInt(2, user.getAge());
            pstmt.setString(3, user.getEmail());
            pstmt.setInt(4, user.getId());
            pstmt.executeUpdate();
        }
    }

    public void delete(int id) throws SQLException {
        String sql = "DELETE FROM user WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            pstmt.executeUpdate();
        }
    }

    private User mapRow(ResultSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setName(rs.getString("name"));
        user.setAge(rs.getInt("age"));
        user.setEmail(rs.getString("email"));
        return user;
    }
}
```

## 数据库常见数据类型与 Java 类型对应

| SQL 类型 | Java 类型 |
|----------|-----------|
| INT / INTEGER | `int` / `Integer` |
| BIGINT | `long` / `Long` |
| VARCHAR / CHAR | `String` |
| BOOLEAN / BIT | `boolean` / `Boolean` |
| DECIMAL / NUMERIC | `BigDecimal` |
| DATE | `java.sql.Date` / `LocalDate` |
| TIME | `java.sql.Time` / `LocalTime` |
| TIMESTAMP | `java.sql.Timestamp` / `LocalDateTime` |
| BLOB | `byte[]` / `Blob` |
| CLOB / TEXT | `String` / `Clob` |

## 练习

```java
// 1. 创建数据库和表
String createDB = "CREATE DATABASE IF NOT EXISTS learn_jdbc";
String createTable = """
    CREATE TABLE IF NOT EXISTS student (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        score DOUBLE DEFAULT 0,
        birthday DATE
    )
""";

// 2. 基本的 CRUD 练习
// 插入 5 条学生记录
// 查询所有成绩大于 80 的学生
// 将指定学生的成绩加 10 分
// 删除成绩低于 60 的学生

// 3. 实现分页查询
String pagination = "SELECT * FROM student LIMIT ? OFFSET ?";
// LIMIT = pageSize, OFFSET = (pageNum - 1) * pageSize
```
