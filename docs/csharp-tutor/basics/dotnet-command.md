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

## 打包发布

使用msbuild
[使用msbuild](https://docs.microsoft.com/zh-cn/visualstudio/msbuild/msbuild?view=vs-2022)
打包程序
[使用cli](https://docs.microsoft.com/zh-cn/dotnet/core/deploying/deploy-with-cli)
生成单个exe文件

[打包生成单个文件](https://docs.microsoft.com/zh-cn/dotnet/core/deploying/single-file)

```bash
dotnet publish -r win-x64 -c Release -p:PublishSingleFile=true --self-contained false
```
