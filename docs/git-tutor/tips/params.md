# 技巧1

```powershell
# clone 下来指定的单一分支
git clone -b <branch-name> --single-branch https://github.com/user/repo.git
# 只会 clone 最近一次提交，将减少 clone 时间
git clone --depth=1 https://github.com/user/repo.git

```

## gitclone单个文件夹

```
git config core.sparsecheckout true


 mkdir models # 创建一个与要clone的仓库同名或不同命的目录
 cd models
 git init #初始化
 git remote add origin  https://github.com/tensorflow/models.git # 增加远端的仓库地址
 git config core.sparsecheckout true # 设置Sparse Checkout 为true 
 echo "research/deeplab" >> .git/info/sparse-checkout # 将要部分clone的目录相对根目录的路径写入配置文件
 git pull --depth 1 origin master 
```

## ssh或者https clone慢解决办法

和 Git 类似，你需要修改 SSH 的全局配置文件。

1. 打开或创建你的 SSH 配置文件。Windows 的路径一般在： `C:\Users\你的用户名\.ssh\config` *(如果没有 `config` 文件，直接新建一个，**注意不要有 .txt 后缀**)*

2. 根据你想代理的范围，把下面对应的代码贴进去并保存：

### 情况 A：只让连接 GitHub 时走代理（推荐）

如果你只是用 Git 提代码慢，用这个最安全：

```
Host github.com
    User git
    ProxyCommand connect -H 127.0.0.1:7897 %h %p
```

### 情况 B：让所有外网的 SSH 连接全部走代理

如果你经常需要连接国外的 VPS 服务器，想让所有的 ssh user@ip 都变快：

```
Host *
    # 排除本地局域网，防止连内网设备时报错
    IgnoreUnknown AddKeysToAgent,UseKeychain
    HostName %h
    ProxyCommand connect -H 127.0.0.1:7897 %h %p

```

## https clone慢解决

```
# 1. 给 Git 全局配置 HTTP 和 HTTPS 代理
git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897

# 2. 使用 HTTPS 地址重新克隆
git clone https://github.com/xxx/xxx.git

```
