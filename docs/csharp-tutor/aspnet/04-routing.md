---
order: 4
---

# 路由

## 路由概述

路由负责将传入的 HTTP 请求映射到可执行的终结点（控制器、Razor Page、Lambda 等）。ASP.NET Core 支持两种路由方式：

- **约定路由** — 基于全局模板规则匹配
- **属性路由** — 在控制器和 Action 上使用注解

## 基本路由配置

```csharp
var app = builder.Build();

app.UseRouting();  // 启用路由中间件

app.MapGet("/", () => "Hello World!");
app.MapGet("/users", () => "User list");
app.MapGet("/users/{id}", (int id) => $"User {id}");

app.Run();
```

## 控制器路由

### 属性路由（推荐）

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(new[] { "Product1", "Product2" });

    [HttpGet("{id}")]
    public IActionResult GetById(int id) => Ok($"Product {id}");

    [HttpPost]
    public IActionResult Create([FromBody] Product product) => Created();

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Product product) => NoContent();

    [HttpDelete("{id}")]
    public IActionResult Delete(int id) => NoContent();
}
```

### 路由表

| HTTP 方法 | URL | Action |
|-----------|-----|--------|
| GET | `/api/products` | `GetAll` |
| GET | `/api/products/5` | `GetById(5)` |
| POST | `/api/products` | `Create` |
| PUT | `/api/products/5` | `Update(5)` |
| DELETE | `/api/products/5` | `Delete(5)` |

## 路由参数约束

```csharp
[HttpGet("{id:int}")]           // 必须是整数
[HttpGet("{id:guid}")]          // 必须是 GUID
[HttpGet("{name:alpha}")]       // 必须是字母
[HttpGet("{email:regex(^[\\w-]+@[\\w-]+\\.\\w+$)}")]  // 正则
[HttpGet("{page:int:min(1)}")]  // 组合约束
[HttpGet("{slug:required}")]    // 必须提供
[HttpGet("{age:range(1,120)}")] // 范围约束
[HttpGet("{date:datetime}")]    // 必须是合法日期时间
| 约束 | 示例 | 说明 |
|------|------|------|
| `int` | `{id:int}` | 匹配整数 |
| `bool` | `{active:bool}` | 匹配布尔值 |
| `datetime` | `{date:datetime}` | 匹配日期时间 |
| `decimal` | `{price:decimal}` | 匹配小数 |
| `guid` | `{id:guid}` | 匹配 GUID |
| `long` | `{id:long}` | 匹配长整型 |
| `min(1)` | `{age:int:min(1)}` | 最小值 |
| `max(100)` | `{age:int:max(100)}` | 最大值 |
| `range(1,100)` | `{age:range(1,100)}` | 范围 |
| `alpha` | `{name:alpha}` | 仅字母 |
| `regex(...)` | `{slug:regex(^[a-z0-9-]+$)}` | 正则 |
| `required` | `{slug:required}` | 必填参数 |

## 可选参数与默认值

```csharp
// 方式一：可选参数
[HttpGet("{id?}")]
public IActionResult Get(int? id)
{
    if (id == null) return Ok("All products");
    return Ok($"Product {id}");
}

// 方式二：默认值
[HttpGet("{page=1}")]
public IActionResult GetPaged(int page) => Ok($"Page {page}");
```

## 路由前缀

```csharp
[Route("api/v{version:apiVersion}/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    // GET /api/v1/products
    [HttpGet]
    public IActionResult Get() => Ok();
}
```

## 路由重写与重定向

```csharp
// 重写（Rewrite）- URL 不变，内部映射到不同路径
app.UseRewriter(new RewriteOptions()
    .AddRewrite("products/(.*)", "api/products/$1", skipRemainingRules: false));

// 重定向（Redirect）- 浏览器 URL 会变化
app.UseRewriter(new RewriteOptions()
    .AddRedirect("old-path/(.*)", "new-path/$1", statusCode: 301));
```

## 自定义路由约束

```csharp
public class SlugRouteConstraint : IRouteConstraint
{
    public bool Match(HttpContext httpContext, IRouter route, 
        string routeKey, RouteValueDictionary values, 
        RouteDirection routeDirection)
    {
        if (values.TryGetValue(routeKey, out var value) && value is string slug)
        {
            return Regex.IsMatch(slug, @"^[a-z0-9-]+$");
        }
        return false;
    }
}

// 注册
builder.Services.Configure<RouteOptions>(options =>
    options.ConstraintMap.Add("slug", typeof(SlugRouteConstraint)));

// 使用
[HttpGet("{slug:slug}")]
```