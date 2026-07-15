# sar — 系统活动报告

`sar`（System Activity Report）是 `sysstat` 工具包中的核心组件，用于收集、查看和报告系统的历史活动数据。与 `top`、`vmstat` 等实时工具不同，`sar` 可以查看过去任意时刻的系统状态，这对于分析偶发性问题非常有用。

## 安装

```bash
# Debian/Ubuntu
sudo apt install sysstat

# CentOS/RHEL
sudo yum install sysstat

# 启动数据采集
sudo systemctl enable --now sysstat
```

## 命令格式

```bash
sar [选项] [间隔秒数] [采样次数]
```

## 常用参数

| 参数 | 说明 |
|------|------|
| `-u` | 显示 CPU 使用率 |
| `-r` | 显示内存使用情况 |
| `-b` | 显示磁盘 I/O 统计 |
| `-n DEV` | 显示网络接口统计 |
| `-q` | 显示负载队列统计 |
| `-S` | 显示交换空间使用情况 |
| `-W` | 显示交换统计（si/so）|
| `-f 文件` | 从指定文件读取历史数据 |
| `-s 时间` | 设置历史数据起始时间 |
| `-e 时间` | 设置历史数据结束时间 |

## 使用示例

### 实时监控

```bash
# 每 2 秒显示一次 CPU 使用率，共 3 次
$ sar -u 2 3
```

### 查看历史数据

`sar` 默认将数据存储在 `/var/log/sysstat/` 目录下：

```bash
# 查看今天的 CPU 使用率历史
$ sar -u

# 查看昨天的数据
$ sar -u -f /var/log/sysstat/sa$(date -d yesterday +%d)

# 查看指定时间范围内的数据
$ sar -u -s 10:00:00 -e 12:00:00
```

### CPU 使用率

```bash
$ sar -u 1 3
Linux 3.10.0-1160.el7.x86_64 (hostname)  07/15/2026  _x86_64_ (4 CPU)

10:00:00 AM     CPU     %user     %nice   %system   %iowait    %steal     %idle
10:00:01 AM     all      2.50      0.00      0.80      0.20      0.00     96.50
10:00:02 AM     all      3.10      0.00      1.20      0.10      0.00     95.60
Average:        all      2.80      0.00      1.00      0.15      0.00     96.05
```

### 内存使用情况

```bash
$ sar -r 1 3
10:00:00 AM kbmemfree kbmemused  %memused kbbuffers kbcached  kbcommit   %commit
10:00:01 AM   2016072   6159248     75.33    310208   5243680   5123456    62.68
```

### 磁盘 I/O

```bash
$ sar -b 1 3
10:00:00 AM       tps      rtps      wtps   bread/s   bwrtn/s
10:00:01 AM     10.23      0.50      9.73     12.50    345.20
```

| 字段 | 说明 |
|------|------|
| `tps` | 每秒 I/O 传输总数 |
| `rtps` | 每秒读请求数 |
| `wtps` | 每秒写请求数 |
| `bread/s` | 每秒读取的块数 |
| `bwrtn/s` | 每秒写入的块数 |

### 网络接口统计

```bash
$ sar -n DEV 1 2
10:00:00 AM     IFACE   rxpck/s   txpck/s   rxkB/s   txkB/s   rxcmp/s   txcmp/s
10:00:01 AM       eth0    120.5      80.3     15.2      6.8       0.0       0.0
10:00:01 AM         lo      0.5       0.5      0.0      0.0       0.0       0.0
```

### 系统负载队列

```bash
$ sar -q 1 3
10:00:00 AM   runq-sz  plist-sz   ldavg-1   ldavg-5  ldavg-15
10:00:01 AM         1       120      0.15      0.10      0.05
```

| 字段 | 说明 |
|------|------|
| `runq-sz` | 运行队列中的进程数 |
| `plist-sz` | 系统中的进程总数 |
| `ldavg-1/5/15` | 1/5/15 分钟平均负载 |

## 综合性能分析

### 收集全面的系统性能数据

```bash
# 每 10 秒采集一次，持续 1 小时
$ sar -u -r -b -n DEV -q 10 360
```

### 查找 CPU 峰值时段

```bash
# 查看今天的 CPU 使用率峰值
$ sar -u | sort -k4 -rn | head -10
```

### 查找 I/O 繁忙时段

```bash
$ sar -b | sort -k2 -rn | head -10
```

## 参考

- `man sar` — 查看完整帮助文档
- `iostat` — I/O 子系统监控
- `vmstat` — 虚拟内存统计
- `pidstat` — 进程级别监控