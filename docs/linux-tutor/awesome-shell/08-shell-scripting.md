---
index: 8
---
# Shell 脚本编程

## 一、脚本基础

### 脚本结构

```bash
#!/bin/bash
# -*- coding: utf-8 -*-
# 脚本说明：这是一个示例脚本
# 作者：Your Name
# 日期：2026-07-15

# 自定义函数
function hello() {
    echo "Hello, $1!"
}

# 主函数
main() {
    hello "World"
}

# 执行主函数
main "$@"
```

### 创建和执行脚本

```bash
# 创建脚本
echo '#!/bin/bash' > script.sh
echo 'echo "Hello World"' >> script.sh

# 添加执行权限
chmod +x script.sh

# 执行方式
./script.sh                          # 方式 1：需要执行权限
bash script.sh                       # 方式 2：作为参数传给 bash
source script.sh                     # 方式 3：在当前 Shell 执行（不创建子进程）
. script.sh                          # 方式 4：同 source（. 是 source 的简写）
```

---

## 二、变量

### 变量定义和使用

```bash
# 变量定义（= 两边不能有空格）
name="John"
age=25
PI=3.14159

# 使用变量
echo $name                           # 输出：John
echo ${name}                         # 推荐写法（花括号明确边界）
echo "My name is $name"              # 双引号中会解析变量
echo 'My name is $name'              # 单引号中不会解析变量（输出：$name）

# 只读变量
readonly PI=3.14159
# PI=3.14  # 会报错：readonly variable

# 删除变量
unset name                           # 删除变量（不能删除 readonly 变量）
```

### 变量命名规则

- 只能包含字母、数字和下划线
- 不能以数字开头
- 区分大小写（`NAME` 和 `name` 不同）
- 避免使用系统保留变量名

### 变量类型

- **字符串**：默认类型，所有变量都是字符串
- **整数**：通过 `declare -i` 声明
- **数组**：普通数组和关联数组
- **只读变量**：通过 `readonly` 声明
- **环境变量**：通过 `export` 导出

```bash
# 整数变量
declare -i num=10
num=num+5                            # 自动算术运算
echo $num                            # 输出：15

# 环境变量
export MY_VAR="hello"                # 导出为环境变量（子进程可访问）
```

### 特殊变量

| 变量 | 说明 |
|------|------|
| `$0` | 脚本名称 |
| `$1` ~ `$9` | 第 1 到第 9 个位置参数 |
| `$10` | 第 10 个位置参数（需用 `${10}`）|
| `$#` | 位置参数个数 |
| `$*` | 所有参数（作为一个字符串）|
| `$@` | 所有参数（作为多个字符串）|
| `$?` | 上一条命令的退出状态码（0 成功，非 0 失败）|
| `$$` | 当前脚本的 PID |
| `$!` | 最后一个后台进程的 PID |
| `$-` | 当前 Shell 的选项标志 |
| `$_` | 上一个命令的最后一个参数 |

```bash
#!/bin/bash
echo "脚本名: $0"
echo "参数个数: $#"
echo "所有参数: $*"
echo "所有参数: $@"
echo "第一个参数: $1"
echo "第二个参数: $2"
echo "脚本 PID: $$"
echo "退出状态码: $?"
```

### 位置参数操作

```bash
shift                                # 左移参数（$2 变成 $1）
shift 2                              # 左移 2 个位置
set -- arg1 arg2 arg3                # 重新设置位置参数
```

### 默认值

```bash
# 变量替换
${var:-default}                      # 如果 var 未设置或为空，使用 default
${var:=default}                      # 如果 var 未设置或为空，赋值为 default
${var:?error_msg}                    # 如果 var 未设置或为空，输出错误
${var:+replacement}                  # 如果 var 已设置，使用 replacement

# 示例
echo ${name:-"World"}                # 如果 name 未设置，输出 "World"
echo ${name:="John"}                 # 如果 name 未设置，设置为 "John"
: ${name:="John"}                    # 安全的赋值方式（不输出）
echo ${name:?"name is required"}     # 如果未设置，输出错误
```

### 字符串操作

```bash
str="Hello World"

# 长度
echo ${#str}                         # 输出：11

# 截取
echo ${str:0:5}                      # 输出：Hello（从 0 开始取 5 个字符）
echo ${str:6}                        # 输出：World（从 6 开始到末尾）
echo ${str: -5}                      # 输出：World（从末尾取 5 个）

# 删除匹配
echo ${str#He*}                       # 删除最短匹配前缀：llo World
echo ${str##H*o}                      # 删除最长匹配前缀：rld
echo ${str%W*d}                      # 删除最短匹配后缀：Hello
echo ${str%%W*d}                     # 删除最长匹配后缀：Hello

# 替换
echo ${str/World/Linux}              # 替换第一个匹配：Hello Linux
echo ${str//l/L}                     # 替换所有匹配：HeLLo WorLd
echo ${str/#Hello/Hi}                # 替换开头匹配：Hi World
echo ${str/%World/Everyone}          # 替换结尾匹配：Hello Everyone

# 大小写转换
echo ${str,,}                        # 全部小写：hello world
echo ${str^^}                        # 全部大写：HELLO WORLD
echo ${str,}                         # 首字母小写：hello World
echo ${str^}                         # 首字母大写：Hello World

# 判断变量是否存在
echo ${str:+exists}                  # 存在则输出 "exists"
```

