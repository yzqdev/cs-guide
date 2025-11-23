# asp运行局域网访问

> 注意: `launchSettings.json`在开发环境优先级高于`appsettings.json`
打开properties文件夹下面的`launchSettings.json`然后使用`"applicationUrl": "http://0.0.0.0:5059",`

下面是例子

```json

{
  "$schema": "https://json.schemastore.org/launchsettings.json",
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:15455",
      "sslPort": 0
    }
  },
  "profiles": {
    "SimpleApi": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "http://0.0.0.0:5059",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "launchUrl": "swagger",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}

```

## 打包exe设置端口(硬编码)

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://*:3045");
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

## 打包后配置url

在`appsettings.json`设置url

```json
{
   
  "appName": "mock name",
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
   "Urls": "http://*:5411"
}

```

前提示没有在代码中硬编码

```csharp
builder.WebHost.UseUrls("http://*:3045");
```

## 读取appsettings.json的配置

Confservice.cs

```csharp
  public class ConfService
  {
    private readonly IConfiguration _cfg;
    public ConfService(IConfiguration cfg) => _cfg = cfg;

    public void Foo()
    {
      // 支持冒号分层
      string conn = _cfg["BookStoreDatabase:ConnectionString"];
      string db   = _cfg["appName"];
      Console.WriteLine(db);
    }
  }
```

Program.cs

```csharp
 builder.Services.AddSingleton<ConfService>();

```

然后在controller使用

```csharp
[ApiController]
[Route("/index")]
public class IndexController : ControllerBase {
    private readonly ConfService _confService;
    public IndexController(ConfService confService) {
        _confService = confService;
    }
    [HttpGet("/count")]
    public int Index() {
        _confService.Foo();
        return 1222;
    }
}
```
