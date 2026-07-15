#!/bin/bash
# 安装 Zsh + Oh My Zsh + Vim（CentOS）
# 用法: sh install_common_vim_zsh.sh

set -e

echo "========================================="
echo "  禁用防火墙"
echo "========================================="
systemctl stop firewalld.service
systemctl disable firewalld.service

echo "========================================="
echo "  开始安装常用工具"
echo "========================================="
yum install -y zip unzip lrzsz git epel-release

echo "========================================="
echo "  开始安装 Zsh"
echo "========================================="
yum install -y zsh

echo "========================================="
echo "  开始安装 Oh My Zsh"
echo "========================================="
wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O - | sh

echo "========================================="
echo "  设置默认终端为 Zsh"
echo "========================================="
chsh -s /bin/zsh root

echo "========================================="
echo "  开始安装 Vim"
echo "========================================="
yum install -y vim

echo "========================================="
echo "  设置 Vim 配置"
echo "========================================="
curl https://raw.githubusercontent.com/wklken/vim-for-server/master/vimrc > ~/.vimrc

echo "所有配置完成！请重新登录使 Zsh 生效"