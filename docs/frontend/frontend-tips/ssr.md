# SSR 部署指南

## Astro 部署

Astro 支持三种输出模式：

| 模式 | output 配置 | 说明 | 部署方式 |
|---|---|---|---|
| **SSG** | `static` | 纯静态 HTML | `astro build` → nginx 代理 dist 目录 |
| **Hybrid** | `hybrid` | 静态 + 动态混合 | 动态页面设 `prerender = false` → `node dist/server/entry.mjs` |
| **SSR** | `server` | 纯服务端渲染 | `astro build` → `node dist/server/entry.mjs` |

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'hybrid' // 'static' | 'hybrid' | 'server'
});
```

::: tip
SSG 模式下动态路由必须使用 `getStaticPaths()`。
:::

## Nuxt 部署

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true // true = SSR, false = SPA
});
```

| 命令 | 模式 | 部署方式 |
|---|---|---|
| `nuxt build` | SSR | `node .output/server/index.mjs` |
| `nuxt generate` | SSG | HTML 文件用 nginx 代理 |

::: warning
SSR 模式下不要在 `onBeforeMounted` 中请求数据，应使用 Nuxt 的 [数据获取方法](https://nuxt.com/docs/getting-started/data-fetching)。
:::

## Next.js 部署

### 方式一：Standalone（推荐）

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  assetPrefix: '/',
  reactStrictMode: true,
};

export default nextConfig;
```

```bash
# 构建
next build

# 运行
node .next/standalone/server.js

# 复制静态资源
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
```

::: tip
服务器只需要 `standalone` 文件夹即可运行。
:::

### 方式二：Export（SSG）

```javascript
// next.config.mjs
const nextConfig = {
  output: 'export',
};
```

```bash
next build
# 输出 out/ 目录，用 nginx 代理即可
```

### 方式三：传统模式

不配置 `output`：

```bash
next build
next start
```

## 部署对比

| 框架 | SSR 命令 | SSG 命令 | 推荐方式 |
|---|---|---|---|
| Astro | `astro build` + node | `astro build` | Hybrid |
| Nuxt | `nuxt build` + node | `nuxt generate` | 按需选择 |
| Next | `next build` + `next start` | `next build` (export) | Standalone |
