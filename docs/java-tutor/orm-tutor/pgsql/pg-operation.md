# PostgreSQL 基本操作

> 从连接到日常 CRUD 操作，掌握 PostgreSQL 的核心 SQL。

## psql 交互命令

`psql` 是 PostgreSQL 自带的命令行工具，以 `\` 开头的命令是元命令（meta-command）：

### 信息查询

```sql
-- 查看所有数据库
\l

-- 查看所有表
\dt
\dt+     -- 详细信息（含大小、描述）

-- 查看表结构
\d users
\d+ users

-- 查看索引
\di

-- 查看序列
\ds

-- 查看视图
\dv

-- 查看函数
\df

-- 查看当前连接信息
\conninfo

-- 查看所有 schema
\dn

-- 查看表空间
\db
```

### 连接与切换

```sql
-- 切换数据库
\c mydb

-- 列出当前数据库的连接
\g

-- 查看命令历史
\s

-- 执行外部 SQL 文件
\i /path/to/file.sql

-- 输出查询结果到文件
\o /path/to/output.txt
```

### 显示设置

```sql
-- 开启查询时间显示
\timing

-- 对齐/非对齐输出
\a

-- 扩展显示（每行一个字段）
\x

-- 查看当前设置
\set
```

## 环境变量

| 变量 | 说明 | 示例 |
|------|------|------|
| `PGHOST` | 数据库主机 | `localhost` |
| `PGPORT` | 端口 | `5432` |
| `PGDATABASE` | 默认数据库 | `mydb` |
| `PGUSER` | 用户名 | `postgres` |
| `PGPASSWORD` | 密码 | `123456` |
| `PGDATA` | 数据目录 | `/var/lib/postgresql/16/data` |

```bash
# 设置环境变量后，无需每次都指定连接参数
export PGHOST=localhost
export PGPORT=5432
export PGDATABASE=mydb
export PGUSER=postgres
export PGPASSWORD=123456

psql  # 直接连接
```

## 数据库管理

```sql
-- 创建数据库
CREATE DATABASE mydb;
CREATE DATABASE mydb OWNER postgres ENCODING 'UTF8' LC_COLLATE 'zh_CN.UTF-8';

-- 查看数据库列表
\l

-- 查看当前数据库
SELECT current_database();

-- 切换数据库
\c mydb

-- 查看数据库大小
SELECT pg_database_size('mydb');
SELECT pg_size_pretty(pg_database_size('mydb'));  -- 人性化显示

-- 重命名数据库（必须断开连接）
ALTER DATABASE mydb RENAME TO newdb;

-- 删除数据库（必须断开连接）
DROP DATABASE mydb;
```

## 表管理

```sql
-- 创建表
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age INT CHECK (age > 0 AND age < 150),
    email VARCHAR(200) UNIQUE,
    score DECIMAL(5,2) DEFAULT 0.0,
    class_id INT REFERENCES classes(id),  -- 外键
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 查看所有表
\dt

-- 查看表结构
\d students

-- 修改表名
ALTER TABLE students RENAME TO pupils;

-- 添加列
ALTER TABLE students ADD COLUMN phone VARCHAR(20);

-- 删除列
ALTER TABLE students DROP COLUMN phone;

-- 修改列类型
ALTER TABLE students ALTER COLUMN score TYPE NUMERIC(5,2);

-- 设置默认值
ALTER TABLE students ALTER COLUMN score SET DEFAULT 0.0;

-- 添加 NOT NULL 约束
ALTER TABLE students ALTER COLUMN email SET NOT NULL;

-- 添加 CHECK 约束
ALTER TABLE students ADD CONSTRAINT check_age CHECK (age >= 0);

-- 删除表
DROP TABLE students;
DROP TABLE IF EXISTS students CASCADE;  -- CASCADE 同时删除依赖对象
```

## 数据操作（CRUD）

### INSERT

```sql
-- 插入单条
INSERT INTO students (name, age, email, score, class_id)
VALUES ('张三', 25, 'zhangsan@test.com', 85.5, 1);

