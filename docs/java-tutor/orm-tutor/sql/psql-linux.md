# linux安装postgres

## 1. 官网

```
https://www.postgresql.org/download/linux/ubuntu/
```

## 2. 安装

```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install postgresql # 默认安装最新14
```

## 3. 初始化账号密码

```
sudo -u postgres psql
postgres=# \password;
please enter password:
please reenter password:
# 若要删除该管理员的密码（非必须）
# sudo -u postgres psql -d postgres
```

## 4. 配置远程访问

```
sudo vim /etc/postgresql/14/main/postgresql.conf
```

![img](https://img2020.cnblogs.com/blog/1586673/202112/1586673-20211228142507326-2131564313.png)

```
sudo vim /etc/postgresql/14/main/pg_hba.conf
```

![img](https://img2020.cnblogs.com/blog/1586673/202112/1586673-20211228142622085-560736052.png)

 重启服务生效

```
sudo systemctl restart postgresql.service
```

### 1. 修改linux系统postgres用户的密码

PostgreSQL会创建一个默认的linux用户postgres，修改该用户密码的方法如下：

步骤一：删除用户postgres的密码

```
sudo` `passwd` `-d postgre
```

步骤二：设置用户postgres的密码

```
sudo` `-u postgres ``passwd
```

系统提示输入新的密码

Enter new UNIX password:

Retype new UNIX password:

```
passwd``: password updated successfully
```

### 2. 修改PostgreSQL数据库默认用户postgres的密码

PostgreSQL数据库创建一个postgres用户作为数据库的管理员，密码随机，所以需要修改密码，方式如下：

步骤一：登录PostgreSQL

```
sudo` `-u postgres psql
```

步骤二：修改登录PostgreSQL密码

```
ALTER USER postgres WITH PASSWORD ``'postgres'``;
```

**注：**

- 密码postgres要用引号引起来
- 命令最后有分号
\5. 测试远程访问，输入之前修改的密码即可

```
master@master:~$ psql -U postgres -h 192.168.10.248 
Password for user postgres: 
psql (13.5 (Ubuntu 13.5-1.pgdg18.04+1), server 14.1 (Ubuntu 14.1-1.pgdg18.04+1))
WARNING: psql major version 13, server major version 14.
         Some psql features might not work.
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.

postgres=# 
```

\6. 常用操作

```
sudo systemctl restart postgresql.service
sudo systemctl start postgresql.service
sudo systemctl stop postgresql.service
sudo systemctl status postgresql.service
# or
sudo /etc/init.d/postgresql status
sudo /etc/init.d/postgresql start
sudo /etc/init.d/postgresql stop
sudo /etc/init.d/postgresql restart
# or
sudo service postgresql restart
sudo service postgresql start
sudo service postgresql stop
sudo service postgresql status
```

\6. 卸载

```
tester@fabu:~$ sudo dpkg --get-selections | grep postgres  # 或者sudo dpkg -l | grep postgres
postgresql                                      install
postgresql-14                                   install
postgresql-client-14                            install
postgresql-client-common                        install
postgresql-common                               install
sudo service postgresql stop 
sudo apt-get --purge remove postgresql\*
sudo rm -r /etc/postgresql/
sudo rm -r /etc/postgresql-common/
sudo rm -r /var/lib/postgresql/
sudo userdel -r postgres
sudo groupdel postgres
```

配置密码

如何安全地修改密码：

方式1
使用psql，连接到Postgres Server：

test1=> \password
Enter new password:
Enter it again:
test1=>
我将原密码hello，修改为hellojava.123456
这种修改方式相当于向postgres server 发送了如下命令：

ALTER USER postgres PASSWORD ' md53175af154as54df5as4d5f45sd6af';
后面的字符串是  hellojava经过md5加密后的字符串
12345
注意：尽量不要使用postgres作为用户密码，防止被攻击。

方式2：可以直接发送sql修改：

`这种方式不仅仅限于psql了，其余客户端也能修改，如pgadmin等

ALTER USER test1 PASSWORD 'secret'
弊端：通过sql修改，有可能会将修改语句记录在相关工具的log里。
例如：通过psql 运行该条sql，则在.psql_history文件中会有相应语句的记录
      有密码泄露的风险

## 常见错误

### 连接pg数据库报错：no pg_hba.conf entry for host

解决办法：
修改pg_hba.conf，在第一行添加一行：
host all all 0.0.0.0/0 md5
表示允许任何用户连接到任何数据库，用一个加密的密码
