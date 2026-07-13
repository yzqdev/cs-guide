# MyBatis-Plus 快速入门

> MyBatis-Plus（简称 MP）是 MyBatis 的增强工具，只增强不改变，引入后立即拥有强大 CRUD 功能。

## 引入依赖

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
    <version>3.5.7</version>
</dependency>
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

## 配置文件

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/testdb?useSSL=false&serverTimezone=Asia/Shanghai
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver

mybatis-plus:
  type-aliases-package: com.example.entity    # 别名包
  mapper-locations: classpath*:mapper/**/*.xml # XML 位置
  global-config:
    db-config:
      id-type: auto                    # 全局主键策略
      logic-delete-field: deleted      # 逻辑删除字段
      logic-delete-value: 1            # 逻辑已删除值
      logic-not-delete-value: 0        # 逻辑未删除值
  configuration:
    map-underscore-to-camel-case: true # 下划线转驼峰
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

## 第一个实体类

```java
package com.example.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

@Data
@TableName("users")          // 指定表名
public class User {

    @TableId(type = IdType.AUTO)  // 主键策略：自增
    private Long id;

    @TableField("user_name")      // 字段名映射
    private String username;

    private String email;
    private Integer age;

    @TableField(fill = FieldFill.INSERT)  // 插入时自动填充
    private LocalDateTime createdAt;

    @TableField(fill = FieldFill.INSERT_UPDATE)  // 插入和更新时自动填充
    private LocalDateTime updatedAt;

    @TableLogic                // 逻辑删除字段
    @TableField("is_deleted")
    private Integer deleted;
}
```

## 第一个 Mapper

```java
package com.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.entity.User;

@Mapper
public interface UserMapper extends BaseMapper<User> {
    // 继承 BaseMapper 即拥有所有 CRUD 方法，无需写任何代码
}
```

无需 XML，无需写 insert/update/delete/select 方法！

## 继承的 BaseMapper 方法

```java
public interface BaseMapper<T> {
    // 插入
    int insert(T entity);

    // 删除
    int deleteById(Serializable id);
    int deleteByMap(Map<String, Object> columnMap);
    int delete(Wrapper<T> wrapper);
    int deleteBatchIds(Collection<? extends Serializable> idList);

    // 更新
    int updateById(T entity);
    int update(T entity, Wrapper<T> updateWrapper);

    // 查询
    T selectById(Serializable id);
    List<T> selectBatchIds(Collection<? extends Serializable> idList);
    List<T> selectByMap(Map<String, Object> columnMap);
    T selectOne(Wrapper<T> queryWrapper);
    Integer selectCount(Wrapper<T> queryWrapper);
    List<T> selectList(Wrapper<T> queryWrapper);
    List<Map<String, Object>> selectMaps(Wrapper<T> queryWrapper);
    List<Object> selectObjs(Wrapper<T> queryWrapper);
    <E extends IPage<T>> E selectPage(E page, Wrapper<T> queryWrapper);
}
```

## 第一个 Service

```java
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    // 使用 BaseMapper 方法

    public User findById(Long id) {
        return userMapper.selectById(id);
    }

    public List<User> findAll() {
        return userMapper.selectList(null);  // null = 无条件
    }

    public void createUser(User user) {
        userMapper.insert(user);
    }

    public void updateUser(User user) {
        userMapper.updateById(user);
    }

    public void deleteUser(Long id) {
        userMapper.deleteById(id);
    }

    // 使用条件构造器
    public List<User> findByAge(int age) {
        return userMapper.selectList(
            new QueryWrapper<User>().ge("age", age)
        );
    }
}
```

## 使用 IService 简化

MP 还提供了 Service 层的封装：

```java
public interface UserService extends IService<User> {
    // 可在此添加自定义方法
}

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
                             implements UserService {
    // 无需写任何代码，继承 save/update/remove/get/list/page 等方法
}

// 使用
@Autowired
private UserService userService;

userService.save(user);              // 插入
userService.saveBatch(users);        // 批量插入
userService.updateById(user);        // 更新
userService.removeById(1L);          // 删除
userService.getById(1L);             // 查询单条
userService.list();                  // 查询全部
userService.list(Wrappers.lambdaQuery()...);  // 条件查询
userService.page(page);              // 分页查询
```

### IService 常用方法

```java
// 保存
boolean save(T entity);
boolean saveBatch(Collection<T> entityList);
boolean saveOrUpdate(T entity);

// 删除
boolean removeById(Serializable id);
boolean remove(Wrapper<T> queryWrapper);

// 更新
boolean updateById(T entity);
boolean update(Wrapper<T> updateWrapper);

// 查询
T getById(Serializable id);
List<T> list();
List<T> list(Wrapper<T> queryWrapper);
long count();

// 分页
IPage<T> page(IPage<T> page, Wrapper<T> queryWrapper);
```

## 启动类

```java
@SpringBootApplication
@MapperScan("com.example.mapper")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

## MP 与 MyBatis 的区别

| 对比 | MyBatis | MyBatis-Plus |
|------|---------|-------------|
| 基础 CRUD | 需手写 SQL | 继承 BaseMapper 自动拥有 |
| 分页 | 需 PageHelper 或手写 | 自带分页插件 |
| 条件查询 | 手写动态 SQL | QueryWrapper / LambdaQueryWrapper |
| 代码生成 | 需自己写 | 内置代码生成器 |
| 逻辑删除 | 手写 | @TableLogic 自动处理 |
| 自动填充 | 手写 | @TableField(fill = ...) |

## 练习

```java
// 1. 创建 Product 实体，继承 BaseMapper
// 2. 实现完整的 CRUD 操作
// 3. 使用 IService 的 saveBatch 批量插入 100 条数据
// 4. 使用 selectList(new QueryWrapper<>()....) 做条件查询
```
