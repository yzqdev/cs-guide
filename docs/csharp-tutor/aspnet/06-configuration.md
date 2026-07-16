---
order: 6
---

# 配置系统

## 配置源

ASP.NET Core 的配置系统支持多种配置源，按优先级从高到低：

| 配置源 | 说明 |
|--------|------|
| `appsettings.json` | 基础配置文件 |
| `appsettings.{Environment}.json` | 环境特定配置（开发/生产） |
| 用户机密（Secrets） | 开发环境敏感信息 |
| 环境变量 | 系统环境变量 |
| 命令行参数 | `--key=value` |
| 内存配置 | 代码中直接设置 |

### 加载顺序示例

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", 
        optional: true, reloadOnChange: true)
    .AddUserSecrets<Program>(optional: true)
    .AddEnvironmentVariables()
    .AddCommandLine(args);
```

## 读取配置

### 方式一：直接访问

```csharp
var section = app.Configuration["Logging:LogLevel:Default"];
// 返回 "Information"

var connectionString = app.Configuration.GetConnectionString("DefaultConnection");
```

### 方式二：强类型 Options 模式（推荐）

```csharp
// 1. 定义配置类
public class JwtSettings
{
    public string Secret { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public int ExpireHours { get; set; } = 24;
}

// 2. 绑定配置
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("Jwt"));

// 3. 注入使用
public class AuthService
{
    private readonly JwtSettings _jwt;

    public AuthService(IOptions<JwtSettings> jwt)
    {
        _jwt = jwt.Value;
    }
}
```

### Options 接口对比

| 接口 | 特性 | 适用场景 |
|------|------|---------|
| `IOptions<T>` | 单例加载，不随配置变化 | 启动后不变的配置 |
| `IOptionsSnapshot<T>` | 每次请求重新加载，支持热更新 | 需要热更新的配置 |
| `IOptionsMonitor<T>` | 单例，支持热更新和通知 | 全局共享的热更新配置 |

## 配置热更新

```csharp
// appsettings.json 中设置 reloadOnChange
builder.Configuration.AddJsonFile("appsettings.json", 
    optional: false, reloadOnChange: true);

// 使用 IOptionsSnapshot 或 IOptionsMonitor
public class SomeService
{
    private readonly IOptionsSnapshot<MySettings> _settings;

    public SomeService(IOptionsSnapshot<MySettings> settings)
    {
        _settings = settings;
    }

    public void DoWork()
    {
        var value = _settings.Value.SomeKey;
        // 每次请求都读取最新值
    }
}
```

## 环境变量配置

### 命名规则

环境变量使用**双下划线 `__`** 作为分隔符：

```bash
# 设置环境变量
export MySettings__Database__ConnectionString="Server=..."
export ASPNETCORE_ENVIRONMENT=Production
export ASPNETCORE_URLS=http://+:8080
```

### 读取环境变量

```csharp
// 读取 ASPNETCORE_ 开头的环境变量
var env = app.Configuration["ASPNETCORE_ENVIRONMENT"];

// 读取自定义环境变量
var db = app.Configuration["MySettings:Database:ConnectionString"];
```

## 命令行参数

```bash
# 运行时传入
dotnet run --MySettings:Database:ConnectionString="Server=..."
dotnet run --urls http://+:8080

# 或使用缩写
dotnet run --urls=http://+:8080 --environment=Production
```

## 用户机密（开发环境）

```bash
# 初始化用户机密
dotnet user-secrets init

# 设置机密
dotnet user-secrets set "Jwt:Secret" "my-secret-key" 
dotnet user-secrets set "ConnectionStrings:Default" "Server=..."

# 查看机密
dotnet user-secrets list

# 移除机密
dotnet user-secrets remove "Jwt:Secret"

# 清除所有
dotnet user-secrets clear
```

## 自定义配置源

```csharp
public class DatabaseConfigurationSource : IConfigurationSource
{
    private readonly string _connectionString;

    public DatabaseConfigurationSource(string connectionString)
    {
        _connectionString = connectionString;
    }

    public IConfigurationProvider Build(IConfigurationBuilder builder)
        => new DatabaseConfigurationProvider(_connectionString);
}

// 注册
builder.Configuration.Add(new DatabaseConfigurationSource(connStr));
```