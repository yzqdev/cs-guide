# MyBatis-Plus CRUD 接口详解

> MP 提供了两套 CRUD 封装：BaseMapper（DAO 层）和 IService（Service 层）。

## BaseMapper — 数据访问层

### 插入

```java
// insert — 插入一条记录
int insert(T entity);

// 使用示例
User user = new User();
user.setUsername("张三");
user.setEmail("zhangsan@test.com");
user.setAge(25);
int rows = userMapper.insert(user);
System.out.println("受影响行数: " + rows);
System.out.println("自动生成的主键: " + user.getId());  // 主键被回填
```

### 删除

```java
// 根据 ID 删除
int deleteById(Serializable id);
userMapper.deleteById(1L);

// 根据 Map 条件删除
Map<String, Object> map = new HashMap<>();
map.put("age", 18);
map.put("status", 0);
int rows = userMapper.deleteByMap(map);
// DELETE FROM users WHERE age = 18 AND status = 0

// 根据条件构造器删除
int rows = userMapper.delete(new QueryWrapper<User>()
    .lt("age", 18));
// DELETE FROM users WHERE age < 18

// 批量删除
int rows = userMapper.deleteBatchIds(Arrays.asList(1L, 2L, 3L));
// DELETE FROM users WHERE id IN (1, 2, 3)
```

### 更新

```java
// 根据 ID 更新
User user = new User();
user.setId(1L);
user.setEmail("new@email.com");
int rows = userMapper.updateById(user);
// UPDATE users SET email='new@email.com' WHERE id=1

// 根据条件更新
int rows = userMapper.update(
    new User().setEmail("batch@test.com"),
    new UpdateWrapper<User>().eq("age", 18)
);
// UPDATE users SET email='batch@test.com' WHERE age=18
```

### 查询

```java
// 根据 ID 查询
User user = userMapper.selectById(1L);

// 批量查询
List<User> users = userMapper.selectBatchIds(Arrays.asList(1L, 2L, 3L));

// 根据 Map 查询
Map<String, Object> map = new HashMap<>();
map.put("username", "张三");
map.put("age", 25);
List<User> users = userMapper.selectByMap(map);

// 查询单个
User user = userMapper.selectOne(new QueryWrapper<User>()
    .eq("username", "张三"));

// 查询总记录数
long count = userMapper.selectCount(null);

// 查询所有
List<User> users = userMapper.selectList(null);

// 查 Map 列表（结果以 Map 形式返回）
List<Map<String, Object>> maps = userMapper.selectMaps(null);

// 查特定字段
List<User> users = userMapper.selectList(
    new QueryWrapper<User>().select("id", "username", "email")
);
```

## IService — 服务层

### 保存

```java
// 单条插入
boolean saved = userService.save(user);

// 批量插入
boolean saved = userService.saveBatch(userList);

// 批量插入（指定批次数量）
boolean saved = userService.saveBatch(userList, 100);  // 每批 100 条

// 保存或更新（根据主键是否存在判断）
boolean saved = userService.saveOrUpdate(user);

// 批量保存或更新
boolean saved = userService.saveOrUpdateBatch(userList);
```

### 删除

```java
// 根据 ID
boolean removed = userService.removeById(1L);

// 根据条件
boolean removed = userService.remove(new QueryWrapper<User>().eq("age", 0));

// 批量
boolean removed = userService.removeByIds(Arrays.asList(1L, 2L));
```

### 更新

```java
// 根据 ID
boolean updated = userService.updateById(user);

// 根据条件
boolean updated = userService.update(
    new UpdateWrapper<User>().set("email", "new@email.com").eq("id", 1L)
);

// 批量
boolean updated = userService.updateBatchById(userList);
```

### 查询

```java
// 根据 ID
User user = userService.getById(1L);

// 查询全部
List<User> list = userService.list();

// 条件查询
List<User> list = userService.list(
    new QueryWrapper<User>().ge("age", 18)
);

// 查询 Map
List<Map<String, Object>> maps = userService.listMaps();

// 计数
long count = userService.count();
long count = userService.count(new QueryWrapper<User>().eq("status", 1));
```

### 链式调用

IService 支持链式调用，语法更简洁：

```java
// 查询
User user = userService.query()
    .eq("username", "张三")
    .one();

List<User> users = userService.query()
    .ge("age", 18)
    .like("username", "张")
    .list();

// 更新
boolean updated = userService.update()
    .set("email", "new@email.com")
    .eq("id", 1L)
    .update();

// 删除
boolean removed = userService.remove()
    .eq("status", 0)
    .remove();
```

## Controller 层完整示例

```java
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public Result<User> create(@RequestBody User user) {
        userService.save(user);
        return Result.success(user);
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        userService.removeById(id);
        return Result.success();
    }

    @PutMapping
    public Result<Void> update(@RequestBody User user) {
        userService.updateById(user);
        return Result.success();
    }

    @GetMapping("/{id}")
    public Result<User> get(@PathVariable Long id) {
        return Result.success(userService.getById(id));
    }

    @GetMapping
    public Result<List<User>> list(@RequestParam(required = false) String keyword) {
        LambdaQueryWrapper<User> wrapper = Wrappers.lambdaQuery();
        wrapper.like(StringUtils.isNotBlank(keyword), User::getUsername, keyword);
        return Result.success(userService.list(wrapper));
    }
}
```

## 练习

```java
// 1. 使用 BaseMapper 实现条件查询（年龄大于 18，按创建时间降序）
// 2. 使用 IService 的 saveBatch 批量插入 1000 条数据
// 3. 使用链式调用 query().eq().list()
// 4. 实现 Controller 层的完整 RESTful API
```
