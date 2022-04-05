# 购买服务器后的配置

## 安装zsh

1、安装zsh
sudo apt-get install zsh
2、把默认的Shell改成zsh

```bash
chsh -s /bin/zsh
```

注意：不要使用sudo。

## 安装nodejs

使用nvm安装nodejs
[https://github.com/nvm-sh/nvm#git-install](https://github.com/nvm-sh/nvm#git-install)
然后运行 `nvm install node`

## 安装java

### 如果这种方式不需要环境变量,但不一定是最新的

```shell
sudo apt install openjdk-11-jdk-headless 
```

### 手动安装jdk(是最新的)

[https://adoptium.net/archive.html](https://adoptium.net/archive.html)
这里下载jdk后上传到服务器解压,配置环境变量即可

### 更改环境变量

```shell
sudo vi ~/.bashrc
```

文件尾追加。

```shell
#set oracle jdk environment
export JAVA_HOME=/usr/lib/jvm/jdk-11.0.7
export JRE_HOME=${JAVA_HOME} 
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib  
export PATH=${JAVA_HOME}/bin:$PATH
```

使配置生效

```shell
source ~/.bashrc
```

查看配置是否成功

```shell
java -version
javac -version
```

## 安装mysql

## 安装Nginx

```java
sudo apt-get install nginx

sudo systemctl start nginx

然后输入你的服务器ip出现nginx默认页面即可

```

## 或者安装open-resty

:::tip

OpenResty是一个基于 Nginx 与 Lua 的高性能 Web 平台，其内部集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。

简单地说OpenResty 的目标是让你的Web服务直接跑在 Nginx 服务内部，充分利用 Nginx 的非阻塞 I/O 模型，不仅仅对 HTTP 客户端请求,甚至于对远程后端诸如 MySQL、PostgreSQL、Memcached 以及 Redis 等都进行一致的高性能响应
:::

```shell
apt-get install libpcre3-dev \
    libssl-dev perl make build-essential curl

sudo apt install openresty
```
