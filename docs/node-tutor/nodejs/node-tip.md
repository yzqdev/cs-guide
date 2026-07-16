---
order: 12
---

# Node.js 常见问题

收集整理 Node.js 开发中遇到的常见问题及解决方案。

---

## 一、安装与环境

### 1. 安装 `sqlite3` 出错，找不到 `distutils`

**错误信息：**

```text
ModuleNotFoundError: No module named 'distutils'
```

**原因：** Python 3.12+ 移除了 `distutils`，而 `sqlite3` 的原生编译依赖它。

**解决方案：**

```bash
# 方案一：安装 setuptools（推荐）
pip install setuptools

# 然后重新安装 sqlite3
npm install sqlite3

# 方案二：更换为 better-sqlite3（纯 JavaScript，无需编译）
npm install better-sqlite3
```

### 2. 安装 node-gyp 编译失败

**错误信息：**

```text
gyp ERR! stack Error: not found: make
```

**解决方案：**

```bash
# Windows：安装 Build Tools
npm install --global windows-build-tools

# Mac：安装 Xcode Command Line Tools
xcode-select --install

# Linux：安装 build-essential
sudo apt install build-essential python3 make g++
```

### 3. `npm install` 速度慢 / 安装失败

```bash
# 使用国内镜像源
npm config set registry https://registry.npmmirror.com

# 临时使用镜像源安装
npm install express --registry=https://registry.npmmirror.com

# 清除缓存后重试
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 二、模块与包管理

### 4. `MODULE_NOT_FOUND` 错误

**原因：** `require` 路径错误或模块未安装。

**排查步骤：**

1. 检查路径是否正确（`./` 表示同级目录）
2. 确认 `node_modules` 中是否安装了该包
3. 确认 `package.json` 的 `dependencies` 中有声明

```bash
# 查看模块查找路径
node -e "console.log(module.paths)"

# 确认包是否已安装
npm ls 包名

# 重置安装
rm -rf node_modules && npm install
```

### 5. `ERR_REQUIRE_ESM` 引入 ESM 模块报错

**错误信息：**

```text
Error [ERR_REQUIRE_ESM]: require() of ES Module not supported
```

**原因：** 在 CommonJS 中使用 `require()` 引入 ESM 模块。

**解决方案：**

```javascript
// 方案一：使用动态 import（推荐）
async function loadESM() {
    const esm = await import('esm-package');
    console.log(esm.default);
}

// 方案二：将项目改为 ESM（package.json 中添加 "type": "module"）
// {
//   "type": "module"
// }

// 方案三：使用 .mjs 后缀
```

### 6. `package.json` 的 `imports` 字段用法

`imports` 字段可以为模块定义别名，简化导入路径：

```json
{
    "name": "my-app",
    "imports": {
        "#utils": "./src/utils/index.js",
        "#utils/*": "./src/utils/*.js",
        "#models": "./src/models/index.js",
        "#config": "./src/config/index.js"
    }
}
```

使用方式：

```javascript
// 原本的导入路径
const { formatDate } = require('../../../utils/date.js');

// 使用 imports 别名后
const { formatDate } = require('#utils/date');
// 或 ESM 方式
import { formatDate } from '#utils/date';
```

> 官方文档：https://nodejs.org/api/packages.html#imports

---

## 三、运行时错误

### 7. `EADDRINUSE` 端口被占用

**错误信息：**

```text
Error: listen EADDRINUSE :::3000
```

**解决方案：**

```bash
# 查看端口占用
# Windows
netstat -ano | findstr :3000
taskkill /PID 进程号 /F

# Mac / Linux
lsof -i :3000
kill -9 PID
```

```javascript
// 程序化处理：自动寻找可用端口
const net = require('net');

function findFreePort(startPort = 3000) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.listen(startPort, () => {
            const port = server.address().port;
            server.close(() => resolve(port));
        });
        server.on('error', () => {
            resolve(findFreePort(startPort + 1));
        });
    });
}

// 使用
const port = await findFreePort();
app.listen(port);
```

### 8. `ERR_HTTP_HEADERS_SENT` 重复发送响应

**错误信息：**

```text
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
```

**原因：** 多次调用 `res.send()` / `res.json()` / `res.end()`。

**解决方案：**

```javascript
// ❌ 错误：条件分支未使用 return
app.get('/api/user/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'ID 必填' });
        // 缺少 return，代码继续执行
    }
    res.json({ id: req.params.id }); // 报错！
});

// ✅ 正确：每个分支都 return
app.get('/api/user/:id', (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ error: 'ID 必填' });
    }
    res.json({ id: req.params.id });
});

// ✅ 或者使用 else
app.get('/api/user/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'ID 必填' });
    } else {
        res.json({ id: req.params.id });
    }
});
```

### 9. `ENOENT` 文件不存在

**错误信息：**

```text
Error: ENOENT: no such file or directory, open '...'
```

**解决方案：**

```javascript
const fs = require('fs');
const path = require('path');

// 1. 检查路径是否存在
if (fs.existsSync('./config.json')) {
    const data = fs.readFileSync('./config.json', 'utf8');
}

