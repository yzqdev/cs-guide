import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/linux-tutor/common/linux-packages.html","title":"Linux 常用包 — 命令行效率工具","lang":"zh-CN","frontmatter":{"author":"HelloGitHub","description":"Linux 常用包 — 命令行效率工具 我第一次使用 Linux 服务器时，漆黑的界面上只有一行白色字母，末尾还有一个孤独闪烁的光标。我小心翼翼地输入第一个命令 ls，然后重复输入了好几遍界面依旧是漆黑一片。这种体验就像在漆黑的夜空，天上连一颗星星都没有... 后来在漫长学习命令行操作的过程中，遇到了一些让我相见恨晚的命令行工具，它们就像雨夜的一道闪电...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux 常用包 — 命令行效率工具\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"HelloGitHub\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/common/linux-packages.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Linux 常用包 — 命令行效率工具"}],["meta",{"property":"og:description","content":"Linux 常用包 — 命令行效率工具 我第一次使用 Linux 服务器时，漆黑的界面上只有一行白色字母，末尾还有一个孤独闪烁的光标。我小心翼翼地输入第一个命令 ls，然后重复输入了好几遍界面依旧是漆黑一片。这种体验就像在漆黑的夜空，天上连一颗星星都没有... 后来在漫长学习命令行操作的过程中，遇到了一些让我相见恨晚的命令行工具，它们就像雨夜的一道闪电..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:author","content":"HelloGitHub"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1647861419000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":5,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":5.59,"words":1678},"filePathRelative":"linux-tutor/common/linux-packages.md","autoDesc":true}`),a={name:`linux-packages.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="linux-常用包-—-命令行效率工具" tabindex="-1"><a class="header-anchor" href="#linux-常用包-—-命令行效率工具"><span>Linux 常用包 — 命令行效率工具</span></a></h1><blockquote><p>我第一次使用 Linux 服务器时，漆黑的界面上只有一行白色字母，末尾还有一个孤独闪烁的光标。我小心翼翼地输入第一个命令 <code>ls</code>，然后重复输入了好几遍界面依旧是漆黑一片。这种体验就像在漆黑的夜空，天上连一颗星星都没有...</p><p>后来在漫长学习命令行操作的过程中，遇到了一些让我相见恨晚的命令行工具，它们就像雨夜的一道闪电，瞬间照亮了整个夜空。</p></blockquote><hr><h2 id="一、系统信息展示" tabindex="-1"><a class="header-anchor" href="#一、系统信息展示"><span>一、系统信息展示</span></a></h2><h3 id="_1-neofetch-—-系统信息展示" tabindex="-1"><a class="header-anchor" href="#_1-neofetch-—-系统信息展示"><span>1. neofetch — 系统信息展示</span></a></h3><p><strong>替代</strong>：<code>uname</code>、<code>hostname</code> 等</p><p>支持 150+ 种操作系统，以美观的方式展示系统信息。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> neofetch          <span class="token comment"># Debian/Ubuntu</span></span>
<span class="line">brew <span class="token function">install</span> neofetch              <span class="token comment"># macOS</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line">neofetch</span>
<span class="line"></span></code></pre></div><p><strong>项目地址</strong>：<a href="https://github.com/dylanaraps/neofetch" target="_blank" rel="noopener noreferrer">github.com/dylanaraps/neofetch</a></p><h3 id="_2-screenfetch-—-另一种系统信息展示" tabindex="-1"><a class="header-anchor" href="#_2-screenfetch-—-另一种系统信息展示"><span>2. screenfetch — 另一种系统信息展示</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> screenfetch</span>
<span class="line">screenfetch</span>
<span class="line"></span></code></pre></div><hr><h2 id="二、命令替代品" tabindex="-1"><a class="header-anchor" href="#二、命令替代品"><span>二、命令替代品</span></a></h2><h3 id="_3-bat-—-代替-cat" tabindex="-1"><a class="header-anchor" href="#_3-bat-—-代替-cat"><span>3. bat — 代替 cat</span></a></h3><p><strong>语言</strong>：Rust</p><p>支持语法高亮、行号显示、Git 改动展示的文件查看工具。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> bat               <span class="token comment"># Debian/Ubuntu</span></span>
<span class="line">brew <span class="token function">install</span> bat                   <span class="token comment"># macOS</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line"><span class="token function">cat</span> README.md                     <span class="token comment"># 原始 cat</span></span>
<span class="line">bat README.md                     <span class="token comment"># 带语法高亮</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 常用参数</span></span>
<span class="line">bat --show-all                    <span class="token comment"># 显示所有不可见字符</span></span>
<span class="line">bat <span class="token parameter variable">-A</span>                            <span class="token comment"># 同上</span></span>
<span class="line">bat <span class="token parameter variable">-n</span> file.txt                   <span class="token comment"># 显示行号</span></span>
<span class="line">bat <span class="token parameter variable">-l</span> python file.py             <span class="token comment"># 指定语言高亮</span></span>
<span class="line">bat <span class="token parameter variable">--theme</span><span class="token operator">=</span>ansi                  <span class="token comment"># 指定主题</span></span>
<span class="line"></span></code></pre></div><p><strong>项目地址</strong>：<a href="https://github.com/sharkdp/bat" target="_blank" rel="noopener noreferrer">github.com/sharkdp/bat</a></p><h3 id="_4-httpie-—-代替-curl" tabindex="-1"><a class="header-anchor" href="#_4-httpie-—-代替-curl"><span>4. httpie — 代替 curl</span></a></h3><p><strong>语言</strong>：Python</p><p>人性化的 HTTP 命令行客户端，返回结果高亮显示。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> httpie            <span class="token comment"># Debian/Ubuntu</span></span>
<span class="line">brew <span class="token function">install</span> httpie                <span class="token comment"># macOS</span></span>
<span class="line">pip <span class="token function">install</span> httpie                 <span class="token comment"># pip</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line">http https://api.example.com       <span class="token comment"># GET 请求</span></span>
<span class="line">http POST https://api.example.com <span class="token assign-left variable">name</span><span class="token operator">=</span>hello  <span class="token comment"># POST 请求</span></span>
<span class="line">http PUT https://api.example.com/1 <span class="token assign-left variable">name</span><span class="token operator">=</span>world</span>
<span class="line">http DELETE https://api.example.com/1</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 常用参数</span></span>
<span class="line">http <span class="token parameter variable">-v</span> https://example.com        <span class="token comment"># 详细输出</span></span>
<span class="line">http <span class="token parameter variable">-h</span> https://example.com        <span class="token comment"># 只显示请求头</span></span>
<span class="line">http <span class="token parameter variable">-b</span> https://example.com        <span class="token comment"># 只显示响应体</span></span>
<span class="line">http <span class="token parameter variable">--json</span> POST <span class="token punctuation">..</span>.               <span class="token comment"># JSON 格式</span></span>
<span class="line">http <span class="token parameter variable">-f</span> POST <span class="token punctuation">..</span>. <span class="token assign-left variable">name</span><span class="token operator">=</span>value        <span class="token comment"># 表单格式</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>项目地址</strong>：<a href="https://github.com/httpie/httpie" target="_blank" rel="noopener noreferrer">github.com/httpie/httpie</a></p><h3 id="_5-htop-—-代替-top" tabindex="-1"><a class="header-anchor" href="#_5-htop-—-代替-top"><span>5. htop — 代替 top</span></a></h3><p><strong>语言</strong>：C</p><p>交互式进程管理工具，比 top 更直观。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">htop</span>              <span class="token comment"># Debian/Ubuntu</span></span>
<span class="line">brew <span class="token function">install</span> <span class="token function">htop</span>                  <span class="token comment"># macOS</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line"><span class="token function">htop</span>                               <span class="token comment"># 启动</span></span>
<span class="line"><span class="token function">htop</span> <span class="token parameter variable">-u</span> username                   <span class="token comment"># 只显示指定用户进程</span></span>
<span class="line"><span class="token function">htop</span> <span class="token parameter variable">-p</span> <span class="token number">1234,5678</span>                  <span class="token comment"># 只监控指定 PID</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 交互快捷键</span></span>
<span class="line"><span class="token comment"># F1 帮助</span></span>
<span class="line"><span class="token comment"># F2 设置</span></span>
<span class="line"><span class="token comment"># F3 搜索</span></span>
<span class="line"><span class="token comment"># F4 过滤</span></span>
<span class="line"><span class="token comment"># F5 树形显示</span></span>
<span class="line"><span class="token comment"># F6 排序</span></span>
<span class="line"><span class="token comment"># F9 杀死进程</span></span>
<span class="line"><span class="token comment"># F10 退出</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>项目地址</strong>：<a href="https://github.com/htop-dev/htop" target="_blank" rel="noopener noreferrer">github.com/htop-dev/htop</a></p><h3 id="_6-duf-—-代替-df" tabindex="-1"><a class="header-anchor" href="#_6-duf-—-代替-df"><span>6. duf — 代替 df</span></a></h3><p><strong>语言</strong>：Go</p><p>更美观的磁盘使用情况查看工具。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> duf</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line">duf                                <span class="token comment"># 查看所有挂载点</span></span>
<span class="line">duf /home                          <span class="token comment"># 查看指定目录</span></span>
<span class="line">duf <span class="token parameter variable">--only</span> <span class="token builtin class-name">local</span>                   <span class="token comment"># 只显示本地磁盘</span></span>
<span class="line">duf --hide-fs tmpfs                <span class="token comment"># 隐藏 tmpfs</span></span>
<span class="line"></span></code></pre></div><h3 id="_7-ncdu-—-代替-du" tabindex="-1"><a class="header-anchor" href="#_7-ncdu-—-代替-du"><span>7. ncdu — 代替 du</span></a></h3><p><strong>语言</strong>：C</p><p>交互式磁盘使用分析工具。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> ncdu</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line">ncdu                               <span class="token comment"># 分析当前目录</span></span>
<span class="line">ncdu /home                         <span class="token comment"># 分析指定目录</span></span>
<span class="line">ncdu <span class="token parameter variable">-x</span> /                          <span class="token comment"># 不跨文件系统</span></span>
<span class="line"></span></code></pre></div><hr><h2 id="三、开发效率工具" tabindex="-1"><a class="header-anchor" href="#三、开发效率工具"><span>三、开发效率工具</span></a></h2><h3 id="_8-fd-—-代替-find" tabindex="-1"><a class="header-anchor" href="#_8-fd-—-代替-find"><span>8. fd — 代替 find</span></a></h3><p><strong>语言</strong>：Rust</p><p>更快的文件查找工具，默认忽略隐藏文件和 .gitignore。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> fd-find           <span class="token comment"># Debian/Ubuntu</span></span>
<span class="line">brew <span class="token function">install</span> fd                    <span class="token comment"># macOS</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line">fd <span class="token string">&quot;pattern&quot;</span>                       <span class="token comment"># 查找文件名包含 pattern 的文件</span></span>
<span class="line">fd <span class="token parameter variable">-e</span> txt                          <span class="token comment"># 查找所有 .txt 文件</span></span>
<span class="line">fd <span class="token parameter variable">-e</span> md <span class="token parameter variable">-e</span> txt                    <span class="token comment"># 查找 .md 和 .txt 文件</span></span>
<span class="line">fd <span class="token parameter variable">-d</span> <span class="token number">3</span> <span class="token string">&quot;pattern&quot;</span>                  <span class="token comment"># 只在 3 层内查找</span></span>
<span class="line">fd <span class="token parameter variable">-x</span> <span class="token builtin class-name">command</span>                      <span class="token comment"># 对每个结果执行命令</span></span>
<span class="line">fd <span class="token parameter variable">-H</span> <span class="token string">&quot;pattern&quot;</span>                    <span class="token comment"># 包含隐藏文件</span></span>
<span class="line"></span></code></pre></div><p><strong>项目地址</strong>：<a href="https://github.com/sharkdp/fd" target="_blank" rel="noopener noreferrer">github.com/sharkdp/fd</a></p><h3 id="_9-ripgrep-rg-—-代替-grep" tabindex="-1"><a class="header-anchor" href="#_9-ripgrep-rg-—-代替-grep"><span>9. ripgrep (rg) — 代替 grep</span></a></h3><p><strong>语言</strong>：Rust</p><p>超快的文本搜索工具，递归搜索默认忽略 .gitignore。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> ripgrep           <span class="token comment"># Debian/Ubuntu</span></span>
<span class="line">brew <span class="token function">install</span> ripgrep               <span class="token comment"># macOS</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line">rg <span class="token string">&quot;pattern&quot;</span>                       <span class="token comment"># 递归搜索当前目录</span></span>
<span class="line">rg <span class="token string">&quot;pattern&quot;</span> /path/                <span class="token comment"># 搜索指定目录</span></span>
<span class="line">rg <span class="token parameter variable">-i</span> <span class="token string">&quot;pattern&quot;</span>                    <span class="token comment"># 忽略大小写</span></span>
<span class="line">rg <span class="token parameter variable">-l</span> <span class="token string">&quot;pattern&quot;</span>                    <span class="token comment"># 只显示文件名</span></span>
<span class="line">rg <span class="token parameter variable">-c</span> <span class="token string">&quot;pattern&quot;</span>                    <span class="token comment"># 显示匹配次数</span></span>
<span class="line">rg <span class="token parameter variable">-g</span> <span class="token string">&quot;*.py&quot;</span> <span class="token string">&quot;pattern&quot;</span>             <span class="token comment"># 只搜索 .py 文件</span></span>
<span class="line">rg <span class="token parameter variable">-A</span> <span class="token number">5</span> <span class="token string">&quot;pattern&quot;</span>                  <span class="token comment"># 显示匹配后 5 行</span></span>
<span class="line">rg <span class="token parameter variable">-B</span> <span class="token number">5</span> <span class="token string">&quot;pattern&quot;</span>                  <span class="token comment"># 显示匹配前 5 行</span></span>
<span class="line">rg <span class="token parameter variable">-C</span> <span class="token number">5</span> <span class="token string">&quot;pattern&quot;</span>                  <span class="token comment"># 显示匹配前后各 5 行</span></span>
<span class="line"></span></code></pre></div><p><strong>项目地址</strong>：<a href="https://github.com/BurntSushi/ripgrep" target="_blank" rel="noopener noreferrer">github.com/BurntSushi/ripgrep</a></p><h3 id="_10-fzf-—-模糊搜索" tabindex="-1"><a class="header-anchor" href="#_10-fzf-—-模糊搜索"><span>10. fzf — 模糊搜索</span></a></h3><p><strong>语言</strong>：Go</p><p>通用命令行模糊搜索工具，可以搜索文件、历史命令、进程等。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> fzf               <span class="token comment"># Debian/Ubuntu</span></span>
<span class="line">brew <span class="token function">install</span> fzf                   <span class="token comment"># macOS</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line">fzf                                <span class="token comment"># 搜索当前目录文件</span></span>
<span class="line"><span class="token function">cat</span> file.txt <span class="token operator">|</span> fzf                <span class="token comment"># 搜索文件内容</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 集成到 Shell（在 .bashrc / .zshrc 中添加）</span></span>
<span class="line"><span class="token builtin class-name">source</span> /usr/share/fzf/key-bindings.bash</span>
<span class="line"><span class="token builtin class-name">source</span> /usr/share/fzf/completion.bash</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 快捷键（配置后）</span></span>
<span class="line"><span class="token comment"># Ctrl+T 搜索文件</span></span>
<span class="line"><span class="token comment"># Ctrl+R 搜索历史命令</span></span>
<span class="line"><span class="token comment"># Ctrl+P 搜索进程</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>项目地址</strong>：<a href="https://github.com/junegunn/fzf" target="_blank" rel="noopener noreferrer">github.com/junegunn/fzf</a></p><h3 id="_11-fsql-—-用-sql-搜索文件" tabindex="-1"><a class="header-anchor" href="#_11-fsql-—-用-sql-搜索文件"><span>11. fsql — 用 SQL 搜索文件</span></a></h3><p><strong>语言</strong>：Go</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line">go <span class="token function">install</span> github.com/kashav/fsql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line">fsql <span class="token string">&quot;SELECT * FROM ./ WHERE name LIKE &#39;%test%&#39;&quot;</span></span>
<span class="line">fsql <span class="token string">&quot;SELECT path, size FROM ./ WHERE size &gt; 1024 ORDER BY size DESC&quot;</span></span>
<span class="line"></span></code></pre></div><p><strong>项目地址</strong>：<a href="https://github.com/kashav/fsql" target="_blank" rel="noopener noreferrer">github.com/kashav/fsql</a></p><hr><h2 id="四、数据库工具" tabindex="-1"><a class="header-anchor" href="#四、数据库工具"><span>四、数据库工具</span></a></h2><h3 id="_12-mycli-—-mysql-增强客户端" tabindex="-1"><a class="header-anchor" href="#_12-mycli-—-mysql-增强客户端"><span>12. mycli — MySQL 增强客户端</span></a></h3><p><strong>语言</strong>：Python</p><p>带语法高亮和自动补全的 MySQL 客户端。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> mycli             <span class="token comment"># Debian/Ubuntu</span></span>
<span class="line">brew <span class="token function">install</span> mycli                 <span class="token comment"># macOS</span></span>
<span class="line">pip <span class="token function">install</span> mycli                  <span class="token comment"># pip</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line">mycli <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> password database</span>
<span class="line">mycli mysql://user:pass@localhost/db</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 功能</span></span>
<span class="line"><span class="token comment"># - 自动补全 SQL 关键字</span></span>
<span class="line"><span class="token comment"># - 语法高亮</span></span>
<span class="line"><span class="token comment"># - 智能提示</span></span>
<span class="line"><span class="token comment"># - 支持 SQL 历史</span></span>
<span class="line"></span></code></pre></div><p><strong>项目地址</strong>：<a href="https://github.com/dbcli/mycli" target="_blank" rel="noopener noreferrer">github.com/dbcli/mycli</a></p><h3 id="_13-pgcli-—-postgresql-增强客户端" tabindex="-1"><a class="header-anchor" href="#_13-pgcli-—-postgresql-增强客户端"><span>13. pgcli — PostgreSQL 增强客户端</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">pip <span class="token function">install</span> pgcli</span>
<span class="line">pgcli <span class="token parameter variable">-h</span> localhost <span class="token parameter variable">-u</span> user <span class="token parameter variable">-d</span> database</span>
<span class="line"></span></code></pre></div><h3 id="_14-iredis-—-redis-增强客户端" tabindex="-1"><a class="header-anchor" href="#_14-iredis-—-redis-增强客户端"><span>14. iredis — Redis 增强客户端</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">pip <span class="token function">install</span> iredis</span>
<span class="line">iredis</span>
<span class="line"></span></code></pre></div><hr><h2 id="五、容器与监控" tabindex="-1"><a class="header-anchor" href="#五、容器与监控"><span>五、容器与监控</span></a></h2><h3 id="_15-ctop-—-容器监控" tabindex="-1"><a class="header-anchor" href="#_15-ctop-—-容器监控"><span>15. ctop — 容器监控</span></a></h3><p><strong>语言</strong>：Go</p><p>类似 top 的 Docker 容器监控工具。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> ctop              <span class="token comment"># 或下载二进制</span></span>
<span class="line">brew <span class="token function">install</span> ctop</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line">ctop                               <span class="token comment"># 启动</span></span>
<span class="line">ctop <span class="token parameter variable">-a</span>                            <span class="token comment"># 显示所有容器（包括停止的）</span></span>
<span class="line"></span></code></pre></div><p><strong>项目地址</strong>：<a href="https://github.com/bcicen/ctop" target="_blank" rel="noopener noreferrer">github.com/bcicen/ctop</a></p><h3 id="_16-lazydocker-—-docker-管理-ui" tabindex="-1"><a class="header-anchor" href="#_16-lazydocker-—-docker-管理-ui"><span>16. lazydocker — Docker 管理 UI</span></a></h3><p><strong>语言</strong>：Go</p><p>带终端 UI 的 Docker 管理工具。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line">brew <span class="token function">install</span> lazydocker            <span class="token comment"># macOS</span></span>
<span class="line"><span class="token comment"># 或者下载二进制文件</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line">lazydocker                         <span class="token comment"># 启动管理界面</span></span>
<span class="line"></span></code></pre></div><p><strong>项目地址</strong>：<a href="https://github.com/jesseduffield/lazydocker" target="_blank" rel="noopener noreferrer">github.com/jesseduffield/lazydocker</a></p><h3 id="_17-lazydocker-的姊妹-—-lazygit" tabindex="-1"><a class="header-anchor" href="#_17-lazydocker-的姊妹-—-lazygit"><span>17. lazydocker 的姊妹 — lazygit</span></a></h3><p><strong>语言</strong>：Go</p><p>带终端 UI 的 Git 客户端。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> lazygit</span>
<span class="line">brew <span class="token function">install</span> lazygit</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line">lazygit                            <span class="token comment"># 启动</span></span>
<span class="line"></span></code></pre></div><p><strong>项目地址</strong>：<a href="https://github.com/jesseduffield/lazygit" target="_blank" rel="noopener noreferrer">github.com/jesseduffield/lazygit</a></p><hr><h2 id="六、性能与压测" tabindex="-1"><a class="header-anchor" href="#六、性能与压测"><span>六、性能与压测</span></a></h2><h3 id="_18-gpustat-—-gpu-监控" tabindex="-1"><a class="header-anchor" href="#_18-gpustat-—-gpu-监控"><span>18. gpustat — GPU 监控</span></a></h3><p><strong>语言</strong>：Python</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">pip <span class="token function">install</span> gpustat</span>
<span class="line">gpustat                            <span class="token comment"># 查看 GPU 状态</span></span>
<span class="line">gpustat <span class="token parameter variable">--watch</span>                    <span class="token comment"># 实时监控</span></span>
<span class="line"></span></code></pre></div><p><strong>项目地址</strong>：<a href="https://github.com/wookayin/gpustat" target="_blank" rel="noopener noreferrer">github.com/wookayin/gpustat</a></p><h3 id="_19-ali-—-压测工具" tabindex="-1"><a class="header-anchor" href="#_19-ali-—-压测工具"><span>19. ali — 压测工具</span></a></h3><p><strong>语言</strong>：Go</p><p>实时展示压力测试结果的命令行工具。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line">go <span class="token function">install</span> github.com/nakabonne/ali</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line">ali http://localhost:8080</span>
<span class="line">ali <span class="token parameter variable">-d</span> 30s http://localhost:8080   <span class="token comment"># 持续 30 秒</span></span>
<span class="line">ali <span class="token parameter variable">-c</span> <span class="token number">50</span> http://localhost:8080    <span class="token comment"># 50 并发</span></span>
<span class="line"></span></code></pre></div><p><strong>项目地址</strong>：<a href="https://github.com/nakabonne/ali" target="_blank" rel="noopener noreferrer">github.com/nakabonne/ali</a></p><hr><h2 id="七、终极-shell-体验" tabindex="-1"><a class="header-anchor" href="#七、终极-shell-体验"><span>七、终极 Shell 体验</span></a></h2><h3 id="_20-oh-my-zsh-—-终极-shell" tabindex="-1"><a class="header-anchor" href="#_20-oh-my-zsh-—-终极-shell"><span>20. oh-my-zsh — 终极 Shell</span></a></h3><p><strong>Star 数</strong>：128k+ ⭐</p><p>ZSH 的框架，让命令行前所未有的好用。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装 ZSH</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">zsh</span>               <span class="token comment"># Debian/Ubuntu</span></span>
<span class="line">brew <span class="token function">install</span> <span class="token function">zsh</span>                   <span class="token comment"># macOS</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装 oh-my-zsh</span></span>
<span class="line"><span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh<span class="token variable">)</span></span>&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置文件</span></span>
<span class="line"><span class="token function">vim</span> ~/.zshrc</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 切换默认 Shell</span></span>
<span class="line">chsh <span class="token parameter variable">-s</span> /bin/zsh</span>
<span class="line"></span></code></pre></div><p><strong>常用插件</strong>：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 在 ~/.zshrc 中设置</span></span>
<span class="line"><span class="token assign-left variable">plugins</span><span class="token operator">=</span><span class="token punctuation">(</span>git <span class="token function">docker</span> kubectl autojump zsh-autosuggestions zsh-syntax-highlighting<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装自动补全插件</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/zsh-users/zsh-autosuggestions <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token variable">$ZSH_CUSTOM</span>/plugins/zsh-autosuggestions</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装语法高亮插件</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/zsh-users/zsh-syntax-highlighting.git <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token variable">$ZSH_CUSTOM</span>/plugins/zsh-syntax-highlighting</span>
<span class="line"></span></code></pre></div><p><strong>项目地址</strong>：<a href="https://github.com/ohmyzsh/ohmyzsh" target="_blank" rel="noopener noreferrer">github.com/ohmyzsh/ohmyzsh</a></p><hr><h2 id="八、快速安装脚本" tabindex="-1"><a class="header-anchor" href="#八、快速安装脚本"><span>八、快速安装脚本</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 一键安装常用工具（Debian/Ubuntu）</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token punctuation">\\</span></span>
<span class="line">    neofetch <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token function">htop</span> <span class="token punctuation">\\</span></span>
<span class="line">    bat <span class="token punctuation">\\</span></span>
<span class="line">    httpie <span class="token punctuation">\\</span></span>
<span class="line">    fd-find <span class="token punctuation">\\</span></span>
<span class="line">    ripgrep <span class="token punctuation">\\</span></span>
<span class="line">    fzf <span class="token punctuation">\\</span></span>
<span class="line">    tree <span class="token punctuation">\\</span></span>
<span class="line">    ncdu <span class="token punctuation">\\</span></span>
<span class="line">    duf <span class="token punctuation">\\</span></span>
<span class="line">    lazygit <span class="token punctuation">\\</span></span>
<span class="line">    mycli</span>
<span class="line"></span>
<span class="line"><span class="token comment"># macOS</span></span>
<span class="line">brew <span class="token function">install</span> <span class="token punctuation">\\</span></span>
<span class="line">    neofetch <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token function">htop</span> <span class="token punctuation">\\</span></span>
<span class="line">    bat <span class="token punctuation">\\</span></span>
<span class="line">    httpie <span class="token punctuation">\\</span></span>
<span class="line">    fd <span class="token punctuation">\\</span></span>
<span class="line">    ripgrep <span class="token punctuation">\\</span></span>
<span class="line">    fzf <span class="token punctuation">\\</span></span>
<span class="line">    tree <span class="token punctuation">\\</span></span>
<span class="line">    ncdu <span class="token punctuation">\\</span></span>
<span class="line">    duf <span class="token punctuation">\\</span></span>
<span class="line">    lazygit <span class="token punctuation">\\</span></span>
<span class="line">    mycli</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,108)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};