### 数组

```bash
# 普通数组（索引数组）
arr=("apple" "banana" "cherry")      # 定义数组
arr[0]="apple"                       # 逐个赋值
arr+="date"                          # 追加元素

echo ${arr[0]}                       # 输出第一个元素：apple
echo ${arr[-1]}                      # 输出最后一个元素：cherry
echo ${arr[@]}                       # 输出所有元素
echo ${arr[*]}                       # 输出所有元素
echo ${#arr[@]}                      # 数组长度
echo ${!arr[@]}                      # 所有索引

# 遍历数组
for i in "${arr[@]}"; do
    echo "$i"
done

# 关联数组（需要 Bash 4+）
declare -A map
map["name"]="John"
map["age"]=25
echo ${map["name"]}                  # 输出：John
echo ${!map[@]}                      # 输出所有键
echo ${map[@]}                       # 输出所有值
```

---

## 三、算术运算

```bash
# 方法 1：$((...))
a=$((1 + 2))
b=$((a * 3))
c=$((2 ** 10))                       # 2 的 10 次方
d=$(( (a + b) * 2 ))
e=$((a > b ? a : b))                 # 三目运算符

# 方法 2：let
let a=1+2
let a+=5
let a*=2

# 方法 3：expr
a=$(expr 1 + 2)                      # 注意：运算符两边必须有空格
# 方法 4：bc（浮点数）
echo "scale=2; 10 / 3" | bc          # 输出：3.33
echo "sqrt(100)" | bc                # 输出：10
echo "2^10" | bc                     # 输出：1024

# 操作符
# +, -, *, /, %, **（幂运算）
# +=, -=, *=, /=, %= （赋值运算）
# ++, -- （递增递减）
# 注意：* 在 $((...)) 中不需要转义
```

---

## 四、条件判断

### `test` 命令和 `[ ]`

```bash
# 文件测试
[ -f "$file" ]                       # 是否为普通文件
[ -d "$dir" ]                        # 是否为目录
[ -e "$path" ]                       # 是否存在
[ -s "$file" ]                       # 文件大小 > 0
[ -r "$file" ]                       # 是否可读
[ -w "$file" ]                       # 是否可写
[ -x "$file" ]                       # 是否可执行
[ -L "$file" ]                       # 是否为符号链接
[ -c "$file" ]                       # 是否为字符设备
[ -b "$file" ]                       # 是否为块设备
[ -N "$file" ]                       # 文件是否上次读取后被修改过
[ -O "$file" ]                       # 是否当前用户所有
[ -G "$file" ]                       # 是否当前用户组所有
[ file1 -nt file2 ]                  # file1 是否比 file2 新
[ file1 -ot file2 ]                  # file1 是否比 file2 旧
[ file1 -ef file2 ]                  # 是否指向同一个 inode

# 字符串测试
[ -z "$str" ]                        # 字符串是否为空（长度 0）
[ -n "$str" ]                        # 字符串是否非空
[ "$str1" = "$str2" ]               # 字符串是否相等
[ "$str1" == "$str2" ]              # 同上（bash 扩展）
[ "$str1" != "$str2" ]              # 字符串是否不等
[ "$str1" < "$str2" ]               # 字典序小于
[ "$str1" > "$str2" ]               # 字典序大于

# 整数比较
[ "$a" -eq "$b" ]                    # 等于
[ "$a" -ne "$b" ]                    # 不等于
[ "$a" -gt "$b" ]                    # 大于
[ "$a" -ge "$b" ]                    # 大于等于
[ "$a" -lt "$b" ]                    # 小于
[ "$a" -le "$b" ]                    # 小于等于

# 逻辑运算符
[ "$a" -gt 0 -a "$a" -lt 10 ]       # 与（-a）
[ "$a" -gt 0 -o "$a" -lt -10 ]      # 或（-o）
[ ! "$a" -gt 0 ]                     # 非（!）
```

### `[[ ]]` — 改进的条件测试（推荐）

