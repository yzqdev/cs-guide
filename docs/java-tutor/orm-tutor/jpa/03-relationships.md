# JPA 关联映射

> 数据库表之间的关联关系在 JPA 中通过注解映射，包括一对一、一对多、多对一、多对多。

## 关系概览

| 关联类型 | 注解 | 数据库实现 | 示例 |
|----------|------|-----------|------|
| 一对一 | `@OneToOne` | 外键（任一方） | 用户 ↔ 身份证 |
| 一对多 | `@OneToMany` | 外键（多方） | 用户 → 地址列表 |
| 多对一 | `@ManyToOne` | 外键（多方） | 地址 → 用户 |
| 多对多 | `@ManyToMany` | 中间关联表 | 学生 ↔ 课程 |

## @ManyToOne + @OneToMany（最常用）

```java
// ====== 用户（一方） ======
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    // 一对多：一个用户有多个地址
    // mappedBy 指向对方实体中关联字段的名称
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses = new ArrayList<>();

    // 辅助方法：双向关联时确保两边一致
    public void addAddress(Address address) {
        addresses.add(address);
        address.setUser(this);
    }

    public void removeAddress(Address address) {
        addresses.remove(address);
        address.setUser(null);
    }
}

// ====== 地址（多方） ======
@Entity
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String province;
    private String city;
    private String detail;

    // 多对一：多个地址属于同一个用户
    // @JoinColumn 指定外键列名（addresses 表中的 user_id 列）
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
```

### Fetch 策略

| Fetch 类型 | 说明 | 推荐场景 |
|-----------|------|---------|
| `FetchType.LAZY` | 懒加载（使用时才查询） | **一对多 / 多对多** |
| `FetchType.EAGER` | 急加载（查询主表时一并查出） | **多对一**（或不推荐，改用手动 join fetch）|

```java
// ✅ 推荐：多对一也用 LAZY + 手动 join fetch
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id")
private User user;

// 查询时显式 join fetch
@Query("SELECT a FROM Address a JOIN FETCH a.user WHERE a.id = :id")
Address findByIdWithUser(@Param("id") Long id);
```

### Cascade 级联操作

| Cascade 类型 | 说明 |
|-------------|------|
| `CascadeType.ALL` | 所有操作都级联 |
| `CascadeType.PERSIST` | 仅级联保存 |
| `CascadeType.MERGE` | 仅级联合并 |
| `CascadeType.REMOVE` | 仅级联删除 |
| `CascadeType.REFRESH` | 仅级联刷新 |
| `CascadeType.DETACH` | 仅级联分离 |

```java
@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Address> addresses = new ArrayList<>();
```

`orphanRemoval = true` 表示从集合中移除的地址会被自动删除。

### LAZY 加载时的常见问题

```java
// ❌ 报错：failed to lazily initialize a collection
// 因为事务已关闭，不能再查懒加载的数据

// ✅ 方案 1：在事务内访问
@Transactional
public User getUserWithAddresses(Long id) {
    User user = userRepository.findById(id).orElseThrow();
    user.getAddresses().size();  // 强制加载
    return user;
}

// ✅ 方案 2：使用 JOIN FETCH
@Query("SELECT u FROM User u LEFT JOIN FETCH u.addresses WHERE u.id = :id")
User findByIdWithAddresses(@Param("id") Long id);

// ✅ 方案 3：配置 spring.jpa.open-in-view=true（默认开启，但不推荐生产）

// ✅ 方案 4：使用 @EntityGraph
@EntityGraph(attributePaths = "addresses")
@Query("SELECT u FROM User u WHERE u.id = :id")
User findByIdWithAddresses(@Param("id") Long id);
```

## @OneToOne — 一对一

```java
// ====== 用户 ======
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private IDCard idCard;
}

// ====== 身份证 ======
@Entity
@Table(name = "id_cards")
public class IDCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "card_number", unique = true)
    private String cardNumber;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)  // 外键 + 唯一约束
    private User user;
}
```

## @ManyToMany — 多对多

```java
// ====== 学生 ======
@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // 多对多：一个学生可选多门课程
    @ManyToMany
    @JoinTable(
        name = "student_course",            // 中间表名
        joinColumns = @JoinColumn(name = "student_id"),     // 当前表在中间表的外键
        inverseJoinColumns = @JoinColumn(name = "course_id") // 对方表在中间表的外键
    )
    private Set<Course> courses = new HashSet<>();
}

// ====== 课程 ======
@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToMany(mappedBy = "courses")  // 由 Student 方维护关联
    private Set<Student> students = new HashSet<>();
}
```

生成的中间表 `student_course`：
```
student_id  |  course_id
------------|-----------
1           |  1
1           |  2
2           |  1
```

## 关联关系总结

```java
// === 使用场景速查 ===

// 一个用户有多个订单 → User: @OneToMany  / Order: @ManyToOne
// 一个订单有多个商品（多对多）→ Order: @ManyToMany / Product: @ManyToMany
// 一个用户有一个身份证 → User: @OneToOne / IDCard: @OneToOne
// 一个商品属于一个分类 → Product: @ManyToOne / Category: @OneToMany
```

### 常用配置模板

```java
// 多对一（多方）
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "category_id")
private Category category;

// 一对多（一方） 
@OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Product> products = new ArrayList<>();

// 一对一（携带外键的一方）
@OneToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id", unique = true)
private UserProfile profile;

// 多对多（维护方）
@ManyToMany
@JoinTable(name = "user_role",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id"))
private Set<Role> roles = new HashSet<>();
```

## 练习

```java
// 1. 创建完整的博客系统实体：
//    - User（用户）：id, username
//    - Post（文章）：id, title, content, user (多对一)
//    - Comment（评论）：id, content, post (多对一), user (多对一)
//    - Tag（标签）：id, name
//    - Post 和 Tag 之间多对多

// 2. 确保所有关联使用 FetchType.LAZY
// 3. 在 Post 中添加辅助方法 addTag() / removeTag()
// 4. 在 User 中添加辅助方法 addPost() / removePost()
```
