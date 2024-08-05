import{_ as e,c as t,o as n,d as o}from"./app-CbULZrmi.js";const a={},s=o(`<h1 id="使用webpack开发vue" tabindex="-1"><a class="header-anchor" href="#使用webpack开发vue"><span>使用webpack开发vue</span></a></h1><p>配置如下</p><pre><code class="language-js">let webpack = require(&quot;webpack&quot;);
const { VueLoaderPlugin } = require(&quot;vue-loader&quot;);
const TerserPlugin = require(&#39;terser-webpack-plugin&#39;)
 
module.exports = {
  mode: &quot;production&quot;,
  entry: {
    ui: &quot;./src/main.js&quot;,
  },
  output: {
    path: __dirname + &quot;/extension&quot;,
    filename: &quot;popup.js&quot;,
  },
  module: {
    rules: [
      {
        test: /\\.vue$/,
        loader: &quot;vue-loader&quot;,
      },
      {
        test: /\\.css$/,
        use: [&quot;style-loader&quot;, &quot;css-loader&quot;],
      },
      {
        test: /\\.(png|jpe?g|gif|svg)(\\?.*)?$/,
        loader: &quot;url-loader&quot;,
      },
      {
        test: /\\.(woff2?|eot|ttf|otf)(\\?.*)?$/,
        loader: &quot;url-loader&quot;,
      },
    ],
  },optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          comments: /==\\/?UserScript==|^[ ]?@|eslint-disable|spell-checker/i,
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

</code></pre><h2 id="webstorm配置alias" tabindex="-1"><a class="header-anchor" href="#webstorm配置alias"><span>webstorm配置alias</span></a></h2><p>配置一个 alias.config.js</p><pre><code class="language-javascript">/* eslint-disable */
/**
 * 由于 Vue CLI 3 不再使用传统的 webpack 配置文件，故 WebStorm 无法识别别名
 * 本文件对项目无任何作用，仅作为 WebStorm 识别别名用
 * 进入 WebStorm preferences -&gt; Language &amp; Framework -&gt; JavaScript -&gt; Webpack，选择这个文件即可
 * */
const resolve = dir =&gt; require(&#39;path&#39;).join(__dirname, dir);

module.exports = {
    resolve: {
        alias: {
            &#39;@&#39;: resolve(&#39;src&#39;),
            &#39;@views&#39;: resolve(&#39;src/views&#39;),
            &#39;@comp&#39;: resolve(&#39;src/components&#39;),
            &#39;@assets&#39;: resolve(&#39;src/assets&#39;),
        }
    }
};
</code></pre><h2 id="一个webpack配置vue的例子" tabindex="-1"><a class="header-anchor" href="#一个webpack配置vue的例子"><span>一个webpack配置vue的例子</span></a></h2><p>webpack.base.ts</p><pre><code class="language-ts">import path from &quot;node:path&quot;;
import HtmlwebpackPlugin from &quot;html-webpack-plugin&quot;;
import webpack from &quot;webpack&quot;;
import {VueLoaderPlugin}   from &quot;vue-loader&quot;;
import MiniCssExtractPlugin from &quot;mini-css-extract-plugin&quot;;
import &quot;webpack-dev-server&quot;;
import { Configuration } from &quot;webpack/types&quot;;
const conf: Configuration = {
  mode: &quot;development&quot;,
  entry: path.resolve(__dirname, &quot;./src/main.ts&quot;),
  target: &quot;web&quot;,
  devtool: &quot;source-map&quot;,
  devServer: {
    port: 3211,
    host: &quot;0.0.0.0&quot;,
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [&quot;.js&quot;, &quot;.ts&quot;],
    alias: {
      &quot;@&quot;: path.resolve(__dirname, &quot;./src&quot;),
    },
  },
  output: {
    path: path.resolve(__dirname, &quot;dist&quot;),
    filename: &quot;[name].[contenthash:8].js&quot;,
    publicPath: &quot;/&quot;,
  },

  module: {
    rules: [
      {
        test: /\\.vue$/,
        loader: &quot;vue-loader&quot;,
        options: {
          // reactivityTransform: true,
        },
      },
      {
        test: /\\.(png|jpg|jpeg|gif)$/,
        type: &quot;asset/resource&quot;,
      },
      {
        test: /\\.svg$/,
        use: [
          { loader: &quot;svg-sprite-loader&quot;, options: { symbolId: &quot;icon-[name]&quot; } },
        ],
      },
      // {
      //   test: /\\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: &quot;css-loader&quot;,
      //       options: {
      //         modules: true,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\\.(sa|sc|c)ss$/,
        oneOf: [
          // 这里匹配 \`&lt;style module&gt;\`
          {
            resourceQuery: /module/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: &quot;css-loader&quot;,
                options: {
                  modules: true,

                },
              },
              &quot;sass-loader&quot;,
            ],
          },
          // 这里匹配普通的 \`&lt;style&gt;\` 或 \`&lt;style scoped&gt;\`
          {
            use: [MiniCssExtractPlugin.loader, &quot;css-loader&quot;, &quot;sass-loader&quot;],
          },
        ],
      },
      {
        test: /\\.ts$/,
        use: [
          {
            loader: &quot;ts-loader&quot;,
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\\.vue$/],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlwebpackPlugin({
      title: &quot;vue Template&quot;,
      filename: &quot;index.html&quot;,
      template: &quot;./public/index.html&quot;,
      inject: true,
      // chunks: [&quot;index&quot;],
      hash: true,
      path: &quot;./&quot;,
    }),
    new MiniCssExtractPlugin({
      filename: &quot;[name].css&quot;,
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
};
export default  conf


</code></pre><p>webpack.dev.ts</p><pre><code class="language-ts">import * as path from &quot;path&quot;;
import * as webpack from &quot;webpack&quot;;
// const Dotenv = require(&#39;dotenv-webpack&#39;);
import MiniCssExtractPlugin from &quot;mini-css-extract-plugin&quot;;
import HtmlwebpackPlugin from &quot;html-webpack-plugin&quot;;
// import * as CopyWebpackPlugin from &#39;copy-webpack-plugin&#39;
import base from &quot;./webpack.base&quot;;
import { merge } from &quot;webpack-merge&quot;;
import &quot;webpack-dev-server&quot;;
import &quot;dotenv/config&quot;;
console.log(process.env.BASE_URL);
const conf = merge(base, {
  plugins: [
    new webpack.DefinePlugin({
      &quot;process.env&quot;: JSON.stringify(process.env),
    }),
  ],
});
export default conf;

</code></pre><p>webpack.prod.ts</p><pre><code class="language-ts">import * as path from &quot;path&quot;;
import * as webpack from &quot;webpack&quot;;
import dotenv from &quot;dotenv&quot;;
dotenv.config({
  path: path.resolve(__dirname, &quot;./.env.production&quot;),
});
// const Dotenv = require(&#39;dotenv-webpack&#39;);
import CompressionPlugin from &#39;compression-webpack-plugin&#39;
import MiniCssExtractPlugin from &quot;mini-css-extract-plugin&quot;;
import HtmlwebpackPlugin from &quot;html-webpack-plugin&quot;;
// import * as CopyWebpackPlugin from &#39;copy-webpack-plugin&#39;
import base from &quot;./webpack.base&quot;;
import { merge } from &quot;webpack-merge&quot;;
import &quot;webpack-dev-server&quot;;
const conf = merge(base, {
  mode: &quot;production&quot;,
  devtool: false,
  optimization: {
    splitChunks: {
      chunks: &quot;all&quot;,
      maxSize: 1024 * 1024,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      &quot;process.env&quot;: JSON.stringify(process.env),
    }),
        new CompressionPlugin({
      algorithm: &#39;gzip&#39;,
      test: /\\.(js|css)$/,
      threshold: 10240,
      deleteOriginalAssets: false,
      minRatio: 0.8
    })
  ],
});
export default conf;


</code></pre><p>.env.development</p><pre><code class="language-env">BASE_URL=&quot;/&quot;

</code></pre>`,15),r=[s];function u(p,i){return n(),t("div",null,r)}const l=e(a,[["render",u],["__file","webpack-vue.html.vue"]]),m=JSON.parse('{"path":"/frontend/framework/packaging-tool/webpack-vue.html","title":"使用webpack开发vue","lang":"zh-CN","frontmatter":{"description":"使用webpack开发vue 配置如下 webstorm配置alias 配置一个 alias.config.js 一个webpack配置vue的例子 webpack.base.ts webpack.dev.ts webpack.prod.ts .env.development","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/packaging-tool/webpack-vue.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"使用webpack开发vue"}],["meta",{"property":"og:description","content":"使用webpack开发vue 配置如下 webstorm配置alias 配置一个 alias.config.js 一个webpack配置vue的例子 webpack.base.ts webpack.dev.ts webpack.prod.ts .env.development"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-10T18:06:56.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-10T18:06:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用webpack开发vue\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-10T18:06:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"webstorm配置alias","slug":"webstorm配置alias","link":"#webstorm配置alias","children":[]},{"level":2,"title":"一个webpack配置vue的例子","slug":"一个webpack配置vue的例子","link":"#一个webpack配置vue的例子","children":[]}],"git":{"createdTime":1650104752000,"updatedTime":1699639616000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":2.21,"words":664},"filePathRelative":"frontend/framework/packaging-tool/webpack-vue.md","localizedDate":"2022年4月16日","autoDesc":true}');export{l as comp,m as data};
