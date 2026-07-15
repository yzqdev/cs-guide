---
order: 13
---

# 系统管理

## 系统信息

### 查看系统版本

```bash
uname -a                  # 完整内核信息
uname -r                  # 内核版本
lsb_release -a            # 发行版信息
cat /etc/os-release       # 发行版详情
hostnamectl               # 主机名和系统信息
```

### 查看硬件信息

```bash
# CPU
cat /proc/cpuinfo
lscpu                     # 更友好的 CPU 信息
nproc                     # 逻辑 CPU 核心数

# 内存
cat /proc/meminfo
free -h                   # 内存使用情况（-h 人性化显示）

# 磁盘
lsblk                     # 块设备信息
sudo fdisk -l             # 分区表

# 完整硬件信息
sudo lshw                 # 需要安装
lspci                     # PCI 设备
lsusb                     # USB 设备
```

## 服务管理 (systemd)

现代 Linux 发行版大多使用 `systemd` 管理服务：

```bash
systemctl status nginx     # 查看服务状态
systemctl start nginx      # 启动服务
systemctl stop nginx       # 停止服务
systemctl restart nginx    # 重启服务
systemctl reload nginx     # 重新加载配置（不中断服务）
systemctl enable nginx     # 开机自启
systemctl disable nginx    # 禁用开机自启
systemctl is-enabled nginx # 检查是否开机自启
```

**创建自己的服务**：在 `/etc/systemd/system/` 下创建 `.service` 文件。

## 日志查看

```bash
# 传统日志文件
tail -f /var/log/syslog          # 系统日志
tail -f /var/log/auth.log        # 认证日志
tail -f /var/log/nginx/access.log  # Nginx 访问日志

# journald 日志
journalctl                       # 查看所有日志
journalctl -u nginx              # 查看特定服务的日志
journalctl -u sshd --since today # 今天以来的日志
journalctl -f                    # 实时追踪日志
journalctl -p err                # 只查看错误级别以上的日志
```

## 磁盘管理

### 查看磁盘空间

```bash
df -h                     # 查看磁盘分区使用情况
df -h /home               # 查看特定分区的使用情况
df -i                     # 查看 inode 使用情况
```

### 查看目录大小

```bash
du -sh /var/log           # 查看目录总大小
du -sh * | sort -rh       # 当前目录下所有子目录大小排序
du -h --max-depth=1       # 显示一级子目录的大小
du -sh /var/log/*.log     # 查看匹配文件的总大小
```

### 挂载与卸载

```bash
mount                     # 查看已挂载的设备
mount /dev/sdb1 /mnt/data # 挂载设备
sudo umount /mnt/data     # 卸载
sudo mount -o remount,rw /   # 重新挂载为读写模式
```

## 压缩与归档

### tar

```bash
# 创建归档
tar -cvf archive.tar dir/           # 打包（不压缩）
tar -czvf archive.tar.gz dir/       # 打包 + gzip 压缩
tar -cjvf archive.tar.bz2 dir/      # 打包 + bzip2 压缩
tar -cJvf archive.tar.xz dir/       # 打包 + xz 压缩

# 解包
tar -xvf archive.tar                # 解包
tar -xzvf archive.tar.gz            # 解压 .tar.gz
tar -xjvf archive.tar.bz2           # 解压 .tar.bz2
tar -xzvf archive.tar.gz -C /target # 解压到指定目录

# 查看归档内容
tar -tvf archive.tar.gz
```

### 其他压缩工具

```bash
gzip file                 # 压缩（生成 file.gz）
gunzip file.gz            # 解压缩
gzip -d file.gz           # 同上

bzip2 file                # 压缩（生成 file.bz2，压缩率更高）
bunzip2 file.bz2          # 解压缩

zip -r archive.zip dir/   # 创建 zip
unzip archive.zip         # 解压 zip
```

## 时间与日期

```bash
date                      # 当前时间
date +%Y-%m-%d            # 格式化: 2025-07-15
date +%Y%m%d_%H%M%S       # 适合文件名: 20250715_143022

# 设置时区
timedatectl list-timezones | grep Shanghai
sudo timedatectl set-timezone Asia/Shanghai

# NTP 时间同步
sudo timedatectl set-ntp true
```

## 系统监控

### CPU 和内存

```bash
# 综合监控
htop                      # 更友好的 top（需安装）
vmstat 2                  # 每 2 秒输出系统状态
sar -u 1 5                # CPU 使用率（每秒一次，5 次）
sar -r 1 5                # 内存使用

# 内存详情
free -h                   # 内存总量/已用/可用
cat /proc/meminfo         # 更详细的内存信息
```

### 磁盘 I/O

```bash
iostat -x 2               # 磁盘 I/O 统计（每 2 秒）
iotop                     # 按进程查看 I/O（需 root）
```

### 系统负载

```bash
uptime                    # 系统运行时间 + 平均负载
cat /proc/loadavg         # 1/5/15 分钟平均负载
```

## 进程资源限制

```bash
ulimit -a                 # 查看所有限制
ulimit -n                 # 查看最大打开文件数
ulimit -u                 # 查看最大用户进程数

# 临时修改
ulimit -n 65536

# 永久修改（/etc/security/limits.conf）
# * soft nofile 65536
# * hard nofile 65536
```

## 本章小结

| 类别 | 常用命令 |
|------|---------|
| 系统信息 | `uname`, `lsb_release`, `lscpu`, `free` |
| 服务管理 | `systemctl` |
| 日志 | `journalctl`, `tail -f /var/log/` |
| 磁盘 | `df`, `du`, `mount` |
| 压缩 | `tar`, `gzip`, `zip` |
| 时间 | `date`, `timedatectl` |
| 监控 | `htop`, `vmstat`, `iostat` |

## 练习

1. 用 `df -h` 查看各分区的使用情况，找到使用率最高的分区
2. 用 `du -sh` 查看 `/var/log` 的大小
3. 用 `systemctl` 查看 `sshd` 服务的状态
4. 用 `tar` 将 `~/Documents` 打包压缩为 `documents.tar.gz`
5. 用 `free -h` 查看内存使用，用 `uptime` 查看系统运行时间和负载
