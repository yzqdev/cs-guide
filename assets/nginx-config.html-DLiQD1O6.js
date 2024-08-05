import{_ as n,c as e,o as t,d as o}from"./app-CbULZrmi.js";const i={},r=o(`<h1 id="nginx使用" tabindex="-1"><a class="header-anchor" href="#nginx使用"><span>nginx使用</span></a></h1><h2 id="windows使用" tabindex="-1"><a class="header-anchor" href="#windows使用"><span>windows使用</span></a></h2><pre><code class="language-powershell">#启动nginx,不要./nginx.exe,这样会无法关闭
start nginx
# 重载nginx
./nginx.exe -s reload
#停止nginx
./nginx.exe -s stop
</code></pre><h2 id="linux使用" tabindex="-1"><a class="header-anchor" href="#linux使用"><span>linux使用</span></a></h2><pre><code class="language-java">sudo apt-get install nginx
</code></pre><h2 id="技巧" tabindex="-1"><a class="header-anchor" href="#技巧"><span>技巧</span></a></h2><ul><li><a href="https://blog.csdn.net/qq_41783562/article/details/106530017" target="_blank" rel="noopener noreferrer">主分文件分片</a></li></ul><pre><code class="language-bash">sudo systemctl start nginx
</code></pre><p>注意要把 <code>include conf.d/*.conf;</code> 写在<code>http{}</code>内部</p><pre><code class="language-shell">#user  nobody;
worker_processes  1;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
#pid        logs/nginx.pid;
events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;
    #log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;
    #                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;
    #                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;
    #access_log  logs/access.log  main;
    sendfile        on;
    #tcp_nopush     on;
    #keepalive_timeout  0;
    keepalive_timeout  65;
    #gzip  on;
    include conf.d/*.conf;
 
    server {
        listen       80;
        server_name  localhost;
        #charset koi8-r;
        #access_log  logs/host.access.log  main;
        location / {
            root   html;
            index  index.html index.htm;
        }
        #error_page  404              /404.html;
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \\.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}
        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \\.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}
        # deny access to .htaccess files, if Apache&#39;s document root
        # concurs with nginx&#39;s one
        #
        #location ~ /\\.ht {
        #    deny  all;
        #}
    }

    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;
    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;
    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;
    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
}
</code></pre><p>config.d/nav.conf</p><pre><code class="language-shell">   server{
    listen    6800;
    server_name   www.yzqdev.top;
      location / {
            root   /opt/navurl/;
            index  index.html index.htm;
        }
    }
   server{
    listen    80;
    server_name   www.yzqdev.top;
       client_max_body_size 20m;
         location / {
           proxy_pass http://localhost:8090;
            
            
        }
         
 
    }
 server{
    listen    2800;
    server_name   www.yzqdev.top;
      location /home/main/ {
           root   /opt/myblog;
           try_files $uri $uri/ /index.html;
           index  index.html index.htm;
        }
         location / {
            root   /opt/myblog;
            try_files $uri $uri/ /index.html;
            index  index.html index.htm;

        }
    }

</code></pre><p>config.d/static.conf</p><pre><code class="language-shell"> 
  server{
    listen    2333;
    server_name   www.yzqdev.top;
     index  index.html;
    location /atools {
           root   /opt/atools/;
           try_files $uri $uri/ /index.html;
          
 }
    location / {
           root   /opt/atools/;
           try_files $uri $uri/ /index.html;
          
 }
  
}
server {
  listen  8080;
  server_name www.yzqdev.top;
  location / {
    proxy_pass http://127.0.0.1:8080;
     proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        root /usr/local/nginx/html;
        index index.html index.htm;
  }
}
</code></pre><p>config.d/zfile.conf</p><pre><code class="language-shell">  server{
    listen    9100;
    server_name   www.yzqdev.top;
 location /admin {
           root   /opt/zfile-vue/;
           try_files $uri $uri/ /index.html;
           index  index.html index.htm;
        }
 location /install {
           root   /opt/zfile-vue/;
           try_files $uri $uri/ /index.html;
           index  index.html index.htm;
        }
      location / {
            root   /opt/zfile-vue/;
            try_files $uri $uri/ /index.html;
            index  index.html index.htm;
        }
    }
</code></pre><div class="hint-container tip"><p class="hint-container-title">提示</p><p>需要注意root和alias区别<br> root与alias主要区别在于nginx如何解释location后面的uri，这会使两者分别以不同的方式将请求映射到服务器文件上。 alias是一个目录别名的定义（仅能用于location上下文），root则是最上层目录的定义。 直接通过例子来理解：</p><pre><code class="language-shell">location ^~ /123/abc/ {
root /data/www;
}
</code></pre><p>当请求<code>http://blog.whsir.com/123/abc/logo.png</code>时，将会返回服务器上的<code>/data/www/123/abc/logo.png</code>文件，即<code>/data/www+/123/abc/</code></p><pre><code class="language-shell">location ^~ /123/abc/ {
alias /data/www;
}
当请求\`http://blog.whsir.com/123/abc/logo.png\`时，将会返回服务器上的\`/data/www/logo.png\`文件，即/data/www
</code></pre><p>参考： <a href="http://nginx.org/en/docs/http/ngx_http_core_module.html#root" target="_blank" rel="noopener noreferrer">http://nginx.org/en/docs/http/ngx_http_core_module.html#root</a><a href="http://nginx.org/en/docs/http/ngx_http_core_module.html#alias" target="_blank" rel="noopener noreferrer">http://nginx.org/en/docs/http/ngx_http_core_module.html#alias</a></p></div><p>对于vuepress使用pages ,最终网址是类似 <code>yourname.github.io/cs-guide</code> 需要配置nginx如下</p><pre><code class="language-shell">server{
    listen    80;
    server_name   www.yzqdev.top;
      location /cs-guide {
            alias   /opt/cs-guide/;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
      location / {
            root   /opt/cs-guide/;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
    }
</code></pre>`,19),a=[r];function s(l,c){return t(),e("div",null,a)}const p=n(i,[["render",s],["__file","nginx-config.html.vue"]]),h=JSON.parse('{"path":"/java-tutor/server-config/nginx-config.html","title":"nginx使用","lang":"zh-CN","frontmatter":{"description":"nginx使用 windows使用 linux使用 技巧 主分文件分片 注意要把 include conf.d/*.conf; 写在http{}内部 config.d/nav.conf config.d/static.conf config.d/zfile.conf 提示 需要注意root和alias区别 root与alias主要区别在于nginx如何...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/server-config/nginx-config.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"nginx使用"}],["meta",{"property":"og:description","content":"nginx使用 windows使用 linux使用 技巧 主分文件分片 注意要把 include conf.d/*.conf; 写在http{}内部 config.d/nav.conf config.d/static.conf config.d/zfile.conf 提示 需要注意root和alias区别 root与alias主要区别在于nginx如何..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-26T13:49:46.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-26T13:49:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nginx使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-26T13:49:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"windows使用","slug":"windows使用","link":"#windows使用","children":[]},{"level":2,"title":"linux使用","slug":"linux使用","link":"#linux使用","children":[]},{"level":2,"title":"技巧","slug":"技巧","link":"#技巧","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1701006586000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":2.13,"words":640},"filePathRelative":"java-tutor/server-config/nginx-config.md","localizedDate":"2022年3月21日","autoDesc":true}');export{p as comp,h as data};
