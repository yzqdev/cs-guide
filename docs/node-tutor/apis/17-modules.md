---
order: 17
---

# modules — 模块系统

Node.js 支持 CommonJS 和 ES Modules 两种模块系统。

## CommonJS（CJS）

默认的模块系统，使用 `require` 和 `module.exports`。

### 导出

```js
// math.js
const add = (a, b) => a + b
const sub = (a, b) => a - b

module.exports = { add, sub }
// 或 exports.add = add
```

### 导入

```js
const math = require('./math.js')
console.log(math.add(1, 2))  // 3
```

### 核心模块

```js
const fs = require('fs')
const path = require('path')
const http = require('http')
// 直接通过模块名导入，无需路径
```

## ES Modules（ESM）

官方标准，需在 `package.json` 中设置 `"type": "module"` 或使用 `.mjs` 扩展名。

```json
{
  "type": "module"
}
```

### 导出

```js
// math.mjs
export const add = (a, b) => a + b
export default function sub(a, b) { return a - b }
```

### 导入

```js
import { add } from './math.mjs'
import sub from './math.mjs'
```

## 模块查找规则

当 `require('xxx')` 时，Node.js 按以下顺序查找：

1. **核心模块**（如 `fs`、`path`）
2. **`./node_modules/xxx`**（逐级向上查找）
3. **node_modules 下的包**（通过 `main` 字段或 `index.js`）

## require 与 import 对比

| 特性 | CommonJS (require) | ESM (import) |
|------|-------------------|-------------|
| 加载时机 | 同步（运行时） | 异步（编译时） |
| 动态导入 | 原生支持 | `import()` 表达式 |
| 顶层 await | 不支持 | 支持 |
| Tree Shaking | 不支持 | 支持 |
| 严格模式 | 默认非严格 | 默认严格模式 |
