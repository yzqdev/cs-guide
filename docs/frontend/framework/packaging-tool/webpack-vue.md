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
