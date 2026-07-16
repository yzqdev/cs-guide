---
order: 5
---

# HTTP 模块

`http` 模块是 Node.js 的核心模块，用于创建 HTTP 服务器和发送 HTTP 请求。

## 一、创建 HTTP 服务器

### 1. 最简单的服务器

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Hello, World!\n');
});

server.listen(3000, () => {
    console.log('服务器已启动：http://localhost:3000');
});
```

运行后访问 `http://localhost:3000`，浏览器显示 `Hello, World!`。

### 2. 处理不同路由

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    const { url, method } = req;

    // 设置通用响应头
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (url === '/' && method === 'GET') {
        res.end('<h1>首页</h1><a href="/about">关于我们</a>');
    } else if (url === '/about') {
        res.end('<h1>关于我们</h1><p>这是一个 Node.js 示例</p>');
    } else if (url === '/api/users' && method === 'GET') {
        // 返回 JSON
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
        ]));
    } else {
        // 404
        res.statusCode = 404;
        res.end('<h1>404 - 页面未找到</h1>');
    }
});

server.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});
```

### 3. 获取请求信息

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // 请求行
    console.log('请求方法：', req.method);
    console.log('请求路径：', req.url);
    console.log('HTTP 版本：', req.httpVersion);

    // 请求头
    console.log('User-Agent:', req.headers['user-agent']);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Cookie:', req.headers['cookie']);

    // 获取客户端 IP
    const ip = req.headers['x-forwarded-for']
        || req.socket.remoteAddress;
    console.log('客户端 IP:', ip);

    res.end('请求信息已打印到控制台');
});

server.listen(3000);
```

### 4. 处理 POST 请求体

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/data') {
        let body = '';

        // 接收数据
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // 接收完毕
        req.on('end', () => {
            console.log('收到的数据：', body);

            // 尝试解析 JSON
            try {
                const json = JSON.parse(body);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, received: json }));
            } catch (e) {
                res.statusCode = 400;
                res.end('无效的 JSON');
            }
        });
    } else {
        // 返回一个简单的 HTML 表单
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <form method="POST" action="/api/data">
                <input name="name" placeholder="名称" />
                <button type="submit">提交</button>
            </form>
            <script>
                document.querySelector('form').onsubmit = async (e) => {
                    e.preventDefault();
                    const name = document.querySelector('input').value;
                    const res = await fetch('/api/data', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name })
                    });
                    alert(JSON.stringify(await res.json()));
                };
            </script>
        `);
    }
});

server.listen(3000);
```

## 二、处理静态文件

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = path.extname(filePath);
    const mimeTypes = {
        '.html': 'text/html',
        '.js':   'application/javascript',
        '.css':  'text/css',
        '.json': 'application/json',
        '.png':  'image/png',
        '.jpg':  'image/jpeg',
        '.gif':  'image/gif',
        '.svg':  'image/svg+xml',
        '.ico':  'image/x-icon',
    };

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.end('404 Not Found');
            return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', mimeTypes[extname] || 'application/octet-stream');
        res.end(data);
    });
});

server.listen(3000, () => {
    console.log('静态文件服务器：http://localhost:3000');
});
```

## 三、HTTP 客户端（发送请求）

### 1. 使用 http.get

```javascript
const http = require('http');

// 发送 GET 请求
http.get('http://localhost:3000/api/users', (res) => {
    let data = '';

    res.on('data', chunk => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('响应状态码：', res.statusCode);
        console.log('响应数据：', JSON.parse(data));
    });
}).on('error', (err) => {
    console.error('请求失败：', err);
});
```

### 2. 使用 http.request（自定义方法）

```javascript
const http = require('http');

const postData = JSON.stringify({ name: 'Alice', age: 25 });

// 发送 POST 请求
const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/users',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
    },
};

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', chunk => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('状态码：', res.statusCode);
        console.log('响应：', data);
    });
});

req.on('error', (err) => {
    console.error('请求失败：', err);
});

