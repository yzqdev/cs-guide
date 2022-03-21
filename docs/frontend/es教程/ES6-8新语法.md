# ES6 (ES2015)

直接看掘金上的文章不香吗??
[https://juejin.cn/post/6844903775329583112](https://juejin.cn/post/6844903775329583112)

## ES7新特性（2016）

ES2016添加了两个小的特性来说明标准化过程：

- 数组includes()方法，用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回true，否则返回false。
- a ** b指数运算符，它与 Math.pow(a, b)相同。

### 1.Array.prototype.includes()

`includes()` 函数用来判断一个数组是否包含一个指定的值，如果包含则返回 `true`，否则返回`false`。

`includes` 函数与 `indexOf` 函数很相似，下面两个表达式是等价的：

```
arr.includes(x)
arr.indexOf(x) >= 0

复制代码
```

接下来我们来判断数字中是否包含某个元素：

> 在ES7之前的做法

使用`indexOf()`验证数组中是否存在某个元素，这时需要根据返回值是否为-1来判断：

```
let arr = ['react', 'angular', 'vue'];

if (arr.indexOf('react') !== -1)
{
    console.log('react存在');
}

复制代码
```

> 使用ES7的includes()

使用includes()验证数组中是否存在某个元素，这样更加直观简单：

```
let arr = ['react', 'angular', 'vue'];

if (arr.includes('react'))
{
    console.log('react存在');
}
复制代码
```

### 2.指数操作符

在ES7中引入了指数运算符`**`，`**`具有与`Math.pow(..)`等效的计算结果。

> 不使用指数操作符

使用自定义的递归函数calculateExponent或者Math.pow()进行指数运算：

```
function calculateExponent(base, exponent)
{
    if (exponent === 1)
    {
        return base;
    }
    else
    {
        return base * calculateExponent(base, exponent - 1);
    }
}

console.log(calculateExponent(2, 10)); // 输出1024
console.log(Math.pow(2, 10)); // 输出1024
复制代码
```

> 使用指数操作符

使用指数运算符**，就像+、-等操作符一样：

```
console.log(2**10);// 输出1024
复制代码
```

## ES8新特性（2017）

- async/await
- `Object.values()`
- `Object.entries()`
- String padding: `padStart()`和`padEnd()`，填充字符串达到当前长度
- 函数参数列表结尾允许逗号
- `Object.getOwnPropertyDescriptors()`
- `ShareArrayBuffer`和`Atomics`对象，用于从共享内存位置读取和写入

### 1.async/await

ES2018引入异步迭代器（asynchronous iterators），这就像常规迭代器，除了`next()`方法返回一个Promise。因此`await`可以和`for...of`循环一起使用，以串行的方式运行异步操作。例如：

```
async function process(array) {
  for await (let i of array) {
    doSomething(i);
  }
}
复制代码
```

### 2.Object.values()

`Object.values()`是一个与`Object.keys()`类似的新函数，但返回的是Object自身属性的所有值，不包括继承的值。

假设我们要遍历如下对象`obj`的所有值：

```
const obj = {a: 1, b: 2, c: 3};
复制代码
```

> 不使用Object.values() :ES7

```
const vals=Object.keys(obj).map(key=>obj[key]);
console.log(vals);//[1, 2, 3]
复制代码
```

> 使用Object.values() :ES8

```
const values=Object.values(obj1);
console.log(values);//[1, 2, 3]
复制代码
```

从上述代码中可以看出`Object.values()`为我们省去了遍历key，并根据这些key获取value的步骤。

### 3.Object.entries()

`Object.entries()`函数返回一个给定对象自身可枚举属性的键值对的数组。

接下来我们来遍历上文中的`obj`对象的所有属性的key和value：

> 不使用Object.entries() :ES7

```
Object.keys(obj).forEach(key=>{
 console.log('key:'+key+' value:'+obj[key]);
})
//key:a value:1
//key:b value:2
//key:c value:3
复制代码
```

> 使用Object.entries() :ES8

```
for(let [key,value] of Object.entries(obj1)){
 console.log(`key: ${key} value:${value}`)
}
//key:a value:1
//key:b value:2
//key:c value:3

复制代码
```

### 4.String padding

在ES8中String新增了两个实例函数`String.prototype.padStart`和`String.prototype.padEnd`，允许将空字符串或其他字符串添加到原始字符串的开头或结尾。

> String.padStart(targetLength,[padString])

- targetLength:当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
- padString:(可选)填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断，此参数的缺省值为 " "。

```
console.log('0.0'.padStart(4,'10')) //10.0
console.log('0.0'.padStart(20))// 0.00    
复制代码
```

> String.padEnd(targetLength,padString])

