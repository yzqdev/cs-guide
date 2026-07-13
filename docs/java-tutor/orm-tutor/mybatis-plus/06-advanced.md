# MyBatis-Plus 高级特性

> 逻辑删除、自动填充、乐观锁、多数据源、MyBatis XML 混合使用等。

## 逻辑删除

逻辑删除是通过标记而非物理删除数据，查询时自动过滤已删除数据。

### 配置

```yaml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: deleted    # 全局逻辑删除字段
      logic-delete-value: 1          # 已删除值
      logic-not-delete-value: 0      # 未删除值
```

### 实体类

```java
@Data
public class User {

    private Long id;
    private String username;

    @TableLogic                      // 标记为逻辑删除字段
    @TableField("is_deleted")
    private Integer deleted;          // 0=未删除, 1=已删除
}
```

### 使用效果

```java
// 删除时 → 自动执行 UPDATE 而非 DELETE
userMapper.deleteById(1L);
// 实际执行: UPDATE users SET is_deleted=1 WHERE id=1 AND is_deleted=0

// 查询时 → 自动拼接条件
userMapper.selectList(null);
// 实际执行: SELECT * FROM users WHERE is_deleted=0

userMapper.selectById(1L);
// 实际执行: SELECT * FROM users WHERE id=1 AND is_deleted=0

// 如果不想要逻辑删除过滤，用原生 Mapper
@Mapper
public interface UserMapper extends BaseMapper<User> {
    @Select("SELECT * FROM users")
    List<User> selectAllIncludeDeleted();
}
```

## 自动填充

自动填充可以在插入或更新时自动设置字段值（如创建时间、修改时间）。

### 定义填充处理器

```java
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        // 插入时自动填充
        this.strictInsertFill(metaObject, "createdAt", LocalDateTime.class, LocalDateTime.now());
        this.strictInsertFill(metaObject, "updatedAt", LocalDateTime.class, LocalDateTime.now());
        this.strictInsertFill(metaObject, "createdBy", String.class, getCurrentUser());
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        // 更新时自动填充
        this.strictUpdateFill(metaObject, "updatedAt", LocalDateTime.class, LocalDateTime.now());
        this.strictUpdateFill(metaObject, "updatedBy", String.class, getCurrentUser());
    }

    private String getCurrentUser() {
        // 从 Spring Security 或 Request 中获取当前用户
        return "system";
    }
}
```

### 实体类

```java
@Data
public class User {

    private Long id;
    private String username;

    @TableField(fill = FieldFill.INSERT)          // 插入时填充
    private LocalDateTime createdAt;

    @TableField(fill = FieldFill.INSERT_UPDATE)    // 插入和更新时填充
    private LocalDateTime updatedAt;

    @TableField(fill = FieldFill.INSERT)          // 插入时填充
    private String createdBy;

    @TableField(fill = FieldFill.UPDATE)           // 更新时填充
    private String updatedBy;
}
```

### FieldFill 策略

| 策略 | 说明 |
|------|------|
| `DEFAULT` | 默认不处理 |
| `INSERT` | 插入时填充 |
| `UPDATE` | 更新时填充 |
| `INSERT_UPDATE` | 插入和更新时都填充 |

## 乐观锁

乐观锁用于解决并发更新时的数据冲突，通过版本号实现。

### 配置

```java
@Configuration
public class MybatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();

        // 添加乐观锁插件
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());

        // 添加分页插件
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));

        return interceptor;
    }
}
```

### 实体类

```java
@Data
public class User {

    private Long id;
    private String username;
    private Integer age;

    @Version                      // 乐观锁版本号
    private Integer version;
}
```

### 使用

```java
// 先查询，获取版本号
User user = userMapper.selectById(1L);
// user.getVersion() = 1

// 修改并更新
user.setAge(30);
userMapper.updateById(user);
// UPDATE users SET age=30, version=2 WHERE id=1 AND version=1
// 如果 version 已被其他线程修改为 2，则更新失败（影响行数为 0）
```

## 主键策略

```java
@Data
public class User {

    // 常用主键策略
    @TableId(type = IdType.AUTO)          // 数据库自增（ID）
    private Long id;

    // @TableId(type = IdType.INPUT)      // 自行输入
    // @TableId(type = IdType.ASSIGN_ID)  // 雪花算法（默认）
    // @TableId(type = IdType.ASSIGN_UUID) // UUID
    // @TableId(type = IdType.NONE)       // 无策略
}
```

### PostgreSQL 主键策略

```java
@Data
@KeySequence(value = "user_seq", dbType = DbType.POSTGRE_SQL)
public class User {

    @TableId(type = IdType.INPUT)  // 配合 KeySequence
    private Long id;
}

// 配置
@Configuration
public class MybatisPlusConfig {

    @Bean
    public IKeyGenerator keyGenerator() {
        return new PostgreKeyGenerator();
    }
}
```

## XML 与 MyBatis-Plus 混合使用

虽然 MyBatis-Plus 提供了强大的 CRUD 封装，但复杂 SQL 仍需要手写 XML：

```java
@Mapper
public interface UserMapper extends BaseMapper<User> {

    // 继承 BaseMapper 方法可以直接使用
    // List<User> selectList(Wrapper<User> wrapper);
    // int insert(User user);

    // 自定义复杂查询，需要写 XML
    List<UserVO> selectUserOrderSum(@Param("query") UserQuery query);
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.mapper.UserMapper">

    <!-- 自定义复杂统计查询 -->
    <select id="selectUserOrderSum" resultType="com.example.vo.UserVO">
        SELECT
            u.id, u.username,
            COUNT(o.id) AS order_count,
            COALESCE(SUM(o.amount), 0) AS total_amount
        FROM users u
        LEFT JOIN orders o ON u.id = o.user_id
        <where>
            <if test="query.name != null and query.name != ''">
                AND u.username LIKE CONCAT('%', #{query.name}, '%')
            </if>
        </where>
        GROUP BY u.id
        ORDER BY total_amount DESC
    </select>
</mapper>
```

```yaml
mybatis-plus:
  mapper-locations: classpath*:mapper/**/*.xml  # 扫描 XML
```

### 注意事项

```xml
<!-- 将 XML 放在 src/main/java 目录下时需配置 build -->
<build>
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.xml</include>
            </includes>
        </resource>
    </resources>
</build>
```

## 多数据源

使用 `dynamic-datasource` 库实现多数据源：

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>dynamic-datasource-spring-boot3-starter</artifactId>
    <version>4.3.1</version>
</dependency>
```

```yaml
spring:
  datasource:
    dynamic:
      primary: master
      strict: false
      datasource:
        master:
          url: jdbc:mysql://localhost:3306/db1
          username: root
          password: 123456
          driver-class-name: com.mysql.cj.jdbc.Driver
        slave:
          url: jdbc:mysql://localhost:3306/db2
          username: root
          password: 123456
          driver-class-name: com.mysql.cj.jdbc.Driver
```

```java
@Service
@DS("master")  // 默认使用主库
public class UserService extends ServiceImpl<UserMapper, User> {

    @DS("slave")  // 此方法使用从库
    public List<User> findFromSlave() {
        return baseMapper.selectList(null);
    }

    @Transactional
    @DS("master")  // 写入操作用主库
    public void saveUser(User user) {
        baseMapper.insert(user);
    }
}
```

## 练习

```java
// 1. 在实体中添加 @TableLogic 实现逻辑删除
// 2. 实现 MetaObjectHandler 自动填充创建时间和更新时间
// 3. 配置乐观锁并测试并发更新
// 4. 手写 XML 实现多表关联查询
```
