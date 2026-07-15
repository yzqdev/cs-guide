# Webpack 配置

## 项目发布配置

### 创建配置文件

开发期间：`webpack.config.js`
生产环境：`webpack.prod.js`

```bash
# 指定配置文件运行 webpack
webpack --config webpack.prod.js
```

```json
// package.json
{
  "scripts": {
    "build": "webpack --config webpack.prod.js"
  }
}
```

### 打包处理过程

1. 删除 devServer 配置项
2. 图片和字体文件输出到指定文件夹
3. 自动删除 dist 目录
4. 分离第三方包（如 Vue 等抽离到 vendor.js）
5. 压缩混淆 JS，指定生产环境
6. 抽取和压缩 CSS 文件
7. 压缩 HTML 页面
8. 配合 Vue 异步组件实现按需加载

### 处理图片路径

```js
// webpack.prod.js
{
  test: /\.(jpg|png|gif|bmp|jpeg)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: 'images/[hash:7].[ext]',
    },
  },
},
```

### 自动删除 dist 目录

```bash
npm install -D clean-webpack-plugin
```

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

plugins: [new CleanWebpackPlugin(['./dist'])];
```

### 分离第三方包

```js
entry: {
  app: path.join(__dirname, './src/js/main.js'),
  vendor: ['vue', 'vue-router', 'axios'],
},

output: {
  filename: 'js/[name].[chunkhash].js',
},

plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
  }),
],
```

### 压缩混淆 JS

```js
plugins: [
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') },
  }),
];
```

### 抽取和压缩 CSS

```bash
npm install -D extract-text-webpack-plugin
npm install -D optimize-css-assets-webpack-plugin
```

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module: {
  rules: [
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] }),
    },
  ],
},

plugins: [
  new ExtractTextPlugin('css/style.css'),
  new OptimizeCssAssetsPlugin(),
];
```

### 压缩 HTML

```js
new HtmlWebpackPlugin({
  template: path.join(__dirname, './index.html'),
  minify: {
    collapseWhitespace: true,
    removeComments: true,
    removeAttributeQuotes: true,
  },
});
```

## Vue 路由懒加载

### 方式一：require.ensure

```js
const NewsList = r => require.ensure([], () => r(require('../components/news.vue')), 'news');
```

### 方式二：动态 import（推荐）

```js
const NewsInfo = () => import(/* webpackChunkName: "newsinfo" */ '../components/news.vue');
```

### 配置 output

```js
output: {
  chunkFilename: 'js/[name].[chunkhash].js',
},
```

## 参考

- [Webpack 官方文档](https://webpack.js.org/)
- [Vue Router 懒加载](https://router.vuejs.org/guide/advanced/lazy-loading.html)