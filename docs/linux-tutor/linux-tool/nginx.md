# Nginx 配置参考

> Nginx 是一个高性能的 HTTP 和反向代理服务器，广泛应用于负载均衡、静态资源服务、API 网关等场景。

## Nginx 命令行

### Linux 系统

```bash
# 启动 Nginx
sudo systemctl start nginx
# 或
sudo /usr/local/nginx/sbin/nginx

# 停止 Nginx
sudo systemctl stop nginx
# 或
sudo /usr/local/nginx/sbin/nginx -s stop

# 重新加载配置（不中断服务）
sudo systemctl reload nginx
# 或
sudo /usr/local/nginx/sbin/nginx -s reload

# 测试配置是否正确
sudo /usr/local/nginx/sbin/nginx -t

# 查看版本
sudo /usr/local/nginx/sbin/nginx -V
```

### Windows 系统

```powershell
# 启动 Nginx（推荐使用 start 命令，以便后续关闭）
start nginx

# 重新加载配置
./nginx.exe -s reload

# 停止 Nginx
./nginx.exe -s stop

# 测试配置
./nginx.exe -t
```

## Nginx 管理脚本（init.d 风格）

```bash
#!/bin/bash
# nginx 执行程序路径（根据实际安装路径修改）
nginxd=/usr/local/nginx/sbin/nginx
# nginx 配置文件路径
nginx_config=/usr/local/nginx/conf/nginx.conf
# pid 文件路径
nginx_pid=/var/local/nginx/nginx.pid

RETVAL=0
prog="nginx"

# Source function library.
. /etc/rc.d/init.d/functions
# Source networking configuration.
. /etc/sysconfig/network
# Check that networking is up.
[ ${NETWORKING} = "no" ] && exit 0
[ -x $nginxd ] || exit 0

# Start nginx daemons functions.
start() {
    if [ -e $nginx_pid ];then
       echo "nginx already running...."
       exit 1
    fi
    echo -n $"Starting $prog: "
    daemon $nginxd -c ${nginx_config}
    RETVAL=$?
    echo
    [ $RETVAL = 0 ] && touch /var/lock/subsys/nginx
    return $RETVAL
}

# Stop nginx daemons functions.
stop() {
    echo -n $"Stopping $prog: "
    killproc $nginxd
    RETVAL=$?
    echo
    [ $RETVAL = 0 ] && rm -f /var/lock/subsys/nginx /var/local/nginx/nginx.pid
}

# reload nginx service functions.
reload() {
    echo -n $"Reloading $prog: "
    killproc $nginxd -HUP
    RETVAL=$?
    echo
}

case "$1" in
    start)   start ;;
    stop)    stop ;;
    reload)  reload ;;
    restart) stop; start ;;
    status)  status $prog; RETVAL=$? ;;
    *)
        echo $"Usage: $prog {start|stop|restart|reload|status|help}"
        exit 1
        ;;
esac
exit $RETVAL
```

## Nginx 健康检查脚本（配合 Keepalived）

```bash
#!/bin/bash
# 如果进程中没有 nginx 则将 keepalived 进程杀掉
A=`ps -C nginx --no-header |wc -l`
if [ $A -eq 0 ]; then
    service keepalived stop
fi
```

## Nginx 前端配置示例

```nginx
user root;
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

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for" "$request_time"';

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log;

    gzip on;
    gzip_buffers 8 16k;
    gzip_min_length 512;
    gzip_disable "MSIE [1-6]\.(?!.*SV1)";
    gzip_http_version 1.1;
    gzip_types   text/plain text/css application/javascript application/x-javascript application/json application/xml;

    server {
        listen       8001;
        server_name  localhost 127.0.0.1 example.com;

        location / {
            root /var/www/html/dist;
            index index.html index.htm;
            try_files $uri /index.html;
        }

        location ^~ /api/ {
            proxy_pass http://127.0.0.1:8080;
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location ~ .*\.(js|css)?$ {
            root /var/www/html/dist;
        }

        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|ico|woff|woff2|ttf|eot|txt|svg)$ {
            root /var/www/html/dist;
        }

        error_page 404 /404.html;
        error_page 500 502 503 504 /50x.html;
    }
}
```

## 常用配置场景

### 静态资源服务

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/html;
    index index.html;
    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 反向代理

```nginx
server {
    listen 80;
    server_name api.example.com;
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 负载均衡

```nginx
upstream backend {
    server 192.168.1.10:8080 weight=3;
    server 192.168.1.11:8080 weight=2;
    server 192.168.1.12:8080 backup;
}
server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
```

## 参考

- [Nginx 官方文档](http://nginx.org/en/docs/)
- [Nginx 配置生成器](https://nginxconfig.io/)