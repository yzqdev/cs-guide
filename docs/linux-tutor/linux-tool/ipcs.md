# ipcs — 进程间通信状态查询

`ipcs` 用于显示系统中进程间通信（IPC）设施的状态信息，包括消息队列、共享内存和信号量三种 IPC 机制。该工具对于排查进程间通信问题、分析共享内存使用情况非常有用。

## 命令格式

```bash
ipcs [选项]
```

## 常用参数

| 参数 | 说明 |
|------|------|
| `-a` | 显示所有 IPC 设施（默认） |
| `-q` | 仅显示消息队列 |
| `-m` | 仅显示共享内存 |
| `-s` | 仅显示信号量 |
| `-i ID` | 显示指定 ID 的详细信息 |
| `-l` | 显示系统限制 |
| `-u` | 显示使用情况统计 |
| `-p` | 显示 PID 信息 |
| `-t` | 显示时间信息 |

## 使用示例

### 查看所有 IPC 设施

```bash
$ ipcs -a

------ Message Queues --------
key        msqid      owner      perms      used-bytes   messages

------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status
0x00000000 123456     root       600        1024       2          dest

------ Semaphore Arrays --------
key        semid      owner      perms      nsems
0x00000000 654321     root       600        1
```

### 查看共享内存详细信息

```bash
$ ipcs -m -i 123456
Shared memory Segment shmid=123456
uid=0    gid=0    cuid=0    cgid=0
mode=0600    access_perms=0600
bytes=1024    lpid=1234    cpid=5678    nattch=2
att_time=Tue Jul 15 10:00:00 2026
det_time=Tue Jul 15 10:00:00 2026
change_time=Tue Jul 15 10:00:00 2026
```

### 查看系统 IPC 限制

```bash
$ ipcs -l

------ Messages Limits --------
max queues system wide = 3744
max size of message (bytes) = 8192
default max size of queue (bytes) = 16384

------ Shared Memory Limits --------
max number of segments = 4096
max seg size (kbytes) = 18014398509465599
max total shared memory (pages) = 18014398509481983

------ Semaphore Limits --------
max number of arrays = 128
max semaphores per array = 250
max semaphores system wide = 32000
```

### 查看 IPC 使用情况

```bash
$ ipcs -u
```

### 删除 IPC 设施

```bash
# 删除共享内存
$ ipcrm -m 123456

# 删除消息队列
$ ipcrm -q 123456

# 删除信号量
$ ipcrm -s 123456

# 删除所有者和权限匹配的 IPC 设施
$ ipcrm -a
```

## 实用场景

### 清理残留的共享内存

当程序异常退出时，共享内存可能未被正确释放，导致内存泄漏：

```bash
# 查看所有共享内存
$ ipcs -m

# 删除无用的共享内存
$ ipcrm -m <shmid>
```

### 查看进程使用的共享内存

```bash
$ ipcs -m -p
```

## 参考

- `man ipcs` — 查看完整帮助文档
- `ipcrm` — 删除 IPC 设施
- `ipcmk` — 创建 IPC 设施