#!/bin/bash
# 安装 Vim 和配置文件
# 用法: sh install_common_vim.sh

set -e

echo "========================================="
echo "  开始安装常用工具"
echo "========================================="
yum install -y zip unzip lrzsz git epel-release

echo "========================================="
echo "  开始安装 Vim"
echo "========================================="
yum install -y vim

echo "========================================="
echo "  设置 Vim 配置"
echo "========================================="
curl https://raw.githubusercontent.com/wklken/vim-for-server/master/vimrc > ~/.vimrc
echo "Vim 配置完成"