```bash
# 支持正则
[[ "$str" =~ ^[0-9]+$ ]]            # 匹配正则：是否全为数字
[[ "$str" =~ ^[a-zA-Z]+$ ]]         # 匹配正则：是否全为字母
[[ "$str" =~ ^[0-9]{3,5}$ ]]        # 3-5 位数字

# 模式匹配
[[ "$str" == *.txt ]]               # 是否为 .txt 结尾
[[ "$str" == [a-z]* ]]              # 是否以小写字母开头

# 逻辑运算符（更直观）
[[ $a -gt 0 && $a -lt 10 ]]         # 与（&&）
[[ $a -gt 0 || $a -lt -10 ]]        # 或（||）
[[ ! $a -gt 0 ]]                     # 非（!）

# 在 [[ ]] 中，变量不需要加引号（安全）
[[ $a > 0 ]]                         # 可以直接使用 > <
```

### `if` 语句

```bash
# 基本语法
if [ condition ]; then
    commands
fi

# if-else
if [ condition ]; then
    commands
else
    commands
fi

# if-elif-else
if [ condition1 ]; then
    commands1
elif [ condition2 ]; then
    commands2
else
    commands3
fi

# 示例
if [ -f "$file" ]; then
    echo "$file 存在"
elif [ -d "$file" ]; then
    echo "$file 是目录"
else
    echo "$file 不存在"
fi

# 一行写法
[[ $a -gt 0 ]] && echo "positive"    # 如果条件为真，执行
[[ $a -gt 0 ]] || echo "not positive" # 如果条件为假，执行
```

### `case` 语句

```bash
case $var in
    pattern1)
        commands1
        ;;
    pattern2|pattern3)
        commands2
        ;;
    [0-9])
        echo "单个数字"
        ;;
    *)
        echo "默认情况"
        ;;
esac

# 示例
case $1 in
    start|s)
        systemctl start nginx
        ;;
    stop|t)
        systemctl stop nginx
        ;;
    restart|r)
        systemctl restart nginx
        ;;
    status|st)
        systemctl status nginx
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac
```

---

## 五、循环

### `for` 循环

```bash
# 遍历列表
for i in 1 2 3 4 5; do
    echo $i
done

# 遍历数组
arr=("apple" "banana" "cherry")
for fruit in "${arr[@]}"; do
    echo $fruit
done

# C 风格
for ((i=0; i<10; i++)); do
    echo $i
done

# 遍历文件
for file in *.txt; do
    echo "处理文件: $file"
done

# 遍历命令输出
for user in $(cut -d: -f1 /etc/passwd); do
    echo "用户: $user"
done

# 带序列
for i in {1..10}; do
    echo $i
done
for i in {1..10..2}; do               # 步长为 2
    echo $i
done
```

### `while` 循环

```bash
# 基本语法
i=0
while [ $i -lt 10 ]; do
    echo $i
    i=$((i + 1))
done

# 读取文件
while IFS= read -r line; do
    echo "行: $line"
done < file.txt

# 读取 CSV
while IFS=',' read -r col1 col2 col3; do
    echo "列1: $col1, 列2: $col2, 列3: $col3"
done < data.csv

# 无限循环
while true; do
    echo "按 Ctrl+C 退出"
    sleep 1
done

# 监控命令输出
while ! ping -c 1 google.com &>/dev/null; do
    echo "等待网络连接..."
    sleep 2
done
echo "网络已连接"
```

### `until` 循环

```bash
# 条件为真时退出（与 while 相反）
i=0
until [ $i -ge 10 ]; do
    echo $i
    i=$((i + 1))
done

# 等待服务启动
until systemctl is-active --quiet nginx; do
    echo "等待 nginx 启动..."
    sleep 2
done
echo "nginx 已启动"
```

### 循环控制

```bash
break                               # 跳出循环
break n                             # 跳出 n 层循环
continue                            # 跳过当前迭代，继续下一次
continue n                          # 跳过 n 层循环的当前迭代

# 示例
for i in {1..10}; do
    if [ $i -eq 5 ]; then
        break                       # i=5 时跳出循环
    fi
    echo $i
done

for i in {1..10}; do
    if [ $i -eq 5 ]; then
        continue                    # 跳过 i=5
    fi
    echo $i
done
```

---

## 六、函数

### 定义和调用

```bash
# 方式 1
function name() {
    commands
}

# 方式 2（推荐）
name() {
    commands
}

# 调用
name
name arg1 arg2
```

### 参数和返回值

```bash
# 函数参数
greet() {
    local name=$1
    local greeting=${2:-"Hello"}     # 默认值
    echo "$greeting, $name!"
}

greet "John"                         # 输出：Hello, John!
greet "John" "Hi"                    # 输出：Hi, John!

# 返回值（0-255）
is_even() {
    local num=$1
    return $((num % 2 == 0 ? 0 : 1))
}

if is_even 4; then
    echo "4 是偶数"
fi

# 获取输出（字符串返回）
get_name() {
    echo "John Doe"
}

name=$(get_name)
echo $name                           # 输出：John Doe
```

