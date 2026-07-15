# 插件架构详解

Chrome 扩展由多个模块组成，每个模块运行在不同的上下文中，承担不同的职责。

## 架构总览

```
┌─────────────────────────────────────────────────────┐
│                   Chrome 浏览器                        │
│  ┌──────────────────────┐  ┌──────────────────────┐  │
│  │   Background Script   │  │    Service Worker    │  │
│  │   (V2) / SW (V3)     │  │    长期/事件驱动      │  │
│  └──────────┬───────────┘  └──────────────────────┘  │
│             │                                         │
│  ┌──────────▼───────────┐  ┌──────────────────────┐  │
│  │      Content Scripts  │  │  Popup / Options      │  │
│  │     (注入到网页中)     │  │  (独立页面)           │  │
│  └──────────┬───────────┘  └──────────────────────┘  │
│             │                                         │
│  ┌──────────▼───────────┐  ┌──────────────────────┐  │
│  │    DevTools Page      │  │    Injected Script    │  │
│  │   (开发者工具面板)     │  │  (通过 DOM 注入)      │  │
│  └──────────────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## 模块详解

### 1. Background Script (V2) / Service Worker (V3)

**作用**：插件的核心后台逻辑，处理事件、管理状态、调用 API。

**V2 - Background Script**：
- 常驻后台，持续运行
- 可以访问所有 Chrome API
- 有完整的 DOM 访问能力

```json
// manifest.json (V2)
{
  "background": {
    "scripts": ["background.js"],
    "persistent": true
  }
}
```

**V3 - Service Worker**：
- 事件驱动，不使用时休眠
- 不能直接访问 DOM
- 需要注册 `onInstalled`、`onMessage` 等事件监听器

```json
// manifest.json (V3)
{
  "background": {
    "service_worker": "background.js",
    "type": "module"
  }
}
```

```javascript
// background.js (V3)
chrome.runtime.onInstalled.addListener(() => {
  console.log('插件已安装');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchData') {
    fetch(request.url).then(res => res.json()).then(sendResponse);
    return true;
  }
});
```

**V3 Service Worker 注意事项**：
- 不要使用全局变量——休眠后会被重置
- 使用 `chrome.storage` 持久化状态
- 使用 `chrome.alarms` 代替 `setInterval`/`setTimeout`
- 使用 `chrome.tabs` 操作标签页

### 2. Content Scripts

**作用**：注入到网页中运行，可以读取和修改页面 DOM。

**特点**：
- 运行在隔离的上下文中（V3 的 `ISOLATED` world）
- 只能访问部分 Chrome API（`runtime`、`storage`、`i18n` 等）
- 不能访问页面中的 JavaScript 变量和函数

```javascript
// content.js
console.log('Content script 已注入');

// 可以操作 DOM
document.body.style.backgroundColor = '#f0f0f0';

// 可以与 background 通信
chrome.runtime.sendMessage({ type: 'FROM_CONTENT', data: 'hello' }, response => {
  console.log('收到响应:', response);
});
```

### 3. Popup

**作用**：点击工具栏图标时弹出的临时页面。

**特点**：
- 点击图标时创建，关闭时销毁
- 可以是 HTML 页面，支持 Vue/React 等框架
- 可以调用大部分 Chrome API

```html
<!-- popup.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { width: 300px; height: 400px; }
  </style>
</head>
<body>
  <h1>我的插件</h1>
  <button id="btn">点击</button>
  <script src="popup.js"></script>
</body>
</html>
```

```javascript
// popup.js
document.getElementById('btn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'showAlert' });
  });
});
```

### 4. Options Page

**作用**：插件的设置页面。

```json
{
  "options_ui": {
    "page": "options.html",
    "open_in_tab": true
  }
}
```

- `open_in_tab: true` 在新标签页打开
- `open_in_tab: false` 在弹窗中打开（默认）

### 5. DevTools Page

**作用**：扩展 Chrome 开发者工具的功能。

```json
{
  "devtools_page": "devtools.html"
}
```

```javascript
// devtools.js
chrome.devtools.panels.create(
  'MyPanel',
  'icon.png',
  'panel.html',
  panel => console.log('面板已创建')
);
```

可用的 DevTools API：
- `chrome.devtools.panels` — 创建和管理面板
- `chrome.devtools.inspectedWindow` — 与被检查页面交互
- `chrome.devtools.network` — 监听网络请求
- `chrome.devtools.recorder` — 录制用户操作

## 模块间通信关系

```
┌─────────┐     runtime.sendMessage     ┌──────────┐
│  Popup   │◄──────────────────────────►│ Background│
└─────────┘                             │  / SW    │
      ▲                                 └────┬─────┘
      │ tabs.sendMessage                     │ runtime.sendMessage
      ▼                                      ▼
┌─────────┐                          ┌──────────┐
│Content  │◄────────────────────────►│ Options  │
│ Scripts │   runtime.sendMessage    │  Page    │
└─────────┘                          └──────────┘
```

## 生命周期

### 安装/更新时

```javascript
chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'install') {
    // 首次安装
    chrome.tabs.create({ url: 'welcome.html' });
  } else if (details.reason === 'update') {
    // 版本更新
    console.log('从', details.previousVersion, '更新');
  }
});
```

### V3 Service Worker 生命周期

1. **注册**：浏览器启动或安装插件时注册
2. **启动**：需要响应事件时激活
3. **运行**：处理事件（约 30 秒不活动后休眠）
4. **休眠**：资源被释放
5. **重启**：新事件触发时重新激活

## 最佳实践

1. **最小权限原则**：只申请需要的权限
2. **Service Worker 无状态**：使用 `chrome.storage` 持久化数据
3. **避免内存泄漏**：及时移除事件监听器
4. **使用异步 API**：优先使用 Promise 形式的 API
5. **代码分割**：按模块拆分，减少 Service Worker 加载时间
