---
title: "Spring Data JPA 数据访问"
order: 6
---

# Spring Data JPA 数据访问

> Spring Data JPA 是 Spring Boot 中最常用的数据访问框架，基于 JPA 规范简化了数据库操作。

## 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- 数据库驱动（根据实际选择） -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

## 配置

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/demo?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      idle-timeout: 300000

  jpa:
    hibernate:
      ddl-auto: update          # create: 每次都重建 | update: 增量更新 | validate: 验证 | none: 不操作
    show-sql: true              # 打印 SQL
    properties:
      hibernate:
        format_sql: true        # 格式化 SQL
        dialect: org.hibernate.dialect.MySQLDialect
    open-in-view: false         # 关闭 OSIV（生产建议关掉）
```

### ddl-auto 选项

| 值 | 说明 |
|----|------|
| `create` | 每次启动删除旧表重建（开发用） |
| `create-drop` | 启动创建，关闭删除（测试用） |
| `update` | 增量更新，不删数据（开发用） |
| `validate` | 验证实体与表结构是否匹配 |
| `none` | 不操作 |

## 实体映射

```java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private Integer age;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Temporal(TemporalType.TIMESTAMP)
    private Date birthday;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
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

public enum Gender {
    MALE, FEMALE, OTHER
}
```

### 常用 JPA 注解

| 注解 | 说明 |
|------|------|
| `@Entity` | 标记为 JPA 实体 |
| `@Table` | 指定表名 |
| `@Id` | 主键 |
| `@GeneratedValue` | 主键生成策略 |
| `@Column` | 列配置（长度、是否为空、唯一等） |
| `@Enumerated` | 枚举映射 |
| `@Temporal` | 日期映射 |
| `@Transient` | 不映射到数据库 |
| `@Lob` | 大字段（CLOB/BLOB） |
| `@CreationTimestamp` | 自动设置创建时间 |
| `@UpdateTimestamp` | 自动设置更新时间 |

## Repository 层

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 根据名称查询
    List<User> findByName(String name);

    // 模糊查询
    List<User> findByNameContaining(String keyword);

    // 年龄范围
    List<User> findByAgeBetween(int min, int max);

    // 排序
    List<User> findByAgeOrderByNameAsc(Integer age);

    // 限制数量
    List<User> findTop10ByOrderByCreatedAtDesc();

    // 是否存在
    boolean existsByEmail(String email);

    // 计数
    long countByGender(Gender gender);

    // 删除
    void deleteByName(String name);
}
```

### 方法命名规则

| 关键字 | 示例 | JPQL 片段 |
|--------|------|-----------|
| `And` | `findByNameAndAge` | `WHERE name=?1 AND age=?2` |
| `Or` | `findByNameOrEmail` | `WHERE name=?1 OR email=?2` |
| `Between` | `findByAgeBetween` | `WHERE age BETWEEN ?1 AND ?2` |
| `LessThan` | `findByAgeLessThan` | `WHERE age < ?1` |
| `GreaterThan` | `findByAgeGreaterThan` | `WHERE age > ?1` |
| `After` | `findByCreatedAtAfter` | `WHERE created_at > ?1` |
| `Before` | `findByCreatedAtBefore` | `WHERE created_at < ?1` |
| `IsNull` | `findByNameIsNull` | `WHERE name IS NULL` |
| `IsNotNull` | `findByNameIsNotNull` | `WHERE name IS NOT NULL` |
| `Like` | `findByNameLike` | `WHERE name LIKE ?1` |
| `Containing` | `findByNameContaining` | `WHERE name LIKE %?1%` |
| `OrderBy` | `findByAgeOrderByNameDesc` | `ORDER BY name DESC` |
| `Not` | `findByNameNot` | `WHERE name <> ?1` |
| `In` | `findByAgeIn` | `WHERE age IN (?1)` |
| `NotIn` | `findByAgeNotIn` | `WHERE age NOT IN (?1)` |
| `True` | `findByActiveTrue` | `WHERE active = TRUE` |
| `False` | `findByActiveFalse` | `WHERE active = FALSE` |
| `IgnoreCase` | `findByNameIgnoreCase` | `WHERE UPPER(name)=UPPER(?1)` |

## @Query 自定义查询

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // JPQL 查询
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    Optional<User> findByEmail(String email);

    // JPQL 带参数名
    @Query("SELECT u FROM User u WHERE u.name LIKE %:keyword% OR u.email LIKE %:keyword%")
    List<User> search(@Param("keyword") String keyword);

    // 更新操作
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.age = :age WHERE u.id = :id")
    int updateAge(@Param("id") Long id, @Param("age") Integer age);

    // 删除操作
    @Modifying
    @Transactional
    @Query("DELETE FROM User u WHERE u.email = :email")
    int deleteByEmail(@Param("email") String email);

    // 本地 SQL 查询
    @Query(value = "SELECT * FROM users WHERE MATCH(name) AGAINST(:keyword)", nativeQuery = true)
    List<User> fullTextSearch(@Param("keyword") String keyword);
}
```

## 分页与排序

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 分页查询
    Page<User> findByNameContaining(String name, Pageable pageable);

    // 排序查询
    List<User> findByAgeGreaterThan(Integer age, Sort sort);
}
```

Service 中使用：

```java
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Page<UserResponse> getUsers(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        Page<User> userPage = userRepository.findAll(pageable);

        return userPage.map(this::toResponse);
    }

    // 使用 Specification 动态查询
    public Page<User> search(String name, Integer minAge, Integer maxAge, Pageable pageable) {
        Specification<User> spec = Specification.where(null);

        if (name != null) {
            spec = spec.and((root, query, cb) ->
                    cb.like(root.get("name"), "%" + name + "%"));
        }
        if (minAge != null) {
            spec = spec.and((root, query, cb) ->
                    cb.greaterThanOrEqualTo(root.get("age"), minAge));
        }
        if (maxAge != null) {
            spec = spec.and((root, query, cb) ->
                    cb.lessThanOrEqualTo(root.get("age"), maxAge));
        }

        return userRepository.findAll(spec, pageable);
    }
}
```

## 实体关系映射

```java
// 一对一
@Entity
public class User {
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id")
    private Profile profile;
}

// 一对多（一方）
@Entity
public class User {
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders = new ArrayList<>();
}

// 多对一（多方）
@Entity
public class Order {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}

// 多对多
@Entity
public class Student {
    @ManyToMany
    @JoinTable(name = "student_course",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id"))
    private Set<Course> courses = new HashSet<>();
}
```

### Fetch 策略

| Fetch 类型 | 说明 |
|-----------|------|
| `FetchType.LAZY` | 懒加载：使用时才查询（推荐） |
| `FetchType.EAGER` | 立即加载：查主表时连带查询 |

## 事务管理

```java
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)  // 类级别，所有方法默认只读
public class UserService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional  // 写操作覆盖为读写事务
    public User create(User user) {
        return userRepository.save(user);
    }

    @Transactional(rollbackFor = Exception.class)
    public void createWithOrders(User user, List<Order> orders) {
        User savedUser = userRepository.save(user);
        for (Order order : orders) {
            order.setUser(savedUser);
            orderRepository.save(order);
        }
        // 如果这里抛出异常，上面的保存都会回滚
    }
}
```

## 练习

1. 创建 `Category`（分类）和 `Product`（产品）实体，建立一对多关系
2. 实现按分类查询产品的接口
3. 使用 `@Query` 编写统计 SQL：每个分类下的产品数量
4. 实现分页查询产品列表
