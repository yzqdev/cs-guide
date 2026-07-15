# ES9 (ES2018) 到 ES14 (ES2023) 及后续新特性

本文档涵盖从 ES9 到最新版本的 JavaScript 新特性。

## 目录

- [ES9 (ES2018) 新特性](#es9-es2018-新特性)
  - [1. 异步迭代 (for-await-of)](#1-异步迭代-for-await-of)
  - [2. Promise.finally()](#2-promisefinally)
  - [3. Rest / Spread 属性](#3-rest--spread-属性)
  - [4. 正则表达式命名捕获组](#4-正则表达式命名捕获组)
  - [5. 正则表达式反向断言](#5-正则表达式反向断言)
  - [6. 正则表达式 dotAll 模式](#6-正则表达式-dotall-模式)
  - [7. 正则表达式 Unicode 转义](#7-正则表达式-unicode-转义)
  - [8. 非转义序列的模板字符串](#8-非转义序列的模板字符串)
- [ES10 (ES2019) 新特性](#es10-es2019-新特性)
  - [1. Array.flat() / flatMap()](#1-arrayflat--flatmap)
  - [2. String.trimStart() / trimEnd()](#2-stringtrimstart--trimend)
  - [3. Object.fromEntries()](#3-objectfromentries)
  - [4. Symbol.prototype.description](#4-symbolprototypedescription)
  - [5. String.prototype.matchAll()](#5-stringprototypematchall)
  - [6. Function.prototype.toString() 精确输出](#6-functionprototypetostring-精确输出)
  - [7. 可选的 catch 绑定](#7-可选的-catch-绑定)
  - [8. JSON 行分隔符与段分隔符支持](#8-json-行分隔符与段分隔符支持)
- [ES11 (ES2020) 新特性](#es11-es2020-新特性)
  - [1. 可选链 (Optional Chaining)](#1-可选链-optional-chaining)
  - [2. 空值合并 (Nullish Coalescing)](#2-空值合并-nullish-coalescing)
  - [3. 私有字段 (Private Fields)](#3-私有字段-private-fields)
  - [4. 静态字段 (Static Fields)](#4-静态字段-static-fields)
  - [5. 顶级 Await (Top Level Await)](#5-顶级-await-top-level-await)
  - [6. Promise.allSettled()](#6-promiseallsettled)
  - [7. 动态导入 (Dynamic Import)](#7-动态导入-dynamic-import)
  - [8. globalThis](#8-globalthis)
  - [9. BigInt](#9-bigint)
  - [10. 可选链与空值合并结合使用](#10-可选链与空值合并结合使用)
- [ES12 (ES2021) 新特性](#es12-es2021-新特性)
  - [1. String.prototype.replaceAll()](#1-stringprototypereplaceall)
  - [2. Promise.any()](#2-promiseany)
  - [3. 逻辑赋值运算符](#3-逻辑赋值运算符)
  - [4. WeakRef / FinalizationRegistry](#4-weakref--finalizationregistry)
  - [5. 数字分隔符](#5-数字分隔符)
- [ES13 (ES2022) 新特性](#es13-es2022-新特性)
  - [1. .at() 方法](#1-at-方法)
  - [2. Object.hasOwn()](#2-objecthasown)
  - [3. Error.cause](#3-errorcause)
  - [4. 类静态块 (Class Static Block)](#4-类静态块-class-static-block)
  - [5. 正则表达式匹配索引](#5-正则表达式匹配索引)
  - [6. 顶层 await (正式纳入规范)](#6-顶层-await-正式纳入规范)
  - [7. 类私有方法/访问器检查](#7-类私有方法访问器检查)
- [ES14 (ES2023) 新特性](#es14-es2023-新特性)
  - [1. Array.findLast() / findLastIndex()](#1-arrayfindlast--findlastindex)
  - [2. Hashbang 语法](#2-hashbang-语法)
  - [3. Symbol 作为 WeakMap 键](#3-symbol-作为-weakmap-键)
- [ES2024 新特性前瞻](#es2024-新特性前瞻)
  - [1. Promise.withResolvers()](#1-promisewithresolvers)
  - [2. Array 分组方法](#2-array-分组方法)

---

## ES9 (ES2018) 新特性

### 1. 异步迭代 (for-await-of)

ES2018 引入异步迭代器（asynchronous iterators），`next()` 方法返回一个 Promise。`await` 可以和 `for...of` 循环一起使用，以串行的方式运行异步操作。

```js
// 普通 for 循环在异步函数中无法正确串行
async function process(array) {
  for (let i of array) {
    await doSomething(i)
  }
}

// forEach 异步问题
async function process(array) {
  array.forEach(async (i) => {
    await doSomething(i) // 循环本身保持同步，不会等待
  })
}

// ES9: for-await-of
async function process(array) {
  for await (let i of array) {
    doSomething(i)
  }
}
```

### 2. Promise.finally()

无论 Promise 成功还是失败，都会执行 `.finally()` 中的逻辑，适合清理操作（关闭连接、隐藏 loading 等）。

```js
function doSomething() {
  doSomething1()
    .then(doSomething2)
    .then(doSomething3)
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      // 无论成功失败都会执行
      console.log('finish!')
    })
}
```

### 3. Rest / Spread 属性

ES2015 的 Rest/Spread 只适用于数组，ES2018 将其扩展到对象。

```js
// Rest 解构
const myObject = { a: 1, b: 2, c: 3 }
const { a, ...x } = myObject
// a = 1, x = { b: 2, c: 3 }

// 函数参数 Rest
function restParam({ a, ...x }) {
  // a = 1, x = { b: 2, c: 3 }
}

// Spread 合并对象
const obj1 = { a: 1, b: 2, c: 3 }
const obj2 = { ...obj1, z: 26 }
// obj2 = { a: 1, b: 2, c: 3, z: 26 }

// 浅拷贝（⚠️ 嵌套对象是引用）
const clone = { ...obj1 }

// 注意属性覆盖顺序
const merged = { ...{ a: 1, b: 1 }, ...{ b: 2, c: 2 } }
// merged = { a: 1, b: 2, c: 2 }
```

### 4. 正则表达式命名捕获组

使用 `?<name>` 语法为捕获组命名，提高可读性。

```js
// 传统方式 — 通过索引访问，难以维护
const reDate = /([0-9]{4})-([0-9]{2})-([0-9]{2})/
const match = reDate.exec('2018-04-30')
const year = match[1] // 2018
const month = match[2] // 04
const day = match[3] // 30

// ES9 — 命名捕获组
const reDateNamed = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/
const matchNamed = reDateNamed.exec('2018-04-30')
const { year, month, day } = matchNamed.groups

// 在 replace 中使用
const usDate = '2018-04-30'.replace(reDateNamed, '$<month>-$<day>-$<year>')
// '04-30-2018'
```

### 5. 正则表达式反向断言

ES2018 引入反向断言（lookbehind），匹配前面的内容。

```js
// 先行断言 (lookahead) — 匹配后面是数字的符号
const reLookahead = /\D(?=\d+)/
reLookahead.exec('$123.89') // ['$']

// 肯定反向断言 (positive lookbehind)
const reLookbehind = /(?<=\D)\d+/
reLookbehind.exec('$123.89') // ['123.89']

// 否定反向断言 (negative lookbehind)
const reLookbehindNeg = /(?<!\D)\d+/
reLookbehindNeg.exec('$123.89') // null
```

### 6. 正则表达式 dotAll 模式

`.` 默认不匹配换行符，`s` 标记改变此行为。

```js
;/hello.world/.test('hello\nworld') // false
;/hello.world/s.test('hello\nworld') // true
```

### 7. 正则表达式 Unicode 转义

使用 `\p{...}` 按 Unicode 属性匹配，而非特定区间。

```js
const reGreekSymbol = /\p{Script=Greek}/u
reGreekSymbol.test('π') // true

// 匹配标点符号
;/\p{P}/u.test('。') // true
```

### 8. 非转义序列的模板字符串

之前 `\u` 开始 unicode 转义，`\x` 开始十六进制转义，`\` 后跟数字开始八进制转义，导致某些字符串（如 Windows 路径）无法正常表示。ES2018 移除了对模板字符串中转义序列的限制。

---

## ES10 (ES2019) 新特性

### 1. Array.flat() / flatMap()

```js
// flat() — 数组扁平化
const arr1 = [1, 2, [3, 4]]
arr1.flat() // [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]]
arr2.flat() // [1, 2, 3, 4, [5, 6]]
arr2.flat(2) // [1, 2, 3, 4, 5, 6]
arr2.flat(Infinity) // [1, 2, 3, 4, 5, 6]

// 去除空项
;[1, 2, , 4, 5].flat() // [1, 2, 4, 5]

// flatMap() — map 后 flat(1) 的合并操作
const arr = [1, 2, 3, 4]
arr.map((x) => [x * 2]) // [[2], [4], [6], [8]]
arr.flatMap((x) => [x * 2]) // [2, 4, 6, 8]

// flatMap 只压平一层
arr.flatMap((x) => [[x * 2]]) // [[2], [4], [6], [8]]
```

### 2. String.trimStart() / trimEnd()

去除字符串首尾空白字符。

```js
const str = '  hello  '
str.trimStart() // 'hello  '
str.trimEnd() // '  hello'
str.trim() // 'hello'
```

### 3. Object.fromEntries()

`Object.entries()` 的反向操作，将键值对列表转为对象。

```js
// Map → Object
const map = new Map([
  ['foo', 'bar'],
  ['baz', 42],
])
const obj = Object.fromEntries(map)
// { foo: 'bar', baz: 42 }

// Array → Object
const arr = [
  ['0', 'a'],
  ['1', 'b'],
  ['2', 'c'],
]
Object.fromEntries(arr)
// { 0: 'a', 1: 'b', 2: 'c' }

// 过滤对象属性
const person = { name: 'Alice', age: 30, gender: 'female' }
const filtered = Object.fromEntries(Object.entries(person).filter(([key]) => key !== 'gender'))
// { name: 'Alice', age: 30 }
```

### 4. Symbol.prototype.description

直接访问 Symbol 的描述，无需转为字符串。

```js
const sym = Symbol('The description')

// ES10 之前
String(sym) // 'Symbol(The description)'

// ES10
sym.description // 'The description'

// Symbol 可不传描述
Symbol().description // undefined
```

### 5. String.prototype.matchAll()

返回包含所有匹配结果及分组捕获的迭代器。

```js
const regexp = RegExp('foo*', 'g')
const str = 'table football, foosball'

// ES10 之前 — 使用 while + exec
let matches
while ((matches = regexp.exec(str)) !== null) {
  console.log(`Found ${matches[0]}. Next starts at ${regexp.lastIndex}.`)
}

// ES10 — matchAll
const matchesIter = str.matchAll(regexp)
for (const match of matchesIter) {
  console.log(match)
}
// matchAll 迭代器会消耗完，再次使用需重新调用

// 分组示例
const regexp2 = /t(e)(st(\d?))/g
const str2 = 'test1test2'

str2.match(regexp2) // ['test1', 'test2']
const array = [...str2.matchAll(regexp2)]
array[0] // ['test1', 'e', 'st1', '1', index: 0, input: 'test1test2', groups: undefined]
```

### 6. Function.prototype.toString() 精确输出

```js
function /* comment */ foo /* another comment */() {}

// ES10 之前
foo.toString() // 'function foo(){}'

// ES10 之后（保留注释和空格）
foo.toString() // 'function /* comment */ foo /* another comment */() {}'
```

### 7. 可选的 catch 绑定

```js
// ES10 之前
try {
} catch (e) {}

// ES10 — 不需要绑定错误变量
try {
} catch {}
```

### 8. JSON 行分隔符与段分隔符支持

以前行分隔符（U+2028）和段分隔符（U+2029）在字符串中视为行终止符，会导致 `SyntaxError`。ES10 允许它们出现在字符串文字中。

---

## ES11 (ES2020) 新特性

### 1. 可选链 (Optional Chaining)

使用 `?.` 安全访问深层嵌套的属性，遇到 `null`/`undefined` 返回 `undefined` 而非报错。

```js
const flower = {
  colors: { red: true },
}

// 传统方式 — 需要逐层判断
if (flower && flower.colors) {
  console.log(flower.colors.red)
}

// ES11 可选链
console.log(flower.colors?.red) // true
console.log(flower.species?.lily) // undefined

// 数组访问
let flowers = ['lily', 'daisy', 'rose']
flowers?.[1] // 'daisy'

flowers = null
flowers?.[1] // undefined

// 函数调用
let plantFlowers = () => 'orchids'
plantFlowers?.() // 'orchids'

plantFlowers = null
plantFlowers?.() // undefined
```

### 2. 空值合并 (Nullish Coalescing)

`??` 只在左侧为 `null` 或 `undefined` 时返回右侧值，不同于 `||` 会过滤所有假值。

```js
// || 的问题 — 0、''、false 都被视为假值
const number = 0
const myNumber = number || 7 // 7（不是预期结果）

// ?? 只在 null/undefined 时返回右侧
const myNumber2 = number ?? 7 // 0 ✅

// 与可选链结合
const user = {}
const city = user.address?.city ?? '未知城市'
```

### 3. 私有字段 (Private Fields)

使用 `#` 前缀定义私有属性，只能在类内部访问。

```js
class Flower {
  #leaf_color = 'green' // 私有字段

  constructor(name) {
    this.name = name // 公开字段
  }

  get_color() {
    return this.#leaf_color
  }
}

const orchid = new Flower('orchid')
console.log(orchid.get_color()) // 'green'
console.log(orchid.#leaf_color) // SyntaxError: Private field '#leaf_color' must be declared in an enclosing class
```

### 4. 静态字段 (Static Fields)

使用 `static` 关键字定义静态方法和静态属性，无需实例化即可调用。

```js
class Flower {
  constructor(type) {
    this.type = type
  }

  static create_flower(type) {
    return new Flower(type)
  }
}

const rose = Flower.create_flower('rose') // ✅ 正常运行
```

### 5. 顶级 Await (Top Level Await)

在模块顶层直接使用 `await`，无需包裹在 `async` 函数中。

```js
// ES11 之前 — 需要 IIFE
;(async () => {
  const response = await fetch(url)
})()

// ES11 — 顶级 await（仅限模块）
const response = await fetch(url)

// 实用场景：模块依赖备用方案
let Vue
try {
  Vue = await import('url_1_to_vue')
} catch {
  Vue = await import('url_2_to_vue')
}
```

### 6. Promise.allSettled()

等待所有 Promise 完成（无论成功或失败），返回每个 Promise 的结果状态。

```js
const promise1 = Promise.resolve('hello')
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 200, 'problem'))

Promise.allSettled([promise1, promise2]).then((results) => {
  console.log(results)
  // [
  //   { status: 'fulfilled', value: 'hello' },
  //   { status: 'rejected', reason: 'problem' }
  // ]
})
```

### 7. 动态导入 (Dynamic Import)

使用 `import()` 表达式按需加载模块，返回 Promise。

```js
// 动态导入
const module = await import('/path/to/module.js')

// 条件加载
if (condition) {
  const utils = await import('./utils.js')
  utils.doSomething()
}
```

### 8. globalThis

统一不同环境下的全局对象访问方式。

```js
// 浏览器
window === globalThis // true

// Node.js
global === globalThis // true

// Web Worker
self === globalThis // true
```

### 9. BigInt

使用 `n` 后缀或 `BigInt()` 创建大于 2^53 - 1 的整数。

```js
// 最大安全整数
Number.MAX_SAFE_INTEGER // 9007199254740991

// BigInt
const bigNumber = 9007199254740991n
const alsoBig = BigInt(9007199254740991)

// BigInt 运算
const sum = 1n + 2n // 3n
const result = (bigNumber + 1n) * 2n

// ⚠️ BigInt 不能与普通 Number 混合运算
1n + 1 // TypeError
```

### 10. 可选链与空值合并结合使用

```js
// 典型场景：安全读取并设置默认值
const user = {
  settings: {
    theme: undefined,
  },
}

const theme = user?.settings?.theme ?? 'light'
// 'light' — 因为 theme 为 undefined

const name = user?.name ?? '匿名用户'
// '匿名用户' — 因为 user.name 不存在
```

---

## ES12 (ES2021) 新特性

### 1. String.prototype.replaceAll()

替换字符串中所有匹配项，无需使用全局正则。

```js
const str = '2021-01-01'

// ES12 之前 — 使用全局正则
str.replace(/-/g, '/') // '2021/01/01'

// ES12 — replaceAll
str.replaceAll('-', '/') // '2021/01/01'
```

### 2. Promise.any()

任意一个 Promise 成功即返回，全部失败则抛出 `AggregateError`。

```js
const promises = [Promise.reject('Error 1'), Promise.resolve('Success'), Promise.reject('Error 2')]

Promise.any(promises)
  .then((result) => {
    console.log(result) // 'Success'
  })
  .catch((err) => {
    console.log(err instanceof AggregateError) // true
    console.log(err.errors) // 所有错误数组
  })
```

### 3. 逻辑赋值运算符

将逻辑运算符与赋值组合：`&&=`、`||=`、`??=`。

```js
// a ||= b — 等价于 a || (a = b)
let x = 0
x ||= 5 // x = 5（0 是假值）

// a &&= b — 等价于 a && (a = b)
let y = 1
y &&= 2 // y = 2（1 是真值）

// a ??= b — 等价于 a ?? (a = b)
let z = null
z ??= 'default' // z = 'default'

// 实际应用：默认值设置
user.name ??= '匿名用户'
```

### 4. WeakRef / FinalizationRegistry

```js
// WeakRef — 弱引用对象，不阻止 GC 回收
let obj = { data: 'large data' }
const ref = new WeakRef(obj)

// 使用
console.log(ref.deref()?.data) // 'large data'
obj = null // 下次 GC 可能回收 obj

// FinalizationRegistry — 注册回收回调
const registry = new FinalizationRegistry((heldValue) => {
  console.log(`对象 ${heldValue} 被回收了`)
})
registry.register(obj, 'myObj')
```

### 5. 数字分隔符

使用 `_` 分隔数字，提高大数字可读性。

```js
const billion = 1_000_000_000 // 10亿
const binary = 0b1010_0001
const hex = 0xff_ff_ff
const bytes = 0b1111_0000_1010_0101

// ⚠️ 注意：分隔符不影响数值
console.log(1_000 === 1000) // true
```

---

## ES13 (ES2022) 新特性

### 1. .at() 方法

`Array.prototype.at()` 和 `String.prototype.at()` 支持负索引，从末尾读取元素。

```js
const arr = [10, 20, 30, 40, 50]

// ES13 之前获取最后一个元素
arr[arr.length - 1] // 50

// ES13 — at()
arr.at(-1) // 50
arr.at(-2) // 40
arr.at(0) // 10
arr.at(3) // 40

// String 也支持
'hello'.at(-1) // 'o'
'hello'.at(0) // 'h'
```

### 2. Object.hasOwn()

比 `Object.prototype.hasOwnProperty` 更安全、更简洁的检查方法。

```js
const obj = Object.create(null) // 没有原型的对象
obj.name = 'Alice'

// 旧方式 — 可能出错
obj.hasOwnProperty('name') // TypeError（对象无原型）

// 更安全的旧方式
Object.prototype.hasOwnProperty.call(obj, 'name') // true

// ES13 — Object.hasOwn
Object.hasOwn(obj, 'name') // true ✅
Object.hasOwn(obj, 'toString') // false（原型链上的不算）
```

### 3. Error.cause

为错误链传递上下文信息。

```js
try {
  await fetchData()
} catch (err) {
  throw new Error('Failed to fetch data', { cause: err })
}

// 捕获时查看原因
try {
  await process()
} catch (err) {
  console.log(err.message) // 'Failed to fetch data'
  console.log(err.cause) // 原始错误对象
  console.log(err.cause.message) // 原始错误信息
}
```

### 4. 类静态块 (Class Static Block)

在类内部执行静态初始化逻辑。

```js
class Database {
  static connection
  static config = {}

  // 静态块 — 初始化静态属性
  static {
    try {
      this.config = loadConfig()
      this.connection = createConnection(this.config)
    } catch (err) {
      console.error('Failed to initialize database')
    }
  }
}

// 多个静态块按顺序执行
class Example {
  static a = 1
  static {
    this.b = this.a + 1 // 2
  }
  static {
    this.c = this.b + 1 // 3
  }
}
```

### 5. 正则表达式匹配索引

使用 `/d` 标记，匹配结果包含每个捕获组的开始和结束索引。

```js
const re = /(?<word>\w+)/d
const match = re.exec('Hello world')

console.log(match.indices)
// [[0, 5], [0, 5]]
console.log(match.indices.groups)
// { word: [0, 5] }
```

### 6. 顶层 await (正式纳入规范)

ES2020 已作为实验性功能引入，ES2022 正式纳入规范（仅限模块环境）。

### 7. 类私有方法/访问器检查

使用 `#` 前缀的私有方法和访问器，以及 `ergonomic brand checks`：`#method in obj` 检查对象是否具有特定私有方法。

```js
class Person {
  #name
  constructor(name) {
    this.#name = name
  }
  static isPerson(obj) {
    return #name in obj // ergonomic brand check
  }
}

const p = new Person('Alice')
Person.isPerson(p) // true
Person.isPerson({}) // false
```

---

## ES14 (ES2023) 新特性

### 1. Array.findLast() / findLastIndex()

从数组末尾开始查找，返回元素或索引。

```js
const arr = [1, 2, 3, 4, 5, 3]

// ES14 之前查找最后一个匹配
;[...arr].reverse().find((x) => x === 3) // 3（但修改了原数组）

// ES14
arr.findLast((x) => x === 3) // 3（最后一个 3）
arr.findLastIndex((x) => x === 3) // 5（最后一个 3 的索引）

// 实际应用
const students = [
  { name: 'Alice', grade: 'A' },
  { name: 'Bob', grade: 'B' },
  { name: 'Charlie', grade: 'A' },
]
students.findLast((s) => s.grade === 'A')
// { name: 'Charlie', grade: 'A' }
```

### 2. Hashbang 语法

JavaScript 文件可以直接使用 `#!/usr/bin/env node` 作为第一行，无需额外配置。

```js
#!/usr/bin/env node
// 上面的行会被 JS 引擎忽略，但让操作系统知道用 Node 执行
console.log('Hello from CLI')
```

### 3. Symbol 作为 WeakMap 键

Symbol 可以用作 WeakMap 的键（之前只有对象可以）。

```js
const weak = new WeakMap()
const key = Symbol('key')
weak.set(key, 'secret')
weak.get(key) // 'secret'
```

---

## ES2024 新特性前瞻

### 1. Promise.withResolvers()

无需在构造函数中手动定义 resolve/reject，直接创建 Promise 及其控制函数。

```js
// 传统方式
const promise = new Promise((resolve, reject) => {
  // resolve 和 reject 只能在回调内部使用
})

// ES2024
const { promise, resolve, reject } = Promise.withResolvers()

// 可以在外部控制 Promise 状态
setTimeout(() => resolve('done'), 1000)
await promise // 'done'

// 实用场景：事件驱动的 Promise
function waitForClick(button) {
  const { promise, resolve } = Promise.withResolvers()
  button.addEventListener('click', () => resolve('clicked'), { once: true })
  return promise
}
```

### 2. Array 分组方法

`Object.groupBy()` 和 `Map.groupBy()` 将数组按条件分组。

```js
const array = [1, 2, 3, 4, 5, 6]

// Object.groupBy
const groups = Object.groupBy(array, (num) => {
  return num % 2 === 0 ? 'even' : 'odd'
})
// { odd: [1, 3, 5], even: [2, 4, 6] }

// Map.groupBy
const mapGroup = Map.groupBy(array, (num) => num > 3)
// Map { false => [1, 2, 3], true => [4, 5, 6] }
```

---

> 上一章 → [ES6 到 ES8 新特性](./es6-es8.md)
