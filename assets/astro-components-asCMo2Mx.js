import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/frontend/framework/astro/astro-components.html","title":"Astro 组件与 Islands","lang":"zh-CN","frontmatter":{"description":"Astro 组件与 Islands .astro 组件 Islands 架构（交互式组件） 默认情况下，Astro 组件在构建时渲染为静态 HTML。要让组件具有交互性，需要使用客户端指令： 集成其他框架 布局组件 参考 Astro 组件文档 Astro Islands","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Astro 组件与 Islands\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/astro/astro-components.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Astro 组件与 Islands"}],["meta",{"property":"og:description","content":"Astro 组件与 Islands .astro 组件 Islands 架构（交互式组件） 默认情况下，Astro 组件在构建时渲染为静态 HTML。要让组件具有交互性，需要使用客户端指令： 集成其他框架 布局组件 参考 Astro 组件文档 Astro Islands"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1784119030000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.25,"words":375},"filePathRelative":"frontend/framework/astro/astro-components.md","autoDesc":true}`),a={name:`astro-components.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="astro-组件与-islands" tabindex="-1"><a class="header-anchor" href="#astro-组件与-islands"><span>Astro 组件与 Islands</span></a></h1><h2 id="astro-组件" tabindex="-1"><a class="header-anchor" href="#astro-组件"><span><code>.astro</code> 组件</span></a></h2><div class="language-astro line-numbers-mode" data-highlighter="prismjs" data-ext="astro"><pre><code class="language-astro"><span class="line">---</span>
<span class="line">// 组件脚本（在服务端执行）</span>
<span class="line">import Header from &#39;../components/Header.astro&#39;;</span>
<span class="line">const title = &#39;Hello Astro&#39;;</span>
<span class="line">const items = [1, 2, 3];</span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">&lt;!-- 组件模板 --&gt;</span>
<span class="line">&lt;html&gt;</span>
<span class="line">  &lt;head&gt;&lt;title&gt;{title}&lt;/title&gt;&lt;/head&gt;</span>
<span class="line">  &lt;body&gt;</span>
<span class="line">    &lt;Header /&gt;</span>
<span class="line">    &lt;h1&gt;{title}&lt;/h1&gt;</span>
<span class="line">    &lt;ul&gt;</span>
<span class="line">      {items.map(item =&gt; &lt;li&gt;{item}&lt;/li&gt;)}</span>
<span class="line">    &lt;/ul&gt;</span>
<span class="line">  &lt;/body&gt;</span>
<span class="line">&lt;/html&gt;</span>
<span class="line"></span>
<span class="line">&lt;style&gt;</span>
<span class="line">  /* 组件样式（默认 scoped） */</span>
<span class="line">  h1 { color: red; }</span>
<span class="line">&lt;/style&gt;</span>
<span class="line"></span>
<span class="line">&lt;script&gt;</span>
<span class="line">  // 客户端脚本（会被打包到浏览器）</span>
<span class="line">  document.querySelector(&#39;h1&#39;)?.addEventListener(&#39;click&#39;, () =&gt; {</span>
<span class="line">    alert(&#39;Hello!&#39;);</span>
<span class="line">  });</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="islands-架构-交互式组件" tabindex="-1"><a class="header-anchor" href="#islands-架构-交互式组件"><span>Islands 架构（交互式组件）</span></a></h2><p>默认情况下，Astro 组件在构建时渲染为静态 HTML。要让组件具有交互性，需要使用客户端指令：</p><div class="language-astro line-numbers-mode" data-highlighter="prismjs" data-ext="astro"><pre><code class="language-astro"><span class="line">---</span>
<span class="line">import ReactCounter from &#39;../components/ReactCounter.jsx&#39;;</span>
<span class="line">import VueCounter from &#39;../components/VueCounter.vue&#39;;</span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">&lt;!-- 只在页面可见时加载 --&gt;</span>
<span class="line">&lt;ReactCounter client:visible /&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 页面加载后立即加载 --&gt;</span>
<span class="line">&lt;VueCounter client:load /&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 空闲时加载 --&gt;</span>
<span class="line">&lt;ReactCounter client:idle /&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 悬停时才加载 --&gt;</span>
<span class="line">&lt;ReactCounter client:hover /&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 媒体查询满足时加载 --&gt;</span>
<span class="line">&lt;ReactCounter client:media=&quot;(max-width: 768px)&quot; /&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 只在客户端渲染（SSR 跳过） --&gt;</span>
<span class="line">&lt;ReactCounter client:only=&quot;react&quot; /&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="集成其他框架" tabindex="-1"><a class="header-anchor" href="#集成其他框架"><span>集成其他框架</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">npx astro <span class="token function">add</span> react</span>
<span class="line">npx astro <span class="token function">add</span> vue</span>
<span class="line">npx astro <span class="token function">add</span> svelte</span>
<span class="line">npx astro <span class="token function">add</span> solid</span>
<span class="line"></span></code></pre></div><div class="language-astro" data-highlighter="prismjs" data-ext="astro"><pre><code class="language-astro"><span class="line">---</span>
<span class="line">import ReactCounter from &#39;../components/ReactCounter.jsx&#39;;</span>
<span class="line">import VueCounter from &#39;../components/VueCounter.vue&#39;;</span>
<span class="line">import SvelteCounter from &#39;../components/SvelteCounter.svelte&#39;;</span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">&lt;ReactCounter client:load /&gt;</span>
<span class="line">&lt;VueCounter client:visible /&gt;</span>
<span class="line">&lt;SvelteCounter client:idle /&gt;</span>
<span class="line"></span></code></pre></div><h2 id="布局组件" tabindex="-1"><a class="header-anchor" href="#布局组件"><span>布局组件</span></a></h2><div class="language-astro line-numbers-mode" data-highlighter="prismjs" data-ext="astro"><pre><code class="language-astro"><span class="line">---</span>
<span class="line">// src/layouts/BaseLayout.astro</span>
<span class="line">export interface Props {</span>
<span class="line">  title: string;</span>
<span class="line">  description?: string;</span>
<span class="line">}</span>
<span class="line">const { title, description } = Astro.props;</span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">&lt;!DOCTYPE html&gt;</span>
<span class="line">&lt;html lang=&quot;zh-CN&quot;&gt;</span>
<span class="line">  &lt;head&gt;</span>
<span class="line">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span>
<span class="line">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span>
<span class="line">    &lt;title&gt;{title}&lt;/title&gt;</span>
<span class="line">    &lt;meta name=&quot;description&quot; content={description} /&gt;</span>
<span class="line">  &lt;/head&gt;</span>
<span class="line">  &lt;body&gt;</span>
<span class="line">    &lt;slot /&gt;  &lt;!-- 子内容会插入到这里 --&gt;</span>
<span class="line">  &lt;/body&gt;</span>
<span class="line">&lt;/html&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-astro" data-highlighter="prismjs" data-ext="astro"><pre><code class="language-astro"><span class="line">---</span>
<span class="line">// src/pages/index.astro</span>
<span class="line">import BaseLayout from &#39;../layouts/BaseLayout.astro&#39;;</span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">&lt;BaseLayout title=&quot;Home&quot; description=&quot;Welcome&quot;&gt;</span>
<span class="line">  &lt;h1&gt;Hello World&lt;/h1&gt;</span>
<span class="line">  &lt;p&gt;This is my Astro site!&lt;/p&gt;</span>
<span class="line">&lt;/BaseLayout&gt;</span>
<span class="line"></span></code></pre></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><ul><li><a href="https://docs.astro.build/en/core-concepts/astro-components/" target="_blank" rel="noopener noreferrer">Astro 组件文档</a></li><li><a href="https://docs.astro.build/en/concepts/islands/" target="_blank" rel="noopener noreferrer">Astro Islands</a></li></ul>`,14)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};