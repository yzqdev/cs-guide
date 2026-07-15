---
index: 1
---
# Shell 基础概念与基本操作

## 一、什么是 Shell

Shell 是 Linux/Unix 系统的**命令解释器**，它充当用户与操作系统内核之间的桥梁。用户在 Shell 中输入命令，Shell 解释并执行这些命令。

```
用户 ──► Shell ──► 内核 ──► 硬件
```

### Shell 的主要作用

- **命令解释**：将用户输入的命令翻译给操作系统
- **编程环境**：支持变量、条件、循环等编程结构
- **任务控制**：管理前台和后台任务的执行
- **环境配置**：配置用户的工作环境

---

## 二、Shell 的类型

Linux 中有多种 Shell，可以通过以下命令查看系统支持的 Shell：

```bash
cat /etc/shells
```

常见的 Shell 类型：

| Shell | 路径 | 特点 |
|-------|------|------|
| **Bash (Bourne Again Shell)** | `/bin/bash` | 最常用，功能强大，Linux 默认 |
| **Zsh (Z Shell)** | `/bin/zsh` | 功能更丰富，支持插件（Oh My Zsh）|
| **Sh (Bourne Shell)** | `/bin/sh` | 最早的 Shell，兼容性好 |
| **Dash** | `/bin/dash` | 轻量级，Ubuntu 的 /bin/sh |
| **Fish** | `/usr/bin/fish` | 语法高亮，自动建议 |
| **Ksh (Korn Shell)** | `/bin/ksh` | 兼容 Bourne Shell，增加了很多特性 |
| **Tcsh/Csh** | `/bin/tcsh` | C 语言风格的 Shell |

查看当前使用的 Shell：

```bash
echo $SHELL      # 查看当前 Shell 路径
echo $0          # 查看当前 Shell 名称
```

---

## 三、第一个 Shell 命令

### 基本格式

```bash
命令名 [选项] [参数]
```

- **命令名**：要执行的命令（如 `ls`, `cd`, `echo`）
- **选项**：修改命令的行为，通常以 `-` 开头（如 `-l`, `-a`）
- **参数**：命令操作的对象（如文件名、路径）

### 示例

```bash
ls -la /home         # 命令  选项    参数
echo "Hello World"   # 命令  参数
```

---

## 四、获取帮助

### 1. `man` — 查看命令手册（最常用）

```bash
man ls        # 查看 ls 命令的完整手册
man man       # 查看 man 命令的手册
```

**常用操作**：

| 按键 | 功能 |
|------|------|
| `空格` | 下一页 |
| `b` | 上一页 |
| `/关键字` | 搜索关键字 |
| `n` | 下一个搜索结果 |
| `q` | 退出 |

### 2. `help` — 查看 Shell 内置命令帮助

```bash
help cd       # 查看 cd 命令的帮助
help          # 列出所有内置命令
```

### 3. `--help` — 命令的简要帮助

```bash
ls --help           # ls 的简要帮助
grep --help         # grep 的简要帮助
```

### 4. `info` — 更详细的文档

```bash
info ls       # 更详细的文档（GNU 项目）
```

### 5. `whatis` — 命令的简短描述

```bash
whatis ls     # 输出: ls (1) - list directory contents
whatis grep   # 输出: grep (1) - print lines matching a pattern
```

### 6. `which` — 查找命令的路径

```bash
which ls      # 输出: /usr/bin/ls
which python3 # 找到 python3 的位置
```

### 7. `type` — 判断命令类型（内置命令还是外部命令）

```bash
type ls       # 输出: ls is /usr/bin/ls
type cd       # 输出: cd is a shell builtin（内置命令）
type -a ls    # 显示所有匹配（别名、内置、外部）
```

---

## 五、历史命令

### `history` — 查看命令历史

```bash
history                # 显示所有历史命令
history 10             # 显示最近 10 条命令
!5                     # 执行第 5 条历史命令
!!                     # 执行上一条命令
!grep                  # 执行最近一条以 grep 开头的命令
```

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| `↑` / `↓` | 上下翻历史命令 |
| `Ctrl + r` | 反向搜索历史命令（输入关键字搜索）|
| `Ctrl + p` | 上一条命令（同 ↑）|
| `Ctrl + n` | 下一条命令（同 ↓）|

---

## 六、命令行常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + a` | 光标移到行首 |
| `Ctrl + e` | 光标移到行尾 |
| `Ctrl + u` | 删除光标到行首的内容 |
| `Ctrl + k` | 删除光标到行尾的内容 |
| `Ctrl + w` | 删除光标前的一个单词 |
| `Ctrl + l` | 清屏（同 `clear` 命令）|
| `Ctrl + c` | 终止当前命令 |
| `Ctrl + d` | 退出当前 Shell / 结束输入 |
| `Ctrl + z` | 挂起当前命令（放到后台暂停）|
| `Tab` | 自动补全命令或文件名 |
| `Tab Tab` | 显示所有可能的补全 |

---

## 七、Shell 的启动文件

不同 Shell 在启动时会加载不同的配置文件：

### Bash 配置文件

