---
index: 6
---
# 系统与网络命令

## 一、系统信息

### `uname` — 查看系统信息

```bash
uname                              # 显示内核名称（Linux）
uname -a                           # 显示所有系统信息（最常用）
uname -r                           # 显示内核版本：5.15.0-86-generic
uname -n                           # 显示主机名
uname -m                           # 显示机器架构：x86_64 / aarch64
uname -s                           # 显示内核名称
uname -v                           # 显示内核版本号
uname -p                           # 显示处理器架构
uname -i                           # 显示硬件平台
uname -o                           # 显示操作系统：GNU/Linux
```

### `hostnamectl` — 主机名管理

```bash
hostnamectl                        # 查看主机名和系统信息
hostnamectl set-hostname newname   # 设置主机名
hostnamectl status                 # 查看状态
```

### `arch` — 显示架构

```bash
arch                               # 输出: x86_64
```

### `lscpu` — CPU 详细信息

```bash
lscpu                              # 显示 CPU 架构信息
lscpu | grep -E "Model name|CPU\(s\)|Thread"  # 筛选关键信息
```

### `lsusb` — USB 设备

```bash
lsusb                              # 列出 USB 设备
lsusb -v                           # 详细信息
lsusb -t                           # 树形显示
```

### `lspci` — PCI 设备

```bash
lspci                              # 列出 PCI 设备
lspci -v                           # 详细信息
lspci -vv                          # 非常详细
lspci -t                           # 树形显示
lspci | grep -i vga                # 查看显卡
```

### `lsblk` — 块设备

```bash
lsblk                              # 列出所有块设备
lsblk -f                           # 显示文件系统
lsblk -m                           # 显示权限信息
lsblk -t                           # 显示拓扑
lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINT  # 自定义输出列
```

### `lshw` — 硬件详细信息

```bash
lshw                               # 完整硬件信息（需 root）
lshw -short                        # 简短格式
lshw -class disk                   # 只查看磁盘
lshw -class network                # 只查看网络
```

---

## 二、磁盘与文件系统

### `df` — 查看磁盘空间使用情况

```bash
df                                 # 显示所有文件系统的磁盘使用
df -h                              # 人类可读格式（最常用）
df -T                              # 显示文件系统类型
df -a                              # 包含伪文件系统
df -i                              # 显示 inode 使用情况
df -t ext4                         # 只显示 ext4 文件系统
df -x tmpfs                        # 排除 tmpfs
df -h /home                        # 查看指定目录所在分区
df --total                         # 显示总计
```

### `du` — 查看文件/目录占用空间

```bash
du -sh dir/                        # 查看目录总大小（最常用）
du -sh *                           # 查看当前目录下所有项的大小
du -sh .[!.]*                      # 包含隐藏文件
du -h file.txt                     # 查看文件大小
du -ah dir/                        # 显示目录下所有文件大小
du -h --max-depth=1                # 只显示一层子目录
du -h --max-depth=2                # 显示两层
du -h -c /var/log/*                # 计算总和
du -h -d 1 | sort -rh              # 按大小排序
du -h --exclude='*.log' /var       # 排除 .log 文件
du -h --time /var/log              # 显示最后修改时间
du -sh * | sort -rh | head -10     # 最大的 10 个文件/目录
```

### `dd` — 数据复制和转换

```bash
# 基本用法
dd if=/dev/sda of=backup.img bs=4M status=progress   # 备份磁盘到镜像
dd if=backup.img of=/dev/sda bs=4M status=progress    # 从镜像恢复

# 创建文件
dd if=/dev/zero of=file.txt bs=1M count=10            # 创建 10MB 空文件
dd if=/dev/urandom of=random.bin bs=1M count=10       # 创建随机文件

# 磁盘测试
dd if=/dev/zero of=test bs=1M count=1000 conv=fdatasync  # 写速度测试
dd if=test of=/dev/null bs=1M count=1000                  # 读速度测试

# 其他
dd if=/dev/sda bs=512 count=1 | hexdump -C               # 读取 MBR
dd if=/dev/cdrom of=iso.img bs=2048                      # 制作光盘镜像
```

