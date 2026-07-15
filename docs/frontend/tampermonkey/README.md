# 油猴脚本 (Tampermonkey) 教程

Tampermonkey（油猴）是一款浏览器扩展，它允许用户安装和运行用户脚本（userscript），自定义网页行为。

## 目录

| 文件 | 内容 |
|------|------|
| [入门教程](./README.md) | 基本概念、脚本结构、开发调试 |
| [API 参考](./tamper-api.md) | 脚本头配置、GM_* API 详解 |
| [开发环境搭建](./write-plugin.md) | jQuery / Webpack / Vite 开发配置 |

## 什么是用户脚本？

用户脚本是用 JavaScript 编写的代码片段，可以在指定网页上自动运行。常用于：

- 移除广告和干扰元素
- 添加自定义功能和快捷键
- 自动填写表单
- 修改页面样式和布局
- 数据抓取和聚合

## 安装 Tampermonkey

| 浏览器 | 安装地址 |
|--------|----------|
| Chrome | [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| Edge | [Edge 加载项](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) |
| Firefox | [Firefox Add-ons](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/) |
| Safari | [App Store](https://apps.apple.com/app/tampermonkey/id1482490089) |

## 脚本结构

一个用户脚本由两部分组成：

```
// ==UserScript==
// @name         脚本名称
// @namespace    命名空间
// @version      1.0
// @description  脚本描述
// @author       作者
// @match        https://example.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
  'use strict'
  // 你的代码
})()
```

### 关键头字段

| 字段 | 说明 |
|------|------|
| `@name` | 脚本名称 |
| `@namespace` | 命名空间，用于区分同名脚本 |
| `@version` | 版本号 |
| `@description` | 脚本描述 |
| `@author` | 作者 |
| `@match` / `@include` | 匹配的 URL 模式 |
| `@exclude` | 排除的 URL |
| `@require` | 加载外部库（如 jQuery） |
| `@grant` | 声明使用的 GM_* API |
| `@run-at` | 脚本注入时机 |
| `@connect` | GM_xmlhttpRequest 允许的域名 |
| `@resource` | 预加载的资源 |

## 第一个脚本

```js
// ==UserScript==
// @name         Hello World
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在页面左上角显示 Hello World
// @author       You
// @match        https://*/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict'

  GM_addStyle(`
    #hello-world-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #4CAF50;
      color: white;
      text-align: center;
      padding: 8px;
      z-index: 999999;
      font-size: 16px;
    }
  `)

  const banner = document.createElement('div')
  banner.id = 'hello-world-banner'
  banner.textContent = 'Hello Tampermonkey!'
  document.body.prepend(banner)
})()
```

## 常用模式

### DOM 监听（等待元素出现）

```js
function waitForElement(selector, callback) {
  const observer = new MutationObserver(() => {
    const el = document.querySelector(selector)
    if (el) {
      observer.disconnect()
      callback(el)
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })
}

waitForElement('.target-class', (el) => {
  el.textContent = '已被脚本修改'
})
```

### AJAX 拦截（劫持接口响应）

```js
const originalFetch = window.fetch
window.fetch = function (...args) {
  return originalFetch.apply(this, args).then((response) => {
    const cloned = response.clone()
    if (args[0].includes('/api/target')) {
      cloned.json().then((data) => {
        console.log('拦截到 API 数据:', data)
      })
    }
    return response
  })
}
```

### 数据持久化

```js
const key = 'my_setting'
let value = GM_getValue(key, 'default')
GM_setValue(key, 'new_value')
```

## 调试技巧

1. **管理面板**：浏览器工具栏点击 Tampermonkey 图标 → 管理面板
2. **控制台日志**：使用 `GM_log()` 或 `console.log()`
3. **实时编辑**：在管理面板中编辑脚本，保存后自动生效
4. **检查更新**：`@updateURL` 和 `@downloadURL` 指定自动更新地址

## 发布脚本

可发布到以下平台分享脚本：

- [Greasy Fork](https://greasyfork.org/)
- [OpenUserJS](https://openuserjs.org/)
