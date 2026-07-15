# lsof — 列出打开的文件

`lsof`（List Open Files）是一个用于查看当前系统已打开文件的工具。在 Linux 系统中，一切皆文件——包括普通文件、目录、网络套接字、设备文件、管道等。`lsof` 能够列出系统中所有打开的文件及其关联的进程信息，对于系统管理和故障排查非常有价值。

## 命令格式

```bash
lsof [选项]
```

## 常用参数

| 参数 | 说明 |
|------|------|
| `-i` | 显示网络连接 |
| `-i:端口` | 显示指定端口的连接 |
| `-i TCP` | 显示 TCP 连接 |
| `-i UDP` | 显示 UDP 连接 |
| `-u 用户` | 显示指定用户打开的文件 |
| `-p PID` | 显示指定进程打开的文件 |
| `-c 命令名` | 显示指定命令打开的文件 |
| `+D 目录` | 递归显示目录中所有打开的文件 |
| `-t` | 仅输出 PID（用于脚本处理）|
| `-n` | 不解析主机名 |
| `-P` | 不解析端口名 |

## 使用示例

### 查看所有打开的文件

```bash
$ lsof | head -10
```

### 查看某个文件被哪个进程使用

```bash
$ lsof /var/log/syslog
COMMAND   PID   USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME
rsyslogd 1234  root   6w   REG    8,1    12345 456789 /var/log/syslog
```

### 查看某个进程打开的文件

```bash
$ lsof -p 1234
```

### 查看某个端口的网络连接

```bash
# 查看 80 端口的连接
$ lsof -i :80

# 查看所有 TCP 22 端口的连接
$ lsof -i TCP:22
```

### 查看某个用户的进程

```bash
$ lsof -u mysql
```

### 查看某个命令的进程

```bash
$ lsof -c nginx
```

### 查看所有网络连接

```bash
$ lsof -i
```

### 查看 TCP 连接

```bash
$ lsof -i TCP
```

### 查看监听端口

```bash
$ lsof -i TCP -s TCP:LISTEN
```

### 递归查看目录中打开的文件

```bash
$ lsof +D /var/log
```

### 杀死占用某个端口的进程

```bash
# 找到占用 8080 端口的进程并杀死
$ kill -9 $(lsof -t -i :8080)
```

## 输出说明

```bash
$ lsof -i :80
COMMAND   PID   USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
nginx    1234   root    6u  IPv4  12345      0t0  TCP  *:80 (LISTEN)
nginx    1235   www    6u  IPv4  12345      0t0  TCP  *:80 (LISTEN)
```

| 列 | 说明 |
|----|------|
| `COMMAND` | 命令名 |
| `PID` | 进程 ID |
| `USER` | 进程所有者 |
| `FD` | 文件描述符 |
| `TYPE` | 文件类型 |
| `DEVICE` | 设备号 |
| `SIZE/OFF` | 文件大小或偏移量 |
| `NODE` | inode 号 |
| `NAME` | 文件名或连接信息 |

## 实用技巧

### 查看 MySQL 占用的端口

```bash
$ lsof -i -P -n | grep mysql
```

### 查看进程是否在监听端口

```bash
$ lsof -i -P -n | grep LISTEN
```

### 查看 UDP 端口使用情况

```bash
$ lsof -i UDP
```

## 参考

- `man lsof` — 查看完整帮助文档
- `ss` — 网络套接字统计
- `netstat` — 网络连接状态