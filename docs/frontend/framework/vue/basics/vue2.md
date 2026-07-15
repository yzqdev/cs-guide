# Vue 2 基础教程

> ⚠️ Vue 2 已于 2023 年 12 月 31 日停止更新。新项目请使用 **Vue 3**。本教程仅供维护旧项目参考。

## 快速开始

### 使用 Vue CLI

```bash
npm install -g @vue/cli
vue create my-app
# 或使用可视化界面
vue ui
```

### 使用 Script 引入

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
```

## 核心概念

### 1. Vue 实例

```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello Vue',
  },
});

// 访问数据
vm.$data.msg === vm.msg; // true
```

### 2. 模板语法

```html
<!-- 插值 -->
<h1>{{ msg }}</h1>
<p>{{ 1 + 2 }}</p>
<p>{{ isOk ? 'yes' : 'no' }}</p>

<!-- 指令 -->
<a v-bind:href="url">Link</a>
<a :href="url">简写</a>
<button v-on:click="doSomething">Click</button>
<button @click="doSomething">简写</button>

<!-- 双向绑定 -->
<input v-model="message" />
<p>{{ message }}</p>

<!-- 条件渲染 -->
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else>Other</div>
<div v-show="visible">Always rendered</div>

<!-- 列表渲染 -->
<li v-for="(item, index) in items" :key="item.id">{{ index }}. {{ item }}</li>
<li v-for="(value, key, index) in object">{{ key }}: {{ value }}</li>

<!-- 事件修饰符 -->
<button @click.stop="doThis">阻止冒泡</button>
<form @submit.prevent="onSubmit">阻止默认</form>
<button @click.once="doThis">只触发一次</button>
```

### 3. 计算属性与侦听器

```js
new Vue({
  data: {
    firstname: 'Jack',
    lastname: 'Rose',
  },
  computed: {
    // 有缓存，只有依赖变化时才重新计算
    fullname() {
      return this.firstname + '.' + this.lastname;
    },
  },
  watch: {
    firstname(val, oldVal) {
      console.log('firstname changed:', val);
    },
    // 深度监听对象
    user: {
      handler(val) { /* ... */ },
      deep: true,
    },
  },
});
```

### 4. 样式绑定

```html
<!-- class 绑定 -->
<div :class="{ active: isActive, 'text-danger': hasError }"></div>
<div :class="['active', 'text-danger']"></div>
<div :class="[{ active: isActive }, errorClass]"></div>

<!-- style 绑定 -->
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div :style="[baseStyles, overridingStyles]"></div>
```

### 5. 生命周期

```
beforeCreate  →  data 初始化前
created       →  data 已初始化，可请求数据
beforeMount   →  挂载前
mounted       →  已挂载到 DOM，可操作 DOM
beforeUpdate  →  数据更新前
updated       →  数据更新后
beforeDestroy →  销毁前，清理定时器/订阅
destroyed     →  已销毁
```

```js
new Vue({
  created() {
    // 常用：发送请求获取数据
    axios.get('/api/data').then(res => { this.data = res.data; });
  },
  mounted() {
    // DOM 已可用
    this.$refs.input.focus();
  },
  beforeDestroy() {
    // 清理
    clearInterval(this.timer);
  },
});
```

## 组件

### 全局组件

```js
Vue.component('my-component', {
  template: '<p>{{ msg }}</p>',
  data() {
    return { msg: '组件 data 必须是函数' };
  },
});
```

### 局部组件

```js
const Child = { template: '<div>Child</div>' };

new Vue({
  components: {
    'my-child': Child,
  },
});
```

### 组件通信

#### 父 → 子（props）

```js
// 子组件
Vue.component('child', {
  props: ['msg', 'myMsg'],
  template: '<p>{{ msg }} {{ myMsg }}</p>',
});

// 父组件
<child :msg="parentData" my-msg="static" />
```

#### 子 → 父（$emit）

```js
// 子组件
Vue.component('child', {
  template: '<button @click="fn">Send</button>',
  methods: {
    fn() {
      this.$emit('custom-event', 'data from child');
    },
  },
});

// 父组件
<child @custom-event="handleEvent" />
```

#### 非父子通信

```js
// EventBus
const bus = new Vue();

// 组件 A 监听
bus.$on('event-name', (data) => { /* ... */ });

// 组件 B 触发
bus.$emit('event-name', data);
```

## 插槽

```html
<!-- 子组件 -->
<div class="card">
  <slot name="header">默认标题</slot>
  <slot />
</div>

<!-- 父组件 -->
<card>
  <h2 slot="header">自定义标题</h2>
  <p>主体内容</p>
</card>
```

## 路由

### 安装与配置

```bash
npm install vue-router@3
```

```js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: () => import('./components/About.vue') },
  ],
  mode: 'history', // 或 'hash'
});

new Vue({ router }).$mount('#app');
```

### 使用

```html
<router-link to="/">Home</router-link>
<router-link :to="{ name: 'User', params: { id: 123 } }">User</router-link>
<router-view />
```

## 状态管理（Vuex）

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: { count: 0 },
  mutations: {
    increment(state) { state.count++; },
  },
  actions: {
    asyncIncrement({ commit }) {
      setTimeout(() => commit('increment'), 1000);
    },
  },
  getters: {
    doubleCount: state => state.count * 2,
  },
});
```

## 工具推荐

- [Vue DevTools](https://devtools.vuejs.org/) - 调试工具（必装）
- [Vue CLI](https://cli.vuejs.org/) - 脚手架工具
- [Vite](https://cn.vitejs.dev/) - 构建工具（推荐替代 Vue CLI）
- [Awesome Vue](https://github.com/vuejs/awesome-vue) - 资源合集
- [Vue 2 官方文档](https://v2.cn.vuejs.org/)