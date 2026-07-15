# Webpack 快速开始

## 简介

Webpack 是目前最流行的前端打包工具，通过模块化打包 JavaScript、CSS、图片等资源。

## 安装

```bash
npm init -y
npm install webpack webpack-cli webpack-dev-server -D
```

## 基本配置

```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // development | production
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
};
```

## 常用命令

```json
{
  "scripts": {
    "dev": "webpack serve --open",
    "build": "webpack --mode production",
    "watch": "webpack --watch"
  }
}
```

## 使用 TypeScript 配置文件

### 方式一：ts-node

```bash
npm install ts-node @types/node -D
```

```json
{
  "scripts": {
    "dev": "webpack --config webpack.config.ts",
    "build": "webpack --config webpack.config.ts"
  }
}
```

### 方式二：tsx（推荐）

```bash
npm install tsx -D
```

```json
{
  "scripts": {
    "dev": "NODE_OPTIONS='--import=tsx/esm' webpack --config webpack.config.mts"
  }
}
```

## 核心概念

- **Entry** - 入口文件，打包的起点
- **Output** - 输出配置，打包后的文件位置
- **Loaders** - 模块转换器，处理非 JS 文件
- **Plugins** - 插件，执行更复杂的任务
- **Mode** - 模式，development/production
- **DevServer** - 开发服务器，支持热更新

## 参考

- [Webpack 官方文档](https://webpack.js.org/)
- [Webpack 中文文档](https://www.webpackjs.com/)