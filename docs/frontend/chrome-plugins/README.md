# Chrome 插件开发教程

本目录是一套完整的 Chrome 插件（扩展程序）开发教程，从基础概念到进阶实践，帮助你系统掌握 Chrome 扩展开发。

## 目录

### 基础入门
- [manifest.json 详解](manifest-intro.md) — 插件配置文件全方位解析，v2 vs v3 对比
- [插件架构总览](architecture.md) — background/service worker、content scripts、popup、options、devtools 详解

### 核心概念
- [消息通信机制](message-passing.md) — runtime 消息传递、长连接、跨模块通信
- [Content Scripts 深入](content-scripts.md) — 注入方式、与页面交互、安全隔离
- [存储 API](storage-api.md) — storage.local、storage.sync、storage.session 使用指南
- [常用 Chrome API](chrome-api-common.md) — tabs、contextMenus、commands、notifications 等

### 工程实践
- [Chrome 插件开发指南](chrome-plugin-development.md) — CSP、权限配置、模板推荐
- [使用 Vue 开发插件](vue-to-chromeplugin.md) — Vue CLI 工程化、热刷新、请求拦截
- [插件调试技巧](debug.md) — 断点调试、日志、错误排查

### 进阶专题
- [DevTools 扩展开发](devtools-extension.md) — 自定义开发者工具面板
- [发布到 Chrome Web Store](publish.md) — 上架流程、定价、审核指南

### 脚本开发
- [Webpack 开发油猴脚本](webpack-tamper.md) — 使用 Webpack/Vite 构建用户脚本
- [书签转 JSON](bookmark.md) — 浏览器书签导出转换工具

### 资源推荐
- [好用的 Chrome 插件推荐](chrome-plugin-recommend.md) — 开发、生产力、工具类插件合集

<Catalog />
