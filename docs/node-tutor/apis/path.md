# path

path模块提供和系统路径相关的api

:::tip
`path.sep`在windows上是`\`,在linux上是`/`
`path.delimiter`在windows上是`;`在linux上是`/`
:::

## path.basename()

获取基础路径

```ts
import {basename } from 'path'
basename('/test/something'); // something
basename('/test/something.txt'); // something.txt
basename('/test/something.txt', '.txt'); // something
```

## path.dirname()

获取路径名称

```ts
dirname('/test/something'); // /test
dirname('/test/something/file.txt'); // /test/something
```

## path.extname()

获取后缀

```ts
extname('/test/something'); // ''
extname('/test/something/file.txt'); // '.txt'
```

## path.format()

`path.parse`的反面

```ts
// POSIX
format({ dir: '/Users/joe', base: 'test.txt' }); //  '/Users/joe/test.txt'
format({ root: '/Users/joe', name: 'test', ext: '.txt' }); //  '/Users/joe/test.txt'
//windows
format({ dir: 'C:\\Users\\joe', base: 'test.txt' }); //  'C:\\Users\\joe\\test.txt'
```

## path.isAbsolute()

是否是绝对路径

```ts
isAbsolute('/test/something'); // true
isAbsolute('./test/something'); // false

```

## path.join

```ts
const name = 'joe';
 join('/', 'users', name, 'notes.txt'); // '/users/joe/notes.txt'
```

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
resolve('joe.txt'); // '/Users/joe/joe.txt' if run from my home folder
resolve('tmp', 'joe.txt'); // '/Users/joe/tmp/joe.txt' if run from my home folder
resolve('/etc', 'joe.txt'); // '/etc/joe.txt'
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

## path.normalize()

计算最合适的路径

```ts
normalize('/users/joe/..//test.txt'); // '/users/test.txt'
```

## path.parse()

解析路径

```ts
parse('/users/test.txt');
//结果
{
  root: '/',
  dir: '/users',
  base: 'test.txt',
  ext: '.txt',
  name: 'test'
}
```

## path.relative()

获取相对路径

```ts
relative('/Users/joe', '/Users/joe/test.txt'); // 'test.txt'
relative('/Users/joe', '/Users/joe/something/test.txt'); // 'something/test.txt'

```
