# 常用 Chrome API

Chrome 扩展提供了丰富的 API，本节介绍最常用的一些 API 及其使用场景。

## Tabs — 标签页管理

```javascript
// 创建标签页
chrome.tabs.create({ url: 'https://example.com', active: true });

// 查询标签页
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const currentTab = tabs[0];
  console.log('当前标签页:', currentTab.url, currentTab.title);
});

// 获取指定标签页
chrome.tabs.get(tabId, tab => {
  console.log('标签页信息:', tab);
});

// 更新标签页
chrome.tabs.update(tabId, { url: 'https://new-url.com', highlighted: true });

// 关闭标签页
chrome.tabs.remove(tabId);

// 重新加载标签页
chrome.tabs.reload(tabId, { bypassCache: true });

// 复制标签页
chrome.tabs.duplicate(tabId);

// 获取当前标签页的语言
chrome.tabs.detectLanguage(tabId, lang => {
  console.log('页面语言:', lang);
});

// 监听标签页变化
chrome.tabs.onCreated.addListener(tab => {});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log('页面加载完成:', tab.url);
  }
});
chrome.tabs.onActivated.addListener(activeInfo => {
  console.log('切换到标签页:', activeInfo.tabId);
});
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {});
```

## Windows — 窗口管理

```javascript
// 创建新窗口
chrome.windows.create({
  url: 'https://example.com',
  type: 'popup',
  width: 800,
  height: 600,
  top: 100,
  left: 100
});

// 查询窗口
chrome.windows.getAll({ populate: true }, windows => {
  windows.forEach(w => {
    console.log(`窗口 ${w.id}: ${w.tabs?.length} 个标签页`);
  });
});

// 获取当前窗口
chrome.windows.getCurrent(window => {
  console.log('当前窗口:', window);
});

// 更新窗口
chrome.windows.update(windowId, { state: 'maximized' });

// 关闭窗口
chrome.windows.remove(windowId);

// 监听
chrome.windows.onCreated.addListener(window => {});
chrome.windows.onFocusChanged.addListener(windowId => {});
chrome.windows.onRemoved.addListener(windowId => {});
```

## Context Menus — 右键菜单

```json
{
  "permissions": ["contextMenus"]
}
```

```javascript
// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'searchText',
    title: '搜索选中文本',
    contexts: ['selection']
  });

  chrome.contextMenus.create({
    id: 'parentMenu',
    title: '我的插件',
    contexts: ['page', 'link', 'image']
  });

  chrome.contextMenus.create({
    id: 'childMenu1',
    parentId: 'parentMenu',
    title: '功能一',
    contexts: ['page']
  });

  chrome.contextMenus.create({
    id: 'childMenu2',
    parentId: 'parentMenu',
    title: '功能二',
    contexts: ['link']
  });
});

// 点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case 'searchText':
      const query = encodeURIComponent(info.selectionText);
      chrome.tabs.create({ url: `https://google.com/search?q=${query}` });
      break;
    case 'childMenu1':
      console.log('功能一', tab.url);
      break;
  }
});

// 更新菜单
chrome.contextMenus.update('menuId', { title: '新标题' });

// 删除菜单
chrome.contextMenus.remove('menuId');
chrome.contextMenus.removeAll();
```

## Commands — 键盘快捷键

```json
{
  "commands": {
    "_execute_action": {
      "suggested_key": {
        "default": "Ctrl+Shift+Y",
        "mac": "Command+Shift+Y"
      },
      "description": "打开弹出页面"
    },
    "toggle-feature": {
      "suggested_key": {
        "default": "Ctrl+Shift+F",
        "mac": "Command+Shift+F"
      },
      "description": "切换功能开关"
    }
  }
}
```

```javascript
// background.js
chrome.commands.onCommand.addListener(command => {
  if (command === 'toggle-feature') {
    console.log('快捷键触发: 切换功能');
  }
});
```

## Notifications — 通知

```json
{
  "permissions": ["notifications"]
}
```

```javascript
// 简单通知
chrome.notifications.create({
  type: 'basic',
  iconUrl: 'icons/icon128.png',
  title: '提醒',
  message: '这是一个通知',
  priority: 2,
  buttons: [{ title: '查看' }, { title: '忽略' }],
  requireInteraction: true
}, notificationId => {
  console.log('通知 ID:', notificationId);
});

// 通知类型
const notifications = {
  basic: { type: 'basic', title: '基础通知', message: '文字和图标' },
  image: { type: 'image', title: '图片通知', message: '带大图', imageUrl: 'image.png' },
  progress: { type: 'progress', title: '进度通知', message: '下载中', progress: 50 }
};

// 更新通知
chrome.notifications.update(notificationId, { progress: 75 });

// 清除通知
chrome.notifications.clear(notificationId);

// 事件
chrome.notifications.onClicked.addListener(notificationId => {
  chrome.tabs.create({ url: 'https://example.com' });
});

chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (buttonIndex === 0) { /* 查看 */ }
  if (buttonIndex === 1) { /* 忽略 */ }
});
```

## Alarms — 定时任务

```javascript
// 创建一次性定时器（1分钟后）
chrome.alarms.create('oneTimeAlarm', { delayInMinutes: 1 });

