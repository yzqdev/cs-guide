# CMD → PowerShell 命令对照速查

> 从 CMD 迁移到 PowerShell 的常用命令对照表及实用代码片段。

## CMD → PowerShell 命令对照

### 网络相关

| CMD | PowerShell | 说明 |
| --- | ---------- | ---- |
| `ping` | `Test-NetConnection` | 网络连通性 |
| `ping -t` | `Test-Connection` | 持续 Ping |
| `ipconfig` | `Get-NetIPAddress` | IP 地址 |
| `ipconfig /flushdns` | `Clear-DnsClientCache` | 清 DNS 缓存 |
| `tracert` | `Test-NetConnection -TraceRoute` | 路由追踪 |
| `netstat -ano` | `Get-NetTCPConnection` | TCP 连接 |
| `nslookup` | `Resolve-DnsName` | DNS 查询 |

```powershell
Test-NetConnection www.baidu.com
Resolve-DnsName www.baidu.com
Clear-DnsClientCache

# 测试端口（比 telnet 好用）
Test-NetConnection www.baidu.com -Port 443
```

### 文件与目录

| CMD | PowerShell | 说明 |
| --- | ---------- | ---- |
| `dir` | `Get-ChildItem` / `ls` | 列出文件 |
| `cd` | `Set-Location` / `cd` | 切换目录 |
| `md` | `New-Item -ItemType Directory` | 新建目录 |
| `rd /s /q` | `Remove-Item -Recurse -Force` | 删除目录 |
| `copy` | `Copy-Item` / `cp` | 复制 |
| `move` | `Move-Item` | 移动 |
| `del` | `Remove-Item` / `rm` | 删除 |

### 系统与进程

| CMD | PowerShell | 说明 |
| --- | ---------- | ---- |
| `tasklist` | `Get-Process` | 进程列表 |
| `taskkill /PID` | `Stop-Process -Id` | 杀进程 |
| `systeminfo` | `Get-ComputerInfo` | 系统信息 |
| `hostname` | `hostname` / `$env:COMPUTERNAME` | 主机名 |
| `whoami` | `whoami` / `$env:USERNAME` | 当前用户 |

```powershell
Get-Process chrome
Stop-Process -Name chrome -Force
```

### 服务管理

| CMD | PowerShell | 说明 |
| --- | ---------- | ---- |
| `sc query` | `Get-Service` | 查服务 |
| `sc start` | `Start-Service` | 启动 |
| `sc stop` | `Stop-Service` | 停止 |
| `sc config` | `Set-Service` | 配置 |

```powershell
Get-Service | Where-Object {$_.Status -eq 'Running'}
Restart-Service spooler
```

### 用户与权限

| CMD | PowerShell | 说明 |
| --- | ---------- | ---- |
| `net user` | `Get-LocalUser` | 本地用户 |
| `net group` | `Get-LocalGroup` | 本地组 |
| `icacls` | `Get-Acl` / `Set-Acl` | 权限 |

## 常用代码片段

### 遍历删除 `.git` 目录

```powershell
Get-ChildItem * -Include .git -Force -Recurse | Remove-Item -Recurse -Force
```

### 批量重命名文件

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

### 获取文件夹大小

```powershell
$startFolder = "D:\flutter"
$colItems = Get-ChildItem $startFolder | Where-Object {$_.PSIsContainer -eq $True} | Sort-Object
foreach ($i in $colItems) {
    $subFolderItems = Get-ChildItem $i.FullName -recurse | Measure-Object -property length -sum
    if ($subFolderItems.sum -gt 1GB) {
        $FileSize = "{0:N2}" -f ($subFolderItems.sum / 1GB)
        $Unit = 'GB'
    } else {
        $FileSize = "{0:N2}" -f ($subFolderItems.sum / 1MB)
        $Unit = 'MB'
    }
    Write-Host "$($i.FullName) -- $FileSize $Unit" -ForegroundColor Green
}
```

### 添加脚本参数

```powershell
# addParam.ps1
param (
    [String]$Type = "run"
)
$name = "server"
$curDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Host "当前路径 $curDir" -ForegroundColor Yellow
if ($Type -eq "run") {
    Write-Host "运行 go run main.go" -ForegroundColor Cyan
} elseif ($Type -eq "build") {
    Write-Host "编译 go build" -ForegroundColor Red
}
```

使用 `. .\addParam.ps1 -Type` 输入 `-` 会自动弹出 `-Type` 提示。

### 将字符串作为命令执行

```powershell
# Invoke-Expression
$command = "Get-Process | Sort-Object -Property CPU -Descending | Select-Object -First 5"
Invoke-Expression -Command $command

# & 运算符
$command = "notepad.exe"
& $command

# ScriptBlock
$commandString = "Get-ChildItem C:\TEST1"
$commandBlock = [scriptblock]::Create($commandString)
& $commandBlock
```

### 查看端口被哪个进程占用

```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess
```

### 关闭指定进程

```powershell
# 查找命令行带有 zfile 的进程并关闭
Get-CimInstance Win32_Process |
    Where-Object CommandLine -Match 'zfile' |
    Remove-CimInstance

# 直接通过 ID 关闭
Stop-Process -Id 34328
```

### 创建 Windows 服务

```powershell
New-Service -Name Redis `
    -DisplayName Redis7 `
    -BinaryPathName 'D:\programs\Redis-7.0.13-Windows-x64-with-Service\RedisService.exe' `
    -StartupType Automatic
```

### 下载文件

```powershell
Invoke-WebRequest "http://p9.pstatp.com" -OutFile a.webp
```

### 其他实用命令

```powershell
# 查看命令位置
Get-Command -Name npm

# 打开命令所在的目录
Start-Process (Get-Item (Get-Command -Name npm).Source).Directory

# 以管理员身份启动 PowerShell
Start-Process -FilePath "powershell" -Verb RunAs

# 新建空文件
New-Item -ItemType File -Name a.txt

# 查看 PowerShell 版本
$host.Version

# 获取系统编码
chcp

# 执行 exe 文件
.\fileName.exe
```

## PowerShell Gallery

- [PowerShell Gallery](https://www.powershellgallery.com/)
- 教程：<https://www.computerperformance.co.uk/powershell/>

## 参考

- [PowerShell Remove Special Characters From String](https://java2blog.com/powershell-remove-special-characters-from-string/)
