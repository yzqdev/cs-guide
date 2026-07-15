# Vue 3 使用 JSX

## 安装

Vite 创建的项目已默认支持 JSX/TSX。

## 写法

### 方式一：setup 返回渲染函数

```tsx
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const count = ref(0);
    const increment = () => count.value++;

    // 使用 () => 返回 JSX，不需要写 return
    return () => (
      <div>
        <h1>Hello TSX</h1>
        <p>Count: {count.value}</p>
        <button onClick={increment}>+1</button>
      </div>
    );
  },
});
```

### 方式二：使用 render 函数

```tsx
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const count = ref(0);
    const increment = () => count.value++;

    return { count, increment };
  },
  render() {
    return (
      <div>
        <h1>Hello TSX</h1>
        <p>Count: {this.count}</p>
        <button onClick={this.increment}>+1</button>
      </div>
    );
  },
});
```

### 方式三：使用 `<script setup>`（推荐）

```tsx
// Counter.tsx
import { ref } from 'vue';

const count = ref(0);

function increment() {
  count.value++;
}

export default () => (
  <div>
    <p>Count: {count.value}</p>
    <button onClick={increment}>+1</button>
  </div>
);
```

## 模板语法对照

| Vue 模板 | JSX 等价 |
|----------|----------|
| `v-if` | 三元运算符 `{condition ? <A /> : <B />}` |
| `v-for` | `{items.map(item => <li>{item}</li>)}` |
| `v-model` | `value={val} onInput={e => val = e.target.value}` |
| `v-bind` | `prop={value}` |
| `v-on` | `onClick={handler}` |
| `v-show` | `{condition && <div />}` |
| `slot` | `{props.children}` |
| `ref` | `ref={el => refVar = el}` |

## 参考

- [Vue 3 渲染函数 & JSX](https://cn.vuejs.org/guide/extras/render-function.html)
- [Vue 3 JSX 插件](https://github.com/vuejs/babel-plugin-jsx)