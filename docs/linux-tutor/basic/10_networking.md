---
order: 10
---

# 网络工具

## 网络连接检查

### ping — 测试连通性

```bash
ping google.com               # 持续 ping，Ctrl+C 停止
ping -c 4 google.com          # 发送 4 个包后自动停止
ping -c 4 -W 2 192.168.1.1   # 超时 2 秒
```

### curl — 请求网络资源

`curl` 是与 HTTP 服务交互的首选工具：

```bash
# 基本 GET 请求
curl https://api.github.com

# 显示响应头
curl -I https://google.com

# 保存到文件
curl -o output.html https://example.com

# 跟随重定向
curl -L https://httpbin.org/redirect/3

# POST 请求
curl -X POST -d '{"key":"value"}' https://httpbin.org/post

# 设置请求头
curl -H "Authorization: Bearer token" https://api.example.com

# 查看详细通信
curl -v https://example.com
```

### wget — 下载文件

```bash
# 基本下载
wget https://example.com/file.zip

# 断点续传
wget -c https://example.com/largefile.iso

# 限速下载
wget --limit-rate=200k https://example.com/file.zip

# 递归下载（镜像整个网站）
wget -r -l 2 https://example.com/
```

## 端口与服务

### netstat / ss — 网络连接状态

```bash
# 列出所有监听端口
netstat -tlnp                    # t=tcp, l=listen, n=数字显示, p=程序
netstat -ulnp                    # UDP 监听

# 查看所有连接
netstat -ant                     # 所有 TCP 连接
netstat -an | grep ESTABLISHED   # 已建立的连接

# ss 是 netstat 的现代替代（更快）
ss -tlnp
ss -ant
```

### 检测端口

```bash
# 检查本地端口是否被占用
lsof -i :8080
netstat -tlnp | grep 8080

# 检查远程端口
nc -zv example.com 80           # nc 检测端口
timeout 1 bash -c 'echo > /dev/tcp/example.com/80' && echo "open"
```

## 远程连接

### SSH — 远程登录

```bash
# 基本登录
ssh user@hostname
ssh user@192.168.1.100

# 指定端口
ssh -p 2222 user@hostname

# 密钥登录
ssh-keygen -t ed25519          # 生成密钥对
ssh-copy-id user@hostname       # 复制公钥到服务器
ssh user@hostname               # 此后无需密码

# 配置文件 ~/.ssh/config
# Host myserver
#     HostName 192.168.1.100
#     User myuser
#     Port 2222
#     IdentityFile ~/.ssh/mykey
```

### SCP — 安全复制

```bash
# 上传文件
scp file.txt user@hostname:/path/to/destination/

# 下载文件
scp user@hostname:/path/to/file.txt ./

# 递归目录
scp -r project/ user@hostname:~
```

### rsync — 增量同步

```bash
rsync -avz source/ user@hostname:/destination/
# -a 归档模式，-v 详细，-z 压缩传输
```

## 网络诊断

```bash
# 路由追踪
traceroute google.com
traceroute -n google.com       # 跳过 DNS 解析

# DNS 查询
host google.com
nslookup google.com
dig google.com

# 查看 DNS 配置
cat /etc/resolv.conf
```

## 本章小结

| 命令 | 用途 | 常用场景 |
|------|------|---------|
| `curl` | HTTP 请求 | API 调试、下载 |
| `wget` | 文件下载 | 下载大文件、镜像 |
| `ssh` | 远程登录 | 服务器管理 |
| `scp` | 远程复制 | 文件传输 |
| `netstat`/`ss` | 端口查看 | 排查端口占用 |
| `ping` | 连通性测试 | 网络是否可达 |
| `dig`/`host` | DNS 查询 | 域名解析排查 |

## 练习

1. 用 `curl -I` 查看一个网站的响应头
2. 用 `ping -c 4` 测试到 `google.com` 的延迟
3. 用 `netstat -tlnp` 查看本机哪些端口在监听
4. 生成 SSH 密钥对，添加到 GitHub，测试免密登录
5. 用 `scp` 将本地文件传输到远程服务器
