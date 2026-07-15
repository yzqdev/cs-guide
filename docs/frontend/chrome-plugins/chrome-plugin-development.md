# Chrome 插件开发指南

## 官方文档

- [Chrome Extensions API 文档](https://developer.chrome.com/docs/extensions/)
- [JSON Schema 参考](https://www.schemastore.org/json/)
- [Chrome Extensions 示例](https://github.com/GoogleChrome/chrome-extensions-samples)

## 快速开始

一个最简单的 Chrome 插件只需要一个 `manifest.json` 文件：

```json
{
  "manifest_version": 3,
  "name": "Hello World",
  "version": "1.0.0",
  "description": "第一个 Chrome 插件",
  "action": {
    "default_popup": "popup.html"
  }
}
```

对应的 `popup.html`：

```html
<!DOCTYPE html>
<html>
<body>
  <h1>Hello World!</h1>
</body>
</html>
```

## 常见问题

### 1. Content Security Policy (CSP) 问题

使用 Webpack/Vue 开发时，如果遇到：

```
Refused to load the script because it violates the following Content Security Policy
```

**Manifest V2** 可以在 manifest.json 配置 CSP：

```json
{
  "content_security_policy": "script-src 'self' http://localhost:3303 'unsafe-eval'; object-src 'self'"
}
```

**Manifest V3** 不允许自定义 CSP，默认严格限制。开发时可以：

1. 使用 `chrome.scripting.executeScript` 动态注入
2. 使用 `web_accessible_resources` 暴露资源
3. 避免使用 `eval()` 和远程脚本

### 2. 跨域请求

```javascript
// background.js 中发起请求（没有跨域限制）
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'FETCH') {
    fetch(request.url)
      .then(res => res.json())
      .then(data => sendResponse(data));
    return true;
  }
});

// content script 中调用
chrome.runtime.sendMessage(
  { type: 'FETCH', url: 'https://api.example.com/data' },
  data => console.log(data)
);
```

### 3. 权限配置参考

```json
{
  "permissions": [
    "storage",
    "activeTab",
    "scripting"
  ],
  "host_permissions": [
    "*://*/*"
  ],
  "web_accessible_resources": [
    {
      "resources": ["dist/*", "assets/*"],
      "matches": ["<all_urls>"]
    }
  ]
}
```

## 模块架构

Chrome 插件由以下几个核心模块组成：

| 模块 | 作用 | 运行环境 |
|---|---|---|
| **Service Worker (V3) / Background (V2)** | 后台事件处理，核心逻辑 | 独立的扩展进程 |
| **Content Script** | 注入到网页，操作 DOM | 页面上下文 |
| **Popup** | 工具栏弹窗，临时 UI | 独立页面 |
| **Options** | 插件设置页面 | 独立页面 |
| **DevTools** | 开发者工具面板 | DevTools 上下文 |

详细说明请参见 [插件架构详解](architecture.md)。

## 消息通信

```javascript
// 发送消息
chrome.runtime.sendMessage({ action: 'greet' }, response => {
  console.log(response);
});

// 接收消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  sendResponse({ message: 'Hello from background!' });
});
```

详细说明请参见 [消息通信机制](message-passing.md)。

## 模板推荐

### Vue/React 模板

| 模板 | 技术栈 | 特点 |
|---|---|---|
| [vitesse-webext](https://github.com/antfu-collective/vitesse-webext) | Vue + Vite + WXT | 热更新，多浏览器支持 |
| [chrome-extension-boilerplate-react-vite](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite) | React + Vite | 完整工程化配置 |
| [web-extension-starter](https://github.com/abhijithvijayan/web-extension-starter) | React + Webpack | 支持 Chrome/Firefox/Opera |

### 脚手架工具

| 工具 | 说明 |
|---|---|
| [WXT](https://wxt.dev/) | 新一代 Web 扩展开发框架，支持 Vue/React/Svelte，Vite 驱动 |
| [Plasmo](https://docs.plasmo.com/) | 类似 Next.js 的扩展开发框架，React + TypeScript |
| [Extension CLI](https://github.com/cedricboom/extension-cli) | 命令行快速创建扩展项目 |

## 学习路径

1. 先阅读 [manifest.json 详解](manifest-intro.md) 了解配置文件
2. 通过 [插件架构详解](architecture.md) 理解各模块职责
3. 掌握 [消息通信](message-passing.md) 和 [Content Scripts](content-scripts.md) 核心概念
4. 使用 [Vue 开发插件](vue-to-chromeplugin.md) 或模板工程化开发
5. 通过 [调试技巧](debug.md) 高效调试
6. 完成开发后参考 [发布指南](publish.md) 上架商店