// 创建周期性定时器（每30分钟）
chrome.alarms.create('periodicAlarm', { periodInMinutes: 30 });

// 创建指定时间的定时器
chrome.alarms.create('scheduledAlarm', {
  when: Date.now() + 60000,  // 1分钟后
  periodInMinutes: 60
});

// 监听定时器
chrome.alarms.onAlarm.addListener(alarm => {
  switch (alarm.name) {
    case 'oneTimeAlarm':
      console.log('一次性定时器触发');
      break;
    case 'periodicAlarm':
      checkForUpdates();
      break;
    case 'scheduledAlarm':
      syncData();
      break;
  }
});

// 获取所有定时器
chrome.alarms.getAll(alarms => {
  alarms.forEach(a => console.log(a.name, '下次触发:', new Date(a.scheduledTime)));
});

// 清除定时器
chrome.alarms.clear('oneTimeAlarm');
chrome.alarms.clearAll();
```

## Downloads — 下载管理

```json
{
  "permissions": ["downloads"]
}
```

```javascript
// 下载文件
chrome.downloads.download({
  url: 'https://example.com/file.zip',
  filename: 'downloads/file.zip',
  conflictAction: 'uniquify',
  saveAs: true
}, downloadId => {
  console.log('下载 ID:', downloadId);
});

// 搜索下载记录
chrome.downloads.search({
  query: ['report'],
  limit: 10,
  orderBy: ['-startTime']
}, results => {
  results.forEach(item => {
    console.log(item.filename, item.state, item.bytesReceived);
  });
});

// 暂停/恢复/取消
chrome.downloads.pause(downloadId);
chrome.downloads.resume(downloadId);
chrome.downloads.cancel(downloadId);

// 打开下载的文件
chrome.downloads.open(downloadId);

// 显示在文件管理器中
chrome.downloads.show(downloadId);

// 监听事件
chrome.downloads.onCreated.addListener(downloadItem => {});
chrome.downloads.onChanged.addListener(({ id, state }) => {
  if (state?.current === 'complete') {
    console.log('下载完成:', id);
  }
});
```

## Bookmark — 书签

```json
{
  "permissions": ["bookmarks"]
}
```

```javascript
// 创建书签
chrome.bookmarks.create({
  parentId: '1',   // 书签栏
  title: '我的书签',
  url: 'https://example.com'
});

// 创建文件夹
chrome.bookmarks.create({
  parentId: '1',
  title: '开发工具'
});

// 查询书签
chrome.bookmarks.search('keyword', results => {
  results.forEach(bm => console.log(bm.title, bm.url));
});

// 获取树形结构
chrome.bookmarks.getTree(bookmarkTree => {
  console.log(JSON.stringify(bookmarkTree, null, 2));
});

// 移除
chrome.bookmarks.remove(bookmarkId);
chrome.bookmarks.removeTree(folderId);
```

## Runtime — 运行时

```javascript
// 插件信息
const manifest = chrome.runtime.getManifest();
console.log(manifest.name, manifest.version);

// 获取 URL（用于 web_accessible_resources）
const url = chrome.runtime.getURL('images/icon.png');

// 获取 background page (V2 only)
const bg = chrome.runtime.getBackgroundPage();

// 打开选项页面
chrome.runtime.openOptionsPage();

// 重新加载插件
chrome.runtime.reload();

// 获取平台信息
chrome.runtime.getPlatformInfo(info => {
  console.log('平台:', info.os, info.arch);
});

// 获取语言
const lang = chrome.runtime.getUILanguage();
console.log('浏览器语言:', lang);

// 国际化
chrome.i18n.getMessage('@@ui_locale');
```

## 权限请求

```javascript
// 请求额外权限
chrome.permissions.request({
  permissions: ['notifications'],
  origins: ['https://example.com/*']
}, granted => {
  if (granted) {
    console.log('权限已授权');
  }
});

// 检查权限
chrome.permissions.contains({
  permissions: ['notifications']
}, hasPermission => {
  console.log('是否有通知权限:', hasPermission);
});

// 移除权限
chrome.permissions.remove({
  permissions: ['notifications']
}, removed => {
  console.log('权限已移除:', removed);
});
```

## 事件页面最佳实践

```javascript
// V3 Service Worker 中注册监听器
chrome.runtime.onInstalled.addListener(() => {
  // 初始化
});

chrome.runtime.onStartup.addListener(() => {
  // 浏览器启动时
});

chrome.runtime.onSuspend.addListener(() => {
  // Service Worker 即将休眠
});

// 使用 alarms 代替 setTimeout
// ❌ 不推荐
setTimeout(() => { /* ... */ }, 60000);

// ✅ 推荐
chrome.alarms.create('task', { delayInMinutes: 1 });
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'task') { /* ... */ }
});
```

## API 浏览器兼容性

使用 `chrome` 还是 `browser` API？

| 浏览器 | API 命名空间 |
|---|---|
| Chrome | `chrome.*` |
| Firefox | `browser.*` (也支持 `chrome.*`) |
| Edge | `chrome.*` |
| Opera | `chrome.*` |

使用 webextension-polyfill 可以统一 API：

```javascript
import browser from 'webextension-polyfill';

// 统一的 API
const tabs = await browser.tabs.query({ active: true });
```
