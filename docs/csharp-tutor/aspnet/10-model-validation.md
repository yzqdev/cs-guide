---
order: 10
---

# 模型验证

## 数据注解验证

ASP.NET Core 使用 `System.ComponentModel.DataAnnotations` 命名空间中的验证属性：

```csharp
public class RegisterDto
{
    [Required(ErrorMessage = "用户名不能为空")]
    [StringLength(50, MinimumLength = 2, ErrorMessage = "用户名长度2-50个字符")]
    [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "用户名只能包含字母、数字和下划线")]
    public string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress(ErrorMessage = "邮箱格式不正确")]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 6)]
    [DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;

    [Compare("Password", ErrorMessage = "两次密码不一致")]
    [DataType(DataType.Password)]
    public string ConfirmPassword { get; set; } = string.Empty;

    [Range(1, 120, ErrorMessage = "年龄必须在1-120之间")]
    public int Age { get; set; }

    [Phone(ErrorMessage = "手机号格式不正确")]
    public string? PhoneNumber { get; set; }

    [Url(ErrorMessage = "URL格式不正确")]
    public string? Website { get; set; }

    [CreditCard(ErrorMessage = "信用卡号格式不正确")]
    public string? CreditCard { get; set; }
}
```

## 常用验证属性

| 属性 | 说明 |
|------|------|
| `[Required]` | 必填字段 |
| `[StringLength]` | 字符串长度限制 |
| `[Range]` | 数值范围限制 |
| `[RegularExpression]` | 正则表达式匹配 |
| `[EmailAddress]` | 邮箱格式 |
| `[Phone]` | 电话号码格式 |
| `[Url]` | URL 格式 |
| `[Compare]` | 两个字段值比较 |
| `[CreditCard]` | 信用卡号格式 |
| `[MinLength]` | 最小长度 |
| `[MaxLength]` | 最大长度 |
| `[DataType]` | 指定数据类型（影响渲染） |

## 自定义验证属性

```csharp
public class AllowedValuesAttribute : ValidationAttribute
{
    private readonly string[] _allowedValues;

    public AllowedValuesAttribute(params string[] allowedValues)
    {
        _allowedValues = allowedValues;
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext context)
    {
        if (value is string strValue && _allowedValues.Contains(strValue))
        {
            return ValidationResult.Success;
        }
        return new ValidationResult($"值必须为: {string.Join(", ", _allowedValues)}");
    }
}

// 使用
public class ProductDto
{
    [AllowedValues("电子产品", "服装", "食品", ErrorMessage = "分类无效")]
    public string Category { get; set; } = string.Empty;
}
```

## 模型验证 - IValidatableObject

实现 `IValidatableObject` 接口实现跨字段验证：

```csharp
public class OrderDto : IValidatableObject
{
    [Required]
    public DateTime? StartDate { get; set; }

    [Required]
    public DateTime? EndDate { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (StartDate >= EndDate)
        {
            yield return new ValidationResult(
                "结束日期必须大于开始日期",
                new[] { nameof(EndDate) });
        }

        if (EndDate.Value > DateTime.Now.AddYears(1))
        {
            yield return new ValidationResult(
                "结束日期不能超过一年后",
                new[] { nameof(EndDate) });
        }
    }
}
```

## 控制器中的验证

```csharp
[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterDto dto)
    {
        if (!ModelState.IsValid)
        {
            // 返回详细错误信息
            var errors = ModelState
                .Where(e => e.Value?.Errors.Count > 0)
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value?.Errors.Select(e => e.ErrorMessage).ToArray()
                );

            return BadRequest(new { message = "验证失败", errors });
        }

        // 业务逻辑...
        return Ok(new { message = "注册成功" });
    }
}
```

## FluentValidation（第三方库）

```bash
dotnet add package FluentValidation.AspNetCore
```

```csharp
// 1. 定义验证器
public class ProductDtoValidator : AbstractValidator<ProductDto>
{
    public ProductDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("名称不能为空")
            .Length(2, 100).WithMessage("名称长度2-100个字符");

        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("价格必须大于0")
            .LessThan(100000).WithMessage("价格不能超过100000");

        RuleFor(x => x.Category)
            .NotEmpty()
            .Must(c => new[] { "电子", "服装", "食品" }.Contains(c))
            .WithMessage("分类无效");

        RuleFor(x => x.Description)
            .MaximumLength(500);

        // 跨字段验证
        RuleFor(x => x.Discount)
            .LessThan(x => x.Price)
            .When(x => x.Discount.HasValue)
            .WithMessage("折扣价不能高于原价");
    }
}

// 2. 注册
builder.Services.AddValidatorsFromAssemblyContaining<ProductDtoValidator>();

// 3. 自动验证（无需在控制器中检查 ModelState）
```

## 客户端验证

Tag Helpers 会自动生成客户端验证（基于 jQuery Validation 或原生）：

```html
<form asp-action="Register" method="post">
    <div class="form-group">
        <label asp-for="Email"></label>
        <input asp-for="Email" class="form-control" />
        <span asp-validation-for="Email" class="text-danger"></span>
    </div>

    <div class="form-group">
        <label asp-for="Password"></label>
        <input asp-for="Password" class="form-control" />
        <span asp-validation-for="Password" class="text-danger"></span>
    </div>

    <button type="submit" class="btn btn-primary">注册</button>
</form>

@section Scripts {
    @* 启用客户端验证 *@
    <partial name="_ValidationScriptsPartial" />
}
```