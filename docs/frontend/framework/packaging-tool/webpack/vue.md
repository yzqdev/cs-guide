# Webpack + Vue 配置

## 基本配置

```js
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: { ui: './src/main.js' },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: 'url-loader' },
      { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, loader: 'url-loader' },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
```

## 完整 TypeScript 配置

### webpack.base.ts

```ts
import path from 'node:path';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import 'webpack-dev-server';
import { Configuration } from 'webpack/types';

const conf: Configuration = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main.ts'),
  target: 'web',
  devtool: 'source-map',
  devServer: { port: 3211, host: '0.0.0.0', hot: true, historyApiFallback: true },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: { '@': path.resolve(__dirname, './src') },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.(png|jpg|jpeg|gif)$/, type: 'asset/resource' },
      {
        test: /\.svg$/,
        use: [{ loader: 'svg-sprite-loader', options: { symbolId: 'icon-[name]' } }],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { modules: true } }, 'sass-loader'],
          },
          {
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
        ],
      },
      {
        test: /\.ts$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true, appendTsSuffixTo: [/\.vue$/] } }],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlwebpackPlugin({ title: 'Vue App', template: './public/index.html', inject: true, hash: true }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
};

export default conf;
```

### webpack.dev.ts

```ts
import base from './webpack.base';
import { merge } from 'webpack-merge';
import webpack from 'webpack';

export default merge(base, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
});
```

### webpack.prod.ts

```ts
import base from './webpack.base';
import { merge } from 'webpack-merge';
import CompressionPlugin from 'compression-webpack-plugin';
import webpack from 'webpack';

export default merge(base, {
  mode: 'production',
  devtool: false,
  optimization: {
    splitChunks: { chunks: 'all', maxSize: 1024 * 1024 },
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(process.env) }),
    new CompressionPlugin({ algorithm: 'gzip', test: /\.(js|css)$/, threshold: 10240, minRatio: 0.8 }),
  ],
});
```

## WebStorm 配置别名

创建 `alias.config.js` 让 WebStorm 识别别名：

```js
const resolve = dir => require('path').join(__dirname, dir);

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      '@views': resolve('src/views'),
      '@comp': resolve('src/components'),
      '@assets': resolve('src/assets'),
    },
  },
};
```

在 WebStorm 中：Preferences → Language & Framework → JavaScript → Webpack，选择此文件。

## 参考

- [Vue Loader 文档](https://vue-loader.vuejs.org/)