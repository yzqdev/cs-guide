import{_ as e,c as t,o as n,d as i}from"./app-CbULZrmi.js";const l={},s=i(`<h1 id="vite插件" tabindex="-1"><a class="header-anchor" href="#vite插件"><span>vite插件</span></a></h1><h2 id="vitejs-plugin-vue-js-用于jsx-tsx" tabindex="-1"><a class="header-anchor" href="#vitejs-plugin-vue-js-用于jsx-tsx"><span>@vitejs/plugin-vue-js 用于jsx tsx</span></a></h2><pre><code class="language-javascript">npm i @vitejs/plugin-vue-jsx -d
import vueJsx from &#39;@vitejs/plugin-vue-jsx&#39;
plugins: [vueJsx()]
</code></pre><h2 id="vite-plugin-style-import-第三方包样式按需引入" tabindex="-1"><a class="header-anchor" href="#vite-plugin-style-import-第三方包样式按需引入"><span>vite-plugin-style-import 第三方包样式按需引入</span></a></h2><pre><code class="language-javascript">npm i vite-plugin-style-import -d
import styleImport from &#39;vite-plugin-style-import&#39;
 plugins: [
        styleImport({
        libs: [{
          libraryName: &#39;ant-design-vue&#39;,
           esModule: true,
           resolveStyle: (name) =&gt; {
            return\`ant-design-vue/es/\${name}/style/css\`;
          },
        }]
      })
    ]
</code></pre><h2 id="rollup-plugin-terser-打包-压缩js代码-清除console-log" tabindex="-1"><a class="header-anchor" href="#rollup-plugin-terser-打包-压缩js代码-清除console-log"><span>rollup-plugin-terser 打包 压缩js代码 清除console.log</span></a></h2><pre><code class="language-javascript">npm i -d rollup-plugin-terser
import { terser } from &quot;rollup-plugin-terser&quot;
 plugins: [
      visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
     })
    ]
</code></pre><h2 id="vite-plugin-imagemin-打包压缩图片" tabindex="-1"><a class="header-anchor" href="#vite-plugin-imagemin-打包压缩图片"><span>vite-plugin-imagemin 打包压缩图片</span></a></h2><pre><code class="language-javascript">npm i -d vite-plugin-imagemin
import viteImagemin from &#39;vite-plugin-imagemin&#39;
plugins[
      viteImagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 7,
    },
    webp: {
      quality: 75,
    },
    mozjpeg: {
      quality: 65,
    },
    pngquant: {
      quality: [0.65, 0.9],
      speed: 4,
    },
    svgo: {
      plugins: [
        {
          removeViewBox: false,
        },
        {
          removeEmptyAttrs: false,
        },
      ],
     },
    })
   ]
</code></pre><h2 id="vite-plugin-compression-开启gzip、br压缩" tabindex="-1"><a class="header-anchor" href="#vite-plugin-compression-开启gzip、br压缩"><span>vite-plugin-compression 开启gzip、br压缩</span></a></h2><p><a href="https://github.com/vbenjs/vite-plugin-compression" target="_blank" rel="noopener noreferrer">https://github.com/vbenjs/vite-plugin-compression</a></p><pre><code class="language-javascript"> 
import compressPlugin from &#39;vite-plugin-compression&#39;
 plugins[
      compressPlugin({
        ext: &#39;.gz&#39;,//gz br
        algorithm: &#39;gzip&#39;, //brotliCompress gzip
        deleteOriginFile:true
     })


     //vite.config.ts
build:{
  terserOptions: {
        // 生产环境下移除console
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
</code></pre><h2 id="vite-plugin-html" tabindex="-1"><a class="header-anchor" href="#vite-plugin-html"><span>vite-plugin-html</span></a></h2><p>在index.html插入想要的东西</p><pre><code class="language-html">
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot; /&gt;
  &lt;link rel=&quot;icon&quot; href=&quot;/favicon.ico&quot; /&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;
  &lt;title&gt;&lt;%- title %&gt;&lt;/title&gt;
  &lt;%- injectScript %&gt;
&lt;/head&gt;

</code></pre><pre><code class="language-js">import { defineConfig, Plugin } from &#39;vite&#39;
import vue from &#39;@vitejs/plugin-vue&#39;
import { createHtmlPlugin } from &#39;vite-plugin-html&#39;
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      /**
       * 在这里写entry后，你将不需要在\`index.html\`内添加 script 标签，原有标签需要删除
       * @default src/main.ts
       */
      entry: &#39;src/main.ts&#39;,
      /**
       * 如果你想将 \`index.html\`存放在指定文件夹，可以修改它，否则不需要配置
       * @default index.html
       */
      template: &#39;public/index.html&#39;,
      /**
       * 需要注入 index.html ejs 模版的数据
       */
      inject: {
        data: {
          title: &#39;index&#39;,
          injectScript: \`&lt;script src=&quot;./inject.js&quot;&gt;&lt;/script&gt;\`,
        },
      },
    }),
  ],
})

</code></pre>`,16),r=[s];function o(p,a){return n(),t("div",null,r)}const u=e(l,[["render",o],["__file","vite-plugins.html.vue"]]),c=JSON.parse('{"path":"/frontend/framework/packaging-tool/vite-tutor/vite-plugins.html","title":"vite插件","lang":"zh-CN","frontmatter":{"description":"vite插件 @vitejs/plugin-vue-js 用于jsx tsx vite-plugin-style-import 第三方包样式按需引入 rollup-plugin-terser 打包 压缩js代码 清除console.log vite-plugin-imagemin 打包压缩图片 vite-plugin-compression 开启gzi...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/packaging-tool/vite-tutor/vite-plugins.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"vite插件"}],["meta",{"property":"og:description","content":"vite插件 @vitejs/plugin-vue-js 用于jsx tsx vite-plugin-style-import 第三方包样式按需引入 rollup-plugin-terser 打包 压缩js代码 清除console.log vite-plugin-imagemin 打包压缩图片 vite-plugin-compression 开启gzi..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vite插件\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"@vitejs/plugin-vue-js 用于jsx tsx","slug":"vitejs-plugin-vue-js-用于jsx-tsx","link":"#vitejs-plugin-vue-js-用于jsx-tsx","children":[]},{"level":2,"title":"vite-plugin-style-import 第三方包样式按需引入","slug":"vite-plugin-style-import-第三方包样式按需引入","link":"#vite-plugin-style-import-第三方包样式按需引入","children":[]},{"level":2,"title":"rollup-plugin-terser 打包 压缩js代码 清除console.log","slug":"rollup-plugin-terser-打包-压缩js代码-清除console-log","link":"#rollup-plugin-terser-打包-压缩js代码-清除console-log","children":[]},{"level":2,"title":"vite-plugin-imagemin 打包压缩图片","slug":"vite-plugin-imagemin-打包压缩图片","link":"#vite-plugin-imagemin-打包压缩图片","children":[]},{"level":2,"title":"vite-plugin-compression 开启gzip、br压缩","slug":"vite-plugin-compression-开启gzip、br压缩","link":"#vite-plugin-compression-开启gzip、br压缩","children":[]},{"level":2,"title":"vite-plugin-html","slug":"vite-plugin-html","link":"#vite-plugin-html","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.2,"words":361},"filePathRelative":"frontend/framework/packaging-tool/vite-tutor/vite-plugins.md","localizedDate":"2022年3月21日","autoDesc":true}');export{u as comp,c as data};
