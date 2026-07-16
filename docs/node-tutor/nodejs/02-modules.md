---
order: 2
---

# 模块系统

Node.js 采用模块化来组织代码。每个文件都是一个独立的模块，模块内定义的变量、函数默认对外不可见，需要通过导出才能被其他模块使用。

## 一、CommonJS 模块（默认）

Node.js 默认使用 CommonJS 模块规范，通过 `require()` 导入、`module.exports` 导出。

### 1. 导出模块

```javascript
// greeter.js
// 方式一： exports.xxx
exports.sayHello = function (name) {
    return `Hello, ${name}!`;
};

exports.sayHi = function (name) {
    return `Hi, ${name}!`;
};
```

```javascript
// calculator.js
// 方式二： module.exports
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

const PI = 3.14159;

// 导出一个对象
module.exports = {
    add,
    subtract,
    PI,
};
```

### 2. `exports` 与 `module.exports` 的区别

```javascript
// ❌ 错误：重新赋值 exports 会断开与 module.exports 的引用
exports = {
    foo: 'bar',
};

// ✅ 正确：给 exports 添加属性
exports.foo = 'bar';

// ✅ 正确：直接给 module.exports 赋值
module.exports = {
    foo: 'bar',
};

// ⚠️ 注意：最终导出的是 module.exports，不是 exports
// exports 只是 module.exports 的一个引用
```

### 3. 导入模块

```javascript
// app.js
// 导入自定义模块
const greeter = require('./greeter');
const calc = require('./calculator');

console.log(greeter.sayHello('Node.js'));   // Hello, Node.js!
console.log(calc.add(10, 20));              // 30
console.log(calc.PI);                       // 3.14159

// 导入内置核心模块
const fs = require('fs');
const path = require('path');

// 导入第三方模块
const _ = require('lodash');

// 只导入部分功能（解构）
const { add, subtract } = require('./calculator');
console.log(add(5, 3));    // 8
```

### 4. 模块查找规则

```javascript
// 1. 核心模块（直接加载）
require('fs');         // 文件系统
require('path');       // 路径处理
require('http');       // HTTP 服务

// 2. 相对路径（./ 或 ../）
require('./utils');    // 当前目录下的 utils.js
require('../lib/helper');  // 上级目录 lib 下的 helper.js

// 3. 第三方模块（node_modules 中查找）
require('lodash');
require('express');
```

查找顺序：`核心模块` → `./ 或 ../` → `node_modules` → 找不到则抛出 `MODULE_NOT_FOUND` 错误。

### 5. 模块缓存

Node.js 会缓存已加载的模块，多次 `require` 同一个模块只会执行一次：

```javascript
// counter.js
let count = 0;
module.exports = {
    increment() {
        count++;
        return count;
    },
    getCount() {
        return count;
    },
};
```

```javascript
// app.js
const counter1 = require('./counter');
const counter2 = require('./counter');

console.log(counter1.increment()); // 1
console.log(counter1.increment()); // 2
console.log(counter2.getCount());  // 2（共享同一个模块实例）
console.log(counter1 === counter2); // true
```

## 二、ES Modules（ESM）

Node.js 从 v12 开始支持 ES Modules（`import`/`export` 语法）。

### 1. 启用方式

**方式一**：文件使用 `.mjs` 后缀

```javascript
// math.mjs
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

```javascript
// app.mjs
import { add, subtract } from './math.mjs';

console.log(add(10, 5));      // 15
```

**方式二**：在 `package.json` 中设置 `"type": "module"`

```json
{
    "name": "my-app",
    "type": "module",
    "dependencies": {}
}
```

之后 `.js` 文件默认使用 ESM 语法：

```javascript
// helper.js（在 type:module 下）
export function greet(name) {
    return `Hello, ${name}!`;
}
```

### 2. 导出（export）

```javascript
// 单独导出
export const name = 'Node.js';
export function sayHi() {
    return 'Hi!';
}

// 默认导出（每个模块只能有一个）
export default class Person {
    constructor(name) {
        this.name = name;
    }
}

// 混合导出
export const VERSION = '1.0.0';
export default class App {}
```

### 3. 导入（import）

```javascript
// 导入默认导出
import Person from './Person.js';

// 导入命名导出
import { name, sayHi } from './helper.js';

// 同时导入默认和命名导出
import App, { VERSION } from './App.js';

// 重命名导入
import { add as sum } from './math.js';

// 导入所有
import * as utils from './utils.js';
console.log(utils.name, utils.sayHi());

// 动态导入（返回 Promise）
const module = await import('./config.js');
console.log(module.default);
```

### 4. CommonJS 与 ESM 互操作

```javascript
// 在 ESM 中导入 CommonJS 模块
import fs from 'fs';               // 默认导入
import { readFile } from 'fs';     // 命名导入（支持部分导入）

// 在 CommonJS 中导入 ESM 模块（需要使用动态 import）
async function loadESM() {
    const math = await import('./math.mjs');
    console.log(math.add(1, 2));
}
```

## 三、内置核心模块一览

| 模块       | 作用                         | 文档地址                                            |
| ---------- | ---------------------------- | --------------------------------------------------- |
| `fs`       | 文件系统操作（读写、删除等） | https://nodejs.org/api/fs.html                      |
| `path`     | 路径处理与拼接               | https://nodejs.org/api/path.html                    |
| `http`     | HTTP 服务器与客户端          | https://nodejs.org/api/http.html                    |
| `os`       | 操作系统信息                 | https://nodejs.org/api/os.html                      |
| `events`   | 事件发射器                   | https://nodejs.org/api/events.html                  |
| `stream`   | 流式数据处理                 | https://nodejs.org/api/stream.html                  |
| `buffer`   | 二进制数据                   | https://nodejs.org/api/buffer.html                  |
| `crypto`   | 加密解密                     | https://nodejs.org/api/crypto.html                  |
| `util`     | 工具函数                     | https://nodejs.org/api/util.html                    |
| `child_process` | 子进程管理              | https://nodejs.api/child_process.html               |

## 四、`require` 的完整流程

```javascript
// Node.js 加载模块的步骤：
// 1. 路径解析 —— 确定模块的绝对路径
// 2. 缓存检查 —— 如果已缓存，直接返回缓存
// 3. 加载模块 —— 读取文件内容
// 4. 模块包装 —— 将代码包裹在函数中
// 5. 执行代码 —— 运行模块代码
// 6. 缓存结果 —— 存储 exports 到缓存
// 7. 返回 exports

// 可以通过 console 查看模块的包装函数：
console.log(arguments); // [exports, require, module, __filename, __dirname]
```

Node.js 实际是这样包装每个模块的：

```javascript
(function (exports, require, module, __filename, __dirname) {
    // 你的模块代码在这里
    const greeting = 'Hello';
    module.exports = greeting;
});
```

## 五、实战练习

### 练习 1：创建工具模块

```javascript
// 创建 format.js
function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function formatMoney(amount) {
    return `¥${amount.toFixed(2)}`;
}

module.exports = { formatDate, formatMoney };
```

```javascript
// app.js
const { formatDate, formatMoney } = require('./format');

console.log(formatDate(new Date()));  // 2026-07-13
console.log(formatMoney(99.5));       // ¥99.50
```

### 练习 2：ESM 与 CommonJS 对比

分别用 CommonJS 和 ESM 实现一个简单的数组工具模块，包含 `sum`、`average`、`max` 三个函数。
