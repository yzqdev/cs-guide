# 网络相关

PowerShell 提供了比传统 CMD 更强大的网络命令集，支持对象化输出和管道处理。

## 传统命令（仍可用）

```powershell
ping www.baidu.com
telnet 192.168.1.1 80
nslookup www.baidu.com
netsh interface ip show config
```

## PowerShell 原生命令

### Get-NetTCPConnection

查看 TCP 连接状态，替代 `netstat -ano`。

```powershell
# 查看所有 TCP 连接
Get-NetTCPConnection

# 仅查看已建立的连接
Get-NetTCPConnection -State Established

# 查看特定端口的占用进程
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess

# 查看特定状态的所有连接（如监听中的端口）
Get-NetTCPConnection -State Listen
```

### Get-NetIPAddress

查看 IP 地址配置，替代 `ipconfig`。

```powershell
Get-NetIPAddress | Format-Table InterfaceAlias, IPAddress, PrefixLength, AddressFamily

# 仅查看 IPv4 地址
Get-NetIPAddress -AddressFamily IPv4

# 查看特定网卡
Get-NetIPAddress -InterfaceAlias "以太网*"
```

### Get-NetAdapter

查看网卡信息。

```powershell
# 查看所有网卡
Get-NetAdapter

# 查看已启用的网卡
Get-NetAdapter | Where-Object Status -eq "Up"

# 查看网卡详细信息
Get-NetAdapter -Name "以太网*" | Get-NetAdapterHardwareInfo
```

### Get-NetIPConfiguration

查看完整的 IP 配置信息。

```powershell
# 查看所有网卡的 IP 配置
Get-NetIPConfiguration

# 查看特定网卡配置
Get-NetIPConfiguration -InterfaceAlias "WLAN"
```

### Test-NetConnection

全能网络诊断工具，替代 `ping` + `telnet` + `tracert`。

```powershell
# 测试连通性（类似 ping）
Test-NetConnection www.baidu.com

# 测试端口连通性（替代 telnet）
Test-NetConnection www.baidu.com -Port 443

# 跟踪路由
Test-NetConnection www.baidu.com -TraceRoute

# 使用诊断级别
Test-NetConnection www.baidu.com -InformationLevel Detailed
```

### Resolve-DnsName

DNS 查询，替代 `nslookup`。

```powershell
# 基本查询
Resolve-DnsName www.baidu.com

# 查询 MX 记录
Resolve-DnsName baidu.com -Type MX

# 查询所有记录
Resolve-DnsName baidu.com -Type ANY
```

### 其他网络命令

```powershell
# 清除 DNS 缓存（替代 ipconfig /flushdns）
Clear-DnsClientCache

# 获取路由表
Get-NetRoute

# 查看网络邻居
Get-NetNeighbor

# 重启网卡
Restart-NetAdapter -Name "以太网" -Confirm:$false

# 禁用/启用网卡
Disable-NetAdapter -Name "以太网" -Confirm:$false
Enable-NetAdapter -Name "以太网"
```
