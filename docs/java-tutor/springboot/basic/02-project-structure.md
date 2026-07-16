---
title: "项目结构与配置详解"
order: 2
---

# 项目结构与配置详解

> 深入理解 Spring Boot 的项目结构、启动原理和配置体系。

## Maven 项目结构

```
my-app/
├── pom.xml                                  # Maven 项目描述文件
├── src/
│   ├── main/
│   │   ├── java/com/example/myapp/
│   │   │   ├── MyApplication.java           # 主启动类
│   │   │   ├── config/                      # 配置类
│   │   │   ├── controller/                  # 控制器
│   │   │   ├── service/                     # 服务层
│   │   │   ├── repository/                  # 数据访问层
│   │   │   ├── entity/                      # 实体类
│   │   │   ├── dto/                         # 数据传输对象
│   │   │   ├── common/                      # 通用类
│   │   │   │   ├── Result.java              # 统一响应
│   │   │   │   └── GlobalExceptionHandler.java
│   │   │   └── util/                        # 工具类
│   │   └── resources/
│   │       ├── application.yml              # 主配置文件
│   │       ├── application-dev.yml          # 开发环境配置
│   │       ├── application-prod.yml         # 生产环境配置
│   │       ├── static/                      # 静态资源（CSS/JS/图片）
│   │       ├── templates/                   # 模板文件（Thymeleaf 等）
│   │       ├── messages.properties          # 国际化文件
│   │       └── db/
│   │           └── migration/               # Flyway 迁移脚本
│   └── test/
│       └── java/com/example/myapp/
│           ├── MyApplicationTests.java
│           ├── controller/
│           └── service/
└── Dockerfile                               # Docker 部署文件
```

## pom.xml 详解

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>

    <!-- 继承 Spring Boot 父工程 -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.0</version>
        <relativePath/>
    </parent>

    <!-- 项目坐标 -->
    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>my-app</name>
    <description>My Spring Boot Application</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

### 关键点

- `spring-boot-starter-parent` 提供了依赖版本管理，无需指定版本号
- `spring-boot-maven-plugin` 负责打包为可执行 JAR

## Gradle 项目结构

```groovy
// build.gradle
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.3.0'
    id 'io.spring.dependency-management' version '1.1.5'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'

java {
    sourceCompatibility = '17'
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

tasks.named('test') {
    useJUnitPlatform()
}
```

## 主启动类

```java
package com.example.myapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

### @SpringBootApplication 组合注解

| 注解 | 作用 |
|------|------|
| `@SpringBootConfiguration` | 标记为配置类，等同于 `@Configuration` |
| `@EnableAutoConfiguration` | 启用自动配置机制 |
| `@ComponentScan` | 扫描当前包及其子包下的组件 |

### Spring Boot 启动流程

```
main() 方法
    ↓
SpringApplication.run()
    ↓
判断应用类型（Reactive / Servlet）
    ↓
加载 ApplicationContextInitializer
    ↓
加载 ApplicationListener
    ↓
准备 Environment（加载配置文件）
    ↓
创建 ApplicationContext
    ↓
执行自动配置（Auto-Configuration）
    ↓
启动内嵌 Web 服务器
    ↓
执行 CommandLineRunner / ApplicationRunner
    ↓
应用启动完成
```

## 配置文件体系

### 配置文件优先级（从高到低）

1. 命令行参数：`--server.port=9090`
2. JNDI 属性
3. 系统环境变量
4. `application-{profile}.properties/yml`
5. `application.properties/yml`
6. `@PropertySource` 加载的配置

### YAML 基础语法

```yaml
# 基本键值对
server:
  port: 8080

# 对象
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db
    username: root
    password: 123456

# 数组
my:
  servers:
    - dev.example.com
    - prod.example.com

# 多文档 YAML（用 --- 分隔）
server:
  port: 8080
---
spring:
  config:
    activate:
      on-profile: prod
server:
  port: 80
```

### 多环境配置

```yaml
# application.yml（主配置）
spring:
  profiles:
    active: dev
---
spring:
  config:
    activate:
      on-profile: dev
server:
  port: 8080
---
spring:
  config:
    activate:
      on-profile: prod
server:
  port: 80
```

或使用多个文件：
- `application-dev.yml`
- `application-prod.yml`
- `application-test.yml`

```bash
# 激活指定环境
java -jar my-app.jar --spring.profiles.active=prod
```

## 常用配置项

```yaml
server:
  port: 8080                    # 服务端口
  servlet:
    context-path: /api          # 上下文路径

spring:
  application:
    name: my-app                # 应用名称
  profiles:
    active: dev                 # 激活的 profile
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: Asia/Shanghai
  main:
    banner-mode: off            # 关闭启动 Banner

logging:
  level:
    root: info
    com.example: debug
```

## 练习

1. 创建一个项目，分别配置 `dev` 和 `prod` 两个环境
2. 在 `dev` 环境下使用 H2 内存数据库，`prod` 下使用 MySQL
3. 通过命令行参数启动时覆盖端口号
