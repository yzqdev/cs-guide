---
order: 5
---

# 管道与重定向

管道和重定向是 Linux 最核心的哲学之一：**让每个程序做好一件事，然后将它们组合起来**。

## 标准流

每个 Linux 进程都有三个标准流：

| 名称 | 文件描述符 | 默认连接 |
|------|-----------|---------|
| 标准输入 (stdin) | 0 | 键盘 |
| 标准输出 (stdout) | 1 | 屏幕 |
| 标准错误 (stderr) | 2 | 屏幕 |

## 重定向输出

```bash
# > 将 stdout 写入文件（覆盖）
echo "hello" > file.txt
ls > filelist.txt

# >> 将 stdout 追加到文件
echo "world" >> file.txt

# 2> 将 stderr 重定向
ls nonexistent 2> error.log

# &> 同时重定向 stdout 和 stderr
ls somefile &> output.log

# 将 stderr 合并到 stdout
command 2>&1
command > output.log 2>&1    # 标准做法：全部写入文件
command &> output.log        # 简写（同上）
```

## 重定向输入

```bash
# < 从文件读取输入
sort < unsorted.txt

# << EOF 创建内联输入（Here Document）
cat << EOF
第一行
第二行
EOF
```

## 管道 — `|`

管道将一个命令的标准输出连接到另一个命令的标准输入。这是 Linux 最强大的特性：

```bash
# 基本用法
ls -l | less                   # 列表过长时分页查看
history | grep "git"           # 在历史命令中搜索
ps aux | grep nginx            # 查找 nginx 进程
```

### 实战组合

```bash
# 统计某个目录下有多少个文件
ls -l /etc | wc -l

# 找出最大的 5 个文件
du -sh * | sort -rh | head -5

# 查看最耗 CPU 的进程
ps aux --sort=-%cpu | head -5

# 查看系统开放了哪些端口
netstat -tlnp | awk '{print $4}' | grep -E "0.0.0.0:"

# 统计日志中各种错误类型的数量
grep "ERROR" app.log | cut -d' ' -f3 | sort | uniq -c | sort -rn
```

## tee — 双向输出

`tee` 将输出同时写入文件和屏幕：

```bash
echo "config change" | tee -a log.txt
# 屏幕显示 "config change"，同时追加到 log.txt

ls -l | tee listing.txt | less
# 将 ls 输出写入 listing.txt，同时通过管道传给 less
```

## xargs — 构建参数并执行

`xargs` 将标准输入转换为命令参数：

```bash
# 将文件列表作为参数传给 rm
find . -name "*.tmp" | xargs rm

# 指定每行多少参数
echo "a b c d e f" | xargs -n 3
# 输出: a b c
#       d e f

# 交互式确认执行
find . -name "*.log" | xargs -p rm

# 处理文件名含空格的情况
find . -name "*.txt" -print0 | xargs -0 rm

# 替换字符串模式
ls *.txt | xargs -I {} cp {} /backup/{}.bak
```

## 本章小结

```bash
# 核心模式：命令 | 命令 | 命令
command1 | command2 | command3
```

| 符号 | 作用 |
|------|------|
| `>` | 覆盖写入文件 |
| `>>` | 追加到文件 |
| `2>` | 重定向错误输出 |
| `&>` | 重定向所有输出 |
| `<` | 从文件读取输入 |
| `\|` | 管道连接 |
| `tee` | 双向输出 |
| `xargs` | 输入转参数 |

## Unix 哲学

> 每个程序只做好一件事。程序的输出应该是另一个程序的输入。

管道正是这一哲学的体现：将小工具组合成强大的处理链。

## 练习

1. 用 `ls`、`grep` 和 `wc` 组合起来：统计 `/etc` 下有多少 `.conf` 文件
2. 用 `sort` 和 `uniq`：创建一个包含重复内容的文件，统计每行出现次数
3. 用 `|` 链：`ps aux | sort -nk 4 | tail -5` 看看是什么意思
4. 练习 `xargs -I`：找到所有 `.txt` 文件并在每个文件前加上 `backup_` 前缀
5. 用 `tee` 在执行命令的同时保留输出到文件
