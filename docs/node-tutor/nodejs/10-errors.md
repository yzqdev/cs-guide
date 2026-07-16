---
order: 10
---

# 错误处理与调试

## 一、错误类型

Node.js 中的错误主要分为以下几类：

### 1. JavaScript 运行时错误

```javascript
// ReferenceError —— 引用不存在的变量
console.log(unknownVariable); // ReferenceError

// TypeError —— 类型错误
const str = 'hello';
str(); // TypeError: str is not a function

// RangeError —— 超出范围
const arr = new Array(-1); // RangeError

// SyntaxError —— 语法错误（代码无法运行）
// const a = ; // SyntaxError
```

### 2. 系统错误

```javascript
const fs = require('fs');

// ENOENT —— 文件/目录不存在
try {
    fs.readFileSync('./not-exist.txt');
} catch (err) {
    console.log(err.code);   // 'ENOENT'
    console.log(err.syscall); // 'open'
    console.log(err.path);    // './not-exist.txt'
}

// EACCES —— 权限不足
// EEXIST —— 文件已存在
// EISDIR —— 是目录不是文件
// ENOTDIR —— 不是目录
```

## 二、错误处理方式

### 1. try/catch

```javascript
// 同步代码
try {
    const data = JSON.parse('{invalid json}');
} catch (err) {
    console.error('JSON 解析失败：', err.message);
}

// async/await
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
            throw new Error(`HTTP 错误：${response.status}`);
        }
        return await response.json();
    } catch (err) {
        console.error('请求失败：', err.message);
        // 返回默认值
        return { error: true, message: err.message };
    }
}
```

### 2. 回调中的错误

```javascript
const fs = require('fs');

// 错误优先回调 —— 第一个参数是 error
fs.readFile('./config.json', 'utf8', (err, data) => {
    if (err) {
        // 处理错误
        console.error('读取失败：', err.message);
        return;
    }
    // 处理数据
    try {
        const config = JSON.parse(data);
        console.log(config);
    } catch (parseErr) {
        console.error('JSON 解析失败：', parseErr.message);
    }
});
```

### 3. Promise 错误处理

```javascript
// catch 方法
const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

readFile('./config.json', 'utf8')
    .then(data => JSON.parse(data))
    .then(config => {
        console.log('配置：', config);
    })
    .catch(err => {
        console.error('操作失败：', err.message);
    });

// 全局未捕获 Promise 异常
process.on('unhandledRejection', (reason, promise) => {
    console.error('未捕获的 Promise 拒绝：', reason);
});
```

## 三、自定义错误

```javascript
// 自定义错误类
class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.isOperational = true;  // 可操作错误 vs 编程错误
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends AppError {
    constructor(message, field) {
        super(message, 400);
        this.name = 'ValidationError';
        this.field = field;
    }
}

class NotFoundError extends AppError {
    constructor(resource = '资源') {
        super(`${resource}不存在`, 404);
        this.name = 'NotFoundError';
    }
}

// 使用
function getUser(id) {
    const user = database.find(u => u.id === id);
    if (!user) {
        throw new NotFoundError('用户');
    }
    return user;
}

function validateUser(data) {
    if (!data.name) {
        throw new ValidationError('名称不能为空', 'name');
    }
}

// Express 中的使用
app.get('/users/:id', (req, res, next) => {
    try {
        const user = getUser(Number(req.params.id));
        res.json(user);
    } catch (err) {
        next(err);  // 传给错误处理中间件
    }
});

// 错误处理中间件
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : '服务器内部错误';

    // 记录日志
    console.error(`[${statusCode}] ${err.message}`);
    if (!err.isOperational) {
        console.error('非可操作错误，堆栈：', err.stack);
    }

    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});
```

## 四、调试技巧

### 1. console 调试

```javascript
// 基本调试
console.log('变量值：', variable);
console.table(array);  // 表格形式显示数组/对象

// 打印对象详细信息
console.dir(obj, { depth: null, colors: true });

// 性能跟踪
console.time('operation');
// ... 执行操作 ...
console.timeEnd('operation');

// 条件调试
console.assert(condition, '条件不满足时的消息');

// 堆栈追踪
console.trace('追踪点');
```

### 2. Node.js 内置调试器

```bash
# 使用 inspect 标志启动
node inspect app.js

# 在代码中设置断点
# 代码中添加：debugger;

# 常用调试命令
# cont / c     —— 继续执行
# next / n     —— 下一步
# step / s     —— 进入函数
# out / o      —— 跳出函数
# watch('var') —— 监视变量
# repl         —— 进入 REPL
```

### 3. Chrome DevTools 调试

```bash
# 方式一：命令行标志
node --inspect app.js
# 在 Chrome 浏览器中打开 chrome://inspect

# 方式二：等待调试器连接
node --inspect-brk app.js  # 在第一行暂停
```

### 4. 使用 VS Code 调试

