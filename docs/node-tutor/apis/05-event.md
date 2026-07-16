---
order: 5
---

# events — 事件触发器

Node.js 许多核心 API 都基于事件驱动架构，`EventEmitter` 是其中最核心的类。

```js
import EventEmitter from 'events'
const emitter = new EventEmitter()
```

## 基本用法

```js
emitter.on('event', (arg1, arg2) => {
  console.log('事件触发', arg1, arg2)
})

emitter.emit('event', 'hello', 'world')  // 触发事件
```

## 常用方法

### on / addListener

添加事件监听器：

```js
emitter.on('open', () => console.log('opened'))
emitter.addListener('open', handler)  // on 的别名
```

### once

只执行一次的监听器：

```js
emitter.once('close', () => console.log('只执行一次'))
```

### off / removeListener

移除监听器：

```js
const handler = () => {}
emitter.on('event', handler)
emitter.off('event', handler)
emitter.removeListener('event', handler)  // off 的别名
```

### removeAllListeners

移除所有监听器：

```js
emitter.removeAllListeners('event')   // 移除指定事件
emitter.removeAllListeners()           // 移除所有事件
```

### 其他方法

```js
emitter.emit('event')                  // 触发事件
emitter.eventNames()                   // 获取已注册的事件名数组
emitter.listenerCount('event')         // 获取某事件的监听器数量
emitter.listeners('event')             // 获取某事件的监听器数组
emitter.getMaxListeners()              // 获取最大监听器数量（默认 10）
emitter.setMaxListeners(20)            // 设置最大监听器数量

// prependListener：在前面插入监听器
emitter.prependListener('event', handler)
```

## 内置事件

`EventEmitter` 有两个内置的特殊事件：

- `newListener` — 添加新监听器时触发
- `removeListener` — 移除监听器时触发

## 错误处理

建议始终监听 `error` 事件，否则未捕获的错误会导致进程退出：

```js
emitter.on('error', err => {
  console.error('发生错误:', err)
})
```
