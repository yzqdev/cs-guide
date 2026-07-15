# JavaScript 异步编程 — Async / Await 全面指南

> Async/await 是一种让异步代码看起来像同步代码的语法糖，基于 Promise 实现，不阻塞主线程。

## 目录

- [基本用法](#基本用法)
- [async 函数返回值](#async-函数返回值)
- [各种 async 函数语法](#各种-async-函数语法)
  - [箭头函数](#箭头函数)
  - [对象方法](#对象方法)
  - [类方法](#类方法)
- [并发与继发](#并发与继发)
  - [避免过于串行](#避免过于串行)
  - [按顺序输出获取的数据](#按顺序输出获取的数据)
- [async 地狱](#async-地狱)
  - [例子一：无依赖的请求被串行](#例子一无依赖的请求被串行)
  - [例子二：有依赖关系的复杂场景](#例子二有依赖关系的复杂场景)
- [继发与并发](#继发与并发)
- [async 错误捕获](#async-错误捕获)
  - [try/catch 方式](#trycatch-方式)
  - [to.js 辅助函数](#tojs-辅助函数)
- [async/await 阻塞测试](#asyncawait-阻塞测试)
- [async 生成器](#async-生成器)
- [for-await-of 异步迭代](#for-await-of-异步迭代)
- [顶级 Await (Top-Level Await)](#顶级-await-top-level-await)
- [Promise.withResolvers() 与 async](#promisewithresolvers-与-async)
- [参考链接](#参考链接)

---

## 基本用法

如果在函数定义前使用了 `async` 关键字，就可以在函数内使用 `await`。当 `await` 某个 Promise 时，函数暂停执行，直至该 Promise 产生结果，并且暂停并不会阻塞主线程。

```js
async function myFirstAsyncFunction() {
  try {
    const fulfilledValue = await promise
  } catch (rejectedValue) {
    // …
  }
}
```

**示例：记录获取日志**

```js
// Promise 方式
function logFetch(url) {
  return fetch(url)
    .then((response) => response.text())
    .then((text) => {
      console.log(text)
    })
    .catch((err) => {
      console.error('fetch failed', err)
    })
}

// async/await 方式
async function logFetch(url) {
  try {
    const response = await fetch(url)
    console.log(await response.text())
  } catch (err) {
    console.log('fetch failed', err)
  }
}
```

> 代码行数相同，但去掉了所有回调，可读性大幅提高。

> `await` 的任何内容都通过 `Promise.resolve()` 传递，因此可以安全地 `await` 非原生 Promise 值。

---

## async 函数返回值

无论是否使用 `await`，异步函数**都会**返回 Promise。

```js
// wait ms milliseconds
function wait(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function hello() {
  await wait(500)
  return 'world'
}
// 调用 hello() 返回的 Promise 会在执行时返回 "world"

async function foo() {
  await wait(500)
  throw Error('bar')
}
// 调用 foo() 返回的 Promise 会在拒绝时返回 Error('bar')
```

---

## 各种 async 函数语法

### 箭头函数

```js
// map some URLs to json-promises
const jsonPromises = urls.map(async (url) => {
  const response = await fetch(url)
  return response.json()
})
```

> `array.map(func)` 不在乎提供给它的是不是异步函数，只把它当作一个返回 Promise 的函数来看待。它不会等到第一个函数执行完毕就会调用第二个函数。

### 对象方法

```js
const storage = {
  async getAvatar(name) {
    const cache = await caches.open('avatars')
    return cache.match(`/avatars/${name}.jpg`)
  },
}

storage.getAvatar('jaffathecake').then(/* ... */)
```

### 类方法

```js
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars')
  }

  async getAvatar(name) {
    const cache = await this.cachePromise
    return cache.match(`/avatars/${name}.jpg`)
  }
}

const storage = new Storage()
storage.getAvatar('jaffathecake').then(/* ... */)
```

> ⚠️ 类构造函数以及 getter/setter 方法不能是 async 的。

---

## 并发与继发

### 避免过于串行

尽管编写的是看似同步的代码，也一定不要错失并行执行的机会。

```js
// ❌ 串行 — 1000ms
async function series() {
  await wait(500)
  await wait(500)
  return 'done!'
}

// ✅ 并行 — 500ms
async function parallel() {
  const wait1 = wait(500)
  const wait2 = wait(500)
  await wait1
  await wait2
  return 'done!'
}
```

### 按顺序输出获取的数据

获取一系列网址，并尽快按正确顺序记录日志：

```js
// Promise 方式 — 使用 reduce 链接，不够直观
function logInOrder(urls) {
  const textPromises = urls.map((url) => {
    return fetch(url).then((response) => response.text())
  })

  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise).then((text) => console.log(text))
  }, Promise.resolve())
}
```

```js
// ❌ 过于串行 — 顺序获取，效率低
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url)
    console.log(await response.text())
  }
}
```

```js
// ✅ 推荐方式 — 并行获取，顺序输出
async function logInOrder(urls) {
  // 并行获取所有 URL
  const textPromises = urls.map(async (url) => {
    const response = await fetch(url)
    return response.text()
  })

  // 按顺序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise)
  }
}
```

---

## async 地狱

async 地狱指开发者贪图语法简洁而让本可并行执行的内容变成了顺序执行，影响性能。

### 例子一：无依赖的请求被串行

```js
// ❌ 错误写法 — 串行执行
;(async () => {
  const getList = await getList()
  const getAnotherList = await getAnotherList()
})()

// ✅ 方式一：先启动 Promise，再 await
;(async () => {
  const listPromise = getList()
  const anotherListPromise = getAnotherList()
  await listPromise
  await anotherListPromise
})()

// ✅ 方式二：Promise.all
;(async () => {
  Promise.all([getList(), getAnotherList()]).then(/* ... */)
})()

// ✅ 方式三：直接 .then
a().then((val) => console.log('suce'))
b().then((val) => console.log('d'))
```

### 例子二：有依赖关系的复杂场景

```js
// ❌ 错误写法 — 有明显先后顺序，但无依赖关系
;(async () => {
  const listPromise = await getList()
  const anotherListPromise = await getAnotherList()
  // do something
  await submit(listData)
  await submit(anotherListData)
})()
```

**改造步骤：**

**1. 找出依赖关系**

`submit(listData)` 需要在 `getList()` 之后，`submit(anotherListData)` 需要在 `getAnotherList()` 之后，但两组之间无依赖。

**2. 将互相依赖的语句包裹在 async 函数中**

```js
async function handleList() {
  const listData = await getList()
  // ...
  await submit(listData)
}

async function handleAnotherList() {
  const anotherListData = await getAnotherList()
  // ...
  await submit(anotherListData)
}
```

**3. 并发执行 async 函数**

```js
// 方法一
;(async () => {
  const handleListPromise = handleList()
  const handleAnotherListPromise = handleAnotherList()
  await handleListPromise
  await handleAnotherListPromise
})()

// 方法二
;(async () => {
  Promise.all([handleList(), handleAnotherList()]).then()
})()
```

---

## 继发与并发

**问题：给定一个 URL 数组，如何实现接口的继发（串行）和并发？**

```js
// 继发 — 串行请求
async function loadData(urls) {
  for (const url of urls) {
    const response = await fetch(url)
    console.log(await response.text())
  }
}

// 并发 — 同时请求，按顺序输出
async function loadData(urls) {
  // 并发读取 url
  const textPromises = urls.map(async (url) => {
    const response = await fetch(url)
    return response.text()
  })
  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise)
  }
}
```

---

## async 错误捕获

### try/catch 方式

```js
async function asyncTask(cb) {
  try {
    const user = await UserModel.findById(1)
    if (!user) return cb('No user found')
  } catch (e) {
    return cb('Unexpected error occurred')
  }

  try {
    const savedTask = await TaskModel({ userId: user.id, name: 'Demo Task' })
  } catch (e) {
    return cb('Error occurred while saving task')
  }

  if (user.notificationsEnabled) {
    try {
      await NotificationService.sendNotification(user.id, 'Task Created')
    } catch (e) {
      return cb('Error while sending notification')
    }
  }

  cb(null, savedTask)
}
```

### to.js 辅助函数

使用 `to.js` 简化错误处理，避免层层 try/catch：

```js
// to.js
export default function to(promise) {
  return promise
    .then((data) => {
      return [null, data]
    })
    .catch((err) => [err])
}
```

```js
import to from './to.js'

async function asyncTask() {
  let err, user, savedTask

  ;[err, user] = await to(UserModel.findById(1))
  if (!user) throw new CustomerError('No user found')

  ;[err, savedTask] = await to(TaskModel({ userId: user.id, name: 'Demo Task' }))
  if (err) throw new CustomError('Error occurred while saving task')

  if (user.notificationsEnabled) {
    const [err] = await to(NotificationService.sendNotification(user.id, 'Task Created'))
    if (err) console.error('Just log the error and continue flow')
  }
}
```

---

## async/await 阻塞测试

async/await **不会阻塞主线程**，只会阻塞 async 函数内部的后续代码执行。

```ts
async function fn1() {
  console.log(1)
  await pr1()
  await pr2()
  console.log(2)
}

function fn2() {
  console.log(3)
}

function pr1() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(4)
      resolve()
    }, 2000)
  })
}

function pr2() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(5)
      resolve()
    }, 2000)
  })
}

fn1()
fn2()

// 输出：1 3 4 5 2（而不是 1 4 5 3 2）
// 说明 async/await 不会阻塞主线程，只会阻塞函数内部代码
```

**串行 vs 并行耗时对比：**

```ts
let num = 50
function wait(ms: number) {
  let flas = 1
  return new Promise<void>((r) => {
    for (let index = 0; index < ms; index++) {
      flas += index
    }
    console.log(flas)
    r()
  })
}

async function series() {
  let start = performance.now()
  await wait(num)
  await wait(num)
  await wait(num)
  let end = performance.now()
  console.log('series:', end - start)
  return 'done!'
}

async function parallel() {
  let start = performance.now()
  const wait1 = wait(num)
  const wait2 = wait(num)
  const wait3 = wait(num)
  await wait1
  await wait2
  await wait3
  let end = performance.now()
  console.log('parallel:', end - start)
  return 'done!'
}
```

---

## async 生成器

async 生成器结合了生成器（Generator）和 async/await 的特性，可以异步地产生值。

```js
// async 生成器函数
async function* asyncGenerator() {
  let i = 0
  while (i < 3) {
    // 模拟异步操作
    yield await new Promise((resolve) => setTimeout(() => resolve(i++), 1000))
  }
}

// 使用 async 生成器
;(async () => {
  for await (const value of asyncGenerator()) {
    console.log(value) // 每隔1秒输出 0, 1, 2
  }
})()
```

**实际应用：分页数据获取**

```js
async function* paginate(url, maxPages = 5) {
  let page = 1
  while (page <= maxPages) {
    const response = await fetch(`${url}?page=${page}`)
    const data = await response.json()
    yield data.items
    if (!data.hasMore) break
    page++
  }
}

;(async () => {
  for await (const items of paginate('/api/users')) {
    console.log(`Got ${items.length} users`)
  }
})()
```

---

## for-await-of 异步迭代

`for-await-of` 用于遍历异步迭代器（`AsyncIterable`），每次迭代会等待 Promise 完成。

```js
// 手动实现异步迭代器
const asyncIterable = {
  [Symbol.asyncIterator]() {
    let i = 0
    return {
      next() {
        if (i < 3) {
          return new Promise((resolve) => {
            setTimeout(() => resolve({ value: i++, done: false }), 1000)
          })
        }
        return Promise.resolve({ value: undefined, done: true })
      },
    }
  },
}

;(async () => {
  for await (const num of asyncIterable) {
    console.log(num) // 1秒间隔输出 0, 1, 2
  }
})()
```

---

## 顶级 Await (Top-Level Await)

ES2022 正式纳入规范，允许在模块顶层直接使用 `await`，无需包裹在 `async` 函数中。

```js
// 模块中直接使用顶级 await
const config = await fetch('/config.json').then((r) => r.json())
console.log('Config loaded:', config)

// 动态导入
const lodash = await import('lodash')

// 备用资源加载
let iconSet
try {
  iconSet = await import('icons-v2')
} catch {
  iconSet = await import('icons-v1')
}
```

> ⚠️ 顶级 await 仅在 **ES Module** 中可用，不支持 CommonJS。

---

## Promise.withResolvers() 与 async

ES2024 引入 `Promise.withResolvers()`，可以在 async 函数外控制 Promise 状态。

```js
// 传统方式 — 需要在构造函数内定义
const promise = new Promise((resolve, reject) => {
  // resolve/reject 只能在回调内
})

// ES2024 — 外部控制
const { promise, resolve, reject } = Promise.withResolvers()

// 将 async 函数与外部控制结合
async function processWithTimeout(asyncFn, timeoutMs) {
  const { promise: timeoutPromise, resolve: timeoutResolve } = Promise.withResolvers()
  const timer = setTimeout(() => timeoutResolve('timeout'), timeoutMs)

  const result = await Promise.race([asyncFn(), timeoutPromise])
  clearTimeout(timer)
  return result
}
```

---

## 参考链接

- <https://developers.google.cn/web/fundamentals/getting-started/primers/async-functions>
- <https://juejin.cn/post/6844903613530144781>
- <https://juejin.cn/post/7033647059378896903>
- <https://github.com/mqyqingfeng/Blog/issues/100>
- <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function>
- <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await>
