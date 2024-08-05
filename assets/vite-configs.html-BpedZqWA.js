import{_ as e,c as n,o as t,d as o}from"./app-CbULZrmi.js";const s={},i=o(`<h1 id="vite-config-js" tabindex="-1"><a class="header-anchor" href="#vite-config-js"><span>vite.config.js</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>vite官网说的很不错了 <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">https://vitejs.dev/</a></p></div><pre><code class="language-js">const resolve = path.resolve;
import { defineConfig } from &quot;vite&quot;;
import vue from &#39;@vitejs/plugin-vue&#39;
import path from &quot;path&quot;;
export default defineConfig({
  plugins: [vue()],

  resolve: {
    //导入时想要省略的扩展名列表。注意，不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会干扰 IDE 和类型支持。
    alias: [
      { find: &quot;@&quot;, replacement: resolve(__dirname, &quot;./src&quot;) },
      { find: &quot;@views&quot;, replacement: resolve(__dirname, &quot;./src/views&quot;) },
      {
        find: &quot;@components&quot;,
        replacement: path.resolve(__dirname, &quot;./src/components&quot;),
      },
      { find: &quot;@utils&quot;, replacement: path.resolve(__dirname, &quot;./src/utils&quot;) },
    ],
  },
  build: {
    // sourcemap: true,
    minify: false,
  },
  server: {
    port: 3600,
  },
});

</code></pre><p>import.meta.glob 为过动态导入，构建时，会分离为独立的 chunk</p><pre><code class="language-js">

const files = import.meta.glob(&#39;./module/*.js&#39;)

const modules = {}
for (const key in files) {
    files[key]().then(res=&gt;{
        modules[key.replace(/(\\.\\/module\\/|\\.js)/g, &#39;&#39;)] = res.default
    })
}

Object.keys(modules).forEach(item =&gt; {
    modules[item][&#39;namespaced&#39;] = true
})

//import.meta.globEager 为直接引入

const files = import.meta.globEager(&#39;./module/*.js&#39;)

const modules = {}
for (const key in files) {
    modules[key.replace(/(\\.\\/module\\/|\\.js)/g, &#39;&#39;)] = files[key].default
}

Object.keys(modules).forEach(item =&gt; {
    modules[item][&#39;namespaced&#39;] = true
})
</code></pre><h2 id="打包分离js和css" tabindex="-1"><a class="header-anchor" href="#打包分离js和css"><span>打包分离js和css</span></a></h2><h3 id="只是分离vendor和文件路径" tabindex="-1"><a class="header-anchor" href="#只是分离vendor和文件路径"><span>只是分离vendor和文件路径</span></a></h3><pre><code class="language-ts">import { defineConfig } from &#39;vite&#39;
import react from &#39;@vitejs/plugin-react&#39;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: [&quot;console&quot;, &quot;debugger&quot;],
  },
  build: {
    
    target: &quot;es2020&quot;,
    // minify: &quot;terser&quot;,
    // rollup 配置
    rollupOptions: {
      output: {
        chunkFileNames: &quot;js/[name]-[hash].js&quot;, // 引入文件名的名称
        entryFileNames: &quot;js/[name]-[hash].js&quot;, // 包的入口文件名称
        assetFileNames: &quot;[ext]/[name]-[hash].[ext]&quot;, // 资源文件像 字体，图片等
        manualChunks(id) {
          if (id.includes(&quot;node_modules&quot;)) {
            return &quot;vendor&quot;;
          }
        },
      },
    },

    // terserOptions: {
    //   compress: {
    //     // 生产环境时移除console
    //     drop_console: true,
    //     drop_debugger: true,
    //   },
    // },
  },
});

</code></pre><h3 id="code-split" tabindex="-1"><a class="header-anchor" href="#code-split"><span>code split</span></a></h3><pre><code class="language-ts">import { defineConfig } from &#39;vite&#39;
import react from &#39;@vitejs/plugin-react&#39;
const dev=process.env.NODE_ENV===&#39;development&#39;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: dev ? [] : [&quot;console&quot;, &quot;debugger&quot;],
  },
  build: {
    target: &quot;es2020&quot;,
     
    rollupOptions: {
      output: {
        chunkFileNames: &quot;js/[name]-[hash].js&quot;, // 引入文件名的名称
        entryFileNames: &quot;js/[name]-[hash].js&quot;, // 包的入口文件名称
        assetFileNames: &quot;[ext]/[name]-[hash].[ext]&quot;, // 资源文件像 字体，图片等
        manualChunks(id) {
          if (id.includes(&quot;node_modules&quot;)) {
           const arr = id.toString().split(&quot;node_modules/&quot;)[1].split(&quot;/&quot;);
           switch (arr[0]) {
             case &quot;antd&quot;: // 自然框架
             case &quot;react&quot;:
             case &quot;react-dom&quot;:
             case &quot;react-router-dom&quot;: // UI 库
           
               return &quot;_&quot; + arr[0];
               break;
             default:
               return &quot;__vendor&quot;;
               break;
           }
          }
        },
        
      },
    },

 
  },
});

</code></pre><h3 id="另一种code-split的方法-根据package-json中的dependencies" tabindex="-1"><a class="header-anchor" href="#另一种code-split的方法-根据package-json中的dependencies"><span>另一种code split的方法(根据package.json中的dependencies)</span></a></h3><pre><code class="language-ts">import { defineConfig } from &#39;vite&#39;
import react from &#39;@vitejs/plugin-react&#39;
const dev=process.env.NODE_ENV===&#39;development&#39;
import { dependencies } from &quot;./package.json&quot;;
const globalVendorPackages = [&quot;react&quot;, &quot;react-dom&quot;, &quot;react-router-dom&quot;];

function renderChunks(deps: Record&lt;string, string&gt;) {
  let chunks = {};
  Object.keys(deps).forEach((key) =&gt; {
    if (globalVendorPackages.includes(key)) return;
    chunks[key.replace(&#39;/&#39;, &#39;_&#39;).replace(&#39;@&#39;, &#39;_&#39;)] = [key];
  });
  return chunks;
}
 
export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: dev ? [] : [&quot;console&quot;, &quot;debugger&quot;],
  },
  build: {
    target: &quot;es2020&quot;,
     
    rollupOptions: {
      output: {
        chunkFileNames: &quot;js/[name]-[hash].js&quot;, // 引入文件名的名称
        entryFileNames: &quot;js/[name]-[hash].js&quot;, // 包的入口文件名称
        assetFileNames: &quot;[ext]/[name]-[hash].[ext]&quot;, // 资源文件像 字体，图片等
        manualChunks : {
          vendor: globalVendorPackages,
          ...renderChunks(dependencies),
        },
        
      },
    },

 
  },
})

</code></pre><p>还有一种简单的方法</p><pre><code class="language-ts">  build:{
     rollupOptions: {
            output:{
                manualChunks(id) {
                    if (id.includes(&#39;node_modules&#39;)) {
                        return id.toString().split(&#39;node_modules/&#39;)[1].split(&#39;/&#39;)[0].toString();
                    }
                }
            }
        }
  },
</code></pre><h2 id="vite配置" tabindex="-1"><a class="header-anchor" href="#vite配置"><span>vite配置</span></a></h2><pre><code class="language-ts">
// vite.config.js
import { defineConfig } from &#39;vite&#39;
import { createHtmlPlugin } from &#39;vite-plugin-html&#39;
import viteImagemin from &#39;vite-plugin-imagemin&#39;
import externalGlobals from &#39;rollup-plugin-external-globals&#39;
import { visualizer } from &#39;rollup-plugin-visualizer&#39;
import viteCompression from &#39;vite-plugin-compression&#39;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    visualizer({ open: true }),
    // 将下面的添加到plugin下
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          vuescript: &#39;&lt;script src=&quot;https://cdn.jsdelivr.net/npm/vue@3.2.25&quot;&gt;&lt;/script&gt;&#39;,
          demiScript: &#39;&lt;script src=&quot;//cdn.jsdelivr.net/npm/vue-demi@0.13.7&quot;&gt;&lt;/script&gt;&#39;,
          elementPlusScript: \`
            &lt;link href=&quot;https://cdn.jsdelivr.net/npm/element-plus@2.2.22/dist/index.min.css&quot; rel=&quot;stylesheet&quot;&gt;
            &lt;script src=&quot;https://cdn.jsdelivr.net/npm/element-plus@2.2.22/dist/index.full.min.js&quot;&gt;&lt;/script&gt;
          \`,
          echartsSciprt: &#39;&lt;script src=&quot;https://cdn.jsdelivr.net/npm/echarts@5.0.2/dist/echarts.min.js&quot;&gt;&lt;/script&gt;&#39;
        }
      }
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 20
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: &#39;removeViewBox&#39;
          },
          {
            name: &#39;removeEmptyAttrs&#39;,
            active: false
          }
        ]
      }
    })
  ],
  build: {
    target: &#39;es2020&#39;,
    minify: &#39;terser&#39;,
    // rollup 配置
    rollupOptions: {
      output: {
        chunkFileNames: &#39;js/[name]-[hash].js&#39;, // 引入文件名的名称
        entryFileNames: &#39;js/[name]-[hash].js&#39;, // 包的入口文件名称
        assetFileNames: &#39;[ext]/[name]-[hash].[ext]&#39;, // 资源文件像 字体，图片等
        manualChunks(id) {
          if (id.includes(&#39;node_modules&#39;)) {
            return &#39;vendor&#39;
          }
        }
      },
      //  告诉打包工具 在external配置的 都是外部依赖项  不需要打包
      external: [&#39;vue&#39;, &#39;element-plus&#39;, &#39;echarts&#39;],
      plugins: [
        externalGlobals({
          vue: &#39;Vue&#39;,
          &#39;element-plus&#39;: &#39;ElementPlus&#39;,
          echarts: &#39;echarts&#39;,
          &#39;vue-demi&#39;: &#39;VueDemi&#39;
        }),
        viteCompression({
          verbose: true, // 是否在控制台中输出压缩结果
          disable: false,
          threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
          algorithm: &#39;gzip&#39;, // 压缩算法，可选[&#39;gzip&#39;，&#39; brotliccompress &#39;，&#39;deflate &#39;，&#39;deflateRaw&#39;]
          ext: &#39;.gz&#39;,
          deleteOriginFile: false // 源文件压缩后是否删除
        })
      ]
    },
    terserOptions: {
      compress: {
        // 生产环境时移除console
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
</code></pre><h2 id="使用cdn实例" tabindex="-1"><a class="header-anchor" href="#使用cdn实例"><span>使用cdn实例</span></a></h2><pre><code class="language-ts">
import { defineConfig } from &#39;vite&#39;
import react from &#39;@vitejs/plugin-react&#39;
import path from &#39;node:path&#39;
import { dependencies } from &quot;./package.json&quot;;
import { vitePluginForArco } from &quot;@arco-plugins/vite-react&quot;;
import {cdn} from &#39;vite-plugin-cdn2&#39;
import {unpkg} from &#39;vite-plugin-cdn2/url.js&#39;
const globalVendorPackages = [  ]; //[&#39;react&#39;, &#39;react-dom&#39;, &#39;react-router-dom&#39;]
const externalPackages = [
  &quot;react&quot;,
  &quot;react-dom&quot;,
  &quot;axios&quot;,
  
];
function renderChunks(deps: Record&lt;string, string&gt;) {
  let chunks = {};
  Object.keys(deps).forEach((key) =&gt; {
    if (globalVendorPackages.includes(key)) return;
    if (externalPackages.includes(key)) return;
    chunks[key.replace(&quot;/&quot;, &quot;_&quot;).replace(&quot;@&quot;, &quot;_&quot;)] = [key];
  });
  return chunks;
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginForArco({
      style: &quot;css&quot;,
    }),
    cdn({
       url: unpkg,
      modules: externalPackages,

      resolve(baseURL, { name, version, relativeModule }) {
        
        if(name==&#39;axios&#39;){
          return &quot;https://unpkg.com/axios@1.6.0/dist/axios.min.js&quot;;
        }
        else {
          const ur = new URL(
            \`\${name}/\${version}/\${path.basename(relativeModule)}\`,
            baseURL
          ).href;
          console.log(ur);
          return ur;
        }
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: externalPackages,
      output: {
        chunkFileNames: &quot;js/[name].js&quot;, // 引入文件名的名称
        entryFileNames: &quot;js/[name].js&quot;, // 包的入口文件名称
        assetFileNames: &quot;[ext]/[name].[ext]&quot;, // 资源文件像 字体，图片等
        manualChunks: {
          vendor: globalVendorPackages,
          ...renderChunks(dependencies),
        },
      },
    },
  },
});

</code></pre><p><a href="https://github.com/antfu/vite-plugin-inspect" target="_blank" rel="noopener noreferrer">https://github.com/antfu/vite-plugin-inspect</a></p>`,19),r=[i];function a(l,u){return t(),n("div",null,r)}const d=e(s,[["render",a],["__file","vite-configs.html.vue"]]),p=JSON.parse('{"path":"/frontend/framework/packaging-tool/vite-tutor/vite-configs.html","title":"vite.config.js","lang":"zh-CN","frontmatter":{"description":"vite.config.js 提示 vite官网说的很不错了 https://vitejs.dev/ import.meta.glob 为过动态导入，构建时，会分离为独立的 chunk 打包分离js和css 只是分离vendor和文件路径 code split 另一种code split的方法(根据package.json中的dependencies)...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/packaging-tool/vite-tutor/vite-configs.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"vite.config.js"}],["meta",{"property":"og:description","content":"vite.config.js 提示 vite官网说的很不错了 https://vitejs.dev/ import.meta.glob 为过动态导入，构建时，会分离为独立的 chunk 打包分离js和css 只是分离vendor和文件路径 code split 另一种code split的方法(根据package.json中的dependencies)..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-20T15:42:17.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-04-20T15:42:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vite.config.js\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-20T15:42:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"打包分离js和css","slug":"打包分离js和css","link":"#打包分离js和css","children":[{"level":3,"title":"只是分离vendor和文件路径","slug":"只是分离vendor和文件路径","link":"#只是分离vendor和文件路径","children":[]},{"level":3,"title":"code split","slug":"code-split","link":"#code-split","children":[]},{"level":3,"title":"另一种code split的方法(根据package.json中的dependencies)","slug":"另一种code-split的方法-根据package-json中的dependencies","link":"#另一种code-split的方法-根据package-json中的dependencies","children":[]}]},{"level":2,"title":"vite配置","slug":"vite配置","link":"#vite配置","children":[]},{"level":2,"title":"使用cdn实例","slug":"使用cdn实例","link":"#使用cdn实例","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1713627737000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":3.76,"words":1129},"filePathRelative":"frontend/framework/packaging-tool/vite-tutor/vite-configs.md","localizedDate":"2023年6月25日","autoDesc":true}');export{d as comp,p as data};