**常用参数**：

| 参数 | 说明 |
|------|------|
| `if=` | 输入文件 |
| `of=` | 输出文件 |
| `bs=` | 块大小（字节）|
| `count=` | 块数量 |
| `skip=` | 跳过输入开头的块数 |
| `seek=` | 跳过输出开头的块数 |
| `conv=notrunc` | 不截断输出文件 |
| `status=progress` | 显示进度 |

---

## 三、内存信息

### `free` — 查看内存使用

```bash
free                               # 显示内存使用（KB）
free -h                            # 人类可读格式（最常用）
free -m                            # MB 单位
free -g                            # GB 单位
free -s 2                          # 每 2 秒刷新一次
free -t                            # 显示 Total 行
```

### `vmstat` — 虚拟内存统计

```bash
vmstat                             # 系统进程、内存、分页、I/O 统计
vmstat 2                           # 每 2 秒刷新
vmstat -s                          # 内存统计汇总
vmstat -d                          # 磁盘统计
vmstat -m                          # slab 信息
```

### `meminfo` — 查看内存详细信息

```bash
cat /proc/meminfo                  # 查看完整内存信息
cat /proc/meminfo | grep MemTotal  # 查看总内存
```

---

## 四、时间与运行时间

### `uptime` — 系统运行时间

```bash
uptime                             # 显示：当前时间、运行时间、登录用户数、平均负载
# 输出示例：10:30:00 up 3 days, 2:15, 3 users, load average: 0.15, 0.10, 0.05
```

### `date` — 日期和时间

```bash
date                               # 当前日期时间
date +"%Y-%m-%d %H:%M:%S"          # 自定义格式
date -u                            # UTC 时间
date -d "2026-07-15"               # 显示指定日期
date -d "yesterday"                # 昨天
date -d "next Friday"              # 下周五
date -d "@1594700000"              # 时间戳转日期
date +%s                           # 当前时间戳
date +%A                           # 星期几（英文）
date +%s -d "2026-07-15"           # 指定日期的时间戳
```

### `cal` — 日历

```bash
cal                                # 当前月份
cal 2026                           # 全年
cal 7 2026                         # 2026 年 7 月
cal -3                             # 前、当、后三个月
cal -j                             # 显示为一年中的第几天
```

---

## 五、系统负载

### `load average` 解读

`load average` 的三个值分别代表 **1 分钟、5 分钟、15 分钟**的平均负载。

- 理想值：小于 CPU 核心数
- 示例：`load average: 0.50, 0.30, 0.20`（4 核 CPU，负载正常）

```bash
nproc                              # 查看 CPU 核心数
lscpu | grep 'CPU(s)'              # 查看 CPU 信息
cat /proc/cpuinfo | grep processor | wc -l  # 统计 CPU 核心数
```

---

## 六、`service` / `systemctl` — 服务管理

```bash
# 旧版 sysvinit
service nginx status               # 查看服务状态
service nginx start                # 启动服务
service nginx stop                 # 停止服务
service nginx restart              # 重启服务
service --status-all               # 列出所有服务状态

# 新版 systemd
systemctl status nginx             # 查看服务状态
systemctl start nginx              # 启动服务
systemctl stop nginx               # 停止服务
systemctl restart nginx            # 重启服务
systemctl reload nginx             # 重新加载配置
systemctl enable nginx             # 开机自启
systemctl disable nginx            # 取消开机自启
systemctl is-active nginx          # 检查是否运行
systemctl list-units --type=service  # 列出所有服务
```

---

## 七、网络命令

### `ping` — 测试网络连通性