// 2. 自动创建目录（安全写入）
function safeWriteFile(filePath, content) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
}

// 3. 使用 path.resolve 避免相对路径问题
const fullPath = path.resolve(__dirname, 'config.json');
```

### 10. `heap out of memory` 内存溢出

**解决方案：**

```bash
# 增加 Node.js 内存限制（默认约 2GB）
node --max-old-space-size=4096 app.js

# 使用 PM2 时设置
pm2 start app.js --node-args="--max-old-space-size=4096"

# 排查内存泄漏
node --inspect app.js
# 然后打开 chrome://inspect，使用 Memory 面板分析
```

---

## 四、异步与并发

### 11. `UnhandledPromiseRejection` 未捕获的 Promise 异常

**解决方案：**

```javascript
// 1. 全局捕获（兜底方案）
process.on('unhandledRejection', (reason, promise) => {
    console.error('未捕获的 Promise 异常：', reason);
    // 记录日志、发送告警...
});

// 2. 养成好习惯：每个 Promise 都加 catch
async function riskyOperation() {
    try {
        await doSomething();
    } catch (err) {
        console.error('操作失败：', err);
    }
}

// 3. 使用 ESLint 规则强制处理
// .eslintrc: "no-unused-promises": "error"
```

### 12. 回调地狱（Callback Hell）

**解决方案：** 使用 Promise / async/await

```javascript
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

// ❌ 回调地狱
fs.readFile('a.txt', (err, a) => {
    fs.readFile('b.txt', (err, b) => {
        fs.readFile('c.txt', (err, c) => {
            console.log(a, b, c);
        });
    });
});

// ✅ async/await
async function readAll() {
    const [a, b, c] = await Promise.all([
        readFile('a.txt', 'utf8'),
        readFile('b.txt', 'utf8'),
        readFile('c.txt', 'utf8'),
    ]);
    console.log(a, b, c);
}
```

---

## 五、调试与开发

### 13. VS Code 调试 Node.js

创建 `.vscode/launch.json`：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "启动当前文件",
            "program": "${file}",
            "skipFiles": ["<node_internals>/**"]
        },
        {
            "type": "node",
            "request": "launch",
            "name": "启动应用",
            "program": "${workspaceFolder}/app.js",
            "env": {
                "NODE_ENV": "development"
            }
        }
    ]
}
```

### 14. 使用 Chrome DevTools 调试

```bash
# 方式一：启动时开启
node --inspect app.js

# 方式二：代码中在第一行暂停
node --inspect-brk app.js

# 在 Chrome 浏览器中打开 chrome://inspect，点击目标进程
```

### 15. 热重载开发

```bash
# 使用 nodemon（文件变更自动重启）
npm install -g nodemon
nodemon app.js

# Node.js v18+ 内置 --watch 模式
node --watch app.js
```

---

## 六、生产环境

### 16. 优雅关闭（Graceful Shutdown）

```javascript
const express = require('express');
const app = express();

const server = app.listen(3000);

async function shutdown(signal) {
    console.log(`收到 ${signal}，开始优雅关闭...`);

    server.close(() => {
        console.log('HTTP 服务器已关闭');
        // 关闭数据库连接
        // 释放资源
        process.exit(0);
    });

    // 超时强制关闭
    setTimeout(() => {
        console.error('超时未完成，强制退出');
        process.exit(1);
    }, 30000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
```

### 17. PM2 常用命令

```bash
# 启动应用（集群模式，充分利用多核 CPU）
pm2 start app.js -i max

# 重命名进程
pm2 start app.js --name my-api

# 常用操作
pm2 list            # 查看所有进程
pm2 logs            # 查看日志
pm2 monit           # 监控面板
pm2 restart my-api  # 重启
pm2 stop my-api     # 停止
pm2 delete my-api   # 删除
pm2 save            # 保存当前进程列表
pm2 startup         # 设置开机自启
```

### 18. 环境变量管理

```bash
# .env 文件
PORT=3000
NODE_ENV=production
DB_URL=mongodb://localhost:27017/myapp
JWT_SECRET=your-secret-key
```

```javascript
// 推荐：使用 dotenv 加载
require('dotenv').config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;
const isProduction = process.env.NODE_ENV === 'production';
```

---

## 七、其他

### 19. `console.log` 没有输出

**原因：** 输出被缓冲或流被重定向。

**解决方案：**

```javascript
// 强制同步输出
const fs = require('fs');
fs.writeSync(1, '即时输出\n');  // 1 = stdout

// 或使用 process.stdout.write
process.stdout.write('即时输出\n');
```

### 20. 时区问题

```javascript
// Node.js 默认使用 UTC 时间
console.log(new Date()); // 2026-07-13T05:05:00.000Z（UTC）

// 格式化本地时间
const date = new Date();
console.log(date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));

// 使用 day.js 处理时区
// npm install dayjs
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

console.log(dayjs().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'));
```

---

> 以上问题持续更新中。如有其他常见问题，欢迎补充。
