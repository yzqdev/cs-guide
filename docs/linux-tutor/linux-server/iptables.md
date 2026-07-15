# Iptables 防火墙配置

> 注意：CentOS 7+ 默认使用 firewalld，CentOS 6 使用 iptables。

## 一、安装

```bash
# CentOS 6（一般系统已集成）
yum install -y iptables

# 查看是否已安装
rpm -qa | grep iptables
```

## 二、基础命令

```bash
# 查看规则列表（带编号）
iptables -L -n --line-numbers

# 删除指定规则（删除 INPUT 链的第 8 条）
iptables -D INPUT 8

# 清除所有规则（⚠️ 慎用）
iptables -F
iptables -X
iptables -Z

# 保存配置
service iptables save

# 重启服务
service iptables restart

# 查看状态
service iptables status

# 开机自启
chkconfig --level 345 iptables on
```

## 三、常用规则

```bash
# 允许本地回环
iptables -I INPUT -i lo -j ACCEPT

# 允许已建立的连接
iptables -I INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# 允许本机向外访问
iptables -I OUTPUT -j ACCEPT

# 开放端口
iptables -A INPUT -p tcp -m tcp --dport 22 -j ACCEPT      # SSH
iptables -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT      # HTTP
iptables -A INPUT -p tcp -m tcp --dport 443 -j ACCEPT     # HTTPS
iptables -A INPUT -p tcp -m tcp --dport 8080 -j ACCEPT    # Tomcat
iptables -A INPUT -p tcp -m tcp --dport 3306 -j ACCEPT    # MySQL
iptables -A INPUT -p tcp -m tcp --dport 21 -j ACCEPT      # FTP
iptables -A INPUT -p tcp -m tcp --dport 20 -j ACCEPT      # FTP 数据

# 允许 ping
iptables -I INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

# 禁止其他未允许的规则（⚠️ 先确保 22 端口已开放，否则 SSH 会断开）
iptables -I INPUT -j REJECT
iptables -I FORWARD -j REJECT
```

## 四、语法说明

```
iptables [-AI 链名] [-io 网络接口] [-p 协议] [-s 来源IP] [-d 目标IP] -j [动作]
```

| 参数 | 说明 |
|------|------|
| `-A` 链名 | 在链末尾添加规则 |
| `-I` 链名 | 插入规则到指定位置（默认第一条）|
| `-i` 接口 | 进入的网络接口（如 eth0, lo），配合 INPUT |
| `-o` 接口 | 发出的网络接口，配合 OUTPUT |
| `-p` 协议 | tcp, udp, icmp, all |
| `-s` IP | 来源 IP 或网段 |
| `-d` IP | 目标 IP 或网段 |
| `-j` 动作 | ACCEPT（接受）、DROP（丢弃）、REJECT（拒绝）、LOG（记录）|

## 参考

- <https://wsgzao.github.io/post/iptables/>
- <http://www.vpser.net/security/linux-iptables.html>