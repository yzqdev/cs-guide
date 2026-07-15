#!/bin/bash
# Redis 重启脚本（配合 crontab 使用）
# 用法: sh crontab-redis-restart.sh

set -e

echo ">>> 停止 Redis 服务..."
redis-cli -h 127.0.0.1 -p 6379 -a 123456789 shutdown

echo ">>> 等待 5 秒..."
sleep 5

echo ">>> 启动 Redis 服务..."
/usr/local/bin/redis-server /etc/redis.conf

echo ">>> Redis 重启完成"