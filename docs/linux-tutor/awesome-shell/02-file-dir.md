---
index: 2
---
# 文件与目录操作命令

## 一、目录导航

### `pwd` — 显示当前工作目录

```bash
pwd          # 显示当前路径：/home/user
pwd -P       # 显示物理路径（忽略符号链接）
pwd -L       # 显示逻辑路径（默认，含符号链接）
```

### `cd` — 切换目录

```bash
cd /home/user/Documents    # 切换到绝对路径
cd Documents               # 切换到相对路径（当前目录下）
cd ..                      # 返回上级目录
cd ../..                   # 返回上两级目录
cd -                       # 返回上一个目录
cd ~                       # 切换到当前用户家目录
cd                         # 同 cd ~
cd ~user1                  # 切换到 user1 的家目录
cd /                       # 切换到根目录
```

### `dirs` — 显示目录栈

```bash
dirs                       # 显示目录栈
pushd /tmp                 # 将目录推入栈并切换
popd                       # 弹出栈顶目录并切换
pushd +1                   # 切换到栈中第 1 个目录
```

---

## 二、列出目录内容

### `ls` — 列出文件和目录

```bash
ls                         # 列出当前目录内容（简洁）
ls -l                      # 长格式显示（权限、大小、修改时间）
ls -a                      # 显示所有文件（包括隐藏文件）
ls -la                     # 长格式显示所有文件（最常用）
ls -lh                     # 以人类可读格式显示大小（K, M, G）
ls -lt                     # 按修改时间排序（最新在前）
ls -ltr                    # 按修改时间排序（最旧在前）
ls -lS                     # 按文件大小排序（最大在前）
ls -lSr                    # 按文件大小排序（最小在前）
ls -R                      # 递归显示子目录
ls -d */                   # 只显示目录
ls -1                      # 每行显示一个文件
ls -F                      # 在文件后加类型标记（/ 目录, * 可执行）
ls -la --color=auto        # 彩色显示（一般默认已启用）
```

**`ls -l` 输出格式**：

```
-rw-r--r--  1 user group  1024 Jul 14 10:30 file.txt
^^^^^^^^^  ^ ^^^^^ ^^^^^  ^^^^ ^^^^^^^^^^^ ^^^^^^^^
权限       链接数 所有者 组    大小    修改时间   文件名
```

权限说明：
- 第1位：`-` 文件, `d` 目录, `l` 符号链接, `c` 字符设备, `b` 块设备
- 第2-4位：所有者权限（rwx）
- 第5-7位：所属组权限（rwx）
- 第8-10位：其他人权限（rwx）

---

## 三、创建与删除

### `mkdir` — 创建目录

```bash
mkdir mydir                        # 创建单个目录
mkdir -p parent/child/grandchild   # 递归创建多级目录
mkdir -m 755 mydir                 # 创建目录并设置权限
mkdir dir1 dir2 dir3               # 同时创建多个目录
mkdir {1..5}                       # 创建 1 2 3 4 5 五个目录
mkdir -v mydir                     # 显示创建过程信息
```

### `touch` — 创建空文件 / 更新文件时间戳

```bash
touch file.txt                      # 创建空文件（已存在则更新时间戳）
touch file1.txt file2.txt           # 创建多个文件
touch -a file.txt                   # 只更新访问时间（atime）
touch -m file.txt                   # 只更新修改时间（mtime）
touch -t 202601011200 file.txt      # 设置指定时间（YYYYMMDDhhmm）
touch -r ref.txt target.txt         # 以 ref.txt 的时间为准
touch {1..10}.txt                   # 创建 1.txt ~ 10.txt
```

### `rmdir` — 删除空目录

```bash
rmdir emptydir                      # 删除空目录
rmdir -p parent/child               # 递归删除空目录（从子到父）
```

### `rm` — 删除文件或目录

```bash
rm file.txt                         # 删除文件
rm -f file.txt                      # 强制删除（不提示）
rm -i file.txt                      # 交互式删除（需要确认）
rm -r dir/                          # 递归删除目录及其内容
rm -rf dir/                         # 强制递归删除（⚠️ 危险！）
rm -v file.txt                      # 显示删除过程
rm *.txt                            # 删除所有 .txt 文件
rm -rf /path/to/dir/*               # 删除目录下所有内容（保留目录本身）
```

