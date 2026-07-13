# PostgreSQL 性能调优与配置

> PostgreSQL 的性能取决于合理的配置和索引设计。掌握这些优化技巧，让你的数据库跑得更快。

## postgresql.conf 核心配置

配置文件位置：`/etc/postgresql/16/main/postgresql.conf` 或 `PGDATA/postgresql.conf`

### 内存配置

```conf
# 共享缓冲区（通常设为物理内存的 25%）
shared_buffers = 2GB

# 排序/哈希操作使用的内存（每个操作）
work_mem = 64MB

# 维护操作内存（VACUUM、CREATE INDEX）
maintenance_work_mem = 512MB

# 缓存查询计划
shared_plan_cache = 8MB

# 写入缓冲区
wal_buffers = 16MB

# 并行查询（每个查询最多使用的 CPU）
max_parallel_workers_per_gather = 4
parallel_setup_cost = 1000
parallel_tuple_cost = 0.1
```

### 磁盘写入配置

```conf
# 推荐 SSD 设置为 ON，HDD 设置为 OFF
synchronous_commit = on

# 检查点间隔
checkpoint_timeout = 15min
checkpoint_completion_target = 0.9

# WAL 日志大小
max_wal_size = 4GB
min_wal_size = 1GB

# 写入方式（SSD 推荐 direct）
wal_init_zero = on
wal_recycle = on
```

### 连接配置

```conf
# 最大连接数（每个连接约占用 2MB）
max_connections = 100

# 保留给超级用户的连接数
superuser_reserved_connections = 3
```

### 自动清理配置

```conf
# 自动 VACUUM
autovacuum = on
autovacuum_naptime = 1min
autovacuum_max_workers = 3

# 何时触发 VACUUM（表中有 20% + 50 行被修改时）
autovacuum_vacuum_scale_factor = 0.2
autovacuum_vacuum_threshold = 50

# 何时触发 ANALYZE
autovacuum_analyze_scale_factor = 0.1
autovacuum_analyze_threshold = 50
```

### 不同场景的推荐配置

| 场景 | 内存 | shared_buffers | work_mem | max_connections |
|------|------|---------------|----------|----------------|
| 个人开发（4GB RAM） | 4GB | 1GB | 32MB | 20 |
| 小型应用（8GB RAM） | 8GB | 2GB | 64MB | 50 |
| 中型应用（16GB RAM） | 16GB | 4GB | 128MB | 100 |
| 大型应用（32GB RAM） | 32GB | 8GB | 256MB | 200 |

### 查看当前配置

```sql
-- 查看当前配置值
SHOW shared_buffers;
SHOW work_mem;
SHOW max_connections;

-- 查看所有配置（含默认值）
SELECT name, setting, unit, context FROM pg_settings
WHERE category = 'Resource Usage / Memory';

-- 查看需要重启才能生效的配置
SELECT name, setting FROM pg_settings WHERE pending_restart = true;
```

## EXPLAIN 查询分析

### 使用 EXPLAIN

```sql
-- 查看查询计划（不执行）
EXPLAIN SELECT * FROM users WHERE email = 'test@test.com';

-- 执行并查看实际时间
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@test.com';

-- 查看更详细的计划
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) SELECT * FROM users WHERE email = 'test@test.com';
```

### 扫描方式

| 方式 | 说明 | 速度 |
|------|------|------|
| `Seq Scan` | 全表扫描（从头到尾） | 慢 ❌ |
| `Index Scan` | 索引扫描（找到行再回表） | 快 ✅ |
| `Index Only Scan` | 索引覆盖扫描（不回表） | 最快 ✅✅ |
| `Bitmap Index Scan` | 位图索引扫描（用于多个索引组合） | 中等 |

### 优化示例

```sql
-- ❌ 全表扫描（未建索引）
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'a@b.com';
-- Seq Scan on users (cost=0.00..734.00 rows=1 width=42)

-- ✅ 创建索引后变为索引扫描
CREATE INDEX idx_users_email ON users(email);
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'a@b.com';
-- Index Scan using idx_users_email (cost=0.28..8.29 rows=1 width=42)

-- ❌ 排序不走索引
EXPLAIN ANALYZE SELECT * FROM users ORDER BY created_at DESC;
-- Sort (cost=1000.00..1200.00 rows=10000 width=42)

-- ✅ 排序走索引
CREATE INDEX idx_users_created_at ON users(created_at DESC);
```

### 常见优化场景

```sql
-- 1. LIMIT + OFFSET 分页优化
-- ❌ 慢（OFFSET 越大越慢，需要扫描所有跳过的行）
EXPLAIN ANALYZE SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 100000;

-- ✅ 快（利用索引跳过）
EXPLAIN ANALYZE SELECT * FROM users
WHERE id > 100000 ORDER BY id LIMIT 10;

-- 2. JOIN 优化（确保关联字段有索引）
-- 在 foreign key 字段上建索引（PostgreSQL 不会自动建立外键索引）
CREATE INDEX idx_posts_author_id ON posts(author_id);

-- 3. 避免 WHERE 中使用函数（索引会失效）
-- ❌
EXPLAIN ANALYZE SELECT * FROM users WHERE DATE(created_at) = '2024-01-15';
-- ✅
EXPLAIN ANALYZE SELECT * FROM users
WHERE created_at >= '2024-01-15' AND created_at < '2024-01-16';
```

