# 使用webpack开发vue

配置如下

```js
let webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const TerserPlugin = require('terser-webpack-plugin')
 
module.exports = {
  mode: "production",
  entry: {
    ui: "./src/main.js",
  },
  output: {
    path: __dirname + "/extension",
    filename: "popup.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
      },
    ],
  },optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          comments: /==\/?UserScript==|^[ ]?@|eslint-disable|spell-checker/i,
        },
      },
      extractComments: false,
    }),],
  },
  watchOptions: {
    poll: 1000, //监测修改的时间(ms)
    aggregateTimeout: 500, //防止重复按键，500毫米内算按键一次
    ignored: /node_modules/, //不监测
  },
  plugins: [
    new VueLoaderPlugin(),
    
  ],
};

```

## webstorm配置alias

配置一个 alias.config.js

```javascript
/* eslint-disable */
/**
 * 由于 Vue CLI 3 不再使用传统的 webpack 配置文件，故 WebStorm 无法识别别名
 * 本文件对项目无任何作用，仅作为 WebStorm 识别别名用
 * 进入 WebStorm preferences -> Language & Framework -> JavaScript -> Webpack，选择这个文件即可
 * */
const resolve = dir => require('path').join(__dirname, dir);

module.exports = {
    resolve: {
        alias: {
            '@': resolve('src'),
            '@views': resolve('src/views'),
            '@comp': resolve('src/components'),
            '@assets': resolve('src/assets'),
        }
    }
};
```

## 一个webpack配置vue的例子

webpack.base.ts

```ts
import path from "node:path";
import HtmlwebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import {VueLoaderPlugin}   from "vue-loader";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import "webpack-dev-server";
import { Configuration } from "webpack/types";
const conf: Configuration = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/main.ts"),
  target: "web",
  devtool: "source-map",
  devServer: {
    port: 3211,
    host: "0.0.0.0",
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash:8].js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          // reactivityTransform: true,
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: [
          { loader: "svg-sprite-loader", options: { symbolId: "icon-[name]" } },
        ],
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: true,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        oneOf: [
          // 这里匹配 `<style module>`
          {
            resourceQuery: /module/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  modules: true,

                },
              },
              "sass-loader",
            ],
          },
          // 这里匹配普通的 `<style>` 或 `<style scoped>`
          {
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
        ],
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlwebpackPlugin({
      title: "vue Template",
      filename: "index.html",
      template: "./public/index.html",
      inject: true,
      // chunks: ["index"],
      hash: true,
      path: "./",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
};
export default  conf


```

webpack.dev.ts

```ts
import * as path from "path";
import * as webpack from "webpack";
// const Dotenv = require('dotenv-webpack');
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlwebpackPlugin from "html-webpack-plugin";
// import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import base from "./webpack.base";
import { merge } from "webpack-merge";
import "webpack-dev-server";
import "dotenv/config";
console.log(process.env.BASE_URL);
const conf = merge(base, {
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
});
export default conf;

```

webpack.prod.ts

```ts
import * as path from "path";
import * as webpack from "webpack";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(__dirname, "./.env.production"),
});
// const Dotenv = require('dotenv-webpack');
import CompressionPlugin from 'compression-webpack-plugin'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlwebpackPlugin from "html-webpack-plugin";
// import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import base from "./webpack.base";
import { merge } from "webpack-merge";
import "webpack-dev-server";
const conf = merge(base, {
  mode: "production",
  devtool: false,
  optimization: {
    splitChunks: {
      chunks: "all",
      maxSize: 1024 * 1024,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
        new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      deleteOriginalAssets: false,
      minRatio: 0.8
    })
  ],
});
export default conf;


```

.env.development

```env
BASE_URL="/"

```