> ⚠️ `rm -rf` 非常危险，建议使用 `trash` 或 `safe-rm` 替代。

---

## 四、复制、移动与重命名

### `cp` — 复制文件或目录

```bash
cp source.txt dest.txt               # 复制文件
cp -i source.txt dest.txt            # 覆盖前提示确认
cp -f source.txt dest.txt            # 强制覆盖（不提示）
cp -n source.txt dest.txt            # 不覆盖已存在的文件
cp -b source.txt dest.txt            # 覆盖前备份（生成 dest.txt~）
cp -v source.txt dest.txt            # 显示复制过程

cp file.txt dir/                     # 复制到目录（保留原名）
cp -r sourcedir/ destdir/            # 递归复制目录
cp -a sourcedir/ destdir/            # 归档复制（保留权限、时间戳、链接等）
cp -p source.txt dest.txt            # 保留源文件属性（权限、时间）
cp -u source.txt dest.txt            # 只复制更新的文件（增量复制）
cp -l source.txt link.txt            # 创建硬链接（而非复制）
cp -s source.txt symlink.txt         # 创建符号链接（而非复制）

cp -r dir1/ dir2/ dir3/ dest/        # 复制多个目录到目标
```

### `cp` 常用组合

```bash
cp -rva sourcedir/ destdir/          # 递归 + 详细 + 保留属性
cp -rpf sourcedir/ destdir/          # 递归 + 保留 + 覆盖不提示
```

### `mv` — 移动或重命名文件

```bash
mv source.txt dest.txt               # 重命名文件
mv file.txt dir/                     # 移动文件到目录
mv -i source.txt dest.txt            # 覆盖前提示
mv -f source.txt dest.txt            # 强制覆盖
mv -n source.txt dest.txt            # 不覆盖已存在的
mv -v source.txt dest.txt            # 显示过程
mv -u source.txt dest.txt            # 只移动更新的文件

mv dir1/ dir2/                       # 重命名目录
mv *.txt dir/                        # 移动所有 txt 文件到目录
mv file1.txt file2.txt dir/          # 移动多个文件到目录
```

### `rename` — 批量重命名

```bash
# 基本语法：rename 's/原字符串/新字符串/' 文件
rename 's/\.htm$/\.html/' *.htm      # 将 .htm 改为 .html
rename 's/ /_/g' *                   # 将文件名中的空格改为下划线
rename 'y/A-Z/a-z/' *                # 将文件名改为小写
rename 's/^/backup_/' *              # 在所有文件名前加 backup_
rename 's/\([0-9]\)/第$1集/' *.mp4   # 使用正则替换
```

---

## 五、查看文件类型与信息

### `file` — 查看文件类型

```bash
file file.txt                        # 查看文件类型
file -i file.txt                     # 显示 MIME 类型
file *                               # 查看当前目录所有文件类型
file -b file.txt                     # 仅显示类型描述（不显示文件名）
file /usr/bin/ls                     # 查看二进制文件类型
```

### `stat` — 显示文件详细信息

```bash
stat file.txt                        # 显示文件的完整元数据
stat -c '%s %y %n' *.txt            # 自定义格式：大小 修改时间 文件名
stat -f /                           # 查看文件系统信息
```

**输出示例**：
```
  File: file.txt
  Size: 1024            Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d      Inode: 1234567     Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/   user)   Gid: ( 1000/   group)
Access: 2026-07-14 10:30:00.000000000 +0800
Modify: 2026-07-14 10:30:00.000000000 +0800
Change: 2026-07-14 10:30:00.000000000 +0800
```

### `wc` — 统计文件信息

```bash
wc file.txt                          # 输出：行数 单词数 字符数 文件名
wc -l file.txt                       # 只统计行数
wc -w file.txt                       # 只统计单词数
wc -c file.txt                       # 只统计字节数
wc -m file.txt                       # 只统计字符数
wc -L file.txt                       # 显示最长行的长度
wc *.txt                             # 统计所有 txt 文件
```

