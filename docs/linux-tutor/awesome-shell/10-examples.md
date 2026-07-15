---
index: 10
---
# 综合实战案例

## 案例 1：系统信息收集脚本

```bash
#!/bin/bash
# 系统信息收集脚本
# 收集系统基本信息并输出到文件

set -euo pipefail

output_file="system_info_$(date +%Y%m%d_%H%M%S).txt"

{
    echo "========================================="
    echo " 系统信息报告"
    echo " 生成时间: $(date)"
    echo "========================================="
    echo ""

    echo "--- 系统基本信息 ---"
    uname -a
    echo ""

    echo "--- CPU 信息 ---"
    echo "核心数: $(nproc)"
    echo "型号: $(lscpu | grep 'Model name' | cut -d: -f2 | xargs)"
    echo ""

    echo "--- 内存信息 ---"
    free -h
    echo ""

    echo "--- 磁盘使用 ---"
    df -h | grep -v tmpfs | grep -v loop
    echo ""

    echo "--- 网络接口 ---"
    ip addr show | grep -E "^[0-9]|inet " | grep -v "127.0.0.1"
    echo ""

    echo "--- 运行时间 ---"
    uptime
    echo ""

    echo "--- 当前登录用户 ---"
    who
    echo ""

    echo "--- 最近 10 条日志 ---"
    journalctl -n 10 --no-pager 2>/dev/null || echo "journalctl 不可用"
    echo ""

    echo "--- 监听端口 ---"
    ss -tlnp 2>/dev/null || netstat -tlnp 2>/dev/null || echo "无法获取"

} > "$output_file"

echo "系统信息已保存到: $output_file"
```

---

## 案例 2：日志分析脚本

```bash
#!/bin/bash
# Nginx 访问日志分析脚本

set -euo pipefail

logfile="${1:-/var/log/nginx/access.log}"

if [ ! -f "$logfile" ]; then
    echo "错误: 日志文件 $logfile 不存在"
    exit 1
fi

echo "========================================="
echo " Nginx 访问日志分析报告"
echo " 日志文件: $logfile"
echo "========================================="
echo ""

# 1. 总访问量
total_requests=$(wc -l < "$logfile")
echo "总访问次数: $total_requests"

# 2. 独立 IP 数量
unique_ips=$(awk '{print $1}' "$logfile" | sort -u | wc -l)
echo "独立 IP 数量: $unique_ips"

# 3. 访问最多的 10 个 IP
echo ""
echo "--- 访问最多的 10 个 IP ---"
awk '{print $1}' "$logfile" | sort | uniq -c | sort -rn | head -10

# 4. 访问最多的 10 个页面
echo ""
echo "--- 访问最多的 10 个页面 ---"
awk '{print $7}' "$logfile" | sort | uniq -c | sort -rn | head -10

# 5. HTTP 状态码分布
echo ""
echo "--- HTTP 状态码分布 ---"
awk '{print $9}' "$logfile" | sort | uniq -c | sort -rn

# 6. 404 错误最多的页面
echo ""
echo "--- 404 错误最多的页面 ---"
awk '$9 == 404 {print $7}' "$logfile" | sort | uniq -c | sort -rn | head -10

# 7. 每小时请求分布
echo ""
echo "--- 每小时请求分布 ---"
awk '{print $4}' "$logfile" | cut -d: -f2 | sort | uniq -c | sort -n

# 8. 流量统计
echo ""
echo "--- 总流量 ---"
awk '{sum += $10} END {printf "%.2f MB\n", sum/1024/1024}' "$logfile"
```

---

## 案例 3：数据库自动备份脚本

