# yarn配置

## 从 `create-*` 包创建一个模板

这个命令让你做两件事情:

- 全局安装`create-<starter-kit-package>`  , 或者把这个包更新到最新版本(如果存在的话)
- Run the executable located in the `bin` field of the starter kits `package.json`, forwarding any `<args>` to it
例如, `yarn create react-app my-app`等价于:

```bash
yarn add create-react-app
create-react-app my-app
yarn remove create-react-app
```

```text
## 全局包位置

C:\Users\yanni\AppData\Local\Yarn  (bin目录是可执行文件目录)
npm全局包位置
C:\Users\yanni\AppData\Roaming\npm

```

- mirror-config-china
- npm-check-updates
- prettier
- serve
- typescript
- @vue/cli
- gulp-cli
- hexo-cli
- docsify-cli
- sass
- less

如果使用yarn 安装node-sass失败 出现node-gyp error就在根目录下新建一个`.yarnrc` 文件
然后写入,这样就可以下载node-sass了

```bash

phantomjs_cdnurl https://npmmirror.com/mirrors/phantomjs
sass_binary_site https://npmmirror.com/mirrors/node-sass/
registry https://registry.npmmirror.com

```

其实node-sass已经弃用了,建议使用dart-sass , 命令`yarn add sass`
​

```powershell
yarn config set registry https://registry.npmmirror.com -g
yarn config set disturl https://npmmirror.com/dist -g
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/ -g
yarn config set sass_binary_site https://npmmirror.com/mirrors/node-sass/ -g
yarn config set chromedriver_cdnurl https://npmmirror.com/dist/chromedriver -g
yarn config set operadriver_cdnurl https://npmmirror.com/dist/operadriver -g
yarn config set fse_binary_host_mirror https://npmmirror.com/mirrors/fsevents -g
```
