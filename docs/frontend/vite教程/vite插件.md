# vite插件

1. @vitejs/plugin-vue-js 用于jsx tsx

```javascript
npm i @vitejs/plugin-vue-jsx -d
import vueJsx from '@vitejs/plugin-vue-jsx'
plugins: [vueJsx()]
```

2. vite-plugin-style-import 第三方包样式按需引入

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

3.rollup-plugin-terser 打包 压缩js代码 清除console.log

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

4.vite-plugin-imagemin 打包压缩图片

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

5.vite-plugin-compression 开启gzip、br压缩

```javascript
npm i -d vite-plugin-compression
import compressPlugin from 'vite-plugin-compression'
 plugins[
      compressPlugin({
        ext: '.gz',//gz br
        algorithm: 'gzip', //brotliCompress gzip
        deleteOriginFile:true
     })
```
