# Redis 数据类型详解

> Redis 支持 5 种核心数据结构：String、Hash、List、Set、ZSet（有序集合）。

## String — 字符串

Redis 最基础的类型，value 最大 512MB。

```bash
# 设置
SET name "张三"
SETNX name "李四"    # 仅在 key 不存在时设置（常用于分布式锁）
MSET k1 v1 k2 v2    # 批量设置
GET name            # "张三"
MGET k1 k2          # 批量获取

# 数字操作
SET count 10
INCR count          # 11（自增 1）
INCRBY count 5      # 16（加 5）
DECR count          # 15
DECRBY count 3      # 12
INCRBYFLOAT price 10.5  # 浮点运算

# 字符串操作
APPEND name "先生"  # 追加
GETRANGE name 0 1   # "张"（截取）
STRLEN name         # 长度

# 过期时间
SET code "1234" EX 60 NX  # 60秒过期 + 不存在才设
SETEX code 60 "1234"      # 同上（简化语法）
TTL code                  # 查看剩余秒数
PERSIST code              # 移除过期时间

# 场景：缓存
SET user:1 '{"name":"张三","age":25}' EX 3600

# 场景：分布式锁
SET lock:order:123 "locked" NX EX 30
```

## Hash — 哈希

适合存储对象，可以单独操作对象中的某个字段。

```bash
# 设置单个字段
HSET user:1 name "张三"
HSET user:1 age 25
HSET user:1 email "zhangsan@test.com"

# 批量设置
HMSET user:2 name "李四" age 30 email "lisi@test.com"

# 获取
HGET user:1 name           # "张三"
HMGET user:1 name age      # ["张三", "25"]
HGETALL user:1             # 所有字段和值
HKEYS user:1               # 所有字段名
HVALS user:1               # 所有值

# 数字运算
HINCRBY user:1 age 1       # 26（年龄加 1）

# 判断存在
HEXISTS user:1 name        # 1（存在）

# 删除字段
HDEL user:1 email

# 长度
HLEN user:1                # 2（字段数）

# 场景：用户信息、商品信息
```

## List — 列表

有序列表，支持从两端插入和弹出，可用作队列或栈。

```bash
# 从左边插入（栈：后进先出）
LPUSH queue "task1"
LPUSH queue "task2"

# 从右边插入（队列：先进先出）
RPUSH queue "task0"

# 弹出
LPOP queue    # "task2"（左端弹出）
RPOP queue    # "task0"（右端弹出）

# 查看
LRANGE queue 0 -1      # 所有元素（-1 表示最后一个）
LRANGE queue 0 2       # 前 3 个
LLEN queue              # 长度

# 阻塞弹出（常用于消息队列）
BLPOP queue 5          # 5 秒内等待，有元素时弹出
BRPOP queue 5          # 从右端阻塞弹出

# 场景：消息队列、最新消息列表
```

## Set — 集合

无序、不可重复。支持交集、并集、差集运算。

```bash
# 添加元素
SADD user:1:tags "Java" "Python" "SQL"
SADD user:1:tags "Java"   # 0（重复，添加失败）

# 获取
SMEMBERS user:1:tags      # 所有元素
SCARD user:1:tags         # 元素数量
SISMEMBER user:1:tags "Java"  # 1（存在）

# 删除
SREM user:1:tags "SQL"    # 移除元素
SPOP user:1:tags          # 随机弹出一个

# 集合运算
SADD set1 a b c d
SADD set2 c d e f

SINTER set1 set2            # 交集：c d
SUNION set1 set2            # 并集：a b c d e f
SDIFF set1 set2             # 差集：a b

# 场景：标签、关注列表、共同好友
```

## ZSet — 有序集合

每个元素关联一个分数（score），按分数排序。

```bash
# 添加元素（分数决定排序位置）
ZADD leaderboard 100 "张三"
ZADD leaderboard 90 "李四"
ZADD leaderboard 80 "王五"

# 获取
ZRANGE leaderboard 0 -1        # 按分数升序：王五 李四 张三
ZREVRANGE leaderboard 0 -1     # 按分数降序：张三 李四 王五
ZRANGE leaderboard 0 -1 WITHSCORES  # 带分数

# 排名
ZRANK leaderboard "张三"       # 2（升序排名，从 0 开始）
ZREVRANK leaderboard "张三"    # 0（降序排名）

# 分数操作
ZINCRBY leaderboard 5 "张三"  # 加 5 分 → 105
ZSCORE leaderboard "张三"     # 105

# 范围查询
ZRANGEBYSCORE leaderboard 80 100  # 分数在 80-100 之间的
ZCOUNT leaderboard 80 100          # 计数

# 删除
ZREM leaderboard "王五"

# 场景：排行榜、延时队列
```

## 数据类型选择对照

| 类型 | 底层实现 | 适用场景 | 不适用场景 |
|------|---------|---------|-----------|
| String | 动态字符串 | 缓存、计数器、分布式锁 | 大文本频繁修改 |
| Hash | 哈希表 | 对象存储、用户信息 | 字段很多的扁平数据 |
| List | 双向链表 | 消息队列、时间线 | 频繁随机访问中间元素 |
| Set | 哈希表 | 标签、去重、共同好友 | 需要排序 |
| ZSet | 跳表+哈希表 | 排行榜、延时队列 | 频繁添加大量成员 |

## 过期时间设置

```bash
# 创建时设置过期
SET code "1234" EX 60
SETEX code 60 "1234"     # 简化版

# 对已有 key 设置过期
EXPIRE key 60            # 60 秒后过期
EXPIRE key 3600          # 1 小时后过期
EXPIREAT key 1700000000  # 指定时间戳过期

# 查看过期时间
TTL key                  # 剩余秒数（-1 永不过期，-2 已过期）
PTTL key                 # 剩余毫秒数

# 取消过期
PERSIST key              # 移除过期时间
```

## 练习

```bash
# 1. 用 Hash 存储一个用户对象
# 2. 用 List 实现一个简单的消息队列
# 3. 用 Set 存储用户的标签并计算交集
# 4. 用 ZSet 实现一个游戏排行榜
```
