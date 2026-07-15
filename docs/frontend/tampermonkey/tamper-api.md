# Tampermonkey API 参考

:::tip
完整文档见 [Tampermonkey 官方文档](https://www.tampermonkey.net/documentation.php?ext=dhdg)
:::

## 脚本头 (Metadata Block)

脚本头以 `// ==UserScript==` 开始，`// ==/UserScript==` 结束，声明脚本的元信息。

### `@name`
脚本名称，显示在 Tampermonkey 管理面板中。

### `@namespace`
脚本命名空间，用于区分同名脚本。通常使用网址。

### `@include`
设置脚本运行的页面 URL。支持通配符 `*`。

```
// @include http://example.com/*
// @include https://example.com/*
// @include https://*
```

### `@match`
与 `@include` 类似，但语法更严格，推荐使用。

```
// @match http*://example.com/*
// @match https://*/*
```

### `@exclude`
排除的 URL，在这些页面不运行脚本。

```
// @exclude https://example.com/admin/*
```

### `@require`
在脚本运行前加载的外部 JavaScript 文件。支持 SRI 完整性校验。

```
// @require https://code.jquery.com/jquery-3.7.1.min.js
// @require https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js
// @require https://example.com/lib.js#md5=abc123...
```

### `@resource`
预加载的资源文件，可通过 `GM_getResourceURL` / `GM_getResourceText` 访问。

```
// @resource icon /images/icon.png
// @resource page http://example.com/page.html
// @resource data http://example.com/data.xml
```

### `@connect`
设置 `GM_xmlhttpRequest` 允许跨域访问的域名。

```
// @connect *
// @connect api.example.com
// @connect self
```

允许的值：
- 域名：`tampermonkey.net`（含子域名）
- 子域名：`api.tampermonkey.net`
- `self`：当前脚本运行的域名
- `localhost`
- IP 地址：`1.2.3.4`
- `*`：所有域名

### `@run-at`
设置脚本注入的时机。

| 值 | 说明 |
|----|------|
| `document-start` | 尽可能早地注入（页面开始加载时） |
| `document-body` | body 元素存在时注入 |
| `document-end` | DOMContentLoaded 事件触发时或之后注入 |
| `document-idle` | DOMContentLoaded 事件触发后注入（默认值） |
| `content-menu` | 在浏览器右键菜单中点击时执行（仅桌面 Chrome） |

### `@grant`
声明脚本使用的 `GM_*` API 和 `unsafeWindow` 等。如果不声明，Tampermonkey 会自动推断。

```
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_setClipboard
// @grant unsafeWindow
// @grant window.close
```

### `@noframes`
禁止脚本在 iframe 中运行。

### `@icon` / `@icon64`
脚本图标 URL。

---

## API 详解

### `unsafeWindow`
访问页面的原始 `window` 对象，用于调用页面中的 JS 变量和函数。

```js
// 页面中定义了 function showAlert(msg) {...}
unsafeWindow.showAlert('Hello')
```

### `GM_addStyle(css)`
向页面注入 CSS 样式，返回注入的 style 元素。

```js
GM_addStyle(`
  .my-widget {
    position: fixed;
    top: 0;
    right: 0;
    background: #fff;
    z-index: 99999;
  }
`)
```

### `GM_setValue(name, value)` / `GM_getValue(name, defaultValue)`
持久化存储数据（类似 localStorage，但独立于页面）。

```js
// 存储
GM_setValue('count', 42)
GM_setValue('settings', { theme: 'dark' })

// 读取
const count = GM_getValue('count', 0)
const settings = GM_getValue('settings', { theme: 'light' })
```

### `GM_deleteValue(name)` / `GM_listValues()`
删除指定键 / 列出所有键。

```js
GM_deleteValue('temp_data')
const allKeys = GM_listValues()
```

### `GM_addValueChangeListener(name, callback)` / `GM_removeValueChangeListener(id)`
监听指定存储值的变化。`callback` 参数：`(name, oldValue, newValue, remote)`。

```js
const id = GM_addValueChangeListener('count', (name, oldVal, newVal, remote) => {
  console.log(`count 从 ${oldVal} 变为 ${newVal}`)
})
// 移除监听
GM_removeValueChangeListener(id)
```

### `GM_registerMenuCommand(name, fn, accessKey)` / `GM_unregisterMenuCommand(id)`
在 Tampermonkey 菜单中注册命令。

```js
const id = GM_registerMenuCommand('显示提示', () => {
  alert('菜单被点击了！')
}, 's') // 快捷键 Alt+S
// 注销
GM_unregisterMenuCommand(id)
```

### `GM_openInTab(url, options)`
在新标签页打开 URL。

```js
// 后台打开
GM_openInTab('https://example.com', { active: false, insert: true, setParent: true })
```

### `GM_xmlhttpRequest(details)`
发送跨域 HTTP 请求，不受 CORS 限制（需在 `@connect` 中声明域名）。

```js
GM_xmlhttpRequest({
  method: 'GET',
  url: 'https://api.example.com/data',
  headers: {
    'Content-Type': 'application/json',
  },
  data: JSON.stringify({ key: 'value' }),
  onload: function (res) {
    console.log(res.responseText)
  },
  onerror: function (err) {
    console.error('请求失败', err)
  },
  ontimeout: function () {
    console.error('请求超时')
  },
})
```

`details` 支持的属性：
- `method` - 请求方法（GET/POST/PUT/DELETE...）
- `url` - 请求地址
- `headers` - 请求头对象
- `data` - 请求体
- `binary` - 是否二进制数据
- `timeout` - 超时时间（毫秒）
- `responseType` - 响应类型（text/json/blob/arraybuffer/document）
- `overrideMimeType` - 覆盖 MIME 类型
- `anonymous` - 不发送 cookie
- `fetch` - 使用 fetch API（默认为 true）
- `onload` - 成功回调
- `onerror` - 失败回调
- `onprogress` - 进度回调
- `ontimeout` - 超时回调
- `onreadystatechange` - 状态变化回调

### `GM_download(url, name)` / `GM_download(details)`
下载文件到本地。

```js
// 简单方式
GM_download('https://example.com/file.zip', 'backup.zip')

// 完整选项
GM_download({
  url: 'https://example.com/image.png',
  name: 'image.png',
  headers: { Referer: 'https://example.com' },
  saveAs: true,
  onload: () => console.log('下载完成'),
  onerror: (err) => console.error('下载失败', err),
  onprogress: (p) => console.log(`进度: ${p.loaded}/${p.total}`),
  ontimeout: () => console.error('下载超时'),
})
```

### `GM_notification(details)` / `GM_notification(text, title, image, onclick)`
显示桌面通知。

```js
// 对象方式
GM_notification({
  text: '任务已完成',
  title: '我的脚本',
  image: 'https://example.com/icon.png',
  highlight: true,
  silent: false,
  timeout: 5000,
  onclick: () => console.log('通知被点击'),
  ondone: () => console.log('通知已关闭'),
})

// 传统方式
GM_notification('内容', '标题', '图片URL', () => { /* onclick */ })
```

### `GM_setClipboard(data, info)`
复制内容到剪贴板。

```js
GM_setClipboard('要复制的文本', 'text')  // 纯文本
GM_setClipboard('<b>HTML</b>', 'html')   // HTML
// info 也可以是对象
GM_setClipboard('text', { type: 'text', mimetype: 'text/plain' })
```

### `GM_getResourceText(name)` / `GM_getResourceURL(name)`
获取 `@resource` 预加载的内容。

```js
// 获取文本内容
const html = GM_getResourceText('page')
// 获取 base64 URL
const iconUrl = GM_getResourceURL('icon')
```

### `GM_log(message)`
向控制台输出日志（等同于 `console.log`）。

```js
GM_log('脚本已启动')
```

### `GM_info`
获取脚本和 Tampermonkey 的信息对象。

```js
console.log(GM_info)
// {
//   script: { name, version, namespace, description, ... },
//   scriptHandler: 'Tampermonkey',
//   scriptWillUpdate: true,
//   scriptMetaStr: ...,
//   scriptSource: ...,
//   scriptUpdateURL: ...,
//   platform: { arch: 'x86', browser: 'Chrome', os: 'win', ... }
// }
```

### `GM_getTab(callback)` / `GM_saveTab(tab)` / `GM_getTabs(callback)`
跨页面（同标签页生命周期）数据共享。

```js
// 保存数据
GM_saveTab({ scrollPos: window.scrollY })

// 读取数据
GM_getTab((tab) => {
  console.log('当前标签数据:', tab)
})

// 获取所有标签页数据
GM_getTabs((tabs) => {
  console.log('所有标签:', tabs)
})
```

### `GM_cookie`
通过 `GM_cookie.list()`、`GM_cookie.set()`、`GM_cookie.delete()` 管理 cookie。

```js
// 列出 cookie
GM_cookie.list({ url: 'https://example.com' }, (cookies, error) => {
  console.log(cookies)
})

// 设置 cookie
GM_cookie.set({ url: 'https://example.com', name: 'token', value: 'abc' }, (error) => {
  if (error) console.error(error)
})

// 删除 cookie
GM_cookie.delete({ url: 'https://example.com', name: 'token' })
```

### `GM_webRequest`
监听和修改网络请求（Chrome 扩展 API 封装）。

```js
GM_webRequest(
  [{ selector: 'https://api.example.com/*', action: 'cancel' }],
  (info) => console.log('请求被拦截:', info)
)
// 取消监听
GM_webRequest({ cancel: true })
```
