import{_ as n,c as t,a as s,o as a}from"./app-C8DxhDIZ.js";const o={};function i(l,e){return a(),t("div",null,e[0]||(e[0]=[s(`<h1 id="技巧" tabindex="-1"><a class="header-anchor" href="#技巧"><span>技巧</span></a></h1><h2 id="使用webpack-config-mts配置文件" tabindex="-1"><a class="header-anchor" href="#使用webpack-config-mts配置文件"><span>使用webpack.config.mts配置文件</span></a></h2><p>两种方式,一种使用ts-node的esm loader,一种是使用tsx的esm-loader</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">{  </span>
<span class="line">  &quot;name&quot;: &quot;wp-simple&quot;,  </span>
<span class="line">  &quot;packageManager&quot;: &quot;yarn@4.1.1&quot;,  </span>
<span class="line">  &quot;scripts&quot;: {  </span>
<span class="line">    &quot;dev&quot;: &quot;dotenv -v NODE_OPTIONS=\\&quot;--loader=ts-node/esm\\&quot; --  webpack --config webpack.config.mts&quot;,  </span>
<span class="line">    &quot;build&quot;: &quot;webpack --config webpack.config.ts&quot;,  </span>
<span class="line">    &quot;build:tsx&quot;: &quot;dotenv -v NODE_OPTIONS=&#39;--import=tsx/esm&#39; --  webpack --config webpack.config.mts&quot;  </span>
<span class="line">  },  </span>
<span class="line">  &quot;devDependencies&quot;: {  </span>
<span class="line">    &quot;@types/node&quot;: &quot;^20.12.7&quot;,  </span>
<span class="line">    &quot;esno&quot;: &quot;^4.7.0&quot;,  </span>
<span class="line">    &quot;prettier&quot;: &quot;^3.2.5&quot;,  </span>
<span class="line">    &quot;ts-node&quot;: &quot;^10.9.2&quot;,  </span>
<span class="line">    &quot;tslib&quot;: &quot;^2.6.2&quot;,  </span>
<span class="line">    &quot;tsx&quot;: &quot;^4.7.3&quot;,  </span>
<span class="line">    &quot;typescript&quot;: &quot;^5.4.5&quot;,  </span>
<span class="line">    &quot;webpack&quot;: &quot;^5.91.0&quot;,  </span>
<span class="line">    &quot;webpack-cli&quot;: &quot;^5.1.4&quot;  </span>
<span class="line">  }  </span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>node --import //只导入esm</p><p>node --require // 只导入cjs用</p><p>node --loader //弃用</p></div><p><strong>重载所有插件<a href="https://chromewebstore.google.com/detail/advanced-extension-reload/hagknokdofkmojolcpbddjfdjhnjdkae" target="_blank" rel="noopener noreferrer">advanced-extension-reloader</a></strong></p><p>https://github.com/loftyshaky/advanced-extension-reloader/</p>`,7)]))}const d=n(o,[["render",i]]),p=JSON.parse('{"path":"/frontend/framework/packaging-tool/webpack-tips.html","title":"技巧","lang":"zh-CN","frontmatter":{"description":"技巧 使用webpack.config.mts配置文件 两种方式,一种使用ts-node的esm loader,一种是使用tsx的esm-loader 相关信息 node --import //只导入esm node --require // 只导入cjs用 node --loader //弃用 重载所有插件advanced-extension-rel...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/packaging-tool/webpack-tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"技巧"}],["meta",{"property":"og:description","content":"技巧 使用webpack.config.mts配置文件 两种方式,一种使用ts-node的esm loader,一种是使用tsx的esm-loader 相关信息 node --import //只导入esm node --require // 只导入cjs用 node --loader //弃用 重载所有插件advanced-extension-rel..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-13T15:07:53.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-13T15:07:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-05-13T15:07:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"使用webpack.config.mts配置文件","slug":"使用webpack-config-mts配置文件","link":"#使用webpack-config-mts配置文件","children":[]}],"git":{"createdTime":1714738880000,"updatedTime":1715612873000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.4,"words":120},"filePathRelative":"frontend/framework/packaging-tool/webpack-tips.md","localizedDate":"2024年5月3日","autoDesc":true}');export{d as comp,p as data};
