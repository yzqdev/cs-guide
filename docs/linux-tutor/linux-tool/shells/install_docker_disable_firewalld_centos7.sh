#!/bin/bash
# CentOS 7 安装 Docker（禁用防火墙）
# 用法: sh install_docker_disable_firewalld_centos7.sh

set -e

echo "========================================="
echo "  禁用防火墙"
echo "========================================="
systemctl stop firewalld.service
systemctl disable firewalld.service

echo "========================================="
echo "  安装 Docker 所需环境"
echo "========================================="
yum install -y yum-utils device-mapper-persistent-data lvm2

echo "========================================="
echo "  添加 Docker 仓库"
echo "========================================="
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum makecache fast

echo "========================================="
echo "  开始安装 Docker"
echo "========================================="
yum install -y docker-ce

echo "========================================="
echo "  启动 Docker"
echo "========================================="
systemctl start docker.service
systemctl enable docker.service

echo "========================================="
echo "  测试 Hello World"
echo "========================================="
docker run hello-world

echo "========================================="
echo "  安装 Docker Compose"
echo "========================================="
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

echo "Docker Compose 版本: $(docker-compose --version)"
echo "========================================="
echo "  Docker 安装完成"
echo "========================================="