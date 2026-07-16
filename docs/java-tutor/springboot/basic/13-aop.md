---
title: "AOP 面向切面编程"
order: 13
---

# AOP 面向切面编程

> AOP（Aspect Oriented Programming）允许将横切关注点（日志、事务、权限等）与业务逻辑分离。

## 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

## AOP 核心概念

| 概念 | 说明 |
|------|------|
| Aspect（切面） | 横切关注点的模块化，如日志切面 |
| Join Point（连接点） | 程序执行中的某个点，如方法调用 |
| Pointcut（切入点） | 匹配连接点的表达式 |
| Advice（通知） | 在连接点执行的动作 |
| Weaving（织入） | 将切面应用到目标对象的过程 |

## 通知类型

| 注解 | 说明 |
|------|------|
| `@Before` | 方法执行前 |
| `@After` | 方法执行后（无论是否异常） |
| `@AfterReturning` | 方法正常返回后 |
| `@AfterThrowing` | 方法抛出异常后 |
| `@Around` | 环绕通知，可控制方法执行 |

## 切入点表达式

```java
// 匹配特定方法
@Pointcut("execution(* com.example.service.UserService.findById(..))")

// 匹配所有 Service 方法
@Pointcut("execution(* com.example.service.*.*(..))")

// 匹配所有 public 方法
@Pointcut("execution(public * *(..))")

// 匹配指定注解
@Pointcut("@annotation(org.springframework.web.bind.annotation.GetMapping)")

// 匹配指定包下的所有方法
@Pointcut("within(com.example.service..*)")

// 匹配带有特定注解的 Bean
@Pointcut("@within(org.springframework.stereotype.Service)")
```

## 实战：请求日志切面

```java
@Aspect
@Component
@Slf4j
public class LoggingAspect {

    // 匹配所有 Controller 方法
    @Pointcut("within(@org.springframework.web.bind.annotation.RestController *)")
    public void controllerMethods() {}

    // 匹配所有 Service 方法
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceMethods() {}

    // 请求日志（Around）
    @Around("controllerMethods()")
    public Object logRequest(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();

        // 获取请求信息
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();

        log.info("→ {}.{}() 参数: {}", className, methodName, args);

        try {
            Object result = joinPoint.proceed();
            long elapsed = System.currentTimeMillis() - start;
            log.info("← {}.{}() 返回: {} | 耗时: {}ms",
                    className, methodName, result, elapsed);
            return result;
        } catch (Throwable t) {
            long elapsed = System.currentTimeMillis() - start;
            log.error("✕ {}.{}() 异常: {} | 耗时: {}ms",
                    className, methodName, t.getMessage(), elapsed);
            throw t;
        }
    }

    // 方法执行后记录结果
    @AfterReturning(pointcut = "serviceMethods()", returning = "result")
    public void logServiceResult(JoinPoint joinPoint, Object result) {
        String method = joinPoint.getSignature().toShortString();
        log.debug("Service: {} 返回: {}", method, result);
    }

    // 异常日志
    @AfterThrowing(pointcut = "controllerMethods()", throwing = "ex")
    public void logException(JoinPoint joinPoint, Throwable ex) {
        log.error("异常: {}.{} - {}",
                joinPoint.getTarget().getClass().getSimpleName(),
                joinPoint.getSignature().getName(),
                ex.getMessage());
    }
}
```

## 实战：性能监控切面

```java
@Aspect
@Component
public class PerformanceAspect {

    private final MeterRegistry meterRegistry;

    @Around("@annotation(Monitored)")
    public Object monitorPerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().toShortString();
        Timer.Sample sample = Timer.start(meterRegistry);

        try {
            return joinPoint.proceed();
        } finally {
            sample.stop(Timer.builder("method.execution.time")
                    .description("Method execution time")
                    .tag("method", methodName)
                    .register(meterRegistry));
        }
    }
}

// 自定义注解
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Monitored {}
```

使用：

```java
@Service
public class UserService {

    @Monitored
    public List<User> findAll() {
        // 这个方法会被性能监控
    }
}
```

## 实战：权限校验切面

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequirePermission {
    String value();
}

@Aspect
@Component
public class PermissionAspect {

    @Around("@annotation(requirePermission)")
    public Object checkPermission(ProceedingJoinPoint joinPoint,
                                   RequirePermission requirePermission) throws Throwable {
        String permission = requirePermission.value();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new UnauthorizedException("未认证");
        }

        boolean hasPermission = auth.getAuthorities().stream()
                .anyMatch(g -> g.getAuthority().equals(permission));

        if (!hasPermission) {
            throw new ForbiddenException("无权限: " + permission);
        }

        return joinPoint.proceed();
    }
}
```

使用：

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @DeleteMapping("/{id}")
    @RequirePermission("user:delete")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
```

## 通知执行顺序

```
@Around（proceed 之前）
    ↓
@Before
    ↓
方法执行
    ↓
@AfterReturning（成功） / @AfterThrowing（异常）
    ↓
@After（始终执行）
    ↓
@Around（proceed 之后）
```

## 练习

1. 编写一个 AOP 切面，记录所有 Service 方法的执行耗时
2. 实现一个 `@RateLimit` 注解，通过 AOP 限制接口调用频率
3. 使用 AOP 实现统一的参数校验或数据脱敏
