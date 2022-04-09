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
