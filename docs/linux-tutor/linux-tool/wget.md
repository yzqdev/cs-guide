# wget — 文件下载工具

`wget` 是 Linux 系统中用于命令行下载文件的工具，支持 HTTP、HTTPS 和 FTP 协议。`wget` 具备递归下载、断点续传、后台下载等功能，在网络不稳定或带宽有限的环境中表现出色，能够自动重试失败的下载任务。

## 命令格式

```bash
wget [参数] [URL]
```

## 常用参数

### 启动参数

| 参数 | 说明 |
|------|------|
| `-V` | 显示版本信息 |
| `-h` | 显示帮助信息 |
| `-b` | 后台运行 |
| `-i 文件` | 从文件读取 URL 列表进行批量下载 |

### 下载参数

| 参数 | 说明 |
|------|------|
| `-O 文件名` | 指定输出文件名 |
| `-c` | 断点续传 |
| `-t 次数` | 设置重试次数（`-t 0` 表示无限重试）|
| `-T 秒` | 设置超时时间 |
| `-w 秒` | 设置重试等待时间 |
| `--limit-rate=速率` | 限制下载速度 |
| `--user-agent=字符串` | 自定义 User-Agent |

### 目录参数

| 参数 | 说明 |
|------|------|
| `-P 目录` | 指定文件保存目录 |
| `-nd` | 不创建目录结构 |
| `-x` | 强制创建目录结构 |
| `-nH` | 不创建主机名前缀的目录 |

### 递归参数

| 参数 | 说明 |
|------|------|
| `-r` | 启用递归下载 |
| `-l 深度` | 设置递归深度 |
| `-np` | 不进入父目录 |
| `-A 后缀` | 仅接受指定后缀的文件 |
| `-R 后缀` | 拒绝指定后缀的文件 |
| `-D 域名` | 限制下载的域名列表 |

## 使用示例

### 基本下载

```bash
$ wget http://example.com/file.zip
```

### 断点续传

```bash
$ wget -c http://example.com/largefile.zip
```

### 后台下载

```bash
$ wget -b http://example.com/largefile.zip
# 输出日志到 wget-log
```

### 指定输出文件名

```bash
$ wget -O output.zip http://example.com/file.zip
```

### 指定保存目录

```bash
$ wget -P /opt/downloads/ http://example.com/file.zip
```

### 批量下载

将多个 URL 写入文件，每行一个：

```bash
$ cat download.txt
http://example.com/file1.zip
http://example.com/file2.zip
http://example.com/file3.zip

$ wget -i download.txt
```

### 后台批量下载

```bash
$ wget -b -c -i download.txt
```

### 限制下载速度

```bash
# 限制为 300 KB/s
$ wget --limit-rate=300k http://example.com/largefile.zip
```

### 伪装 User-Agent

```bash
$ wget --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  http://example.com/
```

### 递归下载网站

```bash
# 递归下载 example.com，深度为 2，不进入父目录
$ wget -r -l 2 -np http://example.com/
```

### 仅下载特定类型的文件

```bash
# 下载网站中所有 PDF 文件
$ wget -r -l 1 -A.pdf http://example.com/
```

## 高级用法

### 通过代理下载

```bash
$ wget -e "http_proxy=http://proxy:8080" http://example.com/file.zip
```

### 使用 Cookie

```bash
$ wget --header="Cookie: session=abc123" http://example.com/
```

### 下载需要认证的文件

```bash
$ wget --user=username --password=password http://example.com/protected.zip
```

### 镜像整个网站

```bash
$ wget -m -k -p http://example.com/
# -m: 镜像模式（递归、无限深度、时间戳等）
# -k: 转换链接为本地路径
# -p: 下载页面所需的所有资源
```

## 参考

- `man wget` — 查看完整帮助文档
- `curl` — 另一种 HTTP 请求工具