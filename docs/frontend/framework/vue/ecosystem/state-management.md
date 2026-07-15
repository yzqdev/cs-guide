# 状态管理

## 概述

Vue 的状态管理方案经历了从 Vuex 到 Pinia 的演进。Vue 3 官方推荐使用 **Pinia**，它更轻量、更易用、TypeScript 支持更好。

| 特性 | Vuex 4 | Pinia |
|------|:------:|:-----:|
| Vue 版本 | Vue 3 | Vue 3 |
| TypeScript | ❌ 有限支持 | ✅ 原生支持 |
| 体积 | ~10KB | ~1KB |
| DevTools | ✅ 支持 | ✅ 支持 |
| 模块化 | 多模块 (modules) | 独立 Store |
| 语法 | Options API | Composition API |
| 变更 | 同步 mutation | 直接修改 |
| 状态 | 维护模式 | **官方推荐** |

## Pinia（推荐）

### 安装

```bash
npm install pinia
# 或 yarn add pinia
```

### 注册

```ts
// main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
```

### 定义 Store

#### 选项式 API

```ts
// stores/counter.ts
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

#### 组合式 API（推荐）

```ts
// stores/counter.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const name = ref('Eduardo');
  const doubleCount = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  return { count, name, doubleCount, increment };
});
```

### 使用

```vue
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const store = useCounterStore();

// 直接修改
store.count++;

// 调用 action
store.increment();

// 批量修改
store.$patch({ count: 10, name: 'New Name' });

// 重置
store.$reset();
</script>

<template>
  <p>Count: {{ store.count }}</p>
  <p>Double: {{ store.doubleCount }}</p>
  <button @click="store.increment">+1</button>
</template>
```

### 解构保持响应式

```vue
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter';

const store = useCounterStore();
// ✅ 解构后仍保持响应式
const { count, doubleCount } = storeToRefs(store);
// ❌ 直接解构会丢失响应式
// const { count } = store;
</script>
```

### 模块化

Pinia 每个 Store 独立，天然支持模块化：

```ts
// stores/user.ts
export const useUserStore = defineStore('user', () => {
  const token = ref('');
  const userInfo = ref(null);

  async function login(username: string, password: string) {
    const res = await api.login(username, password);
    token.value = res.token;
    userInfo.value = res.user;
  }

  function logout() {
    token.value = '';
    userInfo.value = null;
  }

  return { token, userInfo, login, logout };
});
```

```vue
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { useUserStore } from '@/stores/user';

const counter = useCounterStore();
const user = useUserStore();
</script>
```

## Vuex（Vue 3）

### 安装

```bash
npm install vuex@4
```

### 定义

```ts
// store/index.ts
import { createStore } from 'vuex';

export default createStore({
  state: { count: 0 },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setCount(state, n: number) {
      state.count = n;
    },
  },
  actions: {
    asyncIncrement({ commit }) {
      setTimeout(() => commit('increment'), 1000);
    },
  },
  modules: {
    user: {
      namespaced: true,
      state: () => ({ name: '' }),
      // ...
    },
  },
});
```

### 使用

```vue
<script>
export default {
  computed: {
    count() { return this.$store.state.count; },
    doubleCount() { return this.$store.getters.doubleCount; },
  },
  methods: {
    increment() { this.$store.commit('increment'); },
    asyncIncrement() { this.$store.dispatch('asyncIncrement'); },
  },
};
</script>
```

### 组合式 API 中使用

```vue
<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const count = computed(() => store.state.count);
const doubleCount = computed(() => store.getters.doubleCount);

function increment() {
  store.commit('increment');
}
</script>
```

## 其他状态管理方案

### 使用 Vue 的 reactive

```ts
// global-state.ts
import { reactive } from 'vue';

export const globalState = reactive({
  count: 0,
  user: null as any,
});
```

### 使用 provide/inject

```vue
<!-- 父组件 -->
<script setup lang="ts">
import { provide, ref } from 'vue';

const count = ref(0);
provide('count', count);
provide('increment', () => count.value++);
</script>

<!-- 子组件 -->
<script setup lang="ts">
import { inject } from 'vue';

const count = inject('count');
const increment = inject('increment');
</script>
```

## 参考

- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Vuex 官方文档](https://vuex.vuejs.org/)
- [Pinia vs Vuex 对比](https://pinia.vuejs.org/introduction.html#comparison-with-vuex)