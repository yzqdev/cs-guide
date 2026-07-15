# Astro 常见问题与技巧

## 安装依赖失败

### sharp 安装失败

```bash
npm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
npm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
```

### 集成安装失败

使用 npmmirror 加速：

```bash
npm config set registry https://registry.npmmirror.com
```

## 使用 Tailwind CSS

```bash
npx astro add tailwind
```

```astro
---
---

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <h1 class="text-4xl font-bold text-blue-500">Hello Astro + Tailwind!</h1>
</div>
```

## 字体优化

```astro
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
</head>
```

## 构建时内存不足

```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## 部署到 Vercel/Netlify 空白页

确保在 `astro.config.mjs` 中设置了正确的 `site` 地址。

## 使用 `client:load` 后组件不工作

检查是否安装了对应的框架集成：

```bash
npx astro add react
npx astro add vue
npx astro add svelte
```

## 参考

- [Astro 配置参考](https://docs.astro.build/en/reference/configuration-reference/)