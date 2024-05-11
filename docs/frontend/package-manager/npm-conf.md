# npm的使用

## node使用国内镜像

假设已经安装好了npm,则需要更改代理
`npm i -g mirror-config-china`
他会在`$home` 目录生成一个.npmrc文件,配置代理

```bash
registry=https://registry.npmmirror.com
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

```

## 全局包位置

npm全局包位置
`AppData\Roaming\npm`


## npm用法


### npm安装包

1. 直接通过用户名安装
```
#   直接利用用户名与仓库名进行安装
npm install RobinCK/vue-ls
#   或者为了提醒自己，加上github前缀进行区分
npm install github:RobinCK/vue-ls
```
2. 通过git仓库安装
```
#   这样适合安装公司内部的git服务器上的项目
npm install git+https://github.com/RobinCK/vue-ls.git#<branch>
#   或者以ssh的方式
npm install git+ssh://git@github.com:RobinCK/vue-ls.git#<branch>
```
3. 安装本地包
```
# 本地依赖文件（相对路径）
npm install ./my-test-npm

# 本地依赖文件（相对路径）
npm i ../../../my-test-npm

# 本地依赖文件（绝对路径）
npm i e:\my-test-npm
```


查看各种路径命令 查看当前npm包的全局安装路径
```
npm prefix -g
```


查看配置列表
```
npm config ls
```
修改路径命令 修改npm的包的全局安装路径
```
npm config set prefix "D:\nodejs\node_global"
```
修改npm的包的全局cache位置
```
npm config set cache "D:/nodejs/npm_cache"
```
配置环境变量

yarn 的安装路径和缓存路径 查看各种路径命令 查看 yarn 全局bin位置
```
yarn global bin
```
查看 yarn 全局安装位置
```
yarn global dir
```
查看 yarn 全局cache位置
```
yarn cache dir
```
修改路径命令 改变 yarn 全局bin位置
```
yarn config set prefix "E:\yarn\Data"
```
改变 yarn 全局安装位置
```
yarn config set global-folder "E:\yarn\Data\global"
```
改变 yarn 全局cache位置
```
yarn config set cache-folder "E:\yarn\Cache"
```
改变 yarn 全局 link 位置
```
yarn config set link-folder "E:\yarn\Data\link"
```
或者直接在`~/.yarnrc`修改为
```
registry "https://registry.npmmirror.com/"
cache-folder "E:\\yarn\\Cache"
global-folder "E:\\yarn\\Data\\global"
link-folder "E:\\yarn\\Data\\link"
prefix "E:\\yarn\\Data"

``` 
