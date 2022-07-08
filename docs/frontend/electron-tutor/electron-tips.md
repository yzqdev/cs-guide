# electron 技巧

## 无边框窗口的拖动

```html
默认情况下, 无框窗口是 non-draggable 的。 应用程序需要指定 `-webkit-app-region: drag` 在 CSS 中告诉Electron哪个区域是可拖拽的 (像 OS 的标准标题栏), 并且应用程序也可以使用 `-webkit-app-region: no-drag` 来排除 draggable region 中的 non-draggable 区域。 请注意, 当前只支持矩形形状。

要使整个窗口可拖拽, 您可以添加 `-webkit-app-region: drag` 作为 `body` 的样式:
```html
<body style="-webkit-app-region: drag"></body>
```

请注意, 如果您已使整个窗口draggable, 则必须将按钮标记为 non-draggable, 否则用户将无法单击它们:

```css
button {  -webkit-app-region: no-drag; }
```

如果你设置自定义标题栏为 draggable, 你也需要标题栏中所有的按钮都设为 non-draggable。
请注意，如果您使整个窗口都可拖拽，则必须将其中的按钮标记为不可拖拽，否则用户将无法点击它们：

```css
button {
  -webkit-app-region: no-drag;
}
```

## electron常见错误

在渲染进程由于vite无法处理nodejs相关的module,所有只能使用require

```js
const fs=require("fs")
```

## 快捷键打开控制台

在app.whenready事件里面加入这个

```js
function registryShortcut() {
  globalShortcut.register('CommandOrControl+I', () => {
    // 获取当前窗口
    BrowserWindow.getFocusedWindow().webContents.openDevTools();
  });
}
```

whenReady

```js
app.whenReady.then(()=>{
  registryShortcut()
})
```

## 在渲染进程使用nodejs和electronapi

需要在main.ts设置
 `contextIsolation:false``,这样`contextBridge`会失效,

```js
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, "icons/icon.png"), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: false,//必须设置这个,
      nodeIntegration: true,
      webSecurity: false,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });
```

## Electron渲染进程引入dialog问题

官网的dialog例子是这样的：

```js
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
```

**该例子只能在主进程中使用**

## 解决方案

老文档方法，引用改为

```js
const { dialog } = require('electron').remote
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
```

以上方法也是不行的。经过翻阅Electron文档，里面有一栏目References->重点更改，这里明确表明了在Electron 14中已经废弃了remote了，需要使用

```js
//渲染进程
const { dialog } = require('@electron/remote')
//主进程引入
require('@electron/remote/main').initialize()

//然后在mainwindow下添加
 require("@electron/remote/main").enable(mainWindow.webContents);
```

如果使用@electron/remote需要使用npm按照

```shell
npm install --save @electron/remote
```

经过以上方法，应该可以解决大部分人的问题了。很不幸，我就是大部分人之外。。。于是我接着翻阅各种资料，再在主程序配置了以下两个地方即可

main.js

```js
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,//增加该配置，默认是false，新版本不能使用remote

        }
    })
    mainWindow.loadFile('index.html')

    //增加该配置
    require('@electron/remote/main').enable(mainWindow.webContents)

}
```

经过以上配置～应该可以顺利跑通dialog例子
