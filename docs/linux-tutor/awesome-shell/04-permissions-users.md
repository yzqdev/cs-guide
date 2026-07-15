---
index: 4
---
# 权限与用户管理

## 一、文件权限基础

Linux 使用 **9 位权限位** 控制文件和目录的访问：

```
-rw-r--r--  1 user group  1024 Jul 14 10:30 file.txt
^ ^^^^^^^^
| ||||||||
| ||||||└─ 其他用户权限 (others)
| ||||||
| |||||└── 所属组权限 (group)
| |||||
| ||||└─── 所有者权限 (user/owner)
| ||||
| |||└──── 特殊权限位
| |||
| ||└───── 文件类型
| ||
类型：- 普通文件, d 目录, l 符号链接, c 字符设备, b 块设备
```

### 权限位含义

| 权限 | 数值 | 对文件 | 对目录 |
|------|------|--------|--------|
| `r` (读) | 4 | 查看文件内容 | 列出目录内容 |
| `w` (写) | 2 | 修改文件内容 | 创建/删除文件 |
| `x` (执行) | 1 | 运行文件（脚本/程序）| 进入目录（cd）|

### 权限的八进制表示

```bash
rwx = 4+2+1 = 7
rw- = 4+2+0 = 6
r-x = 4+0+1 = 5
r-- = 4+0+0 = 4
-wx = 0+2+1 = 3
-w- = 0+2+0 = 2
--x = 0+0+1 = 1
--- = 0+0+0 = 0
```

常见权限组合：

| 权限 | 八进制 | 说明 |
|------|--------|------|
| `-rwx------` | 700 | 仅所有者可读写执行 |
| `-rwxr-xr-x` | 755 | 常见可执行文件/目录 |
| `-rw-r--r--` | 644 | 常见普通文件 |
| `-rw-rw-r--` | 664 | 所有者/组可写，其他人只读 |
| `-rw-------` | 600 | 仅所有者可读写（如私钥）|
| `-rwxr-xr-x` | 755 | 所有用户可执行（如 /usr/bin）|
| `-rwxrwxrwx` | 777 | 所有用户完全控制（⚠️ 不安全）|

---

## 二、`chmod` — 修改文件权限

### 语法

```bash
chmod [选项] 权限 文件...
```

### 常用参数

| 参数 | 说明 |
|------|------|
| `-R` | 递归修改目录及其内容 |
| `-v` | 显示修改过程 |
| `-c` | 只显示发生变化的文件 |
| `-f` | 不显示错误信息 |
| `--reference=RFILE` | 以 RFILE 的权限为准 |

### 符号模式

```bash
u = user（所有者）
g = group（组）
o = others（其他人）
a = all（所有人，等同于 ugo）
+ = 添加权限
- = 移除权限
= = 设置确切的权限
```

### 示例

```bash
# 符号模式
chmod u+x file.sh                   # 给所有者添加执行权限
chmod g+w file.txt                  # 给组添加写权限
chmod o-r file.txt                  # 移除其他人的读权限
chmod a+x file.sh                   # 给所有人添加执行权限
chmod u=rwx,g=rx,o=r file.txt       # 设置精确权限
chmod u=rwx,g=r,o= file.txt         # 其他人无权限
chmod a=r file.txt                  # 所有人只读
chmod -R a+X dir/                   # 递归给目录加执行权限（不改变文件）
chmod u+s file                      # 设置 SUID
chmod g+s file                      # 设置 SGID
chmod +t dir/                       # 设置粘滞位（Sticky Bit）

# 八进制模式
chmod 755 file.sh                   # rwxr-xr-x
chmod 644 file.txt                  # rw-r--r--
chmod 600 private.key               # rw-------
chmod 700 script.sh                 # rwx------
chmod 777 file                      # rwxrwxrwx（⚠️ 不安全）
chmod 755 dir/                      # 目录通用权限
chmod -R 755 dir/                   # 递归设置目录权限
chmod 4755 file                     # 设置 SUID (4xxx)
chmod 2755 file                     # 设置 SGID (2xxx)
chmod 1755 dir/                     # 设置粘滞位 (1xxx)
```

---

## 三、`chown` — 修改文件所有者

### 语法

```bash
chown [选项] 所有者[:组] 文件...
```

### 常用参数

| 参数 | 说明 |
|------|------|
| `-R` | 递归修改 |
| `-v` | 显示过程 |
| `-c` | 只显示变更的文件 |
| `--reference=RFILE` | 以 RFILE 的所有者为准 |

### 示例

```bash
chown user file.txt                 # 修改文件所有者
chown user:group file.txt           # 修改所有者和组
chown :group file.txt               # 只修改组（不修改所有者）
chown user: file.txt                # 修改所有者和组为同一用户
chown -R user:group /path/to/dir    # 递归修改目录
chown --reference=ref.txt target.txt # 以 ref.txt 为准
chown -v user file.txt              # 显示修改过程
```

