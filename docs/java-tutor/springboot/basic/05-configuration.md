---
title: "配置管理"
order: 5
---

# 配置管理

> Spring Boot 提供了灵活的外部化配置机制，支持多种配置来源和绑定方式。

## application.properties 与 application.yml

### properties 格式

```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/db
spring.datasource.username=root
spring.datasource.password=123456
```

### yml 格式（推荐）

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db
    username: root
    password: 123456
```

> YAML 层次结构更清晰，但要注意缩进严格。

## @Value 注入

```java
@Component
public class AppConfig {

    @Value("${app.name}")
    private String appName;

    @Value("${app.version:1.0.0}")  // 默认值
    private String version;

    @Value("${server.port}")
    private int port;

    @Value("#{systemProperties['java.home']}")  // SPEL 表达式
    private String javaHome;

    @Value("${app.servers:dev,test,prod}")
    private String[] servers;
}
```

```yaml
app:
  name: MyApp
  version: 2.0.0
```

## @ConfigurationProperties（推荐）

```yaml
app:
  name: MyApp
  version: 2.0.0
  contact:
    name: 管理员
    email: admin@example.com
  security:
    jwt-secret: my-secret-key
    jwt-expiration: 86400
  servers:
    - dev.example.com
    - prod.example.com
```

```java
@Component
@ConfigurationProperties(prefix = "app")
@Data
public class AppProperties {
    private String name;
    private String version;
    private Contact contact;
    private Security security;
    private List<String> servers;

    @Data
    public static class Contact {
        private String name;
        private String email;
    }

    @Data
    public static class Security {
        private String jwtSecret;
        private long jwtExpiration;
    }
}
```

使用时注入：

```java
@Service
@RequiredArgsConstructor
public class AppService {
    private final AppProperties appProperties;

    public void printInfo() {
        System.out.println(appProperties.getName());
        System.out.println(appProperties.getContact().getEmail());
    }
}
```

### 启用 @ConfigurationProperties

方式一：`@Component`

方式二：`@EnableConfigurationProperties`

```java
@Configuration
@EnableConfigurationProperties(AppProperties.class)
public class PropertiesConfig {}
```

方式三：`@ConfigurationPropertiesScan`

```java
@SpringBootApplication
@ConfigurationPropertiesScan("com.example.config")
public class MyApplication {}
```

## 类型安全的配置校验

```java
@Component
@ConfigurationProperties(prefix = "app")
@Validated
@Data
public class AppProperties {

    @NotBlank
    private String name;

    @Min(1)
    @Max(999)
    private int maxConnections;

    @Email
    private String adminEmail;

    @NotEmpty
    private List<String> allowedOrigins;

    @DurationUnit(ChronoUnit.SECONDS)
    private Duration timeout;

    @DataSizeUnit(DataUnit.MEGABYTES)
    private DataSize maxFileSize;
}
```

```yaml
app:
  name: MyApp
  max-connections: 100
  admin-email: admin@example.com
  allowed-origins:
    - http://localhost:3000
  timeout: 30s
  max-file-size: 10MB
```

## 随机属性

```yaml
app:
  secret: ${random.value}               # 随机字符串
  number: ${random.int}                 # 随机整数
  range: ${random.int(100,200)}         # 指定范围
  uuid: ${random.uuid}                  # UUID
  long: ${random.long}                  # 随机 Long
```

## 多环境配置

### 文件命名

```
application.yml             # 通用配置
application-dev.yml         # 开发环境
application-test.yml        # 测试环境
application-prod.yml        # 生产环境
```

### 激活方式

```yaml
# application.yml
spring:
  profiles:
    active: dev
```

```bash
# 命令行
java -jar app.jar --spring.profiles.active=prod

# 环境变量
export SPRING_PROFILES_ACTIVE=prod
```

### 多文档 YAML

```yaml
# application.yml
spring:
  profiles:
    active: dev

server:
  port: 8080

---
spring:
  config:
    activate:
      on-profile: dev

server:
  port: 8080
  servlet:
    context-path: /dev

---
spring:
  config:
    activate:
      on-profile: prod

server:
  port: 80
  servlet:
    context-path: /
```

## profile-specific 配置类

```java
@Configuration
@Profile("dev")
public class DevConfig {
    @Bean
    public DataSource dataSource() {
        return new H2DataSource();  // 开发环境用 H2
    }
}

@Configuration
@Profile("prod")
public class ProdConfig {
    @Bean
    public DataSource dataSource() {
        return new MysqlDataSource();  // 生产环境用 MySQL
    }
}
```

## 外部化配置

```bash
# 指定外部配置文件
java -jar app.jar --spring.config.location=file:./config/application.yml

# 指定多个位置
java -jar app.jar --spring.config.additional-location=file:./custom.yml

# 环境变量
export SERVER_PORT=9090
export SPRING_DATASOURCE_URL=jdbc:mysql://prod-db:3306/db

# 命令行参数
java -jar app.jar --server.port=9090 --app.name=MyApp
```

## 配置文件的优先级（从高到低）

1. 命令行参数
2. JNDI 属性
3. 系统属性
4. OS 环境变量
5. `application-{profile}.properties/yml`（jar 包外）
6. `application-{profile}.properties/yml`（jar 包内）
7. `application.properties/yml`（jar 包外）
8. `application.properties/yml`（jar 包内）
9. `@PropertySource`

## 练习

1. 使用 `@ConfigurationProperties` 定义一个 `JwtProperties`，包含 `secret`、`expiration`、`issuer`
2. 为不同环境配置不同的数据库连接
3. 使用随机属性生成应用密钥
