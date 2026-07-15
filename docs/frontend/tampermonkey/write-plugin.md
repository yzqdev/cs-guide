# 油猴插件开发环境搭建

## 一、直接开发（无需构建）

最简单的油猴脚本不需要任何构建工具，直接在 Tampermonkey 编辑器中编写即可。

**优点**：零配置，适合简单脚本
**缺点**：无法使用 npm 包、ES Module、TypeScript 等

## 二、jQuery 开发环境

油猴通过 `@require` 引用外部 JS 文件：

```
// @require https://code.jquery.com/jquery-3.7.1.min.js
```

### 引用本地 JS 文件

1. 浏览器地址栏输入 `edge://extensions`（Chrome 输入 `chrome://extensions`）
2. 找到 Tampermonkey → 详细信息 → 打开「允许访问文件 URL」
3. 脚本头部添加：`// @require file://E:\myjs.js`

```js
// ==UserScript==
// @name         jQuery 示例
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  使用 jQuery 操作页面
// @author       You
// @match        https://*/*
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @grant        none
// ==/UserScript==

(function () {
  'use strict'
  $('h1').css('color', 'red')
})()
```

## 三、Webpack 开发环境

适合大型项目，支持 npm 包、模块化开发、TypeScript 等。

:::tip
参考项目：[Bilibili-Evolved](https://github.com/the1812/Bilibili-Evolved)
:::

### 项目结构

```
project/
├── src/
│   └── index.js          # 入口文件
├── config/
│   ├── meta.json         # 脚本元信息
│   ├── webpack.common.js # 公共配置
│   ├── webpack.dev.js    # 开发配置
│   ├── webpack.prod.js   # 生产配置
│   ├── webpack.utils.js  # 工具函数
│   └── loaders.js        # loader 配置
├── package.json
└── dist/                 # 构建输出
```

### meta.json

脚本元信息，会被注入到打包后的文件头部：

```json
{
  "name": "tamper-webpack",
  "description": "Webpack 构建的油猴脚本",
  "version": "1.0.0",
  "author": "You",
  "match": "https://example.com/*",
  "run-at": "document-end",
  "grant": [
    "unsafeWindow",
    "GM_getValue",
    "GM_setValue",
    "GM_xmlhttpRequest"
  ],
  "connect": ["*"],
  "require": [
    "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"
  ]
}
```

### webpack.utils.js — 生成脚本头

```js
const commonMeta = require('./meta.json')
const year = new Date().getFullYear()

const getBanner = (meta) =>
  `// ==UserScript==\n${Object.entries(
    Object.assign(meta, commonMeta)
  )
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((item) => `// @${key.padEnd(16, ' ')}${item}`).join('\n')
      }
      return `// @${key.padEnd(16, ' ')}${value.replace(/\[year\]/g, year)}`
    })
    .join('\n')}
// ==/UserScript==`

module.exports = { getBanner }
```

### webpack.common.js — 公共配置

```js
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const loaders = require('./loaders')
const { getBanner } = require('./webpack.utils')
const meta = require('./meta.json')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'tamper-webpack.dev.user.js',
    path: path.resolve(__dirname, '../build'),
    crossOriginLoading: 'anonymous',
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: getBanner(meta),
      raw: true,
      entryOnly: true,
    }),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, '/src/components'),
    },
  },
  module: {
    rules: [loaders.cssLoader, loaders.sassLoader, loaders.fileLoader],
  },
}
```

### webpack.dev.js / webpack.prod.js

```js
// webpack.dev.js
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: { comments: /==\/?UserScript==|^[ ]?@|eslint-disable/i },
        },
        extractComments: false,
      }),
    ],
  },
})
```

```js
// webpack.prod.js
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: { comments: /==\/?UserScript==|^[ ]?@|eslint-disable/i },
        },
        extractComments: false,
      }),
    ],
  },
})
```

### loaders.js

```js
const path = require('path')