```bash
ping google.com                    # 持续 ping（Ctrl+C 停止）
ping -c 5 google.com               # ping 5 次后停止
ping -i 2 google.com               # 间隔 2 秒
ping -s 1000 google.com            # 发送 1000 字节数据包
ping -W 5 google.com               # 超时时间 5 秒
ping -4 google.com                 # 强制 IPv4
ping -6 google.com                 # 强制 IPv6
ping -q google.com                 # 安静模式（只显示结果）
ping -f google.com                 # 洪水模式（需 root）
ping -D google.com                 # 显示时间戳
```

### `curl` — 数据传输工具（HTTP 请求）

```bash
# 基本 HTTP 请求
curl https://api.example.com        # GET 请求
curl -X POST https://api.example.com # POST 请求
curl -I https://example.com         # 只获取响应头
curl -v https://example.com         # 详细输出（调试）
curl -o output.html https://example.com  # 下载保存到文件
curl -O https://example.com/file.zip     # 下载并保存为原文件名
curl -L https://example.com          # 跟随重定向
curl -u user:pass https://api.example.com  # 基本认证
curl -H "Authorization: Bearer TOKEN" https://api.example.com  # 自定义请求头
curl -H "Content-Type: application/json" -d '{"key":"value"}' https://api.example.com  # JSON 请求
curl -d "param1=value1&param2=value2" https://api.example.com  # POST 表单数据
curl -F "file=@/path/to/file" https://upload.example.com  # 上传文件
curl -k https://self-signed.example.com  # 跳过 SSL 验证
curl -x http://proxy:8080 https://example.com  # 使用代理
curl -b "session=abc123" https://example.com  # 发送 Cookie
curl -c cookies.txt https://example.com  # 保存 Cookie
curl --limit-rate 100K https://example.com  # 限速下载
-C - -o file.zip https://example.com/file.zip  # 断点续传
```

### `wget` — 下载工具

```bash
wget https://example.com/file.zip                # 下载文件
wget -O output.zip https://example.com/file.zip  # 指定输出文件名
wget -P /downloads/ https://example.com/file.zip # 指定保存目录
wget -c https://example.com/file.zip             # 断点续传
wget -b https://example.com/file.zip             # 后台下载
wget -i urls.txt                                 # 从文件读取 URL 批量下载
wget -r https://example.com/dir/                 # 递归下载
wget -np https://example.com/dir/                # 不下载上级目录
wget -p https://example.com                      # 下载页面所有资源
wget -l 2 https://example.com                    # 递归深度为 2
wget -q https://example.com                      # 安静模式
wget --limit-rate=200k https://example.com       # 限速下载
wget --user=user --password=pass https://example.com  # 认证下载
```

### `netstat` — 网络状态（旧版）

```bash
netstat -an                         # 显示所有连接和监听端口
netstat -tlnp                       # 显示 TCP 监听端口及进程（最常用）
netstat -ulnp                       # 显示 UDP 监听端口
netstat -ant                         # 所有 TCP 连接
netstat -anu                         # 所有 UDP 连接
netstat -rn                          # 路由表
netstat -i                           # 网络接口统计
netstat -s                           # 网络协议统计
netstat -ap | grep 80                # 查看 80 端口的连接
netstat -ant | grep ESTABLISHED | wc -l  # 统计已建立连接数
```

### `ss` — 网络状态（新版，推荐）

```bash
ss -tlnp                            # TCP 监听端口（最常用，比 netstat 快）
ss -ulnp                            # UDP 监听端口
ss -an                              # 显示所有连接
ss -t                               # 所有 TCP 连接
ss -s                               # 连接统计汇总
ss -o state established             # 已建立的连接
ss -o state listening               # 监听中的连接
ss -4                               # 只显示 IPv4
ss -6                               # 只显示 IPv6
ss -tnlp sport = :80                # 查找 80 端口的进程
ss -tlnp dst :443                   # 查看目标端口为 443 的连接
ss -tlnp | grep 3306                # 查看 MySQL 端口
```

### `ip` — 网络配置（新版，推荐替代 ifconfig）

