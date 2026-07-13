# MyBatis-Plus 条件构造器

> Wrapper 是 MP 最核心的功能之一，用于构建动态 SQL 条件，无需手写 SQL。

## Wrapper 体系

```
Wrapper（抽象基类）
├── AbstractWrapper
│   ├── QueryWrapper      — 查询条件封装
│   ├── UpdateWrapper     — 更新条件封装
│   ├── LambdaQueryWrapper — Lambda 语法查询（推荐）
│   └── LambdaUpdateWrapper — Lambda 语法更新（推荐）
└── AbstractChainWrapper — 链式调用
```

## QueryWrapper

### 比较操作

```java
// 等于
QueryWrapper<User> qw = new QueryWrapper<>();
qw.eq("username", "张三");

// 不等于
qw.ne("status", 0);

// 大于 / 小于
qw.gt("age", 18);        // age > 18
qw.ge("age", 18);        // age >= 18
qw.lt("age", 30);        // age < 30
qw.le("age", 30);        // age <= 30

// 区间
qw.between("age", 18, 30);     // BETWEEN 18 AND 30
qw.notBetween("age", 18, 30);

// IN
qw.in("status", 0, 1, 2);
qw.notIn("status", 0);
qw.inSql("id", "SELECT user_id FROM blacklist");

// IS NULL / IS NOT NULL
qw.isNull("email");
qw.isNotNull("email");
```

### 模糊查询

```java
qw.like("username", "张");          // LIKE '%张%'
qw.notLike("username", "张");
qw.likeLeft("username", "张");      // LIKE '%张'
qw.likeRight("username", "张");     // LIKE '张%'
```

### 排序

```java
qw.orderByAsc("age");
qw.orderByDesc("created_at");
qw.orderBy(true, true, "age", "id");  // 多字段排序
```

### 逻辑组合

```java
// AND（默认）
qw.eq("status", 1).eq("age", 18);  // status = 1 AND age = 18

// OR
qw.eq("status", 1).or().eq("status", 2);  // status = 1 OR status = 2

// 嵌套（使用 and() 包裹）
qw.and(w -> w.lt("age", 18).or().gt("age", 60));
// WHERE (age < 18 OR age > 60)

// 嵌套（使用 or() 包裹）
qw.or(w -> w.eq("status", 0).eq("deleted", 0));
// WHERE ... OR (status = 0 AND deleted = 0)
```

### 字段选择

```java
// 只查询指定字段
qw.select("id", "username", "email");

// 排除字段
qw.select(User.class, info -> !info.getColumn().equals("password"));
```

### 子查询

```java
qw.inSql("id", "SELECT user_id FROM blacklist WHERE type = 1");

qw.existsSql("SELECT 1 FROM orders WHERE user_id = users.id");
```

## LambdaQueryWrapper（推荐）

使用 Lambda 表达式，避免硬编码字段名：

```java
// ❌ QueryWrapper — 硬编码字段名
new QueryWrapper<User>().eq("username", "张三");

// ✅ LambdaQueryWrapper — 类型安全
new LambdaQueryWrapper<User>().eq(User::getUsername, "张三");

// 更简洁的写法（使用 Wrappers 工具类）
LambdaQueryWrapper<User> wrapper = Wrappers.lambdaQuery();
wrapper.eq(User::getUsername, "张三");
wrapper.ge(User::getAge, 18);
wrapper.orderByDesc(User::getCreatedAt);

// 完整示例
List<User> users = userMapper.selectList(
    Wrappers.<User>lambdaQuery()
        .like(User::getUsername, "张")
        .ge(User::getAge, 18)
        .orderByDesc(User::getCreatedAt)
);
```

### LambdaQueryWrapper 完整示例

```java
@GetMapping("/search")
public Result<List<User>> search(UserQuery query) {
    LambdaQueryWrapper<User> wrapper = Wrappers.lambdaQuery();

    // 动态条件：非空才拼接
    wrapper.like(StringUtils.isNotBlank(query.getUsername()),
                 User::getUsername, query.getUsername());
    wrapper.eq(query.getAge() != null,
               User::getAge, query.getAge());
    wrapper.ge(query.getMinAge() != null,
               User::getAge, query.getMinAge());
    wrapper.le(query.getMaxAge() != null,
               User::getAge, query.getMaxAge());
    wrapper.orderByDesc(User::getCreatedAt);

    return Result.success(userService.list(wrapper));
}
```

## UpdateWrapper

```java
// 方式一：使用实体 + UpdateWrapper
User user = new User();
user.setEmail("batch@test.com");
userMapper.update(user,
    new UpdateWrapper<User>().eq("age", 18));

// 方式二：使用 UpdateWrapper 直接设置
int rows = userMapper.update(
    null,
    new UpdateWrapper<User>()
        .set("email", "new@test.com")
        .set("age", 20)
        .eq("id", 1L)
);

// Lambda 版本
int rows = userMapper.update(
    null,
    Wrappers.<User>lambdaUpdate()
        .set(User::getEmail, "new@test.com")
        .set(User::getAge, 20)
        .eq(User::getId, 1L)
);
```

## 条件构造器常用方法对照

| 方法 | SQL | 说明 |
|------|-----|------|
| `eq` | `=` | 等于 |
| `ne` | `<>` | 不等于 |
| `gt` | `>` | 大于 |
| `ge` | `>=` | 大于等于 |
| `lt` | `<` | 小于 |
| `le` | `<=` | 小于等于 |
| `between` | `BETWEEN ... AND ...` | 区间 |
| `like` | `LIKE '%值%'` | 模糊匹配 |
| `likeLeft` | `LIKE '%值'` | 左模糊 |
| `likeRight` | `LIKE '值%'` | 右模糊 |
| `in` | `IN (...)` | 包含 |
| `isNull` | `IS NULL` | 空值 |
| `isNotNull` | `IS NOT NULL` | 非空 |
| `orderByAsc` | `ORDER BY ... ASC` | 升序排序 |
| `orderByDesc` | `ORDER BY ... DESC` | 降序排序 |
| `groupBy` | `GROUP BY ...` | 分组 |
| `having` | `HAVING ...` | 分组过滤 |

## 练习

```java
// 1. 查询年龄在 18-30 之间、用户名包含"张"的用户，按年龄降序
List<User> users = userMapper.selectList(
    Wrappers.<User>lambdaQuery()
        .between(User::getAge, 18, 30)
        .like(User::getUsername, "张")
        .orderByDesc(User::getAge)
);

// 2. 批量更新状态为 0 的用户邮件
userMapper.update(
    null,
    Wrappers.<User>lambdaUpdate()
        .set(User::getEmail, "default@test.com")
        .eq(User::getStatus, 0)
);

// 3. 使用动态条件查询（Lambda 非空判断）
LambdaQueryWrapper<User> wrapper = Wrappers.lambdaQuery();
wrapper.like(StringUtils.isNotBlank(name), User::getUsername, name);
wrapper.eq(age != null, User::getAge, age);
wrapper.ge(minAge != null, User::getAge, minAge);
wrapper.le(maxAge != null, User::getAge, maxAge);
```
