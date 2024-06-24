
# postgres 操作

## 环境变量

- PG_HOME
- PGDATA
- PGPASSWORD   密码


## 删除所有数据

先进入数据库


```
psql -U postgres

然后选择所有的名字

SELECT datname FROM pg_database;
```

## 备份数据

备份恢复单个数据库
```
$env:PGPASSWORD='123456'
pg_dump.exe -U postgres blog_ssm > blog_ssm_pg.sql

# 恢复单个数据库
 $env:PGPASSWORD='123456'
psql -U postgres -d kuang_bbs -f .\kuang_pg.sql
 
```

使用pg_dumpall备份所有

```
$env:PGPASSWORD='123456'
pg_dumpall.exe -U postgres -E UTF8 -f pg_backup.sql
```

使用psql -f恢复所有数据
```
$env:PGPASSWORD='123456'
psql -f ./pg_backup.sql -U postgres
```


使用powershell配置密码

```
$env:PGPASSWORD='123456'
pg_dumpall.exe  -U postgres -w -E UTF8 -f pg_backup.sql
```
## postgres升级

1，使用pg_dumpall和psql -f的方式

这种方式当数据量大的时候性能较低，执行时间长

2，pg_upgrade

```powershell
$env:PGPASSWORD = '123456'
pg_upgrade -b "D:\Program Files\PostgreSQL\15\bin" -B "D:\Program Files\PostgreSQL\16\bin" -d "D:\Program Files\PostgreSQL\15\data" -D "D:\Program Files\PostgreSQL\16\data" -U postgres
```
 
 例子
```powershell
$env:PGPASSWORD = '123456'
pg_upgrade -b "D:\Program Files\PostgreSQL\15\bin" -B "D:\Program Files\PostgreSQL\16\bin" -d "D:\Program Files\PostgreSQL\15\data" -D "D:\Program Files\PostgreSQL\16\data" -U postgres
```

带空格的命令

```powershell
& pg_upgrade -b "D:\Program Files\PostgreSQL\15\bin" -B "D:\Program Files\PostgreSQL\16\bin" -d "D:\Program Files\PostgreSQL\15\data" -D "D:\Program Files\PostgreSQL\16\data" -U postgres
```



## windows出问题

见
https://www.postgresql.org/docs/current/pgupgrade.html

如果文件夹不显示安全选项卡
就命令行`gpedit.msc`,点击【用户配置】-【管理模版】-【Windows组件】-【Windows资源管理器】-右侧找到【删除"安全"选项卡,设置为禁用

要先创建postgres的data
```powershell
 net user postgres 123456 /add

RUNAS /USER:postgres "CMD.EXE"
SET PATH=%PATH%;d:\Program Files\PostgreSQL\15\bin;

initdb -D "D:\Program Files\PostgreSQL\15\data" -U postgres
```