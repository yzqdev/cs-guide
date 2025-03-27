import{_ as n,c as a,a as t,o as e}from"./app-C8DxhDIZ.js";const p={};function o(c,s){return e(),a("div",null,s[0]||(s[0]=[t(`<h1 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串"><span>字符串</span></a></h1><h2 id="逐字字符串" tabindex="-1"><a class="header-anchor" href="#逐字字符串"><span>逐字字符串</span></a></h2><div class="language-csharp" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token class-name"><span class="token keyword">string</span></span> filePath <span class="token operator">=</span> <span class="token string">@&quot;C:\\Users\\scoleridge\\Documents\\&quot;;</span>
<span class="line"></span>
<span class="line">string quote = @&quot;</span>Her name was <span class="token string">&quot;&quot;</span>Sara<span class="token punctuation">.</span><span class="token string">&quot;&quot;</span>&quot;<span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">//Output: Her name was &quot;Sara.&quot;</span></span>
<span class="line"></span></code></pre></div><h2 id="原始字符串文本" tabindex="-1"><a class="header-anchor" href="#原始字符串文本"><span>原始字符串文本</span></a></h2><div class="language-csharp" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token class-name"><span class="token keyword">string</span></span> singleLine <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>&quot;Friends say <span class="token string">&quot;hello&quot;</span> <span class="token keyword">as</span> <span class="token class-name">they</span> pass <span class="token keyword">by</span><span class="token punctuation">.</span><span class="token string">&quot;&quot;</span>&quot;<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h2 id="字符串内插" tabindex="-1"><a class="header-anchor" href="#字符串内插"><span>字符串内插</span></a></h2><div class="language-csharp" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token class-name"><span class="token keyword">string</span></span> name <span class="token operator">=</span> <span class="token string">&quot;Mark&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token class-name"><span class="token keyword">var</span></span> date <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Composite formatting:</span></span>
<span class="line">Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, {0}! Today is {1}, it&#39;s {2:HH:mm} now.&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> date<span class="token punctuation">.</span>DayOfWeek<span class="token punctuation">,</span> date<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// String interpolation:</span></span>
<span class="line">Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$&quot;Hello, </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">name</span><span class="token punctuation">}</span></span><span class="token string">! Today is </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">date<span class="token punctuation">.</span>DayOfWeek</span><span class="token punctuation">}</span></span><span class="token string">, it&#39;s </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">date</span><span class="token format-string"><span class="token punctuation">:</span>HH:mm</span><span class="token punctuation">}</span></span><span class="token string"> now.&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// Both calls produce the same output that is similar to:</span></span>
<span class="line"><span class="token comment">// Hello, Mark! Today is Wednesday, it&#39;s 19:40 now.</span></span>
<span class="line"></span></code></pre></div>`,7)]))}const i=n(p,[["render",o]]),r=JSON.parse('{"path":"/cs-tips/csharp-tip/string.html","title":"字符串","lang":"zh-CN","frontmatter":{"description":"字符串 逐字字符串 原始字符串文本 字符串内插","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/csharp-tip/string.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"字符串"}],["meta",{"property":"og:description","content":"字符串 逐字字符串 原始字符串文本 字符串内插"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"字符串\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"逐字字符串","slug":"逐字字符串","link":"#逐字字符串","children":[]},{"level":2,"title":"原始字符串文本","slug":"原始字符串文本","link":"#原始字符串文本","children":[]},{"level":2,"title":"字符串内插","slug":"字符串内插","link":"#字符串内插","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.37,"words":112},"filePathRelative":"cs-tips/csharp-tip/string.md","localizedDate":"2023年5月25日","autoDesc":true}');export{i as comp,r as data};
