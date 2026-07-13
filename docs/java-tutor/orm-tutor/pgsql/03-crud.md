# PostgreSQL CRUD 操作

> PostgreSQL 的标准 SQL 操作与 MySQL 类似，但有一些独特语法和特性。

## INSERT — 插入数据

```sql
-- 插入单条
INSERT INTO users (username, email, age) VALUES ('张三', 'zhangsan@test.com', 25);

-- 插入多条
INSERT INTO users (username, email, age) VALUES
('李四', 'lisi@test.com', 30),
('王五', 'wangwu@test.com', 28);

-- 插入并返回数据（PostgreSQL 特有）
INSERT INTO users (username, email, age) VALUES ('赵六', 'zhaoliu@test.com', 22)
RETURNING id, username, created_at;

-- 从其他表插入
INSERT INTO vip_users (username, email)
SELECT username, email FROM users WHERE age >= 25;

-- 插入冲突处理
INSERT INTO users (id, username, email) VALUES (1, '张三', 'newemail@test.com')
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email
RETURNING *;
```

## SELECT — 查询数据

### 基础查询

```sql
-- 查询所有
SELECT * FROM users;

-- 查询指定列
SELECT id, username, email FROM users;

-- 别名
SELECT username AS "姓名", email AS "邮箱" FROM users;

-- 去重
SELECT DISTINCT age FROM users;

-- 限制结果
SELECT * FROM users LIMIT 10;
SELECT * FROM users LIMIT 10 OFFSET 20;  -- 分页

-- 更标准的分页写法
SELECT * FROM users OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;
```

### WHERE 条件

```sql
-- 比较运算符
SELECT * FROM users WHERE age >= 18 AND age <= 30;
SELECT * FROM users WHERE age BETWEEN 18 AND 30;
SELECT * FROM users WHERE age IN (18, 25, 30);

-- 模糊查询（LIKE 大小写敏感，ILIKE 不敏感）
SELECT * FROM users WHERE username LIKE '张%';
SELECT * FROM users WHERE username ILIKE 'zhang%';  -- 忽略大小写

-- 正则表达式
SELECT * FROM users WHERE username ~ '^张';
SELECT * FROM users WHERE email ~* '@qq\.com$';  -- ~* 忽略大小写

-- NULL 判断
SELECT * FROM users WHERE email IS NULL;
SELECT * FROM users WHERE email IS NOT NULL;
```

### 排序

```sql
SELECT * FROM users ORDER BY age DESC, username ASC;
SELECT * FROM users ORDER BY age NULLS LAST;  -- NULL 放在最后
```

### 分组聚合

```sql
SELECT
    status,
    COUNT(*) AS count,
    AVG(age) AS avg_age,
    MAX(age) AS max_age,
    MIN(age) AS min_age,
    SUM(age) AS total_age
FROM users
GROUP BY status
HAVING COUNT(*) > 1;

-- 分组拼接
SELECT department, STRING_AGG(username, ', ' ORDER BY id) AS members
FROM employees
GROUP BY department;

-- 数组聚合
SELECT department, ARRAY_AGG(username) AS members
FROM employees
GROUP BY department;
```

## UPDATE — 更新数据

```sql
-- 更新单个字段
UPDATE users SET email = 'new@email.com' WHERE id = 1;

-- 更新多个字段
UPDATE users SET age = 26, email = 'new@email.com' WHERE id = 1;

-- 使用其他表更新
UPDATE users u
SET age = e.age
FROM employees e
WHERE u.id = e.user_id;

-- 带 RETURNING
UPDATE users SET age = age + 1 WHERE id = 1
RETURNING id, username, age;
```

:::warning
**UPDATE 必须带 WHERE！** 可以先 `SELECT` 确认条件再执行 `UPDATE`。
:::

## DELETE — 删除数据

```sql
-- 删除指定行
DELETE FROM users WHERE id = 1;

-- 清空表
DELETE FROM users;
TRUNCATE TABLE users;  -- 更快

-- 带 RETURNING
DELETE FROM users WHERE age < 18
RETURNING id, username, age;

-- 使用其他表条件删除
DELETE FROM users
USING blacklist
WHERE users.email = blacklist.email;
```

## 备份与恢复

### pg_dump — 单个数据库

```bash
# 备份到 SQL 文件
pg_dump -U postgres testdb > testdb_backup.sql

# 自定义格式（压缩，可恢复部分）
pg_dump -U postgres -Fc testdb > testdb_backup.dump

# 只备份数据
pg_dump -U postgres --data-only testdb > data.sql

# 只备份结构
pg_dump -U postgres --schema-only testdb > schema.sql

# Windows PowerShell
$env:PGPASSWORD='123456'; pg_dump -U postgres testdb > backup.sql
```

### pg_dumpall — 所有数据库

```bash
# 备份所有
pg_dumpall -U postgres > all_backup.sql

# 只备份全局对象（用户、表空间）
pg_dumpall -U postgres --globals-only > globals.sql
```

### 恢复

```bash
# 恢复 SQL 文件
psql -U postgres -d testdb < testdb_backup.sql

# 恢复自定义格式
pg_restore -U postgres -d testdb testdb_backup.dump

# 从 PowerShell 输入
Get-Content backup.sql | psql -U postgres -d testdb
```

## 版本升级

```bash
# 方式一：pg_dump + psql（适合小数据）
pg_dumpall -U postgres > backup.sql
# 安装新版本后
psql -U postgres -f backup.sql postgres

# 方式二：pg_upgrade（适合大数据，推荐）
pg_upgrade \
  -b "D:\PostgreSQL\15\bin" \
  -B "D:\PostgreSQL\16\bin" \
  -d "D:\PostgreSQL\15\data" \
  -D "D:\PostgreSQL\16\data" \
  -U postgres
```

## RETURNING 与 MySQL 对比

| 功能 | MySQL | PostgreSQL |
|------|-------|-----------|
| 插入返回 ID | `LAST_INSERT_ID()` | `INSERT ... RETURNING id` |
| 更新返回数据 | 不支持 | `UPDATE ... RETURNING *` |
| 删除返回数据 | 不支持 | `DELETE ... RETURNING *` |
| UPSERT | `ON DUPLICATE KEY UPDATE` | `ON CONFLICT DO UPDATE` |
| 限制结果 | `LIMIT x OFFSET y` | 同上 |
| 模糊不区分大小写 | `LIKE` 默认不区分 | `ILIKE` |

## 练习

```sql
-- 1. 向之前创建的 employees 表插入 5 条数据
-- 2. 查询工资高于平均值的员工
-- 3. 将某个员工的工资增加 10%
-- 4. 删除入职超过 5 年的员工
-- 5. 使用 pg_dump 备份数据库
```
