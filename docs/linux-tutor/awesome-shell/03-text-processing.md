---
index: 3
---
# 文本处理命令

## 一、`grep` — 文本搜索（最常用）

**grep** 用于在文件中搜索匹配模式的行，支持正则表达式。

### 基本语法

```bash
grep [选项] 模式 [文件...]
```

### 常用参数

| 参数 | 说明 |
|------|------|
| `-i` | 忽略大小写 |
| `-v` | 反向匹配（显示不匹配的行）|
| `-n` | 显示行号 |
| `-c` | 只统计匹配的行数 |
| `-l` | 只显示包含匹配的文件名 |
| `-L` | 只显示不包含匹配的文件名 |
| `-r` 或 `-R` | 递归搜索目录 |
| `-w` | 匹配整个单词 |
| `-x` | 匹配整行 |
| `-o` | 只输出匹配的部分（而非整行）|
| `-A NUM` | 显示匹配行及之后的 NUM 行 |
| `-B NUM` | 显示匹配行及之前的 NUM 行 |
| `-C NUM` | 显示匹配行及前后各 NUM 行 |
| `-e` | 指定多个模式（可用多个 -e）|
| `-f FILE` | 从文件读取模式 |
| `-E` | 扩展正则表达式（同 egrep）|
| `-P` | 使用 Perl 兼容正则表达式 |
| `-q` | 安静模式（不输出结果，只返回状态码）|
| `-s` | 不显示错误信息 |
| `--color=auto` | 高亮匹配结果（通常默认）|
| `-m NUM` | 最多匹配 NUM 行后停止 |
| `-H` | 显示文件名（搜索多个文件时默认）|
| `-h` | 不显示文件名 |
| `-a` | 将二进制文件当作文本处理 |

### 使用示例

```bash
# 基本搜索
grep "error" log.txt                    # 在文件中搜索 error
grep -i "error" log.txt                 # 忽略大小写
grep -n "error" log.txt                 # 显示行号
grep -c "error" log.txt                 # 统计匹配行数
grep -v "error" log.txt                 # 显示不包含 error 的行
grep -w "error" log.txt                 # 匹配整个单词
grep -r "TODO" /home/user/project/      # 递归搜索目录
grep -rl "TODO" /home/user/project/     # 只显示包含 TODO 的文件名

# 上下文
grep -A 5 "error" log.txt               # 显示匹配行及之后 5 行
grep -B 5 "error" log.txt               # 显示匹配行及之前 5 行
grep -C 5 "error" log.txt               # 显示匹配行及前后各 5 行

# 多模式
grep -e "error" -e "warning" log.txt    # 匹配 error 或 warning
grep -E "error|warning|critical" log.txt # 使用扩展正则

# 管道组合
ps aux | grep python                    # 查找 python 进程
ps aux | grep -v grep | grep python     # 排除 grep 自身
ps aux | grep "[p]ython"                # 另一种排除 grep 的方式
cat /var/log/syslog | grep -i "error"   # 搜索系统日志
dmesg | grep -i "usb"                   # 搜索 USB 设备信息
netstat -an | grep LISTEN               # 查找监听端口

# 正则表达式
grep "^error" log.txt                   # 行首匹配
grep "error$" log.txt                   # 行尾匹配
grep "^$" log.txt                       # 查找空行（-v 可排除空行）
grep "[0-9]\{3\}\.[0-9]\{3\}" file     # 匹配 IP 地址模式
grep -E "[0-9]{3}\.[0-9]{3}" file      # 扩展正则（更简洁）
grep -P "\d{3}\.\d{3}" file            # Perl 正则
```

---

## 二、`sed` — 流编辑器

**sed** 用于对文本进行过滤和转换，支持查找替换、插入、删除等操作。

### 基本语法

```bash
sed [选项] '命令' [文件...]
```

### 常用参数

| 参数 | 说明 |
|------|------|
| `-n` | 安静模式，只输出处理后的行 |
| `-i` | 直接修改文件（不加 -i 只预览）|
| `-i.bak` | 修改前备份，生成 .bak 文件 |
| `-e` | 指定多个编辑命令 |
| `-f FILE` | 从文件读取 sed 命令 |
| `-r` | 使用扩展正则表达式（Linux）|
| `-E` | 使用扩展正则表达式（跨平台）|
| `-u` | 无缓冲模式 |

### 常用命令（sed 内部命令）

