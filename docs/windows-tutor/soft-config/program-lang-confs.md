# 软件配置文件


## .npmrc

> 路径 ${userhome}/.npmrc

```bash
registry=https://registry.npmmirror.com/
disturl=https://npmmirror.com/dist
chromedriver-cdnurl=https://npmmirror.com/mirrors/chromedriver
couchbase-binary-host-mirror=https://npmmirror.com/mirrors/couchbase/v{version}
debug-binary-host-mirror=https://npmmirror.com/mirrors/node-inspector
electron-mirror=https://npmmirror.com/mirrors/electron/
flow-bin-binary-host-mirror=https://npmmirror.com/mirrors/flow/v
fse-binary-host-mirror=https://npmmirror.com/mirrors/fsevents
fuse-bindings-binary-host-mirror=https://npmmirror.com/mirrors/fuse-bindings/v{version}
git4win-mirror=https://npmmirror.com/mirrors/git-for-windows
gl-binary-host-mirror=https://npmmirror.com/mirrors/gl/v{version}
grpc-node-binary-host-mirror=https://npmmirror.com/mirrors
hackrf-binary-host-mirror=https://npmmirror.com/mirrors/hackrf/v{version}
leveldown-binary-host-mirror=https://npmmirror.com/mirrors/leveldown/v{version}
leveldown-hyper-binary-host-mirror=https://npmmirror.com/mirrors/leveldown-hyper/v{version}
mknod-binary-host-mirror=https://npmmirror.com/mirrors/mknod/v{version}
node-sqlite3-binary-host-mirror=https://npmmirror.com/mirrors
node-tk5-binary-host-mirror=https://npmmirror.com/mirrors/node-tk5/v{version}
nodegit-binary-host-mirror=https://npmmirror.com/mirrors/nodegit/v{version}/
operadriver-cdnurl=https://npmmirror.com/mirrors/operadriver
phantomjs-cdnurl=https://npmmirror.com/mirrors/phantomjs
profiler-binary-host-mirror=https://npmmirror.com/mirrors/node-inspector/
puppeteer-download-host=https://npmmirror.com/mirrors
python-mirror=https://npmmirror.com/mirrors/python
rabin-binary-host-mirror=https://npmmirror.com/mirrors/rabin/v{version}
sass-binary-site=https://npmmirror.com/mirrors/node-sass
sodium-prebuilt-binary-host-mirror=https://npmmirror.com/mirrors/sodium-prebuilt/v{version}
sqlite3-binary-site=https://npmmirror.com/mirrors/sqlite3
utf-8-validate-binary-host-mirror=https://npmmirror.com/mirrors/utf-8-validate/v{version}
utp-native-binary-host-mirror=https://npmmirror.com/mirrors/utp-native/v{version}
zmq-prebuilt-binary-host-mirror=https://npmmirror.com/mirrors/zmq-prebuilt/v{version}
strict-ssl=false
auto-install-peers=true
```

## yarnrc (同npmrc)

## .condarc

```bash
channels:
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - defaults
show_channel_urls: true
default_channels:
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
changeps1: false
auto_activate_base: false
```

## pip.ini

> ${userhome}/pip/pip.ini

```bash
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = pypi.tuna.tsinghua.edu.cn
```

## 　.pathrc

```bash


export NVM_DIR="$HOME/.nvm"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


export DENO_INSTALL="/home/yzqdev/.deno"

export YARNPKG="/home/yzqdev/.yarn"

export JAVA_HOME=/home/yzqdev/.jdks/jdk-17.0.2+8

 

export GOMODPATH=/opt/go

export OPENPATH=/usr/local/openresty/nginx

export PATH="$GOMODPATH/bin:$GOMODPATH/golangmod/bin:$OPENPATH/sbin:$JAVA_HOME/bin:$DENO_INSTALL/bin:$YARNPKG/bin:$PATH"
```
