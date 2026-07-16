---
order: 13
---

# 跨域请求（CORS）

## 什么是 CORS？

CORS（Cross-Origin Resource Sharing，跨域资源共享）是一种安全机制，允许服务器控制哪些来源可以访问其资源。

当你的前端（如 `http://localhost:3000`）向不同源的 API（如 `http://localhost:5000`）发送请求时，浏览器会触发 CORS 检查。

## 基本 CORS 配置

```csharp
var builder = WebApplication.CreateBuilder(args);

// 定义 CORS 策略
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 使用 CORS 中间件（必须在 MapControllers 之前）
app.UseCors("AllowSpecificOrigin");

app.MapControllers();
app.Run();
```

## 多种 CORS 策略

```csharp
builder.Services.AddCors(options =>
{
    // 策略 1：允许特定来源
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("https://myapp.com", "https://admin.myapp.com")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });

    // 策略 2：允许所有来源（开发环境使用）
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });

    // 策略 3：限制方法和头部
    options.AddPolicy("RestrictMethods", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .WithMethods("GET", "POST")
              .WithHeaders("Content-Type", "Authorization")
              .WithExposedHeaders("X-Pagination", "X-Total-Count");
    });
});

// 根据环境选择策略
if (app.Environment.IsDevelopment())
{
    app.UseCors("AllowAll");
}
else
{
    app.UseCors("AllowSpecificOrigin");
}
```

## 在控制器上使用 CORS

```csharp
[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowSpecificOrigin")]  // 整个控制器生效
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok();

    [HttpPost]
    [DisableCors]  // 禁用 CORS（该 Action 不允许跨域）
    public IActionResult Create([FromBody] Product product) => Ok();
}
```

## CORS 预检请求（Preflight）

对于复杂请求（如使用 `PUT`、`DELETE`、自定义头部），浏览器会先发送一个 `OPTIONS` 请求：

```csharp
// ASP.NET Core 自动处理预检请求
// 确保 CORS 中间件在路由之前注册
app.UseCors();
app.UseRouting();
app.MapControllers();

// 或者手动处理 OPTIONS
app.Use((context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
        context.Response.StatusCode = 204;
        return Task.CompletedTask;
    }
    return next();
});
```

## 常见问题排查

### 问题 1：CORS 策略不生效

```csharp
// ✅ 正确的顺序
app.UseCors();        // 1. CORS 先注册
app.UseRouting();     // 2. 路由
app.MapControllers(); // 3. 终结点

// ❌ 错误的顺序 - CORS 不会生效
app.UseRouting();
app.MapControllers();
app.UseCors();        // 太晚了
```

### 问题 2：AllowCredentials 与 AllowAnyOrigin 冲突

```csharp
// ❌ 不允许同时使用
policy.AllowAnyOrigin().AllowCredentials();

// ✅ 必须指定具体来源
policy.WithOrigins("http://localhost:3000").AllowCredentials();
```

### 问题 3：自定义头部无法读取

```csharp
// 需要暴露自定义头部给前端
policy.WithExposedHeaders("X-Pagination", "X-Total-Count", "Content-Disposition");
```

## 完整示例

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

var corsSettings = builder.Configuration.GetSection("Cors").Get<CorsSettings>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        var origins = corsSettings?.AllowedOrigins?.Split(';')
            ?? new[] { "http://localhost:3000" };

        policy.WithOrigins(origins)
              .AllowAnyHeader()
              .AllowAnyMethod();

        if (corsSettings?.AllowCredentials == true)
        {
            policy.AllowCredentials();
        }
    });
});

var app = builder.Build();
app.UseCors();
app.Run();
```

```json
// appsettings.json
{
  "Cors": {
    "AllowedOrigins": "http://localhost:3000;https://myapp.com",
    "AllowCredentials": true
  }
}
```