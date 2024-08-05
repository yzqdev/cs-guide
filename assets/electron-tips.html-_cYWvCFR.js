import{_ as e,c as n,o,d as t}from"./app-CbULZrmi.js";const r={},a=t(`<h1 id="electron-技巧" tabindex="-1"><a class="header-anchor" href="#electron-技巧"><span>electron 技巧</span></a></h1><h2 id="无边框窗口的拖动" tabindex="-1"><a class="header-anchor" href="#无边框窗口的拖动"><span>无边框窗口的拖动</span></a></h2><pre><code class="language-html">默认情况下, 无框窗口是 non-draggable 的。 应用程序需要指定 \`-webkit-app-region: drag\` 在 CSS 中告诉Electron哪个区域是可拖拽的 (像 OS 的标准标题栏), 并且应用程序也可以使用 \`-webkit-app-region: no-drag\` 来排除 draggable region 中的 non-draggable 区域。 请注意, 当前只支持矩形形状。

要使整个窗口可拖拽, 您可以添加 \`-webkit-app-region: drag\` 作为 \`body\` 的样式:
\`\`\`html
&lt;body style=&quot;-webkit-app-region: drag&quot;&gt;&lt;/body&gt;
</code></pre><p>请注意, 如果您已使整个窗口draggable, 则必须将按钮标记为 non-draggable, 否则用户将无法单击它们:</p><pre><code class="language-css">button {  -webkit-app-region: no-drag; }
</code></pre><p>如果你设置自定义标题栏为 draggable, 你也需要标题栏中所有的按钮都设为 non-draggable。 请注意，如果您使整个窗口都可拖拽，则必须将其中的按钮标记为不可拖拽，否则用户将无法点击它们：</p><pre><code class="language-css">button {
  -webkit-app-region: no-drag;
}
</code></pre><h2 id="electron常见错误" tabindex="-1"><a class="header-anchor" href="#electron常见错误"><span>electron常见错误</span></a></h2><p>在渲染进程由于vite无法处理nodejs相关的module,所有只能使用require</p><pre><code class="language-js">const fs=require(&quot;fs&quot;)
</code></pre><h2 id="快捷键打开控制台" tabindex="-1"><a class="header-anchor" href="#快捷键打开控制台"><span>快捷键打开控制台</span></a></h2><p>在app.whenready事件里面加入这个</p><pre><code class="language-js">function registryShortcut() {
  globalShortcut.register(&#39;CommandOrControl+I&#39;, () =&gt; {
    // 获取当前窗口
    BrowserWindow.getFocusedWindow().webContents.openDevTools();
  });
}
</code></pre><p>whenReady</p><pre><code class="language-js">app.whenReady.then(()=&gt;{
  registryShortcut()
})
</code></pre><h2 id="在渲染进程使用nodejs和electronapi" tabindex="-1"><a class="header-anchor" href="#在渲染进程使用nodejs和electronapi"><span>在渲染进程使用nodejs和electronapi</span></a></h2><p>需要在main.ts设置 <code>contextIsolation:false\`\`,这样</code>contextBridge\`会失效,</p><pre><code class="language-js">  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, &quot;icons/icon.png&quot;), // tray icon
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
</code></pre><h2 id="electron渲染进程引入dialog问题" tabindex="-1"><a class="header-anchor" href="#electron渲染进程引入dialog问题"><span>Electron渲染进程引入dialog问题</span></a></h2><p>官网的dialog例子是这样的：</p><pre><code class="language-js">const { dialog } = require(&#39;electron&#39;)
console.log(dialog.showOpenDialog({ properties: [&#39;openFile&#39;, &#39;multiSelections&#39;] }))
</code></pre><p><strong>该例子只能在主进程中使用</strong></p><h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案</span></a></h2><p>老文档方法，引用改为</p><pre><code class="language-js">const { dialog } = require(&#39;electron&#39;).remote
console.log(dialog.showOpenDialog({ properties: [&#39;openFile&#39;, &#39;multiSelections&#39;] }))
</code></pre><p>以上方法也是不行的。经过翻阅Electron文档，里面有一栏目References-&gt;重点更改，这里明确表明了在Electron 14中已经废弃了remote了，需要使用</p><pre><code class="language-js">//渲染进程
const { dialog } = require(&#39;@electron/remote&#39;)
//主进程引入
require(&#39;@electron/remote/main&#39;).initialize()

//然后在mainwindow下添加
 require(&quot;@electron/remote/main&quot;).enable(mainWindow.webContents);
</code></pre><p>如果使用@electron/remote需要使用npm按照</p><pre><code class="language-shell">npm install --save @electron/remote
</code></pre><p>经过以上方法，应该可以解决大部分人的问题了。很不幸，我就是大部分人之外。。。于是我接着翻阅各种资料，再在主程序配置了以下两个地方即可</p><p>main.js</p><pre><code class="language-js">function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, &#39;preload.js&#39;),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,//增加该配置，默认是false，新版本不能使用remote

        }
    })
    mainWindow.loadFile(&#39;index.html&#39;)

    //增加该配置
    require(&#39;@electron/remote/main&#39;).enable(mainWindow.webContents)

}
</code></pre><p>经过以上配置～应该可以顺利跑通dialog例子</p>`,33),l=[a];function i(c,s){return o(),n("div",null,l)}const p=e(r,[["render",i],["__file","electron-tips.html.vue"]]),g=JSON.parse('{"path":"/frontend/electron-tutor/electron-tips.html","title":"electron 技巧","lang":"zh-CN","frontmatter":{"description":"electron 技巧 无边框窗口的拖动 请注意, 如果您已使整个窗口draggable, 则必须将按钮标记为 non-draggable, 否则用户将无法单击它们: 如果你设置自定义标题栏为 draggable, 你也需要标题栏中所有的按钮都设为 non-draggable。 请注意，如果您使整个窗口都可拖拽，则必须将其中的按钮标记为不可拖拽，否则用...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/electron-tutor/electron-tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"electron 技巧"}],["meta",{"property":"og:description","content":"electron 技巧 无边框窗口的拖动 请注意, 如果您已使整个窗口draggable, 则必须将按钮标记为 non-draggable, 否则用户将无法单击它们: 如果你设置自定义标题栏为 draggable, 你也需要标题栏中所有的按钮都设为 non-draggable。 请注意，如果您使整个窗口都可拖拽，则必须将其中的按钮标记为不可拖拽，否则用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-08T05:48:59.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-08T05:48:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"electron 技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-08T05:48:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"无边框窗口的拖动","slug":"无边框窗口的拖动","link":"#无边框窗口的拖动","children":[]},{"level":2,"title":"electron常见错误","slug":"electron常见错误","link":"#electron常见错误","children":[]},{"level":2,"title":"快捷键打开控制台","slug":"快捷键打开控制台","link":"#快捷键打开控制台","children":[]},{"level":2,"title":"在渲染进程使用nodejs和electronapi","slug":"在渲染进程使用nodejs和electronapi","link":"#在渲染进程使用nodejs和electronapi","children":[]},{"level":2,"title":"Electron渲染进程引入dialog问题","slug":"electron渲染进程引入dialog问题","link":"#electron渲染进程引入dialog问题","children":[]},{"level":2,"title":"解决方案","slug":"解决方案","link":"#解决方案","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1657259339000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":2.29,"words":687},"filePathRelative":"frontend/electron-tutor/electron-tips.md","localizedDate":"2022年3月21日","autoDesc":true}');export{p as comp,g as data};
