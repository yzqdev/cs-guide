# 创建 PowerShell 模块

> 模块化你的 PowerShell 函数，方便复用和分享。

## 步骤

### 1. 设置模块路径

更改环境变量 `PSModulePath`，添加你的模块所在路径，例如 `E:\psmodules`。

### 2. 创建模块文件夹和文件

创建一个 `mycli` 文件夹，里面添加一个 `mycli.psm1`（模块脚本文件，类似 `.ps1`）。**文件夹名字必须和模块名字一致！**

```powershell
# mycli.psm1
function start-miaomiao {
    echo 'hello'
}
```

### 3. 创建清单文件

```powershell
New-ModuleManifest -Path '.\mycli.psd1' -Author 'yzq' -RootModule .\mycli.psm1 -Description 'This is a template module.'
```

### 4. 加载模块

在 `$PROFILE` 文件中加入：

```powershell
Import-Module mycli
```

然后就可以在命令行输入 `start-miaomiao` 了。
