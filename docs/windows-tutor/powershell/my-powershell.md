# 我的ps配置

:::tip
查询`profile`位置: `$PROFILE`

:::

## 配置文件

@[code powershell](./res/myProfile.ps1)

## 下载sg源码的配置

@[code powershell](./res/downSg.ps1)

## 克隆王道的文档

@[code powershell](./res/cloneWangdoc.ps1)

## 小爬虫

@[code powershell](./res/crawl-cat.ps1)

## 获取安装的软件

@[code powershell](./res/get-installed.ps1)

## 获取文件夹大小

@[code powershell](./res/getFolderSize.ps1)

## 获取文件夹内的文件数量

```powershell
[System.IO.Directory]::GetFiles("d:\flutter", '*', 'AllDirectories').Count
```

或者

```powershell
Get-ChildItem -Path "d:\flutter" -Force -Recurse -ErrorAction SilentlyContinue |
 Where-Object { $_.PSIsContainer -eq $false } |
 Measure-Object | 
 Select-Object -ExpandProperty Count
```
