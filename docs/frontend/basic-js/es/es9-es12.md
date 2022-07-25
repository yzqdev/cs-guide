# ES9到ES12

- 行分隔符（U + 2028）和段分隔符（U + 2029）符号现在允许在字符串文字中，与JSON匹配
- 更加友好的 JSON.stringify
- 新增了Array的`flat()`方法和`flatMap()`方法
- 新增了String的`trimStart()`方法和`trimEnd()`方法
- `Object.fromEntries()`
- `Symbol.prototype.description`
- `String.prototype.matchAll`
- `Function.prototype.toString()`现在返回精确字符，包括空格和注释
- 简化`try {} catch {}`,修改 `catch` 绑定
- 新的基本数据类型`BigInt`
- globalThis
- import()
- Legacy RegEx
- 私有的实例方法和访问器

## 1.行分隔符（U + 2028）和段分隔符（U + 2029）符号现在允许在字符串文字中，与JSON匹配

以前，这些符号在字符串文字中被视为行终止符，因此使用它们会导致SyntaxError异常。

## 2.更加友好的 JSON.stringify

如果输入 Unicode 格式但是超出范围的字符，在原先JSON.stringify返回格式错误的Unicode字符串。现在实现了一个改变JSON.stringify的[第3阶段提案](https://github.com/tc39/proposal-well-formed-stringify)，因此它为其输出转义序列，使其成为有效Unicode（并以UTF-8表示）

## 3.新增了Array的`flat()`方法和`flatMap()`方法

`flat()`和`flatMap()`本质上就是是归纳（reduce） 与 合并（concat）的操作。

### Array.prototype.flat()

`flat()` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

- `flat()`方法最基本的作用就是数组降维

```js
let arr1 = [1, 2, [3, 4]];
arr1.flat(); 
// [1, 2, 3, 4]

let arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

let arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//使用 Infinity 作为深度，展开任意深度的嵌套数组
arr3.flat(Infinity); 
// [1, 2, 3, 4, 5, 6]

```

- 其次，还可以利用`flat()`方法的特性来去除数组的空项

```js
let arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]

```

### Array.prototype.flatMap()

`flatMap()` 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 和 深度值1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。 这里我们拿map方法与flatMap方法做一个比较。

```js
let arr1 = [1, 2, 3, 4];

arr1.map(x => [x * 2]); 
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]);
// [2, 4, 6, 8]

// 只会将 flatMap 中的函数返回的数组 “压平” 一层
arr1.flatMap(x => [[x * 2]]);
// [[2], [4], [6], [8]]

```

## 4.新增了String的`trimStart()`方法和`trimEnd()`方法

新增的这两个方法很好理解，分别去除字符串首尾空白字符，这里就不用例子说声明了。

## 5.`Object.fromEntries()`

`Object.entries()`方法的作用是返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）。

**而`Object.fromEntries()` 则是 `Object.entries()` 的反转。**

`Object.fromEntries()` 函数传入一个键值对的列表，并返回一个带有这些键值对的新对象。这个迭代参数应该是一个能够实现@iterator方法的的对象，返回一个迭代器对象。它生成一个具有两个元素的类似数组的对象，第一个元素是将用作属性键的值，第二个元素是与该属性键关联的值。

- 通过 Object.fromEntries， 可以将 Map 转化为 Object:

```js
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }

```

- 通过 Object.fromEntries， 可以将 Array 转化为 Object:

```js
const arr = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }

```

## 6.`Symbol.prototype.description`

通过工厂函数Symbol（）创建符号时，您可以选择通过参数提供字符串作为描述：

```js
const sym = Symbol('The description');

```

以前，访问描述的唯一方法是将符号转换为字符串：

```js
assert.equal(String(sym), 'Symbol(The description)');

```

现在引入了getter Symbol.prototype.description以直接访问描述：

```js
assert.equal(sym.description, 'The description');

```

## 7.`String.prototype.matchAll`

`matchAll()` 方法返回一个包含所有匹配正则表达式及分组捕获结果的迭代器。 在 matchAll 出现之前，通过在循环中调用regexp.exec来获取所有匹配项信息（regexp需使用/g标志：

```js
const regexp = RegExp('foo*','g');
const str = 'table football, foosball';

while ((matches = regexp.exec(str)) !== null) {
  console.log(`Found ${matches[0]}. Next starts at ${regexp.lastIndex}.`);
  // expected output: "Found foo. Next starts at 9."
  // expected output: "Found foo. Next starts at 19."
}

```

如果使用matchAll ，就可以不必使用while循环加exec方式（且正则表达式需使用／g标志）。使用matchAll 会得到一个迭代器的返回值，配合 for...of, array spread, or Array.from() 可以更方便实现功能：

```js
const regexp = RegExp('foo*','g'); 
const str = 'table football, foosball';
let matches = str.matchAll(regexp);

for (const match of matches) {
  console.log(match);
}
// Array [ "foo" ]
// Array [ "foo" ]

// matches iterator is exhausted after the for..of iteration
// Call matchAll again to create a new iterator
matches = str.matchAll(regexp);

Array.from(matches, m => m[0]);
// Array [ "foo", "foo" ]

```

### matchAll可以更好的用于分组

```js
let regexp = /t(e)(st(\d?))/g;
let str = 'test1test2';

str.match(regexp); 
// Array ['test1', 'test2']

let array = [...str.matchAll(regexp)];

array[0];
// ['test1', 'e', 'st1', '1', index: 0, input: 'test1test2', length: 4]
array[1];
// ['test2', 'e', 'st2', '2', index: 5, input: 'test1test2', length: 4]

```

## 8.`Function.prototype.toString()`现在返回精确字符，包括空格和注释

```js
function /* comment */ foo /* another comment */() {}

// 之前不会打印注释部分
console.log(foo.toString()); // function foo(){}

// ES2019 会把注释一同打印
console.log(foo.toString()); // function /* comment */ foo /* another comment */ (){}

// 箭头函数
const bar /* comment */ = /* another comment */ () => {};

console.log(bar.toString()); // () => {}

```

## 9.修改 `catch` 绑定

在 ES10 之前，我们必须通过语法为 catch 子句绑定异常变量，无论是否有必要。很多时候 catch 块是多余的。 ES10 提案使我们能够简单的把变量省略掉。

不算大的改动。

之前是

```js
try {} catch(e) {}

```

现在是

```js
try {} catch {}

```

## 10.新的基本数据类型`BigInt`

现在的基本数据类型（值类型）不止5种（ES6之后是六种）了哦！加上BigInt一共有七种基本数据类型，分别是： String、Number、Boolean、Null、Undefined、Symbol、BigInt

## ES11( ES2020)

## Optional Chaining 可选链式调用

大部分开发者都遇到过这个问题：

```text
TypeError: Cannot read property ‘x’ of undefined
```

这个错误表示我们正在访问一个不属于对象的属性。

### 访问对象的属性

```javascript
const flower = {
    colors: {
        red: true
    }
}

console.log(flower.colors.red) // 正常运行

console.log(flower.species.lily) // 抛出错误：TypeError: Cannot read property 'lily' of undefined
```

在这种情况下，JavaScript 引擎会像这样抛出错误。但是某些情况下值是否存在并不重要，因为我们知道它会存在。于是，可选链式调用就派上用场了！

我们可以使用由一个问号和一个点组成的可选链式操作符，去表示不应该引发错误。如果没有值，应该返回 **undefined**。

```js
console.log(flower.species?.lily) // 输出 undefined
```

当访问数组或调用函数时，也可以使用可选链式调用。

### 访问数组

```js
let flowers =  ['lily', 'daisy', 'rose']

console.log(flowers[1]) // 输出：daisy

flowers = null

console.log(flowers[1]) // 抛出错误：TypeError: Cannot read property '1' of null
console.log(flowers?.[1]) // 输出：undefined
```

### 调用函数

```javascript
let plantFlowers = () => {
  return 'orchids'
}

console.log(plantFlowers()) // 输出：orchids

plantFlowers = null

console.log(plantFlowers()) // 抛出错误：TypeError: plantFlowers is not a function

console.log(plantFlowers?.()) // 输出：undefined
```

## Nullish Coalescing 空值合并

目前，要为变量提供回退值，逻辑操作符 **`||`** 还是必须的。它适用于很多情况，但不能应用在一些特殊的场景。例如，初始值是布尔值或数字的情况。举例说明，我们要把数字赋值给一个变量，当变量的初始值不是数字时，就默认其为 7 ：

```js
let number = 1
let myNumber = number || 7
```

变量 **myNumber** 等于 1，因为左边的（**number**）是一个 [**真**](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) 值 1。但是，当变量 **number** 不是 1 而是 0 呢？

```js
let number = 0
let myNumber = number || 7
```

0 是 [**假**](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) 值，所以即使 0 是数字。变量 **myNumber** 将会被赋值为右边的 7。但结果并不是我们想要的。幸好，由两个问号组成：**`??`** 的合并操作符就可以检查变量 **number** 是否是一个数字，而不用写额外的代码了。

```js
let number = 0
let myNumber = number ?? 7
```

操作符右边的值仅在左边的值等于 **null** 或 **undefined** 时有效，因此，例子中的变量 **myNumber** 现在的值等于 0 了。

## Private Fields 私有字段

许多具有 **classes** 的编程语言允许定义类作为公共的，受保护的或私有的属性。**Public** 属性可以从类的外部或者子类访问，**protected** 属性只能被子类访问，**private** 属性只能被类内部访问。JavaScript 从 **ES6** 开始支持类语法，但直到现在才引入了私有字段。要定义私有属性，必须在其前面加上散列符号：**`#`**。

```js
class Flower {
  #leaf_color = "green";
  constructor(name) {
    this.name = name;
  }

  get_color() {
    return this.#leaf_color;
  }
}

const orchid = new Flower("orchid");

console.log(orchid.get_color()); // 输出：green
console.log(orchid.#leaf_color) // 报错：SyntaxError: Private field '#leaf_color' must be declared in an enclosing class
```

如果我们从外部访问类的私有属性，势必会报错。

## Static Fields 静态字段

如果想使用类的方法，首先必须实例化一个类，如下所示：

```js
class Flower {
  add_leaves() {
    console.log("Adding leaves");
  }
}

const rose = new Flower();
rose.add_leaves();

Flower.add_leaves() // 抛出错误：TypeError: Flower.add_leaves is not a function
```

试图去访问没有实例化的 **Flower** 类的方法将会抛出一个错误。但由于 **static** 字段，类方法可以被 **static** 关键词声明然后从外部调用。

```js
class Flower {
  constructor(type) {
    this.type = type;
  }
  static create_flower(type) {
    return new Flower(type);
  }
}

const rose = Flower.create_flower("rose"); // 正常运行
```

## Top Level Await 顶级 Await

目前，如果用 **await** 获取 promise 函数的结果，那使用 **await** 的函数必须用 **async** 关键字定义。

```js
const func = async () => {
    const response = await fetch(url)
}
```

头疼的是，在全局作用域中去等待某些结果基本上是不可能的。除非使用 **立即调用的函数表达式（IIFE）**。

```js
(async () => {
    const response = await fetch(url)
})()
```

但引入了 **顶级 Await** 后，不需要再把代码包裹在一个 async 函数中了，如下即可：

```js
const response = await fetch(url)
```

这个特性对于解决模块依赖或当初始源无法使用而需要备用源的时候是非常有用的。

```js
let Vue
try {
    Vue = await import('url_1_to_vue')
} catch {
    Vue = await import('url_2_to_vue)
}
```

## Promise.allSettled 方法

等待多个 promise 返回结果时，我们可以用 **Promise.all([promise_1, promise_2])**。但问题是，如果其中一个请求失败了，就会抛出错误。然而，有时候我们希望某个请求失败后，其他请求的结果能够正常返回。针对这种情况 **ES11** 引入了 **Promise.allSettled** 。

```js
promise_1 = Promise.resolve('hello')
promise_2 = new Promise((resolve, reject) => setTimeout(reject, 200, 'problem'))

Promise.allSettled([promise_1, promise_2])
    .then(([promise_1_result, promise_2_result]) => {
        console.log(promise_1_result) // 输出：{status: 'fulfilled', value: 'hello'}
        console.log(promise_2_result) // 输出：{status: 'rejected', reason: 'problem'}
    })
```

成功的 promise 将返回一个包含 **status** 和 **value** 的对象，失败的 promise 将返回一个包含 **status** 和 **reason** 的对象。

## Dynamic Import 动态引入

你也许在 **webpack** 的模块绑定中已经使用过动态引入。但对于该特性的原生支持已经到来：

```js
// Alert.js
export default {
    show() {
        // 代码
    }
}


// 使用 Alert.js 的文件
import('/components/Alert.js')
    .then(Alert => {
        Alert.show()
    })
```

考虑到许多应用程序使用诸如 webpack 之类的模块打包器来进行代码的转译和优化，这个特性现在还没什么大作用。

## MatchAll 匹配所有项

如果你想要查找字符串中所有正则表达式的匹配项和它们的位置，MatchAll 非常有用。

```js
const regex = /\b(apple)+\b/;
const fruits = "pear, apple, banana, apple, orange, apple";


for (const match of fruits.match(regex)) {
  console.log(match); 
}
// 输出 
// 
// 'apple' 
// 'apple'
```

相比之下，**matchAll** 返回更多的信息，包括找到匹配项的索引。

```js
for (const match of fruits.matchAll(regex)) {
  console.log(match);
}

// 输出
// 
// [
//   'apple',
//   'apple',
//   index: 6,
//   input: 'pear, apple, banana, apple, orange, apple',
//   groups: undefined
// ],
// [
//   'apple',
//   'apple',
//   index: 21,
//   input: 'pear, apple, banana, apple, orange, apple',
//   groups: undefined
// ],
// [
//   'apple',
//   'apple',
//   index: 36,
//   input: 'pear, apple, banana, apple, orange, apple',
//   groups: undefined
// ]
```

## globalThis 全局对象

JavaScript 可以在不同环境中运行，比如浏览器或者 Node.js。浏览器中可用的全局对象是变量 **window**，但在 Node.js 中是一个叫做 **global** 的对象。为了在不同环境中都使用统一的全局对象，引入了 **globalThis** 。

```js
// 浏览器
window == globalThis // true

// node.js
global == globalThis // true
```

## BigInt

JavaScript 中能够精确表达的最大数字是 2^53 - 1。而 BigInt 可以用来创建更大的数字。

```js
const theBiggerNumber = 9007199254740991n
const evenBiggerNumber = BigInt(9007199254740991)
```
