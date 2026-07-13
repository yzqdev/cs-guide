# MySQL 安装与连接

> 安装 MySQL 并学会几种连接方式。

## 安装 MySQL

### Windows 安装

1. 从 [MySQL 官网](https://dev.mysql.com/downloads/mysql/) 下载 MSI 安装包
2. 运行安装程序，选择 **Developer Default**
3. 设置 root 用户密码（请牢记）
4. 默认端口 **3306**
5. 安装完成后在系统服务中自动启动

```
# 验证安装
mysql --version
```

### macOS 安装

```bash
# 使用 Homebrew（推荐）
brew install mysql

# 启动
brew services start mysql

# 安全配置（设置 root 密码）
mysql_secure_installation

# 验证
mysql --version
```

### Linux 安装（Ubuntu/Debian）

```bash
# 更新包列表
sudo apt update

# 安装 MySQL
sudo apt install mysql-server -y

# 查看状态
sudo systemctl status mysql

# 安全配置
sudo mysql_secure_installation

# 开机自启
sudo systemctl enable mysql
```

### Docker 安装（推荐开发环境）

```bash
# 拉取并启动
docker run --name mysql8 \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -e MYSQL_DATABASE=testdb \
  -p 3306:3306 \
  -d mysql:8.0

# 进入容器
docker exec -it mysql8 mysql -uroot -p123456

# 挂载数据卷（持久化存储）
docker run --name mysql8 \
  -v mysql_data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -p 3306:3306 \
  -d mysql:8.0
```

## 连接 MySQL

### 命令行连接

```bash
# 连接本地 MySQL
mysql -u root -p

# 指定主机和端口
mysql -h 127.0.0.1 -P 3306 -u root -p

# 直接指定密码（不推荐，有安全风险）
mysql -u root -p123456

# 指定数据库
mysql -u root -p -D testdb

# 执行 SQL 后退出
mysql -u root -p -e "SHOW DATABASES;"
```

### 连接参数说明

| 参数 | 说明 | 示例 |
|------|------|------|
| `-h` | 主机地址 | `-h 192.168.1.100` |
| `-P` | 端口（大写） | `-P 3306` |
| `-u` | 用户名 | `-u root` |
| `-p` | 密码提示 | `-p` |
| `-D` | 指定数据库 | `-D testdb` |
| `-e` | 执行 SQL 并退出 | `-e "SELECT 1"` |

### 图形化工具

| 工具 | 平台 | 收费 |
|------|------|------|
| **DBeaver** | 全平台 | 免费 |
| **MySQL Workbench** | 全平台 | 免费 |
| **Navicat** | 全平台 | 收费 |
| **HeidiSQL** | Windows | 免费 |
| **DataGrip** | 全平台 | 收费 |

## 配置远程访问

```bash
# 1. 修改配置文件，允许远程连接
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
```

```ini
bind-address = 0.0.0.0  # 监听所有网卡
```

```bash
# 2. 登录 MySQL 授权远程用户
mysql -u root -p
```

```sql
-- 允许 root 从任何 IP 连接
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '密码' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- 创建特定用户
CREATE USER 'myuser'@'%' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON testdb.* TO 'myuser'@'%';
FLUSH PRIVILEGES;

-- 查看用户权限
SHOW GRANTS FOR 'root'@'%';
```

```bash
# 3. 重启 MySQL
sudo systemctl restart mysql

# 4. 检查监听状态
netstat -an | grep 3306
```

:::tip
云服务器还需在安全组中开放 3306 端口。
:::

## 常见连接问题

### 1. ERROR 2003 — 无法连接

```
ERROR 2003 (HY000): Can't connect to MySQL server on 'xxx' (10061)
```

**排查：** 检查 MySQL 是否运行、端口是否正确、防火墙是否放行。

```bash
# 检查服务状态
sudo systemctl status mysql

# 检查端口
netstat -an | grep 3306
```

### 2. ERROR 1045 — 密码错误

```
ERROR 1045 (28000): Access denied for user 'root'@'localhost'
```

**解决：** 使用 `mysql_secure_installation` 重置或跳过授权表。

### 3. ERROR 1524 — 插件未加载

```
ERROR 1524 (HY000): Plugin 'msql_native_password' is not loaded
```

**解决：** 在 `my.cnf` 中添加 `mysql_native_password=ON` 后重启。

## 基本命令

```sql
-- 查看版本
SELECT VERSION();

-- 查看当前用户
SELECT USER();

-- 查看数据库列表
SHOW DATABASES;

-- 创建数据库
CREATE DATABASE testdb DEFAULT CHARSET utf8mb4;

-- 选择数据库
USE testdb;

-- 查看当前数据库
SELECT DATABASE();
```

## 服务管理命令

```bash
# systemd（Ubuntu/Debian/CentOS 7+）
sudo systemctl start mysql
sudo systemctl stop mysql
sudo systemctl restart mysql
sudo systemctl status mysql

# SysV init
sudo service mysql start
sudo service mysql stop
sudo service mysql restart

# Windows
net start mysql
net stop mysql
```