`.vscode/launch.json` 配置：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "启动程序",
            "skipFiles": ["<node_internals>/**"],
            "program": "${workspaceFolder}/app.js"
        },
        {
            "type": "node",
            "request": "launch",
            "name": "调试当前文件",
            "program": "${file}"
        },
        {
            "type": "node",
            "request": "attach",
            "name": "附加到进程",
            "port": 9229
        }
    ]
}
```

## 五、进程异常处理

```javascript
// 未捕获的异常
process.on('uncaughtException', (err) => {
    console.error('未捕获异常：', err);
    // 记录日志...
    // 优雅关闭服务器
    server.close(() => {
        process.exit(1);
    });
    // 如果 30 秒内没有关闭，强制退出
    setTimeout(() => process.exit(1), 30000);
});

// 未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
    console.error('未处理的 Promise 拒绝：', reason);
});

// 进程退出前清理
process.on('exit', (code) => {
    console.log(`进程退出，退出码：${code}`);
});

// 监听信号
process.on('SIGTERM', () => {
    console.log('收到 SIGTERM 信号，准备关闭...');
    server.close(() => {
        console.log('服务器已关闭');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n收到 SIGINT 信号（Ctrl+C），准备关闭...');
    server.close(() => process.exit(0));
});
```

## 六、日志管理

```javascript
const fs = require('fs');
const path = require('path');

// 简易日志工具
class Logger {
    constructor(logDir = './logs') {
        this.logDir = logDir;
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
    }

    getLogFile() {
        const date = new Date().toISOString().slice(0, 10);
        return path.join(this.logDir, `${date}.log`);
    }

    write(level, message, meta = {}) {
        const entry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            pid: process.pid,
            ...meta,
        };

        const line = JSON.stringify(entry) + '\n';
        fs.appendFileSync(this.getLogFile(), line);

        // 同时输出到控制台
        const prefix = level === 'ERROR' ? '❌' : level === 'WARN' ? '⚠️' : 'ℹ️';
        console.log(`${prefix} [${level}] ${message}`);
    }

    info(message, meta) { this.write('INFO', message, meta); }
    warn(message, meta) { this.write('WARN', message, meta); }
    error(message, meta) { this.write('ERROR', message, meta); }
}

const logger = new Logger();

// 使用示例
logger.info('应用启动', { port: 3000 });
logger.warn('磁盘空间不足', { free: '500MB' });
logger.error('数据库连接失败', { db: 'mysql', host: 'localhost' });
```

## 七、生产环境最佳实践

```javascript
const express = require('express');

// 1. 使用进程管理器
// pm2 start app.js -i max    （利用多核 CPU）
// pm2 monit                  （监控）
// pm2 logs                   （查看日志）

// 2. 健康检查接口
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now(),
        memory: process.memoryUsage(),
    });
});

// 3. 优雅关闭
async function gracefulShutdown(signal) {
    console.log(`收到 ${signal}，开始优雅关闭...`);

    server.close(() => {
        console.log('HTTP 服务器已关闭');
        // 关闭数据库连接...
        // 释放其他资源...
        process.exit(0);
    });

    // 超时强制关闭
    setTimeout(() => {
        console.error('超时未完成，强制退出');
        process.exit(1);
    }, 30000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// 4. 环境配置
const config = {
    development: {
        port: 3000,
        debug: true,
        logLevel: 'debug',
    },
    production: {
        port: process.env.PORT || 8080,
        debug: false,
        logLevel: 'info',
    },
};

const env = process.env.NODE_ENV || 'development';
const appConfig = config[env];

// 5. 请求验证
const { body, validationResult } = require('express-validator');

app.post('/api/users',
    body('email').isEmail().withMessage('请输入有效的邮箱'),
    body('age').isInt({ min: 0, max: 150 }).withMessage('年龄不合法'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // 处理请求...
    }
);
```

## 八、常见错误与解决方案

| 错误信息 | 原因 | 解决方案 |
|---------|------|---------|
| `ENOENT` | 文件或目录不存在 | 检查路径，先创建目录 |
| `EACCES` | 权限不足 | 检查文件权限，使用管理员运行 |
| `EADDRINUSE` | 端口被占用 | 换端口或关闭占用程序 |
| `MODULE_NOT_FOUND` | 模块未找到 | 检查 `require` 路径，确认已安装 |
| `listen EADDRNOTAVAIL` | 地址不可用 | 检查 IP 地址是否正确 |
| `ERR_HTTP_HEADERS_SENT` | 重复发送响应头 | 检查只调用一次 `res.send/json/end` |
| `ERR_STREAM_WRITE_AFTER_END` | 流已关闭后写入 | 检查流状态，确认没有重复 `end` |
| `FATAL ERROR` | 内存溢出 | 检查内存泄漏，增加 `--max-old-space-size` |
| `ECONNRESET` | 连接被重置 | 检查网络稳定性，增加重试机制 |

## 九、练习

1. 为 Express 应用添加完整的错误处理中间件，区分可操作错误和编程错误
2. 实现一个日志模块，支持按日期轮转、不同级别、自动清理旧日志
3. 使用 VS Code 调试器设置断点，逐步调试一个 Express 路由处理函数
