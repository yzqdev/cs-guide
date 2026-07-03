# WSL 配置

> 在 PowerShell 中管理 WSL（Windows Subsystem for Linux）的相关配置。

## 配置

资源管理器中输入：`\\wsl$`

对应的路径是：

```txt
C:\Users\Melville\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\rootfs
```

## 一键换源

直接复制下面的命令到窗口中执行：

```bash
sudo sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
```

如果想替换 security 源：

```bash
sudo sed -i 's/security.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
```

其它更多国内源参考，将上面的 `http://mirrors.ustc.edu.cn` 换成下面任一种即可，不同地区下载速度有一定差别。

- 搜狐开源镜像站：<http://mirrors.sohu.com/>
- 网易开源镜像站：<http://mirrors.163.com/>
- 开源中国：<http://mirrors.oschina.net/>
- 阿里云开源镜像：<http://mirrors.aliyun.com/>

## 安装软件

### 安装基本软件

```bash
sudo apt install net-tools tree htop zip unzip
```

### 获取 Linux 的 IP

```bash
alias myip="ip address|grep inet |grep eth0|awk '{print$2}'"
```

### 安装 Java

```bash
sudo apt install openjdk-17-jdk-headless
```

### 安装 nvm

参考：<https://github.com/nvm-sh/nvm#git-install>

## 安装 Nginx

```bash
sudo apt install nginx

# 启动
sudo nginx

# 获取配置文件路径
nginx -t

# 重启
nginx -s reload
```

## 关闭 WSL

参考：<https://docs.microsoft.com/zh-cn/windows/wsl/basic-commands#install>

```bash
wsl --shutdown
```
