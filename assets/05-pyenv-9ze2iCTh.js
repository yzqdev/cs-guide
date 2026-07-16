import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/python-tutor/python-config/05-pyenv.html","title":"pyenv 多版本 Python 管理","lang":"zh-CN","frontmatter":{"order":5,"description":"pyenv 多版本 Python 管理 pyenv 可以让你在同一台机器上安装和管理多个 Python 版本，实现版本间轻松切换。 安装 Windows（pyenv-win） 注意：不要使用 scoop 安装，可能会缺少必要组件。 配置环境变量 Linux / macOS 配置安装镜像 pyenv 默认从 Python 官网下载，速度较慢，可以配置国内...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"pyenv 多版本 Python 管理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/python-config/05-pyenv.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"pyenv 多版本 Python 管理"}],["meta",{"property":"og:description","content":"pyenv 多版本 Python 管理 pyenv 可以让你在同一台机器上安装和管理多个 Python 版本，实现版本间轻松切换。 安装 Windows（pyenv-win） 注意：不要使用 scoop 安装，可能会缺少必要组件。 配置环境变量 Linux / macOS 配置安装镜像 pyenv 默认从 Python 官网下载，速度较慢，可以配置国内..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.62,"words":487},"filePathRelative":"python-tutor/python-config/05-pyenv.md","autoDesc":true}`),a={name:`05-pyenv.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="pyenv-多版本-python-管理" tabindex="-1"><a class="header-anchor" href="#pyenv-多版本-python-管理"><span>pyenv 多版本 Python 管理</span></a></h1><blockquote><p>pyenv 可以让你在同一台机器上安装和管理多个 Python 版本，实现版本间轻松切换。</p></blockquote><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><h3 id="windows-pyenv-win" tabindex="-1"><a class="header-anchor" href="#windows-pyenv-win"><span>Windows（pyenv-win）</span></a></h3><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token comment"># 使用 git 安装</span></span>
<span class="line">git clone https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/pyenv-win/pyenv-win<span class="token punctuation">.</span>git <span class="token operator">%</span>USERPROFILE%\\<span class="token punctuation">.</span>pyenv</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或使用 pip 安装</span></span>
<span class="line">pip install pyenv-win <span class="token operator">--</span>target <span class="token operator">%</span>USERPROFILE%\\<span class="token punctuation">.</span>pyenv</span>
<span class="line"></span></code></pre></div><blockquote><p>注意：不要使用 scoop 安装，可能会缺少必要组件。</p></blockquote><h3 id="配置环境变量" tabindex="-1"><a class="header-anchor" href="#配置环境变量"><span>配置环境变量</span></a></h3><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token comment"># 添加以下环境变量</span></span>
<span class="line">PYENV=<span class="token operator">%</span>USERPROFILE%\\<span class="token punctuation">.</span>pyenv\\pyenv-win</span>
<span class="line">PYENV_ROOT=<span class="token operator">%</span>USERPROFILE%\\<span class="token punctuation">.</span>pyenv\\pyenv-win</span>
<span class="line">PYENV_HOME=<span class="token operator">%</span>USERPROFILE%\\<span class="token punctuation">.</span>pyenv\\pyenv-win</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 在 PATH 中添加</span></span>
<span class="line"><span class="token operator">%</span>USERPROFILE%\\<span class="token punctuation">.</span>pyenv\\pyenv-win\\bin</span>
<span class="line"><span class="token operator">%</span>USERPROFILE%\\<span class="token punctuation">.</span>pyenv\\pyenv-win\\shims</span>
<span class="line"></span></code></pre></div><h3 id="linux-macos" tabindex="-1"><a class="header-anchor" href="#linux-macos"><span>Linux / macOS</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 使用 installer 安装</span></span>
<span class="line"><span class="token function">curl</span> https://pyenv.run <span class="token operator">|</span> <span class="token function">bash</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或使用 Homebrew（macOS）</span></span>
<span class="line">brew <span class="token function">install</span> pyenv</span>
<span class="line"></span></code></pre></div><h2 id="配置安装镜像" tabindex="-1"><a class="header-anchor" href="#配置安装镜像"><span>配置安装镜像</span></a></h2><p>pyenv 默认从 Python 官网下载，速度较慢，可以配置国内镜像：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token comment"># Windows 设置环境变量</span></span>
<span class="line">PYTHON_BUILD_MIRROR_URL=https:<span class="token operator">/</span><span class="token operator">/</span>mirrors<span class="token punctuation">.</span>huaweicloud<span class="token punctuation">.</span>com/python/</span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># Linux / macOS</span></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">PYTHON_BUILD_MIRROR_URL</span><span class="token operator">=</span>https://mirrors.huaweicloud.com/python/</span>
<span class="line"></span></code></pre></div><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看可安装的 Python 版本</span></span>
<span class="line">pyenv <span class="token function">install</span> <span class="token parameter variable">-l</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 搜索特定版本</span></span>
<span class="line">pyenv <span class="token function">install</span> <span class="token parameter variable">-l</span> <span class="token operator">|</span> findstr <span class="token number">3.12</span>    <span class="token comment"># Windows</span></span>
<span class="line">pyenv <span class="token function">install</span> <span class="token parameter variable">-l</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">3.12</span>       <span class="token comment"># Linux/macOS</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装指定版本</span></span>
<span class="line">pyenv <span class="token function">install</span> <span class="token number">3.12</span>.0</span>
<span class="line">pyenv <span class="token function">install</span> <span class="token number">3.11</span>.7</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看已安装的版本</span></span>
<span class="line">pyenv versions</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置全局默认版本</span></span>
<span class="line">pyenv global <span class="token number">3.12</span>.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置局部版本（当前目录）</span></span>
<span class="line">pyenv <span class="token builtin class-name">local</span> <span class="token number">3.11</span>.7</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置 shell 版本（当前会话）</span></span>
<span class="line">pyenv shell <span class="token number">3.12</span>.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看当前版本</span></span>
<span class="line">pyenv version</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 卸载版本</span></span>
<span class="line">pyenv uninstall <span class="token number">3.11</span>.7</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="更新-pyenv" tabindex="-1"><a class="header-anchor" href="#更新-pyenv"><span>更新 pyenv</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># Windows</span></span>
<span class="line"><span class="token builtin class-name">cd</span> %USERPROFILE%<span class="token punctuation">\\</span>.pyenv<span class="token punctuation">\\</span>pyenv-win</span>
<span class="line"><span class="token function">git</span> pull</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Linux/macOS</span></span>
<span class="line">pyenv update</span>
<span class="line"></span></code></pre></div><h2 id="与-virtualenv-配合" tabindex="-1"><a class="header-anchor" href="#与-virtualenv-配合"><span>与 virtualenv 配合</span></a></h2><p>pyenv 可以和 virtualenv 结合使用，实现 Python 版本 + 虚拟环境的双重隔离：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装 pyenv-virtualenv 插件</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/pyenv/pyenv-virtualenv.git <span class="token variable"><span class="token variable">$(</span>pyenv root<span class="token variable">)</span></span>/plugins/pyenv-virtualenv</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建虚拟环境（指定 Python 版本）</span></span>
<span class="line">pyenv virtualenv <span class="token number">3.12</span>.0 myproject-env</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 激活虚拟环境</span></span>
<span class="line">pyenv activate myproject-env</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 退出虚拟环境</span></span>
<span class="line">pyenv deactivate</span>
<span class="line"></span></code></pre></div><h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题"><span>常见问题</span></a></h2><h3 id="_1-安装后找不到-python" tabindex="-1"><a class="header-anchor" href="#_1-安装后找不到-python"><span>1. 安装后找不到 Python</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 重新哈希 shims</span></span>
<span class="line">pyenv rehash</span>
<span class="line"></span></code></pre></div><h3 id="_2-安装速度慢" tabindex="-1"><a class="header-anchor" href="#_2-安装速度慢"><span>2. 安装速度慢</span></a></h3><p>配置镜像源后执行：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">pyenv <span class="token function">install</span> <span class="token number">3.12</span>.0</span>
<span class="line"></span></code></pre></div><h3 id="_3-windows-上安装失败" tabindex="-1"><a class="header-anchor" href="#_3-windows-上安装失败"><span>3. Windows 上安装失败</span></a></h3><p>确保使用管理员权限运行 PowerShell，并关闭杀毒软件。</p><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接"><span>参考链接</span></a></h2><ul><li><a href="https://github.com/pyenv-win/pyenv-win#installation" target="_blank" rel="noopener noreferrer">pyenv-win GitHub</a></li><li><a href="https://github.com/pyenv/pyenv" target="_blank" rel="noopener noreferrer">pyenv GitHub</a></li><li><a href="https://github.com/pyenv/pyenv-virtualenv" target="_blank" rel="noopener noreferrer">pyenv-virtualenv</a></li></ul>`,31)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};