# Vite

> Vite 是一种新型前端构建工具，开发环境下利用浏览器原生 ES Module 进行极速冷启动，生产环境基于 Rollup 打包。

## 核心特性

| 特性 | 说明 |
|------|------|
| 极速启动 | 开发服务器秒级启动，无需等待打包 |
| 热更新（HMR） | 文件变动毫秒级更新，保持应用状态 |
| TypeScript 原生支持 | 开箱即用，无需额外配置 |
| CSS 预处理器 | 内置 Less / Sass / Stylus 支持 |
| 静态资源处理 | 图片、字体等自动处理为构建产物 URL |

## 快速创建项目

```bash
# 使用 npm
npm create vite@latest
# 使用 pnpm
pnpm create vite
# 指定模板
pnpm create vite my-app --template vue-ts
```

可用模板：`vanilla`, `vanilla-ts`, `vue`, `vue-ts`, `react`, `react-ts`, `svelte`, `svelte-ts`, `preact`, `preact-ts`。

## 项目结构

```
my-app/
├── index.html              # 入口 HTML（不在 public 内）
├── vite.config.ts          # Vite 配置文件
├── tsconfig.json
├── package.json
├── public/                 # 静态资源，直接复制到构建产物
│   └── favicon.ico
├── src/
│   ├── main.ts             # 应用入口
│   ├── App.vue
│   ├── style.css
│   ├── assets/             # 资源文件，会经过构建处理
│   └── components/
└── env.d.ts
```

## vite.config.ts 配置

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  // 插件
  plugins: [vue()],

  // 开发服务器
  server: {
    port: 3000,
    host: true,           // 局域网可访问
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },

  // 构建配置
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',    // 'esbuild' | 'terser'
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia']
        }
      }
    }
  },

  // 路径别名
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },

  // 环境变量前缀
  envPrefix: 'VITE_'
})
```

## 环境变量

```bash
# .env                所有环境加载
# .env.local          所有环境加载（git 忽略）
# .env.development    开发环境
# .env.production     生产环境
# .env.development.local  开发环境覆盖（git 忽略）
```

```bash
VITE_APP_TITLE=My App
VITE_API_BASE_URL=https://api.example.com
```

```ts
// 在代码中使用
console.log(import.meta.env.VITE_APP_TITLE)
console.log(import.meta.env.MODE)    // development | production
console.log(import.meta.env.DEV)     // true/false
console.log(import.meta.env.PROD)    // true/false
```

## 静态资源处理

```ts
// 导入资源文件
import logo from './assets/logo.png'
console.log(logo) // 输出构建后的 URL

// 作为字符串导入
import svgContent from './assets/icon.svg?raw'

// 作为 URL 导入
import workerUrl from './worker?worker&url'
```

CSS 中的 `url()` 和 `@import` 也支持别名和路径解析。

## 构建库/插件

```ts
// vite.config.ts - library mode
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyLib',
      formats: ['es', 'cjs', 'umd'],
      fileName: format => `my-lib.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
```

## 插件开发

```ts
// 一个简单的 Vite 插件
function myPlugin(): Plugin {
  return {
    name: 'vite:my-plugin',
    
    // 转换前钩子
    config(config) {
      return {
        define: {
          __CUSTOM__: '"hello"'
        }
      }
    },

    // 转换模块
    transform(code, id) {
      if (id.endsWith('.vue')) {
        // 对 .vue 文件做特殊处理
        return code.replace(/__VERSION__/g, '1.0.0')
      }
    }
  }
}
```

## 生产构建优化

```bash
pnpm create vite my-app --template react-ts
cd my-app
pnpm build
```

```bash
vite build

# 输出
dist/
├── index.html
├── assets/
│   ├── index.abc123.js     # 应用代码
│   ├── vendor.def456.js    # 第三方库
│   └── index.789xyz.css    # 样式
```

使用 `vite preview` 预览构建产物。

## 参考

- [Vite 官方文档](https://vitejs.dev/)
- [Awesome Vite](https://github.com/vitejs/awesome-vite)
