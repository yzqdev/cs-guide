import{_ as s,c as a,a as e,o as t}from"./app-C8DxhDIZ.js";const p={};function l(i,n){return t(),a("div",null,n[0]||(n[0]=[e(`<h1 id="vue3使用jsx" tabindex="-1"><a class="header-anchor" href="#vue3使用jsx"><span>vue3使用jsx</span></a></h1><h2 id="写法" tabindex="-1"><a class="header-anchor" href="#写法"><span>写法</span></a></h2><p>有两种写法 第一种写法</p><div class="language-tsx line-numbers-mode" data-highlighter="prismjs" data-ext="tsx" data-title="tsx"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span>defineComponent<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span></span>
<span class="line"> </span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line"> </span>
<span class="line">    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line"> </span>
<span class="line">        <span class="token comment">// 这里使用（）不用写return  如果是{}则需要写</span></span>
<span class="line">        <span class="token comment">// 内部只能有一个跟标签，你可以使用&lt;&gt;&lt;/&gt;</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">(</span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">hello tsx</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"> </span>
<span class="line"> </span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种使用render(options语法)</p><div class="language-tsx line-numbers-mode" data-highlighter="prismjs" data-ext="tsx" data-title="tsx"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span>defineComponent<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">   <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">       </span>
<span class="line">       <span class="token comment">// 这里主要书写你的js代码，生命周期，状态等</span></span>
<span class="line">       <span class="token comment">// 但是需要将状态方法暴露出去</span></span>
<span class="line"></span>
<span class="line">       <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token generic-function"><span class="token function">ref</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&#39;12&#39;</span><span class="token punctuation">)</span></span>
<span class="line">   </span>
<span class="line">       <span class="token keyword">return</span> <span class="token punctuation">{</span>a<span class="token punctuation">}</span>    </span>
<span class="line">   <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">   <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">       <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text"></span>
<span class="line">       )</span>
<span class="line">   }</span>
<span class="line"></span>
<span class="line">})</span>
<span class="line"></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)]))}const o=s(p,[["render",l]]),u=JSON.parse('{"path":"/frontend/framework/vue/vue3-jsx.html","title":"vue3使用jsx","lang":"zh-CN","frontmatter":{"description":"vue3使用jsx 写法 有两种写法 第一种写法 第二种使用render(options语法)","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/vue/vue3-jsx.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"vue3使用jsx"}],["meta",{"property":"og:description","content":"vue3使用jsx 写法 有两种写法 第一种写法 第二种使用render(options语法)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-19T03:14:18.000Z"}],["meta",{"property":"article:modified_time","content":"2023-11-19T03:14:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vue3使用jsx\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-19T03:14:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"写法","slug":"写法","link":"#写法","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1700363658000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.42,"words":126},"filePathRelative":"frontend/framework/vue/vue3-jsx.md","localizedDate":"2023年6月25日","autoDesc":true}');export{o as comp,u as data};
