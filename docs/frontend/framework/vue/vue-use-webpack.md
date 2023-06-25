# wepack教程

## Webpack 发布项目

- [webpack 打包的各种坑](https://dailc.github.io/2017/03/13/webpackfreshmanualAndBug.html)
- `webpack` 命令能够生成dist目录到磁盘中，最终，把打包后的代码，部署服务器中去
- `webpack-dev-server` 仅是在内存中生成的文件，并没有写到磁盘中，所以，只能在开发期间使用

### 创建项目发布配置文件

- 开发期间配置文件：`webpack.config.js`
- 项目发布配置文件：`webpack.prod.js` （文件名称非固定 production 生产环境）
- 命令：`webpack --config webpack.prod.js` 指定配置文件名称运行webpack
- 参数：`--display-error-details` 用于显示webpack打包的错误信息

```json
/* package.json */

"scripts": {
  "build": "webpack --config webpack.prod.js"
}
// 1 在项目根目录中创建 webpack.prod.js 文件
// 2 在 package.json 中, 配置一个 scripts
// 3 在 终端中 通过 npm run build 对项目进行打包
```

### 打包处理过程

1 删除掉 devServer 相关的配置项
2 将图片和字体文件输出到指定的文件夹中
3 自动删除dist目录
4 分离第三方包（将使用的vue等第三方包抽离到 vender.js 中）
5 压缩混淆JS 以及 指定生成环境
6 抽取和压缩CSS文件
7 压缩HTML页面
8 配合vue的异步组件，实现按需加载功能

### 处理图片路径

- 注意：如果`limit`小于比图片大，那么图片将被转化为`base64`编码格式
- [name参数介绍](https://github.com/webpack-contrib/file-loader)

```json
/* webpack.prod.js */
// 处理URL路径的loader

{
  test: /\.(jpg|png|gif|bmp|jpeg)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: 'images/[hash:7].[ext]' // 作用：将图片输出到images文件夹中，文件名采用7位的哈希值（MD5），并且保持原来的图片文件扩展名

      // name：指定文件输出路径和输出文件命令规则
      // [hash:7]：表示使用7位哈希值代表文件名称
      // [ext]：表示保持文件原有后缀名
      // name: 'imgs/img-[hash:7].[ext]'
    }
  }
},
```

### 自动删除dist目录

- 安装：`npm i -D clean-webpack-plugin`
- 作用: 每次打包之前, 删除上一次打包的dist目录

```js
/* webpack.prod.js */
const cleanWebpackPlugin = require('clean-webpack-plugin')

plugins: [
  // 创建一个删除文件夹的插件，删除dist目录
  new cleanWebpackPlugin(['./dist'])
]
```

### 分离第三方包

- 目的：将公共的第三方包，抽离为一个单独的包文件，这样防止重复打包！
  - 例如：main.js、router、vuex中都引入了vue，不分离的话，vue会被打包3次
  - 抽离后, vue文件只会被打包一次, 用到的地方仅仅是引用

```js
/* webpack.prod.js */

// 1 入口 -- 打包文件的入口
entry: {
  // 项目代码入口
  app: path.join(__dirname, './src/js/main.js'),
  // 第三方包入口
  vendor: ['vue', 'vue-router', 'axios']
},

output: {
  // 2 修改输出文件路径和命名规则
  filename: 'js/[name].[chunkhash].js',
},

plugins: [
  // 3 抽离第三方包
  new webpack.optimize.CommonsChunkPlugin({
    // 将 entry 中指定的 ['vue', 'vue-router', 'axios'] 打包到名为 vendor 的js文件中
    // 第三方包入口名称，对应 entry 中的 vendor 属性
    name: 'vendor',
  }),
]
```

### 压缩混淆JS

- 注意：**uglifyjs 无法压缩ES6的代码**

```js
plugins: [
  // 优化代码
  // https://github.com/webpack-contrib/uglifyjs-webpack-plugin/tree/v0.4.6
  new webpack.optimize.UglifyJsPlugin({
    // 压缩
    compress: {
      // 移除警告
      warnings: false
    }
  }),

  // 指定环境为生产环境：vue会根据这一项启用压缩后的vue文件
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
]
```

### 抽取和压缩CSS文件

- 安装：抽离 `npm i -D extract-text-webpack-plugin`
- 安装：压缩 `npm i -D optimize-css-assets-webpack-plugin`
- [webpack 抽离CSS文档](https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/)
- [压缩抽离后的CSS](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)

```js
压缩和抽离CSS报错的说明：
Error processing file: css/style.css
postcss-svgo: Error in parsing SVG: Unquoted attribute value

原因：压缩和抽离CSS的插件中只允许 SVG 使用双引号
/* webpack.prod.js */

// 分离 css 到独立的文件中
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 压缩 css 资源文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// bug描述: 生成后面的css文件中图片路径错误，打开页面找不到图片
// 解决：bing搜索 webpack css loader 样式图片路径
output: {
  // ...

  // https://doc.webpack-china.org/configuration/output/#output-publicpath
  // 设置公共路径
  publicPath: '/',
},

module: {
  rules: [
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ['css-loader', 'sass-loader']
      })
    },
  ]
},
plugins: [
  // 通过插件抽离 css (参数)
  new ExtractTextPlugin("css/style.css"),
  // 抽离css 的辅助压缩插件
  new OptimizeCssAssetsPlugin()
]
```

### 压缩HTML页面

- 详细的配置可以参考[html-minifier](https://github.com/kangax/html-minifier#options-quick-reference)

```js
new htmlWebpackPlugin({
  // 模板页面
  template: path.join(__dirname, './index.html'),

  // 压缩HTML
  minify: {
    // 移除空白
    collapseWhitespace: true,
    // 移除注释
    removeComments: true,
    // 移除属性中的双引号
    removeAttributeQuotes: true
  }
}),
```

### vue配合webpack实现路由按需加载

- [Vue 路由懒加载](https://router.vuejs.org/zh-cn/advanced/lazy-loading.html)
- [Vue 异步组件](https://cn.vuejs.org/v2/guide/components.html#)
- [Vue 组件懒加载浅析](http://www.cnblogs.com/zhanyishu/p/6587571.html)
- Vue.js路由懒加载[译]

#### 步骤

- 1 修改组件的引用方式

```js
// 方式一: require.ensure()
const NewsList = r => require.ensure([], () => r(require('../components/news/newslist.vue')), 'news')

// 方式二: import() -- 推荐
// 注意：/* webpackChunkName: "newsinfo" */ 是一个特殊的语法，表示生成js文件的名称
const NewsInfo = () => import(/* webpackChunkName: "newsinfo" */ '../components/news/newsinfo.vue')
```

- 2 修改 webpack 配置文件的output

```js
output: {
  // ------添加 chunkFilename, 指定输出js文件的名称------
  chunkFilename: 'js/[name].[chunkhash].js',
},
```