```bash
#!/bin/bash
# MySQL 数据库自动备份脚本
# 用法: ./backup_db.sh [数据库名]

set -euo pipefail

# 配置
DB_USER="root"
DB_PASS="your_password"
BACKUP_DIR="/var/backup/mysql"
RETENTION_DAYS=7
DATE=$(date +%Y%m%d_%H%M%S)

# 颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# 日志
log_info() {
    echo -e "${GREEN}[INFO]${NC} $(date '+%H:%M:%S') - $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $(date '+%H:%M:%S') - $1" >&2
}

# 检查依赖
if ! command -v mysqldump &>/dev/null; then
    log_error "mysqldump 未安装"
    exit 1
fi

# 创建备份目录
mkdir -p "$BACKUP_DIR"

# 获取要备份的数据库
if [ $# -ge 1 ]; then
    databases="$1"
else
    databases=$(mysql -u"$DB_USER" -p"$DB_PASS" -e "SHOW DATABASES;" 2>/dev/null \
        | grep -Ev "Database|information_schema|performance_schema|mysql|sys")
fi

# 备份函数
backup_db() {
    local db=$1
    local backup_file="${BACKUP_DIR}/${db}_${DATE}.sql.gz"

    log_info "开始备份数据库: $db"

    if mysqldump -u"$DB_USER" -p"$DB_PASS" \
        --single-transaction \
        --routines \
        --triggers \
        --events \
        "$db" 2>/dev/null | gzip > "$backup_file"; then

        local size=$(du -h "$backup_file" | cut -f1)
        log_info "备份完成: $backup_file ($size)"
    else
        log_error "备份失败: $db"
        return 1
    fi
}

# 主流程
log_info "开始数据库备份任务"

for db in $databases; do
    backup_db "$db"
done

# 清理旧备份
log_info "清理 ${RETENTION_DAYS} 天前的备份"
find "$BACKUP_DIR" -name "*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete

log_info "备份任务完成"

# 输出备份统计
echo ""
echo "备份目录: $BACKUP_DIR"
echo "总备份数: $(find "$BACKUP_DIR" -name '*.sql.gz' | wc -l)"
echo "总大小: $(du -sh "$BACKUP_DIR" | cut -f1)"
```

---

## 案例 4：服务器健康检查脚本

```bash
#!/bin/bash
# 服务器健康检查脚本
# 定期检查服务器运行状态，异常时发送告警

set -euo pipefail

# 配置
ALERT_EMAIL="admin@example.com"
LOAD_THRESHOLD=5.0
DISK_THRESHOLD=90
MEM_THRESHOLD=90
CHECK_INTERVAL=60

# 检查 CPU 负载
check_load() {
    local load=$(uptime | awk -F'load average:' '{print $2}' | cut -d, -f1 | xargs)
    local cores=$(nproc)
    local per_cpu_load=$(echo "$load / $cores" | bc -l)

    echo "当前负载: $load (共 $cores 核, 每核负载: $(printf "%.2f" $per_cpu_load))"

    if (( $(echo "$per_cpu_load > $LOAD_THRESHOLD" | bc -l) )); then
        return 1
    fi
    return 0
}

# 检查磁盘使用率
check_disk() {
    local issues=0
    echo "磁盘使用情况:"
    df -h | grep -v tmpfs | grep -v loop | while read line; do
        local usage=$(echo "$line" | awk '{print $5}' | tr -d '%')
        local mount=$(echo "$line" | awk '{print $6}')
        if [ "$usage" -ge "$DISK_THRESHOLD" ] 2>/dev/null; then
            echo "  ⚠️  $mount 使用率: ${usage}% (超过阈值 ${DISK_THRESHOLD}%)"
            issues=1
        else
            echo "  ✅ $mount 使用率: ${usage}%"
        fi
    done
    return $issues
}

# 检查内存使用率
check_memory() {
    local total=$(free -m | awk '/Mem:/ {print $2}')
    local used=$(free -m | awk '/Mem:/ {print $3}')
    local usage=$(echo "scale=2; $used * 100 / $total" | bc)

    echo "内存使用: ${usage}% (已用 ${used}MB / 总共 ${total}MB)"

    if (( $(echo "$usage > $MEM_THRESHOLD" | bc -l) )); then
        return 1
    fi
    return 0
}

# 检查关键服务
check_services() {
    local services=("nginx" "mysql" "ssh" "docker")
    local issues=0

    echo "服务状态:"
    for svc in "${services[@]}"; do
        if systemctl is-active --quiet "$svc" 2>/dev/null; then
            echo "  ✅ $svc: 运行中"
        else
            echo "  ❌ $svc: 未运行"
            issues=1
        fi
    done
    return $issues
}

# 检查网络连接
check_network() {
    if ping -c 1 -W 2 8.8.8.8 &>/dev/null; then
        echo "网络: ✅ 外网连通"
    else
        echo "网络: ❌ 外网不通"
        return 1
    fi
    return 0
}

# 发送告警（示例：写入日志，实际可配置邮件）
send_alert() {
    local message="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] ALERT: $message" >> /var/log/health_check.log
    # echo "$message" | mail -s "服务器告警" "$ALERT_EMAIL"
}

# 主函数
main() {
    echo "========================================="
    echo " 服务器健康检查 - $(date)"
    echo "========================================="
    echo ""

    local has_issues=0

    check_load || has_issues=1
    echo ""

    check_memory || has_issues=1
    echo ""

    check_disk || has_issues=1
    echo ""

    check_services || has_issues=1
    echo ""

    check_network || has_issues=1
    echo ""

    if [ $has_issues -eq 1 ]; then
        echo "⚠️  发现异常，请及时处理！"
        send_alert "服务器 $(hostname) 健康检查发现异常，请查看 /var/log/health_check.log"
    else
        echo "✅ 所有检查通过，服务器运行正常"
    fi
}

main
```

