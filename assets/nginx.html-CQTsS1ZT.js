import{_ as s,c as a,a as e,o as l}from"./app-B6vXTniy.js";const i={};function p(c,n){return l(),a("div",null,[...n[0]||(n[0]=[e(`<h1 id="nginx配置" tabindex="-1"><a class="header-anchor" href="#nginx配置"><span>nginx配置</span></a></h1><h2 id="nginx命令行" tabindex="-1"><a class="header-anchor" href="#nginx命令行"><span>nginx命令行</span></a></h2><h3 id="windows使用" tabindex="-1"><a class="header-anchor" href="#windows使用"><span>windows使用</span></a></h3><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token comment">#启动nginx,不要./nginx.exe,这样会无法关闭</span></span>
<span class="line"><span class="token function">start</span> nginx</span>
<span class="line"><span class="token comment"># 重载nginx</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token operator">/</span>nginx<span class="token punctuation">.</span>exe <span class="token operator">-</span>s reload</span>
<span class="line"></span>
<span class="line"><span class="token comment">#停止nginx</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token operator">/</span>nginx<span class="token punctuation">.</span>exe <span class="token operator">-</span>s stop</span>
<span class="line"></span></code></pre></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">#nginx执行程序路径需要修改</span></span>
<span class="line"><span class="token assign-left variable">nginxd</span><span class="token operator">=</span>/usr/local/nginx/sbin/nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># nginx配置文件路径需要修改</span></span>
<span class="line"><span class="token assign-left variable">nginx_config</span><span class="token operator">=</span>/usr/local/nginx/conf/nginx.conf</span>
<span class="line"></span>
<span class="line"><span class="token comment"># pid 地址需要修改</span></span>
<span class="line"><span class="token assign-left variable">nginx_pid</span><span class="token operator">=</span>/var/local/nginx/nginx.pid</span>
<span class="line"></span>
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
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-e</span> <span class="token variable">$nginx_pid</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span></span>
<span class="line">   <span class="token builtin class-name">echo</span> <span class="token string">&quot;nginx already running....&quot;</span></span>
<span class="line">   <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> $<span class="token string">&quot;Starting <span class="token variable">$prog</span>: &quot;</span></span>
<span class="line">daemon <span class="token variable">$nginxd</span> <span class="token parameter variable">-c</span> <span class="token variable">\${nginx_config}</span></span>
<span class="line"><span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token variable">$?</span></span>
<span class="line"><span class="token builtin class-name">echo</span></span>
<span class="line"><span class="token punctuation">[</span> <span class="token variable">$RETVAL</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token function">touch</span> /var/lock/subsys/nginx</span>
<span class="line"><span class="token builtin class-name">return</span> <span class="token variable">$RETVAL</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Stop nginx daemons functions.</span></span>
<span class="line"><span class="token comment"># pid 地址需要修改</span></span>
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
<span class="line">    <span class="token comment">#kill -HUP \`cat \${nginx_pid}\`</span></span>
<span class="line">    killproc <span class="token variable">$nginxd</span> <span class="token parameter variable">-HUP</span></span>
<span class="line">    <span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token variable">$?</span></span>
<span class="line">    <span class="token builtin class-name">echo</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># See how we were called.</span></span>
<span class="line"><span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span></span>
<span class="line">    start<span class="token punctuation">)</span></span>
<span class="line">        start</span>
<span class="line">        <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    stop<span class="token punctuation">)</span></span>
<span class="line">        stop</span>
<span class="line">        <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    reload<span class="token punctuation">)</span></span>
<span class="line">        reload</span>
<span class="line">        <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    restart<span class="token punctuation">)</span></span>
<span class="line">        stop</span>
<span class="line">        start</span>
<span class="line">        <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    status<span class="token punctuation">)</span></span>
<span class="line">        status <span class="token variable">$prog</span></span>
<span class="line">        <span class="token assign-left variable">RETVAL</span><span class="token operator">=</span><span class="token variable">$?</span></span>
<span class="line">        <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    *<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> $<span class="token string">&quot;Usage: <span class="token variable">$prog</span> {start|stop|restart|reload|status|help}&quot;</span></span>
<span class="line">    <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">esac</span></span>
<span class="line"><span class="token builtin class-name">exit</span> <span class="token variable">$RETVAL</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检测nginx" tabindex="-1"><a class="header-anchor" href="#检测nginx"><span>检测nginx</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># 如果进程中没有nginx则将keepalived进程kill掉</span></span>
<span class="line"><span class="token assign-left variable">A</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> <span class="token parameter variable">-C</span> nginx --no-header <span class="token operator">|</span><span class="token function">wc</span> <span class="token parameter variable">-l</span><span class="token variable">\`</span></span>      <span class="token comment">## 查看是否有 nginx进程 把值赋给变量A </span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$A</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>                    <span class="token comment">## 如果没有进程值得为 零</span></span>
<span class="line">       <span class="token function">service</span> keepalived stop          <span class="token comment">## 则结束 keepalived 进程</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span></code></pre></div><h2 id="nginx-配置" tabindex="-1"><a class="header-anchor" href="#nginx-配置"><span>nginx 配置</span></a></h2><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf"><pre><code class="language-conf"><span class="line">user root;</span>
<span class="line">worker_processes  auto;</span>
<span class="line">pid /run/nginx.pid;</span>
<span class="line"></span>
<span class="line">events {</span>
<span class="line">    use epoll;</span>
<span class="line">    multi_accept on;</span>
<span class="line">    worker_connections  1024;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">http {</span>
<span class="line">    # 必须加这两个，不然 CSS 无法正常加载</span>
<span class="line">    include mime.types;</span>
<span class="line">    default_type application/octet-stream;</span>
<span class="line"></span>
<span class="line">    sendfile            on;</span>
<span class="line">    tcp_nopush          on;</span>
<span class="line">    tcp_nodelay         on;</span>
<span class="line">    keepalive_timeout   65;</span>
<span class="line">    types_hash_max_size 2048;</span>
<span class="line"></span>
<span class="line">    log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
<span class="line">                      &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
<span class="line">                      &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot; &quot;$request_time&quot;&#39;;</span>
<span class="line"></span>
<span class="line">    access_log /var/log/nginx/access.log main;</span>
<span class="line">    error_log /var/log/nginx/error.log;</span>
<span class="line"></span>
<span class="line">    gzip on;</span>
<span class="line">    gzip_buffers 8 16k;</span>
<span class="line">    gzip_min_length 512;</span>
<span class="line">    gzip_disable &quot;MSIE [1-6]\\.(?!.*SV1)&quot;;</span>
<span class="line">    gzip_http_version 1.1;</span>
<span class="line">    gzip_types   text/plain text/css application/javascript application/x-javascript application/json application/xml;</span>
<span class="line"></span>
<span class="line">    server {</span>
<span class="line"></span>
<span class="line">        listen       8001;</span>
<span class="line">        server_name  localhost 127.0.0.1 139.159.190.24 platform.gitnavi.com;</span>
<span class="line"></span>
<span class="line">        location / {</span>
<span class="line">            root /root/.jenkins/workspace/nestle-platform-front-test/dist;</span>
<span class="line">            index index.html index.htm;</span>
<span class="line">            try_files $uri /index.html;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        ## 二级目录方式，记得 package.json 添加：&quot;homepage&quot;: &quot;cdk8s-markdown&quot;,</span>
<span class="line">        location ^~ /cdk8s-markdown {</span>
<span class="line">            root    /root/.jenkins/workspace;</span>
<span class="line">            index   index.html;</span>
<span class="line">            try_files $uri /cdk8s-markdown/index.html;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        location ^~ /platform/ {</span>
<span class="line">            proxy_pass http://127.0.0.1:28081;</span>
<span class="line">            proxy_redirect off;</span>
<span class="line">            proxy_set_header Host $host;</span>
<span class="line">            proxy_set_header X-Real-IP $remote_addr;</span>
<span class="line">            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        location ~ .*\\.(js|css)?$ {</span>
<span class="line">            root   /root/.jenkins/workspace/nestle-platform-front-test/dist;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf|ico|woff|woff2|ttf|eot|txt|svg)$ {</span>
<span class="line">            root   /root/.jenkins/workspace/nestle-platform-front-test/dist;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        error_page 404 /404.html;</span>
<span class="line">           location = /usr/share/nginx/html/40x.html {</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        error_page 500 502 503 504 /50x.html;</span>
<span class="line">           location = /usr/share/nginx/html/50x.html {</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    server {</span>
<span class="line"></span>
<span class="line">        listen       8002;</span>
<span class="line">        server_name  localhost 127.0.0.1 139.159.190.24 store.gitnavi.com;</span>
<span class="line"></span>
<span class="line">        location / {</span>
<span class="line">            root /root/.jenkins/workspace/nestle-store-front-test/dist;</span>
<span class="line">            index index.html index.htm;</span>
<span class="line">            try_files $uri /index.html;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        location ^~ /store/ {</span>
<span class="line">            proxy_pass http://127.0.0.1:28082;</span>
<span class="line">            proxy_redirect off;</span>
<span class="line">            proxy_set_header Host $host;</span>
<span class="line">            proxy_set_header X-Real-IP $remote_addr;</span>
<span class="line">            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        location ~ .*\\.(js|css)?$ {</span>
<span class="line">            root   /root/.jenkins/workspace/nestle-store-front-test/dist;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf|ico|woff|woff2|ttf|eot|txt|svg)$ {</span>
<span class="line">            root   /root/.jenkins/workspace/nestle-store-front-test/dist;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        error_page 404 /404.html;</span>
<span class="line">           location = /usr/share/nginx/html/40x.html {</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        error_page 500 502 503 504 /50x.html;</span>
<span class="line">           location = /usr/share/nginx/html/50x.html {</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9)])])}const o=s(i,[["render",p]]),r=JSON.parse('{"path":"/linux-tutor/configs/nginx.html","title":"nginx配置","lang":"zh-CN","frontmatter":{"description":"nginx配置 nginx命令行 windows使用 检测nginx nginx 配置","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nginx配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-19T03:14:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/configs/nginx.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"nginx配置"}],["meta",{"property":"og:description","content":"nginx配置 nginx命令行 windows使用 检测nginx nginx 配置"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-19T03:14:18.000Z"}],["meta",{"property":"article:modified_time","content":"2023-11-19T03:14:18.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1700363658000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.19,"words":57},"filePathRelative":"linux-tutor/configs/nginx.md","autoDesc":true}');export{o as comp,r as data};
