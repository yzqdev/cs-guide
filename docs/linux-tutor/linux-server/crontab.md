# Crontab 定时任务

> 详细用法请参考 [cron.md](../awesome-shell/cron.md)。本文仅保留服务器配置要点。

## 一、安装

```bash
# CentOS
sudo yum install -y vixie-cron crontabs

# Ubuntu
sudo apt-get install -y cron
```

## 二、服务管理

```bash
# CentOS 6
service crond start        # 启动
service crond stop         # 停止
service crond restart      # 重启

# CentOS 7+
systemctl start crond      # 启动
systemctl restart crond    # 重启
systemctl status crond     # 状态
systemctl stop crond       # 停止
```

## 三、配置格式

```bash
# 编辑配置
sudo vim /etc/crontab

# 格式：分 时 日 月 周 用户 命令
# 注意：不要使用相对路径
```

### 常用示例

```bash
30 21 * * * root service httpd restart              # 每晚 21:30 重启
30 21 * * 6,0 root service httpd restart             # 周六日 21:30 重启
45 4 1,10,22 * * root service httpd restart          # 每月1/10/22日 4:45
*/2 * * * * root service httpd restart               # 每2分钟
0 23-7/2 * * * root service httpd restart            # 23点到7点，每2小时
0,30 18-23 * * * root service httpd restart          # 18-23点，每30分钟
0 4 * * sun root /opt/shell/restart.sh               # 每周日 4:00 执行脚本
```

## 四、权限控制

```bash
# 允许用户使用 crontab
echo "username" > /etc/cron.allow

# 禁止用户使用 crontab
echo "username" > /etc/cron.deny

# 两个文件同时存在时，allow 优先
```

## 五、调试

```bash
# 查看 crontab 执行日志
tail -f /var/log/cron

# 如果任务不执行，检查日志中的错误信息
```

## 参考

- [cron.md 详细教程](../awesome-shell/cron.md)
- <http://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/crontab.html>