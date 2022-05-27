# MongoDB 安装和配置

## 基础概念

- MongoDB 元素概念
  - databases: 数据库;
  - collections:表；（collections组成了databases）
  - documents:行；（documents组成了collections）
- MongoDB 没有新建数据库的命令，只要进行 insert 或其它操作，MongoDB 就会自动帮你建立数据库和 collection。当查询一个不存在的 collection 时也不会出错，MongoDB 会认为那是一个空的 collection。
- 一个对象被插入到数据库中时，如果它没有 ID，会自动生成一个 "_id" 字段，为 12 字节(24位)16进制数。
- 当然如果插入文档不带 _id，则系统会帮你自动创建一个，如果自己指定了就用自己指定的。

## 如果你用 Spring Data MongoDB 依赖请注意

- 请先看官网最新支持到哪个版本的依赖：<https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#new-features>
  - 查看锚点为：`What’s new in Spring Data MongoDB` 的内容，比如：What’s new in Spring Data MongoDB 1.10，出现这样一句话：`Compatible with MongoDB Server 3.4 and the MongoDB Java Driver 3.4`
- 目前 201712 支持 MongoDB 3.4

## 如果你用 Robomongo 客户端请注意

- 请查看介绍中支持哪个版本：<https://robomongo.org/download>
- 目前 201712 支持 MongoDB 3.4

-------------------------------------------------------------------

## Docker 下安装 MongoDB（方式一）

- 先创建一个宿主机以后用来存放数据的目录：`mkdir -p /data/docker/mongo/db`
- 赋权：`chmod 777 -R /data/docker/mongo/db`
- 首次运行镜像：`docker run --name cloud-mongo -p 27017:27017 -v /data/docker/mongo/db:/data/db -d mongo:3.4`
- 进入容器中 mongo shell 交互界面：`docker exec -it cloud-mongo mongo adg_mongo_db`
- 创建一个用户：

```
db.createUser(
    {
        user: "adguser",
        pwd: "adg123456",
        roles: [ 
            { role: "dbAdmin", db: "adg_mongo_db" },
            { role: "readWrite", db: "adg_mongo_db" }
        ]
    }
)
```

- 然后停掉容器：`docker stop cloud-mongo`
- 然后删除容器：`docker rm cloud-mongo`
- 重新运行镜像，这次增加需要授权才能访问的配置：`docker run -d -p 27017:27017 -v /data/docker/mongo/db:/data/db --restart always --name cloud-mongo mongo:3.4 --auth`
- 重新启动服务：`docker restart cloud-mongo`
- 导出：`docker exec -it cloud-mongo mongoexport -h 127.0.0.1 -u 用户名 -p 密码 -d 库名 -c 集合名 -o /data/db/mongodb.json --type json`
- 导入：`docker exec -it cloud-mongo mongoimport -h 127.0.0.1 -u 用户名 -p 密码 -d 库名 -c 集合名 --file /data/db/mongodb.json --type json`

## Docker 下安装 MongoDB（方式二）

- 先创建一个宿主机以后用来存放数据的目录：`mkdir -p /data/docker/mongo/db`
- 赋权：`chmod 777 -R /data/docker/mongo/db`
- 运行镜像：`docker run --name cloud-mongo2 -p 37017:27017 -v /data/docker/mongo/db:/data/db -d mongo:3.4 --auth`
- 进入容器中 mongo shell 交互界面：`docker exec -it cloud-mongo2 mongo`
- 创建一个超级用户：

```
use admin

db.createUser(
    {
        user: "mongo-admin",
        pwd: "123456",
        roles: [ 
            { role: "root", db: "admin" }
        ]
    }
)

db.auth("mongo-admin","123456")
```

- 使用 db.auth() 可以对数据库中的用户进行验证，如果验证成功则返回 1，否则返回 0
- 接着创建一个普通数据库和用户：

```

use my_test_db


db.createUser(
    {
        user: "mytestuser",
        pwd: "123456",
        roles: [ 
            { role: "dbAdmin", db: "my_test_db" },
            { role: "readWrite", db: "my_test_db" }
        ]
    }
)


db.auth("mytestuser","123456")
```

-------------------------------------------------------------------

## MongoDB 传统方式安装

- 关闭 SELinux
  - 编辑配置文件：`vim /etc/selinux/config`
  - 把 `SELINUX=enforcing` 改为 `SELINUX=disabled`
