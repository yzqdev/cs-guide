# Svelte 快速开始

## 创建项目

### 使用 SvelteKit（推荐）

```bash
npm create svelte@latest my-app
cd my-app
npm install
npm run dev
```

### 使用 Vite

```bash
npm create vite@latest my-app -- --template svelte-ts
cd my-app
npm install
npm run dev
```

## 项目结构（SvelteKit）

```
my-app/
├── src/
│   ├── routes/          # 页面路由
│   │   ├── +page.svelte
│   │   ├── +layout.svelte
│   │   └── blog/
│   │       └── [slug]/
│   │           └── +page.svelte
│   ├── lib/             # 共享组件
│   │   ├── components/
│   │   └── stores.js
│   └── app.html
├── static/              # 静态资源
├── svelte.config.js
└── package.json
```

## 组件基础

```svelte
<!-- src/lib/Counter.svelte -->
<script>
  let count = 0;

  function increment() {
    count += 1;  // 直接赋值就会触发更新
  }
</script>

<button on:click={increment}>
  Clicked {count} times
</button>

<style>
  button {
    background: #ff3e00;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
```

## 响应式声明

```svelte
<script>
  let count = 0;

  // 使用 $: 声明响应式语句（自动追踪依赖）
  $: doubled = count * 2;
  $: console.log(`count is ${count}`);

  // 响应式语句块
  $: {
    console.log(`count changed to ${count}`);
  }

  // 响应式条件
  $: if (count >= 10) {
    console.log('count is at least 10!');
  }
</script>

<button on:click={() => count++}>
  Count: {count}, Doubled: {doubled}
</button>
```

## Props

```svelte
<!-- src/lib/Greeting.svelte -->
<script>
  let { name = 'World', greeting = 'Hello' } = $props();
</script>

<h1>{greeting}, {name}!</h1>
```

```svelte
<!-- 使用 -->
<script>
  import Greeting from '$lib/Greeting.svelte';
</script>

<Greeting name="Svelte" greeting="Hi" />
<Greeting name="World" />
```

## 事件处理

```svelte
<script>
  let count = 0;
  let name = '';
</script>

<!-- 标准事件 -->
<button on:click={() => count++}>Count: {count}</button>

<!-- 事件修饰符 -->
<button on:click|preventDefault={handle}>Submit</button>
<form on:submit|preventDefault={handleSubmit}>
  <input type="text" bind:value={name} />
  <button type="submit">Submit</button>
</form>
```

## 双向绑定

```svelte
<script>
  let name = 'World';
  let checked = true;
</script>

<input bind:value={name} />
<p>Hello {name}!</p>

<input type="checkbox" bind:checked={checked} />
```

## 生命周期

```svelte
<script>
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';

  let canvas: HTMLCanvasElement;

  onMount(() => {
    console.log('Mounted');
    const ctx = canvas.getContext('2d');
    // 返回清理函数
    return () => { console.log('Cleanup on destroy'); };
  });

  beforeUpdate(() => console.log('Before DOM update'));
  afterUpdate(() => console.log('After DOM update'));
  onDestroy(() => console.log('Component destroyed'));
</script>

<canvas bind:this={canvas} />
```

## 调试技巧

```svelte
<script>
  let count = 0;
</script>

<!-- 使用 @debug 标签，在开发者工具中自动暂停 -->
{@debug count}

<button on:click={() => count++}>{count}</button>
```

## 参考

- [Svelte 官方文档](https://svelte.dev/docs)
- [Svelte 教程](https://svelte.dev/tutorial)