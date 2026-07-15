# JavaScript 基础

前端面试高频 JavaScript 基础知识点。

## 数据类型

### 基本类型

`number`、`string`、`boolean`、`null`、`undefined`、`symbol`、`bigint`

### 引用类型

`object`（包括 `array`、`function`、`date`、`regexp` 等）

### 判断方式

| 方法 | 特点 |
|------|------|
| `typeof` | 对引用类型只能返回 `object` 或 `function` |
| `instanceof` | 通过原型链判断，可被重写 |
| `Object.prototype.toString.call()` | 最准确，返回 `[object Type]` |

```javascript
typeof undefined    // "undefined"
typeof null         // "object"（历史遗留 bug）
typeof []           // "object"
typeof {}           // "object"

Object.prototype.toString.call(null)     // "[object Null]"
Object.prototype.toString.call([])       // "[object Array]"
```

### null 和 undefined 的区别

- `undefined`：未定义（变量未赋值、函数无返回值、对象不存在的属性）
- `null`：空值（主动释放对象引用）

```javascript
typeof undefined  // "undefined"
typeof null       // "object"

null == undefined   // true（宽松相等会做类型转换）
null === undefined  // false
```

## 作用域与闭包

### 作用域

- **全局作用域**：`var` 声明的变量、函数声明
- **函数作用域**：函数内 `var` 声明的变量
- **块级作用域**：`let`/`const` 在 `{}` 中声明

### 变量提升

```javascript
console.log(a); // undefined（var 会提升声明，但不提升赋值）
var a = 1;

console.log(b); // ReferenceError（let/const 不会提升）
let b = 2;
```

### 闭包

闭包是指函数能够记住并访问其词法作用域中的变量。

```javascript
function makeCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count
  };
}

const counter = makeCounter();
counter.increment();
counter.increment();
counter.getCount(); // 2
```

### 经典闭包问题

```javascript
// 循环中的闭包问题
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3 3 3
}

// 解决方案 1：使用 let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0 1 2
}

// 解决方案 2：使用 IIFE
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 0);
  })(i); // 0 1 2
}
```

## this 指向

### 绑定规则

1. **默认绑定**：独立函数调用，`this` 指向 `window`（严格模式下 `undefined`）
2. **隐式绑定**：对象方法调用，`this` 指向调用者
3. **显式绑定**：`call`/`apply`/`bind`，手动指定 `this`
4. **new 绑定**：构造函数中 `this` 指向新创建的实例

### 箭头函数

箭头函数没有自己的 `this`，继承外层作用域的 `this`。

```javascript
const obj = {
  name: 'Tom',
  greet: function() {
    setTimeout(() => console.log(this.name), 0); // "Tom"
  }
};
```

## 原型与原型链

### 原型关系

```
实例.__proto__ === 构造函数.prototype
构造函数.prototype.__proto__ === Object.prototype
Object.prototype.__proto__ === null
```

### 继承

```javascript
// 原型链继承
function Parent() { this.name = 'parent'; }
Parent.prototype.getName = function() { return this.name; };

function Child() { this.type = 'child'; }
Child.prototype = new Parent();
Child.prototype.constructor = Child;

// 寄生组合继承（推荐）
function Child(...args) {
  Parent.apply(this, args);
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
```

## 事件循环（Event Loop）

### 宏任务与微任务

| 类型 | 示例 |
|------|------|
| 宏任务（Macro Task） | `setTimeout`、`setInterval`、`I/O`、`UI rendering` |
| 微任务（Micro Task） | `Promise.then`、`MutationObserver`、`queueMicrotask` |

### 执行顺序

1. 执行同步代码（主模块代码）
2. 执行所有微任务
3. 执行一个宏任务
4. 重复步骤 2-3

```javascript
console.log('1');               // 同步

setTimeout(() => console.log('2'), 0);  // 宏任务

Promise.resolve().then(() => console.log('3'));  // 微任务

console.log('4');               // 同步

// 输出: 1 → 4 → 3 → 2
```

### async/await

`async` 函数返回 Promise，`await` 后面的代码相当于 `.then` 中的微任务。

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');  // 微任务
}

async function async2() {
  console.log('async2');
}