---

## 案例 5：文件批量处理脚本

```bash
#!/bin/bash
# 批量文件处理工具
# 支持：重命名、转码、压缩、搜索替换

set -euo pipefail

# 批量重命名
batch_rename() {
    local dir="${1:-.}"
    local pattern="${2}"
    local replacement="${3}"

    if [ -z "$pattern" ] || [ -z "$replacement" ]; then
        echo "用法: $0 rename <目录> <模式> <替换>"
        echo "示例: $0 rename /path '\.htm$' '.html'"
        return 1
    fi

    echo "正在批量重命名文件..."
    echo "目录: $dir"
    echo "模式: $pattern -> $replacement"
    echo ""

    local count=0
    for file in "$dir"/*; do
        if [ -f "$file" ]; then
            local newname=$(echo "$file" | sed -E "s/$pattern/$replacement/")
            if [ "$file" != "$newname" ]; then
                mv -v "$file" "$newname"
                ((count++))
            fi
        fi
    done

    echo "共重命名 $count 个文件"
}

# 批量转换编码
batch_convert_encoding() {
    local dir="${1:-.}"
    local from="${2:-gbk}"
    local to="${3:-utf8}"

    echo "正在转换文件编码..."
    echo "目录: $dir"
    echo "编码: $from -> $to"
    echo ""

    find "$dir" -type f \( -name "*.txt" -o -name "*.md" -o -name "*.csv" \) | while read file; do
        echo "转换: $file"
        iconv -f "$from" -t "$to" "$file" -o "${file}.tmp" && mv "${file}.tmp" "$file"
    done

    echo "编码转换完成"
}

# 批量压缩
batch_compress() {
    local dir="${1:-.}"
    local type="${2:-gz}"

    echo "正在批量压缩文件..."
    echo "目录: $dir"
    echo "压缩方式: $type"
    echo ""

    find "$dir" -type f -name "*.log" -o -name "*.bak" | while read file; do
        case "$type" in
            gz)
                gzip -v "$file"
                ;;
            bz2)
                bzip2 -v "$file"
                ;;
            zip)
                zip "${file}.zip" "$file" && rm "$file"
                ;;
        esac
    done

    echo "压缩完成"
}

# 批量搜索替换
batch_replace() {
    local dir="${1:-.}"
    local pattern="${2}"
    local replacement="${3}"

    if [ -z "$pattern" ] || [ -z "$replacement" ]; then
        echo "用法: $0 replace <目录> <模式> <替换>"
        return 1
    fi

    echo "正在批量搜索替换..."
    echo "目录: $dir"
    echo "模式: $pattern -> $replacement"
    echo ""

    find "$dir" -type f -name "*.txt" -o -name "*.md" -o -name "*.conf" | while read file; do
        if grep -l "$pattern" "$file" &>/dev/null; then
            echo "修改: $file"
            sed -i "s/$pattern/$replacement/g" "$file"
        fi
    done

    echo "替换完成"
}

# 主函数
main() {
    case "${1:-help}" in
        rename)
            shift
            batch_rename "$@"
            ;;
        convert)
            shift
            batch_convert_encoding "$@"
            ;;
        compress)
            shift
            batch_compress "$@"
            ;;
        replace)
            shift
            batch_replace "$@"
            ;;
        help|*)
            echo "批量文件处理工具"
            echo "用法:"
            echo "  $0 rename <目录> <模式> <替换>    - 批量重命名"
            echo "  $0 convert <目录> [源编码] [目标编码] - 批量转换编码"
            echo "  $0 compress <目录> [类型]         - 批量压缩文件"
            echo "  $0 replace <目录> <模式> <替换>   - 批量搜索替换"
            echo ""
            echo "示例:"
            echo "  $0 rename /path '\\.htm$' '.html'"
            echo "  $0 convert /path gbk utf8"
            echo "  $0 compress /var/log gz"
            echo "  $0 replace /config 'old_value' 'new_value'"
            ;;
    esac
}

main "$@"
```