// 写入请求体
req.write(postData);
req.end();
```

### 3. 使用 fetch（Node.js v18+）

```javascript
// Node.js v18+ 内置 fetch
async function fetchExample() {
    try {
        // GET 请求
        const getRes = await fetch('http://jsonplaceholder.typicode.com/todos/1');
        const todo = await getRes.json();
        console.log('GET 结果：', todo);

        // POST 请求
        const postRes = await fetch('http://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
        });
        const newPost = await postRes.json();
        console.log('POST 结果：', newPost);

    } catch (err) {
        console.error('请求失败：', err);
    }
}

fetchExample();
```

## 四、URL 解析

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // 方式一：使用 URL 构造函数
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    console.log('路径名：', parsedUrl.pathname);     // /search
    console.log('查询参数：', parsedUrl.searchParams.get('q')); // nodejs

    // 方式二：使用 url.parse（旧版）
    const parsed = url.parse(req.url, true);
    console.log('路径：', parsed.pathname);
    console.log('查询参数：', parsed.query);

    // 根据查询参数响应
    const name = parsedUrl.searchParams.get('name') || 'World';
    res.end(`Hello, ${name}!`);
});

server.listen(3000);
// 访问：http://localhost:3000/?name=Node.js
```

## 五、路由与 RESTful API 示例

```javascript
const http = require('http');

// 模拟数据库
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
];
let nextId = 3;

function sendJSON(res, status, data) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data, null, 2));
}

function getBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                reject(new Error('无效的 JSON'));
            }
        });
        req.on('error', reject);
    });
}

const server = http.createServer(async (req, res) => {
    // 允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理 OPTIONS 预检请求
    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    try {
        // GET /api/users —— 获取用户列表
        if (method === 'GET' && pathname === '/api/users') {
            return sendJSON(res, 200, users);
        }

        // GET /api/users/:id —— 获取单个用户
        const matchOne = pathname.match(/^\/api\/users\/(\d+)$/);
        if (method === 'GET' && matchOne) {
            const id = Number(matchOne[1]);
            const user = users.find(u => u.id === id);
            if (!user) return sendJSON(res, 404, { error: '用户不存在' });
            return sendJSON(res, 200, user);
        }

        // POST /api/users —— 创建用户
        if (method === 'POST' && pathname === '/api/users') {
            const body = await getBody(req);
            if (!body.name) return sendJSON(res, 400, { error: 'name 是必填字段' });
            const newUser = { id: nextId++, name: body.name, email: body.email || '' };
            users.push(newUser);
            return sendJSON(res, 201, newUser);
        }

        // PUT /api/users/:id —— 更新用户
        if (method === 'PUT' && matchOne) {
            const id = Number(matchOne[1]);
            const index = users.findIndex(u => u.id === id);
            if (index === -1) return sendJSON(res, 404, { error: '用户不存在' });
            const body = await getBody(req);
            users[index] = { ...users[index], ...body, id };
            return sendJSON(res, 200, users[index]);
        }

        // DELETE /api/users/:id —— 删除用户
        if (method === 'DELETE' && matchOne) {
            const id = Number(matchOne[1]);
            const index = users.findIndex(u => u.id === id);
            if (index === -1) return sendJSON(res, 404, { error: '用户不存在' });
            users.splice(index, 1);
            return sendJSON(res, 204);
        }

        // 404
        sendJSON(res, 404, { error: '接口不存在' });

    } catch (err) {
        sendJSON(res, 400, { error: err.message });
    }
});

server.listen(3000, () => {
    console.log('RESTful API 服务器：http://localhost:3000');
    console.log('可用接口：');
    console.log('  GET    /api/users');
    console.log('  GET    /api/users/:id');
    console.log('  POST   /api/users');
    console.log('  PUT    /api/users/:id');
    console.log('  DELETE /api/users/:id');
});
```

## 六、HTTPS 服务器

```javascript
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./ssl/private.key'),
    cert: fs.readFileSync('./ssl/certificate.crt'),
};

https.createServer(options, (req, res) => {
    res.end('这是一个 HTTPS 服务器');
}).listen(443, () => {
    console.log('HTTPS 服务器运行在 https://localhost');
});
```

## 七、练习

1. 创建一个 HTTP 服务器，提供 `/api/current-time` 接口返回当前时间
2. 实现一个简单的留言板 API（GET 获取列表、POST 添加留言）
3. 使用 `http.get` 请求一个公开 API 并打印结果
