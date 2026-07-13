# MyBatis Mapper XML 详解

> Mapper XML 是 MyBatis 的核心，用于编写 SQL、定义映射关系。

## 基本元素

| 元素 | 说明 | 对应操作 |
|------|------|---------|
| `<select>` | 查询语句 | SELECT |
| `<insert>` | 插入语句 | INSERT |
| `<update>` | 更新语句 | UPDATE |
| `<delete>` | 删除语句 | DELETE |
| `<resultMap>` | 高级映射定义 | — |
| `<sql>` | SQL 片段 | — |

## 查询 — `<select>`

```xml
<select id="findById" resultType="User" parameterType="long">
    SELECT * FROM users WHERE id = #{id}
</select>

<!-- 模糊查询 -->
<select id="searchByUsername" resultType="User">
    SELECT * FROM users WHERE username LIKE CONCAT('%', #{keyword}, '%')
</select>

<!-- 返回 Map -->
<select id="findMapById" resultType="map">
    SELECT id, username, email FROM users WHERE id = #{id}
</select>

<!-- 返回单个值 -->
<select id="countAll" resultType="int">
    SELECT COUNT(*) FROM users
</select>
```

### 常用属性

| 属性 | 说明 | 示例 |
|------|------|------|
| `id` | 方法名 | `id="findById"` |
| `parameterType` | 参数类型（可省略） | `parameterType="Long"` |
| `resultType` | 结果类型（简单映射时用） | `resultType="User"` |
| `resultMap` | 结果映射（复杂映射时用） | `resultMap="userResultMap"` |
| `flushCache` | 是否刷新缓存 | `flushCache="true"` |
| `useCache` | 是否使用二级缓存 | `useCache="true"` |

## 插入 — `<insert>`

```xml
<!-- 普通插入 -->
<insert id="insert">
    INSERT INTO users (username, email, age)
    VALUES (#{username}, #{email}, #{age})
</insert>

<!-- 获取自增主键 -->
<insert id="insert" useGeneratedKeys="true" keyProperty="id" keyColumn="id">
    INSERT INTO users (username, email, age)
    VALUES (#{username}, #{email}, #{age})
</insert>

<!-- 批量插入（MySQL 方式） -->
<insert id="batchInsert">
    INSERT INTO users (username, email, age) VALUES
    <foreach collection="list" item="user" separator=",">
        (#{user.username}, #{user.email}, #{user.age})
    </foreach>
</insert>
```

## resultMap — 高级映射

当数据库列名与 Java 属性名不一致或需要关联查询时使用：

```xml
<!-- 基础 resultMap -->
<resultMap id="userResultMap" type="User">
    <id property="id" column="id" />                           <!-- 主键 -->
    <result property="username" column="user_name" />          <!-- 普通字段 -->
    <result property="createdAt" column="created_at" />
</resultMap>

<select id="findById" resultMap="userResultMap">
    SELECT * FROM users WHERE id = #{id}
</select>
```

### 一对一关联（association）

```java
public class User {
    private Long id;
    private String username;
    private UserProfile profile;  // 一对一关联
}

public class UserProfile {
    private Long id;
    private String avatar;
    private String phone;
}
```

```xml
<resultMap id="userWithProfileMap" type="User">
    <id property="id" column="id"/>
    <result property="username" column="username"/>

    <!-- 一对一关联 -->
    <association property="profile" javaType="UserProfile"
                 columnPrefix="profile_">
        <id property="id" column="id"/>
        <result property="avatar" column="avatar"/>
        <result property="phone" column="phone"/>
    </association>
</resultMap>

<select id="findByIdWithProfile" resultMap="userWithProfileMap">
    SELECT
        u.id, u.username,
        p.id AS profile_id,
        p.avatar AS profile_avatar,
        p.phone AS profile_phone
    FROM users u
    LEFT JOIN user_profiles p ON u.id = p.user_id
    WHERE u.id = #{id}
</select>
```

### 一对多关联（collection）

```java
public class User {
    private Long id;
    private String username;
    private List<Order> orders;  // 一对多
}

public class Order {
    private Long id;
    private String orderNo;
    private BigDecimal amount;
}
```

```xml
<resultMap id="userWithOrdersMap" type="User">
    <id property="id" column="id"/>
    <result property="username" column="username"/>

    <!-- 一对多关联 -->
    <collection property="orders" ofType="Order"
                columnPrefix="order_">
        <id property="id" column="id"/>
        <result property="orderNo" column="order_no"/>
        <result property="amount" column="amount"/>
    </collection>
</resultMap>

<select id="findByIdWithOrders" resultMap="userWithOrdersMap">
    SELECT
        u.id, u.username,
        o.id AS order_id,
        o.order_no AS order_order_no,
        o.amount AS order_amount
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id
    WHERE u.id = #{id}
</select>
```

### 分步查询（懒加载）

```xml
<resultMap id="userStepMap" type="User">
    <id property="id" column="id"/>
    <result property="username" column="username"/>

    <!-- 分步查询：先查用户，再查订单 -->
    <collection property="orders"
                select="com.example.mapper.OrderMapper.findByUserId"
                column="id"
                fetchType="lazy"/>  <!-- lazy 懒加载 -->
</resultMap>

<select id="findById" resultMap="userStepMap">
    SELECT * FROM users WHERE id = #{id}
</select>
```

## sql 片段

```xml
<!-- 定义复用 SQL 片段 -->
<sql id="userColumns">
    id, username, email, age, created_at
</sql>

<!-- 引用片段 -->
<select id="findById" resultType="User">
    SELECT <include refid="userColumns"/> FROM users WHERE id = #{id}
</select>

<select id="findAll" resultType="User">
    SELECT <include refid="userColumns"/> FROM users
</select>
```

## 参数传递详解

```xml
<!-- 单个基本类型参数 -->
<!-- Mapper: User findById(Long id); -->
<select id="findById" resultType="User">
    SELECT * FROM users WHERE id = #{id}
</select>

<!-- 多个参数（使用 @Param） -->
<!-- Mapper: User findByUsernameAndAge(@Param("name") String name, @Param("age") Integer age); -->
<select id="findByUsernameAndAge" resultType="User">
    SELECT * FROM users WHERE username = #{name} AND age = #{age}
</select>

<!-- 对象参数 -->
<!-- Mapper: int insert(User user); -->
<insert id="insert">
    INSERT INTO users (username, email, age)
    VALUES (#{username}, #{email}, #{age})
</insert>

<!-- Map 参数 -->
<!-- Mapper: List<User> findByMap(Map<String, Object> params); -->
<select id="findByMap" resultType="User">
    SELECT * FROM users WHERE username = #{username}
    <if test="age != null">AND age = #{age}</if>
</select>
```

## 练习

```xml
<!-- 1. 为一对多关系编写 resultMap
     - Category（分类）1 → N Product（商品）
     - 使用 LEFT JOIN 一次查询
     - 使用 collection 映射子集合 -->

<!-- 2. 编写包含列别名的分步查询
     - 先查分类，再根据分类 ID 查商品
     - 配置 fetchType="lazy" -->
```
