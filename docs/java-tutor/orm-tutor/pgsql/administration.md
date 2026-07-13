# 管理 PostgreSQL — 用户、角色与权限

> PostgreSQL 通过角色（Role）管理权限，角色即可以是用户也可以是一组权限。

## 用户与角色管理

### 创建角色/用户

```sql
-- 创建登录角色（用户）
CREATE ROLE myuser WITH LOGIN PASSWORD 'mypassword';

-- 创建超级用户
CREATE ROLE admin WITH LOGIN SUPERUSER PASSWORD 'admin123';

-- 创建角色（不能登录，用于权限组）
CREATE ROLE readonly_user;

-- 创建用户（CREATE USER 等同于 CREATE ROLE ... LOGIN）
CREATE USER myuser WITH PASSWORD 'mypassword';
```

### 常用角色属性

```sql
-- 创建具有多个属性的角色
CREATE ROLE myuser WITH
    LOGIN           -- 允许登录
    SUPERUSER       -- 超级用户（拥有所有权限）
    CREATEDB        -- 允许创建数据库
    CREATEROLE      -- 允许创建角色
    REPLICATION     -- 允许流复制
    PASSWORD '123456';

-- 修改角色属性
ALTER ROLE myuser WITH CREATEDB;
ALTER ROLE myuser WITH NOCREATEDB;  -- 移除权限

-- 重命名角色
ALTER ROLE myuser RENAME TO newuser;

-- 修改密码
ALTER ROLE myuser WITH PASSWORD 'newpassword';

-- 安全地修改密码（推荐，避免密码出现在历史记录）
\password myuser
-- 系统会提示输入新密码（两次）
```

### 删除角色

```sql
-- 删除前需要将对象的拥有权转移
REASSIGN OWNED BY old_user TO new_user;
DROP OWNED BY old_user;  -- 删除该角色拥有的对象

-- 删除角色
DROP ROLE old_user;
```

## 权限管理

### 权限模型

PostgreSQL 的权限层级：

```
实例级 → 数据库级 → Schema级 → 对象级（表、视图、函数等）
```

### 数据库权限

```sql
-- 授予数据库连接权限
GRANT CONNECT ON DATABASE mydb TO myuser;

-- 授予创建 Schema 权限
GRANT CREATE ON DATABASE mydb TO myuser;

-- 授予所有权限
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
```

### Schema 权限

```sql
-- 授予 Schema 使用权限（访问表的前提）
GRANT USAGE ON SCHEMA public TO myuser;

-- 授予 Schema 创建权限
GRANT CREATE ON SCHEMA public TO myuser;

-- 授予所有权限
GRANT ALL PRIVILEGES ON SCHEMA public TO myuser;
```

### 表权限

```sql
-- 基础权限
GRANT SELECT ON TABLE users TO readonly_user;
GRANT INSERT, UPDATE, DELETE ON TABLE users TO editor_user;

-- 授予所有权限
GRANT ALL PRIVILEGES ON TABLE users TO admin_user;

-- 授予整张表的所有列
GRANT SELECT (id, name) ON TABLE users TO readonly_user;  -- 只允许查看部分列
```

### 序列权限

```sql
-- 使用 SERIAL / IDENTITY 自增时需要授予序列权限
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO myuser;
```

### 默认权限

```sql
-- 设置默认权限：以后新建的表自动授予权限
ALTER DEFAULT PRIVILEGES FOR ROLE admin IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO myuser;

ALTER DEFAULT PRIVILEGES FOR ROLE admin IN SCHEMA public
    GRANT USAGE ON SEQUENCES TO myuser;
```

### 实用权限模板

```sql
-- 只读用户（最常用）
CREATE ROLE readonly WITH LOGIN PASSWORD 'readonly123';
GRANT CONNECT ON DATABASE mydb TO readonly;
GRANT USAGE ON SCHEMA public TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readonly;

-- 读写用户
CREATE ROLE readwrite WITH LOGIN PASSWORD 'readwrite123';
GRANT CONNECT ON DATABASE mydb TO readwrite;
GRANT USAGE ON SCHEMA public TO readwrite;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO readwrite;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO readwrite;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO readwrite;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE ON SEQUENCES TO readwrite;

-- 管理员用户
CREATE ROLE appadmin WITH LOGIN PASSWORD 'admin123' CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE mydb TO appadmin;
```

### 查看权限

```sql
-- 查看角色/用户
\du
SELECT rolname, rolsuper, rolcreatedb, rolcanlogin FROM pg_roles;

-- 查看某张表的权限
\dp users
SELECT * FROM information_schema.table_privileges WHERE table_name = 'users';

-- 查看我的权限
SELECT * FROM information_schema.table_privileges
WHERE grantee = current_user;
```

## 组角色

```sql
-- 创建组角色（不能登录）
CREATE ROLE editors WITH NOLOGIN;

-- 给组角色授权
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO editors;

-- 将用户加入组（继承组角色的权限）
GRANT editors TO alice;
GRANT editors TO bob;

-- 此时 alice 和 bob 自动拥有了 editors 的全部权限

-- 从组中移除用户
REVOKE editors FROM alice;

-- 查看组角色的成员
\du editors
```

