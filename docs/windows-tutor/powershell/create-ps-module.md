# 创建 PowerShell 模块

## 步骤

1. 更改环境变量 `psmodulepath`，添加你的模块所在路径，类似 `e:\psmodules`
2. 创建一个 `mycli` 文件夹，里面添加一个 `mycli.psm1`（模块文件，类似 ps1），文件夹名字一定要和模块名字一样！

内容是：

```powershell
function start-miaomiao {
    echo 'hello'
}
```

3. 新增一个清单文件：

```powershell
New-ModuleManifest -Path '.\mycli.psd1' -Author 'yzq' -RootModule .\mycli.psm1 -Description 'This is a template module.'
```

4. 在全局的 ps1 文件中加入 `Import-Module mycli`，然后就可以在命令行输入 `start-miao` 了
