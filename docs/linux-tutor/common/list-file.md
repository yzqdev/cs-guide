# 文件管理

## 1. 查看文件信息：`ls`

**简介**：`ls` 是英文单词 list 的简写，其功能为列出目录的内容，是用户最常用的命令之一。
Linux 文件或者目录名称最长可以有 265 个字符，`.` 代表当前目录，`..` 代表上一级目录，以 `.` 开头的文件为隐藏文件，需要用 `-a` 参数才能显示。

### 常用参数

| 参数 | 含义 |
|------|------|
| `-a` | 显示所有文件，包括隐藏文件 |
| `-l` | 以列表方式显示文件的详细信息 |
| `-h` | 配合 `-l` 以人类可读方式显示文件大小 |
| `-S` | 按文件大小排序 |
| `-t` | 按修改时间排序 |
| `-r` | 逆序排序 |
| `-R` | 递归显示子目录 |
| `-d` | 只显示目录本身（不显示目录内容）|
| `-i` | 显示 inode 号 |
| `--color` | 彩色显示（默认已启用）|

### 通配符

| 通配符 | 含义 | 示例 |
|--------|------|------|
| `*` | 匹配任意长度的任意字符 | `ls *.txt` 查找所有 txt 文件 |
| `?` | 匹配单个任意字符 | `ls file?.txt` 匹配 file1.txt, fileA.txt |
| `[abc]` | 匹配方括号内的任意一个字符 | `ls [abc]*` 匹配 a/b/c 开头的文件 |
| `[a-z]` | 匹配指定范围内的字符 | `ls [a-z]*` 匹配小写字母开头的文件 |
| `[!0-9]` | 匹配不在范围内的字符 | `ls [!0-9]*` 匹配非数字开头的文件 |
| `\` | 转义字符，使通配符作为普通字符 | `ls \*a` 查找文件名为 `*a` 的文件 |

---

## 2. 输出重定向：`>` `>>`

**简介**：Linux 允许将命令执行结果重定向到一个文件。

```bash
ls > test.txt                   # 将输出重定向到文件（覆盖原内容）
ls >> test.txt                  # 追加到文件末尾
```

---

## 3. 分屏显示：`more`

当信息过长无法在一屏显示时，使用 `more` 每次只显示一页：

```bash
more longfile.txt               # 分页查看
# 按空格键：下一页
# 按 q 键：退出
# 按 h 键：获取帮助
```

---

## 4. 管道：`|`

管道：一个命令的输出可以通过管道作为另一个命令的输入。

```bash
ls -la | grep "\.txt"           # 列出所有 .txt 文件
ls -la | more                   # 分页显示 ls 结果
cat /etc/passwd | cut -d: -f1   # 提取用户名
```

---

## 5. 清屏：`clear`

```bash
clear                           # 清除终端显示
# 快捷键：Ctrl + l
```

---

## 6. 切换工作目录：`cd`

**简介**：`cd` 用于切换工作目录，后面可跟绝对路径或相对路径。

| 命令 | 含义 |
|------|------|
| `cd` | 切换到当前用户的主目录 |
| `cd ~` | 切换到当前用户的主目录 |
| `cd .` | 切换到当前目录 |
| `cd ..` | 切换到上级目录 |
| `cd -` | 切换到上次所在的目录 |
| `cd /` | 切换到根目录 |
| `cd ~user1` | 切换到 user1 的家目录 |

**注意**：Linux 所有目录和文件名大小写敏感。

---

## 7. 显示当前路径：`pwd`

```bash
pwd                             # 显示当前工作目录
pwd -P                          # 显示物理路径（忽略符号链接）
```

---

## 8. 创建目录：`mkdir`

```bash
mkdir mydir                     # 创建目录
mkdir -p parent/child/grand     # 递归创建多级目录
mkdir -m 755 mydir              # 创建目录并设置权限
mkdir dir1 dir2 dir3            # 同时创建多个目录
```

---

## 9. 删除目录：`rmdir`

```bash
rmdir emptydir                  # 删除空目录（目录必须为空）
rmdir -p a/b/c                  # 递归删除空目录
```

---

## 10. 删除文件：`rm`

| 参数 | 含义 |
|------|------|
| `-i` | 交互式删除，逐个确认 |
| `-f` | 强制删除，不提示 |
| `-r` | 递归删除目录及其内容 |

```bash
rm file.txt                     # 删除文件
rm -r dir/                      # 删除目录
rm -f file.txt                  # 强制删除
rm -rf dir/                     # 强制递归删除（⚠️ 危险！）
```

---

## 11. 建立链接文件：`ln`

Linux 链接文件类似于 Windows 下的快捷方式。

| 类型 | 命令 | 特点 |
|------|------|------|
| 软链接 | `ln -s 源 链接` | 不占空间，源删除则失效 |
| 硬链接 | `ln 源 链接` | 共享 inode，源删除仍可用 |

```bash
ln -s /usr/local/bin/python3 python3   # 创建软链接
ln file.txt hardlink.txt               # 创建硬链接
```

---

## 12. 查看文件内容：`cat`

```bash
cat file.txt                    # 查看文件内容
cat -n file.txt                 # 显示行号
cat -b file.txt                 # 只对非空行编号
cat -s file.txt                 # 压缩连续空行
cat file1.txt file2.txt         # 拼接多个文件
cat > newfile.txt               # 从键盘输入创建文件（Ctrl+D 结束）
```

---

## 13. 文本搜索：`grep`

### 常用参数

| 参数 | 含义 |
|------|------|
| `-v` | 显示不包含匹配文本的行 |
| `-n` | 显示匹配行及行号 |
| `-i` | 忽略大小写 |
| `-c` | 只统计匹配行数 |
| `-r` | 递归搜索 |
| `-w` | 匹配整个单词 |

### 常用正则表达式

| 表达式 | 含义 |
|--------|------|
| `^a` | 行首匹配，查找以 a 开头的行 |
| `ke$` | 行尾匹配，查找以 ke 结尾的行 |
| `[Ss]` | 匹配 S 或 s |
| `.` | 匹配任意单个字符 |
| `*` | 重复前一个字符 0 次或多次 |
| `.*` | 匹配任意字符串 |

### 示例

```bash
grep -n "error" log.txt         # 搜索 error 并显示行号
grep -v "^#" config.conf        # 排除注释行
grep -r "TODO" /project/        # 递归搜索
grep -c "error" log.txt         # 统计匹配次数
ps aux | grep nginx             # 查找 nginx 进程
```

---

## 14. 查找文件：`find`

### 常用用法

| 命令 | 含义 |
|------|------|
| `find . -name "test.sh"` | 查找当前目录下名为 test.sh 的文件 |
| `find . -name "*.sh"` | 查找当前目录下所有 .sh 文件 |
| `find . -name "[A-Z]*"` | 查找大写字母开头的文件 |
| `find /tmp -size 2M` | 查找 /tmp 下等于 2M 的文件 |
| `find /tmp -size +2M` | 查找大于 2M 的文件 |
| `find /tmp -size -2M` | 查找小于 2M 的文件 |
| `find . -size +4k -size -5M` | 查找 4k 到 5M 之间的文件 |
| `find . -perm 777` | 查找权限为 777 的文件 |
| `find . -type f -name "*.log" -delete` | 找到并删除 .log 文件 |
| `find . -type f -exec chmod 644 {} +` | 批量改权限 |

---

## 15. 复制文件：`cp`

| 参数 | 含义 |
|------|------|
| `-a` | 保留链接、文件属性，递归复制（归档）|
| `-f` | 覆盖已存在的目标文件而不提示 |
| `-i` | 交互式复制，覆盖前确认 |
| `-r` | 递归复制目录 |
| `-v` | 显示复制进度 |
| `-p` | 保留文件属性（权限、时间戳）|
| `-u` | 只复制更新的文件 |

```bash
cp file.txt /backup/            # 复制到目录
cp -r dir/ /backup/             # 递归复制目录
cp -a source/ dest/             # 归档复制（推荐）
```

---

## 16. 移动文件：`mv`

| 参数 | 含义 |
|------|------|
| `-f` | 强制覆盖，不提示 |
| `-i` | 交互式，覆盖前确认 |
| `-v` | 显示移动进度 |
| `-u` | 只移动更新的文件 |

```bash
mv file.txt /new/path/         # 移动文件
mv oldname.txt newname.txt     # 重命名文件
mv *.txt /target/              # 移动所有 .txt 文件
```

---

## 17. 归档管理：`tar`

| 参数 | 含义 |
|------|------|
| `-c` | 创建归档文件 |
| `-x` | 解开归档文件 |
| `-v` | 显示过程 |
| `-f` | 指定归档文件名（必须放最后）|
| `-t` | 列出归档内容 |
| `-z` | 通过 gzip 压缩/解压 |
| `-j` | 通过 bzip2 压缩/解压 |
| `-J` | 通过 xz 压缩/解压 |
| `-C` | 解压到指定目录 |

```bash
# 打包
tar -cvf archive.tar dir/           # 打包
tar -czvf archive.tar.gz dir/       # 打包并压缩（gzip）
tar -cjvf archive.tar.bz2 dir/      # 打包并压缩（bzip2）

