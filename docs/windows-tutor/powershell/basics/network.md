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
```

### Get-NetIPAddress

查看 IP 地址配置，替代 `ipconfig`。

```powershell
Get-NetIPAddress | Format-Table InterfaceAlias, IPAddress, PrefixLength, AddressFamily
```

### 其他网络命令

```powershell
# 测试端口连通性（替代 telnet）
Test-NetConnection www.baidu.com -Port 443

# DNS 查询（替代 nslookup）
Resolve-DnsName www.baidu.com

# 清除 DNS 缓存（替代 ipconfig /flushdns）
Clear-DnsClientCache
```
