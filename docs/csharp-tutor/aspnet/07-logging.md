---
order: 7
---

# 日志

## 日志系统概述

ASP.NET Core 内置了强大的日志系统，支持结构化日志和多种输出提供程序。

### 日志级别

| 级别 | 方法 | 说明 |
|------|------|------|
| `Trace` | `LogTrace` | 最详细的诊断信息 |
| `Debug` | `LogDebug` | 开发调试信息 |
| `Information` | `LogInformation` | 常规操作信息 |
| `Warning` | `LogWarning` | 警告，不影响运行 |
| `Error` | `LogError` | 错误，功能受影响 |
| `Critical` | `LogCritical` | 严重错误，可能导致应用崩溃 |
| `None` | — | 不记录日志 |

## 基本使用

```csharp
public class WeatherController : ControllerBase
{
    private readonly ILogger<WeatherController> _logger;

    public WeatherController(ILogger<WeatherController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        // 不同级别的日志
        _logger.LogInformation("获取天气数据");
        _logger.LogWarning("API 调用频率较高");
        _logger.LogError("数据库连接失败");
        
        return Ok();
    }
}
```

## 结构化日志

使用占位符记录结构化的日志数据，便于搜索和分析：

```csharp
// ❌ 不推荐 - 字符串拼接
_logger.LogInformation($"用户 {userId} 登录成功");

// ✅ 推荐 - 结构化日志
_logger.LogInformation("用户 {UserId} 登录成功", userId);

// 多个参数
_logger.LogInformation(
    "订单 {OrderId} 由用户 {UserId} 创建，金额 {Amount}",
    order.Id, userId, order.TotalAmount);
```

## 日志配置

### appsettings.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Warning",
      "MyApp.Services": "Debug"
    },
    "Console": {
      "LogLevel": {
        "Default": "Information",
        "MyApp": "Debug"
      }
    },
    "Debug": {
      "LogLevel": {
        "Default": "Information"
      }
    }
  }
}
```

### 代码中配置

```csharp
builder.Logging.ClearProviders();  // 清除默认提供程序
builder.Logging.AddConsole();      // 添加控制台输出
builder.Logging.AddDebug();        // 添加调试输出
builder.Logging.AddEventLog();     // Windows 事件日志

// 设置最低级别
builder.Logging.SetMinimumLevel(LogLevel.Debug);

// 添加过滤器
builder.Logging.AddFilter("Microsoft", LogLevel.Warning);
builder.Logging.AddFilter("System", LogLevel.Error);
builder.Logging.AddFilter<ConsoleLoggerProvider>("MyApp", LogLevel.Debug);
```

## 自定义日志提供程序

将日志写入文件：

```csharp
public class FileLogger : ILogger
{
    private readonly string _path;

    public FileLogger(string path) => _path = path;

    public IDisposable? BeginScope<TState>(TState state) => null;

    public bool IsEnabled(LogLevel logLevel) => logLevel >= LogLevel.Information;

    public void Log<TState>(LogLevel logLevel, EventId eventId,
        TState state, Exception? exception, Func<TState, Exception?, string> formatter)
    {
        if (!IsEnabled(logLevel)) return;

        var message = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] [{logLevel}] {formatter(state, exception)}";
        File.AppendAllText(_path, message + Environment.NewLine);
    }
}

public class FileLoggerProvider : ILoggerProvider
{
    private readonly string _path;
    public FileLoggerProvider(string path) => _path = path;

    public ILogger CreateLogger(string categoryName) => new FileLogger(_path);
    public void Dispose() { }
}

// 注册
builder.Logging.AddProvider(new FileLoggerProvider("logs/app.log"));
```

## 第三方日志库

### Serilog

```bash
dotnet add package Serilog.AspNetCore
dotnet add package Serilog.Sinks.Console
dotnet add package Serilog.Sinks.File
```

```csharp
using Serilog;

// 配置 Serilog
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.Console()
    .WriteTo.File("logs/app-.log", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

var app = builder.Build();
// 使用 Serilog 记录的日志会包含完整上下文信息
```

### NLog

```bash
dotnet add package NLog.Web.AspNetCore
```

```csharp
builder.Logging.ClearProviders();
builder.Host.UseNLog();
```

## 日志分类最佳实践

```csharp
// 按组件分类
public class OrderService
{
    private readonly ILogger<OrderService> _logger;

    public async Task<Order> CreateOrder(OrderDto dto)
    {
        using (_logger.BeginScope(new { UserId = dto.UserId, OrderId = Guid.NewGuid() }))
        {
            _logger.LogInformation("开始创建订单");
            
            // 业务逻辑...
            
            _logger.LogInformation("订单创建成功，商品数: {ItemCount}", dto.Items.Count);
        }
    }
}
```