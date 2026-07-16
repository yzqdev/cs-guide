---
order: 4
---

# NuGet 包管理

[官方文档](https://docs.microsoft.com/zh-cn/nuget/)

## 基础操作

### 安装包

```bash
# Package Manager 控制台
Install-Package Newtonsoft.Json

# .NET CLI
dotnet add package Newtonsoft.Json

# 指定版本
dotnet add package Newtonsoft.Json --version 13.0.3
```

### 移除包

```bash
# Package Manager 控制台
Uninstall-Package Newtonsoft.Json

# .NET CLI
dotnet remove package Newtonsoft.Json
```

### 更新包

```bash
# 查看可更新
dotnet list package --outdated

# 更新特定包
dotnet add package Newtonsoft.Json

# 更新所有包
dotnet update package
```

## NuGet 包本地缓存

### 查看和修改缓存路径

:::tip
NuGet 默认的全局包下载地址为：

```
C:\Users\{UserName}\.nuget\packages
```

当 C 盘空间不足时，建议修改到其他盘符。
:::

NuGet 配置文件 `NuGet.config` 位于：

```
C:\Users\{UserName}\AppData\Roaming\NuGet\NuGet.config
```

### 修改配置

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <!-- 包源配置 -->
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
    <!-- 添加私有源 -->
    <add key="MyPrivateFeed" value="https://my-server/nuget" />
  </packageSources>

  <!-- 修改全局包缓存路径 -->
  <config>
    <add key="globalPackagesFolder" value="D:\Nuget\.nuget\packages" />
  </config>

  <!-- 启用包来源映射（C# 12+） -->
  <packageSourceMapping>
    <packageSource key="nuget.org">
      <package pattern="*" />
    </packageSource>
  </packageSourceMapping>
</configuration>
```

### 清除本地缓存

```bash
# 清除所有 NuGet 缓存
dotnet nuget locals all --clear

# 清除特定缓存
dotnet nuget locals http-cache --clear
dotnet nuget locals temp-cache --clear
dotnet nuget locals packages-cache --clear
dotnet nuget locals global-packages --clear

# 查看缓存位置
dotnet nuget locals all --list
```

## 配置 NuGet 源

### 使用 CLI 添加源

```bash
# 添加私有 NuGet 源
dotnet nuget add source https://my-server/nuget --name MyFeed

# 启用/禁用源
dotnet nuget enable source nuget.org
dotnet nuget disable source nuget.org

# 设置源优先级
dotnet nuget set source nuget.org --priority 10
```

### 项目级 NuGet 配置

在项目目录下创建 `nuget.config`，仅对该项目生效：

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
    <add key="myget" value="https://www.myget.org/F/myfeed/api/v2" />
  </packageSources>
  <disabledPackageSources>
    <add key="nuget.org" value="false" />
  </disabledPackageSources>
</configuration>
```

## 创建和发布 NuGet 包

### 创建 nuspec 文件

```xml
<?xml version="1.0" encoding="utf-8"?>
<package>
  <metadata>
    <id>MyApp.Library</id>
    <version>1.0.0</version>
    <title>MyApp 类库</title>
    <authors>张三</authors>
    <description>一个示例 NuGet 包</description>
    <tags>dotnet csharp library</tags>
    <projectUrl>https://github.com/example/MyApp</projectUrl>
    <license type="expression">MIT</license>
    <dependencies>
      <group targetFramework="net8.0">
        <dependency id="Newtonsoft.Json" version="13.0.3" />
      </group>
    </dependencies>
  </metadata>
</package>
```

### 打包和发布

```bash
# 使用 .csproj 属性打包（推荐）
dotnet pack -c Release -o ./nupkg

# 设置版本号
dotnet pack -c Release -p:PackageVersion=2.0.0 -o ./nupkg

# 发布到 NuGet.org
dotnet nuget push ./nupkg/*.nupkg --api-key YOUR_API_KEY --source https://api.nuget.org/v3/index.json

# 发布到本地源
dotnet nuget push ./nupkg/*.nupkg --source D:\LocalNuGet
```

### csproj 中配置包信息

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <PackageId>MyApp.Library</PackageId>
    <Version>1.0.0</Version>
    <Authors>张三</Authors>
    <Company>MyCompany</Company>
    <Description>一个示例 NuGet 包</Description>
    <PackageTags>dotnet;csharp;library</PackageTags>
    <PackageLicenseExpression>MIT</PackageLicenseExpression>
    <PackageProjectUrl>https://github.com/example/MyApp</PackageProjectUrl>
    <RepositoryUrl>https://github.com/example/MyApp.git</RepositoryUrl>
    <IncludeSymbols>true</IncludeSymbols>
    <SymbolPackageFormat>snupkg</SymbolPackageFormat>
  </PropertyGroup>
</Project>
```

## 常用 NuGet 包推荐

| 包名 | 用途 | 下载量 |
|------|------|--------|
| **Newtonsoft.Json** | JSON 序列化/反序列化 | ★★★★★ |
| **Serilog** | 结构化日志 | ★★★★★ |
| **AutoMapper** | 对象映射 | ★★★★ |
| **FluentValidation** | 输入验证 | ★★★★ |
| **MediatR** | CQRS/事件驱动 | ★★★★ |
| **Polly** | 重试/熔断/超时 | ★★★★ |
| **Dapper** | 轻量级 ORM | ★★★★★ |
| **EF Core** | 全功能 ORM（官方） | ★★★★★ |
| **BenchmarkDotNet** | 性能基准测试 | ★★★★ |
| **xUnit / NUnit** | 单元测试框架 | ★★★★★ |

## 常见问题

### 包依赖冲突

```bash
# 查看项目的依赖树
dotnet list package --include-transitive
```

解决方案：
1. 统一项目中所有包的版本
2. 使用 `CentralPackageManagement` 集中管理版本
3. 在 csproj 中使用 `AutoReferenced` 排除冲突

```xml
<!-- 集中管理包版本（Directory.Packages.props） -->
<Project>
  <PropertyGroup>
    <ManagePackageVersionsCentrally>true</ManagePackageVersionsCentrally>
  </PropertyGroup>
  <ItemGroup>
    <PackageVersion Include="Newtonsoft.Json" Version="13.0.3" />
    <PackageVersion Include="Serilog" Version="3.0.0" />
  </ItemGroup>
</Project>
```
