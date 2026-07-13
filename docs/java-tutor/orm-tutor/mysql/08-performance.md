# MySQL 性能优化

> 从配置、索引、SQL 语句到架构层面，全面提升 MySQL 性能。

## 配置文件优化

MySQL 配置文件位置：`/etc/mysql/my.cnf` 或 `C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`

```ini
[mysqld]
# ====== 连接配置 ======
max_connections = 200              # 最大连接数
max_connect_errors = 100           # 最大错误连接数

# ====== 内存配置 ======
innodb_buffer_pool_size = 2G       # InnoDB 缓冲池（物理内存的 60-70%）
innodb_log_file_size = 512M        # 事务日志大小
innodb_log_buffer_size = 16M       # 日志缓冲区
sort_buffer_size = 4M              # 排序缓冲区
join_buffer_size = 4M              # JOIN 缓冲区
read_buffer_size = 2M              # 读缓冲区

# ====== 写入配置 ======
innodb_flush_log_at_trx_commit = 2 # 0=最快但丢失1秒数据, 1=最安全, 2=折中
innodb_flush_method = O_DIRECT

# ====== 日志配置 ======
slow_query_log = ON                # 开启慢查询日志
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2                # 超过 2 秒的 SQL

# ====== 其他 ======
character_set_server = utf8mb4
collation_server = utf8mb4_unicode_ci
```

### 不同场景推荐配置

| 内存 | `innodb_buffer_pool_size` | `max_connections` |
|------|--------------------------|-------------------|
| 2 GB | 1 GB | 100 |
| 4 GB | 2.5 GB | 200 |
| 8 GB | 5 GB | 500 |
| 16 GB | 10 GB | 1000 |
| 32 GB | 20 GB | 2000 |

## SQL 优化技巧

### 索引优化

```sql
-- 1. 为 WHERE 和 JOIN 字段加索引
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- 2. 复合索引最左前缀
-- 索引 (a, b, c) 可以用在：a, a+b, a+b+c
-- 不能用在：b, c, b+c

-- 3. 覆盖索引（查询字段都在索引中）
-- 索引: INDEX(status, created_at)
-- 查询:
SELECT COUNT(*) FROM orders WHERE status = 'pending' AND created_at > '2024-01-01';
-- 直接从索引返回，无需访问数据行
```

### SQL 写法优化

```sql
-- 1. 避免 SELECT *
-- ❌
SELECT * FROM users;
-- ✅（只取需要字段）
SELECT id, username FROM users;

-- 2. 分页优化（大 OFFSET 问题）
-- ❌ 越翻越慢
SELECT * FROM orders ORDER BY id LIMIT 100000, 20;
-- ✅ 用 ID 定位
SELECT * FROM orders WHERE id > 100000 ORDER BY id LIMIT 20;

-- 3. 用 JOIN 替代子查询
-- ❌ 子查询
SELECT * FROM users WHERE id IN (SELECT user_id FROM orders);
-- ✅ JOIN
SELECT DISTINCT u.* FROM users u JOIN orders o ON u.id = o.user_id;

-- 4. 用 UNION ALL 替代 UNION（无需去重时）
-- ❌ UNION 会去重排序
SELECT name FROM users UNION SELECT name FROM admins;
-- ✅ UNION ALL 更高效
SELECT name FROM users UNION ALL SELECT name FROM admins;

-- 5. 使用 LIMIT 限制结果集
SELECT * FROM users WHERE status = 1 LIMIT 10;
```

### 常见反模式

```sql
-- ❌ 在索引列上使用函数
WHERE YEAR(created_at) = 2024
-- ✅ 改为范围
WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'

-- ❌ 隐式类型转换
WHERE phone = 13800138000  -- phone 是 VARCHAR
-- ✅ 显式使用字符串
WHERE phone = '13800138000'

-- ❌ 前导模糊查询
WHERE name LIKE '%keyword%'
-- ✅ 使用全文索引
WHERE MATCH(name) AGAINST('keyword')

-- ❌ OR 导致索引失效
WHERE id = 1 OR age = 25
-- ✅ 改为 UNION
SELECT * FROM users WHERE id = 1 UNION SELECT * FROM users WHERE age = 25
```

## 表结构优化

```sql
-- 1. 选择合适的数据类型
-- ❌ 用 BIGINT 存年龄
age BIGINT
-- ✅
age TINYINT UNSIGNED

-- ❌ 用 TEXT 存固定短文本
status TEXT
-- ✅
status CHAR(10)

-- 2. 拆分大表（垂直分割）
-- 把不常用的字段放到扩展表
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100)
);

CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,
    avatar VARCHAR(200),
    signature TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 3. 归档历史数据
CREATE TABLE orders_2023 LIKE orders;
INSERT INTO orders_2023 SELECT * FROM orders WHERE created_at < '2024-01-01';
DELETE FROM orders WHERE created_at < '2024-01-01';
```

## 分区表

```sql
-- 范围分区（适合按日期）
CREATE TABLE orders (
    id INT NOT NULL,
    user_id INT,
    total DECIMAL(10,2),
    created_at DATE
)
PARTITION BY RANGE (YEAR(created_at)) (
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- 查询特定分区
SELECT * FROM orders PARTITION (p2024);

-- 查看分区信息
SELECT * FROM information_schema.PARTITIONS WHERE TABLE_NAME = 'orders';
```

## 读写分离

读写分离通过主库写、从库读来分摊压力：

```
应用层
  │
  ├── 写操作 → 主库（Master）
  │              │
  │              └──→ 从库1（Slave）—— 读操作
  └── 读操作 →     从库2（Slave）—— 读操作
                   从库3（Slave）—— 读操作
```

### Spring Boot 读写分离

```yaml
spring:
  datasource:
    dynamic:
      primary: master
      datasource:
        master:
          url: jdbc:mysql://192.168.1.1:3306/db
          username: root
          password: 123456
        slave:
          url: jdbc:mysql://192.168.1.2:3306/db
          username: root
          password: 123456
```

## 常用性能查询

```sql
-- 查看当前连接数
SHOW STATUS LIKE 'Threads_connected';

-- 查看最大连接数
SHOW VARIABLES LIKE 'max_connections';

-- 查看查询缓存命中率
SHOW STATUS LIKE 'Qcache%';

-- 查看 InnoDB 状态
SHOW ENGINE INNODB STATUS\G

-- 查看正在运行的查询
SHOW PROCESSLIST;
SELECT * FROM information_schema.PROCESSLIST WHERE COMMAND != 'Sleep';

-- 查看表大小
SELECT
    TABLE_NAME,
    TABLE_ROWS,
    ROUND(DATA_LENGTH / 1024 / 1024, 2) AS data_size_mb,
    ROUND(INDEX_LENGTH / 1024 / 1024, 2) AS index_size_mb
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'testdb'
ORDER BY DATA_LENGTH DESC;

-- 查看最慢的 5 条查询
SELECT * FROM mysql.slow_log ORDER BY query_time DESC LIMIT 5;
```

## 练习

```sql
-- 1. 开启慢查询日志，设置阈值为 2 秒
-- 2. 使用 EXPLAIN 分析一个慢查询，找出缺少的索引
-- 3. 优化一个分页查询（大 OFFSET）
-- 4. 使用 SHOW PROCESSLIST 找出正在运行的查询
-- 5. 查看 testdb 中最大的 3 张表
```
