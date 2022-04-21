# 教程

## Powershell的库

[https://www.powershellgallery.com/](https://www.powershellgallery.com/)  
部分教程  [链接](https://www.computerperformance.co.uk/powershell/)

## 获取命令的位置

```java
 Get-Command -Name npm
```

## 获取系统的编码

```java
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
$process ="*javaw*"
# 查找和javaw相关的进程
Get-CimInstance Win32_Process | Where {$_.CommandLine -like $process } | select -ExpandProperty CommandLine # | Measure-Object -Line
# 关闭javaw进程
Get-CimInstance Win32_Process | Where {$_.CommandLine -like $process} | Remove-CimInstance
```

### 查看进程的命令行

```powershell
# 获取java进程的命令行
Get-CimInstance Win32_Process -Filter "name = 'java.exe'" | Select-Object CommandLine
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
