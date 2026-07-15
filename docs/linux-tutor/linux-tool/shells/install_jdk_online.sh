#!/bin/bash
# 在线下载并安装 JDK 8（CentOS）
# 用法: sh install_jdk_online.sh

set -e

echo "========================================="
echo "  创建必要目录"
echo "========================================="
[ ! -d "/opt/setups" ] && mkdir -p /opt/setups
[ ! -d "/usr/program" ] && mkdir -p /usr/program

echo "========================================="
echo "  下载 JDK 8u151"
echo "========================================="
cd /opt/setups
wget -c --header "Cookie: oraclelicense=accept-securebackup-cookie" \
  http://download.oracle.com/otn-pub/java/jdk/8u151-b12/e758a0de34e24606bca991d704f6dcbf/jdk-8u151-linux-x64.tar.gz

if [ ! -f "/opt/setups/jdk-8u151-linux-x64.tar.gz" ]; then
    echo "❌ JDK 下载失败，请检查网络"
    exit 1
fi

echo "========================================="
echo "  解压 JDK"
echo "========================================="
tar -zxf jdk-8u151-linux-x64.tar.gz

if [ ! -d "/opt/setups/jdk1.8.0_151" ]; then
    echo "❌ JDK 解压失败"
    exit 1
fi

echo "========================================="
echo "  移动 JDK 到 /usr/program/"
echo "========================================="
mv jdk1.8.0_151/ /usr/program/

echo "========================================="
echo "  配置环境变量（~/.zshrc）"
echo "========================================="
cat >> ~/.zshrc << 'EOF'

# JDK
JAVA_HOME=/usr/local/jdk1.8.0_151
JRE_HOME=$JAVA_HOME/jre
PATH=$PATH:$JAVA_HOME/bin
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export JAVA_HOME
export JRE_HOME
export PATH
export CLASSPATH
EOF

echo "✅ JDK 安装完成，请执行: source ~/.zshrc"