---

## 案例 6：自动部署脚本

```bash
#!/bin/bash
# 简单自动部署脚本
# 从 Git 拉取代码并构建项目

set -euo pipefail

# 配置
PROJECT_DIR="/var/www/myapp"
GIT_REPO="https://github.com/user/myapp.git"
BRANCH="main"
BUILD_CMD="npm run build"
RESTART_CMD="systemctl restart myapp"

# 颜色
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# 检查依赖
check_deps() {
    command -v git || error "git 未安装"
    command -v npm || error "npm 未安装"
}

# 备份
backup() {
    local backup_dir="/var/backup/myapp_$(date +%Y%m%d_%H%M%S)"
    log "创建备份: $backup_dir"
    cp -r "$PROJECT_DIR" "$backup_dir" || warn "备份失败，将继续部署"
}

# 部署
deploy() {
    log "开始部署..."

    # 进入项目目录
    cd "$PROJECT_DIR" || error "项目目录不存在"

    # 保存当前版本
    local old_version=$(git rev-parse --short HEAD 2>/dev/null || echo "none")

    # 拉取最新代码
    log "拉取代码..."
    git fetch origin
    git reset --hard "origin/$BRANCH"

    # 获取新版本
    local new_version=$(git rev-parse --short HEAD)

    log "版本更新: $old_version -> $new_version"

    # 安装依赖
    log "安装依赖..."
    npm install || error "npm install 失败"

    # 构建
    log "构建项目..."
    $BUILD_CMD || error "构建失败"

    # 重启服务
    log "重启服务..."
    $RESTART_CMD || warn "服务重启失败，请手动检查"

    log "部署完成！"
    echo "部署时间: $(date)"
    echo "项目版本: $new_version"
}

# 回滚
rollback() {
    log "执行回滚..."
    cd "$PROJECT_DIR" || error "项目目录不存在"

    git stash
    git checkout "$1" || error "版本 $1 不存在"
    npm install && $BUILD_CMD && $RESTART_CMD

    log "回滚到版本 $1 完成"
}

# 主函数
main() {
    check_deps

    case "${1:-deploy}" in
        deploy)
            backup
            deploy
            ;;
        rollback)
            rollback "${2:-HEAD~1}"
            ;;
        status)
            cd "$PROJECT_DIR"
            git log --oneline -5
            ;;
        *)
            echo "用法: $0 {deploy|rollback [版本]|status}"
            ;;
    esac
}

main "$@"
```

---

## 案例 7：网络监控脚本

