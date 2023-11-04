# vite.config.js

:::tip

vite官网说的很不错了
<https://vitejs.dev/>
:::

```js
const resolve = path.resolve;
import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import path from "path";
export default defineConfig({
  plugins: [vue()],

  resolve: {
    //导入时想要省略的扩展名列表。注意，不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会干扰 IDE 和类型支持。
    alias: [
      { find: "@", replacement: resolve(__dirname, "./src") },
      { find: "@views", replacement: resolve(__dirname, "./src/views") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      { find: "@utils", replacement: path.resolve(__dirname, "./src/utils") },
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

```

import.meta.glob 为过动态导入，构建时，会分离为独立的 chunk

```js


const files = import.meta.glob('./module/*.js')

const modules = {}
for (const key in files) {
    files[key]().then(res=>{
        modules[key.replace(/(\.\/module\/|\.js)/g, '')] = res.default
    })
}

Object.keys(modules).forEach(item => {
    modules[item]['namespaced'] = true
})

//import.meta.globEager 为直接引入

const files = import.meta.globEager('./module/*.js')

const modules = {}
for (const key in files) {
    modules[key.replace(/(\.\/module\/|\.js)/g, '')] = files[key].default
}

Object.keys(modules).forEach(item => {
    modules[item]['namespaced'] = true
})
```

## 打包分离js和css

### 只是分离vendor和文件路径

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    
    target: "es2020",
    // minify: "terser",
    // rollup 配置
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js", // 引入文件名的名称
        entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
        assetFileNames: "[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
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

```

### code split

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const dev=process.env.NODE_ENV==='development'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: dev ? [] : ["console", "debugger"],
  },
  build: {
    target: "es2020",
     
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js", // 引入文件名的名称
        entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
        assetFileNames: "[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
        manualChunks(id) {
          if (id.includes("node_modules")) {
           const arr = id.toString().split("node_modules/")[1].split("/");
           switch (arr[0]) {
             case "antd": // 自然框架
             case "react":
             case "react-dom":
             case "react-router-dom": // UI 库
           
               return "_" + arr[0];
               break;
             default:
               return "__vendor";
               break;
           }
          }
        },
        
      },
    },

 
  },
});

```

### 另一种code split的方法(根据package.json中的dependencies)

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const dev=process.env.NODE_ENV==='development'
import { dependencies } from "./package.json";
const globalVendorPackages = ["react", "react-dom", "react-router-dom"];

function renderChunks(deps: Record<string, string>) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (globalVendorPackages.includes(key)) return;
    chunks[key.replace('/', '_').replace('@', '_')] = [key];
  });
  return chunks;
}
 
export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: dev ? [] : ["console", "debugger"],
  },
  build: {
    target: "es2020",
     
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js", // 引入文件名的名称
        entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
        assetFileNames: "[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
        manualChunks : {
          vendor: globalVendorPackages,
          ...renderChunks(dependencies),
        },
        
      },
    },

 
  },
})

```

## vite配置

```ts

// vite.config.js
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteImagemin from 'vite-plugin-imagemin'
import externalGlobals from 'rollup-plugin-external-globals'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    visualizer({ open: true }),
    // 将下面的添加到plugin下
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          vuescript: '<script src="https://cdn.jsdelivr.net/npm/vue@3.2.25"></script>',
          demiScript: '<script src="//cdn.jsdelivr.net/npm/vue-demi@0.13.7"></script>',
          elementPlusScript: `
            <link href="https://cdn.jsdelivr.net/npm/element-plus@2.2.22/dist/index.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/element-plus@2.2.22/dist/index.full.min.js"></script>
          `,
          echartsSciprt: '<script src="https://cdn.jsdelivr.net/npm/echarts@5.0.2/dist/echarts.min.js"></script>'
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
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ],
  build: {
    target: 'es2020',
    minify: 'terser',
    // rollup 配置
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      },
      //  告诉打包工具 在external配置的 都是外部依赖项  不需要打包
      external: ['vue', 'element-plus', 'echarts'],
      plugins: [
        externalGlobals({
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          echarts: 'echarts',
          'vue-demi': 'VueDemi'
        }),
        viteCompression({
          verbose: true, // 是否在控制台中输出压缩结果
          disable: false,
          threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
          algorithm: 'gzip', // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
          ext: '.gz',
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
```

## 使用cdn实例

```ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { dependencies } from "./package.json";
import { vitePluginForArco } from "@arco-plugins/vite-react";
import {cdn} from 'vite-plugin-cdn2'
import {unpkg} from 'vite-plugin-cdn2/url.js'
const globalVendorPackages = [  ]; //['react', 'react-dom', 'react-router-dom']
const externalPackages = [
  "react",
  "react-dom",
  "axios",
  
];
function renderChunks(deps: Record<string, string>) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (globalVendorPackages.includes(key)) return;
    if (externalPackages.includes(key)) return;
    chunks[key.replace("/", "_").replace("@", "_")] = [key];
  });
  return chunks;
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginForArco({
      style: "css",
    }),
    cdn({
       url: unpkg,
      modules: externalPackages,

      resolve(baseURL, { name, version, relativeModule }) {
        
        if(name=='axios'){
          return "https://unpkg.com/axios@1.6.0/dist/axios.min.js";
        }
        else {
          const ur = new URL(
            `${name}/${version}/${path.basename(relativeModule)}`,
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
        chunkFileNames: "js/[name].js", // 引入文件名的名称
        entryFileNames: "js/[name].js", // 包的入口文件名称
        assetFileNames: "[ext]/[name].[ext]", // 资源文件像 字体，图片等
        manualChunks: {
          vendor: globalVendorPackages,
          ...renderChunks(dependencies),
        },
      },
    },
  },
});

```

<https://github.com/antfu/vite-plugin-inspect>
