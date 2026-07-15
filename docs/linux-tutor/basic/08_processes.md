---
order: 8
---

# 进程管理

进程是正在执行的程序。Linux 可以同时运行大量进程，学会管理它们至关重要。

## 查看进程

### ps — 进程快照

```bash
ps                           # 当前终端下的进程
ps -ef                       # 所有进程（标准格式）
ps aux                       # 所有进程（BSD 格式）
ps -ef --sort=-%mem          # 按内存使用排序
ps -ef --sort=-%cpu          # 按 CPU 使用排序
ps -u username               # 查看指定用户的进程
ps -p PID                    # 查看指定 PID 的进程

# 常用输出列：
# PID    — 进程 ID
# PPID   — 父进程 ID
# %CPU   — CPU 使用率
# %MEM   — 内存使用率
# VSZ    — 虚拟内存大小
# RSS    — 物理内存大小
# COMMAND — 命令名
```

### top — 进程实时监控

```bash
top                          # 实时进程监控
```

进入 `top` 后常用交互命令：

| 按键 | 作用 |
|------|------|
| `P` | 按 CPU 使用率排序 |
| `M` | 按内存使用率排序 |
| `k` | 杀死进程（输入 PID） |
| `u` | 查看指定用户的进程 |
| `q` | 退出 |

更友好的替代：`htop`（需安装）

### pgrep — 通过名称查找进程

```bash
pgrep nginx                  # 查找 nginx 的 PID
pgrep -l nginx               # 显示 PID 和进程名
pgrep -u www-data            # 查找 www-data 用户的进程
```

## 终止进程

### kill

```bash
kill PID                     # 优雅终止（发送 TERM 信号）
kill -9 PID                  # 强制杀死（发送 KILL 信号）
kill -15 PID                 # 同 kill（SIGTERM）
kill -2 PID                  # 中断（相当于 Ctrl+C，SIGINT）
kill -1 PID                  # 重新加载配置（SIGHUP）
```

信号编号和含义：

| 信号 | 编号 | 含义 |
|------|------|------|
| SIGHUP | 1 | 挂起/重新加载 |
| SIGINT | 2 | 中断（Ctrl+C） |
| SIGTERM | 15 | 终止（默认，优雅） |
| SIGKILL | 9 | 强制杀死 |

### killall / pkill

```bash
killall nginx                # 杀死所有 nginx 进程
pkill -f "python server"     # 杀死匹配命令的进程
pkill -u username            # 杀死某用户的所有进程
```

## 前台与后台

```bash
# 后台运行（&）
long_running_command &

# 暂停当前任务
# Ctrl+Z

# 查看后台任务
jobs

# 将后台任务调到前台
fg %1

# 将前台任务放到后台
bg %1

# 脱离终端运行（即使关闭终端也不会停止）
nohup long_running_command &
# 或者使用
setsid long_running_command
```

## 进程优先级

```bash
# 查看进程优先级（NI 值越高优先级越低）
ps -eo pid,ni,cmd

# 以低优先级运行（nice 值 10）
nice -n 10 ./script.sh

# 修改运行中进程的优先级
renice -n 5 -p PID
```

## lsof — 查看打开的文件

在 Linux 中"一切皆文件"，`lsof` 可以查看进程打开了哪些文件：

```bash
lsof                              # 所有打开的文件
lsof -p PID                       # 指定进程打开的文件
lsof -i :80                       # 查看 80 端口的进程
lsof -u username                  # 某用户打开的文件
lsof /var/log/syslog              # 正在使用该文件的进程
```

## 实战场景

```bash
# 找到并杀死占用端口的进程
lsof -i :3000 | grep LISTEN
kill -9 PID

# 一行找到并杀死（谨慎使用）
kill -9 $(lsof -t -i :3000)

# 查看最耗内存的 5 个进程
ps aux --sort=-%mem | head -6

# 保持命令在后台运行，输出到日志
nohup python server.py > server.log 2>&1 &
```

## 本章小结

| 命令 | 作用 | 常用场景 |
|------|------|---------|
| `ps` | 进程快照 | 查看运行中的进程 |
| `top`/`htop` | 实时监控 | 排查性能问题 |
| `kill` | 终止进程 | 停止无响应的程序 |
| `jobs`/`fg`/`bg` | 任务控制 | 前后台切换 |
| `nohup` | 脱离终端运行 | 服务器后台服务 |
| `lsof` | 查看打开文件 | 排查端口占用 |

## 练习

1. 用 `ps aux` 查看所有进程，找到占用 CPU 最多的进程
2. 用 `top` 监控进程，按 `M` 按内存排序
3. 启动一个 `sleep 300` 命令，放到后台，用 `jobs` 查看，再调回前台
4. 用 `nohup` 运行一个长任务，关闭终端重新打开，检查它是否还在运行
5. 用 `lsof -i` 查看本机哪些端口在监听
