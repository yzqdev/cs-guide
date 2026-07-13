# MySQL 管理维护

> 用户权限、备份恢复、主从复制、Docker 运维等日常管理技能。

## 用户与权限

### 用户管理

```sql
-- 创建用户
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'password123';
CREATE USER 'app_user'@'%' IDENTIFIED BY 'password123';  -- 可从任何 IP 连接

-- 查看用户
SELECT user, host, plugin FROM mysql.user;

-- 修改密码
ALTER USER 'app_user'@'localhost' IDENTIFIED BY 'new_password';

-- 删除用户
DROP USER 'app_user'@'localhost';
```

### 权限管理

```sql
-- 授予权限
-- 全部权限
GRANT ALL PRIVILEGES ON testdb.* TO 'app_user'@'localhost';

-- 只读权限
GRANT SELECT ON testdb.* TO 'readonly'@'%';

-- 部分权限
GRANT SELECT, INSERT, UPDATE, DELETE ON testdb.* TO 'editor'@'%';

-- 只允许查看特定列
GRANT SELECT (id, username) ON testdb.users TO 'analyst'@'%';

-- 授予创建临时表等高级权限
GRANT CREATE TEMPORARY TABLES ON testdb.* TO 'app_user'@'localhost';

-- 刷新权限
FLUSH PRIVILEGES;

-- 查看权限
SHOW GRANTS FOR 'app_user'@'localhost';

-- 撤销权限
REVOKE DELETE ON testdb.* FROM 'editor'@'%';
```

### 权限层级

```
全局（*.*）
  └── 数据库（db_name.*）
      └── 表（db_name.table）
          └── 列（db_name.table.column）
```

### 常用权限模板

```sql
-- 管理员：所有权限
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;

-- 开发者：所有权限，但仅限于指定数据库
GRANT ALL PRIVILEGES ON devdb.* TO 'developer'@'%';

-- 应用用户：增删改查
GRANT SELECT, INSERT, UPDATE, DELETE ON appdb.* TO 'app_user'@'%';

-- 只读用户：仅查询
GRANT SELECT ON appdb.* TO 'readonly'@'%';

-- 备份用户：LOCK TABLES + SELECT
GRANT LOCK TABLES, SELECT ON *.* TO 'backup'@'localhost';
```

## 备份与恢复

### mysqldump

```bash
# 备份单个数据库
mysqldump -u root -p testdb > testdb_backup.sql

# 备份多个数据库
mysqldump -u root -p --databases db1 db2 > dbs_backup.sql

# 备份所有数据库
mysqldump -u root -p --all-databases > all_backup.sql

# 只备份数据（不含建表语句）
mysqldump -u root -p --no-create-info testdb > data.sql

# 只备份结构（不含数据）
mysqldump -u root -p --no-data testdb > schema.sql

# 压缩备份（推荐）
mysqldump -u root -p testdb | gzip > testdb_$(date +%Y%m%d).sql.gz

# Windows PowerShell
mysqldump -u root -p testdb | Out-File -Encoding UTF8 testdb_backup.sql
```

### 恢复

```bash
# 恢复整个数据库
mysql -u root -p testdb < testdb_backup.sql

# 从压缩文件恢复
gunzip < testdb_20240115.sql.gz | mysql -u root -p testdb

# 恢复所有数据库
mysql -u root -p < all_backup.sql

# Windows PowerShell
Get-Content testdb_backup.sql | mysql -u root -p testdb
```

### 备份脚本

```bash
#!/bin/bash
# backup.sh — 每天凌晨执行

BACKUP_DIR="/backup/mysql"
DB_NAME="testdb"
DATE=$(date +%Y%m%d_%H%M%S)

# 创建备份目录
mkdir -p "$BACKUP_DIR"

# 备份
mysqldump -u root -p"$MYSQL_ROOT_PASSWORD" "$DB_NAME" | gzip > "$BACKUP_DIR/${DB_NAME}_${DATE}.sql.gz"

# 删除 30 天前的备份
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +30 -delete

echo "[$(date)] Backup completed: ${DB_NAME}_${DATE}.sql.gz"
```

