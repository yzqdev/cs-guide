# WSL 配置

> 在 PowerShell 中管理 WSL（Windows Subsystem for Linux）的相关配置。

## 访问 WSL 文件

资源管理器输入：`\\wsl$`

对应本地路径：

```
C:\Users\<username>\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\rootfs
```

## 一键换源

### 中科大源

```bash
sudo sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
sudo sed -i 's/security.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
```

### 其他国内源

| 源 | 地址 |
|----|------|
| 搜狐 | <http://mirrors.sohu.com/> |
| 网易 | <http://mirrors.163.com/> |
| 开源中国 | <http://mirrors.oschina.net/> |
| 阿里云 | <http://mirrors.aliyun.com/> |

将上面的 `mirrors.ustc.edu.cn` 替换为任一地址即可。

## 安装软件

### 基本工具

```bash
sudo apt update
sudo apt install net-tools tree htop zip unzip
```

### 获取 Linux IP

```bash
alias myip="ip address | grep inet | grep eth0 | awk '{print $2}'"
```

### 安装 Java

```bash
sudo apt install openjdk-17-jdk-headless
```

### 安装 NVM

参考：<https://github.com/nvm-sh/nvm#git-install>

### 安装 Nginx

```bash
sudo apt install nginx
sudo nginx                    # 启动
nginx -t                      # 查看配置路径
nginx -s reload               # 重启
```

## 关闭 WSL

```bash
wsl --shutdown
```

参考：<https://docs.microsoft.com/zh-cn/windows/wsl/basic-commands#install>
