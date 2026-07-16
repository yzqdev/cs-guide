---
order: 9
---

# Express 框架入门

Express 是 Node.js 最流行的 Web 框架，提供了简洁的路由、中间件机制，是构建 Web 应用和 API 的首选框架。

## 一、安装与基本使用

```bash
# 创建项目并安装 Express
mkdir my-express-app && cd my-express-app
npm init -y
npm install express
```

### 1. 最简单的 Express 应用

```javascript
// app.js
const express = require('express');
const app = express();
const port = 3000;

// 路由
app.get('/', (req, res) => {
    res.send('Hello Express!');
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
```

```bash
node app.js
# 访问 http://localhost:3000
```

### 2. 路由基础

```javascript
const express = require('express');
const app = express();

// GET 请求
app.get('/', (req, res) => {
    res.send('首页');
});

// POST 请求
app.post('/api/users', (req, res) => {
    res.send('创建用户');
});

// PUT 请求
app.put('/api/users/:id', (req, res) => {
    res.send(`更新用户 ${req.params.id}`);
});

// DELETE 请求
app.delete('/api/users/:id', (req, res) => {
    res.send(`删除用户 ${req.params.id}`);
});

// 匹配所有方法
app.all('/api/*', (req, res) => {
    res.send('匹配所有请求方法');
});
```

## 二、路由参数

```javascript
const express = require('express');
const app = express();

// 路径参数
app.get('/users/:id', (req, res) => {
    // req.params —— 路径参数
    console.log('用户 ID：', req.params.id);

    // req.query —— 查询参数（URL 中 ? 后面的部分）
    // /users/123?page=1&limit=10
    console.log('分页：', req.query.page, req.query.limit);

    res.json({
        id: req.params.id,
        query: req.query,
    });
});

// 多个参数
app.get('/posts/:year/:month/:slug', (req, res) => {
    const { year, month, slug } = req.params;
    res.json({ year, month, slug });
});

// 可选参数（使用 ?）
app.get('/products/:category?/:subcategory?', (req, res) => {
    res.json(req.params);
});
```

## 三、中间件

中间件是 Express 的核心概念，它是请求处理管道中的函数，可以修改 `req` 和 `res` 对象，或终止请求。

```javascript
const express = require('express');
const app = express();

// ---------------------------------------
// 1. 应用级中间件（全局）
// ---------------------------------------

// 日志中间件
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();  // 调用 next 进入下一个中间件
});

// 请求时间中间件
app.use((req, res, next) => {
    req.requestTime = Date.now();
    next();
});

// ---------------------------------------
// 2. 内置中间件
// ---------------------------------------

// 解析 JSON 请求体（Content-Type: application/json）
app.use(express.json());

// 解析 URL-encoded 请求体（表单提交）
app.use(express.urlencoded({ extended: true }));

// 提供静态文件服务
app.use(express.static('public'));
// 访问：http://localhost:3000/image.png → 返回 ./public/image.png

// ---------------------------------------
// 3. 路由级中间件
// ---------------------------------------

// 用户认证中间件
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: '未提供认证令牌' });
    }
    // 验证 token...
    req.user = { id: 1, name: 'Alice' };
    next();
}

// 只在 /admin 路由上使用
app.use('/admin', authMiddleware);

app.get('/admin/dashboard', (req, res) => {
    res.json({ message: `欢迎 ${req.user.name}`, data: '管理面板' });
});

// ---------------------------------------
// 4. 错误处理中间件（4 个参数）
// ---------------------------------------

app.use((err, req, res, next) => {
    console.error('错误：', err.stack);
    res.status(err.status || 500).json({
        error: err.message || '服务器内部错误',
    });
});

// ---------------------------------------
// 5. 404 处理（放在最后）
// ---------------------------------------

app.use((req, res) => {
    res.status(404).json({ error: '接口不存在' });
});
```

## 四、请求对象（req）

```javascript
app.get('/request-demo', (req, res) => {
    // 请求参数
    req.params;     // 路径参数
    req.query;      // 查询参数
    req.body;       // 请求体（需要中间件解析）

    // 请求信息
    req.path;       // 路径
    req.method;     // 请求方法
    req.hostname;   // 主机名
    req.ip;         // 客户端 IP
    req.protocol;   // 协议（http/https）

    // 请求头
    req.get('Content-Type');
    req.headers['user-agent'];

    // 自定义属性（由中间件添加）
    req.requestTime;
    req.user;

    res.json({
        path: req.path,
        method: req.method,
        hostname: req.hostname,
        ip: req.ip,
        headers: req.headers,
    });
});
```

## 五、响应对象（res）

```javascript
app.get('/response-demo', (req, res) => {
    // 发送各种响应

    // 1. 发送字符串
    res.send('Hello World');

    // 2. 发送 JSON
    res.json({ message: 'Hello' });

    // 3. 发送 HTML
    res.send('<h1>Hello</h1>');

    // 4. 发送状态码
    res.status(201).json({ created: true });

    // 5. 重定向
    res.redirect('/new-path');
    res.redirect(301, '/permanent-redirect');

    // 6. 设置响应头
    res.setHeader('X-Custom', 'custom value');
    res.set('X-Custom', 'custom value');

    // 7. 设置 Cookie
    res.cookie('token', 'abc123', {
        maxAge: 24 * 60 * 60 * 1000,  // 1 天
        httpOnly: true,                 // 禁止 JS 访问
        secure: true,                   // 仅 HTTPS
        sameSite: 'strict',            // CSRF 防护
    });

    // 8. 清除 Cookie
    res.clearCookie('token');

    // 9. 发送文件
    res.sendFile('/path/to/file.pdf');

    // 10. 设置响应格式
    res.format({
        'text/plain': () => res.send('Hello'),
        'text/html': () => res.send('<h1>Hello</h1>'),
        'application/json': () => res.json({ message: 'Hello' }),
        default: () => res.status(406).send('Not Acceptable'),
    });
});
```

