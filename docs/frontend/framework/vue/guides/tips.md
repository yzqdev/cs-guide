# Vue 开发技巧与常见问题

## 环境配置

### Vite 配置

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
});
```

### 使用装饰器

```bash
npm install @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D
```

```ts
// vite.config.ts
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: true }],
        ],
      },
    }),
  ],
});
```

### 图片导入

```ts
// 方式一：直接导入
import viteImg from '@/assets/vite.svg';
<img src={viteImg} />;

// 方式二：动态 URL
function getImageUrl(url: string) {
  return new URL(url, import.meta.url).href;
}
<img src={getImageUrl('../../assets/react.svg')} />;

// 方式三：统一导出
// assets/index.ts
export { default as reactSvg } from './react.svg';
// 使用
import * as svgAssets from '@/assets/index';
<img src={svgAssets.reactSvg} />;
```

## Vue 3 常见问题

### 使用 Vite 出现 `URI malformed`

删掉 HTML 中的：

```html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

### 响应式对象属性为数组

```vue
<script setup>
import { reactive } from 'vue';

const arr = reactive({ list: [] });

function change() {
  arr.list = [1, 2, 3]; // 直接赋值即可
}
</script>
```

### 组件作为 JSX 使用时类型错误

如果遇到 `"xxxx" cannot be used as a JSX component`，通常是 `@types/react` 和 `@types/react-dom` 版本不匹配，重新安装即可：

```bash
npm install @types/react@latest @types/react-dom@latest
```

### `global is not defined`

在 `vite.config.ts` 中添加：

```ts
define: { global: 'window' },
```

## Vue 3 与 TypeScript

### 项目配置

```json
{
  "scripts": {
    "preview": "vite preview",
    "build-only": "vite build",
    "type-check": "vue-tsc --noEmit -p tsconfig.vitest.json --composite false",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "format": "prettier --write src/"
  }
}
```

### 依赖安装

```json
{
  "devDependencies": {
    "@tsconfig/node18": "^18.2.0",
    "@types/node": "^18.17.0",
    "@vitejs/plugin-vue": "^4.2.3",
    "@vue/test-utils": "^2.4.1",
    "@vue/tsconfig": "^0.4.0",
    "typescript": "^5.1.6",
    "vite": "^4.4.9",
    "vitest": "^0.33.0",
    "vue-tsc": "^1.8.8"
  }
}
```

### tsconfig 配置

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.vitest.json" }
  ]
}
```

## CSS 方案

### CSS-in-JS（Emotion + Vite）

```bash
yarn add @emotion/react
yarn add -D @emotion/babel-plugin
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: { plugins: ['@emotion/babel-plugin'] },
    }),
  ],
});
```

```json
// tsconfig.json
{ "compilerOptions": { "jsxImportSource": "@emotion/react" } }
```

### 其他 CSS 方案

- [styled-components](https://styled-components.com/)
- [CSS Modules](https://github.com/css-modules/css-modules) - Vite/Webpack 原生支持
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS
- [UnoCSS](https://unocss.dev/) - 即时原子化 CSS 引擎
- [Panda CSS](https://panda-css.com/) - 类型安全的 CSS-in-JS

## 参考

- [Vue 3 官方文档](https://vuejs.org/)
- [Vue 3 中文文档](https://cn.vuejs.org/)
- [Vue 3 迁移指南](https://v3-migration.vuejs.org/)