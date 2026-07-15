# iostat — I/O 子系统监控

`iostat`（I/O Statistics）是 `sysstat` 工具包中的组件，用于监视系统输入/输出设备（磁盘）的负载情况。该工具能够报告 CPU 统计信息和设备 I/O 统计信息，是分析系统 I/O 瓶颈的重要工具。

## 安装

```bash
# Debian/Ubuntu
sudo apt install sysstat

# CentOS/RHEL
sudo yum install sysstat
```

## 命令格式

```bash
iostat [选项] [间隔秒数] [采样次数]
```

## 常用参数

| 参数 | 说明 |
|------|------|
| `-c` | 仅显示 CPU 使用率 |
| `-d` | 仅显示磁盘使用率 |
| `-x` | 显示扩展统计信息 |
| `-k` | 以 KB 为单位显示 |
| `-m` | 以 MB 为单位显示 |
| `-t` | 显示时间戳 |
| `-p 设备` | 仅显示指定设备的信息 |

## 输出说明

### CPU 统计

```bash
$ iostat -c 1 2
Linux 3.10.0-1160.el7.x86_64 (hostname)  07/15/2026  _x86_64_ (4 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           2.50    0.00    0.80    0.20    0.00   96.50
```

| 字段 | 说明 |
|------|------|
| `%user` | 用户态 CPU 占用率 |
| `%nice` | 低优先级用户态 CPU 占用率 |
| `%system` | 内核态 CPU 占用率 |
| `%iowait` | CPU 等待 I/O 完成的时间占比 |
| `%steal` | 被虚拟机偷走的 CPU 时间占比 |
| `%idle` | CPU 空闲时间占比 |

### 磁盘统计

```bash
$ iostat -d -x -k 1 1
Device: rrqm/s wrqm/s r/s w/s rkB/s wkB/s avgrq-sz avgqu-sz await r_await w_await svctm %util
sda       0.02   7.25 0.04 1.90  0.74 35.47    37.15     0.04  19.13    5.00   20.00  5.58  1.09
```

| 字段 | 说明 |
|------|------|
| `rrqm/s` | 每秒合并的读请求数 |
| `wrqm/s` | 每秒合并的写请求数 |
| `r/s` | 每秒完成的读 I/O 次数 |
| `w/s` | 每秒完成的写 I/O 次数 |
| `rkB/s` | 每秒读取的 KB 数 |
| `wkB/s` | 每秒写入的 KB 数 |
| `avgrq-sz` | 平均 I/O 请求大小（扇区）|
| `avgqu-sz` | 平均 I/O 队列长度 |
| `await` | 平均 I/O 等待时间（毫秒）|
| `r_await` | 读请求平均等待时间（毫秒）|
| `w_await` | 写请求平均等待时间（毫秒）|
| `svctm` | 平均 I/O 服务时间（毫秒）|
| `%util` | 磁盘 I/O 忙碌百分比 |

## 使用示例

### 显示所有磁盘统计

```bash
$ iostat
```

### 每 2 秒刷新一次，共 3 次

```bash
$ iostat -x 2 3
```

### 仅显示磁盘信息

```bash
$ iostat -d
```

### 显示扩展磁盘信息（推荐）

```bash
$ iostat -x -k 1
# -x: 扩展信息，-k: KB 为单位，1: 每秒刷新
```

### 监控指定磁盘

```bash
$ iostat -p sda 2
```

### 查看 CPU 和磁盘的关联信息

```bash
$ iostat -c -d 2
```

## 性能分析指标

### 判断 I/O 瓶颈

| 指标 | 正常范围 | 存在瓶颈 |
|------|----------|----------|
| `%iowait` | < 5% | > 20% |
| `%util` | < 60% | > 90% |
| `await` | < 10ms | > 100ms |
| `avgqu-sz` | < 1 | > 2 |
| `svctm` | 接近 `await` | 远小于 `await` |

### 分析要点

- 如果 `%util` 接近 100%，说明磁盘已满负荷
- 如果 `await` 远大于 `svctm`，说明 I/O 队列过长，响应延迟
- 如果 `avgqu-sz` 较大，说明有大量 I/O 在等待处理

## 参考

- `man iostat` — 查看完整帮助文档
- `vmstat` — 虚拟内存和系统进程统计
- `sar` — 系统活动报告工具