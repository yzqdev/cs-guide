import{_ as t,r as l,o as c,c as o,d as n,e as s,b as i,a}from"./app-BO2oONDQ.js";const p={},d=a(`<h1 id="nginx使用" tabindex="-1"><a class="header-anchor" href="#nginx使用"><span>nginx使用</span></a></h1><h2 id="windows使用" tabindex="-1"><a class="header-anchor" href="#windows使用"><span>windows使用</span></a></h2><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token comment">#启动nginx,不要./nginx.exe,这样会无法关闭</span>
<span class="token function">start</span> nginx
<span class="token comment"># 重载nginx</span>
<span class="token punctuation">.</span><span class="token operator">/</span>nginx<span class="token punctuation">.</span>exe <span class="token operator">-</span>s reload
<span class="token comment">#停止nginx</span>
<span class="token punctuation">.</span><span class="token operator">/</span>nginx<span class="token punctuation">.</span>exe <span class="token operator">-</span>s stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="linux使用" tabindex="-1"><a class="header-anchor" href="#linux使用"><span>linux使用</span></a></h2><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>sudo apt<span class="token operator">-</span>get install nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="技巧" tabindex="-1"><a class="header-anchor" href="#技巧"><span>技巧</span></a></h2>`,6),r={href:"https://blog.csdn.net/qq_41783562/article/details/106530017",target:"_blank",rel:"noopener noreferrer"},u=a(`<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl start nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意要把 <code>include conf.d/*.conf;</code> 写在<code>http{}</code>内部</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#user  nobody;</span>
worker_processes  <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">#error_log  logs/error.log;</span>
<span class="token comment">#error_log  logs/error.log  notice;</span>
<span class="token comment">#error_log  logs/error.log  info;</span>
<span class="token comment">#pid        logs/nginx.pid;</span>
events <span class="token punctuation">{</span>
    worker_connections  <span class="token number">1024</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


http <span class="token punctuation">{</span>
    include       mime.types<span class="token punctuation">;</span>
    default_type  application/octet-stream<span class="token punctuation">;</span>
    <span class="token comment">#log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
    <span class="token comment">#                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
    <span class="token comment">#                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span>
    <span class="token comment">#access_log  logs/access.log  main;</span>
    sendfile        on<span class="token punctuation">;</span>
    <span class="token comment">#tcp_nopush     on;</span>
    <span class="token comment">#keepalive_timeout  0;</span>
    keepalive_timeout  <span class="token number">65</span><span class="token punctuation">;</span>
    <span class="token comment">#gzip  on;</span>
    include conf.d/*.conf<span class="token punctuation">;</span>
 
    server <span class="token punctuation">{</span>
        listen       <span class="token number">80</span><span class="token punctuation">;</span>
        server_name  localhost<span class="token punctuation">;</span>
        <span class="token comment">#charset koi8-r;</span>
        <span class="token comment">#access_log  logs/host.access.log  main;</span>
        location / <span class="token punctuation">{</span>
            root   html<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">#error_page  404              /404.html;</span>
        <span class="token comment"># redirect server error pages to the static page /50x.html</span>
        <span class="token comment">#</span>
        error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html<span class="token punctuation">;</span>
        location <span class="token operator">=</span> /50x.html <span class="token punctuation">{</span>
            root   html<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment"># proxy the PHP scripts to Apache listening on 127.0.0.1:80</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    proxy_pass   http://127.0.0.1;</span>
        <span class="token comment">#}</span>
        <span class="token comment"># pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    root           html;</span>
        <span class="token comment">#    fastcgi_pass   127.0.0.1:9000;</span>
        <span class="token comment">#    fastcgi_index  index.php;</span>
        <span class="token comment">#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span>
        <span class="token comment">#    include        fastcgi_params;</span>
        <span class="token comment">#}</span>
        <span class="token comment"># deny access to .htaccess files, if Apache&#39;s document root</span>
        <span class="token comment"># concurs with nginx&#39;s one</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ /\\.ht {</span>
        <span class="token comment">#    deny  all;</span>
        <span class="token comment">#}</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># another virtual host using mix of IP-, name-, and port-based configuration</span>
    <span class="token comment">#</span>
    <span class="token comment">#server {</span>
    <span class="token comment">#    listen       8000;</span>
    <span class="token comment">#    listen       somename:8080;</span>
    <span class="token comment">#    server_name  somename  alias  another.alias;</span>
    <span class="token comment">#    location / {</span>
    <span class="token comment">#        root   html;</span>
    <span class="token comment">#        index  index.html index.htm;</span>
    <span class="token comment">#    }</span>
    <span class="token comment">#}</span>

    <span class="token comment"># HTTPS server</span>
    <span class="token comment">#</span>
    <span class="token comment">#server {</span>
    <span class="token comment">#    listen       443 ssl;</span>
    <span class="token comment">#    server_name  localhost;</span>
    <span class="token comment">#    ssl_certificate      cert.pem;</span>
    <span class="token comment">#    ssl_certificate_key  cert.key;</span>
    <span class="token comment">#    ssl_session_cache    shared:SSL:1m;</span>
    <span class="token comment">#    ssl_session_timeout  5m;</span>
    <span class="token comment">#    ssl_ciphers  HIGH:!aNULL:!MD5;</span>
    <span class="token comment">#    ssl_prefer_server_ciphers  on;</span>
    <span class="token comment">#    location / {</span>
    <span class="token comment">#        root   html;</span>
    <span class="token comment">#        index  index.html index.htm;</span>
    <span class="token comment">#    }</span>
    <span class="token comment">#}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>config.d/nav.conf</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>   server<span class="token punctuation">{</span>
    listen    <span class="token number">6800</span><span class="token punctuation">;</span>
    server_name   www.yzqdev.top<span class="token punctuation">;</span>
      location / <span class="token punctuation">{</span>
            root   /opt/navurl/<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
   server<span class="token punctuation">{</span>
    listen    <span class="token number">80</span><span class="token punctuation">;</span>
    server_name   www.yzqdev.top<span class="token punctuation">;</span>
       client_max_body_size 20m<span class="token punctuation">;</span>
         location / <span class="token punctuation">{</span>
           proxy_pass http://localhost:8090<span class="token punctuation">;</span>
            
            
        <span class="token punctuation">}</span>
         
 
    <span class="token punctuation">}</span>
 server<span class="token punctuation">{</span>
    listen    <span class="token number">2800</span><span class="token punctuation">;</span>
    server_name   www.yzqdev.top<span class="token punctuation">;</span>
      location /home/main/ <span class="token punctuation">{</span>
           root   /opt/myblog<span class="token punctuation">;</span>
           try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span>
           index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
         location / <span class="token punctuation">{</span>
            root   /opt/myblog<span class="token punctuation">;</span>
            try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>config.d/static.conf</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code> 
  server<span class="token punctuation">{</span>
    listen    <span class="token number">2333</span><span class="token punctuation">;</span>
    server_name   www.yzqdev.top<span class="token punctuation">;</span>
     index  index.html<span class="token punctuation">;</span>
    location /atools <span class="token punctuation">{</span>
           root   /opt/atools/<span class="token punctuation">;</span>
           try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span>
          
 <span class="token punctuation">}</span>
    location / <span class="token punctuation">{</span>
           root   /opt/atools/<span class="token punctuation">;</span>
           try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span>
          
 <span class="token punctuation">}</span>
  
<span class="token punctuation">}</span>
server <span class="token punctuation">{</span>
  listen  <span class="token number">8080</span><span class="token punctuation">;</span>
  server_name www.yzqdev.top<span class="token punctuation">;</span>
  location / <span class="token punctuation">{</span>
    proxy_pass http://127.0.0.1:8080<span class="token punctuation">;</span>
     proxy_redirect off<span class="token punctuation">;</span>
        proxy_set_header Host <span class="token variable">$host</span><span class="token punctuation">;</span>
        proxy_set_header X-Real-IP <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
        proxy_set_header X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span><span class="token punctuation">;</span>
        root /usr/local/nginx/html<span class="token punctuation">;</span>
        index index.html index.htm<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>config.d/zfile.conf</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>  server<span class="token punctuation">{</span>
    listen    <span class="token number">9100</span><span class="token punctuation">;</span>
    server_name   www.yzqdev.top<span class="token punctuation">;</span>
 location /admin <span class="token punctuation">{</span>
           root   /opt/zfile-vue/<span class="token punctuation">;</span>
           try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span>
           index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
 location /install <span class="token punctuation">{</span>
           root   /opt/zfile-vue/<span class="token punctuation">;</span>
           try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span>
           index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      location / <span class="token punctuation">{</span>
            root   /opt/zfile-vue/<span class="token punctuation">;</span>
            try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),v={class:"hint-container tip"},m=a(`<p class="hint-container-title">提示</p><p>需要注意root和alias区别<br> root与alias主要区别在于nginx如何解释location后面的uri，这会使两者分别以不同的方式将请求映射到服务器文件上。 alias是一个目录别名的定义（仅能用于location上下文），root则是最上层目录的定义。 直接通过例子来理解：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>location ^~ /123/abc/ <span class="token punctuation">{</span>
root /data/www<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当请求<code>http://blog.whsir.com/123/abc/logo.png</code>时，将会返回服务器上的<code>/data/www/123/abc/logo.png</code>文件，即<code>/data/www+/123/abc/</code></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>location ^~ /123/abc/ <span class="token punctuation">{</span>
<span class="token builtin class-name">alias</span> /data/www<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
当请求<span class="token variable"><span class="token variable">\`</span>http://blog.whsir.com/123/abc/logo.png<span class="token variable">\`</span></span>时，将会返回服务器上的<span class="token variable"><span class="token variable">\`</span>/data/www/logo.png<span class="token variable">\`</span></span>文件，即/data/www
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),b={href:"http://nginx.org/en/docs/http/ngx_http_core_module.html#root",target:"_blank",rel:"noopener noreferrer"},k={href:"http://nginx.org/en/docs/http/ngx_http_core_module.html#alias",target:"_blank",rel:"noopener noreferrer"},h=a(`<p>对于vuepress使用pages ,最终网址是类似 <code>yourname.github.io/cs-guide</code> 需要配置nginx如下</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>server<span class="token punctuation">{</span>
    listen    <span class="token number">80</span><span class="token punctuation">;</span>
    server_name   www.yzqdev.top<span class="token punctuation">;</span>
      location /cs-guide <span class="token punctuation">{</span>
            <span class="token builtin class-name">alias</span>   /opt/cs-guide/<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
            try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      location / <span class="token punctuation">{</span>
            root   /opt/cs-guide/<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
            try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function g(x,_){const e=l("ExternalLinkIcon");return c(),o("div",null,[d,n("ul",null,[n("li",null,[n("a",r,[s("主分文件分片"),i(e)])])]),u,n("div",v,[m,n("p",null,[s("参考： "),n("a",b,[s("http://nginx.org/en/docs/http/ngx_http_core_module.html#root"),i(e)]),n("a",k,[s("http://nginx.org/en/docs/http/ngx_http_core_module.html#alias"),i(e)])])]),h])}const w=t(p,[["render",g],["__file","nginx-config.html.vue"]]),y=JSON.parse('{"path":"/java-tutor/server-config/nginx-config.html","title":"nginx使用","lang":"zh-CN","frontmatter":{"description":"nginx使用 windows使用 linux使用 技巧 主分文件分片 注意要把 include conf.d/*.conf; 写在http{}内部 config.d/nav.conf config.d/static.conf config.d/zfile.conf 提示 需要注意root和alias区别 root与alias主要区别在于nginx如何...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/server-config/nginx-config.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"nginx使用"}],["meta",{"property":"og:description","content":"nginx使用 windows使用 linux使用 技巧 主分文件分片 注意要把 include conf.d/*.conf; 写在http{}内部 config.d/nav.conf config.d/static.conf config.d/zfile.conf 提示 需要注意root和alias区别 root与alias主要区别在于nginx如何..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-26T13:49:46.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-26T13:49:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nginx使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-26T13:49:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"windows使用","slug":"windows使用","link":"#windows使用","children":[]},{"level":2,"title":"linux使用","slug":"linux使用","link":"#linux使用","children":[]},{"level":2,"title":"技巧","slug":"技巧","link":"#技巧","children":[]}],"git":{"createdTime":1649166358000,"updatedTime":1701006586000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":2.13,"words":640},"filePathRelative":"java-tutor/server-config/nginx-config.md","localizedDate":"2022年4月5日","autoDesc":true}');export{w as comp,y as data};