- targetLength:当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
- padString:(可选) 填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断，此参数的缺省值为 " "；

```
console.log('0.0'.padEnd(4,'0')) //0.00    
console.log('0.0'.padEnd(10,'0'))//0.00000000
复制代码
```

### 5.函数参数列表结尾允许逗号

主要作用是方便使用git进行多人协作开发时修改同一个函数减少不必要的行变更。

### 6.Object.getOwnPropertyDescriptors()

`Object.getOwnPropertyDescriptors()`函数用来获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。

> 函数原型：

```
Object.getOwnPropertyDescriptors(obj)
复制代码
```

返回`obj`对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。

```
const obj2 = {
 name: 'Jine',
 get age() { return '18' }
};
Object.getOwnPropertyDescriptors(obj2)
// {
//   age: {
//     configurable: true,
//     enumerable: true,
//     get: function age(){}, //the getter function
//     set: undefined
//   },
//   name: {
//     configurable: true,
//     enumerable: true,
//  value:"Jine",
//  writable:true
//   }
// }
复制代码
```

### 7.SharedArrayBuffer对象

SharedArrayBuffer 对象用来表示一个通用的，固定长度的原始二进制数据缓冲区，类似于 ArrayBuffer 对象，它们都可以用来在共享内存（shared memory）上创建视图。与 ArrayBuffer 不同的是，SharedArrayBuffer 不能被分离。

```
/**
 * 
 * @param {*} length 所创建的数组缓冲区的大小，以字节(byte)为单位。  
 * @returns {SharedArrayBuffer} 一个大小指定的新 SharedArrayBuffer 对象。其内容被初始化为 0。
 */
new SharedArrayBuffer(length)
复制代码
```

### 8.Atomics对象

Atomics 对象提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作。

这些原子操作属于 Atomics 模块。与一般的全局对象不同，Atomics 不是构造函数，因此不能使用 new 操作符调用，也不能将其当作函数直接调用。Atomics 的所有属性和方法都是静态的（与 Math  对象一样）。

多个共享内存的线程能够同时读写同一位置上的数据。原子操作会确保正在读或写的数据的值是符合预期的，即下一个原子操作一定会在上一个原子操作结束后才会开始，其操作过程不会中断。

- Atomics.add()

> 将指定位置上的数组元素与给定的值相加，并返回相加前该元素的值。

- Atomics.and()

> 将指定位置上的数组元素与给定的值相与，并返回与操作前该元素的值。

- Atomics.compareExchange()

> 如果数组中指定的元素与给定的值相等，则将其更新为新的值，并返回该元素原先的值。

- Atomics.exchange()

> 将数组中指定的元素更新为给定的值，并返回该元素更新前的值。

- Atomics.load()

> 返回数组中指定元素的值。

- Atomics.or()

> 将指定位置上的数组元素与给定的值相或，并返回或操作前该元素的值。

- Atomics.store()

> 将数组中指定的元素设置为给定的值，并返回该值。

- Atomics.sub()

> 将指定位置上的数组元素与给定的值相减，并返回相减前该元素的值。

- Atomics.xor()

> 将指定位置上的数组元素与给定的值相异或，并返回异或操作前该元素的值。

wait() 和 wake() 方法采用的是 Linux 上的 futexes 模型（fast user-space mutex，快速用户空间互斥量），可以让进程一直等待直到某个特定的条件为真，主要用于实现阻塞。

