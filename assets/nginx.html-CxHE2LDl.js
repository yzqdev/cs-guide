import{_ as n,c as e,o as t,d as o}from"./app-CbULZrmi.js";const i={},r=o(`<h1 id="nginx配置" tabindex="-1"><a class="header-anchor" href="#nginx配置"><span>nginx配置</span></a></h1><h2 id="nginx命令行" tabindex="-1"><a class="header-anchor" href="#nginx命令行"><span>nginx命令行</span></a></h2><h3 id="windows使用" tabindex="-1"><a class="header-anchor" href="#windows使用"><span>windows使用</span></a></h3><pre><code class="language-powershell">#启动nginx,不要./nginx.exe,这样会无法关闭
start nginx
# 重载nginx
./nginx.exe -s reload

#停止nginx
./nginx.exe -s stop
</code></pre><pre><code class="language-shell">#!/bin/bash


#nginx执行程序路径需要修改
nginxd=/usr/local/nginx/sbin/nginx

# nginx配置文件路径需要修改
nginx_config=/usr/local/nginx/conf/nginx.conf

# pid 地址需要修改
nginx_pid=/var/local/nginx/nginx.pid


RETVAL=0
prog=&quot;nginx&quot;

# Source function library.
. /etc/rc.d/init.d/functions
# Source networking configuration.
. /etc/sysconfig/network
# Check that networking is up.
[ \${NETWORKING} = &quot;no&quot; ] &amp;&amp; exit 0
[ -x $nginxd ] || exit 0

# Start nginx daemons functions.
start() {
if [ -e $nginx_pid ];then
   echo &quot;nginx already running....&quot;
   exit 1
fi

echo -n $&quot;Starting $prog: &quot;
daemon $nginxd -c \${nginx_config}
RETVAL=$?
echo
[ $RETVAL = 0 ] &amp;&amp; touch /var/lock/subsys/nginx
return $RETVAL
}

# Stop nginx daemons functions.
# pid 地址需要修改
stop() {
    echo -n $&quot;Stopping $prog: &quot;
    killproc $nginxd
    RETVAL=$?
    echo
    [ $RETVAL = 0 ] &amp;&amp; rm -f /var/lock/subsys/nginx /var/local/nginx/nginx.pid
}

# reload nginx service functions.
reload() {
    echo -n $&quot;Reloading $prog: &quot;
    #kill -HUP \`cat \${nginx_pid}\`
    killproc $nginxd -HUP
    RETVAL=$?
    echo
}

# See how we were called.
case &quot;$1&quot; in
    start)
        start
        ;;
    stop)
        stop
        ;;
    reload)
        reload
        ;;
    restart)
        stop
        start
        ;;
    status)
        status $prog
        RETVAL=$?
        ;;
    *)

    echo $&quot;Usage: $prog {start|stop|restart|reload|status|help}&quot;
    exit 1

esac
exit $RETVAL
</code></pre><h2 id="检测nginx" tabindex="-1"><a class="header-anchor" href="#检测nginx"><span>检测nginx</span></a></h2><pre><code class="language-shell">#!/bin/bash
# 如果进程中没有nginx则将keepalived进程kill掉
A=\`ps -C nginx --no-header |wc -l\`      ## 查看是否有 nginx进程 把值赋给变量A 
if [ $A -eq 0 ];then                    ## 如果没有进程值得为 零
       service keepalived stop          ## 则结束 keepalived 进程
fi
</code></pre><h2 id="nginx-配置" tabindex="-1"><a class="header-anchor" href="#nginx-配置"><span>nginx 配置</span></a></h2><pre><code class="language-conf">user root;
worker_processes  auto;
pid /run/nginx.pid;

events {
    use epoll;
    multi_accept on;
    worker_connections  1024;
}

http {
    # 必须加这两个，不然 CSS 无法正常加载
    include mime.types;
    default_type application/octet-stream;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;
                      &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;
                      &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot; &quot;$request_time&quot;&#39;;

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log;

    gzip on;
    gzip_buffers 8 16k;
    gzip_min_length 512;
    gzip_disable &quot;MSIE [1-6]\\.(?!.*SV1)&quot;;
    gzip_http_version 1.1;
    gzip_types   text/plain text/css application/javascript application/x-javascript application/json application/xml;

    server {

        listen       8001;
        server_name  localhost 127.0.0.1 139.159.190.24 platform.gitnavi.com;

        location / {
            root /root/.jenkins/workspace/nestle-platform-front-test/dist;
            index index.html index.htm;
            try_files $uri /index.html;
        }

        ## 二级目录方式，记得 package.json 添加：&quot;homepage&quot;: &quot;cdk8s-markdown&quot;,
        location ^~ /cdk8s-markdown {
            root    /root/.jenkins/workspace;
            index   index.html;
            try_files $uri /cdk8s-markdown/index.html;
        }

        location ^~ /platform/ {
            proxy_pass http://127.0.0.1:28081;
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location ~ .*\\.(js|css)?$ {
            root   /root/.jenkins/workspace/nestle-platform-front-test/dist;
        }

        location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf|ico|woff|woff2|ttf|eot|txt|svg)$ {
            root   /root/.jenkins/workspace/nestle-platform-front-test/dist;
        }

        error_page 404 /404.html;
           location = /usr/share/nginx/html/40x.html {
        }

        error_page 500 502 503 504 /50x.html;
           location = /usr/share/nginx/html/50x.html {
        }

    }

    server {

        listen       8002;
        server_name  localhost 127.0.0.1 139.159.190.24 store.gitnavi.com;

        location / {
            root /root/.jenkins/workspace/nestle-store-front-test/dist;
            index index.html index.htm;
            try_files $uri /index.html;
        }

        location ^~ /store/ {
            proxy_pass http://127.0.0.1:28082;
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location ~ .*\\.(js|css)?$ {
            root   /root/.jenkins/workspace/nestle-store-front-test/dist;
        }

        location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf|ico|woff|woff2|ttf|eot|txt|svg)$ {
            root   /root/.jenkins/workspace/nestle-store-front-test/dist;
        }

        error_page 404 /404.html;
           location = /usr/share/nginx/html/40x.html {
        }

        error_page 500 502 503 504 /50x.html;
           location = /usr/share/nginx/html/50x.html {
        }

    }
}
</code></pre>`,9),a=[r];function s(l,c){return t(),e("div",null,a)}const g=n(i,[["render",s],["__file","nginx.html.vue"]]),d=JSON.parse('{"path":"/linux-tutor/configs/nginx.html","title":"nginx配置","lang":"zh-CN","frontmatter":{"description":"nginx配置 nginx命令行 windows使用 检测nginx nginx 配置","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/configs/nginx.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"nginx配置"}],["meta",{"property":"og:description","content":"nginx配置 nginx命令行 windows使用 检测nginx nginx 配置"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-19T03:14:18.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-19T03:14:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nginx配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-19T03:14:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"nginx命令行","slug":"nginx命令行","link":"#nginx命令行","children":[{"level":3,"title":"windows使用","slug":"windows使用","link":"#windows使用","children":[]}]},{"level":2,"title":"检测nginx","slug":"检测nginx","link":"#检测nginx","children":[]},{"level":2,"title":"nginx 配置","slug":"nginx-配置","link":"#nginx-配置","children":[]}],"git":{"createdTime":1653565176000,"updatedTime":1700363658000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.19,"words":57},"filePathRelative":"linux-tutor/configs/nginx.md","localizedDate":"2022年5月26日","autoDesc":true}');export{g as comp,d as data};
