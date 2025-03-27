import{_ as a,c as s,a as t,o as e}from"./app-C8DxhDIZ.js";const o={};function p(c,n){return e(),s("div",null,n[0]||(n[0]=[t(`<h1 id="fiber教程" tabindex="-1"><a class="header-anchor" href="#fiber教程"><span>fiber教程</span></a></h1><h2 id="显示所有路由" tabindex="-1"><a class="header-anchor" href="#显示所有路由"><span>显示所有路由</span></a></h2><div class="language-go" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">createRouteMap</span><span class="token punctuation">(</span>engine <span class="token operator">*</span>fiber<span class="token punctuation">.</span>App<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> routes <span class="token operator">:=</span> engine<span class="token punctuation">.</span><span class="token function">Stack</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> route <span class="token operator">:=</span> <span class="token keyword">range</span> routes <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> r <span class="token operator">:=</span> <span class="token keyword">range</span> route <span class="token punctuation">{</span></span>
<span class="line">   color<span class="token punctuation">.</span><span class="token function">Redln</span><span class="token punctuation">(</span><span class="token string">&quot;[debug]&quot;</span><span class="token punctuation">,</span> r<span class="token punctuation">.</span>Method<span class="token punctuation">,</span> r<span class="token punctuation">.</span>Path<span class="token punctuation">,</span> r<span class="token punctuation">.</span>Params<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div>`,3)]))}const i=a(o,[["render",p]]),l=JSON.parse('{"path":"/go-tutor/framework/gofiber.html","title":"fiber教程","lang":"zh-CN","frontmatter":{"description":"fiber教程 显示所有路由","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/framework/gofiber.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"fiber教程"}],["meta",{"property":"og:description","content":"fiber教程 显示所有路由"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-26T16:41:58.000Z"}],["meta",{"property":"article:modified_time","content":"2022-07-26T16:41:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"fiber教程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-26T16:41:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"显示所有路由","slug":"显示所有路由","link":"#显示所有路由","children":[]}],"git":{"createdTime":1657259339000,"updatedTime":1658853718000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.1,"words":31},"filePathRelative":"go-tutor/framework/gofiber.md","localizedDate":"2022年7月8日","autoDesc":true}');export{i as comp,l as data};