```bash
#!/bin/bash
# 网络连通性监控脚本
# 监控多个主机和端口的连通性

set -euo pipefail

# 配置
HOSTS=(
    "8.8.8.8: Google DNS"
    "1.1.1.1: Cloudflare DNS"
    "github.com: GitHub"
    "baidu.com: Baidu"
)
PORTS=(
    "localhost:22: SSH"
    "localhost:80: HTTP"
    "localhost:443: HTTPS"
)
LOG_FILE="/var/log/network_monitor.log"
ALERT_LOG="/var/log/network_alert.log"

# 日志函数
log() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $1" >> "$LOG_FILE"
    echo "[$timestamp] $1"
}

alert() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] ALERT: $1" >> "$ALERT_LOG"
    echo "[$timestamp] ALERT: $1"
}

# 检查主机连通性
check_host() {
    local host=$1
    local name=$2

    if ping -c 2 -W 3 "$host" &>/dev/null; then
        log "✅ $name ($host) - 可达"
        return 0
    else
        alert "❌ $name ($host) - 不可达"
        return 1
    fi
}

# 检查端口连通性
check_port() {
    local host=$1
    local port=$2
    local name=$3

    if timeout 3 bash -c "echo >/dev/tcp/$host/$port" 2>/dev/null; then
        log "✅ $name ($host:$port) - 开放"
        return 0
    else
        alert "❌ $name ($host:$port) - 关闭"
        return 1
    fi
}

# 检查 DNS 解析
check_dns() {
    local domain=$1
    local name=$2

    if nslookup "$domain" &>/dev/null; then
        local ip=$(dig +short "$domain" | head -1)
        log "✅ DNS 解析 - $name ($domain -> $ip)"
        return 0
    else
        alert "❌ DNS 解析失败 - $name ($domain)"
        return 1
    fi
}

# 测量延迟
measure_latency() {
    local host=$1
    local result=$(ping -c 5 -q "$host" 2>/dev/null | tail -1 | awk '{print $4}' | cut -d'/' -f2)

    if [ -n "$result" ]; then
        log "📊 延迟统计 - $host: 平均 ${result}ms"
    else
        alert "📊 延迟统计 - $host: 无法获取"
    fi
}

# 主函数
main() {
    echo "========================================="
    echo " 网络监控 - $(date)"
    echo "========================================="
    echo ""

    local failed=0

    echo "--- 主机连通性检查 ---"
    for entry in "${HOSTS[@]}"; do
        IFS=':' read -r host name <<< "$entry"
        check_host "$host" "$name" || ((failed++))
    done

    echo ""
    echo "--- 端口连通性检查 ---"
    for entry in "${PORTS[@]}"; do
        IFS=':' read -r host port name <<< "$entry"
        check_port "$host" "$port" "$name" || ((failed++))
    done

    echo ""
    echo "--- 延迟测量 ---"
    for entry in "${HOSTS[@]}"; do
        IFS=':' read -r host name <<< "$entry"
        measure_latency "$host"
    done

    echo ""
    if [ $failed -eq 0 ]; then
        log "🎉 所有检查通过"
    else
        alert "⚠️  $failed 项检查失败"
    fi
}

main
```

---

## 案例 8：交互式菜单脚本

