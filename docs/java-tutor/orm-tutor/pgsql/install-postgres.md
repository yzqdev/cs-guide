# PostgreSQL 安装与快速入门

> PostgreSQL 是一个功能强大的开源关系型数据库，支持 JSON、全文检索、窗口函数等高级特性。

## 安装 PostgreSQL

### Windows 安装

1. 从 [PostgreSQL 官网](https://www.postgresql.org/download/windows/) 下载安装包
2. 运行安装程序，按向导完成安装
3. 安装过程中设置 postgres 超级用户密码
4. 默认端口为 **5432**
5. 勾选安装 pgAdmin 4（图形化管理工具）

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

# 开机自启
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

# 进入容器
docker exec -it pg16 psql -U postgres -d testdb

# 挂载数据卷（持久化存储）
docker run --name pg16 \
  -v pgdata:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=123456 \
  -p 5432:5432 \
  -d postgres:16
```

## 配置 PostgreSQL

### 核心配置文件

| 文件 | 路径 | 作用 |
|------|------|------|
| `postgresql.conf` | `/etc/postgresql/16/main/postgresql.conf` | 主配置（监听地址、内存、日志等） |
| `pg_hba.conf` | `/etc/postgresql/16/main/pg_hba.conf` | 客户端认证配置 |
| `pg_ident.conf` | `/etc/postgresql/16/main/pg_ident.conf` | 用户名映射 |

### 开启远程访问

```bash
# 1. 修改 postgresql.conf，监听所有地址
sudo vim /etc/postgresql/16/main/postgresql.conf
```
```conf
listen_addresses = '*'
port = 5432
```

```bash
# 2. 修改 pg_hba.conf，允许远程连接
sudo vim /etc/postgresql/16/main/pg_hba.conf
```
```conf
# 格式: TYPE  DATABASE  USER  ADDRESS  METHOD
# 允许任何用户从任何 IP 通过密码连接任何数据库
host    all             all             0.0.0.0/0               scram-sha-256
# 或者使用 md5（兼容旧客户端）
host    all             all             0.0.0.0/0               md5
```

```bash
# 3. 重启服务
sudo systemctl restart postgresql

# 4. 检查监听状态
netstat -an | grep 5432
```

## 连接 PostgreSQL

### 使用 psql 命令行

```bash
# 连接本地数据库
psql -U postgres

# 连接到指定数据库
psql -U postgres -d mydb -h localhost -p 5432

# 执行 SQL 并退出
psql -U postgres -d mydb -c "SELECT version();"

# 执行 SQL 文件
psql -U postgres -d mydb -f script.sql

# Windows PowerShell 中设置密码（避免交互）
$env:PGPASSWORD='123456'; psql -U postgres -d mydb -c "SELECT 1"
```

### 使用 pgAdmin 4

安装后访问 `http://localhost:54321/browser/`，添加服务器连接：

| 字段 | 值 |
|------|-----|
| 地址 | `localhost` |
| 端口 | `5432` |
| 用户名 | `postgres` |
| 密码 | 安装时设置的密码 |

### 使用 DBeaver / Navicat

推荐使用 DBeaver（免费、跨平台），连接方式同上。

## 创建第一个数据库

```sql
-- 查看现有数据库
\l

-- 创建数据库
CREATE DATABASE mydb;

-- 切换到数据库
\c mydb

-- 创建表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE,
    age INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入数据
INSERT INTO users (name, email, age) VALUES
('张三', 'zhangsan@test.com', 25),
('李四', 'lisi@test.com', 30);

-- 查询
SELECT * FROM users;

-- 查看表结构
\d users
```

## 服务管理命令

```bash
# systemd（Ubuntu/Debian/CentOS 7+）
sudo systemctl start postgresql
sudo systemctl stop postgresql
sudo systemctl restart postgresql
sudo systemctl status postgresql

# SysV init
sudo service postgresql start
sudo service postgresql stop
sudo service postgresql restart

# Windows（以管理员身份运行）
net start postgresql-16
net stop postgresql-16
```

## 卸载 PostgreSQL

```bash
# Ubuntu/Debian
sudo service postgresql stop
sudo apt-get --purge remove postgresql\*
sudo rm -rf /etc/postgresql/
sudo rm -rf /var/lib/postgresql/
sudo userdel -r postgres
sudo groupdel postgres
```

## 常见问题

### 连接被拒绝：没有 pg_hba.conf 条目

```
FATAL: no pg_hba.conf entry for host "192.168.1.100"
```

**解决：** 在 `pg_hba.conf` 中添加：

```conf
host all all 0.0.0.0/0 scram-sha-256
```

### 密码认证失败

```bash
# 方法一：在 psql 中修改密码
psql -U postgres
ALTER USER postgres WITH PASSWORD 'newpassword';

# 方法二：重置 Linux 用户 postgres 的密码
sudo passwd -d postgres
sudo -u postgres passwd
```

### 端口被占用

```bash
# 查看端口占用
sudo lsof -i :5432

# 修改端口：在 postgresql.conf 中修改 port 字段
port = 5433
```
