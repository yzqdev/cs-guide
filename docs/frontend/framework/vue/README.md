# vue教程

<Catalog />

## 简介

Vue（发音 /vjuː/，类似 **view**）是一款用于构建用户界面的渐进式 JavaScript 框架。由尤雨溪（Evan You）创建，以其**易上手、灵活、高性能**著称。

### 核心特性

- 🎯 **渐进式** - 从库到框架，按需引入功能
- 📦 **组件化** - 单文件组件（SFC）封装模板、脚本、样式
- ⚡ **响应式** - 基于 Proxy（Vue3）/ defineProperty（Vue2）的响应式系统
- 🧩 **生态系统** - Vue Router、Pinia/Vuex、Nuxt 等官方生态
- 🪶 **轻量级** - 核心库约 33KB（gzip）

## 版本选择

| 特性 | Vue 2 | Vue 3 |
|------|-------|-------|
| 响应式 | `Object.defineProperty` | `Proxy` |
| API | Options API | Composition API + Options API |
| TypeScript | 有限支持 | 原生支持 |
| 状态管理 | Vuex 4 | Pinia（推荐） |
| 构建工具 | Vue CLI | Vite（推荐） |
| 状态 | 已停止更新 | 当前最新版本 |

**推荐：新项目直接使用 Vue 3。**

## 快速开始

### Vue 3 + Vite（推荐）

```bash
npm create vite@latest my-vue-app -- --template vue-ts
cd my-vue-app
npm install
npm run dev
```

### Vue 3 + Nuxt（全栈框架）

```bash
npx nuxi@latest init my-app
```

### 通过 CDN 使用

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script>
  const { createApp, ref } = Vue;
  createApp({
    setup() {
      const count = ref(0);
      return { count };
    },
    template: `<button @click="count++">{{ count }}</button>`
  }).mount('#app');
</script>
```

## 核心概念

### 1. 单文件组件（SFC）

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">
    Count: {{ count }} (doubled: {{ doubled }})
  </button>
</template>

<style scoped>
button {
  background: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

### 2. Composition API（Vue 3 推荐）

```vue
<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue';

// 响应式数据
const count = ref(0);
const state = reactive({
  name: 'Vue',
  version: 3,
});

// 计算属性
const message = computed(() => `Hello ${state.name} v${state.version}`);

// 侦听器
watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`);
});

// 生命周期
onMounted(() => {
  console.log('Component mounted');
});
</script>

<template>
  <p>{{ message }}</p>
  <p>Count: {{ count }}</p>
  <button @click="count++">+1</button>
</template>
```

### 3. Options API（Vue 2/3 兼容）

```vue
<script>
export default {
  data() {
    return {
      count: 0,
      message: 'Hello Vue',
    };
  },
  computed: {
    doubled() {
      return this.count * 2;
    },
  },
  watch: {
    count(newVal) {
      console.log('Count:', newVal);
    },
  },
  methods: {
    increment() {
      this.count++;
    },
  },
  mounted() {
    console.log('Component mounted');
  },
};
</script>

<template>
  <p>{{ message }}</p>
  <p>Count: {{ count }} (doubled: {{ doubled }})</p>
  <button @click="increment">+1</button>
</template>
```

### 4. 模板语法

```vue
<template>
  <!-- 插值 -->
  <p>{{ message }}</p>

  <!-- 指令绑定 -->
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
  <div :class="[isActive ? 'active' : '', 'base-class']">Array class</div>
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">Dynamic style</div>
</template>
```

### 5. Props 与 Emits

```vue
<!-- Button.vue -->
<script setup lang="ts">
interface Props {
  label: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

function handleClick(event: MouseEvent) {
  emit('click', event);
}
</script>

<template>
  <button
    :class="[`btn-${variant}`, `btn-${size}`]"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>
```

### 6. 插槽（Slots）

```vue
<!-- Card.vue -->
<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h2>{{ title }}</h2>
    </div>
    <div class="card-body">
      <slot />
    </div>
    <div class="card-footer">
      <slot name="footer">
        <p class="default-footer">Default footer</p>
      </slot>
    </div>
  </div>
</template>
```

```vue
<!-- 使用 -->
<Card title="My Card">
  <p>This is the main content</p>
  <template #footer>
    <button>Read More</button>
  </template>
</Card>
```

### 7. 生命周期

```vue
<script setup lang="ts">
import { onMounted, onUpdated, onUnmounted, onBeforeMount, onBeforeUnmount } from 'vue';

onBeforeMount(() => console.log('Before mount'));
onMounted(() => console.log('Mounted'));              // 常用
onUpdated(() => console.log('Updated'));
onBeforeUnmount(() => console.log('Before unmount')); // 清理定时器/订阅
onUnmounted(() => console.log('Unmounted'));
</script>
```

### 8. 状态管理

#### Pinia（Vue 3 推荐）

```ts
// stores/counter.ts
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubled = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  return { count, doubled, increment };
});
```

```vue
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const store = useCounterStore();
</script>

<template>
  <p>Count: {{ store.count }} (doubled: {{ store.doubled }})</p>
  <button @click="store.increment">+1</button>
</template>
```

