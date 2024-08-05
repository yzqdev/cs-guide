import{_ as n,c as e,o as t,d as r}from"./app-CbULZrmi.js";const o={},a=r(`<h1 id="使用nvm和fnm" tabindex="-1"><a class="header-anchor" href="#使用nvm和fnm"><span>使用nvm和fnm</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>也可以使用<a href="https://github.com/Schniz/fnm" target="_blank" rel="noopener noreferrer">fnm</a> 一个rust写的工具<br> nvm全名node.js version management，顾名思义是一个nodejs的版本管理工具。通过它可以安装和切换不同版本的nodejs。下面列出下载、安装及使用方法:</p></div><h2 id="linux安装nvm" tabindex="-1"><a class="header-anchor" href="#linux安装nvm"><span>linux安装nvm</span></a></h2><p>见 <a href="https://github.com/nvm-sh/nvm" target="_blank" rel="noopener noreferrer">https://github.com/nvm-sh/nvm</a></p><h2 id="windows安装nvm" tabindex="-1"><a class="header-anchor" href="#windows安装nvm"><span>windows安装nvm</span></a></h2><h3 id="下载地址" tabindex="-1"><a class="header-anchor" href="#下载地址"><span>下载地址</span></a></h3><p><a href="https://github.com/coreybutler/nvm-windows/releases" target="_blank" rel="noopener noreferrer">https://github.com/coreybutler/nvm-windows/releases</a></p><pre><code class="language-shell"># nvm 设置淘宝镜像
#windows版本
# 设置npm_mirror:
nvm npm_mirror https://npmmirror.com/mirrors/npm/

#设置node_mirror:
nvm node_mirror https://npmmirror.com/mirrors/node/
</code></pre><p>之后就是安装nodejs了</p><pre><code class="language-bash">#安装最新的node
nvm install node

#使用某个版本
nvm use 16.2.0

#卸载某个版本
nvm uninstall 16.2.0
</code></pre><h2 id="安装nrm" tabindex="-1"><a class="header-anchor" href="#安装nrm"><span>安装nrm</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>nrm可以随时切换镜像源</p></div><pre><code class="language-shell">yarn global add nrm

</code></pre><p>输入<code>nrm ls</code></p><pre><code class="language-text"># nrm ls

  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/

</code></pre>`,15),m=[a];function s(i,p){return t(),e("div",null,m)}const l=n(o,[["render",s],["__file","nvm.html.vue"]]),d=JSON.parse('{"path":"/frontend/package-manager/nvm.html","title":"使用nvm和fnm","lang":"zh-CN","frontmatter":{"description":"使用nvm和fnm 提示 也可以使用fnm 一个rust写的工具 nvm全名node.js version management，顾名思义是一个nodejs的版本管理工具。通过它可以安装和切换不同版本的nodejs。下面列出下载、安装及使用方法: linux安装nvm 见 https://github.com/nvm-sh/nvm windows安装n...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/package-manager/nvm.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"使用nvm和fnm"}],["meta",{"property":"og:description","content":"使用nvm和fnm 提示 也可以使用fnm 一个rust写的工具 nvm全名node.js version management，顾名思义是一个nodejs的版本管理工具。通过它可以安装和切换不同版本的nodejs。下面列出下载、安装及使用方法: linux安装nvm 见 https://github.com/nvm-sh/nvm windows安装n..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-09T01:26:58.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-09T01:26:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用nvm和fnm\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-09T01:26:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"linux安装nvm","slug":"linux安装nvm","link":"#linux安装nvm","children":[]},{"level":2,"title":"windows安装nvm","slug":"windows安装nvm","link":"#windows安装nvm","children":[{"level":3,"title":"下载地址","slug":"下载地址","link":"#下载地址","children":[]}]},{"level":2,"title":"安装nrm","slug":"安装nrm","link":"#安装nrm","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1652059618000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":0.67,"words":201},"filePathRelative":"frontend/package-manager/nvm.md","localizedDate":"2022年3月21日","autoDesc":true}');export{l as comp,d as data};
