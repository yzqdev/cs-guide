# dotnet工具

## dotnet升级项目的netframework到net5

查看官网的升级方法
[https://docs.microsoft.com/zh-cn/dotnet/core/porting/upgrade-assistant-winforms-framework](https://docs.microsoft.com/zh-cn/dotnet/core/porting/upgrade-assistant-winforms-framework)

```xml
dotnet tool install -g upgrade-assistant

dotnet tool update -g upgrade-assistant
```

## 将nuget格式迁移到packagereference

​

文件夹下会有一个package.config文件,这是旧版本的文件
新的写在 .csproj文件里面的

```java
 <ItemGroup>
    <PackageReference Include="Newtonsoft.Json">
      <Version>13.0.1</Version>
    </PackageReference>
  </ItemGroup>
```

## 使用ookiidialog替代FiledialogBrowser

[https://github.com/ookii-dialogs/ookii-dialogs-wpf](https://github.com/ookii-dialogs/ookii-dialogs-wpf)

[https://www.cnblogs.com/zh7791/](https://www.cnblogs.com/zh7791/)  

## 升级到net6

- [https://docs.microsoft.com/zh-cn/dotnet/architecture/modernize-desktop/example-migration](https://docs.microsoft.com/zh-cn/dotnet/architecture/modernize-desktop/example-migration)  
- [https://www.wpfhub.com/](https://www.wpfhub.com/)  

# 命令

## tool

```
dotnet tool list --global
```

### 全局工具

```
包 ID                                   版本              命令
----------------------------------------------------------------------------
csharpier                              0.22.1          dotnet-csharpier
dotnet-ef                              7.0.3           dotnet-ef
dotnet-format                          5.1.250801      dotnet-format
dotnet-outdated-tool                   4.5.0           dotnet-outdated
dotnet-script                          1.4.0           dotnet-script
dotnet-serve                           1.10.155        dotnet-serve
dotnet-suggest                         1.1.327201      dotnet-suggest
dotnet-typegen                         4.0.1           dotnet-typegen
dotnetcampus.updatealldotnettools      1.0.7           dotnet-updatealltools
gitversion.tool                        5.12.0          dotnet-gitversion
microsoft.dotnet-interactive           1.0.410202      dotnet-interactive
minver-cli                             4.3.0           minver
redth.net.maui.check                   1.0.0           maui-check
uno.check                              1.11.0          uno-check
upgrade-assistant                      0.4.410601      upgrade-assistant
```
