# 实用 Shell 脚本 — 服务管理模板

> 一个通用的 Go/Node.js/Java 服务管理脚本，支持 start/stop/restart/status。

```bash
#!/bin/bash
# 服务管理脚本
# 用法: ./service.sh [start|stop|restart|status]

# 配置
binName="filebrowser"                  # 可执行文件名
LOG_PATH="/opt/filebrowser.log"        # 日志路径

# 使用说明
tips() {
    echo ""
    echo "用法: sh $0 [start|stop|restart|status]"
    echo "示例: sh $0 start"
    echo ""
    exit 1
}

# 获取进程 PID
get_pid() {
    echo $(ps -ef | grep $binName | grep -v grep | awk '{print $2}')
}

# 启动服务
start() {
    pid=$(get_pid)
    if [ -z "$pid" ]; then
        # 后台启动并将输出重定向到日志文件
        nohup ./$binName >>$LOG_PATH 2>&1 &
        pid=$(get_pid)
        echo ""
        echo "Service ${binName} is starting! PID=${pid}"
        echo "Log file: ${LOG_PATH}"
        echo ""
    else
        echo ""
        echo "Service ${binName} is already running! PID=${pid}"
        echo "If necessary, please use: $0 restart"
        echo ""
    fi
}

# 停止服务
stop() {
    pid=$(get_pid)
    if [ -z "$pid" ]; then
        echo ""
        echo "Service ${binName} is not running!"
        echo ""
    else
        kill -9 $pid
        echo ""
        echo "Service ${binName} stopped successfully! PID:${pid} killed."
        echo ""
    fi
}

# 查看状态
status() {
    pid=$(get_pid)
    if [ -z "$pid" ]; then
        echo ""
        echo "Service ${binName} is not running!"
        echo ""
    else
        echo ""
        echo "Service ${binName} is running! PID=${pid}"
        echo ""
    fi
}

# 重启服务
restart() {
    echo ""
    echo ".............................Restarting.............................."
    pid=$(get_pid)
    if [ ! -z "$pid" ]; then
        kill -9 $pid
    fi
    start
    echo "....................Restart successfully!..........................."
    echo ""
}

# 主入口
case "$1" in
    "start")
        start
        ;;
    "stop")
        stop
        ;;
    "status")
        status
        ;;
    "restart")
        restart
        ;;
    *)
        tips
        ;;
esac
```

## 使用方式

```bash
# 给脚本添加执行权限
chmod +x service.sh

# 启动服务
./service.sh start

# 停止服务
./service.sh stop

# 重启服务
./service.sh restart

# 查看状态
./service.sh status
```

## 注意事项

- 需要将 `binName` 和 `LOG_PATH` 修改为实际值
- 确保可执行文件与脚本在同一目录，或使用绝对路径
- 日志文件会自动创建，建议定期清理