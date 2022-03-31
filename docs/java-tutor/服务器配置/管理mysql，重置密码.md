# mysql重置密码

## 配置source

[https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)
下载mysql8的config文件,然后在ubuntu上安装

```
sudo dpkg -i mysql_.deb
sudo apt update 
sudo apt-get install mysql-server
```

然后就安装好了

## 配置mysql的远程root用户访问权限

1. 命令行登录 mysql,输入用户名，密码

```bash
# mysql -u root -p
```

2.切换到 mysql库

```php
use mysql;
```

3.查看用户表,可以看到当前host是localhost,只允许本地访问

```ruby
mysql> select host,user from user;
+-----------+------------------+
| host      | user             |
+-----------+------------------+
| localhost | root             |
+-----------+------------------+
1 rows in set (0.00 sec)
```

4.更新user用户表

```tsx
mysql> update user set `host` = '%'  where `user` = 'root'  LIMIT 1;
```

5.分配所有访问权限,如果已分配过，该步骤可跳过

```bash
mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root密码' WITH GRANT OPTION;
```

6.强制刷新权限

```undefined
mysql> flush privileges;
```

7.再次查看用户表,root用户的host变成%，即允许所有的ip远程访问，如果需要指定具体的ip，就写上具体的ip即可

```ruby
mysql> select host,user from user;
+-----------+------------------+
| Host      | User             |
+-----------+------------------+
| %         | root             |
+-----------+------------------+
1 rows in set (0.00 sec)
```

## 修改mysql配置文件my.cnf

1.使用命令`netstat -an|grep 3306` 查看端口监听状态如下所示，绑定了127.0.0.1，只允许本地访问，需要修改配置文件：

```ruby
# netstat -an|grep 3306
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN
```

2.修改my.cnf，注释掉`bind-address 127.0.0.1`属性，修改后如下图所示

![bind](https://upload-images.jianshu.io/upload_images/6597489-5e9f258ab9966494.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/477/format/webp#crop=0&crop=0&crop=1&crop=1&id=xjPeI&originHeight=71&originWidth=477&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

注释掉bind-address

3.重启mysql服务`service mysql restart`,再次使用命令`netstat -an|grep 3306`查看端口监听状态

```ruby
# netstat -an|grep 3306
tcp        0      0 127.0.0.1:55074         127.0.0.1:3306          TIME_WAIT  
tcp6       0      0 :::3306                 :::*                    LISTEN
```

## 配置阿里云安全组规则

登录阿里云进入控制台，依次访问**网络和安全->安全组->配置规则**，在入方向上开放MySQL监听端口3306即可，如下所示

![](https://upload-images.jianshu.io/upload_images/6597489-03199ab0f8ad6c89.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/943/format/webp#crop=0&crop=0&crop=1&crop=1&id=ggs1O&originHeight=66&originWidth=943&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

开放mysql的3306端口

到此，阿里云服务器的MYSQL数据库远程访问开启成功，使用客户端测试连接成功。

​

## mysql

注意一点
`Java时间比数据库时间早8小时，设置 serverTimezone=Asia/Shanghai`
​

### 忘记密码

[https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html#resetting-permissions-windows](https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html#resetting-permissions-windows)
