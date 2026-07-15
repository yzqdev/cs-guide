---
order: 2
---

# 文件系统导航

## Linux 文件系统结构

Linux 的文件系统是一个树形结构，从根目录 `/` 开始。不像 Windows 有 C:、D:，Linux 下所有设备都挂载在 `/` 下。

```
/               ← 根目录
├── home/       ← 用户主目录
│   └── user/
├── etc/        ← 配置文件
├── var/        ← 可变数据（日志等）
├── tmp/        ← 临时文件
├── usr/        ← 用户程序
├── bin/        ← 系统命令（符号链接到 /usr/bin）
└── dev/        ← 设备文件
```

## pwd — 我在哪

```bash
pwd
# /home/user
```

`pwd`（print working directory）显示当前所在的目录路径。

## ls — 列出内容

```bash
ls                    # 列出当前目录
ls /etc               # 列出指定目录
ls -l                 # 长格式（权限、大小、日期）
ls -a                 # 显示所有文件（包括隐藏文件）
ls -la                # 组合使用
ls -lh                # 人性化显示大小（K/M/G）
ls -lt                # 按修改时间排序
ls -lS                # 按文件大小排序
ls -d */              # 只显示目录
```

`ls -l` 的输出解读：

```
-rw-r--r-- 1 user group 1024 Jul 15 10:00 file.txt
^^^^^^^^^ ^ ^^^^^ ^^^^^ ^^^^ ^^^^^^^^^^^ ^^^^^^^^
 权限      链接  用户   组   大小   修改时间    文件名
```

## cd — 切换目录

```bash
cd /etc          # 切换到 /etc
cd ~             # 回到自己的 home 目录
cd               # 同上，默认回到 home
cd -             # 回到上一个目录
cd ..            # 回到父目录
cd ../..         # 向上两级
cd /home/user/Documents  # 绝对路径
cd Documents     # 相对路径（相对于当前目录）
```

## 绝对路径 vs 相对路径

```bash
# 绝对路径：从根开始
cd /home/user/Documents

# 相对路径：从当前位置开始
cd Documents    # 当前目录下的 Documents
cd ../test      # 父目录下的 test
```

特殊目录符号：
- `.` — 当前目录
- `..` — 父目录
- `~` — 当前用户的 home 目录
- `-` — 上一个目录

## 实用小技巧

```bash
# Tab 补全：输入前几个字后按 Tab 自动补全
cd /et[TAB]    # 补全为 /etc

# 历史命令：按 ↑/↓ 浏览之前执行过的命令
# Ctrl+R 反向搜索历史命令

# 通配符 * 匹配任意字符
ls *.txt       # 列出所有 .txt 文件
ls file*       # 列出所有以 file 开头的文件
```

## 本章小结

| 命令 | 作用 |
|------|------|
| `pwd` | 显示当前路径 |
| `ls` | 列出目录内容 |
| `cd` | 切换目录 |
| `cd ~` | 回到 home |
| `cd -` | 回到上一个目录 |

## 练习

1. 执行 `pwd` 确认当前目录
2. 用 `ls -la /` 查看根目录
3. 切换到 `/var/log`，再用 `cd -` 返回
4. 用 `ls -lh` 查看文件大小，找出最大的文件
