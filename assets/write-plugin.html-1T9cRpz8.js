import{_ as e,c as t,o as n,d as o}from"./app-CbULZrmi.js";const u={},s=o(`<h1 id="tamper插件编写" tabindex="-1"><a class="header-anchor" href="#tamper插件编写"><span>tamper插件编写</span></a></h1><h2 id="搭建jquery开发环境" tabindex="-1"><a class="header-anchor" href="#搭建jquery开发环境"><span>搭建jquery开发环境</span></a></h2><p>油猴可以 <code>// @require ...</code> 的方法引用外部js文件，如果要引用本地文件，需要在浏览器插件设置中允许油猴访问文件URL，步骤</p><p>在浏览器地址栏输入：<code>edge://extensions</code><br> 找到Tampermonkey，点详细信息，打开<code>允许访问文件 URL</code></p><p>在脚本头部添加:<code>@require file://E:\\myjs.js</code></p><h2 id="搭建webpack开发环境" tabindex="-1"><a class="header-anchor" href="#搭建webpack开发环境"><span>搭建webpack开发环境</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>见<a href="https://github.com/the1812/Bilibili-Evolved" target="_blank" rel="noopener noreferrer">https://github.com/the1812/Bilibili-Evolved</a></p></div><p>下面是一个样例 meta.json</p><pre><code class="language-json">{
  &quot;name&quot;: &quot;tamper-webpack&quot;,
  &quot;description&quot;: &quot;Bilibili Evolved 的预览版, 可以抢先体验新功能.&quot;,
  &quot;updateURL&quot;: &quot;https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@preview/dist/bilibili-evolved.preview.user.js&quot;,
  &quot;downloadURL&quot;: &quot;https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@preview/dist/bilibili-evolved.preview.user.js&quot;,
  &quot;version&quot;: &quot;2.1.7&quot;,
  &quot;author&quot;: &quot;Grant Howard, Coulomb-G&quot;,
  &quot;copyright&quot;: &quot;[year], Grant Howard (https://github.com/the1812) &amp; Coulomb-G (https://github.com/Coulomb-G)&quot;,
  &quot;licence&quot;: &quot;MIT&quot;,
  &quot;match&quot;: &quot;https://bbs.mihoyo.com/ys/*&quot;,
  &quot;exclude&quot;: [
    &quot;*://api.bilibili.com/*&quot;,
    &quot;*://api.*.bilibili.com/*&quot;,
    &quot;*://*.bilibili.com/api/*&quot;,
    &quot;*://member.bilibili.com/studio/bs-editor/*&quot;,
    &quot;*://t.bilibili.com/h5/dynamic/specification&quot;,
    &quot;*://bbq.bilibili.com/*&quot;,
    &quot;*://message.bilibili.com/pages/nav/header_sync&quot;,
    &quot;*://s1.hdslb.com/bfs/seed/jinkela/short/cols/iframe.html&quot;
  ],
  &quot;run-at&quot;: &quot;document-end&quot;,
  &quot;supportURL&quot;: &quot;https://github.com/the1812/Bilibili-Evolved/issues&quot;,
  &quot;homepage&quot;: &quot;https://github.com/the1812/Bilibili-Evolved&quot;,
  &quot;grant&quot;: [
    &quot;unsafeWindow&quot;,
    &quot;GM_getValue&quot;,
    &quot;GM_setValue&quot;,
    &quot;GM_deleteValue&quot;,
    &quot;GM_info&quot;,
    &quot;GM_xmlhttpRequest&quot;
  ],
  &quot;connect&quot;: [
    &quot;raw.githubusercontent.com&quot;,
    &quot;github.com&quot;,
    &quot;cdn.jsdelivr.net&quot;,
    &quot;cn.bing.com&quot;,
    &quot;www.bing.com&quot;,
    &quot;translate.google.cn&quot;,
    &quot;translate.google.com&quot;,
    &quot;localhost&quot;,
    &quot;*&quot;
  ],
  &quot;require&quot;: [
    &quot;https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js&quot;
  ],
  &quot;icon&quot;: &quot;https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@preview/images/logo-small.png&quot;,
  &quot;icon64&quot;: &quot;https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@preview/images/logo.png&quot;
}

</code></pre><p>package.json</p><pre><code class="language-json">{
  &quot;name&quot;: &quot;tamper-webpack&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;webpack --watch --config config/webpack.dev.js&quot;,
    &quot;build&quot;: &quot;webpack --config config/webpack.prod.js&quot;
  },
  &quot;dependencies&quot;: {
    &quot;clean-webpack-plugin&quot;: &quot;^4.0.0&quot;,
    &quot;css-loader&quot;: &quot;^6.7.1&quot;,
    &quot;file-loader&quot;: &quot;^6.2.0&quot;,
    &quot;html-webpack-plugin&quot;: &quot;^5.5.0&quot;,
    &quot;html-webpack-template&quot;: &quot;^6.2.0&quot;,
    &quot;mini-css-extract-plugin&quot;: &quot;latest&quot;,
    &quot;prettier&quot;: &quot;^2.6.2&quot;,
    &quot;sass&quot;: &quot;^1.50.0&quot;,
    &quot;sass-loader&quot;: &quot;^12.6.0&quot;,
    &quot;style-loader&quot;: &quot;^3.3.1&quot;,
    &quot;terser-webpack-plugin&quot;: &quot;^5.3.1&quot;,
    &quot;webpack&quot;: &quot;^5.72.0&quot;,
    &quot;webpack-cli&quot;: &quot;^4.9.2&quot;,
    &quot;webpack-dev-middleware&quot;: &quot;^5.3.1&quot;,
    &quot;webpack-dev-server&quot;: &quot;^4.8.1&quot;,
    &quot;webpack-hot-middleware&quot;: &quot;^2.25.1&quot;,
    &quot;webpack-merge&quot;: &quot;^5.8.0&quot;
  }
}

</code></pre><p>loaders.js</p><pre><code class="language-js">const path = require(&quot;path&quot;);
const MiniCssExtractPlugin = require(&quot;mini-css-extract-plugin&quot;);
const cssLoader = {
  test: /\\.css$/,
  use: [
    // {
    //   loader: MiniCssExtractPlugin.loader
    // },
    {
      loader: &quot;css-loader&quot;,
    },
    {
      loader: &quot;postcss-loader&quot;,
      options: {
        config: {
          path: path.join(__dirname, &quot;./postcss.config.js&quot;),
        },
      },
    },
  ],
};
const csLoader = {
  test: /\\.css$/,
  use:  [&quot;css-loader&quot;, MiniCssExtractPlugin.loader], // 从右向左解析

};
const sassLoader = {
  test: /\\.scss$/,

    use: [{
      loader: &quot;style-loader&quot; // 将 JS 字符串生成为 style 节点
    }, {
      loader: &quot;css-loader&quot; //  将 CSS 转化成 CommonJS 模块
    }, {
      loader: &quot;sass-loader&quot; // 将 Sass 编译成 CSS
    }]

};
const fileLoader = {
  test: /\\.(png|svg|jpg|gif)$/,
  use: [\`file-loader\`],
};
const jsxLoader = {
  test: /\\.jsx$/,
  exclude: /(node_modules)/,
  use: {
    loader: &quot;babel-loader&quot;,
    options: {
      presets: [&quot;@babel/preset-react&quot;],
    },
  },
};
const svgLoader = {
  test: /\\.svg$/,
  use: [
    {
      loader: &quot;image-webpack-loader&quot;,
    },
    {
      loader: &quot;base64-inline-loader&quot;,
    },
  ],
};

const jsLoader = {
  test: /\\.js$/,
  exclude: /node_modules/,
  use: {
    loader: &quot;babel-loader&quot;,
    options: { presets: [&quot;@babel/preset-env&quot;] },
  },
};
const eslintLoader = {
  test: /\\.js$/,
  enforce: &quot;pre&quot;,
  exclude: /node_modules/,
  use: {
    loader: &quot;eslint-loader&quot;,
    options: {
      configFile: path.join(__dirname, &quot;../.eslintrc&quot;),
    },
  },
};
const csvLoader = {
  test: /\\.(csv|tsc)$/,
  use: [\`csv-loader\`],
};

const htmlLoader = {
  test: /\\.html$/,
  use: &quot;file-loader?name=[name].[ext]&quot;,
};
const xmlLoader = {
  test: /\\.xml$/,
  use: [&quot;xml-loader&quot;],
};
const imageLoader = {
  test: /\\.(png|jpg|jpeg|gif)$/,
  use: &quot;url-loader?limit=1024&amp;name=images/[name]_[hash].[ext]&quot;,
};

module.exports = {
  jsLoader,
  svgLoader,
  xmlLoader,
  imageLoader,
  csvLoader,
  csLoader,
  fileLoader,
  sassLoader,
  cssLoader,
  jsxLoader,
  htmlLoader,
};

</code></pre><p>webpack.common.js</p><pre><code class="language-js">// 
const path = require(&quot;path&quot;);
const webpack = require(&quot;webpack&quot;);
const { CleanWebpackPlugin } = require(&quot;clean-webpack-plugin&quot;); //这里必须这样写
const loaders = require(&quot;./loaders&quot;);
const {getBanner} = require(&quot;./webpack.utils&quot;);
const meta = require(&quot;./meta.json&quot;);
module.exports = {
  entry:  &#39;./src/index.js&#39;,
  output: {
    filename: &quot;tamper-webpack.dev.user.js&quot;,
    path: path.resolve(__dirname, &quot;../build&quot;),
    publicPath: path.resolve(__dirname, &quot;../build&quot;),
    // 在script标签上添加crossOrigin,以便于支持跨域脚本的错误堆栈捕获
    crossOriginLoading: &quot;anonymous&quot;,
  },
  plugins: [
    // new CleanWebpackPlugin(), //这里注意要大写啊
    new webpack.BannerPlugin({
      banner: getBanner(meta),
      raw: true,
      entryOnly: true,
    }),


  ],
  resolve: {
    modules: [
      path.resolve(__dirname, &quot;../src&quot;),
    ],
    alias: {
      components: path.resolve(__dirname, &quot;/src/components&quot;),
    },
  },

  module: {
    rules: [
      loaders.cssLoader,
        loaders.sassLoader,
      loaders.fileLoader,
    ],
  },
};

</code></pre><p>webpack.dev.js</p><pre><code class="language-js">//
const {merge} = require(&quot;webpack-merge&quot;);
const os=require(&#39;os&#39;);
const common = require(&quot;./webpack.common.js&quot;);
const utils=require(&#39;./webpack.utils&#39;)
const TerserPlugin = require(&#39;terser-webpack-plugin&#39;)
module.exports = merge(common, {

  mode:&#39;development&#39;,
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          comments: /==\\/?UserScript==|^[ ]?@|eslint-disable|spell-checker/i,
        },
      },
      extractComments: false,
    }),],
  }


});

</code></pre><p>webpack.prod.js</p><pre><code class="language-js">const webpack = require(&quot;webpack&quot;);

const {merge} = require(&quot;webpack-merge&quot;);
const common = require(&quot;./webpack.common.js&quot;);
const TerserPlugin = require(&quot;terser-webpack-plugin&quot;);

module.exports = merge(common, {
  mode:\`production\`,
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: /==\\/?UserScript==|^[ ]?@|eslint-disable|spell-checker/i,
          },
        },
        extractComments: false,
      }),
    ],
  },

});

</code></pre><p>webpack.util.js</p><pre><code class="language-js">const os=require(&#39;os&#39;);
const commonMeta=require(&#39;./meta.json&#39;)
const year = new Date().getFullYear()
const getBanner = meta =&gt; \`// ==UserScript==\\n\${Object.entries(Object.assign(meta, commonMeta)).map(([key, value]) =&gt; {
  if (Array.isArray(value)) {
    return value.map(item =&gt; \`// @\${key.padEnd(16, &#39; &#39;)}\${item}\`).join(&#39;\\n&#39;)
  }
  return \`// @\${key.padEnd(16, &#39; &#39;)}\${value.replace(/\\[year\\]/g, year)}\`
}).join(&#39;\\n&#39;)}
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */
// @[ You can find all source codes in GitHub repo ]\`
/*
获取本机IP
*/
const getIpAddress = () =&gt; {
  let localIPAddress = \`\`;
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {

    let iface = interfaces[devName];
    for (let i = 0; i &lt; iface.length; i++) {
      let alias = iface[i];
      if (
        alias.family === \`IPv4\` &amp;&amp;
        alias.address !== \`127.0.0.1\` &amp;&amp;
        !alias.internal
      ) {
        localIPAddress = alias.address;
      }
    }
  }
  return localIPAddress;
};
module.exports = {
   getIpAddress,getBanner
};
</code></pre><h2 id="搭建vite开发环境" tabindex="-1"><a class="header-anchor" href="#搭建vite开发环境"><span>搭建vite开发环境</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p><a href="https://github.com/lisonge/vite-plugin-monkey" target="_blank" rel="noopener noreferrer">https://github.com/lisonge/vite-plugin-monkey</a></p></div><p>开发模式下所使用的油猴脚本：</p><p><code>@updateURL</code> <code>@downloadURL</code>必须以<code>.user.js</code>结尾</p><pre><code class="language-js">// ==UserScript==
// @name         tampermonkey-test
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  try to take over the world!
// @author
// @match        https://*/*
// @match        http://*/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.2.6/dist/vue.global.min.js
// @updateURL    https://xxxxxxxx.user.js
// @downloadURL  https://xxxxxxxx.user.js

// ==/UserScript==

(function () {
  &quot;use strict&quot;;
  if (location.href === &quot;http://localhost:3000/&quot;) return;
  let script = document.createElement(&quot;script&quot;);
  script.type = &quot;module&quot;;
  script.src = &quot;http://localhost:3000/@vite/client&quot;;
  document.body.appendChild(script);
  let script2 = document.createElement(&quot;script&quot;);
  script2.type = &quot;module&quot;;
  script2.src = &quot;http://localhost:3000/src/main.js&quot;;
  document.body.appendChild(script2);
})();
</code></pre><p>修改 HMR（默认情况下 hmr 会使用基于 window.location 的相对地址）：</p><pre><code class="language-js">// vite.config.js

import ...

export default defineConfig({
 ...,

 server: {
  ...,

    hmr: {
      protocol: &#39;ws&#39;,
      host: &#39;localhost&#39;,
    },
  },
})
</code></pre><p>项目开发像正常开发一样即可，main.ts/js 即为脚本入口（根据 vite 设置修改）</p><p>根据脚本功能可能需要手动添加挂载元素：</p><pre><code class="language-js">// ./src/App.vue

import { createApp } from &quot;vue&quot;;
import App from &quot;./App.vue&quot;;

const app = createApp(App);

const appRoot = document.createElement(&quot;div&quot;);
appRoot.id = &quot;us-appRoot&quot;;
document.body.appendChild(appRoot);

app.mount(&quot;#us-appRoot&quot;);
</code></pre><h2 id="生产模式" tabindex="-1"><a class="header-anchor" href="#生产模式"><span>生产模式</span></a></h2><p>修改设置文件在选项对象中添加以下内容：</p><pre><code class="language-js">import { defineConfig } from &quot;vite&quot;;
import vue from &quot;@vitejs/plugin-vue&quot;;
const path = require(&quot;path&quot;);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    (() =&gt; {
      /**
       * 如果用到了额外的 GM_functions，需要添加对应 @grant
       * 虽然可以全部不添加，但只有TamperMonkey会自动推断，其他扩展不一定
       * 在上面 extenral 声明的库，此处需要添加对应的 @require 要注意全局变量名称
       */
      const headers = \`\\
// ==UserScript==
// @name         Your Script (prod mode)
// @namespace    https://your.site/
// @version      0.1.0
// @description  What does your script do
// @author       You
// @include      /https://match\\.site/
// @grant        GM_addStyle
// @noframes
// @require      https://cdn.jsdelivr.net/npm/vue@3.2.6/dist/vue.global.min.js
// ==/UserScript==

\`;

      return {
        name: &quot;inject-css&quot;,
        apply: &quot;build&quot;, // 仅在构建模式下启用
        enforce: &quot;post&quot;, // 在最后处理
        generateBundle(options, bundle) {
          // 从 bundle 中提取 style.css 内容，并加入到脚本中
          const keyword = &quot;user.js&quot;;
          if (!bundle[&quot;style.css&quot;] || bundle[&quot;style.css&quot;].type !== &quot;asset&quot;)
            return;
          const css = bundle[&quot;style.css&quot;].source;
          const [, target] =
            Object.entries(bundle).find(([name]) =&gt; {
              return name.includes(keyword);
            }) ?? [];
          if (!target || target.type !== &quot;chunk&quot;) return;
          target.code = headers + \`GM_addStyle(\\\`\${css}\\\`)\\n\${target.code}\`;
        },
      };
    })(),
  ],
  hmr: {
    protocol: &quot;ws&quot;,
    host: &quot;localhost&quot;,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, &quot;src/main.js&quot;),
      name: &quot;userscript&quot;,
      formats: [&quot;iife&quot;], // 自运行打包格式，与默认模版一致
      fileName: (format) =&gt; \`yourscript.\${format}.user.js\`, // 非函数的常量会自动添加后缀
    },
    rollupOptions: {
      external: [&quot;vue&quot;], // 分离库以降低最终代码体积
      output: {
        globals: {
          vue: &quot;Vue&quot;,
          GM_addStyle: &quot;GM_addStyle&quot;, // 油猴脚本API，用于添加样式到页面
        },
        inlineDynamicImports: true, // 库构建模式下不能进行代码分割，开启此功能可将本应分割的代码整合在一起避免报错（代码分割可能由其他插件引起）
      },
    },
    minify: &quot;terser&quot;,
    terserOptions: {
      mangle: false, // 关闭名称混淆，遵守Greasefork规则
      format: {
        beautify: true, // 美化代码开启缩进，遵守Greasefork规则
      },
    },
  },
});
</code></pre><p>编译后的 js 文件应在 /dist 目录下，像普通油猴脚本一样使用即可</p><p>若使用了 tailwindcss/windicss 等，内置的 css reset 影响了原本元素，可以在对应设置文件中关闭 preflight</p>`,36),r=[s];function a(i,l){return n(),t("div",null,r)}const p=e(u,[["render",a],["__file","write-plugin.html.vue"]]),q=JSON.parse('{"path":"/frontend/tampermonkey/write-plugin.html","title":"tamper插件编写","lang":"zh-CN","frontmatter":{"description":"tamper插件编写 搭建jquery开发环境 油猴可以 // @require ... 的方法引用外部js文件，如果要引用本地文件，需要在浏览器插件设置中允许油猴访问文件URL，步骤 在浏览器地址栏输入：edge://extensions 找到Tampermonkey，点详细信息，打开允许访问文件 URL 在脚本头部添加:@require file:...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/tampermonkey/write-plugin.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"tamper插件编写"}],["meta",{"property":"og:description","content":"tamper插件编写 搭建jquery开发环境 油猴可以 // @require ... 的方法引用外部js文件，如果要引用本地文件，需要在浏览器插件设置中允许油猴访问文件URL，步骤 在浏览器地址栏输入：edge://extensions 找到Tampermonkey，点详细信息，打开允许访问文件 URL 在脚本头部添加:@require file:..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-05T00:09:15.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-06-05T00:09:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"tamper插件编写\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-06-05T00:09:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"搭建jquery开发环境","slug":"搭建jquery开发环境","link":"#搭建jquery开发环境","children":[]},{"level":2,"title":"搭建webpack开发环境","slug":"搭建webpack开发环境","link":"#搭建webpack开发环境","children":[]},{"level":2,"title":"搭建vite开发环境","slug":"搭建vite开发环境","link":"#搭建vite开发环境","children":[]},{"level":2,"title":"生产模式","slug":"生产模式","link":"#生产模式","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1654387755000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":5.24,"words":1572},"filePathRelative":"frontend/tampermonkey/write-plugin.md","localizedDate":"2022年3月21日","autoDesc":true}');export{p as comp,q as data};
