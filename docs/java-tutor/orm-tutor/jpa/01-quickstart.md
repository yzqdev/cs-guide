# JPA 快速入门

> JPA（Java Persistence API）是 Java 的 ORM（对象关系映射）标准规范。Spring Data JPA 是 Spring 对 JPA 的封装，大幅简化了数据库访问。

## 什么是 JPA？

JPA 通过注解将 Java 对象与数据库表建立映射关系，让我们可以用面向对象的方式操作数据库。

```
Java 对象（Entity）  ←→  数据库表（Table）
   字段（Field）     ←→    列（Column）
```

## 引入依赖

### Maven

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

### Gradle (Kotlin DSL)

```kotlin
implementation("org.springframework.boot:spring-boot-starter-data-jpa")
runtimeOnly("com.mysql:mysql-connector-j")
```

## 配置文件

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/testdb?useSSL=false&serverTimezone=Asia/Shanghai&characterEncoding=utf8
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: update          # 开发用 update，生产用 validate
    show-sql: true               # 打印 SQL
    properties:
      hibernate:
        format_sql: true         # 格式化 SQL
        dialect: org.hibernate.dialect.MySQLDialect
```

### ddl-auto 详解

| 值 | 行为 | 推荐场景 |
|----|------|---------|
| `none` | 不自动处理 | 生产环境 |
| `validate` | 验证实体与表结构是否一致 | 生产环境 |
| `update` | 自动更新表结构（不会删数据） | 开发环境 |
| `create` | 每次启动删除并重建表 | 测试环境 |
| `create-drop` | 启动创建，停止删除 | 单元测试 |

## 第一个实体类

```java
package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity                          // 标记为 JPA 实体
@Table(name = "users")           // 映射到 users 表
public class User {

    @Id                         // 主键
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 自增
    private Long id;

    @Column(name = "username", nullable = false, length = 50)
    private String username;

    @Column(nullable = false)
    private String email;

    private Integer age;         // 省略 @Column，默认字段名 age

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // 生命周期回调：插入前自动设置时间
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // getter / setter（省略，实际项目中用 Lombok @Data）
}
```

## 第一个 Repository

```java
package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 根据方法名自动生成查询
    List<User> findByUsername(String username);

    List<User> findByAgeGreaterThanEqual(int age);

    List<User> findByUsernameContaining(String keyword);
}
```

## 第一个 CRUD 示例

```java
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 创建
    public User createUser(String username, String email, Integer age) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setAge(age);
        return userRepository.save(user);  // INSERT
    }

    // 查询
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<User> findAll() {
        return userRepository.findAll();   // SELECT *
    }

    // 更新
    public User updateUser(Long id, String email) {
        User user = userRepository.findById(id).orElseThrow();
        user.setEmail(email);
        return userRepository.save(user);   // UPDATE（因为 id 已存在）
    }

    // 删除
    public void deleteUser(Long id) {
        userRepository.deleteById(id);      // DELETE
    }
}
```

## 控制层调用

```java
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public User create(@RequestBody User user) {
        return userService.createUser(user.getUsername(), user.getEmail(), user.getAge());
    }

    @GetMapping
    public List<User> list() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User get(@PathVariable Long id) {
        return userService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
```

## JPA 执行流程

```
客户端 → Controller → Service → Repository（Spring Data JPA）
                                    ↓
                                JPA（Hibernate 实现）
                                    ↓
                                JDBC → 数据库
```

## 练习

```java
// 1. 创建一个 Product 实体（id, name, price, stock, createdAt）
// 2. 创建 ProductRepository
// 3. 实现按价格区间查询和按名称模糊查询
// 4. 编写单元测试验证 CRUD
```
