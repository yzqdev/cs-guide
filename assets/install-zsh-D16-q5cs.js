import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/linux-tutor/linux-tips/install-zsh.html","title":"Linux 安装 ZSH 与 Oh My Zsh","lang":"zh-CN","frontmatter":{"description":"Linux 安装 ZSH 与 Oh My Zsh 一、安装 ZSH 二、安装 Oh My Zsh 三、设置默认 Shell 四、安装必备插件 1. 语法高亮 2. 自动建议 3. 自动补全 五、配置插件 编辑 ~/.zshrc： 找到 plugins=(git) 这一行，修改为： 重新加载配置： 六、主题推荐 内置主题 第三方主题 Powerlevel...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux 安装 ZSH 与 Oh My Zsh\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/linux-tips/install-zsh.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Linux 安装 ZSH 与 Oh My Zsh"}],["meta",{"property":"og:description","content":"Linux 安装 ZSH 与 Oh My Zsh 一、安装 ZSH 二、安装 Oh My Zsh 三、设置默认 Shell 四、安装必备插件 1. 语法高亮 2. 自动建议 3. 自动补全 五、配置插件 编辑 ~/.zshrc： 找到 plugins=(git) 这一行，修改为： 重新加载配置： 六、主题推荐 内置主题 第三方主题 Powerlevel..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1647861419000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":4,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.17,"words":650},"filePathRelative":"linux-tutor/linux-tips/install-zsh.md","autoDesc":true}`),a={name:`install-zsh.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="linux-安装-zsh-与-oh-my-zsh" tabindex="-1"><a class="header-anchor" href="#linux-安装-zsh-与-oh-my-zsh"><span>Linux 安装 ZSH 与 Oh My Zsh</span></a></h1><h2 id="一、安装-zsh" tabindex="-1"><a class="header-anchor" href="#一、安装-zsh"><span>一、安装 ZSH</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># Arch/Manjaro</span></span>
<span class="line"><span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> <span class="token function">zsh</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Debian/Ubuntu</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">zsh</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># macOS</span></span>
<span class="line">brew <span class="token function">install</span> <span class="token function">zsh</span></span>
<span class="line"></span></code></pre></div><h2 id="二、安装-oh-my-zsh" tabindex="-1"><a class="header-anchor" href="#二、安装-oh-my-zsh"><span>二、安装 Oh My Zsh</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 官方方式</span></span>
<span class="line"><span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh<span class="token variable">)</span></span>&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 国内用户（使用镜像）</span></span>
<span class="line"><span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://gitee.com/mirrors/oh-my-zsh/raw/master/tools/install.sh<span class="token variable">)</span></span>&quot;</span></span>
<span class="line"></span></code></pre></div><h2 id="三、设置默认-shell" tabindex="-1"><a class="header-anchor" href="#三、设置默认-shell"><span>三、设置默认 Shell</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看当前 Shell</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token environment constant">$SHELL</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 切换默认 Shell 为 ZSH</span></span>
<span class="line">chsh <span class="token parameter variable">-s</span> /bin/zsh</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重新登录后生效，或直接执行</span></span>
<span class="line"><span class="token function">zsh</span></span>
<span class="line"></span></code></pre></div><h2 id="四、安装必备插件" tabindex="-1"><a class="header-anchor" href="#四、安装必备插件"><span>四、安装必备插件</span></a></h2><h3 id="_1-语法高亮" tabindex="-1"><a class="header-anchor" href="#_1-语法高亮"><span>1. 语法高亮</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 官方</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/zsh-users/zsh-syntax-highlighting.git <span class="token punctuation">\\</span></span>
<span class="line">  ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 国内镜像</span></span>
<span class="line"><span class="token function">git</span> clone https://gitclone.com/github.com/zsh-users/zsh-syntax-highlighting.git <span class="token punctuation">\\</span></span>
<span class="line">  ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting</span>
<span class="line"></span></code></pre></div><h3 id="_2-自动建议" tabindex="-1"><a class="header-anchor" href="#_2-自动建议"><span>2. 自动建议</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 官方</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/zsh-users/zsh-autosuggestions.git <span class="token punctuation">\\</span></span>
<span class="line">  ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 国内镜像</span></span>
<span class="line"><span class="token function">git</span> clone https://gitclone.com/github.com/zsh-users/zsh-autosuggestions.git <span class="token punctuation">\\</span></span>
<span class="line">  ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions</span>
<span class="line"></span></code></pre></div><h3 id="_3-自动补全" tabindex="-1"><a class="header-anchor" href="#_3-自动补全"><span>3. 自动补全</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 官方</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/zsh-users/zsh-completions <span class="token punctuation">\\</span></span>
<span class="line">  ~/.oh-my-zsh/custom/plugins/zsh-completions</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 国内镜像</span></span>
<span class="line"><span class="token function">git</span> clone https://gitclone.com/github.com/zsh-users/zsh-completions.git <span class="token punctuation">\\</span></span>
<span class="line">  ~/.oh-my-zsh/custom/plugins/zsh-completions</span>
<span class="line"></span></code></pre></div><h2 id="五、配置插件" tabindex="-1"><a class="header-anchor" href="#五、配置插件"><span>五、配置插件</span></a></h2><p>编辑 <code>~/.zshrc</code>：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">vim</span> ~/.zshrc</span>
<span class="line"></span></code></pre></div><p>找到 <code>plugins=(git)</code> 这一行，修改为：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token assign-left variable">plugins</span><span class="token operator">=</span><span class="token punctuation">(</span></span>
<span class="line">  <span class="token function">git</span></span>
<span class="line">  zsh-syntax-highlighting</span>
<span class="line">  zsh-autosuggestions</span>
<span class="line">  zsh-completions</span>
<span class="line">  <span class="token function">docker</span></span>
<span class="line">  <span class="token function">docker-compose</span></span>
<span class="line">  extract</span>
<span class="line">  <span class="token function">sudo</span></span>
<span class="line">  colored-man-pages</span>
<span class="line">  command-not-found</span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>重新加载配置：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token builtin class-name">source</span> ~/.zshrc</span>
<span class="line"><span class="token comment"># 或使用内置命令</span></span>
<span class="line">src</span>
<span class="line"></span></code></pre></div><h2 id="六、主题推荐" tabindex="-1"><a class="header-anchor" href="#六、主题推荐"><span>六、主题推荐</span></a></h2><h3 id="内置主题" tabindex="-1"><a class="header-anchor" href="#内置主题"><span>内置主题</span></a></h3><table><thead><tr><th>主题</th><th>预览</th></tr></thead><tbody><tr><td><code>jtriley</code></td><td>简洁，带 Git 状态</td></tr><tr><td><code>amuse</code></td><td>彩色，带时间戳</td></tr><tr><td><code>gnzh</code></td><td>带系统信息</td></tr><tr><td><code>junkfood</code></td><td>彩色图标</td></tr><tr><td><code>agnoster</code></td><td>经典，信息丰富</td></tr></tbody></table><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 在 ~/.zshrc 中修改主题</span></span>
<span class="line"><span class="token assign-left variable">ZSH_THEME</span><span class="token operator">=</span><span class="token string">&quot;agnoster&quot;</span></span>
<span class="line"></span></code></pre></div><h3 id="第三方主题" tabindex="-1"><a class="header-anchor" href="#第三方主题"><span>第三方主题</span></a></h3><p><strong>Powerlevel10k</strong> — 最流行的 ZSH 主题：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> clone <span class="token parameter variable">--depth</span><span class="token operator">=</span><span class="token number">1</span> https://github.com/romkatv/powerlevel10k.git <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token variable">\${ZSH_CUSTOM<span class="token operator">:-</span>$HOME<span class="token operator">/</span>.oh-my-zsh<span class="token operator">/</span>custom}</span>/themes/powerlevel10k</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 在 ~/.zshrc 中设置</span></span>
<span class="line"><span class="token assign-left variable">ZSH_THEME</span><span class="token operator">=</span><span class="token string">&quot;powerlevel10k/powerlevel10k&quot;</span></span>
<span class="line"></span></code></pre></div><p>更多主题：<a href="https://github.com/ohmyzsh/ohmyzsh/wiki/Themes" target="_blank" rel="noopener noreferrer">github.com/ohmyzsh/ohmyzsh/wiki/Themes</a></p><h2 id="七、插件功能详解" tabindex="-1"><a class="header-anchor" href="#七、插件功能详解"><span>七、插件功能详解</span></a></h2><h3 id="内置插件" tabindex="-1"><a class="header-anchor" href="#内置插件"><span>内置插件</span></a></h3><table><thead><tr><th>插件</th><th>功能</th></tr></thead><tbody><tr><td><code>git</code></td><td>Git 命令别名（<code>gaa</code>=git add all, <code>gcmsg</code>=git commit -m, <code>gst</code>=git status）</td></tr><tr><td><code>extract</code></td><td>一键解压所有格式（<code>x filename.tar.gz</code>）</td></tr><tr><td><code>sudo</code></td><td>双击 Esc 在命令前加 sudo</td></tr><tr><td><code>colored-man-pages</code></td><td>man 命令彩色高亮</td></tr><tr><td><code>command-not-found</code></td><td>输入错误命令时提示如何安装</td></tr><tr><td><code>vi-mode</code></td><td>Vim 键位模式</td></tr><tr><td><code>safe-paste</code></td><td>粘贴时不自动执行</td></tr></tbody></table><h3 id="实用插件" tabindex="-1"><a class="header-anchor" href="#实用插件"><span>实用插件</span></a></h3><table><thead><tr><th>插件</th><th>功能</th></tr></thead><tbody><tr><td><code>last-working-dir</code></td><td>打开终端时自动进入上次目录</td></tr><tr><td><code>rand-quote</code></td><td>显示随机名言</td></tr><tr><td><code>themes</code></td><td>提供 <code>theme</code> 命令随时切换主题</td></tr><tr><td><code>gitignore</code></td><td>提供 <code>gi</code> 命令生成 <code>.gitignore</code> 模板</td></tr><tr><td><code>zsh_reload</code></td><td>提供 <code>src</code> 命令重载 ZSH</td></tr><tr><td><code>z</code></td><td>在常用目录间快速跳转</td></tr><tr><td><code>git-open</code></td><td>在浏览器中打开当前 Git 远程仓库</td></tr></tbody></table><h3 id="插件管理器" tabindex="-1"><a class="header-anchor" href="#插件管理器"><span>插件管理器</span></a></h3><p><strong>zplug</strong> — ZSH 的 Vundle：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-f</span> ~/.zplug/init.zsh <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">  <span class="token builtin class-name">source</span> ~/.zplug/init.zsh</span>
<span class="line"></span>
<span class="line">  zplug <span class="token string">&quot;zsh-users/zsh-syntax-highlighting&quot;</span></span>
<span class="line">  zplug <span class="token string">&quot;zsh-users/zsh-autosuggestions&quot;</span></span>
<span class="line">  zplug <span class="token string">&quot;supercrabtree/k&quot;</span></span>
<span class="line">  zplug <span class="token string">&quot;denisidoro/navi&quot;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">if</span> <span class="token operator">!</span> zplug check --verbose<span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&#39;Run &quot;zplug install&quot; to install&#39;</span></span>
<span class="line">  <span class="token keyword">fi</span></span>
<span class="line">  zplug load</span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span></code></pre></div><h2 id="八、常用快捷键" tabindex="-1"><a class="header-anchor" href="#八、常用快捷键"><span>八、常用快捷键</span></a></h2><p>安装 <code>history-substring-search</code> 插件后，可以绑定：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 在 ~/.zshrc 中添加</span></span>
<span class="line">bindkey <span class="token string">&#39;^P&#39;</span> history-substring-search-up</span>
<span class="line">bindkey <span class="token string">&#39;^N&#39;</span> history-substring-search-down</span>
<span class="line"></span></code></pre></div><p>这样在输入命令前缀后，按 <code>Ctrl+P</code> / <code>Ctrl+N</code> 可以在历史命令中搜索。</p>`,41)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};