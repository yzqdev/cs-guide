# Astro 组件与 Islands

## `.astro` 组件

```astro
---
// 组件脚本（在服务端执行）
import Header from '../components/Header.astro';
const title = 'Hello Astro';
const items = [1, 2, 3];
---

<!-- 组件模板 -->
<html>
  <head><title>{title}</title></head>
  <body>
    <Header />
    <h1>{title}</h1>
    <ul>
      {items.map(item => <li>{item}</li>)}
    </ul>
  </body>
</html>

<style>
  /* 组件样式（默认 scoped） */
  h1 { color: red; }
</style>

<script>
  // 客户端脚本（会被打包到浏览器）
  document.querySelector('h1')?.addEventListener('click', () => {
    alert('Hello!');
  });
</script>
```

## Islands 架构（交互式组件）

默认情况下，Astro 组件在构建时渲染为静态 HTML。要让组件具有交互性，需要使用客户端指令：

```astro
---
import ReactCounter from '../components/ReactCounter.jsx';
import VueCounter from '../components/VueCounter.vue';
---

<!-- 只在页面可见时加载 -->
<ReactCounter client:visible />

<!-- 页面加载后立即加载 -->
<VueCounter client:load />

<!-- 空闲时加载 -->
<ReactCounter client:idle />

<!-- 悬停时才加载 -->
<ReactCounter client:hover />

<!-- 媒体查询满足时加载 -->
<ReactCounter client:media="(max-width: 768px)" />

<!-- 只在客户端渲染（SSR 跳过） -->
<ReactCounter client:only="react" />
```

## 集成其他框架

```bash
npx astro add react
npx astro add vue
npx astro add svelte
npx astro add solid
```

```astro
---
import ReactCounter from '../components/ReactCounter.jsx';
import VueCounter from '../components/VueCounter.vue';
import SvelteCounter from '../components/SvelteCounter.svelte';
---

<ReactCounter client:load />
<VueCounter client:visible />
<SvelteCounter client:idle />
```

## 布局组件

```astro
---
// src/layouts/BaseLayout.astro
export interface Props {
  title: string;
  description?: string;
}
const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <slot />  <!-- 子内容会插入到这里 -->
  </body>
</html>
```

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Home" description="Welcome">
  <h1>Hello World</h1>
  <p>This is my Astro site!</p>
</BaseLayout>
```

## 参考

- [Astro 组件文档](https://docs.astro.build/en/core-concepts/astro-components/)
- [Astro Islands](https://docs.astro.build/en/concepts/islands/)