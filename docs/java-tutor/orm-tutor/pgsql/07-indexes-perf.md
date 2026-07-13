# PostgreSQL 索引与性能优化

> PostgreSQL 支持多种索引类型，合理的索引设计和性能调优能让查询快几十倍。

## 索引类型

| 索引类型 | 关键字 | 适用场景 |
|----------|--------|----------|
| B-tree | 默认 | 等值/范围查询、排序、唯一约束 |
| Hash | `USING HASH` | 等值查询（已少用）|
| GiST | `USING GIST` | 全文检索、几何类型、范围类型 |
| GIN | `USING GIN` | JSONB、数组、全文检索 |
| BRIN | `USING BRIN` | 大数据量、天然有序的数据 |
| SP-GiST | `USING SPGIST` | 空间数据、分区树 |

### 创建索引

```sql
-- B-tree（默认，最常用）
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_age ON users(age);

-- 唯一索引
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- 复合索引
CREATE INDEX idx_users_age_name ON users(age, name);

-- 部分索引（只索引满足条件的数据）
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';

-- 表达式索引
CREATE INDEX idx_users_lower_email ON users(LOWER(email));
SELECT * FROM users WHERE LOWER(email) = 'test@test.com';  -- 走索引

-- GIN 索引（JSONB / 数组）
CREATE INDEX idx_products_attrs ON products USING GIN (attributes);
CREATE INDEX idx_articles_tags ON articles USING GIN (tags);

-- BRIN 索引（适合时序数据）
CREATE INDEX idx_orders_created ON orders USING BRIN (created_at);
```

## EXPLAIN 分析查询

```sql
-- 查看查询计划（不执行）
EXPLAIN SELECT * FROM users WHERE email = 'test@test.com';

-- 执行并查看实际时间
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@test.com';

-- 更详细的计划
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) SELECT * FROM users WHERE email = 'test@test.com';
```

### 关键指标

| 指标 | 说明 |
|------|------|
| `Seq Scan` | 全表扫描（慢）|
| `Index Scan` | 索引扫描后回表 |
| `Index Only Scan` | 覆盖索引（不回表，最快）|
| `Bitmap Index Scan` | 位图索引扫描 |
| `rows` | 预计扫描行数 |
| `cost` | 启动成本..总成本（越小越快）|
| `actual time` | 实际耗时（毫秒）|

### 优化示例

```sql
-- ❌ 全表扫描（无索引）
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'a@b.com';
-- Seq Scan, rows=100000, time=85ms

-- ✅ 建索引后
CREATE INDEX idx_users_email ON users(email);
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'a@b.com';
-- Index Scan, rows=1, time=0.05ms

-- ❌ 排序未走索引
EXPLAIN ANALYZE SELECT * FROM users ORDER BY created_at DESC;
-- Sort, time=120ms

-- ✅ 排序走索引
CREATE INDEX idx_users_created ON users(created_at DESC);
EXPLAIN ANALYZE SELECT * FROM users ORDER BY created_at DESC;
-- Index Only Scan Backward, time=2ms
```

## SQL 优化技巧

```sql
-- 1. 避免在索引列上使用函数
-- ❌
SELECT * FROM users WHERE EXTRACT(YEAR FROM created_at) = 2024;
-- ✅
SELECT * FROM users WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';

-- 2. 使用覆盖索引
-- 查询只返回 name 和 email
-- 索引: CREATE INDEX idx_users_name_email ON users(username, email)
SELECT username, email FROM users WHERE username = '张三';
-- 从索引直接返回，无需回表

-- 3. 分页优化（避免大 OFFSET）
-- ❌（越翻越慢）
SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 100000;
-- ✅
SELECT * FROM users WHERE id > 100000 ORDER BY id LIMIT 10;

-- 4. 使用 JOIN 替代子查询
-- ❌
SELECT * FROM users WHERE id IN (SELECT user_id FROM orders);
-- ✅
SELECT DISTINCT u.* FROM users u JOIN orders o ON u.id = o.user_id;

-- 5. 使用 ANALYZE 更新统计信息
ANALYZE users;
```

## 配置优化

```conf
# 内存（物理内存的 25%）
shared_buffers = 2GB

# 排序/哈希内存（每个操作）
work_mem = 64MB

# 维护操作内存（VACUUM、CREATE INDEX）
maintenance_work_mem = 512MB

# 缓存查询计划
shared_plan_cache = 8MB

# 写入缓冲区
wal_buffers = 16MB

# 检查点间隔
checkpoint_timeout = 15min
checkpoint_completion_target = 0.9

# WAL 日志大小
max_wal_size = 4GB
min_wal_size = 1GB

# 最大连接数
max_connections = 100

# 并行查询
max_parallel_workers_per_gather = 4
```

### 不同场景推荐配置

| 内存 | shared_buffers | work_mem | max_connections |
|------|---------------|----------|----------------|
| 4GB | 1GB | 32MB | 50 |
| 8GB | 2GB | 64MB | 100 |
| 16GB | 4GB | 128MB | 200 |
| 32GB | 8GB | 256MB | 500 |

## VACUUM 与维护

PostgreSQL 的 MVCC 机制会产生"死元组"，需要定期清理：

```sql
-- 查看表死元组
SELECT
    relname,
    n_dead_tup,
    n_live_tup,
    round(n_dead_tup * 100.0 / nullif(n_live_tup + n_dead_tup, 0), 2) AS dead_pct,
    last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;

-- 手动 VACUUM
VACUUM users;                    -- 回收空间（不影响读写）
VACUUM ANALYZE users;            -- 回收 + 更新统计
VACUUM FULL users;               -- 彻底整理（会锁表，慎用）

-- 自动 VACUUM 配置（默认开启）
-- autovacuum = on
-- autovacuum_naptime = 1min
-- autovacuum_vacuum_scale_factor = 0.2
```

## 性能监控查询

```sql
-- 查看运行中的查询
SELECT pid, age(now(), query_start) AS duration, state, query
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY duration DESC;

-- 查看表大小排名
SELECT
    relname,
    pg_size_pretty(pg_total_relation_size(relid)) AS total_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC
LIMIT 10;

-- 查看索引使用情况
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan ASC;

-- 查看锁等待
SELECT blocked_locks.pid AS blocked_pid,
       blocked_activity.query AS blocked_query
FROM pg_locks blocked_locks
JOIN pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid;

-- 终止慢查询
SELECT pg_cancel_backend(pid);      -- 取消查询
SELECT pg_terminate_backend(pid);   -- 终止连接
```

## 连接池配置

```yaml
# Spring Boot HikariCP 配置
spring:
  datasource:
    hikari:
      maximum-pool-size: 10
      minimum-idle: 2
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
      connection-test-query: SELECT 1
```

## 练习

```sql
-- 1. 为 orders 表创建合适的索引
--    - user_id 上的索引
--    - (status, created_at) 复合索引
--    - 只索引 status = 'pending' 的部分索引

-- 2. 使用 EXPLAIN ANALYZE 分析以下查询
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 1 ORDER BY created_at DESC LIMIT 10;

-- 3. 查找当前数据库中最大的 5 张表
-- 4. 查看当前正在运行的查询
```
