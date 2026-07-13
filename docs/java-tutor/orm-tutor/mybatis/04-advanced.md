# MyBatis 高级特性

> 缓存、分页、注解开发、PageHelper、Spring Boot 集成最佳实践。

## 缓存

MyBatis 有两级缓存：一级缓存（SqlSession 级别）和二级缓存（Mapper 级别）。

### 一级缓存（默认开启）

```java
// 一级缓存：同一个 SqlSession 中多次查询相同 SQL 时会命中缓存
try (SqlSession session = sqlSessionFactory.openSession()) {
    UserMapper mapper = session.getMapper(UserMapper.class);

    User user1 = mapper.findById(1L);  // 发送 SQL
    User user2 = mapper.findById(1L);  // 命中一级缓存，不发 SQL

    System.out.println(user1 == user2);  // true（同一对象）
}
```

### 二级缓存（跨 SqlSession）

```xml
<!-- 1. 在 Mapper XML 中启用 -->
<mapper namespace="com.example.mapper.UserMapper">
    <cache
        eviction="LRU"          <!-- 淘汰策略：LRU/FIFO/SOFT/WEAK -->
        flushInterval="60000"   <!-- 刷新间隔（毫秒） -->
        size="512"              <!-- 缓存引用数 -->
        readOnly="true"/>       <!-- 是否只读 -->
</mapper>

<!-- 2. 实体类必须实现 Serializable -->
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    // ...
}
```

### 缓存注意事项

```xml
<!-- 执行 INSERT/UPDATE/DELETE 后会刷新缓存 -->
<insert id="insert" flushCache="true">...</insert>

<!-- 查询可以设置不使用缓存 -->
<select id="findById" useCache="false">...</select>
```

## 分页查询

### 使用 PageHelper（推荐）

```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>2.1.0</version>
</dependency>
```

```java
// 在查询前设置分页参数
PageHelper.startPage(pageNum, pageSize);
List<User> users = userMapper.findAll();  // 自动分页

// 获取分页信息
PageInfo<User> pageInfo = new PageInfo<>(users);
pageInfo.getPageNum();       // 当前页码
pageInfo.getPageSize();      // 每页条数
pageInfo.getTotal();         // 总记录数
pageInfo.getPages();         // 总页数
pageInfo.isIsFirstPage();    // 是否第一页
pageInfo.isIsLastPage();     // 是否最后一页
pageInfo.getList();          // 当前页数据
```

### 使用 RowBounds（内置，不推荐大数据量）

```java
// MyBatis 内置的物理分页（实际是内存分页，不适合大表）
RowBounds rowBounds = new RowBounds(offset, limit);
List<User> users = sqlSession.selectList("findAll", null, rowBounds);
```

### 手动 LIMIT 分页

```xml
<select id="findByPage" resultType="User">
    SELECT * FROM users ORDER BY id DESC
    LIMIT #{offset}, #{limit}
</select>
```

```java
public PageResult<User> findByPage(int pageNum, int pageSize) {
    int offset = (pageNum - 1) * pageSize;
    List<User> list = userMapper.findByPage(offset, pageSize);
    int total = userMapper.countAll();
    return new PageResult<>(list, total, pageNum, pageSize);
}
```

## 注解开发

除了 XML 方式，MyBatis 也支持注解编写 SQL：

```java
public interface UserMapper {

    @Select("SELECT * FROM users WHERE id = #{id}")
    User findById(Long id);

    @Select("SELECT * FROM users WHERE username LIKE CONCAT('%', #{keyword}, '%')")
    List<User> search(@Param("keyword") String keyword);

    @Insert("INSERT INTO users (username, email, age) VALUES (#{username}, #{email}, #{age})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(User user);

    @Update("UPDATE users SET email = #{email} WHERE id = #{id}")
    int updateEmail(@Param("id") Long id, @Param("email") String email);

    @Delete("DELETE FROM users WHERE id = #{id}")
    int deleteById(Long id);

    // 动态 SQL 用注解比较麻烦，推荐复杂 SQL 用 XML
    @SelectProvider(type = UserSqlProvider.class, method = "findByConditions")
    List<User> findByConditions(Map<String, Object> conditions);
}
```

:::tip
**简单 SQL 用注解，复杂 SQL（动态 SQL、关联映射）用 XML。** 两者可以在同一个 Mapper 中混合使用。
:::

## 结果映射注解

```java
public interface UserMapper {

    @Results(id = "userMap", value = {
        @Result(property = "id", column = "id"),
        @Result(property = "username", column = "user_name"),
        @Result(property = "createdAt", column = "created_at"),
        @Result(property = "profile", column = "id",
                one = @One(select = "com.example.mapper.ProfileMapper.findByUserId"))
    })
    @Select("SELECT * FROM users WHERE id = #{id}")
    User findByIdWithProfile(Long id);

    // 复用 @Results
    @ResultMap("userMap")
    @Select("SELECT * FROM users")
    List<User> findAll();
}
```

## MyBatis Spring Boot 集成最佳实践

### 完整配置

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/testdb?useSSL=false&serverTimezone=Asia/Shanghai&allowMultiQueries=true
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
    # 使用 HikariCP 连接池（Spring Boot 默认）
    hikari:
      maximum-pool-size: 10
      minimum-idle: 2
      connection-timeout: 30000

mybatis:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.example.entity
  configuration:
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    # 开启二级缓存
    cache-enabled: true
    # 懒加载
    lazy-loading-enabled: true
    aggressive-lazy-loading: false
```

### 将 XML 放在 src/main/java 中

如果不希望将 XML 放在 resources 目录，可以放在 java 目录下：

```xml
<!-- pom.xml -->
<build>
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.xml</include>
            </includes>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
        </resource>
    </resources>
</build>
```

```yaml
# 同时配置扫描
mybatis:
  mapper-locations: classpath*:com/example/mapper/*.xml
```

### 完整项目结构

```
src/main/java/com/example/
├── entity/          — 实体类
│   ├── User.java
│   └── Order.java
├── mapper/          — Mapper 接口 + XML
│   ├── UserMapper.java
│   ├── UserMapper.xml      ← 可以放这里
│   └── OrderMapper.java
├── service/         — 业务层
│   └── UserService.java
├── controller/      — 控制层
│   └── UserController.java
└── Application.java — 启动类

src/main/resources/
├── mapper/          — Mapper XML（推荐）
│   ├── UserMapper.xml
│   └── OrderMapper.xml
└── application.yml
```

## 练习

```java
// 1. 在 Spring Boot 中配置 MyBatis + PageHelper
// 2. 实现带分页的用户列表查询
// 3. 使用注解编写一个简单的 Mapper
// 4. 配置二级缓存并验证效果
```
