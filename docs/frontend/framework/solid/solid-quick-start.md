# SolidJS 快速开始

## 创建项目

```bash
# 使用 CLI
npm create solid@latest
cd my-app
npm install
npm run dev

# 或使用 Vite
npm create vite@latest my-app -- --template solid
```

## 核心概念对比 React

| 特性 | React | SolidJS |
|------|-------|---------|
| 虚拟 DOM | ✅ 有 | ❌ 无，直接操作真实 DOM |
| 状态 | `useState` | `createSignal` |
| 副作用 | `useEffect` | `createEffect` |
| 记忆化 | `useMemo` | `createMemo` |
| 条件渲染 | 三元表达式 | `Show`/`Switch` |
| 列表渲染 | `map` | `For`/`Index` |
| 组件重渲染 | 树级更新 | 细粒度更新 |
| 打包体积 | 约 42KB | 约 7KB |

## Signal（信号）

```jsx
import { createSignal } from 'solid-js';

function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <p>Count: {count()}</p>
      <button onClick={() => setCount(count() + 1)}>+1</button>
      <button onClick={() => setCount(c => c + 1)}>+1 (function)</button>
    </div>
  );
}
```

**注意**：Signal 是函数调用，需要加 `()` 读取值。

## Effect（副作用）

```jsx
import { createSignal, createEffect } from 'solid-js';

function App() {
  const [count, setCount] = createSignal(0);

  createEffect(() => {
    console.log(`Count is: ${count()}`);
  });

  return <button onClick={() => setCount(count() + 1)}>Count: {count()}</button>;
}
```

## 派生状态 (Memo)

```jsx
import { createSignal, createMemo } from 'solid-js';

function App() {
  const [firstName, setFirstName] = createSignal('John');
  const [lastName, setLastName] = createSignal('Doe');

  const fullName = createMemo(() => `${firstName()} ${lastName()}`);

  return (
    <div>
      <input value={firstName()} onInput={e => setFirstName(e.target.value)} />
      <input value={lastName()} onInput={e => setLastName(e.target.value)} />
      <p>Full name: {fullName()}</p>
    </div>
  );
}
```

## 组件 Props

```jsx
function Greeting(props) {
  // props 也是响应式的
  return <h1>Hello, {props.name}!</h1>;
}

// 带默认值
function Greeting(props) {
  const name = () => props.name || 'World';
  return <h1>Hello, {name()}!</h1>;
}

// 使用 splitProps 拆分
import { splitProps } from 'solid-js';

function Button(props) {
  const [local, others] = splitProps(props, ['children']);
  return <button {...others}>{local.children}</button>;
}
```

## 生命周期

```jsx
import { onMount, onCleanup, onError } from 'solid-js';

function Timer() {
  const [seconds, setSeconds] = createSignal(0);
  let interval;

  onMount(() => {
    interval = setInterval(() => setSeconds(s => s + 1), 1000);
  });

  onCleanup(() => {
    clearInterval(interval);
  });

  onError(err => {
    console.error('Error:', err);
  });

  return <div>Seconds: {seconds()}</div>;
}
```

## 引用 DOM 元素

```jsx
import { onMount } from 'solid-js';

function Canvas() {
  let canvas: HTMLCanvasElement;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, 100, 100);
  });

  return <canvas ref={canvas} width={200} height={200} />;
}
```

## 参考

- [SolidJS 官方文档](https://www.solidjs.com/)
- [SolidJS 教程](https://www.solidjs.com/tutorial)