#!/bin/bash
# Spring Boot 服务管理脚本（启动/停止/重启/状态）
# 用法: sh shell-with-param-demo.sh {start|stop|restart|status} {jar包名} {jar包路径}
# 示例: sh shell-with-param-demo.sh start myapp.jar /opt/myapp

set -e

methodParam=$1
SpringBoot=$2
SpringBootPath=$3

# 参数校验
if [ "$methodParam" = "" ]; then
    echo -e "\033[0;31m❌ 未输入操作名\033[0m  \033[0;34m{start|stop|restart|status}\033[0m"
    exit 1
fi

if [ "$SpringBoot" = "" ]; then
    echo -e "\033[0;31m❌ 未输入应用名\033[0m"
    exit 1
fi

if [ "$SpringBootPath" = "" ]; then
    echo -e "\033[0;31m❌ 未输入应用路径\033[0m"
    exit 1
fi

echo "操作名 = $methodParam"
echo "应用名 = $SpringBoot"
echo "应用路径 = $SpringBootPath"

# 获取进程数
get_count() {
    ps -ef | grep java | grep "$SpringBoot" | grep -v grep | wc -l
}

# 获取进程 PID
get_pid() {
    ps -ef | grep java | grep "$SpringBoot" | grep -v grep | awk '{print $2}'
}

start() {
    local count=$(get_count)
    if [ "$count" != 0 ]; then
        echo "$SpringBoot is running..."
    else
        echo "Start $SpringBoot success..."
        cd "$SpringBootPath"
        BUILD_ID=dontKillMe nohup java -jar "$SpringBoot" > /opt/run-log.log 2>&1 &
    fi
}

stop() {
    echo "Stop $SpringBoot"
    local boot_id=$(get_pid)
    local count=$(get_count)

    if [ "$count" != 0 ]; then
        kill "$boot_id"
        sleep 2
        boot_id=$(get_pid)
        [ -n "$boot_id" ] && kill -9 "$boot_id"
    fi
}

restart() {
    stop
    sleep 2
    start
}

status() {
    local count=$(get_count)
    if [ "$count" != 0 ]; then
        echo "$SpringBoot is running..."
    else
        echo "$SpringBoot is not running..."
    fi
}

case $methodParam in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    status)
        status
        ;;
    *)
        echo -e "\033[0;31m Usage: \033[0m sh $0 {start|stop|restart|status} {SpringBootJarName} {path}"
        echo -e "\033[0;33m Example: sh $0 start esmart-test.jar /opt/app\033[0m"
        exit 1
        ;;
esac