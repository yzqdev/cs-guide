# Webpack Plugins

Plugin 用于执行更广泛的打包任务，如资源管理、环境变量注入、代码压缩等。

## 常用插件

### HtmlWebpackPlugin

生成 HTML 文件并自动注入打包后的 JS/CSS：

```bash
npm install html-webpack-plugin -D
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: true,
      hash: true,
    }),
  ],
};
```

### 多页面配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pageNames = ['page1', 'page2', 'page3'];
const multipleHtmlPlugins = pageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`,
    filename: `${name}.html`,
    chunks: [name],
  });
});

module.exports = {
  entry: {
    main: './src/main.js',
    page1: './src/page1.js',
    page2: './src/page2.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main'],
    }),
  ].concat(multipleHtmlPlugins),
};
```

### MiniCssExtractPlugin

将 CSS 提取为独立文件（生产环境推荐）：

```bash
npm install mini-css-extract-plugin -D
```

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
  ],
};
```

### TerserPlugin

压缩 JavaScript（生产环境默认启用）：

```bash
npm install terser-webpack-plugin -D
```

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true },
          mangle: true,
        },
      }),
    ],
  },
};
```

### CopyWebpackPlugin

复制静态资源到输出目录：

```bash
npm install copy-webpack-plugin -D
```

```js
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'public', to: 'public' },
      ],
    }),
  ],
};
```

### DefinePlugin（内置）

定义全局变量：

```js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('https://api.example.com'),
      __VUE_OPTIONS_API__: true,
    }),
  ],
};
```

### CompressionPlugin

开启 Gzip 压缩：

```bash
npm install compression-webpack-plugin -D
```

```js
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,      // 大于 10KB 才压缩
      deleteOriginalAssets: false,
      minRatio: 0.8,
    }),
  ],
};
```

### CleanWebpackPlugin

构建前清理输出目录（Webpack 5 内置 `output.clean: true`，不推荐再使用此插件）：

```js
// Webpack 5 推荐方式
module.exports = {
  output: {
    clean: true,
  },
};
```

## Babel 配置

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env', { targets: { browsers: ['last 1 version'] } }],
      '@babel/preset-typescript',
    ],
    plugins: [
      ['@babel/plugin-transform-runtime'],
    ],
  };
};
```

## 参考

- [Webpack Plugins 文档](https://webpack.js.org/plugins/)