# chrome插件开发

## api文档

[https://developer.chrome.com/docs/extensions/](https://developer.chrome.com/docs/extensions/)

注意,如果使用webpack开发vue需要配置

如果出现`Refused to load the script because it violates the following Content Security Policy directive: "script-src 'self'`

需要在mainfest.json配置

```json
 "permissions": [
    "tabs",
    "storage",
    "activeTab",
    "*://*/*",
    "<all_urls>",
    "webRequest",
    "webRequestBlocking",
    "webNavigation"
  ],
  "web_accessible_resources": [
    "dist/contentScripts/style.css"
  ],
  "content_security_policy": "script-src 'self' http://localhost:3303  http://localhost:8098 'unsafe-eval'; object-src 'self'"
```
