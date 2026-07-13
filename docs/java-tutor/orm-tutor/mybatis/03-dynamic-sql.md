# MyBatis 动态 SQL

> 动态 SQL 是 MyBatis 最强大的特性之一，可以根据条件动态拼接 SQL 语句。

## if

```xml
<!-- 根据条件动态拼接 WHERE 子句 -->
<select id="searchUsers" resultType="User">
    SELECT * FROM users WHERE 1=1
    <if test="username != null and username != ''">
        AND username LIKE CONCAT('%', #{username}, '%')
    </if>
    <if test="age != null">
        AND age = #{age}
    </if>
    <if test="minAge != null">
        AND age &gt;= #{minAge}
    </if>
    <if test="maxAge != null">
        AND age &lt;= #{maxAge}
    </if>
</select>
```

:::tip
XML 中的特殊字符需要转义：`>` 写成 `&gt;`，`<` 写成 `&lt;`。或者使用 `<![CDATA[ 原始内容 ]]>` 包裹。
:::

## where

`<where>` 自动处理 WHERE 关键字和多余的 AND/OR：

```xml
<select id="searchUsers" resultType="User">
    SELECT * FROM users
    <where>
        <if test="username != null and username != ''">
            AND username LIKE CONCAT('%', #{username}, '%')
        </if>
        <if test="age != null">
            AND age = #{age}
        </if>
        <if test="minAge != null">
            AND age >= #{minAge}
        </if>
    </where>
    ORDER BY id DESC
</select>
```

如果不使用 `<where>`，需要写 `WHERE 1=1` 技巧。

## set

`<set>` 用于 UPDATE 语句，自动处理 SET 关键字和多余的逗号：

```xml
<update id="updateUser">
    UPDATE users
    <set>
        <if test="username != null">username = #{username},</if>
        <if test="email != null">email = #{email},</if>
        <if test="age != null">age = #{age},</if>
    </set>
    WHERE id = #{id}
</update>
```

## choose / when / otherwise

类似 Java 的 switch-case，只执行第一个匹配的条件：

```xml
<select id="findByCondition" resultType="User">
    SELECT * FROM users WHERE 1=1
    <choose>
        <when test="username != null and username != ''">
            AND username LIKE CONCAT('%', #{username}, '%')
        </when>
        <when test="email != null and email != ''">
            AND email = #{email}
        </when>
        <otherwise>
            AND age >= 18  <!-- 默认条件 -->
        </otherwise>
    </choose>
</select>
```

## foreach

用于 IN 查询、批量插入等需要遍历集合的场景：

```xml
<!-- IN 查询 -->
<select id="findByIds" resultType="User">
    SELECT * FROM users WHERE id IN
    <foreach collection="ids" item="id" open="(" separator="," close=")">
        #{id}
    </foreach>
</select>
<!-- SELECT * FROM users WHERE id IN (1, 2, 3) -->

<!-- 批量插入 -->
<insert id="batchInsert">
    INSERT INTO users (username, email, age) VALUES
    <foreach collection="list" item="user" separator=",">
        (#{user.username}, #{user.email}, #{user.age})
    </foreach>
</insert>
<!-- INSERT INTO users (...) VALUES (?,?,?), (?,?,?), (?,?,?) -->

<!-- 批量更新 -->
<update id="batchUpdate" parameterType="list">
    <foreach collection="list" item="user" separator=";">
        UPDATE users SET username = #{user.username}, age = #{user.age}
        WHERE id = #{user.id}
    </foreach>
</update>
```

### foreach 属性

| 属性 | 说明 | 必填 |
|------|------|------|
| `collection` | 集合名（list/array 或 @Param 指定） | 是 |
| `item` | 每次迭代的元素名 | 是 |
| `index` | 当前迭代的索引 | 否 |
| `open` | 拼接开始字符 | 否 |
| `close` | 拼接结束字符 | 否 |
| `separator` | 元素分隔符 | 否 |

## trim

`<trim>` 是 `<where>` 和 `<set>` 的底层实现，提供了更灵活的控制：

```xml
<!-- 自定义 WHERE（prefix + prefixOverrides） -->
<trim prefix="WHERE" prefixOverrides="AND |OR ">
    <if test="username != null">AND username = #{username}</if>
    <if test="age != null">AND age = #{age}</if>
</trim>

<!-- 自定义 SET（prefix + suffixOverrides） -->
<trim prefix="SET" suffixOverrides=",">
    <if test="username != null">username = #{username},</if>
    <if test="email != null">email = #{email},</if>
</trim>
```

## 完整示例：动态查询

```xml
<mapper namespace="com.example.mapper.UserMapper">

    <!-- 通用的条件查询 -->
    <select id="findByConditions" resultType="User">
        SELECT * FROM users
        <where>
            <if test="username != null and username != ''">
                AND username LIKE CONCAT('%', #{username}, '%')
            </if>
            <if test="email != null and email != ''">
                AND email = #{email}
            </if>
            <if test="age != null">
                AND age = #{age}
            </if>
            <if test="minAge != null">
                AND age >= #{minAge}
            </if>
            <if test="maxAge != null">
                AND age &lt;= #{maxAge}  <!-- 或用 CDATA -->
            </if>
            <if test="ids != null and ids.size() > 0">
                AND id IN
                <foreach collection="ids" item="id" open="(" separator="," close=")">
                    #{id}
                </foreach>
            </if>
        </where>
        ORDER BY id DESC
        <if test="limit != null">
            LIMIT #{limit}
        </if>
    </select>

    <!-- 动态更新 -->
    <update id="updateSelective">
        UPDATE users
        <set>
            <if test="username != null">username = #{username},</if>
            <if test="email != null">email = #{email},</if>
            <if test="age != null">age = #{age},</if>
        </set>
        WHERE id = #{id}
    </update>

    <!-- 批量插入 -->
    <insert id="batchInsert">
        INSERT INTO users (username, email, age) VALUES
        <foreach collection="list" item="user" separator=",">
            (#{user.username}, #{user.email}, #{user.age})
        </foreach>
    </insert>
</mapper>
```

## CDATA 处理

当 SQL 中包含特殊字符时，使用 `<![CDATA[ ]]>` 包裹：

```xml
<select id="findByAgeRange" resultType="User">
    SELECT * FROM users WHERE age
    <![CDATA[
        >= #{minAge} AND age <= #{maxAge}
    ]]>
</select>
```

## bind

`<bind>` 可以在 XML 中定义变量，常用于模糊查询：

```xml
<select id="searchByUsername" resultType="User">
    <bind name="pattern" value="'%' + username + '%'" />
    SELECT * FROM users WHERE username LIKE #{pattern}
</select>
```

## 练习

```xml
<!-- 1. 实现一个通用的商品查询
     支持按名称模糊搜索、按分类、按价格区间、按创建时间范围组合查询
     所有条件都是可选的 -->

<!-- 2. 实现选择性更新
     只更新传入的非空字段
     使用 <set> + <if> -->

<!-- 3. 实现批量删除 -->
<delete id="batchDelete">
    DELETE FROM users WHERE id IN
    <foreach collection="ids" item="id" open="(" separator="," close=")">
        #{id}
    </foreach>
</delete>
```
