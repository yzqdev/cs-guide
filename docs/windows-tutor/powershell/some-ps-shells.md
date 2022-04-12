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
