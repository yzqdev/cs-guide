# dotnet升级

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
