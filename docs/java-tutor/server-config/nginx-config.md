# nginx使用

## windows使用

```powershell
#启动nginx,不要./nginx.exe,这样会无法关闭
start nginx
# 重载nginx
./nginx.exe -s reload

#停止nginx
./nginx.exe -s stop
```

## linux使用

```java
sudo apt-get install nginx
```

主分文件分片
[https://blog.csdn.net/qq_41783562/article/details/106530017](https://blog.csdn.net/qq_41783562/article/details/106530017)

```bash
sudo systemctl start nginx
```

注意要把   `include conf.d/*.conf;` 写在`http{}`内部

```shell

#user  nobody;
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

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

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
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
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

```

config.d/nav.conf

```shell

   server{
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


```

config.d/static.conf

```shell
 
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

```

config.d/zfile.conf

```shell
  server{
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

```

:::tip
需要注意root和alias区别  
root与alias主要区别在于nginx如何解释location后面的uri，这会使两者分别以不同的方式将请求映射到服务器文件上。

alias是一个目录别名的定义（仅能用于location上下文），root则是最上层目录的定义。

直接通过例子来理解：

```shell
location ^~ /123/abc/ {
root /data/www;
}
```

当请求`http://blog.whsir.com/123/abc/logo.png`时，将会返回服务器上的`/data/www/123/abc/logo.png`文件，即`/data/www+/123/abc/`

```shell
location ^~ /123/abc/ {
alias /data/www;
}

当请求`http://blog.whsir.com/123/abc/logo.png`时，将会返回服务器上的`/data/www/logo.png`文件，即/data/www
```

参考：

<http://nginx.org/en/docs/http/ngx_http_core_module.html#root>
<http://nginx.org/en/docs/http/ngx_http_core_module.html#alias>
:::
对于vuepress使用pages ,最终网址是类似 `yourname.github.io/cs-guide`
需要配置nginx如下

```shell

server{
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

```