```bash
#!/bin/bash
# 交互式系统管理菜单

set -euo pipefail

# 颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 标题
show_header() {
    clear
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}         Linux 系统管理工具            ${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
    echo -e "系统: $(uname -o)"
    echo -e "主机: $(hostname)"
    echo -e "时间: $(date)"
    echo -e "负载: $(uptime | awk -F'load average:' '{print $2}')"
    echo ""
}

# 系统信息菜单
system_info_menu() {
    while true; do
        show_header
        echo "--- 系统信息 ---"
        echo "1. CPU 信息"
        echo "2. 内存信息"
        echo "3. 磁盘信息"
        echo "4. 网络信息"
        echo "5. 进程信息"
        echo "0. 返回主菜单"
        echo ""

        read -p "请选择 [0-5]: " choice

        case $choice in
            1)
                echo -e "\n--- CPU 信息 ---"
                lscpu | grep -E "Model name|CPU\(s\)|Thread|Core|MHz"
                read -p "按回车继续..."
                ;;
            2)
                echo -e "\n--- 内存信息 ---"
                free -h
                read -p "按回车继续..."
                ;;
            3)
                echo -e "\n--- 磁盘信息 ---"
                df -h | grep -v tmpfs
                read -p "按回车继续..."
                ;;
            4)
                echo -e "\n--- 网络信息 ---"
                ip addr show | grep -E "^[0-9]|inet "
                read -p "按回车继续..."
                ;;
            5)
                echo -e "\n--- 进程信息 (CPU 前 10) ---"
                ps aux --sort=-%cpu | head -11
                read -p "按回车继续..."
                ;;
            0)
                return
                ;;
            *)
                echo "无效选择"
                sleep 1
                ;;
        esac
    done
}

# 服务管理菜单
service_menu() {
    while true; do
        show_header
        echo "--- 服务管理 ---"
        echo "1. 查看服务状态"
        echo "2. 启动服务"
        echo "3. 停止服务"
        echo "4. 重启服务"
        echo "5. 设置开机自启"
        echo "0. 返回主菜单"
        echo ""

        read -p "请选择 [0-5]: " choice

        case $choice in
            1|2|3|4|5)
                read -p "请输入服务名: " service
                case $choice in
                    1) sudo systemctl status "$service" ;;
                    2) sudo systemctl start "$service" && echo "✅ 已启动" ;;
                    3) sudo systemctl stop "$service" && echo "✅ 已停止" ;;
                    4) sudo systemctl restart "$service" && echo "✅ 已重启" ;;
                    5) sudo systemctl enable "$service" && echo "✅ 已设置开机自启" ;;
                esac
                read -p "按回车继续..."
                ;;
            0)
                return
                ;;
            *)
                echo "无效选择"
                sleep 1
                ;;
        esac
    done
}

# 日志查看菜单
log_menu() {
    while true; do
        show_header
        echo "--- 日志查看 ---"
        echo "1. 系统日志"
        echo "2. 认证日志"
        echo "3. 内核日志"
        echo "4. 自定义日志"
        echo "0. 返回主菜单"
        echo ""

        read -p "请选择 [0-4]: " choice

        case $choice in
            1)
                journalctl -n 30 --no-pager
                read -p "按回车继续..."
                ;;
            2)
                journalctl -u sshd -n 30 --no-pager 2>/dev/null || cat /var/log/auth.log | tail -30 2>/dev/null || echo "日志不可用"
                read -p "按回车继续..."
                ;;
            3)
                dmesg | tail -30
                read -p "按回车继续..."
                ;;
            4)
                read -p "请输入日志文件路径: " logfile
                if [ -f "$logfile" ]; then
                    tail -30 "$logfile"
                else
                    echo "文件不存在"
                fi
                read -p "按回车继续..."
                ;;
            0)
                return
                ;;
            *)
                echo "无效选择"
                sleep 1
                ;;
        esac
    done
}

# 主菜单
main_menu() {
    while true; do
        show_header
        echo "--- 主菜单 ---"
        echo "1. 📊 系统信息"
        echo "2. ⚙️  服务管理"
        echo "3. 📋 日志查看"
        echo "4. 🧹 系统清理"
        echo "0. 🚪 退出"
        echo ""

        read -p "请选择 [0-4]: " choice

        case $choice in
            1) system_info_menu ;;
            2) service_menu ;;
            3) log_menu ;;
            4)
                echo "清理系统缓存..."
                sudo apt autoremove -y 2>/dev/null || sudo yum autoremove -y 2>/dev/null || echo "跳过"
                echo "清理完成"
                read -p "按回车继续..."
                ;;
            0)
                echo "再见！"
                exit 0
                ;;
            *)
                echo "无效选择"
                sleep 1
                ;;
        esac
    done
}

# 启动主菜单
main_menu
```

---

## 快速参考卡片

### 常用命令速查

| 用途 | 命令 |
|------|------|
| 查找文件 | `find / -name "*.txt"` |
| 搜索文本 | `grep -r "pattern" /path/` |
| 统计行数 | `wc -l file.txt` |
| 排序去重 | `sort file.txt \| uniq -c` |
| 查看磁盘 | `df -h` |
| 查看目录大小 | `du -sh *` |
| 压缩解压 | `tar -czvf a.tar.gz dir/` |
| 杀死进程 | `kill -9 PID` |
| 查看端口 | `ss -tlnp` |
| 下载文件 | `curl -O URL` |
| 远程复制 | `scp file user@host:/path/` |
| 实时日志 | `tail -f /var/log/syslog` |

### 管道组合技巧

```bash
# 找到最大的 10 个文件
find / -type f -exec du -h {} + 2>/dev/null | sort -rh | head -10

# 统计每个用户的进程数
ps aux | awk '{print $1}' | sort | uniq -c | sort -rn

# 查看所有监听端口
ss -tlnp | awk 'NR>1 {print $4, $7}' | grep -v '127.0.0.1'

# 找到占用 CPU 最多的进程
ps aux --sort=-%cpu | head -3

# 统计日志中每小时请求数
awk '{print $4}' access.log | cut -d: -f2 | sort | uniq -c | sort -n
```

---

*本教程到此结束，Happy Shell Scripting! 🚀*