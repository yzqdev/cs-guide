# linux的node配置

问题  usr/bin/env: "node": 没有那个文件或目录

手动创建软连接

```bash
sudo ln -s `which node` /usr/bin/node
```

或者:

```bash
sudo ln -s /usr/bin/nodejs /usr/bin/node
```

cli常用命令

**yarn add 添加依赖包**

```bash
yarn add webpack  安装 latest   最新版本
yarn add package-name@1.2.3    从 registry 里安装这个包的指定版本。
yarn add package-name@tag      安装某个 “tag” 标识的版本（比如 beta、next 或者 latest）
```

**yarn cache 全局缓冲**

```bash
yarn cache list 列出已缓存的每个包
yarn cache dir  当前的 yarn 全局缓存在哪里
yarn cache clean  运行此命令将清除全局缓存
yarn config set cache-folder <path> 配置缓存目录。
```

**yarn config 配置文件**

```bash
yarn config 查看配置
C:\Users\用户>yarn config get bin-links   查看某一项配置
true
yarn config set registry 'https://registry.npm.taobao.org'  转成淘宝镜像
```

**yarn global 全局安装**

```bash
// yarn 默认是不建议全局安装的，因为全局安装的包无法通过.lock来捕获到，当你的项目移到别的地方运行的时候就可能出现问题
yarn global add webpack
yarn global upgrade webpack
yarn global remove webpack
```

**yarn info 查看包的信息**

```bash
yarn info react 
yarn info react --json json化一下
yarn info react@15.3.0  查看指定版本
```

**yarn install 安装全部依赖**

```
yarn install
或者
yarn
```

**yarn remove 移除依赖**

```
yarn remove webpack
```

**yarn run 运行一个定义好的脚本**

```json
{
  "name": "my-package",
  "scripts": {
    "build": "babel src -d lib",
    "test": "jest"
  }
}
```

**yarn upgrade 更新**

```bash
yarn upgrade
yarn upgrade left-pad
yarn upgrade left-pad@^1.0.0
```

**yarn why 显示一个包为何要安装**

```bash
yarn why jest
```

**yarn publish 发布自己的包**

**yarn init 初始化一个项目**
在系统`System.getProperty("user.home")`目录新建.npmrc文件,写入下面的内容

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

```bash
yarn config set registry https://registry.npmmirror.com -g
yarn config set disturl https://npmmirror.com/dist -g
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/ -g
yarn config set sass_binary_site https://npmmirror.com/mirrors/node-sass/ -g
yarn config set phantomjs_cdnurl https://npmmirror.com/mirrors/phantomjs/ -g
yarn config set chromedriver_cdnurl https://npmmirror.com/dist/chromedriver -g
yarn config set operadriver_cdnurl https://npmmirror.com/dist/operadriver -g
yarn config set fse_binary_host_mirror https://npmmirror.com/mirrors/fsevents -g
```

如果需要更改镜像可以全局安装nrm nvm yrm mirror-config-china等包
npm查找全局安装包: `npm root -g`
查看安装的所有全局包: `npm ls -g`
仅查看一级目录:`npm ls -g --depth 0 | grep packageName --depth 0`
yarn查找全局安装包: `yarn global dir`
配置文件位置 :`c:\Users\用户名\`  名称: `.npmrc .yarnrc`
问题描述： npm 和  yarn 的一些缓存和全局安装的包，默认都会在C盘存储，这个对于C盘的宝贵空间来说，实在是不能忍啊。
于是乎，百度了如何改变npm默认的缓存位置
在CMD命令行中执行
# 1.改变npm 全局安装位置

```bash
npm config set prefix "你的磁盘路径"
```

# 这里是我的路径

```bash
npm config set prefix "D:\appCache\nodejs\node_global"
```

# 2. 改变 npm 缓存位置

```bash
npm config set cache "你的磁盘路径"
```

# 这里是我的路径

```bash
npm config set cache "D:\appCache\nodejs\node_cache"
```

然后配置一下系统环境变量
将 `D:\appCache\nodejs\node_global`和 `D:\appCache\nodejs\node_global\node_modules`这两个添加到你的系统环境变量中。
Yarn 的安装： 在官网下载 安装包。
修改全局安装位置 和 缓存位置
在CMD命令行中执行
# 1.改变 yarn 全局安装位置

```bash
yarn config  set global-folder "你的磁盘路径"
```

# 2.然后你会在你的用户目录找到 `.yarnrc` 的文件，打开它，找到 `global-folder` ，改为 `--global-folder`
# 这里是我的路径

```bash
yarn config set global-folder "D:\appCache\yarn\global"
```

# 2. 改变 yarn 缓存位置

```bash
yarn config cache-folder "你的磁盘路径"
```

# 这里是我的路径

```bash
yarn config cache-folder "D:\appCache\yarn\cache"
```

在我们使用 全局安装 包的时候，会在 `“D:\appCache\yarn\global”`下 生成 node_modules.bin 目录
我们需要将`D:\appCache\yarn\global\node_modules\.bin`整个目录 添加到系统环境变量中去，否则通过yarn 添加的全局包 在cmd 中是找不到的。
检查当前yarn 的 bin的 位置

```bash
yarn global bin
```

检查当前 yarn 的 全局安装位置

```bash
yarn global dir
```

nvm设置镜像

```bash
nvm 设置淘宝镜像
windows版本
设置npm_mirror:
nvm npm_mirror https://npmmirror.com/mirrors/npm/

设置node_mirror:
nvm node_mirror https://npmmirror.com/mirrors/node/
```

```
linux版本
在.bashrc中添加下面的内容
export NVM_NODEJS_ORG_MIRROR=http://npmmirror.com/mirrors/node
```
