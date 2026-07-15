# Vue 3 基础教程

## 简介

Vue 3 是 Vue 的最新主版本，于 2020 年发布。相比 Vue 2，它带来了 **Composition API**、**Proxy 响应式系统**、**Fragments**、**Teleport**、**Suspense** 等重大改进。

### Vue 2 vs Vue 3

| 特性 | Vue 2 | Vue 3 |
|------|:-----:|:-----:|
| 响应式 | `Object.defineProperty` | `Proxy` |
| TypeScript | 有限支持 | 原生支持 |
| API | Options API | Composition API + Options API |
| 多根节点 | ❌ | ✅ |
| 性能 | 基准 | 快 1.3~2 倍 |
| Tree-shaking | ❌ | ✅ |
| 状态 | 已停止更新 | 当前最新 |

## 快速开始

### 使用 Vite

```bash
npm create vite@latest my-vue-app -- --template vue-ts
cd my-vue-app
npm install
npm run dev
```

### 通过 CDN

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script>
  const { createApp, ref } = Vue;

  createApp({
    setup() {
      const count = ref(0);
      return { count };
    },
    template: `<button @click="count++">{{ count }}</button>`,
  }).mount('#app');
</script>
```

## 核心概念

### 1. 创建应用

```ts
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.mount('#app');
```

### 2. 响应式数据

```vue
<script setup>
import { ref, reactive, computed } from 'vue';

// 基本类型
const count = ref(0);
const message = ref('Hello');

// 对象/数组
const user = reactive({
  name: 'Alice',
  age: 25,
});

// 计算属性
const doubled = computed(() => count.value * 2);
</script>

<template>
  <p>{{ message }}, {{ user.name }}</p>
  <p>Count: {{ count }} (doubled: {{ doubled }})</p>
  <button @click="count++">+1</button>
</template>
```

### 3. 侦听器

```vue
<script setup>
import { watch, watchEffect } from 'vue';

const count = ref(0);

// 监听单个值
watch(count, (newVal, oldVal) => {
  console.log(`count: ${oldVal} → ${newVal}`);
});

// 监听多个值
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('count or name changed');
});

// 立即执行，自动追踪依赖
watchEffect(() => {
  console.log(`count is ${count.value}`);
});
</script>
```

### 4. 生命周期

```vue
<script setup>
import { onMounted, onUpdated, onUnmounted, onBeforeUnmount } from 'vue';

onMounted(() => {
  console.log('组件已挂载');
  // 获取数据、操作 DOM
});

onBeforeUnmount(() => {
  console.log('组件即将卸载');
  // 清理定时器、取消订阅
});

onUpdated(() => {
  console.log('组件已更新');
});
</script>
```

### 5. 模板语法

```vue
<template>
  <!-- 插值 -->
  <p>{{ message }}</p>

  <!-- 属性绑定 -->
  <a :href="url">Link</a>
  <img :src="imageUrl" :alt="altText" />

  <!-- 事件绑定 -->
  <button @click="handleClick">Click</button>
  <form @submit.prevent="onSubmit">Submit</form>

  <!-- 双向绑定 -->
  <input v-model="username" />
  <textarea v-model="bio" />
  <input type="checkbox" v-model="agree" />

  <!-- 条件渲染 -->
  <div v-if="type === 'A'">Type A</div>
  <div v-else-if="type === 'B'">Type B</div>
  <div v-else>Other</div>
  <div v-show="visible">Visible</div>

  <!-- 列表渲染 -->
  <li v-for="(item, index) in items" :key="item.id">
    {{ index }}. {{ item.name }}
  </li>

  <!-- 动态 class/style -->
  <div :class="{ active: isActive, 'text-danger': hasError }">Dynamic class</div>
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">Dynamic style</div>
</template>
```

### 6. Props 与 Emits

```vue
<!-- Button.vue -->
<script setup lang="ts">
interface Props {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <button
    :class="`btn-${variant}`"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    {{ label }}
  </button>
</template>
```

### 7. 插槽

```vue
<!-- Card.vue -->
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">
        <h2>Default Title</h2>
      </slot>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<!-- 使用 -->
<Card>
  <template #header>
    <h2>Custom Title</h2>
  </template>
  <p>Main content</p>
</Card>
```

### 8. 组合式函数 (Composables)

```ts
// composables/useMouse.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  function update(e: MouseEvent) {
    x.value = e.clientX;
    y.value = e.clientY;
  }

  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));

  return { x, y };
}
```

```vue
<script setup>
import { useMouse } from '@/composables/useMouse';

const { x, y } = useMouse();
</script>

<template>
  <p>Mouse: {{ x }}, {{ y }}</p>
</template>
```

## Vue 3 新特性

### Fragment（多根节点）

```vue
<template>
  <header>Header</header>
  <main>Main</main>
  <footer>Footer</footer>
</template>
```

### Teleport（传送门）

```vue
<template>
  <button @click="open = true">Open Modal</button>
  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Modal Content</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
</template>
```

### Suspense（异步组件）

```vue
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
```

## 参考

- [Vue 3 官方文档](https://vuejs.org/)
- [Vue 3 中文文档](https://cn.vuejs.org/)
- [Vue 3 迁移指南](https://v3-migration.vuejs.org/)
- [Vue 3 Composables 示例](https://vueuse.org/)