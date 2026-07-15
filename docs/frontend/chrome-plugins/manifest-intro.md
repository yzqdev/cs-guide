# manifest.json 详解

`manifest.json` 是 Chrome 扩展程序的核心配置文件，位于项目根目录，定义了插件的所有元数据和功能声明。

## 基本字段

```json
{
  "manifest_version": 3,
  "name": "我的插件",
  "version": "1.0.0",
  "description": "一个示例 Chrome 插件",
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "author": "your@email.com",
  "homepage_url": "https://example.com"
}
```

| 字段 | 说明 | 必填 |
|---|---|---|
| `manifest_version` | manifest 版本，目前为 2 或 3 | 是 |
| `name` | 插件名称（最长 45 字符） | 是 |
| `version` | 版本号，遵循 semver 格式 | 是 |
| `description` | 插件描述（最长 132 字符） | 否 |
| `icons` | 插件图标，需提供 16x16、48x48、128x128 | 推荐 |
| `author` | 作者邮箱 | 否 |
| `homepage_url` | 主页链接 | 否 |

## Manifest V2 vs V3 核心差异

| 对比项 | Manifest V2 | Manifest V3 |
|---|---|---|
| 后台脚本 | `background.scripts` / `background.page` | `background.service_worker`（Service Worker） |
| 权限模型 | 安装时声明所有权限 | 增加 `host_permissions` 分离管理 |
| 远程代码 | 允许 `eval()` 和远程脚本 | 禁止远程代码，禁止 `eval()` |
| 内容安全策略 | 在 manifest 中配置 | 通过 `host_permissions` 控制 |
| 网络请求 | `webRequest` + `webRequestBlocking` | 推荐 `declarativeNetRequest` |
| 浏览器操作 | `browser_action` | 统一为 `action` |
| 页面操作 | `page_action` | 统一为 `action` |

## 权限声明

### Manifest V3 权限

```json
{
  "permissions": [
    "storage",
    "activeTab",
    "notifications",
    "contextMenus",
    "alarms",
    "tabs",
    "scripting"
  ],
  "host_permissions": [
    "https://*.example.com/*",
    "http://*/*"
  ],
  "optional_permissions": [
    "clipboardRead",
    "clipboardWrite"
  ]
}
```

### 常见权限说明

| 权限 | 用途 |
|---|---|
| `storage` | 使用 `chrome.storage` API 存储数据 |
| `activeTab` | 临时获取当前标签页的访问权限 |
| `tabs` | 操作标签页（创建、查询、更新） |
| `scripting` | 向页面注入脚本和 CSS（V3 替代 `tabs.executeScript`） |
| `notifications` | 显示系统通知 |
| `contextMenus` | 添加右键菜单 |
| `alarms` | 定时任务 |
| `webRequest` | 监听网络请求 |
| `declarativeNetRequest` | 声明式网络请求拦截（V3 推荐） |
| `downloads` | 管理下载 |

## 插件入口文件配置

```json
{
  "background": {
    "service_worker": "background.js",
    "type": "module"
  },
  "action": {
    "default_popup": "popup.html",
    "default_title": "点击打开弹窗",
    "default_icon": "icons/icon48.png"
  },
  "options_page": "options.html",
  "options_ui": {
    "page": "options.html",
    "open_in_tab": true
  }
}
```

- **`background.service_worker`** (V3)：注册 Service Worker，插件事件监听的核心
- **`action`** (V3)：定义工具栏按钮的弹出页面
- **`options_page` / `options_ui`**：插件的设置页面

## Content Scripts

```json
{
  "content_scripts": [
    {
      "matches": ["https://*/*"],
      "exclude_matches": ["https://example.com/*"],
      "css": ["styles/content.css"],
      "js": ["content.js"],
      "run_at": "document_idle",
      "world": "ISOLATED",
      "all_frames": true
    }
  ]
}
```

| 字段 | 说明 |
|---|---|
| `matches` | 匹配的 URL 模式 |
| `exclude_matches` | 排除的 URL 模式 |
| `css` / `js` | 注入的样式和脚本文件 |
| `run_at` | 注入时机：`document_start` / `document_end` / `document_idle` |
| `world` | (V3) 执行环境：`ISOLATED`（隔离）或 `MAIN`（主页面） |
| `all_frames` | 是否在所有 iframe 中注入 |

## Web Accessible Resources

供 content scripts 或网页访问的插件内部资源：

```json
{
  "web_accessible_resources": [
    {
      "resources": ["images/*", "fonts/*", "inject.js"],
      "matches": ["https://*/*"],
      "extension_ids": [],
      "use_dynamic_url": true
    }
  ]
}
```

## Content Security Policy (CSP)

### Manifest V3

V3 不再支持在 manifest 中自定义 CSP，默认策略为：
- `script-src 'self'`
- `object-src 'self'`
- 禁止 `eval()`、`eval` 类函数、远程脚本

### Manifest V2

```json
{
  "content_security_policy": "script-src 'self' https://trusted-cdn.com; object-src 'self'"
}
```

## 其他常用字段

```json
{
  "minimum_chrome_version": "88",
  "offline_enabled": true,
  "commands": {
    "_execute_action": {
      "suggested_key": {
        "default": "Ctrl+Shift+S",
        "mac": "Command+Shift+S"
      },
      "description": "打开弹出页面"
    }
  },
  "devtools_page": "devtools.html",
  "sandbox": {
    "pages": ["sandbox.html"]
  }
}
```

- **`commands`**：注册键盘快捷键
- **`devtools_page`**：开发者工具扩展入口
- **`sandbox`**：沙箱页面，可用于执行不安全的代码

## 官方 schema 参考

- [Chrome Extension Manifest](https://developer.chrome.com/docs/extensions/reference/manifest)
- [JSON Schema Store](https://www.schemastore.org/json/)
