# nuget包管理

:::tip
NuGet默认的全局包下载地址一般为: `C:\Users\{username}\.nuget\packages`
我们可以在Nuget.config中修改package存放路径，`Nuget.config` 在`C:\Users\{UserName}\AppData\Roaming\NuGet`目录下
:::
打开路径
修改NuGet.config为

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
  </packageSources>
   <config>
     <add key="globalPackagesFolder" value="D:\Nuget\.nuget\packages" />
  </config>
</configuration>
```

[更新工具地址](<https://docs.microsoft.com/zh-cn/dotnet/core/porting/upgrade-assistant-winforms-framework>)
