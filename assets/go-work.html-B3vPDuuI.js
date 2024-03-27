import{_ as n,o as e,c as s,a}from"./app-BO2oONDQ.js";const t={},o=a(`<h1 id="go-workspace" tabindex="-1"><a class="header-anchor" href="#go-workspace"><span>go workspace</span></a></h1><h2 id="基础命令" tabindex="-1"><a class="header-anchor" href="#基础命令"><span>基础命令</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#创建 workspace 工作区</span>
<span class="token function">mkdir</span> workspace
<span class="token builtin class-name">cd</span> workspace
go work init
<span class="token comment">#创建一个基础项目 demo</span>
<span class="token builtin class-name">cd</span> workspace
<span class="token function">mkdir</span> demo
go mod init demo
<span class="token comment">#添加demo项目到workspace</span>
go work use ./demo
<span class="token comment">#重新运行项目</span>
<span class="token builtin class-name">cd</span> workspace
go run demo/main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="好处" tabindex="-1"><a class="header-anchor" href="#好处"><span>好处</span></a></h2><p>这里我们在demo项目就可以直接用libs里面的方法了 见demo的main.go</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
 <span class="token string">&quot;fmt&quot;</span>
 <span class="token string">&quot;libs/string_lib&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;hello, go workspace&quot;</span><span class="token punctuation">)</span>
 string_lib<span class="token punctuation">.</span><span class="token function">Greet</span><span class="token punctuation">(</span><span class="token string">&quot;heloo&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),i=[o];function c(l,p){return e(),s("div",null,i)}const d=n(t,[["render",c],["__file","go-work.html.vue"]]),m=JSON.parse('{"path":"/go-tutor/basics/go-work.html","title":"go workspace","lang":"zh-CN","frontmatter":{"description":"go workspace 基础命令 好处 这里我们在demo项目就可以直接用libs里面的方法了 见demo的main.go","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/basics/go-work.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"go workspace"}],["meta",{"property":"og:description","content":"go workspace 基础命令 好处 这里我们在demo项目就可以直接用libs里面的方法了 见demo的main.go"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-12-31T14:11:04.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-12-31T14:11:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"go workspace\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-12-31T14:11:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"基础命令","slug":"基础命令","link":"#基础命令","children":[]},{"level":2,"title":"好处","slug":"好处","link":"#好处","children":[]}],"git":{"createdTime":1672495864000,"updatedTime":1672495864000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.33,"words":100},"filePathRelative":"go-tutor/basics/go-work.md","localizedDate":"2022年12月31日","autoDesc":true}');export{d as comp,m as data};
