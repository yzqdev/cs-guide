# MySQL 索引进阶

> 索引是提升查询性能的最重要手段，学会合理使用索引能让查询快几十倍。

## 索引类型

| 索引类型 | 关键字 | 说明 |
|----------|--------|------|
| 普通索引 | `INDEX` | 最基本的索引，没有唯一性限制 |
| 唯一索引 | `UNIQUE` | 索引列的值必须唯一 |
| 主键索引 | `PRIMARY KEY` | 特殊的唯一索引，不允许为空 |
| 全文索引 | `FULLTEXT` | 用于全文检索（MyISAM / InnoDB 5.6+）|
| 空间索引 | `SPATIAL` | 用于地理空间数据 |

### 创建索引

```sql
-- 建表时创建
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,                -- 主键索引
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    age INT,
    INDEX idx_username (username),                    -- 普通索引
    UNIQUE INDEX idx_email (email),                   -- 唯一索引
    INDEX idx_age (age)
);

-- 建表后添加
CREATE INDEX idx_username ON users(username);
CREATE UNIQUE INDEX idx_email ON users(email);
ALTER TABLE users ADD INDEX idx_age (age);
ALTER TABLE users ADD FULLTEXT INDEX idx_content (content);

-- 删除索引
DROP INDEX idx_username ON users;
ALTER TABLE users DROP INDEX idx_age;
```

## 复合索引（联合索引）

索引可以包含多个字段，遵循**最左前缀原则**：

```sql
-- 创建复合索引
CREATE INDEX idx_name_age ON users(username, age);

-- 以下查询会使用索引：
SELECT * FROM users WHERE username = '张三';           -- ✅ 使用了 username
SELECT * FROM users WHERE username = '张三' AND age = 25; -- ✅ 使用了两个字段
SELECT * FROM users WHERE username LIKE '张%';         -- ✅ 范围查询（前缀匹配）

-- 以下查询不会使用索引：
SELECT * FROM users WHERE age = 25;                    -- ❌ 跳过了最左列
SELECT * FROM users WHERE age = 25 AND username = '张三'; -- 顺序可以调换，优化器会处理
SELECT * FROM users WHERE username LIKE '%张';         -- ❌ 后缀模糊
```

### 复合索引设计原则

```sql
-- 原则 1：等值查询放前面，范围查询放后面
-- 查询: WHERE status = 1 AND age > 18
-- 索引: INDEX(status, age)  ✅（等值在前）

-- 原则 2：选择区分度高的字段在前
-- 查询: WHERE gender = '男' AND email = 'a@b.com'
-- 索引: INDEX(email, gender)  ✅（email 区分度更高）

-- 原则 3：尽量用覆盖索引
-- 索引: INDEX(username, email)
-- 查询: SELECT username, email FROM users WHERE username = '张三'
-- 此时从索引直接返回结果，无需回表查询
```

## EXPLAIN — 分析查询

使用 `EXPLAIN` 查看查询是否使用了索引：

```sql
EXPLAIN SELECT * FROM users WHERE email = 'test@test.com';
```

### 输出字段详解

| 字段 | 值 | 说明 |
|------|----|------|
| `type` | `ALL` | 全表扫描（最差） |
| | `index` | 索引全扫描 |
| | `range` | 索引范围扫描 |
| | `ref` | 非唯一索引查找 |
| | `eq_ref` | 唯一索引查找 |
| | `const` | 主键/唯一索引等值查找（最快） |
| `key` | `idx_email` | 实际使用的索引 |
| `rows` | `10000` | 扫描的行数（越少越好） |
| `Extra` | `Using index` | 覆盖索引（无需回表） |
| | `Using where` | 需要回表过滤 |
| | `Using filesort` | 需要额外排序（需优化） |
| | `Using temporary` | 使用临时表（需优化） |

### 优化实战

```sql
-- ❌ 全表扫描（未建索引）
EXPLAIN SELECT * FROM users WHERE email = 'a@b.com';
-- type: ALL, rows: 100000

-- ✅ 创建索引后
CREATE INDEX idx_email ON users(email);
EXPLAIN SELECT * FROM users WHERE email = 'a@b.com';
-- type: ref, key: idx_email, rows: 1

-- ❌ 排序未走索引
EXPLAIN SELECT * FROM users ORDER BY created_at DESC;
-- Extra: Using filesort

-- ✅ 排序走索引
CREATE INDEX idx_created_at ON users(created_at DESC);
EXPLAIN SELECT * FROM users ORDER BY created_at DESC;
-- Extra: (空，表示使用索引排序)

-- ❌ 函数导致索引失效
EXPLAIN SELECT * FROM users WHERE YEAR(created_at) = 2024;
-- ✅ 改为范围查询
EXPLAIN SELECT * FROM users WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';
```

## 索引使用原则

### 该建索引的场景

- `WHERE` 条件中的字段
- `JOIN` 的关联字段（外键）
- `ORDER BY` 排序字段
- `GROUP BY` 分组字段
- 区分度高的字段（如 email > gender）

### 不该建索引的场景

- 频繁更新的字段（索引维护成本高）
- 数据量小的表（< 1000 行）
- 取值很少的字段（如 gender，只有男女）
- 大文本字段（如 TEXT、BLOB）

### 索引失效的情况

```sql
-- 1. LIKE 以 % 开头
SELECT * FROM users WHERE username LIKE '%张';     -- ❌

-- 2. 索引列上使用函数
SELECT * FROM users WHERE YEAR(created_at) = 2024; -- ❌

-- 3. 类型不匹配
SELECT * FROM users WHERE phone = 13800138000;      -- ❌ phone 是 VARCHAR

-- 4. OR 条件中有未索引列
-- 只有 id 有索引，age 没有
SELECT * FROM users WHERE id = 1 OR age = 25;       -- ❌

-- 5. != / NOT IN
SELECT * FROM users WHERE status != 1;              -- ❌（范围太大时）
```

## 慢查询日志

```sql
-- 查看慢查询配置
SHOW VARIABLES LIKE 'slow_query%';
SHOW VARIABLES LIKE 'long_query_time';

-- 开启慢查询日志（临时）
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;     -- 超过 1 秒的 SQL
SET GLOBAL log_queries_not_using_indexes = 'ON';  -- 记录未使用索引的查询

-- 查看慢查询日志文件路径
SHOW VARIABLES LIKE 'slow_query_log_file';
```

```bash
# 使用 mysqldumpslow 分析慢查询日志
mysqldumpslow -s t -t 10 /var/lib/mysql/slow.log  # 最慢的 10 条
mysqldumpslow -s c -t 10 /var/lib/mysql/slow.log  # 出现最多的 10 条
```

## 练习

```sql
-- 1. 为 orders 表创建合适的索引
-- CREATE INDEX idx_orders_user_id ON orders(user_id);
-- CREATE INDEX idx_orders_created_at ON orders(created_at);

-- 2. 使用 EXPLAIN 分析以下查询
EXPLAIN SELECT * FROM orders WHERE user_id = 1 ORDER BY created_at DESC;

-- 3. 优化这个慢查询（建议加什么索引？）
EXPLAIN SELECT * FROM orders WHERE status = 'pending' AND created_at > '2024-01-01'
ORDER BY created_at DESC LIMIT 10;

-- 4. 查找没有索引的查询（开启慢查询日志后分析）
```
