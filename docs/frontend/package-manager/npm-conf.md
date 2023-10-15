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
yarn global的package.json
```
{

  "dependencies": {

    "@ant-design/pro-cli": "^3.1.0",

    "@antfu/ni": "^0.21.8",

    "@ionic/cli": "^7.1.1",

    "@nestjs/cli": "^10.1.18",

    "@nestjs/schematics": "^10.0.2",

    "@quasar/cli": "^2.3.0",

    "@tarojs/cli": "^3.6.17",

    "@vue/cli": "^5.0.8",

    "@vue/devtools": "^6.5.0",

    "@zhinjs/cli": "^0.2.33",

    "alloy": "^2.0.2",

    "arco-cli": "^1.27.5",

    "bozon": "^1.3.5",

    "create-ant-design-pro": "^0.4.1",

    "create-astro": "^4.2.1",

    "create-docusaurus": "^2.4.3",

    "create-electron-app": "^6.4.2",

    "create-electron-vite": "^0.4.0",

    "create-father": "^4.3.5",

    "create-ice": "^1.9.1",

    "create-ink-app": "^3.0.2",

    "create-midway": "^1.2.2",

    "create-monkey": "^1.35.0",

    "create-next-app": "^13.5.3",

    "create-preact": "^0.2.1",

    "create-quasar": "^1.4.4",

    "create-remix": "^2.0.1",

    "create-solid": "^0.3.6",

    "create-storybook": "^1.0.0",

    "create-strapi-app": "^4.13.7",

    "create-svelte": "^5.1.0",

    "create-t3-app": "^7.20.2",

    "create-tauri-app": "^3.7.3",

    "create-umi": "^4.0.81",

    "create-vite": "^4.4.1",

    "create-vite-extra": "^1.1.0",

    "create-vue": "^3.7.5",

    "create-vuepress-theme-hope": "^2.0.0-beta.238",

    "fastify-cli": "^5.8.0",

    "hexo-cli": "^4.3.1",

    "native-run": "^1.7.3",

    "npm-home": "^3.0.1",

    "pm2": "^5.3.0",

    "pnpm": "^8.9.0",

    "prettier": "^3.0.3",

    "pug": "^3.0.2",

    "react-devtools": "^4.28.0",

    "sass-migrator": "^1.7.3",

    "serve": "^14.2.1",

    "stylus": "^0.60.0",

    "taze": "^0.11.2",

    "titanium": "^6.1.1",

    "typescript": "^5.2.2",

    "verdaccio": "^5.26.3",

    "yrm": "^1.0.6"

  }

}
```