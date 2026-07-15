# DevTools 扩展开发

Chrome DevTools 扩展可以自定义开发者工具面板，添加新的调试功能。

## 基础配置

```json
{
  "devtools_page": "devtools.html"
}
```

```html
<!-- devtools.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <script src="devtools.js"></script>
</head>
<body></body>
</html>
```

## 创建面板 (Panels)

```javascript
// devtools.js
chrome.devtools.panels.create(
  'My Panel',             // 面板标题
  'icons/icon24.png',     // 面板图标
  'panel.html',           // 面板页面
  panel => {
    console.log('面板已创建:', panel.name);

    // 面板显示/隐藏时触发
    panel.onShown.addListener(panelWindow => {
      console.log('面板已显示');
    });

    panel.onHidden.addListener(() => {
      console.log('面板已隐藏');
    });
  }
);
```

## 与 inspectedWindow 交互

```javascript
// 在页面中执行代码
chrome.devtools.inspectedWindow.eval(
  'document.body.innerHTML.substring(0, 1000)',
  (result, exceptionInfo) => {
    if (!exceptionInfo) {
      console.log('页面 HTML 前 1000 字符:', result);
    } else {
      console.error('执行出错:', exceptionInfo);
    }
  }
);

// 带参数执行
chrome.devtools.inspectedWindow.eval(
  `(function(selector) {
    return document.querySelector(selector)?.innerText;
  })('h1')`,
  (result, error) => {
    if (!error) console.log('h1 内容:', result);
  }
);
```

## 监听网络请求

```javascript
// devtools.js
chrome.devtools.network.onRequestFinished.addListener(request => {
  const { url, method } = request.request;
  console.log(`请求: ${method} ${url}`);

  // 获取响应体
  if (url.includes('/api/data')) {
    request.getContent(content => {
      console.log('响应内容:', content);
    });
  }
});

// 获取网络请求的 HAR 日志
chrome.devtools.network.getHAR(harLog => {
  console.log('所有请求:', harLog.entries.length);
});
```

## 添加侧边栏

```javascript
// 创建元素面板侧边栏
chrome.devtools.panels.elements.createSidebarPane(
  'My Sidebar',
  sidebar => {
    sidebar.setObject({ foo: 'bar', count: 42 });
    sidebar.setExpression('document.querySelector("h1")?.textContent', '页面标题');
  }
);
```

## 通信

```javascript
// devtools -> background
chrome.runtime.sendMessage(
  { type: 'FROM_DEVTOOLS', data: 'hello' },
  response => console.log(response)
);

// background -> devtools
// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (sender.tab && sender.url.includes('devtools')) {
    // 来自 devtools 面板的消息
  }
});

// devtools <-> content script（通过 background 中转）
// devtools.js -> background -> content script
```

## 实时更新

```javascript
// 监听选中元素的 CSS 修改
chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
  chrome.devtools.inspectedWindow.eval(
    '($0) ? $0.tagName : "no selection"',
    (result, error) => {
      if (!error) console.log('选中元素:', result);
    }
  );
});
```

## 调试指南

使用 Chrome DevTools 调试 DevTools 扩展本身：
1. 打开任意页面
2. 打开开发者工具（F12）
3. 在开发者工具中按 **Ctrl+Shift+I** (Windows) 或 **Cmd+Option+I** (Mac)
4. 现在可以调试 devtools 页面的代码了
