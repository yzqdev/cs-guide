# Fiber 完整教程

<Catalog />

[Fiber](https://github.com/gofiber/fiber) 是一个受 Express.js 启发的 Go Web 框架，以零内存分配和高性能著称。如果你熟悉 Express，Fiber 的 API 会让你感到亲切。

## 安装

```bash
go get -u github.com/gofiber/fiber/v2
```

## 快速开始

```go
package main

import "github.com/gofiber/fiber/v2"

func main() {
    app := fiber.New()

    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Hello, World!")
    })

    app.Listen(":3000")
}
```

## 路由

### 基本路由

```go
app := fiber.New()

// HTTP 方法
app.Get("/", handler)
app.Post("/", handler)
app.Put("/", handler)
app.Delete("/", handler)
app.Patch("/", handler)
app.Head("/", handler)
app.Options("/", handler)

// 匹配所有方法
app.All("/all", handler)

// 无匹配路由
app.Use(func(c *fiber.Ctx) error {
    return c.Status(404).SendString("路由不存在")
})
```

### 路由参数

```go
// 路径参数 /user/123
app.Get("/user/:id", func(c *fiber.Ctx) error {
    id := c.Params("id")
    return c.JSON(fiber.Map{"id": id})
})

// 可选参数 /user/ 或 /user/123
app.Get("/user/:id?", func(c *fiber.Ctx) error {
    id := c.Params("id", "default")
    return c.JSON(fiber.Map{"id": id})
})

// 通配符 /user/任意/路径
app.Get("/user/*", func(c *fiber.Ctx) error {
    wildcard := c.Params("*")
    return c.JSON(fiber.Map{"path": wildcard})
})

// 查询参数 /search?q=go&page=1
app.Get("/search", func(c *fiber.Ctx) error {
    q := c.Query("q")
    page := c.QueryInt("page", 1)
    return c.JSON(fiber.Map{"q": q, "page": page})
})
```

### 路由分组

```go
// 基本分组
api := app.Group("/api")
api.Get("/users", getUsers)
api.Post("/users", createUser)
api.Get("/users/:id", getUser)
api.Put("/users/:id", updateUser)
api.Delete("/users/:id", deleteUser)

// 嵌套分组
v1 := app.Group("/api/v1")
v1.Get("/users", handler)

v2 := app.Group("/api/v2")
v2.Get("/users", handler)

// 带中间件的分组
admin := app.Group("/admin", authMiddleware)
admin.Get("/dashboard", dashboardHandler)
admin.Get("/stats", statsHandler)
```

### 路由命名

```go
app.Get("/user/:id", handler).Name("user.profile")
app.Get("/posts", handler).Name("posts.list")

// 获取路由 URL（带参数）
url, _ := app.GetRoute("user.profile").URL(fiber.Map{"id": "123"})
// url = "/user/123"
```

## 请求处理

### Context 方法

```go
app.Post("/", func(c *fiber.Ctx) error {
    // 路径参数
    id := c.Params("id")

    // 查询参数
    name := c.Query("name")
    page := c.QueryInt("page", 1)
    limit := c.QueryFloat("limit", 10.0)
    active := c.QueryBool("active", true)

    // 请求头
    token := c.Get("Authorization")
    contentType := c.Get("Content-Type")

    // 路由信息
    path := c.Path()
    method := c.Method()
    host := c.Hostname()
    ip := c.IP()
    protocol := c.Protocol() // http / https

    // Cookie
    sessionId := c.Cookies("session_id")
    c.Cookie(&fiber.Cookie{
        Name:  "token",
        Value: "abc123",
        // 可选配置
        Expires: time.Now().Add(24 * time.Hour),
        HTTPOnly: true,
        Secure:   true,
        SameSite: "lax",
    })

    // 请求体原始数据
    body := c.Body()

    return c.SendString("OK")
})
```

### 请求体绑定

```go
type User struct {
    Name    string `json:"name" xml:"name" form:"name"`
    Email   string `json:"email" xml:"email" form:"email"`
    Age     int    `json:"age" form:"age"`
}

app.Post("/user", func(c *fiber.Ctx) error {
    user := new(User)

    // 自动检测 Content-Type 绑定
    if err := c.BodyParser(user); err != nil {
        return c.Status(400).JSON(fiber.Map{
            "error": "解析失败: " + err.Error(),
        })
    }

    // 单独接收表单
    name := c.FormValue("name")
    email := c.FormValue("email")

    // 多值表单
    ids := c.FormValueMultiple("ids")

    return c.JSON(user)
})

// 参数验证
type CreateUserRequest struct {
    Name  string `json:"name" validate:"required,min=2,max=20"`
    Email string `json:"email" validate:"required,email"`
    Age   int    `json:"age" validate:"gte=1,lte=150"`
}

app.Post("/validate", func(c *fiber.Ctx) error {
    req := new(CreateUserRequest)
    if err := c.BodyParser(req); err != nil {
        return err
    }

    // 使用 go-playground/validator
    validate := validator.New()
    if err := validate.Struct(req); err != nil {
        return c.Status(400).JSON(fiber.Map{
            "error": err.Error(),
        })
    }

    return c.JSON(req)
})
```

## 响应

### JSON 响应

```go
// Map
c.JSON(fiber.Map{"message": "success", "data": nil})

// 结构体
c.JSON(user)

// 数组
c.JSON([]User{user1, user2})

// 带状态码
c.Status(201).JSON(fiber.Map{"created": true})
```

### 其他响应类型

```go
// 纯文本
c.SendString("hello world")

// 字节
c.Send([]byte("hello"))

// XML
c.XML(fiber.Map{"message": "hello"})

// 文件
c.SendFile("./readme.md")
c.Download("./report.pdf", "报告.pdf")

// 重定向
c.Redirect("https://example.com")
c.Redirect("/login", fiber.StatusFound)

// JSONP
c.JSONP(fiber.Map{"name": "张三"}, "callback")

// 设置响应头
c.Set("X-Custom-Header", "value")
c.Type("json", "utf-8")

// 设置状态码
c.Status(201)
c.SendStatus(204) // 发送状态码 + 状态文本

// 附件（下载）
c.Attachment()
c.SendFile("./photo.jpg")
```

## 中间件

### 内置中间件

```go
import (
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
    "github.com/gofiber/fiber/v2/middleware/logger"
    "github.com/gofiber/fiber/v2/middleware/recover"
    "github.com/gofiber/fiber/v2/middleware/compress"
    "github.com/gofiber/fiber/v2/middleware/limiter"
    "github.com/gofiber/fiber/v2/middleware/helmet"
    "github.com/gofiber/fiber/v2/middleware/etag"
    "github.com/gofiber/fiber/v2/middleware/monitor"
)

// CORS
app.Use(cors.New(cors.Config{
    AllowOrigins:     "https://example.com, http://localhost:3000",
    AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
    AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
    AllowCredentials: true,
    ExposeHeaders:    "Content-Length",
    MaxAge:           86400,
}))

// 日志
app.Use(logger.New(logger.Config{
    Format: "[${time}] ${status} - ${method} ${path} ${latency}\n",
    TimeFormat: "2006-01-02 15:04:05",
}))

// 崩溃恢复
app.Use(recover.New())

// 压缩
app.Use(compress.New(compress.Config{
    Level: compress.LevelBestSpeed,
}))

// 限流
app.Use(limiter.New(limiter.Config{
    Max:        100,                // 最大请求数
    Expiration: 1 * time.Minute,    // 时间窗口
    KeyGenerator: func(c *fiber.Ctx) string {
        return c.IP()
    },
    LimitReached: func(c *fiber.Ctx) error {
        return c.Status(429).JSON(fiber.Map{"error": "请求过于频繁"})
    },
}))

// 安全头
app.Use(helmet.New())

// ETag
app.Use(etag.New())

// 监控面板
app.Get("/metrics", monitor.New())
```

### 自定义中间件

```go
// 日志中间件
app.Use(func(c *fiber.Ctx) error {
    start := time.Now()
    err := c.Next()
    log.Printf("[%s] %s %s - %v",
        c.Method(), c.Path(), c.IP(), time.Since(start))
    return err
})

// 认证中间件
func AuthMiddleware() fiber.Handler {
    return func(c *fiber.Ctx) error {
        token := c.Get("Authorization")
        if token == "" {
            return c.Status(401).JSON(fiber.Map{
                "error": "缺少认证信息",
            })
        }
        // 验证 token
        userId, err := validateToken(token)
        if err != nil {
            return c.Status(401).JSON(fiber.Map{
                "error": "token 无效",
            })
        }
        // 存储到上下文
        c.Locals("userId", userId)
        return c.Next()
    }
}

// 使用
app.Use(AuthMiddleware())
// 或分组使用
app.Group("/admin", AuthMiddleware())
```

## 静态文件服务

```go
// 简单静态目录
app.Static("/", "./public")

// 带前缀
app.Static("/static", "./public")

// 完整配置
app.Static("/assets", "./assets", fiber.Static{
    Compress:      true,        // 启用压缩
    ByteRange:     true,        // 支持范围请求
    Browse:        false,       // 禁止目录浏览
    Index:         "index.html", // 默认首页
    CacheDuration: 10 * time.Second, // 缓存时间
    MaxAge:        3600,        // max-age 秒
})
```

## 文件上传

```go
// 单文件
app.Post("/upload", func(c *fiber.Ctx) error {
    file, err := c.FormFile("file")
    if err != nil {
        return c.Status(400).JSON(fiber.Map{
            "error": "文件未找到",
        })
    }

    // 大小限制（Fiber 全局配置）
    // app := fiber.New(fiber.Config{BodyLimit: 10 * 1024 * 1024})

    // 保存文件
    savePath := fmt.Sprintf("./uploads/%s", file.Filename)
    if err := c.SaveFile(file, savePath); err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "保存失败"})
    }

    return c.JSON(fiber.Map{
        "filename": file.Filename,
        "size":     file.Size,
        "url":      "/uploads/" + file.Filename,
    })
})

// 多文件
app.Post("/uploads", func(c *fiber.Ctx) error {
    form, err := c.MultipartForm()
    if err != nil {
        return err
    }

    files := form.File["files"]
    var urls []string
    for _, file := range files {
        savePath := fmt.Sprintf("./uploads/%s", file.Filename)
        c.SaveFile(file, savePath)
        urls = append(urls, "/uploads/"+file.Filename)
    }

    return c.JSON(fiber.Map{"urls": urls})
})
```

## 模板引擎

Fiber 支持多种模板引擎，通过 `fiber.Views` 接口集成。

```go
import (
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/template/html/v2"
)

func main() {
    // 创建模板引擎
    engine := html.New("./views", ".html")

    app := fiber.New(fiber.Config{
        Views: engine,
    })

    app.Get("/", func(c *fiber.Ctx) error {
        return c.Render("index", fiber.Map{
            "Title": "首页",
            "User":  fiber.Map{"Name": "张三", "Age": 25},
        })
    })

    app.Listen(":3000")
}
```

模板文件 `views/index.html`：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>{{.Title}}</title>
  </head>
  <body>
    <h1>{{.Title}}</h1>
    <p>用户: {{.User.Name}}, 年龄: {{.User.Age}}</p>
  </body>
</html>
```

## 分组与路由表

```go
// 显示所有注册路由
app.Get("/routes", func(c *fiber.Ctx) error {
    routes := app.Stack()
    for _, routeGroup := range routes {
        for _, route := range routeGroup {
            fmt.Printf("%s %s\n", route.Method, route.Path)
        }
    }
    return c.JSON(routes)
})
```

## 错误处理

```go
// 自定义错误处理
app := fiber.New(fiber.Config{
    ErrorHandler: func(c *fiber.Ctx, err error) error {
        code := fiber.StatusInternalServerError
        message := "服务器内部错误"

        if e, ok := err.(*fiber.Error); ok {
            code = e.Code
            message = e.Message
        }

        // 记录日志
        log.Printf("错误: %s, 路径: %s", err.Error(), c.Path())

        return c.Status(code).JSON(fiber.Map{
            "code":    code,
            "message": message,
        })
    },
})

// 主动返回错误
app.Get("/error", func(c *fiber.Ctx) error {
    return fiber.NewError(fiber.StatusBadRequest, "参数错误")
})
```

## 测试

```go
import (
    "io"
    "net/http/httptest"
    "testing"
    "github.com/gofiber/fiber/v2"
    "github.com/stretchr/testify/assert"
)

func TestHelloRoute(t *testing.T) {
    app := fiber.New()
    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Hello, World!")
    })

    // 测试请求
    req := httptest.NewRequest("GET", "/", nil)
    resp, _ := app.Test(req)

    assert.Equal(t, 200, resp.StatusCode)

    body, _ := io.ReadAll(resp.Body)
    assert.Equal(t, "Hello, World!", string(body))
}

