# 异步编程

Node.js 的一大特色就是异步非阻塞 I/O。理解异步编程是掌握 Node.js 的关键。

## 一、为什么需要异步

```javascript
// ❌ 同步方式（阻塞）
const fs = require('fs');
const data = fs.readFileSync('./large-file.txt', 'utf8');
console.log('文件读取完成');
console.log('这行代码要等文件读完才会执行');

// ✅ 异步方式（非阻塞）
fs.readFile('./large-file.txt', 'utf8', (err, data) => {
    console.log('文件读取完成');
});
console.log('这行代码不需要等文件读完');
```

## 二、回调函数

回调函数是将一个函数作为参数传递给另一个函数，在操作完成后被调用。

### 1. 基本用法

```javascript
const fs = require('fs');

// 回调函数作为参数
fs.readFile('./hello.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('读取失败：', err);
        return;
    }
    console.log('文件内容：', data);
});

// 自定义回调
function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: 'Alice' };
        callback(null, data);  // 第一个参数传错误，第二个传数据
    }, 1000);
}

fetchData((err, data) => {
    if (err) {
        console.error('出错了');
        return;
    }
    console.log('获取到数据：', data);
});
```

### 2. 回调地狱

```javascript
// ❌ 回调地狱——深层嵌套难以维护
fs.readFile('a.txt', 'utf8', (err, dataA) => {
    if (err) return console.error(err);
    fs.readFile('b.txt', 'utf8', (err, dataB) => {
        if (err) return console.error(err);
        fs.readFile('c.txt', 'utf8', (err, dataC) => {
            if (err) return console.error(err);
            console.log(dataA, dataB, dataC);
        });
    });
});
```

## 三、Promise

Promise 是 ES6 引入的异步编程解决方案，用于解决回调地狱问题。

### 1. 创建 Promise

```javascript
// 创建一个 Promise
const promise = new Promise((resolve, reject) => {
    // 异步操作
    setTimeout(() => {
        const success = true;

        if (success) {
            resolve('操作成功！');
        } else {
            reject(new Error('操作失败'));
        }
    }, 1000);
});

// 使用 Promise
promise
    .then(result => {
        console.log('成功：', result);
    })
    .catch(err => {
        console.error('失败：', err);
    });
```

### 2. 将回调函数 Promise 化

```javascript
const fs = require('fs');

// 将 fs.readFile 转为 Promise 版本
function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// 使用
readFilePromise('./hello.txt')
    .then(data => {
        console.log('内容：', data);
        return readFilePromise('./world.txt');
    })
    .then(data => {
        console.log('内容：', data);
    })
    .catch(err => {
        console.error('读取失败：', err);
    });

// Node.js v10+ 提供了 util.promisify
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

readFile('./hello.txt', 'utf8').then(data => console.log(data));
```

### 3. Promise 静态方法

```javascript
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

// Promise.all —— 全部完成
Promise.all([
    readFile('./file1.txt', 'utf8'),
    readFile('./file2.txt', 'utf8'),
    readFile('./file3.txt', 'utf8'),
]).then(([data1, data2, data3]) => {
    console.log('所有文件内容：', data1, data2, data3);
}).catch(err => {
    console.error('任意一个失败：', err);
});

// Promise.allSettled —— 全部完成（无论成功还是失败）
Promise.allSettled([
    Promise.resolve('成功'),
    Promise.reject('失败'),
    Promise.resolve('也成功'),
]).then(results => {
    results.forEach((result, i) => {
        if (result.status === 'fulfilled') {
            console.log(`任务 ${i}: 成功 -> ${result.value}`);
        } else {
            console.log(`任务 ${i}: 失败 -> ${result.reason}`);
        }
    });
});

// Promise.race —— 谁先返回用谁
function delay(ms, value) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

Promise.race([
    delay(500, '慢速'),
    delay(100, '快速'),
]).then(result => {
    console.log('race 结果：', result);  // 快速
});

// Promise.any —— 取第一个成功的
Promise.any([
    Promise.reject('失败1'),
    delay(200, '成功'),
    Promise.reject('失败2'),
]).then(result => {
    console.log('any 结果：', result);  // 成功
});
```

## 四、async/await

async/await 是 ES2017 引入的语法糖，让异步代码看起来像同步代码。

### 1. 基本语法

```javascript
// 声明 async 函数
async function getData() {
    return 'Hello';
}

getData().then(data => console.log(data)); // Hello

// 使用 await
async function main() {
    const result = await Promise.resolve('World');
    console.log(result); // World
}

main();
```

### 2. 改写回调地狱

```javascript
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

// ✅ 使用 async/await 改写回调地狱
async function readAllFiles() {
    try {
        const dataA = await readFile('a.txt', 'utf8');
        const dataB = await readFile('b.txt', 'utf8');
        const dataC = await readFile('c.txt', 'utf8');
        console.log(dataA, dataB, dataC);
    } catch (err) {
        console.error('读取失败：', err);
    }
}

readAllFiles();
```

### 3. 错误处理

