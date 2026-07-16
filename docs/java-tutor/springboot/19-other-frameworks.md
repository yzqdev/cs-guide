---
order: 19
---

# 其他框架

> 除 Spring 外，Java 生态中其他值得关注的 Web 框架。

## 框架对比

| 框架 | 特点 | 适用场景 | 学习曲线 |
|------|------|---------|---------|
| **Spring Boot** | 生态完善，企业级 | 企业级应用 | 中等 |
| **Quarkus** | 快速启动，云原生 | 微服务、Serverless | 中等 |
| **Micronaut** | 编译时 DI，AOT 友好 | 微服务、云原生 | 中等 |
| **Vert.x** | 响应式，高性能 | 高并发、实时系统 | 较高 |
| **Javalin** | 轻量级，简洁 | 小型 API 服务 | 低 |
| **Ktor** | Kotlin 原生 | Kotlin 微服务 | 低 |
| **http4k** | 函数式，可组合 | 功能型 API | 中等 |

## Quarkus

> 为容器化、云原生打造的 Java 全栈框架，启动速度极快，内存占用极低。

```bash
# 创建项目
mvn io.quarkus.platform:quarkus-maven-plugin:3.6.0:create \
    -DprojectGroupId=com.example \
    -DprojectArtifactId=my-quarkus-app \
    -DclassName="com.example.GreetingResource" \
    -Dpath="/hello"
```

```java
@Path("/hello")
public class GreetingResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello from Quarkus!";
    }
}
```

**特性：**
- 启动时间 < 0.1s
- 内存占用低（~20MB）
- 支持 GraalVM AOT 编译
- 热重载开发体验

> 官网：https://quarkus.io/

## Micronaut

> 基于编译时 DI 的轻量级框架，无需反射，支持 AOT。

```java
@Controller("/hello")
public class HelloController {

    @Get("/{name}")
    @Produces(MediaType.TEXT_PLAIN)
    public String hello(@PathVariable String name) {
        return "Hello " + name;
    }
}
```

**特性：**
- 编译时依赖注入
- 启动速度快
- 内存占用低
- 支持 GraalVM

> 官网：https://micronaut.io/

## Vert.x

> 基于 Netty 的高性能响应式框架，支持多种语言。

```java
Vertx vertx = Vertx.vertx();

vertx.createHttpServer()
    .requestHandler(req -> {
        req.response()
            .putHeader("content-type", "text/plain")
            .end("Hello from Vert.x!");
    })
    .listen(8080, result -> {
        if (result.succeeded()) {
            System.out.println("Server started on port 8080");
        }
    });
```

**特性：**
- 高并发（Event Loop 模型）
- 非阻塞 I/O
- 响应式编程
- 支持 Java、Kotlin、JavaScript、Ruby

> 官网：https://vertx.io/

## Javalin

> 极简的轻量级 Web 框架，受 Koa.js 启发。

```java
public class HelloWorld {
    public static void main(String[] args) {
        Javalin app = Javalin.create().start(7070);

        app.get("/", ctx -> ctx.result("Hello World"));
        app.get("/hello/{name}", ctx -> {
            ctx.result("Hello " + ctx.pathParam("name"));
        });
        app.post("/api/users", ctx -> {
            User user = ctx.bodyAsClass(User.class);
            ctx.json(user);
        });
    }
}
```

**特性：**
- 极简 API，几行代码启动服务
- 支持 WebSocket、HTTP2
- 异步请求
- 易于集成

> 官网：https://javalin.io/

## Ktor

> Kotlin 原生 Web 框架，由 JetBrains 开发。

```kotlin
fun main() {
    embeddedServer(Netty, port = 8080) {
        routing {
            get("/") {
                call.respondText("Hello, Ktor!")
            }
            get("/hello/{name}") {
                val name = call.parameters["name"]
                call.respondText("Hello $name!")
            }
        }
    }.start(wait = true)
}
```

**特性：**
- Kotlin 原生
- 协程支持
- 模块化设计
- 支持客户端和服务端

> 官网：https://ktor.io/

## http4k

> 函数式 HTTP 框架，以"函数组合"为核心理念。

```kotlin
fun main() {
    val app: HttpHandler = { request: Request ->
        Response(OK).body("Hello ${request.query("name")}")
    }
    app.asServer(Jetty(8080)).start()
}
```

**特性：**
- 纯函数式设计
- 类型安全
- 可测试性极强
- 支持多种服务器后端

> 官网：https://www.http4k.org/

## 如何选择

| 你的需求 | 推荐框架 |
|---------|---------|
| 企业级应用，生态完善 | **Spring Boot** |
| 云原生微服务，需要快速启动 | **Quarkus** |
| 高并发，实时系统 | **Vert.x** |
| 轻量级 API 服务 | **Javalin** |
| Kotlin 技术栈 | **Ktor** |
| 函数式编程风格 | **http4k** |
| 编译时优化，低内存 | **Micronaut** |