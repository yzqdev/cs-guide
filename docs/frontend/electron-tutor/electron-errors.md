# electron 常见错误

## 注意事项

出现错误

```text
Uncaught TypeError: path.join is not a function
    at node_modules/electron/index.js (index.js:4:23)
    at __require (chunk-RVKNRWEE.js?v=3f627d47:12:50)
    at dep:electron:1:16
```

vue的组件中只能这样写

```js

const { ipcRenderer } = require("electron");
```

不能使用import

```js
import {  IpcRender} from 'electron'
```
