---
index: 5
---
# 进程管理

## 一、进程基础

### 进程状态

| 状态 | 符号 | 说明 |
|------|------|------|
| 运行中 | R | 正在运行或可运行 |
| 睡眠 | S | 可中断睡眠（等待事件）|
| 不可中断睡眠 | D | 不可中断睡眠（通常等待 I/O）|
| 停止 | T | 被停止（收到 SIGSTOP 等信号）|
| 僵尸 | Z | 进程已结束但未被父进程回收 |
| 空闲 | I | 内核空闲线程 |

### 进程 ID 类型

| ID | 说明 |
|----|------|
| PID | 进程 ID |
| PPID | 父进程 ID |
| PGID | 进程组 ID |
| SID | 会话 ID |
| TID | 线程 ID（多线程）|

---

## 二、`ps` — 查看进程信息

### 语法

```bash
ps [选项]
```

### 常用参数

| 参数 | 说明 |
|------|------|
| `-e` | 显示所有进程 |
| `-f` | 完整格式显示 |
| `-l` | 长格式显示 |
| `-u user` | 显示指定用户的进程 |
| `-p PID` | 显示指定 PID 的进程 |
| `-o` | 自定义输出格式 |
| `--sort` | 排序 |
| `-L` | 显示线程 |
| `-C cmd` | 显示指定命令名的进程 |
| `--forest` | 树形显示进程关系 |
| `-H` | 显示进程层次（树形）|
| `-t tty` | 显示指定终端的进程 |
| `aux` | BSD 风格：所有进程（最常用）|
| `axjf` | BSD 风格：树形显示 |

### 常见用法

```bash
# 标准语法
ps -ef                               # 查看所有进程（完整格式）
ps -eLf                              # 查看所有线程
ps -u root                           # 查看 root 的进程
ps -p 1234                           # 查看指定 PID
ps -C nginx                          # 查看 nginx 进程
ps -eo pid,ppid,cmd,%mem,%cpu        # 自定义输出列
ps -eo pid,comm,etime,args           # 显示进程已运行时间
ps -eo pid,pid,args --sort=-%mem     # 按内存使用降序

# BSD 语法
ps aux                               # 查看所有进程（最常用）
ps aux | grep nginx                  # 查找 nginx 进程
ps auxf                              # 树形显示
ps aux --sort=-%cpu                  # 按 CPU 使用率降序
ps aux --sort=-%mem                  # 按内存使用率降序
ps aux | awk '$3 > 50'               # CPU 使用率超过 50% 的进程
```

**`ps aux` 输出说明**：

```
USER       PID  %CPU  %MEM    VSZ    RSS  TTY    STAT  START   TIME  COMMAND
root         1   0.0   0.8  169492  13344  ?      Ss   06:30   0:02  /sbin/init
```

| 列 | 说明 |
|----|------|
| USER | 进程所有者 |
| PID | 进程 ID |
| %CPU | CPU 使用率 |
| %MEM | 内存使用率 |
| VSZ | 虚拟内存大小（KB）|
| RSS | 物理内存大小（KB）|
| TTY | 终端（? 表示无终端）|
| STAT | 进程状态 |
| START | 启动时间 |
| TIME | 累计 CPU 时间 |
| COMMAND | 命令及参数 |

---

## 三、`top` — 实时进程监控

### 基本用法

```bash
top                                # 启动 top
top -u username                    # 只显示指定用户的进程
top -p 1234,5678                   # 只监控指定 PID
top -n 1 -b                        # 一次性输出（批处理模式）
top -b -n 3 > top_output.txt       # 输出到文件
top -H                             # 显示线程
top -d 2                           # 刷新间隔为 2 秒（默认 3 秒）
```

### top 中的交互命令

| 按键 | 功能 |
|------|------|
| `1` | 切换显示每个 CPU 核心 |
| `P` | 按 CPU 使用率排序（默认）|
| `M` | 按内存使用率排序 |
| `T` | 按运行时间排序 |
| `N` | 按 PID 排序 |
| `k` | 杀死进程（输入 PID）|
| `r` | 调整进程优先级（renice）|
| `u` | 只显示指定用户 |
| `i` | 隐藏空闲进程 |
| `c` | 切换显示完整命令/命令名 |
| `H` | 切换线程模式 |
| `V` | 树形显示 |
| `W` | 保存当前配置 |
| `q` | 退出 |
| `h` | 帮助 |

### 输出说明

