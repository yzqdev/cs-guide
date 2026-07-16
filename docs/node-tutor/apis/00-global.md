---
order: 0
---

# 概述与环境

## Node.js 全局对象

Node.js 中以下对象是全局可用的，无需 `require` 导入：

| 对象 | 说明 |
|------|------|
| `global` | 全局命名空间对象 |
| `process` | 当前 Node.js 进程 |
| `console` | 控制台输出 |
| `Buffer` | 二进制数据处理 |
| `__dirname` | 当前模块的目录名 |
| `__filename` | 当前模块的文件名 |
| `exports` / `module` / `require` | CommonJS 模块系统 |

## process 对象

`process` 是 Node 原生提供的全局对象，表示当前运行的 Node 进程。

### 命令行参数

```js
// node index.js --watch --port 3000
console.log(process.argv);
// ['/path/to/node', '/path/to/index.js', '--watch', '--port', '3000']

// 只获取参数部分
const [, , ...args] = process.argv;
```

### 工作目录与环境

```js
process.cwd()        // 当前工作目录
process.chdir('/tmp') // 切换工作目录
process.env          // 环境变量对象
process.env.NODE_ENV  // 常用：环境模式
```

### 进程信息

```js
process.pid              // 进程 ID
process.uptime()         // 进程运行时间（秒）
process.memoryUsage()    // 内存使用情况 { rss, heapTotal, heapUsed, external }
process.cpuUsage()       // CPU 占用
process.arch             // CPU 架构: 'x64', 'arm' 等
process.platform         // 操作系统: 'win32', 'linux', 'darwin'
process.version          // Node.js 版本号
process.versions         // 所有依赖版本
```

### 标准输入输出

```js
process.stdin   // 可读流（标准输入）
process.stdout  // 可写流（标准输出）
process.stderr  // 可写流（标准错误）

// 实现 console.log
function log() {
  process.stdout.write([...arguments].join(' ') + '\n');
}
```

### 进程控制

```js
process.exit(0)     // 正常退出
process.exit(1)     // 异常退出
process.exitCode = 0 // 设置退出码但不立即退出

process.on('exit', (code) => {
  // 进程退出前执行
});

process.on('uncaughtException', (err) => {
  // 捕获未处理的异常
});

process.nextTick(() => {
  // 下一轮事件循环最早执行
});
```

## console 对象

```js
console.log('普通日志')
console.error('错误输出')   // 输出到 stderr
console.warn('警告输出')    // 输出到 stderr
console.info('信息输出')

console.dir(obj, { depth: 2, colors: true })  // 格式化打印对象

console.time('label')
// ... 执行代码
console.timeEnd('label')   // 输出执行耗时

console.trace()            // 打印调用栈

console.table([{ a: 1 }, { a: 2 }])  // 以表格形式打印数组
```
