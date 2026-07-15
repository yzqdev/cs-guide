# Bash 常用命令速查

> 服务器运维常用命令速查。详细教程请参考 [awesome-shell 系列](../awesome-shell/00-index.md)。

## 一、基础命令

| 命令 | 功能 |
|------|------|
| `man 命令` / `命令 --help` | 查看命令帮助 |
| `Ctrl+C` | 终止当前命令 |
| `Tab` | 自动补全命令或文件名 |
| `↑/↓` | 历史命令 |
| `Ctrl+R` | 搜索历史命令 |
| `clear` / `Ctrl+L` | 清屏 |
| `history` | 查看历史命令 |
| `pwd` | 显示当前路径 |
| `date` | 查看/设置系统时间 |
| `cal` | 查看日历 |
| `uptime` | 查看系统运行时间、负载 |
| `last` / `lastlog` | 查看最近登录记录 |

## 二、文件目录操作

```bash
ls -la              # 列出所有文件（含隐藏）详细信息
ls -lh              # 人类可读大小
ls -lS              # 按大小排序

cd ..               # 上级目录
cd -                # 上一个目录
cd ~                # 家目录

cp -r src dest      # 递归复制目录
cp -rv src dest     # 显示复制进度

mv file1 file2      # 重命名/移动文件
mkdir -p a/b/c      # 递归创建目录
rm -rf dir          # 强制删除目录（⚠️ 谨慎）

touch file.txt      # 创建空文件
cat -n file.txt     # 查看文件并显示行号
more file.txt       # 分页查看
less file.txt       # 分页查看（支持上下翻页）
```

## 三、查找与搜索

```bash
# 查找文件
find . -name "*.conf"                     # 按名称查找
find / -type f -size +100M                # 查找大于100M的文件
find /opt -type f -size +800M -exec ls -lh {} \;

# 搜索文件内容
grep -r "keyword" /path/                  # 递归搜索
grep -H '安装' *.sh                       # 搜索当前目录下sh文件
ps -ef | grep java                        # 查找java进程

# 定位文件
locate myfile.txt                         # 快速索引查找（需 updatedb 更新索引）
```

## 四、权限管理

```bash
chmod 755 file.sh                         # 设置权限 rwxr-xr-x
chmod -R 777 dir/                         # 递归设置目录权限（⚠️ 谨慎）
chown user:group file                     # 修改文件所有者
chmod 600 mykey.pem                       # SSH 密钥必须600权限

# 用户管理
useradd -m -g group -s /bin/bash user     # 创建用户
userdel -r user                           # 删除用户及家目录
passwd user                               # 修改密码
usermod -aG docker user                   # 将用户添加到组
groupadd groupname                        # 创建组
```

**sudo 授权**：编辑 `/etc/sudoers`，添加：
```
youmeek    ALL=(ALL)    ALL
```

## 五、磁盘与网络

```bash
# 磁盘
df -h                                     # 查看磁盘使用情况
du -sh /opt/                              # 查看目录大小
du -sh ./*                                # 查看当前目录下所有子目录大小
mount /dev/sdb1 /mnt/data                 # 挂载分区
umount /mnt/data                          # 卸载

# 网络
ifconfig                                  # 查看内网IP
curl ifconfig.me                          # 查看外网IP
netstat -tlunp                            # 查看端口和服务
ping -c 4 baidu.com                       # 测试网络连通性
```

## 六、进程管理

```bash
ps -ef | grep java                        # 查找进程
kill -9 PID                               # 强制结束进程
killall java                              # 结束所有java进程
nohup command &                           # 后台运行（退出终端继续）
jobs                                      # 查看后台任务
top / htop                                # 实时进程监控
```

## 七、RPM 包管理

```bash
# 安装
rpm -ivh example.rpm                      # 安装并显示进度

# 查询
rpm -qa | grep jdk                        # 查看是否安装
rpm -ql jdk                               # 查看安装文件列表

# 卸载
rpm -e jdk                                # 卸载
```

## 八、YUM 包管理

```bash
yum install -y httpd                      # 安装
yum remove -y httpd                       # 卸载
yum info httpd                            # 查看版本信息
yum list --showduplicates httpd           # 查看可安装版本
yum install httpd-2.4.6                   # 安装指定版本
```

## 九、wget 下载

```bash
wget -c url                               # 断点续传
wget -b url                               # 后台下载
wget --limit-rate=300k url                # 限速下载
wget -i download.txt                      # 批量下载（URL列表文件）
```

## 十、实用技巧

```bash
# 编辑 hosts 文件
vim /etc/hosts

# 查看配置文件（排除注释）
grep '^[^#]' /etc/openvpn/server.conf
grep '^[^#;]' /etc/your.conf

# 软链接
ln -s /opt/data /opt/logs/data

# 清空文件内容
echo > aa.txt
: > aa.txt

# 复制大量文件（比cp更稳定）
tar cpf - . | tar xpf - -C /opt

# 查找磁盘大文件
du -hm --max-depth=2 | sort -nr | head -12
```

## 参考

- [awesome-shell 教程](../awesome-shell/00-index.md)
- <http://man.linuxde.net>
- <https://www.jianshu.com/p/180fb11a5b96>