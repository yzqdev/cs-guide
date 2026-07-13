# MyBatis-Plus 分页查询

> MP 内置分页插件，无需手写 LIMIT 语句即可实现分页。

## 配置分页插件

```java
@Configuration
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();

        // 添加分页插件（指定数据库类型）
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));

        // 可添加多个插件，分页建议放在最后
        return interceptor;
    }
}
```

## 基本分页

```java
// 创建分页对象（当前页，每页条数）
Page<User> page = new Page<>(1, 10);  // 第 1 页，每页 10 条

// 查询
Page<User> result = userMapper.selectPage(page, null);

// 获取分页数据
List<User> users = result.getRecords();       // 当前页数据
long total = result.getTotal();               // 总记录数
long pages = result.getPages();               // 总页数
long current = result.getCurrent();           // 当前页码
long size = result.getSize();                 // 每页条数
boolean hasNext = result.hasNext();           // 是否有下一页
boolean hasPrev = result.hasPrevious();       // 是否有上一页
```

## Service 层分页

```java
@Service
public class UserService extends ServiceImpl<UserMapper, User> {

    public Page<User> findByPage(int pageNum, int pageSize) {
        Page<User> page = new Page<>(pageNum, pageSize);
        return baseMapper.selectPage(page, null);
    }

    // 带排序的分页
    public Page<User> findByPageWithSort(int pageNum, int pageSize) {
        Page<User> page = new Page<>(pageNum, pageSize);
        // 设置排序
        page.addOrder(new OrderItem("created_at", false));  // 降序
        return baseMapper.selectPage(page, null);
    }
}

// Controller 中直接返回 Page 对象，MyBatis-Plus 会自动处理 JSON 序列化
@GetMapping("/page")
public Page<User> page(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size) {
    return userService.page(new Page<>(page, size));
}
```

## 多条件分页查询

```java
// 封装查询条件的 VO
@Data
public class UserQuery {
    private String name;
    private Integer minAge;
    private Integer maxAge;
    private Integer status;
}

// Service
public Page<User> findPage(UserQuery query, int pageNum, int pageSize) {
    Page<User> page = new Page<>(pageNum, pageSize);

    // 使用 LambdaQueryWrapper 构建动态条件
    LambdaQueryWrapper<User> wrapper = Wrappers.lambdaQuery();
    wrapper.like(StringUtils.isNotBlank(query.getName()),
                 User::getUsername, query.getName());
    wrapper.ge(query.getMinAge() != null,
               User::getAge, query.getMinAge());
    wrapper.le(query.getMaxAge() != null,
               User::getAge, query.getMaxAge());
    wrapper.eq(query.getStatus() != null,
               User::getStatus, query.getStatus());
    wrapper.orderByDesc(User::getCreatedAt);

    return baseMapper.selectPage(page, wrapper);
}

// Controller
@GetMapping("/page")
public Page<User> page(UserQuery query,
                       @RequestParam(defaultValue = "1") int page,
                       @RequestParam(defaultValue = "10") int size) {
    return userService.findPage(query, page, size);
}
```

## 分页返回自定义 VO

如果分页需要返回的不是实体类（比如只返回部分字段或关联数据），可以使用 `Page<Map>` 或 `Page<VO>`：

```java
// 方法一：使用 selectMapsPage
public Page<Map<String, Object>> findMapPage(int pageNum, int pageSize) {
    Page<User> page = new Page<>(pageNum, pageSize);
    LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<User>()
        .select(User::getId, User::getUsername, User::getEmail);
    return baseMapper.selectMapsPage(page, wrapper);
}

// 方法二：使用 selectPage + 手动转换
public Page<UserVO> findVoPage(int pageNum, int pageSize) {
    Page<User> page = baseMapper.selectPage(
        new Page<>(pageNum, pageSize), null);
    Page<UserVO> voPage = new Page<>(pageNum, pageSize);

    // 复制分页属性
    voPage.setTotal(page.getTotal());
    voPage.setCurrent(page.getCurrent());

    // 转换数据
    List<UserVO> voList = page.getRecords().stream()
        .map(user -> {
            UserVO vo = new UserVO();
            BeanUtils.copyProperties(user, vo);
            return vo;
        }).collect(Collectors.toList());
    voPage.setRecords(voList);

    return voPage;
}
```

## 多表联查分页

当需要多表 JOIN 时，需要在 Mapper XML 中手写 SQL：

```java
// Mapper 接口
public interface UserMapper extends BaseMapper<User> {

    // 自定义分页查询（第一个参数必须是 Page）
    Page<UserVO> selectUserWithOrdersPage(Page<UserVO> page, @Param("query") UserQuery query);
}
```

```xml
<mapper namespace="com.example.mapper.UserMapper">

    <select id="selectUserWithOrdersPage" resultType="com.example.vo.UserVO">
        SELECT
            u.id, u.username, u.email,
            COUNT(o.id) AS order_count,
            COALESCE(SUM(o.amount), 0) AS total_amount
        FROM users u
        LEFT JOIN orders o ON u.id = o.user_id
        <where>
            <if test="query.name != null and query.name != ''">
                AND u.username LIKE CONCAT('%', #{query.name}, '%')
            </if>
            <if test="query.minAge != null">
                AND u.age >= #{query.minAge}
            </if>
        </where>
        GROUP BY u.id
        ORDER BY u.created_at DESC
    </select>
</mapper>
```

```java
// Service
public Page<UserVO> findUserWithOrdersPage(UserQuery query, int pageNum, int pageSize) {
    Page<UserVO> page = new Page<>(pageNum, pageSize);
    return userMapper.selectUserWithOrdersPage(page, query);
}
```

## 分页使用技巧

```java
// 1. 大数据量时禁用 count 查询（可提升性能）
Page<User> page = new Page<>(1, 10, false);  // 第三个参数 false 表示不查询总数

// 2. 手动指定总数（适合复杂查询）
Page<User> page = new Page<>(1, 10);
page.setTotal(1000);  // 手动设置总数
List<User> list = userMapper.selectUserList(page, query);
page.setRecords(list);

// 3. 配合 PageVO 统一返回
@Data
public class PageVO<T> {
    private List<T> records;
    private long total;
    private long page;
    private long size;

    public static <T> PageVO<T> of(Page<T> page) {
        PageVO<T> vo = new PageVO<>();
        vo.setRecords(page.getRecords());
        vo.setTotal(page.getTotal());
        vo.setPage(page.getCurrent());
        vo.setSize(page.getSize());
        return vo;
    }
}
```

## 练习

```java
// 1. 配置分页插件
// 2. 实现用户列表分页，支持按用户名模糊搜索
// 3. 实现带排序的分页（按创建时间降序）
// 4. 实现多表联查分页（用户 + 订单统计）
// 5. 编写分页返回结果统一封装类
```
