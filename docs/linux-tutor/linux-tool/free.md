# free — 查询系统可用内存

`free` 命令用于显示系统内存的使用情况，包括物理内存、交换内存（swap）以及内核缓冲区和缓存的使用量。该命令是系统性能分析的基础工具之一。

## 命令格式

```bash
free [选项]
```

## 常用参数

| 参数 | 说明 |
|------|------|
| `-h` | 以人类可读的格式显示（自动选择单位） |
| `-m` | 以 MB 为单位显示 |
| `-g` | 以 GB 为单位显示 |
| `-s <秒>` | 每隔指定秒数刷新显示 |
| `-t` | 显示总计行 |
| `--si` | 使用 1000 进制而非 1024 进制 |

## 输出说明

```bash
$ free -h
              total        used        free      shared  buff/cache   available
Mem:           7.8G        5.9G        1.9G        0.0M        303M        5.3G
Swap:          6.6G         16M        6.5G
```

### 各行含义

| 行 | 说明 |
|----|------|
| `Mem` | 物理内存的使用情况 |
| `Swap` | 交换分区的使用情况 |
| `-/+ buffers/cache` | 旧版 free 的输出，表示扣除 buffer/cache 后的实际使用量 |

### 各列含义

| 列 | 说明 |
|----|------|
| `total` | 内存总容量 |
| `used` | 已使用的内存 |
| `free` | 完全空闲的内存 |
| `shared` | 被多个进程共享的内存 |
| `buff/cache` | 被内核缓冲区和缓存占用的内存 |
| `available` | 可用于启动新应用程序的内存估计值 |

## 使用示例

### 以人类可读格式查看内存

```bash
$ free -h
              total        used        free      shared  buff/cache   available
Mem:           7.8G        5.9G        1.9G        0.0M        303M        5.3G
Swap:          6.6G         16M        6.5G
```

### 每隔 2 秒刷新一次

```bash
$ free -s 2
```

### 以 MB 为单位显示

```bash
$ free -m
              total        used        free      shared  buff/cache   available
Mem:           7987         6019        1970          0          303       5437
Swap:          6720           15        6705
```

### 显示总计行

```bash
$ free -h -t
              total        used        free      shared  buff/cache   available
Mem:           7.8G        5.9G        1.9G        0.0M        303M        5.3G
Swap:          6.6G         16M        6.5G
Total:         14.4G        5.9G        8.4G
```

## 深入理解

### 内存计算关系

```bash
total = used + free + buff/cache
available ≈ free + buff/cache（可回收部分）
```

### 清理缓存

```bash
# 清理 page cache
echo 1 > /proc/sys/vm/drop_caches

# 清理 dentries 和 inodes
echo 2 > /proc/sys/vm/drop_caches

# 清理所有缓存（page cache + dentries + inodes）
echo 3 > /proc/sys/vm/drop_caches
```

### 实际可用内存

系统实际可用的内存量接近 `available` 列的值，而非 `free` 列的值。因为 `buff/cache` 占用的内存在需要时可以被内核回收，供应用程序使用。

```bash
# 查看 /proc/meminfo 获取更详细的内存信息
$ cat /proc/meminfo | grep -E "MemTotal|MemFree|MemAvailable|Buffers|Cached"
MemTotal:        8175320 kB
MemFree:         2016072 kB
MemAvailable:    5437560 kB
Buffers:           310208 kB
Cached:          5243680 kB
```

## 参考

- `/proc/meminfo` — 内存信息的内核接口
- `vmstat` — 虚拟内存统计工具
- `top` / `htop` — 实时进程监控工具