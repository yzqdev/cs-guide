# tamper插件编写

## 搭建jquery开发环境

油猴可以 `// @require ...` 的方法引用外部js文件，如果要引用本地文件，需要在浏览器插件设置中允许油猴访问文件URL，步骤

在浏览器地址栏输入：`edge://extensions`  
找到Tampermonkey，点详细信息，打开`允许访问文件 URL`

在脚本头部添加:`@require file://E:\myjs.js`

## 搭建webpack开发环境

:::tip
见[https://github.com/the1812/Bilibili-Evolved](https://github.com/the1812/Bilibili-Evolved)

:::

## 搭建vite开发环境

开发模式下所使用的油猴脚本：

`@updateURL` `@downloadURL`必须以`.user.js`结尾

```js
// ==UserScript==
// @name         tampermonkey-test
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  try to take over the world!
// @author
// @match        https://*/*
// @match        http://*/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.2.6/dist/vue.global.min.js
// @updateURL    https://xxxxxxxx.user.js
// @downloadURL  https://xxxxxxxx.user.js

// ==/UserScript==

(function () {
  "use strict";
  if (location.href === "http://localhost:3000/") return;
  var script = document.createElement("script");
  script.type = "module";
  script.src = "http://localhost:3000/@vite/client";
  document.body.appendChild(script);
  var script2 = document.createElement("script");
  script2.type = "module";
  script2.src = "http://localhost:3000/src/main.js";
  document.body.appendChild(script2);
})();
```

修改 HMR（默认情况下 hmr 会使用基于 window.location 的相对地址）：

```js
// vite.config.js

import ...

export default defineConfig({
 ...,

 server: {
  ...,

    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
})
```

项目开发像正常开发一样即可，main.ts/js 即为脚本入口（根据 vite 设置修改）

根据脚本功能可能需要手动添加挂载元素：

```js
// ./src/App.vue

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

const appRoot = document.createElement("div");
appRoot.id = "us-appRoot";
document.body.appendChild(appRoot);

app.mount("#us-appRoot");
```

## 生产模式

修改设置文件在选项对象中添加以下内容：

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    (() => {
      /**
       * 如果用到了额外的 GM_functions，需要添加对应 @grant
       * 虽然可以全部不添加，但只有TamperMonkey会自动推断，其他扩展不一定
       * 在上面 extenral 声明的库，此处需要添加对应的 @require 要注意全局变量名称
       */
      const headers = `\
// ==UserScript==
// @name         Your Script (prod mode)
// @namespace    https://your.site/
// @version      0.1.0
// @description  What does your script do
// @author       You
// @include      /https://match\.site/
// @grant        GM_addStyle
// @noframes
// @require      https://cdn.jsdelivr.net/npm/vue@3.2.6/dist/vue.global.min.js
// ==/UserScript==

`;

      return {
        name: "inject-css",
        apply: "build", // 仅在构建模式下启用
        enforce: "post", // 在最后处理
        generateBundle(options, bundle) {
          // 从 bundle 中提取 style.css 内容，并加入到脚本中
          const keyword = "user.js";
          if (!bundle["style.css"] || bundle["style.css"].type !== "asset")
            return;
          const css = bundle["style.css"].source;
          const [, target] =
            Object.entries(bundle).find(([name]) => {
              return name.includes(keyword);
            }) ?? [];
          if (!target || target.type !== "chunk") return;
          target.code = headers + `GM_addStyle(\`${css}\`)\n${target.code}`;
        },
      };
    })(),
  ],
  hmr: {
    protocol: "ws",
    host: "localhost",
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.js"),
      name: "userscript",
      formats: ["iife"], // 自运行打包格式，与默认模版一致
      fileName: (format) => `yourscript.${format}.user.js`, // 非函数的常量会自动添加后缀
    },
    rollupOptions: {
      external: ["vue"], // 分离库以降低最终代码体积
      output: {
        globals: {
          vue: "Vue",
          GM_addStyle: "GM_addStyle", // 油猴脚本API，用于添加样式到页面
        },
        inlineDynamicImports: true, // 库构建模式下不能进行代码分割，开启此功能可将本应分割的代码整合在一起避免报错（代码分割可能由其他插件引起）
      },
    },
    minify: "terser",
    terserOptions: {
      mangle: false, // 关闭名称混淆，遵守Greasefork规则
      format: {
        beautify: true, // 美化代码开启缩进，遵守Greasefork规则
      },
    },
  },
});
```

编译后的 js 文件应在 /dist 目录下，像普通油猴脚本一样使用即可

若使用了 tailwindcss/windicss 等，内置的 css reset 影响了原本元素，可以在对应设置文件中关闭 preflight
