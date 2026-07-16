---
order: 15
---

# 错误处理

## 开发环境异常页面

```csharp
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();  // 显示详细错误信息
}
```

## 生产环境异常处理

```csharp
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");        // 自定义错误页面
    app.UseStatusCodePagesWithReExecute("/error/{0}");  // 状态码页面
}
```

## 全局异常处理中间件

```csharp
// Middleware/ExceptionMiddleware.cs
public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IWebHostEnvironment _env;

    public ExceptionMiddleware(
        RequestDelegate next,
        ILogger<ExceptionMiddleware> logger,
        IWebHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (NotFoundException ex)
        {
            _logger.LogWarning(ex, "资源未找到");
            await HandleExceptionAsync(context, 404, ex.Message);
        }
        catch (ValidationException ex)
        {
            _logger.LogWarning(ex, "参数验证失败");
            await HandleExceptionAsync(context, 400, ex.Message);
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "未授权访问");
            await HandleExceptionAsync(context, 401, "未授权访问");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "未处理的异常");
            await HandleExceptionAsync(context, 500, 
                _env.IsDevelopment() ? ex.Message : "服务器内部错误");
        }
    }

    private static async Task HandleExceptionAsync(
        HttpContext context, int statusCode, string message)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = statusCode;

        var response = new
        {
            status = statusCode,
            message,
            traceId = context.TraceIdentifier
        };

        await context.Response.WriteAsJsonAsync(response);
    }
}

// 扩展方法
public static class ExceptionMiddlewareExtensions
{
    public static IApplicationBuilder UseGlobalExceptionHandler(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ExceptionMiddleware>();
    }
}
```

### 注册

```csharp
var app = builder.Build();
app.UseGlobalExceptionHandler();  // 最外层注册
```

## 自定义异常类

```csharp
public class NotFoundException : Exception
{
    public NotFoundException(string name, object key)
        : base($"{name} ({key}) 不存在") { }
}

public class ValidationException : Exception
{
    public ValidationException(string message) : base(message) { }
}

public class BusinessException : Exception
{
    public int Code { get; }
    public BusinessException(int code, string message) : base(message)
    {
        Code = code;
    }
}

// 使用
public class ProductService
{
    public async Task<Product> GetByIdAsync(int id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product == null)
            throw new NotFoundException(nameof(Product), id);
        return product;
    }
}
```

## 使用内置异常过滤器

```csharp
public class HttpResponseExceptionFilter : IActionFilter, IOrderedFilter
{
    public int Order => int.MaxValue - 10;

    public void OnActionExecuting(ActionExecutingContext context) { }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.Exception is NotFoundException notFound)
        {
            context.Result = new ObjectResult(new
            {
                status = 404,
                message = notFound.Message
            })
            {
                StatusCode = 404
            };
            context.ExceptionHandled = true;
        }
        else if (context.Exception is ValidationException validation)
        {
            context.Result = new ObjectResult(new
            {
                status = 400,
                message = validation.Message
            })
            {
                StatusCode = 400
            };
            context.ExceptionHandled = true;
        }
    }
}

// 注册
builder.Services.AddControllers(options =>
{
    options.Filters.Add<HttpResponseExceptionFilter>();
});
```

## Problem Details（RFC 7807）

ASP.NET Core 内置支持 Problem Details 规范：

```csharp
// 启用
builder.Services.AddProblemDetails();

// 或自定义
builder.Services.AddProblemDetails(options =>
{
    options.CustomizeProblemDetails = ctx =>
    {
        ctx.ProblemDetails.Instance = ctx.HttpContext.Request.Path;
        ctx.ProblemDetails.Extensions["traceId"] = 
            ctx.HttpContext.TraceIdentifier;
    };
});

// 使用
app.UseStatusCodePages();
app.UseExceptionHandler();
```

## 健康检查

```bash
dotnet add package Microsoft.AspNetCore.Diagnostics.HealthChecks
```

```csharp
// 注册健康检查
builder.Services.AddHealthChecks()
    .AddDbContextCheck<AppDbContext>()  // 检查数据库
    .AddUrlGroup(new Uri("https://api.example.com"), "外部API")
    .AddProcessAllocatedMemoryHealthCheck(512);  // 内存检查

// 映射终结点
app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = async (context, report) =>
    {
        context.Response.ContentType = "application/json";
        var response = new
        {
            status = report.Status.ToString(),
            checks = report.Entries.Select(e => new
            {
                name = e.Key,
                status = e.Value.Status.ToString(),
                duration = e.Value.Duration.TotalMilliseconds
            }),
            totalDuration = report.TotalDuration.TotalMilliseconds
        };
        await context.Response.WriteAsJsonAsync(response);
    }
});
```

## 最佳实践

```csharp
// 1. 永远不要暴露堆栈信息给客户端（生产环境）
// 2. 记录所有异常到日志
// 3. 使用统一的错误响应格式
// 4. 为不同错误类型使用适当的 HTTP 状态码
// 5. 敏感信息（密码、Token）不要出现在错误消息中

// 错误响应格式示例
{
    "status": 400,
    "message": "参数验证失败",
    "errors": {
        "Email": ["邮箱格式不正确"],
        "Password": ["密码长度不能少于6位"]
    },
    "traceId": "0HLLM8KJ3T5G0"
}
```