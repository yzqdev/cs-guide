# linuxmint配置

1. 配置镜像源,全改为国内的镜像,加快包下载速度
1. 下载各种软件,gedit, vscode, nvm,chrome, vivaldi,teamviewer等等
1. 这里要配置node的环境,下载nvm,yarn,mirror-config-china
1. 添加ohmyzsh美化终端,其中用户目录的.bash_profile,.bashrc,.zshrc要知道是干什么的
1. 添加字体微软雅黑,yaheimono等,更改terminal字体样式
1. 下载conda并配置condarc设置国内镜像

​

## 安装sshd

```python
sudo apt-get  install openssh-server
```

## 安装nodejs

## 安装java

在adoptopenjdk网站下载   [https://adoptium.net/releases.html](https://adoptium.net/releases.html)

```python
解压
tar xzf OpenJDK17U-jdk_x64_linux_hotspot_17.0.2_8.tar.gz

添加环境变量(.bashrc,.zshrc)
export PATH=$PWD/jdk-17.0.2+8/bin:$PATH

检查是否安装
java -verison
```

### 安装docker

[https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script)

### 安装golang

```python
在golang官网下载go的安装包，go1.16.linux-amd64.tar.gz 然后
# 1.解压到local目录
wget  https://go.dev/dl/go1.17.7.linux-amd64.tar.gz
sudo tar -C /opt -xzf go1.17.7.linux-amd64.tar.gz
# 2.编辑环境变量，在/etc/profile和.bashrc添加
#vim ~/.zshrc  # OR ~/.bashrc OR ~/.profile
cp -r ~/.bashrc ~/bashrcbak
# 添加a环境变量
export GOMODPATH=/opt/go
export PATH="$GOMODPATH/bin:$GOMODPATH/golangmod/bin:$PATH"
# 修改/opt的权限
sudo chmod -R 777 /opt/go



echo 'export GOMODPATH=/opt/go
export PATH="$GOMODPATH/bin:$GOMODPATH/golangmod/bin:$PATH"' >>~/.bashrc
source ~/.bashrc
# 3.输入go version检查是否有安装成功
# 4.配置go代理
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GOPATH=/opt/go/golangmod
```

## 安装guake

```python
sudo apt install guake
```

## 安装openresty

```python
https://openresty.org/cn/installation.html
```

## 安装fastgithub

在[https://github.com/dotnetcore/FastGithub](https://github.com/dotnetcore/FastGithub)下载fastgithub的linux版本
​

```python
以服务启动
sudo ./fastgithub start

配置代理
修改   /etc/profile   文件
添加
export http_proxy=http://127.0.0.1:38457
export https_proxy=http://127.0.0.1:38457
```

## 安装dotnet

[https://docs.microsoft.com/zh-cn/dotnet/core/install/linux-ubuntu#2004-](https://docs.microsoft.com/zh-cn/dotnet/core/install/linux-ubuntu#2004-)

##
