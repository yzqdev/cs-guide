#!/bin/bash
# CentOS 7 安装 Docker + K8s（禁用防火墙 + 阿里云镜像）
# 用法: sh install_docker_k8s_disable_firewalld_centos7-aliyun.sh

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
echo "  添加阿里云 Docker 仓库"
echo "========================================="
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum makecache fast

echo "========================================="
echo "  开始安装 Docker（指定版本 18.06）"
echo "========================================="
yum install -y docker-ce-18.06.1.ce-3.el7

echo "========================================="
echo "  启动 Docker"
echo "========================================="
systemctl start docker.service
systemctl enable docker.service

echo "========================================="
echo "  配置 Docker 镜像加速"
echo "========================================="
cat > /etc/docker/daemon.json << EOF
{
  "registry-mirrors": ["https://ldhc17y9.mirror.aliyuncs.com"]
}
EOF

systemctl daemon-reload
systemctl restart docker

echo "========================================="
echo "  测试 Hello World"
echo "========================================="
docker run hello-world

echo "Docker 安装完成，K8s 请参考官方文档继续安装"