```bash
ip addr                             # 查看 IP 地址（同 ifconfig）
ip addr show eth0                   # 查看指定网卡
ip addr add 192.168.1.100/24 dev eth0  # 添加 IP 地址
ip addr del 192.168.1.100/24 dev eth0  # 删除 IP 地址

ip link                             # 查看网络接口状态
ip link set eth0 up                 # 启用网卡
ip link set eth0 down               # 禁用网卡
ip link set eth0 mtu 1500           # 设置 MTU

ip route                            # 查看路由表
ip route add default via 192.168.1.1  # 添加默认网关
ip route del default                # 删除默认路由

ip neigh                            # 查看 ARP 表
ip neigh show                       # 查看邻居
ip neigh flush all                  # 清空 ARP 表

ip netns                            # 管理网络命名空间
ip netns add ns1                    # 添加网络命名空间
```

### `ifconfig` — 网络配置（旧版）

```bash
ifconfig                            # 查看所有网络接口
ifconfig eth0                       # 查看指定接口
ifconfig eth0 up                    # 启用网卡
ifconfig eth0 down                  # 禁用网卡
ifconfig eth0 192.168.1.100 netmask 255.255.255.0  # 设置 IP
```

### `ssh` — 远程登录

```bash
ssh user@hostname                   # 基本 SSH 登录
ssh -p 2222 user@hostname           # 指定端口
ssh -i ~/.ssh/id_rsa user@hostname  # 指定密钥文件
ssh -v user@hostname                # 详细输出（调试）
ssh -vvv user@hostname              # 更详细
ssh -N -L 8080:localhost:80 user@host  # 本地端口转发
ssh -N -R 8080:localhost:80 user@host  # 远程端口转发
ssh -J jumpuser@jumpbox targetuser@target  # 跳板机连接
ssh -o "ServerAliveInterval=60" user@host  # 保持连接
ssh -o "StrictHostKeyChecking=no" user@host  # 跳过密钥检查（⚠️ 不安全）
ssh -C user@hostname                # 压缩传输
ssh -X user@hostname                # 启用 X11 转发
ssh -A user@hostname                # 代理转发
ssh -t user@hostname 'command'      # 远程执行命令并保留终端
```

### `scp` — 安全复制

```bash
scp file.txt user@host:/path/      # 本地复制到远程
scp user@host:/path/file.txt .     # 远程复制到本地
scp -P 2222 file.txt user@host:/path/  # 指定端口
scp -r dir/ user@host:/path/       # 递归复制目录
scp -C file.txt user@host:/path/   # 压缩传输
scp -i key.pem file.txt user@host:/path/  # 指定密钥
scp -l 1000 file.txt user@host:/path/    # 限制带宽（KB/s）
scp -3 user1@host1:/path/file user2@host2:/path/  # 通过本机传输
```

### `rsync` — 远程同步（高效）

```bash
rsync -av source/ dest/                         # 本地同步
rsync -av source/ user@host:/path/dest/         # 远程推送
rsync -av user@host:/path/source/ dest/         # 远程拉取
rsync -avz source/ user@host:/path/dest/        # 压缩传输
rsync -av --delete source/ dest/                # 删除目标多余文件
rsync -av --progress source/ dest/              # 显示进度
rsync -av --exclude='*.log' source/ dest/       # 排除文件
rsync -av --include='*.txt' --exclude='*' source/ dest/  # 只包含 .txt
rsync -av -e 'ssh -p 2222' source/ user@host:/path/     # 指定端口
rsync -av --bwlimit=1000 source/ dest/          # 限制带宽
rsync -av --dry-run source/ dest/               # 模拟运行（不实际执行）
```

### `nc` / `netcat` — 网络瑞士军刀

