---
index: 3
---
# Crontab 定时任务详解

> 定时任务是 Linux 服务器运维的核心功能之一。本文详细讲解 crontab 的用法、配置和最佳实践。

## 一、命令格式

```bash
crontab [-u user] file
crontab [-u user] [ -e | -l | -r ]
```

## 二、命令参数

| 参数 | 说明 |
|------|------|
| `-u user` | 指定操作用户的 crontab 服务 |
| `-e` | 编辑当前用户的 crontab 文件 |
| `-l` | 显示当前用户的 crontab 内容 |
| `-r` | 删除当前用户的 crontab 文件 |
| `-i` | 删除前给出确认提示（与 `-r` 配合使用）|

## 三、文件格式

```
分(0-59) 时(0-23) 日(1-31) 月(1-12) 星期(0-7) 命令
```

### 特殊符号

| 符号 | 说明 | 示例 |
|------|------|------|
| `*` | 任意值 | `*` 表示每分钟 |
| `,` | 枚举多个值 | `1,3,5` 表示第1、3、5分钟 |
| `-` | 范围 | `1-5` 表示第1到第5分钟 |
| `/` | 步长 | `*/5` 表示每5分钟 |
| `@yearly` | 每年 | `0 0 1 1 *` |
| `@monthly` | 每月 | `0 0 1 * *` |
| `@weekly` | 每周 | `0 0 * * 0` |
| `@daily` | 每天 | `0 0 * * *` |
| `@hourly` | 每小时 | `0 * * * *` |
| `@reboot` | 重启时 | 系统启动时执行 |

## 四、常用实例

### 基础定时

```bash
# 每分钟执行一次
* * * * * command

# 每小时的第3和第15分钟执行
3,15 * * * * command

# 每5分钟执行一次
*/5 * * * * command

# 每晚 21:30 重启服务
30 21 * * * service httpd restart

# 每天 0 点清空日志
0 0 * * * cat /dev/null > /var/log/syslog
```

### 日期组合

```bash
# 每月1、10、22日的 4:45 重启
45 4 1,10,22 * * service httpd restart

# 每周六、周日的 1:10 重启
10 1 * * 6,0 service httpd restart

# 每月的1到10日的 4:45 重启
45 4 1-10 * * service httpd restart

# 每周一至周五的 9:30 执行备份
30 9 * * 1-5 /opt/scripts/backup.sh
```

### 时间范围

```bash
# 每天 18:00 至 23:00，每隔30分钟
0,30 18-23 * * * command

# 晚上 23 点到早上 7 点，每隔 2 小时
0 23-7/2 * * * command

# 工作日（周一至周五）的 9:00-18:00，每15分钟
*/15 9-18 * * 1-5 command
```

### 特殊场景

```bash
# 每小时执行 /etc/cron.hourly 目录内的脚本
01 * * * * root run-parts /etc/cron.hourly

# 一月一号的 4 点重启
0 4 1 1 * /etc/init.d/httpd restart

# 每月的4号与每周一到周三的11点
0 11 4 * 1-3 /etc/init.d/httpd restart

# 每隔两天的上午8点到11点的第3和第15分钟
3,15 8-11 */2 * * command
```

## 五、服务管理

```bash
# CentOS 7+
systemctl start crond
systemctl restart crond
systemctl status crond
systemctl stop crond

# CentOS 6
service crond start
service crond restart
service crond status
```

## 六、注意事项

### 1. 环境变量问题

crontab 执行时不会加载用户的环境变量，需在脚本中显式指定：

```bash
# 错误写法（不执行）
0 3 * * * /opt/scripts/backup.sh

# 正确写法：加载环境变量
0 3 * * * source /etc/profile; /opt/scripts/backup.sh

# 或使用绝对路径
0 3 * * * /usr/local/bin/php /opt/scripts/cron.php
```

### 2. 日志输出重定向

每条任务调度执行完毕，系统都会将输出通过邮件发送给用户，可能导致日志过大：

```bash
# 丢弃输出
0 */3 * * * /usr/local/apache2/apachectl restart >/dev/null 2>&1

# 追加到日志文件
30 3 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1
```

### 3. 常见问题

| 问题 | 解决方案 |
|------|----------|
| 任务不执行 | 检查 `tail -f /var/log/cron` 查看日志 |
| % 符号报错 | crontab 中 % 需要转义：`\%` |
| 路径问题 | 脚本中全部使用绝对路径 |
| 权限问题 | 检查脚本是否有执行权限 `chmod +x` |

### 4. 权限控制

```bash
# 允许某个用户使用 crontab
echo "username" > /etc/cron.allow

# 禁止某个用户使用 crontab
echo "username" > /etc/cron.deny

# 两个文件同时存在时，allow 优先
```

## 七、实战案例

### 日志轮转与清理

```bash
# 每天凌晨 3 点压缩并清理 7 天前的日志
0 3 * * * find /var/log/nginx -name "*.log" -mtime +7 -exec gzip {} \;
0 4 * * * find /var/log/nginx -name "*.log.gz" -mtime +30 -delete
```

### 数据库自动备份

```bash
# 每天凌晨 2 点备份 MySQL
0 2 * * * /usr/bin/mysqldump -u root -p密码 数据库名 > /backup/db_$(date +\%Y\%m\%d).sql

# 保留最近 7 天备份，删除更早的
0 3 * * * find /backup -name "db_*.sql" -mtime +7 -delete
```

### 系统健康巡检

```bash
# 每 5 分钟检查 Nginx 是否存活，宕机则重启
*/5 * * * * /usr/local/nginx/sbin/nginx -t && /usr/local/nginx/sbin/nginx -s reload || /usr/local/nginx/sbin/nginx

# 每天 8 点发送磁盘使用报告
0 8 * * * df -h | mail -s "Disk Report" admin@example.com
```

## 参考

- `man crontab` — 查看完整帮助文档
- `man 5 crontab` — 查看 crontab 文件格式