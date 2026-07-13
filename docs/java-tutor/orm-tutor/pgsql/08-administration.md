# PostgreSQL 管理维护

> 用户管理、权限控制、备份策略、主从复制等日常运维技能。

## 用户与角色管理

PostgreSQL 通过角色（Role）管理权限，角色既可以作为用户，也可以作为权限组。

### 创建角色

```sql
-- 创建登录用户
CREATE ROLE myuser WITH LOGIN PASSWORD 'mypassword';

-- 创建角色（不能登录，用于权限组）
CREATE ROLE readonly_role;

-- CREATE USER 等同于 CREATE ROLE ... LOGIN
CREATE USER myuser WITH PASSWORD 'mypassword';
```

### 角色属性

```sql
CREATE ROLE myuser WITH
    LOGIN           -- 允许登录
    SUPERUSER       -- 超级用户
    CREATEDB        -- 允许创建数据库
    CREATEROLE      -- 允许创建角色
    REPLICATION     -- 允许流复制
    PASSWORD '123456';

-- 修改属性
ALTER ROLE myuser WITH CREATEDB;
ALTER ROLE myuser WITH NOCREATEDB;  -- 移除

-- 修改密码
ALTER ROLE myuser WITH PASSWORD 'newpassword';
\password myuser  -- 安全方式（不记录历史）
```

### 权限模型

PostgreSQL 权限层级：`实例级 → 数据库级 → Schema 级 → 对象级`

```sql
-- 数据库权限
GRANT CONNECT ON DATABASE testdb TO myuser;
GRANT ALL ON DATABASE testdb TO myuser;

-- Schema 权限
GRANT USAGE ON SCHEMA public TO myuser;
GRANT CREATE ON SCHEMA public TO myuser;

-- 表权限
GRANT SELECT ON TABLE users TO readonly_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;

-- 序列权限（使用自增时需要）
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_user;
```

### 实用权限模板

```sql
-- 只读用户
CREATE USER readonly WITH PASSWORD 'readonly123';
GRANT CONNECT ON DATABASE testdb TO readonly;
GRANT USAGE ON SCHEMA public TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readonly;

-- 读写用户
CREATE USER app_user WITH PASSWORD 'app123';
GRANT CONNECT ON DATABASE testdb TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE ON SEQUENCES TO app_user;
```

### 组角色

```sql
-- 创建组
CREATE ROLE editors WITH NOLOGIN;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO editors;

-- 添加成员
GRANT editors TO alice;
GRANT editors TO bob;

-- 移除成员
REVOKE editors FROM alice;

-- 查看角色
\du
SELECT rolname, rolsuper, rolcreatedb, rolcanlogin FROM pg_roles;
```

## pg_hba.conf 认证

### 配置格式

```conf
# TYPE  DATABASE  USER  ADDRESS  METHOD
local   all       all                     scram-sha-256
host    all       all       127.0.0.1/32  scram-sha-256
host    all       all       0.0.0.0/0     scram-sha-256
```

### 认证方式

| 方式 | 说明 | 安全 |
|------|------|------|
| `trust` | 无需密码 | ❌ |
| `password` | 明文密码 | ❌ |
| `md5` | MD5 加密 | ✅ |
| `scram-sha-256` | SHA-256 加密（推荐）| ✅✅ |
| `peer` | 操作系统用户匹配本地连接 | ✅ |
| `reject` | 拒绝连接 | — |

### 安全配置示例

```conf
# 本地连接
local   all             postgres                           peer
local   all             all                                scram-sha-256

# 本地 TCP
host    all             all             127.0.0.1/32       scram-sha-256

# 内网
host    all             all             192.168.1.0/24     scram-sha-256

# 外网（需 SSL）
hostssl all             all             0.0.0.0/0          scram-sha-256
```

## SSL 配置

```bash
# 生成自签名证书
openssl req -new -text -nodes -subj '/CN=localhost' \
  -keyout server.key -out server.csr
openssl rsa -in server.key -des -out server.key
openssl req -x509 -in server.csr -text -key server.key -out server.crt
chmod 600 server.key

# 复制到数据目录
cp server.crt server.key /var/lib/postgresql/16/data/

# 修改配置
sudo vim /etc/postgresql/16/main/postgresql.conf
```
```conf
ssl = on
ssl_cert_file = 'server.crt'
ssl_key_file = 'server.key'
```

```bash
sudo systemctl restart postgresql
```

## 备份与恢复

### 逻辑备份

```bash
# 单库备份
pg_dump -U postgres -Fc testdb > testdb.dump

# 全库备份
pg_dumpall -U postgres > all.sql

# 恢复
pg_restore -U postgres -d testdb testdb.dump
psql -U postgres -f all.sql postgres
```

### 定时备份脚本

```bash
#!/bin/bash
BACKUP_DIR="/backup/postgres"
DB_NAME="testdb"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"
pg_dump -U postgres "$DB_NAME" | gzip > "$BACKUP_DIR/${DB_NAME}_${DATE}.sql.gz"
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +30 -delete
echo "[$(date)] Backup completed: ${DB_NAME}_${DATE}.sql.gz"
```

```bash
# crontab — 每天凌晨 2 点
0 2 * * * /usr/local/bin/backup_pg.sh
```

## 日常检查

```sql
-- 查看连接数
SELECT count(*) FROM pg_stat_activity;

-- 查看最大连接数
SHOW max_connections;

-- 查看数据库大小
SELECT datname, pg_size_pretty(pg_database_size(datname))
FROM pg_database ORDER BY pg_database_size(datname) DESC;

-- 查看表大小
SELECT relname, pg_size_pretty(pg_total_relation_size(relid))
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC LIMIT 10;

-- 查看最慢的 5 个查询
SELECT pid, now() - query_start AS duration, query, state
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY duration DESC LIMIT 5;
```

## 练习

```sql
-- 1. 创建只读用户 analyst，只能查询 public schema
-- 2. 配置 pg_hba.conf 允许内网 IP 连接
-- 3. 使用 pg_dump 备份 testdb
-- 4. 查看当前数据库中有哪些正在运行的查询
-- 5. 创建一个组角色，将两个用户加入组角色
```
