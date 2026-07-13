# MyBatis 快速入门

> MyBatis 是一个轻量级的持久层框架，通过 XML 或注解将 SQL 与 Java 方法绑定。

## 引入依赖

### Spring Boot + MyBatis（推荐）

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>3.0.3</version>
</dependency>
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

### 纯 MyBatis（非 Spring Boot）

```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.16</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
```

## 配置文件

### application.yml

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/testdb?useSSL=false&serverTimezone=Asia/Shanghai
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver

mybatis:
  mapper-locations: classpath:mapper/*.xml    # Mapper XML 位置
  type-aliases-package: com.example.entity    # 实体类包名（自动别名）
  configuration:
    map-underscore-to-camel-case: true        # 下划线转驼峰
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl  # 打印 SQL
```

### mybatis-config.xml（纯 MyBatis 方式）

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
        <setting name="logImpl" value="STDOUT_LOGGING"/>
    </settings>

    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/testdb"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <mapper resource="mapper/UserMapper.xml"/>
    </mappers>
</configuration>
```

## 第一个实体类

```java
package com.example.entity;

public class User {
    private Long id;
    private String username;
    private String email;
    private Integer age;
    private LocalDateTime createdAt;

    // getter / setter（必须！MyBatis 需要空构造方法 + getter/setter）
}
```

## 第一个 Mapper 接口

```java
package com.example.mapper;

import com.example.entity.User;
import java.util.List;

@Mapper  // Spring Boot 方式
public interface UserMapper {

    User findById(Long id);

    List<User> findAll();

    int insert(User user);

    int update(User user);

    int deleteById(Long id);
}
```

## 第一个 Mapper XML

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.mapper.UserMapper">

    <!-- 基本查询 -->
    <select id="findById" resultType="User">
        SELECT * FROM users WHERE id = #{id}
    </select>

    <!-- 查询所有 -->
    <select id="findAll" resultType="User">
        SELECT * FROM users
    </select>

    <!-- 插入（返回自增主键） -->
    <insert id="insert" useGeneratedKeys="true" keyProperty="id">
        INSERT INTO users (username, email, age, created_at)
        VALUES (#{username}, #{email}, #{age}, #{createdAt})
    </insert>

    <!-- 更新 -->
    <update id="update">
        UPDATE users
        SET username = #{username},
            email = #{email},
            age = #{age}
        WHERE id = #{id}
    </update>

    <!-- 删除 -->
    <delete id="deleteById">
        DELETE FROM users WHERE id = #{id}
    </delete>

</mapper>
```

## 使用 Service 层

```java
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public User findById(Long id) {
        return userMapper.findById(id);
    }

    public List<User> findAll() {
        return userMapper.findAll();
    }

    @Transactional
    public void createUser(User user) {
        userMapper.insert(user);
    }

    @Transactional
    public void updateUser(User user) {
        userMapper.update(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        userMapper.deleteById(id);
    }
}
```

## 启动类配置

```java
@SpringBootApplication
@MapperScan("com.example.mapper")  // 扫描 Mapper 接口
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

## MyBatis 工作原理

```
应用程序
  ↓ 调用
Mapper 接口
  ↓ 动态代理
SqlSession（通过 namespace.method 定位 SQL）
  ↓
Mapper XML（SQL 语句 + 映射规则）
  ↓
JDBC → 数据库
  ↓
ResultSet → 映射为 Java 对象 ← 返回给应用
```

## 参数传递

```java
// 单个参数 — 直接用 #{任意名}
User findById(Long id);
// SQL: WHERE id = #{id}

// 多个参数 — 使用 @Param
List<User> search(@Param("username") String name, @Param("age") Integer age);
// SQL: WHERE username LIKE #{username} AND age = #{age}

// 对象参数 — 直接用属性名
int insert(User user);
// SQL: VALUES (#{username}, #{email}, #{age})

// Map 参数
List<User> findByMap(Map<String, Object> params);
// SQL: WHERE username = #{username} AND age = #{age}
```

## 练习

```java
// 1. 创建 Product 实体和 ProductMapper
// 2. 实现按名称模糊查询、按价格区间查询
// 3. 使用 @Param 传递多个参数
// 4. 使用 useGeneratedKeys 获取自增主键
```
