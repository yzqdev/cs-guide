---
title: "依赖注入与 Bean 管理"
order: 4
---

# 依赖注入与 Bean 管理

> 理解 Spring 的核心 — IoC（控制反转）和 DI（依赖注入）。

## IoC 与 DI 概念

**控制反转（IoC）**：对象的创建和生命周期由 Spring 容器管理，而不是由开发者手动 new。

**依赖注入（DI）**：容器自动将依赖对象注入到需要的地方。

```
传统方式：Service 需要 new UserDAO()
Spring 方式：容器自动将 UserDAO 注入到 Service
```

## 声明 Bean 的注解

| 注解 | 适用场景 |
|------|---------|
| `@Component` | 通用组件 |
| `@Service` | 业务层 |
| `@Repository` | 数据访问层 |
| `@Controller` | Web 控制器 |
| `@RestController` | REST 控制器 |
| `@Configuration` | 配置类 |
| `@Bean` | 配置类中声明第三方 Bean |

### 使用示例

```java
// 方式一：注解
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}

// 方式二：@Bean
@Configuration
public class AppConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

## 依赖注入方式

### 1. 构造方法注入（推荐）

```java
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Spring Boot 自动推断，无需 @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
}
```

### 2. Setter 注入

```java
@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

### 3. 字段注入（不推荐）

```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;  // 字段注入，不利于测试
}
```

### 4. Lombok 简化

```java
@Service
@RequiredArgsConstructor  // 为 final 字段生成构造方法
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
}
```

## Bean 的作用域

```java
@Component
@Scope("singleton")     // 默认：整个容器只有一个实例
public class SingletonBean {}

@Component
@Scope("prototype")     // 每次获取都创建新实例
public class PrototypeBean {}

@Component
@Scope("request")       // 每个 HTTP 请求一个实例
@Scope("session")       // 每个 HTTP Session 一个实例
public class RequestBean {}
```

| 作用域 | 说明 |
|--------|------|
| singleton | 默认，容器中只创建一个实例 |
| prototype | 每次请求/注入都创建新实例 |
| request | 仅 Web 应用，每个 HTTP 请求一个实例 |
| session | 仅 Web 应用，每个 HTTP Session 一个实例 |
| application | 仅 Web 应用，每个 ServletContext 一个实例 |

## Bean 生命周期

```java
@Component
public class LifecycleBean {

    public LifecycleBean() {
        System.out.println("1. 实例化 Bean");
    }

    @PostConstruct
    public void init() {
        System.out.println("2. 初始化（依赖注入完成后）");
    }

    @PreDestroy
    public void destroy() {
        System.out.println("3. 销毁前（容器关闭时）");
    }
}
```

### 完整生命周期

```
实例化 → 属性赋值（DI） → BeanNameAware → ApplicationContextAware
    → @PostConstruct → InitializingBean → 初始化方法（initMethod）
    → Bean 就绪，可以使用
    → 容器关闭 → @PreDestroy → DisposableBean → 销毁方法（destroyMethod）
```

## 条件装配

```java
@Configuration
public class DataSourceConfig {

    @Bean
    @ConditionalOnProperty(name = "db.type", havingValue = "mysql")
    public DataSource mysqlDataSource() {
        return new MysqlDataSource();
    }

    @Bean
    @ConditionalOnProperty(name = "db.type", havingValue = "h2", matchIfMissing = true)
    public DataSource h2DataSource() {
        return new H2DataSource();
    }

    @Bean
    @ConditionalOnMissingBean
    public DefaultBean defaultBean() {
        return new DefaultBean();
    }

    @Bean
    @ConditionalOnClass(name = "redis.clients.jedis.Jedis")
    public RedisTemplate<String, Object> redisTemplate() {
        return new RedisTemplate<>();
    }
}
```

## @Primary 与 @Qualifier

```java
// 当有多个同类型 Bean 时
@Component
@Primary  // 优先注入
public class MysqlUserDao implements UserDao {}

@Component
public class MongoUserDao implements UserDao {}

@Service
public class UserService {
    private final UserDao userDao;

    // 使用 @Qualifier 指定具体实现
    public UserService(@Qualifier("mongoUserDao") UserDao userDao) {
        this.userDao = userDao;
    }
}
```

## 练习

1. 创建一个 `SmsService` 接口及其两个实现（`AliyunSmsService`, `TencentSmsService`）
2. 通过 `@ConditionalOnProperty` 根据配置文件选择具体的短信实现
3. 使用 `@Primary` 标记默认实现
