# asp运行局域网访问

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


## 打包exe设置端口


```csharp
```csharp
var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://*:3045");
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```
```