# 使用 fetch

Fetch API 提供了一种更现代、更强大的方式来发起网络请求，替代了传统的 `XMLHttpRequest`。

:::tip

[MDN Fetch API 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

:::

## 基本用法

```js
// GET 请求（默认）
const response = await fetch('https://api.example.com/data')
const data = await response.json()
```

## 请求方法

### GET

```js
fetch('https://api.example.com/users')
  .then((res) => res.json())
  .then((data) => console.log(data))
```

### POST

```js
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', age: 30 }),
})
```

### PUT / PATCH / DELETE

```js
// PUT — 全量更新
fetch('https://api.example.com/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Bob', age: 25 }),
})

// PATCH — 部分更新
fetch('https://api.example.com/users/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ age: 26 }),
})

// DELETE
fetch('https://api.example.com/users/1', { method: 'DELETE' })
```

## 请求选项

```js
fetch(url, {
  method: 'GET',               // 请求方法
  headers: {                   // 请求头
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123',
  },
  body: JSON.stringify(data),  // 请求体
  mode: 'cors',                // cors | no-cors | same-origin
  credentials: 'include',      // omit | same-origin | include
  cache: 'no-cache',           // default | no-cache | reload | force-cache | only-if-cached
  redirect: 'follow',          // follow | error | manual
  referrerPolicy: 'no-referrer',
  signal: abortController.signal, // 用于中断请求
})
```

## 处理响应

```js
const response = await fetch(url)

// 响应属性
response.status       // 状态码 (200, 404, 500...)
response.statusText   // 状态文本 (OK, Not Found...)
response.ok           // 布尔值，status 在 200-299 之间为 true
response.headers      // 响应头对象
response.url          // 实际请求的 URL
response.redirected   // 是否发生过重定向

// 读取响应体 — 根据内容类型选择
const json = await response.json()         // JSON
const text = await response.text()         // 纯文本
const blob = await response.blob()         // 二进制数据（图片、文件）
const formData = await response.formData() // FormData
const buffer = await response.arrayBuffer() // ArrayBuffer
```

### 区分成功与失败

fetch 仅在网络错误时 reject，HTTP 错误状态（如 404、500）**不会** reject：

```js
const response = await fetch(url)

if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`)
}

const data = await response.json()
```

## 请求头操作

```js
// 创建 Headers 对象
const headers = new Headers()
headers.append('Content-Type', 'application/json')
headers.append('Authorization', 'Bearer token123')

// 或者直接传入对象
const headers = {
  'Content-Type': 'application/json',
  'X-Custom-Header': 'custom-value',
}

// 读取响应头
const response = await fetch(url)
response.headers.get('Content-Type')       // 'application/json'
response.headers.has('X-RateLimit-Remaining')
response.headers.forEach((value, key) => console.log(key, value))
```

## 发送不同数据格式

### JSON

```js
fetch('/api/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' }),
})
```

### FormData（表单 / 文件上传）

```js
const formData = new FormData()
formData.append('name', 'Alice')
formData.append('avatar', fileInput.files[0])

fetch('/api/upload', {
  method: 'POST',
  body: formData, // 不要手动设置 Content-Type，浏览器自动设 multipart/form-data
})
```

### URLSearchParams（表单编码）

```js
const params = new URLSearchParams()
params.append('name', 'Alice')
params.append('age', '30')

fetch('/api/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: params,
})
```

## 中断请求 (AbortController)

使用 `AbortController` 实现超时或手动取消：

```js
const controller = new AbortController()
const signal = controller.signal

// 5 秒超时
setTimeout(() => controller.abort(), 5000)

try {
  const response = await fetch(url, { signal })
  const data = await response.json()
} catch (err) {
  if (err.name === 'AbortError') {
    console.log('请求已被取消')
  } else {
    console.error('请求失败:', err)
  }
}
```

## 完整示例

::: normal-demo

```html
<div>
  <button id="fetchGet">GET 请求</button>
  <button id="fetchPost">POST 请求</button>
  <pre id="fetchResult" style="background:#f5f5f5;padding:10px;border-radius:4px;min-height:40px;">结果将显示在这里</pre>
</div>
```

```js
const result = document.getElementById('fetchResult')

document.getElementById('fetchGet').addEventListener('click', async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    result.textContent = JSON.stringify(data, null, 2)
  } catch (err) {
    result.textContent = `错误: ${err.message}`
  }
})

document.getElementById('fetchPost').addEventListener('click', async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    result.textContent = JSON.stringify(data, null, 2)
  } catch (err) {
    result.textContent = `错误: ${err.message}`
  }
})
```

:::

## 注意事项

- fetch 只在网络错误时 reject，HTTP 错误状态（4xx、5xx）不 reject，需手动检查 `response.ok`
- 默认不带 cookie，需设置 `credentials: 'include'`
- 跨域请求需服务器支持 CORS
- 响应体只能读取一次，多次读取需调用 `response.clone()`

<iframe style='width:100%;border:1px solid cyan' src='/cs-guide/fetch.html' />

@[code](@/public/fetch.html)