### 局部变量

```bash
myfunc() {
    local local_var="只能在函数内访问"
    global_var="可以在任何地方访问"   # 不加 local 就是全局变量
    echo $local_var
}
```

### 函数库

```bash
# utils.sh - 函数库文件
# 包含于：source ./utils.sh

log_info() {
    echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_error() {
    echo "[ERROR] $(date '+%Y-%m-%d %H:%M:%S') - $1" >&2
}

die() {
    log_error "$1"
    exit 1
}

# 使用函数库
source ./utils.sh
log_info "Script started"
log_error "Something went wrong"
```

---

## 七、脚本调试

### 调试方法

```bash
# 1. 运行时调试
bash -x script.sh                    # 显示每条命令的执行过程
bash -v script.sh                    # 显示原始脚本内容
bash -n script.sh                    # 语法检查（不执行）

# 2. 脚本内启用调试
#!/bin/bash -x                       # 在 shebang 中启用
set -x                               # 启用调试
set +x                               # 关闭调试

# 3. 断点调试
trap 'echo "Line $LINENO: $BASH_COMMAND"' DEBUG  # 每行执行前打印
```

### 常用调试技巧

```bash
# 严格模式
set -e                               # 遇到错误立即退出
set -u                               # 使用未定义变量时报错
set -o pipefail                      # 管道中任一命令失败则整体失败
set -euo pipefail                    # 严格模式（推荐在脚本开头使用）

# 检查变量
echo "Variable: ${var@Q}"            # 显示变量的引用形式
echo "Variable: ${var@A}"            # 显示变量的声明形式

# 打印调试信息
PS4='+ ${BASH_SOURCE}:${LINENO}:${FUNCNAME[0]:+${FUNCNAME[0]}:}'  # 自定义调试前缀
```

### 错误处理

```bash
# 检查命令执行结果
if ! command; then
    echo "命令执行失败"
    exit 1
fi

# 或使用逻辑运算符
command || { echo "失败"; exit 1; }

# 使用 trap 捕获错误
trap 'echo "Error on line $LINENO"; exit 1' ERR
trap 'echo "Script interrupted"; cleanup; exit' INT TERM
trap 'echo "Script exited"; cleanup' EXIT

# 清理函数
cleanup() {
    echo "清理临时文件..."
    rm -rf /tmp/temp_$$
}

trap cleanup EXIT
```

---

## 八、Shell 脚本模板

### 标准模板

```bash
#!/usr/bin/env bash
# -*- coding: utf-8 -*-
#
# 脚本名称: script.sh
# 描述: 脚本功能的简要描述
# 用法: ./script.sh [选项] [参数]
# 作者: Your Name
# 日期: 2026-07-15
# 版本: 1.0.0

set -euo pipefail                    # 严格模式
IFS=$'\n\t'                          # 安全的分隔符（仅换行和制表符）

# 颜色定义
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[0;33m'
readonly NC='\033[0m'               # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $(date '+%H:%M:%S') - $*"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $(date '+%H:%M:%S') - $*"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $(date '+%H:%M:%S') - $*" >&2
}

# 使用说明
usage() {
    cat <<EOF
用法: $(basename "$0") [选项] [参数]

选项:
    -h, --help      显示此帮助信息
    -v, --verbose   详细输出
    -d, --debug     调试模式

示例:
    $(basename "$0") -v
EOF
    exit 0
}

# 参数解析
parse_args() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                usage
                ;;
            -v|--verbose)
                VERBOSE=true
                shift
                ;;
            -d|--debug)
                set -x
                shift
                ;;
            --)
                shift
                break
                ;;
            -*)
                log_error "未知选项: $1"
                usage
                ;;
            *)
                args+=("$1")
                shift
                ;;
        esac
    done
}

# 主函数
main() {
    local args=()
    local VERBOSE=false

    parse_args "$@"

    log_info "脚本开始执行"

    # 主要逻辑
    if [[ ${#args[@]} -gt 0 ]]; then
        log_info "参数: ${args[*]}"
    fi

    log_info "脚本执行完成"
}

# 执行主函数
main "$@"
```

### 使用 `getopts` 解析选项

```bash
#!/bin/bash

usage() {
    echo "用法: $0 [-h] [-v] [-o 输出文件] [输入文件]"
    exit 0
}

while getopts "hvo:" opt; do
    case $opt in
        h)
            usage
            ;;
        v)
            VERBOSE=true
            ;;
        o)
            OUTPUT_FILE="$OPTARG"
            ;;
        \?)
            echo "无效选项"
            usage
            ;;
    esac
done

shift $((OPTIND - 1))                # 移除已处理的选项
echo "剩余参数: $*"
```