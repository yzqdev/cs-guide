# webpack教程

## loader兼容性

| 名称                      | 版本                  |
| ------------------------- | --------------------- |
| less-loader(建议用7.3.0)  | 8.0.0以上最低webpack5 |
| sass-loader(建议用10.0.1) | 11.0.0最低webpack5    |
|                           |                       |
|                           |                       |
|                           |                       |

## 复制资源的插件:copy-webpack-plugin

```javascript
yarn add copy-webpack-plugin

const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "source", to: "dest" },
        { from: "other", to: "public" },
      ],
    }),
  ],
};
```

## 压缩的插件:terser-webpack-plugin

## 插件地址

[https://github.com/webpack-contrib/terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)
​

安装:

```sh
yarn add terser-webpack-plugin
```

## 配置

```js
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          // Deprecated
          output: null,
          format: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
    ],
  },
};

```
