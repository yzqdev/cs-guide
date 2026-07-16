# PowerShell 包与模块

> 常用 PowerShell 包、模块管理及 IDE 推荐。

:::tip 资源推荐
- 国内资源站：<https://www.pstips.net/>
- 微软官方教程：<https://docs.microsoft.com/en-us/learn/modules/introduction-to-powershell/>
- tutorialspoint：<https://www.tutorialspoint.com/powershell/>
- 交互式学习：<https://github.com/vexx32/PSKoans>
:::

## 包管理工具

### PowerShellGet

PowerShellGet 是官方包管理器，用来从 PowerShell Gallery 安装模块：

```powershell
# 安装模块
Install-Module -Name PowerShellGet -Force

# 列出已安装模块
Get-InstalledModule

# 查找模块
Find-Module -Name posh-git
```

## 常用模块

| 模块 | 说明 | 安装命令 |
|------|------|---------|
| [PSReadLine](https://github.com/PowerShell/PSReadLine) | 命令行编辑增强 | `Install-Module PSReadLine` |
| [posh-git](https://github.com/dahlbyk/posh-git) | Git 状态提示 | `Install-Module posh-git` |
| [Terminal-Icons](https://github.com/devblackops/Terminal-Icons) | 文件图标 | `Install-Module Terminal-Icons` |
| [PSScriptTools](https://github.com/jdhitsolutions/PSScriptTools) | 脚本工具集 | `Install-Module PSScriptTools` |
| [yarn-completion](https://github.com/PowerShell-Completion/yarn-completion) | yarn 自动补全 | `Install-Module yarn-completion` |
| [MavenAutoCompletion](https://github.com/krymtkts/MavenAutoCompletion) | Maven 自动补全 | `Install-Module MavenAutoCompletion` |

### 查看已安装模块

```powershell
Get-InstalledModule
```

输出示例：

```
Version              Name                                Repository           Description
-------              ----                                ----------           -----------
1.8.1133             Microsoft.WinGet.Client             PSGallery            PowerShell Module for WinGet
1.1.0                posh-git                            PSGallery            Git status summary
2.3.3                PSReadLine                          PSGallery            Command line editing
0.11.0               Terminal-Icons                      PSGallery            File icons
```

## 管理模块

### 创建并加载模块

1. 在 `$profile` 所在目录的 `Modules` 文件夹下创建模块文件夹
2. 目录结构：

```
my-module/
├── README.md
└── 0.0.1/
    ├── my-module.psd1
    └── my-module.psm1
```

3. 在 `$PROFILE` 中添加 `Import-Module my-module`

```powershell
# 查看 profile 路径
$profile
```

### 配置模块清单

`my-module.psd1` 配置：

```powershell
RootModule = 'my-module.psm1'
```

生成唯一 GUID：

```powershell
New-Guid
```

### 导出模块成员

```powershell
# my-module.psm1
$exportModuleMemberParams = @{
    Function = @('open')
}
Export-ModuleMember @exportModuleMemberParams

function open {
    explorer .
}
```

### 创建清单文件

```powershell
New-ModuleManifest -Path '.\my-module.psd1' `
    -Author 'YourName' `
    -RootModule .\my-module.psm1 `
    -Description 'Module description'
```

## PowerShell IDE

- [PowerShell Studio](https://www.sapien.com/software/powershell_studio) — 专业 IDE
- VS Code + PowerShell 插件 — 免费推荐

## Awesome PowerShell

<https://github.com/janikvonrotz/awesome-powershell>