```
top - 10:30:00 up 3 days, 2:15, 3 users, load average: 0.15, 0.10, 0.05
Tasks: 120 total, 1 running, 119 sleeping, 0 stopped, 0 zombie
%Cpu(s): 2.5 us, 0.8 sy, 0.0 ni, 96.5 id, 0.2 wa, 0.0 hi, 0.0 si, 0.0 st
MiB Mem : 7856.3 total, 1234.5 free, 2345.6 used, 4276.2 buff/cache
MiB Swap: 2048.0 total, 2048.0 free, 0.0 used. 5123.4 avail Mem
```

| 区域 | 说明 |
|------|------|
| load average | 1/5/15 分钟平均负载 |
| us | 用户空间 CPU 时间 |
| sy | 系统内核 CPU 时间 |
| id | 空闲 CPU 时间 |
| wa | I/O 等待时间 |
| hi/si | 硬件/软件中断 |
| st | 被虚拟机偷走的时间 |

### `htop` — top 增强版（需安装）

```bash
htop                               # 启动 htop（彩色、鼠标操作）
htop -u username                   # 只显示指定用户
htop -p PID1,PID2                  # 只监控指定进程
```

---

## 四、`kill` — 发送信号终止进程

### 语法

```bash
kill [选项] PID...
kill -l                            # 列出所有信号
```

### 常用信号

| 信号 | 编号 | 含义 |
|------|------|------|
| SIGTERM | 15（默认）| 优雅终止（进程可以清理资源）|
| SIGKILL | 9 | 强制终止（无法被捕获或忽略）|
| SIGHUP | 1 | 挂起（通常用于重新加载配置）|
| SIGINT | 2 | 中断（同 Ctrl+C）|
| SIGQUIT | 3 | 退出并生成 core dump |
| SIGSTOP | 19 | 暂停进程（无法被捕获）|
| SIGCONT | 18 | 继续执行被暂停的进程 |
| SIGTSTP | 20 | 暂停（同 Ctrl+Z）|

### 示例

```bash
kill 1234                           # 发送 SIGTERM 终止进程 1234
kill -9 1234                        # 强制终止（SIGKILL）
kill -KILL 1234                     # 同上
kill -15 1234                       # 优雅终止（SIGTERM）
kill -1 1234                        # 重新加载配置（SIGHUP）
kill -HUP 1234                      # 同上
kill -l                             # 列出所有信号
kill -l 9                           # 显示 9 号信号名称（SIGKILL）
```

### `killall` — 按名称杀死进程

```bash
killall nginx                       # 杀死所有 nginx 进程
killall -9 nginx                    # 强制杀死所有 nginx
killall -u username                 # 杀死指定用户的所有进程
killall -I nginx                    # 忽略大小写
killall -i nginx                    # 交互式确认
killall -w nginx                    # 等待进程结束才返回
killall -r 'python.*'               # 正则匹配
```

### `pkill` — 按名称和其他属性杀死进程

```bash
pkill nginx                         # 杀死匹配的进程
pkill -9 -u username                # 强制杀死用户的所有进程
pkill -f "python script.py"         # 匹配完整命令行
pkill -x nginx                      # 精确匹配进程名
pkill -signal SIGUSR1 nginx         # 发送自定义信号
```

---

## 五、进程优先级

### `nice` — 以指定优先级启动进程

优先级范围：**-20（最高）到 19（最低）**，默认 0。

```bash
nice -n 10 ./long_task.sh           # 以低优先级运行（10）
nice -10 ./long_task.sh             # 同上
nice --10 ./long_task.sh            # 以高优先级运行（-10，需要 root）
nice -n -20 ./critical_task.sh      # 最高优先级（需要 root）
```

### `renice` — 修改正在运行进程的优先级

```bash
renice -n 10 -p 1234                # 降低进程 1234 的优先级
renice -n -5 -p 1234                # 提高优先级（需要 root）
renice -n 5 -u username             # 调整用户所有进程的优先级
renice -n 5 -g groupname            # 调整组所有进程的优先级
```

---

## 六、作业控制

### 前后台切换

```bash
# 启动后台任务
command &                            # 在后台运行命令
nohup command &                      # 后台运行，退出终端后继续

# 作业管理
jobs                                 # 查看当前后台任务列表
jobs -l                              # 显示 PID
jobs -r                              # 只显示正在运行的
jobs -s                              # 只显示暂停的

fg %1                                # 将后台任务 1 调到前台
bg %1                                # 将暂停的任务 1 在后台继续运行
kill %1                              # 终止后台任务 1

# 快捷键
# Ctrl+Z      暂停当前任务（放到后台暂停）
# Ctrl+C      终止当前任务
```

### `nohup` — 不受挂起影响的运行

```bash
nohup command &                      # 终端关闭后继续运行
nohup command > output.log 2>&1 &    # 记录输出到文件
nohup ./long_task.sh &               # 后台运行长时间任务
```

### `disown` — 从 Shell 作业表中移除

