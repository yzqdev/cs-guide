---
order: 13
---

# util — 实用工具

`util` 模块提供一系列实用函数。

```js
import util from 'util'
```

## promisify

将回调风格的函数转为 Promise 风格：

```js
const readFile = util.promisify(fs.readFile)
const data = await readFile('/path/to/file', 'utf8')

// 用于 fs 时，可以直接用 fs/promises
```

## callbackify

将 Promise 风格转为回调风格：

```js
const fn = util.callbackify(async () => {
  return 'hello'
})
fn((err, result) => console.log(result))
```

## format

格式化字符串（类似 `printf`）：

```js
util.format('%s:%d', 'port', 3000)        // 'port:3000'
util.format('%j', { key: 'value' })        // JSON 格式
util.format('hello %s', 'world')           // 'hello world'

// console.log 内部也是基于 util.format
```

## types

类型判断：

```js
util.types.isDate(new Date())       // true
util.types.isPromise(Promise.resolve())  // true
util.types.isArrayBuffer(new ArrayBuffer(10))  // true
```

## inherits

实现原型继承（旧版，ES6 class 已替代）：

```js
function Base() {}
function Derived() {}
util.inherits(Derived, Base)
```

## deprecate

标记 API 为已弃用：

```js
const oldFn = util.deprecate(() => {
  // ...
}, 'oldFn() 已弃用，请使用 newFn()')
```

## inspect

格式化对象为字符串：

```js
console.log(util.inspect(obj, { depth: 2, colors: true }))
// console.dir() 内部调用了 util.inspect
```
