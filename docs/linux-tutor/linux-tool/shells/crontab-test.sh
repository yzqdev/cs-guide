#!/bin/bash
# Crontab 测试脚本：记录两次时间到日志文件
# 用法: sh crontab-test.sh

#!/bin/bash
time1=$(date "+%Y-%m-%d %H:%M:%S")
echo "${time1}" >> /opt/1.txt

sleep 5s

time2=$(date "+%Y-%m-%d %H:%M:%S")
echo "${time2}" >> /opt/1.txt