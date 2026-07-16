---
order: 12
---

# net — 网络底层（TCP/Socket）

`net` 模块用于创建 TCP 服务器和客户端。

```js
import net from 'net'
```

## TCP 服务器

```js
const server = net.createServer(socket => {
  socket.on('data', data => {
    console.log('收到:', data.toString())
    socket.write('已收到: ' + data.toString())
  })

  socket.on('end', () => console.log('客户端断开'))
  socket.on('error', err => console.error(err))
})

server.listen(8080, () => {
  console.log('TCP 服务器已启动 on port 8080')
})
```

## TCP 客户端

```js
const client = net.createConnection({ port: 8080 }, () => {
  client.write('Hello from client!')
})

client.on('data', data => console.log('收到:', data.toString()))
client.on('end', () => console.log('服务器断开连接'))
```

## Socket 实现简易 HTTP

```js
// 简易 HTTP 服务器
net.createServer(conn => {
  conn.on('data', data => {
    conn.write([
      'HTTP/1.1 200 OK',
      'Content-Type: text/plain',
      'Content-Length: 11',
      '',
      'Hello World'
    ].join('\r\n'))
  })
}).listen(8080)

// 简易 HTTP 客户端
const client = net.connect({ port: 80, host: 'example.com' }, () => {
  client.write('GET / HTTP/1.1\r\nHost: example.com\r\n\r\n')
})
client.on('data', data => console.log(data.toString()))
```

## 常用方法

| 方法 | 说明 |
|------|------|
| `net.createServer()` | 创建 TCP 服务器 |
| `net.createConnection()` | 创建 TCP 连接 |
| `net.connect()` | 同 createConnection |
| `socket.write()` | 发送数据 |
| `socket.end()` | 结束连接 |
| `socket.pipe()` | 管道数据 |
