# Vue Router 教程

## 一、安装

```bash
npm install vue-router
```

## 二、配置路由

```ts
// src/router/index.ts
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
  // 404 页面
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') },
];

const router = createRouter({
  history: createWebHistory(), // 或 createWebHashHistory()
  routes,
});

export default router;
```

```ts
// main.ts
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.mount('#app');
```

## 三、router-link 导航

```html
<!-- 基础用法 -->
<router-link to="/">首页</router-link>
<router-link to="/about">关于</router-link>

<!-- 动态路由 -->
<router-link :to="`/user/${userId}`">用户详情</router-link>

<!-- 命名路由 -->
<router-link :to="{ name: 'User', params: { id: 123 } }">用户</router-link>

<!-- 带查询参数 -->
<router-link :to="{ path: '/search', query: { q: 'vue' } }">搜索</router-link>

<!-- 路由出口 -->
<router-view />
```

### 过渡动画

```html
<router-view v-slot="{ Component }">
  <transition name="fade" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view>
```

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

### keep-alive 缓存

```html
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```

## 四、动态路由匹配

```ts
const routes = [
  // 动态路径参数，以冒号开头
  { path: '/user/:id', component: User },
  // 多个参数
  { path: '/user/:id/post/:postId', component: UserPost },
  // 正则限制：id 必须是数字
  { path: '/user/:id(\\d+)', component: User },
];
```

在组件中获取参数：

```vue
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route.params.id);      // /user/123 → "123"
console.log(route.params.postId);  // /user/123/post/456 → "456"
console.log(route.query);          // /search?q=vue → { q: "vue" }
</script>
```

## 五、编程式导航

```vue
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 前进到指定路径
function goToUser(id: number) {
  router.push(`/user/${id}`);
}

// 命名路由
function goToUserNamed(id: number) {
  router.push({ name: 'User', params: { id } });
}

// 替换当前记录（不留下历史记录）
function replaceToHome() {
  router.replace('/');
}

// 前进/后退
function goBack() {
  router.go(-1);
}

function goForward() {
  router.go(1);
}
</script>
```

**注意**：如果提供了 `path`，`params` 会被忽略：

```ts
// ❌ params 不生效
router.push({ path: '/user', params: { id: 123 } });

// ✅ 正确方式
router.push({ name: 'User', params: { id: 123 } });
router.push(`/user/${123}`);
```

## 六、嵌套路由

```ts
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // 当 /user/:id 匹配时，UserProfile 会渲染到 User 的 <router-view> 中
      { path: 'profile', component: UserProfile },
      { path: 'posts', component: UserPosts },
      // 默认子路由
      { path: '', component: UserHome },
    ],
  },
];
```

```vue
<!-- User.vue -->
<template>
  <div class="user">
    <h2>User {{ $route.params.id }}</h2>
    <nav>
      <router-link to="profile">Profile</router-link>
      <router-link to="posts">Posts</router-link>
    </nav>
    <!-- 子路由出口 -->
    <router-view />
  </div>
</template>
```

## 七、导航守卫

### 全局守卫

```ts
const router = createRouter({ ... });

// 全局前置守卫
router.beforeEach((to, from) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'Login', query: { redirect: to.fullPath } };
  }
});

// 全局后置守卫
router.afterEach((to, from) => {
  // 设置页面标题
  document.title = to.meta.title as string || 'Vue App';
});
```

### 路由独享守卫

```ts
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from) => {
      if (!localStorage.getItem('token')) {
        return { name: 'Login' };
      }
    },
  },
];
```

### 组件内守卫

```vue
<script>
export default {
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能访问组件实例 `this`
    next(vm => {
      // 通过 `vm` 访问组件实例
    });
  },
  beforeRouteUpdate(to, from) {
    // 路由改变但组件复用时调用（如 /user/1 → /user/2）
    this.fetchUser(to.params.id);
  },
  beforeRouteLeave(to, from) {
    // 导航离开该组件时调用
    const answer = window.confirm('确定离开吗？');
    if (!answer) return false;
  },
};
</script>
```

## 八、路由参数变化响应

当路由参数变化时（如 `/user/1` → `/user/2`），组件会被复用，生命周期钩子不会再次调用：

```vue
<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// 方式一：watch 监听
watch(() => route.params.id, (newId) => {
  fetchUser(newId);
});

// 方式二：beforeRouteUpdate（Options API）
</script>
```

## 九、路由元信息

```ts
const routes = [
  {
    path: '/admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      title: '管理后台',
      roles: ['admin'],
    },
  },
];
```

## 十、滚动行为

```ts
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});
```

## 十一、History 模式

### Hash 模式（默认）

```ts
import { createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  // URL: http://example.com/#/user/123
});
```

### HTML5 History 模式

```ts
import { createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  // URL: http://example.com/user/123
});
```

**注意**：History 模式需要服务端配置，否则刷新会 404：

- **Nginx**：
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

- **Node.js** (Express)：
```js
const history = require('connect-history-api-fallback');
app.use(history());
```

## 十二、路由组件传参

使用 `props` 将路由参数传递给组件，解耦组件与路由：

```ts
const routes = [
  // 布尔模式：route.params 作为组件 props
  { path: '/user/:id', component: User, props: true },

  // 对象模式：静态 props
  { path: '/promotion', component: Promotion, props: { newsletterPopup: false } },

  // 函数模式：动态返回 props
  { path: '/search', component: Search, props: (route) => ({ query: route.query.q }) },
];
```

```vue
<!-- User.vue -->
<script setup>
defineProps<{ id: string }>();
</script>

<template>
  <p>User ID: {{ id }}</p>
</template>
```

## 十三、命名视图

```vue
<template>
  <router-view class="view main" />
  <router-view class="view sidebar" name="sidebar" />
</template>
```

```ts
const routes = [
  {
    path: '/user/:id',
    components: {
      default: User,
      sidebar: UserSidebar,
    },
    props: {
      default: true,
      sidebar: false,
    },
  },
];
```

## 参考

- [Vue Router 官方文档](https://router.vuejs.org/)
- [Vue Router 中文文档](https://router.vuejs.org/zh/)