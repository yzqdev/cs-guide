import{_ as e,c as n,o as a,d as t}from"./app-CbULZrmi.js";const s={},l=t(`<h1 id="wepack教程" tabindex="-1"><a class="header-anchor" href="#wepack教程"><span>wepack教程</span></a></h1><h2 id="webpack-发布项目" tabindex="-1"><a class="header-anchor" href="#webpack-发布项目"><span>Webpack 发布项目</span></a></h2><ul><li><a href="https://dailc.github.io/2017/03/13/webpackfreshmanualAndBug.html" target="_blank" rel="noopener noreferrer">webpack 打包的各种坑</a></li><li><code>webpack</code> 命令能够生成dist目录到磁盘中，最终，把打包后的代码，部署服务器中去</li><li><code>webpack-dev-server</code> 仅是在内存中生成的文件，并没有写到磁盘中，所以，只能在开发期间使用</li></ul><h3 id="创建项目发布配置文件" tabindex="-1"><a class="header-anchor" href="#创建项目发布配置文件"><span>创建项目发布配置文件</span></a></h3><ul><li>开发期间配置文件：<code>webpack.config.js</code></li><li>项目发布配置文件：<code>webpack.prod.js</code> （文件名称非固定 production 生产环境）</li><li>命令：<code>webpack --config webpack.prod.js</code> 指定配置文件名称运行webpack</li><li>参数：<code>--display-error-details</code> 用于显示webpack打包的错误信息</li></ul><pre><code class="language-json">/* package.json */

&quot;scripts&quot;: {
  &quot;build&quot;: &quot;webpack --config webpack.prod.js&quot;
}
// 1 在项目根目录中创建 webpack.prod.js 文件
// 2 在 package.json 中, 配置一个 scripts
// 3 在 终端中 通过 npm run build 对项目进行打包
</code></pre><h3 id="打包处理过程" tabindex="-1"><a class="header-anchor" href="#打包处理过程"><span>打包处理过程</span></a></h3><p>1 删除掉 devServer 相关的配置项 2 将图片和字体文件输出到指定的文件夹中 3 自动删除dist目录 4 分离第三方包（将使用的vue等第三方包抽离到 vender.js 中） 5 压缩混淆JS 以及 指定生成环境 6 抽取和压缩CSS文件 7 压缩HTML页面 8 配合vue的异步组件，实现按需加载功能</p><h3 id="处理图片路径" tabindex="-1"><a class="header-anchor" href="#处理图片路径"><span>处理图片路径</span></a></h3><ul><li>注意：如果<code>limit</code>小于比图片大，那么图片将被转化为<code>base64</code>编码格式</li><li><a href="https://github.com/webpack-contrib/file-loader" target="_blank" rel="noopener noreferrer">name参数介绍</a></li></ul><pre><code class="language-json">/* webpack.prod.js */
// 处理URL路径的loader

{
  test: /\\.(jpg|png|gif|bmp|jpeg)$/,
  use: {
    loader: &#39;url-loader&#39;,
    options: {
      limit: 8192,
      name: &#39;images/[hash:7].[ext]&#39; // 作用：将图片输出到images文件夹中，文件名采用7位的哈希值（MD5），并且保持原来的图片文件扩展名

      // name：指定文件输出路径和输出文件命令规则
      // [hash:7]：表示使用7位哈希值代表文件名称
      // [ext]：表示保持文件原有后缀名
      // name: &#39;imgs/img-[hash:7].[ext]&#39;
    }
  }
},
</code></pre><h3 id="自动删除dist目录" tabindex="-1"><a class="header-anchor" href="#自动删除dist目录"><span>自动删除dist目录</span></a></h3><ul><li>安装：<code>npm i -D clean-webpack-plugin</code></li><li>作用: 每次打包之前, 删除上一次打包的dist目录</li></ul><pre><code class="language-js">/* webpack.prod.js */
const cleanWebpackPlugin = require(&#39;clean-webpack-plugin&#39;)

plugins: [
  // 创建一个删除文件夹的插件，删除dist目录
  new cleanWebpackPlugin([&#39;./dist&#39;])
]
</code></pre><h3 id="分离第三方包" tabindex="-1"><a class="header-anchor" href="#分离第三方包"><span>分离第三方包</span></a></h3><ul><li>目的：将公共的第三方包，抽离为一个单独的包文件，这样防止重复打包！ <ul><li>例如：main.js、router、vuex中都引入了vue，不分离的话，vue会被打包3次</li><li>抽离后, vue文件只会被打包一次, 用到的地方仅仅是引用</li></ul></li></ul><pre><code class="language-js">/* webpack.prod.js */

// 1 入口 -- 打包文件的入口
entry: {
  // 项目代码入口
  app: path.join(__dirname, &#39;./src/js/main.js&#39;),
  // 第三方包入口
  vendor: [&#39;vue&#39;, &#39;vue-router&#39;, &#39;axios&#39;]
},

output: {
  // 2 修改输出文件路径和命名规则
  filename: &#39;js/[name].[chunkhash].js&#39;,
},

plugins: [
  // 3 抽离第三方包
  new webpack.optimize.CommonsChunkPlugin({
    // 将 entry 中指定的 [&#39;vue&#39;, &#39;vue-router&#39;, &#39;axios&#39;] 打包到名为 vendor 的js文件中
    // 第三方包入口名称，对应 entry 中的 vendor 属性
    name: &#39;vendor&#39;,
  }),
]
</code></pre><h3 id="压缩混淆js" tabindex="-1"><a class="header-anchor" href="#压缩混淆js"><span>压缩混淆JS</span></a></h3><ul><li>注意：<strong>uglifyjs 无法压缩ES6的代码</strong></li></ul><pre><code class="language-js">plugins: [
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
    &#39;process.env&#39;: {
      &#39;NODE_ENV&#39;: JSON.stringify(&#39;production&#39;)
    }
  })
]
</code></pre><h3 id="抽取和压缩css文件" tabindex="-1"><a class="header-anchor" href="#抽取和压缩css文件"><span>抽取和压缩CSS文件</span></a></h3><ul><li>安装：抽离 <code>npm i -D extract-text-webpack-plugin</code></li><li>安装：压缩 <code>npm i -D optimize-css-assets-webpack-plugin</code></li><li><a href="https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/" target="_blank" rel="noopener noreferrer">webpack 抽离CSS文档</a></li><li><a href="https://www.npmjs.com/package/optimize-css-assets-webpack-plugin" target="_blank" rel="noopener noreferrer">压缩抽离后的CSS</a></li></ul><pre><code class="language-js">压缩和抽离CSS报错的说明：
Error processing file: css/style.css
postcss-svgo: Error in parsing SVG: Unquoted attribute value

原因：压缩和抽离CSS的插件中只允许 SVG 使用双引号
/* webpack.prod.js */

// 分离 css 到独立的文件中
const ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);
// 压缩 css 资源文件
const OptimizeCssAssetsPlugin = require(&#39;optimize-css-assets-webpack-plugin&#39;)

// bug描述: 生成后面的css文件中图片路径错误，打开页面找不到图片
// 解决：bing搜索 webpack css loader 样式图片路径
output: {
  // ...

  // https://doc.webpack-china.org/configuration/output/#output-publicpath
  // 设置公共路径
  publicPath: &#39;/&#39;,
},

module: {
  rules: [
    {
      test: /\\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: &quot;style-loader&quot;,
        use: &quot;css-loader&quot;
      })
    },
    {
      test: /\\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: &quot;style-loader&quot;,
        use: [&#39;css-loader&#39;, &#39;sass-loader&#39;]
      })
    },
  ]
},
plugins: [
  // 通过插件抽离 css (参数)
  new ExtractTextPlugin(&quot;css/style.css&quot;),
  // 抽离css 的辅助压缩插件
  new OptimizeCssAssetsPlugin()
]
</code></pre><h3 id="压缩html页面" tabindex="-1"><a class="header-anchor" href="#压缩html页面"><span>压缩HTML页面</span></a></h3><ul><li>详细的配置可以参考<a href="https://github.com/kangax/html-minifier#options-quick-reference" target="_blank" rel="noopener noreferrer">html-minifier</a></li></ul><pre><code class="language-js">new htmlWebpackPlugin({
  // 模板页面
  template: path.join(__dirname, &#39;./index.html&#39;),

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
</code></pre><h3 id="vue配合webpack实现路由按需加载" tabindex="-1"><a class="header-anchor" href="#vue配合webpack实现路由按需加载"><span>vue配合webpack实现路由按需加载</span></a></h3><ul><li><a href="https://router.vuejs.org/zh-cn/advanced/lazy-loading.html" target="_blank" rel="noopener noreferrer">Vue 路由懒加载</a></li><li><a href="https://cn.vuejs.org/v2/guide/components.html#" target="_blank" rel="noopener noreferrer">Vue 异步组件</a></li><li><a href="http://www.cnblogs.com/zhanyishu/p/6587571.html" target="_blank" rel="noopener noreferrer">Vue 组件懒加载浅析</a></li><li>Vue.js路由懒加载[译]</li></ul><h4 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤"><span>步骤</span></a></h4><ul><li>1 修改组件的引用方式</li></ul><pre><code class="language-js">// 方式一: require.ensure()
const NewsList = r =&gt; require.ensure([], () =&gt; r(require(&#39;../components/news/newslist.vue&#39;)), &#39;news&#39;)

// 方式二: import() -- 推荐
// 注意：/* webpackChunkName: &quot;newsinfo&quot; */ 是一个特殊的语法，表示生成js文件的名称
const NewsInfo = () =&gt; import(/* webpackChunkName: &quot;newsinfo&quot; */ &#39;../components/news/newsinfo.vue&#39;)
</code></pre><ul><li>2 修改 webpack 配置文件的output</li></ul><pre><code class="language-js">output: {
  // ------添加 chunkFilename, 指定输出js文件的名称------
  chunkFilename: &#39;js/[name].[chunkhash].js&#39;,
},
</code></pre>`,33),r=[l];function i(c,o){return a(),n("div",null,r)}const u=e(s,[["render",i],["__file","vue-use-webpack.html.vue"]]),d=JSON.parse('{"path":"/frontend/framework/vue/vue-use-webpack.html","title":"wepack教程","lang":"zh-CN","frontmatter":{"description":"wepack教程 Webpack 发布项目 webpack 打包的各种坑 webpack 命令能够生成dist目录到磁盘中，最终，把打包后的代码，部署服务器中去 webpack-dev-server 仅是在内存中生成的文件，并没有写到磁盘中，所以，只能在开发期间使用 创建项目发布配置文件 开发期间配置文件：webpack.config.js 项目发布配...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/vue/vue-use-webpack.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"wepack教程"}],["meta",{"property":"og:description","content":"wepack教程 Webpack 发布项目 webpack 打包的各种坑 webpack 命令能够生成dist目录到磁盘中，最终，把打包后的代码，部署服务器中去 webpack-dev-server 仅是在内存中生成的文件，并没有写到磁盘中，所以，只能在开发期间使用 创建项目发布配置文件 开发期间配置文件：webpack.config.js 项目发布配..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"wepack教程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Webpack 发布项目","slug":"webpack-发布项目","link":"#webpack-发布项目","children":[{"level":3,"title":"创建项目发布配置文件","slug":"创建项目发布配置文件","link":"#创建项目发布配置文件","children":[]},{"level":3,"title":"打包处理过程","slug":"打包处理过程","link":"#打包处理过程","children":[]},{"level":3,"title":"处理图片路径","slug":"处理图片路径","link":"#处理图片路径","children":[]},{"level":3,"title":"自动删除dist目录","slug":"自动删除dist目录","link":"#自动删除dist目录","children":[]},{"level":3,"title":"分离第三方包","slug":"分离第三方包","link":"#分离第三方包","children":[]},{"level":3,"title":"压缩混淆JS","slug":"压缩混淆js","link":"#压缩混淆js","children":[]},{"level":3,"title":"抽取和压缩CSS文件","slug":"抽取和压缩css文件","link":"#抽取和压缩css文件","children":[]},{"level":3,"title":"压缩HTML页面","slug":"压缩html页面","link":"#压缩html页面","children":[]},{"level":3,"title":"vue配合webpack实现路由按需加载","slug":"vue配合webpack实现路由按需加载","link":"#vue配合webpack实现路由按需加载","children":[{"level":4,"title":"步骤","slug":"步骤","link":"#步骤","children":[]}]}]}],"git":{"createdTime":1647861419000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.28,"words":1285},"filePathRelative":"frontend/framework/vue/vue-use-webpack.md","localizedDate":"2022年3月21日","autoDesc":true}');export{u as comp,d as data};