## pg_hba.conf 认证详解

`pg_hba.conf` 控制客户端认证方式，文件位置：

- Linux: `/etc/postgresql/16/main/pg_hba.conf`
- Windows: `C:\Program Files\PostgreSQL\16\data\pg_hba.conf`

### 配置格式

```
# TYPE  DATABASE  USER  ADDRESS  METHOD
TYPE    数据库    用户    IP地址   认证方式
```

### 认证方式

| 方式 | 说明 | 安全级别 |
|------|------|----------|
| `trust` | 无需密码 | ❌ 不安全 |
| `password` | 明文密码 | ❌ 明文传输 |
| `md5` | MD5 加密密码 | ✅ 较安全 |
| `scram-sha-256` | SHA-256 加密（推荐） | ✅✅ 最安全 |
| `ident` | 操作系统用户认证 | ✅ 本地网络 |
| `peer` | 操作系统用户名匹配 | ✅ 本地连接 |
| `reject` | 拒绝连接 | — |

### 常用配置

```conf
# 本地连接（使用 Unix 套接字）
# 使用 peer 方式，需要系统用户名和 PostgreSQL 用户名一致
local   all             all                                     peer

# 本地连接（IPv4 回环地址）— 使用密码
host    all             all             127.0.0.1/32            scram-sha-256

# 局域网连接（192.168.1.0/24）
host    all             all             192.168.1.0/24          scram-sha-256

# 所有 IP — 使用强密码认证
host    all             all             0.0.0.0/0               scram-sha-256

# 只允许特定用户访问特定数据库
host    mydb            appuser         10.0.0.0/8              md5

# 拒绝某个 IP 的连接
host    all             all             10.0.0.100/32           reject
```

### 配置示例

```conf
# 开发环境（密码认证）
local   all             all                                     md5
host    all             all             127.0.0.1/32            md5
host    all             all             0.0.0.0/0               md5

# 生产环境（强密码 + SSL）
local   all             postgres                                peer
local   all             all                                     scram-sha-256
host    all             all             127.0.0.1/32            scram-sha-256
hostssl all             all             0.0.0.0/0               scram-sha-256
```

## SSL 配置

```bash
# 1. 生成自签名证书
openssl req -new -text -nodes -subj '/CN=localhost' \
  -keyout server.key -out server.csr
openssl rsa -in server.key -des -out server.key
openssl req -x509 -in server.csr -text -key server.key -out server.crt
chmod 600 server.key

# 2. 复制到 PostgreSQL 数据目录
cp server.crt server.key /var/lib/postgresql/16/data/

# 3. 修改 postgresql.conf
ssl = on
ssl_cert_file = 'server.crt'
ssl_key_file = 'server.key'

# 4. 修改 pg_hba.conf 强制使用 SSL
hostssl all all 0.0.0.0/0 scram-sha-256

# 5. 重启
sudo systemctl restart postgresql
```

## 备份策略

### 三种备份方式

| 方式 | 速度 | 恢复粒度 | 适用场景 |
|------|------|----------|----------|
| pg_dump（逻辑备份） | 中等 | 表级 | 日常备份、迁移 |
| pg_dumpall | 慢 | 全局 | 备份整个集群 |
| 物理备份（WAL归档） | 快 | 时间点恢复（PITR） | 生产环境灾难恢复 |

### 定时备份脚本

```bash
#!/bin/bash
# backup.sh — 每天凌晨执行

BACKUP_DIR="/backup/postgres"
DB_NAME="mydb"
DATE=$(date +%Y%m%d_%H%M%S)

# 创建备份目录
mkdir -p "$BACKUP_DIR"

# 执行备份
pg_dump -U postgres "$DB_NAME" | gzip > "$BACKUP_DIR/${DB_NAME}_${DATE}.sql.gz"

# 删除 30 天前的备份
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +30 -delete

# 输出日志
echo "[$(date)] Backup completed: ${DB_NAME}_${DATE}.sql.gz"
```

### 定时任务（crontab）

```bash
# 每天凌晨 2 点执行备份
0 2 * * * /usr/local/bin/backup.sh
```

## 练习

```sql
-- 1. 创建一个只读用户，可以查询 public schema 下所有表
CREATE ROLE analyst WITH LOGIN PASSWORD 'analyst123';
GRANT CONNECT ON DATABASE mydb TO analyst;
GRANT USAGE ON SCHEMA public TO analyst;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analyst;

-- 2. 创建一个读写用户，可以增删改查
CREATE ROLE writer WITH LOGIN PASSWORD 'writer123';
GRANT CONNECT ON DATABASE mydb TO writer;
GRANT USAGE ON SCHEMA public TO writer;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO writer;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO writer;

-- 3. 测试权限
-- 用 readonly 用户连接
\c mydb readonly
SELECT * FROM users;  -- ✅ 可以查询
DELETE FROM users;    -- ❌ 没有删除权限
```
