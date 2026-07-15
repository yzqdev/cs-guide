# ES6 (ES2015) 到 ES8 (ES2017) 新特性

本文档涵盖从 ES6 到 ES8 的核心 JavaScript 新特性。

## 目录

- [ES6 (ES2015) 核心特性](#es6-es2015-核心特性)
  - [1. let 和 const](#1-let-和-const)
  - [2. 箭头函数](#2-箭头函数)
  - [3. 模板字符串](#3-模板字符串)
  - [4. 解构赋值](#4-解构赋值)
  - [5. 默认参数 / Rest 参数 / 展开运算符](#5-默认参数--rest-参数--展开运算符)
  - [6. 类 (Class)](#6-类-class)
  - [7. 模块化 (Module)](#7-模块化-module)
  - [8. Promise](#8-promise)
  - [9. Symbol](#9-symbol)
  - [10. Map 与 Set](#10-map-与-set)
  - [11. 迭代器 (Iterator) 与生成器 (Generator)](#11-迭代器-iterator-与生成器-generator)
  - [12. 数值新方法](#12-数值新方法)
- [ES7 (ES2016) 新特性](#es7-es2016-新特性)
  - [1. Array.prototype.includes()](#1-arrayprototypeincludes)
  - [2. 指数运算符 `**`](#2-指数运算符-)
- [ES8 (ES2017) 新特性](#es8-es2017-新特性)
  - [1. async/await](#1-asyncawait)
  - [2. Object.values()](#2-objectvalues)
  - [3. Object.entries()](#3-objectentries)
  - [4. String padding: padStart() / padEnd()](#4-string-padding-padstart--padend)
  - [5. 函数参数列表结尾允许逗号](#5-函数参数列表结尾允许逗号)
  - [6. Object.getOwnPropertyDescriptors()](#6-objectgetownpropertydescriptors)
  - [7. SharedArrayBuffer 与 Atomics](#7-sharedarraybuffer-与-atomics)

---

## ES6 (ES2015) 核心特性

ES6 是 JavaScript 自诞生以来最大的一次更新，引入了大量新语法和特性，奠定了现代 JavaScript 的基础。

### 1. let 和 const

`let` 和 `const` 提供了块级作用域（block-scoped）的变量声明方式，取代了 `var` 的函数级作用域。

```js
// let — 块级作用域变量
{
  let x = 1
  console.log(x) // 1
}
console.log(x) // ReferenceError: x is not defined

// const — 块级作用域常量（引用不可变）
const PI = 3.14159
PI = 3 // TypeError: Assignment to constant variable

// const 对象属性可变
const obj = { a: 1 }
obj.a = 2 // ✅ 允许
obj = {} // ❌ 不允许

// 暂时性死区 (TDZ)
console.log(a) // ReferenceError
let a = 1
```

### 2. 箭头函数

箭头函数提供了更简洁的函数写法，并且没有自己的 `this`、`arguments`、`super` 或 `new.target`。

```js
// 基本语法
const add = (a, b) => a + b

// 单参数可省略括号
const square = (x) => x * x

// 多行函数体需要花括号和 return
const sum = (a, b) => {
  const result = a + b
  return result
}

// 返回对象字面量需加括号
const create = (name) => ({ id: 1, name })

// 箭头函数没有自己的 this
const obj = {
  name: 'Alice',
  greet1: function () {
    setTimeout(function () {
      console.log(this.name) // undefined (this 指向 window/global)
    }, 100)
  },
  greet2: function () {
    setTimeout(() => {
      console.log(this.name) // 'Alice' (箭头函数捕获外层 this)
    }, 100)
  },
}
```

### 3. 模板字符串

模板字符串使用反引号 `` ` ``，支持嵌入表达式和多行字符串。

```js
const name = 'World'
const greeting = `Hello, ${name}!` // Hello, World!

// 多行字符串
const html = `
  <div>
    <h1>${name}</h1>
  </div>
`

// 带标签的模板字符串 (Tagged Template)
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => `${result}${str}<strong>${values[i] || ''}</strong>`, '')
}
const msg = highlight`Hello, ${name}!`
```

### 4. 解构赋值

从数组或对象中提取值并赋给变量。

```js
// 数组解构
const [a, b, c] = [1, 2, 3]
// a=1, b=2, c=3

const [first, ...rest] = [1, 2, 3, 4]
// first=1, rest=[2,3,4]

// 默认值
const [x = 0, y = 0] = [1]
// x=1, y=0

// 交换变量
;[a, b] = [b, a]

// 对象解构
const person = { name: 'Alice', age: 30 }
const { name, age } = person

// 重命名 + 默认值
const { name: userName, gender = 'unknown' } = person

// 嵌套解构
const data = { user: { id: 1, info: { email: 'a@b.com' } } }
const {
  user: {
    info: { email },
  },
} = data

// 函数参数解构
function print({ name, age }) {
  console.log(`${name} is ${age} years old`)
}
```

### 5. 默认参数 / Rest 参数 / 展开运算符

```js
// 默认参数
function greet(name = 'Guest') {
  return `Hello, ${name}`
}

// Rest 参数 — 收集剩余参数为数组
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0)
}
sum(1, 2, 3, 4) // 10

// 展开运算符 — 展开数组/对象
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const merged = [...arr1, ...arr2] // [1,2,3,4,5,6]

// 复制数组（浅拷贝）
const copy = [...arr1]

// 函数调用时展开
Math.max(...[1, 5, 3]) // 5
```

### 6. 类 (Class)

ES6 的 `class` 语法糖，基于原型链的面向对象编程。

```js
class Animal {
  constructor(name) {
    this.name = name
  }

  speak() {
    console.log(`${this.name} makes a sound.`)
  }

  // 静态方法
  static classify() {
    return 'Animal'
  }

  // Getter / Setter
  get description() {
    return `This is ${this.name}`
  }

  set nickname(val) {
    this.name = val
  }
}

// 继承
class Dog extends Animal {
  constructor(name, breed) {
    super(name) // 必须调用 super
    this.breed = breed
  }

  speak() {
    console.log(`${this.name} barks!`)
  }
}
```

### 7. 模块化 (Module)

ES6 原生支持模块化，使用 `import` / `export`。

```js
// 📁 math.js
export const PI = 3.14159
export function add(a, b) {
  return a + b
}
export default class Calculator {
  /* ... */
}

// 📁 app.js
import Calculator, { PI, add } from './math.js'
import * as MathUtils from './math.js'
```

### 8. Promise

Promise 用于处理异步操作，避免回调地狱。[详见 Promise 专题](./promise.md)。

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000)
})

promise
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
  .finally(() => console.log('complete'))
```

### 9. Symbol

Symbol 是唯一的、不可变的基本类型，常用于对象属性键。

```js
const sym1 = Symbol('desc')
const sym2 = Symbol('desc')
sym1 === sym2 // false

// 用作对象属性
const obj = {
  [sym1]: 'value1',
  [sym2]: 'value2',
}

// 内置 Symbol
const arr = [1, 2, 3]
const it = arr[Symbol.iterator]()
```

### 10. Map 与 Set

```js
// Map — 键可以是任意类型
const map = new Map()
map.set('key', 'value')
map.set(obj, 'object value')
map.get('key') // 'value'
map.size // 2
map.has('key') // true
map.delete('key')

// 遍历
for (const [key, value] of map) {
  /* ... */
}

// Set — 值唯一
const set = new Set([1, 2, 2, 3, 3, 3])
set.size // 3
set.has(1) // true
set.add(4)
set.delete(1)
```

### 11. 迭代器 (Iterator) 与生成器 (Generator)

```js
// 迭代器协议
const iterable = {
  [Symbol.iterator]() {
    let step = 0
    return {
      next() {
        step++
        if (step <= 3) return { value: step, done: false }
        return { value: undefined, done: true }
      },
    }
  },
}
for (const n of iterable) {
  console.log(n)
} // 1, 2, 3

// 生成器 — 简化迭代器创建
function* generator() {
  yield 1
  yield 2
  yield 3
}
const gen = generator()
gen.next() // { value: 1, done: false }
gen.next() // { value: 2, done: false }
```

### 12. 数值新方法

```js
Number.isNaN(NaN) // true
Number.isFinite(Infinity) // false
Number.isInteger(1.5) // false
Number.parseInt('42') // 42
Number.parseFloat('3.14') // 3.14
```

---

## ES7 (ES2016) 新特性

ES2016 只添加了两个小特性，展示了 ECMAScript 的标准化流程：

### 1. Array.prototype.includes()

`includes()` 判断数组是否包含某个值，返回 `true` / `false`，比 `indexOf` 更直观。

```js
// ES7 之前 — 使用 indexOf
const arr = ['react', 'angular', 'vue']
if (arr.indexOf('react') !== -1) {
  console.log('react 存在')
}

// ES7 — 使用 includes
if (arr.includes('react')) {
  console.log('react 存在')
}

// includes 能正确处理 NaN
;[NaN].indexOf(NaN) // -1
;[NaN].includes(NaN) // true
```

### 2. 指数运算符 `**`

`**` 与 `Math.pow()` 等效，但更简洁。

```js
// 不使用指数操作符
Math.pow(2, 10) // 1024

// 使用指数操作符
2 ** 10 // 1024

// 结合赋值
let a = 2
a **= 3 // a = 8
```

---

## ES8 (ES2017) 新特性

### 1. async/await

让异步代码像同步代码一样编写，详见 [async-await 专题](./async-await.md)。

```js
async function fetchData(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('请求失败:', error)
  }
}
```

### 2. Object.values()

返回对象自身所有可枚举属性的值组成的数组。

```js
const obj = { a: 1, b: 2, c: 3 }

// ES7 方式
const vals = Object.keys(obj).map((key) => obj[key])
console.log(vals) // [1, 2, 3]

// ES8 方式
console.log(Object.values(obj)) // [1, 2, 3]
```

### 3. Object.entries()

返回对象自身可枚举属性的 `[key, value]` 对数组。

```js
const obj = { a: 1, b: 2, c: 3 }

// ES7 方式
Object.keys(obj).forEach((key) => {
  console.log(`key: ${key} value: ${obj[key]}`)
})

// ES8 方式
for (const [key, value] of Object.entries(obj)) {
  console.log(`key: ${key} value: ${value}`)
}

// Object.entries 也可用于 Map 转换
const map = new Map(Object.entries(obj))
```

### 4. String padding: padStart() / padEnd()

用指定字符串填充原字符串到目标长度。

```js
// padStart — 从开头填充
console.log('0.0'.padStart(4, '10')) // 10.0
console.log('0.0'.padStart(20)) // '                0.0'

// padEnd — 从结尾填充
console.log('0.0'.padEnd(4, '0')) // 0.00
console.log('0.0'.padEnd(10, '0')) // 0.00000000

// 实际应用：数字补零、对齐
console.log('5'.padStart(2, '0')) // '05'
console.log('12'.padStart(2, '0')) // '12'
```

### 5. 函数参数列表结尾允许逗号

方便多人协作开发时修改函数签名，减少不必要的行变更。

```js
// ES8 允许在参数列表末尾加逗号
function foo(
  param1,
  param2,
  param3, // 末尾逗号，git diff 更干净
) {
  // ...
}
```

### 6. Object.getOwnPropertyDescriptors()

获取对象所有自身属性的描述符。

```js
const obj = {
  name: 'Jine',
  get age() {
    return '18'
  },
}

Object.getOwnPropertyDescriptors(obj)
// {
//   age: {
//     configurable: true,
//     enumerable: true,
//     get: function age(){},
//     set: undefined
//   },
//   name: {
//     configurable: true,
//     enumerable: true,
//     value: "Jine",
//     writable: true
//   }
// }

// 结合 Object.defineProperties 用于浅拷贝 getter/setter
const clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj))
```

### 7. SharedArrayBuffer 与 Atomics

> 用于共享内存和原子操作，主要面向 Web Workers 多线程场景。

```js
// SharedArrayBuffer — 共享内存缓冲区
const buffer = new SharedArrayBuffer(16)
const view = new Int32Array(buffer)

// Atomics — 原子操作
Atomics.add(view, 0, 5) // 位置0加5，返回旧值
Atomics.store(view, 0, 10)
Atomics.load(view, 0) // 10
Atomics.compareExchange(view, 0, 10, 20) // 如果值是10则换成20
```

---

> 下一章 → [ES9 (ES2018) 到 ES12 (ES2021) 新特性](./es9-es12.md)