```bash
# 实用技巧
wc -l < file.txt                     # 只输出数字（无文件名）
cat file.txt | wc -l                 # 管道统计行数
find . -name '*.log' | wc -l        # 统计 log 文件数量
```

---

## 六、链接文件

### `ln` — 创建链接

Linux 链接分为两种：**硬链接**和**符号链接（软链接）**。

| 特性 | 硬链接 | 符号链接 |
|------|--------|----------|
| inode 相同 | ✅ | ❌ |
| 可跨文件系统 | ❌ | ✅ |
| 可链接目录 | ❌ | ✅ |
| 源文件删除后仍可用 | ✅ | ❌（变成死链接）|
| 占用独立 inode | ❌（共享）| ✅ |

```bash
# 硬链接
ln source.txt hardlink.txt           # 创建硬链接
ln -f source.txt hardlink.txt        # 强制创建（覆盖已存在）

# 符号链接（软链接）
ln -s source.txt symlink.txt         # 创建符号链接
ln -sf source.txt symlink.txt        # 强制创建/更新符号链接
ln -s /usr/local/bin/myapp myapp     # 为可执行程序创建链接
ln -s ../lib ./lib                   # 相对路径的符号链接
ln -snf new_target symlink.txt       # 更新符号链接目标
```

**查看链接**：

```bash
ls -l                                 # 软链接显示 -> 指向目标
ls -la /proc/self/fd/                 # 查看当前进程打开的文件描述符
readlink symlink.txt                  # 显示符号链接指向的目标路径
readlink -f symlink.txt               # 解析所有符号链接得到绝对路径
find / -type l                        # 查找所有符号链接
find / -xtype l                       # 查找死链接（指向不存在的文件）
```

---

## 七、查找文件

### `find` — 强大灵活的文件搜索

```bash
# 按名称查找
find . -name "file.txt"              # 当前目录下找 file.txt
find / -name "*.log"                 # 全盘找 .log 文件（需 root）
find /home -iname "readme.md"        # 忽略大小写
find . -name "[a-z]*.txt"            # 使用通配符

# 按类型查找
find . -type f                       # 只找普通文件
find . -type d                       # 只找目录
find . -type l                       # 只找符号链接
find . -type f -name "*.sh"          # 组合条件

# 按大小查找
find . -size +100M                   # 大于 100MB 的文件
find . -size -1k                     # 小于 1KB 的文件
find . -size 1024k                   # 正好 1024KB 的文件
find . -size +50M -size -100M       # 50M ~ 100M 之间的文件

# 按时间查找
find . -mtime -7                     # 7天内修改过的文件
find . -mtime +30                    # 30天前修改过的文件
find . -mmin -60                     # 60分钟内修改过的文件
find . -atime -1                     # 1天内访问过的文件
find . -ctime -1                     # 1天内状态改变过的文件
find . -newer ref.txt                # 比 ref.txt 更新的文件

# 按权限查找
find . -perm 755                     # 权限为 755 的文件
find . -perm -4000                  # 设置了 SUID 的文件
find . -perm /u=r                    # 所有者有读权限

# 按所有者查找
find . -user root                    # root 用户的文件
find . -group www-data               # www-data 组的文件
find . -nouser                       # 没有所有者的文件（孤儿文件）

# 执行操作
find . -name "*.tmp" -delete                        # 找到并删除
find . -name "*.bak" -exec rm {} \;                 # 找到并执行命令
find . -name "*.log" -exec rm -f {} +               # + 表示合并参数（效率更高）
find . -type f -exec chmod 644 {} +                 # 批量改权限
find . -name "*.txt" -exec cp {} /backup/ \;        # 批量复制
find . -type d -exec chmod 755 {} +                 # 批量改目录权限
find . -name "*.sh" -exec chmod +x {} \;            # 批量加可执行权限

# 高级用法
find . -maxdepth 1 -name "*.txt"                    # 只在当前目录查找（不递归）
find . -maxdepth 3 -name "*.txt"                    # 最多递归 3 层
find . -mindepth 2 -name "*.txt"                    # 从第 2 层开始查
find . -empty                                       # 查找空文件或空目录
find . -maxdepth 1 -type f | wc -l                 # 统计文件数量
```

