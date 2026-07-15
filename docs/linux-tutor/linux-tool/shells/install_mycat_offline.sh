#!/bin/bash
# 离线安装 Mycat 数据库中间件
# 用法: sh install_mycat_offline.sh
# 前提: 将 Mycat-server-1.6-RELEASE-20161028204710-linux.tar.gz 放到 /opt/setups/ 目录下

set -e

echo "========================================="
echo "  检查目录和环境"
echo "========================================="
[ ! -d "/opt/setups" ] && mkdir -p /opt/setups

if [ -z "$JAVA_HOME" ]; then
    echo "❌ 没有 JAVA_HOME 环境变量，请先安装 JDK"
    exit 1
fi

if [ ! -f "/opt/setups/Mycat-server-1.6-RELEASE-20161028204710-linux.tar.gz" ]; then
    echo "❌ Mycat 压缩包不存在，请放到 /opt/setups/ 目录下"
    exit 1
fi

echo "========================================="
echo "  解压 Mycat"
echo "========================================="
cd /opt/setups && tar -zxf Mycat-server-1.6-RELEASE-20161028204710-linux.tar.gz

echo "========================================="
echo "  移动到 /usr/local/"
echo "========================================="
mv /opt/setups/mycat /usr/local/

echo "========================================="
echo "  配置环境变量（~/.zshrc）"
echo "========================================="
echo 'MYCAT_HOME=/usr/local/mycat' >> ~/.zshrc
echo 'PATH=$PATH:$MYCAT_HOME/bin' >> ~/.zshrc
echo 'export MYCAT_HOME' >> ~/.zshrc
echo 'export PATH' >> ~/.zshrc

echo "✅ Mycat 安装完成，请执行: source ~/.zshrc 后再启动 mycat"