---
order: 5
---

# HTTP 与网络请求

> 发送 HTTP 请求、处理网络数据的代码片段。

## 使用原生 fetch（Node.js 18+）

```js
// Node.js 18+ 内置 fetch API

// GET 请求
export async function get(url, headers = {}) {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  return await response.json();
}

// POST 请求（JSON）
export async function post(url, data, headers = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  return await response.json();
}

// 带超时的请求
export async function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

// 使用示例
// const data = await get('https://api.github.com/users/octocat');
// const result = await post('https://api.example.com/data', { name: 'test' });
```

## 文件下载

```js
import fs from 'node:fs';
import https from 'node:https';
import http from 'node:http';
import { URL } from 'node:url';

/**
 * 下载文件
 * @param {string} url - 文件 URL
 * @param {string} dest - 保存路径
 * @param {function} onProgress - 进度回调
 */
export function downloadFile(url, dest, onProgress) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      const total = parseInt(response.headers['content-length'], 10);
      let downloaded = 0;

      response.on('data', (chunk) => {
        downloaded += chunk.length;
        if (onProgress && total) {
          onProgress((downloaded / total) * 100);
        }
      });

      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', reject);
  });
}

// 使用示例
// await downloadFile('https://example.com/file.zip', './download/file.zip', (percent) => {
//   console.log(`下载进度: ${percent.toFixed(1)}%`);
// });
```

## 读取 JSON 在线 API

```js
export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`请求失败: ${response.status}`);
  }
  return await response.json();
}

/**
 * 批量请求（并发控制）
 * @param {string[]} urls - URL 数组
 * @param {number} concurrency - 并发数
 */
export async function fetchAll(urls, concurrency = 5) {
  const results = [];
  const queue = [...urls];

  async function worker() {
    while (queue.length > 0) {
      const url = queue.shift();
      try {
        const data = await fetchJson(url);
        results.push({ url, data, error: null });
      } catch (err) {
        results.push({ url, data: null, error: err.message });
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, urls.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

// 使用示例
// const urls = ['https://api.github.com/users/octocat', 'https://api.github.com/users/defunkt'];
// const results = await fetchAll(urls, 2);
```

## 重试机制

```js
/**
 * 带重试的请求
 * @param {function} fn - 异步请求函数
 * @param {number} retries - 最大重试次数
 * @param {number} delay - 重试延迟（毫秒）
 */
export async function withRetry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      console.log(`第 ${i + 1} 次重试: ${err.message}`);
      await new Promise(r => setTimeout(r, delay * (i + 1))); // 指数退避
    }
  }
}

// 使用示例
// const data = await withRetry(() => fetchJson('https://api.example.com/data'), 3, 2000);
```

## 创建 HTTP 服务器

```js
import http from 'node:http';

const server = http.createServer((req, res) => {
  // 解析 URL
  const url = new URL(req.url, `http://${req.headers.host}`);

  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // 路由
  if (req.method === 'GET' && url.pathname === '/api/hello') {
    res.end(JSON.stringify({ message: 'Hello World' }));
  } else if (req.method === 'POST' && url.pathname === '/api/data') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      const data = JSON.parse(body);
      res.end(JSON.stringify({ received: data }));
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('服务器已启动: http://localhost:3000');
});
```

## 创建 WebSocket 客户端

```bash
npm install ws
```

```js
import WebSocket from 'ws';

const ws = new WebSocket('wss://echo.websocket.org');

ws.on('open', () => {
  console.log('连接已建立');
  ws.send('Hello Server!');
});

ws.on('message', (data) => {
  console.log('收到消息:', data.toString());
  ws.close();
});

ws.on('close', () => console.log('连接已关闭'));
ws.on('error', (err) => console.error('WebSocket 错误:', err));
```

## 发送邮件（nodemailer）

```bash
npm install nodemailer
```

```js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: 'your@qq.com',
    pass: 'your-smtp-authorization-code',
  },
});

export async function sendEmail(to, subject, html) {
  const info = await transporter.sendMail({
    from: '"Your Name" <your@qq.com>',
    to,
    subject,
    html,
  });
  console.log('邮件已发送:', info.messageId);
  return info;
}

// 使用示例
// await sendEmail(
//   'user@example.com',
//   'Hello',
//   '<h1>Hello</h1><p>This is a test email.</p>'
// );
```