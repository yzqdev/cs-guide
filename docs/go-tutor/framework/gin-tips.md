# Gin 完整教程

<Catalog />

[Gin](https://github.com/gin-gonic/gin) 是 Go 最流行的 HTTP 框架，以高性能和轻量著称。它提供了 Martini 风格的 API，但性能提升了 40 倍。

## 安装

```bash
go get -u github.com/gin-gonic/gin
```

## 快速开始

```go
package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default() // 默认包含 Logger 和 Recovery 中间件
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "pong"})
    })
    r.Run() // 默认 :8080
}
```

## 路由

### 基本路由

```go
r := gin.Default()

// HTTP 方法路由
r.GET("/get", handler)
r.POST("/post", handler)
r.PUT("/put", handler)
r.DELETE("/delete", handler)
r.PATCH("/patch", handler)
r.HEAD("/head", handler)
r.OPTIONS("/options", handler)

// 匹配所有方法
r.Any("/any", handler)

// 无匹配路由
r.NoRoute(func(c *gin.Context) {
    c.JSON(404, gin.H{"code": 404, "msg": "路由不存在"})
})

// 无匹配方法
r.NoMethod(func(c *gin.Context) {
    c.JSON(405, gin.H{"code": 405, "msg": "方法不允许"})
})
```

### 路由参数

```go
// 路径参数 /user/123
r.GET("/user/:id", func(c *gin.Context) {
    id := c.Param("id")
    c.JSON(200, gin.H{"id": id})
})

// 查询参数 /search?keyword=go&page=1
r.GET("/search", func(c *gin.Context) {
    keyword := c.Query("keyword")
    page := c.DefaultQuery("page", "1") // 带默认值
    c.JSON(200, gin.H{
        "keyword": keyword,
        "page":    page,
    })
})

// 可选参数（用 * 匹配）
r.GET("/user/*action", func(c *gin.Context) {
    action := c.Param("action")
    c.JSON(200, gin.H{"action": action})
})

// 路径和查询混合
r.GET("/posts/:id/comments", func(c *gin.Context) {
    postId := c.Param("id")
    page := c.Query("page")
    c.JSON(200, gin.H{"postId": postId, "page": page})
})
```

### 路由分组

```go
// 基本分组
v1 := r.Group("/v1")
{
    v1.GET("/login", loginHandler)
    v1.GET("/register", registerHandler)
}

// 带中间件的分组
api := r.Group("/api")
api.Use(AuthMiddleware())
{
    api.GET("/users", getUsers)
    api.POST("/users", createUser)
    api.GET("/users/:id", getUser)
    api.PUT("/users/:id", updateUser)
    api.DELETE("/users/:id", deleteUser)
}

// 嵌套分组
api := r.Group("/api")
{
    v1 := api.Group("/v1")
    {
        v1.GET("/users", handler)
    }
    v2 := api.Group("/v2")
    {
        v2.GET("/users", handler)
    }
}
```

## 请求绑定

### JSON 绑定

```go
type LoginRequest struct {
    Username string `json:"username" binding:"required"`
    Password string `json:"password" binding:"required,min=6"`
    Code     string `json:"code" binding:"len=4"`
}

r.POST("/login", func(c *gin.Context) {
    var req LoginRequest
    // ShouldBindJSON 自动解析请求体 JSON 到结构体
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    c.JSON(200, gin.H{"message": "登录成功"})
})
```

### 表单绑定

```go
type FormRequest struct {
    Name    string `form:"name" binding:"required"`
    Email   string `form:"email" binding:"required,email"`
    Age     int    `form:"age" binding:"gte=1,lte=150"`
    Agree   bool   `form:"agree"`
}

r.POST("/form", func(c *gin.Context) {
    var req FormRequest
    if err := c.ShouldBind(&req); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    c.JSON(200, req)
})
```

### 查询参数绑定

```go
type SearchRequest struct {
    Keyword string `form:"keyword" binding:"required"`
    Page    int    `form:"page" binding:"omitempty,min=1"`
    Size    int    `form:"size" binding:"omitempty,min=1,max=100"`
}

r.GET("/search", func(c *gin.Context) {
    var req SearchRequest
    if err := c.ShouldBindQuery(&req); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    c.JSON(200, req)
})
```

### URI 绑定

```go
type URIRequest struct {
    ID   int    `uri:"id" binding:"required"`
    Slug string `uri:"slug" binding:"required"`
}

r.GET("/posts/:id/:slug", func(c *gin.Context) {
    var req URIRequest
    if err := c.ShouldBindUri(&req); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    c.JSON(200, req)
})
```

### Header 绑定

```go
type HeaderRequest struct {
    Token     string `header:"Authorization" binding:"required"`
    UserAgent string `header:"User-Agent"`
}

r.GET("/protected", func(c *gin.Context) {
    var req HeaderRequest
    if err := c.ShouldBindHeader(&req); err != nil {
        c.JSON(401, gin.H{"error": "未授权"})
        return
    }
    c.JSON(200, gin.H{"token": req.Token})
})
```

### 混合绑定

```go
type UserRequest struct {
    ID      int    `uri:"id" binding:"required"`           // 路径参数
    Page    int    `form:"page" binding:"min=1"`           // 查询参数
    Token   string `header:"Authorization" binding:"required"` // 请求头
    Body    string `json:"body" binding:"required"`        // 请求体
}
```

## 自定义验证器

```go
import (
    "github.com/gin-gonic/gin/binding"
    "github.com/go-playground/validator/v10"
)

// 注册自定义验证规则
if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
    // 自定义验证：手机号
    v.RegisterValidation("phone", func(fl validator.FieldLevel) bool {
        phone := fl.Field().String()
        matched, _ := regexp.MatchString(`^1[3-9]\d{9}$`, phone)
        return matched
    })

    // 自定义验证：密码强度
    v.RegisterValidation("strong_password", func(fl validator.FieldLevel) bool {
        pwd := fl.Field().String()
        hasUpper := regexp.MustCompile(`[A-Z]`).MatchString(pwd)
        hasLower := regexp.MustCompile(`[a-z]`).MatchString(pwd)
        hasDigit := regexp.MustCompile(`\d`).MatchString(pwd)
        return hasUpper && hasLower && hasDigit && len(pwd) >= 8
    })
}

type RegisterRequest struct {
    Phone    string `json:"phone" binding:"required,phone"`
    Password string `json:"password" binding:"required,strong_password"`
}
```

## 中间件

### 自定义中间件

```go
// 日志中间件
func LoggerMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        path := c.Request.URL.Path

        // 处理请求
        c.Next()

        // 请求处理后
        latency := time.Since(start)
        method := c.Request.Method
        status := c.Writer.Status()
        log.Printf("[%d] %s %s %v", status, method, path, latency)
    }
}

// 认证中间件
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.AbortWithStatusJSON(401, gin.H{"error": "未登录"})
            return
        }
        // 验证 token 并设置用户信息到上下文
        userId, err := parseToken(token)
        if err != nil {
            c.AbortWithStatusJSON(401, gin.H{"error": "token 无效"})
            return
        }
        c.Set("userId", userId)
        c.Next()
    }
}

// 限流中间件
func RateLimitMiddleware() gin.HandlerFunc {
    limiter := rate.NewLimiter(rate.Limit(100), 200) // 每秒 100 个，burst 200
    return func(c *gin.Context) {
        if !limiter.Allow() {
            c.AbortWithStatusJSON(429, gin.H{"error": "请求过于频繁"})
            return
        }
        c.Next()
    }
}
```

### 中间件注册方式

```go
// 全局中间件
r.Use(LoggerMiddleware())
r.Use(AuthMiddleware())

// 分组中间件
api := r.Group("/api")
api.Use(AuthMiddleware())
{
    api.GET("/users", handler)
}

// 单路由中间件
r.GET("/admin", AuthMiddleware(), AdminHandler())

// 多个中间件
r.POST("/secure", Middleware1(), Middleware2(), handler)
```

## 响应

### JSON 响应

```go
// 基本 JSON
c.JSON(200, gin.H{"message": "success"})

// 结构体 JSON
c.JSON(200, User{Name: "张三", Age: 25})

// JSONP（支持跨域回调）
c.JSONP(200, gin.H{"data": "value"})

// 纯 JSON（不转义 HTML）
c.PureJSON(200, gin.H{"html": "<b>bold</b>"})

// 美化输出
r := gin.Default()
r.Use(gin.FormatConsoleLogger())

// 缩进 JSON（开发时）
r := gin.New()
r.Use(gin.Logger())
r.Use(gin.Recovery())
```

### 其他响应类型

```go
// XML
c.XML(200, gin.H{"message": "success"})

// YAML
c.YAML(200, gin.H{"message": "success"})

// HTML
c.HTML(200, "index.html", gin.H{"title": "首页"})

// 纯文本
c.String(200, "hello world")

// 重定向
c.Redirect(301, "https://example.com")
c.Redirect(302, "/login")

// 文件下载
c.File("./download/test.pdf")
c.FileAttachment("./download/test.pdf", "报告.pdf")

// 二进制数据
c.Data(200, "image/png", fileBytes)

// 字节流
c.Stream(func(w io.Writer) bool {
    // 写入数据
    return true
})
```

## 文件上传

### 单文件上传

```go
r.POST("/upload", func(c *gin.Context) {
    file, err := c.FormFile("file")
    if err != nil {
        c.JSON(400, gin.H{"error": "文件未找到"})
        return
    }

    // 文件大小限制
    if file.Size > 10<<20 { // 10MB
        c.JSON(400, gin.H{"error": "文件太大"})
        return
    }

    // 保存到本地
    dst := "./uploads/" + file.Filename
    if err := c.SaveUploadedFile(file, dst); err != nil {
        c.JSON(500, gin.H{"error": "保存失败"})
        return
    }

    c.JSON(200, gin.H{
        "filename": file.Filename,
        "size":     file.Size,
        "url":      "/uploads/" + file.Filename,
    })
})
```

### 多文件上传

```go
r.POST("/uploads", func(c *gin.Context) {
    form, err := c.MultipartForm()
    if err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }

    files := form.File["files"]
    var urls []string
    for _, file := range files {
        dst := "./uploads/" + file.Filename
        c.SaveUploadedFile(file, dst)
        urls = append(urls, "/uploads/"+file.Filename)
    }

    c.JSON(200, gin.H{"urls": urls})
})
```

## 静态文件服务

```go
// 单目录
r.Static("/static", "./public")

// 文件系统（Go 1.16+）
r.StaticFS("/assets", http.FS(embeddedAssets))

// 单文件
r.StaticFile("/favicon.ico", "./resources/favicon.ico")

// 自定义文件系统
r.StaticFS("/files", gin.Dir("./uploads", false))
```

## 模板渲染

```go
import "html/template"

// 加载模板
r.LoadHTMLGlob("templates/**/*")
// 或
r.LoadHTMLFiles("templates/index.html", "templates/user.html")

// 自定义模板函数
r.SetFuncMap(template.FuncMap{
    "upper": strings.ToUpper,
    "formatDate": func(t time.Time) string {
        return t.Format("2006-01-02")
    },
})

// 路由
r.GET("/user", func(c *gin.Context) {
    c.HTML(200, "user.html", gin.H{
        "title": "用户信息",
        "user": User{Name: "张三", Age: 25},
    })
})
```

## 文件配置

```go
// 从 YAML 文件加载配置
type Config struct {
    Server   ServerConfig   `yaml:"server"`
    Database DatabaseConfig `yaml:"database"`
}

type ServerConfig struct {
    Port int    `yaml:"port"`
    Mode string `yaml:"mode"`
}

type DatabaseConfig struct {
    Host string `yaml:"host"`
    Port int    `yaml:"port"`
    User string `yaml:"user"`
    Pass string `yaml:"pass"`
    Name string `yaml:"name"`
}

func main() {
    var config Config
    data, _ := os.ReadFile("config.yaml")
    yaml.Unmarshal(data, &config)

    gin.SetMode(config.Server.Mode)
    r := gin.Default()
    r.Run(fmt.Sprintf(":%d", config.Server.Port))
}
```

## 优雅关机

```go
func main() {
    r := gin.Default()

    srv := &http.Server{
        Addr:    ":8080",
        Handler: r,
    }

    // 启动服务
    go func() {
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatalf("服务启动失败: %s\n", err)
        }
    }()

    // 等待中断信号
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    log.Println("正在关闭服务...")

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    if err := srv.Shutdown(ctx); err != nil {
        log.Fatal("服务强制关闭:", err)
    }
    log.Println("服务已退出")
}
```

## 测试

```go
import (
    "net/http"
    "net/http/httptest"
    "testing"
    "github.com/stretchr/testify/assert"
)

func TestPingRoute(t *testing.T) {
    r := gin.Default()
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "pong"})
    })

    w := httptest.NewRecorder()
    req, _ := http.NewRequest("GET", "/ping", nil)
    r.ServeHTTP(w, req)

    assert.Equal(t, 200, w.Code)
    assert.Equal(t, `{"message":"pong"}`, w.Body.String())
}

func TestLoginRoute(t *testing.T) {
    r := gin.Default()
    r.POST("/login", loginHandler)

    // 发送 JSON 请求体
    body := `{"username":"admin","password":"123456"}`
    w := httptest.NewRecorder()
    req, _ := http.NewRequest("POST", "/login", strings.NewReader(body))
    req.Header.Set("Content-Type", "application/json")
    r.ServeHTTP(w, req)

    assert.Equal(t, 200, w.Code)
}
```

## 流式响应（SSE）

```go
r.GET("/events", func(c *gin.Context) {
    c.Header("Content-Type", "text/event-stream")
    c.Header("Cache-Control", "no-cache")
    c.Header("Connection", "keep-alive")

    for {
        select {
        case <-c.Request.Context().Done():
            return
        default:
            fmt.Fprintf(c.Writer, "data: %s\n\n", time.Now().Format(time.RFC3339))
            c.Writer.Flush()
            time.Sleep(1 * time.Second)
        }
    }
})
```

## Swagger 文档

```bash
# 安装
go install github.com/swaggo/swag/cmd/swag@latest
go get -u github.com/swaggo/gin-swagger
go get -u github.com/swaggo/files

# 生成文档
swag init
```

```go
import (
    swaggerFiles "github.com/swaggo/files"
    ginSwagger "github.com/swaggo/gin-swagger"
)

// @title           API 文档
// @version         1.0
// @description     这是 API 文档
// @host            localhost:8080
// @BasePath        /api

// @Summary        获取用户列表
// @Description    返回所有用户
// @Produce        json
// @Param          page  query  int  false  "页码"
// @Success        200  {array}  User
// @Router         /users [get]
func GetUsers(c *gin.Context) {
    // ...
}

r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
```

## 常用中间件

### CORS

```go
import "github.com/gin-contrib/cors"

r.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"https://example.com", "http://localhost:3000"},
    AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
    ExposeHeaders:    []string{"Content-Length"},
    AllowCredentials: true,
    MaxAge:           12 * time.Hour,
}))
```

### 速率限制

```go
import "github.com/gin-contrib/sessions"

// 使用令牌桶限流
r.Use(rateLimiter())
```

### Gzip 压缩

```go
import "github.com/gin-contrib/gzip"

r.Use(gzip.Gzip(gzip.DefaultCompression))
```

### Session

```go
import (
    "github.com/gin-contrib/sessions"
    "github.com/gin-contrib/sessions/cookie"
)

store := cookie.NewStore([]byte("secret"))
r.Use(sessions.Sessions("mysession", store))

r.GET("/session", func(c *gin.Context) {
    session := sessions.Default(c)
    session.Set("userId", 123)
    session.Save()
})
```

## 自定义 HTTP 配置

```go
r := gin.Default()

s := &http.Server{
    Addr:           ":8080",
    Handler:        r,
    ReadTimeout:    10 * time.Second,
    WriteTimeout:   10 * time.Second,
    MaxHeaderBytes: 1 << 20,
}

s.ListenAndServe()
```

## 多端口监听

```go
r := gin.Default()
r.GET("/", handler)

// 同时监听 8080 和 8081
go func() {
    r.Run(":8080")
}()
r.Run(":8081")
```
