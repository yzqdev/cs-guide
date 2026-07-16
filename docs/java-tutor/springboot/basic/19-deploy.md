---
title: "打包与部署"
order: 19
---

# 打包与部署

> Spring Boot 应用可以打包为可执行 JAR 或传统 WAR，支持多种部署方式。

## 打包为 JAR

### Maven

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <excludes>
                    <exclude>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                    </exclude>
                </excludes>
            </configuration>
        </plugin>
    </plugins>
</build>
```

```bash
mvn clean package -DskipTests
# 目标：target/my-app-0.0.1-SNAPSHOT.jar
```

### Gradle

```bash
gradle bootJar
# 目标：build/libs/my-app-0.0.1-SNAPSHOT.jar
```

## 启动 JAR

```bash
# 基本启动
java -jar my-app.jar

# 指定端口
java -jar my-app.jar --server.port=8080

# 激活特定环境
java -jar my-app.jar --spring.profiles.active=prod

# 指定外部配置文件
java -jar my-app.jar --spring.config.location=file:./config/application.yml

# JVM 参数优化
java -Xms512m -Xmx1024m \
     -XX:+UseG1GC \
     -XX:+HeapDumpOnOutOfMemoryError \
     -XX:HeapDumpPath=/var/log/app \
     -jar my-app.jar

# 后台运行
nohup java -jar my-app.jar > app.log 2>&1 &

# systemd 服务
[Unit]
Description=My Spring Boot Application
After=syslog.target network.target

[Service]
User=appuser
ExecStart=/usr/bin/java -Xms512m -Xmx1024m -jar /opt/app/my-app.jar
SuccessExitStatus=143
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

## 打包为 WAR（外置 Tomcat）

```java
@SpringBootApplication
public class MyApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(MyApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

```xml
<packaging>war</packaging>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
</dependency>
```

```bash
mvn clean package -DskipTests
# 目标：target/my-app.war → 部署到 Tomcat webapps/
```

## Docker 部署

### Dockerfile

```dockerfile
# 构建阶段
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN apk add --no-cache maven && mvn package -DskipTests

# 运行阶段
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# 时区
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD wget -qO- http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-Xms256m", "-Xmx512m", "-jar", "app.jar"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/demo?useUnicode=true&characterEncoding=utf8
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=123456
      - SPRING_DATA_REDIS_HOST=redis
    depends_on:
      - db
      - redis
    volumes:
      - ./logs:/app/logs

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=123456
      - MYSQL_DATABASE=demo
      - MYSQL_CHARACTER_SET_SERVER=utf8mb4
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  mysql-data:
```

```bash
# 构建和启动
docker-compose up -d

# 查看日志
docker-compose logs -f app

# 重新构建
docker-compose up -d --build app

# 停止
docker-compose down
```

## 多阶段构建优化

### 分层 JAR

```dockerfile
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline  # 下载依赖

COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# 利用 Spring Boot 的分层 JAR 特性
COPY --from=builder /app/target/*.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

# 按层复制，最大化缓存命中
COPY --from=builder /app/dependencies/ ./
COPY --from=builder /app/spring-boot-loader/ ./
COPY --from=builder /app/snapshot-dependencies/ ./
COPY --from=builder /app/application/ ./

EXPOSE 8080
ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]
```

## 部署策略

| 策略 | 说明 | 适用场景 |
|------|------|---------|
| JAR 直接部署 | `java -jar` 简单直接 | 小型应用、开发测试 |
| Docker 部署 | 容器化部署，环境一致 | 微服务、云原生 |
| Kubernetes | 容器编排，自动扩缩容 | 大规模微服务 |
| 外置 Tomcat | WAR 部署到 Tomcat | 遗留架构 |
| 云平台 | Heroku / AWS / 阿里云 | 快速上云 |

## 性能优化

### JVM 参数

```bash
# G1 垃圾回收器（推荐）
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200
-XX:InitiatingHeapOccupancyPercent=45

# 内存配置
-Xms512m
-Xmx1024m
-XX:MetaspaceSize=128m
-XX:MaxMetaspaceSize=256m

# 调试与监控
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/var/log/app/heapdump.hprof
-XX:+PrintGCDetails
-XX:+PrintGCDateStamps
-Xloggc:/var/log/app/gc.log
```

### Spring Boot 优化

```yaml
# application-prod.yml
spring:
  jpa:
    open-in-view: false         # 关闭 OSIV
    hibernate:
      ddl-auto: validate        # 生产环境不自动改表
  jackson:
    default-property-inclusion: non_null  # 不序列化 null

server:
  tomcat:
    threads:
      max: 200                  # 最大线程数
      min-spare: 10             # 最小空闲线程
    max-connections: 8192       # 最大连接数
    accept-count: 100           # 队列长度
    connection-timeout: 5000ms  # 连接超时
```

## 练习

1. 将你的应用打包为 JAR 并启动运行
2. 编写 Dockerfile 将应用容器化
3. 使用 Docker Compose 编排应用 + MySQL + Redis
4. 配置生产环境的 JVM 参数和性能优化选项
