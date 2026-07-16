---
order: 15
---

# readline — 逐行读取

`readline` 模块用于从可读流中逐行读取数据。

```js
import readline from 'readline'
```

## 创建 readline 接口

```js
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
```

## 命令行交互

```js
rl.question('你叫什么名字？ ', answer => {
  console.log(`你好, ${answer}!`)
  rl.close()
})
```

## 逐行读取文件

```js
const rl = readline.createInterface({
  input: fs.createReadStream('file.txt'),
  crlfDelay: Infinity
})

rl.on('line', line => {
  console.log('行内容:', line)
})

rl.on('close', () => {
  console.log('文件读取完毕')
})
```

## 事件

| 事件 | 说明 |
|------|------|
| `line` | 读取到一行时触发 |
| `close` | 流关闭时触发 |
| `pause` | 输入流暂停时触发 |
| `resume` | 输入流恢复时触发 |
| `SIGINT` | Ctrl+C 时触发 |

## 进阶：Promise 封装

```js
function ask(question) {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.question(question, answer => {
      rl.close()
      resolve(answer)
    })
  })
}

const name = await ask('请输入名字: ')
console.log(`你好, ${name}`)
```
