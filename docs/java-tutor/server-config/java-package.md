# java打包的shell

## 注意一个问题

由于在DOS（windows系统）下，文本文件的换行符为CRLF，而在Linux下换行符为LF，使用git进行代码管理时，git会自动进行CRLF和LF之间的转换，这个我们不用操心。而有时候，我们需要将windows下的文件上传到linux上，例如shell脚本，执行的时候有时会出现奇怪的问题，这时候，就需要安装dos2unix软件。
​

在centos下安装dos2unix：

```shell
yum install -y dos2unix

```

安装完成后，对文件进行转换

```shell
dos2unix xx.sh

```

​

或者把文本在vscode中编辑,再放回linux

## 服务端运行jar包

```java
nohup java -jar project.jar >> log.out 2>&1 &
```

`java -jar XXX.jar &`
命令结尾没有 “&” ，则变成 “java -jar XXX.jar ” ，表示在当前ssh窗口，可按CTRL + C打断程序运行，或者直接关闭窗口，则程序直接退出

命令结尾添加 “&” ，则变成 “java -jar XXX.jar &” ，表示在当窗口关闭时，程序才会中止运行。&代表让该命令在后台执行。

`nohup java -jar XXX.jar > Log.log &`
或者
`nohup java -jar XXX.jar >> Log.log &`
命令 "nohup java -jar XXX.jar &" 部分，表示不挂断运行命令,当账户退出或终端关闭时,程序仍然运行。注意，该作业的所有输出被重定向到nohup.out的文件中。

命令  `nohup java -jar XXX.jar > Log.log &` 部分，表示不挂断运行命令,当账户退出或终端关闭时,程序仍然运行，并且该作业的所有输出被重定向到Log.log的文件
中。 `> Log.log` 该命令就是指定日志输出的文件。
`>>`表示将输出以追加的方式重定向到Log.log中。

```bash
nohup java -jar XXX.jar > Log.log 2>&1 &
```

或者

```bash
nohup java -jar XXX.jar >> Log.log 2>&1 &
```

或者

```bash
nohup java -jar XXX.jar > /dev/null 2>&1 &
```

标准输入文件(stdin)：stdin的文件描述符为0，Unix程序默认从stdin读取数据。
标准输出文件(stdout)：stdout 的文件描述符为1，Unix程序默认向stdout输出数据。
标准错误文件(stderr)：stderr的文件描述符为2，Unix程序会向stderr流中写入错误信息。
屏蔽输出，起到禁止输出作用：/dev/null 是一个特殊的文件，写入到它的内容都会被丢弃；如果尝试从该文件读取内容，那么什么也读不到。但是 /dev/null 文件非常有用，将命令的输出重定向到它，会起到"禁止输出"的效果。
 `> Log.log 2>&1` ：表示将 stdout 和 stderr 合并后重定向到 Log.log
备注：输出之后，可以使用“jobs”查看一下后台运行的任务。

## 下面是一个bash命令

```bash
#!/bin/bash
# 定义变量
# 要运行的jar包路径，加不加引号都行。 注意：等号两边 不能 有空格，不然会提示command找不到
JAR_NAME="zfile-3.2.war"
# 日志路径，加不加引号都行。 注意：等号两边 不能 有空格，不然会提示command找不到
LOG_PATH="/opt/zfile.log"
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
 pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}'`
        # -z 表示若是$pid为空时执行
 if [ -z $pid ]; then
        nohup java -jar $JAR_NAME >>$LOG_PATH 2>&1 &
        pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}'`
  echo ""
        echo "Service ${JAR_NAME} is starting！pid=${pid}"
  echo "........................Here is the log.............................."
  echo "....................................................................."
        tail -f $LOG_PATH
  echo "........................Start successfully！........................."
 else
  echo ""
  echo "Service ${JAR_NAME} is already running,it's pid = ${pid}. If necessary, please use command: sh auto_deploy.sh restart."
  echo ""
 fi
}

# 中止方法
stop() {
  # 从新获取一下pid，由于其它操做如start会致使pid的状态更新
 pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}'`
        # -z 表示若是$pid为空时执行。 注意：每一个命令和变量之间必定要先后加空格，不然会提示command找不到
 if [ -z $pid ]; then
  echo ""
        echo "Service ${JAR_NAME} is not running! It's not necessary to stop it!"
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
 pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}'`
        # -z 表示若是$pid为空时执行。注意：每一个命令和变量之间必定要先后加空格，不然会提示command找不到
 if [ -z $pid ];then
  echo ""
        echo "Service ${JAR_NAME} is not running!"
  echo ""
 else
  echo ""
        echo "Service ${JAR_NAME} is running. It's pid=${pid}"
  echo ""
 fi
}

# 重启方法
restart() {
 echo ""
 echo ".............................Restarting.............................."
 echo "....................................................................."
  # 从新获取一下pid，由于其它操做如start会致使pid的状态更新
 pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}'`
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

## 运行go文件的命令

```shell
#!/bin/bash
# 定义变量
# 要运行的jar包路径，加不加引号都行。 注意：等号两边 不能 有空格，不然会提示command找不到
JAR_NAME="family-server"
# 日志路径，加不加引号都行。 注意：等号两边 不能 有空格，不然会提示command找不到
LOG_PATH="/opt/family.log"
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
 pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}'`
        # -z 表示若是$pid为空时执行
 if [ -z $pid ]; then
        nohup   ./$JAR_NAME >>$LOG_PATH 2>&1 &
        pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}'`
  echo ""
        echo "Service ${JAR_NAME} is starting！pid=${pid}"
  echo "........................Here is the log.............................."
  echo "....................................................................."
        tail -f $LOG_PATH
  echo "........................Start successfully！........................."
 else
  echo ""
  echo "Service ${JAR_NAME} is already running,it's pid = ${pid}. If necessary, please use command: sh auto_deploy.sh restart."
  echo ""
 fi
}

# 中止方法
stop() {
  # 从新获取一下pid，由于其它操做如start会致使pid的状态更新
 pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}'`
        # -z 表示若是$pid为空时执行。 注意：每一个命令和变量之间必定要先后加空格，不然会提示command找不到
 if [ -z $pid ]; then
  echo ""
        echo "Service ${JAR_NAME} is not running! It's not necessary to stop it!"
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
 pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}'`
        # -z 表示若是$pid为空时执行。注意：每一个命令和变量之间必定要先后加空格，不然会提示command找不到
 if [ -z $pid ];then
  echo ""
        echo "Service ${JAR_NAME} is not running!"
  echo ""
 else
  echo ""
        echo "Service ${JAR_NAME} is running. It's pid=${pid}"
  echo ""
 fi
}

# 重启方法
restart() {
 echo ""
 echo ".............................Restarting.............................."
 echo "....................................................................."
  # 从新获取一下pid，由于其它操做如start会致使pid的状态更新
 pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}'`
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
