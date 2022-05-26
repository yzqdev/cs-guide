# Crontab 介绍


## Crontab 安装

- 查看是否已安装：
 - CentOS：`rpm -qa | grep cron`
 - Ubuntu：`dpkg -l | grep cron`

- 安装（一般系统是集成的）：
 - CentOS 6 / 7：`sudo yum install -y vixie-cron crontabs`
 - Ubuntu：`sudo apt-get install -y cron`

- 服务常用命令
	- CentOS 6
		- `service crond start` 启动服务
		- `service crond stop` 关闭服务
		- `service crond restart` 重启服务
	- CentOS 7
		- `systemctl start crond` 启动服务
		- `systemctl restart crond` 重新启动服务
		- `systemctl status crond` 加入自启动
		- `systemctl stop crond` 关闭服务


## Crontab 服务器配置文件常用参数

- 配置文件介绍（记得先备份）：`sudo vim /etc/crontab`
- 注意：不要在配置文件里面写相对路径
 - 该配置格式解释：
    - ![Crontab 服务器配置文件常用参数](../images/Crontab-a-1.jpg)
 - 常用例子介绍：
    - `30 21 * * * service httpd restart`         #每晚的 21:30 重启 apache
    - `30 21 * * 6,0 service httpd restart`       #每周六、周日的 21:30 重启 apache
    - `45 4 1,10,22 * * service httpd restart`    #每月的 1、10、22 日的 4:45 重启 apache
    - `45 4 1-10 * * service httpd restart`       #每月的 1 到 10 日的 4:45 重启 apache
    - `*/2 * * * * service httpd restart`         #每隔两分钟重启 apache
    - `1-59/2 * * * * service httpd restart`      #每隔两分钟重启 apache（这个比较特殊：1-59/2 这个表示过掉0分，从 1 分开始算，每隔两分执行，所以 1 分执行了，3 分执行了，5 分执行了....都是奇数进行执行。默认的 */2 都是偶数执行。）
    - `* */2 * * * service httpd restart`         #每隔两小时重启 apache
    - `0 23-7/2 * * * service httpd restart`      #晚上 11 点到早上 7 点之间，每隔 2 个小时重启 apache
    - `0-59/30 18-23 * * * service httpd restart` #每天 18:00 到 23：00 之间，每隔 30 分钟重启 apache（方法一）
    - `0,30 18-23 * * * service httpd restart`    #每天 18:00 到 23：00 之间，每隔 30 分钟重启 apache（方法二）
    - `0 4 * * sun root /opt/shell/crontab-redis-restart.sh`    #每周日 4:00 执行一个脚本（root 用户运行，有些脚本不指定用户会报：ERROR (getpwnam() failed）
- 更多例子可以看：<http://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/crontab.html>
- 执行记录日志：`tail -f /var/log/cron`（如果发现任务不执行，可以来这里盯着日志看）


## Crontab 权限问题

- 一般默认只有 root 用户可以使用
- 如果要指定某个用户可以使用，可以在 /etc/cron.allow 添加（不存在文件就创建一个）
- 如果要指定某个用户不可以使用，可以在 /etc/cron.deny 添加（不存在文件就创建一个）
- 如果一个用户同时在两个文件都存在，那则以 allow 为准

## Crontab 不执行

- Crontab 不执行原因有很多，可以 Google 搜索：`Crontab 不执行`，这里不多说。

## Crontab 资料

- <http://www.imooc.com/video/4498> 
- <http://www.centoscn.com/image-text/config/2015/0901/6096.html> 
