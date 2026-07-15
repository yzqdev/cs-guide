# 消息通信机制

Chrome 扩展的不同模块（background、content scripts、popup、options、devtools）之间需要通信，Chrome 提供了多种消息传递机制。

## 通信方式概览

| 发送方 → 接收方 | API |
|---|---|
| Content Script → Background | `chrome.runtime.sendMessage` |
| Popup/Options → Background | `chrome.runtime.sendMessage` |
| Background → Content Script | `chrome.tabs.sendMessage` / `chrome.tabs.connect` |
| Popup → Content Script | `chrome.tabs.sendMessage` |
| DevTools → Background | `chrome.runtime.sendMessage` |
| DevTools → Content Script | `chrome.devtools.inspectedWindow.eval` |

## 一次性消息 (Simple One-Time Requests)

### 发送消息

```javascript
// 从 content script 或 popup 发送到 background
chrome.runtime.sendMessage(
  { type: 'GREETING', payload: 'Hello from content script!' },
  response => {
    console.log('收到 background 回复:', response);
  }
);
```

```javascript
// 从 background 发送到指定标签页的 content script
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  if (tabs[0]?.id) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: 'UPDATE_UI', payload: { color: 'red' } },
      response => console.log('content script 回复:', response)
    );
  }
});
```

### 接收消息

```javascript
// background.js 或 content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('收到消息:', request, '来自:', sender);

  if (request.type === 'GREETING') {
    sendResponse({ status: 'ok', message: '你好！' });
  }

  if (request.type === 'FETCH_DATA') {
    fetch(request.url)
      .then(res => res.json())
      .then(data => sendResponse({ status: 'ok', data }))
      .catch(err => sendResponse({ status: 'error', error: err.message }));
    return true; // 异步响应需要返回 true
  }
});
```

::: warning 注意
如果 `sendResponse` 是异步调用的，必须在 `onMessage` 回调中返回 `true`，以保持消息通道的开放。
:::

## 长连接 (Long-Lived Connections)

适用于需要多次交换消息的场景。

### 建立连接

```javascript
// content.js 发起连接
const port = chrome.runtime.connect({ name: 'content-background' });

port.postMessage({ type: 'INIT', data: { url: location.href } });

port.onMessage.addListener(msg => {
  console.log('收到后台消息:', msg);
});

port.onDisconnect.addListener(() => {
  console.log('连接断开');
});
```

### 接收连接

```javascript
// background.js
chrome.runtime.onConnect.addListener(port => {
  console.log('新的连接:', port.name, '来自:', port.sender);

  port.onMessage.addListener(msg => {
    console.log('收到消息:', msg);

    if (msg.type === 'INIT') {
      port.postMessage({ type: 'WELCOME', data: { tabId: port.sender.tab.id } });
    }
  });

  port.onDisconnect.addListener(() => {
    console.log('连接已断开');
  });
});
```

### 使用场景

- 实时数据推送（如通知、状态更新）
- 需要多次请求的对话（如表单逐步验证）
- WebSocket 代理

## 跨标签页通信

通过 background 作为中转，可以实现不同标签页之间的通信。

```javascript
// 标签页 A (content script)
chrome.runtime.sendMessage({
  type: 'BROADCAST',
  payload: { from: location.href, data: 'hello' }
});

// background.js 中转
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'BROADCAST') {
    chrome.tabs.query({}, tabs => {
      tabs.forEach(tab => {
        if (tab.id !== sender.tab?.id) {
          chrome.tabs.sendMessage(tab.id, {
            type: 'RECEIVE_BROADCAST',
            payload: request.payload
          });
        }
      });
    });
  }
});

// 标签页 B (content script)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'RECEIVE_BROADCAST') {
    console.log('收到广播:', request.payload);
  }
});
```

## Popup 与 Content Script 直接通信

Popup 可以直接与当前页面的 content script 通信。

```javascript
// popup.js
document.getElementById('btn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'GET_SELECTION' }, response => {
      document.getElementById('result').textContent = response.text;
    });
  });
});

// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'GET_SELECTION') {
    sendResponse({ text: window.getSelection().toString() });
  }
});
```

## Native Messaging（与本地应用通信）

Chrome 扩展可以与本地桌面应用通信。

```json
// manifest.json
{
  "permissions": ["nativeMessaging"]
}
```

```javascript
// 连接本地应用
const port = chrome.runtime.connectNative('com.myapp.native');

port.onMessage.addListener(msg => {
  console.log('收到本地应用消息:', msg);
});

port.onDisconnect.addListener(() => {
  console.log('本地应用断开:', chrome.runtime.lastError?.message);
});

port.postMessage({ text: 'Hello from extension!' });
```

本地应用需要注册 native messaging host 清单文件。

## 消息安全

- 始终验证消息来源（检查 `sender` 对象的 `url`、`tab`、`id` 等字段）
- 使用白名单模式过滤消息类型
- 对于 content scripts 的消息，验证来源 URL 是否在白名单内

```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 验证消息来源
  if (sender.id !== chrome.runtime.id) {
    return;
  }

  // 验证 content script 的来源 URL
  if (sender.url && !sender.url.startsWith('https://trusted.com')) {
    return;
  }

  // 处理消息
  if (request.type === 'ALLOWED_ACTION') {
    // ...
  }
});
```

## 调试技巧

- 使用 `chrome.runtime.lastError` 检查是否有错误
- 在 background 和 content script 中分别设置断点
- 使用 `chrome.runtime.getBackgroundPage` 在 popup 中访问 background 上下文

```javascript
// 在 popup 中调试
chrome.runtime.getBackgroundPage(bgWindow => {
  console.log(bgWindow.someBackgroundVariable);
});
```

## 常见问题

| 问题 | 原因 | 解决 |
|---|---|---|
| `sendResponse` 未被调用 | 异步时未返回 `true` | 在异步回调前 `return true` |
| 消息未到达 | 目标未加载/未监听 | 检查 `onMessage` 监听器是否正确注册 |
| 连接断开 | Service Worker 休眠 | 使用持久化连接或重新发送消息 |
| 跨域请求失败 | CSP 限制 | 在 background 中发起请求 |
