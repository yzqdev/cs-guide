#!/bin/bash
# Ubuntu 常用工具安装
# 用法: sh install_common_tool_ubuntu.sh

set -e

echo "========================================="
echo "  开始安装常用工具"
echo "========================================="

sudo apt-get install -y zip unzip unrar lrzsz git wget htop

echo "========================================="
echo "  常用工具安装完成"
echo "========================================="