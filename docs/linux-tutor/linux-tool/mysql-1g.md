# MySQL 配置参考

> MySQL 配置文件（my.cnf）针对不同服务器配置的优化参考。

## 1GB 内存服务器配置

### 从库配置（my-for-slave.cnf）

```ini
# 适用于 MySQL 5.6
# 该配置适合 1G 内存左右的机子，储存类型为 InnoDB
# 在线生成配置工具：http://tools.percona.com

[mysql]
port = 3306
socket = /usr/program/mysql/data/mysql.sock
default-character-set = utf8

[mysqld]
user = mysql
port = 3306
default-storage-engine = InnoDB
socket = /usr/program/mysql/data/mysql.sock
pid-file = /usr/program/mysql/data/mysql.pid
collation-server = utf8_general_ci
init_connect = 'SET NAMES utf8'
character-set-server = utf8
basedir = /usr/program/mysql
datadir = /usr/program/mysql/data
log-error = /usr/program/mysql/data/mysql-error.log

server-id = 1

# 从库特有配置
read_only = true
skip-slave-start = true
log-slave-updates = true
relay-log = /usr/program/mysql/data/relay-bin
slave-net-timeout = 60
sync_master_info = 1
sync_relay_log = 1
sync_relay_log_info = 1

back_log = 512
max_connections = 1000
max_allowed_packet = 16M
max_connect_errors = 1000000
skip-name-resolve
open_files_limit = 65535
table_open_cache = 2048
binlog_cache_size = 1M
max_heap_table_size = 32M
tmp_table_size = 32M
read_buffer_size = 2M
read_rnd_buffer_size = 8M
sort_buffer_size = 2M
join_buffer_size = 4M
key_buffer_size = 64M
thread_cache_size = 8
thread_stack = 256k

query_cache_type = 1
query_cache_size = 8M
query_cache_limit = 2M

ft_min_word_len = 4
log-bin = /usr/program/mysql/data/mysql-bin
binlog-format = mixed
expire_logs_days = 30
sync_binlog = 0

slow_query_log = 1
long_query_time = 3
slow_query_log_file = /usr/program/mysql/data/mysql-slow.log

performance_schema = 0
explicit_defaults_for_timestamp = true
lower_case_table_names = 1
skip_external_locking
table_definition_cache = 1024
thread_concurrency = 2

innodb = FORCE
innodb_file_per_table = 1
innodb_open_files = 500
innodb_buffer_pool_size = 592M
innodb_write_io_threads = 4
innodb_read_io_threads = 4
innodb_thread_concurrency = 0
innodb_purge_threads = 1
innodb_flush_log_at_trx_commit = 1
innodb_log_buffer_size = 2M
innodb_log_file_size = 64M
innodb_log_files_in_group = 3
innodb_max_dirty_pages_pct = 90
innodb_lock_wait_timeout = 120
innodb_additional_mem_pool_size = 2M
bulk_insert_buffer_size = 8M
myisam_sort_buffer_size = 8M
myisam_max_sort_file_size = 100G
myisam_repair_threads = 1

interactive_timeout = 28800
wait_timeout = 3600

[mysqldump]
quick
max_allowed_packet = 16M

[myisamchk]
key_buffer_size = 8M
sort_buffer_size = 8M
read_buffer = 4M
write_buffer = 4M
```

### 主库配置（my-for-master.cnf）

