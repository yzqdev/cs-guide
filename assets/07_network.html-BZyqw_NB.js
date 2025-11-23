import{_ as s,c as n,a as t,o as a}from"./app-B6vXTniy.js";const p={};function i(l,e){return a(),n("div",null,[...e[0]||(e[0]=[t(`<h1 id="网络工具" tabindex="-1"><a class="header-anchor" href="#网络工具"><span>网络工具</span></a></h1><h2 id="查询网络服务和端口" tabindex="-1"><a class="header-anchor" href="#查询网络服务和端口"><span>查询网络服务和端口</span></a></h2><p>netstat 命令用于显示各种网络相关信息，如网络连接，路由表，接口状态 (Interface Statistics)，masquerade 连接，多播成员 (Multicast Memberships) 等等。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">列出所有端口 (包括监听和未监听的):</span>
<span class="line"></span>
<span class="line">    netstat -a</span>
<span class="line"></span>
<span class="line">列出所有 tcp 端口:</span>
<span class="line"></span>
<span class="line">    netstat -at</span>
<span class="line"></span>
<span class="line">列出所有有监听的服务状态:</span>
<span class="line"></span>
<span class="line">    netstat -l</span>
<span class="line"></span>
<span class="line">使用netstat工具查询端口:</span>
<span class="line"></span>
<span class="line">    netstat -antp | grep 6379</span>
<span class="line">    tcp        0      0 127.0.0.1:6379          0.0.0.0:*               LISTEN      25501/redis-server</span>
<span class="line"></span>
<span class="line">    ps 25501</span>
<span class="line">      PID TTY      STAT   TIME COMMAND</span>
<span class="line">    25501 ?        Ssl   28:21 ./redis-server ./redis.conf</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>lsof（list open files）是一个列出当前系统打开文件的工具。在linux环境下，任何事物都以文件的形式存在，通过文件不仅仅可以访问常规数据，还可以访问网络连接和硬件。所以如传输控制协议 (TCP) 和用户数据报协议 (UDP) 套接字等； 在查询网络端口时，经常会用到这个工具。</p><p>查询7902端口现在运行什么程序:</p><pre><code>#分为两步
#第一步，查询使用该端口的进程的PID；
lsof -i:7902
COMMAND   PID   USER   FD   TYPE    DEVICE SIZE NODE NAME
WSL     30294 tuapp    4u  IPv4 447684086       TCP 10.6.50.37:tnos-dp (LISTEN)

#查到30294
#使用ps工具查询进程详情：
ps -fe | grep 30294
tdev5  30294 26160  0 Sep10 ?        01:10:50 tdesl -k 43476
root     22781 22698  0 00:54 pts/20   00:00:00 grep 11554
</code></pre><div class="hint-container note"><p class="hint-container-title">注</p><p>::: title Note</p></div><p>以上介绍lsof关于网络方面的应用，这个工具非常强大，需要好好掌握，详见 <code>lsof</code>{.interpreted-text role=&quot;ref&quot;} ; :::</p><h2 id="网络路由" tabindex="-1"><a class="header-anchor" href="#网络路由"><span>网络路由</span></a></h2><p>查看路由状态:</p><pre><code>route -n
</code></pre><p>发送ping包到地址IP:</p><pre><code> ping IP
</code></pre><p>探测前往地址IP的路由路径:</p><pre><code>traceroute IP
</code></pre><p>DNS查询，寻找域名domain对应的IP:</p><pre><code>host domain
</code></pre><p>反向DNS查询:</p><pre><code>host IP
</code></pre><h2 id="镜像下载" tabindex="-1"><a class="header-anchor" href="#镜像下载"><span>镜像下载</span></a></h2><p>直接下载文件或者网页:</p><pre><code>wget url
</code></pre><p>常用选项:</p><ul><li>--limit-rate :下载限速</li><li>-o：指定日志文件；输出都写入日志；</li><li>-c：断点续传</li></ul><h2 id="ftp-sftp-lftp-ssh" tabindex="-1"><a class="header-anchor" href="#ftp-sftp-lftp-ssh"><span>ftp sftp lftp ssh</span></a></h2><p>SSH登录:</p><pre><code>ssh ID@host
</code></pre><p>ssh登录远程服务器host，ID为用户名。</p><p>ftp/sftp文件传输:</p><pre><code>sftp ID@host
</code></pre><p>登录服务器host，ID为用户名。sftp登录后，可以使用下面的命令进一步操作：</p><ul><li>get filename # 下载文件</li><li>put filename # 上传文件</li><li>ls # 列出host上当前路径的所有文件</li><li>cd # 在host上更改当前路径</li><li>lls # 列出本地主机上当前路径的所有文件</li><li>lcd # 在本地主机更改当前路径</li></ul><p>lftp同步文件夹(类似rsync工具):</p><pre><code>lftp -u user:pass host
lftp user@host:~&gt; mirror -n
</code></pre><h2 id="网络复制" tabindex="-1"><a class="header-anchor" href="#网络复制"><span>网络复制</span></a></h2><p>将本地localpath指向的文件上传到远程主机的path路径:</p><pre><code>scp localpath ID@host:path
</code></pre><p>以ssh协议，遍历下载path路径下的整个文件系统，到本地的localpath:</p><pre><code>scp -r ID@site:path localpath
</code></pre><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>netstat lsof route ping host wget sftp scp</p>`,42)])])}const c=s(p,[["render",i]]),o=JSON.parse('{"path":"/linux-tutor/base/07_network.html","title":"网络工具","lang":"zh-CN","frontmatter":{"order":7,"description":"网络工具 查询网络服务和端口 netstat 命令用于显示各种网络相关信息，如网络连接，路由表，接口状态 (Interface Statistics)，masquerade 连接，多播成员 (Multicast Memberships) 等等。 lsof（list open files）是一个列出当前系统打开文件的工具。在linux环境下，任何事物都以...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"网络工具\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-22T06:25:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/base/07_network.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"网络工具"}],["meta",{"property":"og:description","content":"网络工具 查询网络服务和端口 netstat 命令用于显示各种网络相关信息，如网络连接，路由表，接口状态 (Interface Statistics)，masquerade 连接，多播成员 (Multicast Memberships) 等等。 lsof（list open files）是一个列出当前系统打开文件的工具。在linux环境下，任何事物都以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-22T06:25:47.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-22T06:25:47.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1684736747000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.28,"words":683},"filePathRelative":"linux-tutor/base/07_network.md","autoDesc":true}');export{c as comp,o as data};
