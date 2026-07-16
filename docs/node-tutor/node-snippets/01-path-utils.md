---
order: 1
---

# 路径处理

> Node.js 路径模块（`node:path`）的常用操作。

## 引入 path 模块

```js
import path from 'node:path';
```

## path.join() — 拼接路径

使用平台特定的分隔符连接所有路径片段，并规范化生成的路径。

```js
path.join('a', 'b', 'c');         // 'a/b/c'
path.join('a', '/b', 'c');        // 'a/b/c'
path.join('a/b', '../', 'c');     // 'a/c'
path.join('a', './', 'c');        // 'a/c'
path.join('/foo', 'bar', 'baz');  // '/foo/bar/baz'
```

## path.resolve() — 解析为绝对路径

将路径或路径片段序列化为绝对路径。

```js
// 假设当前工作目录为 /admin/user
path.resolve('a', 'b', 'c');         // '/admin/user/a/b/c'
path.resolve('a', '/b', 'c');        // '/b/c'
path.resolve('a/b', '../', 'c');     // '/admin/user/a/c'
path.resolve('a', './', 'c');        // '/admin/user/a/c'
path.resolve('/foo/bar', './baz');   // '/foo/bar/baz'
path.resolve('/foo/bar', '/tmp');    // '/tmp'
```

> 注意：`/a` 代表根目录下的 a，`a` 代表当前目录下的 a。

## path.parse() — 解析路径

将路径解析为各个组成部分。

```js
const parsed = path.parse('/home/user/docs/file.txt');
// {
//   root: '/',
//   dir: '/home/user/docs',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// 获取文件扩展名
path.extname('index.html');   // '.html'
path.extname('file.tar.gz');  // '.gz'

// 获取文件名（不含扩展名）
path.basename('file.txt', '.txt');  // 'file'
path.basename('file.txt');          // 'file.txt'

// 获取目录名
path.dirname('/a/b/c/d.txt');  // '/a/b/c'
```

## path.format() — 格式化路径

```js
const formatted = path.format({
  root: '/',
  dir: '/home/user',
  base: 'file.txt',
});
// '/home/user/file.txt'
```

## path.normalize() — 规范化路径

```js
path.normalize('/foo/bar//baz/asdf/quux/..');  // '/foo/bar/baz/asdf'
path.normalize('C:\\temp\\\\foo\\bar\\..\\');  // 'C:\\temp\\foo\\'
```

## path.relative() — 获取相对路径

```js
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
// '../../impl/bbb'
```

## 跨平台路径分隔符

```js
import path from 'node:path';

// 当前平台的分隔符
console.log(path.sep);
// POSIX: '/'
// Windows: '\\'

// 路径分隔符
console.log(path.delimiter);
// POSIX: ':'
// Windows: ';'

// 跨平台替换路径分隔符
export function toForwardSlash(filePath) {
  return filePath.split(path.sep).join('/');
}

// 判断是否为绝对路径
console.log(path.isAbsolute('/foo/bar'));  // true
console.log(path.isAbsolute('.'));         // false
```

## 常用路径获取

```js
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 获取当前文件路径（ES Module 中替代 __dirname）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取当前工作目录
const cwd = process.cwd();

// 拼接路径的实用函数
export function resolvePath(...segments) {
  return path.resolve(process.cwd(), ...segments);
}

// 确保路径以斜杠结尾
export function ensureTrailingSlash(dirPath) {
  return dirPath.endsWith(path.sep) ? dirPath : dirPath + path.sep;
}
```

## 查找文件

```js
import fs from 'node:fs';
import path from 'node:path';

// 向上查找文件（如查找 package.json）
export function findUp(filename, startDir = process.cwd()) {
  let current = path.resolve(startDir);
  while (true) {
    const filePath = path.join(current, filename);
    if (fs.existsSync(filePath)) return filePath;
    const parent = path.dirname(current);
    if (parent === current) return null; // 已到根目录
    current = parent;
  }
}

// 使用示例
const pkgPath = findUp('package.json');
console.log('找到 package.json:', pkgPath);
```

## 安全路径拼接（防止路径穿越）

```js
import path from 'node:path';

// 确保路径在指定目录内，防止路径穿越攻击
export function safeJoin(base, target) {
  const fullPath = path.resolve(base, target);
  if (!fullPath.startsWith(path.resolve(base))) {
    throw new Error('路径不合法：目标路径超出了允许范围');
  }
  return fullPath;
}

// 使用示例
try {
  const result = safeJoin('/app/data', '../../etc/passwd');
} catch (err) {
  console.error(err.message); // 路径不合法
}
```