```bash
# crontab — 每天凌晨 2 点执行
0 2 * * * /usr/local/bin/backup.sh
```

## 主从复制

### 基本原理

```
主库（Master）→ 写入 binlog → 从库（Slave）→ 读取 binlog → 写入 relay log → 执行 SQL
```

### 配置主库

```ini
# my.cnf — 主库
[mysqld]
server-id = 1
log_bin = /var/log/mysql/mysql-bin.log
binlog_do_db = testdb      # 要复制的数据库
```

```sql
-- 创建复制用户
CREATE USER 'repl'@'%' IDENTIFIED BY 'repl_password';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';
FLUSH PRIVILEGES;

-- 查看主库状态（记录 File 和 Position）
SHOW MASTER STATUS;
```

### 配置从库

```ini
# my.cnf — 从库
[mysqld]
server-id = 2
relay_log = /var/log/mysql/mysql-relay-bin.log
read_only = 1               # 从库只读
```

```sql
-- 在从库上设置主库信息
CHANGE MASTER TO
    MASTER_HOST='192.168.1.1',
    MASTER_USER='repl',
    MASTER_PASSWORD='repl_password',
    MASTER_LOG_FILE='mysql-bin.000001',
    MASTER_LOG_POS=123;

-- 启动复制
START SLAVE;

-- 查看同步状态
SHOW SLAVE STATUS\G
-- 关键字段：
-- Slave_IO_Running: Yes
-- Slave_SQL_Running: Yes
-- Seconds_Behind_Master: 0（延迟秒数）
```

## Docker 运维

```bash
# 启动 MySQL 容器
docker run --name mysql8 \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -p 3306:3306 \
  -d mysql:8.0

# 指定配置文件
docker run --name mysql8 \
  -v /my/custom:/etc/mysql/conf.d \
  -v mysql_data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -d mysql:8.0

# 进入容器
docker exec -it mysql8 bash

# 在容器内执行命令
docker exec -it mysql8 mysql -uroot -p123456

# 备份容器中的数据库
docker exec mysql8 mysqldump -uroot -p123456 testdb > backup.sql

# 恢复
cat backup.sql | docker exec -i mysql8 mysql -uroot -p123456 testdb

# 查看日志
docker logs mysql8
docker logs -f mysql8  # 实时跟踪

# 停止/启动
docker stop mysql8
docker start mysql8
```

## 重置密码

### Windows

```bash
# 1. 停止 MySQL 服务
net stop mysql

# 2. 跳过授权表启动
mysqld --skip-grant-tables --shared-memory

# 3. 另开终端登录
mysql -u root

# 4. 重置密码
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```

### Linux

```bash
# 1. 停止 MySQL
sudo systemctl stop mysql

# 2. 跳过授权表启动
sudo mysqld_safe --skip-grant-tables &

# 3. 登录并重置
mysql -u root
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';

# 4. 重启正常模式
sudo systemctl restart mysql
```

## 日常检查

```sql
-- 1. 检查连接数
SHOW STATUS LIKE 'Threads_connected';
SHOW VARIABLES LIKE 'max_connections';

-- 2. 检查运行时间
SHOW STATUS LIKE 'Uptime';

-- 3. 检查慢查询
SHOW STATUS LIKE 'Slow_queries';

-- 4. 检查死锁
SHOW ENGINE INNODB STATUS\G

-- 5. 数据库大小
SELECT
    table_schema AS database_name,
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS size_mb
FROM information_schema.TABLES
GROUP BY table_schema;

-- 6. 表大小排行
SELECT
    TABLE_NAME,
    ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) AS size_mb
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'testdb'
ORDER BY (DATA_LENGTH + INDEX_LENGTH) DESC
LIMIT 10;
```

## 练习

```sql
-- 1. 创建只读用户 analyst，只能查询 testdb 库
-- 2. 使用 mysqldump 备份 testdb 并压缩
-- 3. 备份后删除一条数据，再从备份恢复
-- 4. 查看 testdb 中最大的 3 张表
-- 5. 用 Docker 启动一个 MySQL 实例
```