| 命令 | 说明 |
|------|------|
| `s/旧/新/` | 查找替换 |
| `d` | 删除行 |
| `p` | 打印行 |
| `a\text` | 在行后追加文本 |
| `i\text` | 在行前插入文本 |
| `c\text` | 用新文本替换整行 |
| `y/旧/新/` | 字符转换 |
| `q` | 退出 sed |
| `w FILE` | 将结果写入文件 |
| `r FILE` | 从文件读取内容插入 |

### 地址定界

| 格式 | 说明 |
|------|------|
| `3` | 第 3 行 |
| `3,5` | 第 3 到 5 行 |
| `3,$` | 第 3 到末尾 |
| `1~2` | 第 1 行开始，步长为 2（奇数行）|
| `/pattern/` | 匹配模式的行 |
| `/pat1/,/pat2/` | 从匹配 pat1 到匹配 pat2 的行 |

### 使用示例

```bash
# 查找替换
sed 's/old/new/' file.txt                   # 替换每行第一个匹配
sed 's/old/new/g' file.txt                  # 全局替换（所有匹配）
sed 's/old/new/2' file.txt                  # 只替换每行第 2 个匹配
sed 's/old/new/gi' file.txt                 # 全局替换，忽略大小写
sed 's/old/new/g' file.txt > new.txt        # 输出到新文件
sed -i 's/old/new/g' file.txt               # 直接修改文件
sed -i.bak 's/old/new/g' file.txt           # 备份后修改
sed -i 's/^/prefix_/' file.txt             # 在行首添加
sed -i 's/$/\;$/;' file.txt                 # 在行尾添加

# 行操作
sed -n '3p' file.txt                        # 只打印第 3 行
sed -n '3,5p' file.txt                      # 打印第 3 到 5 行
sed -n '1~2p' file.txt                      # 打印奇数行
sed -n '/error/p' file.txt                  # 打印包含 error 的行（同 grep）
sed -n '/error/!p' file.txt                 # 打印不包含 error 的行
sed '3d' file.txt                           # 删除第 3 行
sed '3,5d' file.txt                         # 删除第 3 到 5 行
sed '/^$/d' file.txt                        # 删除空行
sed '/^#/d' file.txt                        # 删除注释行（以 # 开头）
sed '/^#/d;/^$/d' file.txt                 # 删除注释和空行
sed '10,20d' file.txt                       # 删除第 10 到 20 行

# 插入和追加
sed '3a\this is new line' file.txt          # 在第 3 行后追加
sed '3i\this is new line' file.txt          # 在第 3 行前插入
sed '3c\replaced line' file.txt             # 替换第 3 行
sed '/error/a\---LOG END---' file.txt       # 在匹配行后追加

# 多命令
sed -e 's/old/new/g' -e '/^$/d' file.txt    # 多个命令
sed 's/old/new/g; /^$/d' file.txt           # 分号分隔多个命令
sed -f commands.sed file.txt                # 从文件读取命令

# 高级用法
sed -n '1!G;h;$p' file.txt                  # 反转文件行序
sed -n 'l' file.txt                         # 显示不可见字符
sed 's/  */ /g' file.txt                    # 将多个空格合并为一个
sed 's/[[:space:]]\+/,/g' file.txt          # 将空白替换为逗号
sed -r 's/([0-9]{3})/(\1)/g' file.txt      # 加括号（扩展正则）
```

---

## 三、`awk` — 文本分析和处理

**awk** 是一个强大的文本处理语言，特别适合处理结构化文本（如 CSV、日志文件）。

### 基本语法

```bash
awk [选项] '模式 {动作}' [文件...]
```

### 常用参数

| 参数 | 说明 |
|------|------|
| `-F` | 指定字段分隔符（默认空白）|
| `-v` | 设置变量值 |
| `-f` | 从文件读取 awk 程序 |
| `-b` | 将字符视为字节 |
| `-W` | 兼容性选项 |

### 内置变量

| 变量 | 说明 |
|------|------|
| `$0` | 整行内容 |
| `$1`, `$2`, ... | 第 1, 2, ... 个字段 |
| `NF` | 每行的字段数 |
| `NR` | 当前行号（序号）|
| `FNR` | 当前文件的行号（多文件时每个文件独立计数）|
| `FS` | 字段分隔符（同 -F 选项）|
| `OFS` | 输出字段分隔符（默认空格）|
| `RS` | 记录分隔符（默认换行）|
| `ORS` | 输出记录分隔符（默认换行）|
| `FILENAME` | 当前文件名 |
| `ARGC` | 命令行参数个数 |
| `ARGV` | 命令行参数数组 |

### 使用示例

