# 用户与权限管理

用户是 Unix/Linux 系统工作中重要的一环，用户管理包括用户与组账号的管理。在 Unix/Linux 系统中，不论是由本机或是远程登录系统，每个用户都必须拥有一个账号，并且对于不同的系统资源拥有不同的使用权限。

## 1. 多用户系统

### 什么是多用户系统？

「多用户」指允许多个用户（逻辑上的账户）同时使用的操作系统或应用软件。Linux 就是多用户操作系统，允许多个用户通过远程登录的方式访问一台机器并同时进行使用，相互之间互不影响。

### Windows 与 Linux 的区别

Windows 的多用户不是真正的多用户 — 当你远程登录 Windows 时，本地会锁屏，其他人不能同时操作。而 Linux 允许多个用户**同时**通过 SSH 等方式登录并操作，互不干扰。

### 多用户的好处

- **安全性**：用户之间的文件相互隔离
- **权限控制**：精确控制每个用户能做什么
- **资源共享**：多个用户可共享系统资源
- **审计跟踪**：可以追踪每个用户的操作

---

## 2. 用户管理命令

### 查看用户信息

```bash
# 查看当前用户
whoami                    # 显示当前用户名
id                        # 显示当前用户详细信息（UID, GID, 组）
id username               # 显示指定用户信息

# 查看登录用户
who                       # 查看当前登录的用户
who -b                    # 显示系统最近启动时间
who -q                    # 只显示用户名和登录用户数
w                         # 更详细的登录用户信息（含负载、正在执行的命令）

# 查看所有用户
cat /etc/passwd           # 查看所有用户账户
cat /etc/passwd | cut -d: -f1   # 只查看用户名
getent passwd             # 查看所有用户（支持 LDAP 等）
```

### 用户账户文件

**`/etc/passwd`** — 用户账户信息（每行代表一个用户）：

```
用户名:密码占位符:UID:GID:描述:家目录:登录Shell
root:x:0:0:root:/root:/bin/bash
user1:x:1000:1000:User One:/home/user1:/bin/bash
```

**`/etc/shadow`** — 用户密码信息（加密存储，仅 root 可读）：

```
用户名:加密密码:最后修改日:最小天数:最大天数:警告天数:宽限天数:失效日:保留
user1:$6$xyz...:18900:0:99999:7:::
```

### 创建用户

```bash
# 基本创建
sudo useradd username                    # 创建用户（不创建家目录）
sudo useradd -m username                 # 创建用户并创建家目录（推荐）
sudo useradd -m -s /bin/bash username    # 指定登录 Shell
sudo useradd -m -d /home/custom user     # 指定家目录路径
sudo useradd -m -u 1001 username         # 指定 UID
sudo useradd -m -g groupname username    # 指定初始组
sudo useradd -m -G group1,group2 user    # 指定附加组
sudo useradd -m -c "Full Name" user      # 添加注释（全名）

# 创建系统用户
sudo useradd -r username                 # 创建系统用户（无家目录，UID < 1000）

# 创建用户后设置密码
sudo passwd username                     # 设置密码
```

### 修改用户

```bash
sudo usermod -l newname oldname          # 修改用户名
sudo usermod -d /new/home username       # 修改家目录路径
sudo usermod -m -d /new/home username    # 移动家目录到新位置
sudo usermod -s /bin/zsh username        # 修改登录 Shell
sudo usermod -L username                 # 锁定用户（禁止登录）
sudo usermod -U username                 # 解锁用户
sudo usermod -aG group1,group2 user      # 添加用户到附加组（推荐用 -aG）
sudo usermod -G group1,group2 user       # 覆盖设置附加组（⚠️ 会移除不在列表中的组）
sudo usermod -e 2026-12-31 username      # 设置账户过期日期
sudo usermod -f 7 username               # 密码过期后宽限天数
```

### 删除用户

```bash
sudo userdel username                    # 删除用户（保留家目录和邮件）
sudo userdel -r username                 # 删除用户及家目录、邮件
sudo userdel -f username                 # 强制删除（即使正在登录）
```

### 密码管理

```bash
passwd                                   # 修改当前用户密码
sudo passwd username                     # 修改指定用户密码（root 可用）
sudo passwd -l username                  # 锁定用户密码
sudo passwd -u username                  # 解锁用户密码
sudo passwd -d username                  # 删除密码（空密码登录）
sudo passwd -S username                  # 查看密码状态
sudo passwd -n 7 username                # 设置最短使用天数（7天内不能改）
sudo passwd -x 90 username               # 设置最长使用天数（90天后必须改）
sudo passwd -w 7 username                # 设置过期前警告天数
sudo passwd -i 5 username                # 设置过期后宽限天数
```

---

## 3. 用户组管理

### 查看组信息

```bash
groups                            # 查看当前用户所属组
groups username                   # 查看指定用户所属组
id username                       # 查看用户 UID 和所有 GID
cat /etc/group                    # 查看所有组
getent group                      # 查看所有组（支持 LDAP）
```

**`/etc/group`** — 用户组信息：

```
组名:组密码占位符:GID:组成员
sudo:x:27:user1,user2
docker:x:999:user1
```

### 创建组

```bash
sudo groupadd groupname            # 创建新组
sudo groupadd -g 1005 groupname    # 指定 GID
sudo groupadd -r groupname         # 创建系统组（GID < 1000）
```

### 修改组

```bash
sudo groupmod -n newname oldname   # 重命名组
sudo groupmod -g 1005 groupname    # 修改 GID
```

