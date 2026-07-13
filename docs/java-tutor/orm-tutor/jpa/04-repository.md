# JPA Repository 与查询方法

> Spring Data JPA 的核心是 Repository 接口，只需定义接口方法即可自动生成查询。

## Repository 层级

```
Repository（最顶层，标记接口）
  └── CrudRepository（基本 CRUD）
      └── PagingAndSortingRepository（分页 + 排序）
          └── JpaRepository（JPA 特有方法，批量操作）
```

## 基础 CRUD 方法

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 无需编写任何实现，直接继承以下方法：

    // 保存（INSERT 或 UPDATE）
    <S extends T> S save(S entity);
    <S extends T> List<S> saveAll(Iterable<S> entities);

    // 查询
    Optional<T> findById(ID id);
    boolean existsById(ID id);
    List<T> findAll();
    List<T> findAllById(Iterable<ID> ids);
    long count();

    // 删除
    void deleteById(ID id);
    void delete(T entity);
    void deleteAll(Iterable<? extends T> entities);
}
```

## 方法命名查询

Spring Data JPA 根据方法名自动生成 SQL：

### 条件查询

```java
// 等于
User findByUsername(String username);

// 不等于
List<User> findByUsernameNot(String username);

// 模糊查询
List<User> findByUsernameLike(String pattern);    // 需要自己加 %
List<User> findByUsernameContaining(String keyword);  // 自动加 %

// 以...开头/结尾
List<User> findByUsernameStartingWith(String prefix);
List<User> findByUsernameEndingWith(String suffix);

// 忽略大小写
List<User> findByUsernameIgnoreCase(String username);
List<User> findByUsernameContainingIgnoreCase(String keyword);

// 比较运算
List<User> findByAgeGreaterThan(int age);        // >
List<User> findByAgeGreaterThanEqual(int age);   // >=
List<User> findByAgeLessThan(int age);           // <
List<User> findByAgeLessThanEqual(int age);      // <=
List<User> findByAgeBetween(int start, int end); // BETWEEN

// 集合查询
List<User> findByAgeIn(Collection<Integer> ages);
List<User> findByAgeNotIn(Collection<Integer> ages);
List<User> findByUsernameIsNull();
List<User> findByUsernameIsNotNull();

// 布尔
List<User> findByActiveTrue();
List<User> findByActiveFalse();
```

### 多条件组合

```java
// AND
List<User> findByUsernameAndAge(String username, int age);

// OR
List<User> findByUsernameOrEmail(String username, String email);

// 多字段排序
List<User> findByAgeGreaterThanOrderByUsernameAsc(int age);
List<User> findByAgeGreaterThanOrderByAgeDescUsernameAsc(int age);
```

### 关联查询

```java
// 通过关联实体查询
List<Post> findByUserUsername(String username);           // user.username
List<Post> findByUserAgeGreaterThan(int age);             // user.age

// 集合关联
List<User> findByAddressesCity(String city);              // addresses.city

// 判断集合是否为空
List<User> findByAddressesIsEmpty();
List<User> findByAddressesIsNotEmpty();
```

### 限制结果

```java
// 只取前 5 条
List<User> findFirst5ByOrderByAgeDesc();

// 取 top 3
List<User> findTop3ByUsernameContainingOrderByAgeDesc(String keyword);
```

## @Query 自定义查询

当方法名无法满足复杂查询时，使用 `@Query`：

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // JPQL 查询（操作的是实体类名和字段名）
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    User findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.age BETWEEN :min AND :max")
    List<User> findByAgeRange(@Param("min") int min, @Param("max") int max);

    // 原生 SQL 查询（操作的是表名和列名）
    @Query(value = "SELECT * FROM users WHERE username LIKE %:keyword%", nativeQuery = true)
    List<User> searchByUsername(@Param("keyword") String keyword);

    // JOIN FETCH（解决 N+1 问题）
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.addresses WHERE u.id = :id")
    User findByIdWithAddresses(@Param("id") Long id);

    // 只返回部分字段
    @Query("SELECT u.username FROM User u WHERE u.age > :age")
    List<String> findUsernamesByAgeGreaterThan(@Param("age") int age);
}
```

### @Modifying 更新/删除

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 更新操作需要 @Modifying
    @Modifying
    @Query("UPDATE User u SET u.email = :email WHERE u.id = :id")
    int updateEmail(@Param("id") Long id, @Param("email") String email);

    // 删除操作
    @Modifying
    @Query("DELETE FROM User u WHERE u.age < :age")
    int deleteByAgeLessThan(@Param("age") int age);

    // 批量更新
    @Modifying
    @Query("UPDATE User u SET u.age = u.age + 1 WHERE u.id IN :ids")
    int incrementAge(@Param("ids") List<Long> ids);
}
```

:::warning
`@Modifying` 只能在事务中使用，调用时需确保外层有 `@Transactional`。
:::

## 分页与排序

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 分页查询
    Page<User> findByAgeGreaterThan(int age, Pageable pageable);

    // 排序查询
    List<User> findByUsernameContaining(String keyword, Sort sort);
}
```

### 使用示例

```java
// 分页查询（第 0 页开始，每页 10 条，按创建时间降序）
Pageable pageable = PageRequest.of(0, 10, Sort.by("createdAt").descending());
Page<User> page = userRepository.findByAgeGreaterThan(18, pageable);

page.getContent();          // 当前页数据
page.getTotalElements();    // 总记录数
page.getTotalPages();       // 总页数
page.getNumber();           // 当前页码
page.getSize();             // 每页条数
page.isFirst();             // 是否是第一页
page.isLast();              // 是否是最后一页
page.hasNext();             // 是否有下一页

// 排序
Sort sort = Sort.by("age").descending().and(Sort.by("username").ascending());
List<User> users = userRepository.findByUsernameContaining("张", sort);
```

## @EntityGraph — 解决 N+1 问题

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 方式一：定义在 Repository 方法上
    @EntityGraph(attributePaths = "addresses")
    @Query("SELECT u FROM User u WHERE u.id = :id")
    User findByIdWithAddresses(@Param("id") Long id);

    // 方式二：定义在实体类上的命名图
    @EntityGraph("User.full")
    List<User> findAll();
}

// 实体类上定义
@Entity
@NamedEntityGraph(name = "User.full", attributeNodes = {
    @NamedAttributeNode("addresses"),
    @NamedAttributeNode("roles")
})
public class User {
    // ...
}
```

## Specification — 动态条件查询

适合条件不固定、需要动态拼接的场景：

```java
public interface UserRepository extends JpaRepository<User, Long>,
                                        JpaSpecificationExecutor<User> {
}

// 使用
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Page<User> search(String username, Integer minAge, Integer maxAge, Pageable pageable) {
        Specification<User> spec = Specification.where(null);

        if (username != null && !username.isEmpty()) {
            spec = spec.and((root, query, cb) ->
                cb.like(root.get("username"), "%" + username + "%"));
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

## 练习

```java
// 1. 创建 ProductRepository 并实现以下查询
//    - 按名称模糊查询（忽略大小写）
//    - 按价格区间查询并排序
//    - 按分类 ID 查询商品分页
//    - 使用 @Query 查询指定分类下的商品总数

// 2. 编写一个使用 Specification 的动态查询
//    - 支持按名称、价格区间、创建时间范围组合查询
```
