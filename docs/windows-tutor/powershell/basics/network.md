# 网络相关

- ping
- telnet
- nslookup
- netsh

-

```powershell
Get-NetTCPConnection
# 获取已建立的链接
Get-NetTCPConnection -State Established
```

## Get-NetIPAddress

```powershell
Get-NetIPAddress
   [[-IPAddress] <String[]>]
   [-InterfaceIndex <UInt32[]>]
   [-InterfaceAlias <String[]>]
   [-AddressFamily <AddressFamily[]>]
   [-Type <Type[]>]
   [-PrefixLength <Byte[]>]
   [-PrefixOrigin <PrefixOrigin[]>]
   [-SuffixOrigin <SuffixOrigin[]>]
   [-AddressState <AddressState[]>]
   [-ValidLifetime <TimeSpan[]>]
   [-PreferredLifetime <TimeSpan[]>]
   [-SkipAsSource <Boolean[]>]
   [-AssociatedIPInterface <CimInstance>]
   [-PolicyStore <String>]
   [-IncludeAllCompartments]
   [-CimSession <CimSession[]>]
   [-ThrottleLimit <Int32>]
   [-AsJob]
   [<CommonParameters>]

Get-NetIPAddress | Format-Table
```
