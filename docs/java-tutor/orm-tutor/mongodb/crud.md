# MongoDB CRUD 操作

> MongoDB 的增删改查（Create, Read, Update, Delete）操作详解。

## 插入文档（Create）

### insertOne — 插入单个文档

```javascript
// 插入一条数据
db.users.insertOne({
    name: "张三",
    age: 25,
    email: "zhangsan@example.com",
    tags: ["程序员", "Java"],
    address: {
        city: "北京",
        street: "朝阳区"
    },
    createAt: new Date()
});

// 返回结果
{
    "acknowledged": true,
    "insertedId": ObjectId("65a1b2c3d4e5f6a7b8c9d0e1")
}
```

### insertMany — 插入多个文档

```javascript
db.users.insertMany([
    { name: "李四", age: 30, city: "上海" },
    { name: "王五", age: 28, city: "广州" },
    { name: "赵六", age: 35, city: "深圳" }
]);

// 指定 _id（不指定则自动生成）
db.users.insertMany([
    { _id: 1, name: "张三" },
    { _id: 2, name: "李四" }
]);

// 有序插入（默认有序，遇到错误停止）
// 无序插入（跳过错误继续）
db.users.insertMany([
    { _id: 1, name: "A" },
    { _id: 1, name: "B" }   // 重复 _id 会报错
], { ordered: false });
```

## 查询文档（Read）

### find — 查询所有

```javascript
// 查询所有文档
db.users.find()

// 美化输出
db.users.find().pretty()

// 查询所有，只返回指定字段
db.users.find({}, { name: 1, age: 1, _id: 0 })
// 1 包含，0 排除
```

### 条件查询

```javascript
// 等值查询
db.users.find({ name: "张三" })

// 比较操作符
db.users.find({ age: { $gt: 25 } })     // 大于 (>)
db.users.find({ age: { $gte: 25 } })    // 大于等于 (>=)
db.users.find({ age: { $lt: 30 } })     // 小于 (<)
db.users.find({ age: { $lte: 30 } })    // 小于等于 (<=)
db.users.find({ age: { $ne: 25 } })     // 不等于 (!=)
db.users.find({ age: { $in: [25, 30] } })    // 在列表中
db.users.find({ age: { $nin: [25, 30] } })    // 不在列表中

// 逻辑操作符
db.users.find({ $and: [{ age: { $gte: 20 } }, { age: { $lte: 30 } }] })
db.users.find({ $or: [{ city: "北京" }, { city: "上海" }] })
db.users.find({ $not: { age: { $gt: 30 } } })

// 简化写法（字段间的隐式 AND）
db.users.find({ age: { $gte: 20, $lte: 30 }, city: "北京" })
```

### 正则查询

```javascript
// 模糊查询（类似 SQL 的 LIKE）
db.users.find({ name: /张/ })           // 包含"张"
db.users.find({ name: /^张/ })          // 以"张"开头
db.users.find({ name: /三$/ })          // 以"三"结尾
db.users.find({ name: /张/i })          // 忽略大小写
```

### 数组查询

```javascript
db.posts.insertMany([
    { title: "Post 1", tags: ["Java", "MongoDB", "数据库"] },
    { title: "Post 2", tags: ["Python", "MongoDB"] },
    { title: "Post 3", tags: ["Java", "Spring"] }
]);

// 包含某个元素
db.posts.find({ tags: "MongoDB" })

// 同时包含多个元素（全部匹配）
db.posts.find({ tags: { $all: ["Java", "MongoDB"] } })

// 匹配数组大小
db.posts.find({ tags: { $size: 3 } })

// 根据元素位置查询
db.posts.find({ "tags.0": "Java" })  // 第一个标签是 Java
```

### 嵌套文档查询

```javascript
db.users.find({ "address.city": "北京" })

// 嵌入文档精确匹配（必须完全一致）
db.users.find({ address: { city: "北京", street: "朝阳区" } })

// 嵌入文档字段匹配（推荐用点号）
db.users.find({ "address.city": "北京", "address.street": "朝阳区" })
```