```bash
nc -zv hostname 22                  # 扫描端口是否开放
nc -zv hostname 20-100              # 扫描端口范围
nc -l -p 1234                       # 监听端口（作为服务器）
nc hostname 1234                    # 连接远程端口
nc -v hostname 80 < request.txt    # 发送 HTTP 请求
nc -l -p 1234 > received.txt       # 接收文件
nc hostname 1234 < file.txt        # 发送文件
nc -l -p 1234 -e /bin/bash         # 创建后门 shell（⚠️ 危险）
nc -u hostname 1234                 # UDP 连接
```

### `traceroute` — 路由追踪

```bash
traceroute google.com              # 追踪到目标的路由路径
traceroute -n google.com           # 不解析域名（更快）
traceroute -p 80 google.com        # 指定端口
traceroute -m 20 google.com        # 最大跳数
traceroute -w 3 google.com         # 超时时间
```

### `nslookup` / `dig` — DNS 查询

```bash
nslookup google.com                 # 查询域名 DNS
nslookup -type=mx google.com       # 查询 MX 记录
nslookup 8.8.8.8                   # 反向查询

dig google.com                      # 详细 DNS 查询
dig +short google.com              # 简短结果
dig @8.8.8.8 google.com            # 指定 DNS 服务器
dig -x 8.8.8.8                     # 反向查询
dig ANY google.com                 # 查询所有记录
dig MX google.com                  # 查询 MX 记录
```

### `host` — DNS 查询

```bash
host google.com                     # 查询域名
host 8.8.8.8                        # 反向查询
host -a google.com                  # 查询所有记录
host -t MX google.com               # 查询指定类型
```

### `nmcli` — NetworkManager 管理

```bash
nmcli device status                 # 查看设备状态
nmcli connection show               # 查看连接
nmcli connection show --active      # 查看活跃连接
nmcli connection up eth0            # 启用连接
nmcli connection down eth0          # 禁用连接
nmcli radio wifi on                 # 开启 WiFi
nmcli radio wifi off                # 关闭 WiFi
```

---

## 八、网络调试与抓包

### `tcpdump` — 网络抓包

```bash
tcpdump -i eth0                     # 监听指定网卡
tcpdump -i any port 80              # 监听 80 端口
tcpdump -i any host 192.168.1.1     # 监听指定主机
tcpdump -i any -c 100              # 只抓 100 个包
tcpdump -i any -w capture.pcap     # 保存到文件
tcpdump -r capture.pcap            # 读取抓包文件
tcpdump -i any -X                  # 十六进制和 ASCII 显示
tcpdump -i any -nn                 # 不解析域名和端口名
tcpdump -i any tcp port 443        # 只抓 HTTPS 流量
tcpdump -i any icmp                # 只抓 ICMP 流量
```

### `ethtool` — 查看/修改网卡参数

```bash
ethtool eth0                        # 查看网卡信息
ethtool -s eth0 speed 1000 duplex full  # 设置速率和双工模式
ethtool -i eth0                     # 查看驱动信息
ethtool -S eth0                     # 查看网卡统计
ethtool -p eth0                     # 指示灯闪烁（定位网卡）
```

---

## 九、综合实战

```bash
# 1. 查看系统基本信息
echo "=== 系统信息 ==="
uname -a
echo "=== CPU ==="
nproc
echo "=== 内存 ==="
free -h
echo "=== 磁盘 ==="
df -h
echo "=== 网络 ==="
ip addr | grep inet

# 2. 检查端口连通性
nc -zv 192.168.1.1 22
timeout 2 bash -c 'echo > /dev/tcp/192.168.1.1/22' && echo "Port open" || echo "Port closed"

# 3. 查看网络连接数
ss -tlnp
ss -ant | grep ESTAB | wc -l

# 4. 带宽测试（需要 iperf3）
iperf3 -c iperf.example.com         # 客户端
iperf3 -s                           # 服务端

# 5. 持续监控网络流量
sar -n DEV 1 3                      # 每 1 秒采样，共 3 次
nload                               # 实时流量监控
iftop                               # 按连接显示流量
```