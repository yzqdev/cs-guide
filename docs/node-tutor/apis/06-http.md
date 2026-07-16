---
order: 6
---

# HTTP / HTTPS — 网络请求

## HTTP 服务端

创建 HTTP 服务器，监听请求并返回响应：

```js
import http from 'http'

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end('Hello World')
})

server.listen(3000)
```

### 请求对象 (req)

```js
req.method      // 'GET', 'POST' 等
req.url         // '/path?query=string'
req.headers     // 请求头对象（全部小写）
req.socket      // 底层 Socket
```

读取请求体：

```js
const server = http.createServer((req, res) => {
  const body = []
  req.on('data', chunk => body.push(chunk))
  req.on('end', () => {
    const data = Buffer.concat(body).toString()
    res.end(data)
  })
})
```

### 响应对象 (res)

```js
res.writeHead(200, { 'Content-Type': 'application/json' })
res.write(JSON.stringify({ msg: 'ok' }))
res.end()

// 或一步到位
res.end('Hello')
```

## HTTP 客户端

发起 HTTP 请求：

```js
// GET
http.get('http://example.com', res => {
  let data = ''
  res.on('data', chunk => data += chunk)
  res.on('end', () => console.log(data))
})

// POST
const req = http.request(
  { hostname: 'example.com', port: 80, path: '/', method: 'POST' },
  res => { /* 处理响应 */ }
)
req.write('request body')
req.end()
```

## HTTPS

```js
import https from 'https'

// 客户端用法与 http 相同
https.get('https://api.github.com', res => { /* ... */ })

// 服务端需要证书
const options = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
}
https.createServer(options, (req, res) => { /* ... */ }).listen(443)
```

## 代理示例

```js
https.get('https://api.example.com/data', response => {
  let data = ''
  response.on('data', chunk => data += chunk)
  response.on('end', () => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.end(data)
  })
})
```
