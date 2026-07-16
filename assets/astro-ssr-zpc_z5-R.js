import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/frontend/framework/astro/astro-ssr.html","title":"Astro SSR 与部署","lang":"zh-CN","frontmatter":{"description":"Astro SSR 与部署 SSR 配置 基本配置 SSR 与 SSG 区别 对于需要 SSR 的页面： 且不能使用 getStaticPaths()（SSG 专用）。 部署 环境变量 图片优化 添加 RSS 视图过渡 参考 Astro 部署指南 Astro SSR 指南","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Astro SSR 与部署\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/astro/astro-ssr.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Astro SSR 与部署"}],["meta",{"property":"og:description","content":"Astro SSR 与部署 SSR 配置 基本配置 SSR 与 SSG 区别 对于需要 SSR 的页面： 且不能使用 getStaticPaths()（SSG 专用）。 部署 环境变量 图片优化 添加 RSS 视图过渡 参考 Astro 部署指南 Astro SSR 指南"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1784119030000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.96,"words":287},"filePathRelative":"frontend/framework/astro/astro-ssr.md","autoDesc":true}`),a={name:`astro-ssr.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="astro-ssr-与部署" tabindex="-1"><a class="header-anchor" href="#astro-ssr-与部署"><span>Astro SSR 与部署</span></a></h1><h2 id="ssr-配置" tabindex="-1"><a class="header-anchor" href="#ssr-配置"><span>SSR 配置</span></a></h2><h3 id="基本配置" tabindex="-1"><a class="header-anchor" href="#基本配置"><span>基本配置</span></a></h3><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;astro/config&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> mdx <span class="token keyword">from</span> <span class="token string">&quot;@astrojs/mdx&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> sitemap <span class="token keyword">from</span> <span class="token string">&quot;@astrojs/sitemap&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> node <span class="token keyword">from</span> <span class="token string">&quot;@astrojs/node&quot;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">site</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token string">&quot;hybrid&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// hybrid 模式：部分页面 SSR，部分 SSG</span></span>
<span class="line">  <span class="token literal-property property">adapter</span><span class="token operator">:</span> <span class="token function">node</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&quot;standalone&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">integrations</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">mdx</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">sitemap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">server</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">8455</span><span class="token punctuation">,</span> <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">&quot;0.0.0.0&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h3 id="ssr-与-ssg-区别" tabindex="-1"><a class="header-anchor" href="#ssr-与-ssg-区别"><span>SSR 与 SSG 区别</span></a></h3><p>对于需要 SSR 的页面：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">export const prerender = false;</span>
<span class="line"></span></code></pre></div><p>且不能使用 <code>getStaticPaths()</code>（SSG 专用）。</p><h3 id="部署" tabindex="-1"><a class="header-anchor" href="#部署"><span>部署</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">npm</span> run build</span>
<span class="line"><span class="token function">node</span> ./dist/server/entry.mjs</span>
<span class="line"></span></code></pre></div><h2 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量"><span>环境变量</span></a></h2><div class="language-astro" data-highlighter="prismjs" data-ext="astro"><pre><code class="language-astro"><span class="line">---</span>
<span class="line">// 公开环境变量（以 PUBLIC_ 开头）</span>
<span class="line">const apiUrl = import.meta.env.PUBLIC_API_URL;</span>
<span class="line">const siteUrl = import.meta.env.SITE;</span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">&lt;script&gt;</span>
<span class="line">  // 客户端也可以访问 PUBLIC_ 开头的环境变量</span>
<span class="line">  console.log(import.meta.env.PUBLIC_API_URL);</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span></code></pre></div><h2 id="图片优化" tabindex="-1"><a class="header-anchor" href="#图片优化"><span>图片优化</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">npm</span> <span class="token function">install</span> @astrojs/image</span>
<span class="line"></span></code></pre></div><div class="language-astro" data-highlighter="prismjs" data-ext="astro"><pre><code class="language-astro"><span class="line">---</span>
<span class="line">import { Image } from &#39;@astrojs/image/components&#39;;</span>
<span class="line">import logo from &#39;../assets/logo.png&#39;;</span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">&lt;Image src={logo} alt=&quot;Logo&quot; width={200} height={100} format=&quot;webp&quot; /&gt;</span>
<span class="line">&lt;Image src={logo} alt=&quot;Logo&quot; widths={[200, 400, 800]} sizes=&quot;(max-width: 800px) 100vw, 800px&quot; /&gt;</span>
<span class="line"></span></code></pre></div><h2 id="添加-rss" tabindex="-1"><a class="header-anchor" href="#添加-rss"><span>添加 RSS</span></a></h2><div class="language-astro line-numbers-mode" data-highlighter="prismjs" data-ext="astro"><pre><code class="language-astro"><span class="line">---</span>
<span class="line">// src/pages/rss.xml.ts</span>
<span class="line">import rss from &#39;@astrojs/rss&#39;;</span>
<span class="line">import { getCollection } from &#39;astro:content&#39;;</span>
<span class="line"></span>
<span class="line">export async function GET(context) {</span>
<span class="line">  const posts = await getCollection(&#39;blog&#39;);</span>
<span class="line">  return rss({</span>
<span class="line">    title: &#39;My Blog&#39;,</span>
<span class="line">    description: &#39;A blog about...&#39;,</span>
<span class="line">    site: context.site,</span>
<span class="line">    items: posts.map(post =&gt; ({</span>
<span class="line">      title: post.data.title,</span>
<span class="line">      pubDate: post.data.pubDate,</span>
<span class="line">      description: post.data.description,</span>
<span class="line">      link: \`/blog/\${post.slug}/\`,</span>
<span class="line">    })),</span>
<span class="line">  });</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="视图过渡" tabindex="-1"><a class="header-anchor" href="#视图过渡"><span>视图过渡</span></a></h2><div class="language-astro" data-highlighter="prismjs" data-ext="astro"><pre><code class="language-astro"><span class="line">---</span>
<span class="line">// Astro 2.9+ 支持视图过渡</span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">&lt;html lang=&quot;zh-CN&quot;&gt;</span>
<span class="line">  &lt;head&gt;</span>
<span class="line">    &lt;meta name=&quot;astro-view-transitions&quot; content=&quot;enabled&quot; /&gt;</span>
<span class="line">  &lt;/head&gt;</span>
<span class="line">  &lt;body&gt;</span>
<span class="line">    &lt;a href=&quot;/about&quot;&gt;About&lt;/a&gt;</span>
<span class="line">    &lt;slot /&gt;</span>
<span class="line">  &lt;/body&gt;</span>
<span class="line">&lt;/html&gt;</span>
<span class="line"></span></code></pre></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><ul><li><a href="https://docs.astro.build/en/guides/deploy/" target="_blank" rel="noopener noreferrer">Astro 部署指南</a></li><li><a href="https://docs.astro.build/en/guides/server-side-rendering/" target="_blank" rel="noopener noreferrer">Astro SSR 指南</a></li></ul>`,21)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};