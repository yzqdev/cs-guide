# vite插件

## @vitejs/plugin-vue-js 用于jsx tsx

```javascript
npm i @vitejs/plugin-vue-jsx -d
import vueJsx from '@vitejs/plugin-vue-jsx'
plugins: [vueJsx()]
```

## vite-plugin-style-import 第三方包样式按需引入

```javascript
npm i vite-plugin-style-import -d
import styleImport from 'vite-plugin-style-import'
 plugins: [
        styleImport({
        libs: [{
          libraryName: 'ant-design-vue',
           esModule: true,
           resolveStyle: (name) => {
            return`ant-design-vue/es/${name}/style/css`;
          },
        }]
      })
    ]
```

## rollup-plugin-terser 打包 压缩js代码 清除console.log

```javascript
npm i -d rollup-plugin-terser
import { terser } from "rollup-plugin-terser"
 plugins: [
      visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
     })
    ]
```

## vite-plugin-imagemin 打包压缩图片

```javascript
npm i -d vite-plugin-imagemin
import viteImagemin from 'vite-plugin-imagemin'
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
```

## vite-plugin-compression 开启gzip、br压缩

[https://github.com/vbenjs/vite-plugin-compression](https://github.com/vbenjs/vite-plugin-compression)

```javascript
 
import compressPlugin from 'vite-plugin-compression'
 plugins[
      compressPlugin({
        ext: '.gz',//gz br
        algorithm: 'gzip', //brotliCompress gzip
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
```

## vite-plugin-html

在index.html插入想要的东西

```html

<head>
  <meta charset="UTF-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><%- title %></title>
  <%- injectScript %>
</head>

```

```js
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      /**
       * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
       * @default src/main.ts
       */
      entry: 'src/main.ts',
      /**
       * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
       * @default index.html
       */
      template: 'public/index.html',
      /**
       * 需要注入 index.html ejs 模版的数据
       */
      inject: {
        data: {
          title: 'index',
          injectScript: `<script src="./inject.js"></script>`,
        },
      },
    }),
  ],
})

```