#### Vuex（Vue 2/3）

```ts
// store/index.ts
import { createStore } from 'vuex';

export default createStore({
  state: { count: 0 },
  getters: { doubled: state => state.count * 2 },
  mutations: { increment(state) { state.count++ } },
  actions: { asyncIncrement({ commit }) { setTimeout(() => commit('increment'), 1000) } },
});
```

### 9. Vue Router

```ts
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/views/User.vue'),
    children: [
      { path: 'profile', component: () => import('@/views/UserProfile.vue') },
      { path: 'posts', component: () => import('@/views/UserPosts.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导航守卫
router.beforeEach((to, from) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'Login', query: { redirect: to.fullPath } };
  }
});

export default router;
```

### 10. 组合式函数（Composables）

```ts
// composables/useMouse.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  function update(event: MouseEvent) {
    x.value = event.clientX;
    y.value = event.clientY;
  }

  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));

  return { x, y };
}
```

```vue
<script setup lang="ts">
import { useMouse } from '@/composables/useMouse';

const { x, y } = useMouse();
</script>

<template>
  <p>Mouse position: {{ x }}, {{ y }}</p>
</template>
```

## 生态系统

### 官方工具

- [Vite](https://cn.vitejs.dev/) - 构建工具
- [Pinia](https://pinia.vuejs.org/) - 状态管理（Vue 3）
- [Vuex](https://vuex.vuejs.org/) - 状态管理（Vue 2/3）
- [Vue Router](https://router.vuejs.org/) - 路由
- [Vue DevTools](https://devtools.vuejs.org/) - 调试工具
- [Nuxt](https://nuxt.com/) - 全栈框架（SSR/SSG）
- [VitePress](https://vitepress.dev/) - 静态站点生成器

### 推荐 UI 组件库

| 库名 | 框架 | 特点 |
|------|------|------|
| [Element Plus](https://element-plus.org/) | Vue 3 | 企业级，组件丰富，文档完善 |
| [Ant Design Vue](https://antdv.com/) | Vue 3 | 设计规范，适合中后台 |
| [Naive UI](https://www.naiveui.com/) | Vue 3 | 轻量，TypeScript 支持好 |
| [Vuetify](https://vuetifyjs.com/) | Vue 3 | Material Design |
| [Quasar](https://quasar.dev/) | Vue 3 | 跨平台，含移动端 |
| [Varlet](https://varlet.gitee.io/) | Vue 3 | Material Design 风格 |
| [Arco Design](https://arco.design/) | Vue 3 | 字节跳动出品 |
| [PrimeVue](https://primevue.org/) | Vue 3 | 功能丰富 |
| [Radix Vue](https://www.radix-vue.com/) | Vue 3 | 无样式，可定制 |
| [Vant](https://vant-ui.github.io/) | Vue 3 | 移动端 |

## 文档导航

### 📖 基础教程

| 文档 | 说明 |
|------|------|
| [Vue 3 入门](./basics/vue3.md) | Vue 3 基础教程：Composition API、响应式、模板语法、生命周期 |
| [Vue 2 基础](./basics/vue2.md) | Vue 2 教程（仅维护旧项目用） |
| [Vue 3 JSX](./basics/jsx.md) | Vue 3 中使用 JSX/TSX |

### 🔧 生态工具

| 文档 | 说明 |
|------|------|
| [Vue Router](./ecosystem/router.md) | 路由配置、动态路由、导航守卫、参数传递 |
| [状态管理 Pinia / Vuex](./ecosystem/state-management.md) | Pinia（推荐）与 Vuex 的详细使用 |
| [Nuxt](./ecosystem/nuxt.md) | Nuxt 全栈框架 SSR 数据获取技巧 |
| [Quasar](./ecosystem/quasar.md) | Quasar 跨平台框架安装与使用 |

### 🛠 开发指南

| 文档 | 说明 |
|------|------|
| [常见问题与技巧](./guides/tips.md) | Vue 3/Vite 配置、TypeScript 集成、CSS 方案 |
| [Webpack 配置](./guides/webpack.md) | Vue 项目 Webpack 打包配置 |
| [单文件 HTML](./guides/single-html.md) | 在单个 HTML 中使用 Vue 3 + UI 库 |
| [代码规范](./guides/style-guide.md) | ESLint + Prettier 配置 |

### 🎨 资源推荐

| 文档 | 说明 |
|------|------|
| [UI 组件库](./resources/ui-libs.md) | Vue/React 组件库推荐对比表 |
| [图标方案](./resources/icons.md) | 图标网站、Iconfont、SVG 图标方案汇总 |
| [代码高亮](./resources/highlight.md) | highlight.js / Prism.js 使用 |
| [富文本编辑器](./resources/rich-editor.md) | 富文本编辑器推荐 |

## 参考

- [Vue 3 官方文档](https://vuejs.org/)
- [Vue 3 中文文档](https://cn.vuejs.org/)
- [Vue 2 文档](https://v2.cn.vuejs.org/)
- [Vue GitHub](https://github.com/vuejs/core)
- [Awesome Vue](https://github.com/vuejs/awesome-vue)