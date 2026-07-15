---
order: 11
---

# Shell 脚本入门

Shell 脚本是将 Linux 命令组合成自动化任务的语言。掌握它就能让重复工作自动化。

## 第一个脚本

创建一个 `hello.sh` 文件：

```bash
#!/bin/bash
# 这是我的第一个脚本

echo "Hello, World!"
echo "当前用户: $USER"
echo "当前目录: $(pwd)"
```

- `#!/bin/bash` — shebang，告诉系统用哪个解释器
- `#` — 注释
- `$USER` — 变量引用
- `$(pwd)` — 命令替换

执行脚本：

```bash
chmod +x hello.sh
./hello.sh
```

## 变量

```bash
#!/bin/bash

# 变量赋值（等号两边不能有空格）
name="张三"
age=25

# 使用变量
echo "我叫 $name，今年 $age 岁"
echo "我的名字是 ${name} 同志"   # 花括号明确边界

# 只读变量
readonly PI=3.14159

# 删除变量
unset name
```

### 变量类型

```bash
# 字符串
str="hello"
str2='world'          # 单引号不解析变量
echo '$str $str2'     # 输出: $str $str2

# 数字（shell 中所有变量本质都是字符串）
num=42
echo $((num + 8))     # 算术运算: 50

# 数组
files=("a.txt" "b.txt" "c.txt")
echo ${files[0]}      # a.txt
echo ${files[@]}      # 所有元素
echo ${#files[@]}     # 数组长度
```

## 特殊变量

```bash
#!/bin/bash
echo "脚本名: $0"
echo "参数个数: $#"
echo "所有参数: $@"
echo "第一个参数: $1"
echo "第二个参数: $2"
echo "退出状态码: $?"
```

使用方式：`./script.sh arg1 arg2`

## 条件判断

### if 语句

```bash
#!/bin/bash

# 数值比较
num=10
if [ $num -gt 5 ]; then
    echo "大于5"
elif [ $num -eq 10 ]; then
    echo "等于10"
else
    echo "其他"
fi
```

数值比较符：`-eq`, `-ne`, `-gt`, `-ge`, `-lt`, `-le`

```bash
# 字符串比较
name="zhang"
if [ "$name" = "zhang" ]; then
    echo "匹配"
fi
# 字符串运算符: =, !=, -z (空), -n (非空)
```

```bash
# 文件判断
if [ -f "/etc/passwd" ]; then
    echo "文件存在"
fi
if [ -d "/home" ]; then
    echo "目录存在"
fi
```

常用文件判断：`-f` 文件存在, `-d` 目录存在, `-e` 存在, `-r` 可读, `-w` 可写, `-x` 可执行, `-s` 非空

### test 和 [[]]

```bash
# test 等价于 []
test -f /etc/passwd && echo "exists"

# [[]] 是 bash 扩展，更强大
if [[ "$name" == zh* ]]; then    # 支持模式匹配
    echo "以 zh 开头"
fi
```

## 循环

### for 循环

```bash
#!/bin/bash

# 遍历列表
for fruit in apple banana orange; do
    echo "I like $fruit"
done

# 遍历文件
for file in *.txt; do
    echo "处理文件: $file"
    wc -l "$file"
done

# C 风格
for ((i=1; i<=5; i++)); do
    echo "第 $i 次"
done

# 遍历命令输出
for user in $(cut -d: -f1 /etc/passwd); do
    echo "用户: $user"
done
```

### while 循环

```bash
#!/bin/bash

# 计数
count=1
while [ $count -le 5 ]; do
    echo "计数: $count"
    count=$((count + 1))
done

# 读取文件逐行处理
while read -r line; do
    echo "行: $line"
done < /etc/hosts

# 无限循环
while true; do
    echo "按 Ctrl+C 退出"
    sleep 1
done
```

## 函数

```bash
#!/bin/bash

# 定义函数
hello() {
    local name=$1        # local 声明局部变量
    echo "Hello, $name!"
}

# 带返回值的函数
add() {
    local sum=$(( $1 + $2 ))
    echo $sum            # 通过 echo 返回
    return 0             # 返回状态码
}

# 调用函数
hello "World"
result=$(add 3 5)
echo "3 + 5 = $result"
```

## 实战：备份脚本

```bash
#!/bin/bash

# 使用说明
if [ $# -lt 1 ]; then
    echo "用法: $0 <源目录> [目标目录]"
    exit 1
fi

src_dir=$1
backup_dir=${2:-./backup}     # 默认备份到 ./backup
timestamp=$(date +%Y%m%d_%H%M%S)
backup_file="$backup_dir/backup_$timestamp.tar.gz"

# 检查源目录
if [ ! -d "$src_dir" ]; then
    echo "错误: $src_dir 不存在"
    exit 1
fi

# 创建备份目录
mkdir -p "$backup_dir"

# 打包压缩
echo "备份中: $src_dir -> $backup_file"
tar -czf "$backup_file" "$src_dir"

if [ $? -eq 0 ]; then
    echo "备份完成！大小: $(du -h $backup_file | cut -f1)"
else
    echo "备份失败！"
    exit 1
fi
```

## 调试技巧

```bash
# 调试执行
bash -x script.sh              # 显示每行命令的执行过程

# 脚本中开启调试
set -x                         # 开始调试
set +x                         # 结束调试
set -e                         # 出错时立即退出
```

## 本章小结

```bash
#!/bin/bash                    # Shebang
variable="value"               # 变量赋值
$variable / ${variable}        # 变量引用
$(command) / `command`         # 命令替换
$((expression))                # 算术运算
[ condition ] / [[ condition ]]  # 条件判断
```

| 构造 | 语法 |
|------|------|
| if | `if [ cond ]; then ... fi` |
| for | `for i in list; do ... done` |
| while | `while [ cond ]; do ... done` |
| 函数 | `func() { ... }` |
| case | `case $var in pattern) ... ;; esac` |

## 练习

1. 写一个脚本，接受一个目录名参数，列出该目录下所有文件及其大小
2. 写一个脚本，统计 `/etc` 下不同后缀文件的数量
3. 写一个循环，ping 多个 IP 地址，输出每个地址的连通状态
4. 写一个函数 `log()`，接受消息作为参数，输出带时间戳的日志
5. 将本讲备份脚本保存为 `backup.sh`，用来备份一个目录
