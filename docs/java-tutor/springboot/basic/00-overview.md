---
title: "Spring Boot 概述与环境搭建"
order: 0
---

# Spring Boot 概述与环境搭建

> Spring Boot 是 Spring 框架的扩展，旨在简化 Spring 应用的初始搭建和开发过程。

## 什么是 Spring Boot

Spring Boot 提供了：
- **自动配置** — 根据依赖自动配置 Spring 应用
- **起步依赖** — 将常用依赖打包，一键引入
- **内嵌服务器** — 内嵌 Tomcat、Jetty、Undertow
- **生产就绪** — 内置指标、健康检查、外部化配置

### 对比 Spring Framework

| 特性 | Spring Framework | Spring Boot |
|------|-----------------|-------------|
| 配置方式 | XML / 注解，手动配置 | 自动配置 + application.yml |
| 服务器 | 需外置 Tomcat | 内嵌 Tomcat / Jetty / Undertow |
| 依赖管理 | 手动管理版本 | starter 起步依赖 + 版本管理 |
| 打包部署 | WAR → 外置服务器 | JAR → java -jar |
| 监控 | 需自行集成 | 内置 Actuator |

## 环境要求

| 工具 | 版本要求 |
|------|---------|
| JDK | 17+（Spring Boot 3.x）/ 8+（Spring Boot 2.x） |
| Maven | 3.6+ |
| Gradle | 7.x+（可选） |
| IDE | IntelliJ IDEA / VS Code / Eclipse |

## 开发工具安装

### 1. JDK 安装

```bash
# 检查 JDK 版本
java -version

# 推荐使用 JDK 17（LTS）或 21（LTS）
# 下载地址：https://adoptium.net/
```

### 2. Maven 安装（可选，可使用 Maven Wrapper）

```bash
# 检查 Maven 版本
mvn -v

# Maven 配置文件位置：~/.m2/settings.xml
```

### 3. IDE 选择

- **IntelliJ IDEA** — 推荐，社区版免费，Ultimate 版对 Spring Boot 支持更好
- **VS Code** — 安装 Extension Pack for Java + Spring Boot Extension Pack
- **Eclipse** — 安装 Spring Tools Suite (STS) 插件

## 创建项目的方式

### 方式一：Spring Initializr（网页）

访问 [https://start.spring.io/](https://start.spring.io/)，选择：

| 选项 | 示例值 |
|------|--------|
| Project | Maven / Gradle |
| Language | Java |
| Spring Boot | 3.3.x |
| Group | com.example |
| Artifact | demo |
| Java | 17 |
| Dependencies | Spring Web, Spring Data JPA, etc. |

点击 Generate，下载 ZIP 并解压。

### 方式二：Spring Initializr（IDEA）

`File → New → Project → Spring Initializr`，按向导创建。

### 方式三：命令行（curl）

```bash
curl https://start.spring.io/starter.zip \
  -d type=maven-project \
  -d language=java \
  -d bootVersion=3.3.0 \
  -d groupId=com.example \
  -d artifactId=demo \
  -d javaVersion=17 \
  -d dependencies=web,jpa,mysql \
  -o demo.zip
```

## 项目导入与启动

### 导入 IDEA

`File → Open` → 选择项目目录 → 等待 Maven/Gradle 下载依赖

### 项目结构

```
demo/
├── pom.xml                    # Maven 构建文件
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demo/
│   │   │       └── DemoApplication.java    # 主启动类
│   │   └── resources/
│   │       ├── application.properties      # 配置文件
│   │       └── static/                     # 静态资源
│   └── test/
│       └── java/
│           └── com/example/demo/
│               └── DemoApplicationTests.java
```

### 启动应用

```java
// DemoApplication.java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

```bash
# Maven 启动
mvn spring-boot:run

# 或打包后启动
mvn package -DskipTests
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

访问 `http://localhost:8080` 验证启动成功。

## 添加一个简单的 REST 接口

```java
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
```

重启后访问 `http://localhost:8080/hello`，应返回 `Hello, Spring Boot!`。

## 练习

1. 通过 Spring Initializr 创建一个包含 `Spring Web` 依赖的项目
2. 添加一个返回当前时间的接口 `/now`
3. 修改 `application.properties`，将端口改为 `9090`
