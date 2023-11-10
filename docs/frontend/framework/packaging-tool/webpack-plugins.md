# webpack教程

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

### 插件地址

[https://github.com/webpack-contrib/terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)
​

安装:

```sh
yarn add terser-webpack-plugin
```

### 配置

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

## webpack多页面

```ts

const HtmlWebpackPlugin = require('html-webpack-plugin');

let htmlPageNames = ['example1', 'example2', 'example3', 'example4'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});

module.exports = {
  entry: {
    main: './js/main.js',
    example1: './js/example1.js',
    //... repeat until example 4
  },
  module: { 
       //.. your rules
  };
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunks: ['main']
    })
  ].concat(multipleHtmlPlugins)
  
};

```

## babel配置

babel.config.mjs

```js
//babel.config.js
/** @type {import('@babel/core').ConfigFunction} */
export default function (api) {
  api.cache(true);

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            browsers: ["last 1 version"],
          },
          exclude: ["transform-async-to-generator", "transform-regenerator"],
        },
      ],
      ["@vue/cli-plugin-babel/preset"],
      ["@babel/preset-typescript"],
    ],
  };
}

```
