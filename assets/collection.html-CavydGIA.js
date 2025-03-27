import{_ as s,c as a,a as t,o as p}from"./app-C8DxhDIZ.js";const e={};function o(c,n){return p(),a("div",null,n[0]||(n[0]=[t(`<h1 id="集合" tabindex="-1"><a class="header-anchor" href="#集合"><span>集合</span></a></h1><p><a href="https://kotlinlang.org/docs/collections-overview.html" target="_blank" rel="noopener noreferrer">https://kotlinlang.org/docs/collections-overview.html</a></p><h2 id="ranges" tabindex="-1"><a class="header-anchor" href="#ranges"><span>ranges</span></a></h2><div class="language-kotlin" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"> <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token keyword">in</span> <span class="token number">1</span><span class="token operator">..</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token function">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token comment">//1234</span></span>
<span class="line"><span class="token comment">//倒序</span></span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token keyword">in</span> <span class="token number">4</span> downTo <span class="token number">1</span><span class="token punctuation">)</span> <span class="token function">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token comment">//4321</span></span>
<span class="line"><span class="token comment">//step </span></span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token keyword">in</span> <span class="token number">1</span><span class="token operator">..</span><span class="token number">8</span> step <span class="token number">2</span><span class="token punctuation">)</span> <span class="token function">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token comment">//1357</span></span>
<span class="line"><span class="token comment">//不包括10</span></span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token keyword">in</span> <span class="token number">1</span> until <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>       <span class="token comment">// i in 1 until 10, excluding 10</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h2 id="group" tabindex="-1"><a class="header-anchor" href="#group"><span>group</span></a></h2><div class="language-kotlin" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">val</span> numbers <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;one&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;two&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;three&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;four&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;five&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token function">println</span><span class="token punctuation">(</span>numbers<span class="token punctuation">.</span><span class="token function">groupBy</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">uppercase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">println</span><span class="token punctuation">(</span>numbers<span class="token punctuation">.</span><span class="token function">groupBy</span><span class="token punctuation">(</span>keySelector <span class="token operator">=</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> valueTransform <span class="token operator">=</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">uppercase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div>`,6)]))}const i=s(e,[["render",o]]),u=JSON.parse('{"path":"/kotlin-tutor/collection.html","title":"集合","lang":"zh-CN","frontmatter":{"description":"集合 https://kotlinlang.org/docs/collections-overview.html ranges group","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/kotlin-tutor/collection.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"集合"}],["meta",{"property":"og:description","content":"集合 https://kotlinlang.org/docs/collections-overview.html ranges group"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"集合\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"ranges","slug":"ranges","link":"#ranges","children":[]},{"level":2,"title":"group","slug":"group","link":"#group","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.26,"words":77},"filePathRelative":"kotlin-tutor/collection.md","localizedDate":"2023年5月22日","autoDesc":true}');export{i as comp,u as data};
