---
order: 18
---

# GraalVM 原生编译

> 使用 GraalVM 将 Spring Boot 项目编译为原生可执行文件，实现毫秒级启动。

## GraalVM 简介

GraalVM 是一个高性能的 JDK 分发版，支持将 Java 应用编译为**原生可执行文件**（Native Image），带来以下优势：

| 优势 | 说明 |
|------|------|
| **毫秒级启动** | 启动时间从数秒降至数十毫秒 |
| **低内存占用** | 内存占用减少 50% 以上 |
| **无 JIT 预热** | 立即达到峰值性能 |
| **无需 JVM** | 可独立运行，适合容器化部署 |

## 下载安装

### 1. 下载 GraalVM

下载地址：https://github.com/graalvm/graalvm-ce-builds/releases

选择对应操作系统的版本（如 Windows、Linux、macOS）。

### 2. 配置环境变量

```bash
# Windows（设置系统环境变量）
JAVA_HOME=C:\Program Files\GraalVM\graalvm-ce-java17-22.3.0
GRAALVM_HOME=%JAVA_HOME%
Path=%JAVA_HOME%\bin;%Path%

# Linux / macOS（设置 ~/.bashrc 或 ~/.zshrc）
export JAVA_HOME=/opt/graalvm/graalvm-ce-java17-22.3.0
export GRAALVM_HOME=$JAVA_HOME
export PATH=$JAVA_HOME/bin:$PATH
```

### 3. 安装 Native Image 工具

```bash
# 安装 native-image 组件
gu install native-image

# 验证安装
native-image --version
```

## 创建 Spring Boot 3 + GraalVM 项目

### 方式一：使用 start.spring.io

访问 https://start.spring.io/，选择：
- Spring Boot 3.x
- 添加依赖：**GraalVM Native Support**
- 生成项目并下载

### 方式二：手动添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
</dependency>

<!-- GraalVM 原生支持 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.graalvm.buildtools</groupId>
            <artifactId>native-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

## 注意事项

### 1. Maven 仓库配置

GraalVM 的构建插件需要从 Spring 仓库获取：

```xml
<repositories>
    <repository>
        <id>spring-milestones</id>
        <name>Spring Milestones</name>
        <url>https://repo.spring.io/milestone</url>
    </repository>
</repositories>
<pluginRepositories>
    <pluginRepository>
        <id>spring-milestones</id>
        <name>Spring Milestones</name>
        <url>https://repo.spring.io/milestone</url>
    </pluginRepository>
</pluginRepositories>
```

### 2. 反射配置

GraalVM 编译时无法处理反射，需要显式配置：

```java
// 方式一：使用 @RegisterReflectionForBinding
@RegisterReflectionForBinding({User.class, Order.class})
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

```json
// 方式二：在 resources/META-INF/native-image/ 下配置 reflect-config.json
[
  {
    "name": "com.example.User",
    "allDeclaredFields": true,
    "allDeclaredMethods": true
  }
]
```

### 3. 限制与注意事项

| 限制 | 说明 |
|------|------|
| **反射** | 需要显式配置反射访问 |
| **动态代理** | 需要提前注册 |
| **序列化** | 需要配置序列化设置 |
| **资源文件** | 需显式指定 |
| **JDK 代理** | 部分动态特性不支持 |
| **CGLIB 代理** | 不支持，使用 JDK 动态代理 |

## 打包编译

```bash
# Maven 打包为原生镜像
mvn -Pnative -DskipTests package

# 生成的二进制文件在 target/ 目录下
# Windows: target/app.exe
# Linux: target/app
# macOS: target/app

# 运行
./target/app

# 指定端口
./target/app --server.port=8081
```

## 性能对比

| 指标 | 传统 JVM | GraalVM Native |
|------|---------|----------------|
| **启动时间** | 3-5 秒 | 0.05-0.1 秒 |
| **内存占用** | 200-400 MB | 20-50 MB |
| **镜像大小** | 50 MB (fat jar) | 80-150 MB (native) |
| **峰值性能** | 需预热 | 即时达到 |
| **容器化部署** | 需 JRE 基础镜像 | 可使用 Alpine 镜像 |

## 常用命令

```bash
# 安装 GraalVM 组件
gu install native-image
gu install ruby
gu install python
gu install wasm

# 查看已安装组件
gu list

# 更新 GraalVM
gu upgrade

# 编译原生镜像
native-image -jar target/app.jar
```

## 参考链接

- [GraalVM 官方文档](https://www.graalvm.org/docs/)
- [Spring Boot + GraalVM 指南](https://docs.spring.io/spring-boot/docs/current/reference/html/native-image.html)
- [GraalVM 下载](https://github.com/graalvm/graalvm-ce-builds/releases)