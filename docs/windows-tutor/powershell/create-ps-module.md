# 创建powershell模块


1. 更改环境变量psmodulepath,添加你的模块所在路径,l类似`e:\psmodules`
2. 创建一个mycli文件夹,里面添加一个mycli.psm1(模块文件,类似ps1),文件夹名字一定要和模块名字一样!
内容是

```
function start-miaomiao{
echo 'hello'
}
```

1. 新增一个清单文件

```powershell
New-ModuleManifest -Path '.\mycli.psd1' -Author 'yzq' -RootModule .\mycli.psm1 -Description 'This is a template module.'
```


4. 在全局的ps1文件中加入`import-module mycli`,然后就可以在命令行输入start-miao了