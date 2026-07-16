import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/frontend/framework/astro/astro-routing.html","title":"Astro 路由与数据获取","lang":"zh-CN","frontmatter":{"description":"Astro 路由与数据获取 页面路由 Astro 使用基于文件系统的路由： 动态路由 内容集合 数据获取 自定义 404 页面 参考 Astro 路由文档 Astro 内容集合","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Astro 路由与数据获取\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/astro/astro-routing.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Astro 路由与数据获取"}],["meta",{"property":"og:description","content":"Astro 路由与数据获取 页面路由 Astro 使用基于文件系统的路由： 动态路由 内容集合 数据获取 自定义 404 页面 参考 Astro 路由文档 Astro 内容集合"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1784119030000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.73,"words":220},"filePathRelative":"frontend/framework/astro/astro-routing.md","autoDesc":true}`),a={name:`astro-routing.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="astro-路由与数据获取" tabindex="-1"><a class="header-anchor" href="#astro-路由与数据获取"><span>Astro 路由与数据获取</span></a></h1><h2 id="页面路由" tabindex="-1"><a class="header-anchor" href="#页面路由"><span>页面路由</span></a></h2><p>Astro 使用基于文件系统的路由：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">src/pages/</span>
<span class="line">├── index.astro          # /</span>
<span class="line">├── about.astro          # /about</span>
<span class="line">├── blog/</span>
<span class="line">│   ├── index.astro      # /blog</span>
<span class="line">│   └── [slug].astro     # /blog/post-1, /blog/post-2</span>
<span class="line">└── tags/</span>
<span class="line">    └── [tag].astro      # /tags/astro, /tags/react</span>
<span class="line"></span></code></pre></div><h2 id="动态路由" tabindex="-1"><a class="header-anchor" href="#动态路由"><span>动态路由</span></a></h2><div class="language-astro line-numbers-mode" data-highlighter="prismjs" data-ext="astro"><pre><code class="language-astro"><span class="line">---</span>
<span class="line">// src/pages/blog/[slug].astro</span>
<span class="line">export async function getStaticPaths() {</span>
<span class="line">  // 静态生成时获取所有路径</span>
<span class="line">  const posts = await fetch(&#39;https://api.example.com/posts&#39;).then(r =&gt; r.json());</span>
<span class="line">  return posts.map(post =&gt; ({</span>
<span class="line">    params: { slug: post.slug },</span>
<span class="line">    props: { post },</span>
<span class="line">  }));</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">const { post } = Astro.props;</span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">&lt;h1&gt;{post.title}&lt;/h1&gt;</span>
<span class="line">&lt;article&gt;{post.content}&lt;/article&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="内容集合" tabindex="-1"><a class="header-anchor" href="#内容集合"><span>内容集合</span></a></h2><div class="language-astro line-numbers-mode" data-highlighter="prismjs" data-ext="astro"><pre><code class="language-astro"><span class="line">---</span>
<span class="line">// src/pages/blog/[...slug].astro</span>
<span class="line">import { getCollection } from &#39;astro:content&#39;;</span>
<span class="line"></span>
<span class="line">export async function getStaticPaths() {</span>
<span class="line">  const posts = await getCollection(&#39;blog&#39;);</span>
<span class="line">  return posts.map(post =&gt; ({</span>
<span class="line">    params: { slug: post.slug },</span>
<span class="line">    props: { post },</span>
<span class="line">  }));</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">const { post } = Astro.props;</span>
<span class="line">const { Content } = await post.render();</span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">&lt;article&gt;</span>
<span class="line">  &lt;h1&gt;{post.data.title}&lt;/h1&gt;</span>
<span class="line">  &lt;p&gt;{post.data.description}&lt;/p&gt;</span>
<span class="line">  &lt;Content /&gt;</span>
<span class="line">&lt;/article&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据获取" tabindex="-1"><a class="header-anchor" href="#数据获取"><span>数据获取</span></a></h2><div class="language-astro" data-highlighter="prismjs" data-ext="astro"><pre><code class="language-astro"><span class="line">---</span>
<span class="line">// 使用 fetch API（SSG 构建时获取，SSR 运行时获取）</span>
<span class="line">const response = await fetch(&#39;https://api.github.com/repos/withastro/astro&#39;);</span>
<span class="line">const data = await response.json();</span>
<span class="line">---</span>
<span class="line">&lt;p&gt;Stars: {data.stargazers_count}&lt;/p&gt;</span>
<span class="line"></span></code></pre></div><h2 id="自定义-404-页面" tabindex="-1"><a class="header-anchor" href="#自定义-404-页面"><span>自定义 404 页面</span></a></h2><div class="language-astro" data-highlighter="prismjs" data-ext="astro"><pre><code class="language-astro"><span class="line">---</span>
<span class="line">// src/pages/404.astro</span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">&lt;main&gt;</span>
<span class="line">  &lt;h1&gt;404 - Page Not Found&lt;/h1&gt;</span>
<span class="line">  &lt;a href=&quot;/&quot;&gt;Go Home&lt;/a&gt;</span>
<span class="line">&lt;/main&gt;</span>
<span class="line"></span></code></pre></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><ul><li><a href="https://docs.astro.build/en/core-concepts/astro-pages/" target="_blank" rel="noopener noreferrer">Astro 路由文档</a></li><li><a href="https://docs.astro.build/en/guides/content-collections/" target="_blank" rel="noopener noreferrer">Astro 内容集合</a></li></ul>`,14)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};