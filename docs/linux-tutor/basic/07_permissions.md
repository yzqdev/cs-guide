---
order: 7
---

# 用户与权限

Linux 是多用户系统，权限管理是其安全性的基础。

## 用户与组

### 查看用户

```bash
whoami                # 当前用户名
id                    # 显示用户 ID 和组 ID
id username           # 查看指定用户
users                 # 当前登录的用户列表
who                   # 当前登录的详细信息
```

### 用户管理

```bash
# 添加用户（需要 root 权限）
sudo useradd -m newuser    # 创建用户并创建 home 目录
sudo passwd newuser         # 设置密码

# 删除用户
sudo userdel -r username    # -r 同时删除 home 目录

# 切换用户
su username                 # 切换用户
su - username               # 切换用户并加载环境变量
sudo -i                     # 切换到 root
```

### 组管理

```bash
groups                      # 查看当前用户所属的组
groups username             # 查看指定用户的组
sudo groupadd devops        # 创建组
sudo usermod -aG devops username  # 将用户加入组（-aG 追加）
sudo gpasswd -d username devops   # 将用户从组移除
```

### 关键文件

```bash
/etc/passwd     # 用户信息（用户名:密码:UID:GID:描述:home:shell）
/etc/shadow     # 加密密码
/etc/group      # 组信息
```

## 文件权限

### 权限表示

`ls -l` 输出的第一列是权限信息，例如 `-rwxr-xr--`：

```
- rwx r-x r--
^ ^^^ ^^^ ^^^
| 用户 组  其他
文件类型
```

- 文件类型：`-` 普通文件，`d` 目录，`l` 链接
- 权限位：`r` 读，`w` 写，`x` 执行，`-` 无权限

### chmod — 修改权限

**符号模式：**

```bash
chmod u+x file.sh          # 给文件所有者加执行权限
chmod g-w file.txt         # 移除组的写权限
chmod o+r file.txt         # 给其他人加读权限
chmod a+x script.sh        # 给所有人加执行权限
chmod u=rwx,g=rx,o= file   # 精确设置：所有者rwx，组rx，其他人无
```

**数字模式：**

每类用户的权限用数字表示：`r=4, w=2, x=1`

```bash
chmod 755 script.sh    # rwxr-xr-x (所有者全部，其他只读+执行)
chmod 644 file.txt     # rw-r--r-- (所有者读写，组和其他只读)
chmod 600 secret.txt   # rw------- (仅所有者读写)
chmod 700 private/     # rwx------ (仅所有者完全访问)
chmod 777 file         # rwxrwxrwx (所有人完全访问，不推荐)
```

常用权限速查：

| 数字 | 权限 | 含义 |
|------|------|------|
| 755 | rwxr-xr-x | 程序文件、目录 |
| 644 | rw-r--r-- | 普通文件 |
| 600 | rw------- | 私密文件 |
| 700 | rwx------ | 私密目录 |

### chown — 修改所有者

```bash
sudo chown user file.txt               # 修改文件所有者
sudo chown user:group file.txt          # 同时修改用户和组
sudo chown :group file.txt              # 只修改组
sudo chown -R user:group directory/     # 递归修改目录
```

### umask — 默认权限

```bash
umask             # 查看当前 umask（通常是 022）
umask 077         # 设置 umask（更严格，新文件仅所有者可读写）
```

权限计算：文件基础 `666` - umask，目录基础 `777` - umask

## sudo — 提升权限

```bash
sudo command              # 以 root 执行命令
sudo -u user command      # 以指定用户执行命令
sudo -i                   # 切换到 root shell
sudo -l                   # 查看当前用户可执行的 sudo 命令
```

### 配置 sudo

```bash
sudo visudo               # 编辑 sudo 配置文件
```

标准配置行：`username ALL=(ALL:ALL) ALL`

## 特殊权限

```bash
# SUID (4xxx) — 以文件所有者的身份执行
chmod u+s /usr/bin/passwd
# 示例：/usr/bin/passwd 有 SUID，普通用户可以修改密码

# SGID (2xxx) — 以文件所属组的身份执行
chmod g+s directory/

# Sticky Bit (1xxx) — 只有文件所有者能删除
chmod +t /tmp
# 示例：/tmp 有 sticky bit
```

## 本章小结

```bash
# 权限管理三步曲
ls -l file              # 1. 查看权限
chmod 755 file          # 2. 修改权限
chown user:group file   # 3. 修改所有者
```

| 命令 | 作用 |
|------|------|
| `chmod` | 修改文件权限 |
| `chown` | 修改文件所有者 |
| `sudo` | 以 root 权限执行 |
| `umask` | 设置默认权限 |
| `id` | 查看用户身份 |

## 练习

1. 用 `id` 查看当前用户的 UID、GID 和所属组
2. 用 `ls -l` 查看 `/etc/shadow` 的权限，为什么普通用户不能读？
3. 创建一个脚本 `test.sh`，用 `chmod +x` 给它加上执行权限
4. 创建一个新用户，设置密码，用 `su` 切换过去
5. 创建一个目录，设置 `chmod 700`，验证其他用户无法访问
