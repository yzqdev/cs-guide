---
index: 9
---
# 高级技巧

## 一、输入输出重定向

### 文件描述符

| 编号 | 名称 | 默认连接 | 说明 |
|------|------|----------|------|
| 0 | stdin | 键盘 | 标准输入 |
| 1 | stdout | 屏幕 | 标准输出 |
| 2 | stderr | 屏幕 | 标准错误输出 |
| 3-9 | 自定义 | - | 用户自定义文件描述符 |

### 输出重定向

```bash
# 标准输出重定向
command > file                      # 将 stdout 写入文件（覆盖）
command >> file                     # 将 stdout 追加到文件
command 1> file                     # 同上（显式指定 fd 1）

# 标准错误重定向
command 2> file                     # 将 stderr 写入文件（覆盖）
command 2>> file                    # 将 stderr 追加到文件

# 合并重定向
command > file 2>&1                 # stdout 和 stderr 都写入文件（经典写法）
command &> file                     # 同上（bash 简写）
command >& file                     # 同上（csh 风格）
command >> file 2>&1                # 追加模式
command &>> file                    # 追加模式简写

# 单独重定向到不同文件
command > out.log 2> err.log        # stdout 到 out.log, stderr 到 err.log

# 丢弃输出
command > /dev/null                 # 丢弃 stdout
command 2> /dev/null                # 丢弃 stderr
command &> /dev/null                # 丢弃所有输出
command > /dev/null 2>&1            # 同上
```

### 输入重定向

```bash
# 从文件读取输入
command < file                       # 将文件作为命令的输入
command < file > output              # 从文件读取，输出到文件

# 内联输入（Here Document）
cat << EOF
This is a
multiline text
EOF

# 带变量替换
name="John"
cat << EOF
Hello, $name
EOF

# 不替换变量（引号包裹分隔符）
cat << 'EOF'
Hello, $name           # $name 不会被替换
EOF

# 追加到文件
cat << EOF >> file.txt
追加内容
EOF

# Tab 缩进的 Here Document（<<- 忽略前导 Tab）
cat <<- EOF
    this line starts with tab
    another line
EOF

# Here String
cat <<< "Hello World"                # 将字符串作为输入
grep "pattern" <<< "$variable"       # 搜索变量内容
```

### 自定义文件描述符

```bash
# 打开文件用于读取
exec 3< input.txt                    # 打开文件并关联到 fd 3
read -u 3 line                      # 从 fd 3 读取
exec 3<&-                            # 关闭 fd 3

# 打开文件用于写入
exec 4> output.txt                   # 打开文件写入
echo "Hello" >&4                    # 写入 fd 4
exec 4>&-                            # 关闭 fd 4

# 实际应用
exec 3< input.txt
exec 4> output.txt
while IFS= read -r line <&3; do
    echo "处理: $line" >&4
done
exec 3<&-
exec 4>&-
```

---

## 二、管道

### 基础管道

```bash
command1 | command2                 # 将 command1 的 stdout 作为 command2 的 stdin
command1 | command2 | command3      # 多级管道

# 示例
ls -la | grep "\.txt" | wc -l       # 统计 .txt 文件数量
ps aux | sort -nrk 3 | head -5      # CPU 使用率最高的 5 个进程
```

### 管道重定向组合

```bash
# 管道+重定向
command1 < input.txt | command2 > output.txt
command1 | tee output.txt | command2  # 保存中间结果

# 错误输出通过管道
command1 2>&1 | grep error           # 错误输出也进入管道
command1 2>&1 | tee error.log        # 保存错误输出到文件

# 退出状态码
set -o pipefail                      # 管道中任一命令失败则整体失败
command1 | command2
echo "管道退出状态码: $?"            # 默认只看最后一个命令的退出码
```

### 命名管道（FIFO）

```bash
# 创建命名管道
mkfifo mypipe
# 或
mkfifo -m 644 mypipe

# 使用命名管道
# 终端 1：
cat > mypipe
# 终端 2：
cat < mypipe

# 或一次性
ls -la > mypipe &
cat < mypipe

# 删除
rm mypipe
```

### `tee` — 分流管道

```bash
command | tee output.txt             # 显示输出并保存到文件
command | tee -a output.txt          # 追加模式
command | tee file1.txt file2.txt    # 保存到多个文件
command | tee /dev/tty | grep pattern  # 显示所有输出，grep 处理匹配行
command | tee >(grep pattern > matches.txt)  # 进程替换
command 2>&1 | tee error.log         # 保存错误输出
```

---

## 三、进程替换

```bash
# 语法
<(command)                           # 将命令输出作为文件
>(command)                           # 将输入传递给命令

# 示例
diff <(ls dir1) <(ls dir2)           # 比较两个目录的内容
diff <(sort file1) <(sort file2)     # 比较排序后的文件

# 保存到多个命令
echo "data" | tee >(grep pattern > out1) >(wc -l > out2)
```

---

## 四、命令替换

