import{_ as n,c as a,a as e,o as t}from"./app-B6vXTniy.js";const o={};function p(c,s){return t(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="go-workspace" tabindex="-1"><a class="header-anchor" href="#go-workspace"><span>go workspace</span></a></h1><h2 id="基础命令" tabindex="-1"><a class="header-anchor" href="#基础命令"><span>基础命令</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#创建 workspace 工作区</span></span>
<span class="line"><span class="token function">mkdir</span> workspace</span>
<span class="line"><span class="token builtin class-name">cd</span> workspace</span>
<span class="line">go work init</span>
<span class="line"><span class="token comment">#创建一个基础项目 demo</span></span>
<span class="line"><span class="token builtin class-name">cd</span> workspace</span>
<span class="line"><span class="token function">mkdir</span> demo</span>
<span class="line">go mod init demo</span>
<span class="line"><span class="token comment">#添加demo项目到workspace</span></span>
<span class="line">go work use ./demo</span>
<span class="line"><span class="token comment">#重新运行项目</span></span>
<span class="line"><span class="token builtin class-name">cd</span> workspace</span>
<span class="line">go run demo/main.go</span>
<span class="line"></span></code></pre></div><h2 id="好处" tabindex="-1"><a class="header-anchor" href="#好处"><span>好处</span></a></h2><p>这里我们在demo项目就可以直接用libs里面的方法了 见demo的main.go</p><div class="language-go" data-highlighter="prismjs" data-ext="go"><pre><code class="language-go"><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line"> <span class="token string">&quot;fmt&quot;</span></span>
<span class="line"> <span class="token string">&quot;libs/string_lib&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;hello, go workspace&quot;</span><span class="token punctuation">)</span></span>
<span class="line"> string_lib<span class="token punctuation">.</span><span class="token function">Greet</span><span class="token punctuation">(</span><span class="token string">&quot;heloo&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div>`,6)])])}const i=n(o,[["render",p]]),r=JSON.parse('{"path":"/go-tutor/basics/go-work.html","title":"go workspace","lang":"zh-CN","frontmatter":{"description":"go workspace 基础命令 好处 这里我们在demo项目就可以直接用libs里面的方法了 见demo的main.go","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"go workspace\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-12-31T14:11:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/basics/go-work.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"go workspace"}],["meta",{"property":"og:description","content":"go workspace 基础命令 好处 这里我们在demo项目就可以直接用libs里面的方法了 见demo的main.go"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-12-31T14:11:04.000Z"}],["meta",{"property":"article:modified_time","content":"2022-12-31T14:11:04.000Z"}]]},"git":{"createdTime":1672495864000,"updatedTime":1672495864000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.33,"words":100},"filePathRelative":"go-tutor/basics/go-work.md","autoDesc":true}');export{i as comp,r as data};
