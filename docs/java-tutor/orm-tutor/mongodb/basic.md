# 基本操作

<https://www.mongodb.com/docs/manual/tutorial/insert-documents/>

## 添加数据库

```shell
use myblog
```

## 添加数据

```shell
db.postCollection.insertOne({
  "title":"mongodb tutor",
  "author":{
    "name":"yzq",
    "avatar":"http://www.baidu.com"
  },"createdAt":"2022-01-01",
  "content":"mongo 教程",
  "comments":[
    {
      "user":"dog",
      "comment":"good"
    },
     {
       "user": "cat",
       "comment": "bad"
     }
  ]
}
)
```

## 查询数据

```shell
# 查询所有的
db.postCollection.find({})
# 查询author.name=yzq的
db.postCollection.find({"author.name":"yzq"})
```

## 更新

```shell
db.postCollection.updateOne({"author.name":"yzq"},{$set:{"author.name":"qqman"}})
```

## 删除

```shell
db.postCollection.deleteOne({"author.name":"qqman"})
```

## 导出数据

下载mongodb database tools
[地址](https://www.mongodb.com/try/download/database-tools)
