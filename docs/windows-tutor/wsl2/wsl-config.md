# wsl配置

## 配置

资源管理器中输入：\\wsl$
对应的路径是
C:\Users\Melville\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\rootfs

## 一键换源

```java
直接复制下面的命令到窗口中执行：
sudo sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
如果想替换security源：
sudo sed -i 's/security.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list 
```

其它更多国内源参考，将上面的[http://mirrors.ustc.edu.cn](http://mirrors.ustc.edu.cn/)换成下面任一种即可，不同地区下载速度有一定差别。
搜狐开源镜像站：[http://mirrors.sohu.com/](http://mirrors.sohu.com/)
网易开源镜像站：[http://mirrors.163.com/](http://mirrors.163.com/)
开源中国：[http://mirrors.oschina.net/](http://mirrors.oschina.net/)
阿里云开源镜像：[http://mirrors.aliyun.com/](http://mirrors.aliyun.com/)

## 安装软件

### 安装基本软件

```python
sudo  apt install net-tools tree htop zip unzip
```

### 获取linux的ip

```python
alias myip ="ip address|grep inet |grep eth0|awk '{print$2}'"
```

### 安装java

```java
sudo apt install openjdk-17-jdk-headless
```

### 安装nvm

[https://github.com/nvm-sh/nvm#git-install](https://github.com/nvm-sh/nvm#git-install)

```python
添加
```

## 安装Nginx

```shell
sudo apt install nginx

# 启动
sudo nginx

# 获取配置文件路径
nginx -t

# 重启
nginx -s reload
```

​

​

​

关闭wsl[https://docs.microsoft.com/zh-cn/windows/wsl/basic-commands#install](https://docs.microsoft.com/zh-cn/windows/wsl/basic-commands#install)

```java
 wsl --shutdown
```
