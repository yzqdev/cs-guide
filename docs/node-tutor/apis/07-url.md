---
order: 7
---

# URL / QueryString — URL 解析与查询字符串

## URL 模块

```js
import { URL } from 'url'
import url from 'url'  // 旧版 API
```

### 新版 URL (WHATWG)

```js
const myURL = new URL('https://user:pass@example.com:8080/path?query=string#hash')

myURL.protocol      // 'https:'
myURL.hostname      // 'example.com'
myURL.port          // '8080'
myURL.pathname      // '/path'
myURL.search        // '?query=string'
myURL.searchParams  // URLSearchParams 对象
myURL.hash          // '#hash'
myURL.username      // 'user'
myURL.password      // 'pass'
myURL.origin        // 'https://example.com:8080'
```

### URLSearchParams

```js
const params = new URLSearchParams('foo=bar&baz=qux&baz=quux')

params.get('foo')      // 'bar'
params.getAll('baz')   // ['qux', 'quux']
params.has('foo')      // true
params.append('key', 'value')
params.delete('key')
params.toString()      // 'foo=bar&baz=qux&baz=quux'
```

### 旧版 URL API

```js
url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash')
// { protocol: 'http:', host: 'host.com:8080', pathname: '/p/a/t/h', query: 'query=string', hash: '#hash', ... }

url.format({ protocol: 'http:', host: 'example.com', pathname: '/path' })
// 'http://example.com/path'

url.resolve('http://example.com/foo/bar', '../baz')
// 'http://example.com/baz'
```

## QueryString 模块

```js
import querystring from 'querystring'

querystring.parse('foo=bar&baz=qux&baz=quux')
// { foo: 'bar', baz: ['qux', 'quux'] }

querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'] })
// 'foo=bar&baz=qux&baz=quux'

querystring.escape('中文')    // URL 编码
querystring.unescape('%E4%B8%AD')  // URL 解码
```
