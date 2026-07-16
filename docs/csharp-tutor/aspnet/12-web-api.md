---
order: 12
---

# Web API

## 创建 Web API 项目

```bash
dotnet new webapi -n MyApi
cd MyApi
```

生成的 `Program.cs`：

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

## RESTful API 设计原则

### URL 命名规范

| HTTP 方法 | URL | 操作 | 状态码 |
|-----------|-----|------|--------|
| `GET` | `/api/products` | 获取所有商品 | 200 |
| `GET` | `/api/products/5` | 获取单个商品 | 200 / 404 |
| `POST` | `/api/products` | 创建商品 | 201 |
| `PUT` | `/api/products/5` | 更新商品（全量） | 204 / 404 |
| `PATCH` | `/api/products/5` | 更新商品（部分） | 204 / 404 |
| `DELETE` | `/api/products/5` | 删除商品 | 204 / 404 |

### 完整示例

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<ProductDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int size = 20)
    {
        var products = await _productService.GetAllAsync(page, size);
        return Ok(products);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductDto>> GetById(int id)
    {
        var product = await _productService.GetByIdAsync(id);
        if (product == null)
            return NotFound(new { message = $"商品 {id} 不存在" });

        return Ok(product);
    }

    [HttpPost]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductDto dto)
    {
        var product = await _productService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateProductDto dto)
    {
        if (id != dto.Id)
            return BadRequest(new { message = "ID 不匹配" });

        var result = await _productService.UpdateAsync(dto);
        if (!result)
            return NotFound(new { message = $"商品 {id} 不存在" });

        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _productService.DeleteAsync(id);
        if (!result)
            return NotFound(new { message = $"商品 {id} 不存在" });

        return NoContent();
    }
}
```

## 统一响应格式

```csharp
public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public T? Data { get; set; }
    public List<string>? Errors { get; set; }

    public static ApiResponse<T> Ok(T data) => new()
    {
        Success = true,
        Data = data
    };

    public static ApiResponse<T> Fail(string message, List<string>? errors = null) => new()
    {
        Success = false,
        Message = message,
        Errors = errors
    };
}

// 使用过滤器统一包装响应
public class UnifiedResponseFilter : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context) { }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.Result is ObjectResult objResult)
        {
            var response = ApiResponse<object>.Ok(objResult.Value);
            context.Result = new ObjectResult(response)
            {
                StatusCode = objResult.StatusCode
            };
        }
    }
}
```

## Swagger / OpenAPI

```csharp
// 安装
dotnet add package Swashbuckle.AspNetCore

// 配置
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My API",
        Version = "v1",
        Description = "API 文档"
    });

    // 添加 JWT 认证支持
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header. 示例: \"Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });
});

// 启用
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    c.RoutePrefix = "swagger";
});
```

## API 版本控制

```bash
dotnet add package Microsoft.AspNetCore.Mvc.Versioning
```

```csharp
// 注册
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
    options.ApiVersionReader = new UrlSegmentApiVersionReader();
});

// 控制器
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiController]
public class ProductsController : ControllerBase { }

// 不同版本
[ApiVersion("2.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiController]
public class ProductsV2Controller : ControllerBase { }
```

## JSON 序列化配置

```csharp
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // 驼峰命名
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;

        // 忽略循环引用
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;

        // 枚举转为字符串
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

        // 缩进（开发环境）
        options.JsonSerializerOptions.WriteIndented = true;
    });
```