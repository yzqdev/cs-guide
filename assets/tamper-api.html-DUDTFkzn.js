import{_ as a,c as n,a as t,o as l}from"./app-C8DxhDIZ.js";const i={};function d(o,e){return l(),n("div",null,e[0]||(e[0]=[t(`<h1 id="tampermonkey相关的api" tabindex="-1"><a class="header-anchor" href="#tampermonkey相关的api"><span>tampermonkey相关的api</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>文档见<a href="https://www.tampermonkey.net/documentation.php?ext=dhdg" target="_blank" rel="noopener noreferrer">链接</a></p></div><h2 id="用户脚本-header" tabindex="-1"><a class="header-anchor" href="#用户脚本-header"><span>用户脚本 Header</span></a></h2><h3 id="name" tabindex="-1"><a class="header-anchor" href="#name"><span><code>@name</code></span></a></h3><p>脚本名称</p><h3 id="namesapce" tabindex="-1"><a class="header-anchor" href="#namesapce"><span><code>@namesapce</code></span></a></h3><p>脚本命名空间</p><h3 id="include" tabindex="-1"><a class="header-anchor" href="#include"><span><code>@include</code></span></a></h3><p>设置脚本在哪些网页中可以运行，允许设置多个标签。 <code>@include</code> 不支持URL hash参数。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// @include http://123.com/*</span>
<span class="line">// @include https://123.com/*</span>
<span class="line">// @include https://*</span>
<span class="line"></span></code></pre></div><h3 id="match" tabindex="-1"><a class="header-anchor" href="#match"><span><code>@match</code></span></a></h3><p>与 <code>@include</code> 标签类似，允许设置多个。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// @match http*://</span>
<span class="line"></span></code></pre></div><h3 id="exclude" tabindex="-1"><a class="header-anchor" href="#exclude"><span><code>@exclude</code></span></a></h3><p>排除的URL， 在这些页面不运行脚本， 即使地址包含在 <code>@include</code>或<code>@match</code>标签内。允许设置多个。</p><h3 id="require" tabindex="-1"><a class="header-anchor" href="#require"><span><code>@require</code></span></a></h3><p>表示在运行脚本前需要加载和运行的JavaScript文件。允许设置多个。 注：如果加载的脚本使用<code>use strict</code>模式，用户脚本可能也会受严格模式影响</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// @require https://code.jquery.com/jquery-2.1.4.min.js</span>
<span class="line">// @require https://code.jquery.com/jquery-2.1.3.min.js#sha256=23456...</span>
<span class="line">// @require https://code.jquery.com/jquery-2.1.2.min.js#md5=34567...,sha256=6789..</span>
<span class="line"></span></code></pre></div><h3 id="resource" tabindex="-1"><a class="header-anchor" href="#resource"><span><code>@resource</code></span></a></h3><p>定义一些需要预加载的资源文件，这些资源可以在脚本中通过<code>GM_getResourceURL</code>，<code>GM_getResourceText</code>访问。允许设置多个。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// @resource icon2 /images/icon.png</span>
<span class="line">// @resource html http://www.tampermonkey.net/index.html</span>
<span class="line">// @resource xml http://www.tampermonkey.net/crx/tampermonkey.xml</span>
<span class="line">// @resource SRIsecured1 http://www.tampermonkey.net/favicon.ico#md5=123434...</span>
<span class="line"></span></code></pre></div><h3 id="connect" tabindex="-1"><a class="header-anchor" href="#connect"><span><code>@connect</code></span></a></h3><p>设置允许通过<code>GM_xmlhttpRequest</code>连接访问的域名（包括子域名）。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// @connect *</span>
<span class="line">// @connect *://*.qidian.com/</span>
<span class="line"></span></code></pre></div><p><code>@connect</code> 标签允许设置的值：</p><ul><li>域名，如<code>tampermonkey.net</code>, 设置后该域名下的所有子域名都是允许访问的</li><li>子域名，如<code>safari.tampermonkey.net</code></li><li><code>self</code> 当前脚本正在运行的域名</li><li><code>localhost</code></li><li><code>1.2.3.4</code> 允许连接的IP地址</li><li><code>*</code> 所有域名</li></ul><h3 id="run-at" tabindex="-1"><a class="header-anchor" href="#run-at"><span><code>@run-at</code></span></a></h3><p>设置注入脚本的时间。<code>@run-at</code> defines the first possible moment a script wants to run.</p><ul><li><code>@run-at document-start</code> The script will be injected as fast as possible.</li><li><code>@run-at document-body</code> The script will be injected if the body element exists.</li><li><code>@run-at document-end</code> The script will be injected when or after the DOMContentLoaded event was dispatched.</li><li><code>@run-at document-idle</code> The script will be injected after the DOMContentLoaded event was dispatched. This is the default value if no @run-at tag is given.</li><li><code>@run-at content-menu</code> The script will be injected if it is clicked at the browser context menu (desktop Chrome-based browsers only).</li></ul><h3 id="grant" tabindex="-1"><a class="header-anchor" href="#grant"><span><code>@grant</code></span></a></h3><p><code>@grant</code>标签用于设置<code>GM_*</code>方法， <code>unsafeWindow</code>对象， <code>window</code>对象方法的白名单。If no @grant tag is given TM guesses the scripts needs.</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// @grant GM_setValue</span>
<span class="line">// @grant GM_getValue</span>
<span class="line">// @grant GM_setClipboard</span>
<span class="line">// @grant unsafeWindow</span>
<span class="line">// @grant window.close</span>
<span class="line">// @grant window.focus</span>
<span class="line"></span></code></pre></div><h2 id="api" tabindex="-1"><a class="header-anchor" href="#api"><span>API</span></a></h2><h3 id="unsafewindow" tabindex="-1"><a class="header-anchor" href="#unsafewindow"><span><code>unsafeWindow</code></span></a></h3><p>通过<code>unsafeWindow</code>对象访问页面的js方法和变量</p><h3 id="subresource-integrity" tabindex="-1"><a class="header-anchor" href="#subresource-integrity"><span><code>Subresource Integrity</code></span></a></h3><p><code>@require\`\`@resource</code>标签设置URL的hash部分</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// @require https://code.jquery.com/jquery-2.1.1.min.js#md5=45eef...</span>
<span class="line">// @require https://code.jquery.com/jquery-2.1.2.min.js#md5=ac56d...,sha256=6e789.</span>
<span class="line"></span></code></pre></div><h3 id="gm-addstyle-css" tabindex="-1"><a class="header-anchor" href="#gm-addstyle-css"><span><code>GM_addStyle(css)</code></span></a></h3><p>Adds the given style to the document and returns the injected style element.</p><h3 id="gm-deletevalue-name" tabindex="-1"><a class="header-anchor" href="#gm-deletevalue-name"><span><code>GM_deleteValue(name)</code></span></a></h3><p>Deletes &#39;name&#39; from storage.</p><h3 id="gm-listvalues" tabindex="-1"><a class="header-anchor" href="#gm-listvalues"><span><code>GM_listValues()</code></span></a></h3><p>List all names of the storage.</p><h3 id="gm-addvaluechangelistener-name-function-name-old-value-new-value-remote" tabindex="-1"><a class="header-anchor" href="#gm-addvaluechangelistener-name-function-name-old-value-new-value-remote"><span><code>GM_addValueChangeListener(name, function(name, old_value, new_value, remote) {})</code></span></a></h3><p>对storage存储的变量添加监听器，返回监听器ID。 <code>name</code>参数是要监听的变量名</p><h3 id="gm-removevaluechangelistener-listener-id" tabindex="-1"><a class="header-anchor" href="#gm-removevaluechangelistener-listener-id"><span><code>GM_removeValueChangeListener(listener_id)</code></span></a></h3><p>移除监听器</p><h3 id="gm-setvalue-name-value" tabindex="-1"><a class="header-anchor" href="#gm-setvalue-name-value"><span><code>GM_setValue(name, value)</code></span></a></h3><p>Set the value of &#39;name&#39; to the storage.</p><h3 id="gm-getvalue-name-defaultvalue" tabindex="-1"><a class="header-anchor" href="#gm-getvalue-name-defaultvalue"><span><code>GM_getValue(name, defaultValue)</code></span></a></h3><p>从storage里面获取&#39;name&#39;的值</p><h3 id="gm-log-message" tabindex="-1"><a class="header-anchor" href="#gm-log-message"><span><code>GM_log(message)</code></span></a></h3><p>控制台输出日志</p><h3 id="gm-getresourcetext-name" tabindex="-1"><a class="header-anchor" href="#gm-getresourcetext-name"><span><code>GM_getResourceText(name)</code></span></a></h3><p>获取在脚本头部用<code>@resource</code>标签预定义的的内容</p><h3 id="gm-getresourceurl-name" tabindex="-1"><a class="header-anchor" href="#gm-getresourceurl-name"><span><code>GM_getResourceURL(name)</code></span></a></h3><p>获取在脚本头部用<code>@resource</code>标签预定义的的base64编码的URI</p><h3 id="gm-registermenucommand-name-fn-accesskey" tabindex="-1"><a class="header-anchor" href="#gm-registermenucommand-name-fn-accesskey"><span><code>GM_registerMenuCommand(name, fn, accessKey)</code></span></a></h3><p>在脚本运行页面的Tampermonkey菜单中注册新的菜单，返回菜单command ID</p><h3 id="gm-unregistermenucommand-menucmdid" tabindex="-1"><a class="header-anchor" href="#gm-unregistermenucommand-menucmdid"><span><code>GM_unregisterMenuCommand(menuCmdId)</code></span></a></h3><p>注销用<code>GM_registerMenuCommand</code>注册的菜单</p><h3 id="gm-openintab-url-options-gm-openintab-url-loadinbackground" tabindex="-1"><a class="header-anchor" href="#gm-openintab-url-options-gm-openintab-url-loadinbackground"><span><code>GM_openInTab(url, options), GM_openInTab(url, loadInBackground)</code></span></a></h3><p>在新标签页打开URL。<code>options</code>可选的值：</p><ul><li><code>active</code> 定义焦点是否在新标签页上</li><li><code>insert</code></li><li><code>setParent</code></li></ul><h3 id="gm-xmlhttprequest-details" tabindex="-1"><a class="header-anchor" href="#gm-xmlhttprequest-details"><span><code>GM_xmlhttpRequest(details)</code></span></a></h3><p>Make an xmlHttpRequest.</p><h3 id="gm-download-details-gm-download-url-name" tabindex="-1"><a class="header-anchor" href="#gm-download-details-gm-download-url-name"><span><code>GM_download(details), GM_download(url, name)</code></span></a></h3><p>下载URL指定资源到本地磁盘</p><p><code>details</code> 可以有如下属性:</p><ul><li><code>url</code> - 下载地址 (必需)</li><li><code>name</code> - 文件名 - 由于安全原因需要在Tampermonkey的配置页把文件扩展名设为白名单（<em>for security reasons the file extension needs to be whitelisted at Tampermonkey&#39;s options page</em>） (必需)</li><li><code>headers</code> - 参见 <code>GM_xmlhttpRequest</code></li><li><code>saveAs</code> - <code>boolean</code>, 弹出“保存为”的弹框</li><li><code>onerror</code> - 下载失败的回调</li><li><code>onload</code> - 下载完成回调</li><li><code>onprogress</code> 下载进度变化时的回调</li><li><code>ontimeout</code> 由于超时导致下载失败时的回调</li></ul><p><code>onerror</code> 回调函数的参数：</p><ul><li><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">error</span>
<span class="line"></span></code></pre></div><p>- 失败原因</p><ul><li><code>not_enabled</code> - 用户不能使用下载功能</li><li><code>not_whitelisted</code> - 下载文件后缀不在白名单内</li><li><code>not_permitted</code> - the user enabled the download feature, but did not give the downloads permission</li><li><code>not_supported</code> - the download feature isn&#39;t supported by the browser/version</li><li><code>not_succeeded</code> - the download wasn&#39;t started or failed, the details attribute may provide more information</li></ul></li><li><p><code>details</code> 关于错误的详细信息</p></li></ul><p>下载扩展白名单设置如下：</p><p><img src="https://cdn.bianchengquan.com/4fac9ba115140ac4f1c22da82aa0bc7f/blog/5fd1a4eec3b9d.png" alt="img"></p><blockquote><p>Chrome 可以使用 Tampermonkey 的 GM_download 函数绕过 CSP(Content Security Policy) 的限制</p></blockquote><h3 id="gm-gettab-callback" tabindex="-1"><a class="header-anchor" href="#gm-gettab-callback"><span><code>GM_getTab(callback)</code></span></a></h3><p>Get a object that is persistent as long as this tab is open.</p><h3 id="gm-savetab-tab" tabindex="-1"><a class="header-anchor" href="#gm-savetab-tab"><span><code>GM_saveTab(tab)</code></span></a></h3><p>Save the tab object to reopen it after a page unload.</p><h3 id="gm-gettabs-callback" tabindex="-1"><a class="header-anchor" href="#gm-gettabs-callback"><span><code>GM_getTabs(callback)</code></span></a></h3><p>Get all tab objects as a hash to communicate with other script instances.</p><h3 id="gm-notification-details-ondone-gm-notification-text-title-image-onlick" tabindex="-1"><a class="header-anchor" href="#gm-notification-details-ondone-gm-notification-text-title-image-onlick"><span><code>GM_notification(details, ondone)</code> <code>GM_notification(text, title, image, onlick)</code></span></a></h3><p>显示一个H5桌面通知，并/或 高亮显示当前Tab</p><p><code>details</code> 有如下特性:</p><ul><li><code>text</code> - 通知的文本 (需要 <code>highlight</code> 设置为<code>false</code>)</li><li><code>title</code> - 通知的标题</li><li><code>image</code> - 图片</li><li><code>highlight</code> - <code>boolean</code> 是否高亮发送通知的标签页 (未设置<code>text</code>时)</li><li><code>silent</code> - <code>boolean</code> 是否播放提示音</li><li><code>timeout</code> - <code>timeout</code> 设置的时间之后通知会被隐藏 (0 = disabled)</li><li><code>ondone</code> - 通知被关闭时调用 (no matter if this was triggered by a timeout or a click) or the tab was highlighted</li><li><code>onclick</code> - 用户点击通知时调用</li></ul><h3 id="gm-setclipborad-data-info" tabindex="-1"><a class="header-anchor" href="#gm-setclipborad-data-info"><span><code>GM_setClipborad(data, info)</code></span></a></h3><p>复制内容到剪贴板，The parameter &#39;info&#39; can be an object like &quot;{ type: &#39;text&#39;, mimetype: &#39;text/plain&#39;}&quot; or just a string expressing the type (&quot;text&quot; or &quot;html&quot;)</p><h3 id="gm-info" tabindex="-1"><a class="header-anchor" href="#gm-info"><span><code>GM_info</code></span></a></h3><p>获取关于脚本和GM的一些信息</p>`,90)]))}const c=a(i,[["render",d]]),r=JSON.parse('{"path":"/frontend/tampermonkey/tamper-api.html","title":"tampermonkey相关的api","lang":"zh-CN","frontmatter":{"description":"tampermonkey相关的api 提示 文档见链接 用户脚本 Header @name 脚本名称 @namesapce 脚本命名空间 @include 设置脚本在哪些网页中可以运行，允许设置多个标签。 @include 不支持URL hash参数。 @match 与 @include 标签类似，允许设置多个。 @exclude 排除的URL， 在这...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/tampermonkey/tamper-api.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"tampermonkey相关的api"}],["meta",{"property":"og:description","content":"tampermonkey相关的api 提示 文档见链接 用户脚本 Header @name 脚本名称 @namesapce 脚本命名空间 @include 设置脚本在哪些网页中可以运行，允许设置多个标签。 @include 不支持URL hash参数。 @match 与 @include 标签类似，允许设置多个。 @exclude 排除的URL， 在这..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.bianchengquan.com/4fac9ba115140ac4f1c22da82aa0bc7f/blog/5fd1a4eec3b9d.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-10T12:33:03.000Z"}],["meta",{"property":"article:modified_time","content":"2022-04-10T12:33:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"tampermonkey相关的api\\",\\"image\\":[\\"https://cdn.bianchengquan.com/4fac9ba115140ac4f1c22da82aa0bc7f/blog/5fd1a4eec3b9d.png\\"],\\"dateModified\\":\\"2022-04-10T12:33:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"用户脚本 Header","slug":"用户脚本-header","link":"#用户脚本-header","children":[{"level":3,"title":"@name","slug":"name","link":"#name","children":[]},{"level":3,"title":"@namesapce","slug":"namesapce","link":"#namesapce","children":[]},{"level":3,"title":"@include","slug":"include","link":"#include","children":[]},{"level":3,"title":"@match","slug":"match","link":"#match","children":[]},{"level":3,"title":"@exclude","slug":"exclude","link":"#exclude","children":[]},{"level":3,"title":"@require","slug":"require","link":"#require","children":[]},{"level":3,"title":"@resource","slug":"resource","link":"#resource","children":[]},{"level":3,"title":"@connect","slug":"connect","link":"#connect","children":[]},{"level":3,"title":"@run-at","slug":"run-at","link":"#run-at","children":[]},{"level":3,"title":"@grant","slug":"grant","link":"#grant","children":[]}]},{"level":2,"title":"API","slug":"api","link":"#api","children":[{"level":3,"title":"unsafeWindow","slug":"unsafewindow","link":"#unsafewindow","children":[]},{"level":3,"title":"Subresource Integrity","slug":"subresource-integrity","link":"#subresource-integrity","children":[]},{"level":3,"title":"GM_addStyle(css)","slug":"gm-addstyle-css","link":"#gm-addstyle-css","children":[]},{"level":3,"title":"GM_deleteValue(name)","slug":"gm-deletevalue-name","link":"#gm-deletevalue-name","children":[]},{"level":3,"title":"GM_listValues()","slug":"gm-listvalues","link":"#gm-listvalues","children":[]},{"level":3,"title":"GM_addValueChangeListener(name, function(name, old_value, new_value, remote) {})","slug":"gm-addvaluechangelistener-name-function-name-old-value-new-value-remote","link":"#gm-addvaluechangelistener-name-function-name-old-value-new-value-remote","children":[]},{"level":3,"title":"GM_removeValueChangeListener(listener_id)","slug":"gm-removevaluechangelistener-listener-id","link":"#gm-removevaluechangelistener-listener-id","children":[]},{"level":3,"title":"GM_setValue(name, value)","slug":"gm-setvalue-name-value","link":"#gm-setvalue-name-value","children":[]},{"level":3,"title":"GM_getValue(name, defaultValue)","slug":"gm-getvalue-name-defaultvalue","link":"#gm-getvalue-name-defaultvalue","children":[]},{"level":3,"title":"GM_log(message)","slug":"gm-log-message","link":"#gm-log-message","children":[]},{"level":3,"title":"GM_getResourceText(name)","slug":"gm-getresourcetext-name","link":"#gm-getresourcetext-name","children":[]},{"level":3,"title":"GM_getResourceURL(name)","slug":"gm-getresourceurl-name","link":"#gm-getresourceurl-name","children":[]},{"level":3,"title":"GM_registerMenuCommand(name, fn, accessKey)","slug":"gm-registermenucommand-name-fn-accesskey","link":"#gm-registermenucommand-name-fn-accesskey","children":[]},{"level":3,"title":"GM_unregisterMenuCommand(menuCmdId)","slug":"gm-unregistermenucommand-menucmdid","link":"#gm-unregistermenucommand-menucmdid","children":[]},{"level":3,"title":"GM_openInTab(url, options), GM_openInTab(url, loadInBackground)","slug":"gm-openintab-url-options-gm-openintab-url-loadinbackground","link":"#gm-openintab-url-options-gm-openintab-url-loadinbackground","children":[]},{"level":3,"title":"GM_xmlhttpRequest(details)","slug":"gm-xmlhttprequest-details","link":"#gm-xmlhttprequest-details","children":[]},{"level":3,"title":"GM_download(details), GM_download(url, name)","slug":"gm-download-details-gm-download-url-name","link":"#gm-download-details-gm-download-url-name","children":[]},{"level":3,"title":"GM_getTab(callback)","slug":"gm-gettab-callback","link":"#gm-gettab-callback","children":[]},{"level":3,"title":"GM_saveTab(tab)","slug":"gm-savetab-tab","link":"#gm-savetab-tab","children":[]},{"level":3,"title":"GM_getTabs(callback)","slug":"gm-gettabs-callback","link":"#gm-gettabs-callback","children":[]},{"level":3,"title":"GM_notification(details, ondone) GM_notification(text, title, image, onlick)","slug":"gm-notification-details-ondone-gm-notification-text-title-image-onlick","link":"#gm-notification-details-ondone-gm-notification-text-title-image-onlick","children":[]},{"level":3,"title":"GM_setClipborad(data, info)","slug":"gm-setclipborad-data-info","link":"#gm-setclipborad-data-info","children":[]},{"level":3,"title":"GM_info","slug":"gm-info","link":"#gm-info","children":[]}]}],"git":{"createdTime":1647861419000,"updatedTime":1649593983000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":4.23,"words":1269},"filePathRelative":"frontend/tampermonkey/tamper-api.md","localizedDate":"2022年3月21日","autoDesc":true}');export{c as comp,r as data};
