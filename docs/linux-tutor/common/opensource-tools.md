# Linux 实用工具推荐

> 整理了一些 Linux 下实用且好用的工具，覆盖系统运维、文件管理、网络调试、开发效率等场景。

---

## 一、系统运维

### 1. atop — 高级系统监控

比 top/htop 更详细的系统负载监控，支持历史数据回放。

```bash
sudo apt install atop
atop                               # 启动监控
# 按 d 查看磁盘，按 m 查看内存，按 n 查看网络
# 按 t 回放历史数据
```

### 2. iotop — IO 监控

实时查看进程的磁盘 IO 使用情况。

```bash
sudo apt install iotop
iotop                              # 查看 IO 使用
iotop -o                           # 只显示有 IO 操作的进程
```

### 3. iostat — IO 统计

```bash
sudo apt install sysstat
iostat -x 1                        # 每 1 秒显示一次扩展 IO 统计
```

### 4. nload — 网速监控

实时查看网络带宽使用情况。

```bash
sudo apt install nload
nload                              # 查看所有网卡流量
nload eth0                         # 查看指定网卡
```

### 5. iftop — 网络连接监控

按连接显示网络流量。

```bash
sudo apt install iftop
iftop                              # 按连接显示流量
iftop -i eth0                      # 指定网卡
```

### 6. lsof — 查看打开的文件

```bash
lsof                               # 列出所有打开的文件
lsof -i :80                        # 查看占用 80 端口的进程
lsof -p 1234                       # 查看 PID 1234 打开的文件
lsof -u username                   # 查看用户打开的文件
lsof /path/to/file                 # 查看谁在使用该文件
```

---

## 二、文件管理

### 7. tree — 树形目录

```bash
sudo apt install tree
tree                               # 树形显示目录
tree -d                            # 只显示目录
tree -L 2                          # 只显示 2 层
tree -h                            # 显示文件大小
tree -I "node_modules"             # 排除目录
tree -o output.txt                 # 输出到文件
```

### 8. rsync — 高效同步

```bash
# 本地同步
rsync -av source/ dest/

# 远程同步
rsync -avz source/ user@host:/dest/

# 删除目标多余文件
rsync -av --delete source/ dest/
```

### 9. midnight commander (mc) — 文件管理器

经典的终端文件管理器，类似 Norton Commander。

```bash
sudo apt install mc
mc                                 # 启动文件管理器
# 支持：复制、移动、重命名、编辑、查看、FTP
```

---

## 三、文本处理

### 10. jq — JSON 处理器

```bash
sudo apt install jq
cat data.json | jq .               # 格式化 JSON
jq '.name' data.json               # 提取字段
jq '.users[].name' data.json       # 提取数组字段
jq -r '.name' data.json            # 原始输出（无引号）
curl -s api.example.com | jq .     # 格式化 API 返回
```

### 11. yq — YAML 处理器

```bash
pip install yq
yq . config.yaml                   # 格式化 YAML
yq '.key' config.yaml              # 提取字段
```

### 12. ag (the_silver_searcher) — 代码搜索

```bash
sudo apt install silversearcher-ag
ag "pattern"                       # 快速搜索代码
ag --python "pattern"              # 只搜索 Python 文件
ag -C 3 "pattern"                  # 显示上下文
```

---

## 四、网络工具

### 13. mtr — 网络诊断

结合 ping 和 traceroute 的网络诊断工具。

```bash
sudo apt install mtr
mtr google.com                     # 实时路由追踪
mtr -r google.com                  # 报告模式
mtr -n google.com                  # 不解析域名
```

### 14. nmap — 端口扫描

```bash
sudo apt install nmap
nmap 192.168.1.1                   # 扫描主机端口
nmap -sS 192.168.1.0/24           # 扫描网段
nmap -O 192.168.1.1               # 操作系统识别
nmap -A 192.168.1.1               # 全面扫描
```

### 15. socat — 网络瑞士军刀

比 netcat 更强大的网络工具。

```bash
# 监听端口
socat TCP-LISTEN:8080,fork TCP:localhost:80

# 端口转发
socat TCP-LISTEN:443,fork TCP:remote-server:443

# 连接远程
socat - TCP:example.com:80
```

---

## 五、开发效率

### 16. tig — Git 终端工具

带交互界面的 Git 客户端。

```bash
sudo apt install tig
tig                                # 查看提交历史
tig status                        # 查看状态
tig diff                          # 查看差异
```

### 17. tmux — 终端复用器

```bash
sudo apt install tmux
tmux new -s session_name           # 创建会话
tmux attach -t session_name        # 重连会话
tmux ls                            # 列出会话

# 快捷键
# Ctrl+b c  创建新窗口
# Ctrl+b n  切换到下一个窗口
# Ctrl+b p  切换到上一个窗口
# Ctrl+b d  分离会话
# Ctrl+b ,  重命名窗口
```

### 18. screen — 终端复用器（老牌）

```bash
screen -S session_name             # 创建会话
screen -r session_name             # 重连
screen -ls                         # 列出会话
# Ctrl+a d  分离会话
```

### 19. dialog — 终端对话框

在终端中创建图形化的对话框。

```bash
sudo apt install dialog
dialog --msgbox "Hello World" 10 30
dialog --yesno "Continue?" 10 30
dialog --inputbox "Enter name:" 10 30
```

---

## 六、安全工具

### 20. fail2ban — 暴力破解防护

```bash
sudo apt install fail2ban
sudo systemctl enable --now fail2ban
sudo fail2ban-client status        # 查看状态
sudo fail2ban-client status sshd   # 查看 SSH 防护状态
```

### 21. rkhunter —  Rootkit 检测

```bash
sudo apt install rkhunter
sudo rkhunter --check              # 检查 Rootkit
sudo rkhunter --update             # 更新特征库
```

### 22. clamav — 杀毒软件

```bash
sudo apt install clamav
sudo freshclam                     # 更新病毒库
sudo clamscan -r /home             # 扫描家目录
```

---

## 七、杂项

### 23. neofetch — 系统信息展示

```bash
sudo apt install neofetch
neofetch                           # 显示系统信息
```

### 24. figlet — ASCII 艺术字

```bash
sudo apt install figlet
figlet "Linux"                     # 大号 ASCII 艺术字
figlet -f slant "Hello"            # 斜体字体
showfigfonts                       # 查看所有字体
```

### 25. fortune — 随机名言

```bash
sudo apt install fortune
fortune                            # 显示随机名言
fortune -s                         # 简短名言
```

### 26. cowsay — 奶牛说话

```bash
sudo apt install cowsay
cowsay "Hello Linux"               # 奶牛说话
cowsay -f tux "Hello"              # 企鹅说话（Linux 吉祥物）
fortune | cowsay                   # 奶牛说名言
cowsay -l                          # 查看所有动物
```

---

## 八、安装速查

```bash
# Ubuntu/Debian 一键安装常用工具
sudo apt install -y \
    atop iotop sysstat nload iftop \
    tree rsync mc \
    jq silversearcher-ag \
    mtr nmap socat \
    tig tmux screen \
    dialog fail2ban rkhunter clamav \
    neofetch figlet fortune cowsay
```