# nginx配置

## nginx命令行

### windows使用

```powershell
#启动nginx,不要./nginx.exe,这样会无法关闭
start nginx
# 重载nginx
./nginx.exe -s reload

#停止nginx
./nginx.exe -s stop
```

@[code shell](./res/nginx.sh)

## 检测nginx

@[code shell](./res/nginx_check.sh)

## nginx 配置

@[code conf](./res/nginx-front.conf)
