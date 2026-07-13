# UniApp 实用技巧

## 一、常用命令

```bash
# 创建项目
vue create -p dcloudio/uni-preset-vue my-app

# 运行
npm run dev:mp-weixin   # 微信小程序
npm run dev:h5           # H5
npm run dev:app         # App

# 构建
npm run build:mp-weixin
npm run build:h5
npm run build:app
```

## 二、生命周期

```javascript
export default {
    // 页面生命周期
    onLoad(options) {
        // 页面加载时触发，options 为页面参数
        console.log('页面加载', options);
    },

    onShow() {
        // 页面显示时触发
        console.log('页面显示');
    },

    onReady() {
        // 页面首次渲染完成
        console.log('页面就绪');
    },

    onHide() {
        // 页面隐藏时触发
        console.log('页面隐藏');
    },

    onUnload() {
        // 页面卸载时触发
        console.log('页面卸载');
    },

    onPullDownRefresh() {
        // 下拉刷新
        console.log('下拉刷新');
        uni.stopPullDownRefresh(); // 停止刷新
    },

    onReachBottom() {
        // 上拉加载更多
        console.log('触底加载');
    },

    onShareAppMessage() {
        // 分享
        return {
            title: '分享标题',
            path: '/pages/index/index',
        };
    },
};
```

## 三、常用 API

```javascript
// 网络请求
uni.request({
    url: 'https://api.example.com/users',
    method: 'GET',
    data: { page: 1 },
    header: { 'Authorization': 'Bearer token' },
    success: (res) => {
        console.log(res.data);
    },
    fail: (err) => {
        console.error(err);
    },
});

// 封装请求
const request = (options) => {
    return new Promise((resolve, reject) => {
        uni.request({
            ...options,
            header: {
                'Authorization': uni.getStorageSync('token'),
                ...options.header,
            },
            success: (res) => resolve(res.data),
            fail: (err) => reject(err),
        });
    });
};

// 使用
async function getUsers() {
    const data = await request({ url: '/api/users' });
}
```

## 四、路由跳转

```javascript
// 保留当前页面，跳转到新页面
uni.navigateTo({ url: '/pages/detail/detail?id=1' });

// 关闭当前页面，跳转到新页面
uni.redirectTo({ url: '/pages/login/login' });

// 关闭所有页面，跳转到新页面
uni.reLaunch({ url: '/pages/index/index' });

// 跳转到 tabBar 页面
uni.switchTab({ url: '/pages/index/index' });

// 返回上一页
uni.navigateBack({ delta: 1 });

// 获取当前页面栈
const pages = getCurrentPages();
const currentPage = pages[pages.length - 1];
```

## 五、数据缓存

```javascript
// 存储
uni.setStorageSync('token', 'abc123');
uni.setStorage({
    key: 'user',
    data: { name: 'Alice', age: 25 },
});

// 读取
const token = uni.getStorageSync('token');
const user = uni.getStorageSync('user');

// 删除
uni.removeStorageSync('token');

// 清空
uni.clearStorageSync();
```

## 六、条件编译

```html
<!-- #ifdef H5 -->
<view>只在 H5 平台显示</view>
<!-- #endif -->

<!-- #ifdef MP-WEIXIN -->
<view>只在微信小程序显示</view>
<!-- #endif -->

<!-- #ifdef APP -->
<view>只在 App 显示</view>
<!-- #endif -->

<!-- #ifndef H5 -->
<view>不在 H5 平台时显示</view>
<!-- #endif -->
```

```javascript
// #ifdef H5
console.log('仅在 H5 平台执行');
// #endif

// #ifdef APP-PLUS
console.log('仅在 App 平台执行');
// #endif
```

## 七、自定义组件

```vue
<!-- components/MyButton.vue -->
<template>
    <button class="my-button" :style="customStyle" @click="handleClick">
        <slot />
    </button>
</template>

<script>
export default {
    name: 'MyButton',
    props: {
        type: {
            type: String,
            default: 'default', // default / primary / danger
        },
        size: {
            type: String,
            default: 'normal', // small / normal / large
        },
    },
    computed: {
        customStyle() {
            const styles = {
                default: { background: '#f5f5f5', color: '#333' },
                primary: { background: '#007aff', color: '#fff' },
                danger: { background: '#dd524d', color: '#fff' },
            };
            return styles[this.type] || styles.default;
        },
    },
    methods: {
        handleClick() {
            this.$emit('click');
        },
    },
};
</script>
```

## 八、Vuex 状态管理

```javascript
// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: null,
        token: '',
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_TOKEN(state, token) {
            state.token = token;
        },
    },
    actions: {
        login({ commit }, credentials) {
            // 调用登录接口
            const token = 'xxx';
            const user = { name: 'Alice' };
            commit('SET_TOKEN', token);
            commit('SET_USER', user);
            uni.setStorageSync('token', token);
        },
        logout({ commit }) {
            commit('SET_TOKEN', '');
            commit('SET_USER', null);
            uni.removeStorageSync('token');
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.token,
        username: (state) => state.user?.name || '',
    },
});

export default store;
```

## 九、常见问题

### 1. 小程序分包

```json
// pages.json
{
    "pages": ["pages/index/index"],
    "subPackages": [
        {
            "root": "packageA",
            "pages": [
                {"path": "detail/detail"},
                {"path": "list/list"}
            ]
        }
    ],
    "preloadRule": {
        "pages/index/index": {
            "network": "all",
            "packages": ["packageA"]
        }
    }
}
```

### 2. 自定义导航栏

```json
// pages.json
{
    "path": "pages/index/index",
    "style": {
        "navigationStyle": "custom",
        "navigationBarTitleText": "首页"
    }
}
```

### 3. 小程序登录流程

```javascript
async function login() {
    // 1. 获取 code
    const { code } = await uni.login({ provider: 'weixin' });

    // 2. 发送到后端换取 token
    const res = await request({
        url: '/api/auth/login',
        method: 'POST',
        data: { code },
    });

    // 3. 存储 token
    uni.setStorageSync('token', res.token);
}
```