```ini
# 适用于 MySQL 5.6
# 该配置适合 1G 内存左右的机子，储存类型为 InnoDB

[mysql]
port = 3306
socket = /usr/program/mysql/data/mysql.sock
default-character-set = utf8

[mysqld]
user = mysql
port = 3306
default-storage-engine = InnoDB
socket = /usr/program/mysql/data/mysql.sock
pid-file = /usr/program/mysql/data/mysql.pid
collation-server = utf8_general_ci
init_connect = 'SET NAMES utf8'
character-set-server = utf8
basedir = /usr/program/mysql
datadir = /usr/program/mysql/data
log-error = /usr/program/mysql/data/mysql-error.log

server-id = 1

back_log = 512
max_connections = 1000
max_allowed_packet = 16M
max_connect_errors = 1000000
skip-name-resolve
open_files_limit = 65535
table_open_cache = 2048
binlog_cache_size = 1M
max_heap_table_size = 32M
tmp_table_size = 32M
read_buffer_size = 2M
read_rnd_buffer_size = 8M
sort_buffer_size = 2M
join_buffer_size = 4M
key_buffer_size = 64M
thread_cache_size = 8
thread_stack = 256k

query_cache_type = 0
query_cache_size = 0
query_cache_limit = 2M

ft_min_word_len = 4
log-bin = /usr/program/mysql/data/mysql-bin
binlog-format = mixed
expire_logs_days = 30
sync_binlog = 1

slow_query_log = 0
long_query_time = 3
slow_query_log_file = /usr/program/mysql/data/mysql-slow.log

performance_schema = 0
explicit_defaults_for_timestamp = true
lower_case_table_names = 1
skip_external_locking
table_definition_cache = 1024
thread_concurrency = 2

innodb = FORCE
innodb_file_per_table = 1
innodb_open_files = 500
innodb_buffer_pool_size = 592M
innodb_write_io_threads = 4
innodb_read_io_threads = 4
innodb_thread_concurrency = 0
innodb_purge_threads = 1
innodb_flush_log_at_trx_commit = 1
innodb_log_buffer_size = 2M
innodb_log_file_size = 64M
innodb_log_files_in_group = 3
innodb_max_dirty_pages_pct = 90
innodb_lock_wait_timeout = 120
innodb_additional_mem_pool_size = 2M
bulk_insert_buffer_size = 8M
myisam_sort_buffer_size = 8M
myisam_max_sort_file_size = 100G
myisam_repair_threads = 1

interactive_timeout = 28800
wait_timeout = 3600

[mysqldump]
quick
max_allowed_packet = 16M

[myisamchk]
key_buffer_size = 8M
sort_buffer_size = 8M
read_buffer = 4M
write_buffer = 4M
```

### 综合配置（my-for-comprehensive.cnf）

```ini
# 适用于 MySQL 5.6
# 综合配置，兼顾主从

[mysql]
port = 3306
socket = /usr/program/mysql/data/mysql.sock
default-character-set = utf8

[mysqld]
user = mysql
port = 3306
default-storage-engine = InnoDB
socket = /usr/program/mysql/data/mysql.sock
pid-file = /usr/program/mysql/data/mysql.pid
collation-server = utf8_general_ci
init_connect = 'SET NAMES utf8'
character-set-server = utf8
basedir = /usr/program/mysql
datadir = /usr/program/mysql/data
log-error = /usr/program/mysql/data/mysql-error.log

server-id = 1
back_log = 512
max_connections = 1000
max_allowed_packet = 16M
max_connect_errors = 1000000
skip-name-resolve
open_files_limit = 65535
table_open_cache = 2048
binlog_cache_size = 1M
max_heap_table_size = 32M
tmp_table_size = 32M
read_buffer_size = 2M
read_rnd_buffer_size = 8M
sort_buffer_size = 2M
join_buffer_size = 4M
key_buffer_size = 64M
thread_cache_size = 8
thread_stack = 256k

query_cache_type = 1
query_cache_size = 8M
query_cache_limit = 2M

ft_min_word_len = 4
log-bin = /usr/program/mysql/data/mysql-bin
binlog-format = mixed
expire_logs_days = 30
sync_binlog = 0

slow_query_log = 1
long_query_time = 3
slow_query_log_file = /usr/program/mysql/data/mysql-slow.log

performance_schema = 0
explicit_defaults_for_timestamp = true
lower_case_table_names = 1
skip_external_locking
table_definition_cache = 1024
thread_concurrency = 2

innodb = FORCE
innodb_file_per_table = 1
innodb_open_files = 500
innodb_buffer_pool_size = 592M
innodb_write_io_threads = 4
innodb_read_io_threads = 4
innodb_thread_concurrency = 0
innodb_purge_threads = 1
innodb_flush_log_at_trx_commit = 1
innodb_log_buffer_size = 2M
innodb_log_file_size = 64M
innodb_log_files_in_group = 3
innodb_max_dirty_pages_pct = 90
innodb_lock_wait_timeout = 120
innodb_additional_mem_pool_size = 2M
bulk_insert_buffer_size = 8M
myisam_sort_buffer_size = 8M
myisam_max_sort_file_size = 100G
myisam_repair_threads = 1

interactive_timeout = 28800
wait_timeout = 3600

[mysqldump]
quick
max_allowed_packet = 16M

[myisamchk]
key_buffer_size = 8M
sort_buffer_size = 8M
read_buffer = 4M
write_buffer = 4M
```

## 8GB 内存服务器配置（my.cnf）

