# strace — 系统调用跟踪

`strace` 用于跟踪进程执行时产生的系统调用及其接收的信号。在 Linux 系统中，用户态进程通过系统调用访问内核功能（如文件读写、网络通信、进程创建等）。`strace` 能够捕获这些系统调用及其参数、返回值和执行时间，是诊断程序行为异常和性能瓶颈的重要工具。

## 命令格式

```bash
strace [选项] 命令
strace [选项] -p PID
```

## 常用参数

| 参数 | 说明 |
|------|------|
| `-p PID` | 跟踪指定 PID 的进程 |
| `-c` | 统计每个系统调用的时间、次数和错误 |
| `-e 表达式` | 过滤要跟踪的系统调用 |
| `-o 文件` | 将输出写入文件 |
| `-t` | 显示时间戳 |
| `-tt` | 显示微秒级时间戳 |
| `-T` | 显示每个系统调用的耗时 |
| `-f` | 跟踪子进程（fork 产生的进程）|
| `-F` | 跟踪 vfork 产生的子进程 |
| `-s 大小` | 设置输出字符串的最大长度 |

## 使用示例

### 跟踪程序启动

```bash
$ strace ls -l
```

### 跟踪正在运行的进程

```bash
$ strace -p 1234
```

### 将所有系统调用输出到文件

```bash
$ strace -o output.txt -p 28979
```

### 仅跟踪特定系统调用

```bash
# 仅跟踪文件打开和读写操作
$ strace -e trace=open,read,write -p 1234

# 仅跟踪网络相关调用
$ strace -e trace=network -p 1234

# 仅跟踪进程相关调用
$ strace -e trace=process -p 1234
```

### 统计系统调用耗时

```bash
# 显示每个系统调用的详细耗时
$ strace -T -p 1234

# 统计系统调用汇总
$ strace -c -p 1234
% time     seconds  usecs/call     calls    errors syscall
------ ----------- ----------- --------- --------- ----------------
 45.23    0.023456        12.5      1876           read
 32.15    0.016743         8.9      1876           write
 12.56    0.006543         4.5      1452           open
  6.23    0.003215         2.1      1523           close
  3.83    0.001987         1.3      1523           stat
```

### 跟踪指定系统调用

```bash
# 跟踪所有文件操作
$ strace -e trace=file ls -l

# 跟踪所有网络操作
$ strace -e trace=network curl http://example.com
```

## 实用场景

### 排查程序启动失败

```bash
$ strace -o /tmp/strace.log ./myapp
$ grep "ENOENT\|EACCES" /tmp/strace.log
```

### 分析程序慢的原因

```bash
$ strace -T -p 1234
# 关注耗时较长的系统调用
```

### 查看程序正在做什么

```bash
# 实时输出系统调用
$ strace -p 1234
```

## 参考

- `man strace` — 查看完整帮助文档
- `pstack` — 进程栈跟踪
- `gdb` — 程序调试器