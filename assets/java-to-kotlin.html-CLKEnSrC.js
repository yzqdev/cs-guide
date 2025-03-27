import{_ as a,c as s,a as t,o as p}from"./app-C8DxhDIZ.js";const e={};function o(c,n){return p(),s("div",null,n[0]||(n[0]=[t(`<h1 id="java到kotlin的用法" tabindex="-1"><a class="header-anchor" href="#java到kotlin的用法"><span>java到kotlin的用法</span></a></h1><h2 id="接口使用" tabindex="-1"><a class="header-anchor" href="#接口使用"><span>接口使用</span></a></h2><p>java</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">button<span class="token punctuation">.</span><span class="token function">setOnClickListener</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">View<span class="token punctuation">.</span>OnClickListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token annotation punctuation">@Override</span></span>
<span class="line">            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onClick</span><span class="token punctuation">(</span><span class="token class-name">View</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        button<span class="token punctuation">.</span><span class="token function">setOnClickListener</span><span class="token punctuation">(</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">            </span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><p>kotlin</p><div class="language-kotlin" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"></span>
<span class="line"> </span>
<span class="line"></span>
<span class="line">button<span class="token punctuation">.</span><span class="token function">setOnClickListener</span><span class="token punctuation">(</span><span class="token keyword">object</span> <span class="token operator">:</span> View<span class="token punctuation">.</span><span class="token function">OnClickListener</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onClick</span><span class="token punctuation">(</span>v<span class="token operator">:</span> View<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">     button<span class="token punctuation">.</span><span class="token function">setOnClickListener</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">     <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="array" tabindex="-1"><a class="header-anchor" href="#array"><span>array</span></a></h2><div class="language-kotlin" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">val</span> list <span class="token operator">=</span> ArrayList<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 非空（构造函数结果）</span></span>
<span class="line">list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Item&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">val</span> size <span class="token operator">=</span> list<span class="token punctuation">.</span>size <span class="token comment">// 非空（原生 int）</span></span>
<span class="line"><span class="token keyword">val</span> item <span class="token operator">=</span> list<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment">// 推断为平台类型（普通 Java 对象）</span></span>
<span class="line"></span></code></pre></div>`,8)]))}const i=a(e,[["render",o]]),r=JSON.parse('{"path":"/java-tutor/kt-tips/java-to-kotlin.html","title":"java到kotlin的用法","lang":"zh-CN","frontmatter":{"description":"java到kotlin的用法 接口使用 java kotlin array","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/kt-tips/java-to-kotlin.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"java到kotlin的用法"}],["meta",{"property":"og:description","content":"java到kotlin的用法 接口使用 java kotlin array"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-14T11:30:49.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-14T11:30:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java到kotlin的用法\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-14T11:30:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"接口使用","slug":"接口使用","link":"#接口使用","children":[]},{"level":2,"title":"array","slug":"array","link":"#array","children":[]}],"git":{"createdTime":1683806306000,"updatedTime":1684063849000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.26,"words":77},"filePathRelative":"java-tutor/kt-tips/java-to-kotlin.md","localizedDate":"2023年5月11日","autoDesc":true}');export{i as comp,r as data};