```bash
# 旧语法（反引号）
files=`ls -la`

# 新语法（推荐）
files=$(ls -la)                      # 命令替换
result=$(ps aux | grep nginx)        # 可以嵌套

# 嵌套
result=$(echo $(date))
result=$(echo $(ls $(pwd)))

# 实际应用
current_dir=$(pwd)
timestamp=$(date +"%Y%m%d_%H%M%S")
backup_file="backup_${timestamp}.tar.gz"
```

---

## 五、信号处理

### `trap` — 捕获信号

```bash
# 语法
trap 'commands' SIGNAL...

# 常用信号
# SIGINT (2)  - Ctrl+C
# SIGTERM (15) - kill 命令默认信号
# SIGKILL (9) - 无法捕获
# SIGHUP (1)  - 挂起
# EXIT        - 脚本退出时
# ERR         - 命令失败时
# DEBUG       - 每行命令执行前

# 示例
# 清理临时文件
cleanup() {
    echo "清理临时文件..."
    rm -rf /tmp/temp_$$
    exit
}

trap cleanup EXIT                    # 脚本退出时执行 cleanup
trap cleanup SIGINT SIGTERM         # 收到中断信号时执行
trap 'echo "收到信号 $?"' ERR       # 命令失败时执行
trap 'echo "执行: $BASH_COMMAND"' DEBUG  # 每行执行前打印

# 忽略信号
trap '' SIGINT                       # 忽略 Ctrl+C
trap 'echo "不能退出"' SIGINT       # 不允许退出

# 恢复默认行为
trap - SIGINT                        # 恢复默认信号处理
```

### 信号应用

```bash
#!/bin/bash
# 确保只有一个实例运行
lockfile=/tmp/myscript.lock

if [ -f "$lockfile" ]; then
    echo "脚本已在运行"
    exit 1
fi

trap 'rm -f "$lockfile"; exit' EXIT SIGINT SIGTERM
echo $$ > "$lockfile"

# 主要逻辑
echo "任务执行中..."
sleep 30
echo "任务完成"
```

---

## 六、子 Shell 和代码块

### 子 Shell

```bash
# 在子 Shell 中执行（不会影响当前环境）
(cd /tmp && ls -la)                  # 在子 Shell 中切换目录
(cd /tmp; ls -la; echo "done")       # 多个命令

# 常用于临时改变环境
(IFS=','; read -r a b c <<< "1,2,3"; echo "$a $b $c")
```

### 代码块

```bash
# 在当前 Shell 中执行
{
    echo "Hello"
    cd /tmp
    ls -la
}                                    # 大括号内的命令在当前 Shell 执行

# 带重定向的代码块
{
    echo "在 1 号文件"
    echo "在 2 号文件"
} > output.txt

# 实际应用
if [ -f "$file" ]; then
    {
        echo "处理文件开始"
        process_file "$file"
        echo "处理文件结束"
    } >> "${logfile}"
fi
```

---

## 七、任务调度

### `crontab` 详细说明

crontab 的详细说明已在 [cron.md](./cron.md) 文件中，这里只做要点补充。

### `at` — 一次性任务调度

```bash
at 10:00                            # 在 10:00 执行任务
at now + 1 hour                     # 一小时后执行
at 10:00 tomorrow                   # 明天 10:00
at 10:00 2026-07-20                 # 指定日期和时间
at teatime                          # 下午 4 点
at midnight                         # 午夜

# 输入要执行的命令，然后 Ctrl+D 完成
at now + 1 minute
> echo "Hello" > /tmp/test.txt
> Ctrl+D

# 管理 at 任务
atq                                 # 列出待执行的任务
atrm 5                              # 删除编号为 5 的任务
at -c 5                             # 查看编号为 5 的任务内容

# 访问控制
/etc/at.allow                       # 允许使用 at 的用户
/etc/at.deny                        # 禁止使用 at 的用户
```

### `batch` — 系统负载低时执行

```bash
batch                               # 系统负载低于 0.8 时执行
# 然后输入命令，Ctrl+D 结束
atq                                 # 查看任务状态
```

---

## 八、`exec` 命令

```bash
# 替换当前 Shell 进程
exec ls -la                         # 执行 ls 后自动退出 Shell
exec /bin/bash                      # 替换为新的 Shell

# 重定向当前 Shell 的所有输出
exec > logfile.txt                  # 之后所有输出都写入文件
exec 2> error.log                   # 之后所有错误都写入文件
exec > /dev/null 2>&1               # 之后所有输出都丢弃

# 重定向当前 Shell 的输入
exec < input.txt                    # 之后从文件读取输入

# 实际应用
exec 3>&1                           # 保存 stdout 到 fd 3
exec > output.log                   # 重定向 stdout 到文件
echo "这条输出到日志文件"
exec 1>&3                           # 恢复 stdout
exec 3>&-                           # 关闭 fd 3
```

---

## 九、`eval` — 执行字符串命令

```bash
# 构造并执行命令
cmd="ls -la"
eval $cmd                            # 执行 ls -la

# 间接引用
name="John"
var_name="name"
eval echo \$$var_name                # 输出：John（不推荐，用 ${!var_name}）

# 动态生成变量
for i in {1..3}; do
    eval var_$i=$i
done
echo $var_1 $var_2 $var_3            # 输出：1 2 3
```

