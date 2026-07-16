---
order: 1
---

# path — 路径操作

`path` 模块提供用于处理文件和目录路径的实用工具。

```js
import { basename, dirname, extname, join, resolve, parse, normalize, relative, sep, delimiter } from 'path'
```

## 路径信息获取

```js
basename('/test/something.txt')       // 'something.txt'
basename('/test/something.txt', '.txt') // 'something'

dirname('/test/something/file.txt')  // '/test/something'

extname('/test/something.txt')       // '.txt'
extname('/test/something')           // ''
```

## 路径解析与组合

```js
join('/users', 'joe', 'notes.txt')   // '/users/joe/notes.txt'

resolve('joe.txt')                   // '/current/dir/joe.txt'（基于 cwd）
resolve('/etc', 'joe.txt')           // '/etc/joe.txt'

normalize('/users/joe/..//test.txt') // '/users/test.txt'
```

`join` 拼接路径并规范化；`resolve` 将序列解析为绝对路径（以 `/` 开头的视为根路径）。

## 路径对象转换

```js
parse('/users/test.txt')
// { root: '/', dir: '/users', base: 'test.txt', ext: '.txt', name: 'test' }

format({ dir: '/users/joe', base: 'test.txt' })  // '/users/joe/test.txt'
```

## 相对路径

```js
relative('/Users/joe', '/Users/joe/test.txt')           // 'test.txt'
relative('/Users/joe', '/Users/joe/something/test.txt') // 'something/test.txt'
```

## 常用判断

```js
isAbsolute('/test/something')  // true
isAbsolute('./test/something') // false
```

## 平台差异

| 属性 | Windows | POSIX (Linux/macOS) |
|------|---------|-------------------|
| `sep` | `\` | `/` |
| `delimiter` | `;` | `:` |
