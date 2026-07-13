# MongoDB 索引

> 索引可以大幅提升查询性能，但会降低写入速度并占用额外存储空间。

## 索引基础

```javascript
// 查看集合的所有索引
db.users.getIndexes()

// 查看查询是否使用索引
db.users.find({ name: "张三" }).explain("executionStats")
```

### 单字段索引

```javascript
// 创建单字段索引
db.users.createIndex({ name: 1 })     // 升序
db.users.createIndex({ age: -1 })     // 降序

// 创建唯一索引
db.users.createIndex({ email: 1 }, { unique: true })

// 创建稀疏索引（仅索引包含该字段的文档）
db.users.createIndex({ email: 1 }, { sparse: true })
```

### 复合索引

```javascript
// 多字段联合索引（查询条件经常同时出现时使用）
db.users.createIndex({ city: 1, age: -1 })

// 复合索引的最左前缀原则：
// 以下查询会使用索引：
// db.users.find({ city: "北京" })
// db.users.find({ city: "北京", age: { $gt: 20 } })
// 以下查询不会使用索引（跳过了 city）：
// db.users.find({ age: { $gt: 20 } })
```

### 多键索引（数组字段）

```javascript
// 对数组字段创建索引（MongoDB 会自动为每个元素建索引）
db.posts.createIndex({ tags: 1 })

// 对数组内的嵌套字段建索引
db.posts.createIndex({ "comments.user": 1 })
```

### 文本索引

```javascript
// 创建全文索引（一个集合只能有一个 text 索引）
db.articles.createIndex(
    { title: "text", body: "text" },
    { weights: { title: 10, body: 5 } }  // 权重：标题权重更高
);

// 全文搜索
db.articles.find(
    { $text: { $search: "mongodb 教程" } },
    { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });

// 排除停用词
db.articles.find({ $text: { $search: "\"MongoDB\" -入门" } })
```

### 哈希索引

```javascript
// 用于分片键的哈希索引
db.users.createIndex({ _id: "hashed" })
```

### 通配符索引

```javascript
// 针对未知字段名的索引（MongoDB 4.2+）
db.products.createIndex({ "attributes.$**": 1 })
```

### TTL 索引（自动过期）

```javascript
// 为 createAt 字段设置 7 天后自动删除
db.sessions.createIndex(
    { createAt: 1 },
    { expireAfterSeconds: 604800 }  // 7 * 24 * 60 * 60
);
```

## 索引管理

```javascript
// 创建索引
db.users.createIndex({ name: 1 }, { name: "idx_name" })    // 指定名称
db.users.createIndex({ name: 1 }, { background: true })     // 后台创建（不阻塞）
db.users.createIndex({ name: 1 }, { unique: true })         // 唯一索引

// 删除索引
db.users.dropIndex("idx_name")        // 按名称删除
db.users.dropIndex({ name: 1 })       // 按定义删除
db.users.dropIndexes()                // 删除所有索引（除了 _id）

// 重建索引
db.users.reIndex()

// 隐藏索引（测试时禁用，不真正删除）
db.users.hideIndex("idx_name")
db.users.unhideIndex("idx_name")
```

## 索引使用建议

### 何时该建索引

- 经常出现在 `find()` 条件中的字段
- 经常出现在 `sort()` 中的字段
- 经常被 `$lookup` 关联的字段
- 需要唯一性约束的字段（唯一索引）
- 经常做范围查询的字段

### 索引设计原则

```javascript
// 1. 复合索引应将等值查询的字段放在前面
// 查询: db.users.find({ city: "北京", age: { $gt: 20 } })
// 索引: { city: 1, age: 1 }  ✅（city 是等值，放前面）

// 2. 覆盖查询（查询的字段都在索引中）
// 索引: { name: 1, age: 1 }
// 查询: db.users.find({ name: "张三" }, { name: 1, age: 1, _id: 0 })
// 此时从索引直接返回结果，无需读取文档

// 3. 避免在索引上使用 $ne、$not、$nin
// ❌ 不会有效使用索引
db.users.find({ age: { $ne: 25 } })

// 4. 避免对数组字段建太多索引
// 数组索引的更新成本较高

// 5. 索引不是越多越好
// 每个索引都会降低写入性能
```

### 使用 explain() 分析

```javascript
// 检查查询是否使用了索引
db.users.find({ name: "张三" }).explain("executionStats")

// 输出关键字段说明：
// stage: COLLSCAN（全表扫描）→ IXSCAN（索引扫描）
// nReturned: 返回的文档数
// totalDocsExamined: 扫描的文档数（越少越好）
// executionTimeMillis: 执行时间（毫秒）

// 实战：对比有无索引的性能差异
// 无索引时：
db.users.find({ email: "test@test.com" }).explain("executionStats")
// stage: COLLSCAN, totalDocsExamined: 100000, executionTimeMillis: 85

// 创建索引后：
db.users.createIndex({ email: 1 })
db.users.find({ email: "test@test.com" }).explain("executionStats")
// stage: IXSCAN, totalDocsExamined: 1, executionTimeMillis: 1
```

## 练习

```javascript
// 1. 为订单集合创建合理的索引
db.orders.createIndex({ userId: 1, createAt: -1 })  // 用户订单查询
db.orders.createIndex({ status: 1, createAt: -1 })  // 按状态筛选
db.orders.createIndex({ orderNo: 1 }, { unique: true })  // 订单号唯一

// 2. 分析慢查询
db.orders.find({
    status: "pending",
    createAt: { $gte: ISODate("2024-01-01") }
}).sort({ createAt: -1 }).explain("executionStats")

// 3. 删除不再使用的索引
db.orders.dropIndex("old_index_name")
```
