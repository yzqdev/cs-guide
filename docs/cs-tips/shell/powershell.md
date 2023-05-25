# powershell命令

## powershell模块

<https://learn.microsoft.com/zh-cn/powershell/scripting/developer/module/understanding-a-windows-powershell-module?view=powershell-7.3>

## 删除命令

```
# 删除指定文件
 Remove-Item * -Include *.json -Recurse
# 删除文件而保留文件夹
# 「This example deletes all of the files that have names that include a dot (.) 」
 Remove-Item * -Include *.* -Exclude *.md -Recurse
# 删除包含指定字符的文件夹
# 一定要注意加上通配符「*bin*」，否则只会删除bin这样的文件夹
Remove-Item * -Recurse -Include *bin*

```

## 获取文件夹内文件个数

```
@(Get-ChildItem -Exclude .\node_modules\,.cache,.temp -r).Count
```

## 获取文件夹大小

```
switch((ls -r|measure -sum Length).Sum) {
  {$_ -gt 1GB} {
    '{0:0.0} GiB' -f ($_/1GB)
    break
  }
  {$_ -gt 1MB} {
    '{0:0.0} MiB' -f ($_/1MB)
    break
  }
  {$_ -gt 1KB} {
    '{0:0.0} KiB' -f ($_/1KB)
    break
  }
  default {"$_ bytes" }
}
```

## 遍历一个文件夹,并排除node_modules

```powershell
@(Get-ChildItem   -Exclude node_module*|Get-ChildItem -r).Count

Get-ChildItem -Path E:\WebstormProjects\  -Exclude node_module*|Get-ChildItem -r

多层
@(Get-ChildItem -Exclude node_module*|Get-ChildItem -Exclude node_module*|Get-ChildItem -Exclude node_module*|Get-ChildItem -Exclude node_module*|Get-ChildItem -Exclude node_module*|Get-ChildItem -Exclude node_module*|Get-ChildItem -Exclude node_module*).Count
```

## 删除._文件

```
dir ._* /a/s 

del ._* /a/s
```

## powershell查看运行时间

```powershell
(Measure-Command {ping baidu.com}).TotalSeconds
```

### 在我的配置文件里面引用模块

**Microsoft.PowerShell_profile.ps1**

```powershell
. $PSScriptRoot\myalias.ps1
```

## 命令行运行wpf

```
dotnet watch run
```

不过console.write不会生效
需要把`<OutputType>WinExe</OutputType>`改为`<OutputType>Exe</OutputType>`

## dotnet发布

发布单文件

```
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

<https://learn.microsoft.com/zh-cn/dotnet/core/deploying/single-file/overview?tabs=cli>
