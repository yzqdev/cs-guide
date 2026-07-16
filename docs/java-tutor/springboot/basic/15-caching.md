---
title: "缓存"
order: 15
---

# 缓存

> Spring Boot 提供了声明式缓存支持，可以轻松集成多种缓存实现。

## 启用缓存

```java
@SpringBootApplication
@EnableCaching
public class MyApplication {}
```

## 缓存注解

| 注解 | 说明 |
|------|------|
| `@Cacheable` | 方法执行前先查缓存，有则直接返回，无则执行并缓存结果 |
| `@CachePut` | 始终执行方法，并将结果更新到缓存 |
| `@CacheEvict` | 清除缓存 |
| `@Caching` | 组合多个缓存操作 |
| `@CacheConfig` | 类级别共享缓存配置 |

### @Cacheable

```java
@Service
public class UserService {

    // 基本使用
    @Cacheable(value = "users", key = "#id")
    public User findById(Long id) {
        slowQuery();  // 模拟慢查询
        return userRepository.findById(id).orElseThrow();
    }

    // 多个条件 key
    @Cacheable(value = "users", key = "#name + ':' + #email")
    public User findByNameAndEmail(String name, String email) {
        return userRepository.findByNameAndEmail(name, email);
    }

    // 按条件缓存
    @Cacheable(value = "users", condition = "#id > 10")
    public User findWithCondition(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    // SpEL 表达式 key
    @Cacheable(value = "users", key = "#result?.id")
    public User findByEmail(@Cacheable String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }
}
```

### @CachePut

```java
@CachePut(value = "users", key = "#user.id")
public User update(User user) {
    return userRepository.save(user);
}
```

### @CacheEvict

```java
// 清除单个缓存
@CacheEvict(value = "users", key = "#id")
public void delete(Long id) {
    userRepository.deleteById(id);
}

// 清除所有 users 缓存
@CacheEvict(value = "users", allEntries = true)
public void clearAll() {
    // 清空操作
}

// 方法执行前清除
@CacheEvict(value = "users", key = "#id", beforeInvocation = true)
public void evictBefore(Long id) {
    // 即使方法抛出异常，缓存也会被清除
}
```

### @Caching

```java
@Caching(
    cacheable = @Cacheable(value = "users", key = "#email"),
    put = @CachePut(value = "users", key = "#result.id")
)
public User findByEmailCached(String email) {
    return userRepository.findByEmail(email).orElseThrow();
}
```

## 缓存实现

### 1. 默认：ConcurrentHashMap（开发用）

无需额外配置，Spring Boot 自动配置 `SimpleCacheManager`。

### 2. Caffeine（推荐生产用）

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<!-- 排除默认的 simple，引入 Caffeine -->
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
</dependency>
```

```yaml
spring:
  cache:
    type: caffeine
    cache-names: users,orders,products
    caffeine:
      spec: maximumSize=500,expireAfterWrite=10m,recordStats
```

编程方式配置：

```java
@Configuration
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.setCacheNames(List.of("users", "orders", "products"));
        cacheManager.setCaffeine(Caffeine.newBuilder()
                .maximumSize(500)                    // 最大条目数
                .expireAfterWrite(10, TimeUnit.MINUTES)  // 写入后过期
                .expireAfterAccess(30, TimeUnit.MINUTES) // 访问后过期
                .recordStats()                       // 开启统计
        );
        return cacheManager;
    }
}
```

### 3. Redis

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

```yaml
spring:
  cache:
    type: redis
    redis:
      time-to-live: 10m        # 全局 TTL
      cache-null-values: false # 不缓存 null
      use-key-prefix: true
      key-prefix: myapp:
```

自定义 Redis 缓存配置：

```java
@Configuration
public class RedisCacheConfig {

    @Bean
    public RedisCacheManagerBuilderCustomizer redisCacheManagerBuilderCustomizer() {
        return builder -> builder
                .withCacheConfiguration("users",
                        RedisCacheConfiguration.defaultCacheConfig()
                                .entryTtl(Duration.ofMinutes(30))
                                .prefixCacheNameWith("cache:users:"))
                .withCacheConfiguration("orders",
                        RedisCacheConfiguration.defaultCacheConfig()
                                .entryTtl(Duration.ofHours(2)));
    }
}
```

## 缓存统计

```java
@Component
@RequiredArgsConstructor
public class CacheMetrics {

    private final CacheManager cacheManager;

    public void printStats() {
        if (cacheManager instanceof CaffeineCacheManager cm) {
            cm.getCacheNames().forEach(name -> {
                Cache cache = cm.getCache(name);
                if (cache != null) {
                    Object nativeCache = cache.getNativeCache();
                    if (nativeCache instanceof com.github.benmanes.caffeine.cache.Cache<?, ?> c) {
                        CacheStats stats = c.stats();
                        log.info("Cache '{}': hitRate={}, missCount={}, hitCount={}",
                                name,
                                stats.hitRate(),
                                stats.missCount(),
                                stats.hitCount());
                    }
                }
            });
        }
    }
}
```

## 最佳实践

```java
@Service
@CacheConfig(cacheNames = "users")  // 类级别统一缓存名
public class UserService {

    @Cacheable(key = "#id")
    public User findById(Long id) { ... }

    @CachePut(key = "#result.id")
    @CacheEvict(key = "#result.email")  // 同时清除 email 缓存
    public User create(User user) { ... }

    @CachePut(key = "#user.id")
    public User update(User user) { ... }

    @CacheEvict(allEntries = true)
    public void deleteAll() { ... }
}
```

## 练习

1. 将 UserService 的查询方法使用 `@Cacheable` 缓存
2. 配置 Redis 作为缓存实现
3. 为不同缓存设置不同的过期时间（用户缓存 30 分钟，订单缓存 2 小时）
4. 实现缓存统计，监控缓存命中率
