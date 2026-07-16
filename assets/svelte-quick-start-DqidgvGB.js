import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/frontend/framework/svelte/svelte-quick-start.html","title":"Svelte 快速开始","lang":"zh-CN","frontmatter":{"description":"Svelte 快速开始 创建项目 使用 SvelteKit（推荐） 使用 Vite 项目结构（SvelteKit） 组件基础 响应式声明 Props 事件处理 双向绑定 生命周期 调试技巧 参考 Svelte 官方文档 Svelte 教程","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Svelte 快速开始\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/svelte/svelte-quick-start.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Svelte 快速开始"}],["meta",{"property":"og:description","content":"Svelte 快速开始 创建项目 使用 SvelteKit（推荐） 使用 Vite 项目结构（SvelteKit） 组件基础 响应式声明 Props 事件处理 双向绑定 生命周期 调试技巧 参考 Svelte 官方文档 Svelte 教程"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1784119030000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.41,"words":422},"filePathRelative":"frontend/framework/svelte/svelte-quick-start.md","autoDesc":true}`),a={name:`svelte-quick-start.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="svelte-快速开始" tabindex="-1"><a class="header-anchor" href="#svelte-快速开始"><span>Svelte 快速开始</span></a></h1><h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目"><span>创建项目</span></a></h2><h3 id="使用-sveltekit-推荐" tabindex="-1"><a class="header-anchor" href="#使用-sveltekit-推荐"><span>使用 SvelteKit（推荐）</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">npm</span> create svelte@latest my-app</span>
<span class="line"><span class="token builtin class-name">cd</span> my-app</span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="line"><span class="token function">npm</span> run dev</span>
<span class="line"></span></code></pre></div><h3 id="使用-vite" tabindex="-1"><a class="header-anchor" href="#使用-vite"><span>使用 Vite</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">npm</span> create vite@latest my-app -- <span class="token parameter variable">--template</span> svelte-ts</span>
<span class="line"><span class="token builtin class-name">cd</span> my-app</span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="line"><span class="token function">npm</span> run dev</span>
<span class="line"></span></code></pre></div><h2 id="项目结构-sveltekit" tabindex="-1"><a class="header-anchor" href="#项目结构-sveltekit"><span>项目结构（SvelteKit）</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">my-app/</span>
<span class="line">├── src/</span>
<span class="line">│   ├── routes/          # 页面路由</span>
<span class="line">│   │   ├── +page.svelte</span>
<span class="line">│   │   ├── +layout.svelte</span>
<span class="line">│   │   └── blog/</span>
<span class="line">│   │       └── [slug]/</span>
<span class="line">│   │           └── +page.svelte</span>
<span class="line">│   ├── lib/             # 共享组件</span>
<span class="line">│   │   ├── components/</span>
<span class="line">│   │   └── stores.js</span>
<span class="line">│   └── app.html</span>
<span class="line">├── static/              # 静态资源</span>
<span class="line">├── svelte.config.js</span>
<span class="line">└── package.json</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="组件基础" tabindex="-1"><a class="header-anchor" href="#组件基础"><span>组件基础</span></a></h2><div class="language-svelte line-numbers-mode" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;!-- src/lib/Counter.svelte --&gt;</span>
<span class="line">&lt;script&gt;</span>
<span class="line">  let count = 0;</span>
<span class="line"></span>
<span class="line">  function increment() {</span>
<span class="line">    count += 1;  // 直接赋值就会触发更新</span>
<span class="line">  }</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;button on:click={increment}&gt;</span>
<span class="line">  Clicked {count} times</span>
<span class="line">&lt;/button&gt;</span>
<span class="line"></span>
<span class="line">&lt;style&gt;</span>
<span class="line">  button {</span>
<span class="line">    background: #ff3e00;</span>
<span class="line">    color: white;</span>
<span class="line">    border: none;</span>
<span class="line">    padding: 8px 16px;</span>
<span class="line">    border-radius: 4px;</span>
<span class="line">    cursor: pointer;</span>
<span class="line">  }</span>
<span class="line">&lt;/style&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="响应式声明" tabindex="-1"><a class="header-anchor" href="#响应式声明"><span>响应式声明</span></a></h2><div class="language-svelte line-numbers-mode" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;script&gt;</span>
<span class="line">  let count = 0;</span>
<span class="line"></span>
<span class="line">  // 使用 $: 声明响应式语句（自动追踪依赖）</span>
<span class="line">  $: doubled = count * 2;</span>
<span class="line">  $: console.log(\`count is \${count}\`);</span>
<span class="line"></span>
<span class="line">  // 响应式语句块</span>
<span class="line">  $: {</span>
<span class="line">    console.log(\`count changed to \${count}\`);</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  // 响应式条件</span>
<span class="line">  $: if (count &gt;= 10) {</span>
<span class="line">    console.log(&#39;count is at least 10!&#39;);</span>
<span class="line">  }</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;button on:click={() =&gt; count++}&gt;</span>
<span class="line">  Count: {count}, Doubled: {doubled}</span>
<span class="line">&lt;/button&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="props" tabindex="-1"><a class="header-anchor" href="#props"><span>Props</span></a></h2><div class="language-svelte" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;!-- src/lib/Greeting.svelte --&gt;</span>
<span class="line">&lt;script&gt;</span>
<span class="line">  let { name = &#39;World&#39;, greeting = &#39;Hello&#39; } = $props();</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;h1&gt;{greeting}, {name}!&lt;/h1&gt;</span>
<span class="line"></span></code></pre></div><div class="language-svelte" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;!-- 使用 --&gt;</span>
<span class="line">&lt;script&gt;</span>
<span class="line">  import Greeting from &#39;$lib/Greeting.svelte&#39;;</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;Greeting name=&quot;Svelte&quot; greeting=&quot;Hi&quot; /&gt;</span>
<span class="line">&lt;Greeting name=&quot;World&quot; /&gt;</span>
<span class="line"></span></code></pre></div><h2 id="事件处理" tabindex="-1"><a class="header-anchor" href="#事件处理"><span>事件处理</span></a></h2><div class="language-svelte" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;script&gt;</span>
<span class="line">  let count = 0;</span>
<span class="line">  let name = &#39;&#39;;</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 标准事件 --&gt;</span>
<span class="line">&lt;button on:click={() =&gt; count++}&gt;Count: {count}&lt;/button&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 事件修饰符 --&gt;</span>
<span class="line">&lt;button on:click|preventDefault={handle}&gt;Submit&lt;/button&gt;</span>
<span class="line">&lt;form on:submit|preventDefault={handleSubmit}&gt;</span>
<span class="line">  &lt;input type=&quot;text&quot; bind:value={name} /&gt;</span>
<span class="line">  &lt;button type=&quot;submit&quot;&gt;Submit&lt;/button&gt;</span>
<span class="line">&lt;/form&gt;</span>
<span class="line"></span></code></pre></div><h2 id="双向绑定" tabindex="-1"><a class="header-anchor" href="#双向绑定"><span>双向绑定</span></a></h2><div class="language-svelte" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;script&gt;</span>
<span class="line">  let name = &#39;World&#39;;</span>
<span class="line">  let checked = true;</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;input bind:value={name} /&gt;</span>
<span class="line">&lt;p&gt;Hello {name}!&lt;/p&gt;</span>
<span class="line"></span>
<span class="line">&lt;input type=&quot;checkbox&quot; bind:checked={checked} /&gt;</span>
<span class="line"></span></code></pre></div><h2 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期"><span>生命周期</span></a></h2><div class="language-svelte line-numbers-mode" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;script&gt;</span>
<span class="line">  import { onMount, onDestroy, beforeUpdate, afterUpdate } from &#39;svelte&#39;;</span>
<span class="line"></span>
<span class="line">  let canvas: HTMLCanvasElement;</span>
<span class="line"></span>
<span class="line">  onMount(() =&gt; {</span>
<span class="line">    console.log(&#39;Mounted&#39;);</span>
<span class="line">    const ctx = canvas.getContext(&#39;2d&#39;);</span>
<span class="line">    // 返回清理函数</span>
<span class="line">    return () =&gt; { console.log(&#39;Cleanup on destroy&#39;); };</span>
<span class="line">  });</span>
<span class="line"></span>
<span class="line">  beforeUpdate(() =&gt; console.log(&#39;Before DOM update&#39;));</span>
<span class="line">  afterUpdate(() =&gt; console.log(&#39;After DOM update&#39;));</span>
<span class="line">  onDestroy(() =&gt; console.log(&#39;Component destroyed&#39;));</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;canvas bind:this={canvas} /&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="调试技巧" tabindex="-1"><a class="header-anchor" href="#调试技巧"><span>调试技巧</span></a></h2><div class="language-svelte" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;script&gt;</span>
<span class="line">  let count = 0;</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 使用 @debug 标签，在开发者工具中自动暂停 --&gt;</span>
<span class="line">{@debug count}</span>
<span class="line"></span>
<span class="line">&lt;button on:click={() =&gt; count++}&gt;{count}&lt;/button&gt;</span>
<span class="line"></span></code></pre></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><ul><li><a href="https://svelte.dev/docs" target="_blank" rel="noopener noreferrer">Svelte 官方文档</a></li><li><a href="https://svelte.dev/tutorial" target="_blank" rel="noopener noreferrer">Svelte 教程</a></li></ul>`,25)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};