func TestJSONRoute(t *testing.T) {
    app := fiber.New()
    app.Get("/user", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{"name": "张三"})
    })

    req := httptest.NewRequest("GET", "/user", nil)
    resp, _ := app.Test(req, -1) // -1 不超时

    assert.Equal(t, 200, resp.StatusCode)
    assert.Equal(t, "application/json", resp.Header.Get("Content-Type"))
}
```

## WebSocket

```go
import "github.com/gofiber/contrib/websocket"

app.Get("/ws", websocket.New(func(c *websocket.Conn) {
    defer c.Close()

    for {
        // 读消息
        mt, msg, err := c.ReadMessage()
        if err != nil {
            break
        }
        // 写消息
        c.WriteMessage(mt, []byte("收到: "+string(msg)))
    }
}))

// 带路由参数
app.Get("/ws/:id", websocket.New(func(c *websocket.Conn) {
    id := c.Params("id")
    log.Printf("客户端 %s 连接", id)

    for {
        _, msg, err := c.ReadMessage()
        if err != nil {
            break
        }
        c.WriteMessage(websocket.TextMessage, msg)
    }
}))
```

## 配置

```go
app := fiber.New(fiber.Config{
    // 应用名称
    AppName: "MyApp v1.0",

    // 请求体大小限制（默认 4MB）
    BodyLimit: 10 * 1024 * 1024, // 10MB

    // 并发限制
    Concurrency: 256 * 1024,

    // 是否启用 prefork（多进程）
    Prefork: false,

    // 优雅关机关闭超时
    ShutdownTimeout: 10 * time.Second,

    // 读取超时
    ReadTimeout: 5 * time.Second,

    // 写入超时
    WriteTimeout: 10 * time.Second,

    // 空闲超时
    IdleTimeout: 120 * time.Second,

    // 自定义错误处理
    ErrorHandler: func(c *fiber.Ctx, err error) error {
        return c.Status(500).SendString("错误: " + err.Error())
    },

    // 禁用 Keep-Alive
    DisableKeepalive: false,

    // 返回 Server 头
    ServerHeader: "Fiber",
})
```

## 优雅关机

```go
func main() {
    app := fiber.New()

    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Hello")
    })

    // 监听中断信号
    c := make(chan os.Signal, 1)
    signal.Notify(c, os.Interrupt, syscall.SIGTERM)

    go func() {
        <-c
        log.Println("正在关闭服务...")
        if err := app.ShutdownWithTimeout(10 * time.Second); err != nil {
            log.Printf("关闭超时: %v", err)
        }
    }()

    // 启动服务
    if err := app.Listen(":3000"); err != nil {
        log.Panic(err)
    }
}
```

## Prefork 模式

```go
import "runtime"

func main() {
    app := fiber.New(fiber.Config{
        Prefork: true, // 利用多核 CPU
    })

    // 等同于
    app := fiber.New()
    app.Prefork = true

    app.Listen(":3000")
    // 会自动启动 runtime.NumCPU() 个进程
}
```

## Client（HTTP 客户端）

Fiber 也内置了 HTTP 客户端：

```go
import "github.com/gofiber/fiber/v2"

client := fiber.AcquireClient()
defer fiber.ReleaseClient(client)

// GET 请求
resp, err := client.Get("https://api.example.com/users")
if err != nil {
    log.Fatal(err)
}
body := resp.Body()
fmt.Println(string(body))

// POST JSON
resp, err = client.Post("https://api.example.com/users").
    Set("Authorization", "Bearer token").
    Body(`{"name":"张三","email":"zhangsan@example.com"}`).
    JSON()

// 带超时
resp, err = client.Get("https://api.example.com").
    Timeout(5 * time.Second)
```

## 监听 TLS

```go
// 使用证书
app.ListenTLS(":443", "./cert.pem", "./key.pem")

// 使用 Let's Encrypt（自动证书）
import "github.com/gofiber/autocert"

app.Listen(":443")
app.Use(autocert.New("example.com"))
```
