# 基础

## 连接数据库

```sql
# mysql –u用户名 [–h主机名或者IP地址,-P端口号] –p密码
# 例子
 mysql -h127.0.0.1 -P3306 -uroot -prootpassword
```

## 远程连接

```sql
# 你想root使用123456从'192.168.188.106'主机连接到mysql服务器 wabg库下面所有表的话。
MySQL> grant all PRIVILEGES on wabg.* to  root@'192.168.188.106'  identified by '123456' WITH GRANT OPTION;
# 你想myuser使用mypassword从任何主机连接到mysql服务器的话
MySQL> grant all PRIVILEGES on *.* to  'myuser'@'%'  identified by 'mypassword' WITH GRANT OPTION;
#然后
flush privileges;
```

## 数据库操作

### 查看数据库

```sql
# 显示数据库
 SHOW DATABASES;

# 选择数据库
USE test;
# 创建一个不存在的数据库
CREATE DATABASE test;
# 查看定义
SHOW CREATE DATABASE test
# 创建一个不知道是否存在的数据库
 CREATE DATABASE if not  exists test;
```

### 删除数据库

```sql

DROP DATABASE test2;
# 删除一个不确定的数据库
drop database if exists test2;
```
