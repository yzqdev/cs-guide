# Promise 全面解析

> Promise 是 ES6 引入的异步编程解决方案，用于处理异步操作，避免回调地狱。本文件涵盖 Promise 的静态方法、实例方法、链式调用及常见模式。

## 目录

- [基本概念](#基本概念)
- [Promise 实例方法](#promise-实例方法)
  - [Promise.prototype.then()](#promiseprototypethen)
  - [Promise.prototype.catch()](#promiseprototypecatch)
  - [Promise.prototype.finally()](#promiseprototypefinally)
- [Promise 静态方法](#promise-静态方法)
  - [Promise.resolve()](#promiseresolve)
  - [Promise.reject()](#promisereject)
  - [Promise.all()](#promiseall)
  - [Promise.allSettled()](#promiseallsettled)
  - [Promise.race()](#promiserace)
  - [Promise.any()](#promiseany)
  - [Promise.withResolvers()](#promisewithresolvers)
- [Promise 链式调用与错误处理](#promise-链式调用与错误处理)
- [Promise 常见模式](#promise-常见模式)
  - [串行执行](#串行执行)
  - [重试模式](#重试模式)
  - [超时控制](#超时控制)
- [微任务 (Microtask)](#微任务-microtask)
- [Promise 与事件循环](#promise-与事件循环)

---

## 基本概念

Promise 是一个对象，代表一个异步操作的最终完成（或失败）及其结果值。

```js
const promise = new Promise((resolve, reject) => {
  // 异步操作
  if (/* 成功 */) {
    resolve(value);
  } else {
    reject(error);
  }
});
```

**Promise 的三种状态：**

| 状态                  | 含义         | 触发条件                   |
| --------------------- | ------------ | -------------------------- |
| `pending`（待定）     | 初始状态     | 既未完成也未拒绝           |
| `fulfilled`（已兑现） | 操作成功完成 | 调用 `resolve()`           |
| `rejected`（已拒绝）  | 操作失败     | 调用 `reject()` 或抛出异常 |

> Promise 的状态一旦改变，就永久定格，不会再变。

---

## Promise 实例方法

### Promise.prototype.then()

绑定 `fulfilled` 和 `rejected` 状态的回调，返回一个新的 Promise。

```js
const promise = new Promise((resolve) => resolve(42))

promise.then(
  (value) => console.log('fulfilled:', value), // fulfilled: 42
  (error) => console.log('rejected:', error),
)

// 链式调用 — then 返回新 Promise
promise.then((value) => value * 2).then((value) => console.log(value)) // 84
```

### Promise.prototype.catch()

绑定 `rejected` 状态的回调，是 `.then(null, rejection)` 的语法糖。

```js
const promise = Promise.reject('Error!')

promise
  .catch((error) => {
    console.error('捕获到:', error) // 捕获到: Error!
    return 'recovered' // 可以返回一个值，继续传递
  })
  .then((value) => {
    console.log(value) // 'recovered'（错误被恢复）
  })

// catch 还能捕获 then 中抛出的错误
Promise.resolve(1)
  .then((value) => {
    throw new Error('in then')
  })
  .catch((err) => console.error(err.message)) // 'in then'
```

### Promise.prototype.finally()

无论 Promise 成功或失败都会执行的回调，适合清理操作（关闭连接、隐藏 loading 等）。

```js
function showLoading() {
  /* ... */
}
function hideLoading() {
  /* ... */
}

showLoading()
fetchData()
  .then((data) => render(data))
  .catch((err) => showError(err))
  .finally(() => hideLoading()) // 无论成功失败都隐藏 loading
```

> `finally` 不接收任何参数，且不会改变 Promise 的最终状态。

---

## Promise 静态方法

### Promise.resolve()

将一个值转换为一个已兑现的 Promise。

```js
Promise.resolve(42).then((v) => console.log(v)) // 42
Promise.resolve({ data: 'hello' }).then((v) => console.log(v.data)) // 'hello'

// 如果传入的是 Promise，则直接返回
const p = new Promise(() => {})
Promise.resolve(p) === p // true

// 如果传入的是 thenable 对象，会将其转换为 Promise
const thenable = {
  then(resolve) {
    resolve('thenable')
  },
}
Promise.resolve(thenable).then((v) => console.log(v)) // 'thenable'
```

### Promise.reject()

返回一个已拒绝的 Promise。

```js
Promise.reject('Error!').catch((err) => console.error(err)) // 'Error!'

// 通常与 Promise.resolve 配合用于测试
function testAsyncFunction(shouldFail) {
  return shouldFail ? Promise.reject(new Error('Failed')) : Promise.resolve('Success')
}
```

### Promise.all()

等待所有 Promise 完成（全部成功或任一失败）。

```js
const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
const p3 = Promise.resolve(3)

Promise.all([p1, p2, p3]).then((values) => {
  console.log(values) // [1, 2, 3]
})

// 如果有一个失败，整体失败
const p4 = Promise.reject('Error!')
Promise.all([p1, p2, p4]).catch((err) => {
  console.log(err) // 'Error!'
})
```

**带错误隔离的用法：** 如果希望某个 Promise 失败后不影响其他，可以在每个 Promise 上加 catch：

```js
const p1 = new Promise((resolve) => resolve('hello')).then((result) => result).catch((e) => e)

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了')
})
  .then((result) => result)
  .catch((e) => e) // 捕获错误，返回错误信息

Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((e) => console.log(e))

// 或者使用 await
try {
  let result = await Promise.all([p1, p2])
  console.log(result)
} catch (error) {
  console.log(error)
}
```

### Promise.allSettled()

等待所有 Promise 完成（无论成功或失败），返回每个 Promise 的结果状态。

```js
const resolved = Promise.resolve(42)
const rejected = Promise.reject(-1)

const allSettledPromise = Promise.allSettled([resolved, rejected])

allSettledPromise.then(function (results) {
  console.log(results)
  // [
  //   { status: 'fulfilled', value: 42 },
  //   { status: 'rejected', reason: -1 }
  // ]
})
```

**适用场景：** 需要等所有请求都返回结果，但某些请求失败不影响整体流程。

```js
const urls = ['/api/a', '/api/b', '/api/c']
const results = await Promise.allSettled(urls.map((url) => fetch(url)))

const successful = results.filter((r) => r.status === 'fulfilled')
const failed = results.filter((r) => r.status === 'rejected')

console.log(`成功: ${successful.length}, 失败: ${failed.length}`)
```

### Promise.race()

返回最先完成的 Promise 结果（无论成功或失败）。

```js
const promise1 = new Promise((resolve) => {
  setTimeout(resolve, 500, 'one')
})

const promise2 = new Promise((resolve) => {
  setTimeout(resolve, 100, 'two')
})

Promise.race([promise1, promise2]).then((value) => {
  console.log(value) // 'two'（p2 更快）
})
```

**适用场景：超时控制**

```js
function fetchWithTimeout(url, timeoutMs = 5000) {
  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeoutMs))
  return Promise.race([fetch(url), timeout])
}
```

### Promise.any()

ES2021 引入。任意一个 Promise 成功即返回，全部失败则抛出 `AggregateError`。

```js
// 场景：多个镜像源，取最快成功的
const promises = [fetch('https://mirror1.example.com/data'), fetch('https://mirror2.example.com/data'), fetch('https://mirror3.example.com/data')]

Promise.any(promises)
  .then((response) => response.json())
  .catch((err) => {
    if (err instanceof AggregateError) {
      console.error('所有请求都失败了')
      console.log(err.errors) // 所有错误数组
    }
  })
```

**Promise 静态方法对比：**

| 方法                 | 成功条件 | 失败条件 | 返回         |
| -------------------- | -------- | -------- | ------------ |
| `Promise.all`        | 全部成功 | 任一失败 | 值数组       |
| `Promise.allSettled` | 全部完成 | —        | 结果对象数组 |
| `Promise.race`       | 首个完成 | 首个失败 | 首个结果     |
| `Promise.any`        | 首个成功 | 全部失败 | 首个成功值   |

### Promise.withResolvers()

ES2024 引入。无需在构造函数中定义 resolve/reject，直接创建 Promise 及其控制函数。

```js
// 传统方式
const promise = new Promise((resolve, reject) => {
  // resolve 和 reject 只能在回调内部使用
})

// ES2024 方式
const { promise, resolve, reject } = Promise.withResolvers()

// 可以在外部任何地方控制 Promise
setTimeout(() => resolve('done'), 1000)
const result = await promise // 'done'

// 实用场景：事件驱动的 Promise
function waitForClick(button) {
  const { promise, resolve } = Promise.withResolvers()
  button.addEventListener('click', () => resolve('clicked'), { once: true })
  return promise
}

// 实用场景：队列处理
class AsyncQueue {
  constructor() {
    this._tasks = []
    this._current = null
  }
  enqueue(task) {
    const { promise, resolve, reject } = Promise.withResolvers()
    this._tasks.push({ task, resolve, reject })
    this._processNext()
    return promise
  }
  async _processNext() {
    if (this._current) return
    const next = this._tasks.shift()
    if (!next) return
    this._current = next
    try {
      const result = await next.task()
      next.resolve(result)
    } catch (err) {
      next.reject(err)
    } finally {
      this._current = null
      this._processNext()
    }
  }
}
```

---

## Promise 链式调用与错误处理

```js
// 链式调用 — 每个 then 返回新 Promise
fetch('/api/user')
  .then((response) => response.json())
  .then((user) => fetch(`/api/posts?userId=${user.id}`))
  .then((response) => response.json())
  .then((posts) => renderPosts(posts))
  .catch((error) => {
    // 捕获链中任何一个错误
    console.error('请求失败:', error)
    showErrorPage()
  })
  .finally(() => {
    hideLoading()
  })
```

**错误恢复：** catch 中可以返回一个值，让链继续执行。

```js
fetch('/api/data')
  .then((response) => {
    if (!response.ok) throw new Error('Network error')
    return response.json()
  })
  .catch((err) => {
    console.warn('使用缓存数据:', err)
    return getCachedData() // 返回备用数据
  })
  .then((data) => render(data)) // 无论是否出错都会执行
```

---

## Promise 常见模式

### 串行执行

按顺序执行一组异步操作，每个操作依赖前一个的结果。

```js
// 使用 reduce 串行 Promise
function serialPromise(tasks) {
  return tasks.reduce((chain, task) => {
    return chain.then((result) => task(result))
  }, Promise.resolve())
}

// 使用 for...of 串行
async function serialPromise(tasks) {
  const results = []
  for (const task of tasks) {
    results.push(await task())
  }
  return results
}

// 示例：串行请求
const urls = ['/api/a', '/api/b', '/api/c']
const results = await serialPromise(urls.map((url) => () => fetch(url).then((r) => r.json())))
```

### 重试模式

异步操作失败后自动重试。

```js
async function retryPromise(fn, retries = 3, delay = 1000) {
  try {
    return await fn()
  } catch (error) {
    if (retries <= 0) throw error
    await new Promise((r) => setTimeout(r, delay))
    return retryPromise(fn, retries - 1, delay * 2) // 指数退避
  }
}

// 使用
const data = await retryPromise(() => fetch('/api/data').then((r) => r.json()))
```

### 超时控制

```js
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
  return Promise.race([promise, timeout])
}

// 使用
const data = await withTimeout(fetch('/api/data'), 5000)
```

---

## 微任务 (Microtask)

Promise 的回调是微任务（microtask），在事件循环的每个宏任务（macrotask）之后执行。

```js
console.log('1: 同步代码')

setTimeout(() => console.log('2: setTimeout (宏任务)'), 0)

Promise.resolve().then(() => console.log('3: Promise.then (微任务)'))

console.log('4: 同步代码')

// 输出顺序：
// 1: 同步代码
// 4: 同步代码
// 3: Promise.then (微任务)
// 2: setTimeout (宏任务)
```

```js
// 微任务队列先于下一个宏任务
setTimeout(() => console.log('1'), 0)
Promise.resolve().then(() => console.log('2'))
Promise.resolve().then(() => console.log('3'))
// 输出: 2, 3, 1
```

---

## Promise 与事件循环

```
┌───────────────────────────┐
│         宏任务队列          │ ← setTimeout, setInterval, I/O, UI渲染
├───────────────────────────┤
│         微任务队列          │ ← Promise.then/catch/finally, MutationObserver
├───────────────────────────┤
│        requestAnimationFrame│
└───────────────────────────┘
```

**事件循环每次迭代：**

1. 执行一个宏任务
2. 执行所有微任务（清空微任务队列）
3. 执行 `requestAnimationFrame`
4. 渲染 UI
5. 进入下一个宏任务

---

> 相关专题：[async/await 详解](./async-await.md) | [ES6 到 ES8 新特性](./es6-es8.md) | [ES9 到 ES12 新特性](./es9-es12.md)
