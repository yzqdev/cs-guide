# Svelte 控制流与高级特性

## 条件渲染

```svelte
<script>
  let user = { loggedIn: true, name: 'Alice' };
</script>

{#if user.loggedIn}
  <p>Welcome back, {user.name}!</p>
{:else}
  <button>Login</button>
{/if}
```

## 列表渲染

```svelte
<script>
  let items = ['Apple', 'Banana', 'Cherry'];
  let todoItems = [
    { id: 1, text: 'Learn Svelte', done: false },
    { id: 2, text: 'Build something', done: true },
  ];
</script>

<!-- 基本列表 -->
<ul>
  {#each items as item, index}
    <li>{index + 1}. {item}</li>
  {/each}
</ul>

<!-- 带 key 的列表 -->
{#each todoItems as todo (todo.id)}
  <div>
    <input type="checkbox" bind:checked={todo.done} />
    <span class:done={todo.done}>{todo.text}</span>
  </div>
{/each}
```

## 异步数据

```svelte
<script>
  async function fetchData() {
    const res = await fetch('https://api.example.com/data');
    return res.json();
  }

  let promise = fetchData();
</script>

{#await promise}
  <p>Loading...</p>
{:then value}
  <p>Data: {JSON.stringify(value)}</p>
{:catch error}
  <p>Error: {error.message}</p>
{/await}
```

## 插槽 (Slot)

```svelte
<!-- src/lib/Card.svelte -->
<script>
  let { title } = $props();
</script>

<div class="card">
  <h2>{title}</h2>
  <div class="content">
    <slot />
  </div>
  <div class="footer">
    <slot name="footer">
      <p>Default footer</p>
    </slot>
  </div>
</div>
```

```svelte
<Card title="My Card">
  <p>This is the main content</p>
  <p slot="footer"><button>Read More</button></p>
</Card>
```

## 组件事件

```svelte
<!-- src/lib/Button.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('customEvent', { message: 'Button clicked' });
  }
</script>

<button on:click={handleClick}>
  <slot />
</button>
```

```svelte
<!-- 父组件 -->
<script>
  import Button from '$lib/Button.svelte';

  function handleCustomEvent(event) {
    console.log(event.detail.message);
  }
</script>

<Button on:customEvent={handleCustomEvent}>Click me</Button>
```

## Store（状态管理）

```svelte
<!-- src/lib/stores.js -->
import { writable, derived, readable } from 'svelte/store';

// 可写 store
export const count = writable(0);

// 派生 store
export const doubled = derived(count, $count => $count * 2);

// 只读 store
export const time = readable(new Date(), set => {
  const interval = setInterval(() => set(new Date()), 1000);
  return () => clearInterval(interval);
});
```

```svelte
<!-- 在组件中使用 -->
<script>
  import { count, doubled } from '$lib/stores.js';

  // $ 前缀自动订阅/取消订阅
</script>

<p>Count: {$count}</p>
<p>Doubled: {$doubled}</p>
<button on:click={() => $count++}>+1</button>
<button on:click={() => count.update(n => n - 1)}>-1</button>
<button on:click={() => count.set(0)}>Reset</button>
```

## 过渡动画

```svelte
<script>
  import { fade, slide, scale, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  let visible = false;
  let items = [1, 2, 3, 4];
</script>

<button on:click={() => visible = !visible}>Toggle</button>

{#if visible}
  <div transition:fade={{ duration: 300 }}>Fade</div>
  <div transition:slide>Slide</div>
  <div in:fly={{ y: 200, duration: 500 }} out:scale>Fly in, scale out</div>
{/if}

<!-- 列表动画 -->
{#each items as item (item)}
  <div animate:flip>{item}</div>
{/each}
```

## 动态 class/style

```svelte
<script>
  let active = true;
  let isActive = true;
  let bgColor = 'red';
</script>

<!-- 动态 class -->
<div class:active>Active style</div>
<div class:active={isActive}>Conditional class</div>

<!-- 动态 style -->
<div style:color="red">Red text</div>
<div style:background-color={bgColor}>Dynamic color</div>
```

## SvelteKit 路由

```svelte
<!-- src/routes/+page.svelte - 首页 -->
<h1>Home</h1>

<!-- src/routes/about/+page.svelte - /about -->
<h1>About</h1>

<!-- src/routes/blog/[slug]/+page.svelte - 动态路由 -->
<script>
  import { page } from '$app/stores';
  let { slug } = $page.params;
</script>
<h1>Blog: {slug}</h1>

<!-- src/routes/+layout.svelte - 布局 -->
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>
<slot />
```

## 常见问题

### 响应式赋值

```svelte
<script>
  let arr = [1, 2, 3];

  // Svelte 通过赋值触发更新
  arr.push(4);        // ❌ 不会触发更新
  arr = [...arr, 4];  // ✅ 触发更新

  let obj = { a: 1 };
  obj.a = 2;          // ❌ 不会触发更新
  obj = { ...obj, a: 2 }; // ✅ 触发更新
</script>
```

### $: 声明不能用于 let

```svelte
<script>
  // ❌ 错误
  // $: let x = y + 1;

  // ✅ 正确
  let x;
  $: x = y + 1;
</script>
```

## 推荐 UI 库

- [Skeleton](https://www.skeleton.dev/) - 基于 Tailwind 的 UI 组件库
- [Smelte](https://smelte.netlify.app/) - Material Design 组件库
- [Melt UI](https://melt-ui.com/) - 无样式组件库
- [Shadcn Svelte](https://www.shadcn-svelte.com/) - shadcn 风格组件

## 参考

- [Svelte 官方文档](https://svelte.dev/docs)
- [SvelteKit 文档](https://kit.svelte.dev/docs)
- [Svelte 示例](https://svelte.dev/examples)