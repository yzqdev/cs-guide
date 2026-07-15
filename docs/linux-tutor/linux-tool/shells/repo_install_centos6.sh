#!/bin/bash
# CentOS 6 更换网易源 + EPEL + RepoForge
# 用法: sh repo_install_centos6.sh
# 参考: https://github.com/judasn/Linux-Tutorial

set -e

echo "========================================="
echo "  备份默认源"
echo "========================================="
sudo mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
cd /etc/yum.repos.d/

echo "========================================="
echo "  下载网易 CentOS 6 源"
echo "========================================="
sudo wget http://mirrors.163.com/.help/CentOS6-Base-163.repo
sudo mv CentOS6-Base-163.repo CentOS-Base.repo
sudo rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6

echo "========================================="
echo "  清理缓存并更新"
echo "========================================="
sudo yum clean all
sudo yum makecache
sudo yum update -y

echo "========================================="
echo "  安装 EPEL 源"
echo "========================================="
sudo yum install -y epel-release
sudo rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-6

echo "========================================="
echo "  安装 RepoForge 源"
echo "========================================="
wget http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el6.rf.x86_64.rpm
sudo rpm -ivh rpmforge-release-0.5.3-1.el6.rf.x86_64.rpm
sudo rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-rpmforge-dag

echo "========================================="
echo "  清理缓存并更新"
echo "========================================="
sudo yum clean all
sudo yum makecache
sudo yum update -y

echo "========================================="
echo "  测试安装 htop"
echo "========================================="
sudo yum install -y htop

echo "========================================="
echo "  源设置完成"
echo "========================================="