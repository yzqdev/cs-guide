# Linux Mint 环境配置

## 一、系统初步配置

1. **配置镜像源**：全改为国内镜像，加快包下载速度
2. **安装常用软件**：gedit、vscode、chrome、vivaldi、teamviewer 等
3. **配置开发环境**：nvm、yarn、mirror-config-china
4. **美化终端**：安装 oh-my-zsh，理解 `.bash_profile`、`.bashrc`、`.zshrc` 的作用
5. **安装字体**：微软雅黑、YaHei Mono 等，更改终端字体样式
6. **配置 Python 环境**：安装 Miniconda，配置 condarc 国内镜像

## 二、安装 SSH 服务

```bash
sudo apt-get install openssh-server
sudo systemctl enable --now ssh
```

## 三、安装 Node.js

通过 nvm 安装（详见 [linux-nodejs.md](./linux-nodejs.md)）：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
npm config set registry https://registry.npmmirror.com
```

## 四、安装 Java

```bash
# 从 Adoptium 下载 JDK
wget https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.2%2B8/OpenJDK17U-jdk_x64_linux_hotspot_17.0.2_8.tar.gz

# 解压
tar xzf OpenJDK17U-jdk_x64_linux_hotspot_17.0.2_8.tar.gz

# 添加环境变量（~/.bashrc 或 ~/.zshrc）
export PATH=$PWD/jdk-17.0.2+8/bin:$PATH

# 验证
java -version
```

## 五、安装 Docker

```bash
# 使用官方便捷脚本
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 将当前用户加入 docker 组
sudo usermod -aG docker $USER

# 启动 Docker
sudo systemctl enable --now docker
```

## 六、安装 Go

```bash
# 下载 Go
wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz

# 解压到 /opt
sudo tar -C /opt -xzf go1.21.0.linux-amd64.tar.gz

# 配置环境变量（~/.bashrc 或 ~/.zshrc）
export GOROOT=/opt/go
export GOPATH=$HOME/go
export PATH="$GOROOT/bin:$GOPATH/bin:$PATH"

# 配置 Go 代理
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct

# 验证
go version
```

## 七、安装 Guake 终端

```bash
sudo apt install guake
# 启动后按 F12 可快速打开/隐藏
```

## 八、安装 OpenResty

```bash
# 参考官方安装教程
https://openresty.org/cn/installation.html
```

## 九、安装 FastGitHub（加速 GitHub 访问）

```bash
# 从 GitHub 下载 FastGithub 的 Linux 版本
# https://github.com/dotnetcore/FastGithub

# 以服务启动
sudo ./fastgithub start

# 配置代理（修改 /etc/profile）
export http_proxy=http://127.0.0.1:38457
export https_proxy=http://127.0.0.1:38457
```

## 十、安装 .NET

```bash
# 参考微软官方文档
https://docs.microsoft.com/zh-cn/dotnet/core/install/linux-ubuntu
```