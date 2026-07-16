---
order: 4
---

# Stream — 流

`stream` 是 Node.js 处理流式数据的抽象接口，所有流都是 `EventEmitter` 的实例。

```js
import { Readable, Writable, Transform, Duplex } from 'stream'
```

## 四种流类型

| 类型 | 说明 |
|------|------|
| `Readable` | 可读流（读取数据） |
| `Writable` | 可写流（写入数据） |
| `Transform` | 转换流（读写过程中修改数据） |
| `Duplex` | 双工流（既可读又可写） |

## 可读流

```js
// 从文件创建可读流
const rs = fs.createReadStream('input.txt', { encoding: 'utf8' })

rs.on('data', chunk => { /* 处理数据块 */ })
rs.on('end', () => { /* 数据读取完毕 */ })
rs.on('error', err => { /* 错误处理 */ })

// 自定义可读流
const rs = new Readable()
rs.push('ABCDEFG')
rs.push(null)  // 标记结束
rs.pipe(process.stdout)
```

## 可写流

```js
const ws = fs.createWriteStream('output.txt')

ws.write('data', 'utf8')
ws.end()  // 标记写入完成

ws.on('finish', () => { /* 写入完成 */ })
ws.on('error', err => { /* 错误处理 */ })

// 自定义可写流
const ws = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString())
    callback()
  }
})
```

## pipe — 管道

将可读流导向可写流，自动控制流速防爆仓：

```js
fs.createReadStream('src.txt').pipe(fs.createWriteStream('dest.txt'))

// 链式 pipe（压缩）
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'))
```

## 背压（Backpressure）

当写入速度跟不上读取速度时，通过 `drain` 事件控制：

```js
rs.on('data', chunk => {
  if (ws.write(chunk) === false) {
    rs.pause()  // 暂停读取
  }
})
ws.on('drain', () => rs.resume())  // 可以继续写入
```
