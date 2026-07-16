---
order: 16
---

# timers — 定时器

Node.js 中的定时器 API 与浏览器一致，但提供了额外的 `setImmediate`。

## setTimeout / clearTimeout

```js
const timer = setTimeout(() => {
  console.log('延迟 1 秒执行')
}, 1000)

clearTimeout(timer)  // 取消定时器
```

## setInterval / clearInterval

```js
const interval = setInterval(() => {
  console.log('每隔 1 秒执行')
}, 1000)

clearInterval(interval)  // 取消
```

## setImmediate / clearImmediate

在当前事件循环的末尾执行回调（Node.js 特有）：

```js
setImmediate(() => {
  console.log('在当前事件循环末尾执行')
})

// 对比 process.nextTick（在当前事件循环的最前面执行）
process.nextTick(() => {
  console.log('在当前操作完成后立即执行（优先于 setImmediate）')
})
```

## 执行顺序对比

```js
console.log('1. 同步')

setTimeout(() => console.log('5. setTimeout'), 0)
setImmediate(() => console.log('4. setImmediate'))
process.nextTick(() => console.log('3. nextTick'))

console.log('2. 同步')

// 输出: 1 → 2 → 3 → 4 → 5
```

## unref / ref

`unref()` 允许定时器不阻止进程退出：

```js
const timer = setTimeout(() => {
  // 做一些定期清理工作
}, 30000)

timer.unref()  // 进程不会因为这个定时器而保持运行

// ref() 可以取消 unref 的效果
timer.ref()
```

## 异步迭代

```js
import { setTimeout } from 'timers/promises'

await setTimeout(1000)  // 延迟 1 秒
```
