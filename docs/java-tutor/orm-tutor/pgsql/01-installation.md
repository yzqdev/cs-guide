# PostgreSQL 安装与连接

> PostgreSQL 是一个功能强大的开源关系型数据库，以扩展性和标准兼容性著称。

## 安装 PostgreSQL

### Windows 安装

1. 从 [PostgreSQL 官网](https://www.postgresql.org/download/windows/) 下载安装包
2. 运行安装程序，按向导完成
3. 设置 postgres 超级用户密码
4. 默认端口 **5432**
5. 勾选安装 pgAdmin 4（图形化管理工具）

```bash
# 配置环境变量
PG_HOME = C:\Program Files\PostgreSQL\16
PATH    = %PG_HOME%\bin
PGDATA  = C:\Program Files\PostgreSQL\16\data
```

### macOS 安装

```bash
# 使用 Homebrew（推荐）
brew install postgresql@16

# 启动
brew services start postgresql@16

# 验证
psql --version
```

### Linux 安装（Ubuntu/Debian）

```bash
# 导入官方源
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update

# 安装
sudo apt-get install -y postgresql-16 postgresql-client-16

# 查看状态
sudo systemctl status postgresql
sudo systemctl enable postgresql
```

### Docker 安装（推荐开发环境）

```bash
# 拉取并启动
docker run --name pg16 \
  -e POSTGRES_PASSWORD=123456 \
  -e POSTGRES_DB=testdb \
  -p 5432:5432 \
  -d postgres:16

# 进入容器操作
docker exec -it pg16 psql -U postgres -d testdb

# 挂载数据卷
docker run --name pg16 \
  -v pgdata:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=123456 \
  -p 5432:5432 \
  -d postgres:16
```

## 连接 PostgreSQL

### 使用 psql 命令行

```bash
# 连接本地数据库（默认用户和数据库）
psql -U postgres

# 连接到指定数据库
psql -U postgres -d testdb -h localhost -p 5432

# 执行 SQL 并退出
psql -U postgres -d testdb -c "SELECT version();"

# 执行 SQL 文件
psql -U postgres -d testdb -f script.sql

# Windows PowerShell 设置密码
$env:PGPASSWORD='123456'; psql -U postgres -d testdb
```

### psql 元命令速查

```sql
-- 信息查询
\l            -- 列出所有数据库
\dt           -- 列出所有表
\d users      -- 查看表结构
\di           -- 列出索引
\ds           -- 列出序列
\dv           -- 列出视图
\df           -- 列出函数
\du           -- 列出用户/角色
\dx           -- 列出扩展

-- 连接与切换
\c testdb     -- 切换数据库
\conninfo     -- 显示当前连接信息

-- 输出控制
\x            -- 切换扩展显示
\timing       -- 开启查询计时
\! ls -la     -- 执行操作系统命令

-- 帮助
\?            -- 列出所有元命令
\h SELECT     -- 查看 SELECT 语法
\q            -- 退出
```

### 图形化工具

| 工具 | 平台 | 收费 |
|------|------|------|
| **pgAdmin 4** | 全平台 | 免费（安装时可选）|
| **DBeaver** | 全平台 | 免费 |
| **Navicat** | 全平台 | 收费 |
| **DataGrip** | 全平台 | 收费 |

## 初始化数据库

```bash
# 手动初始化（Windows 解压版需要）
initdb -D "C:\Program Files\PostgreSQL\16\data" -U postgres

# 创建 postgres 用户（如果不存在）
createuser -s -r postgres
```

## 服务管理

```bash
# systemd（Linux）
sudo systemctl start postgresql
sudo systemctl stop postgresql
sudo systemctl restart postgresql
sudo systemctl status postgresql

# SysV init
sudo service postgresql start

# Windows
pg_ctl start -D "C:\Program Files\PostgreSQL\16\data"
pg_ctl stop
pg_ctl register -N PostgreSQL  # 注册为系统服务
```

## 创建第一个数据库和表

```sql
-- 创建数据库
CREATE DATABASE testdb;

-- 切换数据库
\c testdb

-- 创建表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE,
    age INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入测试数据
INSERT INTO users (name, email, age) VALUES
('张三', 'zhangsan@test.com', 25),
('李四', 'lisi@test.com', 30);

-- 查询
SELECT * FROM users;
```

## 核心配置文件

| 文件 | 路径 | 作用 |
|------|------|------|
| `postgresql.conf` | `/etc/postgresql/16/main/postgresql.conf` | 主配置 |
| `pg_hba.conf` | `/etc/postgresql/16/main/pg_hba.conf` | 客户端认证 |
| `pg_ident.conf` | `/etc/postgresql/16/main/pg_ident.conf` | 用户名映射 |

```bash
# 开启远程访问
sudo vim /etc/postgresql/16/main/postgresql.conf
```
```conf
listen_addresses = '*'
port = 5432
```
```bash
sudo vim /etc/postgresql/16/main/pg_hba.conf
```
```conf
# 允许任何用户从任何 IP 连接
host all all 0.0.0.0/0 scram-sha-256
```
```bash
sudo systemctl restart postgresql
```

## 常见连接问题

### 1. no pg_hba.conf entry

```
FATAL: no pg_hba.conf entry for host "192.168.1.100"
```

**解决：** 在 `pg_hba.conf` 中添加：
```conf
host all all 0.0.0.0/0 scram-sha-256
```

### 2. 密码认证失败

```bash
# 修改密码
psql -U postgres
ALTER USER postgres WITH PASSWORD 'newpassword';
```

### 3. 找不到 postgres 角色

```bash
# 创建角色
createuser -s -r postgres
```

## 练习

```bash
# 1. 使用 Docker 启动 PostgreSQL
# 2. 创建数据库 myapp
# 3. 创建表 employees (id, name, salary, department, hired_date)
# 4. 使用 psql 连接并插入测试数据
```
