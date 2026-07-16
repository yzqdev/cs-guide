# 创建 PowerShell 模块

> 模块化你的 PowerShell 函数，方便复用和分享。

## 步骤

### 1. 设置模块路径

更改环境变量 `PSModulePath`，添加你的模块所在路径，例如 `E:\psmodules`。

### 2. 创建模块文件夹和文件

创建一个 `mycli` 文件夹，里面添加一个 `mycli.psm1`（模块脚本文件）。

**文件夹名字必须和模块名字一致！**

```powershell
# mycli.psm1
function start-miaomiao {
    echo 'hello'
}
```

### 3. 创建清单文件

```powershell
New-ModuleManifest -Path '.\mycli.psd1' `
    -Author 'YourName' `
    -RootModule .\mycli.psm1 `
    -Description 'This is a template module.'
```

### 4. 加载模块

在 `$PROFILE` 文件中加入：

```powershell
Import-Module mycli
```

然后就可以在命令行使用 `start-miaomiao` 了。

## 目录结构

```
mycli/                   # 文件夹名 = 模块名
├── mycli.psd1           # 模块清单
└── mycli.psm1           # 模块脚本
```

## 参考

- `$PROFILE` — 查看你的 profile 路径
- `Get-InstalledModule` — 查看已安装模块
- `Find-Module` — 搜索 PowerShell Gallery
