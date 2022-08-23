# 常用的环境变量

## launchSettings.json

launchSettings.json文件仅在本地开发计算机中使用。这意味着当我们将asp.net core应用程序发布到生产服务器时，不需要此文件
开发时使用`0.0.0.0`,需要在launchsettings.json配置

```text
   "applicationUrl": "https://0.0.0.0:7025;http://0.0.0.0:5272;https://localhost:7025;http://localhost:5272;",

```

关于它的schema,需要到这里查看[https://json.schemastore.org/launchsettings.json](https://json.schemastore.org/launchsettings.json)

## appSettings.json

通常会几个配置, appsettings.{Environment}.json   例如，appsettings.Production.json 和 appsettings.Development.json  
appsettings.{Environment}.json 值替代 appsettings.json 中的键。 例如，默认情况下：

- 在开发环境中，appsettings.Development.json 配置会覆盖在 appsettings.json 中找到的值。
- 在生产环境中，appsettings.Production.json 配置会覆盖在 appsettings.json 中找到的值。 例如，在将应用部署到 Azure 时。

项目配置文件,会覆盖launchSettings.json的值,如果要让所有ip均可访问,需要设置类似`"Urls": "http://*:9000/",`的值,但是这样在launchSettings.json中的`applicationUrl`会被覆盖
