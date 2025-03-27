import{_ as s,c as n,a as e,o as t}from"./app-C8DxhDIZ.js";const l={};function p(i,a){return t(),n("div",null,a[0]||(a[0]=[e(`<h1 id="购买服务器后的配置" tabindex="-1"><a class="header-anchor" href="#购买服务器后的配置"><span>购买服务器后的配置</span></a></h1><h2 id="安装zsh" tabindex="-1"><a class="header-anchor" href="#安装zsh"><span>安装zsh</span></a></h2><p>1、安装zsh</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">zsh</span></span>
<span class="line"></span></code></pre></div><p>2、把默认的Shell改成zsh</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">chsh <span class="token parameter variable">-s</span> /bin/zsh</span>
<span class="line"></span></code></pre></div><p>注意：不要使用sudo。</p><h2 id="安装nodejs" tabindex="-1"><a class="header-anchor" href="#安装nodejs"><span>安装nodejs</span></a></h2><p>使用nvm安装nodejs <a href="https://github.com/nvm-sh/nvm#git-install" target="_blank" rel="noopener noreferrer">https://github.com/nvm-sh/nvm#git-install</a> 然后运行 <code>nvm install node</code></p><h2 id="安装java" tabindex="-1"><a class="header-anchor" href="#安装java"><span>安装java</span></a></h2><h3 id="如果这种方式不需要环境变量-但不一定是最新的" tabindex="-1"><a class="header-anchor" href="#如果这种方式不需要环境变量-但不一定是最新的"><span>如果这种方式不需要环境变量,但不一定是最新的</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> openjdk-11-jdk-headless </span>
<span class="line"></span></code></pre></div><h3 id="手动安装jdk-是最新的" tabindex="-1"><a class="header-anchor" href="#手动安装jdk-是最新的"><span>手动安装jdk(是最新的)</span></a></h3><p><a href="https://adoptium.net/archive.html" target="_blank" rel="noopener noreferrer">https://adoptium.net/archive.html</a> 这里下载jdk后上传到服务器解压,配置环境变量即可</p><h3 id="更改环境变量" tabindex="-1"><a class="header-anchor" href="#更改环境变量"><span>更改环境变量</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> <span class="token function">vi</span> ~/.bashrc</span>
<span class="line"></span></code></pre></div><p>文件尾追加。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment">#set oracle jdk environment</span></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>/usr/lib/jvm/jdk-11.0.7</span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">JRE_HOME</span><span class="token operator">=</span><span class="token variable">\${JAVA_HOME}</span> </span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">CLASSPATH</span><span class="token operator">=</span>.:<span class="token variable">\${JAVA_HOME}</span>/lib:<span class="token variable">\${JRE_HOME}</span>/lib  </span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token variable">\${JAVA_HOME}</span>/bin:<span class="token environment constant">$PATH</span></span>
<span class="line"></span></code></pre></div><p>使配置生效</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token builtin class-name">source</span> ~/.bashrc</span>
<span class="line"></span></code></pre></div><p>查看配置是否成功</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">java</span> <span class="token parameter variable">-version</span></span>
<span class="line">javac <span class="token parameter variable">-version</span></span>
<span class="line"></span></code></pre></div><h2 id="安装postgresql" tabindex="-1"><a class="header-anchor" href="#安装postgresql"><span>安装postgresql</span></a></h2><h2 id="安装nginx" tabindex="-1"><a class="header-anchor" href="#安装nginx"><span>安装Nginx</span></a></h2><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">sudo apt<span class="token operator">-</span>get install nginx</span>
<span class="line"></span>
<span class="line">sudo systemctl start nginx</span>
<span class="line"></span>
<span class="line">然后输入你的服务器ip出现nginx默认页面即可</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="或者安装open-resty" tabindex="-1"><a class="header-anchor" href="#或者安装open-resty"><span>或者安装open-resty</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>OpenResty是一个基于 Nginx 与 Lua 的高性能 Web 平台，其内部集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。</p><p>简单地说OpenResty 的目标是让你的Web服务直接跑在 Nginx 服务内部，充分利用 Nginx 的非阻塞 I/O 模型，不仅仅对 HTTP 客户端请求,甚至于对远程后端诸如 MySQL、PostgreSQL、Memcached 以及 Redis 等都进行一致的高性能响应</p></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">apt-get</span> <span class="token function">install</span> libpcre3-dev <span class="token punctuation">\\</span></span>
<span class="line">    libssl-dev perl <span class="token function">make</span> build-essential <span class="token function">curl</span></span>
<span class="line"></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> openresty</span>
<span class="line"></span></code></pre></div>`,28)]))}const r=s(l,[["render",p]]),c=JSON.parse('{"path":"/java-tutor/server-config/after-bought-server.html","title":"购买服务器后的配置","lang":"zh-CN","frontmatter":{"description":"购买服务器后的配置 安装zsh 1、安装zsh 2、把默认的Shell改成zsh 注意：不要使用sudo。 安装nodejs 使用nvm安装nodejs https://github.com/nvm-sh/nvm#git-install 然后运行 nvm install node 安装java 如果这种方式不需要环境变量,但不一定是最新的 手动安装jd...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/server-config/after-bought-server.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"购买服务器后的配置"}],["meta",{"property":"og:description","content":"购买服务器后的配置 安装zsh 1、安装zsh 2、把默认的Shell改成zsh 注意：不要使用sudo。 安装nodejs 使用nvm安装nodejs https://github.com/nvm-sh/nvm#git-install 然后运行 nvm install node 安装java 如果这种方式不需要环境变量,但不一定是最新的 手动安装jd..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-22T16:32:16.000Z"}],["meta",{"property":"article:modified_time","content":"2022-06-22T16:32:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"购买服务器后的配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-06-22T16:32:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安装zsh","slug":"安装zsh","link":"#安装zsh","children":[]},{"level":2,"title":"安装nodejs","slug":"安装nodejs","link":"#安装nodejs","children":[]},{"level":2,"title":"安装java","slug":"安装java","link":"#安装java","children":[{"level":3,"title":"如果这种方式不需要环境变量,但不一定是最新的","slug":"如果这种方式不需要环境变量-但不一定是最新的","link":"#如果这种方式不需要环境变量-但不一定是最新的","children":[]},{"level":3,"title":"手动安装jdk(是最新的)","slug":"手动安装jdk-是最新的","link":"#手动安装jdk-是最新的","children":[]},{"level":3,"title":"更改环境变量","slug":"更改环境变量","link":"#更改环境变量","children":[]}]},{"level":2,"title":"安装postgresql","slug":"安装postgresql","link":"#安装postgresql","children":[]},{"level":2,"title":"安装Nginx","slug":"安装nginx","link":"#安装nginx","children":[]},{"level":2,"title":"或者安装open-resty","slug":"或者安装open-resty","link":"#或者安装open-resty","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1655915536000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":4,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.35,"words":405},"filePathRelative":"java-tutor/server-config/after-bought-server.md","localizedDate":"2022年3月21日","autoDesc":true}');export{r as comp,c as data};
