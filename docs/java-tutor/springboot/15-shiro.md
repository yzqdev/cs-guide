---
order: 15
---

# Shiro 整合

> Apache Shiro 与 Spring Boot 整合配置，实现认证与授权。

## Shiro 简介

Apache Shiro 是一个功能强大且灵活的 Java 安全框架，用于身份验证、授权、加密和会话管理。

### 核心功能

| 功能 | 说明 |
|------|------|
| **Authentication** | 身份认证（登录） |
| **Authorization** | 授权（权限控制） |
| **Session Management** | 会话管理 |
| **Cryptography** | 加密（密码、数据） |
| **Remember Me** | 记住我功能 |

## 添加依赖

### Maven

```xml
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-spring-boot-starter</artifactId>
    <version>1.13.0</version>
</dependency>
```

### Gradle（Kotlin DSL）

```kotlin
implementation(platform("org.apache.shiro:shiro-bom:2.0.1"))

implementation("org.apache.shiro:shiro-core") { artifact { classifier = "jakarta" } }
implementation("org.apache.shiro:shiro-spring-boot-starter") { artifact { classifier = "jakarta" } }
implementation("org.apache.shiro:shiro-spring-boot-web-starter") { artifact { classifier = "jakarta" } }
implementation("org.apache.shiro:shiro-web") { artifact { classifier = "jakarta" } }
implementation("org.apache.shiro:shiro-spring") { artifact { classifier = "jakarta" } }
```

## 配置 Shiro

### 1. Realm 实现

```java
@Component
public class UserRealm extends AuthorizingRealm {

    @Autowired
    private UserService userService;

    // 授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        User user = (User) principals.getPrimaryPrincipal();

        // 添加角色
        Set<String> roles = userService.findRoles(user.getId());
        info.setRoles(roles);

        // 添加权限
        Set<String> permissions = userService.findPermissions(user.getId());
        info.setStringPermissions(permissions);

        return info;
    }

    // 认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token)
            throws AuthenticationException {
        UsernamePasswordToken upToken = (UsernamePasswordToken) token;
        String username = upToken.getUsername();

        User user = userService.findByUsername(username);
        if (user == null) {
            throw new UnknownAccountException("用户不存在");
        }

        return new SimpleAuthenticationInfo(user, user.getPassword(), getName());
    }
}
```

### 2. Shiro 配置类

```java
@Configuration
public class ShiroConfig {

    @Bean
    public ShiroFilterFactoryBean shiroFilter(SecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
        shiroFilter.setSecurityManager(securityManager);

        // 登录页面
        shiroFilter.setLoginUrl("/login");
        // 未授权页面
        shiroFilter.setUnauthorizedUrl("/403");

        // 过滤链配置
        Map<String, String> filterMap = new LinkedHashMap<>();

        // 静态资源不拦截
        filterMap.put("/static/**", "anon");
        filterMap.put("/css/**", "anon");
        filterMap.put("/js/**", "anon");
        filterMap.put("/images/**", "anon");

        // Swagger 不拦截
        filterMap.put("/swagger/**", "anon");
        filterMap.put("/v3/api-docs", "anon");
        filterMap.put("/swagger-ui.html", "anon");
        filterMap.put("/swagger-resources/**", "anon");
        filterMap.put("/webjars/**", "anon");

        // 登录接口不拦截
        filterMap.put("/login", "anon");
        filterMap.put("/register", "anon");
        filterMap.put("/captcha.jpg", "anon");

        // 其他所有请求都需要认证
        filterMap.put("/**", "authc");

        shiroFilter.setFilterChainDefinitionMap(filterMap);
        return shiroFilter;
    }

    @Bean
    public SecurityManager securityManager(UserRealm userRealm) {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(userRealm);
        return securityManager;
    }

    @Bean
    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }
}
```

## 使用 Shiro 注解

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    // 需要登录
    @GetMapping("/info")
    @RequiresAuthentication
    public Result getUserInfo() {
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        return Result.success(user);
    }

    // 需要管理员角色
    @GetMapping("/list")
    @RequiresRoles("admin")
    public Result getUserList() {
        return Result.success(userService.findAll());
    }

    // 需要特定权限
    @PostMapping("/create")
    @RequiresPermissions("user:create")
    public Result createUser(@RequestBody User user) {
        userService.create(user);
        return Result.success();
    }

    // 同时需要多个权限
    @DeleteMapping("/{id}")
    @RequiresPermissions(value = {"user:delete", "user:admin"}, logical = Logical.AND)
    public Result deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return Result.success();
    }
}
```

## 与 Spring Security 对比

| 特性 | Shiro | Spring Security |
|------|-------|----------------|
| **学习成本** | 低，API 简洁 | 高，配置复杂 |
| **功能** | 核心安全功能 | 功能全面 |
| **Spring 集成** | 良好 | 原生集成 |
| **社区活跃度** | 一般 | 活跃 |
| **OAuth2 支持** | 需额外配置 | 内置支持 |
| **适用场景** | 中小型项目 | 企业级项目 |

## 常见问题

### 1. Swagger 无法访问

```java
// 确保在 Shiro 过滤链中放行 Swagger 资源
filterMap.put("/swagger-ui/**", "anon");
filterMap.put("/v3/api-docs/**", "anon");
filterMap.put("/swagger-resources/**", "anon");
filterMap.put("/webjars/**", "anon");
```

### 2. @RequiresPermissions 注解不生效

```java
@Bean
public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
    DefaultAdvisorAutoProxyCreator creator = new DefaultAdvisorAutoProxyCreator();
    creator.setUsePrefix(true);
    return creator;
}
```

### 3. 跨域问题

```java
// 在 Shiro 配置中新增跨域过滤器
Map<String, Filter> filters = new HashMap<>();
filters.put("cors", new CorsFilter());
shiroFilter.setFilters(filters);
filterMap.put("/**", "cors,authc");
```