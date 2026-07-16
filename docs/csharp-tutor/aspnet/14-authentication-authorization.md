---
order: 14
---

# 认证与授权

## 认证 vs 授权

| 概念 | 说明 | 类比 |
|------|------|------|
| **认证（Authentication）** | 验证用户身份 | 出示身份证 |
| **授权（Authorization）** | 确定用户能做什么 | 检查入场券 |

## JWT 认证

### 安装

```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

### 配置 JWT

```csharp
// 1. 配置 JWT 设置
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("Jwt"));

// 2. 注册认证服务
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var jwtSettings = builder.Configuration.GetSection("Jwt").Get<JwtSettings>();

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings!.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtSettings.Secret)),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();
```

### appsettings.json

```json
{
  "Jwt": {
    "Secret": "your-super-secret-key-at-least-32-characters-long",
    "Issuer": "https://localhost:5001",
    "Audience": "https://localhost:5001",
    "ExpireHours": 24
  }
}
```

### 生成 JWT Token

```csharp
public class JwtSettings
{
    public string Secret { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public int ExpireHours { get; set; } = 24;
}

public interface ITokenService
{
    string GenerateToken(User user);
}

public class TokenService : ITokenService
{
    private readonly JwtSettings _jwt;

    public TokenService(IOptions<JwtSettings> jwt) => _jwt = jwt.Value;

    public string GenerateToken(User user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.Username),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _jwt.Issuer,
            audience: _jwt.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(_jwt.ExpireHours),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
```

### 登录控制器

```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ITokenService _tokenService;

    public AuthController(ITokenService tokenService)
    {
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto dto)
    {
        // 验证用户凭证（从数据库查询）
        var user = ValidateUser(dto.Username, dto.Password);
        if (user == null)
            return Unauthorized(new { message = "用户名或密码错误" });

        var token = _tokenService.GenerateToken(user);

        return Ok(new
        {
            token,
            expiresIn = 3600 * 24,
            user = new { user.Id, user.Username, user.Role }
        });
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterDto dto)
    {
        // 注册逻辑...
        return Ok(new { message = "注册成功" });
    }
}
```

## 保护 Controller 和 Action

```csharp
// 需要认证才能访问
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok();

    // 需要特定角色
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public IActionResult Create([FromBody] UserDto user) => Ok();

    // 允许匿名访问
    [AllowAnonymous]
    [HttpGet("public")]
    public IActionResult PublicInfo() => Ok();
}
```

## 基于策略的授权

```csharp
// 1. 定义策略
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdmin", policy =>
        policy.RequireRole("Admin"));

    options.AddPolicy("RequireManager", policy =>
        policy.RequireRole("Admin", "Manager"));

    options.AddPolicy("AdultOnly", policy =>
        policy.RequireAssertion(context =>
            context.User.HasClaim(c => c.Type == "Age" && int.Parse(c.Value) >= 18)));

    options.AddPolicy("MinimumAge", policy =>
        policy.Requirements.Add(new MinimumAgeRequirement(18)));
});

// 2. 自定义授权要求
public class MinimumAgeRequirement : IAuthorizationRequirement
{
    public int MinimumAge { get; }
    public MinimumAgeRequirement(int minimumAge) => MinimumAge = minimumAge;
}

public class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context, MinimumAgeRequirement requirement)
    {
        var ageClaim = context.User.FindFirst(c => c.Type == "Age");
        if (ageClaim != null && int.Parse(ageClaim.Value) >= requirement.MinimumAge)
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}

// 注册 Handler
builder.Services.AddScoped<IAuthorizationHandler, MinimumAgeHandler>();

// 使用策略
[Authorize(Policy = "RequireAdmin")]
[Authorize(Policy = "AdultOnly")]
[HttpGet]
public IActionResult Get() => Ok();
```

## Program.cs 完整配置

```csharp
var builder = WebApplication.CreateBuilder(args);

// 认证
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => { /* ... */ });

// 授权
builder.Services.AddAuthorization(options => { /* ... */ });

// 注册服务
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IAuthorizationHandler, MinimumAgeHandler>();

var app = builder.Build();

app.UseAuthentication();  // 认证中间件（必须先于授权）
app.UseAuthorization();   // 授权中间件

app.MapControllers();
app.Run();
```