# Content Scripts 深入

Content Scripts 是 Chrome 扩展中运行在网页上下文中的脚本，可以读取和修改页面 DOM，但运行在隔离的环境中。

## 注入方式

### 1. 静态声明（manifest.json）

```json
{
  "content_scripts": [
    {
      "matches": ["https://github.com/*"],
      "js": ["content.js"],
      "css": ["styles.css"],
      "run_at": "document_idle",
      "world": "ISOLATED",
      "all_frames": false,
      "match_about_blank": true
    }
  ]
}
```

### 2. 动态注入（Programmatic Injection）

V3 推荐使用 `chrome.scripting` API 动态注入：

```javascript
// background.js
chrome.action.onClicked.addListener(tab => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    files: ['content.js']
  });
});

// 注入函数（不用单独文件）
chrome.scripting.executeScript({
  target: { tabId: tab.id },
  func: () => {
    document.body.style.border = '5px solid red';
  }
});

// 注入 CSS
chrome.scripting.insertCSS({
  target: { tabId: tab.id },
  files: ['styles.css']
});

// 移除 CSS
chrome.scripting.removeCSS({
  target: { tabId: tab.id },
  files: ['styles.css']
});
```

需要 `scripting` 权限：

```json
{
  "permissions": ["scripting"],
  "host_permissions": ["https://*/*"]
}
```

## 执行时机

| `run_at` | 说明 |
|---|---|
| `document_start` | DOM 开始加载时执行（CSS 之前），适合注入样式 |
| `document_end` | DOM 加载完成但资源未加载完 |
| `document_idle` | 页面完全加载后执行（默认） |

```javascript
// document_start 常用于提前注入 CSS
// content.js (在 document_start 时执行)
chrome.runtime.sendMessage({ type: 'PAGE_START', url: location.href });
```

## 执行环境 (World)

### Manifest V3 的 World 概念

V3 引入了 `world` 概念来隔离执行环境：

```json
{
  "content_scripts": [
    {
      "matches": ["https://*/*"],
      "js": ["content.js"],
      "world": "ISOLATED"
    }
  ]
}
```

| World | 说明 |
|---|---|
| `ISOLATED` | 默认。content script 运行在隔离环境，不能访问页面 JS 变量 |
| `MAIN` | V3 新增。脚本与页面共享执行环境，可以访问页面 JS 变量和函数 |

### 在 ISOLATED 中访问页面 JS

如果需要访问页面中的 JavaScript 变量（如在 ISOLATED world 中），可以通过注入 `<script>` 标签：

```javascript
// content.js
function injectScript(filePath) {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL(filePath);
  script.onload = () => script.remove();
  (document.head || document.documentElement).appendChild(script);
}

injectScript('injected.js');
```

```json
{
  "web_accessible_resources": [
    {
      "resources": ["injected.js"],
      "matches": ["https://*/*"]
    }
  ]
}
```

```javascript
// injected.js - 在 MAIN world 执行
window.__CUSTOM_VAR = '可以从页面访问';

// 可以覆盖页面函数
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log('fetch 被拦截:', args);
  return originalFetch.apply(this, args);
};
```

### ISOLATED vs MAIN 通信

```javascript
// content.js (ISOLATED world)
window.addEventListener('message', event => {
  if (event.source !== window) return;
  if (event.data?.type === 'FROM_PAGE') {
    console.log('页面数据:', event.data.payload);
  }
});

// 向页面发送消息
window.postMessage({ type: 'FROM_EXTENSION', payload: 'hello' }, '*');
```

## Content Script 可用的 Chrome API

Content Script 可以访问以下 Chrome API：

| API | 说明 |
|---|---|
| `chrome.runtime` | 运行时通信、ID 获取 |
| `chrome.storage` | 存储数据 |
| `chrome.i18n` | 国际化 |
| `chrome.extension` | 部分方法 |
| `chrome.dom` | DOM 操作辅助 |

不能访问的 API（需要在 background 中调用）：
- `chrome.tabs`
- `chrome.windows`
- `chrome.bookmarks`
- `chrome.downloads`
- `chrome.notifications`

## DOM 操作技巧

### 等待元素出现

```javascript
function waitForElement(selector) {
  return new Promise(resolve => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }
    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        observer.disconnect();
        resolve(el);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

// 使用
waitForElement('.target-class').then(el => {
  el.style.color = 'red';
});
```

### 监听 DOM 变化

```javascript
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1 && node.matches?.('.dynamic-content')) {
        console.log('新内容已添加:', node);
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
```

### 操作 Shadow DOM

```javascript
// 查找 Shadow DOM 宿主
const host = document.querySelector('.shadow-host');
if (host?.shadowRoot) {
  const shadowEl = host.shadowRoot.querySelector('.shadow-content');
  if (shadowEl) {
    shadowEl.textContent = '被 content script 修改了';
  }
}
```

## 与页面交互的最佳实践

### 1. 避免样式冲突

将 content script 的 CSS 类名添加特定前缀：

```css
/* styles.css */
.my-ext-container { all: initial; }
.my-ext-container * { box-sizing: border-box; }
.my-ext-button { /* ... */ }
```

### 2. 使用 MutationObserver 而非轮询

```javascript
// ❌ 不推荐：轮询
setInterval(() => {
  const el = document.querySelector('.target');
  if (el) { /* ... */ }
}, 100);

// ✅ 推荐：MutationObserver
const observer = new MutationObserver(/* ... */);
```

### 3. 性能优化

```javascript
// 批量操作 DOM，减少重排
const fragment = document.createDocumentFragment();
for (const item of items) {
  const div = document.createElement('div');
  div.textContent = item;
  fragment.appendChild(div);
}
document.body.appendChild(fragment);

// 使用 requestAnimationFrame
requestAnimationFrame(() => {
  // 在下一帧执行 DOM 操作
});
```

### 4. 清理资源

```javascript
let observer = null;

function init() {
  observer = new MutationObserver(/* ... */);
  observer.observe(document.body, { childList: true, subtree: true });
}

function cleanup() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}

// 页面卸载时清理
window.addEventListener('beforeunload', cleanup);
```

## 常见场景

### 1. 自动填写表单

```javascript
function fillForm(data) {
  Object.entries(data).forEach(([selector, value]) => {
    const el = document.querySelector(selector);
    if (el) {
      el.value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
}
```

### 2. 抓取页面数据

```javascript
function scrapeData() {
  const items = document.querySelectorAll('.item');
  return Array.from(items).map(item => ({
    title: item.querySelector('.title')?.textContent?.trim(),
    link: item.querySelector('a')?.href,
    price: item.querySelector('.price')?.textContent?.trim()
  }));
}
```

### 3. 注入第三方库

```javascript
// content.js
async function loadLibrary() {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('lib/dompurify.min.js');
  document.head.appendChild(script);

  await new Promise(resolve => { script.onload = resolve; });

  // 现在可以使用 DOMPurify
  const clean = DOMPurify.sanitize('<script>alert(1)</script>');
  console.log(clean); // 空字符串
}
```

## 安全注意事项

1. **不要信任页面数据**：页面可能被篡改，始终验证获取的数据
2. **使用 `textContent` 而非 `innerHTML`**：避免 XSS
3. **限制通信消息来源**：验证 `sender` 信息
4. **定期清理注入的元素和事件监听器**：防止内存泄漏
