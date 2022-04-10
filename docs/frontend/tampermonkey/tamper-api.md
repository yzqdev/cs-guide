# tampermonkey相关的api

:::tip

文档见[链接](https://www.tampermonkey.net/documentation.php?ext=dhdg)
:::

## 用户脚本 Header

### `@name`

脚本名称

### `@namesapce`

脚本命名空间

### `@include`

设置脚本在哪些网页中可以运行，允许设置多个标签。 `@include` 不支持URL hash参数。

```
// @include http://123.com/*
// @include https://123.com/*
// @include https://*
```

### `@match`

与 `@include` 标签类似，允许设置多个。

```
// @match http*://
```

### `@exclude`

排除的URL， 在这些页面不运行脚本， 即使地址包含在 `@include`或`@match`标签内。允许设置多个。

### `@require`

表示在运行脚本前需要加载和运行的JavaScript文件。允许设置多个。 注：如果加载的脚本使用`use strict`模式，用户脚本可能也会受严格模式影响

```
// @require https://code.jquery.com/jquery-2.1.4.min.js
// @require https://code.jquery.com/jquery-2.1.3.min.js#sha256=23456...
// @require https://code.jquery.com/jquery-2.1.2.min.js#md5=34567...,sha256=6789..
```

### `@resource`

定义一些需要预加载的资源文件，这些资源可以在脚本中通过`GM_getResourceURL`，`GM_getResourceText`访问。允许设置多个。

```
// @resource icon2 /images/icon.png
// @resource html http://www.tampermonkey.net/index.html
// @resource xml http://www.tampermonkey.net/crx/tampermonkey.xml
// @resource SRIsecured1 http://www.tampermonkey.net/favicon.ico#md5=123434...
```

### `@connect`

设置允许通过`GM_xmlhttpRequest`连接访问的域名（包括子域名）。

```
// @connect *
// @connect *://*.qidian.com/
```

`@connect` 标签允许设置的值：

- 域名，如`tampermonkey.net`, 设置后该域名下的所有子域名都是允许访问的
- 子域名，如`safari.tampermonkey.net`
- `self` 当前脚本正在运行的域名
- `localhost`
- `1.2.3.4` 允许连接的IP地址
- `*` 所有域名

### `@run-at`

设置注入脚本的时间。`@run-at` defines the first possible moment a script wants to run.

- `@run-at document-start` The script will be injected as fast as possible.
- `@run-at document-body` The script will be injected if the body element exists.
- `@run-at document-end` The script will be injected when or after the DOMContentLoaded event was dispatched.
- `@run-at document-idle` The script will be injected after the DOMContentLoaded event was dispatched. This is the default value if no @run-at tag is given.
- `@run-at content-menu` The script will be injected if it is clicked at the browser context menu (desktop Chrome-based browsers only).

### `@grant`

`@grant`标签用于设置`GM_*`方法， `unsafeWindow`对象， `window`对象方法的白名单。If no @grant tag is given TM guesses the scripts needs.

```
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_setClipboard
// @grant unsafeWindow
// @grant window.close
// @grant window.focus
```

## API

### `unsafeWindow`

通过`unsafeWindow`对象访问页面的js方法和变量

### `Subresource Integrity`

`@require``@resource`标签设置URL的hash部分

```
// @require https://code.jquery.com/jquery-2.1.1.min.js#md5=45eef...
// @require https://code.jquery.com/jquery-2.1.2.min.js#md5=ac56d...,sha256=6e789.
```

### `GM_addStyle(css)`

Adds the given style to the document and returns the injected style element.

### `GM_deleteValue(name)`

Deletes 'name' from storage.

### `GM_listValues()`

List all names of the storage.

### `GM_addValueChangeListener(name, function(name, old_value, new_value, remote) {})`

对storage存储的变量添加监听器，返回监听器ID。 `name`参数是要监听的变量名

### `GM_removeValueChangeListener(listener_id)`

移除监听器

### `GM_setValue(name, value)`

Set the value of 'name' to the storage.

### `GM_getValue(name, defaultValue)`

从storage里面获取'name'的值

### `GM_log(message)`

控制台输出日志

### `GM_getResourceText(name)`

获取在脚本头部用`@resource`标签预定义的的内容

### `GM_getResourceURL(name)`

获取在脚本头部用`@resource`标签预定义的的base64编码的URI

### `GM_registerMenuCommand(name, fn, accessKey)`

在脚本运行页面的Tampermonkey菜单中注册新的菜单，返回菜单command ID

### `GM_unregisterMenuCommand(menuCmdId)`

注销用`GM_registerMenuCommand`注册的菜单

### `GM_openInTab(url, options), GM_openInTab(url, loadInBackground)`

在新标签页打开URL。`options`可选的值：

- `active` 定义焦点是否在新标签页上
- `insert`
- `setParent`

### `GM_xmlhttpRequest(details)`

Make an xmlHttpRequest.

### `GM_download(details), GM_download(url, name)`

下载URL指定资源到本地磁盘

`details` 可以有如下属性:

- `url` - 下载地址 (必需)
- `name` - 文件名 - 由于安全原因需要在Tampermonkey的配置页把文件扩展名设为白名单（*for security reasons the file extension needs to be whitelisted at Tampermonkey's options page*） (必需)
- `headers` - 参见 `GM_xmlhttpRequest`
- `saveAs` - `boolean`, 弹出“保存为”的弹框
- `onerror` - 下载失败的回调
- `onload` - 下载完成回调
- `onprogress` 下载进度变化时的回调
- `ontimeout` 由于超时导致下载失败时的回调

`onerror` 回调函数的参数：

- ```
  error
  ```

  \- 失败原因

  - `not_enabled` - 用户不能使用下载功能
  - `not_whitelisted` - 下载文件后缀不在白名单内
  - `not_permitted` - the user enabled the download feature, but did not give the downloads permission
  - `not_supported` - the download feature isn't supported by the browser/version
  - `not_succeeded` - the download wasn't started or failed, the details attribute may provide more information

- `details` 关于错误的详细信息

下载扩展白名单设置如下：

![img](https://cdn.bianchengquan.com/4fac9ba115140ac4f1c22da82aa0bc7f/blog/5fd1a4eec3b9d.png)

> Chrome 可以使用 Tampermonkey 的 GM_download 函数绕过 CSP(Content Security Policy) 的限制

### `GM_getTab(callback)`

Get a object that is persistent as long as this tab is open.

### `GM_saveTab(tab)`

Save the tab object to reopen it after a page unload.

### `GM_getTabs(callback)`

Get all tab objects as a hash to communicate with other script instances.

### `GM_notification(details, ondone)` `GM_notification(text, title, image, onlick)`

显示一个H5桌面通知，并/或 高亮显示当前Tab

`details` 有如下特性:

- `text` - 通知的文本 (需要 `highlight` 设置为`false`)
- `title` - 通知的标题
- `image` - 图片
- `highlight` - `boolean` 是否高亮发送通知的标签页 (未设置`text`时)
- `silent` - `boolean` 是否播放提示音
- `timeout` - `timeout` 设置的时间之后通知会被隐藏 (0 = disabled)
- `ondone` - 通知被关闭时调用 (no matter if this was triggered by a timeout or a click) or the tab was highlighted
- `onclick` - 用户点击通知时调用

### `GM_setClipborad(data, info)`

复制内容到剪贴板，The parameter 'info' can be an object like "{ type: 'text', mimetype: 'text/plain'}" or just a string expressing the type ("text" or "html")

### `GM_info`

获取关于脚本和GM的一些信息
