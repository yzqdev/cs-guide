# tamper插件编写

## 搭建jquery开发环境

油猴可以 `// @require ...` 的方法引用外部js文件，如果要引用本地文件，需要在浏览器插件设置中允许油猴访问文件URL，步骤

在浏览器地址栏输入：`edge://extensions`  
找到Tampermonkey，点详细信息，打开`允许访问文件 URL`

在脚本头部添加:`@require file://E:\myjs.js`

## 搭建webpack开发环境

:::tip
见[https://github.com/the1812/Bilibili-Evolved](https://github.com/the1812/Bilibili-Evolved)

:::
下面是一个样例
meta.json

```json
{
  "name": "tamper-webpack",
  "description": "Bilibili Evolved 的预览版, 可以抢先体验新功能.",
  "updateURL": "https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@preview/dist/bilibili-evolved.preview.user.js",
  "downloadURL": "https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@preview/dist/bilibili-evolved.preview.user.js",
  "version": "2.1.7",
  "author": "Grant Howard, Coulomb-G",
  "copyright": "[year], Grant Howard (https://github.com/the1812) & Coulomb-G (https://github.com/Coulomb-G)",
  "licence": "MIT",
  "match": "https://bbs.mihoyo.com/ys/*",
  "exclude": [
    "*://api.bilibili.com/*",
    "*://api.*.bilibili.com/*",
    "*://*.bilibili.com/api/*",
    "*://member.bilibili.com/studio/bs-editor/*",
    "*://t.bilibili.com/h5/dynamic/specification",
    "*://bbq.bilibili.com/*",
    "*://message.bilibili.com/pages/nav/header_sync",
    "*://s1.hdslb.com/bfs/seed/jinkela/short/cols/iframe.html"
  ],
  "run-at": "document-end",
  "supportURL": "https://github.com/the1812/Bilibili-Evolved/issues",
  "homepage": "https://github.com/the1812/Bilibili-Evolved",
  "grant": [
    "unsafeWindow",
    "GM_getValue",
    "GM_setValue",
    "GM_deleteValue",
    "GM_info",
    "GM_xmlhttpRequest"
  ],
  "connect": [
    "raw.githubusercontent.com",
    "github.com",
    "cdn.jsdelivr.net",
    "cn.bing.com",
    "www.bing.com",
    "translate.google.cn",
    "translate.google.com",
    "localhost",
    "*"
  ],
  "require": [
    "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"
  ],
  "icon": "https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@preview/images/logo-small.png",
  "icon64": "https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@preview/images/logo.png"
}

```

package.json

```json
{
  "name": "tamper-webpack",
  "version": "1.0.0",
  "license": "MIT",
  "scripts": {
    "dev": "webpack --watch --config config/webpack.dev.js",
    "build": "webpack --config config/webpack.prod.js"
  },
  "dependencies": {
    "clean-webpack-plugin": "^4.0.0",
    "css-loader": "^6.7.1",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.5.0",
    "html-webpack-template": "^6.2.0",
    "mini-css-extract-plugin": "latest",
    "prettier": "^2.6.2",
    "sass": "^1.50.0",
    "sass-loader": "^12.6.0",
    "style-loader": "^3.3.1",
    "terser-webpack-plugin": "^5.3.1",
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-middleware": "^5.3.1",
    "webpack-dev-server": "^4.8.1",
    "webpack-hot-middleware": "^2.25.1",
    "webpack-merge": "^5.8.0"
  }
}

```

loaders.js

```js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssLoader = {
  test: /\.css$/,
  use: [
    // {
    //   loader: MiniCssExtractPlugin.loader
    // },
    {
      loader: "css-loader",
    },
    {
      loader: "postcss-loader",
      options: {
        config: {
          path: path.join(__dirname, "./postcss.config.js"),
        },
      },
    },
  ],
};
const csLoader = {
  test: /\.css$/,
  use:  ["css-loader", MiniCssExtractPlugin.loader], // 从右向左解析

};
const sassLoader = {
  test: /\.scss$/,

    use: [{
      loader: "style-loader" // 将 JS 字符串生成为 style 节点
    }, {
      loader: "css-loader" //  将 CSS 转化成 CommonJS 模块
    }, {
      loader: "sass-loader" // 将 Sass 编译成 CSS
    }]

};
const fileLoader = {
  test: /\.(png|svg|jpg|gif)$/,
  use: [`file-loader`],
};
const jsxLoader = {
  test: /\.jsx$/,
  exclude: /(node_modules)/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-react"],
    },
  },
};
const svgLoader = {
  test: /\.svg$/,
  use: [
    {
      loader: "image-webpack-loader",
    },
    {
      loader: "base64-inline-loader",
    },
  ],
};

const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: { presets: ["@babel/preset-env"] },
  },
};
const eslintLoader = {
  test: /\.js$/,
  enforce: "pre",
  exclude: /node_modules/,
  use: {
    loader: "eslint-loader",
    options: {
      configFile: path.join(__dirname, "../.eslintrc"),
    },
  },
};
const csvLoader = {
  test: /\.(csv|tsc)$/,
  use: [`csv-loader`],
};

const htmlLoader = {
  test: /\.html$/,
  use: "file-loader?name=[name].[ext]",
};
const xmlLoader = {
  test: /\.xml$/,
  use: ["xml-loader"],
};
const imageLoader = {
  test: /\.(png|jpg|jpeg|gif)$/,
  use: "url-loader?limit=1024&name=images/[name]_[hash].[ext]",
};

module.exports = {
  jsLoader,
  svgLoader,
  xmlLoader,
  imageLoader,
  csvLoader,
  csLoader,
  fileLoader,
  sassLoader,
  cssLoader,
  jsxLoader,
  htmlLoader,
};

```

webpack.common.js

```js
// 
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //这里必须这样写
const loaders = require("./loaders");
const {getBanner} = require("./webpack.utils");
const meta = require("./meta.json");
module.exports = {
  entry:  './src/index.js',
  output: {
    filename: "tamper-webpack.dev.user.js",
    path: path.resolve(__dirname, "../build"),
    publicPath: path.resolve(__dirname, "../build"),
    // 在script标签上添加crossOrigin,以便于支持跨域脚本的错误堆栈捕获
    crossOriginLoading: "anonymous",
  },
  plugins: [
    // new CleanWebpackPlugin(), //这里注意要大写啊
    new webpack.BannerPlugin({
      banner: getBanner(meta),
      raw: true,
      entryOnly: true,
    }),


  ],
  resolve: {
    modules: [
      path.resolve(__dirname, "../src"),
    ],
    alias: {
      components: path.resolve(__dirname, "/src/components"),
    },
  },

  module: {
    rules: [
      loaders.cssLoader,
        loaders.sassLoader,
      loaders.fileLoader,
    ],
  },
};

```

webpack.dev.js

```js
//
const {merge} = require("webpack-merge");
const os=require('os');
const common = require("./webpack.common.js");
const utils=require('./webpack.utils')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = merge(common, {

  mode:'development',
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          comments: /==\/?UserScript==|^[ ]?@|eslint-disable|spell-checker/i,
        },
      },
      extractComments: false,
    }),],
  }


});

```

webpack.prod.js

```js
const webpack = require("webpack");

const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode:`production`,
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: /==\/?UserScript==|^[ ]?@|eslint-disable|spell-checker/i,
          },
        },
        extractComments: false,
      }),
    ],
  },

});

```

webpack.util.js

```js
const os=require('os');
const commonMeta=require('./meta.json')
const year = new Date().getFullYear()
const getBanner = meta => `// ==UserScript==\n${Object.entries(Object.assign(meta, commonMeta)).map(([key, value]) => {
  if (Array.isArray(value)) {
    return value.map(item => `// @${key.padEnd(16, ' ')}${item}`).join('\n')
  }
  return `// @${key.padEnd(16, ' ')}${value.replace(/\[year\]/g, year)}`
}).join('\n')}
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */
// @[ You can find all source codes in GitHub repo ]`
/*
获取本机IP
*/
const getIpAddress = () => {
  let localIPAddress = ``;
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {

    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (
        alias.family === `IPv4` &&
        alias.address !== `127.0.0.1` &&
        !alias.internal
      ) {
        localIPAddress = alias.address;
      }
    }
  }
  return localIPAddress;
};
module.exports = {
   getIpAddress,getBanner
};
```

## 搭建vite开发环境

:::tip
[https://github.com/lisonge/vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)
:::

开发模式下所使用的油猴脚本：

`@updateURL` `@downloadURL`必须以`.user.js`结尾

```js
// ==UserScript==
// @name         tampermonkey-test
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  try to take over the world!
// @author
// @match        https://*/*
// @match        http://*/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.2.6/dist/vue.global.min.js
// @updateURL    https://xxxxxxxx.user.js
// @downloadURL  https://xxxxxxxx.user.js