## 字符集与编码

```sql
-- 查看数据库编码
\l

-- 查看客户端编码
SHOW client_encoding;

-- 设置编码
SET client_encoding TO 'UTF8';

-- Windows 命令行下编码问题（出现乱码时）
-- 先切换代码页
chcp 65001  -- UTF-8
chcp 936    -- GBK

-- 创建数据库时指定编码
CREATE DATABASE mydb WITH ENCODING 'UTF8' LC_COLLATE 'zh_CN.UTF-8' LC_CTYPE 'zh_CN.UTF-8';
```

## 时区处理

```sql
-- 查看当前时区
SHOW timezone;

-- 设置会话时区
SET timezone TO 'Asia/Shanghai';
SET timezone TO 'UTC';

-- 数据库级别时区
ALTER DATABASE mydb SET timezone TO 'Asia/Shanghai';

-- 时间戳类型选择
-- TIMESTAMP → 对应 Java LocalDateTime（不存时区）
-- TIMESTAMPTZ → 对应 Java Instant（存 UTC，查询时转为当前时区）

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_name TEXT,
    -- 如果不需要时区转换（如记录的本地时间）
    local_time TIMESTAMP,
    -- 如果需要自动时区转换（如用户操作时间）
    utc_time TIMESTAMPTZ
);
```

## 连接池配置

### HikariCP（Spring Boot 默认）

```yaml
spring:
  datasource:
    hikari:
      # 核心配置
      maximum-pool-size: 10        # 最大连接数
      minimum-idle: 2               # 最小空闲连接
      connection-timeout: 30000     # 获取连接超时（毫秒）
      idle-timeout: 600000          # 空闲超时（10分钟）
      max-lifetime: 1800000         # 最大存活时间（30分钟）

      # PostgreSQL 推荐设置
      connection-test-query: SELECT 1
      validation-timeout: 3000
      leak-detection-threshold: 60000  # 连接泄漏检测
```

### 查看连接池状态

```sql
-- 查看当前连接数
SELECT count(*) FROM pg_stat_activity;

-- 查看每个连接的来源
SELECT
    pid,
    usename,
    application_name,
    client_addr,
    state,
    query_start
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY query_start;
```

## VACUUM 与维护

### 为什么需要 VACUUM？

PostgreSQL 的 MVCC 机制会产生"死元组"（dead tuples），需要定期清理释放空间。

```sql
-- 查看表死元组数量
SELECT
    relname,
    n_dead_tup,
    n_live_tup,
    round(n_dead_tup * 100.0 / nullif(n_live_tup + n_dead_tup, 0), 2) AS dead_pct,
    last_autovacuum,
    last_autoanalyze
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;

-- 手动 VACUUM
VACUUM users;                        -- 回收空间（不影响读写）
VACUUM ANALYZE users;                -- 回收空间 + 更新统计信息
VACUUM FULL users;                   -- 彻底整理（会锁表，谨慎使用！）

-- 查看表大小变化
SELECT pg_size_pretty(pg_total_relation_size('users'));
```

### 自动 VACUUM

确保 `autovacuum = on`（默认开启）。自动 VACUUM 是 PostgreSQL 的一大优势，无需像 MySQL 那样手动执行 optimize。

## 常见问题排查

### 连接被拒绝

```
FATAL: no pg_hba.conf entry for host "192.168.1.100"
```

在 `pg_hba.conf` 添加：

```conf
host all all 0.0.0.0/0 scram-sha-256
```

### 查询突然变慢

```sql
-- 1. 查看是否有锁等待
SELECT * FROM pg_stat_activity WHERE wait_event IS NOT NULL;

-- 2. 分析表更新统计信息
ANALYZE users;

-- 3. 查看是否有大量死元组
SELECT relname, n_dead_tup FROM pg_stat_user_tables ORDER BY n_dead_tup DESC;

-- 4. 检查索引是否需要重建
REINDEX TABLE users;
```

### 连接数耗尽

```sql
-- 查看当前连接数
SELECT count(*) FROM pg_stat_activity;

-- 查看最大连接数
SHOW max_connections;

-- 终止空闲连接
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'idle'
  AND backend_start < NOW() - INTERVAL '1 hour';
```

### 磁盘空间不足

```sql
-- 查看数据库大小排名
SELECT
    datname,
    pg_size_pretty(pg_database_size(datname)) AS size
FROM pg_database
ORDER BY pg_database_size(datname) DESC;

-- 查看表大小排名
SELECT
    relname,
    pg_size_pretty(pg_total_relation_size(relid)) AS total_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC
LIMIT 10;
```

## 练习

```sql
-- 1. 查看当前数据库中哪个表最大
-- 2. 找到执行时间最长的查询
-- 3. 分析一个慢查询并用 EXPLAIN 找出问题
-- 4. 检查 autovacuum 是否正常工作
```
