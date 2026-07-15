# Astro SSR 与部署

## SSR 配置

### 基本配置

```js
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

export default defineConfig({
  site: "https://example.com",
  output: "hybrid",  // hybrid 模式：部分页面 SSR，部分 SSG
  adapter: node({ mode: "standalone" }),
  integrations: [mdx(), sitemap()],
  server: { port: 8455, host: "0.0.0.0" },
});
```

### SSR 与 SSG 区别

对于需要 SSR 的页面：

```
export const prerender = false;
```

且不能使用 `getStaticPaths()`（SSG 专用）。

### 部署

```bash
npm run build
node ./dist/server/entry.mjs
```

## 环境变量

```astro
---
// 公开环境变量（以 PUBLIC_ 开头）
const apiUrl = import.meta.env.PUBLIC_API_URL;
const siteUrl = import.meta.env.SITE;
---

<script>
  // 客户端也可以访问 PUBLIC_ 开头的环境变量
  console.log(import.meta.env.PUBLIC_API_URL);
</script>
```

## 图片优化

```bash
npm install @astrojs/image
```

```astro
---
import { Image } from '@astrojs/image/components';
import logo from '../assets/logo.png';
---

<Image src={logo} alt="Logo" width={200} height={100} format="webp" />
<Image src={logo} alt="Logo" widths={[200, 400, 800]} sizes="(max-width: 800px) 100vw, 800px" />
```

## 添加 RSS

```astro
---
// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'My Blog',
    description: 'A blog about...',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  });
}
```

## 视图过渡

```astro
---
// Astro 2.9+ 支持视图过渡
---

<html lang="zh-CN">
  <head>
    <meta name="astro-view-transitions" content="enabled" />
  </head>
  <body>
    <a href="/about">About</a>
    <slot />
  </body>
</html>
```

## 参考

- [Astro 部署指南](https://docs.astro.build/en/guides/deploy/)
- [Astro SSR 指南](https://docs.astro.build/en/guides/server-side-rendering/)