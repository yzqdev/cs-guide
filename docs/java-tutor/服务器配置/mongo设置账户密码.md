# mongodb设置密码

## 超级管理员

### 设置 admin

```javascript
use admin  
db.createUser({
  user: 'admin',  // 用户名
  pwd: '123456',  // 密码
  roles:[{
    role: 'root',  // 角色
    db: 'admin'  // 数据库
  }]
})
```

设置完成，可以输入 `show users` 查看是否设置成功。

### 开启验证

找到 MongoDB 安装目录，打开 `mongod.cfg`文件，找到以下这句：

```python
#security:
```

修改为：

```python
security:
  authorization: enabled
```

### 重启 MongoDB

打开任务管理器

![](https://upload-images.jianshu.io/upload_images/1128764-564fe60c63ce951b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/788/format/webp#crop=0&crop=0&crop=1&crop=1&id=LnrTq&originHeight=600&originWidth=788&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

任务管理器界面

找到 MongoDB 服务，右键重新启动。

这时，我们可以打开 powershell 连接数据库：

输入 mongo：

![](https://upload-images.jianshu.io/upload_images/1128764-08b60c7bdc8e9010.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/657/format/webp#crop=0&crop=0&crop=1&crop=1&id=TACUi&originHeight=84&originWidth=657&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

截图

显示连接成功，但是当我们输入其他指令时，会提示没有权限：

![](https://upload-images.jianshu.io/upload_images/1128764-5b9c49021375919b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/622/format/webp#crop=0&crop=0&crop=1&crop=1&id=wR9q5&originHeight=218&originWidth=622&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

截图

### 登录数据库

```javascript
// 方式一
mongo
use admin
db.auth('admin', '123456')

// 方式二
mongo admin -u admin -p 123456
```

这时候我们就可以正常访问和操作数据了。

## 添加数据库用户

我们除了可以设置数据库的超级管理员以外，还可以给每个数据库设置单独的管理员。其只有操作单独数据的一定权限。

```javascript
use test  // 跳转到需要添加用户的数据库
db.createUser({
  user: 'fooadmin',  // 用户名
  pwd: '123456',  // 密码
  roles:[{
    role: 'readWrite',  // 角色
    db: 'test'  // 数据库名
  }]
})
```

## 常用命令

```javascript
show users  // 查看当前库下的用户

db.dropUser('testadmin')  // 删除用户

db.updateUser('admin', {pwd: '654321'})  // 修改用户密码

db.auth('admin', '654321')  // 密码认证
```

## MongoDB 数据库默认角色

1. 数据库用户角色：read、readWrite
1. 数据库管理角色：dbAdmin、dbOwner、userAdmin
1. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager
1. 备份恢复角色：backup、restore
1. 所有数据库角色： readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、
dbAdminAnyDatabase
1. 超级用户角色：root
