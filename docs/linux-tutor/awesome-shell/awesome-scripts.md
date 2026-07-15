---
index: 4
---
# 实用 Shell 脚本合集

> 精选日常运维中常用的 Shell 脚本，涵盖日志管理、网络监控、系统巡检、文件处理等场景。

## 一、日志管理

### 1. 定时清空文件内容

每小时执行一次，当时间为 0 点或 12 点时清空目标目录下所有文件内容，其他时间记录文件大小：

```bash
#!/bin/bash
# 用法: 配合 crontab 每小时执行一次
logfile=/tmp/$(date +%H-%F).log
hour=$(date +%H)

if [ "$hour" -eq 00 ] || [ "$hour" -eq 12 ]; then
    # 清空所有文件内容
    for file in $(find /data/log/ -type f); do
        true > "$file"
    done
else
    # 记录文件大小
    for file in $(find /data/log/ -type f); do
        du -sh "$file" >> "$logfile"
    done
fi
```

### 2. 监测 Nginx 502 错误并自动恢复

```bash
#!/bin/bash
# 监测 Nginx 访问日志，发现大量 502 错误时自动重启 php-fpm
log=/data/log/access.log
threshold=30  # 300 条日志中 502 数量阈值

while :; do
    # 查看最近 300 条日志，统计 502 数量
    err_count=$(tail -n 300 "$log" | grep -c '502" ')
    if [ "$err_count" -ge "$threshold" ]; then
        /etc/init.d/php-fpm restart 2>/dev/null
        sleep 60  # 防止频繁重启
    fi
    sleep 10
done
```

### 3. 日志自动清理（保留最近 N 天）

```bash
#!/bin/bash
# 清理指定目录下 N 天前的日志文件
log_dir="/var/log/nginx"
retention_days=30

find "$log_dir" -name "*.log" -type f -mtime +$retention_days -exec rm -f {} \;
echo "[$(date)] 清理完成，已删除 $retention_days 天前的日志" >> /var/log/cleanup.log
```

## 二、网络监控

### 4. 检测网卡流量并记录

```bash
#!/bin/bash
# 每分钟检测网卡流量并记录到日志
interface="eth0"

while :; do
    LANG=en
    logfile="/tmp/$(date +%d).log"
    exec >> "$logfile"
    date +"%F %H:%M"

    # sar 统计流量，单位 kb/s，转换为 bps
    sar -n DEV 1 59 | grep Average | grep "$interface" | \
        awk '{print $2,"\tinput:\t",$5*1000*8,"bps","\n",$2,"\toutput:\t",$6*1000*8,"bps"}'
    echo "####################"
    # sar 执行需要 59 秒，因此无需 sleep
done
```

### 5. 批量测试服务器连通性

```bash
#!/bin/bash
# 测试多个服务器是否在线
servers=("192.168.1.1" "192.168.1.2" "192.168.1.3" "8.8.8.8")

for server in "${servers[@]}"; do
    if ping -c 2 -W 3 "$server" &>/dev/null; then
        echo "✅ $server 可达"
    else
        echo "❌ $server 不可达"
    fi
done
```

### 6. 检测端口是否开放

```bash
#!/bin/bash
# 检查远程主机端口是否开放
host="192.168.1.100"
ports=(22 80 443 3306 6379)

for port in "${ports[@]}"; do
    timeout 3 bash -c "echo >/dev/tcp/$host/$port" 2>/dev/null && \
        echo "✅ $host:$port 开放" || \
        echo "❌ $host:$port 关闭"
done
```

## 三、系统巡检

### 7. 服务器系统信息收集

```bash
#!/bin/bash
# 收集服务器基本信息
echo "========== 系统信息 =========="
echo "主机名: $(hostname)"
echo "系统: $(uname -a)"
echo "CPU: $(nproc) 核"
echo "内存: $(free -h | awk '/Mem:/ {print $3 "/" $2}')"
echo "磁盘: $(df -h / | awk 'NR==2 {print $3 "/" $2 " (" $5 ")"}')"
echo "运行时间: $(uptime | awk '{print $3,$4}' | tr -d ',')"
echo "负载: $(uptime | awk -F'load average:' '{print $2}')"
echo "IP: $(hostname -I | awk '{print $1}')"
```

### 8. 查找消耗资源最多的进程

```bash
#!/bin/bash
# 查找 CPU 和内存使用率最高的进程
echo "=== CPU 占用 TOP 5 ==="
ps aux --sort=-%cpu | head -6

echo ""
echo "=== 内存占用 TOP 5 ==="
ps aux --sort=-%mem | head -6
```

### 9. 检测磁盘空间并发送告警

```bash
#!/bin/bash
# 检测磁盘使用率，超过阈值则告警
threshold=85
alert_email="admin@example.com"

df -h | grep -v tmpfs | grep -v loop | while read line; do
    usage=$(echo "$line" | awk '{print $5}' | tr -d '%')
    mount=$(echo "$line" | awk '{print $6}')
    if [ "$usage" -ge "$threshold" ] 2>/dev/null; then
        echo "⚠️  $mount 使用率已达 ${usage}%" | mail -s "磁盘告警: $mount" "$alert_email"
    fi
done
```

