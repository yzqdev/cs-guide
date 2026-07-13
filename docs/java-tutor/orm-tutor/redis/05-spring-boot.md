# Spring Boot 集成 Redis

> Spring Boot 使用 RedisTemplate 操作 Redis 的完整指南。

## 引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!-- 连接池（可选，推荐） -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

### Gradle

```kotlin
implementation("org.springframework.boot:spring-boot-starter-data-redis")
implementation("org.apache.commons:commons-pool2")
```

## 配置文件

```yaml
spring:
  data:
    redis:
      host: localhost
      port: 6379
      password: 123456
      database: 0               # 默认库
      timeout: 3000ms            # 连接超时
      lettuce:
        pool:
          max-active: 16         # 最大连接数
          max-idle: 8            # 最大空闲连接
          min-idle: 2            # 最小空闲连接
          max-wait: 3000ms       # 获取连接超时
```

## Redis 序列化配置

```java
@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);

        // JSON 序列化
        Jackson2JsonRedisSerializer<Object> jsonSerializer =
            new Jackson2JsonRedisSerializer<>(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.activateDefaultTyping(LazyValidatorPolymorphicTypeValidator.apply(), ObjectMapper.DefaultTyping.NON_FINAL);
        jsonSerializer.setObjectMapper(om);

        // String 序列化
        StringRedisSerializer stringSerializer = new StringRedisSerializer();

        // key 使用 String 序列化
        template.setKeySerializer(stringSerializer);
        template.setHashKeySerializer(stringSerializer);

        // value 使用 JSON 序列化
        template.setValueSerializer(jsonSerializer);
        template.setHashValueSerializer(jsonSerializer);

        template.afterPropertiesSet();
        return template;
    }

    @Bean
    public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory factory) {
        return new StringRedisTemplate(factory);
    }
}
```

## StringRedisTemplate（推荐）

如果存储的都是字符串，推荐直接使用 `StringRedisTemplate`：

```java
@Service
public class RedisStringService {

    @Autowired
    private StringRedisTemplate redis;

    // 基本操作
    public void set(String key, String value) {
        redis.opsForValue().set(key, value);
    }

    public String get(String key) {
        return redis.opsForValue().get(key);
    }

    // 带过期时间
    public void setex(String key, String value, long timeout) {
        redis.opsForValue().set(key, value, timeout, TimeUnit.SECONDS);
    }

    // 分布式锁
    public boolean tryLock(String key, String value, long timeout) {
        return Boolean.TRUE.equals(
            redis.opsForValue().setIfAbsent(key, value, timeout, TimeUnit.SECONDS));
    }

    public void unlock(String key, String value) {
        String script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
        redis.execute(new DefaultRedisScript<>(script, Long.class),
            Collections.singletonList(key), value);
    }

    // 自增
    public Long increment(String key) {
        return redis.opsForValue().increment(key);
    }

    // 设置过期
    public boolean expire(String key, long timeout) {
        return Boolean.TRUE.equals(redis.expire(key, timeout, TimeUnit.SECONDS));
    }

    // 判断存在
    public boolean exists(String key) {
        return Boolean.TRUE.equals(redis.hasKey(key));
    }

    // 删除
    public void delete(String key) {
        redis.delete(key);
    }

    // 批量获取
    public List<String> multiGet(Collection<String> keys) {
        return redis.opsForValue().multiGet(keys);
    }
}
```

## Hash 操作

```java
@Service
public class RedisHashService {

    @Autowired
    private StringRedisTemplate redis;

    // 设置 hash 字段
    public void hset(String key, String field, String value) {
        redis.opsForHash().put(key, field, value);
    }

    // 获取 hash 字段
    public String hget(String key, String field) {
        return (String) redis.opsForHash().get(key, field);
    }

    // 获取所有字段
    public Map<Object, Object> hgetAll(String key) {
        return redis.opsForHash().entries(key);
    }

    // 批量设置
    public void hmset(String key, Map<String, String> map) {
        redis.opsForHash().putAll(key, map);
    }

    // 删除字段
    public void hdel(String key, Object... fields) {
        redis.opsForHash().delete(key, fields);
    }

    // 自增 hash 字段
    public Long hincr(String key, String field, long delta) {
        return redis.opsForHash().increment(key, field, delta);
    }

    // 判断字段是否存在
    public boolean hexists(String key, String field) {
        return redis.opsForHash().hasKey(key, field);
    }
}
```

## List 操作

```java
@Service
public class RedisListService {

    @Autowired
    private StringRedisTemplate redis;

    // 左端插入（栈）
    public void lpush(String key, String value) {
        redis.opsForList().leftPush(key, value);
    }

    // 右端插入（队列）
    public void rpush(String key, String value) {
        redis.opsForList().rightPush(key, value);
    }

    // 左端弹出
    public String lpop(String key) {
        return redis.opsForList().leftPop(key);
    }

    // 右端弹出
    public String rpop(String key) {
        return redis.opsForList().rightPop(key);
    }

    // 范围获取
    public List<String> lrange(String key, long start, long end) {
        return redis.opsForList().range(key, start, end);
    }

    // 列表长度
    public Long llen(String key) {
        return redis.opsForList().size(key);
    }
}
```

## Set 操作