```javascript
// 方式一：try/catch
async function safeFetch(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('请求失败：', err.message);
        return null;
    }
}

// 方式二：catch 链
async function getData() {
    const data = await fetch('https://api.example.com/data').catch(err => {
        console.error('请求失败，返回默认值');
        return { default: true };
    });
    return data;
}

// 方式三：全局捕获
process.on('unhandledRejection', (err) => {
    console.error('未捕获的 Promise 异常：', err);
    process.exit(1);
});
```

### 4. 并发执行

```javascript
const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

// ❌ 串行执行（慢）
async function readSerial() {
    const a = await readFile('a.txt', 'utf8');
    const b = await readFile('b.txt', 'utf8');
    const c = await readFile('c.txt', 'utf8');
    return [a, b, c];
}

// ✅ 并行执行（快）
async function readParallel() {
    const results = await Promise.all([
        readFile('a.txt', 'utf8'),
        readFile('b.txt', 'utf8'),
        readFile('c.txt', 'utf8'),
    ]);
    return results;
}

// 并发获取多个 API
async function fetchMultipleUsers(ids) {
    const promises = ids.map(id =>
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => res.json())
    );
    const users = await Promise.all(promises);
    return users;
}
```

### 5. 串行与并行的选择

```javascript
// 串行 —— 后面的依赖前面的结果
async function processSequentially() {
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    return { user, posts, comments };
}

// 并行 —— 互不依赖
async function processParallel() {
    const [users, products, orders] = await Promise.all([
        fetchUsers(),
        fetchProducts(),
        fetchOrders(),
    ]);
    return { users, products, orders };
}

// 限制并发数（防止请求过多）
async function processWithLimit(tasks, limit = 3) {
    const results = [];
    const chunks = [];
    for (let i = 0; i < tasks.length; i += limit) {
        chunks.push(tasks.slice(i, i + limit));
    }
    for (const chunk of chunks) {
        const res = await Promise.all(chunk.map(fn => fn()));
        results.push(...res);
    }
    return results;
}
```

## 五、EventEmitter（事件发射器）

Node.js 的很多核心模块都基于事件驱动，通过 EventEmitter 实现。

### 1. 基本用法

```javascript
const EventEmitter = require('events');

// 创建发射器
const emitter = new EventEmitter();

// 注册事件监听
emitter.on('greet', (name) => {
    console.log(`你好，${name}！`);
});

emitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

// 触发事件
emitter.emit('greet', 'Node.js');
// 输出：
// 你好，Node.js！
// Hello, Node.js!
```

### 2. 常用方法

```javascript
const EventEmitter = require('events');

const emitter = new EventEmitter();

// on —— 注册监听
emitter.on('data', handler);

// once —— 只监听一次
emitter.once('connect', () => {
    console.log('已连接（只会触发一次）');
});

// off / removeListener —— 移除监听
const handler = (data) => console.log(data);
emitter.on('data', handler);
emitter.off('data', handler);

// removeAllListeners —— 移除所有监听
emitter.removeAllListeners('error');

// listenerCount —— 监听器数量
console.log(emitter.listenerCount('data'));

// eventNames —— 所有事件名
console.log(emitter.eventNames());
```

### 3. 自定义事件类

```javascript
const EventEmitter = require('events');

class Downloader extends EventEmitter {
    download(url) {
        console.log(`开始下载：${url}`);
        this.emit('start', url);

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            this.emit('progress', progress);

            if (progress >= 100) {
                clearInterval(interval);
                this.emit('end', url);
            }
        }, 500);
    }
}

// 使用
const downloader = new Downloader();

downloader.on('start', (url) => {
    console.log(`[事件] 开始下载 ${url}`);
});

downloader.on('progress', (percent) => {
    console.log(`[事件] 下载进度：${percent}%`);
});

downloader.on('end', (url) => {
    console.log(`[事件] 下载完成：${url}`);
});

downloader.download('https://example.com/file.zip');
```

### 4. 继承 EventEmitter

```javascript
const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(level, message) {
        const entry = {
            level,
            message,
            timestamp: new Date().toISOString(),
        };
        this.emit('log', entry);
        this.emit(level, entry);
    }
}

const logger = new Logger();

logger.on('log', (entry) => {
    console.log(`[${entry.timestamp}] ${entry.level}: ${entry.message}`);
});

logger.on('error', (entry) => {
    console.error('❗', entry.message);
});

logger.log('info', '应用启动');
logger.log('warn', '磁盘空间不足');
logger.log('error', '数据库连接超时');
```

## 六、异步模式选择指南

| 场景 | 推荐方式 |
|------|---------|
| 简单的回调 | 回调函数 |
| 多层嵌套 | Promise + async/await |
| 并发多个操作 | Promise.all |
| 事件驱动场景 | EventEmitter |
| 流式数据 | Stream（见第 8 章） |

## 七、练习

1. 使用 `Promise.all` 同时读取三个文件并拼接内容
2. 实现一个事件驱动的任务队列（TaskQueue），支持 `on('task-start')`、`on('task-end')` 事件
3. 用 async/await 实现一个带重试机制的 HTTP 请求函数