- MongoDB 资料
  - 官网：<https://www.mongodb.com>
  - 官网文档：<https://docs.mongodb.com/manual/reference/method/>
  - 此时（20170228） 最新稳定版本为：**3.4.2**
  - 官网下载：<https://www.mongodb.com/download-center?jmp=nav#community>
  - 官网安装方法介绍：<https://docs.mongodb.com/master/tutorial/install-mongodb-on-red-hat>
  - 官网文档使用的 Package 的安装方式。还有一种安装方式是下载 tar 包的方法，如果需要 tar 包方式可以看这篇文章：
    - <https://itjh.net/2016/07/11/centos-install-mongodb>

### yum 卸载

- `yum remove "mongodb-org-*"`

### 3.4.2 yum 安装

- 新建文件：`vim /etc/yum.repos.d/mongodb-org-3.4.repo`，文件内容如下：

``` bash
[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc
```

- 如果你要安装 2.6 的版本，可以使用下面这个内容：

``` bash
[mongodb-org-2.6]
name=MongoDB 2.6 Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
gpgcheck=0
enabled=1
```

- 上面文件新建好之后，输入安装命令：`yum install -y mongodb-org`，一共有 5 个包，加起来有 100M 左右，国内下载速度不快，需要等等，可能还会出错，如果出错用国内源：<https://mirror.tuna.tsinghua.edu.cn/help/mongodb/>
- 开放防火墙端口：
  - `iptables -A INPUT -p tcp -m tcp --dport 27017 -j ACCEPT`
  - `service iptables save`
  - `service iptables restart`

### 3.6 yum 安装

- 新建文件：`vim /etc/yum.repos.d/mongodb-org-3.6.repo`，文件内容如下：

``` bash
[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/testing/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc
```

- 上面文件新建好之后，输入安装命令：`yum install -y mongodb-org`，一共有 5 个包，加起来有 100M 左右，国内下载速度不快，需要等等，可能还会出错，如果出错用国内源：<https://mirror.tuna.tsinghua.edu.cn/help/mongodb/>
- 开放防火墙端口：
  - `iptables -A INPUT -p tcp -m tcp --dport 27017 -j ACCEPT`
  - `service iptables save`
  - `service iptables restart`

### 3.4.10 tar 绿色安装

- 下载：`wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel62-3.4.10.tgz`
- 解压到指定目录，并重命名：

```
tar zxvf mongodb-linux-x86_64-rhel62-3.4.10.gz

mv mongodb-linux-x86_64-rhel62-3.4.10 mongodb

mv mongodb /usr/program
```

- 增加系统变量，我这里是用 zsh

```
vim ~/.zshrc 

export MONGODB_HOME=/usr/program/mongodb
export PATH=$MONGODB_HOME/bin:$PATH

source ~/.zshrc
```

- 测试是否安装成功：`mongod -v`，安装成功会得到如下信息：

```
2017-12-03T00:08:09.854+0800 I CONTROL  [initandlisten] MongoDB starting : pid=31155 port=27017 dbpath=/data/db 64-bit host=youmeek
2017-12-03T00:08:09.854+0800 I CONTROL  [initandlisten] db version v3.4.10
2017-12-03T00:08:09.854+0800 I CONTROL  [initandlisten] git version: 078f28920cb24de0dd479b5ea6c66c644f6326e9
2017-12-03T00:08:09.854+0800 I CONTROL  [initandlisten] OpenSSL version: OpenSSL 1.0.1e-fips 11 Feb 2013
2017-12-03T00:08:09.854+0800 I CONTROL  [initandlisten] allocator: tcmalloc
2017-12-03T00:08:09.854+0800 I CONTROL  [initandlisten] modules: none
2017-12-03T00:08:09.854+0800 I CONTROL  [initandlisten] build environment:
2017-12-03T00:08:09.854+0800 I CONTROL  [initandlisten]     distmod: rhel62
2017-12-03T00:08:09.854+0800 I CONTROL  [initandlisten]     distarch: x86_64
2017-12-03T00:08:09.854+0800 I CONTROL  [initandlisten]     target_arch: x86_64
2017-12-03T00:08:09.854+0800 I CONTROL  [initandlisten] options: { systemLog: { verbosity: 1 } }
2017-12-03T00:08:09.854+0800 D -        [initandlisten] User Assertion: 29:Data directory /data/db not found. src/mongo/db/service_context_d.cpp 98
2017-12-03T00:08:09.854+0800 I STORAGE  [initandlisten] exception in initAndListen: 29 Data directory /data/db not found., terminating
2017-12-03T00:08:09.854+0800 I NETWORK  [initandlisten] shutdown: going to close listening sockets...
2017-12-03T00:08:09.854+0800 I NETWORK  [initandlisten] shutdown: going to flush diaglog...
2017-12-03T00:08:09.854+0800 I CONTROL  [initandlisten] now exiting
2017-12-03T00:08:09.854+0800 I CONTROL  [initandlisten] shutting down with code:100
```

