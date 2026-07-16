---
order: 5
---

# 依赖注入

## 什么是依赖注入？

依赖注入（DI）是一种设计模式，用于实现**控制反转**（IoC）。对象不直接创建其依赖项，而是由外部容器注入。

```
// ❌ 紧耦合 - 直接创建依赖
public class OrderService
{
    private readonly EmailService _email = new EmailService();
}

// ✅ 松耦合 - 依赖注入
public class OrderService
{
    private readonly IEmailService _email;
    public OrderService(IEmailService email) => _email = email;
}
```

## ASP.NET Core 内置 DI 容器

ASP.NET Core 内置了 DI 容器，无需第三方库即可使用。

### 服务注册

在 `Program.cs` 中注册服务：

```csharp
var builder = WebApplication.CreateBuilder(args);

// 注册服务
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddSingleton<ICacheService, CacheService>();

// 注册控制器
builder.Services.AddControllers();
```

## 服务生命周期

| 生命周期 | 方法 | 实例创建时机 | 适用场景 |
|---------|------|-------------|---------|
| **Transient** | `AddTransient` | 每次请求都创建新实例 | 轻量级、无状态服务 |
| **Scoped** | `AddScoped` | 每个 HTTP 请求创建一次 | DbContext、工作单元 |
| **Singleton** | `AddSingleton` | 首次请求时创建，全局共享 | 配置、缓存、日志 |

### 生命周期示例

```csharp
public interface IOperation
{
    string OperationId { get; }
}

public class Operation : IOperation
{
    public string OperationId { get; } = Guid.NewGuid().ToString();
}

// 注册
builder.Services.AddTransient<IOperation, Operation>();   // 每次不同
builder.Services.AddScoped<IOperation, Operation>();       // 每请求相同
builder.Services.AddSingleton<IOperation, Operation>();    // 始终相同
```

## 构造函数注入（最常用）

```csharp
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly ILogger<OrdersController> _logger;

    public OrdersController(
        IOrderService orderService,
        ILogger<OrdersController> logger)
    {
        _orderService = orderService;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        _logger.LogInformation("Getting orders");
        var orders = _orderService.GetAll();
        return Ok(orders);
    }
}
```

## 方法注入（[FromServices]）

某些情况下不需要在构造函数中注入，可以直接在 Action 方法中注入：

```csharp
[HttpGet("{id}")]
public IActionResult Get(int id, [FromServices] IOrderService orderService)
{
    var order = orderService.GetById(id);
    return Ok(order);
}
```

## 手动解析服务

```csharp
public class SomeClass
{
    public void DoSomething()
    {
        // 通过 IServiceProvider 手动解析
        var service = HttpContext.RequestServices.GetService<IOrderService>();
        
        // 或
        var service = HttpContext.RequestServices.GetRequiredService<IOrderService>();
    }
}
```

## 多个实现与 TryAdd

```csharp
// 注册多个实现
builder.Services.AddSingleton<ICacheService, MemoryCacheService>();
builder.Services.AddSingleton<ICacheService, RedisCacheService>();

// 使用时取最后一个
public class CacheConsumer
{
    private readonly IEnumerable<ICacheService> _caches;
    public CacheConsumer(IEnumerable<ICacheService> caches) => _caches = caches;
}

// TryAdd - 仅当未注册时才添加（防止重复注册）
builder.Services.TryAddSingleton<ICacheService, MemoryCacheService>();
```

## 工厂模式注入

```csharp
// 注册工厂
builder.Services.AddSingleton<Func<string, ICacheService>>(sp => key =>
{
    return key switch
    {
        "memory" => sp.GetRequiredService<MemoryCacheService>(),
        "redis" => sp.GetRequiredService<RedisCacheService>(),
        _ => throw new ArgumentException()
    };
});

// 使用
public class CacheConsumer
{
    private readonly Func<string, ICacheService> _cacheFactory;
    public CacheConsumer(Func<string, ICacheService> cacheFactory)
        => _cacheFactory = cacheFactory;

    public void Use(string key)
    {
        var cache = _cacheFactory(key);
        cache.Set("key", "value");
    }
}
```

## 常见服务注册模式

```csharp
// 接口 + 实现
builder.Services.AddScoped<IUserRepository, UserRepository>();

// 具体类直接注册
builder.Services.AddScoped<UserService>();

// 泛型注册
builder.Services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));

// 实例注册
builder.Services.AddSingleton(new CacheOptions { TtlSeconds = 300 });
```