```bash
command &
disown                               # 移除当前 Shell 的最后一个后台任务
disown %1                            # 移除指定作业
disown -a                            # 移除所有后台任务
disown -h %1                         # 标记作业不接受 SIGHUP（不移除）
```

---

## 七、`systemd` 进程管理

### `systemctl` — 管理 systemd 服务

```bash
# 服务管理
sudo systemctl start nginx           # 启动服务
sudo systemctl stop nginx            # 停止服务
sudo systemctl restart nginx         # 重启服务
sudo systemctl reload nginx          # 重新加载配置（不中断服务）
sudo systemctl enable nginx          # 设置开机自启
sudo systemctl disable nginx         # 取消开机自启
sudo systemctl enable --now nginx    # 启用并立即启动

# 状态查看
systemctl status nginx               # 查看服务状态
systemctl status -l nginx            # 完整输出（不截断）
systemctl is-active nginx            # 检查是否运行中
systemctl is-enabled nginx           # 检查是否开机自启
systemctl is-failed nginx            # 检查是否失败

# 列出所有服务
systemctl list-units --type=service                 # 列出所有运行的服务
systemctl list-units --type=service --all           # 列出所有服务
systemctl list-units --type=service --state=running # 只列出运行中的服务
systemctl list-units --type=service --state=failed  # 只列出失败的服务

# 单元文件管理
systemctl cat nginx                  # 查看服务单元文件
systemctl edit nginx                 # 编辑服务单元文件覆盖
systemctl edit --full nginx          # 编辑完整服务单元文件
systemctl daemon-reload              # 重新加载单元文件
systemctl list-unit-files            # 列出所有单元文件及状态
```

### `journalctl` — 查看系统日志

```bash
journalctl                           # 查看所有日志
journalctl -u nginx                  # 查看 nginx 服务日志
journalctl -u nginx -f               # 实时跟踪 nginx 日志
journalctl -u nginx --since today    # 查看今天的日志
journalctl -u nginx --since "2026-07-14" --until "2026-07-15"
journalctl -k                        # 查看内核日志
journalctl -p err                    # 查看错误级别日志
journalctl -n 50                     # 查看最近 50 条日志
journalctl --vacuum-size=500M        # 清理日志到 500M
journalctl -o verbose                # 详细格式输出
```

---

## 八、`pgrep` 和 `pkill` — 按名称查找/杀死进程

```bash
pgrep nginx                          # 查找 nginx 进程的 PID
pgrep -u root sshd                   # 查找 root 用户下的 sshd
pgrep -l nginx                       # 显示 PID 和进程名
pgrep -x nginx                       # 精确匹配进程名
pgrep -f "python script.py"          # 匹配完整命令行
pgrep -c nginx                       # 统计匹配进程数
pgrep -d',' nginx                    # 指定输出分隔符
```

---

## 九、`pidof` — 查找进程 PID

```bash
pidof nginx                          # 查找 nginx 进程的 PID
pidof -s nginx                       # 只返回一个 PID
pidof -c nginx                       # 使用 root 目录检查
pidof -x script.sh                   # 查找脚本进程
pidof init                           # 查找 init 进程
```

---

## 十、`watch` — 定期执行命令

```bash
watch -n 1 'ps aux | grep nginx'     # 每秒查看 nginx 进程
watch -n 2 'free -h'                 # 每 2 秒查看内存
watch -d 'ps aux --sort=-%cpu'       # 高亮显示变化
watch -n 1 'netstat -an | grep 80'   # 监控端口连接
watch -t 'date'                      # 不显示标题
watch -g 'ls -l'                     # 输出变化时退出
```

---

## 十一、进程管理综合实战

```bash
# 1. 查找 CPU 使用率最高的 5 个进程
ps aux --sort=-%cpu | head -6

# 2. 查找内存使用率最高的 5 个进程
ps aux --sort=-%mem | head -6

# 3. 杀死所有匹配的进程
ps aux | grep "defunct" | awk '{print $2}' | xargs kill -9

# 4. 查看进程树
pstree -p
pstree -pu username

# 5. 查看进程打开的端口
lsof -i :80
lsof -i TCP:22
lsof -p 1234

# 6. 查看进程的详细信息
ls -la /proc/1234/                   # 查看进程的 /proc 文件系统
cat /proc/1234/status                # 进程状态
cat /proc/1234/environ | tr '\0' '\n' # 环境变量
cat /proc/1234/cmdline               # 命令行参数
cat /proc/1234/cwd                   # 当前工作目录的符号链接

# 7. 计算进程数量
ps aux | wc -l
ps aux --no-headers | wc -l

# 8. 按用户统计进程数
ps aux | awk '{print $1}' | sort | uniq -c | sort -rn
```