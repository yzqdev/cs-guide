# Vite 快速开始

## 简介

Vite 是一个基于 ES Module 的下一代前端构建工具，由 Vue 作者尤雨溪开发。它利用浏览器原生 ESM 实现极速开发服务器启动，使用 Rollup 进行生产构建。

### 核心特性

- ⚡ **极速冷启动** - 基于 ESM，无需打包即可开发
- 🔥 **热模块替换** - 模块级热更新，速度极快
- 🛠 **TypeScript 原生支持** - 内置 TS 支持，无需额外配置
- 📦 **Rollup 构建** - 生产环境使用 Rollup，支持代码分割
- 🧩 **丰富的插件生态** - 兼容 Rollup 插件

## 创建项目

```bash
npm create vite@latest my-app
# 选择框架：Vue / React / Svelte / Solid / Lit / Vanilla
cd my-app
npm install
npm run dev
```

## 项目结构

```
my-app/
├── index.html            # 入口 HTML（非模板，直接使用）
├── vite.config.ts        # Vite 配置
├── src/
│   ├── main.ts           # 入口 JS
│   ├── App.vue           # 根组件
│   └── components/       # 组件
├── public/               # 静态资源
└── package.json
```

## 常用命令

```bash
npm run dev        # 启动开发服务器
npm run build      # 构建生产版本
npm run preview    # 预览构建结果
```

## 配置文件

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],

  // 路径别名
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
    ],
  },

  // 开发服务器
  server: {
    port: 3000,
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },

  // 构建配置
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false,
    // 移除 console/debugger
    esbuild: {
      drop: ['console', 'debugger'],
    },
  },
});
```

## 参考

- [Vite 官方文档](https://vitejs.dev/)
- [Vite 中文文档](https://cn.vitejs.dev/)