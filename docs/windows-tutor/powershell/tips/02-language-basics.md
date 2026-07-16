# PowerShell 语言基础

> PowerShell 变量、数组、哈希表、对象、控制语句、函数与异常处理。

:::tip
- [官方文档](https://docs.microsoft.com/zh-cn/powershell/)
- [PowerShell vs Linux Bash](http://xahlee.info/powershell/powershell_for_unixer.html)
:::

## 安装

```powershell
dotnet tool install --global PowerShell
dotnet tool update --global PowerShell
```

## 变量

变量以 `$` 开头，大小写不敏感。

```powershell
# 受保护变量（只读，可删除）
New-Variable num -Value 100 -Force -Option readonly

# 常量（不可删除不可修改）
New-Variable num -Value 100 -Force -Option constant

# 环境变量
$env:tmp
$env:userprofile
```

### 打印变量

```powershell
echo $item
Write-Output $item
Write-Host '当前路径' $PWD -ForegroundColor Cyan
```

## 数组

### 创建

```powershell
$array = 1,2,3,4
$array = 1..4
$array = 1,"2017",([System.Guid]::NewGuid()),(Get-Date)
$a = @()        # 空数组
$a = ,"1"       # 一个元素的数组
```

### 访问与判断

```powershell
$ip = ipconfig
$ip[1]           # 获取第二行

$test -is [array] # 判断是否为数组
$books += "元素4" # 追加
```

## 哈希表

```powershell
# 创建
$stu = @{ Name = "test"; Age = "12"; sex = "man" }

# 哈希表里存数组
$stu = @{ Name = "hei"; Age = "12"; Books = "kali","sqlmap","powershell" }

# 插入与删除
$Student = @{}
$Student.Name = "hahaha"
$stu.Remove("Name")
```

## 对象

### 查看对象结构

```powershell
Get-Process | Get-Member | Out-Host -Paging
Get-Process | Get-Member -MemberType Properties
```

### 选择对象属性

```powershell
Get-CimInstance -Class Win32_LogicalDisk |
    Select-Object -Property Name, FreeSpace

# 计算属性（GB 为单位）
Get-CimInstance -Class Win32_LogicalDisk |
    Select-Object -Property Name, @{
        label = 'FreeSpace'
        expression = { ($_.FreeSpace / 1GB).ToString('F2') }
    }
```

### 筛选对象

```powershell
1,2,3,4 | Where-Object { $_ -lt 3 }

# 筛选 WMI 对象
Get-CimInstance -Class Win32_SystemDriver |
    Where-Object { $_.State -eq 'Running' -and $_.StartMode -eq 'Manual' } |
    Format-Table -Property Name, DisplayName
```

### 创建 .NET 对象

```powershell
# 创建 EventLog 对象
New-Object -TypeName System.Diagnostics.EventLog -ArgumentList Application

# 存储到变量
$AppLog = New-Object -TypeName System.Diagnostics.EventLog -ArgumentList Application

# 远程事件日志
$RemoteAppLog = New-Object -TypeName System.Diagnostics.EventLog Application,192.168.1.81

# 调用方法
$RemoteAppLog.Clear()
```

### 创建 COM 对象

```powershell
New-Object -ComObject WScript.Shell
New-Object -ComObject WScript.Network
New-Object -ComObject Scripting.Dictionary

# 创建桌面快捷方式
$WshShell = New-Object -ComObject WScript.Shell
$lnk = $WshShell.CreateShortcut("$Home\Desktop\PSHome.lnk")
$lnk.TargetPath = $PSHome
$lnk.Save()
```

## 控制语句

### 比较运算符

| 运算符 | 说明 | 示例 |
| ------ | ---- | ---- |
| `-eq` | 等于 | `$a -eq $b` |
| `-ne` | 不等于 | `$a -ne $b` |
| `-gt` | 大于 | `$a -gt $b` |
| `-ge` | 大于等于 | `$a -ge $b` |
| `-lt` | 小于 | `$a -lt $b` |
| `-le` | 小于等于 | `$a -le $b` |
| `-contains` | 包含 | `$array -contains something` |
| `-notcontains` | 不包含 | `$array -notcontains something` |
| `-and` / `-or` | 与 / 或 | `$a -and $b` |
| `-not` | 非 | `-not $a` |

### 条件判断

```powershell
if ($value -eq 1) {
    code1
} else {
    code2
}
```

### 循环

```powershell
# while
while ($n -gt 0) { code }

# for
$sum = 0
for ($i = 1; $i -le 100; $i++) { $sum += $i }

# foreach
foreach ($file in dir c:\windows) {
    if ($file.Length -gt 1mb) { $file.Name }
}

# ForEach-Object（管道）
Get-WmiObject Win32_Service |
    ForEach-Object { "Name: $($_.DisplayName), PID > 100: $($_.ProcessId -gt 100)" }
```

## 函数

```powershell
function Invoke-PortScan {
    <#
    .SYNOPSIS
    简介
    .DESCRIPTION
    描述
    .PARAMETER StartAddress
    参数说明
    .EXAMPLE
    PS > Invoke-PortScan -StartAddress 192.168.0.1 -EndAddress 192.168.0.254
    #>
    param (
        [string]$StartAddress,
        [string]$EndAddress
    )
    # 实现代码
}
```

## 异常处理

```powershell
try {
    $connection.open()
    $success = $true
} catch {
    $success = $false
} finally {
    $connection.close()
}
```
