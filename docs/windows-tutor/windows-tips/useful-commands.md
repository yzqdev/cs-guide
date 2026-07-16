# Windows 常用命令技巧

> 运行（Win+R）中可以直接使用的命令，比鼠标点击快得多。

## 系统工具

| 命令 | 打开的工具 | 说明 |
|------|-----------|------|
| `regedit` | 注册表编辑器 | 修改系统配置 |
| `gpedit.msc` | 本地组策略编辑器 | 系统策略管理（专业版/企业版） |
| `services.msc` | 服务管理器 | 管理 Windows 服务 |
| `taskschd.msc` | 任务计划程序 | 定时任务 |
| `eventvwr.msc` | 事件查看器 | 系统日志 |
| `perfmon.msc` | 性能监视器 | 性能监控 |
| `resmon` | 资源监视器 | CPU/内存/磁盘/网络实时监控 |
| `msconfig` | 系统配置 | 启动项、引导设置 |
| `sysdm.cpl` | 系统属性 | 计算机名、性能、远程 |
| `devmgmt.msc` | 设备管理器 | 硬件设备管理 |
| `compmgmt.msc` | 计算机管理 | 集成多种管理工具 |
| `lusrmgr.msc` | 本地用户和组 | 用户账户管理 |
| `secpol.msc` | 本地安全策略 | 安全设置 |
| `odbcad32` | ODBC 数据源管理器 | 数据库连接管理 |

## 磁盘与文件

| 命令 | 打开的工具 | 说明 |
|------|-----------|------|
| `cleanmgr` | 磁盘清理 | 清理临时文件 |
| `dfrgui` | 磁盘碎片整理 | 优化驱动器 |
| `diskmgmt.msc` | 磁盘管理 | 分区管理 |
| `chkdsk` | 磁盘检查 | 检查磁盘错误 |
| `diskpart` | 磁盘分区工具 | 命令行分区管理 |
| `fsutil` | 文件系统工具 | 文件系统管理 |

### 磁盘检查实用命令

```bash
# 检查 D 盘错误并修复
chkdsk D: /f

# 检查并修复坏道
chkdsk C: /f /r /x

# 查看磁盘使用情况
wmic logicaldisk get size,freespace,caption
```

## 网络相关

| 命令 | 说明 |
|------|------|
| `ipconfig` | 查看 IP 配置 |
| `ping` | 测试网络连通性 |
| `tracert` | 路由追踪 |
| `nslookup` | DNS 查询 |
| `netstat -an` | 查看端口占用 |
| `telnet` | 测试端口连通性（需开启功能） |
| `pathping` | 路由追踪 + 延迟统计 |
| `netsh` | 网络配置命令行工具 |

### 网络排查实用命令

```bash
# 查看所有网络连接和端口
netstat -ano

# 查看特定端口（如 8080）被谁占用
netstat -ano | findstr :8080

# 根据 PID 查看进程名
tasklist | findstr <PID>

# 刷新 DNS 缓存
ipconfig /flushdns

# 释放并更新 IP
ipconfig /release
ipconfig /renew

# 重置网络配置
netsh int ip reset
netsh winsock reset

# 查看 WiFi 密码
netsh wlan show profiles
netsh wlan show profile name="WiFi名称" key=clear
```

## 系统信息

| 命令 | 说明 |
|------|------|
| `msinfo32` | 系统信息（硬件、软件、组件详情） |
| `dxdiag` | DirectX 诊断工具（显卡、声卡信息） |
| `winver` | Windows 版本信息 |
| `systeminfo` | 命令行查看系统信息 |
| `wmic` | Windows 管理规范命令行 |

### 硬件信息查看

```bash
# 查看 CPU 信息
wmic cpu get name,numberofcores,maxclockspeed

# 查看内存信息
wmic memorychip get capacity,speed,manufacturer

# 查看硬盘信息
wmic diskdrive get model,size,interfacetype

# 查看显卡信息
wmic path win32_videocontroller get name

# 查看主板信息
wmic baseboard get product,manufacturer,version

# 查看 BIOS 版本
wmic bios get smbiosbiosversion
```

## 进程管理

```bash
# 查看进程列表
tasklist

# 按内存排序查看进程
tasklist /fi "status eq running" | sort /+50

# 杀进程（按 PID）
taskkill /pid 1234 /f

# 杀进程（按名称）
taskkill /im notepad.exe /f

# 查看进程对应的服务
tasklist /svc

# 查看远程机器进程
tasklist /s 192.168.1.100 /u administrator
```

## 文件操作

```bash
# 查看文件扩展名
assoc .txt

# 修改文件关联
assoc .txt=txtfile

# 查看文件类型对应的打开程序
ftype txtfile

# 创建软链接
mklink /D "C:\link" "D:\target"
mklink "C:\link.txt" "D:\target.txt"

# 查看文件校验
certutil -hashfile file.txt MD5
certutil -hashfile file.txt SHA1
certutil -hashfile file.txt SHA256
```

## 用户管理

```bash
# 查看当前用户
whoami

# 查看用户信息
net user

# 查看特定用户信息
net user administrator

# 添加用户
net user username password /add

# 将用户加入管理员组
net localgroup administrators username /add

# 修改密码
net user username newpassword

# 启用/禁用账户
net user username /active:yes
net user username /active:no
```

## 杂项实用命令

```bash
# 查看系统运行时间
net statistics workstation

# 查看系统开机时间
systeminfo | find "系统启动时间"

# 查看 Windows 激活状态
slmgr /xpr

# 查看 Windows 激活详细信息
slmgr /dlv

# 打开剪贴板
clip

# 将命令输出复制到剪贴板
dir | clip

# 查看 Windows 功能列表
dism /online /get-features

# 打开 Windows 功能面板
optionalfeatures

# 查看已安装的更新
wmic qfe list

# 查看启动项
wmic startup list

# 关闭/重启/休眠
shutdown /s /t 0    # 关机
shutdown /r /t 0    # 重启
shutdown /h         # 休眠
shutdown /l         # 注销
```

## 实用技巧

### 1. 命令输出到剪贴板

```bash
# 任何命令后面加 | clip 即可复制到剪贴板
ipconfig /all | clip
systeminfo | clip
```

### 2. 快速打开文件夹

```bash
# 在文件资源管理器地址栏输入以下命令可直达
shell:startup        # 启动文件夹
shell:sendto         # 发送到菜单
shell:desktop        # 桌面
shell:downloads      # 下载
shell:documents      # 文档
shell:pictures       # 图片
shell:music          # 音乐
shell:videos         # 视频
shell:appsfolder     # 所有应用列表
shell:recent         # 最近文件
shell:fonts          # 字体文件夹
```

### 3. 环境变量路径

```bash
# 在运行（Win+R）或文件管理器地址栏中使用
%appdata%       # C:\Users\用户名\AppData\Roaming
%localappdata%  # C:\Users\用户名\AppData\Local
%temp%          # C:\Users\用户名\AppData\Local\Temp
%programfiles%  # C:\Program Files
%userprofile%   # C:\Users\用户名
%public%        # C:\Users\Public
%windir%        # C:\Windows
```

### 4. 右键菜单增强（Shift + 右键）

按住 `Shift` 再右键点击文件或文件夹，会显示更多选项：

- **在此处打开 PowerShell 窗口**
- **复制为路径**
- **发送到...**（更多选项）
- 文件右键会出现 **复制为路径**