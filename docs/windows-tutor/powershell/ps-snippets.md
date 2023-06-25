# 我的posh片段

## Powershell的库

[https://www.powershellgallery.com/](https://www.powershellgallery.com/)  
部分教程  [链接](https://www.computerperformance.co.uk/powershell/)


## 遍历删除文件夹下的.git目录

```powershell
ls * -include  .git  -Force -recurse |Remove-Item -r -Force
```
## Start-Process，别名：start + 路径， 打开当前文件夹

```powershell
# 以管理员身份启动Powershell
start -FilePath "powershell" -Verb RunAs
```

## Get-History，别名：history、h，列出之前的操作命令

```powershell
history
```

## Get-Process， 别名：ps，查找进程, 可以通过进程名称或者进程ID来获取特定进程

```powershell
Get-Process qq
```

## remove-item，别名： rm、del, 删除或删除文件

```powershell

```

## get-location，别名：pwd, 当前目录位置

## get-help, 缩写help，查看命令的帮助

```powershell
help get-process
```

## get-host

## get-date, 别名：date，获取系统当前时间

```powershell
get-date
```

## get-content，别名：cat, 输出文件内容到控制台

## 获取命令的位置

```powershell
 Get-Command -Name npm
```

### 获取命令所在目录

```powershell
start (Get-Item (Get-Command -Name npm).Source).Directory
```

## 获取系统的编码

```powershell
chcp
活动代码页: 936 这个是gbk编码
```

## 下载文件

```powershell

iwr "http://p9.pstatp.com" -Outfile a.webp
或者
curl 'http:www.baidu.com' -o a.webp
```

可以使用openfiles这个命令，和linux下的lsof差不多
不过系统默认是关闭这个功能，要使用这个功能，需要先激活。
激活命令：

```powershell
openfiles /local on
```

然后重启电脑
然后就可以使用了，下面命令可以查询。

```powershell
openfiles /query /v
```

不用了别忘记关闭它

```powershell
openfiles /local off
```

## 执行exe或者可执行文件

```powershell
.\fileName 
```

## 清屏

```powershell
clear|cls 
```

## 查看版本

```powershell
$host.version
#  或者
Get-Host
```

## 获取当前进程

```powershell
Get-Process
```

### 关闭某进程

```powershell
$process ="*powershellw*"
# 查找和powershellw相关的进程
Get-CimInstance Win32_Process | Where {$_.CommandLine -like $process } | select -ExpandProperty CommandLine # | Measure-Object -Line
# 关闭powershellw进程
Get-CimInstance Win32_Process | Where {$_.CommandLine -like $process} | Remove-CimInstance
```

### 查看进程的命令行

```powershell
# 获取powershell进程的命令行
Get-CimInstance Win32_Process -Filter "name = 'powershell.exe'" | Select-Object CommandLine
# 获取命令行带有zfile.jar的命令行
Get-CimInstance Win32_Process  | Where-Object CommandLine -Match 'zfile'| Remove-CimInstance

# 关闭某进程
Stop-Process -Id 34328
```

## 查看端口被哪个进程占用

```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess
```

## 重命名

```powershell
Rename-Item FileName -NewName NewFileName
```

## 批量重命名

```powershell
$i = 0
 
Get-ChildItem -Path D:\pictures -Filter *.jpg |
ForEach-Object {
    $extension = $_.Extension
    $newName = 'pic_{0:d6}{1}' -f $i, $extension
    $i++
    Rename-Item -Path $_.FullName -NewName $newName
}
```

```powershell
type > %~dp0\a.txt
# 新建文件
echo a 2>FileName
```

## 添加参数

@[code powershell](./res/addParam.ps1)

使用`.\addParam.ps1 -Type` 输入 `-`会自动弹出-Type

## 获取文件夹大小

```powershell

param (
    [string] $folder
)
    
Get-ChildItem -Path $folder -Force -Recurse -ErrorAction SilentlyContinue |
Where-Object { $_.PSIsContainer -eq $false } |
Measure-Object |  Select-Object -ExpandProperty Count
Write-Host  "文件数量检测完毕" -ForegroundColor Cyan
```
##   Run String as Command in PowerShell

 使用Invoke-Expression

```powershell
$command = "notepad.exe"

Invoke-Expression $command

  
$command = "Get-Process | Sort-Object -Property CPU -Descending | Select-Object -First 5"

Invoke-Expression -Command $command
```
使用&运算符

```powershell
$command = "notepad.exe"

& $command
```

使用双引号

```powershell
$filename = "File1.txt"

$command = "Get-Process | Out-File -FilePath <code>"E:\$filename</code>""

Invoke-Expression -Command $command
```

使用c#代码
```powershell
$commandString = "Get-ChildItem C:\TEST1"

$commandBlock = [scriptblock]::Create($commandString)

& $commandBlock
```

来自<https://java2blog.com/powershell-remove-special-characters-from-string/>