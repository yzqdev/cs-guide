# Vite 构建配置

## 代码分割

### 基础分离 vendor 和文件路径

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
```

### 按框架拆分

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const arr = id.toString().split('node_modules/')[1].split('/');
            switch (arr[0]) {
              case 'antd':
              case 'react':
              case 'react-dom':
              case 'react-router-dom':
                return '_' + arr[0];
              default:
                return '__vendor';
            }
          }
        },
      },
    },
  },
});
```

### 根据 package.json 拆分

```ts
import { defineConfig } from 'vite';
import { dependencies } from './package.json';

const globalVendorPackages = ['react', 'react-dom', 'react-router-dom'];

function renderChunks(deps: Record<string, string>) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (globalVendorPackages.includes(key)) return;
    chunks[key.replace('/', '_').replace('@', '_')] = [key];
  });
  return chunks;
}

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: globalVendorPackages,
          ...renderChunks(dependencies),
        },
      },
    },
  },
});
```

## 使用 CDN 优化

```ts
import { defineConfig } from 'vite';
import { cdn } from 'vite-plugin-cdn2';
import { unpkg } from 'vite-plugin-cdn2/url.js';

const externalPackages = ['react', 'react-dom', 'axios'];

export default defineConfig({
  plugins: [
    cdn({
      url: unpkg,
      modules: externalPackages,
      resolve(baseURL, { name, version, relativeModule }) {
        if (name === 'axios') {
          return 'https://unpkg.com/axios@1.6.0/dist/axios.min.js';
        }
        const url = new URL(`${name}/${version}/${relativeModule}`, baseURL).href;
        return url;
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: externalPackages,
    },
  },
});
```

## 使用 `import.meta.glob`

```ts
// 动态导入（构建时分离为独立 chunk）
const files = import.meta.glob('./module/*.js');

const modules = {};
for (const key in files) {
  files[key]().then(res => {
    modules[key.replace(/(\.\/module\/|\.js)/g, '')] = res.default;
  });
}

// 直接导入（同步）
const files = import.meta.globEager('./module/*.js');
// 或 import.meta.glob('./module/*.js', { eager: true })
```

## 环境变量

```ts
// .env 文件
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My App

// 在代码中使用
const apiUrl = import.meta.env.VITE_API_URL;
const title = import.meta.env.VITE_APP_TITLE;

// 类型定义
// src/env.d.ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
}
```

## 参考

- [Vite 构建配置](https://cn.vitejs.dev/config/build-options.html)
- [Vite 环境变量](https://cn.vitejs.dev/guide/env-and-mode.html)