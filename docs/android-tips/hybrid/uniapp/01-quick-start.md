---
order: 1
---

# uni-app 快速开始

## 简介

uni-app 是一个使用 Vue.js 开发所有前端应用的框架，一套代码可发布到 iOS、Android、H5、以及各种小程序平台。

## 开发环境

```bash
# 安装 HBuilderX（推荐）
# 下载地址：https://www.dcloud.io/hbuilderx.html

# 或使用 CLI 方式
npm install -g @vue/cli
vue create -p dcloudio/uni-preset-vue my-app
```

## 参考链接

| 链接 | 说明 |
|------|------|
| [官网](https://uniapp.dcloud.net.cn/) | 官方文档 |
| [小程序支持](https://nativesupport.dcloud.net.cn/) | 原生 SDK 文档 |
| [插件市场](https://ext.dcloud.net.cn/) | 插件和组件 |
| [uView UI](https://www.uviewui.com/) | 常用 UI 库 |
| [uView Plus](https://uiadmin.net/uview-plus/) | Vue3 版 UI 库 |
| [luch-request](https://www.quanzhan.co/luch-request/handbook/) | HTTP 请求库 |

## 常用命令

```bash
# 运行到浏览器
npm run dev:h5

# 运行到微信小程序
npm run dev:mp-weixin

# 运行到 Android App
npm run dev:app

# 发布
npm run build:h5      # 发布 H5
npm run build:mp-weixin  # 发布小程序
npm run build:app     # 发布 App
```

## 目录结构

```
src/
├── pages/          # 页面
│   ├── index/
│   │   └── index.vue
│   └── my/
│       └── my.vue
├── components/     # 组件
├── static/         # 静态资源
├── store/          # Vuex/Pinia 状态管理
├── utils/          # 工具
├── App.vue         # 入口组件
├── main.js         # 入口文件
├── pages.json      # 页面配置
├── manifest.json   # 应用配置
└── uni.scss        # 全局样式
```

## 页面配置 (pages.json)

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页"
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#F8F8F8"
  }
}
```