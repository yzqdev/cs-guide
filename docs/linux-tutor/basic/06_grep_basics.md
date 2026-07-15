---
order: 6
---

# 文本搜索与处理

本章介绍 Linux 下最常用的文本处理工具，掌握它们能极大提升工作效率。

## grep — 文本搜索之王

### 基本用法

```bash
grep pattern file               # 在文件中搜索模式
grep "error" app.log            # 搜索包含 error 的行
grep -i "error" app.log         # 忽略大小写
grep -n "error" app.log         # 显示匹配行号
grep -v "error" app.log         # 反向匹配（不含 error 的行）
grep -c "error" app.log         # 只统计匹配行数
grep -r "TODO" src/             # 递归搜索目录
grep -l "main" *.c              # 只显示匹配的文件名
```

### 高级用法

```bash
# 正则表达式
grep "^error" log               # 以 error 开头的行
grep "error$" log               # 以 error 结尾的行
grep "err[oa]r" log             # erro 或 errar
grep "err.*r" log               # err 开头 r 结尾，中间任意字符
grep -E "error|warning" log     # 扩展正则：或匹配
grep -E "[0-9]{3}-[0-9]{4}"    # 匹配电话号码模式

# 上下文行
grep -A 2 "error" log           # 匹配行 + 后2行
grep -B 2 "error" log           # 匹配行 + 前2行
grep -C 2 "error" log           # 匹配行 + 前后各2行

# 多文件搜索
grep "class" *.py               # 搜索所有 Python 文件
grep -r "import" /usr/lib/python3/  # 递归搜索

# 只输出匹配的部分
grep -o "[0-9]\+" log           # 只输出数字
```

### 实战：grep 日志分析

```bash
# 统计不同级别的日志数量
grep -c "ERROR" app.log
grep -c "WARN" app.log
grep -c "INFO" app.log

# 找出所有 IP 地址
grep -o -E "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" access.log | sort | uniq

# 统计 IP 访问次数
grep -o -E "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" access.log | sort | uniq -c | sort -rn
```

## sort — 排序

```bash
sort file.txt                    # 按字典序排序
sort -n file.txt                 # 按数字排序
sort -r file.txt                 # 逆序
sort -k 2 data.txt               # 按第2列排序
sort -t: -k 3 -n /etc/passwd    # 以 : 分隔，按第3列（UID）数字排序
sort -u file.txt                 # 排序并去重
```

## uniq — 去重与统计

```bash
uniq file.txt                    # 去除相邻重复行（通常先 sort）
sort file.txt | uniq             # 先去重再排序
sort file.txt | uniq -c          # 统计每行出现次数
sort file.txt | uniq -d          # 只显示重复行
sort file.txt | uniq -u          # 只显示不重复的行
```

## cut — 按列切分

```bash
cut -d: -f1 /etc/passwd          # 以 : 分隔，取第一列（用户名）
cut -d: -f1,3 /etc/passwd       # 取第1和第3列
cut -d: -f3- /etc/passwd        # 取第3列到最后
cut -c1-5 file.txt               # 取每行前5个字符
cut -c3- file.txt                # 取每行第3个字符开始到结尾
cut -f2 file.txt                 # 取第2列（默认 tab 分隔）
```

## tr — 字符转换

```bash
# 大小写转换
cat file.txt | tr 'a-z' 'A-Z'   # 小写转大写
cat file.txt | tr '[:lower:]' '[:upper:]'  # 同上（更可读）

# 字符替换
echo "hello" | tr 'l' 'x'       # hexxo
echo "a/b/c" | tr '/' '-'       # a-b-c

# 删除字符
cat file.txt | tr -d '0-9'      # 删除所有数字

# 压缩重复字符
cat file.txt | tr -s ' '        # 将连续多个空格压缩为一个

# 删除空白行
cat file.txt | tr -s '\n'       # 压缩连续换行为一个
```

## 综合实战

```bash
# 查看当前目录最大的 10 个文件
du -sh * | sort -rh | head -10

# 统计 /etc 下不同后缀文件的数量
ls -la /etc | grep "^-" | awk '{print $NF}' | awk -F. '{print $NF}' | sort | uniq -c | sort -rn

# 查看最常用的 10 条历史命令
 history | awk '{print $2}' | sort | uniq -c | sort -rn | head -10

# 分析 access log 中的 HTTP 状态码
awk '{print $9}' access.log | sort | uniq -c | sort -rn
```

## 本章小结

| 命令 | 核心用途 | 常用场景 |
|------|---------|---------|
| `grep` | 搜索文本 | 日志分析、代码搜索 |
| `sort` | 排序 | 整理数据 |
| `uniq` | 去重、统计 | 统计出现次数 |
| `cut` | 按列切分 | 处理结构化文本 |
| `tr` | 字符转换 | 大小写、替换、删除 |

## 练习

1. 用 `grep` 在 `/var/log` 中找到包含 "error" 的日志行
2. 用 `sort | uniq -c` 统计 `/etc/passwd` 中各 shell（最后一列）的使用分布
3. 用 `cut -d:` 提取当前系统用户列表
4. 用 `tr` 将一段英文全部转为大写
5. 组合使用：找出 `/etc` 下所有 `.conf` 文件中包含 "listen" 的行并统计数量
