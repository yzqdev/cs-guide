# Redis 高级特性

> 持久化、过期策略、分布式锁、Pipeline、发布订阅等进阶用法。

## 持久化

Redis 支持两种持久化方式，可以同时使用。

### RDB（快照）

```
优点：文件紧凑，恢复快，适合备份
缺点：可能丢失最后一次快照后的数据
```

```bash
# 手动触发
SAVE        # 阻塞式保存
BGSAVE      # 后台保存（推荐）

# 配置（redis.conf）
save 900 1         # 900 秒内至少 1 次修改
save 300 10        # 300 秒内至少 10 次修改
save 60 10000      # 60 秒内至少 10000 次修改
dbfilename dump.rdb
dir /var/lib/redis
```

### AOF（追加日志）

```
优点：最多丢失 1 秒数据
缺点：文件比 RDB 大，恢复较慢
```

```conf
# 配置
appendonly yes
appendfilename "appendonly.aof"

# 同步策略（三选一）
appendfsync always      # 每次写入都同步（最安全，最慢）
appendfsync everysec    # 每秒同步（折中，推荐）
appendfsync no          # 由操作系统决定（最快，最不安全）

# AOF 重写（压缩日志）
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
```

```bash
# 手动重写 AOF
BGREWRITEAOF
```

### 持久化选择

| 场景 | 推荐 |
|------|------|
| 纯缓存，数据可丢 | 关闭持久化 |
| 缓存+部分持久化 | RDB |
| 数据不能丢 | AOF + RDB |
| 混合持久化（Redis 4.0+）| `aof-use-rdb-preamble yes` |

## 过期策略

Redis 删除过期 key 有三种方式：

```bash
# 1. 定期删除：每 100ms 随机抽查，删除过期 key
# 2. 惰性删除：访问时检查，过期则删除
# 3. 内存淘汰：内存满时按策略淘汰（配置 maxmemory-policy）
```

### 淘汰策略（maxmemory-policy）

| 策略 | 说明 | 场景 |
|------|------|------|
| `noeviction` | 不淘汰，返回错误 | 默认 |
| `allkeys-lru` | 淘汰最近最少使用的 key | **最常用** |
| `allkeys-lfu` | 淘汰使用频率最低的 key |  |
| `volatile-lru` | 从设置了过期时间的 key 中淘汰 LRU | |
| `volatile-ttl` | 淘汰即将过期的 key | |
| `allkeys-random` | 随机淘汰 | |

```conf
# 推荐配置（缓存场景）
maxmemory 1gb
maxmemory-policy allkeys-lru
```

## 分布式锁

Redis 分布式锁是分布式系统中协调并发访问的关键技术。

```bash
# 加锁（SET NX + 过期时间，原子操作）
SET lock:order:123 "thread-1" NX EX 30
# NX: 键不存在时才设置
# EX 30: 30 秒自动解锁（防止死锁）

# 解锁（需要 Lua 脚本保证原子性）
# 错误方式：GET + DEL（非原子操作）
# 正确方式：
EVAL "if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL', KEYS[1]) else return 0 end" 1 lock:order:123 thread-1
```

### Java 实现（Redisson）

```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson-spring-boot-starter</artifactId>
    <version>3.27.0</version>
</dependency>
```

```java
@Autowired
private RedissonClient redissonClient;

public void order(Long productId) {
    RLock lock = redissonClient.getLock("lock:order:" + productId);
    try {
        if (lock.tryLock(5, 30, TimeUnit.SECONDS)) {
            // 处理订单
        }
    } finally {
        if (lock.isHeldByCurrentThread()) {
            lock.unlock();
        }
    }
}
```

## Pipeline — 批量执行

Pipeline 将多个命令打包发送，减少网络往返：

```bash
# redis-cli 管道模式
(echo "SET k1 v1"; echo "SET k2 v2"; echo "GET k1") | redis-cli --pipe
```

