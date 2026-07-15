# Vite 插件

## 官方插件

### @vitejs/plugin-vue-jsx

支持 Vue 3 中使用 JSX/TSX：

```bash
npm i @vitejs/plugin-vue-jsx -D
```

```ts
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vueJsx()],
});
```

## 常用插件

### 样式按需引入

```bash
npm i vite-plugin-style-import -D
```

```ts
import styleImport from 'vite-plugin-style-import';

export default defineConfig({
  plugins: [
    styleImport({
      libs: [{
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => `ant-design-vue/es/${name}/style/css`,
      }],
    }),
  ],
});
```

### 图片压缩

```bash
npm i vite-plugin-imagemin -D
```

```ts
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 65 },
      pngquant: { quality: [0.65, 0.9], speed: 4 },
      svgo: {
        plugins: [
          { removeViewBox: false },
          { removeEmptyAttrs: false },
        ],
      },
    }),
  ],
});
```

### Gzip 压缩

```bash
npm i vite-plugin-compression -D
```

```ts
import compressPlugin from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    compressPlugin({
      ext: '.gz',              // 或 .br
      algorithm: 'gzip',       // 或 brotliCompress
      deleteOriginFile: false, // 是否删除源文件
      threshold: 10240,        // 大于 10KB 才压缩
    }),
  ],
});
```

### HTML 注入

```bash
npm i vite-plugin-html -D
```

```ts
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      entry: 'src/main.ts',
      inject: {
        data: {
          title: 'My App',
          injectScript: `<script src="./inject.js"></script>`,
        },
      },
    }),
  ],
});
```

### 包分析

```bash
npm i rollup-plugin-visualizer -D
```

```ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({ open: true, gzipSize: true, brotliSize: true }),
  ],
});
```

### 使用 CDN 替换依赖

```bash
npm i vite-plugin-cdn2 -D
```

```ts
import { cdn } from 'vite-plugin-cdn2';

export default defineConfig({
  plugins: [
    cdn({
      modules: ['react', 'react-dom'],
    }),
  ],
});
```

### 调试工具

[vite-plugin-inspect](https://github.com/antfu/vite-plugin-inspect) - 查看 Vite 插件转换过程

```bash
npm i vite-plugin-inspect -D
```

## 参考

- [Awesome Vite](https://github.com/vitejs/awesome-vite) - Vite 插件合集
- [Vite 插件市场](https://vite.dev/plugins/)