```java
@Service
public class RedisSetService {

    @Autowired
    private StringRedisTemplate redis;

    // 添加
    public void sadd(String key, String... values) {
        redis.opsForSet().add(key, values);
    }

    // 获取所有成员
    public Set<String> smembers(String key) {
        return redis.opsForSet().members(key);
    }

    // 判断是否成员
    public boolean sismember(String key, String value) {
        return Boolean.TRUE.equals(redis.opsForSet().isMember(key, value));
    }

    // 成员数量
    public Long scard(String key) {
        return redis.opsForSet().size(key);
    }

    // 交集
    public Set<String> sinter(String key1, String key2) {
        return redis.opsForSet().intersect(key1, key2);
    }

    // 并集
    public Set<String> sunion(String key1, String key2) {
        return redis.opsForSet().union(key1, key2);
    }

    // 差集
    public Set<String> sdiff(String key1, String key2) {
        return redis.opsForSet().difference(key1, key2);
    }
}
```

## ZSet 操作

```java
@Service
public class RedisZSetService {

    @Autowired
    private StringRedisTemplate redis;

    // 添加
    public boolean zadd(String key, String value, double score) {
        return Boolean.TRUE.equals(redis.opsForZSet().add(key, value, score));
    }

    // 获取排名（升序）
    public Set<String> zrange(String key, long start, long end) {
        return redis.opsForZSet().range(key, start, end);
    }

    // 获取排名（降序）
    public Set<String> zrevrange(String key, long start, long end) {
        return redis.opsForZSet().reverseRange(key, start, end);
    }

    // 获取排名
    public Long zrank(String key, String value) {
        return redis.opsForZSet().rank(key, value);
    }

    // 获取分数
    public Double zscore(String key, String value) {
        return redis.opsForZSet().score(key, value);
    }

    // 增加分数
    public Double zincrby(String key, String value, double delta) {
        return redis.opsForZSet().incrementScore(key, value, delta);
    }

    // 按分数范围获取
    public Set<String> zrangeByScore(String key, double min, double max) {
        return redis.opsForZSet().rangeByScore(key, min, max);
    }

    // 统计分数范围
    public Long zcount(String key, double min, double max) {
        return redis.opsForZSet().count(key, min, max);
    }

    // 移除
    public Long zrem(String key, String... values) {
        return redis.opsForZSet().remove(key, (Object[]) values);
    }
}
```

## 通用操作

```java
@Service
public class RedisKeyService {

    @Autowired
    private StringRedisTemplate redis;

    // 设置过期时间
    public boolean expire(String key, long timeout) {
        return Boolean.TRUE.equals(redis.expire(key, timeout, TimeUnit.SECONDS));
    }

    // 查看剩余时间
    public Long getExpire(String key) {
        return redis.getExpire(key, TimeUnit.SECONDS);
    }

    // 判断存在
    public boolean exists(String key) {
        return Boolean.TRUE.equals(redis.hasKey(key));
    }

    // 删除
    public boolean delete(String key) {
        return Boolean.TRUE.equals(redis.delete(key));
    }

    // 批量删除
    public long delete(Collection<String> keys) {
        Long count = redis.delete(keys);
        return count != null ? count : 0;
    }

    // 按模式查找 key
    public Set<String> keys(String pattern) {
        return redis.keys(pattern);
    }

    // 按模式批量删除
    public long deleteByPattern(String pattern) {
        Set<String> keys = redis.keys(pattern);
        if (keys != null && !keys.isEmpty()) {
            Long count = redis.delete(keys);
            return count != null ? count : 0;
        }
        return 0;
    }

    // 重命名
    public boolean rename(String oldKey, String newKey) {
        return Boolean.TRUE.equals(redis.renameIfAbsent(oldKey, newKey));
    }

    // 随机获取 key
    public String randomKey() {
        return redis.randomKey();
    }

    // 持久化（取消过期）
    public boolean persist(String key) {
        return Boolean.TRUE.equals(redis.persist(key));
    }
}
```

## 使用示例

```java
@RestController
@RequestMapping("/cache")
public class CacheController {

    @Autowired
    private RedisStringService stringService;
    @Autowired
    private RedisHashService hashService;

    // 缓存字符串
    @PostMapping("/string")
    public void setString(@RequestParam String key, @RequestParam String value) {
        stringService.setex(key, value, 3600);
    }

    @GetMapping("/string/{key}")
    public String getString(@PathVariable String key) {
        return stringService.get(key);
    }

    // 缓存对象（Hash）
    @PostMapping("/user/{id}")
    public void setUser(@PathVariable Long id, @RequestBody User user) {
        Map<String, String> map = new HashMap<>();
        map.put("name", user.getName());
        map.put("age", String.valueOf(user.getAge()));
        map.put("email", user.getEmail());
        hashService.hmset("user:" + id, map);
    }

    @GetMapping("/user/{id}")
    public Map<Object, Object> getUser(@PathVariable Long id) {
        return hashService.hgetAll("user:" + id);
    }

    // 计数器
    @PostMapping("/incr/{key}")
    public Long increment(@PathVariable String key) {
        return stringService.increment(key);
    }
}
```

## 练习

```java
// 1. 配置 RedisTemplate，使用 JSON 序列化
// 2. 实现用户信息的 Hash 缓存
// 3. 实现商品排行榜（ZSet）
// 4. 实现一个简单的消息队列（List + 阻塞弹出）
// 5. 实现分布式锁，防止重复提交订单
```