```java
// Spring Boot 中使用
@Autowired
private StringRedisTemplate redisTemplate;

public void batchSet() {
    redisTemplate.executePipelined((RedisCallback<Object>) connection -> {
        for (int i = 0; i < 1000; i++) {
            connection.stringCommands().set(
                ("key:" + i).getBytes(),
                ("value:" + i).getBytes()
            );
        }
        return null;
    });
}
```

## 发布订阅（Pub/Sub）

```bash
# 订阅者（终端1）
SUBSCRIBE notifications

# 发布者（终端2）
PUBLISH notifications "用户已注册"
PUBLISH notifications "新订单已创建"
```

```java
// Spring Boot 中配置监听
@Component
public class RedisMessageListener {

    @Bean
    public MessageListenerAdapter messageListener() {
        return new MessageListenerAdapter(new NotificationHandler());
    }

    @Bean
    public RedisMessageListenerContainer container(
            RedisConnectionFactory factory,
            MessageListenerAdapter listener) {
        RedisMessageListenerContainer c = new RedisMessageListenerContainer();
        c.setConnectionFactory(factory);
        c.addMessageListener(listener, new PatternTopic("notifications"));
        return c;
    }
}

public class NotificationHandler extends MessageListenerAdapter {
    public void handleMessage(String message) {
        System.out.println("收到消息: " + message);
    }
}
```

## 事务

```bash
# Redis 事务（MULTI / EXEC）
MULTI
INCR counter
INCR counter
EXEC

# 乐观锁（WATCH）
WATCH balance
MULTI
DECRBY balance 100
EXEC  # 如果 balance 被其他客户端修改，返回 nil
```

```java
// Spring Boot 中使用
@Autowired
private StringRedisTemplate redisTemplate;

public void transfer() {
    redisTemplate.execute(new SessionCallback<Object>() {
        @Override
        public Object execute(RedisOperations ops) throws DataAccessException {
            ops.watch("balance");
            ops.multi();
            ops.opsForValue().decrement("balance", 100);
            ops.opsForValue().increment("other", 100);
            return ops.exec();
        }
    });
}
```

## 缓存穿透 / 雪崩 / 击穿

### 缓存穿透（查询不存在的数据）

```java
// 解决方案：缓存空值
public String getUser(String id) {
    String cache = redisTemplate.opsForValue().get("user:" + id);
    if (cache != null) return cache;

    // 防止缓存穿透
    if ("NULL".equals(cache)) return null;

    String user = db.query(id);
    if (user == null) {
        redisTemplate.opsForValue().set("user:" + id, "NULL", 60, TimeUnit.SECONDS);
    } else {
        redisTemplate.opsForValue().set("user:" + id, user, 3600, TimeUnit.SECONDS);
    }
    return user;
}
```

### 缓存雪崩（大量 key 同时过期）

```java
// 解决方案：过期时间加随机值
long baseTimeout = 3600;
long randomTimeout = baseTimeout + new Random().nextInt(600);
redisTemplate.opsForValue().set(key, value, randomTimeout, TimeUnit.SECONDS);
```

### 缓存击穿（热点 key 过期）

```java
// 解决方案：分布式锁，只允许一个线程去查数据库
public String getHotData(String key) {
    String cache = redisTemplate.opsForValue().get(key);
    if (cache != null) return cache;

    // 分布式锁，只让一个请求去查 DB
    String lockKey = "lock:" + key;
    if (redisTemplate.opsForValue().setIfAbsent(lockKey, "1", 10, TimeUnit.SECONDS)) {
        try {
            String data = db.query();
            redisTemplate.opsForValue().set(key, data, 3600, TimeUnit.SECONDS);
            return data;
        } finally {
            redisTemplate.delete(lockKey);
        }
    } else {
        Thread.sleep(100);
        return getHotData(key);  // 重试
    }
}
```

## 练习

```bash
# 1. 开启 AOF 持久化并测试效果
# 2. 使用 SET NX EX 实现分布式锁
# 3. 使用 Pipeline 批量写入 10000 条数据
# 4. 配置 maxmemory-policy 为 allkeys-lru
```
