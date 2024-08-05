import{_ as t,c as e,o,d as r}from"./app-CbULZrmi.js";const s={},a=r(`<h1 id="astro使用" tabindex="-1"><a class="header-anchor" href="#astro使用"><span>astro使用</span></a></h1><h2 id="安装sharp失败" tabindex="-1"><a class="header-anchor" href="#安装sharp失败"><span>安装sharp失败</span></a></h2><pre><code>npm config set sharp_binary_host &quot;https://npmmirror.com/mirrors/sharp&quot;
npm config set sharp_libvips_binary_host &quot;https://npmmirror.com/mirrors/sharp-libvips&quot;
</code></pre><h2 id="使用ssr-即查看网站源码-动态数据也可以看到" tabindex="-1"><a class="header-anchor" href="#使用ssr-即查看网站源码-动态数据也可以看到"><span>使用ssr (即查看网站源码,动态数据也可以看到)</span></a></h2><p>必须添加适配器,建议</p><pre><code class="language-js">import { defineConfig } from &quot;astro/config&quot;;
import mdx from &quot;@astrojs/mdx&quot;;

import sitemap from &quot;@astrojs/sitemap&quot;;
import node from &quot;@astrojs/node&quot;;
// https://astro.build/config
export default defineConfig({
  site: &quot;https://example.com&quot;,
  output: &quot;hybrid&quot;,
  adapter: node({
    mode: &quot;standalone&quot;,
  }),
  integrations: [mdx(), sitemap()],
  server: {
    port: 8455,
    host: &quot;0.0.0.0&quot;,
  },
});

</code></pre><p>对于需要ssr的页面要添加</p><pre><code>export const prerender = false;
</code></pre><p>且不能使用<code>getStaticPaths()</code>,这个函数式ssg使用的,静态页面使用</p><p>最后打包<code>npm run build</code> 部署<code>node .\\dist\\server\\entry.mjs</code>即可</p><p>如果打包静态网页的话, <code>[slug].astro</code> 必须使用 <code>getStaticPaths()</code>获取数据</p><p>注意: <code>getStaticPaths</code> will only run during build in production, it will not be called during runtime. 也就是说里面不能使用fetch请求数据,要想获取数据只能ssr</p>`,12),n=[a];function i(p,d){return o(),e("div",null,n)}const m=t(s,[["render",i],["__file","tutor.html.vue"]]),l=JSON.parse('{"path":"/frontend/framework/astro/tutor.html","title":"astro使用","lang":"zh-CN","frontmatter":{"description":"astro使用 安装sharp失败 使用ssr (即查看网站源码,动态数据也可以看到) 必须添加适配器,建议 对于需要ssr的页面要添加 且不能使用getStaticPaths(),这个函数式ssg使用的,静态页面使用 最后打包npm run build 部署node .\\\\dist\\\\server\\\\entry.mjs即可 如果打包静态网页的话, [slu...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/astro/tutor.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"astro使用"}],["meta",{"property":"og:description","content":"astro使用 安装sharp失败 使用ssr (即查看网站源码,动态数据也可以看到) 必须添加适配器,建议 对于需要ssr的页面要添加 且不能使用getStaticPaths(),这个函数式ssg使用的,静态页面使用 最后打包npm run build 部署node .\\\\dist\\\\server\\\\entry.mjs即可 如果打包静态网页的话, [slu..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-16T07:53:47.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-04-16T07:53:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"astro使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-16T07:53:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安装sharp失败","slug":"安装sharp失败","link":"#安装sharp失败","children":[]},{"level":2,"title":"使用ssr (即查看网站源码,动态数据也可以看到)","slug":"使用ssr-即查看网站源码-动态数据也可以看到","link":"#使用ssr-即查看网站源码-动态数据也可以看到","children":[]}],"git":{"createdTime":1711383489000,"updatedTime":1713254027000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.68,"words":203},"filePathRelative":"frontend/framework/astro/tutor.md","localizedDate":"2024年3月25日","autoDesc":true}');export{m as comp,l as data};
