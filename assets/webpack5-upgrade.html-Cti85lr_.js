import{_ as e,c as a,o as n,d as o}from"./app-CbULZrmi.js";const r={},t=o(`<h1 id="webpack5教程" tabindex="-1"><a class="header-anchor" href="#webpack5教程"><span>webpack5教程</span></a></h1><h2 id="热部署" tabindex="-1"><a class="header-anchor" href="#热部署"><span>热部署</span></a></h2><h3 id="webpack-s-watch-mode" tabindex="-1"><a class="header-anchor" href="#webpack-s-watch-mode"><span>webpack&#39;s Watch Mode</span></a></h3><p>​</p><pre><code class="language-bash">&quot;watch&quot;: &quot;webpack --watch&quot;

</code></pre><p>自动编译模块!!! 唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。如果能够自动刷新浏览器就更好了，可以尝试使用 webpack-dev-server，恰好可以实现我们想要的功能。</p><h3 id="webpack-dev-server" tabindex="-1"><a class="header-anchor" href="#webpack-dev-server"><span>webpack-dev-server</span></a></h3><pre><code class="language-javascript">&quot;start&quot;: &quot;webpack serve --open&quot;,

# 配置如下
 const path = require(&#39;path&#39;);
  const HtmlWebpackPlugin = require(&#39;html-webpack-plugin&#39;);
  const CleanWebpackPlugin = require(&#39;clean-webpack-plugin&#39;);

  module.exports = {
    entry: {
      app: &#39;./src/index.js&#39;,
      print: &#39;./src/print.js&#39;
    },
    devtool: &#39;inline-source-map&#39;,
   devServer: {
     contentBase: &#39;./dist&#39;
   },
    plugins: [
      new CleanWebpackPlugin([&#39;dist&#39;]),
      new HtmlWebpackPlugin({
        title: &#39;Development&#39;
      })
    ],
    output: {
      filename: &#39;[name].bundle.js&#39;,
      path: path.resolve(__dirname, &#39;dist&#39;)
    }
  };

现在，我们可以在命令行中运行 npm start，就会看到浏览器自动加载页面。如果现在修改和保存任意源文件，web 服务器就会自动重新加载编译后的代码。试一下
</code></pre><h3 id="webpack-dev-middlewara" tabindex="-1"><a class="header-anchor" href="#webpack-dev-middlewara"><span>webpack-dev-middlewara</span></a></h3><p>搭配express进行热部署,地址 <a href="https://www.webpackjs.com/guides/development/#%E4%BD%BF%E7%94%A8-webpack-dev-middleware" target="_blank" rel="noopener noreferrer">webpack配置express</a></p><h2 id="webpack5配置" tabindex="-1"><a class="header-anchor" href="#webpack5配置"><span>webpack5配置</span></a></h2><ol><li><code>Error: Cannot find module &#39;webpack-cli/bin/config-yargs&#39;</code></li></ol><p>在<code>webpack-cli 4.x</code>中，不能过<code>webpack-dev-server</code>启动项目了，需要通过<code>webpack serve...</code>或者修改<code>webpack-cli</code>版本改为3.x</p><pre><code class="language-json">  // package.json
  // webpack4.x
  &quot;script&quot;: {
    &quot;dev&quot;: &quot;webpack-dev-server ...&quot;,
  }
  // webpack5.x
  &quot;script&quot;: {
    &quot;dev&quot;: &quot;webpack serve ...&quot;,
  }
  // 降版本
  {
    webpack-cli@3.3.12
  }
</code></pre><ol><li><code>webpack5</code>中错误出现错误<code>UnhandledPromiseRejectionWarning: TypeError: webpack.NamedModulesPlugin is not a constructor</code></li></ol><pre><code class="language-java">  // webpack.config.js

  // webpack4.x
  module.exports = {
    ...
    plugins: [
      ...
      new webpack.NamedModulesPlugin()
    ]
  }

  // webpack5.x
  // 在webpack5.x中，webpack.NamedModulesPlugin的功能已经内置
</code></pre><ol><li>babel配置导致的文件引入错误，<code>@babel/runtime</code></li></ol><p>在webpack5.x中，发现很多关于<code>@babel/runtime/helpers/esm</code>的文件引入错误，错误提示类似下面，通过锁定@babel/runtime包版本即可</p><pre><code class="language-bash">Module not found: Error: Can&#39;t resolve &#39;./superPropBase&#39; in &#39;/Users/xxx/node_modules/@babel/runtime/helpers/esm&#39;
Did you mean &#39;superPropBase.js&#39;?
BREAKING CHANGE: The request &#39;./superPropBase&#39; failed to resolve only because it was resolved as fully specified
(probably because the origin is a &#39;*.mjs&#39; file or a &#39;*.js&#39; file where the package.json contains &#39;&quot;type&quot;: &quot;module&quot;&#39;).
The extension in the request is mandatory for it to be fully specified.
Add the extension to the request
  npm install @babel/runtime@7.12.0 -D
</code></pre><ol><li><code>webpack &lt; 5 used to include polyfills for node.js core modules by default</code></li></ol><p>在运行过程中出现了很多这样的报错信息，是由于在webpack5中移除了nodejs核心模块的polyfill自动引入，所以需要手动引入，如果打包过程中有使用到nodejs核心模块，webpack会提示进行相应配置</p><pre><code class="language-javascript">  // webpack.config.js
  module.exports = {
    ...
    resolve: {
      // https://github.com/babel/babel/issues/8462
      // https://blog.csdn.net/qq_39807732/article/details/110089893
      // 如果确认需要node polyfill，设置resolve.fallback安装对应的依赖
      fallback: {
        crypto: require.resolve(&#39;crypto-browserify&#39;),
        path: require.resolve(&#39;path-browserify&#39;),
        url: require.resolve(&#39;url&#39;),
        buffer: require.resolve(&#39;buffer/&#39;),
        util: require.resolve(&#39;util/&#39;),
        stream: require.resolve(&#39;stream-browserify/&#39;),
        vm: require.resolve(&#39;vm-browserify&#39;)
      },
      // 如果确认不需要node polyfill，设置resolve.alias设置为false
      alias: {
        crypto: false
      }
    }
  }
</code></pre><p>如果实在<code>vue-cli</code>中,需要这样</p><pre><code class="language-js">module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve(&#39;path-browserify&#39;),
      },
    },
  },

  transpileDependencies: true
}

</code></pre><ol><li>DeprecationWarning: Compilation.assets will be frozen in future, all modifications are deprecated. BREAKING CHANGE: No more changes should happen to Compilation.assets after sealing the Compilation. Do changes to assets earlier, e. g. in Compilation.hooks.processAssets. Mak\`e sure to select an appropriate stage from Compilation.PROCESS_ASSETS_STAGE_*.</li></ol><p>为<code>html-webpack-plugin</code>这个包导致的⚠️信息，<a href="https://github.com/webpack/webpack/issues/11997" target="_blank" rel="noopener noreferrer">github issue</a></p><pre><code class="language-css">  npm run html-webpack-plugin@next -D
</code></pre><ol><li>DeprecationWarning: A &#39;callback&#39; argument need to be provided to the &#39;webpack(options, callback)&#39; function when the &#39;watch&#39; option is set. There is no way to handle the &#39;watch&#39; option without a callback</li></ol><p>官方给出的问题原因是<code>webpack-cli</code>这个包的版本导致的，<a href="https://github.com/webpack/webpack-cli/issues/1918" target="_blank" rel="noopener noreferrer">github issue</a></p><pre><code class="language-avrasm">  // 官方提供的解决方式，修改webpack-cli版本到4.2.0既可
  npm install webpack-cli@4.2.0 --save-dev
</code></pre><p>不过我在本地创建了一个新的项目，版本信息如下，还是存在上面的那个报错信息，demo地址<a href="https://github.com/xccjk/webpack-demo1" target="_blank" rel="noopener noreferrer">github issue</a></p><pre><code class="language-json">  &quot;webpack&quot;: &quot;^5.10.3&quot;,
  &quot;webpack-cli&quot;: &quot;^4.2.0&quot;,
  &quot;webpack-dev-server&quot;: &quot;^3.11.0&quot;
</code></pre><ol><li>业务插件遇到的问题，<code>webpack-merge</code>包遇到的问题</li></ol><p><a href="https://blog.csdn.net/lzc2644481789/article/details/107814848" target="_blank" rel="noopener noreferrer">csdn资料</a></p><pre><code class="language-javascript">  // 4.x版本
  {
    &quot;webpack-merge&quot;: &quot;^4.2.2&quot;
  }
  // webpack.config.js
  const merge = require(&#39;webpack-merge&#39;)
  const defaultConfig = require(&#39;../...&#39;)
  const config = merge(defaultConfig, {

  })
  export default config

  // 5.x版本
  {
    &quot;webpack-merge&quot;: &quot;^5.7.0&quot;
  }
  const webpackMerge = require(&#39;webpack-merge&#39;)
  const defaultConfig = require(&#39;../...&#39;)
  const config = webpackMerge.merge(defaultConfig, {

  })
  export default config
</code></pre><ol><li>数据流工具<code>recoil</code>好像还不支持在webpack中使用，我们项目里有使用recoil，配置了babel后，一直提示<code>You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders</code></li></ol><p>官方答复：<a href="https://github.com/facebookexperimental/Recoil/pull/467" target="_blank" rel="noopener noreferrer">guthub issue</a></p><ol><li><code>TypeError: Cannot read property &#39;tap&#39; of undefined</code></li></ol><p><code>hard-source-webpack-plugin</code>这个包在版本升级后出现错误，<a href="https://github.com/mzgoddard/hard-source-webpack-plugin/issues/461" target="_blank" rel="noopener noreferrer">github issue</a></p><pre><code class="language-java">  // webpack.config.js
  // webpack4.x
  const HardSourceWebpackPlugin = require(&#39;hard-source-webpack-plugin&#39;)
  module.exports = {
    ...
    piugins: [
      new HardSourceWebpackPlugin({
        environmentHash: {
          root: process.cwd(),
          directories: [],
          files: [&#39;package-lock.json&#39;, &#39;yarn.lock&#39;],
        },
        cachePrune: {
          maxAge: 2 * 24 * 60 * 60 * 1000,
          sizeThreshold: 50 * 1024 * 1024
        }
      })
    ]
  }
  // webpack5.x
  // https://github.com/mzgoddard/hard-source-webpack-plugin/issues/461
  const HardSourceWebpackPlugin = require(&#39;hard-source-webpack-plugin&#39;)
  module.exports = {
    ...
    piugins: [
      new HardSourceWebpackPlugin(),
      new HardSourceWebpackPlugin.ExcludeModulePlugin([])
    ]
  }
</code></pre>`,40),c=[t];function p(l,s){return n(),a("div",null,c)}const d=e(r,[["render",p],["__file","webpack5-upgrade.html.vue"]]),u=JSON.parse(`{"path":"/frontend/framework/packaging-tool/webpack5-upgrade.html","title":"webpack5教程","lang":"zh-CN","frontmatter":{"description":"webpack5教程 热部署 webpack's Watch Mode ​ 自动编译模块!!! 唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。如果能够自动刷新浏览器就更好了，可以尝试使用 webpack-dev-server，恰好可以实现我们想要的功能。 webpack-dev-server webpack-dev-middlewara 搭...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/packaging-tool/webpack5-upgrade.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"webpack5教程"}],["meta",{"property":"og:description","content":"webpack5教程 热部署 webpack's Watch Mode ​ 自动编译模块!!! 唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。如果能够自动刷新浏览器就更好了，可以尝试使用 webpack-dev-server，恰好可以实现我们想要的功能。 webpack-dev-server webpack-dev-middlewara 搭..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-04T19:25:57.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-04T19:25:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"webpack5教程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-04T19:25:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"热部署","slug":"热部署","link":"#热部署","children":[{"level":3,"title":"webpack's Watch Mode","slug":"webpack-s-watch-mode","link":"#webpack-s-watch-mode","children":[]},{"level":3,"title":"webpack-dev-server","slug":"webpack-dev-server","link":"#webpack-dev-server","children":[]},{"level":3,"title":"webpack-dev-middlewara","slug":"webpack-dev-middlewara","link":"#webpack-dev-middlewara","children":[]}]},{"level":2,"title":"webpack5配置","slug":"webpack5配置","link":"#webpack5配置","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1699125957000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":3.61,"words":1082},"filePathRelative":"frontend/framework/packaging-tool/webpack5-upgrade.md","localizedDate":"2022年3月21日","autoDesc":true}`);export{d as comp,u as data};
