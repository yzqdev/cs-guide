# 使用Vue开发浏览器插件


## 前言


浏览器插件是前端领域比较小众的应用范畴，我们所说的浏览器插件指的就是`Chrome 插件`。在[Chrome 插件市场](https://chrome.google.com/webstore/category/extensions?hl=zh-CN)上有非常多`有趣`又`实用`的`Chrome 插件`，比如[octotree](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc)(显示github代码树)、[Adblock Plus](https://chrome.google.com/webstore/detail/adblock-plus/cfhdojbkjhnklbpkdaibdccddilifddb)(拦截广告)等。


目前笔者接触`Chrome 插件`开发也有一年时间，最初团队中使用`原生js+jquery`的方式开发插件，后来考虑使用Vue重构插件，主要原因在于:


- 插件的功能日益增多
- 原生开发效率低下
- 没有模块，不易维护
- 团队技术栈偏Vue



因此本篇文章旨在分享笔者在`基于vue-cli开发浏览器插件`的工程化实践经验以及`部分功能的思考与实现`，在整理`Vue开发插件的有关知识`的同时提供给`想尝试浏览器插件开发`的开发者`Vue开发插件`的一点思路。如果你还未熟悉`浏览器插件开发`，请先借助[这篇文章](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html#%E5%86%99%E5%9C%A8%E5%89%8D%E9%9D%A2)了解插件开发的基础知识(本篇文章默认你已认真读完)，再进行Vue开发插件的实践。


## 项目工程化


### 改造vue.config.js


插件中必不可少的文件是`manifest.json`(必须放在项目根目录)，我们知道`package.json`是项目的基本配置文件，那`manifest.json`就是`chrome 插件`中最重要的配置文件。这个文件记录插件里`background`、`content_scripts`、`browser_action`等配置的相关规则和文件摆放位置。


假如有这样一个`manifest.json`文件:


```
{
  "manifest_version": 2,
  "name": "vue-chrome-extension",
  "description": "基于vue的chrome插件",
  "version": "1.0.0",
  "browser_action": {
    "default_title": "vue-chrome-extension",
    "default_icon": "assets/logo.png",
    "default_popup": "popup.html"
  },
  "permissions": [
    "webRequestBlocking",
    "notifications",
    "tabs",
    "webRequest",
    "http://*/",
    "https://*/",
    "<all_urls>",
    "storage",
    "activeTab"
  ],
  "background": {
    "scripts": ["js/background.js"]
  },
  "icons": {
    "16": "assets/logo.png",
    "48": "assets/logo.png",
    "128": "assets/logo.png"
  },
  "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
  "content_scripts": [
    {
      "matches": [
        "https://*.baidu.com/*"
      ],
      "css": [
        "css/content.css"
      ],
      "js": [
        "js/content.js"
      ],
      "run_at": "document_end"
    }
  ],
  "web_accessible_resources": ["fonts/*", "inject.js"]
}
复制代码
```


`manifest.json`定义了插件的目录文件结构，上面配置对应这样的结构:


```
.
├── assets
│   └── logo.png
├── css
│   └── content.css
├── inject.js
├── js
│   ├── background.js
│   └── content.js
├── manifest.json
└── popup.html
复制代码
```


因此我们必须改造`vue.config.js`文件，让`Vue-cli`(也可以是webpack)打包后的文件结构与上面结构一致，我们这样定义`vue.config.js`：




配置好`vue.config.js`后再`package.json`加入脚本:


```
"scripts": {
	"serve": "vue-cli-service build --watch",
    "build": "vue-cli-service build"
},  
复制代码
```


到这里就可以进行插件的开发工作了，`npm run serve`和`npm run build` 分别提供了`开发`和`生产`的命令。


### 热刷新


`vue`和`react`都提供了`模块热替换(hmr)`的功能，这大大的提高我们开发调试代码的效率。那我们调试插件需要这样操作:


1. 打开谷歌浏览器的`扩展程序`页面
1. 开启开发者模式，选择`加载已解压的扩展程序`，加入插件文件，插件就开始运行了
1. 改动代码后保存
1. 回到插件面板刷新改插件，加载最新代码
1. 到目标页刷新页面(`content scripts`需要这样操作)，查看改动



可以看到整个调试过程比较繁琐且重复，笔者使用了[github](https://github.com/xpl/crx-hotreload)上热刷新的解决方案(如果有更好的方案请告知)，之所以称它为`热刷新`，是因为它会强制刷新页面，并不是真正意义上的`热替换`(不刷新页面)，使用它后我们的调试过程是这样:


1. 打开谷歌浏览器的`扩展程序`页面
1. 开启开发者模式，选择`加载已解压的扩展程序`，加入插件文件，插件就开始运行了
1. 改动代码后保存
1. 转到目标页，目标页自动刷新，刷新完成后查看改动



`热刷新`主要会帮我们做这几个工作:


- 插件加载最新的代码
- 目标页自动强制刷新(对于`content scripts`)，应用最新代码



`热刷新`的实现也就50多行代码，其原理就是:


1. 在`background`加入代码逻辑(利用`background`能长时间活动在后台的特点)
1. 通过`chrome.runtime.getPackageDirectoryEntry`获取插件的文件目录，监听文件变化
1. 递归整理出所有文件，再将这些文件的文件名加上上次修改时间组成数组返回
1. 根据`文件名加上上次修改时间`的变化来决定是否刷新页面，再通过`setTimeout`间歇性递归监听文件变化的方法
1. 刷新的机制是通过`chrome.tabs.query`找到当前页(当前活动标签页)，执行`chrome.tabs.reload`强制刷新页面



`热刷新`缺陷：


- 自动刷新当前浏览器活动页，如果当前活动页不是你的目标刷新页面，则还需要到目标页面手动刷新
- 改动代码后长时间没打开浏览器，可能没有加载最新代码，需要手动加载插件并刷新页面



### 插件打包


打开`谷歌扩展程序页面`将`vue-cli`打包后的文件打包，第一次打包会在项目根目录生成一个`插件私钥`(用于区分插件)和`crx`文件(插件生产环境的文件格式，本质是ZIP文件，只是谷歌插入了自定义的私有字段，如，插件描述，插件ID，密钥等)---[插件私钥和crx参考](https://blog.csdn.net/wanwuguicang/article/details/79742017)，我们可以使用[crx](https://github.com/oncletom/crx)(打包成crx的npm包)配合`插件私钥`可以将插件打包成`crx`文件。我们在项目中加入这样一个脚本:


```
// src/scripts/crx.js
const fs = require("fs");
const path = require("path");
const manifest = require(path.resolve(__dirname, "../chrome/manifest.json"));
const ChromeExtension = require("crx");
const crxName = `${manifest.name}-v${manifest.version}.crx`;
const crx = new ChromeExtension({
  privateKey: fs.readFileSync(path.resolve(__dirname, "../../dist.pem"))
});

crx
  .load(path.resolve(__dirname, "../../dist"))
  .then(crx => crx.pack())
  .then(crxBuffer => {
    fs.writeFile(crxName, crxBuffer, err =>
      err
        ? console.error(err)
        : console.log(`>>>>>>>  ${crxName}  <<<<<<< 已打包完成`)
    );
  })
  .catch(err => {
    console.error(err);
  });
复制代码
```


在`package.json`加入我们添加的脚本:`"build:crx": "npm run build && node src/scripts/crx.js"`


使用`build:crx`命令能把`vue-cli`打包后的文件再打包成一个`crx`文件，提高了打包的效率。


## 添加基础功能


上面主要围绕`修改Vue-cli项目`、`热刷新调试`、`自动打包`等工程化的几个方面展开阐述，接下来主要分享下项目中几个通用的解决方案。


### 插入方法


`content scripts`主要往目标页面插入我们的js，这些脚本通常是插入我们的dom。例如:


![img](data:image/svg+xml;utf8,)


这是某网盘的插件(该插件目前已失效，这里只是展示)，该插件在页面上插入黑框标注的按钮，这就是`content scripts`的作用。


回到`vue`项目中笔者封装了一个通用的`将Vue组件转为真实dom`的插入方法


```
import Vue from "vue";

function insert(component, insertSelector = "body") {
  insertDomFactory(component, insertSelector);
}


function insertDomFactory(component, insertSelector) {
  const vm = generateVueInstance(component);

  generateInsertDom(insertSelector, vm);
}

// 将createElement生成的元素插入到目标dom中，再将vue实例挂载到上面
function generateInsertDom(insertSelector, vm) {
  // 待插入的dom
  const insertDom = document.querySelectorAll(insertSelector);

  insertDom.forEach(item => {
    const insert = document.createElement("div");
    insert.id = "insert-item";
    item.appendChild(insert);
    vm.$mount("#insert-item");
  });
}

// 生成Vue实例
function generateVueInstance(component) {
  const insertCon = Vue.extend(component);

  return new insertCon();
}

export default insert;
复制代码
```


插入步骤为:


1. 用传入的组件通过`extend`生成构造器，将实例化后的的`vm`返回
1. 遍历目标选择器dom
1. 通过`createElement` 生成一个`div`插入到目标dom上
1. 调用`vm`实例`$mount`挂载目标dom



接下来把我们的组件插入到页面上:


```
import App from "./App/App.vue";
import insert from "@/utils/insert";

insert(App);
复制代码
```


上面的插入方法都是通过`new Vue`的方式生成，那页面上可能会存在多个Vue根实例，组件(除非父子组件)间就不能用`props/$emit`通信，我们可以引入`mixin`，配合`vuex`将`store`混合到全局`Vue`上(当然还可以使用`event bus`)


```
// store mixin
import store from "@/store";

export default {
  beforeCreate() {
    this.$store = store;
  }
};
复制代码
```


全局混合


```
import Vue from "vue";

Vue.mixin(stroe);
复制代码
```


现在每个`Vue`组件都有了访问`store`的能力，可以基于`vuex`进行通信。


### 请求获取


笔者的插件项目中某个需求需要获取到原页面上某接口返回的数据，类似抓取数据的功能，提供三种解决方案：


- devtools
`devtools`的权限非常大，只有`devtools`可以访问`chrome.devtools api`，开启`devtools`可以监听网页中接口的请求，[vue-devtools](https://chrome.google.com/webstore/detail/nhdogjmejiglipccpnnnanhbledajbpd)插件就是通过该方式开发
我们这样开启`devtools`:
```
// 创建一个Panel
// 这里配置F12面板里的标签页
chrome.devtools.panels.create(
// title
"vue-chrome-extension",
// iconPath
null,
// pagePath
"panel.html"
  );
  
  // 打印错误日志
const log = args =>
  chrome.devtools.inspectedWindow.eval(`
      console.log(${JSON.stringify(args)});
  `);

// 注册回调，每一个http请求响应后，都触发该回调
chrome.devtools.network.onRequestFinished.addListener(async (...args) => {
  try {
    const [
      {
        // 请求的类型，查询参数，以及url
        request: { url },
        // 该方法可用于获取响应体
        getContent
      }
    ] = args;

    if (url.indexOf("xxxx") === -1) {
      const content = await new Promise(res => getContent(res));
      // 发送请求内容
      chrome.runtime.sendMessage({ content });
    }
  } catch (err) {
    log(err.stack || err.toString());
  }
});
复制代码
```

- `devtools`页面中获取到接口响应实体后再将内容发送出去，具体的模块通信可以看[这里](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html#%E6%B6%88%E6%81%AF%E9%80%9A%E4%BF%A1)。
缺点:需要开启`F12`
- 重发请求
因为使用插件的用户在目标页处在登录状态，我们就可以利用登录状态(`cookie`)来拷贝目标接口地址，再通过请求重发获取响应内容，我们可以这样实现:
```
import axios from "@/utils/axios";

// 根据自定义请求头判断是否需要重发
function isRequestSelf(headers) {
  return headers.some(header => header.name === "X-No-Rerequest");
}

// 使用后台请求
const installRequest = () => {
  chrome.webRequest.onBeforeSendHeaders.addListener(
    async function(details) {
      if (!isRequestSelf(details.requestHeaders)) {
        const res = await axios.request({
          method: details.method,
          url: details.url,
          // 添加自定义请求头，区分页面和插件请求，防止循环请求
          headers: {
            "X-No-Rerequest": "true"
          }
        });
        // 后续可以将响应实体转发出去，与其他模块进行通信
      }
    },
    { urls: ["https://www.baidu.com/*"] },
    ["blocking", "requestHeaders"]
  );
};

export default installRequest;
复制代码
```

- 缺点:重发请求需要消耗性能
- 注入js，替换ajax对象(**推荐**)
笔者遇到的情况非常严苛:
   - 插件项目是基于`content scripts`，`devtools`方式要打开F12，用户是开发者也许能够理解，但对普通用户肯定会影响到插件使用体验
   - 使用`重发请求`方式，但目标网站中的目标接口安全措施做的非常完美：请求url中有一个随机参数，这个参数由`鼠标位置`、`时间戳`、`页面高度`等参数合成，可以说独一无二。虽然在网上找了解出该参数的方法，但重发请求后，返回的内容与原请求响应内容不一致(也就是说该接口的内容是随机返回的)。



前两种方式对笔者的实际情况不适用，笔者从`请求拦截`到`请求替换`的思路中找到最终的解决方案。我们可以这样实现:
```
// inject.js
let oldXHR = window.XMLHttpRequest;

function filterUrl(url) {
  return url.indexOf("baidu.com") !== -1;
}

function newXHR() {
  let realXHR = new oldXHR();

  realXHR.onload = function() {
    // 发送搜索列表页数据
    if (filterUrl(realXHR.responseURL)) {
      window.postMessage({ data: realXHR.responseText }, "*");
      console.log(`这是onload函数请求的文本:${realXHR.responseText}`);
    }
  };

  return realXHR;
}

window.XMLHttpRequest = newXHR;
复制代码
```


这种方式是使用`injected-script`，原理是先缓存页面中原`ajax`请求对象，在原`ajax`对象上添加`onload`方法，监听请求完成的回调，再将目标接口的响应实体通过相应的通信方法发送出去。
在`content scripts`中将`injected-script`插入到页面上
```
// content.js
injectJS();

function injectJS() {
  document.addEventListener("readystatechange", () => {
    const injectPath = "inject.js";
    const temp = document.createElement("script");

    temp.setAttribute("type", "text/javascript");
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(injectPath);
    document.body.appendChild(temp);
  });
}
复制代码
```


为什么不用`content scripts`？请看[这里](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html#injected-script)了解`content scripts`与`injected-script`的区别
虽然最终的实现方式只有寥寥几行代码，但提供的功能非常强大。
这样的方式也有缺点，就是只能适用于`ajax`请求的目标页面，若目标页面使用[fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)请求，这种方式则无效。可以通过开启[service worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)方式实现`fetch`请求监听(笔者没有尝试过)。


## 结束


插件拥有的权限非常多，开发者可以利用这些特性提供丰富的功能。笔者将Vue开发插件的模板放到了[github](https://github.com/Jcanno/vue-chrome-extension)上，若对你有帮助，欢迎**star**✨
