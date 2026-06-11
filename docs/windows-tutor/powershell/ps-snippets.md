# 我的 Posh 片段

> PowerShell 常用命令、别名对照及实用代码片段速查。

---

## 目录

- [PowerShell 库](#powershell-的库)
- [执行脚本中的函数](#执行某个-ps-脚本的-function)
- [内置变量](#获取内置的变量)
- [CMD → PowerShell 命令对照](#windows-上替代-cmd-的一些命令)
- [文件与目录操作](#文件与目录操作)
- [进程管理](#进程管理)
- [网络相关](#网络相关)
- [其他实用命令](#其他实用命令)
- [进阶技巧](#进阶技巧)

---

## PowerShell 的库

- [PowerShell Gallery](https://www.powershellgallery.com/)
- 部分教程：<https://www.computerperformance.co.uk/powershell/>

---

## 执行某个 PS 脚本的 Function

```powershell
# 方式一：通过命令行调用
powershell -Command "& { . <path>\script1.ps1; My-Func }"

# 方式二：在当前会话中加载并执行
. .\script.ps1
My-Func
```

---

## 获取内置的变量

```powershell
Get-Variable
```

---

## Windows 上替代 CMD 的一些命令

| CMD | PowerShell | 说明 |
| --- | ---------- | ---- |
| `ping` | `Test-NetConnection` | 网络连通性 |
| `ping -t` | `Test-Connection` | 持续 Ping |
| `ipconfig` | `Get-NetIPAddress` | IP 地址 |
| `ipconfig /flushdns` | `Clear-DnsClientCache` | 清除 DNS 缓存 |
| `tracert` | `Test-NetConnection -TraceRoute` | 路由追踪 |
| `netstat -ano` | `Get-NetTCPConnection` | TCP 连接 |
| `nslookup` | `Resolve-DnsName` | DNS 查询 |

---

## 文件与目录操作

### 遍历删除文件夹下的 `.git` 目录

```powershell
Get-ChildItem * -Include .git -Force -Recurse | Remove-Item -Recurse -Force
```

### 打开当前文件夹（`Start-Process`，别名：`start`）

```powershell
# 以管理员身份启动 PowerShell
Start-Process -FilePath "powershell" -Verb RunAs
```

### 当前目录位置（`Get-Location`，别名：`pwd`）

```powershell
Get-Location
```

### 获取命令的位置

```powershell
Get-Command -Name npm
```

### 获取命令所在目录并打开

```powershell
Start-Process (Get-Item (Get-Command -Name npm).Source).Directory
```

### 输出文件内容到控制台（`Get-Content`，别名：`cat`）

```powershell
Get-Content file.txt
```

### 删除文件或目录（`Remove-Item`，别名：`rm`、`del`）

```powershell
Remove-Item path\to\file_or_folder
```

### 重命名

```powershell
Rename-Item FileName -NewName NewFileName
```

### 批量重命名

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

### 新建空文件

```powershell
# CMD 风格
$null > a.txt

# PowerShell 风格
New-Item -ItemType File -Name a.txt
```

### 获取文件夹大小

```powershell
param (
    [string] $folder
)

Get-ChildItem -Path $folder -Force -Recurse -ErrorAction SilentlyContinue |
    Where-Object { $_.PSIsContainer -eq $false } |
    Measure-Object |
    Select-Object -ExpandProperty Count

Write-Host "文件数量检测完毕" -ForegroundColor Cyan
```

---

## 进程管理

### 列出之前的操作命令（`Get-History`，别名：`history`、`h`）

```powershell
history
```

### 查找进程（`Get-Process`，别名：`ps`）

```powershell
Get-Process qq
```

### 获取当前所有进程

```powershell
Get-Process
```

### 关闭某进程

```powershell
$process = "*powershellw*"

# 查找相关进程
Get-CimInstance Win32_Process |
    Where-Object { $_.CommandLine -like $process } |
    Select-Object -ExpandProperty CommandLine

# 关闭进程
Get-CimInstance Win32_Process |
    Where-Object { $_.CommandLine -like $process } |
    Remove-CimInstance
```

### 查看进程的命令行

```powershell
# 获取 powershell.exe 的命令行
Get-CimInstance Win32_Process -Filter "name = 'powershell.exe'" |
    Select-Object CommandLine

# 获取命令行带有 zfile.jar 的进程并关闭
Get-CimInstance Win32_Process |
    Where-Object CommandLine -Match 'zfile' |
    Remove-CimInstance

# 直接通过 ID 关闭进程
Stop-Process -Id 34328
```

---

## 网络相关

### 查看端口被哪个进程占用

```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess
```

### 下载文件

```powershell
Invoke-WebRequest "http://p9.pstatp.com" -OutFile a.webp

# 或者使用 curl 别名
curl 'http://www.baidu.com' -o a.webp
```

### 查看打开的文件（类似 Linux `lsof`）

> 系统默认关闭此功能，使用前需先激活。

```powershell
# 激活
openfiles /local on

# 重启电脑后使用
openfiles /query /v

# 关闭功能
openfiles /local off
```

---

## 其他实用命令

### 查看帮助（`Get-Help`，别名：`help`）

```powershell
help Get-Process
```

### 获取主机信息（`Get-Host`）

```powershell
Get-Host
```

### 获取系统当前时间（`Get-Date`，别名：`date`）

```powershell
Get-Date
```

### 清屏

```powershell
clear  # 或 cls
```

### 查看 PowerShell 版本

```powershell
$host.Version
# 或者
Get-Host
```

### 获取系统编码

```powershell
chcp
# 活动代码页: 936  （GBK 编码）
```

### 执行可执行文件

```powershell
.\fileName.exe
```

---

## 进阶技巧

### 添加脚本参数

@[code powershell](./res/addParam.ps1)

使用 ` .\addParam.ps1 -Type` 输入 `-` 会自动弹出 `-Type` 提示。

### 将字符串作为命令执行

#### 方式一：`Invoke-Expression`

```powershell
$command = "notepad.exe"
Invoke-Expression $command

$command = "Get-Process | Sort-Object -Property CPU -Descending | Select-Object -First 5"
Invoke-Expression -Command $command
```

#### 方式二：`&` 运算符

```powershell
$command = "notepad.exe"
& $command
```

#### 方式三：使用变量插值（双引号）

```powershell
$filename = "File1.txt"
$command = "Get-Process | Out-File -FilePath `"E:\$filename`""
Invoke-Expression -Command $command
```

#### 方式四：使用 C# 代码创建 ScriptBlock

```powershell
$commandString = "Get-ChildItem C:\TEST1"
$commandBlock = [scriptblock]::Create($commandString)
& $commandBlock
```

> 参考：[PowerShell Remove Special Characters From String](https://java2blog.com/powershell-remove-special-characters-from-string/)

### 创建 Windows 服务

```powershell
New-Service -Name Redis `
    -DisplayName Redis7 `
    -BinaryPathName 'D:\programs\Redis-7.0.13-Windows-x64-with-Service\RedisService.exe' `
    -StartupType Automatic
```

---

## CMD → PowerShell 常见命令对照表

下面是一份**「CMD → PowerShell 常见命令对照表」**，只列**真正常用、可替代**的，不是那种生僻的。

### 一、网络相关（最常见）

| CMD | PowerShell | 说明 |
| --- | ---------- | ---- |
| `ping` | `Test-NetConnection` | 网络连通性 |
| `ping -t` | `Test-Connection` | 持续 ping |
| `ipconfig` | `Get-NetIPAddress` | IP 地址 |
| `ipconfig /flushdns` | `Clear-DnsClientCache` | 清 DNS 缓存 |
| `tracert` | `Test-NetConnection -TraceRoute` | 路由追踪 |
| `netstat -ano` | `Get-NetTCPConnection` | TCP 连接 |
| `nslookup` | `Resolve-DnsName` | DNS 查询 |

示例：

```powershell
Test-NetConnection www.baidu.com
Resolve-DnsName www.baidu.com
Clear-DnsClientCache
```

### 二、文件 / 目录操作

| CMD | PowerShell | 说明 |
| --- | ---------- | ---- |
| `dir` | `Get-ChildItem` / `ls` | 列出文件 |
| `cd` | `Set-Location` / `cd` | 切换目录 |
| `md` | `New-Item -ItemType Directory` | 新建目录 |
| `rd /s /q` | `Remove-Item -Recurse -Force` | 删除目录 |
| `copy` | `Copy-Item` / `cp` | 复制 |
| `move` | `Move-Item` | 移动 |
| `del` | `Remove-Item` / `rm` | 删除 |

示例：

```powershell
Get-ChildItem
Remove-Item test.txt
Remove-Item old -Recurse -Force
```

### 三、系统 & 进程

| CMD | PowerShell | 说明 |
| --- | ---------- | ---- |
| `tasklist` | `Get-Process` | 进程列表 |
| `taskkill /PID` | `Stop-Process -Id` | 杀进程 |
| `systeminfo` | `Get-ComputerInfo` | 系统信息 |
| `hostname` | `hostname` / `$env:COMPUTERNAME` | 主机名 |
| `whoami` | `whoami` / `$env:USERNAME` | 当前用户 |

示例：

```powershell
Get-Process chrome
Stop-Process -Name chrome -Force
```

### 四、服务管理

| CMD | PowerShell | 说明 |
| --- | ---------- | ---- |
| `sc query` | `Get-Service` | 查服务 |
| `sc start` | `Start-Service` | 启动 |
| `sc stop` | `Stop-Service` | 停止 |
| `sc config` | `Set-Service` | 配置 |

示例：

```powershell
Get-Service | Where-Object {$_.Status -eq 'Running'}
Restart-Service spooler
```

### 五、用户 & 权限

| CMD | PowerShell | 说明 |
| --- | ---------- | ---- |
| `net user` | `Get-LocalUser` | 本地用户 |
| `net group` | `Get-LocalGroup` | 本地组 |
| `icacls` | `Get-Acl` / `Set-Acl` | 权限 |

### 六、网络端口测试（CMD 没有的）

```powershell
Test-NetConnection www.baidu.com -Port 443
```

👉 **比 telnet 好用太多**