-- 插入多条
INSERT INTO students (name, age, email, score, class_id) VALUES
('李四', 30, 'lisi@test.com', 92.0, 1),
('王五', 28, 'wangwu@test.com', 78.5, 2),
('赵六', 22, 'zhaoliu@test.com', 88.0, 2);

-- 插入并从其他表获取数据
INSERT INTO excellent_students (name, score)
SELECT name, score FROM students WHERE score >= 90;

-- 插入冲突处理（ON CONFLICT）
INSERT INTO students (id, name, email) VALUES (1, '张三', 'newemail@test.com')
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
```

### SELECT

```sql
-- 基本查询
SELECT * FROM students;
SELECT id, name, score FROM students;

-- 别名
SELECT s.name AS 姓名, s.score AS 成绩 FROM students s;

-- 去重
SELECT DISTINCT class_id FROM students;

-- WHERE 条件
SELECT * FROM students WHERE score >= 80;
SELECT * FROM students WHERE name LIKE '张%';
SELECT * FROM students WHERE age BETWEEN 20 AND 30;
SELECT * FROM students WHERE class_id IN (1, 2);

-- 排序
SELECT * FROM students ORDER BY score DESC, name ASC;

-- 分页
SELECT * FROM students ORDER BY id LIMIT 10 OFFSET 0;  -- 第 1 页
SELECT * FROM students ORDER BY id LIMIT 10 OFFSET 10; -- 第 2 页

-- 聚合
SELECT
    class_id,
    COUNT(*) AS student_count,
    AVG(score) AS avg_score,
    MAX(score) AS max_score,
    MIN(score) AS min_score
FROM students
GROUP BY class_id
HAVING AVG(score) > 80;

-- 子查询
SELECT name, score FROM students
WHERE score > (SELECT AVG(score) FROM students);

-- LIMIT 与 OFFSET 的另一种写法（SQL 标准）
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;
```

### UPDATE

```sql
-- 更新单个字段
UPDATE students SET score = 90 WHERE id = 1;

-- 更新多个字段
UPDATE students SET score = 95, age = 26 WHERE name = '张三';

-- 使用其他表的值更新
UPDATE students s
SET score = e.score
FROM exam_scores e
WHERE s.id = e.student_id;

-- 带 RETURNING（PostgreSQL 特有）
UPDATE students SET score = 100 WHERE id = 1 RETURNING id, name, score;
```

### DELETE

```sql
-- 删除指定行
DELETE FROM students WHERE id = 1;

-- 删除所有行（保留表结构）
DELETE FROM students;
TRUNCATE TABLE students;  -- 更快，不能回滚（事务中可回滚）

-- 带 RETURNING
DELETE FROM students WHERE score < 60 RETURNING id, name, score;

-- 级联删除（受外键约束）
DELETE FROM classes WHERE id = 1 CASCADE;
```

## 约束（Constraints）

| 约束 | 说明 | 示例 |
|------|------|------|
| `PRIMARY KEY` | 主键，唯一 + 非空 | `id INT PRIMARY KEY` |
| `FOREIGN KEY` | 外键，引用其他表 | `class_id INT REFERENCES classes(id)` |
| `UNIQUE` | 唯一值 | `email VARCHAR(200) UNIQUE` |
| `NOT NULL` | 非空 | `name VARCHAR(50) NOT NULL` |
| `CHECK` | 条件检查 | `age INT CHECK (age > 0)` |
| `DEFAULT` | 默认值 | `score DECIMAL DEFAULT 0.0` |
| `EXCLUDE` | 排除约束 | `EXCLUDE USING gist (period WITH &&)` |

```sql
-- 外键约束的级联行为
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id)
        ON DELETE CASCADE      -- 删除用户时同时删除其订单
        ON UPDATE CASCADE      -- 更新用户 ID 时同步更新
);

