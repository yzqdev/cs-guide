# Astro 路由与数据获取

## 页面路由

Astro 使用基于文件系统的路由：

```
src/pages/
├── index.astro          # /
├── about.astro          # /about
├── blog/
│   ├── index.astro      # /blog
│   └── [slug].astro     # /blog/post-1, /blog/post-2
└── tags/
    └── [tag].astro      # /tags/astro, /tags/react
```

## 动态路由

```astro
---
// src/pages/blog/[slug].astro
export async function getStaticPaths() {
  // 静态生成时获取所有路径
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
---

<h1>{post.title}</h1>
<article>{post.content}</article>
```

## 内容集合

```astro
---
// src/pages/blog/[...slug].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<article>
  <h1>{post.data.title}</h1>
  <p>{post.data.description}</p>
  <Content />
</article>
```

## 数据获取

```astro
---
// 使用 fetch API（SSG 构建时获取，SSR 运行时获取）
const response = await fetch('https://api.github.com/repos/withastro/astro');
const data = await response.json();
---
<p>Stars: {data.stargazers_count}</p>
```

## 自定义 404 页面

```astro
---
// src/pages/404.astro
---

<main>
  <h1>404 - Page Not Found</h1>
  <a href="/">Go Home</a>
</main>
```

## 参考

- [Astro 路由文档](https://docs.astro.build/en/core-concepts/astro-pages/)
- [Astro 内容集合](https://docs.astro.build/en/guides/content-collections/)