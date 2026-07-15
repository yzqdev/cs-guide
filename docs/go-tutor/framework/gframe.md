# GoFrame 完整教程

<Catalog />

[GoFrame](https://goframe.org/) 是一款功能完善的企业级 Go 开发框架，内置了大量实用组件（ORM、缓存、日志、验证、配置等），开箱即用。

## 环境安装

### 安装 GoFrame CLI

```bash
# 安装 gf 命令行工具
go install github.com/gogf/gf/cmd/gf/v2@latest

# 验证
gf version
```

### 创建项目

```bash
# 创建新项目
gf init my-project

# 进入项目目录
cd my-project

# 运行（带热重载）
gf run main.go
```

## 项目结构

一个典型的 GoFrame 项目结构如下：

```
my-project/
├── api/          # 接口定义（对外暴露的入参出参）
├── internal/
│   ├── controller/ # 控制器（处理请求）
│   ├── dao/       # 数据访问对象
│   ├── logic/     # 业务逻辑
│   ├── model/     # 内部模型
│   └── service/   # 服务接口
├── manifest/     # 配置、部署文件
├── resource/     # 静态资源
├── go.mod
└── main.go
```

## 路由配置

### 基础路由

```go
package main

import (
    "github.com/gogf/gf/v2/frame/g"
    "github.com/gogf/gf/v2/net/ghttp"
)

func main() {
    s := g.Server()

    // 基本 HTTP 方法
    s.GET("/user", func(r *ghttp.Request) {
        r.Response.Write("GET /user")
    })
    s.POST("/user", func(r *ghttp.Request) {
        r.Response.Write("POST /user")
    })
    s.PUT("/user", func(r *ghttp.Request) {
        r.Response.Write("PUT /user")
    })
    s.DELETE("/user", func(r *ghttp.Request) {
        r.Response.Write("DELETE /user")
    })
    s.PATCH("/user", handler)
    s.HEAD("/user", handler)
    s.OPTIONS("/user", handler)

    // 匹配所有方法
    s.All("/any", func(r *ghttp.Request) {
        r.Response.Write("匹配任何 HTTP 方法")
    })

    // 路由参数
    s.GET("/user/:id", func(r *ghttp.Request) {
        id := r.Get("id")
        r.Response.Write("用户ID:", id)
    })

    // 模糊匹配
    s.GET("/user/*any", func(r *ghttp.Request) {
        any := r.Get("any")
        r.Response.Write("任意路径:", any)
    })

    // 命名路由
    s.GET("/user/{uid}.html", func(r *ghttp.Request) {
        uid := r.Get("uid")
        r.Response.Write("用户ID:", uid)
    })

    s.SetPort(8000)
    s.Run()
}
```

### 路由分组

```go
s.Group("/api", func(g *ghttp.RouterGroup) {
    // 分组中间件
    g.Middleware(middleware.Auth)

    // 分组下的路由
    g.GET("/users", UserController.List)
    g.POST("/users", UserController.Create)
    g.GET("/users/:id", UserController.Detail)
    g.PUT("/users/:id", UserController.Update)
    g.DELETE("/users/:id", UserController.Delete)
})

// 嵌套分组
s.Group("/api", func(g *ghttp.RouterGroup) {
    g.Group("/v1", func(g *ghttp.RouterGroup) {
        g.GET("/users", handler)
    })
    g.Group("/v2", func(g *ghttp.RouterGroup) {
        g.GET("/users", handler)
    })
})
```

### RESTful 风格路由

```go
s.Group("/api", func(g *ghttp.RouterGroup) {
    // RESTful 风格：直接绑定控制器
    g.Bind(UserController{})
})

// 控制器定义
type UserController struct{}
type User struct {
    Id   int    `json:"id"`
    Name string `json:"name"`
}

func (c *UserController) List(r *ghttp.Request) {
    // GET /api/user
    r.Response.WriteJson(g.List{...})
}
func (c *UserController) Create(r *ghttp.Request) {
    // POST /api/user
}
func (c *UserController) Update(r *ghttp.Request) {
    // PUT /api/user
}
func (c *UserController) Delete(r *ghttp.Request) {
    // DELETE /api/user
}
```

### 域名路由

```go
// 不同域名绑定不同路由
s.Domain("api.example.com").Group("/", func(g *ghttp.RouterGroup) {
    g.GET("/users", handler)
})
s.Domain("admin.example.com").Group("/", func(g *ghttp.RouterGroup) {
    g.GET("/dashboard", handler)
})
```

## 请求处理

### 获取请求参数

```go
func handler(r *ghttp.Request) {
    // 查询参数 ?name=xxx&age=18
    name := r.Get("name")
    age := r.Get("age")

    // 获取并指定默认值
    page := r.Get("page", "1")

    // 获取指定类型
    ageInt := r.GetInt("age")
    price := r.GetFloat64("price")
    flag := r.GetBool("flag")
    arr := r.GetArray("ids")

    // 路径参数 /user/:id
    id := r.Get("id")

    // 表单参数
    username := r.GetForm("username")
    password := r.GetForm("password")

    // 获取原始请求体
    body := r.GetBodyString()
}
```

### JSON/XML 请求体

```go
type CreateUserReq struct {
    Name  string `json:"name" v:"required|length:2,20"`
    Email string `json:"email" v:"required|email"`
    Age   int    `json:"age" v:"min:1|max:150"`
}

func handler(r *ghttp.Request) {
    var req CreateUserReq
    // 自动解析 JSON/XML/Form 并绑定
    if err := r.Parse(&req); err != nil {
        r.Response.WriteJsonExit(g.Map{
            "code": 1,
            "msg":  err.Error(),
        })
    }
    r.Response.WriteJson(req)
}
```

### 文件上传

```go
func handler(r *ghttp.Request) {
    // 单文件上传
    file := r.GetUploadFile("file")
    if file != nil {
        // 保存到指定目录
        name, err := file.Save("./upload/")
        if err != nil {
            r.Response.WriteJsonExit(g.Map{"code": 1, "msg": "上传失败"})
        }
        r.Response.WriteJson(g.Map{"code": 0, "url": "/upload/" + name})
    }

    // 多文件上传
    files := r.GetUploadFiles("files")
    if len(files) > 0 {
        names, err := files.Save("./upload/")
        if err != nil {
            r.Response.WriteJsonExit(g.Map{"code": 1, "msg": "上传失败"})
        }
        r.Response.WriteJson(g.Map{"code": 0, "urls": names})
    }
}
```

## 响应处理

```go
func handler(r *ghttp.Request) {
    // 纯文本
    r.Response.Write("hello world")

    // JSON 响应
    r.Response.WriteJson(g.Map{
        "code": 0,
        "msg":  "success",
        "data": g.Map{"name": "张三"},
    })

    // JSON 并退出（后续代码不再执行）
    r.Response.WriteJsonExit(g.Map{"code": 0})

    // XML 响应
    r.Response.WriteXml(g.Map{"name": "张三"})

    // 重定向
    r.Response.RedirectTo("/login", http.StatusFound)

    // 设置状态码
    r.Response.WriteStatus(http.StatusForbidden, "无权限")

    // 设置响应头
    r.Response.SetHeader("X-Custom-Header", "value")

    // 文件下载
    r.Response.ServeFile("./download/test.pdf")

    // 退出请求（不再执行后续中间件）
    r.Exit()
}
```

## 中间件

### 中间件定义

```go
// 拦截器形式（返回错误则终止）
func AuthMiddleware(r *ghttp.Request) {
    token := r.GetHeader("Authorization")
    if token == "" {
        r.Response.WriteJsonExit(g.Map{"code": 401, "msg": "未登录"})
    }
    // 将用户信息注入上下文
    r.SetCtxVar("userId", 123)
    r.Middleware.Next()
}

// 前置中间件
func BeforeMiddleware(r *ghttp.Request) {
    start := time.Now()
    r.Middleware.Next()
    g.Log().Info(r.Context(), "耗时:", time.Since(start))
}

// 后置中间件
func AfterMiddleware(r *ghttp.Request) {
    r.Middleware.Next()
    // 对响应进行处理
    r.Response.Write("（后置处理）")
}
```

### 中间件注册

```go
func main() {
    s := g.Server()

    // 全局中间件
    s.Use(AuthMiddleware)
    s.Use(BeforeMiddleware)

    // 分组中间件
    s.Group("/api", func(g *ghttp.RouterGroup) {
        g.Middleware(AuthMiddleware)
        g.GET("/users", handler)
    })

    // 路由级中间件
    s.GET("/admin", handler).Middleware.Middleware(AuthMiddleware)
}
```

### CORS 中间件

```go
import "github.com/gogf/gf/v2/net/ghttp"

func CORSMiddleware(r *ghttp.Request) {
    r.Response.CORSDefault()
    // 或自定义
    r.Response.CORS(ghttp.CORSOptions{
        AllowOrigin:      "*",
        AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
        AllowHeaders:     "Authorization,Content-Type,Accept",
        AllowCredentials: "true",
        MaxAge:           "86400",
    })
    r.Middleware.Next()
}
```

## 配置管理

### 配置文件

GoFrame 默认读取 `manifest/config/config.yaml`：

```yaml
server:
  address: ':8000'
  logPath: './logs'
  dumpRouterMap: true

database:
  default:
    host: '127.0.0.1'
    port: 3306
    user: 'root'
    pass: '123456'
    name: 'testdb'
    type: 'mysql'
    charset: 'utf8mb4'
    extra: 'parseTime=True&loc=Local'
```

### 读取配置

```go
// 获取配置
addr := g.Cfg().MustGet(ctx, "server.address").String()
dbHost := g.Cfg().MustGet(ctx, "database.default.host").String()

// 带默认值
timeout := g.Cfg().MustGet(ctx, "server.timeout", "30s").String()

// 监听配置变化
g.Cfg().MustGet(ctx, "server.address").Bind(func(ctx context.Context, v *gvar.Var) {
    g.Log().Info(ctx, "配置变更:", v.String())
})
```

## 数据库操作

### 连接数据库

```go
import (
    "github.com/gogf/gf/v2/database/gdb"
    "github.com/gogf/gf/v2/frame/g"
)

// 方式一：通过配置自动连接
db := g.DB()

// 方式二：手动创建连接
db, _ := gdb.New(gdb.ConfigNode{
    Host:  "127.0.0.1",
    Port:  "3306",
    User:  "root",
    Pass:  "123456",
    Name:  "testdb",
    Type:  "mysql",
    Charset: "utf8mb4",
})
```

### CRUD 操作

```go
// 查询
users, _ := g.DB().Model("user").Where("age > ?", 18).All()
user, _ := g.DB().Model("user").Where("id = ?", 1).One()
count, _ := g.DB().Model("user").Where("age > ?", 18).Count()

// 选择字段
g.DB().Model("user").Fields("id, name").Where("age > ?", 18).All()

// 排序和分页
g.DB().Model("user").OrderDesc("id").Limit(10).Offset(0).All()

// 创建
result, _ := g.DB().Model("user").Insert(g.Map{
    "name": "张三",
    "age":  25,
})
lastId, _ := result.LastInsertId()

// 批量创建
g.DB().Model("user").Insert(g.List{
    {"name": "张三", "age": 25},
    {"name": "李四", "age": 30},
})

// 更新
g.DB().Model("user").Where("id = ?", 1).Update(g.Map{
    "name": "张三（改）",
    "age":  gdb.Raw("age + 1"), // 原始表达式
})

// 删除
g.DB().Model("user").Where("id = ?", 1).Delete()

// 事务
err := g.DB().Transaction(ctx, func(ctx context.Context, tx gdb.TX) error {
    _, err := tx.Model("user").Insert(g.Map{"name": "张三"})
    if err != nil {
        return err // 回滚
    }
    _, err = tx.Model("order").Insert(g.Map{"user_id": 1, "amount": 99.9})
    return err // 回滚或提交
})
```

### 链式查询

```go
g.DB().Model("user u").
    LeftJoin("order o", "u.id = o.user_id").
    Fields("u.*, o.amount").
    Where("u.age > ?", 18).
    Where("o.amount > ?", 100).
    Order("u.id DESC").
    Group("u.id").
    Having("count(o.id) > ?", 1).
    Limit(10).
    Offset(0).
    All()
```

## 日志

```go
// 基本日志
g.Log().Info(ctx, "用户登录成功", "userId:", 123)
g.Log().Debug(ctx, "调试信息", "请求耗时:", "50ms")
g.Log().Warn(ctx, "警告: 磁盘空间不足")
g.Log().Error(ctx, "错误:", err)

// 格式化日志
g.Log().Infof(ctx, "用户 %s 登录成功", "张三")

// 日志级别控制
g.Log().SetLevel(glog.LEVEL_INFO | glog.LEVEL_ERROR)

// 自定义日志文件
g.Log("api").Info(ctx, "API 访问日志")
g.Log("db").Info(ctx, "数据库慢查询")
```

## 验证

```go
type UserReq struct {
    Name  string `v:"required|length:2,20#名称不能为空|名称长度在2-20之间"`
    Email string `v:"required|email#邮箱不能为空|邮箱格式不正确"`
    Age   int    `v:"min:1|max:150"`
    Phone string `v:"phone"`
    IDCard string `v:"id-card"`
}

// 自动验证
func handler(r *ghttp.Request) {
    var req UserReq
    if err := r.Parse(&req); err != nil {
        r.Response.WriteJsonExit(g.Map{"code": 1, "msg": err.Error()})
    }
}

// 手动验证
if err := g.Validator().Data(map[string]any{
    "name": "张三",
}).Rules("required|length:2,20").Run(ctx); err != nil {
    g.Log().Error(ctx, err)
}
```

## 静态文件服务

```go
s := g.Server()

// 单个目录
s.AddStaticPath("/static", "./public")

// 多个目录
s.AddStaticPath("/assets", "./assets")
s.AddStaticPath("/upload", "./upload")

// 默认页面
s.SetIndexFiles([]string{"index.html", "index.htm"})

// 设置 ServerRoot（所有静态文件）
s.SetServerRoot("./resource/public")
```

## 模板引擎

```go
// 配置模板目录
s.SetViewPath("./template/views")

// 渲染模板
s.BindHandler("/user", func(r *ghttp.Request) {
    r.Response.WriteTpl("user/index.html", g.Map{
        "title": "用户列表",
        "users": g.List{
            {"name": "张三", "age": 25},
            {"name": "李四", "age": 30},
        },
    })
})

// 模板文件 template/views/user/index.html
// {{.title}}
// {{range .users}}
//   {{.name}} - {{.age}}
// {{end}}
```

## Session

```go
func handler(r *ghttp.Request) {
    // 设置 Session
    r.Session.Set("userId", 123)
    r.Session.Set("userInfo", g.Map{"name": "张三"})

    // 获取 Session
    userId := r.Session.MustGet("userId").Int()
    userInfo := r.Session.MustGet("userInfo").Map()

    // 删除 Session
    r.Session.Remove("userId")

    // 清空所有
    r.Session.Clear()
}
```

## 错误处理

```go
// 全局错误处理
s.SetErrorHandler(func(r *ghttp.Request, err error) {
    r.Response.WriteJson(g.Map{
        "code": 500,
        "msg":  err.Error(),
    })
})

// 404 处理
s.SetHandler(func(r *ghttp.Request) {
    r.Response.WriteStatus(404, "页面不存在")
})
```

## 常用工具

```go
// 生成/验证密码
hash, _ := gmd5.EncryptString("password")
g.Log().Info(ctx, hash)

// UUID
uuid := guid.S()
g.Log().Info(ctx, uuid)

// JSON 工具
jsonStr := g.Json().New(g.Map{"name": "张三"}).MustToJsonString()
g.Dump(jsonStr)

// 日期时间
now := gtime.Now()
g.Log().Info(ctx, now.Format("Y-m-d H:i:s"))
g.Log().Info(ctx, now.Timestamp())

// 数组/集合工具
garray.NewStrArrayFrom(g.SliceStr{"a", "b", "c"}).Unique().Sort()
```

## 定时任务

```go
import "github.com/gogf/gf/v2/os/gcron"

// 每 5 秒执行
gcron.Add(ctx, "*/5 * * * * *", func(ctx context.Context) {
    g.Log().Info(ctx, "定时任务执行")
})

// 每天凌晨执行
gcron.Add(ctx, "0 0 0 * * *", func(ctx context.Context) {
    g.Log().Info(ctx, "每日任务")
})

// 单次延迟执行
gcron.AddOnce(ctx, "10s", func(ctx context.Context) {
    g.Log().Info(ctx, "延迟10秒执行")
})

// 停止定时任务
gcron.Stop(ctx)
```

## 优雅关机

```go
s := g.Server()

// 优雅关机
s.SetGraceful(true)

// 设置超时
s.SetGracefulTimeout(30 * time.Second)

// 监听信号
s.BindHook("Shutdown", func(r *ghttp.Request) {
    g.Log().Info(r.Context(), "服务关闭")
})
```

## 打包静态资源

```go
// 将静态文件打包进二进制文件
// 1. 在 main.go 添加空导入：_ "my-project/packed"
// 2. 执行 gf build --pack
// 3. 设置静态路径
s.AddStaticPath("/atools", "public")
```

## 常用命令

```bash
# 创建项目
gf init project-name

# 运行（热重载）
gf run main.go

# 构建（含静态资源打包）
gf build --pack

# 生成 DAO
gf gen dao

# 生成 Service
gf gen service

# 生成控制器
gf gen controller

# 生成模型
gf gen model

# 生成 API 文档
gf gen api
```
