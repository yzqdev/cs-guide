import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/frontend/framework/svelte/svelte-advanced.html","title":"Svelte 控制流与高级特性","lang":"zh-CN","frontmatter":{"description":"Svelte 控制流与高级特性 条件渲染 列表渲染 异步数据 插槽 (Slot) 组件事件 Store（状态管理） 过渡动画 动态 class/style SvelteKit 路由 常见问题 响应式赋值 $: 声明不能用于 let 推荐 UI 库 Skeleton - 基于 Tailwind 的 UI 组件库 Smelte - Material Des...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Svelte 控制流与高级特性\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/svelte/svelte-advanced.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Svelte 控制流与高级特性"}],["meta",{"property":"og:description","content":"Svelte 控制流与高级特性 条件渲染 列表渲染 异步数据 插槽 (Slot) 组件事件 Store（状态管理） 过渡动画 动态 class/style SvelteKit 路由 常见问题 响应式赋值 $: 声明不能用于 let 推荐 UI 库 Skeleton - 基于 Tailwind 的 UI 组件库 Smelte - Material Des..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1784119030000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.34,"words":702},"filePathRelative":"frontend/framework/svelte/svelte-advanced.md","autoDesc":true}`),a={name:`svelte-advanced.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="svelte-控制流与高级特性" tabindex="-1"><a class="header-anchor" href="#svelte-控制流与高级特性"><span>Svelte 控制流与高级特性</span></a></h1><h2 id="条件渲染" tabindex="-1"><a class="header-anchor" href="#条件渲染"><span>条件渲染</span></a></h2><div class="language-svelte" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;script&gt;</span>
<span class="line">  let user = { loggedIn: true, name: &#39;Alice&#39; };</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">{#if user.loggedIn}</span>
<span class="line">  &lt;p&gt;Welcome back, {user.name}!&lt;/p&gt;</span>
<span class="line">{:else}</span>
<span class="line">  &lt;button&gt;Login&lt;/button&gt;</span>
<span class="line">{/if}</span>
<span class="line"></span></code></pre></div><h2 id="列表渲染" tabindex="-1"><a class="header-anchor" href="#列表渲染"><span>列表渲染</span></a></h2><div class="language-svelte line-numbers-mode" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;script&gt;</span>
<span class="line">  let items = [&#39;Apple&#39;, &#39;Banana&#39;, &#39;Cherry&#39;];</span>
<span class="line">  let todoItems = [</span>
<span class="line">    { id: 1, text: &#39;Learn Svelte&#39;, done: false },</span>
<span class="line">    { id: 2, text: &#39;Build something&#39;, done: true },</span>
<span class="line">  ];</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 基本列表 --&gt;</span>
<span class="line">&lt;ul&gt;</span>
<span class="line">  {#each items as item, index}</span>
<span class="line">    &lt;li&gt;{index + 1}. {item}&lt;/li&gt;</span>
<span class="line">  {/each}</span>
<span class="line">&lt;/ul&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 带 key 的列表 --&gt;</span>
<span class="line">{#each todoItems as todo (todo.id)}</span>
<span class="line">  &lt;div&gt;</span>
<span class="line">    &lt;input type=&quot;checkbox&quot; bind:checked={todo.done} /&gt;</span>
<span class="line">    &lt;span class:done={todo.done}&gt;{todo.text}&lt;/span&gt;</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">{/each}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="异步数据" tabindex="-1"><a class="header-anchor" href="#异步数据"><span>异步数据</span></a></h2><div class="language-svelte line-numbers-mode" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;script&gt;</span>
<span class="line">  async function fetchData() {</span>
<span class="line">    const res = await fetch(&#39;https://api.example.com/data&#39;);</span>
<span class="line">    return res.json();</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  let promise = fetchData();</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">{#await promise}</span>
<span class="line">  &lt;p&gt;Loading...&lt;/p&gt;</span>
<span class="line">{:then value}</span>
<span class="line">  &lt;p&gt;Data: {JSON.stringify(value)}&lt;/p&gt;</span>
<span class="line">{:catch error}</span>
<span class="line">  &lt;p&gt;Error: {error.message}&lt;/p&gt;</span>
<span class="line">{/await}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="插槽-slot" tabindex="-1"><a class="header-anchor" href="#插槽-slot"><span>插槽 (Slot)</span></a></h2><div class="language-svelte line-numbers-mode" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;!-- src/lib/Card.svelte --&gt;</span>
<span class="line">&lt;script&gt;</span>
<span class="line">  let { title } = $props();</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;div class=&quot;card&quot;&gt;</span>
<span class="line">  &lt;h2&gt;{title}&lt;/h2&gt;</span>
<span class="line">  &lt;div class=&quot;content&quot;&gt;</span>
<span class="line">    &lt;slot /&gt;</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">  &lt;div class=&quot;footer&quot;&gt;</span>
<span class="line">    &lt;slot name=&quot;footer&quot;&gt;</span>
<span class="line">      &lt;p&gt;Default footer&lt;/p&gt;</span>
<span class="line">    &lt;/slot&gt;</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-svelte" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;Card title=&quot;My Card&quot;&gt;</span>
<span class="line">  &lt;p&gt;This is the main content&lt;/p&gt;</span>
<span class="line">  &lt;p slot=&quot;footer&quot;&gt;&lt;button&gt;Read More&lt;/button&gt;&lt;/p&gt;</span>
<span class="line">&lt;/Card&gt;</span>
<span class="line"></span></code></pre></div><h2 id="组件事件" tabindex="-1"><a class="header-anchor" href="#组件事件"><span>组件事件</span></a></h2><div class="language-svelte" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;!-- src/lib/Button.svelte --&gt;</span>
<span class="line">&lt;script&gt;</span>
<span class="line">  import { createEventDispatcher } from &#39;svelte&#39;;</span>
<span class="line"></span>
<span class="line">  const dispatch = createEventDispatcher();</span>
<span class="line"></span>
<span class="line">  function handleClick() {</span>
<span class="line">    dispatch(&#39;customEvent&#39;, { message: &#39;Button clicked&#39; });</span>
<span class="line">  }</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;button on:click={handleClick}&gt;</span>
<span class="line">  &lt;slot /&gt;</span>
<span class="line">&lt;/button&gt;</span>
<span class="line"></span></code></pre></div><div class="language-svelte" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;!-- 父组件 --&gt;</span>
<span class="line">&lt;script&gt;</span>
<span class="line">  import Button from &#39;$lib/Button.svelte&#39;;</span>
<span class="line"></span>
<span class="line">  function handleCustomEvent(event) {</span>
<span class="line">    console.log(event.detail.message);</span>
<span class="line">  }</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;Button on:customEvent={handleCustomEvent}&gt;Click me&lt;/Button&gt;</span>
<span class="line"></span></code></pre></div><h2 id="store-状态管理" tabindex="-1"><a class="header-anchor" href="#store-状态管理"><span>Store（状态管理）</span></a></h2><div class="language-svelte" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;!-- src/lib/stores.js --&gt;</span>
<span class="line">import { writable, derived, readable } from &#39;svelte/store&#39;;</span>
<span class="line"></span>
<span class="line">// 可写 store</span>
<span class="line">export const count = writable(0);</span>
<span class="line"></span>
<span class="line">// 派生 store</span>
<span class="line">export const doubled = derived(count, $count =&gt; $count * 2);</span>
<span class="line"></span>
<span class="line">// 只读 store</span>
<span class="line">export const time = readable(new Date(), set =&gt; {</span>
<span class="line">  const interval = setInterval(() =&gt; set(new Date()), 1000);</span>
<span class="line">  return () =&gt; clearInterval(interval);</span>
<span class="line">});</span>
<span class="line"></span></code></pre></div><div class="language-svelte" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;!-- 在组件中使用 --&gt;</span>
<span class="line">&lt;script&gt;</span>
<span class="line">  import { count, doubled } from &#39;$lib/stores.js&#39;;</span>
<span class="line"></span>
<span class="line">  // $ 前缀自动订阅/取消订阅</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;p&gt;Count: {$count}&lt;/p&gt;</span>
<span class="line">&lt;p&gt;Doubled: {$doubled}&lt;/p&gt;</span>
<span class="line">&lt;button on:click={() =&gt; $count++}&gt;+1&lt;/button&gt;</span>
<span class="line">&lt;button on:click={() =&gt; count.update(n =&gt; n - 1)}&gt;-1&lt;/button&gt;</span>
<span class="line">&lt;button on:click={() =&gt; count.set(0)}&gt;Reset&lt;/button&gt;</span>
<span class="line"></span></code></pre></div><h2 id="过渡动画" tabindex="-1"><a class="header-anchor" href="#过渡动画"><span>过渡动画</span></a></h2><div class="language-svelte line-numbers-mode" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;script&gt;</span>
<span class="line">  import { fade, slide, scale, fly } from &#39;svelte/transition&#39;;</span>
<span class="line">  import { flip } from &#39;svelte/animate&#39;;</span>
<span class="line"></span>
<span class="line">  let visible = false;</span>
<span class="line">  let items = [1, 2, 3, 4];</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;button on:click={() =&gt; visible = !visible}&gt;Toggle&lt;/button&gt;</span>
<span class="line"></span>
<span class="line">{#if visible}</span>
<span class="line">  &lt;div transition:fade={{ duration: 300 }}&gt;Fade&lt;/div&gt;</span>
<span class="line">  &lt;div transition:slide&gt;Slide&lt;/div&gt;</span>
<span class="line">  &lt;div in:fly={{ y: 200, duration: 500 }} out:scale&gt;Fly in, scale out&lt;/div&gt;</span>
<span class="line">{/if}</span>
<span class="line"></span>
<span class="line">&lt;!-- 列表动画 --&gt;</span>
<span class="line">{#each items as item (item)}</span>
<span class="line">  &lt;div animate:flip&gt;{item}&lt;/div&gt;</span>
<span class="line">{/each}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动态-class-style" tabindex="-1"><a class="header-anchor" href="#动态-class-style"><span>动态 class/style</span></a></h2><div class="language-svelte" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;script&gt;</span>
<span class="line">  let active = true;</span>
<span class="line">  let isActive = true;</span>
<span class="line">  let bgColor = &#39;red&#39;;</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 动态 class --&gt;</span>
<span class="line">&lt;div class:active&gt;Active style&lt;/div&gt;</span>
<span class="line">&lt;div class:active={isActive}&gt;Conditional class&lt;/div&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 动态 style --&gt;</span>
<span class="line">&lt;div style:color=&quot;red&quot;&gt;Red text&lt;/div&gt;</span>
<span class="line">&lt;div style:background-color={bgColor}&gt;Dynamic color&lt;/div&gt;</span>
<span class="line"></span></code></pre></div><h2 id="sveltekit-路由" tabindex="-1"><a class="header-anchor" href="#sveltekit-路由"><span>SvelteKit 路由</span></a></h2><div class="language-svelte line-numbers-mode" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;!-- src/routes/+page.svelte - 首页 --&gt;</span>
<span class="line">&lt;h1&gt;Home&lt;/h1&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- src/routes/about/+page.svelte - /about --&gt;</span>
<span class="line">&lt;h1&gt;About&lt;/h1&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- src/routes/blog/[slug]/+page.svelte - 动态路由 --&gt;</span>
<span class="line">&lt;script&gt;</span>
<span class="line">  import { page } from &#39;$app/stores&#39;;</span>
<span class="line">  let { slug } = $page.params;</span>
<span class="line">&lt;/script&gt;</span>
<span class="line">&lt;h1&gt;Blog: {slug}&lt;/h1&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- src/routes/+layout.svelte - 布局 --&gt;</span>
<span class="line">&lt;nav&gt;</span>
<span class="line">  &lt;a href=&quot;/&quot;&gt;Home&lt;/a&gt;</span>
<span class="line">  &lt;a href=&quot;/about&quot;&gt;About&lt;/a&gt;</span>
<span class="line">&lt;/nav&gt;</span>
<span class="line">&lt;slot /&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题"><span>常见问题</span></a></h2><h3 id="响应式赋值" tabindex="-1"><a class="header-anchor" href="#响应式赋值"><span>响应式赋值</span></a></h3><div class="language-svelte" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;script&gt;</span>
<span class="line">  let arr = [1, 2, 3];</span>
<span class="line"></span>
<span class="line">  // Svelte 通过赋值触发更新</span>
<span class="line">  arr.push(4);        // ❌ 不会触发更新</span>
<span class="line">  arr = [...arr, 4];  // ✅ 触发更新</span>
<span class="line"></span>
<span class="line">  let obj = { a: 1 };</span>
<span class="line">  obj.a = 2;          // ❌ 不会触发更新</span>
<span class="line">  obj = { ...obj, a: 2 }; // ✅ 触发更新</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span></code></pre></div><h3 id="声明不能用于-let" tabindex="-1"><a class="header-anchor" href="#声明不能用于-let"><span>$: 声明不能用于 let</span></a></h3><div class="language-svelte" data-highlighter="prismjs" data-ext="svelte"><pre><code class="language-svelte"><span class="line">&lt;script&gt;</span>
<span class="line">  // ❌ 错误</span>
<span class="line">  // $: let x = y + 1;</span>
<span class="line"></span>
<span class="line">  // ✅ 正确</span>
<span class="line">  let x;</span>
<span class="line">  $: x = y + 1;</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span></code></pre></div><h2 id="推荐-ui-库" tabindex="-1"><a class="header-anchor" href="#推荐-ui-库"><span>推荐 UI 库</span></a></h2><ul><li><a href="https://www.skeleton.dev/" target="_blank" rel="noopener noreferrer">Skeleton</a> - 基于 Tailwind 的 UI 组件库</li><li><a href="https://smelte.netlify.app/" target="_blank" rel="noopener noreferrer">Smelte</a> - Material Design 组件库</li><li><a href="https://melt-ui.com/" target="_blank" rel="noopener noreferrer">Melt UI</a> - 无样式组件库</li><li><a href="https://www.shadcn-svelte.com/" target="_blank" rel="noopener noreferrer">Shadcn Svelte</a> - shadcn 风格组件</li></ul><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><ul><li><a href="https://svelte.dev/docs" target="_blank" rel="noopener noreferrer">Svelte 官方文档</a></li><li><a href="https://kit.svelte.dev/docs" target="_blank" rel="noopener noreferrer">SvelteKit 文档</a></li><li><a href="https://svelte.dev/examples" target="_blank" rel="noopener noreferrer">Svelte 示例</a></li></ul>`,31)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};