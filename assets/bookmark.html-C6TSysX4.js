import{_ as s,c as a,a as t,o as p}from"./app-C8DxhDIZ.js";const o={};function c(e,n){return p(),a("div",null,n[0]||(n[0]=[t(`<h1 id="书签转json" tabindex="-1"><a class="header-anchor" href="#书签转json"><span>书签转json</span></a></h1><p>把书签保存为html格式,然后加入</p><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://libs.baidu.com/jquery/2.0.0/jquery.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line">    <span class="token function">$</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ready</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">var</span> rootTag <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;DL&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token function">getAll</span><span class="token punctuation">(</span>rootTag<span class="token punctuation">,</span> json<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"> </span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">var</span> json <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"> </span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">getAll</span><span class="token punctuation">(</span><span class="token parameter">tag<span class="token punctuation">,</span> datas</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        $<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span><span class="token function">$</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">children</span><span class="token punctuation">(</span><span class="token string">&quot;dt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">index<span class="token punctuation">,</span> item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">$</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">children</span><span class="token punctuation">(</span><span class="token string">&quot;:has(a)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                datas<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">                    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token function">$</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">children</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token function">$</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">children</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">&quot;href&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">var</span> ssd <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token function">$</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">children</span><span class="token punctuation">(</span><span class="token string">&quot;h3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">                <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">                datas<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>ssd<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                $<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span><span class="token function">$</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">children</span><span class="token punctuation">(</span><span class="token string">&quot;dl&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">index<span class="token punctuation">,</span> item2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token function">getAll</span><span class="token punctuation">(</span>item2<span class="token punctuation">,</span> ssd<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)]))}const i=s(o,[["render",c]]),u=JSON.parse('{"path":"/frontend/chrome-plugins/bookmark.html","title":"书签转json","lang":"zh-CN","frontmatter":{"description":"书签转json 把书签保存为html格式,然后加入","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/chrome-plugins/bookmark.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"书签转json"}],["meta",{"property":"og:description","content":"书签转json 把书签保存为html格式,然后加入"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-12-27T15:13:04.000Z"}],["meta",{"property":"article:modified_time","content":"2022-12-27T15:13:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"书签转json\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-12-27T15:13:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1656587275000,"updatedTime":1672153984000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":5,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.31,"words":94},"filePathRelative":"frontend/chrome-plugins/bookmark.md","localizedDate":"2022年6月30日","autoDesc":true}');export{i as comp,u as data};
