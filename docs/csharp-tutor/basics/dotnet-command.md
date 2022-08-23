# dotnet命令

## dotnet添加tab补全

[官网](https://docs.microsoft.com/zh-cn/dotnet/core/tools/enable-tab-autocomplete)

把下面的代码添加到powershell配置文件

```powershell
# PowerShell parameter completion shim for the dotnet CLI
Register-ArgumentCompleter -Native -CommandName dotnet -ScriptBlock {
     param($commandName, $wordToComplete, $cursorPosition)
         dotnet complete --position $cursorPosition "$wordToComplete" | ForEach-Object {
            [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_)
         }
 }
 ```

## 安装全局工具

```powershell
dotnet tool install --global PowerShell
dotnet tool install -g PowerShell
```

### 一些好用的全局工具

[链接](https://www.nuget.org/packages?packagetype=dotnettool&sortby=totalDownloads-desc&q=&prerel=false)  

```powershell
# powershell安装
dotnet tool install -g PowerShell
# 根据editorconfig格式化cs代码
dotnet tool install --global dotnet-format --version 5.1.250801

dotnet tool install -g Microsoft.dotnet-interactive 
dotnet tool install --global dotnet-ef
dotnet tool install -g  Cake.Tool

dotnet tool install --global GitVersion.Tool 
# Octopus Deploy is an automated release management tool
dotnet tool install --global Octopus.DotNet.Cli 
# Dotnet CLI tool allowing you to run C# (CSX) scripts.
dotnet tool install --global dotnet-script --version 1.3.1
dotnet tool install --global Nuke.GlobalTool --version 6.2.1
# 更新所有的tool
dotnet tool install --global dotnetCampus.UpdateAllDotNetTools --version 1.0.7


# 卸载
dotnet tool uninstall dotnet-script -g
```

## 打包发布

使用msbuild
[使用msbuild](https://docs.microsoft.com/zh-cn/visualstudio/msbuild/msbuild?view=vs-2022)
打包程序
[使用cli](https://docs.microsoft.com/zh-cn/dotnet/core/deploying/deploy-with-cli)
生成单个exe文件

[打包生成单个文件](https://docs.microsoft.com/zh-cn/dotnet/core/deploying/single-file)

关于更多命令,见[官网](https://docs.microsoft.com/zh-cn/dotnet/core/tools/dotnet-run)

```powershell
dotnet publish [<PROJECT>|<SOLUTION>] [-a|--arch <ARCHITECTURE>]
    [-c|--configuration <CONFIGURATION>]
    [-f|--framework <FRAMEWORK>] [--force] [--interactive]
    [--manifest <PATH_TO_MANIFEST_FILE>] [--no-build] [--no-dependencies]
    [--no-restore] [--nologo] [-o|--output <OUTPUT_DIRECTORY>]
    [--os <OS>] [-r|--runtime <RUNTIME_IDENTIFIER>]
    [--sc|--self-contained [true|false]] [--no-self-contained]
    [-s|--source <SOURCE>] [-v|--verbosity <LEVEL>]
    [--version-suffix <VERSION_SUFFIX>]

dotnet publish -h|--help
```

```powershell
dotnet publish -r win-x64 -c Release -p:PublishSingleFile=true --self-contained false
# 依赖于框架的可执行文件
# --self-contained可以省略为--sc
dotnet publish -c Release -r <RID> --self-contained false
dotnet publish -c Release
# 独立部署
dotnet publish -c Release -r <RID> --self-contained true
```

其中rid

windows

- win-x64
- win-x86

linux

- linux-x64

macos

- osx-x64

部署的csproj

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
    <PublishSingleFile>true</PublishSingleFile>
    <SelfContained>true</SelfContained>
    <RuntimeIdentifier>win-x64</RuntimeIdentifier>
    <PublishReadyToRun>true</PublishReadyToRun>
  </PropertyGroup>

</Project>

```

- PublishSingleFile. 启用单文件发布。 此外，还会在 dotnet build 期间启用单文件警告。
- SelfContained. 确定应用是独立的还是依赖于框架的。
- RuntimeIdentifier. 指定目标 OS 和 CPU 类型。 默认情况下，还会设置 `<SelfContained>true</SelfContained>`。
- PublishReadyToRun. 启用预先 (AOT) 编译。
