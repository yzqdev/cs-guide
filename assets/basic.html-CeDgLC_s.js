import{_ as n,c as a,a as t,o as e}from"./app-C8DxhDIZ.js";const o={};function p(l,s){return e(),a("div",null,s[0]||(s[0]=[t(`<h1 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作"><span>基本操作</span></a></h1><p><a href="https://www.mongodb.com/docs/manual/tutorial/insert-documents/" target="_blank" rel="noopener noreferrer">https://www.mongodb.com/docs/manual/tutorial/insert-documents/</a></p><h2 id="添加数据库" tabindex="-1"><a class="header-anchor" href="#添加数据库"><span>添加数据库</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">use myblog</span>
<span class="line"></span></code></pre></div><h2 id="添加数据" tabindex="-1"><a class="header-anchor" href="#添加数据"><span>添加数据</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">db.postCollection.insertOne<span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;mongodb tutor&quot;</span>,</span>
<span class="line">  <span class="token string">&quot;author&quot;</span>:<span class="token punctuation">{</span></span>
<span class="line">    <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;yzq&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;avatar&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;http://www.baidu.com&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span>,<span class="token string">&quot;createdAt&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;2022-01-01&quot;</span>,</span>
<span class="line">  <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;mongo 教程&quot;</span>,</span>
<span class="line">  <span class="token string">&quot;comments&quot;</span>:<span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string">&quot;user&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;dog&quot;</span>,</span>
<span class="line">      <span class="token string">&quot;comment&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;good&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span>,</span>
<span class="line">     <span class="token punctuation">{</span></span>
<span class="line">       <span class="token string">&quot;user&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;cat&quot;</span>,</span>
<span class="line">       <span class="token string">&quot;comment&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;bad&quot;</span></span>
<span class="line">     <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查询数据" tabindex="-1"><a class="header-anchor" href="#查询数据"><span>查询数据</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查询所有的</span></span>
<span class="line">db.postCollection.find<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment"># 查询author.name=yzq的</span></span>
<span class="line">db.postCollection.find<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;author.name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;yzq&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><h2 id="更新" tabindex="-1"><a class="header-anchor" href="#更新"><span>更新</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">db.postCollection.updateOne<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;author.name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;yzq&quot;</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token variable">$set</span>:<span class="token punctuation">{</span><span class="token string">&quot;author.name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;qqman&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><h2 id="删除" tabindex="-1"><a class="header-anchor" href="#删除"><span>删除</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">db.postCollection.deleteOne<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;author.name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;qqman&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><h2 id="导出数据" tabindex="-1"><a class="header-anchor" href="#导出数据"><span>导出数据</span></a></h2><p>下载mongodb database tools <a href="https://www.mongodb.com/try/download/database-tools" target="_blank" rel="noopener noreferrer">地址</a></p>`,14)]))}const c=n(o,[["render",p]]),u=JSON.parse('{"path":"/java-tutor/orm-tutor/mongodb/basic.html","title":"基本操作","lang":"zh-CN","frontmatter":{"description":"基本操作 https://www.mongodb.com/docs/manual/tutorial/insert-documents/ 添加数据库 添加数据 查询数据 更新 删除 导出数据 下载mongodb database tools 地址","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/mongodb/basic.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"基本操作"}],["meta",{"property":"og:description","content":"基本操作 https://www.mongodb.com/docs/manual/tutorial/insert-documents/ 添加数据库 添加数据 查询数据 更新 删除 导出数据 下载mongodb database tools 地址"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-29T06:47:23.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-29T06:47:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"基本操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-29T06:47:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"添加数据库","slug":"添加数据库","link":"#添加数据库","children":[]},{"level":2,"title":"添加数据","slug":"添加数据","link":"#添加数据","children":[]},{"level":2,"title":"查询数据","slug":"查询数据","link":"#查询数据","children":[]},{"level":2,"title":"更新","slug":"更新","link":"#更新","children":[]},{"level":2,"title":"删除","slug":"删除","link":"#删除","children":[]},{"level":2,"title":"导出数据","slug":"导出数据","link":"#导出数据","children":[]}],"git":{"createdTime":1672632765000,"updatedTime":1711694843000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.32,"words":95},"filePathRelative":"java-tutor/orm-tutor/mongodb/basic.md","localizedDate":"2023年1月2日","autoDesc":true}');export{c as comp,u as data};