console.log('script start');
async1();
console.log('script end');

// 输出: script start → async1 start → async2 → script end → async1 end
```

## Promise

### 基本用法

```javascript
const p = new Promise((resolve, reject) => {
  resolve(1);
  // reject('error');
});

p.then(res => console.log(res))   // 1
 .catch(err => console.log(err))
 .finally(() => console.log('done'));
```

### 链式调用

```javascript
Promise.resolve(1)
  .then(x => x + 1)      // 2
  .then(x => { throw x; })
  .catch(x => x + 1)      // 3
  .then(x => x + 1)       // 4
  .then(console.log);      // 4
```

### Promise 的错误处理

- `.catch` 只能捕获前面的错误
- 两个 `.catch` 中的第一个不会捕获第二个 `.then` 中的错误
- 建议在链末尾加 `.catch`

## 解构赋值

```javascript
// 数组解构
const [a, b, ...rest] = [1, 2, 3, 4];  // a=1, b=2, rest=[3,4]

// 对象解构
const { name, age = 18 } = { name: 'Tom' };  // name='Tom', age=18

// 嵌套解构
const { a: { b } } = { a: { b: 1 } };  // b=1

// 交换变量
let x = 1, y = 2;
[x, y] = [y, x];
```

## 扩展运算符与 rest 参数

```javascript
// 扩展运算符
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];  // [1, 2, 3, 4]

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 };  // { a: 1, b: 2 }

// rest 参数
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
```

## 迭代器与生成器

```javascript
// 迭代器协议：对象必须有 next() 方法，返回 { value, done }
const iterable = {
  [Symbol.iterator]() {
    let n = 0;
    return {
      next() {
        return { value: n++, done: n > 5 };
      }
    };
  }
};

// for...of 遍历迭代器
for (const item of iterable) {
  console.log(item); // 0, 1, 2, 3, 4
}

// 生成器
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
const g = gen();
g.next(); // { value: 1, done: false }
g.next(); // { value: 2, done: false }
g.next(); // { value: 3, done: false }
g.next(); // { value: undefined, done: true }
```

## Proxy 与 Reflect

```javascript
const handler = {
  get(target, key) {
    console.log(`访问 ${key}`);
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    console.log(`设置 ${key} = ${value}`);
    return Reflect.set(target, key, value);
  }
};

const data = new Proxy({ name: 'Tom', age: 18 }, handler);
data.name;    // 访问 name → "Tom"
data.age = 20; // 设置 age = 20
```

Vue 3 的响应式系统就是基于 `Proxy` 实现的。

## 模块化

### CommonJS

```javascript
// 导出
module.exports = { a: 1, b: 2 };
exports.a = 1;

// 导入
const { a, b } = require('./module');
```

### ES Modules

```javascript
// 导出
export const a = 1;
export default { b: 2 };

// 导入
import { a } from './module';
import mod from './module';
```

### 区别

| 特性 | CommonJS | ES Modules |
|------|----------|------------|
| 加载方式 | 运行时加载 | 编译时加载 |
| 导出 | 值的拷贝 | 值的引用 |
| 加载模块 | 同步 | 异步 |
| 适用环境 | Node.js | 浏览器 + Node.js |

## 类型转换

### 显式转换

```javascript
Number('123')      // 123
Number('abc')      // NaN
String(123)        // "123"
Boolean(0)         // false
Boolean('')        // false
Boolean(null)      // false
Boolean(undefined) // false
Boolean([])        // true
Boolean({})        // true
```

### 隐式转换

```javascript
// == 的隐式转换
'' == false     // true
'0' == false    // true
' ' == false    // true
null == undefined  // true
NaN == NaN      // false

// + 运算符
1 + '2'       // "12"（字符串拼接）
true + 1      // 2（true 转为 1）
[] + {}       // "[object Object]"
{} + []       // 0
```

## 垃圾回收

### 标记清除

从根对象（全局对象）出发，标记所有可达的对象，清除不可达的对象。

### 引用计数

跟踪对象被引用的次数，为 0 时回收。存在循环引用问题。

### V8 优化

- **分代收集**：新生成的对象（young generation）和存活时间长的对象（old generation）
- **增量标记**：分步标记，避免长时间停顿