const cssLoader = {
  test: /\.css$/,
  use: [
    { loader: 'css-loader' },
    {
      loader: 'postcss-loader',
      options: { config: { path: path.join(__dirname, './postcss.config.js') } },
    },
  ],
}

const sassLoader = {
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader'],
}

const fileLoader = {
  test: /\.(png|svg|jpg|gif)$/,
  use: ['file-loader'],
}

const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: { presets: ['@babel/preset-env'] },
  },
}

const jsxLoader = {
  test: /\.jsx$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: { presets: ['@babel/preset-react'] },
  },
}

module.exports = { cssLoader, sassLoader, fileLoader, jsLoader, jsxLoader }
```

### package.json

```json
{
  "name": "tamper-webpack",
  "version": "1.0.0",
  "license": "MIT",
  "scripts": {
    "dev": "webpack --watch --config config/webpack.dev.js",
    "build": "webpack --config config/webpack.prod.js"
  },
  "devDependencies": {
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2",
    "webpack-merge": "^5.8.0",
    "terser-webpack-plugin": "^5.3.1",
    "clean-webpack-plugin": "^4.0.0",
    "css-loader": "^6.7.1",
    "sass-loader": "^12.6.0",
    "sass": "^1.50.0",
    "style-loader": "^3.3.1",
    "file-loader": "^6.2.0",
    "babel-loader": "^8.2.5",
    "@babel/preset-env": "^7.17.10",
    "@babel/preset-react": "^7.16.7"
  }
}
```

## 四、Vite 开发环境

使用 [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey) 可以更便捷地开发油猴脚本。

### 基本配置

```js
// vite.config.js
import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: 'tampermonkey-test',
        namespace: 'http://tampermonkey.net/',
        version: '0.0.1',
        description: 'Vite 构建的油猴脚本',
        author: 'You',
        match: ['https://*/*', 'http://*/*'],
      },
    }),
  ],
})
```

### 开发模式

开发时油猴脚本注入 HMR 客户端，实现热更新：

```js
// ==UserScript==
// @name         tampermonkey-test
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @match        https://*/*
// @match        http://*/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.2.6/dist/vue.global.min.js
// ==/UserScript==

(function () {
  'use strict'
  if (location.href === 'http://localhost:3000/') return
  let script = document.createElement('script')
  script.type = 'module'
  script.src = 'http://localhost:3000/@vite/client'
  document.body.appendChild(script)
  let script2 = document.createElement('script')
  script2.type = 'module'
  script2.src = 'http://localhost:3000/src/main.js'
  document.body.appendChild(script2)
})()
```

若 HMR 连接有问题，配置 WebSocket 地址：

```js
// vite.config.js
export default defineConfig({
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
})
```

### 使用 Vue 框架

```js
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

const appRoot = document.createElement('div')
appRoot.id = 'us-appRoot'
document.body.appendChild(appRoot)
createApp(App).mount('#us-appRoot')
```

### 生产模式构建

生产模式将 CSS 内联到脚本中，打包为单文件 `.user.js`：

```js
import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'
import path from 'path'

export default defineConfig({
  plugins: [monkey({
    entry: 'src/main.js',
    userscript: {
      name: 'Your Script (prod)',
      namespace: 'https://your.site/',
      version: '0.1.0',
      description: '生产模式脚本',
      author: 'You',
      match: ['https://match.site/*'],
      grant: ['GM_addStyle'],
      require: ['https://cdn.jsdelivr.net/npm/vue@3.2.6/dist/vue.global.min.js'],
    },
    build: {
      externalGlobals: {
        vue: 'Vue',
      },
    },
  })],
  build: {
    minify: 'terser',
    terserOptions: {
      mangle: false,
      format: { beautify: true },
    },
  },
})
```

编译后的 `.user.js` 文件位于 `dist/` 目录，像普通油猴脚本一样拖入浏览器即可安装。

> 若使用了 TailwindCSS / WindiCSS 等，内置的 CSS reset 可能影响页面原有元素，可在配置中关闭 `preflight`。
