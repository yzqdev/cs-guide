# Nuxt 使用技巧

## 数据获取

### SSR 数据获取

注意：使用动态数据（fetch 或 axios 请求的数据）时，使用 `onBeforeMount` 界面上无法看到数据的，也就是说动态数据无法被搜索引擎索引。

解决办法是使用内置的数据获取方法，同时不要使用 `nuxt generate`，因为 `nuxt generate` 生成的是静态 HTML，获取数据仍会使用接口，而不是服务端渲染。

```ts
<script setup lang="ts">
const { data: count } = await useFetch('/api/count');
</script>

<template>
  <p>Page visits: {{ count }}</p>
</template>
```

这种方式启动一个 Node 服务器，返回的就是完整的 HTML 而不是缺少动态数据的 HTML。不过这种方式打包出来必须使用 Node 启动：`nuxt build`。

### Astro 同理

Nuxt 的 SSR 数据获取方式与 Astro 类似，都需要在服务端获取数据。

## 环境变量

```ts
// 使用运行时配置
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'https://api.example.com',
    },
  },
});

// 在组件中使用
const config = useRuntimeConfig();
console.log(config.public.apiBase);
```

## 参考

- [Nuxt 官方文档](https://nuxt.com/docs)
- [Nuxt 数据获取](https://nuxt.com/docs/getting-started/data-fetching)