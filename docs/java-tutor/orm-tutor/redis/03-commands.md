# Redis 常用命令参考

> Redis 命令参考，按功能分类。

## Key 操作

```bash
# 基本操作
DEL key                 # 删除 key
EXISTS key              # 是否存在（1/0）
TYPE key                # 返回类型
RENAME key newkey       # 重命名
RENAMENX key newkey     # 仅新名不存在时重命名

# 过期时间
EXPIRE key seconds      # 设置过期
TTL key                 # 查看剩余秒数
PTTL key                # 查看剩余毫秒数
PERSIST key             # 移除过期时间

# 查找
KEYS pattern            # 匹配 key（*任意多个，?单个）
# KEYS user:*           # 所有 user: 开头的 key
# KEYS *                # 所有 key（生产环境慎用）
SCAN cursor [MATCH pattern] [COUNT count]  # 游标扫描（推荐生产环境）

# 序列化
DUMP key                # 序列化 key
RESTORE key ttl serialized_value  # 反序列化恢复

# 其他
RANDOMKEY               # 随机返回一个 key
SORT key                # 排序（List/Set/ZSet）
```

## 数据库操作

```bash
# 选择数据库
SELECT 0                # 选择 0 号库（默认 0-15）
SELECT 1                # 选择 1 号库

# 清空
FLUSHDB                 # 清空当前库
FLUSHALL                # 清空所有库

# 信息
DBSIZE                  # 当前库 key 数量
INFO                    # 服务器信息
INFO keyspace           # 各库 key 统计
```

## 事务

```bash
# Redis 事务：批量执行命令，保证原子性
MULTI                   # 开始事务
SET key1 "value1"
SET key2 "value2"
INCR counter
EXEC                    # 提交执行

# 或取消
MULTI
SET key1 "v1"
DISCARD                 # 取消事务

# 乐观锁（CAS）
WATCH key               # 监视 key
MULTI
SET key "newvalue"
EXEC                    # 如果 key 被其他客户端修改，则事务失败
UNWATCH                 # 取消监视
```

## 发布订阅

```bash
# 订阅者（Subscriber）
SUBSCRIBE channel        # 订阅频道
PSUBSCRIBE news:*        # 订阅匹配模式的频道

# 发布者（Publisher）
PUBLISH channel "hello"  # 发布消息
PUBSUB CHANNELS          # 查看活跃频道
PUBSUB NUMSUB channel    # 查看频道订阅数
```

## Pipeline 管道

```bash
# Pipeline 可以批量发送命令，减少网络往返
# redis-cli 管道模式
(echo -en "SET k1 v1\r\nSET k2 v2\r\nGET k1\r\n"; sleep 1) | redis-cli --pipe
```

## 慢查询日志

```bash
# 配置（在 redis.conf 或命令行）
CONFIG SET slowlog-log-slower-than 10000  # 慢查询阈值（微秒）
CONFIG SET slowlog-max-len 128            # 记录条数

# 查看
SLOWLOG GET 10          # 查看最近 10 条慢查询
SLOWLOG LEN             # 慢查询总数
SLOWLOG RESET           # 清空慢查询
```

## 客户端管理

```bash
# 查看客户端
CLIENT LIST             # 所有客户端
CLIENT INFO             # 当前客户端

# 操作客户端
CLIENT GETNAME          # 获取连接名
CLIENT SETNAME myapp    # 设置连接名
CLIENT KILL addr:port   # 断开某个客户端
CLIENT PAUSE 10000      # 暂停所有客户端 10 秒
```

## 服务器管理

```bash
# 配置
CONFIG GET *             # 查看所有配置
CONFIG GET requirepass   # 查看密码
CONFIG SET requirepass "newpass"  # 修改配置（临时）
CONFIG REWRITE           # 保存配置到文件

# 数据持久化
SAVE                    # 阻塞式保存 RDB
BGSAVE                  # 后台保存 RDB
BGREWRITEAOF            # 重写 AOF 日志
LASTSAVE                # 最后保存时间戳

# 关闭
SHUTDOWN                # 关闭服务器
SHUTDOWN NOSAVE         # 不保存关闭
SHUTDOWN SAVE           # 保存后关闭

# 复制（主从）
REPLICAOF host port     # 设置主从复制
ROLE                    # 查看角色（master/slave）
```

## 批量操作技巧

```bash
# 批量获取（Shell）
redis-cli -a password KEYS "user:*" | xargs redis-cli -a password DEL

# 批量设置（通过管道）
cat data.txt | redis-cli --pipe
# data.txt 格式：
# SET key1 value1
# SET key2 value2

# 查找并删除
redis-cli -a password KEYS "cache:*" | while read key; do
  redis-cli -a password DEL "$key"
done
```

## 练习

```bash
# 1. 使用 SCAN 替代 KEYS 扫描所有 user: 开头的 key
# 2. 使用事务同时设置两个 key
# 3. 查看 Redis 慢查询日志
# 4. 使用 CONFIG 查看当前内存配置
```