```bash
# 基本用法
awk '{print $1}' file.txt                   # 打印每行第 1 列
awk '{print $1, $3}' file.txt               # 打印第 1、3 列
awk '{print $0}' file.txt                   # 打印整行
awk '{print NR, $0}' file.txt               # 打印行号和内容
awk '{print NF, $0}' file.txt               # 打印字段数和内容

# 指定分隔符
awk -F ',' '{print $1, $3}' data.csv        # 处理 CSV 文件
awk -F ':' '{print $1}' /etc/passwd         # 处理 passwd 文件（用户名）
awk -F ':' '{print $1, $6}' /etc/passwd     # 用户名和家目录
awk -F '[/:]' '{print $1}' file.txt         # 多个分隔符

# 模式匹配
awk '/error/ {print}' log.txt               # 打印包含 error 的行
awk '/^[0-9]/ {print}' file.txt             # 打印以数字开头的行
awk '$1 ~ /error/ {print}' file.txt         # 第 1 列匹配 error
awk '$1 !~ /error/ {print}' file.txt        # 第 1 列不匹配 error

# 条件判断
awk '$3 > 100 {print $1, $3}' data.txt      # 第 3 列大于 100
awk '$3 == "ERROR" {print}' log.txt         # 第 3 列等于 ERROR
awk '$1 >= 50 && $1 <= 100 {print}' file    # 范围条件
awk '{if ($1 > 100) print "big"; else print "small"}' file

# 内置函数
awk '{print length($0)}' file.txt           # 打印每行长度
awk '{print toupper($0)}' file.txt          # 转为大写
awk '{print tolower($0)}' file.txt          # 转为小写
awk '{print substr($1, 1, 3)}' file.txt     # 取第 1 列的前 3 个字符
awk '{print sqrt($1)}' file.txt             # 计算平方根
awk '{print int($1)}' file.txt              # 取整
awk '{printf "%-10s %5d\n", $1, $2}' file   # 格式化输出

# 统计和聚合
awk '{sum += $1} END {print sum}' file.txt              # 求和
awk '{sum += $1} END {print sum/NR}' file.txt           # 求平均值
awk 'NR==1 {max=$1} $1>max {max=$1} END {print max}'   # 求最大值
awk 'NR==1 {min=$1} $1<min {min=$1} END {print min}'   # 求最小值
awk '{count[$1]++} END {for (k in count) print k, count[k]}' file  # 统计频率

# BEGIN 和 END 块
awk 'BEGIN {print "Start Processing"} {print $0} END {print "Done"}' file
awk 'BEGIN {FS=":"; OFS="\t"} {print $1, $3}' /etc/passwd

# 多文件处理
awk 'FNR==1 {print "File: " FILENAME} {print $0}' file1.txt file2.txt

# 实战示例
awk '!seen[$0]++' file.txt                 # 去除重复行（经典用法）
awk '{arr[$1]++} END {for (i in arr) print i, arr[i]}' file.txt  # 统计频率
df -h | awk 'NR>1 {print $1, $5}'          # 查看磁盘使用率
ps aux | awk '$3 > 50 {print $2, $11}'     # CPU 使用率超过 50% 的进程
```

---

## 四、`sort` — 排序

```bash
sort file.txt                            # 按字典序排序
sort -n file.txt                         # 按数值排序（如 10 > 2）
sort -r file.txt                         # 逆序排序
sort -u file.txt                         # 排序并去重（同 sort | uniq）
sort -k 2 file.txt                       # 按第 2 列排序
sort -t ':' -k 3 -n /etc/passwd          # 冒号分隔，按第 3 列数值排序
sort -h file.txt                         # 按人类可读大小排序（2K, 1M, 3G）
sort -R file.txt                         # 随机排序
sort -m file1.txt file2.txt              # 合并已排序的文件
sort -c file.txt                         # 检查文件是否已排序
sort -o sorted.txt file.txt              # 结果输出到文件（而非 stdout）
sort -b file.txt                         # 忽略前导空白
sort -f file.txt                         # 忽略大小写
sort -V file.txt                         # 按版本号排序（v1.2 < v1.10）
```

```bash
# 组合示例
sort -t: -k3 -rn /etc/passwd             # 按 UID 从大到小排序
du -sh * | sort -h                       # 按目录大小排序
ps aux | sort -nrk 3                     # 按 CPU 使用率排序
ps aux | sort -nrk 4                     # 按内存使用率排序
```

---

## 五、`uniq` — 去重和统计

**注意**：`uniq` 只能去除**连续**的重复行，通常与 `sort` 配合使用。