### 排序、分页、投影

```javascript
// 排序：1 升序，-1 降序
db.users.find().sort({ age: -1, name: 1 })

// 分页
db.users.find().skip(0).limit(10)    // 第 1 页
db.users.find().skip(10).limit(10)   // 第 2 页

// 投影（只返回需要的字段）
db.users.find({}, { name: 1, age: 1, _id: 0 })

// 计数
db.users.countDocuments({ age: { $gt: 20 } })
```

### findOne — 查询单个

```javascript
// 返回匹配的第一条
db.users.findOne({ name: "张三" })
```

## 更新文档（Update）

### updateOne — 更新单个文档

```javascript
// 更新第一个匹配的文档
db.users.updateOne(
    { name: "张三" },         // 过滤条件
    { $set: { age: 26 } }     // 更新操作
);

// 返回结果
{ "acknowledged": true, "matchedCount": 1, "modifiedCount": 1 }

// 如果不存在则插入 (upsert)
db.users.updateOne(
    { name: "张三" },
    { $set: { age: 26, city: "北京" } },
    { upsert: true }
);
```

### updateMany — 更新多个文档

```javascript
// 批量更新
db.users.updateMany(
    { age: { $lt: 25 } },
    { $set: { status: "青年" } }
);
```

### 更新操作符

```javascript
// $set — 设置字段
db.users.updateOne({ name: "张三" }, { $set: { email: "new@email.com" } })

// $unset — 删除字段
db.users.updateOne({ name: "张三" }, { $unset: { email: "" } })

// $inc — 递增/递减
db.users.updateOne({ name: "张三" }, { $inc: { age: 1 } })      // 加 1
db.users.updateOne({ name: "张三" }, { $inc: { score: -10 } })  // 减 10

// $push — 数组追加
db.posts.updateOne({ title: "Post 1" }, { $push: { tags: "NoSQL" } })

// $pull — 数组移除
db.posts.updateOne({ title: "Post 1" }, { $pull: { tags: "NoSQL" } })

// $addToSet — 不重复追加
db.posts.updateOne({ title: "Post 1" }, { $addToSet: { tags: "MongoDB" } })

// $rename — 重命名字段
db.users.updateOne({ name: "张三" }, { $rename: { "name": "username" } })

// $min / $max — 条件更新
db.users.updateOne({ name: "张三" }, { $min: { age: 20 } })  // 取较小值
db.users.updateOne({ name: "张三" }, { $max: { age: 30 } })  // 取较大值
```

## 删除文档（Delete）

### deleteOne — 删除单个文档

```javascript
// 删除第一个匹配的文档
db.users.deleteOne({ name: "张三" });

// 返回结果
{ "acknowledged": true, "deletedCount": 1 }
```

### deleteMany — 删除多个文档

```javascript
// 删除所有匹配的文档
db.users.deleteMany({ age: { $lt: 18 } })

// 删除集合中的所有文档
db.users.deleteMany({})
```

## 批量写操作（bulkWrite）

```javascript
db.users.bulkWrite([
    { insertOne: { document: { name: "新用户", age: 20 } } },
    { updateOne: {
        filter: { name: "张三" },
        update: { $set: { age: 30 } }
    }},
    { deleteOne: {
        filter: { name: "李四" }
    }}
]);
```

## 练习

```javascript
// 1. 插入一批学生数据
db.students.insertMany([
    { name: "小明", age: 18, score: 85, class: "一班" },
    { name: "小红", age: 19, score: 92, class: "一班" },
    { name: "小刚", age: 18, score: 78, class: "二班" }
]);

// 2. 查询 score 大于 80 的学生
db.students.find({ score: { $gt: 80 } })

// 3. 将所有一班学生的 score 加 5 分
db.students.updateMany(
    { class: "一班" },
    { $inc: { score: 5 } }
);

// 4. 删除 score 小于 60 的学生
db.students.deleteMany({ score: { $lt: 60 } });
```
