# astro

<Catalog   />

## 简介

Astro 是一个现代化的静态网站生成器（SSG），也可以作为服务端渲染（SSR）框架使用。它的核心特点是 **Islands 架构** —— 默认输出零 JavaScript 的静态 HTML，只在需要交互的地方加载对应框架（React/Vue/Svelte 等）的 JS。

### 核心特性

- 🚀 **零 JS 默认** - 页面默认只输出纯 HTML/CSS，速度极快
- 🏝 **Islands 架构** - 只对需要交互的组件加载 JS
- 🔧 **多框架支持** - 同一页面可混用 React/Vue/Svelte/Solid 等组件
- 📦 **按需加载** - JavaScript 自动按需分包
- 🔗 **Markdown/MDX 支持** - 内置内容集合和博客支持

## 文档导航

### 📖 基础教程

| 文档 | 说明 |
|------|------|
| [快速开始](./astro-quick-start.md) | 环境搭建、项目结构、配置、部署 |
| [组件与 Islands](./astro-components.md) | Astro 组件、交互指令、集成框架、布局 |
| [路由与数据获取](./astro-routing.md) | 页面路由、动态路由、内容集合、数据获取 |
| [SSR 与部署](./astro-ssr.md) | SSR 配置、环境变量、图片优化、RSS |
| [常见问题与技巧](./astro-tips.md) | 安装问题、Tailwind、字体优化 |

## 参考

- [Astro 官方文档](https://docs.astro.build/)
- [Astro 中文文档](https://docs.astro.build/zh-cn/)
- [Astro 集成](https://astro.build/integrations/)