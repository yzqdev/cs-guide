---
order: 1
---

# 环境准备与基本概念

## 什么是 Linux

Linux 是一个开源的操作系统内核，广泛用于服务器、嵌入式设备和开发环境。不同于 Windows，Linux 强调命令行操作，几乎所有操作都可以通过终端完成。

## 获取 Linux 环境

学习 Linux 首先需要一个 Linux 终端。推荐以下方式：

| 方式 | 适合场景 | 获取方法 |
|------|---------|---------|
| WSL2 | Windows 用户 | `wsl --install` 安装 Ubuntu |
| 虚拟机 | 桌面学习 | VirtualBox + Ubuntu ISO |
| 云服务器 | 生产环境 | 阿里云/腾讯云/AWS 购买 |
| Docker | 快速体验 | `docker run -it ubuntu bash` |

**推荐初学者使用 WSL2 或虚拟机。**

## 打开终端

终端（Terminal）是你与 Linux 交互的窗口。打开后你会看到类似这样的提示符：

```
user@hostname:~$
```

各部分含义：
- `user` — 当前用户名
- `hostname` — 主机名
- `~` — 当前目录（`~` 表示 home 目录）
- `$` — 普通用户提示符（`#` 表示 root 用户）

## 第一个命令

```bash
echo "Hello Linux"
# 输出: Hello Linux
```

`echo` 是输出文本的命令，非常简单但很常用。

```bash
whoami
# 输出当前用户名

date
# 输出当前日期和时间

uname -a
# 输出完整的系统信息
```

## 命令的基本结构

Linux 命令通常遵循这种格式：

```
命令名  [选项]  [参数]
```

例如：

```bash
ls -l /home
```

- `ls` — 命令名，列出目录内容
- `-l` — 选项，以长格式显示
- `/home` — 参数，指定要列出的目录

选项通常以 `-` 开头（短选项，如 `-l`），也支持 `--` 开头的长选项（如 `--all`）：

```bash
ls --all /home
```

## 获取帮助

学会看帮助是 Linux 最重要的技能之一：

```bash
# 查看命令的简要说明
whatis ls

# 查看命令的详细手册
man ls

# 快速查看选项
ls --help
```

在 `man` 页面中：
- `↑`/`↓` 滚动
- `/关键字` 搜索
- `q` 退出

## 本章小结

- Linux 以命令行操作为核心
- 通过 WSL2 或虚拟机可轻松获得 Linux 环境
- 命令格式：`命令 [选项] [参数]`
- `man` 命令是你最好的老师

## 练习

1. 打开终端，执行 `whoami` 和 `date`
2. 用 `man ls` 查看 `ls` 的手册，找到 `-a` 选项的作用
3. 执行 `echo "Hello from $USER"` 看看输出什么
