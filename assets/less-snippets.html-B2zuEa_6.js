import{_ as s,c as a,a as p,o as e}from"./app-B6vXTniy.js";const t={};function l(c,n){return e(),a("div",null,[...n[0]||(n[0]=[p(`<h1 id="lessjs配置" tabindex="-1"><a class="header-anchor" href="#lessjs配置"><span>lessjs配置</span></a></h1><div class="language-less line-numbers-mode" data-highlighter="prismjs" data-ext="less"><pre><code class="language-less"><span class="line"><span class="token variable">@charset</span> <span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 全局样式开始</span></span>
<span class="line"><span class="token selector">.cur-pointer</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token selector">.loopStyle(<span class="token variable">@counter</span>) when (<span class="token variable">@counter</span> &gt; 0)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token selector">.p-@{counter}</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">padding</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>1px <span class="token operator">*</span> <span class="token variable">@counter</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">.p-t-@{counter}</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">padding-top</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>1px <span class="token operator">*</span> <span class="token variable">@counter</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">.p-r-@{counter}</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">padding-right</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>1px <span class="token operator">*</span> <span class="token variable">@counter</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">.p-b-@{counter}</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">padding-bottom</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>1px <span class="token operator">*</span> <span class="token variable">@counter</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">.p-l-@{counter}</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">padding-left</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>1px <span class="token operator">*</span> <span class="token variable">@counter</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">.m-@{counter}</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">margin</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>1px <span class="token operator">*</span> <span class="token variable">@counter</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">.m-t-@{counter}</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">margin-top</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>1px <span class="token operator">*</span> <span class="token variable">@counter</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">.m-r-@{counter}</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">margin-right</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>1px <span class="token operator">*</span> <span class="token variable">@counter</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">.m-b-@{counter}</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">margin-bottom</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>1px <span class="token operator">*</span> <span class="token variable">@counter</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">.m-l-@{counter}</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">margin-left</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>1px <span class="token operator">*</span> <span class="token variable">@counter</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">.fz-@{counter}</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>1px <span class="token operator">*</span> <span class="token variable">@counter</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">.width-@{counter}</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">width</span><span class="token punctuation">:</span> 1px <span class="token operator">*</span> <span class="token variable">@counter</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  .<span class="token function">loopStyle</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token variable">@counter</span> <span class="token operator">-</span> 1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 递归调用自身</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">.<span class="token function">loopStyle</span><span class="token punctuation">(</span>100<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token variable">@selectors<span class="token punctuation">:</span></span> <span class="token function">range</span><span class="token punctuation">(</span>100<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token function">each</span><span class="token punctuation">(</span><span class="token atrule">@selectors, .<span class="token punctuation">(</span>@v <span class="token punctuation">)</span></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">each</span><span class="token punctuation">(</span><span class="token atrule">@selectors</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token selector">.m-@{v}-@{value}</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">margin</span><span class="token punctuation">:</span> 1px<span class="token operator">*</span><span class="token variable">@v</span> 1px<span class="token operator">*</span><span class="token variable">@value</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token selector">.p-@{v}-@{value}</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">padding</span><span class="token punctuation">:</span> 1px<span class="token operator">*</span><span class="token variable">@v</span> 1px<span class="token operator">*</span><span class="token variable">@value</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token selector">.bg-primary</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>19<span class="token punctuation">,</span> 46<span class="token punctuation">,</span> 160<span class="token punctuation">,</span> 1<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token selector">.df</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span></span>
<span class="line">  <span class="token selector">&amp;-center</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span></span>
<span class="line">    <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span></span>
<span class="line">    <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token selector">.df-col</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span></span>
<span class="line">  <span class="token selector">&amp;-center</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span></span>
<span class="line">    <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span></span>
<span class="line">    <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span></span>
<span class="line">    <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token selector">.dg-center</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//------------全局样式定义结束</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)])])}const o=s(t,[["render",l]]),u=JSON.parse('{"path":"/cs-tips/frontend/snippets/less-snippets.html","title":"lessjs配置","lang":"zh-CN","frontmatter":{"description":"lessjs配置","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"lessjs配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/snippets/less-snippets.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"lessjs配置"}],["meta",{"property":"og:description","content":"lessjs配置"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}]]},"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.69,"words":208},"filePathRelative":"cs-tips/frontend/snippets/less-snippets.md","autoDesc":true}');export{o as comp,u as data};
