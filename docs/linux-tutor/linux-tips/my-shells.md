# 我的一些shell1

```shell
# 执行golang的二进制文件
#!/bin/bash
# 定义变量
# 要运行的jar包路径，加不加引号都行。 注意：等号两边 不能 有空格，不然会提示command找不到
binName="filebrowser"
# 日志路径，加不加引号都行。 注意：等号两边 不能 有空格，不然会提示command找不到
LOG_PATH="/opt/filebrowser.log"
# 若是输入格式不对，给出提示！
tips() {
    echo ""
    echo "WARNING!!!......Tips, please use command: sh auto_deploy.sh [start|stop|restart|status]. For example: sh auto_deploy.sh start "
    echo ""
    exit 1
}
# 启动方法
start() {
    # 从新获取一下pid，由于其它操做如stop会致使pid的状态更新
    pid=$(ps -ef | grep $binName | grep -v grep | awk '{print $2}')
    # -z 表示若是$pid为空时执行
    if [ -z $pid ]; then
        nohup ./$binName >>$LOG_PATH 2>&1 &
        pid=$(ps -ef | grep $binName | grep -v grep | awk '{print $2}')
        echo ""
        echo "Service ${binName} is starting！pid=${pid}"
        echo "........................Here is the log.............................."
        echo "....................................................................."
        # tail -f $LOG_PATH
        echo "........................Start successfully！........................."
    else
        echo ""
        echo "Service ${binName} is already running,it's pid = ${pid}. If necessary, please use command: sh auto_deploy.sh restart."
        echo ""
    fi
}

# 中止方法
stop() {
    # 从新获取一下pid，由于其它操做如start会致使pid的状态更新
    pid=$(ps -ef | grep $binName | grep -v grep | awk '{print $2}')
    # -z 表示若是$pid为空时执行。 注意：每一个命令和变量之间必定要先后加空格，不然会提示command找不到
    if [ -z $pid ]; then
        echo ""
        echo "Service ${binName} is not running! It's not necessary to stop it!"
        echo ""
    else
        kill -9 $pid
        echo ""
        echo "Service stop successfully！pid:${pid} which has been killed forcibly!"
        echo ""
    fi
}

# 输出运行状态方法
status() {
    # 从新获取一下pid，由于其它操做如stop、restart、start等会致使pid的状态更新
    pid=$(ps -ef | grep $binName | grep -v grep | awk '{print $2}')
    # -z 表示若是$pid为空时执行。注意：每一个命令和变量之间必定要先后加空格，不然会提示command找不到
    if [ -z $pid ]; then
        echo ""
        echo "Service ${binName} is not running!"
        echo ""
    else
        echo ""
        echo "Service ${binName} is running. It's pid=${pid}"
        echo ""
    fi
}

# 重启方法
restart() {
    echo ""
    echo ".............................Restarting.............................."
    echo "....................................................................."
    # 从新获取一下pid，由于其它操做如start会致使pid的状态更新
    pid=$(ps -ef | grep $binName | grep -v grep | awk '{print $2}')
    # -z 表示若是$pid为空时执行。 注意：每一个命令和变量之间必定要先后加空格，不然会提示command找不到
    if [ ! -z $pid ]; then
        kill -9 $pid
    fi
    start
    echo "....................Restart successfully！..........................."
}

# 根据输入参数执行对应方法，不输入则执行tips提示方法
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
