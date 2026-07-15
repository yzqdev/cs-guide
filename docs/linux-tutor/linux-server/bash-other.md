# Bash 其他常用命令

> 本文件内容已整合到 [Bash.md](./Bash.md)，此处仅保留 RPM/YUM 补充说明。

## RPM 包管理

```bash
# 安装
rpm -ivh example.rpm              # 安装并显示进度

# 查询
rpm -qa | grep jdk                # 查看是否安装
rpm -ql jdk                       # 查看安装文件列表

# 卸载
rpm -e jdk                        # 卸载
```

## YUM 软件管理

```bash
yum install -y httpd              # 安装
yum remove -y httpd               # 卸载
yum info httpd                    # 查看版本信息
yum list --showduplicates httpd   # 查看可安装版本
yum install httpd-版本号          # 安装指定版本
```

## 实用技巧

```bash
# 查看配置文件（排除注释行）
grep '^[^#]' /etc/openvpn/server.conf
grep '^[^#;]' /etc/your.conf
```

## 参考

- [awesome-shell 教程](../awesome-shell/00-index.md)
- <http://man.linuxde.net>
- <https://www.jianshu.com/p/180fb11a5b96>