**注意**：`chown` 通常需要 root 权限。

---

## 四、`chgrp` — 修改文件所属组

```bash
chgrp group file.txt                # 修改文件组
chgrp -R group dir/                 # 递归修改目录
chgrp -v group file.txt             # 显示过程
chgrp --reference=ref.txt file.txt  # 以 ref.txt 的组为准
```

---

## 五、`umask` — 默认权限掩码

`umask` 决定了新创建文件和目录的默认权限。

### 工作原理

- 文件默认：666（rw-rw-rw-）
- 目录默认：777（rwxrwxrwx）
- 实际权限 = 默认权限 - umask 值

### 示例

```bash
umask                           # 查看当前 umask（通常为 0022）
umask 0022                      # 设置 umask

# umask 022：文件 644，目录 755
# umask 002：文件 664，目录 775
# umask 077：文件 600，目录 700
```

| umask | 文件权限 | 目录权限 |
|-------|----------|----------|
| 022 | 644 (rw-r--r--) | 755 (rwxr-xr-x) |
| 002 | 664 (rw-rw-r--) | 775 (rwxrwxr-x) |
| 077 | 600 (rw-------) | 700 (rwx------) |
| 027 | 640 (rw-r-----) | 750 (rwxr-x---) |

---

## 六、特殊权限位

### SUID (Set User ID) — 4xxx

允许用户以文件**所有者**的权限执行该文件。

```bash
chmod u+s file                     # 设置 SUID
chmod 4755 file                    # 同上（八进制）
chmod u-s file                     # 移除 SUID
```

示例：`/usr/bin/passwd` 设置了 SUID，普通用户也能以 root 权限修改密码。

### SGID (Set Group ID) — 2xxx

- 对文件：以文件**所属组**的权限执行
- 对目录：在该目录下创建的文件会自动继承目录的组

```bash
chmod g+s dir/                     # 设置 SGID
chmod 2755 dir/                    # 同上（八进制）
chmod g-s dir/                     # 移除 SGID
```

### Sticky Bit（粘滞位）— 1xxx

在设置了粘滞位的目录中，用户只能删除自己的文件。

```bash
chmod +t /tmp                      # 设置粘滞位
chmod 1777 /tmp                    # 同上（八进制）
chmod -t /tmp                      # 移除粘滞位
```

示例：`/tmp` 目录有粘滞位（`drwxrwxrwt`），防止用户删除别人的临时文件。

### 查看特殊权限

```bash
ls -la /usr/bin/passwd             # 显示 -rwsr-xr-x（s 表示 SUID）
ls -la /tmp                        # 显示 drwxrwxrwt（t 表示粘滞位）
```

---

## 七、用户管理

### 用户信息文件

| 文件 | 说明 |
|------|------|
| `/etc/passwd` | 用户账户信息 |
| `/etc/shadow` | 用户密码（加密存储）|
| `/etc/group` | 用户组信息 |
| `/etc/sudoers` | sudo 权限配置 |

### `useradd` — 创建用户

```bash
useradd username                   # 创建用户
useradd -m username                # 创建用户并创建家目录（推荐）
useradd -m -d /home/custom username # 指定家目录路径
useradd -m -s /bin/bash username   # 指定登录 Shell
useradd -m -G group1,group2 user   # 指定附加组
useradd -m -u 1001 username        # 指定 UID
useradd -m -c "Full Name" user     # 添加注释（全名）
useradd -M username                # 不创建家目录
useradd -r username                # 创建系统用户（无家目录）
```

### `usermod` — 修改用户

```bash
usermod -l newname username        # 修改用户名
usermod -d /new/home username      # 修改家目录
usermod -m -d /new/home username   # 移动家目录到新位置
usermod -s /bin/zsh username       # 修改登录 Shell
usermod -L username                # 锁定用户（禁止登录）
usermod -U username                # 解锁用户
usermod -aG group1,group2 user     # 添加用户到附加组（-a 必须与 -G 一起用）
usermod -G group1,group2 user      # 覆盖设置附加组（⚠️ 会移除其他组）
usermod -e 2026-12-31 username     # 设置账户过期日期
```

### `userdel` — 删除用户

```bash
userdel username                   # 删除用户（保留家目录）
userdel -r username                # 删除用户及家目录、邮件
userdel -f username                # 强制删除（即使正在登录）
```

### `passwd` — 管理密码

```bash
passwd                             # 修改当前用户密码
passwd username                    # 修改指定用户密码（root）
passwd -l username                 # 锁定用户
passwd -u username                 # 解锁用户
passwd -d username                 # 删除密码（空密码登录）
passwd -S username                 # 查看密码状态
passwd -n 7 username               # 设置最短使用天数
passwd -x 90 username              # 设置最长使用天数
passwd -w 7 username               # 设置过期前警告天数
```

