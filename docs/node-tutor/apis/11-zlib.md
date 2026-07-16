---
order: 11
---

# zlib — 数据压缩与解压

`zlib` 模块提供 gzip、deflate 等压缩功能。

```js
import zlib from 'zlib'
```

## 压缩

```js
zlib.gzip('需要压缩的数据', (err, buffer) => {
  if (err) return console.error(err)
  // buffer 是压缩后的二进制数据
})

// 同步
const compressed = zlib.gzipSync('data')

// 链式流（文件压缩）
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'))
```

## 解压

```js
zlib.gunzip(compressedBuffer, (err, buffer) => {
  console.log(buffer.toString())
})

// 同步
const data = zlib.gunzipSync(compressed).toString()

// 链式流
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('output.txt'))
```

## HTTP 中的使用

### 服务端返回 gzip 压缩：

```js
http.createServer((req, res) => {
  if (req.headers['accept-encoding']?.includes('gzip')) {
    zlib.gzip('response data', (err, data) => {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Encoding': 'gzip'
      })
      res.end(data)
    })
  } else {
    res.end('response data')
  }
})
```

### 客户端解压响应：

```js
http.get('http://example.com', { headers: { 'Accept-Encoding': 'gzip' } }, res => {
  const chunks = []
  res.on('data', c => chunks.push(c))
  res.on('end', () => {
    const buf = Buffer.concat(chunks)
    if (res.headers['content-encoding'] === 'gzip') {
      zlib.gunzip(buf, (_, data) => console.log(data.toString()))
    }
  })
})
```

其他方法：`deflate` / `inflate`、`brotliCompress` / `brotliDecompress`。
