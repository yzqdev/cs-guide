# JPA 操作详解

> JPA 的增删改查操作细节，包括更新策略、批量操作和事务管理。

## 保存操作

```java
public interface UserRepository extends JpaRepository<User, Long> {
}

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // INSERT：id 为 null 或 0
    public User createUser(User user) {
        user.setId(null);  // 确保是新增
        return userRepository.save(user);
    }

    // UPDATE：id 已存在
    public User updateUser(User user) {
        // save() 会根据 id 是否存在决定 INSERT/UPDATE
        return userRepository.save(user);
    }

    // save 的底层逻辑：
    // - 若 id 为 null → EntityManager.persist() → INSERT
    // - 若 id 不为 null → EntityManager.merge() → SELECT + UPDATE/INSERT
}
```

## 更新操作

### 方式一：save() 全量更新

```java
public User updateUserEmail(Long id, String newEmail) {
    User user = userRepository.findById(id).orElseThrow();
    user.setEmail(newEmail);
    return userRepository.save(user);  // 全量 UPDATE
}
```

**缺点：** 先 SELECT 再 UPDATE，效率较低；所有字段都参与 UPDATE。

### 方式二：@Modifying + @Query

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 只更新指定字段（推荐）
    @Modifying
    @Query("UPDATE User u SET u.email = :email WHERE u.id = :id")
    int updateEmail(@Param("id") Long id, @Param("email") String email);

    // 更新多个字段
    @Modifying
    @Query("UPDATE User u SET u.username = :username, u.email = :email WHERE u.id = :id")
    int updateUser(@Param("id") Long id, @Param("username") String username,
                   @Param("email") String email);
}
```

```java
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional  // @Modifying 必须在事务中执行
    public void updateEmail(Long id, String email) {
        userRepository.updateEmail(id, email);
    }
}
```

### 方式三：使用 @DynamicUpdate

```java
@Entity
@DynamicUpdate  // 只生成有变更字段的 UPDATE 语句
public class User {
    // ...
}

// 此时 save() 只更新有变化的字段
// 不加 @DynamicUpdate 时，UPDATE 会包含所有字段
```

## 删除操作

```java
public interface UserRepository extends JpaRepository<User, Long> {

    @Modifying
    @Query("DELETE FROM User u WHERE u.age < :age")
    int deleteByAgeLessThan(@Param("age") int age);

    // 或者使用方法命名
    void deleteByAgeLessThan(int age);
}
```

### 级联删除

```java
// 删除用户时同时删除其所有地址（需配置 cascade + orphanRemoval）
@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Address> addresses = new ArrayList<>();

// 删除用户
userRepository.deleteById(userId);
// 自动删除关联的 addresses
```

## 批量操作

### 批量插入

```java
// 方式一：逐条插入（性能差）
for (User user : users) {
    userRepository.save(user);  // N 次 INSERT
}

// 方式二：批量插入（性能好）
userRepository.saveAll(users);  // 多次 INSERT，但可配置 batch

// 需要配置批量大小
// application.yml
// spring.jpa.properties.hibernate.jdbc.batch_size=50
// spring.jpa.properties.hibernate.order_inserts=true
// spring.jpa.properties.hibernate.order_updates=true
```

### 批量删除

```java
@Modifying
@Query("DELETE FROM User u WHERE u.id IN :ids")
int deleteBatch(@Param("ids") List<Long> ids);

// 或
userRepository.deleteAllById(ids);  // 逐条 DELETE，效率低
```

### 批量更新

```java
@Modifying
@Query("UPDATE User u SET u.status = :status WHERE u.id IN :ids")
int batchUpdateStatus(@Param("ids") List<Long> ids, @Param("status") String status);
```

## 事务管理

```java
@Service
// @Transactional 可以加在类级别（所有方法生效）
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private InventoryService inventoryService;

    // 创建订单并扣减库存 — 要么都成功，要么都回滚
    @Transactional(rollbackFor = Exception.class)
    public Order createOrder(Long productId, Integer quantity) {
        // 1. 扣减库存
        inventoryService.deduct(productId, quantity);

        // 2. 创建订单
        Order order = new Order();
        order.setProductId(productId);
        order.setQuantity(quantity);
        return orderRepository.save(order);
        // 如果扣库存后保存订单失败，库存扣减也会回滚
    }

    // 只读事务（优化性能）
    @Transactional(readOnly = true)
    public Order findById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    // 指定事务超时
    @Transactional(timeout = 30)
    public void batchProcess(List<Long> ids) {
        // ...
    }
}
```

## JPA 的 Dialect 配置

不同数据库需要配置不同的 Hibernate Dialect：

```yaml
spring:
  jpa:
    properties:
      hibernate:
        # MySQL
        dialect: org.hibernate.dialect.MySQLDialect
        # PostgreSQL（无需额外依赖）
        # dialect: org.hibernate.dialect.PostgreSQLDialect
        # MariaDB
        # dialect: org.hibernate.dialect.MariaDBDialect
        # SQLite（需 hibernate-community-dialects 依赖）
        # dialect: org.hibernate.community.dialect.SQLiteDialect
```

### SQLite 特殊配置

```kotlin
// Gradle
implementation("org.xerial:sqlite-jdbc")
implementation("org.hibernate.orm:hibernate-community-dialects")
```

```yaml
spring:
  jpa:
    database-platform: org.hibernate.community.dialect.SQLiteDialect
  datasource:
    url: jdbc:sqlite:./demo.db
    driver-class-name: org.sqlite.JDBC
```

## 常见问题

### 1. 更新时某些字段被覆盖为 null

```java
// ❌ 先查后改时，如果没设值的字段会变成 null
User user = userRepository.findById(1L).orElseThrow();
user.setEmail("new@email.com");
userRepository.save(user);  // 其他字段可能被覆盖

// ✅ 方案 1：使用 @DynamicUpdate
// ✅ 方案 2：使用 @Modifying 只更新需要的字段
```

### 2. N+1 查询

```java
// ❌ N+1：查询用户后，遍历每个用户的地址时发额外查询
List<User> users = userRepository.findAll();
for (User user : users) {
    System.out.println(user.getAddresses().size());  // 每个用户多一次查询
}

// ✅ 使用 JOIN FETCH
@Query("SELECT u FROM User u LEFT JOIN FETCH u.addresses")
List<User> findAllWithAddresses();
```

## 练习

```java
// 1. 使用 @Modifying 实现批量更新年龄
// 2. 使用 @DynamicUpdate 优化 save() 更新
// 3. 在 Service 中实现事务：创建订单时同时扣减库存，失败时全部回滚
// 4. 配置 hibernate.jdbc.batch_size 并测试 saveAll() 的性能
```
