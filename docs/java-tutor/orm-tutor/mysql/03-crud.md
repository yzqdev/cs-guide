# CRUD 操作

> 数据库最核心的增删改查操作，从入门到进阶。

## INSERT — 插入数据

```sql
-- 插入单条（指定列）
INSERT INTO users (username, email, age) VALUES ('张三', 'zhangsan@test.com', 25);

-- 插入所有列
INSERT INTO users VALUES (NULL, '李四', 'lisi@test.com', 30, '2024-01-15 10:00:00', NULL);

-- 插入多条
INSERT INTO users (username, email, age) VALUES
('王五', 'wangwu@test.com', 28),
('赵六', 'zhaoliu@test.com', 22),
('小明', 'xiaoming@test.com', 18);

-- 从其他表插入
INSERT INTO vip_users (username, email)
SELECT username, email FROM users WHERE age >= 25;

-- INSERT ... SET 语法
INSERT INTO users SET username='小红', email='hong@test.com', age=20;

-- 重复键处理（ON DUPLICATE KEY UPDATE）
INSERT INTO users (id, username, email) VALUES (1, '张三', 'newemail@test.com')
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- 替换（先删除再插入）
REPLACE INTO users (id, username, email) VALUES (1, '张三', 'replace@test.com');
```

## SELECT — 查询数据

### 基础查询

```sql
-- 查询所有列
SELECT * FROM users;

-- 查询指定列
SELECT id, username, email FROM users;

-- 列别名
SELECT username AS 姓名, email AS 邮箱 FROM users;

-- 去重
SELECT DISTINCT age FROM users;

-- 常量列
SELECT username, 'VIP' AS user_type FROM users;
```

### WHERE 条件

```sql
-- 比较运算符
SELECT * FROM users WHERE age = 25;
SELECT * FROM users WHERE age >= 18;
SELECT * FROM users WHERE age != 18;

-- 逻辑运算符
SELECT * FROM users WHERE age >= 18 AND age <= 30;
SELECT * FROM users WHERE age < 18 OR age > 60;
SELECT * FROM users WHERE NOT status = 'inactive';

-- 区间
SELECT * FROM users WHERE age BETWEEN 18 AND 30;

-- 集合
SELECT * FROM users WHERE age IN (18, 20, 25);
SELECT * FROM users WHERE age NOT IN (0, 100);

-- 空值判断
SELECT * FROM users WHERE email IS NULL;
SELECT * FROM users WHERE email IS NOT NULL;

-- 模糊查询
SELECT * FROM users WHERE username LIKE '张%';     -- 以"张"开头
SELECT * FROM users WHERE username LIKE '%明';     -- 以"明"结尾
SELECT * FROM users WHERE username LIKE '%小%';    -- 包含"小"
SELECT * FROM users WHERE username LIKE '张_';     -- "张"后1个字符
```

### ORDER BY — 排序

```sql
-- 升序（默认）
SELECT * FROM users ORDER BY age;

-- 降序
SELECT * FROM users ORDER BY age DESC;

-- 多字段排序
SELECT * FROM users ORDER BY age DESC, created_at ASC;
```

### LIMIT — 分页

```sql
-- 取前 N 条
SELECT * FROM users LIMIT 10;

-- 分页（OFFSET, LIMIT）
SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 0;   -- 第 1 页
SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 10;  -- 第 2 页
SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 20;  -- 第 3 页

-- LIMIT 简写（OFFSET, COUNT）
SELECT * FROM users ORDER BY id LIMIT 0, 10;    -- 第 1 页
SELECT * FROM users ORDER BY id LIMIT 10, 10;   -- 第 2 页
```

### GROUP BY — 分组聚合

```sql
-- 基础分组
SELECT status, COUNT(*) AS count FROM users GROUP BY status;

-- 分组统计
SELECT
    status,
    COUNT(*) AS user_count,
    AVG(age) AS avg_age,
    MAX(age) AS max_age,
    MIN(age) AS min_age,
    SUM(age) AS total_age
FROM users
GROUP BY status;

-- HAVING（分组后过滤）
SELECT
    age,
    COUNT(*) AS count
FROM users
GROUP BY age
HAVING count >= 2;

-- GROUP_CONCAT（分组拼接）
SELECT status, GROUP_CONCAT(username ORDER BY id SEPARATOR ', ') AS names
FROM users
GROUP BY status;
```

## UPDATE — 更新数据

```sql
-- 更新所有行
UPDATE users SET age = age + 1;

-- 根据条件更新
UPDATE users SET email = 'newemail@test.com' WHERE id = 1;

-- 更新多个字段
UPDATE users SET username = '新名字', age = 20 WHERE id = 1;

-- 使用其他表的值更新
UPDATE users u
JOIN temp_data t ON u.id = t.user_id
SET u.age = t.age;

-- 带 ORDER BY 和 LIMIT
UPDATE users SET age = 0 ORDER BY id DESC LIMIT 5;
```

:::warning
**UPDATE 必须带 WHERE！** 忘记写 WHERE 会更新所有行。
可以先写 `SELECT * FROM users WHERE ...` 确认条件正确，再改成 `UPDATE`。
:::

## DELETE — 删除数据

```sql
-- 删除指定行
DELETE FROM users WHERE id = 1;

-- 删除所有行（保留表）
DELETE FROM users;
TRUNCATE TABLE users;  -- 更快，但无法回滚

-- 带 ORDER BY 和 LIMIT 删除
DELETE FROM users ORDER BY created_at ASC LIMIT 10;  -- 删除最早 10 条

-- 级联删除（需先设置外键）
DELETE FROM users WHERE id = 1;  -- 同时删除关联的 orders
```

### DROP vs TRUNCATE vs DELETE

| 操作 | 删除内容 | 速度 | 可回滚 | 保留结构 |
|------|---------|------|--------|---------|
| `DELETE` | 数据 | 慢 | ✅（事务中）| ✅ |
| `TRUNCATE` | 数据 | 快 | ❌ | ✅ |
| `DROP` | 数据+结构 | 快 | ❌ | ❌ |

## 高级查询技巧

```sql
-- REGEXP 正则查询
SELECT * FROM users WHERE username REGEXP '^张';
SELECT * FROM users WHERE email REGEXP '@qq\\.com$';

-- FULLTEXT 全文检索
SELECT * FROM articles WHERE MATCH(title, content) AGAINST('数据库' IN BOOLEAN MODE);

-- 随机查询
SELECT * FROM users ORDER BY RAND() LIMIT 3;

-- 查询第 N 高的值
SELECT DISTINCT age FROM users ORDER BY age DESC LIMIT 1 OFFSET 2;  -- 第 3 高

-- 子查询作为列
SELECT username, (SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id) AS order_count
FROM users;

-- EXISTS 判断
SELECT * FROM users WHERE EXISTS (SELECT 1 FROM orders WHERE orders.user_id = users.id);
```

## 练习

```sql
-- 1. 向 users 表插入 10 条测试数据
-- 2. 查询年龄在 20-30 之间的用户，按年龄降序
-- 3. 按状态分组统计用户数量
-- 4. 更新指定用户的邮箱
-- 5. 删除创建时间超过 1 年的用户
-- 6. 查询用户名包含"张"的用户，分页显示（每页 5 条）
```
