# 插件调试技巧

Chrome 扩展开发中，调试是不可或缺的一环。以下是常用的调试方法。

## 调试不同模块

### Background Service Worker (V3)

1. 在 Chrome 地址栏输入 `chrome://extensions/`
2. 找到你的插件，点击 **Service Worker** 链接
3. 在弹出的 DevTools 窗口中调试

### Background Page (V2)

1. `chrome://extensions/`
2. 找到插件，点击 **background page** 链接

### Popup

1. 右键点击插件图标
2. 选择 **审查弹出内容**（Inspect popup）
3. 或者在 popup 打开时按 F12

### Options Page

1. 右键点击插件图标 → 选项
2. 在选项页面按 F12 打开 DevTools

### Content Script

1. 打开注入内容的页面
2. 在该页面的 DevTools 中
3. Console 右上角下拉 → 选择 `chrome-extension://your-ext-id/` 上下文

### DevTools Panel

1. 打开 DevTools（F12）
2. 在 DevTools 中再按一次 **Ctrl+Shift+I** (Win) / **Cmd+Option+I** (Mac)
3. 第二个 DevTools 窗口中调试 devtools 页面

## Console 技巧

```javascript
// 查看插件信息
console.log(chrome.runtime.getManifest());

// 查看当前模块可用的 API
console.log(Object.keys(chrome));

// 查看 runtime 错误
console.log(chrome.runtime.lastError);

// 耗时统计
console.time('fetchData');
await fetch('https://api.example.com/data');
console.timeEnd('fetchData');
```

## 错误日志

### 查看扩展错误

`chrome://extensions/` → 插件卡片上的 **错误** 按钮（或点击 `chrome.runtime.lastError`）

### 监听未捕获的错误

```javascript
// background.js
self.addEventListener('error', event => {
  console.error('全局错误:', event.error);
  // 上报错误
  chrome.storage.local.get('errorLogs', data => {
    const logs = data.errorLogs || [];
    logs.push({ message: event.error.message, time: Date.now() });
    chrome.storage.local.set({ errorLogs: logs.slice(-100) });
  });
});

self.addEventListener('unhandledrejection', event => {
  console.error('未处理的 Promise 拒绝:', event.reason);
});
```

## 断点调试

```javascript
// 使用 debugger 语句
function complexLogic(data) {
  debugger;  // 代码执行到这里会自动暂停
  // ...
}
```

## 网络请求调试

```javascript
// 监控 fetch 请求
chrome.devtools.network.onRequestFinished.addListener(req => {
  console.log(req.request.url, req.response.status);
});
```

## 存储数据检查

在 DevTools Console 中：

```javascript
// 检查 local 存储
chrome.storage.local.get(null, console.log);

// 检查 sync 存储
chrome.storage.sync.get(null, console.log);

// 检查 session 存储 (V3)
chrome.storage.session.get(null, console.log);

// 监听存储变化
chrome.storage.onChanged.addListener((changes, area) => {
  console.log('存储变化:', area, changes);
});
```

## 日志管理

```javascript
// 使用日志等级
const Log = {
  levels: { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 },
  currentLevel: 0,

  debug(...args) {
    if (this.currentLevel <= 0) console.debug('[Ext]', ...args);
  },
  info(...args) {
    if (this.currentLevel <= 1) console.info('[Ext]', ...args);
  },
  warn(...args) {
    if (this.currentLevel <= 2) console.warn('[Ext]', ...args);
  },
  error(...args) {
    if (this.currentLevel <= 3) console.error('[Ext]', ...args);
  }
};

// 开发模式下显示所有日志，生产模式只显示警告和错误
if (chrome.runtime.getManifest().version.includes('dev')) {
  Log.currentLevel = Log.levels.DEBUG;
} else {
  Log.currentLevel = Log.levels.WARN;
}
```

## 扩展内部页面

| 页面 | 地址 | 用途 |
|---|---|---|
| 扩展管理 | `chrome://extensions/` | 管理所有插件 |
| 扩展错误 | `chrome://extensions/?errors=EXT_ID` | 查看错误日志 |
| 扩展状态 | `chrome://extensions/?id=EXT_ID` | 查看单个插件状态 |
| Inspect Service Worker | Extension 卡片上的链接 | 调试 Service Worker |
| 组件 | `chrome://components/` | 查看组件版本 |
| 进程 | `chrome://process-internals/` | 查看进程信息 |
| 版本 | `chrome://version/` | 浏览器版本信息 |
| 标志 | `chrome://flags/` | 实验性功能（慎用） |

## 热重载（开发时）

```javascript
// background.js 开发用热重载
function watchReload() {
  chrome.runtime.getPackageDirectoryEntry(entry => {
    const watcher = entry.createReader();
    setInterval(() => {
      watcher.readEntries(entries => {
        entries.forEach(entry => {
          if (entry.isDirectory) {
            // 递归监听
          }
        });
      });
    }, 1000);
  });
}

// 生产环境禁用
if (chrome.runtime.getManifest().version.includes('dev')) {
  watchReload();
}
```

## 常用调试命令

```javascript
// 重新加载插件
chrome.runtime.reload();

// 获取插件 ID
console.log(chrome.runtime.id);

// 获取 manifest 信息
console.table(chrome.runtime.getManifest());

// 检查是否有错误
console.log(chrome.runtime.lastError?.message);

// 列出所有标签页
chrome.tabs.query({}, tabs => {
  console.table(tabs.map(t => ({ id: t.id, title: t.title, url: t.url })));
});
```
