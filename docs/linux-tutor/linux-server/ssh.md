# SSH（Secure Shell）配置与安全

## 一、安装

```bash
# CentOS
sudo yum install -y openssh-server openssh-clients

# Ubuntu
sudo apt-get install -y openssh-server openssh-client
```

## 二、修改端口

```bash
# 1. 备份配置文件
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

# 2. 编辑配置
sudo vim /etc/ssh/sshd_config

# 3. 修改 Port 行（建议使用 10000-65535 之间的端口）
Port 60001

# 4. 重启服务
sudo systemctl restart sshd.service   # CentOS 7+
sudo service sshd restart             # CentOS 6

# 5. 防火墙放行
# CentOS 7+
sudo firewall-cmd --zone=public --add-port=60001/tcp --permanent
sudo firewall-cmd --reload

# CentOS 6
sudo iptables -I INPUT -p tcp -m tcp --dport 60001 -j ACCEPT
sudo service iptables save
sudo service iptables restart
```

## 三、安全配置

### 禁止 root 直接登录

```bash
# 编辑 /etc/ssh/sshd_config
PermitRootLogin no
```

### 允许 root 登录（不推荐）

```bash
# 编辑 /etc/ssh/sshd_config
PermitRootLogin yes
```

### 设置超时自动断开

```bash
# 编辑 /etc/ssh/sshd_config
ClientAliveInterval 300      # 5分钟发送一次心跳
ClientAliveCountMax 3        # 3次无响应则断开（共15分钟）
```

### 限制可登录用户

```bash
# 编辑 /etc/ssh/sshd_config
AllowUsers root userName1 userName2
```

### 限制 IP 登录

```bash
# /etc/hosts.deny
sshd:ALL

# /etc/hosts.allow
sshd:123.23.1.23
```

## 四、密钥登录

```bash
# 1. 生成密钥对
ssh-keygen -t rsa -b 4096

# 2. 将公钥添加到 authorized_keys
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

# 3. 设置正确权限
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# 4. 重启服务
sudo systemctl restart sshd.service
```

## 五、查看登录日志

### 查看登录失败记录

```bash
# CentOS 6
tail -f /var/log/auth.log | grep "Failed password"

# CentOS 7
tail -f /var/log/secure | egrep "Failed|Failure"
```

### 统计暴力破解 IP

```bash
# CentOS 7
grep "Failed password" /var/log/secure | awk '{print $11}' | sort | uniq -c | sort -nr
```

## 六、防止暴力破解

### DenyHosts

```bash
# 官网：https://github.com/denyhosts/denyhosts
# 自动屏蔽多次尝试失败的 IP

# 或使用 fail2ban（推荐）
sudo apt install fail2ban   # Ubuntu
sudo yum install fail2ban   # CentOS
```

## 七、常用 SSH 客户端

| 平台 | 推荐工具 |
|------|----------|
| Windows | Xshell / WindTerm / Tabby |
| macOS | Termius / ZOC / iTerm2 |
| Linux | 自带终端 / Tabby |

## 参考

- [SSH 免密登录教程](https://www.jianshu.com/p/180fb11a5b96)
- <https://www.tecmint.com/find-failed-ssh-login-attempts-in-linux/>