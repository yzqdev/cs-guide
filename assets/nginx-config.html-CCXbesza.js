import{_ as s,c as a,a as e,o as l}from"./app-B6vXTniy.js";const i={};function p(c,n){return l(),a("div",null,[...n[0]||(n[0]=[e(`<h1 id="nginx使用" tabindex="-1"><a class="header-anchor" href="#nginx使用"><span>nginx使用</span></a></h1><h2 id="windows使用" tabindex="-1"><a class="header-anchor" href="#windows使用"><span>windows使用</span></a></h2><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token comment">#启动nginx,不要./nginx.exe,这样会无法关闭</span></span>
<span class="line"><span class="token function">start</span> nginx</span>
<span class="line"><span class="token comment"># 重载nginx</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token operator">/</span>nginx<span class="token punctuation">.</span>exe <span class="token operator">-</span>s reload</span>
<span class="line"><span class="token comment">#停止nginx</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token operator">/</span>nginx<span class="token punctuation">.</span>exe <span class="token operator">-</span>s stop</span>
<span class="line"></span></code></pre></div><h2 id="linux使用" tabindex="-1"><a class="header-anchor" href="#linux使用"><span>linux使用</span></a></h2><div class="language-java" data-highlighter="prismjs" data-ext="java"><pre><code class="language-java"><span class="line">sudo apt<span class="token operator">-</span>get install nginx</span>
<span class="line"></span></code></pre></div><h2 id="技巧" tabindex="-1"><a class="header-anchor" href="#技巧"><span>技巧</span></a></h2><ul><li><a href="https://blog.csdn.net/qq_41783562/article/details/106530017" target="_blank" rel="noopener noreferrer">主分文件分片</a></li></ul><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sudo</span> systemctl start nginx</span>
<span class="line"></span></code></pre></div><p>注意要把 <code>include conf.d/*.conf;</code> 写在<code>http{}</code>内部</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#user  nobody;</span></span>
<span class="line">worker_processes  <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">#error_log  logs/error.log;</span></span>
<span class="line"><span class="token comment">#error_log  logs/error.log  notice;</span></span>
<span class="line"><span class="token comment">#error_log  logs/error.log  info;</span></span>
<span class="line"><span class="token comment">#pid        logs/nginx.pid;</span></span>
<span class="line">events <span class="token punctuation">{</span></span>
<span class="line">    worker_connections  <span class="token number">1024</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">http <span class="token punctuation">{</span></span>
<span class="line">    include       mime.types<span class="token punctuation">;</span></span>
<span class="line">    default_type  application/octet-stream<span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">#log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line">    <span class="token comment">#                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line">    <span class="token comment">#                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span></span>
<span class="line">    <span class="token comment">#access_log  logs/access.log  main;</span></span>
<span class="line">    sendfile        on<span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">#tcp_nopush     on;</span></span>
<span class="line">    <span class="token comment">#keepalive_timeout  0;</span></span>
<span class="line">    keepalive_timeout  <span class="token number">65</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">#gzip  on;</span></span>
<span class="line">    include conf.d/*.conf<span class="token punctuation">;</span></span>
<span class="line"> </span>
<span class="line">    server <span class="token punctuation">{</span></span>
<span class="line">        listen       <span class="token number">80</span><span class="token punctuation">;</span></span>
<span class="line">        server_name  localhost<span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">#charset koi8-r;</span></span>
<span class="line">        <span class="token comment">#access_log  logs/host.access.log  main;</span></span>
<span class="line">        location / <span class="token punctuation">{</span></span>
<span class="line">            root   html<span class="token punctuation">;</span></span>
<span class="line">            index  index.html index.htm<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token comment">#error_page  404              /404.html;</span></span>
<span class="line">        <span class="token comment"># redirect server error pages to the static page /50x.html</span></span>
<span class="line">        <span class="token comment">#</span></span>
<span class="line">        error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html<span class="token punctuation">;</span></span>
<span class="line">        location <span class="token operator">=</span> /50x.html <span class="token punctuation">{</span></span>
<span class="line">            root   html<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token comment"># proxy the PHP scripts to Apache listening on 127.0.0.1:80</span></span>
<span class="line">        <span class="token comment">#</span></span>
<span class="line">        <span class="token comment">#location ~ \\.php$ {</span></span>
<span class="line">        <span class="token comment">#    proxy_pass   http://127.0.0.1;</span></span>
<span class="line">        <span class="token comment">#}</span></span>
<span class="line">        <span class="token comment"># pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span></span>
<span class="line">        <span class="token comment">#</span></span>
<span class="line">        <span class="token comment">#location ~ \\.php$ {</span></span>
<span class="line">        <span class="token comment">#    root           html;</span></span>
<span class="line">        <span class="token comment">#    fastcgi_pass   127.0.0.1:9000;</span></span>
<span class="line">        <span class="token comment">#    fastcgi_index  index.php;</span></span>
<span class="line">        <span class="token comment">#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span></span>
<span class="line">        <span class="token comment">#    include        fastcgi_params;</span></span>
<span class="line">        <span class="token comment">#}</span></span>
<span class="line">        <span class="token comment"># deny access to .htaccess files, if Apache&#39;s document root</span></span>
<span class="line">        <span class="token comment"># concurs with nginx&#39;s one</span></span>
<span class="line">        <span class="token comment">#</span></span>
<span class="line">        <span class="token comment">#location ~ /\\.ht {</span></span>
<span class="line">        <span class="token comment">#    deny  all;</span></span>
<span class="line">        <span class="token comment">#}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># another virtual host using mix of IP-, name-, and port-based configuration</span></span>
<span class="line">    <span class="token comment">#</span></span>
<span class="line">    <span class="token comment">#server {</span></span>
<span class="line">    <span class="token comment">#    listen       8000;</span></span>
<span class="line">    <span class="token comment">#    listen       somename:8080;</span></span>
<span class="line">    <span class="token comment">#    server_name  somename  alias  another.alias;</span></span>
<span class="line">    <span class="token comment">#    location / {</span></span>
<span class="line">    <span class="token comment">#        root   html;</span></span>
<span class="line">    <span class="token comment">#        index  index.html index.htm;</span></span>
<span class="line">    <span class="token comment">#    }</span></span>
<span class="line">    <span class="token comment">#}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># HTTPS server</span></span>
<span class="line">    <span class="token comment">#</span></span>
<span class="line">    <span class="token comment">#server {</span></span>
<span class="line">    <span class="token comment">#    listen       443 ssl;</span></span>
<span class="line">    <span class="token comment">#    server_name  localhost;</span></span>
<span class="line">    <span class="token comment">#    ssl_certificate      cert.pem;</span></span>
<span class="line">    <span class="token comment">#    ssl_certificate_key  cert.key;</span></span>
<span class="line">    <span class="token comment">#    ssl_session_cache    shared:SSL:1m;</span></span>
<span class="line">    <span class="token comment">#    ssl_session_timeout  5m;</span></span>
<span class="line">    <span class="token comment">#    ssl_ciphers  HIGH:!aNULL:!MD5;</span></span>
<span class="line">    <span class="token comment">#    ssl_prefer_server_ciphers  on;</span></span>
<span class="line">    <span class="token comment">#    location / {</span></span>
<span class="line">    <span class="token comment">#        root   html;</span></span>
<span class="line">    <span class="token comment">#        index  index.html index.htm;</span></span>
<span class="line">    <span class="token comment">#    }</span></span>
<span class="line">    <span class="token comment">#}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>config.d/nav.conf</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">   server<span class="token punctuation">{</span></span>
<span class="line">    listen    <span class="token number">6800</span><span class="token punctuation">;</span></span>
<span class="line">    server_name   www.yzqdev.top<span class="token punctuation">;</span></span>
<span class="line">      location / <span class="token punctuation">{</span></span>
<span class="line">            root   /opt/navurl/<span class="token punctuation">;</span></span>
<span class="line">            index  index.html index.htm<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">   server<span class="token punctuation">{</span></span>
<span class="line">    listen    <span class="token number">80</span><span class="token punctuation">;</span></span>
<span class="line">    server_name   www.yzqdev.top<span class="token punctuation">;</span></span>
<span class="line">       client_max_body_size 20m<span class="token punctuation">;</span></span>
<span class="line">         location / <span class="token punctuation">{</span></span>
<span class="line">           proxy_pass http://localhost:8090<span class="token punctuation">;</span></span>
<span class="line">            </span>
<span class="line">            </span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">         </span>
<span class="line"> </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"> server<span class="token punctuation">{</span></span>
<span class="line">    listen    <span class="token number">2800</span><span class="token punctuation">;</span></span>
<span class="line">    server_name   www.yzqdev.top<span class="token punctuation">;</span></span>
<span class="line">      location /home/main/ <span class="token punctuation">{</span></span>
<span class="line">           root   /opt/myblog<span class="token punctuation">;</span></span>
<span class="line">           try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span></span>
<span class="line">           index  index.html index.htm<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">         location / <span class="token punctuation">{</span></span>
<span class="line">            root   /opt/myblog<span class="token punctuation">;</span></span>
<span class="line">            try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span></span>
<span class="line">            index  index.html index.htm<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>config.d/static.conf</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"> </span>
<span class="line">  server<span class="token punctuation">{</span></span>
<span class="line">    listen    <span class="token number">2333</span><span class="token punctuation">;</span></span>
<span class="line">    server_name   www.yzqdev.top<span class="token punctuation">;</span></span>
<span class="line">     index  index.html<span class="token punctuation">;</span></span>
<span class="line">    location /atools <span class="token punctuation">{</span></span>
<span class="line">           root   /opt/atools/<span class="token punctuation">;</span></span>
<span class="line">           try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span></span>
<span class="line">          </span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line">    location / <span class="token punctuation">{</span></span>
<span class="line">           root   /opt/atools/<span class="token punctuation">;</span></span>
<span class="line">           try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span></span>
<span class="line">          </span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line">  </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">server <span class="token punctuation">{</span></span>
<span class="line">  listen  <span class="token number">8080</span><span class="token punctuation">;</span></span>
<span class="line">  server_name www.yzqdev.top<span class="token punctuation">;</span></span>
<span class="line">  location / <span class="token punctuation">{</span></span>
<span class="line">    proxy_pass http://127.0.0.1:8080<span class="token punctuation">;</span></span>
<span class="line">     proxy_redirect off<span class="token punctuation">;</span></span>
<span class="line">        proxy_set_header Host <span class="token variable">$host</span><span class="token punctuation">;</span></span>
<span class="line">        proxy_set_header X-Real-IP <span class="token variable">$remote_addr</span><span class="token punctuation">;</span></span>
<span class="line">        proxy_set_header X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span><span class="token punctuation">;</span></span>
<span class="line">        root /usr/local/nginx/html<span class="token punctuation">;</span></span>
<span class="line">        index index.html index.htm<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>config.d/zfile.conf</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">  server<span class="token punctuation">{</span></span>
<span class="line">    listen    <span class="token number">9100</span><span class="token punctuation">;</span></span>
<span class="line">    server_name   www.yzqdev.top<span class="token punctuation">;</span></span>
<span class="line"> location /admin <span class="token punctuation">{</span></span>
<span class="line">           root   /opt/zfile-vue/<span class="token punctuation">;</span></span>
<span class="line">           try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span></span>
<span class="line">           index  index.html index.htm<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"> location /install <span class="token punctuation">{</span></span>
<span class="line">           root   /opt/zfile-vue/<span class="token punctuation">;</span></span>
<span class="line">           try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span></span>
<span class="line">           index  index.html index.htm<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      location / <span class="token punctuation">{</span></span>
<span class="line">            root   /opt/zfile-vue/<span class="token punctuation">;</span></span>
<span class="line">            try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span></span>
<span class="line">            index  index.html index.htm<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>需要注意root和alias区别<br> root与alias主要区别在于nginx如何解释location后面的uri，这会使两者分别以不同的方式将请求映射到服务器文件上。 alias是一个目录别名的定义（仅能用于location上下文），root则是最上层目录的定义。 直接通过例子来理解：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">location ^~ /123/abc/ <span class="token punctuation">{</span></span>
<span class="line">root /data/www<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>当请求<code>http://blog.whsir.com/123/abc/logo.png</code>时，将会返回服务器上的<code>/data/www/123/abc/logo.png</code>文件，即<code>/data/www+/123/abc/</code></p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">location ^~ /123/abc/ <span class="token punctuation">{</span></span>
<span class="line"><span class="token builtin class-name">alias</span> /data/www<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">当请求<span class="token variable"><span class="token variable">\`</span>http://blog.whsir.com/123/abc/logo.png<span class="token variable">\`</span></span>时，将会返回服务器上的<span class="token variable"><span class="token variable">\`</span>/data/www/logo.png<span class="token variable">\`</span></span>文件，即/data/www</span>
<span class="line"></span></code></pre></div><p>参考： <a href="http://nginx.org/en/docs/http/ngx_http_core_module.html#root" target="_blank" rel="noopener noreferrer">http://nginx.org/en/docs/http/ngx_http_core_module.html#root</a><a href="http://nginx.org/en/docs/http/ngx_http_core_module.html#alias" target="_blank" rel="noopener noreferrer">http://nginx.org/en/docs/http/ngx_http_core_module.html#alias</a></p></div><p>对于vuepress使用pages ,最终网址是类似 <code>yourname.github.io/cs-guide</code> 需要配置nginx如下</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">server<span class="token punctuation">{</span></span>
<span class="line">    listen    <span class="token number">80</span><span class="token punctuation">;</span></span>
<span class="line">    server_name   www.yzqdev.top<span class="token punctuation">;</span></span>
<span class="line">      location /cs-guide <span class="token punctuation">{</span></span>
<span class="line">            <span class="token builtin class-name">alias</span>   /opt/cs-guide/<span class="token punctuation">;</span></span>
<span class="line">            index  index.html index.htm<span class="token punctuation">;</span></span>
<span class="line">            try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      location / <span class="token punctuation">{</span></span>
<span class="line">            root   /opt/cs-guide/<span class="token punctuation">;</span></span>
<span class="line">            index  index.html index.htm<span class="token punctuation">;</span></span>
<span class="line">            try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div>`,19)])])}const o=s(i,[["render",p]]),d=JSON.parse('{"path":"/java-tutor/server-config/nginx-config.html","title":"nginx使用","lang":"zh-CN","frontmatter":{"description":"nginx使用 windows使用 linux使用 技巧 主分文件分片 注意要把 include conf.d/*.conf; 写在http{}内部 config.d/nav.conf config.d/static.conf config.d/zfile.conf 提示 需要注意root和alias区别 root与alias主要区别在于nginx如何...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nginx使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-26T13:49:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/server-config/nginx-config.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"nginx使用"}],["meta",{"property":"og:description","content":"nginx使用 windows使用 linux使用 技巧 主分文件分片 注意要把 include conf.d/*.conf; 写在http{}内部 config.d/nav.conf config.d/static.conf config.d/zfile.conf 提示 需要注意root和alias区别 root与alias主要区别在于nginx如何..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-26T13:49:46.000Z"}],["meta",{"property":"article:modified_time","content":"2023-11-26T13:49:46.000Z"}]]},"git":{"createdTime":1647861419000,"updatedTime":1701006586000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":6,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.13,"words":640},"filePathRelative":"java-tutor/server-config/nginx-config.md","autoDesc":true}');export{o as comp,d as data};