### 其他用户相关命令

```bash
id                                 # 查看当前用户信息
id username                        # 查看指定用户信息
id -u username                     # 查看 UID
id -g username                     # 查看 GID
id -G username                     # 查看所有 GID

whoami                             # 显示当前用户名（简短）
who am i                           # 显示登录时用户信息

finger username                    # 查看用户详细信息
chfn username                      # 修改用户信息（全名、电话等）
chsh -s /bin/zsh username          # 修改登录 Shell

groups                             # 查看当前用户所属组
groups username                    # 查看指定用户所属组

last                               # 查看最近登录记录
last -10                           # 最近 10 条记录
last -f /var/log/wtmp              # 查看指定日志文件
lastb                              # 查看登录失败记录
lastlog                            # 查看所有用户最后登录时间
```

---

## 八、用户组管理

### `groupadd` — 创建组

```bash
groupadd groupname                 # 创建新组
groupadd -g 1005 groupname         # 指定 GID
groupadd -r groupname              # 创建系统组
```

### `groupmod` — 修改组

```bash
groupmod -n newname oldname        # 重命名组
groupmod -g 1005 groupname         # 修改 GID
```

### `groupdel` — 删除组

```bash
groupdel groupname                 # 删除组
```

### `gpasswd` — 管理组成员

```bash
gpasswd -a user groupname          # 将用户添加到组
gpasswd -d user groupname          # 从组中移除用户
gpasswd -M user1,user2 groupname   # 设置组成员列表
gpasswd groupname                  # 设置组密码
```

---

## 九、权限切换

### `su` — 切换用户

```bash
su                                 # 切换到 root（需要密码）
su -                               # 切换到 root 并加载环境变量
su - username                      # 切换到指定用户并加载环境
su username                        # 切换到指定用户（不加载环境）
su -c "command"                    # 以其他用户身份执行命令
su -c "systemctl restart nginx"    # 以 root 执行单个命令
```

### `sudo` — 以超级用户执行

```bash
sudo command                       # 以 root 执行命令
sudo -u user command               # 以指定用户执行命令
sudo -i                            # 登录到 root 环境（同 su -）
sudo -s                            # 以 root 启动 Shell
sudo -u www-data command           # 以 www-data 用户执行
sudo -l                            # 列出当前用户可以执行的 sudo 命令
sudo -k                            # 清除 sudo 缓存（下次需要密码）
sudo -v                            # 刷新 sudo 缓存（延长超时）
sudo -b command                    # 后台执行命令
sudo -E command                    # 保留当前环境变量
sudo -H command                    # 设置 HOME 环境变量为目标用户家目录
```

### 编辑 sudoers 文件

```bash
sudo visudo                        # 安全编辑 sudoers 文件
sudo visudo -f /etc/sudoers.d/custom  # 编辑独立文件
```

**sudoers 配置示例**：

```
# 允许 user1 执行所有命令
user1 ALL=(ALL) ALL

# 允许 user1 无需密码执行所有命令
user1 ALL=(ALL) NOPASSWD: ALL

# 允许 group1 成员执行所有命令
%group1 ALL=(ALL) ALL

# 允许 user1 仅执行特定命令
user1 ALL=(ALL) /usr/bin/systemctl, /usr/bin/apt

# 限制某些命令
user1 ALL=(ALL) ALL, !/usr/bin/su, !/usr/bin/passwd root
```

---

## 十、`lsattr` 和 `chattr` — 文件属性

Linux 的扩展文件属性，提供比权限更底层的控制。

### `chattr` — 修改文件属性

```bash
chattr +i file.txt                 # 设置不可变属性（无法修改、删除、重命名）
chattr -i file.txt                 # 移除不可变属性
chattr +a file.txt                 # 只能追加（不能覆盖或删除）
chattr -a file.txt                 # 移除追加属性
chattr +u file.txt                 # 可恢复（删除后可恢复）
chattr +e file.txt                 # 使用 extent 存储（大文件）
chattr +A file.txt                 # 不更新 atime（访问时间）
chattr +s file.txt                 # 安全删除（覆盖后删除）
chattr +S file.txt                 # 同步更新（立即写入磁盘）
```

### `lsattr` — 查看文件属性

```bash
lsattr file.txt                    # 查看文件属性
lsattr -a                          # 查看所有文件包括隐藏文件
lsattr -R                          # 递归查看
lsattr -d                          # 查看目录属性
```

### 常见应用

```bash
# 保护重要配置文件
sudo chattr +i /etc/passwd          # 防止用户被添加/删除
sudo chattr +i /etc/shadow          # 防止密码被修改
sudo chattr +i /etc/ssh/sshd_config # 防止 SSH 配置被修改
sudo chattr -i /etc/passwd          # 需要修改时先移除不可变属性

# 日志文件仅追加
sudo chattr +a /var/log/syslog      # 日志只能追加，防止篡改
```