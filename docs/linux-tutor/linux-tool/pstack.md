# pstack — 进程栈跟踪

`pstack` 是一个用于显示进程当前调用堆栈的命令行工具。它能够列出进程中所有线程的堆栈跟踪信息，是分析进程卡死、死锁、性能问题的重要工具。`pstack` 的核心实现基于 GDB 的 `thread apply all bt` 命令。

## 命令格式

```bash
pstack <PID>
```

## 使用示例

### 查看进程的调用堆栈

```bash
$ pstack 4551
Thread 7 (Thread 1084229984 (LWP 4552)):
#0  0x000000302afc63dc in epoll_wait () from /lib64/tls/libc.so.6
#1  0x00000000006f0730 in ub::EPollEx::poll ()
#2  0x00000000006f172a in ub::NetReactor::callback ()
#3  0x00000000006fbbbb in ub::UBTask::CALLBACK ()
#4  0x000000302b80610a in start_thread () from /lib64/tls/libpthread.so.0
#5  0x000000302afc6003 in clone () from /lib64/tls/libc.so.6
```

### 分析进程卡死

当进程出现卡死时，可以多次执行 `pstack` 观察堆栈是否发生改变：

```bash
# 收集 3 次堆栈信息，间隔 5 秒
$ for i in 1 2 3; do pstack 4551 >> stack_$i.log; sleep 5; done

# 对比堆栈信息
$ diff stack_1.log stack_2.log
```

如果多次输出的堆栈始终停留在同一位置，说明该处可能存在死循环或死锁。

## 参考

- `man pstack` — 查看完整帮助文档
- `strace` — 系统调用跟踪
- `gdb` — 程序调试器