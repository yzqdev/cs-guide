# mongoose技巧

## 去掉_id,_id转为string

```js
new mongoose.Schema(yourSchema, {
  toJSON: { 
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});
```

## 查询时去掉_id

```js
    const query = { _id: { $in: ids } };
      const options = { lean: true };
      const result = await model.find(query, {}, options);
```
