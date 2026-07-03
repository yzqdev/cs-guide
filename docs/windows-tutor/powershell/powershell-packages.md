# PowerShell 好用的包

:::tip

- 国内资源站：[https://www.pstips.net/](https://www.pstips.net/)
- 微软官方教程：[https://docs.microsoft.com/en-us/learn/modules/introduction-to-powershell/](https://docs.microsoft.com/en-us/learn/modules/introduction-to-powershell/)
- tutorialspoint：[https://www.tutorialspoint.com/powershell/](https://www.tutorialspoint.com/powershell/)
- 一个好玩的教程：[https://github.com/vexx32/PSKoans](https://github.com/vexx32/PSKoans)

  :::

## PowerShellGet 用来管理自己的包

## PowerShell IDE

[https://www.sapien.com/software/powershell_studio](https://www.sapien.com/software/powershell_studio)

## Awesome PowerShell

[https://github.com/janikvonrotz/awesome-powershell](https://github.com/janikvonrotz/awesome-powershell)

## PSReadLine PowerShell 强化工具

[https://github.com/PowerShell/PSReadLine](https://github.com/PowerShell/PSReadLine)

## posh-git Git 增强工具

[https://github.com/dahlbyk/posh-git](https://github.com/dahlbyk/posh-git)

## PowerShell 常用命令

### 创建并加载模块

1. `my-module` 整个文件夹需要放在 `$profile` 的 Modules 文件夹下
2. 整个目录结构相对简单：

```
my-module:
│  README.md
│
└─0.0.1
        my-module.psd1
        my-module.psm1
```

3. 需要在 PowerShell 的配置文件中添加如下一行：

```powershell
Import-Module my-module
```

4. PowerShell 的配置文件地址可以输入下面的命令查看，如果没有，可以自行创建：

```powershell
$profile
```

5. 重启 PowerShell 后就可以了

### 如何配置模块

1. 需要在 `my-module.psd1` 配置 `RootModule` 文件：

```powershell
RootModule = 'my-module.psm1'
```

2. 需要一个唯一的 GUID，可以通过 PowerShell 命令行直接生成：

```powershell
New-Guid
```

3. 新建 `my-module.psm1`，在这里添加需要的 alias，定义需要 export 的成员方法：

```powershell
$exportModuleMemberParams = @{
    Function = @(
        'open',
    )
}
Export-ModuleMember @exportModuleMemberParams
```

4. 实现 function。这里默认打开当前的文件，function 也可以直接参数：

```powershell
function open {
    explorer .
}
```

## 获取安装的 PowerShell Module

```powershell
Get-InstalledModule
```

输出示例：

```
Version              Name                                Repository           Description
-------              ----                                ----------           -----------
0.2                  MavenAutoCompletion                 PSGallery            Maven Auto Completion provides a simple …
0.9.0-rc1            Microsoft.PowerShell.PSResourceGet  PSGallery            PowerShell module with commands for disc…
1.8.1133             Microsoft.WinGet.Client             PSGallery            PowerShell Module for the Windows Packag…
1.0.2.0              Microsoft.WinGet.CommandNotFound    PSGallery            Enable suggestions on how to install mis…
0.1.2                posh-cargo                          PSGallery            Provides tab autocompletion of cargo (ht…
1.1.0                posh-git                            PSGallery            Provides prompt with Git status summary …
2.2.5                PowerShellGet                       PSGallery            PowerShell module with commands for disc…
2.3.3                PSReadLine                          PSGallery            Great command line editing in the PowerS…
2.50.0               PSScriptTools                       PSGallery            A collection of PowerShell functions des…
0.11.0               Terminal-Icons                      PSGallery            PowerShell module to add file icons to t…
0.1.2                yarn-completion                     PSGallery            A Yarn tab completion for PowerShell.
```