## 四、文件处理

### 10. 批量重命名文件

```bash
#!/bin/bash
# 将 article_ 前缀改为 bbs_ 前缀
for file in article_*.html; do
    mv "$file" "bbs_${file#article_}"
done
```

### 11. 批量替换文件内容

```bash
#!/bin/bash
# 递归替换所有 .conf 文件中的 old_ip 为 new_ip
old_ip="192.168.1.100"
new_ip="192.168.1.200"

find /etc -name "*.conf" -type f -exec sed -i "s/$old_ip/$new_ip/g" {} +
echo "替换完成"
```

### 12. 计算文档中数字总数

```bash
#!/bin/bash
# 计算文档每行出现的数字个数，并统计总数
input_file="a.txt"
total_lines=$(wc -l < "$input_file")
total_sum=0

for ((i=1; i<=total_lines; i++)); do
    line=$(sed -n "${i}p" "$input_file")
    digit_count=$(echo "$line" | sed 's/[^0-9]//g' | wc -L)
    echo "第 $i 行: $digit_count 个数字"
    total_sum=$((total_sum + digit_count))
done

echo "数字总数: $total_sum"
```

### 13. 查找并删除空文件

```bash
#!/bin/bash
# 删除当前目录下所有空文件
find . -type f -empty -delete
echo "空文件已删除"

# 删除空目录
find . -type d -empty -delete
echo "空目录已删除"
```

## 五、进程管理

### 14. 杀死指定名称的所有进程

```bash
#!/bin/bash
# 杀死所有匹配名称的进程
process_name="defunct_process"

ps aux | grep "$process_name" | grep -v grep | awk '{print $2}' | xargs kill -9
echo "已杀死所有 $process_name 进程"
```

### 15. 监控进程是否存在

```bash
#!/bin/bash
# 监控进程是否存在，不存在则重启
process="nginx"
restart_cmd="/usr/local/nginx/sbin/nginx"

if ! pgrep -x "$process" >/dev/null; then
    echo "$(date) $process 已宕机，正在重启..." >> /var/log/process_monitor.log
    $restart_cmd
fi
```

## 六、数据库

### 16. MySQL 数据库备份

```bash
#!/bin/bash
# 备份 MySQL 数据库，保留最近 7 天
db_user="root"
db_pass="your_password"
db_name="your_database"
backup_dir="/backup/mysql"
date_str=$(date +%Y%m%d_%H%M%S)

mkdir -p "$backup_dir"
mysqldump -u"$db_user" -p"$db_pass" "$db_name" | gzip > "$backup_dir/${db_name}_${date_str}.sql.gz"

# 删除 7 天前的备份
find "$backup_dir" -name "*.sql.gz" -mtime +7 -delete
echo "备份完成: ${backup_dir}/${db_name}_${date_str}.sql.gz"
```

### 17. 从 FTP 服务器下载文件

```bash
#!/bin/bash
# 从 FTP 服务器下载指定文件
if [ $# -ne 1 ]; then
    echo "Usage: $0 filename"
    exit 1
fi

dir=$(dirname "$1")
file=$(basename "$1")

ftp -n -v << EOF
open 192.168.1.10
user admin password
binary
cd $dir
get "$file"
EOF
```

## 七、交互式脚本

### 18. 用户猜数字游戏

```bash
#!/bin/bash
# 生成一个 1-100 的随机数，用户猜数字
target=$((RANDOM % 100 + 1))

while :; do
    read -p "请输入 1-100 之间的数字: " guess
    if [ "$guess" -eq "$target" ]; then
        echo "🎉 恭喜，猜对了！"
        exit 0
    elif [ "$guess" -gt "$target" ]; then
        echo "📈 猜大了"
    else
        echo "📉 猜小了"
    fi
done
```

### 19. 连续输入数字并统计

```bash
#!/bin/bash
# 连续输入 5 个数字，统计和、最小、最大
count=1
sum=0
min=0
max=100

while [ "$count" -le 5 ]; do
    read -p "请输入第 $count 个整数（1-100）: " num
    if [[ ! "$num" =~ ^[0-9]+$ ]]; then
        echo "输入必须是整数！"
        exit 1
    elif [ "$num" -gt 100 ]; then
        echo "输入必须是 100 以内！"
        exit 1
    fi

    sum=$((sum + num))
    [ "$min" -lt "$num" ] && min=$num
    [ "$max" -gt "$num" ] && max=$num
    count=$((count + 1))
done

echo "总和: $sum"
echo "最小: $min"
echo "最大: $max"
```

## 八、将结果赋值给变量

### 方法 1：使用 eval

```bash
for i in $(echo "4 5 6"); do
    eval a$i=$i
done
echo $a4 $a5 $a6
```

### 方法 2：拆分位置参数

```bash
num=0
for i in $(eval echo "$*"); do
    let num+=1
    eval node${num}="$i"
done
echo $node1 $node2 $node3
# 执行: bash script.sh 192.168.1.1{1,2}
# 输出: 192.168.1.11 192.168.1.12
```

### 方法 3：使用数组

```bash
arr=(4 5 6)
index1=${arr[0]}
index2=${arr[1]}
index3=${arr[2]}
echo $index1 $index2 $index3
```