### `locate` — 快速查找文件（基于数据库）

```bash
locate file.txt                      # 快速查找（比 find 快，但不实时）
locate -i readme                     # 忽略大小写
locate -c "*.html"                   # 只统计数量
locate -r '\.txt$'                   # 使用正则
locate -n 10 "*.conf"                # 只显示前 10 条结果

sudo updatedb                        # 更新 locate 数据库（新文件才会被找到）
```

### `which` — 查找可执行文件的路径

```bash
which ls                             # 输出: /usr/bin/ls
which -a python                      # 显示所有匹配路径
which -p ls                          # 输出不带别名解析的路径
```

### `whereis` — 查找命令的二进制、源码和手册

```bash
whereis ls                           # 输出: ls: /usr/bin/ls /usr/share/man/man1/ls.1.gz
whereis -b ls                        # 只查找二进制
whereis -m ls                        # 只查找手册
whereis -s ls                        # 只查找源码
```

---

## 八、文件内容截取

### `head` — 查看文件开头

```bash
head file.txt                        # 显示前 10 行
head -n 20 file.txt                  # 显示前 20 行
head -20 file.txt                    # 同上（简写）
head -c 100 file.txt                 # 显示前 100 个字节
head -n -5 file.txt                  # 显示除了最后 5 行以外的所有内容（Linux 特有）
head -q file1.txt file2.txt          # 不显示文件名头
head -v file.txt                     # 总是显示文件名头
```

### `tail` — 查看文件末尾

```bash
tail file.txt                        # 显示最后 10 行
tail -n 20 file.txt                  # 显示最后 20 行
tail -20 file.txt                    # 同上（简写）
tail -f file.txt                     # 实时跟踪文件新增内容（最常用）
tail -F file.txt                     # 跟踪文件（即使文件被轮转）
tail -n +10 file.txt                 # 从第 10 行开始显示到末尾
tail -c 100 file.txt                 # 显示最后 100 个字节
tail -f -n 50 file.txt               # 从最后 50 行开始实时跟踪
tail -q file1.txt file2.txt          # 不显示文件名头
tail -f access.log | grep 502        # 实时跟踪日志并过滤（实用！）
```

### `less` — 分页查看文件（推荐）

```bash
less file.txt                        # 打开文件查看
less +G file.txt                     # 从文件末尾开始查看
less +/error file.txt                # 打开并搜索关键字 "error"
less -N file.txt                     # 显示行号
less -S file.txt                     # 不换行（水平滚动）

# 常用操作（在 less 中）
# 空格/PageDown  下一页
# b/PageUp       上一页
# g              跳到第一行
# G              跳到最后一行
# /pattern       向下搜索
# ?pattern       向上搜索
# n              下一个匹配
# N              上一个匹配
# q              退出
# h              显示帮助
```

### `more` — 分页查看（较老）

```bash
more file.txt                        # 基本分页查看
more -d file.txt                     # 显示提示（Press space to continue）
more -10 file.txt                    # 每屏显示 10 行
more +100 file.txt                   # 从第 100 行开始
more -s file.txt                     # 压缩多行空行为一行
```

### `cat` — 查看和拼接文件

```bash
cat file.txt                         # 查看文件内容
cat -n file.txt                      # 显示行号
cat -b file.txt                      # 显示行号（只对非空行编号）
cat -s file.txt                      # 压缩连续空行为一行
cat -E file.txt                      # 在每行末尾显示 $ 符号
cat -T file.txt                      # 将 Tab 显示为 ^I
cat -A file.txt                      # 显示所有不可见字符（-vET 的简写）

cat file1.txt file2.txt              # 拼接多个文件
cat file1.txt file2.txt > merged.txt # 合并到新文件
cat > newfile.txt                    # 从键盘输入创建文件（Ctrl+D 结束）
cat << EOF > file.txt                # 使用 heredoc 创建文件
Hello World
EOF
```

### `tac` — 反向查看文件

```bash
tac file.txt                         # 从最后一行开始反向显示
tac -r -s '.\|' file.txt             # 使用正则作为分隔符
```

### `rev` — 反转每一行字符

```bash
rev file.txt                         # 每行字符反转
```