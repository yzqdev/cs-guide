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

```json
{
  "dependencies": {
    "@nestjs/cli": "^8.2.4",
    "@quasar/cli": "^1.2.2",
    "@tarojs/cli": "^3.3.0",
    "@vitejs/create-app": "^2.4.5",
    "@vue/cli": "^5.0.1",
    "create-docusaurus": "^2.0.0-beta.17",
    "create-ice": "^1.7.4",
    "create-next-app": "^11.0.1",
    "create-nuxt-app": "^4.0.0",
    "create-tauri-app": "^1.0.0-rc.3",
    "create-vite": "^2.9.0",
    "create-vite-app": "^1.21.0",
    "docsify-cli": "^4.4.4",
    "expo-cli": "^5.2.0",
    "gulp-cli": "^2.3.0",
    "hexo-cli": "^4.3.0",
    "lerna": "^4.0.0",
    "less": "^4.1.1",
    "local-web-server": "^5.1.1",
    "npkill": "^0.8.3",
    "npm-check-updates": "^12.5.8",
    "nrm": "^1.2.5",
    "pnpm": "^6.32.3",
    "pug-cli": "^1.0.0-alpha6",
    "rimraf": "^3.0.2",
    "rollup": "^2.52.7",
    "serve": "^12.0.0",
    "taze": "^0.5.0",
    "ts-node": "^10.7.0",
    "typeorm": "^0.3.3",
    "typescript": "^4.6.2"
  }
}
```

如果使用yarn 安装node-sass失败 出现node-gyp error就在根目录下新建一个`.yarnrc` 文件
然后写入,这样就可以下载node-sass了

```bash

phantomjs_cdnurl https://npmmirror.com/mirrors/phantomjs
sass_binary_site https://npmmirror.com/mirrors/node-sass/
registry https://registry.npmmirror.com

```

其实node-sass已经弃用了,建议使用dart-sass , 命令`yarn add sass`
​

```shell
yarn config set registry https://registry.npmmirror.com -g
yarn config set disturl https://npmmirror.com/dist -g
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/ -g
yarn config set sass_binary_site https://npmmirror.com/mirrors/node-sass/ -g
yarn config set chromedriver_cdnurl https://npmmirror.com/dist/chromedriver -g
yarn config set operadriver_cdnurl https://npmmirror.com/dist/operadriver -g
yarn config set fse_binary_host_mirror https://npmmirror.com/mirrors/fsevents -g
```
