import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/windows-tutor/powershell/basics/10-network.html","title":"网络相关","lang":"zh-CN","frontmatter":{"order":10,"description":"网络相关 PowerShell 提供了比传统 CMD 更强大的网络命令集，支持对象化输出和管道处理。 传统命令（仍可用） PowerShell 原生命令 Get-NetTCPConnection 查看 TCP 连接状态，替代 netstat -ano。 Get-NetIPAddress 查看 IP 地址配置，替代 ipconfig。 Get-NetAd...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"网络相关\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/powershell/basics/10-network.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"网络相关"}],["meta",{"property":"og:description","content":"网络相关 PowerShell 提供了比传统 CMD 更强大的网络命令集，支持对象化输出和管道处理。 传统命令（仍可用） PowerShell 原生命令 Get-NetTCPConnection 查看 TCP 连接状态，替代 netstat -ano。 Get-NetIPAddress 查看 IP 地址配置，替代 ipconfig。 Get-NetAd..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784131245000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.43,"words":429},"filePathRelative":"windows-tutor/powershell/basics/10-network.md","autoDesc":true}`),a={name:`10-network.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="网络相关" tabindex="-1"><a class="header-anchor" href="#网络相关"><span>网络相关</span></a></h1><p>PowerShell 提供了比传统 CMD 更强大的网络命令集，支持对象化输出和管道处理。</p><h2 id="传统命令-仍可用" tabindex="-1"><a class="header-anchor" href="#传统命令-仍可用"><span>传统命令（仍可用）</span></a></h2><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">ping www<span class="token punctuation">.</span>baidu<span class="token punctuation">.</span>com</span>
<span class="line">telnet 192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>1<span class="token punctuation">.</span>1 80</span>
<span class="line">nslookup www<span class="token punctuation">.</span>baidu<span class="token punctuation">.</span>com</span>
<span class="line">netsh interface ip show config</span>
<span class="line"></span></code></pre></div><h2 id="powershell-原生命令" tabindex="-1"><a class="header-anchor" href="#powershell-原生命令"><span>PowerShell 原生命令</span></a></h2><h3 id="get-nettcpconnection" tabindex="-1"><a class="header-anchor" href="#get-nettcpconnection"><span>Get-NetTCPConnection</span></a></h3><p>查看 TCP 连接状态，替代 <code>netstat -ano</code>。</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token comment"># 查看所有 TCP 连接</span></span>
<span class="line"><span class="token function">Get-NetTCPConnection</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 仅查看已建立的连接</span></span>
<span class="line"><span class="token function">Get-NetTCPConnection</span> <span class="token operator">-</span>State Established</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看特定端口的占用进程</span></span>
<span class="line"><span class="token function">Get-Process</span> <span class="token operator">-</span>Id <span class="token punctuation">(</span><span class="token function">Get-NetTCPConnection</span> <span class="token operator">-</span>LocalPort 5000<span class="token punctuation">)</span><span class="token punctuation">.</span>OwningProcess</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看特定状态的所有连接（如监听中的端口）</span></span>
<span class="line"><span class="token function">Get-NetTCPConnection</span> <span class="token operator">-</span>State Listen</span>
<span class="line"></span></code></pre></div><h3 id="get-netipaddress" tabindex="-1"><a class="header-anchor" href="#get-netipaddress"><span>Get-NetIPAddress</span></a></h3><p>查看 IP 地址配置，替代 <code>ipconfig</code>。</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token function">Get-NetIPAddress</span> <span class="token punctuation">|</span> <span class="token function">Format-Table</span> InterfaceAlias<span class="token punctuation">,</span> IPAddress<span class="token punctuation">,</span> PrefixLength<span class="token punctuation">,</span> AddressFamily</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 仅查看 IPv4 地址</span></span>
<span class="line"><span class="token function">Get-NetIPAddress</span> <span class="token operator">-</span>AddressFamily IPv4</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看特定网卡</span></span>
<span class="line"><span class="token function">Get-NetIPAddress</span> <span class="token operator">-</span>InterfaceAlias <span class="token string">&quot;以太网*&quot;</span></span>
<span class="line"></span></code></pre></div><h3 id="get-netadapter" tabindex="-1"><a class="header-anchor" href="#get-netadapter"><span>Get-NetAdapter</span></a></h3><p>查看网卡信息。</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token comment"># 查看所有网卡</span></span>
<span class="line"><span class="token function">Get-NetAdapter</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看已启用的网卡</span></span>
<span class="line"><span class="token function">Get-NetAdapter</span> <span class="token punctuation">|</span> <span class="token function">Where-Object</span> Status <span class="token operator">-eq</span> <span class="token string">&quot;Up&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看网卡详细信息</span></span>
<span class="line"><span class="token function">Get-NetAdapter</span> <span class="token operator">-</span>Name <span class="token string">&quot;以太网*&quot;</span> <span class="token punctuation">|</span> <span class="token function">Get-NetAdapterHardwareInfo</span></span>
<span class="line"></span></code></pre></div><h3 id="get-netipconfiguration" tabindex="-1"><a class="header-anchor" href="#get-netipconfiguration"><span>Get-NetIPConfiguration</span></a></h3><p>查看完整的 IP 配置信息。</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token comment"># 查看所有网卡的 IP 配置</span></span>
<span class="line"><span class="token function">Get-NetIPConfiguration</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看特定网卡配置</span></span>
<span class="line"><span class="token function">Get-NetIPConfiguration</span> <span class="token operator">-</span>InterfaceAlias <span class="token string">&quot;WLAN&quot;</span></span>
<span class="line"></span></code></pre></div><h3 id="test-netconnection" tabindex="-1"><a class="header-anchor" href="#test-netconnection"><span>Test-NetConnection</span></a></h3><p>全能网络诊断工具，替代 <code>ping</code> + <code>telnet</code> + <code>tracert</code>。</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token comment"># 测试连通性（类似 ping）</span></span>
<span class="line"><span class="token function">Test-NetConnection</span> www<span class="token punctuation">.</span>baidu<span class="token punctuation">.</span>com</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 测试端口连通性（替代 telnet）</span></span>
<span class="line"><span class="token function">Test-NetConnection</span> www<span class="token punctuation">.</span>baidu<span class="token punctuation">.</span>com <span class="token operator">-</span>Port 443</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 跟踪路由</span></span>
<span class="line"><span class="token function">Test-NetConnection</span> www<span class="token punctuation">.</span>baidu<span class="token punctuation">.</span>com <span class="token operator">-</span>TraceRoute</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用诊断级别</span></span>
<span class="line"><span class="token function">Test-NetConnection</span> www<span class="token punctuation">.</span>baidu<span class="token punctuation">.</span>com <span class="token operator">-</span>InformationLevel Detailed</span>
<span class="line"></span></code></pre></div><h3 id="resolve-dnsname" tabindex="-1"><a class="header-anchor" href="#resolve-dnsname"><span>Resolve-DnsName</span></a></h3><p>DNS 查询，替代 <code>nslookup</code>。</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token comment"># 基本查询</span></span>
<span class="line"><span class="token function">Resolve-DnsName</span> www<span class="token punctuation">.</span>baidu<span class="token punctuation">.</span>com</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询 MX 记录</span></span>
<span class="line"><span class="token function">Resolve-DnsName</span> baidu<span class="token punctuation">.</span>com <span class="token operator">-</span><span class="token function">Type</span> MX</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查询所有记录</span></span>
<span class="line"><span class="token function">Resolve-DnsName</span> baidu<span class="token punctuation">.</span>com <span class="token operator">-</span><span class="token function">Type</span> ANY</span>
<span class="line"></span></code></pre></div><h3 id="其他网络命令" tabindex="-1"><a class="header-anchor" href="#其他网络命令"><span>其他网络命令</span></a></h3><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token comment"># 清除 DNS 缓存（替代 ipconfig /flushdns）</span></span>
<span class="line"><span class="token function">Clear-DnsClientCache</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取路由表</span></span>
<span class="line"><span class="token function">Get-NetRoute</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看网络邻居</span></span>
<span class="line"><span class="token function">Get-NetNeighbor</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启网卡</span></span>
<span class="line"><span class="token function">Restart-NetAdapter</span> <span class="token operator">-</span>Name <span class="token string">&quot;以太网&quot;</span> <span class="token operator">-</span>Confirm:<span class="token boolean">$false</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 禁用/启用网卡</span></span>
<span class="line"><span class="token function">Disable-NetAdapter</span> <span class="token operator">-</span>Name <span class="token string">&quot;以太网&quot;</span> <span class="token operator">-</span>Confirm:<span class="token boolean">$false</span></span>
<span class="line"><span class="token function">Enable-NetAdapter</span> <span class="token operator">-</span>Name <span class="token string">&quot;以太网&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};