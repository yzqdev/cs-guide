# MongoDB 聚合管道

> 聚合管道（Aggregation Pipeline）是 MongoDB 强大的数据处理框架，用于文档的过滤、分组、转换和计算。

## 聚合管道基础

聚合管道由多个阶段（Stage）组成，文档依次通过每个阶段被处理。

```javascript
db.collection.aggregate([
    { $match:   { ... } },   // 阶段 1：过滤文档
    { $group:   { ... } },   // 阶段 2：分组聚合
    { $sort:    { ... } },   // 阶段 3：排序
    { $project: { ... } }    // 阶段 4：投影（选择字段）
])
```

## 常用聚合阶段

### $match — 过滤

类似 `find()`，尽早过滤减少后续处理的数据量：

```javascript
db.orders.aggregate([
    { $match: { status: "completed", amount: { $gte: 100 } } }
]);
```

### $group — 分组

```javascript
// 按城市分组统计用户数量
db.users.aggregate([
    { $group: {
        _id: "$city",            // 分组字段
        count: { $sum: 1 },      // 计数
        avgAge: { $avg: "$age" }, // 平均年龄
        minAge: { $min: "$age" }, // 最小年龄
        maxAge: { $max: "$age" }, // 最大年龄
        totalAge: { $sum: "$age" } // 年龄总和
    }}
]);

// 按城市和状态分组
db.orders.aggregate([
    { $group: {
        _id: { city: "$city", status: "$status" },
        total: { $sum: "$amount" },
        count: { $sum: 1 }
    }}
]);
```

### $sort — 排序

```javascript
db.orders.aggregate([
    { $group: { _id: "$city", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } },      // 按总额降序
    { $limit: 5 }                  // 取前 5
]);
```

### $project — 投影

```javascript
db.users.aggregate([
    { $project: {
        _id: 0,
        fullName: "$name",
        age: 1,
        isAdult: { $gte: ["$age", 18] },
        cityUpper: { $toUpper: "$city" },
        year: { $year: "$createAt" }
    }}
]);
```

### $limit / $skip — 分页

```javascript
db.orders.aggregate([
    { $sort: { createAt: -1 } },
    { $skip: 10 },     // 跳过前 10 条
    { $limit: 10 }     // 取 10 条
]);
```

### $unwind — 数组展开

将数组中的每个元素拆分成独立的文档：

```javascript
db.posts.insertOne({
    title: "MongoDB 教程",
    tags: ["数据库", "NoSQL", "MongoDB"]
});

db.posts.aggregate([
    { $unwind: "$tags" }
]);
// 结果：每个 tag -> 一条文档
// { title: "MongoDB 教程", tags: "数据库" }
// { title: "MongoDB 教程", tags: "NoSQL" }
// { title: "MongoDB 教程", tags: "MongoDB" }

// 结合分组统计每个标签的使用次数
db.posts.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
]);
```

### $lookup — 联表查询（类似 JOIN）

```javascript
// 订单集合
db.orders.insertMany([
    { _id: 1, productId: 1, quantity: 2 },
    { _id: 2, productId: 2, quantity: 1 }
]);

// 商品集合
db.products.insertMany([
    { _id: 1, name: "手机", price: 4999 },
    { _id: 2, name: "电脑", price: 12999 }
]);

// 联表查询
db.orders.aggregate([
    { $lookup: {
        from: "products",           // 关联的集合名
        localField: "productId",    // 当前集合的关联字段
        foreignField: "_id",        // 目标集合的关联字段
        as: "product"               // 结果数组字段名
    }},
    { $unwind: "$product" },        // 展开数组（如果是一对一关系）
    { $project: {
        quantity: 1,
        "product.name": 1,
        "product.price": 1,
        total: { $multiply: ["$quantity", "$product.price"] }
    }}
]);
```

### $addFields — 添加字段

```javascript
db.orders.aggregate([
    { $addFields: {
        totalAmount: { $multiply: ["$price", "$quantity"] },
        tax: { $multiply: ["$price", 0.13] }
    }}
]);
```

### $bucket — 分桶

