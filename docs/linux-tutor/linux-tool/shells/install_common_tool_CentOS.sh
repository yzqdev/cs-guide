#!/bin/bash
# CentOS 常用工具安装
# 用法: sh install_common_tool_CentOS.sh

set -e

echo "========================================="
echo "  开始安装常用工具"
echo "========================================="

yum install -y zip unzip lrzsz git epel-release wget htop deltarpm

echo "========================================="
echo "  常用工具安装完成"
echo "========================================="