---
order: 3
---

# 文件与目录操作

## 创建目录 — mkdir

```bash
mkdir mydir                    # 创建单个目录
mkdir -p a/b/c                 # 递归创建（父目录不存在时自动创建）
mkdir dir{1,2,3}               # 创建 dir1, dir2, dir3
mkdir -p project/{src,doc,test} # 创建多层目录结构
```

## 创建空文件 — touch

```bash
touch file.txt                 # 创建空文件（如果文件已存在则更新时间戳）
touch file{1,2,3}.txt          # 批量创建 file1.txt file2.txt file3.txt
```

## 复制 — cp

```bash
cp file1 file2                 # 复制文件
cp file.txt dir/               # 复制到目录
cp -r dir1 dir2                # 递归复制目录
cp -i file1 file2              # 覆盖前提示（-i 是 alias 常用选项）
cp -v file1 file2              # 显示复制过程
cp -a dir1 dir2                # 归档复制（保留权限、链接等属性）
```

## 移动/重命名 — mv

```bash
mv file.txt dir/               # 移动到目录
mv old.txt new.txt             # 重命名文件
mv dir1 dir2                   # 重命名目录
mv -i file.txt dir/            # 覆盖前提示
```

## 删除 — rm

```bash
rm file.txt                    # 删除文件
rm -r dir/                     # 递归删除目录
rm -f file.txt                 # 强制删除（不提示）
rm -rf dir/                    # 强制递归删除（谨慎使用！）
rm *.log                       # 删除所有 .log 文件
```

::: danger
`rm -rf /` 会删除整个系统！使用 `rm` 时务必小心。
:::

## 查找文件 — find

`find` 是最强大的文件搜索工具：

```bash
# 按名称查找
find /etc -name "*.conf"       # /etc 下所有 .conf 文件
find . -name "*.txt"           # 当前目录下所有 .txt 文件

# 按类型查找
find . -type f                 # 只查找文件
find . -type d                 # 只查找目录
find . -type l                 # 只查找符号链接

# 按大小查找
find . -size +10M              # 大于 10MB 的文件
find . -size -1k               # 小于 1KB 的文件

# 按时间查找
find . -mtime -7               # 7天内修改过的文件
find . -mtime +30              # 30天前修改过的文件
find . -mmin -60               # 60分钟内修改过的文件

# 找到后执行操作
find . -name "*.tmp" -delete               # 找到并删除
find . -name "*.log" -exec rm {} \;        # 找到并执行 rm
find . -name "*.txt" -exec cp {} /backup \; # 找到并复制

# 按权限查找
find . -perm 644               # 查找权限为 644 的文件
find . -type f -empty          # 查找空文件
```

## 链接 — ln

```bash
# 软链接（符号链接），类似于 Windows 的快捷方式
ln -s target link_name
ln -s /usr/local/bin/python3 python

# 硬链接（同一文件的多个名称）
ln target link_name
```

软链接和硬链接的区别：
- 软链接可以跨文件系统，删除原文件后链接失效
- 硬链接不能跨文件系统，删除原文件后链接仍然可用

## 查看文件类型

```bash
file /bin/ls      # 输出: /bin/ls: ELF 64-bit LSB executable
file document     # 输出: document: ASCII text
```

## 本章小结

| 命令 | 作用 | 常用选项 |
|------|------|---------|
| `mkdir` | 创建目录 | `-p` 递归创建 |
| `touch` | 创建空文件/更新 | — |
| `cp` | 复制 | `-r` 递归，`-i` 提示，`-a` 归档 |
| `mv` | 移动/重命名 | `-i` 提示 |
| `rm` | 删除 | `-r` 递归，`-f` 强制 |
| `find` | 查找文件 | `-name`, `-type`, `-size`, `-mtime` |
| `ln` | 创建链接 | `-s` 软链接 |

## 练习

1. 创建目录 `learn-linux/{docs,src,test}`
2. 在 `src` 下创建一个 `hello.txt`，复制到 `docs`，然后重命名为 `hello.md`
3. 用 `find` 查找 home 目录下所有 `.md` 文件
4. 删除 `test` 目录
5. 创建一个软链接指向 `hello.md`
