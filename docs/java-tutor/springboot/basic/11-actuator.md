---
title: "Actuator 监控与管理"
order: 11
---

# Actuator 监控与管理

> Spring Boot Actuator 提供了生产级的应用监控和管理功能。

## 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

## 配置

```yaml
management:
  endpoints:
    web:
      exposure:
        include: "*"           # 暴露所有端点
        exclude: env,beans     # 排除敏感端点
      base-path: /actuator     # 端点基础路径（默认）
  endpoint:
    health:
      show-details: always     # 显示健康详情
    shutdown:
      enabled: true            # 启用 shutdown（慎用）
  info:
    env:
      enabled: true
    build:
      enabled: true
    git:
      enabled: true
      mode: full
```

## 常用端点

| 端点 | 说明 | 是否敏感 |
|------|------|---------|
| `/actuator/health` | 应用健康状态 | 否 |
| `/actuator/info` | 应用信息 | 否 |
| `/actuator/metrics` | 指标信息 | 否 |
| `/actuator/env` | 环境属性 | 是 |
| `/actuator/beans` | Spring Bean 列表 | 是 |
| `/actuator/configprops` | 配置属性 | 是 |
| `/actuator/mappings` | URL 映射 | 是 |
| `/actuator/loggers` | 日志级别 | 是 |
| `/actuator/threaddump` | 线程 Dump | 是 |
| `/actuator/heapdump` | 堆 Dump | 是 |
| `/actuator/shutdown` | 关闭应用 | 是 |

## 健康检查

```bash
# 基础健康检查
GET /actuator/health

# 响应示例
{
  "status": "UP",
  "components": {
    "db": {
      "status": "UP",
      "details": {
        "database": "H2",
        "validationQuery": "isValid()"
      }
    },
    "redis": {
      "status": "UP",
      "details": {
        "version": "6.2.6"
      }
    },
    "diskSpace": {
      "status": "UP",
      "details": {
        "total": 499963170816,
        "free": 123456789,
        "threshold": 10485760
      }
    }
  }
}
```

### 自定义 Health Indicator

```java
@Component
public class CustomHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        boolean isHealthy = checkExternalService();
        if (isHealthy) {
            return Health.up()
                    .withDetail("service", "External API")
                    .withDetail("latency", "12ms")
                    .build();
        }
        return Health.down()
                .withDetail("service", "External API")
                .withDetail("error", "Connection timeout")
                .build();
    }

    private boolean checkExternalService() {
        // 模拟检查外部服务
        return true;
    }
}
```

## 指标 (Metrics)

```bash
# 查看所有可用指标
GET /actuator/metrics

# 查看具体指标
GET /actuator/metrics/jvm.memory.used
GET /actuator/metrics/http.server.requests
GET /actuator/metrics/system.cpu.usage
```

### 自定义 Metrics

```java
@Component
public class OrderMetrics {

    private final Counter orderCreatedCounter;
    private final Counter orderCancelledCounter;
    private final DistributionSummary orderAmount;

    public OrderMetrics(MeterRegistry registry) {
        this.orderCreatedCounter = Counter.builder("order.created.total")
                .description("Total orders created")
                .register(registry);

        this.orderCancelledCounter = Counter.builder("order.cancelled.total")
                .description("Total orders cancelled")
                .register(registry);

        this.orderAmount = DistributionSummary.builder("order.amount")
                .description("Order amount distribution")
                .baseUnit("yuan")
                .register(registry);
    }

    public void recordCreated() {
        orderCreatedCounter.increment();
    }

    public void recordCancelled() {
        orderCancelledCounter.increment();
    }

    public void recordAmount(double amount) {
        orderAmount.record(amount);
    }
}
```

```java
@Service
public class OrderService {

    private final OrderMetrics orderMetrics;

    public Order create(Order order) {
        // ... 业务逻辑
        orderMetrics.recordCreated();
        orderMetrics.recordAmount(order.getTotalAmount());
        return savedOrder;
    }
}
```

## 应用信息

```yaml
# application.yml
info:
  app:
    name: '@project.name@'
    version: '@project.version@'
    description: '@project.description@'
  contact:
    name: 运维团队
    email: ops@example.com
```

```xml
<!-- pom.xml: 需启用资源过滤 -->
<resources>
    <resource>
        <directory>src/main/resources</directory>
        <filtering>true</filtering>
    </resource>
</resources>
```

### 自定义 InfoContributor

```java
@Component
public class CustomInfoContributor implements InfoContributor {

    @Override
    public void contribute(Info.Builder builder) {
        builder.withDetail("deploy",
                Map.of("region", "cn-north-1",
                       "instance", "i-12345678",
                       "lastDeploy", "2024-06-15 10:00:00"));
    }
}
```

```bash
# 响应
GET /actuator/info
{
  "app": {
    "name": "my-app",
    "version": "1.0.0"
  },
  "contact": {
    "name": "运维团队",
    "email": "ops@example.com"
  },
  "deploy": {
    "region": "cn-north-1",
    "instance": "i-12345678",
    "lastDeploy": "2024-06-15 10:00:00"
  }
}
```

## 动态修改日志级别

```bash
# 查看当前日志级别
GET /actuator/loggers/com.example

# 响应
{
  "configuredLevel": null,
  "effectiveLevel": "INFO"
}

# 动态修改
POST /actuator/loggers/com.example
Content-Type: application/json

{
  "configuredLevel": "DEBUG"
}
```

## 安全保护

生产环境应对 Actuator 端点进行安全保护：

```java
@Configuration
public class ActuatorSecurityConfig {

    @Bean
    public SecurityFilterChain actuatorFilterChain(HttpSecurity http) throws Exception {
        http.securityMatcher("/actuator/**")
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/actuator/info").permitAll()
                .anyRequest().hasRole("ADMIN"))
            .httpBasic(withDefaults());
        return http.build();
    }
}
```

或者通过端口隔离：

```yaml
management:
  server:
    port: 8081          # 使用独立端口
  endpoints:
    web:
      base-path: /
```

## 练习

1. 集成 Actuator 并暴露所有端点
2. 创建一个自定义 Health Indicator，监控某个外部 API 是否可用
3. 使用自定义 Metrics 统计接口调用次数和响应时间
4. 通过 Actuator 动态修改某个包的日志级别
