import{_ as s,c as a,a as e,o as t}from"./app-B6vXTniy.js";const p={};function r(o,n){return t(),a("div",null,[...n[0]||(n[0]=[e(`<h1 id="使用nvm和fnm" tabindex="-1"><a class="header-anchor" href="#使用nvm和fnm"><span>使用nvm和fnm</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>也可以使用<a href="https://github.com/Schniz/fnm" target="_blank" rel="noopener noreferrer">fnm</a> 一个rust写的工具<br> nvm全名node.js version management，顾名思义是一个nodejs的版本管理工具。通过它可以安装和切换不同版本的nodejs。下面列出下载、安装及使用方法:</p></div><h2 id="linux安装nvm" tabindex="-1"><a class="header-anchor" href="#linux安装nvm"><span>linux安装nvm</span></a></h2><p>见 <a href="https://github.com/nvm-sh/nvm" target="_blank" rel="noopener noreferrer">https://github.com/nvm-sh/nvm</a></p><h2 id="windows安装nvm" tabindex="-1"><a class="header-anchor" href="#windows安装nvm"><span>windows安装nvm</span></a></h2><h3 id="下载地址" tabindex="-1"><a class="header-anchor" href="#下载地址"><span>下载地址</span></a></h3><p><a href="https://github.com/coreybutler/nvm-windows/releases" target="_blank" rel="noopener noreferrer">https://github.com/coreybutler/nvm-windows/releases</a></p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># nvm 设置淘宝镜像</span></span>
<span class="line"><span class="token comment">#windows版本</span></span>
<span class="line"><span class="token comment"># 设置npm_mirror:</span></span>
<span class="line">nvm npm_mirror https://npmmirror.com/mirrors/npm/</span>
<span class="line"></span>
<span class="line"><span class="token comment">#设置node_mirror:</span></span>
<span class="line">nvm node_mirror https://npmmirror.com/mirrors/node/</span>
<span class="line"></span></code></pre></div><p>之后就是安装nodejs了</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#安装最新的node</span></span>
<span class="line">nvm <span class="token function">install</span> <span class="token function">node</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#使用某个版本</span></span>
<span class="line">nvm use <span class="token number">16.2</span>.0</span>
<span class="line"></span>
<span class="line"><span class="token comment">#卸载某个版本</span></span>
<span class="line">nvm uninstall <span class="token number">16.2</span>.0</span>
<span class="line"></span></code></pre></div><h2 id="安装nrm" tabindex="-1"><a class="header-anchor" href="#安装nrm"><span>安装nrm</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>nrm可以随时切换镜像源</p></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">yarn</span> global <span class="token function">add</span> nrm</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>输入<code>nrm ls</code></p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># nrm ls</span>
<span class="line"></span>
<span class="line">  npm ---------- https://registry.npmjs.org/</span>
<span class="line">  yarn --------- https://registry.yarnpkg.com/</span>
<span class="line">  tencent ------ https://mirrors.cloud.tencent.com/npm/</span>
<span class="line">  cnpm --------- https://r.cnpmjs.org/</span>
<span class="line">  taobao ------- https://registry.npmmirror.com/</span>
<span class="line">  npmMirror ---- https://skimdb.npmjs.com/registry/</span>
<span class="line"></span>
<span class="line"></span></code></pre></div>`,15)])])}const m=s(p,[["render",r]]),c=JSON.parse('{"path":"/frontend/package-manager/nvm.html","title":"使用nvm和fnm","lang":"zh-CN","frontmatter":{"description":"使用nvm和fnm 提示 也可以使用fnm 一个rust写的工具 nvm全名node.js version management，顾名思义是一个nodejs的版本管理工具。通过它可以安装和切换不同版本的nodejs。下面列出下载、安装及使用方法: linux安装nvm 见 https://github.com/nvm-sh/nvm windows安装n...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用nvm和fnm\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-09T01:26:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/package-manager/nvm.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"使用nvm和fnm"}],["meta",{"property":"og:description","content":"使用nvm和fnm 提示 也可以使用fnm 一个rust写的工具 nvm全名node.js version management，顾名思义是一个nodejs的版本管理工具。通过它可以安装和切换不同版本的nodejs。下面列出下载、安装及使用方法: linux安装nvm 见 https://github.com/nvm-sh/nvm windows安装n..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-09T01:26:58.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-09T01:26:58.000Z"}]]},"git":{"createdTime":1647861419000,"updatedTime":1652059618000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":4,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.67,"words":201},"filePathRelative":"frontend/package-manager/nvm.md","autoDesc":true}');export{m as comp,c as data};
