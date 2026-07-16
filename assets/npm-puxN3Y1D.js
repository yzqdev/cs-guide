import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/frontend/package-manager/npm.html","title":"npm 配置","lang":"zh-CN","frontmatter":{"description":"npm 配置 镜像源配置 使用淘宝镜像 编辑 ~/.npmrc 文件，添加以下内容： 命令行设置 常用命令 安装包 路径管理 Yarn 路径管理 或直接在 ~/.yarnrc 中配置：","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"npm 配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T15:17:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/package-manager/npm.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"npm 配置"}],["meta",{"property":"og:description","content":"npm 配置 镜像源配置 使用淘宝镜像 编辑 ~/.npmrc 文件，添加以下内容： 命令行设置 常用命令 安装包 路径管理 Yarn 路径管理 或直接在 ~/.yarnrc 中配置："}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T15:17:39.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T15:17:39.000Z"}]]},"git":{"createdTime":1784128659000,"updatedTime":1784128659000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.93,"words":278},"filePathRelative":"frontend/package-manager/npm.md","autoDesc":true}`),a={name:`npm.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="npm-配置" tabindex="-1"><a class="header-anchor" href="#npm-配置"><span>npm 配置</span></a></h1><h2 id="镜像源配置" tabindex="-1"><a class="header-anchor" href="#镜像源配置"><span>镜像源配置</span></a></h2><h3 id="使用淘宝镜像" tabindex="-1"><a class="header-anchor" href="#使用淘宝镜像"><span>使用淘宝镜像</span></a></h3><p>编辑 <code>~/.npmrc</code> 文件，添加以下内容：</p><div class="language-ini" data-highlighter="prismjs" data-ext="ini"><pre><code class="language-ini"><span class="line"><span class="token key attr-name">registry</span><span class="token punctuation">=</span><span class="token value attr-value">https://registry.npmmirror.com</span></span>
<span class="line"><span class="token key attr-name">disturl</span><span class="token punctuation">=</span><span class="token value attr-value">https://npmmirror.com/dist</span></span>
<span class="line"><span class="token key attr-name">electron_mirror</span><span class="token punctuation">=</span><span class="token value attr-value">https://npmmirror.com/mirrors/electron/</span></span>
<span class="line"><span class="token key attr-name">sass_binary_site</span><span class="token punctuation">=</span><span class="token value attr-value">https://npmmirror.com/mirrors/node-sass</span></span>
<span class="line"><span class="token key attr-name">chromedriver-cdnurl</span><span class="token punctuation">=</span><span class="token value attr-value">https://npmmirror.com/mirrors/chromedriver</span></span>
<span class="line"></span></code></pre></div><h3 id="命令行设置" tabindex="-1"><a class="header-anchor" href="#命令行设置"><span>命令行设置</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry https://registry.npmmirror.com</span>
<span class="line"></span></code></pre></div><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h2><h3 id="安装包" tabindex="-1"><a class="header-anchor" href="#安装包"><span>安装包</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 从 GitHub 用户名安装</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> RobinCK/vue-ls</span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> github:RobinCK/vue-ls</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 从 git 仓库安装</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> git+https://github.com/user/repo.git<span class="token comment">#branch</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> git+ssh://git@github.com:user/repo.git<span class="token comment">#branch</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装本地包</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> ./my-local-package</span>
<span class="line"></span></code></pre></div><h3 id="路径管理" tabindex="-1"><a class="header-anchor" href="#路径管理"><span>路径管理</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看全局安装路径</span></span>
<span class="line"><span class="token function">npm</span> prefix <span class="token parameter variable">-g</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改全局安装路径</span></span>
<span class="line"><span class="token function">npm</span> config <span class="token builtin class-name">set</span> prefix <span class="token string">&quot;D:<span class="token entity" title="\\n">\\n</span>odejs<span class="token entity" title="\\n">\\n</span>ode_global&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改全局缓存路径</span></span>
<span class="line"><span class="token function">npm</span> config <span class="token builtin class-name">set</span> cache <span class="token string">&quot;D:/nodejs/npm_cache&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看配置列表</span></span>
<span class="line"><span class="token function">npm</span> config <span class="token function">ls</span></span>
<span class="line"></span></code></pre></div><h2 id="yarn-路径管理" tabindex="-1"><a class="header-anchor" href="#yarn-路径管理"><span>Yarn 路径管理</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看全局 bin 位置</span></span>
<span class="line"><span class="token function">yarn</span> global bin</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看全局安装位置</span></span>
<span class="line"><span class="token function">yarn</span> global <span class="token function">dir</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看全局 cache 位置</span></span>
<span class="line"><span class="token function">yarn</span> cache <span class="token function">dir</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改全局 bin 位置</span></span>
<span class="line"><span class="token function">yarn</span> config <span class="token builtin class-name">set</span> prefix <span class="token string">&quot;E:\\yarn\\Data&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改全局安装位置</span></span>
<span class="line"><span class="token function">yarn</span> config <span class="token builtin class-name">set</span> global-folder <span class="token string">&quot;E:\\yarn\\Data\\global&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改全局 cache 位置</span></span>
<span class="line"><span class="token function">yarn</span> config <span class="token builtin class-name">set</span> cache-folder <span class="token string">&quot;E:\\yarn\\Cache&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或直接在 <code>~/.yarnrc</code> 中配置：</p><div class="language-ini" data-highlighter="prismjs" data-ext="ini"><pre><code class="language-ini"><span class="line">registry &quot;https://registry.npmmirror.com/&quot;</span>
<span class="line">cache-folder &quot;E:\\\\yarn\\\\Cache&quot;</span>
<span class="line">global-folder &quot;E:\\\\yarn\\\\Data\\\\global&quot;</span>
<span class="line">link-folder &quot;E:\\\\yarn\\\\Data\\\\link&quot;</span>
<span class="line">prefix &quot;E:\\\\yarn\\\\Data&quot;</span>
<span class="line"></span></code></pre></div>`,16)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};