- Atomics.wait()

> 检测数组中某个指定位置上的值是否仍然是给定值，是则保持挂起直到被唤醒或超时。返回值为 "ok"、"not-equal" 或 "time-out"。调用时，如果当前线程不允许阻塞，则会抛出异常（大多数浏览器都不允许在主线程中调用 wait()）。

- Atomics.wake()

> 唤醒等待队列中正在数组指定位置的元素上等待的线程。返回值为成功唤醒的线程数量。

- Atomics.isLockFree(size)

> 可以用来检测当前系统是否支持硬件级的原子操作。对于指定大小的数组，如果当前系统支持硬件级的原子操作，则返回 true；否则就意味着对于该数组，Atomics 对象中的各原子操作都只能用锁来实现。此函数面向的是技术专家。-->

## ES9新特性（2018）

- 异步迭代
- Promise.finally()
- Rest/Spread 属性
- [正则表达式命名捕获组](http://esnext.justjavac.com/proposal/regexp-named-groups.html)（Regular Expression Named Capture Groups）
- [正则表达式反向断言](https://segmentfault.com/a/1190000006824133)（lookbehind）
- 正则表达式dotAll模式
- [正则表达式 Unicode 转义](https://juejin.im/post/6844903622870827022#heading-1)
- [非转义序列的模板字符串](https://juejin.im/post/6844903622870827022#heading-1)

### 1.异步迭代

在`async/await`的某些时刻，你可能尝试在同步循环中调用异步函数。例如：

```
async function process(array) {
  for (let i of array) {
    await doSomething(i);
  }
}
复制代码
```

这段代码不会正常运行，下面这段同样也不会：

```
async function process(array) {
  array.forEach(async i => {
    await doSomething(i);
  });
}
复制代码
```

这段代码中，循环本身依旧保持同步，并在在内部异步函数之前全部调用完成。

ES2018引入异步迭代器（asynchronous iterators），这就像常规迭代器，除了`next()`方法返回一个Promise。因此`await`可以和`for...of`循环一起使用，以串行的方式运行异步操作。例如：

```
async function process(array) {
  for await (let i of array) {
    doSomething(i);
  }
}
复制代码
```

### 2.Promise.finally()

一个Promise调用链要么成功到达最后一个`.then()`，要么失败触发`.catch()`。在某些情况下，你想要在无论Promise运行成功还是失败，运行相同的代码，例如清除，删除对话，关闭数据库连接等。

`.finally()`允许你指定最终的逻辑：

```
function doSomething() {
  doSomething1()
  .then(doSomething2)
  .then(doSomething3)
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    // finish here!
  });
}
复制代码
```

### 3.Rest/Spread 属性

ES2015引入了[Rest参数](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FFunctions%2FRest_parameters)和[扩展运算符](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2FSpread_syntax)。三个点（...）仅用于数组。Rest参数语法允许我们将一个不定数量的参数表示为一个数组。

```
restParam(1, 2, 3, 4, 5);

function restParam(p1, p2, ...p3) {
  // p1 = 1
  // p2 = 2
  // p3 = [3, 4, 5]
}
复制代码
```

展开操作符以相反的方式工作，将数组转换成可传递给函数的单独参数。例如`Math.max()`返回给定数字中的最大值：

```
const values = [99, 100, -1, 48, 16];
console.log( Math.max(...values) ); // 100
复制代码
```

ES2018为对象解构提供了和数组一样的Rest参数（）和展开操作符，一个简单的例子：

```
const myObject = {
  a: 1,
  b: 2,
  c: 3
};

const { a, ...x } = myObject;
// a = 1
// x = { b: 2, c: 3 }
复制代码
```

或者你可以使用它给函数传递参数：

```
restParam({
  a: 1,
  b: 2,
  c: 3
});

function restParam({ a, ...x }) {
  // a = 1
  // x = { b: 2, c: 3 }
}
复制代码
```

跟数组一样，Rest参数只能在声明的结尾处使用。此外，它只适用于每个对象的顶层，如果对象中嵌套对象则无法适用。

扩展运算符可以在其他对象内使用，例如：

```
const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { ...obj1, z: 26 };
// obj2 is { a: 1, b: 2, c: 3, z: 26 }
复制代码
```

可以使用扩展运算符拷贝一个对象，像是这样`obj2 = {...obj1}`，但是 **这只是一个对象的浅拷贝**。另外，如果一个对象A的属性是对象B，那么在克隆后的对象cloneB中，该属性指向对象B。

### 4.正则表达式命名捕获组

JavaScript正则表达式可以返回一个匹配的对象——一个包含匹配字符串的类数组，例如：以`YYYY-MM-DD`的格式解析日期：

```
const
  reDate = /([0-9]{4})-([0-9]{2})-([0-9]{2})/,
  match  = reDate.exec('2018-04-30'),
  year   = match[1], // 2018
  month  = match[2], // 04
  day    = match[3]; // 30
复制代码
```

这样的代码很难读懂，并且改变正则表达式的结构有可能改变匹配对象的索引。

ES2018允许命名捕获组使用符号`?<name>`，在打开捕获括号`(`后立即命名，示例如下：

```javascript
const
  reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
  match  = reDate.exec('2018-04-30'),
  year   = match.groups.year,  // 2018
  month  = match.groups.month, // 04
  day    = match.groups.day;   // 30
复制代码
```

任何匹配失败的命名组都将返回`undefined`。

命名捕获也可以使用在`replace()`方法中。例如将日期转换为美国的 MM-DD-YYYY 格式：

```
const
  reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
  d      = '2018-04-30',
  usDate = d.replace(reDate, '$<month>-$<day>-$<year>');
复制代码
```

### 5.正则表达式反向断言

目前JavaScript在正则表达式中支持先行断言（lookahead）。这意味着匹配会发生，但不会有任何捕获，并且断言没有包含在整个匹配字段中。例如从价格中捕获货币符号：

```
const
  reLookahead = /\D(?=\d+)/,
  match       = reLookahead.exec('$123.89');

console.log( match[0] ); // $
复制代码
```

ES2018引入以相同方式工作但是匹配前面的反向断言（lookbehind），这样我就可以忽略货币符号，单纯的捕获价格的数字：

```
const
  reLookbehind = /(?<=\D)\d+/,
  match        = reLookbehind.exec('$123.89');

console.log( match[0] ); // 123.89
复制代码
```

以上是 **肯定反向断言**，非数字`\D`必须存在。同样的，还存在 **否定反向断言**，表示一个值必须不存在，例如：

```
const
  reLookbehindNeg = /(?<!\D)\d+/,
  match           = reLookbehind.exec('$123.89');

console.log( match[0] ); // null
复制代码
```

### 6.正则表达式dotAll模式

正则表达式中点`.`匹配除回车外的任何单字符，标记`s`改变这种行为，允许行终止符的出现，例如：

```
/hello.world/.test('hello\nworld');  // false
/hello.world/s.test('hello\nworld'); // true
复制代码
```

### 7.正则表达式 Unicode 转义

到目前为止，在正则表达式中本地访问 Unicode 字符属性是不被允许的。ES2018添加了 Unicode 属性转义——形式为`\p{...}`和`\P{...}`，在正则表达式中使用标记 `u` (unicode) 设置，在`\p`块儿内，可以以键值对的方式设置需要匹配的属性而非具体内容。例如：

```
const reGreekSymbol = /\p{Script=Greek}/u;
reGreekSymbol.test('π'); // true
复制代码
```

此特性可以避免使用特定 Unicode 区间来进行内容类型判断，提升可读性和可维护性。

### 8.非转义序列的模板字符串

之前，`\u`开始一个 unicode 转义，`\x`开始一个十六进制转义，`\`后跟一个数字开始一个八进制转义。这使得创建特定的字符串变得不可能，例如Windows文件路径 `C:\uuu\xxx\111`。更多细节参考[模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)。
