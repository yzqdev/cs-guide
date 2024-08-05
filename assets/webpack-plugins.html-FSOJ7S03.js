import{_ as e,c as n,o as t,d as a}from"./app-CbULZrmi.js";const p={},l=a(`<h1 id="webpack教程" tabindex="-1"><a class="header-anchor" href="#webpack教程"><span>webpack教程</span></a></h1><h2 id="复制资源的插件-copy-webpack-plugin" tabindex="-1"><a class="header-anchor" href="#复制资源的插件-copy-webpack-plugin"><span>复制资源的插件:copy-webpack-plugin</span></a></h2><pre><code class="language-javascript">yarn add copy-webpack-plugin

const CopyPlugin = require(&quot;copy-webpack-plugin&quot;);

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: &quot;source&quot;, to: &quot;dest&quot; },
        { from: &quot;other&quot;, to: &quot;public&quot; },
      ],
    }),
  ],
};
</code></pre><h2 id="压缩的插件-terser-webpack-plugin" tabindex="-1"><a class="header-anchor" href="#压缩的插件-terser-webpack-plugin"><span>压缩的插件:terser-webpack-plugin</span></a></h2><h3 id="插件地址" tabindex="-1"><a class="header-anchor" href="#插件地址"><span>插件地址</span></a></h3><p><a href="https://github.com/webpack-contrib/terser-webpack-plugin" target="_blank" rel="noopener noreferrer">https://github.com/webpack-contrib/terser-webpack-plugin</a> ​</p><p>安装:</p><pre><code class="language-sh">yarn add terser-webpack-plugin
</code></pre><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h3><pre><code class="language-js">const TerserPlugin = require(&quot;terser-webpack-plugin&quot;);
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress: {},
          mangle: true, // Note \`mangle.properties\` is \`false\` by default.
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

</code></pre><h2 id="webpack多页面" tabindex="-1"><a class="header-anchor" href="#webpack多页面"><span>webpack多页面</span></a></h2><pre><code class="language-ts">
const HtmlWebpackPlugin = require(&#39;html-webpack-plugin&#39;);

let htmlPageNames = [&#39;example1&#39;, &#39;example2&#39;, &#39;example3&#39;, &#39;example4&#39;];
let multipleHtmlPlugins = htmlPageNames.map(name =&gt; {
  return new HtmlWebpackPlugin({
    template: \`./src/\${name}.html\`, // relative path to the HTML files
    filename: \`\${name}.html\`, // output HTML files
    chunks: [\`\${name}\`] // respective JS files
  })
});

module.exports = {
  entry: {
    main: &#39;./js/main.js&#39;,
    example1: &#39;./js/example1.js&#39;,
    //... repeat until example 4
  },
  module: { 
       //.. your rules
  };
  plugins: [
    new HtmlWebpackPlugin({
      template: &quot;./src/index.html&quot;,
      chunks: [&#39;main&#39;]
    })
  ].concat(multipleHtmlPlugins)
  
};

</code></pre><h2 id="babel配置" tabindex="-1"><a class="header-anchor" href="#babel配置"><span>babel配置</span></a></h2><p>babel.config.mjs</p><pre><code class="language-js">//babel.config.js
/** @type {import(&#39;@babel/core&#39;).ConfigFunction} */
export default function (api) {
  api.cache(true);

  return {
    presets: [
      [
        &quot;@babel/preset-env&quot;,
        {
          targets: {
            browsers: [&quot;last 1 version&quot;],
          },
          exclude: [&quot;transform-async-to-generator&quot;, &quot;transform-regenerator&quot;],
        },
      ],
      [&quot;@vue/cli-plugin-babel/preset&quot;],
      [&quot;@babel/preset-typescript&quot;],
    ],
  };
}

</code></pre>`,15),r=[l];function o(c,i){return t(),n("div",null,r)}const u=e(p,[["render",o],["__file","webpack-plugins.html.vue"]]),b=JSON.parse('{"path":"/frontend/framework/packaging-tool/webpack-plugins.html","title":"webpack教程","lang":"zh-CN","frontmatter":{"description":"webpack教程 复制资源的插件:copy-webpack-plugin 压缩的插件:terser-webpack-plugin 插件地址 https://github.com/webpack-contrib/terser-webpack-plugin ​ 安装: 配置 webpack多页面 babel配置 babel.config.mjs","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/packaging-tool/webpack-plugins.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"webpack教程"}],["meta",{"property":"og:description","content":"webpack教程 复制资源的插件:copy-webpack-plugin 压缩的插件:terser-webpack-plugin 插件地址 https://github.com/webpack-contrib/terser-webpack-plugin ​ 安装: 配置 webpack多页面 babel配置 babel.config.mjs"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-10T18:06:56.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-10T18:06:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"webpack教程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-10T18:06:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"复制资源的插件:copy-webpack-plugin","slug":"复制资源的插件-copy-webpack-plugin","link":"#复制资源的插件-copy-webpack-plugin","children":[]},{"level":2,"title":"压缩的插件:terser-webpack-plugin","slug":"压缩的插件-terser-webpack-plugin","link":"#压缩的插件-terser-webpack-plugin","children":[{"level":3,"title":"插件地址","slug":"插件地址","link":"#插件地址","children":[]},{"level":3,"title":"配置","slug":"配置","link":"#配置","children":[]}]},{"level":2,"title":"webpack多页面","slug":"webpack多页面","link":"#webpack多页面","children":[]},{"level":2,"title":"babel配置","slug":"babel配置","link":"#babel配置","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1699639616000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":0.76,"words":229},"filePathRelative":"frontend/framework/packaging-tool/webpack-plugins.md","localizedDate":"2022年3月21日","autoDesc":true}');export{u as comp,b as data};
