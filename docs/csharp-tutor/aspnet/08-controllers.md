---
order: 8
---

# 控制器

## 什么是控制器？

控制器（Controller）负责处理 HTTP 请求并返回响应。它是 MVC 模式中的"C"。

## 创建控制器

```csharp
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(users);

    [HttpGet("{id}")]
    public IActionResult GetById(int id) => Ok(users.FirstOrDefault(u => u.Id == id));

    [HttpPost]
    public IActionResult Create([FromBody] User user)
    {
        // 创建用户
        return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] User user)
    {
        // 更新用户
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        // 删除用户
        return NoContent();
    }
}
```

## Action 返回类型

| 返回类型 | 说明 | 示例 |
|---------|------|------|
| `IActionResult` | 接口，返回多种类型 | `Ok()`, `NotFound()`, `BadRequest()` |
| `ActionResult<T>` | 泛型，强类型返回 | `ActionResult<User>` |
| `T` | 直接返回实体类 | `User`, `List<User>` |
| `IResult` | Minimal API 返回类型 | `Results.Ok()`, `Results.NotFound()` |

### 常用返回方法

```csharp
[HttpGet("{id}")]
public IActionResult Get(int id)
{
    // 200 OK
    return Ok(data);
    
    // 201 Created
    return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
    
    // 204 NoContent
    return NoContent();
    
    // 400 BadRequest
    return BadRequest("无效参数");
    
    // 401 Unauthorized
    return Unauthorized();
    
    // 403 Forbidden
    return Forbid();
    
    // 404 NotFound
    return NotFound("资源不存在");
    
    // 422 UnprocessableEntity
    return UnprocessableEntity(modelState);
    
    // 500 错误
    return StatusCode(500, "内部错误");
}
```

## 模型绑定

ASP.NET Core 自动从请求中提取参数：

```csharp
// 从 URL 路径 - [FromRoute]
[HttpGet("{id}")]
public IActionResult Get([FromRoute] int id)

// 从查询字符串 - [FromQuery]
[HttpGet]
public IActionResult Search([FromQuery] string q, [FromQuery] int page = 1)

// 从请求体 - [FromBody]（JSON/XML）
[HttpPost]
public IActionResult Create([FromBody] UserDto user)

// 从表单 - [FromForm]
[HttpPost("upload")]
public IActionResult Upload([FromForm] IFormFile file)

// 从请求头 - [FromHeader]
[HttpGet]
public IActionResult Get([FromHeader(Name = "X-API-Key")] string apiKey)
```

## 模型绑定复杂类型

```csharp
public class SearchRequest
{
    public string? Keyword { get; set; }
    public int Page { get; set; } = 1;
    public int Size { get; set; } = 20;
    public string? SortBy { get; set; }
    public bool Descending { get; set; }
}

[HttpGet]
public IActionResult Search([FromQuery] SearchRequest request)
{
    // 自动绑定到 SearchRequest 对象
    return Ok();
}
```

## 模型验证

```csharp
public class CreateUserDto
{
    [Required(ErrorMessage = "用户名不能为空")]
    [StringLength(50, MinimumLength = 2)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Range(1, 120)]
    public int Age { get; set; }

    [Phone]
    public string? Phone { get; set; }
}

[HttpPost]
public IActionResult Create([FromBody] CreateUserDto user)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }
    // 处理业务逻辑
    return Ok();
}
```

## 过滤器（Filters）

过滤器可以在 Action 执行前后运行：

| 过滤器类型 | 接口 | 执行时机 |
|-----------|------|---------|
| **Authorization** | `IAuthorizationFilter` | 最早，授权检查 |
| **Resource** | `IResourceFilter` | 在 Model Binding 前后 |
| **Action** | `IActionFilter` | 在 Action 执行前后 |
| **Exception** | `IExceptionFilter` | 异常时 |
| **Result** | `IResultFilter` | 在 Result 执行前后 |

### 自定义 Action 过滤器示例

```csharp
public class LogActionFilter : IActionFilter
{
    private readonly ILogger<LogActionFilter> _logger;

    public LogActionFilter(ILogger<LogActionFilter> logger)
    {
        _logger = logger;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        _logger.LogInformation("执行 {Action} 开始",
            context.ActionDescriptor.DisplayName);
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        _logger.LogInformation("执行 {Action} 完成，耗时 {Elapsed}ms",
            context.ActionDescriptor.DisplayName,
            context.HttpContext.Items["Elapsed"]);
    }
}

// 注册
builder.Services.AddScoped<LogActionFilter>();

// 使用
[ServiceFilter(typeof(LogActionFilter))]
[ApiController]
public class ProductsController : ControllerBase
{
    // ...
}
```