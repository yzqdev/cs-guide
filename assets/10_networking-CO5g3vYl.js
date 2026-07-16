import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/linux-tutor/basic/10_networking.html","title":"网络工具","lang":"zh-CN","frontmatter":{"order":10,"description":"网络工具 网络连接检查 ping — 测试连通性 curl — 请求网络资源 curl 是与 HTTP 服务交互的首选工具： wget — 下载文件 端口与服务 netstat / ss — 网络连接状态 检测端口 远程连接 SSH — 远程登录 SCP — 安全复制 rsync — 增量同步 网络诊断 本章小结 练习 用 curl -I 查看一个网站...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"网络工具\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/basic/10_networking.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"网络工具"}],["meta",{"property":"og:description","content":"网络工具 网络连接检查 ping — 测试连通性 curl — 请求网络资源 curl 是与 HTTP 服务交互的首选工具： wget — 下载文件 端口与服务 netstat / ss — 网络连接状态 检测端口 远程连接 SSH — 远程登录 SCP — 安全复制 rsync — 增量同步 网络诊断 本章小结 练习 用 curl -I 查看一个网站..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1784119030000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.14,"words":642},"filePathRelative":"linux-tutor/basic/10_networking.md","autoDesc":true}`),a={name:`10_networking.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="网络工具" tabindex="-1"><a class="header-anchor" href="#网络工具"><span>网络工具</span></a></h1><h2 id="网络连接检查" tabindex="-1"><a class="header-anchor" href="#网络连接检查"><span>网络连接检查</span></a></h2><h3 id="ping-—-测试连通性" tabindex="-1"><a class="header-anchor" href="#ping-—-测试连通性"><span>ping — 测试连通性</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">ping</span> google.com               <span class="token comment"># 持续 ping，Ctrl+C 停止</span></span>
<span class="line"><span class="token function">ping</span> <span class="token parameter variable">-c</span> <span class="token number">4</span> google.com          <span class="token comment"># 发送 4 个包后自动停止</span></span>
<span class="line"><span class="token function">ping</span> <span class="token parameter variable">-c</span> <span class="token number">4</span> <span class="token parameter variable">-W</span> <span class="token number">2</span> <span class="token number">192.168</span>.1.1   <span class="token comment"># 超时 2 秒</span></span>
<span class="line"></span></code></pre></div><h3 id="curl-—-请求网络资源" tabindex="-1"><a class="header-anchor" href="#curl-—-请求网络资源"><span>curl — 请求网络资源</span></a></h3><p><code>curl</code> 是与 HTTP 服务交互的首选工具：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 基本 GET 请求</span></span>
<span class="line"><span class="token function">curl</span> https://api.github.com</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 显示响应头</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-I</span> https://google.com</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 保存到文件</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-o</span> output.html https://example.com</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 跟随重定向</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-L</span> https://httpbin.org/redirect/3</span>
<span class="line"></span>
<span class="line"><span class="token comment"># POST 请求</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token parameter variable">-d</span> <span class="token string">&#39;{&quot;key&quot;:&quot;value&quot;}&#39;</span> https://httpbin.org/post</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置请求头</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-H</span> <span class="token string">&quot;Authorization: Bearer token&quot;</span> https://api.example.com</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看详细通信</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-v</span> https://example.com</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="wget-—-下载文件" tabindex="-1"><a class="header-anchor" href="#wget-—-下载文件"><span>wget — 下载文件</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 基本下载</span></span>
<span class="line"><span class="token function">wget</span> https://example.com/file.zip</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 断点续传</span></span>
<span class="line"><span class="token function">wget</span> <span class="token parameter variable">-c</span> https://example.com/largefile.iso</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 限速下载</span></span>
<span class="line"><span class="token function">wget</span> --limit-rate<span class="token operator">=</span>200k https://example.com/file.zip</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 递归下载（镜像整个网站）</span></span>
<span class="line"><span class="token function">wget</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-l</span> <span class="token number">2</span> https://example.com/</span>
<span class="line"></span></code></pre></div><h2 id="端口与服务" tabindex="-1"><a class="header-anchor" href="#端口与服务"><span>端口与服务</span></a></h2><h3 id="netstat-ss-—-网络连接状态" tabindex="-1"><a class="header-anchor" href="#netstat-ss-—-网络连接状态"><span>netstat / ss — 网络连接状态</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 列出所有监听端口</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-tlnp</span>                    <span class="token comment"># t=tcp, l=listen, n=数字显示, p=程序</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-ulnp</span>                    <span class="token comment"># UDP 监听</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看所有连接</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-ant</span>                     <span class="token comment"># 所有 TCP 连接</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-an</span> <span class="token operator">|</span> <span class="token function">grep</span> ESTABLISHED   <span class="token comment"># 已建立的连接</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ss 是 netstat 的现代替代（更快）</span></span>
<span class="line">ss <span class="token parameter variable">-tlnp</span></span>
<span class="line">ss <span class="token parameter variable">-ant</span></span>
<span class="line"></span></code></pre></div><h3 id="检测端口" tabindex="-1"><a class="header-anchor" href="#检测端口"><span>检测端口</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 检查本地端口是否被占用</span></span>
<span class="line"><span class="token function">lsof</span> <span class="token parameter variable">-i</span> :8080</span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-tlnp</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">8080</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查远程端口</span></span>
<span class="line"><span class="token function">nc</span> <span class="token parameter variable">-zv</span> example.com <span class="token number">80</span>           <span class="token comment"># nc 检测端口</span></span>
<span class="line"><span class="token function">timeout</span> <span class="token number">1</span> <span class="token function">bash</span> <span class="token parameter variable">-c</span> <span class="token string">&#39;echo &gt; /dev/tcp/example.com/80&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;open&quot;</span></span>
<span class="line"></span></code></pre></div><h2 id="远程连接" tabindex="-1"><a class="header-anchor" href="#远程连接"><span>远程连接</span></a></h2><h3 id="ssh-—-远程登录" tabindex="-1"><a class="header-anchor" href="#ssh-—-远程登录"><span>SSH — 远程登录</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 基本登录</span></span>
<span class="line"><span class="token function">ssh</span> user@hostname</span>
<span class="line"><span class="token function">ssh</span> user@192.168.1.100</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定端口</span></span>
<span class="line"><span class="token function">ssh</span> <span class="token parameter variable">-p</span> <span class="token number">2222</span> user@hostname</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 密钥登录</span></span>
<span class="line">ssh-keygen <span class="token parameter variable">-t</span> ed25519          <span class="token comment"># 生成密钥对</span></span>
<span class="line">ssh-copy-id user@hostname       <span class="token comment"># 复制公钥到服务器</span></span>
<span class="line"><span class="token function">ssh</span> user@hostname               <span class="token comment"># 此后无需密码</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置文件 ~/.ssh/config</span></span>
<span class="line"><span class="token comment"># Host myserver</span></span>
<span class="line"><span class="token comment">#     HostName 192.168.1.100</span></span>
<span class="line"><span class="token comment">#     User myuser</span></span>
<span class="line"><span class="token comment">#     Port 2222</span></span>
<span class="line"><span class="token comment">#     IdentityFile ~/.ssh/mykey</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="scp-—-安全复制" tabindex="-1"><a class="header-anchor" href="#scp-—-安全复制"><span>SCP — 安全复制</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 上传文件</span></span>
<span class="line"><span class="token function">scp</span> file.txt user@hostname:/path/to/destination/</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 下载文件</span></span>
<span class="line"><span class="token function">scp</span> user@hostname:/path/to/file.txt ./</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 递归目录</span></span>
<span class="line"><span class="token function">scp</span> <span class="token parameter variable">-r</span> project/ user@hostname:~</span>
<span class="line"></span></code></pre></div><h3 id="rsync-—-增量同步" tabindex="-1"><a class="header-anchor" href="#rsync-—-增量同步"><span>rsync — 增量同步</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">rsync</span> <span class="token parameter variable">-avz</span> source/ user@hostname:/destination/</span>
<span class="line"><span class="token comment"># -a 归档模式，-v 详细，-z 压缩传输</span></span>
<span class="line"></span></code></pre></div><h2 id="网络诊断" tabindex="-1"><a class="header-anchor" href="#网络诊断"><span>网络诊断</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 路由追踪</span></span>
<span class="line"><span class="token function">traceroute</span> google.com</span>
<span class="line"><span class="token function">traceroute</span> <span class="token parameter variable">-n</span> google.com       <span class="token comment"># 跳过 DNS 解析</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># DNS 查询</span></span>
<span class="line"><span class="token function">host</span> google.com</span>
<span class="line"><span class="token function">nslookup</span> google.com</span>
<span class="line"><span class="token function">dig</span> google.com</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看 DNS 配置</span></span>
<span class="line"><span class="token function">cat</span> /etc/resolv.conf</span>
<span class="line"></span></code></pre></div><h2 id="本章小结" tabindex="-1"><a class="header-anchor" href="#本章小结"><span>本章小结</span></a></h2><table><thead><tr><th>命令</th><th>用途</th><th>常用场景</th></tr></thead><tbody><tr><td><code>curl</code></td><td>HTTP 请求</td><td>API 调试、下载</td></tr><tr><td><code>wget</code></td><td>文件下载</td><td>下载大文件、镜像</td></tr><tr><td><code>ssh</code></td><td>远程登录</td><td>服务器管理</td></tr><tr><td><code>scp</code></td><td>远程复制</td><td>文件传输</td></tr><tr><td><code>netstat</code>/<code>ss</code></td><td>端口查看</td><td>排查端口占用</td></tr><tr><td><code>ping</code></td><td>连通性测试</td><td>网络是否可达</td></tr><tr><td><code>dig</code>/<code>host</code></td><td>DNS 查询</td><td>域名解析排查</td></tr></tbody></table><h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习"><span>练习</span></a></h2><ol><li>用 <code>curl -I</code> 查看一个网站的响应头</li><li>用 <code>ping -c 4</code> 测试到 <code>google.com</code> 的延迟</li><li>用 <code>netstat -tlnp</code> 查看本机哪些端口在监听</li><li>生成 SSH 密钥对，添加到 GitHub，测试免密登录</li><li>用 <code>scp</code> 将本地文件传输到远程服务器</li></ol>`,27)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};