```ini
[mysql]
port = 3306
socket = /usr/program/mysql/data/mysql.sock
default-character-set = utf8

[mysqld]
user = mysql
port = 3306
server-id = 100866
default-storage-engine = InnoDB
socket = /usr/program/mysql/data/mysql.sock
pid-file = /usr/program/mysql/data/mysql.pid
collation-server = utf8_general_ci
init_connect = 'SET NAMES utf8'
character-set-server = utf8
basedir = /usr/program/mysql
datadir = /usr/program/mysql/data
log-error = /usr/program/mysql/data/mysql-error.log

skip-external-locking
skip-name-resolve
back_log = 500
max_connections = 500
max_connect_errors = 10000
open_files_limit = 65535

table_open_cache = 2048
table_definition_cache = 1024
max_allowed_packet = 64M
max_heap_table_size = 128M
tmp_table_size = 128M
sort_buffer_size = 4M
join_buffer_size = 4M
thread_cache_size = 64
thread_stack = 512k
query_cache_type = 0
query_cache_size = 0

ft_min_word_len = 4
binlog_cache_size = 4M
max_binlog_cache_size = 1G
max_binlog_size = 1G
expire_logs_days = 7
log-bin = /usr/program/mysql/data/mysql-bin
binlog-format = mixed
sync_binlog = 1

slow_query_log = 1
long_query_time = 2
slow_query_log_file = /usr/program/mysql/data/mysql-slow.log

performance_schema = 0
explicit_defaults_for_timestamp = true
lower_case_table_names = 1

innodb = FORCE
innodb_file_per_table = 1
innodb_open_files = 2048
innodb_buffer_pool_size = 4G
innodb_write_io_threads = 8
innodb_read_io_threads = 8
innodb_thread_concurrency = 16
innodb_purge_threads = 4
innodb_flush_log_at_trx_commit = 1
innodb_log_buffer_size = 16M
innodb_log_file_size = 512M
innodb_log_files_in_group = 3
innodb_max_dirty_pages_pct = 80
innodb_lock_wait_timeout = 120
bulk_insert_buffer_size = 64M
myisam_sort_buffer_size = 64M
myisam_max_sort_file_size = 10G
myisam_repair_threads = 1

interactive_timeout = 28800
wait_timeout = 3600

[mysqldump]
quick
max_allowed_packet = 64M

[myisamchk]
key_buffer_size = 64M
sort_buffer_size = 64M
read_buffer = 16M
write_buffer = 16M
```

## Windows 配置（my-windows.ini）

```ini
[client]
no-beep
port=3306

[mysql]
default-character-set=utf8

[mysqld]
port=3306
basedir="C:/Program Files/MySQL/MySQL Server 5.6/"
datadir="C:/ProgramData/MySQL/MySQL Server 5.6/Data/"
character-set-server=utf8
default-storage-engine=INNODB
sql-mode="STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"
max_connections=100
query_cache_size=0
table_open_cache=256
tmp_table_size=18M
thread_cache_size=8
myisam_max_sort_file_size=100G
myisam_sort_buffer_size=23M
key_buffer_size=8M
read_buffer_size=64K
read_rnd_buffer_size=256K
sort_buffer_size=256K
innodb_flush_log_at_trx_commit=1
innodb_log_buffer_size=1M
innodb_buffer_pool_size=8M
innodb_log_file_size=10M
innodb_thread_concurrency=8
innodb_autoextend_increment=1000
innodb_file_per_table=1
```

## 配置要点说明

| 配置项 | 说明 |
|--------|------|
| `innodb_buffer_pool_size` | InnoDB 缓冲池大小，建议为可用内存的 60%-70% |
| `max_connections` | 最大连接数 |
| `query_cache_size` | 查询缓存大小（MySQL 8.0 已移除） |
| `sort_buffer_size` | 排序缓冲区大小 |
| `join_buffer_size` | 连接缓冲区大小 |

### 内存配置建议

| 服务器内存 | InnoDB 缓冲池 | 总 MySQL 内存预估 |
|------------|---------------|-------------------|
| 1GB | 256MB - 512MB | ~600MB |
| 4GB | 2GB - 2.5GB | ~3GB |
| 8GB | 4GB - 5GB | ~5.5GB |
| 16GB | 10GB - 12GB | ~13GB |

## 参考

- [MySQL 官方文档](https://dev.mysql.com/doc/)
- [Percona 配置生成器](https://tools.percona.com/)