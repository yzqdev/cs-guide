import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/git-tutor/tips/params.html","title":"技巧1","lang":"zh-CN","frontmatter":{"description":"技巧1 gitclone单个文件夹 ssh或者https clone慢解决办法 和 Git 类似，你需要修改 SSH 的全局配置文件。 打开或创建你的 SSH 配置文件。Windows 的路径一般在： C:\\\\Users\\\\你的用户名\\\\.ssh\\\\config (如果没有 config 文件，直接新建一个，注意不要有 .txt 后缀) 根据你想代理的范围，把...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"技巧1\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T05:16:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/tips/params.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"技巧1"}],["meta",{"property":"og:description","content":"技巧1 gitclone单个文件夹 ssh或者https clone慢解决办法 和 Git 类似，你需要修改 SSH 的全局配置文件。 打开或创建你的 SSH 配置文件。Windows 的路径一般在： C:\\\\Users\\\\你的用户名\\\\.ssh\\\\config (如果没有 config 文件，直接新建一个，注意不要有 .txt 后缀) 根据你想代理的范围，把..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T05:16:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T05:16:15.000Z"}]]},"git":{"createdTime":1699639616000,"updatedTime":1783919775000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.33,"words":400},"filePathRelative":"git-tutor/tips/params.md","autoDesc":true}`),a={name:`params.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="技巧1" tabindex="-1"><a class="header-anchor" href="#技巧1"><span>技巧1</span></a></h1><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token comment"># clone 下来指定的单一分支</span></span>
<span class="line">git clone <span class="token operator">-</span>b &lt;branch-name&gt; <span class="token operator">--</span>single-branch https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/user/repo<span class="token punctuation">.</span>git</span>
<span class="line"><span class="token comment"># 只会 clone 最近一次提交，将减少 clone 时间</span></span>
<span class="line">git clone <span class="token operator">--</span>depth=1 https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/user/repo<span class="token punctuation">.</span>git</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="gitclone单个文件夹" tabindex="-1"><a class="header-anchor" href="#gitclone单个文件夹"><span>gitclone单个文件夹</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">git config core.sparsecheckout true</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"> mkdir models # 创建一个与要clone的仓库同名或不同命的目录</span>
<span class="line"> cd models</span>
<span class="line"> git init #初始化</span>
<span class="line"> git remote add origin  https://github.com/tensorflow/models.git # 增加远端的仓库地址</span>
<span class="line"> git config core.sparsecheckout true # 设置Sparse Checkout 为true </span>
<span class="line"> echo &quot;research/deeplab&quot; &gt;&gt; .git/info/sparse-checkout # 将要部分clone的目录相对根目录的路径写入配置文件</span>
<span class="line"> git pull --depth 1 origin master </span>
<span class="line"></span></code></pre></div><h2 id="ssh或者https-clone慢解决办法" tabindex="-1"><a class="header-anchor" href="#ssh或者https-clone慢解决办法"><span>ssh或者https clone慢解决办法</span></a></h2><p>和 Git 类似，你需要修改 SSH 的全局配置文件。</p><ol><li><p>打开或创建你的 SSH 配置文件。Windows 的路径一般在： <code>C:\\Users\\你的用户名\\.ssh\\config</code> <em>(如果没有 <code>config</code> 文件，直接新建一个，<strong>注意不要有 .txt 后缀</strong>)</em></p></li><li><p>根据你想代理的范围，把下面对应的代码贴进去并保存：</p></li></ol><h3 id="情况-a-只让连接-github-时走代理-推荐" tabindex="-1"><a class="header-anchor" href="#情况-a-只让连接-github-时走代理-推荐"><span>情况 A：只让连接 GitHub 时走代理（推荐）</span></a></h3><p>如果你只是用 Git 提代码慢，用这个最安全：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Host github.com</span>
<span class="line">    User git</span>
<span class="line">    ProxyCommand connect -H 127.0.0.1:7897 %h %p</span>
<span class="line"></span></code></pre></div><h3 id="情况-b-让所有外网的-ssh-连接全部走代理" tabindex="-1"><a class="header-anchor" href="#情况-b-让所有外网的-ssh-连接全部走代理"><span>情况 B：让所有外网的 SSH 连接全部走代理</span></a></h3><p>如果你经常需要连接国外的 VPS 服务器，想让所有的 ssh user@ip 都变快：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Host *</span>
<span class="line">    # 排除本地局域网，防止连内网设备时报错</span>
<span class="line">    IgnoreUnknown AddKeysToAgent,UseKeychain</span>
<span class="line">    HostName %h</span>
<span class="line">    ProxyCommand connect -H 127.0.0.1:7897 %h %p</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="https-clone慢解决" tabindex="-1"><a class="header-anchor" href="#https-clone慢解决"><span>https clone慢解决</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 1. 给 Git 全局配置 HTTP 和 HTTPS 代理</span>
<span class="line">git config --global http.proxy http://127.0.0.1:7897</span>
<span class="line">git config --global https.proxy http://127.0.0.1:7897</span>
<span class="line"></span>
<span class="line"># 2. 使用 HTTPS 地址重新克隆</span>
<span class="line">git clone https://github.com/xxx/xxx.git</span>
<span class="line"></span>
<span class="line"></span></code></pre></div>`,15)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};