```javascript
// 按年龄分桶
db.users.aggregate([
    { $bucket: {
        groupBy: "$age",
        boundaries: [0, 18, 30, 50, 100],
        default: "Other",
        output: {
            count: { $sum: 1 },
            names: { $push: "$name" }
        }
    }}
]);
// 结果：
// { _id: 0, count: 0, names: [] }
// { _id: 18, count: 5, names: [...] }
// { _id: 30, count: 8, names: [...] }
```

### $facet — 多面聚合

在一个聚合管道中执行多个聚合：

```javascript
db.orders.aggregate([
    { $facet: {
        // 统计总数
        totalCount: [{ $count: "count" }],
        // 按状态分组
        byStatus: [
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ],
        // 按日期统计每日订单数
        byDate: [
            { $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createAt" } },
                count: { $sum: 1 },
                totalAmount: { $sum: "$amount" }
            }},
            { $sort: { _id: 1 } }
        ]
    }}
]);
```

## 聚合表达式

### 条件表达式

```javascript
db.users.aggregate([
    { $project: {
        name: 1,
        ageGroup: {
            $switch: {
                branches: [
                    { case: { $lte: ["$age", 18] }, then: "未成年" },
                    { case: { $lte: ["$age", 30] }, then: "青年" },
                    { case: { $lte: ["$age", 60] }, then: "中年" }
                ],
                default: "老年"
            }
        }
    }}
]);

// 或使用 $cond
db.users.aggregate([
    { $project: {
        name: 1,
        isAdult: { $cond: { if: { $gte: ["$age", 18] }, then: "成年", else: "未成年" } }
    }}
]);
```

### 日期表达式

```javascript
db.orders.aggregate([
    { $group: {
        _id: {
            year: { $year: "$createAt" },
            month: { $month: "$createAt" },
            day: { $dayOfMonth: "$createAt" }
        },
        totalAmount: { $sum: "$amount" }
    }},
    { $sort: { "_id.year": 1, "_id.month": 1 } }
]);
```

### 字符串表达式

```javascript
db.users.aggregate([
    { $project: {
        name: 1,
        nameUpper: { $toUpper: "$name" },
        nameLength: { $strLenCP: "$name" },
        nameConcat: { $concat: ["$name", " - ", "$city"] }
    }}
]);
```

## 完整示例

```javascript
// 电商订单分析
db.orders.aggregate([
    // 1. 只处理已完成订单
    { $match: { status: "completed" } },

    // 2. 联表查询商品信息
    { $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product"
    }},
    { $unwind: "$product" },

    // 3. 计算每个订单的金额
    { $addFields: {
        lineTotal: { $multiply: ["$quantity", "$product.price"] }
    }},

    // 4. 按月份和商品类别分组
    { $group: {
        _id: {
            month: { $month: "$createAt" },
            category: "$product.category"
        },
        totalSales: { $sum: "$lineTotal" },
        orderCount: { $sum: 1 },
        avgOrderValue: { $avg: "$lineTotal" }
    }},

    // 5. 排序
    { $sort: { "_id.month": 1, totalSales: -1 } },

    // 6. 格式化输出
    { $project: {
        _id: 0,
        month: "$_id.month",
        category: "$_id.category",
        totalSales: { $round: ["$totalSales", 2] },
        orderCount: 1,
        avgOrderValue: { $round: ["$avgOrderValue", 2] }
    }}
]);
```

## 练习

```javascript
// 1. 统计每个城市的用户数量和平均年龄
db.users.aggregate([
    { $group: {
        _id: "$city",
        userCount: { $sum: 1 },
        avgAge: { $avg: "$age" }
    }},
    { $sort: { userCount: -1 } }
]);

// 2. 找出每个分类下销量最高的商品
db.orders.aggregate([
    { $group: {
        _id: { category: "$category", product: "$productName" },
        totalSold: { $sum: "$quantity" }
    }},
    { $sort: { "_id.category": 1, totalSold: -1 } },
    { $group: {
        _id: "$_id.category",
        topProduct: { $first: "$_id.product" },
        maxSold: { $first: "$totalSold" }
    }}
]);

// 3. 统计每日新增用户数
db.users.aggregate([
    { $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createAt" } },
        newUsers: { $sum: 1 }
    }},
    { $sort: { _id: 1 } }
]);
```
