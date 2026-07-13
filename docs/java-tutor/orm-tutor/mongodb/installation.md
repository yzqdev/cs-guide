# MongoDB 安装与启动

> MongoDB 是一个文档型 NoSQL 数据库，以 JSON 风格的文档存储数据。

## 安装 MongoDB

### Windows 安装

1. 从 [MongoDB 官网](https://www.mongodb.com/try/download/community) 下载 MSI 安装包
2. 运行安装程序，选择 Complete 安装
3. 安装完成后，MongoDB 会作为 Windows 服务自动运行

### macOS 安装

```bash
# 使用 Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# 启动
brew services start mongodb-community@7.0
```

### Linux 安装（Ubuntu）

```bash
# 导入 MongoDB 公钥
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# 添加源
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# 安装
sudo apt-get update
sudo apt-get install -y mongodb-org

# 启动
sudo systemctl start mongod
sudo systemctl enable mongod
```

## 启动 MongoDB

```bash
# 启动 MongoDB 服务
mongod --dbpath /data/db

# 指定端口（默认 27017）
mongod --port 27017 --dbpath /data/db

# 后台运行
mongod --fork --logpath /var/log/mongodb/mongod.log --dbpath /data/db
```

## 连接 MongoDB

```bash
# 使用 mongosh（MongoDB Shell，需要单独安装）
mongosh

# 指定连接参数
mongosh "mongodb://localhost:27017/mydb"

# 带用户名密码
mongosh "mongodb://admin:password@localhost:27017/admin"

# 连接 Atlas 云数据库
mongosh "mongodb+srv://cluster0.xxxxx.mongodb.net/myFirstDatabase" --username admin
```

## MongoDB Compass（图形化工具）

从 [MongoDB Compass 下载页](https://www.mongodb.com/products/compass) 下载安装，输入连接字符串即可可视化管理。

## 基本概念

| RDBMS (MySQL) | MongoDB | 说明 |
|---------------|---------|------|
| 数据库 (Database) | 数据库 (Database) | 名称相同 |
| 表 (Table) | 集合 (Collection) | MongoDB 存储文档的容器 |
| 行 (Row) | 文档 (Document) | 一条数据记录 |
| 列 (Column) | 字段 (Field) | 数据属性 |
| 主键 (Primary Key) | **_id** | MongoDB 自动生成的唯一标识 |
| 索引 (Index) | 索引 (Index) | 提升查询性能 |
| JOIN | $lookup / 嵌入文档 | MongoDB 通过嵌入或引用关联数据 |

## 数据库和集合操作

```javascript
// 切换/创建数据库（use 后自动创建）
use myblog

// 查看所有数据库
show dbs

// 查看当前数据库
db

// 删除数据库
db.dropDatabase()

// 查看所有集合
show collections

// 创建集合（也可以插入文档时隐式创建）
db.createCollection("users")

// 删除集合
db.users.drop()
```

## 数据库工具

### mongosh 常用命令

```javascript
// 查看帮助
help
db.help()

// 查看数据库统计
db.stats()

// 查看集合统计
db.users.stats()

// 查看集合中的所有索引
db.users.getIndexes()
```

### MongoDB Database Tools

从 [MongoDB Database Tools](https://www.mongodb.com/try/download/database-tools) 下载：

```bash
# 导出集合
mongoexport --db myblog --collection posts --out posts.json

# 导入集合
mongoimport --db myblog --collection posts --file posts.json

# 导出整个数据库
mongodump --db myblog --out ./backup/

# 恢复整个数据库
mongorestore --db myblog ./backup/myblog/
```
