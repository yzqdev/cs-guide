# crontab — 定时任务调度

`crontab` 命令用于在 Linux 系统中配置定时执行的任务。通过 crontab，用户可以在指定的时间间隔（分钟、小时、日、月、周）执行系统指令或 shell 脚本，适用于周期性的日志分析、数据备份、系统维护等场景。

## 命令格式

```bash
crontab [-u user] file
crontab [-u user] [ -e | -l | -r ]
```

## 命令参数

| 参数 | 说明 |
|------|------|
| `-u user` | 指定操作用户的 crontab 服务 |
| `-e` | 编辑当前用户的 crontab 文件 |
| `-l` | 显示当前用户的 crontab 内容 |
| `-r` | 删除当前用户的 crontab 文件 |
| `-i` | 删除前给出确认提示（与 `-r` 配合使用）|

## 文件格式

```
分钟 小时 日 月 星期 要运行的命令
```

| 字段 | 范围 | 说明 |
|------|------|------|
| 分钟 | 0-59 | 每小时的第几分钟 |
| 小时 | 0-23 | 每天的第几小时 |
| 日 | 1-31 | 每月的第几天 |
| 月 | 1-12 | 每年的第几月 |
| 星期 | 0-7 | 0 和 7 均表示星期日 |
| 命令 | - | 要执行的命令或脚本 |

### 特殊符号

| 符号 | 说明 |
|------|------|
| `*` | 表示任意值 |
| `,` | 枚举多个值，如 `1,3,5` |
| `-` | 表示范围，如 `1-5` |
| `/` | 表示步长，如 `*/5` 表示每 5 个单位 |

## 使用示例

### 编辑 crontab

```bash
$ crontab -e
```

### 基本示例

```bash
# 每晚 21:30 重启 Apache
30 21 * * * service httpd restart

# 每周六、周日的 21:30 重启 Apache
30 21 * * 6,0 service httpd restart

# 每月的 1、10、22 日的 4:45 重启 Apache
45 4 1,10,22 * * service httpd restart

# 每月的 1 到 10 日的 4:45 重启 Apache
45 4 1-10 * * service httpd restart

# 每隔 2 分钟重启 Apache
*/2 * * * * service httpd restart

# 每隔 2 小时重启 Apache
* */2 * * * service httpd restart

# 晚上 23 点到早上 7 点，每隔 2 小时重启 Apache
0 23-7/2 * * * service httpd restart

# 每天 18:00 到 23:00，每隔 30 分钟重启 Apache
0,30 18-23 * * * service httpd restart
```

### 定时执行脚本

```bash
# 每周日 4:00 执行备份脚本
0 4 * * sun /opt/shell/backup.sh

# 每天凌晨 3:00 清理日志
0 3 * * * /opt/shell/clean-logs.sh
```

### 查看 crontab 内容

```bash
$ crontab -l
```

### 删除 crontab

```bash
$ crontab -r
$ crontab -i -r    # 删除前确认
```

## 注意事项

### 环境变量

crontab 执行时不会加载用户的环境变量，因此需要在脚本中显式设置：

```bash
# 使用绝对路径
0 3 * * * /usr/local/bin/php /opt/scripts/cron.php

# 或先加载环境变量
0 3 * * * source /etc/profile; /opt/scripts/backup.sh
```

### 日志输出重定向

crontab 默认会将输出通过邮件发送给用户，建议重定向到日志文件或丢弃：

```bash
# 将输出追加到日志文件
30 3 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1

# 丢弃所有输出
30 3 * * * /opt/scripts/backup.sh > /dev/null 2>&1
```

### 调试方法

```bash
# 查看 crontab 执行日志
$ tail -f /var/log/cron

# 检查 crontab 是否正在运行
$ systemctl status crond
```

## 参考

- [crontab 详细教程](../awesome-shell/cron.md)
- `man crontab` — 查看完整帮助文档
- `man 5 crontab` — 查看 crontab 文件格式说明