- 创建数据库、日志存放目录：

```
mkdir -p /usr/program/mongodb/data
mkdir -p /usr/program/mongodb/log
touch /usr/program/mongodb/log/mongodb.log
```

- 创建配置文件：`vim /etc/mongodb.conf`，并写入内容：

```
dbpath=/usr/program/mongodb/data
logpath=/usr/program/mongodb/log/mongodb.log
logappend=true
port=27017
fork=true
```

- 看下是否已经有 mongo 在运行，如果有就 kill 掉：`ps -ef | grep mongo`
- 通过配置文件启动：`mongod -f /etc/mongodb.conf`
- 显示下面信息则表示启动了：

```
about to fork child process, waiting until server is ready for connections.
forked process: 29167
child process started successfully, parent exiting
```

- 进入 MongoDB 后台管理 Shell：`cd /usr/program/mongodb/bin && ./mongo`
- 创建数据库：

```
use youmeek
```

- 创建用户，并授权，需要注意的是：dbAdmin 的权限是没有包含 readWrite，所以很多时候要根据需求添加多个权限：

```
db.createUser(
    {
        user: "youmeek",
        pwd: "youmeek123456",
        roles: [ 
            { role: "dbAdmin", db: "youmeek" },
            { role: "readWrite", db: "youmeek" }
        ]
    }
)
```

- 开放防火墙端口：

```
iptables -A INPUT -p tcp -m tcp --dport 27017 -j ACCEPT
service iptables save
service iptables restart
```

- 修改配置文件：`vim /etc/mongodb.conf`，在文件最后面增加一行：

```
auth=true
```

- 表示开启用户认证，这样后面要连接 mongo 就必须输入数据库、用户名、密码。
- 然后重启 mongo，开始使用。

## 其他常用命令

- 检查版本：`mongod --version`
- 启动：`service mongod start`
- 停止：`service mongod stop`
- 重启：`service mongod restart`
- 添加自启动：`chkconfig mongod on`
- 进入客户端：`mongo`，如果有授权用户格式为：`mongo 127.0.0.1:27017/admin -u 用户名 -p 用户密码`
- 卸载命令：`yum erase $(rpm -qa | grep mongodb-org)`
  - 删除数据库：`rm -r /var/lib/mongo`
  - 删除 log：`rm -r /var/log/mongodb`

## 添加授权用户

- 先进入 mongo 客户端 ：`mongo`
- 输入：`use admin`，然后输入：

``` bash
db.createUser(
   {
     user: "gitnavi",
     pwd: "123456",
     roles: [ { "role" : "dbAdmin", "db" : "youmeek_nav" } ]
   }
)
```

- 修改密码：`db.changeUserPassword(用户名, 密码)`
- 删除用户：`db.removeUser(用户名)`
- 内置角色：
  - read：允许用户读取指定数据库
  - readWrite：允许用户读写指定数据库
  - dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
  - userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
  - clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
  - readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
  - readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
  - userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
  - dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
  - root：只在admin数据库中可用。超级账号，超级权限

## MongoDB 配置

- 编辑配置文件：`vim /etc/mongod.conf`，注意：编辑完记得重启 MongoDB 服务
- 默认的数据库目录：`/var/lib/mongo`
- 默认的日志目录：`/var/log/mongodb`
- 默认的配置文件内容：

``` ini
bindIp:127.0.0.1 #注释此行，表示除了本机也可以登陆

# 补充这个，表示必须使用带用户名密码的才能请求 mongodb，比如访问 admin 数据库：mongo 192.168.1.121:27017/admin -u 用户名 -p 用户密码
security:
  authorization: enabled
```

## 常用命令

