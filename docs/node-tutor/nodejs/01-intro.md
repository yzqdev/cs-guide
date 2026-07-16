---
order: 1
---

# Node.js 简介与环境搭建

## 一、什么是 Node.js

Node.js 是一个基于 **Chrome V8 引擎** 的 JavaScript 运行时环境。它让 JavaScript 可以脱离浏览器在服务器端运行。

**核心特点：**

- **事件驱动**：通过事件循环处理请求，不阻塞后续代码
- **非阻塞 I/O**：读写文件、网络请求等操作不会阻塞主线程
- **轻量高效**：适合构建高并发、I/O 密集型的应用

## 二、安装 Node.js

### 1. 下载安装

访问 [https://nodejs.org](https://nodejs.org)，推荐下载 **LTS（长期支持）** 版本。

安装完成后，在终端验证：

```bash
# 查看 Node.js 版本
node --version   # 例如 v20.11.0

# 查看 npm 版本
npm --version    # 例如 10.2.4
```

### 2. 使用 nvm 管理多版本（推荐）

```bash
# 安装 nvm（Windows 使用 nvm-windows）
# 详见 https://github.com/coreybutler/nvm-windows

# 安装指定版本
nvm install 20.11.0

# 切换版本
nvm use 20.11.0

# 查看已安装版本
nvm list
```

## 三、第一个 Node.js 程序

创建一个文件 `hello.js`：

```javascript
// hello.js
console.log('Hello, Node.js!');

const name = 'Node.js';
console.log(`Running ${name} version ${process.version}`);
```

运行：

```bash
node hello.js
```

输出：

```text
Hello, Node.js!
Running Node.js version v20.11.0
```

## 四、REPL 交互式环境

Node.js 提供了 REPL（Read-Eval-Print-Loop）交互式环境，可以直接在终端编写和运行代码。

```bash
# 进入 REPL
node

# 在 REPL 中尝试
> 1 + 2
3
> const msg = 'Hello'
undefined
> msg.toUpperCase()
'HELLO'
> .exit   # 退出 REPL
```

常用 REPL 命令：

| 命令 | 作用               |
| ---- | ------------------ |
| `.exit` | 退出 REPL       |
| `.help` | 查看帮助        |
| `.clear` | 清空上下文     |
| `.save`  | 保存会话到文件 |
| `.load`  | 加载文件到会话 |

## 五、运行 JavaScript 文件

```bash
# 直接运行
node app.js

# 带参数运行
node app.js --port 3000 --env production

# 使用 NODE_ENV 环境变量
NODE_ENV=production node app.js

# Windows 下设置环境变量
set NODE_ENV=production && node app.js
```

读取命令行参数：

```javascript
// args.js
// node args.js --name Alice --age 25

// 获取命令行参数（前两个是 node 路径和脚本路径）
console.log(process.argv);

// 使用第三方库 minimist 解析参数更简单
// 但也可以手动解析：
const args = process.argv.slice(2);
console.log('Arguments:', args);
```

## 六、全局对象

Node.js 提供了一些全局对象，无需 `require` 即可直接使用：

```javascript
// global —— 类似于浏览器中的 window
console.log(global);

// __dirname —— 当前模块的目录路径
console.log(__dirname);  // 例如：/Users/me/project

// __filename —— 当前模块的文件路径
console.log(__filename); // 例如：/Users/me/project/app.js

// process —— 当前进程信息
console.log(process.pid);         // 进程 ID
console.log(process.cwd());       // 当前工作目录
console.log(process.platform);    // 操作系统：win32 / darwin / linux

// Buffer —— 处理二进制数据
const buf = Buffer.from('Hello');
console.log(buf);

// setImmediate / setTimeout / setInterval
setImmediate(() => {
    console.log('立即执行（下一个事件循环）');
});

setTimeout(() => {
    console.log('2 秒后执行');
}, 2000);
```

## 七、console 对象

```javascript
console.log('普通日志');
console.info('信息');
console.warn('警告');
console.error('错误');

// 格式化输出
console.log('名称：%s，年龄：%d', 'Alice', 25);

// 打印对象
const obj = { name: 'Alice', age: 25, hobbies: ['reading', 'coding'] };
console.log(obj);
console.table(obj);

// 计时
console.time('loop');
for (let i = 0; i < 1000000; i++) {}
console.timeEnd('loop');  // loop: 3.245ms

// 堆栈追踪
console.trace('追踪调用栈');
```

## 八、模块化初探

任何 Node.js 文件都是一个模块。通过 `require` 可以引入其他模块：

```javascript
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = { add, subtract };
```

```javascript
// app.js
const math = require('./math');

console.log(math.add(10, 5));      // 15
console.log(math.subtract(10, 5)); // 5
```

> 模块系统的详细讲解见下一章 [02-modules.md](./02-modules.md)。

## 九、练习

1. 编写一个程序，输出当前时间（格式：YYYY-MM-DD HH:mm:ss）
2. 编写一个程序，接收命令行参数并输出"你好，[参数]！"
3. 使用 REPL 计算 2 的 10 次方
