---
order: 1
---

# 第一个 ASP.NET Core 应用

## 使用模板创建项目

ASP.NET Core 提供了多种项目模板，最常用的是：

```bash
# 空模板（最简结构）
dotnet new web -n HelloWorld

# Web API 模板
dotnet new webapi -n HelloWorldApi

# MVC 模板
dotnet new mvc -n HelloWorldMvc

# Razor Pages 模板
dotnet new webapp -n HelloWorldPages
```

## Minimal API 入门（推荐）

.NET 6+ 引入的 Minimal API 是最简洁的启动方式：

```bash
dotnet new web -n MyApp
cd MyApp
```

生成的 `Program.cs`：

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### 运行

```bash
dotnet run
# 访问 http://localhost:5000
```

## 控制器版 API

```bash
dotnet new webapi -n MyWebApi
```

`Program.cs`：

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

app.Run();
```

`Controllers/WeatherForecastController.cs`：

```csharp
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    [HttpGet]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index =>
            new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
            })
            .ToArray();
    }
}
```

## 项目文件结构

```
MyApp/
├── Program.cs          # 入口文件
├── Properties/
│   └── launchSettings.json  # 启动配置（开发环境）
├── appsettings.json         # 应用配置
├── appsettings.Development.json  # 开发环境配置
└── .csproj              # 项目文件（依赖管理）
```

## 启动配置（launchSettings.json）

```json
{
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "https": {
      "commandName": "Project",
      "applicationUrl": "https://localhost:5001;http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

## 热重载（Hot Reload）

.NET 6+ 支持热重载，修改代码后无需重启即可看到效果：

```bash
dotnet watch run
```

## 常见命令速查

```bash
# 创建项目
dotnet new web -n AppName

# 添加 NuGet 包
dotnet add package Microsoft.EntityFrameworkCore

# 构建
dotnet build

# 运行
dotnet run

# 发布
dotnet publish -c Release

# 查看所有模板
dotnet new list
```