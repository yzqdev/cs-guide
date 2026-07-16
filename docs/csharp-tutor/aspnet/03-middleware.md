---
order: 3
---

# 中间件

## 什么是中间件？

中间件（Middleware）是 ASP.NET Core 请求管道中的组件，每个中间件可以：

- 决定是否处理请求 → 直接返回响应
- 将请求传递给下一个中间件
- 在请求处理前后执行逻辑

### 请求管道示意图

```
请求 → 中间件1 → 中间件2 → 中间件3 → 终结点
       ←         ←         ←
响应 ← 中间件1 ← 中间件2 ← 中间件3 ← 响应
```

## 内置中间件

```csharp
var app = builder.Build();

// 按顺序注册中间件
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();  // 开发环境异常页面
}

app.UseHttpsRedirection();     // HTTP → HTTPS 重定向
app.UseStaticFiles();          // 静态文件服务
app.UseRouting();              // 路由匹配
app.UseCors();                 // 跨域设置
app.UseAuthentication();       // 身份认证
app.UseAuthorization();        // 授权
app.UseResponseCaching();      // 响应缓存

app.MapControllers();          // 映射控制器终结点
```

## 自定义中间件

### 方式一：内联中间件（Lambda 方式）

```csharp
app.Use(async (context, next) =>
{
    // 请求前逻辑
    Console.WriteLine($"请求: {context.Request.Method} {context.Request.Path}");
    
    await next(context);  // 调用下一个中间件
    
    // 响应后逻辑
    Console.WriteLine($"响应: {context.Response.StatusCode}");
});
```

### 方式二：类方式

```csharp
// Middleware/RequestLoggingMiddleware.cs
public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var start = DateTime.UtcNow;
        
        // 请求前
        _logger.LogInformation("收到 {Method} {Path}", 
            context.Request.Method, context.Request.Path);
        
        await _next(context);  // 调用管道中的下一个中间件
        
        // 响应后
        var elapsed = DateTime.UtcNow - start;
        _logger.LogInformation("响应 {StatusCode} 耗时 {Elapsed}ms",
            context.Response.StatusCode, elapsed.TotalMilliseconds);
    }
}

// 扩展方法 - 方便注册
public static class RequestLoggingMiddlewareExtensions
{
    public static IApplicationBuilder UseRequestLogging(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<RequestLoggingMiddleware>();
    }
}
```

注册中间件：

```csharp
app.UseRequestLogging();
```

### 方式三：Factory-based 中间件

当中间件需要依赖其他服务时：

```csharp
public class FactoryActivatedMiddleware : IMiddleware
{
    private readonly ILogger<FactoryActivatedMiddleware> _logger;

    public FactoryActivatedMiddleware(ILogger<FactoryActivatedMiddleware> logger)
    {
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        _logger.LogInformation("Factory-based middleware executing");
        await next(context);
    }
}

// 注册
builder.Services.AddTransient<FactoryActivatedMiddleware>();
app.UseMiddleware<FactoryActivatedMiddleware>();
```

## 短路中间件

中间件可以选择不调用 `next`，直接返回响应，称为"短路"：

```csharp
app.Use(async (context, next) =>
{
    // 如果请求来自特定 IP，直接拒绝
    if (context.Connection.RemoteIpAddress?.ToString() == "192.168.1.100")
    {
        context.Response.StatusCode = 403;
        await context.Response.WriteAsync("Forbidden");
        return;  // 不调用 next，直接返回
    }
    
    await next(context);
});
```

## 分支中间件（Map / MapWhen）

```csharp
// 路径分支
app.Map("/api", apiApp =>
{
    apiApp.UseMiddleware<ApiKeyMiddleware>();
    apiApp.UseRouting();
    apiApp.MapControllers();
});

// 条件分支
app.MapWhen(context => context.Request.Query.ContainsKey("token"), branch =>
{
    branch.Use(async (context, next) =>
    {
        await context.Response.WriteAsync("Token branch");
    });
});
```

## 中间件运行顺序

| 中间件 | 角色 | 顺序 |
|--------|------|------|
| `ExceptionHandler` | 异常处理 | 最外层 |
| `HttpsRedirection` | HTTPS 重定向 | 靠前 |
| `StaticFiles` | 静态文件 | 在路由前 |
| `Routing` | 路由 | 中间 |
| `CORS` | 跨域 | 在路由前 |
| `Authentication` | 认证 | 在授权前 |
| `Authorization` | 授权 | 在终结点前 |
| `ResponseCaching` | 缓存 | 在终结点后 |

## 练习

创建一个自定义中间件，记录每个请求的 IP 地址、请求路径、响应状态码和耗时，写入日志文件。