```bash
uniq file.txt                            # 去除连续重复行
uniq -c file.txt                         # 统计每行出现次数
uniq -d file.txt                         # 只显示重复的行
uniq -u file.txt                         # 只显示不重复的行
uniq -i file.txt                         # 忽略大小写
uniq -w N file.txt                       # 只比较前 N 个字符
uniq -s N file.txt                       # 跳过前 N 个字符
uniq -f N file.txt                       # 跳过前 N 个字段
```

```bash
# 组合示例
sort file.txt | uniq                     # 排序并去重
sort file.txt | uniq -c                  # 统计每行出现次数
sort file.txt | uniq -c | sort -rn       # 按出现次数从高到低排序
sort file.txt | uniq -d                  # 找出重复行
```

---

## 六、`cut` — 截取字段

```bash
cut -c 1-5 file.txt                      # 截取第 1 到第 5 个字符
cut -c 1,3,5 file.txt                    # 截取第 1、3、5 个字符
cut -c -5 file.txt                       # 截取前 5 个字符
cut -c 5- file.txt                       # 截取第 5 个字符到结尾

cut -d ':' -f 1 file.txt                # 按冒号分隔，取第 1 列
cut -d ':' -f 1,3 /etc/passwd           # 取第 1 和第 3 列
cut -d ':' -f 1-3 /etc/passwd           # 取第 1 到第 3 列
cut -d ':' -f 1- --output-delimiter=',' # 指定输出分隔符
cut -d ' ' -f 1-3 file.txt              # 按空格分隔
cut -f 1 file.txt                       # 默认 Tab 分隔

cut -d',' -f2,3 data.csv                # 处理 CSV 文件
cut -s -d: -f1 /etc/passwd              # 跳过不包含分隔符的行
```

---

## 七、`tr` — 字符转换

```bash
# 大小写转换
tr 'a-z' 'A-Z' < file.txt               # 小写转大写
tr '[:lower:]' '[:upper:]' < file.txt   # 同上（更清晰）

# 删除字符
tr -d 'abc' < file.txt                  # 删除所有 a, b, c 字符
tr -d '\n' < file.txt                   # 删除换行符（合并为一行）
tr -d ' ' < file.txt                    # 删除所有空格
tr -d '\r' < file.txt > new.txt         # 删除 Windows 换行符（\r）

# 压缩重复字符
tr -s ' ' < file.txt                    # 将多个连续空格压缩为一个
tr -s '\n' < file.txt                   # 将多个连续空行压缩为一个
tr -s 'a-z' < file.txt                  # 压缩连续重复字母

# 替换
tr ',' ' ' < file.txt                   # 逗号替换为空格
tr ':' '\t' < file.txt > new.txt        # 冒号替换为 Tab
tr '\n' ' ' < file.txt                  # 将换行替换为空格（合并成一行）

# 补集
tr -c 'a-zA-Z' '\n' < file.txt          # 非字母字符替换为换行（提取单词）
tr -cd '0-9' < file.txt                # 只保留数字，删除其他字符
tr -cs 'a-zA-Z' '\n' < file.txt         # 提取单词（每行一个）
```

---

## 八、`tee` — 同时输出到文件和屏幕

```bash
ls | tee output.txt                     # 显示结果并保存到文件
ls | tee -a output.txt                  # 追加模式（不覆盖）
ls | tee output.txt | grep ".txt"       # 保存到文件并继续管道
command 2>&1 | tee error.log            # 同时保存错误输出
command | tee /dev/tty | grep pattern   # 显示所有输出，grep 只处理匹配行
echo "Backup started at $(date)" | tee -a backup.log
```

---

## 九、`xargs` — 将标准输入转换为命令参数

```bash
# 基本用法
echo "file1 file2 file3" | xargs rm      # 删除 file1 file2 file3
find . -name "*.tmp" | xargs rm -f       # 找到并删除临时文件（比 -exec 快）
find . -type f | xargs wc -l             # 统计所有文件行数

# 常用参数
xargs -I {} mv {} /backup/               # 指定替换标记（{} 替换为输入）
xargs -n 1                               # 每行只传一个参数
xargs -n 2                               # 每行传两个参数
xargs -P 4                               # 并行执行（4 个进程）
xargs -d '\n'                            # 指定分隔符（处理文件名含空格）
xargs -p                                 # 交互式确认再执行
xargs -t                                 # 先打印命令再执行

# 处理文件名含空格
find . -name "*.txt" -print0 | xargs -0 rm   # 使用空字符分隔（最安全）
find . -name "*.txt" | xargs -d '\n' rm      # 使用换行符分隔
find . -name "*.txt" | xargs -I {} rm "{}"   # 用引号包裹

# 并行处理
find . -name "*.log" | xargs -P 4 -I {} gzip {}  # 并行压缩
seq 1 10 | xargs -P 3 -I {} echo "Processing {}" # 并行处理
```