### 删除组

```bash
sudo groupdel groupname            # 删除组
```

### 管理组成员

```bash
sudo gpasswd -a user groupname     # 将用户添加到组
sudo gpasswd -d user groupname     # 从组中移除用户
sudo gpasswd -M user1,user2 groupname  # 设置组成员列表（覆盖原有）
```

---

## 4. 文件权限管理

### 权限基础

Linux 使用 9 位权限位控制文件和目录的访问：

```
-rw-r--r--  1 user group  1024 Jul 14 10:30 file.txt
^ ^^^^^^^^
| ||||||||
| ||||||└─ 其他用户权限 (others)
| |||||└─── 所属组权限 (group)
| ||||└──── 所有者权限 (user/owner)
| |||└───── 特殊权限位
| ||└────── 文件类型（- 文件, d 目录, l 链接）
```

| 权限 | 数值 | 对文件 | 对目录 |
|------|------|--------|--------|
| `r`（读） | 4 | 查看文件内容 | 列出目录内容 |
| `w`（写） | 2 | 修改文件内容 | 创建/删除文件 |
| `x`（执行） | 1 | 运行文件 | 进入目录（cd）|

### 修改权限 — chmod

```bash
# 符号模式
chmod u+x file.sh                   # 给所有者添加执行权限
chmod g+w file.txt                  # 给组添加写权限
chmod o-r file.txt                  # 移除其他人的读权限
chmod a+x file.sh                   # 给所有人添加执行权限
chmod u=rwx,g=rx,o=r file.txt       # 设置精确权限
chmod -R a+X dir/                   # 递归给目录加执行权限（不改变文件）

# 八进制模式
chmod 755 script.sh                 # rwxr-xr-x（常见可执行文件）
chmod 644 file.txt                  # rw-r--r--（常见普通文件）
chmod 600 private.key               # rw-------（私钥文件）
chmod 700 private_dir/              # rwx------（私有目录）
chmod 777 file                      # rwxrwxrwx（⚠️ 不安全，谨慎使用）
chmod -R 755 webroot/               # 递归设置目录权限
```

### 修改所有者 — chown

```bash
sudo chown user file.txt            # 修改文件所有者
sudo chown user:group file.txt      # 修改所有者和组
sudo chown :group file.txt          # 只修改组
sudo chown -R user:group /path/     # 递归修改目录
```

### 特殊权限

| 权限 | 符号 | 含义 |
|------|------|------|
| SUID | `u+s` (4xxx) | 以文件所有者的身份执行 |
| SGID | `g+s` (2xxx) | 以文件所属组的身份执行（文件）；新文件继承目录的组（目录）|
| Sticky Bit | `+t` (1xxx) | 仅文件所有者可删除（如 /tmp）|

```bash
# 设置特殊权限
chmod u+s /usr/bin/program          # 设置 SUID
chmod g+s /shared/dir               # 设置 SGID（目录）
chmod +t /tmp                       # 设置粘滞位

# 查看特殊权限
ls -la /usr/bin/passwd              # -rwsr-xr-x（s 表示 SUID）
ls -la /tmp                         # drwxrwxrwt（t 表示粘滞位）
```

---

## 5. 权限切换

### su — 切换用户

```bash
su                                   # 切换到 root（不加载环境）
su -                                 # 切换到 root 并加载环境变量（推荐）
su - username                        # 切换到指定用户
su -c "command"                      # 以其他用户身份执行单个命令
su -c "systemctl restart nginx"      # 以 root 执行命令
```

### sudo — 以超级用户执行

```bash
sudo command                         # 以 root 执行命令
sudo -u user command                 # 以指定用户执行命令
sudo -i                              # 登录到 root 环境（同 su -）
sudo -s                              # 以 root 启动 Shell
sudo -l                              # 列出当前用户可执行的 sudo 命令
sudo -k                              # 清除 sudo 缓存（下次需要密码）
sudo -v                              # 刷新 sudo 缓存（延长超时）
sudo -b command                      # 后台执行命令
sudo -E command                      # 保留当前环境变量
```

### sudoers 配置

```bash
sudo visudo                          # 安全编辑 sudoers 文件
```

配置示例：

```
# 允许 user1 执行所有命令
user1 ALL=(ALL) ALL

# 允许 user1 无需密码执行所有命令
user1 ALL=(ALL) NOPASSWD: ALL

# 允许 group1 组成员执行所有命令
%group1 ALL=(ALL) ALL

# 允许 user1 只执行特定命令
user1 ALL=(ALL) /usr/bin/systemctl, /usr/bin/apt
```

---

## 6. 常用管理命令速查

| 命令 | 说明 | 示例 |
|------|------|------|
| `whoami` | 显示当前用户名 | `whoami` |
| `id` | 显示用户 ID 和组信息 | `id username` |
| `last` | 查看最近登录记录 | `last -10` |
| `lastb` | 查看登录失败记录 | `sudo lastb` |
| `lastlog` | 所有用户最后登录时间 | `lastlog` |
| `finger` | 查看用户详细信息 | `finger username` |
| `chsh` | 修改登录 Shell | `chsh -s /bin/zsh` |
| `chfn` | 修改用户信息 | `chfn username` |
| `logname` | 显示登录时用户名 | `logname` |
| `users` | 显示当前登录用户列表 | `users` |
| `groups` | 显示用户所属组 | `groups username` |
| `newgrp` | 切换当前用户的有效组 | `newgrp docker` |