## 六、路由模块化

将路由拆分到独立文件，保持代码清晰。

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

// 模拟数据库
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// GET /api/users
router.get('/', (req, res) => {
    res.json(users);
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));
    if (!user) {
        return res.status(404).json({ error: '用户不存在' });
    }
    res.json(user);
});

// POST /api/users
router.post('/', (req, res) => {
    const { name, email } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'name 是必填字段' });
    }
    const newUser = {
        id: users.length + 1,
        name,
        email: email || '',
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /api/users/:id
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({ error: '用户不存在' });
    }
    users[index] = { ...users[index], ...req.body, id };
    res.json(users[index]);
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({ error: '用户不存在' });
    }
    users.splice(index, 1);
    res.status(204).send();
});

module.exports = router;
```

```javascript
// app.js —— 主入口
const express = require('express');
const app = express();

app.use(express.json());

// 挂载路由模块
app.use('/api/users', require('./routes/users'));

// 可以添加更多路由模块
// app.use('/api/posts', require('./routes/posts'));
// app.use('/api/products', require('./routes/products'));

// 404 处理
app.use((req, res) => {
    res.status(404).json({ error: '接口不存在' });
});

// 错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '服务器内部错误' });
});

app.listen(3000, () => {
    console.log('API 服务器：http://localhost:3000');
});
```

## 七、模板引擎

Express 可以与模板引擎配合使用生成 HTML 页面。

```bash
npm install ejs
```

```javascript
const express = require('express');
const app = express();

// 设置模板引擎
app.set('view engine', 'ejs');

// 模拟数据
const posts = [
    { title: 'Node.js 入门', content: '这是一篇关于 Node.js 的文章...' },
    { title: 'Express 教程', content: 'Express 是 Node.js 最流行的框架...' },
];

// 渲染模板
app.get('/', (req, res) => {
    res.render('index', {
        title: '我的博客',
        posts,
    });
});
```

```html
<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1><%= title %></h1>
    <ul>
        <% posts.forEach(post => { %>
            <li>
                <h2><%= post.title %></h2>
                <p><%= post.content %></p>
            </li>
        <% }) %>
    </ul>
</body>
</html>
```

## 八、综合示例：Express RESTful API

```javascript
const express = require('express');
const app = express();

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 日志中间件
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
    });
    next();
});

// 模拟数据库
let tasks = [
    { id: 1, title: '学习 Node.js', completed: false },
    { id: 2, title: '学习 Express', completed: true },
];
let nextId = 3;

// 获取所有任务
app.get('/api/tasks', (req, res) => {
    const { completed, page = 1, limit = 10 } = req.query;

    let result = [...tasks];

    // 过滤
    if (completed !== undefined) {
        result = result.filter(t => t.completed === (completed === 'true'));
    }

    // 分页
    const start = (Number(page) - 1) * Number(limit);
    const paginated = result.slice(start, start + Number(limit));

    res.json({
        total: result.length,
        page: Number(page),
        limit: Number(limit),
        data: paginated,
    });
});

// 获取单个任务
app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));
    if (!task) {
        return res.status(404).json({ error: '任务不存在' });
    }
    res.json(task);
});

// 创建任务
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    if (!title || !title.trim()) {
        return res.status(400).json({ error: 'title 是必填字段' });
    }
    const newTask = {
        id: nextId++,
        title: title.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 更新任务
app.put('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: '任务不存在' });
    }
    tasks[index] = { ...tasks[index], ...req.body, id };
    res.json(tasks[index]);
});

// 删除任务
app.delete('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: '任务不存在' });
    }
    tasks.splice(index, 1);
    res.status(204).send();
});

// 错误处理
app.use((err, req, res, next) => {
    console.error('未捕获错误：', err);
    res.status(500).json({ error: '服务器内部错误' });
});

// 404
app.use((req, res) => {
    res.status(404).json({ error: '接口不存在' });
});

app.listen(3000, () => {
    console.log('任务管理 API：http://localhost:3000/api/tasks');
});
```

## 九、常用中间件

```bash
npm install cors helmet morgan compression
```

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const app = express();

// 安全头
app.use(helmet());

// 跨域支持
app.use(cors());

// 日志
app.use(morgan('combined'));

// Gzip 压缩
app.use(compression());

// 其他配置...
```

| 中间件 | 作用 |
|--------|------|
| `cors` | 处理跨域请求 |
| `helmet` | 设置安全相关 HTTP 头 |
| `morgan` | HTTP 请求日志 |
| `compression` | Gzip/Brotli 压缩响应 |
| `cookie-parser` | 解析 Cookie |
| `express-session` | Session 管理 |
| `multer` | 文件上传处理 |
| `passport` | 认证中间件 |
| `express-validator` | 请求数据验证 |
| `rate-limiter-flexible` | 请求频率限制 |

## 十、练习

1. 使用 Express 实现一个完整的 Todo API（CRUD），支持过滤和分页
2. 添加一个日志中间件，记录每个请求的耗时到日志文件
3. 实现一个静态文件服务器 + API 的混合应用