// ==/UserScript==

(function () {
  "use strict";
  if (location.href === "http://localhost:3000/") return;
  var script = document.createElement("script");
  script.type = "module";
  script.src = "http://localhost:3000/@vite/client";
  document.body.appendChild(script);
  var script2 = document.createElement("script");
  script2.type = "module";
  script2.src = "http://localhost:3000/src/main.js";
  document.body.appendChild(script2);
})();
```

修改 HMR（默认情况下 hmr 会使用基于 window.location 的相对地址）：

```js
// vite.config.js

import ...

export default defineConfig({
 ...,

 server: {
  ...,

    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
})
```

项目开发像正常开发一样即可，main.ts/js 即为脚本入口（根据 vite 设置修改）

根据脚本功能可能需要手动添加挂载元素：

```js
// ./src/App.vue

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

const appRoot = document.createElement("div");
appRoot.id = "us-appRoot";
document.body.appendChild(appRoot);

app.mount("#us-appRoot");
```

## 生产模式

修改设置文件在选项对象中添加以下内容：

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    (() => {
      /**
       * 如果用到了额外的 GM_functions，需要添加对应 @grant
       * 虽然可以全部不添加，但只有TamperMonkey会自动推断，其他扩展不一定
       * 在上面 extenral 声明的库，此处需要添加对应的 @require 要注意全局变量名称
       */
      const headers = `\
// ==UserScript==
// @name         Your Script (prod mode)
// @namespace    https://your.site/
// @version      0.1.0
// @description  What does your script do
// @author       You
// @include      /https://match\.site/
// @grant        GM_addStyle
// @noframes
// @require      https://cdn.jsdelivr.net/npm/vue@3.2.6/dist/vue.global.min.js
// ==/UserScript==

`;

      return {
        name: "inject-css",
        apply: "build", // 仅在构建模式下启用
        enforce: "post", // 在最后处理
        generateBundle(options, bundle) {
          // 从 bundle 中提取 style.css 内容，并加入到脚本中
          const keyword = "user.js";
          if (!bundle["style.css"] || bundle["style.css"].type !== "asset")
            return;
          const css = bundle["style.css"].source;
          const [, target] =
            Object.entries(bundle).find(([name]) => {
              return name.includes(keyword);
            }) ?? [];
          if (!target || target.type !== "chunk") return;
          target.code = headers + `GM_addStyle(\`${css}\`)\n${target.code}`;
        },
      };
    })(),
  ],
  hmr: {
    protocol: "ws",
    host: "localhost",
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.js"),
      name: "userscript",
      formats: ["iife"], // 自运行打包格式，与默认模版一致
      fileName: (format) => `yourscript.${format}.user.js`, // 非函数的常量会自动添加后缀
    },
    rollupOptions: {
      external: ["vue"], // 分离库以降低最终代码体积
      output: {
        globals: {
          vue: "Vue",
          GM_addStyle: "GM_addStyle", // 油猴脚本API，用于添加样式到页面
        },
        inlineDynamicImports: true, // 库构建模式下不能进行代码分割，开启此功能可将本应分割的代码整合在一起避免报错（代码分割可能由其他插件引起）
      },
    },
    minify: "terser",
    terserOptions: {
      mangle: false, // 关闭名称混淆，遵守Greasefork规则
      format: {
        beautify: true, // 美化代码开启缩进，遵守Greasefork规则
      },
    },
  },
});
```

编译后的 js 文件应在 /dist 目录下，像普通油猴脚本一样使用即可

若使用了 tailwindcss/windicss 等，内置的 css reset 影响了原本元素，可以在对应设置文件中关闭 preflight
