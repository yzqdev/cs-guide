# 路径的问题

## path模块的引入

```js
import path from 'node:path'// 直接引用node中自带的模块
```

## path.join()

使用平台特定的分隔符（window：/）作为定界符,将所有给定的path片段连接在一起,然后规范化生成的路径

```js
path.join('a', 'b', 'c')   // 输出结果为： '/a/b/c'
path.join('a', '/b', 'c')  // 输出结果为： '/a/b/c'
path.join('a/b', '../', 'c') // 输出结果为： '/a/c'
path.join('a', './', 'c') // 输出结果为：'/a/c'
```

## path.resolve()

将路径或者路径片段序列化为绝对路径

```js
// 假设当前绝对路径为/admin/user
path.resolve('a', 'b', 'c') // 输出结果为：'/admin/user/a/a/c'
path.resolve('a', '/b', 'c') // 输出结果为： '/b/c'
path.resolve('a/b', '../', 'c') // 输出结果为：'/admin/user/a/c'
path.resolve('a', './', 'c') // 输出结果为：'admin/user/a/c'
注意`/`的存在, '/a'代表的是根目录下的a, 'a'代表的是当前目录下的a
```

为了要获取到符合 `/` 格式的路径，我们可以使用 `PATH` 模块提供的 `path.sep` [接口](https://nodejs.org/dist/latest-v12.x/docs/api/path.html#path_path_sep)进行字符串匹配截取，接口会根据系统环境的不同进行匹配截取。

在 Unix 系统下

```js
foo/bar/baz'.split(path.sep);
// Returns: ['foo', 'bar', 'baz']
```

Windows 系统下

```js
foo\\bar\\baz'.split(path.sep);
// Returns: ['foo', 'bar', 'baz']
```

`path.sep` 的赋值也是根据操作系统来决定是 `/` 还是 `\

最终的方案自然是 `string.split(path.sep).join('/')` 来进行分隔符的替换。
