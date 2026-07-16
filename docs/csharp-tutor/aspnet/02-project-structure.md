---
order: 2
---

# 项目结构解析

## .NET 项目文件 (.csproj)

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="9.0.0" />
  </ItemGroup>

</Project>
```

### 关键属性

| 属性 | 说明 |
|------|------|
| `TargetFramework` | 目标框架版本 (net9.0, net8.0) |
| `Nullable` | 启用可空引用类型检查 |
| `ImplicitUsings` | 隐式全局 using 指令 |
| `RootNamespace` | 项目根命名空间，默认与项目名一致 |

## Program.cs - 应用入口

.NET 6+ 使用顶级语句（Top-level statements），不再需要 `Main` 方法：

```csharp
// 1. 创建 WebApplication 构建器
var builder = WebApplication.CreateBuilder(args);

// 2. 注册服务（Service Registration）
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 3. 构建应用
var app = builder.Build();

// 4. 配置中间件管道（Middleware Pipeline）
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// 5. 启动应用
app.Run();
```

## appsettings.json - 配置中心

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyDb;..."
  },
  "Jwt": {
    "Key": "your-secret-key",
    "Issuer": "https://localhost:5001"
  }
}
```

`appsettings.Development.json` 会覆盖开发环境的配置，发布后不会被部署到生产环境。

## Properties/launchSettings.json

仅用于开发环境，配置多个启动 profile：

```json
{
  "profiles": {
    "IIS Express": { /* IIS Express 配置 */ },
    "MyApp": {      /* Kestrel 自托管配置 */ }
  }
}
```

## wwwroot 目录

存放静态文件（CSS、JS、图片），通过 `UseStaticFiles()` 中间件访问：

```
wwwroot/
├── css/
│   └── site.css
├── js/
│   └── site.js
├── lib/
│   └── bootstrap/
└── favicon.ico
```

## 常用目录结构（推荐）

```
MyApp/
├── Controllers/       # API 控制器
├── Models/            # 数据模型
├── Services/          # 业务逻辑
├── Repositories/      # 数据访问层
├── Data/             # DbContext 和迁移
├── Middleware/        # 自定义中间件
├── Filters/          # 过滤器
├── Hubs/             # SignalR Hub
├── wwwroot/          # 静态文件
├── Views/            # Razor 视图
├── Program.cs        # 入口
├── appsettings.json  # 配置
└── .csproj           # 项目文件
```

## 隐式 using 指令

`ImplicitUsings` 启用后自动包含以下命名空间：

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
```

## 全局 using 文件

你还可以在项目中创建 `GlobalUsings.cs` 文件集中管理全局 using：

```csharp
global using System.Text.Json;
global using Microsoft.EntityFrameworkCore;
global using MyApp.Models;
global using MyApp.Services;
```