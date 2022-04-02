# electron相关资源

## electron fiddle 无法下载electron的问题

解决办法
[github issue](https://github.com/electron/fiddle/issues/258)
设置环境变量

```text
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
```

注意,electron使用vue-devtools需要使用ladder下载插件!!!

## 使用vue-devtools

可以使用`electron-devtools-vendor`这个包

如果不想ladder
需要把devtool插件的文件夹放到这里

```text
C:\Users\yanni\AppData\Roaming\vite-electron-builder\extensions\ljjemllljcmogpfapbkkighbhhppjdbg
```

手动打开控制台,添加快捷键`ctrl+shift+i`
在createWindow函数里面加

```javascript
globalShortcut.register('Shift+CommandOrControl+I', () => {

        browserWindow.webContents.toggleDevTools();
      })
```

## electron网站

-  [https://www.electronjs.org/](https://www.electronjs.org/)
- [https://github.com/electron/fiddle](https://github.com/electron/fiddle)
- [https://github.com/nklayman/vue-cli-plugin-electron-builder](https://github.com/nklayman/vue-cli-plugin-electron-builder)
- [https://github.com/cawa-93/vite-electron-builder](https://github.com/cawa-93/vite-electron-builder)
- [https://github.com/SimulatedGREG/electron-vue](https://github.com/SimulatedGREG/electron-vue)

## 开源项目

[https://github.com/blogwy/BilibiliVideoDownload](https://github.com/blogwy/BilibiliVideoDownload)

[vue-cli-plugin-electron-builder](https://github.com/nklayman/vue-cli-plugin-electron-builder)

[vite-electron-builder](https://github.com/cawa-93/vite-electron-builder)

[picgo](https://github.com/Molunerfinn/PicGo)

[落雪音乐助手](https://github.com/lyswhut/lx-music-desktop)
​
[https://github.com/biuuu/genshin-wish-export](https://github.com/biuuu/genshin-wish-export)

[ZY-Player](https://github.com/cuiocean/ZY-Player)

[switchhosts](https://github.com/oldj/SwitchHosts)