| 文件 | 作用 |
|------|------|
| `~/.bashrc` | 每次打开终端时执行（交互式非登录 Shell）|
| `~/.bash_profile` | 登录时执行（登录 Shell）|
| `~/.bash_logout` | 退出登录 Shell 时执行 |
| `/etc/bash.bashrc` | 全局 bashrc（所有用户）|
| `/etc/profile` | 全局 profile（所有用户）|

### 使配置生效

```bash
source ~/.bashrc   # 重新加载配置
. ~/.bashrc        # 同上（. 是 source 的简写）
```

---

## 八、Shell 通配符（Globbing）

通配符用于匹配文件名和路径：

| 通配符 | 含义 | 示例 |
|--------|------|------|
| `*` | 匹配任意长度的任意字符 | `*.txt` 匹配所有 .txt 文件 |
| `?` | 匹配单个任意字符 | `file?.txt` 匹配 file1.txt, fileA.txt |
| `[abc]` | 匹配方括号内的任意一个字符 | `file[12].txt` 匹配 file1.txt, file2.txt |
| `[a-z]` | 匹配范围内的任意一个字符 | `file[a-z].txt` 匹配 filea.txt ~ filez.txt |
| `[!abc]` | 匹配不在方括号内的字符 | `file[!0-9].txt` 匹配非数字的文件 |
| `{a,b,c}` | 花括号展开 | `file{1,2,3}.txt` 展开为 file1.txt file2.txt file3.txt |
| `{1..5}` | 序列展开 | `file{1..5}.txt` 展开为 file1.txt ~ file5.txt |
| `~` | 当前用户的家目录 | `cd ~/Documents` |
| `~user` | 指定用户的家目录 | `cd ~john` |

### 通配符示例

```bash
ls *.txt              # 列出所有 txt 文件
ls file?.log          # 列出 file1.log, file2.log 等
ls [abc]*             # 列出以 a, b, c 开头的文件
ls [0-9][0-9]*        # 列出以两位数字开头的文件
echo {A,B,C}-{1,2}    # 输出: A-1 A-2 B-1 B-2 C-1 C-2
echo {1..10}          # 输出: 1 2 3 4 5 6 7 8 9 10
echo {a..z}           # 输出 a 到 z
```

---

## 九、别名（Alias）

为长命令创建简短别名：

```bash
alias ll='ls -la'              # 创建别名
alias gs='git status'
alias ..='cd ..'
alias ...='cd ../..'
alias cls='clear'

alias                         # 查看所有别名
unalias ll                    # 删除别名
unalias -a                    # 删除所有别名
```

将别名写入 `~/.bashrc` 可永久生效。

---

## 十、环境变量

### 常用环境变量

```bash
echo $PATH        # 命令搜索路径
echo $HOME        # 当前用户的家目录
echo $USER        # 当前用户名
echo $SHELL       # 当前 Shell 路径
echo $PWD         # 当前工作目录
echo $OLDPWD      # 上一个工作目录
echo $LANG        # 系统语言
echo $HOSTNAME    # 主机名
```

### 设置环境变量

```bash
# 临时设置（仅当前 Shell 生效）
export MY_VAR="hello"
MY_VAR="hello"; export MY_VAR    # 同上

# 在 PATH 中添加路径
export PATH=$PATH:/my/custom/path
export PATH=/my/custom/path:$PATH  # 添加在前面，优先搜索
```

### 变量持久化

将 `export` 语句写入配置文件：

```bash
echo 'export MY_VAR="hello"' >> ~/.bashrc
echo 'export PATH=$PATH:/my/custom/path' >> ~/.bashrc
source ~/.bashrc
```

---

## 十一、基本命令速查

| 命令 | 功能 |
|------|------|
| `echo` | 输出文本 |
| `clear` / `Ctrl+l` | 清屏 |
| `exit` | 退出当前 Shell |
| `logout` | 注销登录 |
| `date` | 显示/设置日期时间 |
| `cal` | 显示日历 |
| `bc` | 计算器 |
| `expr` | 表达式计算 |
| `seq` | 生成数字序列 |
| `yes` | 重复输出字符串 |
| `sleep` | 延迟指定时间 |
| `reset` | 重置终端（终端乱码时用）|

### 示例

```bash
echo "Hello World"           # 输出 Hello World
echo $HOME                   # 输出变量值
echo -e "a\nb\nc"            # 启用转义（\n 换行）
echo -n "no newline"         # 不换行

date                         # 当前时间：Tue Jul 14 10:30:00 CST 2026
date +"%Y-%m-%d %H:%M:%S"   # 自定义格式：2026-07-14 10:30:00
date -d "next day"           # 明天的日期
date -d "1 week ago"         # 一周前的日期

cal                          # 当前月份日历
cal 2026                     # 2026 年全年日历
cal 7 2026                   # 2026 年 7 月

seq 1 5                      # 输出 1 2 3 4 5
seq 1 2 10                   # 从 1 到 10，步长为 2：1 3 5 7 9
seq -s ',' 1 5               # 用逗号分隔：1,2,3,4,5

sleep 5                      # 暂停 5 秒
```