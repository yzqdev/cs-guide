#!/bin/bash
# 离线安装 Maven（环境变量写入 ~/.zshrc）
# 用法: sh install_maven_offline_to_zsh.sh
# 前提: 将 apache-maven-3.5.4-bin.tar.gz 放到 /opt/setups/ 目录下

set -e

echo "========================================="
echo "  检查目录和文件"
echo "========================================="
[ ! -d "/opt/setups" ] && mkdir -p /opt/setups

if [ ! -f "/opt/setups/apache-maven-3.5.4-bin.tar.gz" ]; then
    echo "❌ Maven 压缩包不存在，请放到 /opt/setups/ 目录下"
    exit 1
fi

echo "========================================="
echo "  解压 Maven"
echo "========================================="
cd /opt/setups && tar -zxf apache-maven-3.5.4-bin.tar.gz

if [ ! -d "/opt/setups/apache-maven-3.5.4" ]; then
    echo "❌ Maven 解压失败"
    exit 1
fi

echo "========================================="
echo "  移动 Maven 到 /usr/local/"
echo "========================================="
mv apache-maven-3.5.4/ /usr/local/

echo "========================================="
echo "  配置环境变量（~/.zshrc）"
echo "========================================="
cat >> ~/.zshrc << 'EOF'

# Maven
M3_HOME=/usr/local/apache-maven-3.5.4
MAVEN_HOME=/usr/local/apache-maven-3.5.4
PATH=$PATH:$M3_HOME/bin
MAVEN_OPTS="-Xms256m -Xmx356m"
export M3_HOME
export MAVEN_HOME
export PATH
export MAVEN_OPTS
EOF

echo "✅ Maven 安装完成，请执行: source ~/.zshrc"