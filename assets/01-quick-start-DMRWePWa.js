import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/android-tips/hybrid/uniapp/01-quick-start.html","title":"uni-app 快速开始","lang":"zh-CN","frontmatter":{"order":1,"description":"uni-app 快速开始 简介 uni-app 是一个使用 Vue.js 开发所有前端应用的框架，一套代码可发布到 iOS、Android、H5、以及各种小程序平台。 开发环境 参考链接 常用命令 目录结构 页面配置 (pages.json)","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"uni-app 快速开始\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/hybrid/uniapp/01-quick-start.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"uni-app 快速开始"}],["meta",{"property":"og:description","content":"uni-app 快速开始 简介 uni-app 是一个使用 Vue.js 开发所有前端应用的框架，一套代码可发布到 iOS、Android、H5、以及各种小程序平台。 开发环境 参考链接 常用命令 目录结构 页面配置 (pages.json)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.95,"words":286},"filePathRelative":"android-tips/hybrid/uniapp/01-quick-start.md","autoDesc":true}`),a={name:`01-quick-start.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="uni-app-快速开始" tabindex="-1"><a class="header-anchor" href="#uni-app-快速开始"><span>uni-app 快速开始</span></a></h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h2><p>uni-app 是一个使用 Vue.js 开发所有前端应用的框架，一套代码可发布到 iOS、Android、H5、以及各种小程序平台。</p><h2 id="开发环境" tabindex="-1"><a class="header-anchor" href="#开发环境"><span>开发环境</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装 HBuilderX（推荐）</span></span>
<span class="line"><span class="token comment"># 下载地址：https://www.dcloud.io/hbuilderx.html</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或使用 CLI 方式</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> @vue/cli</span>
<span class="line">vue create <span class="token parameter variable">-p</span> dcloudio/uni-preset-vue my-app</span>
<span class="line"></span></code></pre></div><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接"><span>参考链接</span></a></h2><table><thead><tr><th>链接</th><th>说明</th></tr></thead><tbody><tr><td><a href="https://uniapp.dcloud.net.cn/" target="_blank" rel="noopener noreferrer">官网</a></td><td>官方文档</td></tr><tr><td><a href="https://nativesupport.dcloud.net.cn/" target="_blank" rel="noopener noreferrer">小程序支持</a></td><td>原生 SDK 文档</td></tr><tr><td><a href="https://ext.dcloud.net.cn/" target="_blank" rel="noopener noreferrer">插件市场</a></td><td>插件和组件</td></tr><tr><td><a href="https://www.uviewui.com/" target="_blank" rel="noopener noreferrer">uView UI</a></td><td>常用 UI 库</td></tr><tr><td><a href="https://uiadmin.net/uview-plus/" target="_blank" rel="noopener noreferrer">uView Plus</a></td><td>Vue3 版 UI 库</td></tr><tr><td><a href="https://www.quanzhan.co/luch-request/handbook/" target="_blank" rel="noopener noreferrer">luch-request</a></td><td>HTTP 请求库</td></tr></tbody></table><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 运行到浏览器</span></span>
<span class="line"><span class="token function">npm</span> run dev:h5</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行到微信小程序</span></span>
<span class="line"><span class="token function">npm</span> run dev:mp-weixin</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行到 Android App</span></span>
<span class="line"><span class="token function">npm</span> run dev:app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 发布</span></span>
<span class="line"><span class="token function">npm</span> run build:h5      <span class="token comment"># 发布 H5</span></span>
<span class="line"><span class="token function">npm</span> run build:mp-weixin  <span class="token comment"># 发布小程序</span></span>
<span class="line"><span class="token function">npm</span> run build:app     <span class="token comment"># 发布 App</span></span>
<span class="line"></span></code></pre></div><h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构"><span>目录结构</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">src/</span>
<span class="line">├── pages/          # 页面</span>
<span class="line">│   ├── index/</span>
<span class="line">│   │   └── index.vue</span>
<span class="line">│   └── my/</span>
<span class="line">│       └── my.vue</span>
<span class="line">├── components/     # 组件</span>
<span class="line">├── static/         # 静态资源</span>
<span class="line">├── store/          # Vuex/Pinia 状态管理</span>
<span class="line">├── utils/          # 工具</span>
<span class="line">├── App.vue         # 入口组件</span>
<span class="line">├── main.js         # 入口文件</span>
<span class="line">├── pages.json      # 页面配置</span>
<span class="line">├── manifest.json   # 应用配置</span>
<span class="line">└── uni.scss        # 全局样式</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="页面配置-pages-json" tabindex="-1"><a class="header-anchor" href="#页面配置-pages-json"><span>页面配置 (pages.json)</span></a></h2><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;pages&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;pages/index/index&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;style&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;navigationBarTitleText&quot;</span><span class="token operator">:</span> <span class="token string">&quot;首页&quot;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;globalStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;navigationBarTextStyle&quot;</span><span class="token operator">:</span> <span class="token string">&quot;black&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;navigationBarTitleText&quot;</span><span class="token operator">:</span> <span class="token string">&quot;uni-app&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;navigationBarBackgroundColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#F8F8F8&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};