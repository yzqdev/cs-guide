# Spring Boot JPA + PostgreSQL 集成指南

> 在 Spring Boot 项目中使用 Spring Data JPA 操作 PostgreSQL 数据库。

## 项目依赖

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

<!-- 可选：连接池（Spring Boot 默认使用 HikariCP）-->
```

### Gradle (Kotlin DSL)

```kotlin
implementation("org.springframework.boot:spring-boot-starter-data-jpa")
runtimeOnly("org.postgresql:postgresql")
```

## 配置文件

### application.yml

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: postgres
    password: 123456
    driver-class-name: org.postgresql.Driver
    hikari:
      maximum-pool-size: 10
      minimum-idle: 2
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000

  jpa:
    hibernate:
      ddl-auto: validate    # 生产环境用 validate，开发用 update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
        jdbc:
          time_zone: Asia/Shanghai
```

### application.properties

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=postgres
spring.datasource.password=123456
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.jdbc.time_zone=Asia/Shanghai
```

### ddl-auto 策略

| 值 | 说明 | 推荐场景 |
|-----|------|---------|
| `none` | 不自动处理 | 生产环境 |
| `validate` | 验证实体与表结构是否匹配 | 生产环境 |
| `update` | 自动更新表结构（不会删除列） | 开发环境 |
| `create` | 每次启动删除并重建表**（会丢数据）** | 测试环境 |
| `create-drop` | 启动时创建，停止时删除 | 单元测试 |

## 实体映射

### 基本实体

```java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    // 方式一：使用序列（推荐 PostgreSQL 方式）
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_id_seq", allocationSize = 1)
    private Long id;

    // 方式二：使用 IDENTITY（需要数据库表定义 SERIAL 或 IDENTITY）
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long id;

    // 方式三：使用 UUID
    // @Id
    // @GeneratedValue(strategy = GenerationType.UUID)
    // private UUID id;

    @Column(name = "username", nullable = false, length = 50)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(name = "display_name")
    private String displayName;

    private Integer age;

    // JSONB 字段（需要自定义转换）
    @Column(columnDefinition = "jsonb")
    private String attributes;

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
@Table(name = "users")
public class User {

    @Enumerated(EnumType.STRING)  // 存储为字符串
    @Column(name = "status")
    private UserStatus status;
}
```

### 关联映射

```java
@Entity
@Table(name = "posts")
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_seq")
    @SequenceGenerator(name = "post_seq", sequenceName = "post_id_seq", allocationSize = 1)
    private Long id;

    private String title;
    private String content;

    // 多对一
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;

    // 一对多
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}

@Entity
@Table(name = "comments")
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_seq")
    @SequenceGenerator(name = "comment_seq", sequenceName = "comment_id_seq", allocationSize = 1)
    private Long id;

    private String body;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;
}
```

## Repository 层

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 根据方法名自动生成查询
    Optional<User> findByEmail(String email);

    List<User> findByAgeGreaterThanEqual(int age);

    List<User> findByDisplayNameContainingIgnoreCase(String keyword);

    // 自定义 JPQL 查询
    @Query("SELECT u FROM User u WHERE u.age BETWEEN :min AND :max")
    List<User> findByAgeRange(@Param("min") int min, @Param("max") int max);

    // 原生 SQL 查询
    @Query(value = "SELECT * FROM users WHERE username ILIKE %:keyword%", nativeQuery = true)
    List<User> searchByUsername(@Param("keyword") String keyword);

    // 更新操作（需要 @Modifying + @Transactional）
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.displayName = :name WHERE u.id = :id")
    int updateDisplayName(@Param("id") Long id, @Param("name") String name);

    // 统计查询
    long countByAgeGreaterThan(int age);
    boolean existsByEmail(String email);
}
```

### 分页查询

```java
// Controller 层
@GetMapping("/users")
public Page<User> getUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String keyword) {

    Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

    if (keyword != null && !keyword.isEmpty()) {
        return userRepository.findByDisplayNameContainingIgnoreCase(keyword, pageable);
    }
    return userRepository.findAll(pageable);
}

// Repository
Page<User> findByDisplayNameContainingIgnoreCase(String keyword, Pageable pageable);
```

## 事务管理

```java
@Service
@Transactional  // 类级别：所有方法都开启事务
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    // 事务方法（默认遇到运行时异常回滚）
    public User createUserWithPost(User user, String postTitle) {
        User savedUser = userRepository.save(user);

        Post post = new Post();
        post.setTitle(postTitle);
        post.setAuthor(savedUser);
        postRepository.save(post);

        return savedUser;
    }

    // 指定回滚异常类型
    @Transactional(rollbackFor = Exception.class)
    public void updateWithTransaction(Long userId, String email) {
        userRepository.updateEmail(userId, email);
        // 如果抛出异常，updateEmail 会回滚
    }

    // 只读事务（优化性能）
    @Transactional(readOnly = true)
    public User getUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
```

## JSONB 字段映射

PostgreSQL 的 JSONB 类型在 JPA 中需要自定义转换：

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class JsonbConverter implements AttributeConverter<Map<String, Object>, String> {

    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Map<String, Object> attribute) {
        try {
            return mapper.writeValueAsString(attribute);
        } catch (Exception e) {
            throw new RuntimeException("JSON 序列化失败", e);
        }
    }

    @Override
    public Map<String, Object> convertToEntityAttribute(String dbData) {
        try {
            return mapper.readValue(dbData, Map.class);
        } catch (Exception e) {
            throw new RuntimeException("JSON 反序列化失败", e);
        }
    }
}

// 使用
@Entity
@Table(name = "users")
public class User {

    @Convert(converter = JsonbConverter.class)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> attributes;
}
```

## 雪花算法 ID 生成

当需要分布式唯一 ID 时，可以使用雪花算法：

```java
@Component
public class SnowFlakeIdGenerator implements IdentifierGenerator {

    // ... 雪花算法实现（参见 jpa-id.md）

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) {
        return String.valueOf(nextId());
    }
}

// 使用
@Entity
public class Order {
    @Id
    @GenericGenerator(name = "snowflake", strategy = "com.example.SnowFlakeIdGenerator")
    @GeneratedValue(generator = "snowflake")
    private String id;
}
```

## 练习

```java
// 1. 创建 Blog 应用的实体和 Repository
// 2. 实现文章列表的分页查询（支持标题搜索）
// 3. 实现用户注册事务（创建用户同时创建默认配置）
// 4. 使用 @Query 编写复杂的报表统计
```
