# ps — 进程查看器

`ps`（Process Status）命令用于显示系统中当前运行的进程快照。与 `top` 命令不同，`ps` 提供的是某一时刻的静态进程信息，适合用于脚本化处理和快速查询。

## 命令格式

```bash
ps [选项]
```

## 常用参数

### 标准语法

| 参数 | 说明 |
|------|------|
| `-e` | 显示所有进程 |
| `-f` | 完整格式显示 |
| `-l` | 长格式显示 |
| `-u 用户` | 显示指定用户的进程 |
| `-p PID` | 显示指定 PID 的进程 |
| `-C 命令名` | 显示指定命令名的进程 |

### BSD 语法

| 参数 | 说明 |
|------|------|
| `aux` | 显示所有进程（最常用） |
| `auxf` | 树形结构显示进程关系 |
| `axjf` | 树形结构显示，包含作业信息 |

### GNU 语法

| 参数 | 说明 |
|------|------|
| `--sort=-%cpu` | 按 CPU 使用率降序排序 |
| `--sort=-%mem` | 按内存使用率降序排序 |
| `-o 列名` | 自定义输出列 |
| `--forest` | 树形结构显示 |

## 输出说明

```bash
$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.8 169492 13344 ?        Ss  06:30   0:02 /sbin/init
root       123  0.0  0.1  51232  2156 ?        S   06:31   0:00 /usr/sbin/sshd
mysql      456  0.1  2.5 1023456 41256 ?       Sl  06:32   0:05 /usr/sbin/mysqld
```

| 列 | 说明 |
|----|------|
| `USER` | 进程所有者 |
| `PID` | 进程 ID |
| `%CPU` | CPU 使用率百分比 |
| `%MEM` | 内存使用率百分比 |
| `VSZ` | 虚拟内存大小（KB） |
| `RSS` | 物理内存大小（KB） |
| `TTY` | 终端设备（`?` 表示无终端） |
| `STAT` | 进程状态 |
| `START` | 进程启动时间 |
| `TIME` | 累计 CPU 占用时间 |
| `COMMAND` | 命令行 |

### 进程状态码

| 状态 | 说明 |
|------|------|
| `R` | 运行中（Running） |
| `S` | 可中断睡眠（Sleeping） |
| `D` | 不可中断睡眠（Disk Sleep） |
| `T` | 已停止（Stopped） |
| `Z` | 僵尸进程（Zombie） |
| `s` | 会话领导者 |
| `+` | 前台进程组 |
| `l` | 多线程 |

## 使用示例

### 查看所有进程

```bash
$ ps aux
```

### 查找特定进程

```bash
$ ps aux | grep nginx
root      1234  0.0  0.2  45232  1234 ?        Ss  10:00   0:00 nginx: master process
www-data  1235  0.0  0.5  45232  2345 ?        S   10:00   0:00 nginx: worker process
```

### 按 CPU 使用率排序

```bash
$ ps aux --sort=-%cpu | head -5
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
mysql      456  0.1  2.5 1023456 41256 ?       Sl  06:32   0:05 /usr/sbin/mysqld
root         1  0.0  0.8 169492 13344 ?        Ss  06:30   0:02 /sbin/init
```

### 按内存使用率排序

```bash
$ ps aux --sort=-%mem | head -5
```

### 自定义输出列

```bash
# 输出 PID、命令名、内存使用率、CPU 使用率
$ ps -eo pid,comm,%mem,%cpu --sort=-%mem | head -10
```

### 树形结构查看进程

```bash
$ ps auxf
root      1234  0.0  0.2  45232  1234 ?        Ss  10:00   0:00 nginx: master process
www-data  1235  0.0  0.5  45232  2345 ?        S   10:00   0:00  \_ nginx: worker process
www-data  1236  0.0  0.5  45232  2345 ?        S   10:00   0:00  \_ nginx: worker process
```

### 查看指定用户的进程

```bash
$ ps -u mysql
```

### 查看进程的完整命令行

```bash
$ ps -ef | grep java
```

### 统计进程数量

```bash
# 统计所有进程
$ ps aux | wc -l

# 统计 nginx 进程数
$ ps aux | grep nginx | grep -v grep | wc -l
```

## 进程管理命令对比

| 命令 | 特点 | 适用场景 |
|------|------|----------|
| `ps` | 静态快照 | 一次性查询 |
| `top` | 实时动态 | 持续监控 |
| `htop` | 交互式增强 | 可视化操作 |
| `pstree` | 树形结构 | 查看父子关系 |

## 参考

- `man ps` — 查看完整帮助文档
- [top 命令](./top.md) — 实时进程监控
- [htop 命令](./htop.md) — 交互式进程管理