import{_ as e,c as o,o as t,d as n}from"./app-CbULZrmi.js";const a={},l=n(`<h1 id="babel教程" tabindex="-1"><a class="header-anchor" href="#babel教程"><span>babel教程</span></a></h1><p>使用babel需要以下依赖</p><pre><code class="language-json">{
      &quot;@babel/cli&quot;: &quot;^7.12.1&quot;,
    &quot;@babel/core&quot;: &quot;^7.11.4&quot;,
    &quot;@babel/plugin-proposal-class-properties&quot;: &quot;^7.12.1&quot;,
    &quot;@babel/plugin-transform-runtime&quot;: &quot;^7.12.1&quot;,
    &quot;@babel/preset-env&quot;: &quot;^7.11.5&quot;,
    &quot;@babel/preset-typescript&quot;: &quot;^7.10.4&quot;,
      &quot;babel-jest&quot;: &quot;^26.3.0&quot;,
    &quot;babel-loader&quot;: &quot;^8.1.0&quot;,
    &quot;babel-plugin-lodash&quot;: &quot;^3.3.4&quot;,
    &quot;babel-plugin-module-resolver&quot;: &quot;^4.0.0&quot;,
    &quot;babel-preset-vue&quot;: &quot;^2.0.2&quot;,
  
  
}
</code></pre><ul><li>你是否采用的是单一仓库（monorepo）模式？</li><li>你是否需要编译 node_modules？</li></ul><blockquote><p>那么 <a href="https://www.babeljs.cn/docs/configuration#babelconfigjson" target="_blank" rel="noopener noreferrer">babel.config.json</a> 文件可以满足你的的需求！</p></blockquote><ul><li>你的配置文件是否仅适用于项目的某个部分？</li></ul><blockquote><p>那么 <a href="https://www.babeljs.cn/docs/configuration#babelrcjson" target="_blank" rel="noopener noreferrer">.babelrc.json</a> 文件适合你！ 我们建议使用 <a href="https://www.babeljs.cn/docs/config-files#project-wide-configuration" target="_blank" rel="noopener noreferrer">babel.config.json</a> 格式的配置文件。 <a href="https://github.com/babel/babel/blob/master/babel.config.js" target="_blank" rel="noopener noreferrer">Babel 自身使用的就是这种</a>。</p></blockquote><h2 id="babel-config-json" tabindex="-1"><a class="header-anchor" href="#babel-config-json"><span>babel.config.json</span></a></h2><p>在项目的根目录（package.json 文件所在的目录）下创建一个名为 babel.config.json 的文件，并输入如下内容。</p><pre><code class="language-json">{
  &quot;presets&quot;: [...],
  &quot;plugins&quot;: [...]
}
</code></pre><h2 id="一个例子" tabindex="-1"><a class="header-anchor" href="#一个例子"><span>一个例子</span></a></h2><pre><code class="language-json">{
  &quot;presets&quot;: [
    [
      &quot;@babel/env&quot;,
      {
        &quot;targets&quot;: {
          &quot;edge&quot;: &quot;17&quot;,
          &quot;firefox&quot;: &quot;60&quot;,
          &quot;chrome&quot;: &quot;67&quot;,
          &quot;safari&quot;: &quot;11.1&quot;
        },
        &quot;useBuiltIns&quot;: &quot;usage&quot;,
        &quot;corejs&quot;: &quot;3.6.5&quot;
      }
    ]
  ]
}

</code></pre><h2 id="或者使用babel-config-js" tabindex="-1"><a class="header-anchor" href="#或者使用babel-config-js"><span>或者使用babel.config.js</span></a></h2><pre><code class="language-ts">module.exports = function (api) {
  api.cache(true);

  const presets = [ ... ];
  const plugins = [ ... ];

  return {
    presets,
    plugins
  };
}
</code></pre><pre><code class="language-json">需要添加如下依赖
{
      &quot;@babel/core&quot;: &quot;^7.14.3&quot;,
    &quot;@babel/plugin-transform-runtime&quot;: &quot;^7.14.3&quot;,
    &quot;@babel/preset-env&quot;: &quot;^7.14.4&quot;,
    &quot;babel-loader&quot;: &quot;^8.2.2&quot;,
}

并在规则中添加如下:
{
        test: /\\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: &quot;babel-loader&quot;,
          options: {
            presets: [&quot;@babel/preset-env&quot;],
            plugins: [&quot;@babel/plugin-transform-runtime&quot;]
          }
        }
      },

还要配置一下babel.config.json

</code></pre>`,15),r=[l];function u(s,b){return t(),o("div",null,r)}const i=e(a,[["render",u],["__file","babel-loader.html.vue"]]),p=JSON.parse('{"path":"/frontend/framework/packaging-tool/babel-loader.html","title":"babel教程","lang":"zh-CN","frontmatter":{"description":"babel教程 使用babel需要以下依赖 你是否采用的是单一仓库（monorepo）模式？ 你是否需要编译 node_modules？ 那么 babel.config.json 文件可以满足你的的需求！ 你的配置文件是否仅适用于项目的某个部分？ 那么 .babelrc.json 文件适合你！ 我们建议使用 babel.config.json 格式的配...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/packaging-tool/babel-loader.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"babel教程"}],["meta",{"property":"og:description","content":"babel教程 使用babel需要以下依赖 你是否采用的是单一仓库（monorepo）模式？ 你是否需要编译 node_modules？ 那么 babel.config.json 文件可以满足你的的需求！ 你的配置文件是否仅适用于项目的某个部分？ 那么 .babelrc.json 文件适合你！ 我们建议使用 babel.config.json 格式的配..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-04T19:25:57.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-04T19:25:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"babel教程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-04T19:25:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"babel.config.json","slug":"babel-config-json","link":"#babel-config-json","children":[]},{"level":2,"title":"一个例子","slug":"一个例子","link":"#一个例子","children":[]},{"level":2,"title":"或者使用babel.config.js","slug":"或者使用babel-config-js","link":"#或者使用babel-config-js","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1699125957000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.96,"words":289},"filePathRelative":"frontend/framework/packaging-tool/babel-loader.md","localizedDate":"2022年3月21日","autoDesc":true}');export{i as comp,p as data};
