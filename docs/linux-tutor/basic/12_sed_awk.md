---
order: 12
---

# sed 与 awk 进阶

`sed` 和 `awk` 是 Linux 文本处理的两专家器。`sed` 擅长行编辑，`awk` 擅长列处理。

## sed — 流编辑器

`sed` 逐行处理文本，主要用于替换、删除、插入操作。

### 替换

```bash
# 基本替换（每行第一个匹配）
sed 's/foo/bar/' file.txt

# 全局替换
sed 's/foo/bar/g' file.txt

# 只替换第 2 行
sed '2s/foo/bar/' file.txt

# 替换第 2 到第 5 行
sed '2,5s/foo/bar/g' file.txt

# 原地修改（直接改文件）
sed -i 's/foo/bar/g' file.txt
sed -i.bak 's/foo/bar/g' file.txt  # 备份原文件

# 使用正则
sed 's/[0-9]\+/NUM/g' file.txt     # 将所有数字替换为 NUM
```

### 删除

```bash
sed '/^$/d' file.txt            # 删除空行
sed '/debug/d' file.txt         # 删除包含 debug 的行
sed '2d' file.txt               # 删除第 2 行
sed '2,5d' file.txt             # 删除 2-5 行
sed '5,$d' file.txt             # 删除第 5 行到末尾
sed '/^#/d' config.conf         # 删除注释行
```

### 打印与行号

```bash
sed -n '5p' file.txt            # 只打印第 5 行
sed -n '10,20p' file.txt        # 打印 10-20 行
sed -n '/error/p' file.txt      # 打印包含 error 的行
sed -n '/error/=' file.txt      # 打印匹配行的行号
```

### 插入与追加

```bash
sed '2i\插入的新行' file.txt    # 在第 2 行前插入
sed '2a\追加的新行' file.txt    # 在第 2 行后追加
sed '$a\文件末尾追加' file.txt  # 在文件末尾追加
```

### 综合示例

```bash
# 替换配置文件中某个值
sed -i 's/^#Port 22/Port 2222/' /etc/ssh/sshd_config

# 提取日志中的时间戳
sed -n 's/.*\[\(.*\)\].*/\1/p' app.log

# 删除 HTML 标签
sed 's/<[^>]*>//g' index.html
```

## awk — 数据流处理

`awk` 将文本视为由行和列组成的表格数据。

### 基本结构

```bash
awk 'BEGIN { 初始化 } { 每行处理 } END { 收尾 }' file
```

### 打印列

```bash
# 打印第 1 列和第 3 列
awk '{print $1, $3}' file.txt

# 打印最后一列
awk '{print $NF}' file.txt

# 打印倒数第 2 列
awk '{print $(NF-1)}' file.txt

# 打印行号和内容
awk '{print NR": "$0}' file.txt
```

### 特殊变量

| 变量 | 含义 |
|------|------|
| `$0` | 当前整行 |
| `$1`, `$2`... | 第 N 列 |
| `NF` | 当前行的列数 |
| `NR` | 当前行号 |
| `FS` | 字段分隔符（默认空格） |
| `OFS` | 输出字段分隔符 |

### 设置分隔符

```bash
# 以 : 分隔，打印用户名和 shell
awk -F: '{print $1, $7}' /etc/passwd

# 复杂分隔符
awk -F'[:/]' '{print $1, $3}' file.txt
```

### 条件过滤

```bash
# 行号过滤
awk 'NR > 5 && NR < 10 {print}' file.txt

# 数值过滤
awk '$3 > 100 {print $1, $3}' data.txt

# 字符串匹配
awk '/error/ {print}' app.log
awk '$1 ~ /^192\.168/ {print}' access.log   # 匹配 IP 段
awk '$1 !~ /127\.0\.0\.1/' access.log        # 排除本机

# 字段值匹配
awk -F: '$3 >= 1000 {print $1}' /etc/passwd  # 普通用户(UID >= 1000)
```

### 内置函数

```bash
# 字符串函数
awk '{print length($0), toupper($1)}' file.txt
awk '{print substr($2, 1, 5)}' file.txt      # 子串

# 数值函数
awk '{sum += $1} END {print "总和:", sum}' numbers.txt
awk '{sum += $1; count++} END {print "平均:", sum/count}' numbers.txt

# printf 格式化
awk '{printf "%-20s %8.2f\n", $1, $2}' data.txt
```

### 关联数组

```bash
# 统计 IP 访问次数
awk '{count[$1]++} END {for (ip in count) print ip, count[ip]}' access.log

# 按第二列分组求和
awk '{sum[$2] += $3} END {for (k in sum) print k, sum[k]}' sales.txt
```

## 实战：日志分析

```bash
# 分析 Nginx 日志 — 统计每个 IP 的访问次数
awk '{count[$1]++} END {for (ip in count) print count[ip], ip}' access.log | sort -rn | head -10

# 统计每个 URL 的总传输字节
awk '{bytes[$7] += $10} END {for (url in bytes) print bytes[url], url}' access.log | sort -rn | head -10

# 找出 500 错误的请求
awk '$9 ~ /^5/ {print $1, $7, $9}' access.log

# 按小时统计请求量
awk '{print substr($4, 2, 13)}' access.log | cut -d: -f1 | sort | uniq -c
```

### 文件合并

```bash
# paste 按列拼接
paste file1 file2
paste -d',' file1 file2           # 指定分隔符

# join 按关键字合并（需排序）
sort file1 > f1.sorted
sort file2 > f2.sorted
join -t',' -1 1 -2 1 f1.sorted f2.sorted
```

## 本章小结

| 工具 | 哲学 | 适用场景 |
|------|------|---------|
| `sed` | 行编辑 | 替换、删除、插入文本 |
| `awk` | 列处理 | 数据分析、报表、格式化输出 |
| `paste` | 列拼接 | 合并文件 |
| `join` | 行合并 | 关联两个文件 |

**选择原则**：
- 简单替换 → `sed`
- 需要计算/分组/统计 → `awk`
- 复杂逻辑 → 用 Python/Perl 替代

## 练习

1. 用 `sed` 将 `date` 命令输出的月份替换为大写
2. 用 `sed` 删除 `/etc/ssh/sshd_config` 中的注释行和空行
3. 用 `awk` 统计系统中各 shell（`/etc/passwd` 最后一列）的使用人数
4. 用 `awk` 分析 `/var/log/syslog`，统计每种日志级别的出现次数
5. 用 `paste` 和 `awk` 合并两个 CSV 文件