- `show dbs`，查看已有数据库
- `use 数据库名`，进入指定数据库，如果这个数据库不存在了也是可以进入的，进入之后 insert 一条语句就会自动创建了。
- `db`，显示当前用的数据库
- `show collections`，列出当前数据库的collections(当前数据库下的表)
- `show tables`，查看数据库中的集
- `exit`，退出
- `show users`，查看当前库下的用户
- `db.system.users.find().pretty()`，查看所有用户
- `db.dropAllUsers()`，删除所有用户
- `db.dropDatebase()`，删除当前这个数据库
- `db.集名称.find()`，查看集中的所有数据，等同于：select * from 表名称
- `db.集名称.findOne()`，查看集中的一条数据，等同于：select * from 表名称 limit 0,1
- `db.集名称.find().limit(10)`，查看集中的一条数据
- `db.集名称.find().sort({name:1})`，查询列表，根据字段name排序 #1正序 -1倒序
- `db.集名称.find().sort({x:1}).skip(5).limit(10)`，查询列表，根据字段name排序，等同于 select from foo order by x asc limit 5, 10
- `db.集名称.find({x:10})`，查询列表，等同于 select from foo where x = 10
- `db.集名称.find({x: {$lt:10}})`，select from foo where x <= 10
- `db.集名称.find({}, {y:true})`，select y from foo
- `db.集名称.find({"address.city":"gz"})`，搜索嵌套文档address中city值为gz的记录
- `db.集名称.find({likes:"math"})`，搜索数组
- `db.集名称.insert({"a":1,"b":2})`，插入一个测试数据
- `db.集名称.find({name:"lichuang"})`，根据索引或字段查找数据
- `db.集名称.update({name:"张三"},{$set:{name:"李四"}})`，更新数据，等同于：UPDATE 表名 SET name='李四' WHERE name = '张三'
- `db.集名称.update({name:"张三"},{$set:{name:"李四"},{upsert:true},{multi:true}})`，更新数据，等同于：UPDATE 表名 SET name='李四' WHERE name = '张三'。其中特殊的是 upsert 为 true 的时候，表示如果没有这条数据，则创建一条。multi 表示，所有满足条件的都进行更新，不然默认只找到的第一条更新。
- `db.集名称.remove({name:"lichuang"})`，删除数据，等同于：DELETE FROM 表名 WHERE name='lichuang'
- `db.集名称.drop()`，删除这个集合
- `db.集名称.getIndexes()`，查看集合索引
- `db.集名称.dropIndex("name_1")`，删除索引
- `db.集名称.ensureIndex({title:1})`，创建索引
- `db.集名称.ensureIndex({titile:1},{name:"indexname"})`，创建索引，第二个属性设置索引名称
- `db.集名称.ensureIndex({titile:1},{unique:true/false})`，创建唯一索引，第二个属性设置为true说明该字段中值不能重复，false可以重复
- `db.集名称.ensureIndex({name:1,age:1})`，复合索引
- `db.集名称.ensureIndex({"address.city":1})`，在嵌套文档的字段上建索引
- `db.集名称.insert({"article","text"})`，全文索引，指定为text类型,每个数据集合中只允许创建一个全文索引
- `db.adminCommand( {setParameter:1, textSearchEnabled:true})`，开启全文本索引功能
- 一些符号说明：

``` ini
$lt ->less then 小于
$lte ->less than and equal 不大于
$lt ->less then 小于
$gt ->greater then 大于
$gte ->greater then and equal 不小于）
$ne ->not equal 不等于
```

- 其他材料：
  - <https://segmentfault.com/a/1190000007550421>
  - <https://segmentfault.com/a/1190000005095959>
  - <http://blog.csdn.net/endlu/article/details/51098518>
  - <http://www.cnblogs.com/shaosks/p/5666764.html>
  - <http://www.cookqq.com/blog/51277786-c26c-4f94-9be2-428f3633d9e5>
  - <http://www.thinksaas.cn/topics/0/513/513705.html>
  - <https://www.fedte.cc/p/511.html>

## 导入 / 导出 / 备份 /还原

- 数据的导出、导入
  - 导出：`mongoexport -h 127.0.0.1 -u 用户名 -p 密码 -d 库名 -c 集合名 -o /opt/mongodb.json --type json`
  - 导入：`mongoimport -h 127.0.0.1 -u 用户名 -p 密码 -d 库名 -c 集合名 --file /opt/mongodb.json --type json`

## Java 包

- spring-data-mongodb：<http://projects.spring.io/spring-data-mongodb/>
- mongo-java-driver：<https://github.com/mongodb/mongo-java-driver>

## GUI 管理工具

- Robomongo：<https://robomongo.org/>

## 基准测试

- <https://github.com/brianfrankcooper/YCSB/tree/master/mongodb#4-run-ycsb>

## 随机生成测试数据

- <https://github.com/feliixx/mgodatagen>

## 资料

- <http://www.cnblogs.com/zhoujinyi/p/4610050.html>
- <http://lvtraveler.github.io/2016/05/22/%E3%80%90MongoDB%E3%80%91MongoDB%E5%85%A5%E9%97%A8%EF%BC%88%E4%B8%80%EF%BC%89%E5%9F%BA%E6%9C%AC%E6%93%8D%E4%BD%9C-%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4/>
