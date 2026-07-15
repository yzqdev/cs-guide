# SSR 客户端配置（Ubuntu）

> ⚠️ **注意**：ShadowsocksR（SSR）已停止维护，建议使用更现代的方案如 V2Ray、Trojan 或 Shadowsocks 2022。本文档仅作存档参考。

## 安装

```bash
# 安装依赖
sudo apt-get install git
sudo apt-get install python

# 下载 SSR 客户端
wget http://www.djangoz.com/ssr
sudo mv ssr /usr/local/bin
sudo chmod 766 /usr/local/bin/ssr
ssr install
```

## 配置

```bash
ssr config
```

配置文件示例：

```json
{
    "server": "12.26.68.99",
    "server_port": 9191,
    "password": "123456",
    "protocol": "auth_sha1_v4",
    "obfs": "http_simple",
    "method": "aes-256-cfb"
}
```

## 常用命令

```bash
ssr start       # 启动
ssr stop        # 停止
ssr help        # 帮助
```

## 配置终端代理（polipo）

```bash
# 安装
sudo apt-get install polipo

# 配置
sudo vim /etc/polipo/config
```

配置内容：

```ini
logSyslog = true
logFile = /var/log/polipo/polipo.log
proxyAddress = "0.0.0.0"
socksParentProxy = "127.0.0.1:1080"
socksProxyType = socks5
chunkHighMark = 50331648
objectHighMark = 16384
serverMaxSlots = 64
serverSlots = 16
serverSlots1 = 32
```

```bash
# 重启
sudo service polipo restart

# 测试
curl ip.gs                          # 查看当前IP
export http_proxy=http://127.0.0.1:8123
curl ip.gs                          # 查看代理后IP
unset http_proxy                    # 取消代理
```

## 参考

- <https://www.jianshu.com/p/a0f3268bfa33>