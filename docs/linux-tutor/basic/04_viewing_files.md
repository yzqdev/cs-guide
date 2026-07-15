---
order: 4
---

# 查看文件内容

## cat — 连接并显示

```bash
cat file.txt                   # 显示整个文件
cat -n file.txt                # 显示行号
cat file1 file2 > combined     # 合并多个文件
tac file.txt                   # 反向显示（最后一行先显示）
```

## less — 分页查看（推荐）

`less` 是查看大文件的最佳工具，因为它不会一次加载全部内容：

```bash
less longfile.log
```

在 `less` 中的常用操作：

| 按键 | 作用 |
|------|------|
| `↑`/`↓` 或 `j`/`k` | 上下滚动一行 |
| `空格` / `b` | 下一页 / 上一页 |
| `g` / `G` | 跳到开头 / 末尾 |
| `/keyword` | 搜索关键字 |
| `n` / `N` | 下一个/上一个匹配 |
| `q` | 退出 |

## head / tail — 查看头尾

```bash
head file.txt                  # 显示前10行
head -n 20 file.txt            # 显示前20行
head -n -5 file.txt            # 显示除最后5行外的所有行

tail file.txt                  # 显示后10行
tail -n 20 file.txt            # 显示后20行
tail -f app.log                # 实时追踪文件增长（查看日志最常用）
tail -F app.log                # 类似 -f，但文件被重命名后自动重新打开
```

`tail -f` 是调试时最常用的命令之一，可以实时查看日志输出。

## wc — 计数

```bash
wc file.txt                    # 输出：行数 单词数 字符数 文件名
wc -l file.txt                 # 只统计行数
wc -w file.txt                 # 只统计单词数
wc -c file.txt                 # 只统计字节数
```

## od — 查看二进制文件

```bash
od -c binary.dat               # 以字符形式显示
od -x binary.dat               # 以十六进制显示
```

## diff — 比较文件差异

```bash
diff file1 file2               # 显示两个文件的差异
diff -u file1 file2            # unified 格式（更易读）
diff -r dir1 dir2              # 比较两个目录
```

## 实战：日志查看场景

```bash
# 查看最新的 50 行日志
tail -n 50 /var/log/syslog

# 实时追踪日志
tail -f /var/log/nginx/access.log

# 搜索日志中的错误，并查看上下文
grep -n "ERROR" app.log | head -20

# 分页查看大文件
less /var/log/kern.log
```

## 本章小结

| 命令 | 用途 | 典型场景 |
|------|------|---------|
| `cat` | 显示小文件 | 合并文件，快速查看 |
| `less` | 分页查看 | 阅读大文件、搜索 |
| `head` | 查看开头 | 查看配置文件的前几行 |
| `tail` | 查看结尾 | 实时监控日志 |
| `wc` | 统计 | 统计代码行数 |
| `diff` | 比较差异 | 代码审查、配置对比 |

## 练习

1. 用 `cat -n` 显示 `/etc/passwd` 文件
2. 用 `wc -l` 统计 `/etc/passwd` 有多少行（对应多少用户）
3. 用 `less` 查看 `/etc/ssh/sshd_config`，搜索 "Port"
4. 用 `tail -f` 查看系统日志（可能需要 sudo），观察实时输出
5. 用 `head -n 5` 和 `tail -n 5` 查看同一个文件的开头和结尾
