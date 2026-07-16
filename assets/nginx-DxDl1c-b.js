import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/linux-tutor/linux-tool/nginx.html","title":"Nginx 配置参考","lang":"zh-CN","frontmatter":{"description":"Nginx 配置参考 Nginx 是一个高性能的 HTTP 和反向代理服务器，广泛应用于负载均衡、静态资源服务、API 网关等场景。 Nginx 命令行 Linux 系统 Windows 系统 Nginx 管理脚本（init.d 风格） Nginx 健康检查脚本（配合 Keepalived） Nginx 前端配置示例 常用配置场景 静态资源服务 反向代...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Nginx 配置参考\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/linux-tool/nginx.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Nginx 配置参考"}],["meta",{"property":"og:description","content":"Nginx 配置参考 Nginx 是一个高性能的 HTTP 和反向代理服务器，广泛应用于负载均衡、静态资源服务、API 网关等场景。 Nginx 命令行 Linux 系统 Windows 系统 Nginx 管理脚本（init.d 风格） Nginx 健康检查脚本（配合 Keepalived） Nginx 前端配置示例 常用配置场景 静态资源服务 反向代..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1784119030000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.11,"words":633},"filePathRelative":"linux-tutor/linux-tool/nginx.md","autoDesc":true}`),a={name:`nginx.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="nginx-配置参考" tabindex="-1"><a class="header-anchor" href="#nginx-配置参考"><span>Nginx 配置参考</span></a></h1><blockquote><p>Nginx 是一个高性能的 HTTP 和反向代理服务器，广泛应用于负载均衡、静态资源服务、API 网关等场景。</p></blockquote><h2 id="nginx-命令行" tabindex="-1"><a class="header-anchor" href="#nginx-命令行"><span>Nginx 命令行</span></a></h2><h3 id="linux-系统" tabindex="-1"><a class="header-anchor" href="#linux-系统"><span>Linux 系统</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 启动 Nginx</span></span>
<span class="line"><span class="token function">sudo</span> systemctl start nginx</span>
<span class="line"><span class="token comment"># 或</span></span>
<span class="line"><span class="token function">sudo</span> /usr/local/nginx/sbin/nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 停止 Nginx</span></span>
<span class="line"><span class="token function">sudo</span> systemctl stop nginx</span>
<span class="line"><span class="token comment"># 或</span></span>
<span class="line"><span class="token function">sudo</span> /usr/local/nginx/sbin/nginx <span class="token parameter variable">-s</span> stop</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重新加载配置（不中断服务）</span></span>
<span class="line"><span class="token function">sudo</span> systemctl reload nginx</span>
<span class="line"><span class="token comment"># 或</span></span>
<span class="line"><span class="token function">sudo</span> /usr/local/nginx/sbin/nginx <span class="token parameter variable">-s</span> reload</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 测试配置是否正确</span></span>
<span class="line"><span class="token function">sudo</span> /usr/local/nginx/sbin/nginx <span class="token parameter variable">-t</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看版本</span></span>
<span class="line"><span class="token function">sudo</span> /usr/local/nginx/sbin/nginx <span class="token parameter variable">-V</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="windows-系统" tabindex="-1"><a class="header-anchor" href="#windows-系统"><span>Windows 系统</span></a></h3><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token comment"># 启动 Nginx（推荐使用 start 命令，以便后续关闭）</span></span>
<span class="line"><span class="token function">start</span> nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重新加载配置</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token operator">/</span>nginx<span class="token punctuation">.</span>exe <span class="token operator">-</span>s reload</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 停止 Nginx</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token operator">/</span>nginx<span class="token punctuation">.</span>exe <span class="token operator">-</span>s stop</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 测试配置</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token operator">/</span>nginx<span class="token punctuation">.</span>exe <span class="token operator">-</span>t</span>
<span class="line"></span></code></pre></div><h2 id="nginx-管理脚本-init-d-风格" tabindex="-1"><a class="header-anchor" href="#nginx-管理脚本-init-d-风格"><span>Nginx 管理脚本（init.d 风格）</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># nginx 执行程序路径（根据实际安装路径修改）</span></span>
<span class="line"><span class="token assign-left variable">nginxd</span><span class="token operator">=</span>/usr/local/nginx/sbin/nginx</span>
<span class="line"><span class="token comment"># nginx 配置文件路径</span></span>
<span class="line"><span class="token assign-left variable">nginx_config</span><span class="token operator">=</span>/usr/local/nginx/conf/nginx.conf</span>
<span class="line"><span class="token comment"># pid 文件路径</span></span>
<span class="line"><span class="token assign-left variable">nginx_pid</span><span class="token operator">=</span>/var/local/nginx/nginx.pid</span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token number">0</span></span>
<span class="line"><span class="token assign-left variable">prog</span><span class="token operator">=</span><span class="token string">&quot;nginx&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Source function library.</span></span>
<span class="line"><span class="token builtin class-name">.</span> /etc/rc.d/init.d/functions</span>
<span class="line"><span class="token comment"># Source networking configuration.</span></span>
<span class="line"><span class="token builtin class-name">.</span> /etc/sysconfig/network</span>
<span class="line"><span class="token comment"># Check that networking is up.</span></span>
<span class="line"><span class="token punctuation">[</span> <span class="token variable">\${NETWORKING}</span> <span class="token operator">=</span> <span class="token string">&quot;no&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">exit</span> <span class="token number">0</span></span>
<span class="line"><span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token variable">$nginxd</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">exit</span> <span class="token number">0</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Start nginx daemons functions.</span></span>
<span class="line"><span class="token function-name function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-e</span> <span class="token variable">$nginx_pid</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span></span>
<span class="line">       <span class="token builtin class-name">echo</span> <span class="token string">&quot;nginx already running....&quot;</span></span>
<span class="line">       <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> $<span class="token string">&quot;Starting <span class="token variable">$prog</span>: &quot;</span></span>
<span class="line">    daemon <span class="token variable">$nginxd</span> <span class="token parameter variable">-c</span> <span class="token variable">\${nginx_config}</span></span>
<span class="line">    <span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token variable">$?</span></span>
<span class="line">    <span class="token builtin class-name">echo</span></span>
<span class="line">    <span class="token punctuation">[</span> <span class="token variable">$RETVAL</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token function">touch</span> /var/lock/subsys/nginx</span>
<span class="line">    <span class="token builtin class-name">return</span> <span class="token variable">$RETVAL</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Stop nginx daemons functions.</span></span>
<span class="line"><span class="token function-name function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> $<span class="token string">&quot;Stopping <span class="token variable">$prog</span>: &quot;</span></span>
<span class="line">    killproc <span class="token variable">$nginxd</span></span>
<span class="line">    <span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token variable">$?</span></span>
<span class="line">    <span class="token builtin class-name">echo</span></span>
<span class="line">    <span class="token punctuation">[</span> <span class="token variable">$RETVAL</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> /var/lock/subsys/nginx /var/local/nginx/nginx.pid</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># reload nginx service functions.</span></span>
<span class="line"><span class="token function-name function">reload</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> $<span class="token string">&quot;Reloading <span class="token variable">$prog</span>: &quot;</span></span>
<span class="line">    killproc <span class="token variable">$nginxd</span> <span class="token parameter variable">-HUP</span></span>
<span class="line">    <span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token variable">$?</span></span>
<span class="line">    <span class="token builtin class-name">echo</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span></span>
<span class="line">    start<span class="token punctuation">)</span>   start <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    stop<span class="token punctuation">)</span>    stop <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    reload<span class="token punctuation">)</span>  reload <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    restart<span class="token punctuation">)</span> stop<span class="token punctuation">;</span> start <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    status<span class="token punctuation">)</span>  status <span class="token variable">$prog</span><span class="token punctuation">;</span> <span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token variable">$?</span> <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    *<span class="token punctuation">)</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> $<span class="token string">&quot;Usage: <span class="token variable">$prog</span> {start|stop|restart|reload|status|help}&quot;</span></span>
<span class="line">        <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line">        <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">esac</span></span>
<span class="line"><span class="token builtin class-name">exit</span> <span class="token variable">$RETVAL</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx-健康检查脚本-配合-keepalived" tabindex="-1"><a class="header-anchor" href="#nginx-健康检查脚本-配合-keepalived"><span>Nginx 健康检查脚本（配合 Keepalived）</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># 如果进程中没有 nginx 则将 keepalived 进程杀掉</span></span>
<span class="line"><span class="token assign-left variable">A</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> <span class="token parameter variable">-C</span> nginx --no-header <span class="token operator">|</span><span class="token function">wc</span> <span class="token parameter variable">-l</span><span class="token variable">\`</span></span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$A</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token function">service</span> keepalived stop</span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span></code></pre></div><h2 id="nginx-前端配置示例" tabindex="-1"><a class="header-anchor" href="#nginx-前端配置示例"><span>Nginx 前端配置示例</span></a></h2><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">user</span> root</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token directive"><span class="token keyword">worker_processes</span>  auto</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token directive"><span class="token keyword">pid</span> /run/nginx.pid</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">use</span> epoll</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">multi_accept</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment"># 必须加这两个，不然 CSS 无法正常加载</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">include</span> mime.types</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">default_type</span> application/octet-stream</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">sendfile</span>            <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">tcp_nopush</span>          <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">tcp_nodelay</span>         <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">keepalive_timeout</span>   <span class="token number">65</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">types_hash_max_size</span> <span class="token number">2048</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">log_format</span>  main  <span class="token string">&#39;<span class="token variable">$remote_addr</span> - <span class="token variable">$remote_user</span> [<span class="token variable">$time_local]</span> &quot;<span class="token variable">$request</span>&quot; &#39;</span></span>
<span class="line">                      <span class="token string">&#39;<span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> &quot;<span class="token variable">$http_referer</span>&quot; &#39;</span></span>
<span class="line">                      <span class="token string">&#39;&quot;<span class="token variable">$http_user_agent</span>&quot; &quot;<span class="token variable">$http_x_forwarded_for</span>&quot; &quot;<span class="token variable">$request_time</span>&quot;&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">access_log</span> /var/log/nginx/access.log main</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">error_log</span> /var/log/nginx/error.log</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">gzip</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">gzip_buffers</span> <span class="token number">8</span> <span class="token number">16k</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">gzip_min_length</span> <span class="token number">512</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">gzip_disable</span> <span class="token string">&quot;MSIE [1-6]\\.(?!.*SV1)&quot;</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">gzip_http_version</span> 1.1</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">gzip_types</span>   text/plain text/css application/javascript application/x-javascript application/json application/xml</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">8001</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server_name</span>  localhost 127.0.0.1 example.com</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">root</span> /var/www/html/dist</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">index</span> index.html index.htm</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> /index.html</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> ^~ /api/</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:8080</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_redirect</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> ~ .*\\.(js|css)?$</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">root</span> /var/www/html/dist</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> ~ .*\\.(gif|jpg|jpeg|png|bmp|swf|ico|woff|woff2|ttf|eot|txt|svg)$</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">root</span> /var/www/html/dist</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token directive"><span class="token keyword">error_page</span> <span class="token number">404</span> /404.html</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">error_page</span> <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span> /50x.html</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用配置场景" tabindex="-1"><a class="header-anchor" href="#常用配置场景"><span>常用配置场景</span></a></h2><h3 id="静态资源服务" tabindex="-1"><a class="header-anchor" href="#静态资源服务"><span>静态资源服务</span></a></h3><div class="language-nginx" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server_name</span> example.com</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">root</span> /var/www/html</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">index</span> index.html</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ =404</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理"><span>反向代理</span></a></h3><div class="language-nginx" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server_name</span> api.example.com</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:8080</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡"><span>负载均衡</span></a></h3><div class="language-nginx" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">upstream</span> backend</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server</span> 192.168.1.10:8080 weight=3</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server</span> 192.168.1.11:8080 weight=2</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server</span> 192.168.1.12:8080 backup</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_pass</span> http://backend</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><ul><li><a href="http://nginx.org/en/docs/" target="_blank" rel="noopener noreferrer">Nginx 官方文档</a></li><li><a href="https://nginxconfig.io/" target="_blank" rel="noopener noreferrer">Nginx 配置生成器</a></li></ul>`,22)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};