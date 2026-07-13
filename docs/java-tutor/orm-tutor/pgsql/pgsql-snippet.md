# PostgreSQL 实用 SQL 片段

> 日常开发中常用的查询脚本和实用技巧。

## 系统信息查询

```sql
-- PostgreSQL 版本
SELECT version();

-- 数据库列表
SELECT datname, pg_size_pretty(pg_database_size(datname)) AS size
FROM pg_database
ORDER BY pg_database_size(datname) DESC;

-- 表大小排名
SELECT
    relname AS table_name,
    pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
    pg_size_pretty(pg_relation_size(relid)) AS data_size,
    pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) AS index_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC
LIMIT 10;

-- 当前连接数
SELECT count(*) FROM pg_stat_activity;

-- 当前运行的查询
SELECT pid, age(now(), query_start) AS duration, state, query
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY duration DESC;

-- 锁等待
SELECT
    blocked_locks.pid AS blocked_pid,
    blocked_activity.query AS blocked_query,
    blocking_locks.pid AS blocking_pid,
    blocking_activity.query AS blocking_query
FROM pg_locks blocked_locks
JOIN pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid
JOIN pg_locks blocking_locks ON blocking_locks.locktype = blocked_locks.locktype
    AND blocking_locks.database IS NOT DISTINCT FROM blocked_locks.database
    AND blocking_locks.relation IS NOT DISTINCT FROM blocked_locks.relation
    AND blocking_locks.page IS NOT DISTINCT FROM blocked_locks.page
    AND blocking_locks.tuple IS NOT DISTINCT FROM blocked_locks.tuple
    AND blocking_locks.virtualxid IS NOT DISTINCT FROM blocked_locks.virtualxid
    AND blocking_locks.transactionid IS NOT DISTINCT FROM blocked_locks.transactionid
    AND blocking_locks.classid IS NOT DISTINCT FROM blocked_locks.classid
    AND blocking_locks.objid IS NOT DISTINCT FROM blocked_locks.objid
    AND blocking_locks.objsubid IS NOT DISTINCT FROM blocked_locks.objsubid
    AND blocking_locks.pid != blocked_locks.pid
JOIN pg_stat_activity blocking_activity ON blocking_activity.pid = blocking_locks.pid;
```

## 序列管理

```sql
-- 查看所有序列
SELECT * FROM pg_class WHERE relkind = 'S';

-- 查看序列当前值
SELECT currval('user_id_seq');

-- 查看序列下一个值（不会实际递进）
SELECT last_value, is_called FROM user_id_seq;

-- 设置序列起始值
ALTER SEQUENCE user_id_seq RESTART WITH 1000;

-- 将序列设置到当前最大 id
SELECT setval('user_id_seq', (SELECT COALESCE(max(id), 1) FROM users));

-- 删除所有序列（谨慎使用）
DO $$
DECLARE
    seq_record RECORD;
BEGIN
    FOR seq_record IN
        SELECT sequence_name
        FROM information_schema.sequences
        WHERE table_schema = 'public'
    LOOP
        EXECUTE 'DROP SEQUENCE IF EXISTS ' || quote_ident(seq_record.sequence_name) || ' CASCADE;';
    END LOOP;
END $$;
```

## 信息Schema查询

```sql
-- 查询所有表和注释
SELECT
    t.table_name,
    pg_catalog.obj_description(pgc.oid, 'pg_class') AS table_comment
FROM information_schema.tables t
JOIN pg_catalog.pg_class pgc ON t.table_name = pgc.relname
WHERE t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE';

-- 查询表的所有列信息
SELECT
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'users'
ORDER BY ordinal_position;

-- 查询表的外键关系
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS referenced_table,
    ccu.column_name AS referenced_column
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu
    ON tc.constraint_name = ccu.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema = 'public';

-- 查询所有索引及其定义
SELECT
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

## 索引管理

```sql
-- 创建索引（避免锁表）
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);

-- 查看索引使用情况
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan ASC;

-- 重建索引
REINDEX INDEX idx_users_email;
REINDEX TABLE users;

-- 删除未使用的索引
DROP INDEX IF EXISTS idx_unused;
```

## 窗口函数片段

```sql
-- 分组取前 N 条
SELECT * FROM (
    SELECT *,
        ROW_NUMBER() OVER (PARTITION BY class_id ORDER BY score DESC) AS rn
    FROM students
) ranked
WHERE rn <= 3;

-- 累计求和
SELECT
    order_date,
    amount,
    SUM(amount) OVER (ORDER BY order_date) AS running_total
FROM orders;

-- 环比计算
SELECT
    order_date,
    amount,
    LAG(amount) OVER (ORDER BY order_date) AS prev_day,
    ROUND(
        (amount - LAG(amount) OVER (ORDER BY order_date)) * 100.0 /
        NULLIF(LAG(amount) OVER (ORDER BY order_date), 0), 2
    ) AS growth_pct
FROM orders;
```

## 递归查询

```sql
-- 查询部门树
WITH RECURSIVE dept_tree AS (
    -- 顶级部门
    SELECT id, name, parent_id, 1 AS level, name::TEXT AS path
    FROM departments WHERE parent_id IS NULL

    UNION ALL

    -- 子部门
    SELECT d.id, d.name, d.parent_id, dt.level + 1,
           dt.path || ' -> ' || d.name
    FROM departments d
    JOIN dept_tree dt ON d.parent_id = dt.id
)
SELECT * FROM dept_tree ORDER BY path;

-- 生成连续日期序列（生成从今天起未来 30 天）
SELECT generate_series(
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '30 days',
    INTERVAL '1 day'
)::DATE AS date;
```

## JSON/JSONB 操作

```sql
-- 展开 JSON 数组为行
SELECT
    id,
    jsonb_array_elements(tags) AS tag
FROM posts;

-- 按 JSON 字段排序
SELECT * FROM products
ORDER BY (attributes ->> 'price')::NUMERIC DESC;

-- 更新 JSON 字段
UPDATE products
SET attributes = jsonb_set(attributes, '{price}', '5999', false)
WHERE id = 1;

-- 删除 JSON 字段
UPDATE products SET attributes = attributes - 'old_field';
```

## 数据迁移

```sql
-- 复制表结构
CREATE TABLE users_backup (LIKE users INCLUDING ALL);

-- 复制表结构和数据
CREATE TABLE users_backup AS TABLE users;

-- 插入数据从另一张表
INSERT INTO archive_posts (id, title, content, created_at)
SELECT id, title, content, created_at
FROM posts
WHERE created_at < '2023-01-01';

-- 批量更新（使用临时表）
UPDATE users SET score = t.new_score
FROM (VALUES (1, 95), (2, 88), (3, 76)) AS t(id, new_score)
WHERE users.id = t.id;
```

## 日常维护

```sql
-- 手动 VACUUM（回收空间）
VACUUM;
VACUUM ANALYZE;
VACUUM FULL;        -- 谨慎使用，会锁表

-- 分析表（更新统计信息）
ANALYZE;
ANALYZE users;

-- 查看表是否需要 VACUUM
SELECT
    relname,
    n_dead_tup,
    n_live_tup,
    round(n_dead_tup * 100.0 / nullif(n_live_tup, 0), 2) AS dead_pct
FROM pg_stat_user_tables
WHERE n_dead_tup > 0
ORDER BY n_dead_tup DESC;

-- 终止慢查询
SELECT pg_cancel_backend(pid);     -- 取消查询（温和）
SELECT pg_terminate_backend(pid);  -- 终止连接（强制）
```
