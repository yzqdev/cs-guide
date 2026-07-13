# psql 命令参考大全

> psql 是 PostgreSQL 自带的命令行工具，功能强大，支持交互式查询和脚本编写。

## 交互式命令（元命令）

所有元命令以 `\` 开头，不区分大小写。

### 连接与信息

| 命令 | 说明 | 示例 |
|------|------|------|
| `\c [db] [user]` | 切换数据库 | `\c mydb postgres` |
| `\conninfo` | 显示当前连接信息 | `\conninfo` |
| `\l` | 列出所有数据库 | `\l` |
| `\dt` | 列出所有表 | `\dt+` 显示更多信息 |
| `\d [table]` | 查看表结构 | `\d users` |
| `\di` | 列出索引 | `\di` |
| `\ds` | 列出序列 | `\ds` |
| `\dv` | 列出视图 | `\dv` |
| `\df` | 列出函数 | `\df+` 显示函数源码 |
| `\dn` | 列出 Schema | `\dn` |
| `\db` | 列出表空间 | `\db` |
| `\du` | 列出用户/角色 | `\du` |
| `\dp [table]` | 显示表权限 | `\dp users` |

### 查看对象定义

```sql
-- 查看表的创建语句
\d+ users

-- 查看视图定义
\dv+ user_view

-- 查看函数源码
\df+ my_function

-- 查看索引定义
\di+ idx_users_email

-- 查看所有扩展
\dx
```

### 执行与输出

| 命令 | 说明 | 示例 |
|------|------|------|
| `\g` | 重新执行上一条命令 | `\g` |
| `\i file.sql` | 执行外部 SQL 文件 | `\i /tmp/backup.sql` |
| `\o file.txt` | 将输出写入文件 | `\o result.txt` |
| `\o` | 恢复输出到终端 | `\o` |
| `\copy` | 导入/导出文件 | `\copy users TO 'users.csv' CSV` |
| `\! cmd` | 执行操作系统的命令 | `\! ls -la` |

### 格式化

| 命令 | 说明 |
|------|------|
| `\x` | 切换扩展显示（每行一字段，适合宽表） |
| `\a` | 切换对齐/非对齐模式 |
| `\H` | 切换 HTML 输出格式 |
| `\t` | 切换只显示行（不显示列名） |
| `\pset` | 设置输出格式 | `\pset border 2` |
| `\encoding` | 显示/设置编码 | `\encoding UTF8` |

```sql
-- 扩展显示示例：查询宽表时更易读
\x
SELECT * FROM users WHERE id = 1;
-- 输出：
-- -[ RECORD 1 ]-------------------------
-- id         | 1
-- name       | 张三
-- email      | zhangsan@test.com
-- created_at | 2024-01-15 14:30:25

-- 导出 CSV 格式
\pset format csv
SELECT id, name, email FROM users;
```

### 帮助

| 命令 | 说明 |
|------|------|
| `\?` | 列出所有元命令 |
| `\h` | 查看 SQL 命令帮助 |
| `\h SELECT` | 查看 SELECT 语法 |
| `\help` | 同 `\?` |

### 编辑与历史

| 命令 | 说明 |
|------|------|
| `\e` | 在编辑器中编辑当前查询 |
| `\ef [func]` | 编辑函数定义 |
| `\s` | 显示历史命令 |
| `\s file.txt` | 将历史保存到文件 |
| `\r` | 重置输入缓冲区（取消当前输入） |
| `\q` | 退出 psql |

## 连接参数

### 连接方式

```bash
# 完整参数连接
psql -h localhost -p 5432 -U postgres -d mydb

# 使用连接字符串
psql "postgresql://postgres:password@localhost:5432/mydb"

# 默认连接（使用操作系统用户名）
psql

# 使用 sudo 切换用户
sudo -u postgres psql
```

### 常用连接选项

| 参数 | 说明 | 示例 |
|------|------|------|
| `-h` | 主机地址 | `-h 192.168.1.100` |
| `-p` | 端口 | `-p 5432` |
| `-U` | 用户名 | `-U postgres` |
| `-d` | 数据库名 | `-d mydb` |
| `-W` | 强制密码提示 | `-W` |
| `-f` | 执行 SQL 文件 | `-f script.sql` |
| `-c` | 执行单条 SQL | `-c "SELECT 1"` |
| `-l` | 列出所有数据库后退出 | `-l` |

## 非交互模式

适合在脚本中使用：

```bash
# 执行单条 SQL
psql -U postgres -d mydb -c "SELECT count(*) FROM users"

# 执行 SQL 文件
psql -U postgres -d mydb -f /path/to/script.sql

# 通过管道输入
echo "SELECT version();" | psql -U postgres

# 通过标准输入
psql -U postgres -d mydb < backup.sql
```

## 常用操作快捷命令

```sql
-- MySQL 用户习惯的命令对照
-- MySQL: SHOW DATABASES; → PostgreSQL: \l
-- MySQL: USE mydb;       → PostgreSQL: \c mydb
-- MySQL: SHOW TABLES;    → PostgreSQL: \dt
-- MySQL: DESC users;     → PostgreSQL: \d users
-- MySQL: SHOW INDEX;     → PostgreSQL: \di
```

## 定时任务与维护

```sql
-- 查看耗时最长的 5 个查询
SELECT
    pid,
    now() - pg_stat_activity.query_start AS duration,
    query,
    state
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY duration DESC
LIMIT 5;

-- 查看当前锁等待
SELECT relation::regclass, * FROM pg_locks WHERE NOT granted;

-- 查看表大小
SELECT
    relname,
    pg_size_pretty(pg_relation_size(relid)) AS size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_relation_size(relid) DESC;
```

## 练习

```bash
# 1. 用 psql 连接数据库并查看所有表
psql -U postgres -d mydb
\l
\dt

# 2. 在非交互模式下执行查询
psql -U postgres -d mydb -c "SELECT table_name FROM information_schema.tables WHERE table_schema='public'"

# 3. 将查询结果导出到 CSV 文件
psql -U postgres -d mydb -c "\copy (SELECT id, name, email FROM users) TO '/tmp/users.csv' CSV HEADER"

# 4. 执行 SQL 脚本
psql -U postgres -d mydb -f init.sql
```