# 解包
tar -xvf archive.tar                # 解包
tar -xzvf archive.tar.gz            # 解压（gzip）
tar -xjvf archive.tar.bz2           # 解压（bzip2）
tar -xzvf archive.tar.gz -C /dir/   # 解压到指定目录
```

---

## 18. 文件压缩解压：`gzip`

```bash
gzip file.txt                    # 压缩（生成 file.txt.gz，原文件删除）
gzip -d file.txt.gz              # 解压
gzip -r dir/                     # 递归压缩目录
gzip -l file.txt.gz              # 查看压缩信息
```

**tar + gzip 组合**：`tar -zcvf file.tar.gz dir/`

---

## 19. 文件压缩解压：`bzip2`

```bash
bzip2 file.txt                   # 压缩（生成 file.txt.bz2）
bzip2 -d file.txt.bz2            # 解压
```

**tar + bzip2 组合**：`tar -jcvf file.tar.bz2 dir/`

---

## 20. 文件压缩解压：`zip` / `unzip`

```bash
# 压缩
zip -r archive.zip dir/          # 递归压缩目录
zip archive.zip file1 file2      # 压缩多个文件

# 解压
unzip archive.zip                # 解压到当前目录
unzip archive.zip -d /target/    # 解压到指定目录
unzip -l archive.zip             # 查看内容（不解压）
```

---

## 21. 查看命令位置：`which`

```bash
which ls                         # 查看 ls 命令路径
which python3                    # 查看 python3 路径
which -a ls                      # 显示所有匹配的路径
```