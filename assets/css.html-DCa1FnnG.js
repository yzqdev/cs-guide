import{_ as e,c as t,o as s,d as n}from"./app-CbULZrmi.js";const o={},r=n(`<h1 id="css-方案" tabindex="-1"><a class="header-anchor" href="#css-方案"><span>css 方案</span></a></h1><h2 id="css-in-js方案" tabindex="-1"><a class="header-anchor" href="#css-in-js方案"><span>css in js方案</span></a></h2><p>将 CSS 写在 JS 里。例如使用 styled-components, Emotion 等 CSS in JS 方案。代表组件库有 MUI、Mantine 等。</p><ul><li><a href="https://styled-components.com/" target="_blank" rel="noopener noreferrer">https://styled-components.com/</a></li><li><a href="https://emotion.sh/docs/introduction" target="_blank" rel="noopener noreferrer">https://emotion.sh/docs/introduction</a></li><li><a href="https://github.com/cristianbote/goober" target="_blank" rel="noopener noreferrer">https://github.com/cristianbote/goober</a></li><li><a href="https://vanilla-extract.style/" target="_blank" rel="noopener noreferrer">https://vanilla-extract.style/</a></li><li><a href="https://github.com/callstack/linaria" target="_blank" rel="noopener noreferrer">https://github.com/callstack/linaria</a></li><li><a href="https://panda-css.com/" target="_blank" rel="noopener noreferrer">https://panda-css.com/</a></li><li><a href="https://github.com/ben-rogerson/twin.macro" target="_blank" rel="noopener noreferrer">https://github.com/ben-rogerson/twin.macro</a></li><li><a href="https://github.com/vercel/styled-jsx" target="_blank" rel="noopener noreferrer">https://github.com/vercel/styled-jsx</a></li><li><a href="https://github.com/cssinjs/jss" target="_blank" rel="noopener noreferrer">https://github.com/cssinjs/jss</a></li><li><a href="https://github.com/parcel-bundler/lightningcss" target="_blank" rel="noopener noreferrer">https://github.com/parcel-bundler/lightningcss</a></li></ul><h2 id="pandacss" tabindex="-1"><a class="header-anchor" href="#pandacss"><span>pandacss</span></a></h2><p><a href="https://panda-css.com/" target="_blank" rel="noopener noreferrer">https://panda-css.com/</a></p><h2 id="emotion-和vite搭配" tabindex="-1"><a class="header-anchor" href="#emotion-和vite搭配"><span>emotion 和vite搭配</span></a></h2><pre><code>yarn add @emotion/react
yarn add -D @emotion/babel-plugin
</code></pre><p>然后更新vite.config.ts</p><pre><code class="language-ts">import { defineConfig } from &quot;vite&quot;;
import react from &quot;@vitejs/plugin-react&quot;;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: &quot;@emotion/react&quot;,
      babel: {
        plugins: [&quot;@emotion/babel-plugin&quot;],
      },
    }),
  ],
});
</code></pre><p>最后,添加tsconfig.json</p><pre><code class="language-json">{
  &quot;compilerOptions&quot;: {
    &quot;jsxImportSource&quot;: &quot;@emotion/react&quot;
  }
}
</code></pre><h3 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法"><span>使用方法</span></a></h3><p>使用antd的组件</p><pre><code class="language-tsx">import { Icon } from &#39;antd&#39;;
const DarkHoverStyle = styled(Icon)\`
  color: gray;
  :hover {
    color: palevioletred;
  }
\`;
</code></pre><p>覆盖样式</p><pre><code class="language-tsx">const GlobalStyle = createGlobalStyle\`
  .ant-tooltip-inner {
    background-color: palevioletred;
    color: black;
  }
\`;
</code></pre><p>最后使用</p><pre><code class="language-tsx">export default function App() {
  return (
    &lt;FlexBox&gt;
      &lt;GlobalStyle /&gt;
      &lt;Tooltip title=&quot;Github Icon&quot;&gt;
        &lt;DarkHoverStyle type=&quot;github&quot; style={{ fontSize: 100 }} /&gt;
      &lt;/Tooltip&gt;
    &lt;/FlexBox&gt;
  );
}
</code></pre><h2 id="css-modules" tabindex="-1"><a class="header-anchor" href="#css-modules"><span>css modules</span></a></h2><p><a href="https://github.com/css-modules/css-modules" target="_blank" rel="noopener noreferrer">https://github.com/css-modules/css-modules</a> 像vite,webpack 基本都支持cssmodules 用法</p><pre><code class="language-js">import styles from &#39;index.module.css&#39;
export function Home(){
  &lt;div className={styles.wrap}&gt;&lt;/div&gt;
}
</code></pre><h2 id="基本的css" tabindex="-1"><a class="header-anchor" href="#基本的css"><span>基本的css</span></a></h2><p>如less,scss等等</p><h2 id="原子化css" tabindex="-1"><a class="header-anchor" href="#原子化css"><span>原子化css</span></a></h2><p>如tailwindcss,unocss等等</p><h2 id="unocss" tabindex="-1"><a class="header-anchor" href="#unocss"><span>unocss</span></a></h2><p>审查界面<code>localhost:5173/__unocss</code></p>`,28),a=[r];function c(l,i){return s(),t("div",null,a)}const d=e(o,[["render",c],["__file","css.html.vue"]]),h=JSON.parse('{"path":"/frontend/framework/react/css.html","title":"css 方案","lang":"zh-CN","frontmatter":{"description":"css 方案 css in js方案 将 CSS 写在 JS 里。例如使用 styled-components, Emotion 等 CSS in JS 方案。代表组件库有 MUI、Mantine 等。 https://styled-components.com/ https://emotion.sh/docs/introduction https:/...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/react/css.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"css 方案"}],["meta",{"property":"og:description","content":"css 方案 css in js方案 将 CSS 写在 JS 里。例如使用 styled-components, Emotion 等 CSS in JS 方案。代表组件库有 MUI、Mantine 等。 https://styled-components.com/ https://emotion.sh/docs/introduction https:/..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-26T13:49:46.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-26T13:49:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"css 方案\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-26T13:49:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"css in js方案","slug":"css-in-js方案","link":"#css-in-js方案","children":[]},{"level":2,"title":"pandacss","slug":"pandacss","link":"#pandacss","children":[]},{"level":2,"title":"emotion 和vite搭配","slug":"emotion-和vite搭配","link":"#emotion-和vite搭配","children":[{"level":3,"title":"使用方法","slug":"使用方法","link":"#使用方法","children":[]}]},{"level":2,"title":"css modules","slug":"css-modules","link":"#css-modules","children":[]},{"level":2,"title":"基本的css","slug":"基本的css","link":"#基本的css","children":[]},{"level":2,"title":"原子化css","slug":"原子化css","link":"#原子化css","children":[]},{"level":2,"title":"unocss","slug":"unocss","link":"#unocss","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1701006586000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.79,"words":237},"filePathRelative":"frontend/framework/react/css.md","localizedDate":"2023年6月25日","autoDesc":true}');export{d as comp,h as data};
