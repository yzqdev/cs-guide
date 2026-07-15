# curl 命令详解

> curl 是常用的命令行工具，用来请求 Web 服务器。它的名字就是客户端（client）的 URL 工具的意思。
> 它的功能非常强大，命令行参数多达几十种，熟练使用完全可以取代 Postman 等图形界面工具。

---

## 参数速查

| 参数 | 说明 |
|------|------|
| `-A` / `--user-agent` | 设置 User-Agent 请求头 |
| `-b` / `--cookie` | 发送 Cookie |
| `-c` / `--cookie-jar` | 将 Cookie 写入文件 |
| `-d` / `--data` | 发送 POST 数据 |
| `--data-urlencode` | 发送 URL 编码的 POST 数据 |
| `-e` / `--referer` | 设置 Referer 请求头 |
| `-f` / `--fail` | 连接失败时不显示错误 |
| `-F` / `--form` | 上传文件（multipart/form-data）|
| `-G` | 将 `-d` 数据拼接到 URL 后面（GET 请求）|
| `-H` | 添加自定义请求头 |
| `-i` | 显示响应头 |
| `-I` / `--head` | 只发送 HEAD 请求 |
| `-k` / `--insecure` | 跳过 SSL 验证 |
| `-L` / `--location` | 跟随重定向 |
| `--limit-rate` | 限制带宽 |
| `-o` / `--output` | 将输出保存到文件 |
| `-O` / `--remote-name` | 保存为远程文件名 |
| `-s` / `--silent` | 静默模式 |
| `-S` / `--show-error` | 显示错误（与 -s 配合）|
| `-u` / `--user` | 设置认证用户名和密码 |
| `-v` / `--verbose` | 详细输出（调试）|
| `-x` / `--proxy` | 使用代理 |
| `-X` / `--request` | 指定请求方法 |
| `-#` / `--progress-bar` | 显示进度条 |

---

## 详细用法

### 基础请求

```bash
# GET 请求（默认）
curl https://www.example.com

# 指定请求方法
curl -X POST https://api.example.com
curl -X PUT https://api.example.com/1
curl -X DELETE https://api.example.com/1
```

### 请求头

```bash
# 设置 User-Agent
curl -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' https://bing.com
curl -A '' https://bing.com          # 移除 User-Agent

# 设置 Referer
curl -e 'https://bing.com' https://www.example.com

# 自定义请求头
curl -H 'Accept-Language: en-US' https://bing.com
curl -H 'Authorization: Bearer token123' https://api.example.com
curl -H 'Content-Type: application/json' -d '{"key":"value"}' https://api.example.com
```

### Cookie

```bash
# 发送 Cookie
curl -b 'foo=bar' https://bing.com
curl -b 'foo1=bar;foo2=bar2' https://bing.com
curl -b cookies.txt https://www.bing.com

# 保存 Cookie
curl -c cookies.txt https://www.bing.com
```

### POST 数据

```bash
# 表单数据
curl -d 'login=emma&password=123' https://bing.com/login
curl -d 'login=emma' -d 'password=123' https://bing.com/login

# JSON 数据
curl -d '{"login":"emma","pass":"123"}' -H 'Content-Type: application/json' https://bing.com/login

# 从文件读取数据
curl -d '@data.txt' https://bing.com/login

# URL 编码
curl --data-urlencode 'comment=hello world' https://bing.com/login
```

### 上传文件

```bash
# 上传文件
curl -F 'file=@photo.png' https://bing.com/upload

# 指定 MIME 类型
curl -F 'file=@photo.png;type=image/png' https://bing.com/upload

# 指定文件名
curl -F 'file=@photo.png;filename=me.png' https://bing.com/upload
```

### 下载文件

```bash
# 保存到指定文件
curl -o example.html https://www.example.com

# 保存为远程文件名
curl -O https://www.example.com/foo/bar.html

# 断点续传
curl -C - -o file.zip https://example.com/file.zip

# 限速下载
curl --limit-rate 200k https://bing.com

# 显示进度条
curl -# -O https://example.com/bigfile.zip
```

### 响应处理

```bash
# 显示响应头
curl -i https://www.example.com

# 只显示响应头
curl -I https://www.example.com
curl --head https://www.example.com

# 跟随重定向
curl -L https://t.co/abc123

# 静默模式
curl -s https://www.example.com
curl -s -o /dev/null https://bing.com   # 不产生任何输出
curl -s -o /dev/null -w "%{http_code}" https://bing.com  # 只输出状态码
```

### 认证

```bash
# 基本认证
curl -u 'bob:12345' https://bing.com/login
# 或 URL 中嵌入
curl https://bob:12345@bing.com/login

# 只输入用户名（会提示输入密码）
curl -u 'bob' https://bing.com/login
```

### 代理

```bash
# HTTP 代理
curl -x http://proxy:8080 https://example.com

# SOCKS5 代理
curl -x socks5://james:cats@myproxy.com:8080 https://example.com

# 使用环境变量
export http_proxy=http://proxy:8080
export https_proxy=http://proxy:8080
```

### SSL/TLS

```bash
# 跳过 SSL 验证
curl -k https://self-signed.example.com

# 指定证书
curl --cert client.crt --key client.key https://example.com

# 指定 CA 证书
curl --cacert ca.crt https://example.com
```

### 调试

```bash
# 详细输出（查看通信过程）
curl -v https://www.example.com

# 更详细的跟踪（含二进制数据）
curl --trace - https://www.example.com
curl --trace-ascii - https://www.example.com

# 只输出特定信息
curl -w "状态码: %{http_code}\n时间: %{time_total}s\n" https://www.example.com
```

---

## 实用示例

### 1. 检查 API 接口

```bash
# 检查返回状态码
curl -s -o /dev/null -w "%{http_code}" https://api.example.com/health

# 检查响应时间
curl -s -o /dev/null -w "DNS: %{time_namelookup}s\n连接: %{time_connect}s\n传输: %{time_total}s\n" https://example.com
```

### 2. 下载 GitHub Release

```bash
curl -L -o release.zip https://github.com/user/repo/releases/latest/download/release.zip
```

### 3. 上传文件到服务器

```bash
curl -F "file=@/path/to/file" -F "description=test" https://upload.example.com/upload
```

### 4. 测试 CORS

```bash
curl -H "Origin: https://example.com" -H "Access-Control-Request-Method: GET" -X OPTIONS -v https://api.target.com
```

### 5. 发送带 Token 的请求

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." https://api.example.com/user
```

### 6. 下载并解压

```bash
curl -L https://example.com/archive.tar.gz | tar -xz
```

### 7. 测试 JSON API

```bash
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}' \
  https://api.example.com/login | python3 -m json.tool
```

---

## 参考

- [curl 官方文档](https://curl.se/docs/)
- [curl cookbook](https://catonmat.net/cookbooks/curl)
- 内容主要参考了阮一峰的《curl 初学者教程》