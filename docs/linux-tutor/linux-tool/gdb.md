# gdb — 程序调试器

GDB（GNU Debugger）是 GNU 项目发布的、运行于 UNIX/Linux 系统的命令行程序调试工具。它为 C/C++ 程序的运行时调试提供了断点设置、单步执行、变量查看、堆栈跟踪等核心功能。

## 启动方式

使用 GDB 调试程序前，需要在编译时添加 `-g` 选项以生成调试信息：

```bash
g++ -g hello.cpp -o hello
```

### 调试可执行文件

```bash
gdb <program>
```

### 调试 core dump 文件

```bash
gdb <program> <core dump file>
gdb hello core.11127
```

### 调试正在运行的进程

```bash
gdb <program> <PID>
gdb hello 11127
```

## 交互命令

### 运行控制

| 命令 | 缩写 | 说明 |
|------|------|------|
| `run` | `r` | 运行程序，遇到断点后暂停 |
| `continue` | `c` | 继续执行，直到下一个断点 |
| `next` | `n` | 单步执行，不进入函数调用 |
| `step` | `s` | 单步执行，进入函数调用 |
| `until` | - | 运行到退出循环体 |
| `finish` | - | 运行到当前函数返回 |
| `call 函数(参数)` | - | 调用程序中可见的函数 |
| `quit` | `q` | 退出 GDB |

### 断点设置

| 命令 | 说明 |
|------|------|
| `break n` | `b n` | 在第 n 行设置断点 |
| `break 文件名:行号` | 在指定文件的行设置断点 |
| `break 函数名` | 在函数入口处设置断点 |
| `break 行号 if 条件` | 设置条件断点 |
| `info breakpoints` | 显示所有断点 |
| `delete n` | 删除第 n 个断点 |
| `disable n` | 暂停第 n 个断点 |
| `enable n` | 恢复第 n 个断点 |
| `clear 行号` | 清除指定行的断点 |

### 查看源代码

```bash
list          # 列出源代码，默认 10 行
list 12       # 显示以第 12 行为中心的代码
list main     # 显示 main 函数的源代码
list 50, 100  # 显示第 50 到 100 行
```

### 变量查看

```bash
print a           # 显示变量 a 的值
print ++a         # 将 a 加 1 并显示
print name        # 显示字符串 name 的值
display a         # 每次单步后自动显示 a 的值
watch a           # 监视变量 a，值改变时暂停
whatis a          # 查询变量 a 的类型
info locals       # 显示当前栈帧的所有局部变量
```

### 堆栈查看

```bash
where       # 显示当前运行的堆栈列表
bt          # backtrace 显示当前调用堆栈
up          # 向上移动堆栈帧
down        # 向下移动堆栈帧
info args   # 显示当前函数的参数
```

### 分割窗口

```bash
layout src     # 显示源代码窗口
layout asm     # 显示反汇编窗口
layout regs    # 显示寄存器窗口
layout split   # 同时显示源代码和反汇编
Ctrl + L       # 刷新窗口
```

## 使用示例

### 调试段错误（Segmentation Fault）

```bash
# 编译程序
g++ -g -o test test.cpp

# 运行产生 core dump
ulimit -c unlimited
./test            # 产生 Segmentation Fault (core dumped)

# 使用 GDB 定位
gdb test core
(gdb) bt          # 查看调用堆栈
(gdb) info locals # 查看局部变量
(gdb) list        # 查看源代码
```

### 调试正在运行的服务

```bash
# 查找进程 PID
ps -ef | grep myapp

# 附加到进程
gdb myapp 1234

# 设置断点并继续运行
(gdb) break handle_request
(gdb) continue
```

### 条件断点调试

```bash
(gdb) break main.c:128 if counter > 100
(gdb) run
(gdb) print counter
(gdb) continue
```

## 进阶工具

### cgdb

cgdb 是 GDB 的界面增强版本，在调试时能够同步显示源代码，界面类似 Vim：

```bash
sudo apt install cgdb
cgdb ./program
```

## 参考

- [GDB 官方文档](https://www.gnu.org/software/gdb/documentation/)
- [GDB 调试教程](https://sourceware.org/gdb/current/onlinedocs/gdb/)