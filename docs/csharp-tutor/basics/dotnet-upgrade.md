# .NET 升级

## 升级项目的 .NET Framework 到 .NET 5

查看官网的升级方法：[官方文档](https://docs.microsoft.com/zh-cn/dotnet/core/porting/upgrade-assistant-winforms-framework)

```bash
dotnet tool install -g upgrade-assistant
dotnet tool update -g upgrade-assistant
```

## 将 NuGet 格式迁移到 PackageReference

文件夹下会有一个 `packages.config` 文件，这是旧版本的文件。新的写在 `.csproj` 文件里面的：

```xml
<ItemGroup>
  <PackageReference Include="Newtonsoft.Json">
    <Version>13.0.1</Version>
  </PackageReference>
</ItemGroup>
```

## 使用 OokiiDialog 替代 FileDialogBrowser

- [GitHub 仓库](https://github.com/ookii-dialogs/ookii-dialogs-wpf)
- [博客文章](https://www.cnblogs.com/zh7791/)

## 升级到 .NET 6

- [官方文档](https://docs.microsoft.com/zh-cn/dotnet/architecture/modernize-desktop/example-migration)
- [WPF Hub](https://www.wpfhub.com/)  
