import{_ as s,c as a,a as t,o as p}from"./app-C8DxhDIZ.js";const e={};function o(c,n){return p(),a("div",null,n[0]||(n[0]=[t(`<h1 id="数组" tabindex="-1"><a class="header-anchor" href="#数组"><span>数组</span></a></h1><div class="language-csharp" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> chars <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">char</span></span><span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">chars<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">;</span></span>
<span class="line">chars<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token char">&#39;b&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> letters <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> mylist <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token class-name"><span class="token keyword">bool</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> answers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="循环" tabindex="-1"><a class="header-anchor" href="#循环"><span>循环</span></a></h2><div class="language-csharp" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> numbers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> numbers<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>numbers<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> num <span class="token keyword">in</span> numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div>`,4)]))}const u=s(e,[["render",o]]),i=JSON.parse('{"path":"/cs-tips/csharp-tip/array.html","title":"数组","lang":"zh-CN","frontmatter":{"description":"数组 循环","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/csharp-tip/array.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"数组"}],["meta",{"property":"og:description","content":"数组 循环"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数组\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"循环","slug":"循环","link":"#循环","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.18,"words":54},"filePathRelative":"cs-tips/csharp-tip/array.md","localizedDate":"2023年5月25日","autoDesc":true}');export{u as comp,i as data};
