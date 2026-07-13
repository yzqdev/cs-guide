# Spring Boot + PostgreSQL 集成

> Spring Boot 项目使用 JPA 和 MyBatis-Plus 操作 PostgreSQL 的最佳实践。

## 引入依赖

### Maven

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- 如果使用 MyBatis-Plus -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
    <version>3.5.7</version>
</dependency>
```

### Gradle

```kotlin
implementation("org.springframework.boot:spring-boot-starter-data-jpa")
runtimeOnly("org.postgresql:postgresql")
```

## 配置文件

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/testdb
    username: postgres
    password: 123456
    driver-class-name: org.postgresql.Driver
    hikari:
      maximum-pool-size: 10
      minimum-idle: 2

  jpa:
    hibernate:
      ddl-auto: update          # 开发用 update，生产 validate
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
        jdbc:
          time_zone: Asia/Shanghai
```

## JPA 实体映射

### 基本实体

```java
@Entity
@Table(name = "users")
@Data
public class User {

    // 方式一：使用 SEQUENCE（推荐 PostgreSQL）
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_id_seq", allocationSize = 1)
    private Long id;

    // 方式二：使用 IDENTITY（需要表定义 SERIAL 或 IDENTITY）
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long id;

    // 方式三：使用 UUID
    // @Id
    // @GeneratedValue(strategy = GenerationType.UUID)
    // private UUID id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    private Integer age;

    // JSONB 字段映射
    @Column(columnDefinition = "jsonb")
    private String attributes;

    // 时间戳
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

### 枚举映射

```java
public enum UserStatus {
    ACTIVE, INACTIVE, BANNED
}

@Entity
public class User {
    @Enumerated(EnumType.STRING)  // 存储为字符串
    private UserStatus status;
}
```

### 关联映射

```java
@Entity
public class User {
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts = new ArrayList<>();
}

@Entity
public class Post {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
```

## 时区处理

```java
// PostgreSQL 的 TIMESTAMP → Java LocalDateTime（不使用时区）
// PostgreSQL 的 TIMESTAMPTZ → Java Instant（使用时区）

@Entity
public class Event {
    // 不关心时区
    private LocalDateTime localTime;

    // 需要时区自动转换（存 UTC，查时按客户端时区显示）
    @Column(columnDefinition = "timestamptz")
    private Instant utcTime;
}
```

```yaml
# 配置 JPA 时区
spring:
  jpa:
    properties:
      hibernate:
        jdbc:
          time_zone: Asia/Shanghai
```

## Repository

```java
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByAgeGreaterThanEqual(int age);

    // 自定义 JPQL
    @Query("SELECT u FROM User u WHERE u.age BETWEEN :min AND :max")
    List<User> findByAgeRange(@Param("min") int min, @Param("max") int max);

    // 原生 SQL（PostgreSQL 特有语法）
    @Query(value = "SELECT * FROM users WHERE email ILIKE %:keyword%", nativeQuery = true)
    List<User> searchByEmail(@Param("keyword") String keyword);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.email = :email WHERE u.id = :id")
    int updateEmail(@Param("id") Long id, @Param("email") String email);
}
```

## @Query JSONB 查询

```java
@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_seq")
    private Long id;

    private String name;

    @Column(columnDefinition = "jsonb")
    private String attributes;
}

public interface ProductRepository extends JpaRepository<Product, Long> {

    // 原生 SQL 查询 JSONB
    @Query(value = "SELECT * FROM products WHERE attributes @> :json::jsonb", nativeQuery = true)
    List<Product> findByAttributes(@Param("json") String json);
}

// 调用
List<Product> products = productRepository.findByAttributes("{\"brand\": \"华为\"}");
```

## MyBatis-Plus 集成

### 主键策略

```java
@Data
@KeySequence(value = "user_seq", dbType = DbType.POSTGRE_SQL)
public class User {
    @TableId(type = IdType.INPUT)
    private Long id;
}

@Configuration
public class MybatisPlusConfig {
    @Bean
    public IKeyGenerator keyGenerator() {
        return new PostgreKeyGenerator();
    }

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.POSTGRE_SQL));
        return interceptor;
    }
}
```

### 完整实体

```java
@Data
@EqualsAndHashCode(callSuper = false)
@KeySequence(value = "company_seq", dbType = DbType.POSTGRE_SQL)
public class Company {
    @TableId(type = IdType.INPUT)
    private Long id;

    private String name;
    private Integer age;
    private String address;
}
```

## 常用数据库配置对照

```properties
# PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/testdb
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# MySQL
# spring.datasource.url=jdbc:mysql://localhost:3306/testdb
# spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# MariaDB
# spring.datasource.driver-class-name=org.mariadb.jdbc.Driver
# spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MariaDBDialect
```

## 练习

```java
// 1. 创建 Spring Boot 项目，连接 PostgreSQL
// 2. 创建 User 实体（使用 SEQUENCE 生成 ID）
// 3. 创建 UserRepository，实现按邮箱查询
// 4. 使用 @Query 查询 JSONB 字段
// 5. 配置 MyBatis-Plus 并实现分页查询
```