---

## 十、`comm` — 比较两个排序文件

```bash
comm file1.txt file2.txt                 # 三列显示：file1独有、file2独有、共有
comm -1 file1.txt file2.txt              # 不显示 file1 独有行
comm -2 file1.txt file2.txt              # 不显示 file2 独有行
comm -3 file1.txt file2.txt              # 只显示共有的行
comm -12 file1.txt file2.txt             # 只显示共有的行（同 -3）
comm -23 file1.txt file2.txt             # 只显示 file1 独有
```

**注意**：`comm` 要求输入文件已排序。

---

## 十一、`diff` — 比较文件差异

```bash
diff file1.txt file2.txt                 # 比较两个文件
diff -u file1.txt file2.txt              # 统一格式（最常用，可读性高）
diff -c file1.txt file2.txt              # 上下文格式
diff -i file1.txt file2.txt              # 忽略大小写
diff -w file1.txt file2.txt              # 忽略空白字符
diff -b file1.txt file2.txt              # 忽略空白数量变化
diff -r dir1/ dir2/                      # 递归比较目录
diff -q file1.txt file2.txt              # 只显示是否不同
diff -s file1.txt file2.txt              # 文件相同时也显示提示
diff -N file1.txt file2.txt              # 将缺失文件视为空文件
diff -y file1.txt file2.txt              # 并排显示（左右对照）
diff -W 200 -y file1.txt file2.txt       # 指定并排宽度

# 生成补丁文件
diff -u old.txt new.txt > patch.diff     # 生成补丁
patch -p0 < patch.diff                   # 应用补丁
```

---

## 十二、`paste` — 合并文件行

```bash
paste file1.txt file2.txt                # 按行并列合并（Tab 分隔）
paste -d ',' file1.txt file2.txt         # 指定分隔符
paste -d ':' file1.txt file2.txt         # 冒号分隔
paste -s file.txt                        # 将文件所有行合并为一行
paste -s -d ',' file.txt                 # 合并为一行，逗号分隔
paste - - < file.txt                     # 将文件两行合并为一行
paste file1.txt file2.txt file3.txt      # 合并多个文件
```

---

## 十三、文本处理综合实战

```bash
# 1. 查看访问最多的 10 个 IP
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10

# 2. 统计 HTTP 状态码分布
awk '{print $9}' access.log | sort | uniq -c | sort -rn

# 3. 找出 5 分钟内修改过的文件
find . -mmin -5 -type f

# 4. 查找 10 个大文件
find / -type f -exec du -h {} + 2>/dev/null | sort -rh | head -10

# 5. 统计每种文件类型数量
find . -type f | sed 's/.*\.//' | sort | uniq -c | sort -rn

# 6. 提取所有邮箱地址
grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' file.txt

# 7. 删除文件中的注释和空行
sed -e 's/#.*//' -e '/^$/d' config.conf

# 8. CSV 字段提取并格式化
awk -F ',' '{printf "%-20s %-10s %s\n", $1, $2, $3}' data.csv

# 9. 查找重复文件（基于 MD5）
find . -type f -exec md5sum {} + | sort | awk '{if (seen[$1]++) print $2}'

# 10. 日志实时监控并触发告警
tail -f /var/log/syslog | grep --line-buffered "ERROR" | while read line; do
    echo "Alert: $line" | mail -s "Error Alert" admin@example.com
done
```

---

## 十四、`join` — 连接两个文件（类似数据库 JOIN）

```bash
join file1.txt file2.txt                 # 基于第一列连接两个文件
join -t ':' file1.txt file2.txt          # 指定分隔符
join -1 2 -2 1 file1.txt file2.txt       # file1 用第2列，file2 用第1列
join -a 1 file1.txt file2.txt            # 左连接（显示 file1 所有行）
join -a 2 file1.txt file2.txt            # 右连接
join -a 1 -a 2 file1.txt file2.txt       # 全连接
join -v 1 file1.txt file2.txt            # 只显示 file1 中不匹配的行
join -o '1.1,2.2' file1.txt file2.txt    # 只输出指定列
```

**注意**：`join` 要求输入文件已按连接字段排序。