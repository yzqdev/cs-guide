import{_ as e,c as t,o as r,d as n}from"./app-CbULZrmi.js";const a={},s=n(`<h1 id="技巧" tabindex="-1"><a class="header-anchor" href="#技巧"><span>技巧</span></a></h1><h2 id="react-vite使用装饰器" tabindex="-1"><a class="header-anchor" href="#react-vite使用装饰器"><span>react vite使用装饰器</span></a></h2><p>先安装babel插件<code>@babel/plugin-proposal-decorators</code>,<code>@babel/plugin-proposal-class-properties</code> 在vite.config.ts加入下面这个</p><pre><code class="language-js">
  plugins: [
    react({
      babel: {
        plugins: [
          [&quot;@babel/plugin-proposal-decorators&quot;, { legacy: true }],
          [&quot;@babel/plugin-proposal-class-properties&quot;, { loose: true }],
        ],
      },
    }),
  ],
</code></pre><p>在tsconfig.json配置</p><pre><code>   &quot;experimentalDecorators&quot;: true,
</code></pre><h2 id="react-vite导入图片" tabindex="-1"><a class="header-anchor" href="#react-vite导入图片"><span>react vite导入图片</span></a></h2><div class="hint-container warning"><p class="hint-container-title">注意</p><p>第二种方法不能使用<code>&lt;img src=&#39;@/assets/vite.svg&#39;/&gt;</code>这样的写法</p></div><ul><li>第一种方法</li></ul><p><a href="https://vitejs.dev/guide/assets.html" target="_blank" rel="noopener noreferrer">https://vitejs.dev/guide/assets.html</a></p><pre><code class="language-js">import viteImg from &#39;@/assets/vite.svg&#39;


&lt;img src={viteImg}/&gt;
</code></pre><ul><li>第二种</li></ul><pre><code class="language-js"> function getImageUrl(url) {
    return new URL(url, import.meta.url).href
  }

  // 然后,这里不能使用\`@/assets/react.svg

   &lt;img src={getImageUrl(&#39;../../assets/react.svg&#39;)}/&gt;
</code></pre><ul><li>第三种</li></ul><p>在assets文件夹加一个index.ts,并把图片导出</p><p>比如我的assets文件夹有一个vite.svg,那index.ts就是</p><pre><code class="language-ts">import reactSvg from &#39;./react.svg&#39;


export {
  reactSvg
}

</code></pre><p>之后再我们的react组件中,添加</p><pre><code class="language-tsx">import * as svgAssets from &#39;@/assets/index&#39;

export function ImgWrap(){
  return &lt;div&gt;   &lt;img src={svgAssets.reactSvg}/&gt;&lt;/div&gt;
}
</code></pre><h2 id="解决react中遇到的-xxxx-不能用作-jsx-组件-问题" tabindex="-1"><a class="header-anchor" href="#解决react中遇到的-xxxx-不能用作-jsx-组件-问题"><span>解决React中遇到的 “xxxx”不能用作 JSX 组件 问题</span></a></h2><p>是<code>@types/react</code>和<code>@types/react-dom</code>版本不对,重新安装即可</p><h2 id="uncaught-referenceerror-global-is-not-defined" tabindex="-1"><a class="header-anchor" href="#uncaught-referenceerror-global-is-not-defined"><span><code>Uncaught ReferenceError: global is not defined</code></span></a></h2><pre><code class="language-ts">/// &lt;reference types=&quot;vitest&quot; /&gt;
import { defineConfig } from &#39;vite&#39;
import react from &#39;@vitejs/plugin-react&#39;
import svgr from &#39;vite-plugin-svgr&#39;
import tsconfigPaths from &#39;vite-tsconfig-paths&#39;;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: &#39;jsdom&#39;,
    setupFiles: [&#39;./vitest.setup.ts&#39;],
  },
+  define: {
+    global: &#39;window&#39;,
+  }
})

</code></pre>`,23),o=[s];function i(c,l){return r(),t("div",null,o)}const d=e(a,[["render",i],["__file","tips.html.vue"]]),g=JSON.parse('{"path":"/frontend/framework/react/tips.html","title":"技巧","lang":"zh-CN","frontmatter":{"description":"技巧 react vite使用装饰器 先安装babel插件@babel/plugin-proposal-decorators,@babel/plugin-proposal-class-properties 在vite.config.ts加入下面这个 在tsconfig.json配置 react vite导入图片 注意 第二种方法不能使用<img src...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/react/tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"技巧"}],["meta",{"property":"og:description","content":"技巧 react vite使用装饰器 先安装babel插件@babel/plugin-proposal-decorators,@babel/plugin-proposal-class-properties 在vite.config.ts加入下面这个 在tsconfig.json配置 react vite导入图片 注意 第二种方法不能使用<img src..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"react vite使用装饰器","slug":"react-vite使用装饰器","link":"#react-vite使用装饰器","children":[]},{"level":2,"title":"react vite导入图片","slug":"react-vite导入图片","link":"#react-vite导入图片","children":[]},{"level":2,"title":"解决React中遇到的 “xxxx”不能用作 JSX 组件 问题","slug":"解决react中遇到的-xxxx-不能用作-jsx-组件-问题","link":"#解决react中遇到的-xxxx-不能用作-jsx-组件-问题","children":[]},{"level":2,"title":"Uncaught ReferenceError: global is not defined","slug":"uncaught-referenceerror-global-is-not-defined","link":"#uncaught-referenceerror-global-is-not-defined","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.92,"words":275},"filePathRelative":"frontend/framework/react/tips.md","localizedDate":"2023年6月25日","autoDesc":true}');export{d as comp,g as data};
