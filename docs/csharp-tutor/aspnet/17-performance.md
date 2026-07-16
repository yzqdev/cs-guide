---
order: 17
---

# 性能优化

## 响应压缩

```csharp
// 启用响应压缩
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
    options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[]
    {
        "image/svg+xml",
        "application/octet-stream"
    });
});

// 配置压缩级别
builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Fastest;
});

builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Optimal;
});

var app = builder.Build();
app.UseResponseCompression();
```

## 缓存

### 内存缓存

```csharp
// 注册内存缓存
builder.Services.AddMemoryCache();

// 使用
public class ProductService
{
    private readonly IMemoryCache _cache;
    private readonly AppDbContext _db;

    public ProductService(IMemoryCache cache, AppDbContext db)
    {
        _cache = cache;
        _db = db;
    }

    public async Task<List<Product>> GetAllAsync()
    {
        // 尝试从缓存获取
        if (_cache.TryGetValue("products_all", out List<Product>? products))
            return products!;

        // 缓存未命中，从数据库查询
        products = await _db.Products.AsNoTracking().ToListAsync();

        // 设置缓存（5分钟后过期）
        _cache.Set("products_all", products, TimeSpan.FromMinutes(5));

        return products;
    }
}
```

### 分布式缓存（Redis）

```bash
dotnet add package Microsoft.Extensions.Caching.StackExchangeRedis
```

```csharp
// 注册 Redis 缓存
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = "localhost:6379";
    options.InstanceName = "MyApp";
});

// 使用 IDistributedCache
public class ProductService
{
    private readonly IDistributedCache _cache;
    private readonly AppDbContext _db;

    public ProductService(IDistributedCache cache, AppDbContext db)
    {
        _cache = cache;
        _db = db;
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        var cacheKey = $"product_{id}";

        // 尝试从缓存获取
        var cached = await _cache.GetStringAsync(cacheKey);
        if (cached != null)
            return JsonSerializer.Deserialize<Product>(cached);

        // 缓存未命中
        var product = await _db.Products.FindAsync(id);
        if (product != null)
        {
            await _cache.SetStringAsync(cacheKey,
                JsonSerializer.Serialize(product),
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
                });
        }

        return product;
    }
}
```

### 响应缓存中间件

```csharp
// 注册
builder.Services.AddResponseCaching();

var app = builder.Build();
app.UseResponseCaching();

// 控制器中使用
[HttpGet]
[ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any)]
public IActionResult Get()
{
    return Ok(new { timestamp = DateTime.UtcNow });
}

// 自定义缓存策略
[HttpGet("user/{id}")]
[ResponseCache(
    Duration = 120,
    Location = ResponseCacheLocation.Client,  // 仅客户端缓存
    NoStore = false,
    VaryByQueryKeys = new[] { "id" })]
public IActionResult GetUser(int id) => Ok();
```

## 数据库性能

### N+1 查询问题

```csharp
// ❌ N+1 问题：循环查询数据库
var orders = await _db.Orders.ToListAsync();
foreach (var order in orders)
{
    var user = await _db.Users.FindAsync(order.UserId);  // N 次查询
}

// ✅ 使用 Include 预加载
var orders = await _db.Orders
    .Include(o => o.User)
    .ToListAsync();

// 或使用 Select 投影
var orderDtos = await _db.Orders
    .Select(o => new OrderDto
    {
        Id = o.Id,
        UserName = o.User.Username,
        TotalAmount = o.TotalAmount
    })
    .ToListAsync();
```

### 查询优化

```csharp
// 只读查询使用 AsNoTracking
var products = await _db.Products
    .AsNoTracking()  // 不跟踪更改，性能更好
    .ToListAsync();

// 批量操作
await _db.Products
    .Where(p => p.IsActive == false)
    .ExecuteUpdateAsync(setters => setters
        .SetProperty(p => p.IsActive, true));

await _db.Products
    .Where(p => p.CreatedAt < DateTime.UtcNow.AddYears(-1))
    .ExecuteDeleteAsync();

// 分页查询（使用键集分页而非 OFFSET）
var products = await _db.Products
    .OrderBy(p => p.Id)
    .Where(p => p.Id > lastId)  // 传入上一页最后一个 ID
    .Take(20)
    .ToListAsync();
```

## 连接池管理

```csharp
// 配置数据库连接池
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(connectionString, sqlOptions =>
    {
        sqlOptions.MaxRetryCount(3);                    // 最大重试次数
        sqlOptions.CommandTimeout(30);                  // 命令超时时间
        sqlOptions.EnableRetryOnFailure();              // 失败重试
    });
});
```

## 静态文件优化

```csharp
// 启用静态文件缓存
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        // 静态文件缓存 7 天
        ctx.Context.Response.Headers.CacheControl =
            new CacheControlHeaderValue
            {
                Public = true,
                MaxAge = TimeSpan.FromDays(7)
            };
    }
});
```

## 日志优化

```csharp
// 生产环境降低日志级别
builder.Logging.AddFilter("Microsoft", LogLevel.Warning);
builder.Logging.AddFilter("Microsoft.EntityFrameworkCore", LogLevel.Warning);
builder.Logging.AddFilter("System", LogLevel.Error);
```

## 性能监控

### 配置 Kestrel 限制

```csharp
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxConcurrentConnections = 100;
    options.Limits.MaxConcurrentUpgradedConnections = 100;
    options.Limits.MaxRequestBodySize = 10 * 1024 * 1024;  // 10MB
    options.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(2);
    options.Limits.RequestHeadersTimeout = TimeSpan.FromSeconds(30);
});
```

## 性能优化清单

- [ ] 启用响应压缩
- [ ] 配置缓存策略（内存缓存/Redis/响应缓存）
- [ ] 使用 `AsNoTracking()` 处理只读查询
- [ ] 避免 N+1 查询，使用 `Include` 和 `Select` 投影
- [ ] 使用分页限制返回数据量
- [ ] 配置连接池和超时设置
- [ ] 静态文件启用浏览器缓存
- [ ] 生产环境关闭详细日志
- [ ] 使用 `dotnet trace` 和 `dotnet counters` 分析性能瓶颈