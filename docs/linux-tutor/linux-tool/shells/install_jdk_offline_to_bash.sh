#!/bin/bash
# 离线安装 JDK 8（环境变量写入 /etc/profile）
# 用法: sh install_jdk_offline_to_bash.sh
# 前提: 将 jdk-8u181-linux-x64.tar.gz 放到 /opt/setups/ 目录下

set -e

echo "========================================="
echo "  检查目录和文件"
echo "========================================="
[ ! -d "/opt/setups" ] && mkdir -p /opt/setups

if [ ! -f "/opt/setups/jdk-8u181-linux-x64.tar.gz" ]; then
    echo "❌ JDK 压缩包不存在，请放到 /opt/setups/ 目录下"
    exit 1
fi

echo "========================================="
echo "  解压 JDK"
echo "========================================="
cd /opt/setups && tar -zxf jdk-8u181-linux-x64.tar.gz

if [ ! -d "/opt/setups/jdk1.8.0_181" ]; then
    echo "❌ JDK 解压失败"
    exit 1
fi

echo "========================================="
echo "  移动 JDK 到 /usr/local/"
echo "========================================="
mv jdk1.8.0_181/ /usr/local/

echo "========================================="
echo "  配置环境变量（/etc/profile）"
echo "========================================="
cat >> /etc/profile << 'EOF'

# JDK
JAVA_HOME=/usr/local/jdk1.8.0_181
JRE_HOME=$JAVA_HOME/jre
PATH=$PATH:$JAVA_HOME/bin
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export JAVA_HOME
export JRE_HOME
export PATH
export CLASSPATH
EOF

echo "✅ JDK 安装完成，请执行: source /etc/profile"