# scp — 跨机远程拷贝

`scp`（Secure Copy）是 Linux 系统中基于 SSH 协议的安全远程文件复制命令。与 `cp` 命令不同，`scp` 支持跨网络的主机间文件传输，且传输过程经过加密。与 `rsync` 相比，`scp` 的资源消耗更低，在传输大量小文件时不会导致磁盘 I/O 过高。

## 命令格式

```bash
scp [选项] [源路径] [目标路径]
```

## 常用参数

| 参数 | 说明 |
|------|------|
| `-P 端口` | 指定 SSH 端口（大写 P） |
| `-p` | 保留文件修改时间、访问时间和权限 |
| `-r` | 递归复制目录 |
| `-C` | 启用压缩传输 |
| `-q` | 安静模式，不显示进度 |
| `-v` | 详细输出，用于调试 |
| `-l 速率` | 限制带宽使用（单位：Kbit/s） |
| `-i 密钥文件` | 指定身份验证的密钥文件 |
| `-3` | 通过本地主机传输（用于两个远程主机间） |

## 使用示例

### 本地文件复制到远程服务器

```bash
$ scp /path/to/local/file.txt user@192.168.1.100:/path/to/remote/
```

### 远程文件复制到本地

```bash
$ scp user@192.168.1.100:/path/to/remote/file.txt /path/to/local/
```

### 递归复制目录

```bash
$ scp -r /path/to/local/dir user@192.168.1.100:/path/to/remote/
```

### 指定端口

```bash
$ scp -P 2222 file.txt user@192.168.1.100:/path/to/remote/
```

### 保留文件属性

```bash
$ scp -p file.txt user@192.168.1.100:/path/to/remote/
```

### 限制带宽

```bash
# 限制带宽为 1000 Kbit/s
$ scp -l 1000 largefile.zip user@192.168.1.100:/path/to/remote/
```

### 使用密钥文件认证

```bash
$ scp -i ~/.ssh/id_rsa file.txt user@192.168.1.100:/path/to/remote/
```

### 启用压缩传输

```bash
$ scp -C -r dir user@192.168.1.100:/path/to/remote/
```

## scp 与 rsync 对比

| 特性 | scp | rsync |
|------|-----|-------|
| 传输方式 | 完全复制 | 增量同步 |
| 加密传输 | 支持（基于 SSH） | 支持（基于 SSH） |
| 资源消耗 | 低 | 较高（小文件多时 I/O 高） |
| 断点续传 | 不支持 | 支持 |
| 增量传输 | 不支持 | 支持 |
| 速度 | 较慢 | 较快（增量传输时） |

## 参考

- `man scp` — 查看完整帮助文档
- `rsync` — 更高效的远程同步工具