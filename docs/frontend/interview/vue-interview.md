# Vue 面试

Vue 2 / Vue 3 高频面试题。

## Vue 2 vs Vue 3

| 特性 | Vue 2 | Vue 3 |
|------|-------|-------|
| 响应式 | `Object.defineProperty` | `Proxy` |
| API | Options API | Composition API + Options API |
| 生命周期 | `beforeDestroy` / `destroyed` | `onBeforeUnmount` / `onUnmounted` |
| 多根节点 | 不支持 | 支持（Fragment） |
| 性能 | 较慢 | 更快（Tree-shaking、编译优化） |
| TypeScript | 支持较弱 | 原生支持 |

---

## 响应式原理

### Vue 2

使用 `Object.defineProperty` 劫持数据的 getter/setter：

```javascript
// 简化版
function defineReactive(obj, key, val) {
  const dep = [];
  Object.defineProperty(obj, key, {
    get() {
      dep.push(target);  // 收集依赖
      return val;
    },
    set(newVal) {
      val = newVal;
      dep.forEach(fn => fn());  // 通知更新
    }
  });
}
```

**局限性**：
- 无法检测数组索引变化和 `length` 变化
- 无法检测对象属性的新增/删除
- 需要递归遍历所有属性（初始化性能开销）

### Vue 3

使用 `Proxy` 代理整个对象：

```javascript
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(target, key);  // 收集依赖
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key);  // 触发更新
      return result;
    }
  });
}
```

**优势**：
- 懒代理：访问时才递归，性能更好
- 可检测新增/删除属性
- 支持 `Map`、`Set` 等数据结构

---

## 虚拟 DOM

### 什么是虚拟 DOM

用 JavaScript 对象描述真实 DOM 结构，通过 diff 算法找出最小变更，批量更新真实 DOM。

### Diff 算法

Vue 的 diff 是双端比较（Vue 2）和最长递增子序列（Vue 3）：

1. **同层比较**：只比较同一层级的节点
2. **类型比较**：不同类型的节点直接替换
3. **Key 比较**：用 `key` 标识节点复用

### 为什么需要 key

```html
<!-- 没有 key：会逐个 patch，可能导致状态错乱 -->
<div v-for="item in list">{{ item.name }}</div>

<!-- 有 key：精确复用，性能更好 -->
<div v-for="item in list" :key="item.id">{{ item.name }}</div>
```

### Vue 3 的优化

- **静态提升**：静态节点只创建一次
- **PatchFlag**：标记节点类型，跳过不变的部分
- **Block Tree**：扁平化 diff，减少遍历

---

## 组件通信

### 父 → 子

```vue
<!-- Props -->
<Child :message="msg" />

<!-- 父组件 -->
export default {
  data() { return { msg: 'hello' }; }
}
```

### 子 → 父

```vue
<!-- 子组件 -->
this.$emit('update', newValue);

<!-- 父组件 -->
<Child @update="handleUpdate" />
```

### 兄弟组件

```javascript
// 事件总线（Vue 2）
Vue.prototype.$bus = new Vue();
this.$bus.$emit('event', data);
this.$bus.$on('event', handler);

// Vue 3 推荐用 provide/inject 或状态管理
```

### Provide / Inject

```javascript
// 祖先组件
provide() {
  return { theme: this.theme };
}

// 后代组件
inject: ['theme']
```

### Pinia / Vuex

```javascript
// Pinia（Vue 3 推荐）
import { defineStore } from 'pinia';
export const useStore = defineStore('main', {
  state: () => ({ count: 0 }),
  actions: { increment() { this.count++; } }
});
```

---

## Composition API

### 为什么需要

- Options API 逻辑分散在 `data`、`methods`、`computed` 等中
- Composition API 按逻辑功能组织代码

### setup 函数

```vue
<script setup>
import { ref, computed, onMounted } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}

onMounted(() => {
  console.log('mounted');
});
</script>
```

### ref vs reactive

| 特性 | `ref` | `reactive` |
|------|-------|------------|
| 类型 | 基本类型 + 对象 | 对象 |
| 访问 | `.value` | 直接访问 |
| 解构 | 不丢失响应性 | 会丢失响应性 |

```javascript
const count = ref(0);
count.value++;  // 需要 .value

const state = reactive({ count: 0 });
state.count++;  // 直接访问
```

---

## 生命周期

| Vue 2 | Vue 3 (Composition API) | 说明 |
|-------|------------------------|------|
| `beforeCreate` | `setup()` | 实例初始化 |
| `created` | `setup()` | 实例创建完成 |
| `beforeMount` | `onBeforeMount` | 挂载前 |
| `mounted` | `onMounted` | 挂载完成 |
| `beforeUpdate` | `onBeforeUpdate` | 更新前 |
| `updated` | `onUpdated` | 更新完成 |
| `beforeDestroy` | `onBeforeUnmount` | 卸载前 |
| `destroyed` | `onUnmounted` | 卸载完成 |

---

## 常见问题

### 路由跳转

```javascript
// 声明式
<router-link to="/home">Home</router-link>

// 编程式
this.$router.push('/home');
this.$router.replace('/home');
this.$router.go(-1);
```

### keep-alive

```vue
<keep-alive include="Home,About" :max="10">
  <router-view />
</keep-alive>

<!-- Vue 3 Composition API -->
import { onActivated, onDeactivated } from 'vue';
onActivated(() => { /* 进入缓存 */ });
onDeactivated(() => { /* 离开缓存 */ });
```

### Watch vs Computed

| 特性 | `computed` | `watch` |
|------|-----------|---------|
| 缓存 | 有 | 无 |
| 异步 | 不支持 | 支持 |
| 适用场景 | 依赖值派生 | 执行副作用 |

### nextTick

```javascript
// DOM 更新后执行
this.$nextTick(() => {
  // DOM 已更新
});

// Vue 3
import { nextTick } from 'vue';
await nextTick();
```

### 模板编译

Vue 模板编译过程：`template` → `render 函数` → `虚拟 DOM` → `真实 DOM`