-- 其他选项：SET NULL / SET DEFAULT / RESTRICT / NO ACTION
```

## Schema（模式）

Schema 用于组织数据库对象，类似于命名空间：

```sql
-- 创建 schema
CREATE SCHEMA myapp;

-- 在 schema 中创建表
CREATE TABLE myapp.products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200)
);

-- 查看所有 schema
\dn

-- 设置搜索路径（默认是 public）
SET search_path TO myapp, public;

-- 删除 schema
DROP SCHEMA myapp CASCADE;  -- CASCADE 删除所有包含的对象
```

## 扩展模块（Extensions）

PostgreSQL 通过扩展模块提供额外功能：

```sql
-- 查看已安装的扩展
\dx

-- 查看可用扩展
SELECT * FROM pg_available_extensions;

-- 常用扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";       -- UUID 生成
CREATE EXTENSION IF NOT EXISTS "pgcrypto";         -- 加密函数
CREATE EXTENSION IF NOT EXISTS "pg_trgm";          -- 模糊搜索
CREATE EXTENSION IF NOT EXISTS "postgis";          -- 地理空间（需单独安装）
CREATE EXTENSION IF NOT EXISTS "hstore";           -- 键值存储
```

## 备份与恢复

### pg_dump — 单个数据库

```bash
# 备份到 SQL 文件
pg_dump -U postgres mydb > mydb_backup.sql

# 备份到自定义格式（压缩，可恢复部分）
pg_dump -U postgres -Fc mydb > mydb_backup.dump

# 只备份数据（不包含建表语句）
pg_dump -U postgres --data-only mydb > mydb_data.sql

# 只备份 schema（不包含数据）
pg_dump -U postgres --schema-only mydb > mydb_schema.sql

# 使用环境变量传递密码
$env:PGPASSWORD='123456'  # Windows PowerShell
pg_dump -U postgres mydb > backup.sql
```

### pg_dumpall — 所有数据库

```bash
# 备份所有数据库（包含用户和表空间信息）
pg_dumpall -U postgres > all_backup.sql

# 仅备份全局对象（用户、表空间）
pg_dumpall -U postgres --globals-only > globals.sql
```

### 恢复

```bash
# 恢复 SQL 文件
psql -U postgres -d mydb < mydb_backup.sql

# 恢复自定义格式
pg_restore -U postgres -d mydb mydb_backup.dump

# 从 PowerShell 输入
Get-Content .\backup.sql | psql -U postgres -d mydb
```

## PostgreSQL 版本升级

### 方式一：pg_dump + psql（适合小数据量）

```bash
# 1. 备份旧版本数据
pg_dumpall -U postgres > backup.sql

# 2. 安装新版本

# 3. 恢复
psql -U postgres -f backup.sql postgres
```

### 方式二：pg_upgrade（适合大数据量，推荐）

```bash
# Windows PowerShell 示例：从 15 升级到 16
$env:PGPASSWORD = '123456'
pg_upgrade `
  -b "D:\Program Files\PostgreSQL\15\bin" `
  -B "D:\Program Files\PostgreSQL\16\bin" `
  -d "D:\Program Files\PostgreSQL\15\data" `
  -D "D:\Program Files\PostgreSQL\16\data" `
  -U postgres
```

## 练习

```sql
-- 1. 创建博客系统表
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    author_id INT,
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    author VARCHAR(100) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. 插入测试数据
INSERT INTO posts (title, content, author_id, status) VALUES
('PostgreSQL 入门', '内容...', 1, 'published'),
('JSON 高级用法', '内容...', 1, 'published'),
('草稿文章', '内容...', 2, 'draft');

-- 3. 查询已发布文章及其评论数
SELECT
    p.id,
    p.title,
    p.status,
    COUNT(c.id) AS comment_count
FROM posts p
LEFT JOIN comments c ON c.post_id = p.id
WHERE p.status = 'published'
GROUP BY p.id, p.title, p.status
ORDER BY p.id;
```
