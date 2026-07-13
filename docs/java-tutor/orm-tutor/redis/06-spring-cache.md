# Spring Cache + Redis

> Spring Cache 抽象层配合 Redis 实现声明式缓存，只需添加注解即可。

## 引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

## 启用缓存

```java
@SpringBootApplication
@EnableCaching  // 启用缓存
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

## 配置

```yaml
spring:
  cache:
    type: redis                    # 使用 Redis 作为缓存
    redis:
      time-to-live: 3600000       # 默认过期时间（毫秒）
      cache-null-values: false    # 不缓存空值
      key-prefix: "cache:"        # key 前缀
      use-key-prefix: true
```

## 配置 Redis 序列化

```java
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory factory) {
        // JSON 序列化
        Jackson2JsonRedisSerializer<Object> jsonSerializer =
            new Jackson2JsonRedisSerializer<>(Object.class);

        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofHours(1))           // 默认过期 1 小时
            .serializeKeysWith(                       // key 用 String 序列化
                RedisSerializationContext.SerializationPair.fromSerializer(
                    new StringRedisSerializer()))
            .serializeValuesWith(                     // value 用 JSON 序列化
                RedisSerializationContext.SerializationPair.fromSerializer(
                    jsonSerializer))
            .disableCachingNullValues();              // 不缓存 null

        // 为不同 cache 设置不同 TTL
        Map<String, RedisCacheConfiguration> configMap = new HashMap<>();
        configMap.put("users", config.entryTtl(Duration.ofMinutes(30)));
        configMap.put("products", config.entryTtl(Duration.ofHours(2)));

        return RedisCacheManager.builder(factory)
            .cacheDefaults(config)
            .withInitialCacheConfigurations(configMap)
            .build();
    }
}
```

## @Cacheable — 缓存查询结果

```java
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 第一次调用执行方法并缓存结果，之后直接从缓存返回
    @Cacheable(value = "users", key = "#id")
    public User getUserById(Long id) {
        slowQuery();  // 模拟慢查询
        return userRepository.findById(id).orElse(null);
    }

    // 多个参数
    @Cacheable(value = "users", key = "#username + ':' + #email")
    public User findByUsernameAndEmail(String username, String email) {
        return userRepository.findByUsernameAndEmail(username, email);
    }

    // 条件缓存（只缓存符合条件的返回）
    @Cacheable(value = "users", condition = "#id > 100")
    public User getSpecialUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // 除非条件（满足条件时不缓存）
    @Cacheable(value = "users", unless = "#result == null")
    public User getUserNotNull(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
```

## @CachePut — 更新缓存

每次都会执行方法，并将结果更新到缓存（常用于更新操作）：

```java
@Service
public class UserService {

    // 更新用户时同时更新缓存
    @CachePut(value = "users", key = "#user.id")
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    // 与 @Cacheable 区别：@CachePut 每次都执行方法
}
```

## @CacheEvict — 删除缓存

```java
@Service
public class UserService {

    // 删除单个缓存
    @CacheEvict(value = "users", key = "#id")
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // 删除所有 users 缓存
    @CacheEvict(value = "users", allEntries = true)
    public void clearAllUsers() {
        // 清空 users 缓存
    }

    // 方法执行前删除缓存
    @CacheEvict(value = "users", key = "#id", beforeInvocation = true)
    public void evictBefore(Long id) {
        // 方法执行前就删除缓存（即使方法抛异常）
    }
}
```

## @Caching — 组合注解

```java
@Service
public class UserService {

    // 同时操作多个缓存
    @Caching(
        put = {
            @CachePut(value = "users", key = "#user.id"),
            @CachePut(value = "users", key = "#user.username")
        },
        evict = {
            @CacheEvict(value = "userLists", allEntries = true)
        }
    )
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
```

## @CacheConfig — 类级别配置

```java
@Service
@CacheConfig(cacheNames = "users")  // 类级别的默认缓存名
public class UserService {

    // 省略了 value，自动使用类级别的 users
    @Cacheable(key = "#id")
    public User getUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @CachePut(key = "#user.id")
    public User save(User user) {
        return userRepository.save(user);
    }

    @CacheEvict(key = "#id")
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
```

## 完整示例

```java
@Service
@CacheConfig(cacheNames = "products")
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // 查询（缓存结果）
    @Cacheable(key = "#id", unless = "#result == null")
    public Product getProduct(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // 查询所有（缓存列表）
    @Cacheable(key = "'all'")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 保存（更新缓存 + 清空列表缓存）
    @Caching(
        put = @CachePut(key = "#product.id"),
        evict = @CacheEvict(key = "'all'")
    )
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // 删除（清除两个缓存）
    @Caching(evict = {
        @CacheEvict(key = "#id"),
        @CacheEvict(key = "'all'")
    })
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
```

## 缓存使用建议

```java
// 1. 只缓存查询多、更新少的数据
// 2. 设置合理的过期时间，避免数据长时间不一致
// 3. 缓存 key 要有业务含义，便于排查
@Cacheable(value = "users", key = "'user:' + #id")

// 4. 返回集合时要小心，更新单个元素时记得清除集合缓存
// 5. 分布式环境下注意缓存一致性问题
// 6. 避免缓存大对象（如大文本内容）
```

## Redis 缓存命中率监控

```bash
# 查看缓存命中率
INFO stats

# 关键指标
# keyspace_hits: 命中次数
# keyspace_misses: 未命中次数
# 命中率 = hits / (hits + misses) * 100%
```

## 练习

```java
// 1. 为 ProductService 添加 @Cacheable 注解
// 2. 配置不同的缓存过期时间（商品 1 小时，分类 2 小时）
// 3. 实现更新商品时自动更新缓存
// 4. 实现删除商品时清除相关缓存
// 5. 监控 Redis 缓存命中率
```
