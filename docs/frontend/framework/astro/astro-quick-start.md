# Astro 快速开始

## 创建项目

```bash
# 使用 CLI
npm create astro@latest
cd my-astro
npm run dev
```

## 项目结构

```
my-astro/
├── src/
│   ├── components/     # 组件（.astro / .jsx / .vue / .svelte）
│   ├── layouts/        # 布局组件
│   ├── pages/          # 页面路由（基于文件系统）
│   │   ├── index.astro
│   │   └── blog/
│   │       └── [slug].astro
│   └── content/        # 内容集合（Markdown/MDX）
│       └── blog/
│           └── post-1.md
├── public/             # 静态资源
├── astro.config.mjs    # Astro 配置
└── package.json
```

## 常用命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览构建结果
```

## 配置

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vue from '@astrojs/vue';

export default defineConfig({
  site: 'https://example.com',
  output: 'static',       // 'static' | 'server' | 'hybrid'
  integrations: [react(), vue(), mdx(), sitemap(), tailwind()],
  server: { port: 3000 },
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
```

## 部署

### 静态部署

```bash
npm run build  # 生成 dist/ 目录
```

可部署到：Vercel、Netlify、Cloudflare Pages、GitHub Pages、S3 等

### SSR 部署

需要添加适配器：

```bash
npm install @astrojs/node
```

```js
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
```

## 参考

- [Astro 官方文档](https://docs.astro.build/)
- [Astro 中文文档](https://docs.astro.build/zh-cn/)
- [Astro 集成](https://astro.build/integrations/)