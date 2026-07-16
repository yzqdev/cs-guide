---
title: "日志"
order: 18
---

# 日志

> Spring Boot 使用 SLF4J + Logback 作为默认日志框架，并支持切换为 Log4j2 等。

## 默认日志配置

```yaml
logging:
  level:
    root: info                   # 全局日志级别
    com.example: debug           # 指定包日志级别
    org.springframework: warn    # 框架日志级别
    org.hibernate.SQL: debug     # JPA SQL 日志

  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"

  file:
    name: logs/app.log           # 日志文件路径
    path: logs                   # 或仅指定目录
    max-size: 10MB               # 单个文件最大大小
    max-history: 7               # 保留天数
    total-size-cap: 1GB          # 总大小上限

  logback:
    rollingpolicy:
      max-file-size: 10MB
      max-history: 14
      total-size-cap: 2GB
      clean-history-on-start: false
```

## 使用 Slf4j 记录日志

```java
// 方式一：Lombok
@Slf4j
@Service
public class UserService {
    public void create(User user) {
        log.info("创建用户: {}", user.getName());
        log.debug("用户详情: {}", user);
        try {
            // ...
        } catch (Exception e) {
            log.error("创建用户失败: {}", user.getName(), e);
        }
    }
}

// 方式二：手动声明
@Service
public class OrderService {
    private static final Logger log = LoggerFactory.getLogger(OrderService.class);
}
```

## Logback 配置（推荐 XML）

```xml
<!-- src/main/resources/logback-spring.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <!-- 读取 Spring Boot 配置 -->
    <springProperty name="APP_NAME" source="spring.application.name" defaultValue="app"/>
    <springProperty name="LOG_PATH" source="logging.file.path" defaultValue="logs"/>

    <!-- 控制台输出 -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %highlight(%-5level) %cyan(%logger{36}) - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!-- 文件滚动输出 -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_PATH}/${APP_NAME}.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${LOG_PATH}/${APP_NAME}.%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!-- 错误日志单独输出 -->
    <appender name="ERROR_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_PATH}/${APP_NAME}-error.log</file>
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>ERROR</level>
        </filter>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${LOG_PATH}/${APP_NAME}-error.%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!-- 异步输出 -->
    <appender name="ASYNC_FILE" class="ch.qos.logback.classic.AsyncAppender">
        <appender-ref ref="FILE"/>
        <queueSize>512</queueSize>
        <discardingThreshold>0</discardingThreshold>
    </appender>

    <!-- 开发环境 -->
    <springProfile name="dev">
        <root level="INFO">
            <appender-ref ref="CONSOLE"/>
            <appender-ref ref="ASYNC_FILE"/>
        </root>
        <logger name="com.example" level="DEBUG"/>
    </springProfile>

    <!-- 生产环境 -->
    <springProfile name="prod">
        <root level="WARN">
            <appender-ref ref="ASYNC_FILE"/>
            <appender-ref ref="ERROR_FILE"/>
        </root>
        <logger name="com.example" level="INFO"/>
    </springProfile>

</configuration>
```

## 切换为 Log4j2

```xml
<!-- pom.xml: 排除默认 Logback，引入 Log4j2 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-log4j2</artifactId>
</dependency>
```

```xml
<!-- src/main/resources/log4j2-spring.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
    <Properties>
        <Property name="LOG_PATH">logs</Property>
        <Property name="PATTERN">%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %c{1.} - %msg%n</Property>
    </Properties>

    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="${PATTERN}"/>
        </Console>
        <RollingFile name="File" fileName="${LOG_PATH}/app.log"
                     filePattern="${LOG_PATH}/app.%d{yyyy-MM-dd}.log">
            <PatternLayout pattern="${PATTERN}"/>
            <Policies>
                <TimeBasedTriggeringPolicy/>
            </Policies>
        </RollingFile>
    </Appenders>

    <Loggers>
        <Logger name="com.example" level="debug"/>
        <Root level="info">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="File"/>
        </Root>
    </Loggers>
</Configuration>
```

## MDC（Mapped Diagnostic Context）

```java
// 过滤器：为每个请求添加跟踪 ID
@Component
public class MDCFilter implements Filter {

    private static final String TRACE_ID = "traceId";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        try {
            MDC.put(TRACE_ID, UUID.randomUUID().toString().substring(0, 8));
            chain.doFilter(request, response);
        } finally {
            MDC.clear();
        }
    }
}
```

```xml
<!-- logback 中引用 MDC -->
<pattern>%d [%thread] %-5level [%X{traceId}] %logger{36} - %msg%n</pattern>
```

## 日志级别动态修改

```java
// 通过 Actuator
POST /actuator/loggers/com.example
{
    "configuredLevel": "DEBUG"
}
```

```java
// 或编程方式
@Component
public class LogManager {
    private final LoggingSystem loggingSystem;

    public LogManager(LoggingSystem loggingSystem) {
        this.loggingSystem = loggingSystem;
    }

    public void setLevel(String packageName, LogLevel level) {
        loggingSystem.setLogLevel(packageName, level);
    }
}
```

## 最佳实践

### 日志级别使用建议

| 级别 | 使用场景 |
|------|---------|
| ERROR | 影响功能的异常、系统故障 |
| WARN | 不预期但可自动恢复的情况 |
| INFO | 重要的业务执行节点 |
| DEBUG | 开发调试信息，生产环境关闭 |
| TRACE | 非常详细的跟踪信息 |

```java
// 推荐用法
log.info("用户 {} 创建订单 #{}，金额: {}", userId, orderId, amount);
log.warn("库存不足: productId={}, requested={}, available={}", productId, requested, available);

// 异常一定要传 exception 参数
try {
    // ...
} catch (Exception e) {
    log.error("处理失败: orderId={}", orderId, e);  // 正确的做法
    // log.error("处理失败: orderId={}, error={}", orderId, e.getMessage());  // ❌ 丢失堆栈
}

// 使用占位符而非字符串拼接
log.info("user: {}", name);     // ✓
log.info("user: " + name);      // ✗ 即使不输出也会执行拼接
```

## 练习

1. 配置 Logback 将日志按天滚动，保留 30 天
2. 实现 MDC 过滤器，为每个请求生成 traceId
3. 配置不同环境（dev/prod）使用不同的日志级别和输出方式
4. 通过 Actuator 修改指定包的日志级别
