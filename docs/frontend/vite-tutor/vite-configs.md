# vite.config.js

:::tip

vite官网说的很不错了

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
