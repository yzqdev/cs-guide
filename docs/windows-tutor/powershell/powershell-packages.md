# powershell好用的包

:::tip
国内资源站:[https://www.pstips.net/](https://www.pstips.net/)  
微软官方教程: [https://docs.microsoft.com/en-us/learn/modules/introduction-to-powershell/](https://docs.microsoft.com/en-us/learn/modules/introduction-to-powershell/)  
tutorialspoint: [https://www.tutorialspoint.com/powershell/](https://www.tutorialspoint.com/powershell/)  
一个好玩的教程: [https://github.com/vexx32/PSKoans](https://github.com/vexx32/PSKoans)
:::

## PowerShellGet 用来管理自己的包

## powershell ide  

[https://www.sapien.com/software/powershell_studio](https://www.sapien.com/software/powershell_studio)

## awesome powershell

[https://github.com/janikvonrotz/awesome-powershell](https://github.com/janikvonrotz/awesome-powershell)

## PSReadLine powershell强化工具

[https://github.com/PowerShell/PSReadLine](https://github.com/PowerShell/PSReadLine)
​

## posh-git git增强工具

[https://github.com/dahlbyk/posh-git](https://github.com/dahlbyk/posh-git)

# powershell常用命令

1. my-module整个文件夹需要放在 $profile 的 Modules 文件夹下
1. 整个目录结构相对简单

```
 my-module:
 │  README.md
 │
 └─0.0.1
         my-module.psd1
         my-module.psm1
```

3. 需要在powerShell的配置文件中添加如下一行

```powershell
Import-Module my-module
```

1. powershell的配置文件地址可以輸入下面的命令查看, 如果沒有，可以自行創建

```powershell
$profile
```

1. 重啓powerShell后就可以了

## 如何配置

1. 需要再my-moudle.psd1, 配置RootModule文件

```powershell
RootModule = 'my-module.psm1'
```

2. 需要一个唯一的GUID，可以通过powerShell命令行直接生成

```powershell
New-Guid
```

3. 新建my-module.psm1,在这里添加需要的alias, 定义需要export的成员方法

```powershell
$exportModuleMemberParams = @{
 Function = @(
   'open',
 )}
 Export-ModuleMember @exportModuleMemberParams
```

4. 实现function
这里默认打开当前的文件，function也可以直接参数

```powershell
function open {
  explorer .
}
```
