# WSL 中访问 GitHub

WSL 默认会自动生成 `/etc/hosts` 文件，覆盖手动配置的 hosts，导致无法加速 GitHub。

## 禁止自动生成 hosts

编辑 `/etc/wsl.conf`：

```ini
[network]
generateHosts = false
```

重启 WSL 生效：

```powershell
wsl --shutdown
```

## 设置 hosts 写入权限

```bash
sudo chmod 777 /etc/hosts
```

## 自动更新 GitHub Hosts

创建 `~/github.sh` 脚本：

```bash
#!/bin/bash
sed -i "/# GitHub520 Host Start/Q" /etc/hosts && curl https://raw.hellogithub.com/hosts >> /etc/hosts
```

添加执行权限：

```bash
chmod +x ~/github.sh
```

## 配置定时任务

```bash
crontab -e
# 每小时更新一次
0 */1 * * * ~/github.sh
```

## 手动更新

```bash
~/github.sh
```

## 参考

- [GitHub520](https://github.com/521xueweihan/GitHub520) — 自动更新 GitHub hosts 的项目