> ⚠️ `eval` 有安全风险，如果字符串来自不可信来源，可能导致命令注入。

---

## 十、`printf` — 格式化输出

```bash
# 基本用法
printf "Hello %s\n" "World"          # 输出：Hello World
printf "整数: %d, 浮点数: %.2f\n" 42 3.14159

# 宽度和对齐
printf "%-10s %5d\n" "Name" 100      # 左对齐，右对齐
printf "%-10s %5d\n" "Age" 25

# 进制输出
printf "十进制: %d, 八进制: %o, 十六进制: %x\n" 255 255 255
# 输出：十进制: 255, 八进制: 377, 十六进制: ff

# 颜色输出
printf "\033[31m红色\033[0m\n"       # 红色
printf "\033[32m绿色\033[0m\n"       # 绿色
printf "\033[33m黄色\033[0m\n"       # 黄色
```

---

## 十一、`mktemp` — 创建临时文件

```bash
# 创建临时文件
tmpfile=$(mktemp)                    # 创建临时文件
echo "临时数据" > "$tmpfile"
rm "$tmpfile"

# 创建临时目录
tmpdir=$(mktemp -d)
echo "临时目录: $tmpdir"

# 指定模板
tmpfile=$(mktemp /tmp/myscript_XXXXXX)  # X 会被随机字符替换
tmpfile=$(mktemp -t myscript)            # 系统默认位置

# 使用 -u 选项（不实际创建，仅生成名称）
tmpname=$(mktemp -u)
```

---

## 十二、`read` — 读取输入

```bash
# 读取用户输入
read -p "请输入名字: " name
echo "Hello, $name"

# 读取密码（不显示输入）
read -s -p "请输入密码: " password
echo

# 读取文件
while IFS= read -r line; do
    echo "行: $line"
done < file.txt

# 读取到数组
read -a array <<< "1 2 3 4 5"
echo ${array[0]}                     # 输出：1

# 设置超时
read -t 5 -p "5秒内输入: " input
if [ $? -ne 0 ]; then
    echo "超时"
fi

# 限制字符数
read -n 1 -p "按任意键继续..." key  # 只读一个字符

# 分隔符
IFS=',' read -r col1 col2 col3 <<< "a,b,c"
echo $col1 $col2 $col3               # 输出：a b c
```

---

## 十三、`shopt` — Shell 选项

```bash
# 查看所有选项
shopt                                # 显示所有选项状态

# 常用选项
shopt -s cdspell                    # cd 时自动纠正拼写错误
shopt -s autocd                     # 输入目录名自动 cd
shopt -s extglob                    # 启用扩展通配符
shopt -s checkwinsize              # 自动检查窗口大小变化
shopt -s globstar                   # ** 匹配任意层目录
shopt -s histappend                 # 历史命令追加到文件
shopt -s cmdhist                    # 多行命令保存为一条历史

# 启用/禁用
shopt -s option                     # 启用
shopt -u option                     # 禁用
```

### 扩展通配符（extglob）

```bash
# 启用后支持以下模式
?(pattern)                          # 匹配 0 或 1 次
*(pattern)                          # 匹配 0 或多次
+(pattern)                          # 匹配 1 或多次
@(pattern)                          # 匹配 1 次
!(pattern)                          # 不匹配

# 示例
ls !(*.txt)                         # 列出所有非 .txt 文件
ls +(abc|def)*                      # 以 abc 或 def 开头的文件
ls file?(1|2).txt                   # 匹配 file.txt, file1.txt, file2.txt
```

---

## 十四、`coproc` — 协进程

```bash
# 启动协进程
coproc MYPROC { command; }

# 与协进程通信
coproc bc                            # 启动 bc 计算器
echo "10 + 20" >&${COPROC[1]}       # 发送输入
read -u ${COPROC[0]} result         # 读取输出
echo $result                         # 输出：30
```

---

## 十五、调试和安全最佳实践

### 脚本安全

```bash
# 严格模式
set -euo pipefail                    # 推荐在脚本开头加入

# 安全地使用临时文件
tmpfile=$(mktemp) || exit 1
trap 'rm -f "$tmpfile"' EXIT

# 避免竞态条件
if mkdir /tmp/mylock 2>/dev/null; then
    echo "获取锁成功"
    # 执行任务
    rmdir /tmp/mylock
else
    echo "脚本已在运行"
    exit 1
fi

# 命令注入防护
# 不要这样做：
eval "rm $user_input"                # 危险！

# 应该这样做：
filename=$(basename "$user_input")   # 清理输入
rm -f "$filename"                    # 使用引号包裹
```

### 性能优化

```bash
# 使用内置命令代替外部命令
[[ $a == $b ]]                       # 比 [ "$a" = "$b" ] 快
${var#pattern}                       # 比 sed 或 awk 快
${var/old/new}                       # 比 sed 快

# 减少管道和子进程
# 慢：
cat file | grep pattern | awk '{print $1}'
# 快：
awk '/pattern/ {print $1}' file

# 并行处理
for i in {1..10}; do
    process_file "$i" &              # 后台运行
done
wait                                 # 等待所有完成
```