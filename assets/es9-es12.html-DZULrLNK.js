import{_ as e,c as t,o as n,d as a}from"./app-CbULZrmi.js";const o={},r=a(`<h1 id="es9到es12" tabindex="-1"><a class="header-anchor" href="#es9到es12"><span>ES9到ES12</span></a></h1><ul><li>行分隔符（U + 2028）和段分隔符（U + 2029）符号现在允许在字符串文字中，与JSON匹配</li><li>更加友好的 JSON.stringify</li><li>新增了Array的<code>flat()</code>方法和<code>flatMap()</code>方法</li><li>新增了String的<code>trimStart()</code>方法和<code>trimEnd()</code>方法</li><li><code>Object.fromEntries()</code></li><li><code>Symbol.prototype.description</code></li><li><code>String.prototype.matchAll</code></li><li><code>Function.prototype.toString()</code>现在返回精确字符，包括空格和注释</li><li>简化<code>try {} catch {}</code>,修改 <code>catch</code> 绑定</li><li>新的基本数据类型<code>BigInt</code></li><li>globalThis</li><li>import()</li><li>Legacy RegEx</li><li>私有的实例方法和访问器</li></ul><h2 id="_1-行分隔符-u-2028-和段分隔符-u-2029-符号现在允许在字符串文字中-与json匹配" tabindex="-1"><a class="header-anchor" href="#_1-行分隔符-u-2028-和段分隔符-u-2029-符号现在允许在字符串文字中-与json匹配"><span>1.行分隔符（U + 2028）和段分隔符（U + 2029）符号现在允许在字符串文字中，与JSON匹配</span></a></h2><p>以前，这些符号在字符串文字中被视为行终止符，因此使用它们会导致SyntaxError异常。</p><h2 id="_2-更加友好的-json-stringify" tabindex="-1"><a class="header-anchor" href="#_2-更加友好的-json-stringify"><span>2.更加友好的 JSON.stringify</span></a></h2><p>如果输入 Unicode 格式但是超出范围的字符，在原先JSON.stringify返回格式错误的Unicode字符串。现在实现了一个改变JSON.stringify的<a href="https://github.com/tc39/proposal-well-formed-stringify" target="_blank" rel="noopener noreferrer">第3阶段提案</a>，因此它为其输出转义序列，使其成为有效Unicode（并以UTF-8表示）</p><h2 id="_3-新增了array的flat-方法和flatmap-方法" tabindex="-1"><a class="header-anchor" href="#_3-新增了array的flat-方法和flatmap-方法"><span>3.新增了Array的<code>flat()</code>方法和<code>flatMap()</code>方法</span></a></h2><p><code>flat()</code>和<code>flatMap()</code>本质上就是是归纳（reduce） 与 合并（concat）的操作。</p><h3 id="array-prototype-flat" tabindex="-1"><a class="header-anchor" href="#array-prototype-flat"><span>Array.prototype.flat()</span></a></h3><p><code>flat()</code> 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。</p><ul><li><code>flat()</code>方法最基本的作用就是数组降维</li></ul><pre><code class="language-js">let arr1 = [1, 2, [3, 4]];
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

</code></pre><ul><li>其次，还可以利用<code>flat()</code>方法的特性来去除数组的空项</li></ul><pre><code class="language-js">let arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]

</code></pre><h3 id="array-prototype-flatmap" tabindex="-1"><a class="header-anchor" href="#array-prototype-flatmap"><span>Array.prototype.flatMap()</span></a></h3><p><code>flatMap()</code> 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 和 深度值1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。 这里我们拿map方法与flatMap方法做一个比较。</p><pre><code class="language-js">let arr1 = [1, 2, 3, 4];

arr1.map(x =&gt; [x * 2]); 
// [[2], [4], [6], [8]]

arr1.flatMap(x =&gt; [x * 2]);
// [2, 4, 6, 8]

// 只会将 flatMap 中的函数返回的数组 “压平” 一层
arr1.flatMap(x =&gt; [[x * 2]]);
// [[2], [4], [6], [8]]

</code></pre><h2 id="_4-新增了string的trimstart-方法和trimend-方法" tabindex="-1"><a class="header-anchor" href="#_4-新增了string的trimstart-方法和trimend-方法"><span>4.新增了String的<code>trimStart()</code>方法和<code>trimEnd()</code>方法</span></a></h2><p>新增的这两个方法很好理解，分别去除字符串首尾空白字符，这里就不用例子说声明了。</p><h2 id="_5-object-fromentries" tabindex="-1"><a class="header-anchor" href="#_5-object-fromentries"><span>5.<code>Object.fromEntries()</code></span></a></h2><p><code>Object.entries()</code>方法的作用是返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）。</p><p><strong>而<code>Object.fromEntries()</code> 则是 <code>Object.entries()</code> 的反转。</strong></p><p><code>Object.fromEntries()</code> 函数传入一个键值对的列表，并返回一个带有这些键值对的新对象。这个迭代参数应该是一个能够实现@iterator方法的的对象，返回一个迭代器对象。它生成一个具有两个元素的类似数组的对象，第一个元素是将用作属性键的值，第二个元素是与该属性键关联的值。</p><ul><li>通过 Object.fromEntries， 可以将 Map 转化为 Object:</li></ul><pre><code class="language-js">const map = new Map([ [&#39;foo&#39;, &#39;bar&#39;], [&#39;baz&#39;, 42] ]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: &quot;bar&quot;, baz: 42 }

</code></pre><ul><li>通过 Object.fromEntries， 可以将 Array 转化为 Object:</li></ul><pre><code class="language-js">const arr = [ [&#39;0&#39;, &#39;a&#39;], [&#39;1&#39;, &#39;b&#39;], [&#39;2&#39;, &#39;c&#39;] ];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: &quot;a&quot;, 1: &quot;b&quot;, 2: &quot;c&quot; }

</code></pre><h2 id="_6-symbol-prototype-description" tabindex="-1"><a class="header-anchor" href="#_6-symbol-prototype-description"><span>6.<code>Symbol.prototype.description</code></span></a></h2><p>通过工厂函数Symbol（）创建符号时，您可以选择通过参数提供字符串作为描述：</p><pre><code class="language-js">const sym = Symbol(&#39;The description&#39;);

</code></pre><p>以前，访问描述的唯一方法是将符号转换为字符串：</p><pre><code class="language-js">assert.equal(String(sym), &#39;Symbol(The description)&#39;);

</code></pre><p>现在引入了getter Symbol.prototype.description以直接访问描述：</p><pre><code class="language-js">assert.equal(sym.description, &#39;The description&#39;);

</code></pre><h2 id="_7-string-prototype-matchall" tabindex="-1"><a class="header-anchor" href="#_7-string-prototype-matchall"><span>7.<code>String.prototype.matchAll</code></span></a></h2><p><code>matchAll()</code> 方法返回一个包含所有匹配正则表达式及分组捕获结果的迭代器。 在 matchAll 出现之前，通过在循环中调用regexp.exec来获取所有匹配项信息（regexp需使用/g标志：</p><pre><code class="language-js">const regexp = RegExp(&#39;foo*&#39;,&#39;g&#39;);
const str = &#39;table football, foosball&#39;;

while ((matches = regexp.exec(str)) !== null) {
  console.log(\`Found \${matches[0]}. Next starts at \${regexp.lastIndex}.\`);
  // expected output: &quot;Found foo. Next starts at 9.&quot;
  // expected output: &quot;Found foo. Next starts at 19.&quot;
}

</code></pre><p>如果使用matchAll ，就可以不必使用while循环加exec方式（且正则表达式需使用／g标志）。使用matchAll 会得到一个迭代器的返回值，配合 for...of, array spread, or Array.from() 可以更方便实现功能：</p><pre><code class="language-js">const regexp = RegExp(&#39;foo*&#39;,&#39;g&#39;); 
const str = &#39;table football, foosball&#39;;
let matches = str.matchAll(regexp);

for (const match of matches) {
  console.log(match);
}
// Array [ &quot;foo&quot; ]
// Array [ &quot;foo&quot; ]

// matches iterator is exhausted after the for..of iteration
// Call matchAll again to create a new iterator
matches = str.matchAll(regexp);

Array.from(matches, m =&gt; m[0]);
// Array [ &quot;foo&quot;, &quot;foo&quot; ]

</code></pre><h3 id="matchall可以更好的用于分组" tabindex="-1"><a class="header-anchor" href="#matchall可以更好的用于分组"><span>matchAll可以更好的用于分组</span></a></h3><pre><code class="language-js">let regexp = /t(e)(st(\\d?))/g;
let str = &#39;test1test2&#39;;

str.match(regexp); 
// Array [&#39;test1&#39;, &#39;test2&#39;]

let array = [...str.matchAll(regexp)];

array[0];
// [&#39;test1&#39;, &#39;e&#39;, &#39;st1&#39;, &#39;1&#39;, index: 0, input: &#39;test1test2&#39;, length: 4]
array[1];
// [&#39;test2&#39;, &#39;e&#39;, &#39;st2&#39;, &#39;2&#39;, index: 5, input: &#39;test1test2&#39;, length: 4]

</code></pre><h2 id="_8-function-prototype-tostring-现在返回精确字符-包括空格和注释" tabindex="-1"><a class="header-anchor" href="#_8-function-prototype-tostring-现在返回精确字符-包括空格和注释"><span>8.<code>Function.prototype.toString()</code>现在返回精确字符，包括空格和注释</span></a></h2><pre><code class="language-js">function /* comment */ foo /* another comment */() {}

// 之前不会打印注释部分
console.log(foo.toString()); // function foo(){}

// ES2019 会把注释一同打印
console.log(foo.toString()); // function /* comment */ foo /* another comment */ (){}

// 箭头函数
const bar /* comment */ = /* another comment */ () =&gt; {};

console.log(bar.toString()); // () =&gt; {}

</code></pre><h2 id="_9-修改-catch-绑定" tabindex="-1"><a class="header-anchor" href="#_9-修改-catch-绑定"><span>9.修改 <code>catch</code> 绑定</span></a></h2><p>在 ES10 之前，我们必须通过语法为 catch 子句绑定异常变量，无论是否有必要。很多时候 catch 块是多余的。 ES10 提案使我们能够简单的把变量省略掉。</p><p>不算大的改动。</p><p>之前是</p><pre><code class="language-js">try {} catch(e) {}

</code></pre><p>现在是</p><pre><code class="language-js">try {} catch {}

</code></pre><h2 id="_10-新的基本数据类型bigint" tabindex="-1"><a class="header-anchor" href="#_10-新的基本数据类型bigint"><span>10.新的基本数据类型<code>BigInt</code></span></a></h2><p>现在的基本数据类型（值类型）不止5种（ES6之后是六种）了哦！加上BigInt一共有七种基本数据类型，分别是： String、Number、Boolean、Null、Undefined、Symbol、BigInt</p><h2 id="es11-es2020" tabindex="-1"><a class="header-anchor" href="#es11-es2020"><span>ES11( ES2020)</span></a></h2><h2 id="optional-chaining-可选链式调用" tabindex="-1"><a class="header-anchor" href="#optional-chaining-可选链式调用"><span>Optional Chaining 可选链式调用</span></a></h2><p>大部分开发者都遇到过这个问题：</p><pre><code class="language-text">TypeError: Cannot read property ‘x’ of undefined
</code></pre><p>这个错误表示我们正在访问一个不属于对象的属性。</p><h3 id="访问对象的属性" tabindex="-1"><a class="header-anchor" href="#访问对象的属性"><span>访问对象的属性</span></a></h3><pre><code class="language-javascript">const flower = {
    colors: {
        red: true
    }
}

console.log(flower.colors.red) // 正常运行

console.log(flower.species.lily) // 抛出错误：TypeError: Cannot read property &#39;lily&#39; of undefined
</code></pre><p>在这种情况下，JavaScript 引擎会像这样抛出错误。但是某些情况下值是否存在并不重要，因为我们知道它会存在。于是，可选链式调用就派上用场了！</p><p>我们可以使用由一个问号和一个点组成的可选链式操作符，去表示不应该引发错误。如果没有值，应该返回 <strong>undefined</strong>。</p><pre><code class="language-js">console.log(flower.species?.lily) // 输出 undefined
</code></pre><p>当访问数组或调用函数时，也可以使用可选链式调用。</p><h3 id="访问数组" tabindex="-1"><a class="header-anchor" href="#访问数组"><span>访问数组</span></a></h3><pre><code class="language-js">let flowers =  [&#39;lily&#39;, &#39;daisy&#39;, &#39;rose&#39;]

console.log(flowers[1]) // 输出：daisy

flowers = null

console.log(flowers[1]) // 抛出错误：TypeError: Cannot read property &#39;1&#39; of null
console.log(flowers?.[1]) // 输出：undefined
</code></pre><h3 id="调用函数" tabindex="-1"><a class="header-anchor" href="#调用函数"><span>调用函数</span></a></h3><pre><code class="language-javascript">let plantFlowers = () =&gt; {
  return &#39;orchids&#39;
}

console.log(plantFlowers()) // 输出：orchids

plantFlowers = null

console.log(plantFlowers()) // 抛出错误：TypeError: plantFlowers is not a function

console.log(plantFlowers?.()) // 输出：undefined
</code></pre><h2 id="nullish-coalescing-空值合并" tabindex="-1"><a class="header-anchor" href="#nullish-coalescing-空值合并"><span>Nullish Coalescing 空值合并</span></a></h2><p>目前，要为变量提供回退值，逻辑操作符 <strong><code>||</code></strong> 还是必须的。它适用于很多情况，但不能应用在一些特殊的场景。例如，初始值是布尔值或数字的情况。举例说明，我们要把数字赋值给一个变量，当变量的初始值不是数字时，就默认其为 7 ：</p><pre><code class="language-js">let number = 1
let myNumber = number || 7
</code></pre><p>变量 <strong>myNumber</strong> 等于 1，因为左边的（<strong>number</strong>）是一个 <a href="https://developer.mozilla.org/en-US/docs/Glossary/Truthy" target="_blank" rel="noopener noreferrer"><strong>真</strong></a> 值 1。但是，当变量 <strong>number</strong> 不是 1 而是 0 呢？</p><pre><code class="language-js">let number = 0
let myNumber = number || 7
</code></pre><p>0 是 <a href="https://developer.mozilla.org/en-US/docs/Glossary/Falsy" target="_blank" rel="noopener noreferrer"><strong>假</strong></a> 值，所以即使 0 是数字。变量 <strong>myNumber</strong> 将会被赋值为右边的 7。但结果并不是我们想要的。幸好，由两个问号组成：<strong><code>??</code></strong> 的合并操作符就可以检查变量 <strong>number</strong> 是否是一个数字，而不用写额外的代码了。</p><pre><code class="language-js">let number = 0
let myNumber = number ?? 7
</code></pre><p>操作符右边的值仅在左边的值等于 <strong>null</strong> 或 <strong>undefined</strong> 时有效，因此，例子中的变量 <strong>myNumber</strong> 现在的值等于 0 了。</p><h2 id="private-fields-私有字段" tabindex="-1"><a class="header-anchor" href="#private-fields-私有字段"><span>Private Fields 私有字段</span></a></h2><p>许多具有 <strong>classes</strong> 的编程语言允许定义类作为公共的，受保护的或私有的属性。<strong>Public</strong> 属性可以从类的外部或者子类访问，<strong>protected</strong> 属性只能被子类访问，<strong>private</strong> 属性只能被类内部访问。JavaScript 从 <strong>ES6</strong> 开始支持类语法，但直到现在才引入了私有字段。要定义私有属性，必须在其前面加上散列符号：<strong><code>#</code></strong>。</p><pre><code class="language-js">class Flower {
  #leaf_color = &quot;green&quot;;
  constructor(name) {
    this.name = name;
  }

  get_color() {
    return this.#leaf_color;
  }
}

const orchid = new Flower(&quot;orchid&quot;);

console.log(orchid.get_color()); // 输出：green
console.log(orchid.#leaf_color) // 报错：SyntaxError: Private field &#39;#leaf_color&#39; must be declared in an enclosing class
</code></pre><p>如果我们从外部访问类的私有属性，势必会报错。</p><h2 id="static-fields-静态字段" tabindex="-1"><a class="header-anchor" href="#static-fields-静态字段"><span>Static Fields 静态字段</span></a></h2><p>如果想使用类的方法，首先必须实例化一个类，如下所示：</p><pre><code class="language-js">class Flower {
  add_leaves() {
    console.log(&quot;Adding leaves&quot;);
  }
}

const rose = new Flower();
rose.add_leaves();

Flower.add_leaves() // 抛出错误：TypeError: Flower.add_leaves is not a function
</code></pre><p>试图去访问没有实例化的 <strong>Flower</strong> 类的方法将会抛出一个错误。但由于 <strong>static</strong> 字段，类方法可以被 <strong>static</strong> 关键词声明然后从外部调用。</p><pre><code class="language-js">class Flower {
  constructor(type) {
    this.type = type;
  }
  static create_flower(type) {
    return new Flower(type);
  }
}

const rose = Flower.create_flower(&quot;rose&quot;); // 正常运行
</code></pre><h2 id="top-level-await-顶级-await" tabindex="-1"><a class="header-anchor" href="#top-level-await-顶级-await"><span>Top Level Await 顶级 Await</span></a></h2><p>目前，如果用 <strong>await</strong> 获取 promise 函数的结果，那使用 <strong>await</strong> 的函数必须用 <strong>async</strong> 关键字定义。</p><pre><code class="language-js">const func = async () =&gt; {
    const response = await fetch(url)
}
</code></pre><p>头疼的是，在全局作用域中去等待某些结果基本上是不可能的。除非使用 <strong>立即调用的函数表达式（IIFE）</strong>。</p><pre><code class="language-js">(async () =&gt; {
    const response = await fetch(url)
})()
</code></pre><p>但引入了 <strong>顶级 Await</strong> 后，不需要再把代码包裹在一个 async 函数中了，如下即可：</p><pre><code class="language-js">const response = await fetch(url)
</code></pre><p>这个特性对于解决模块依赖或当初始源无法使用而需要备用源的时候是非常有用的。</p><pre><code class="language-js">let Vue
try {
    Vue = await import(&#39;url_1_to_vue&#39;)
} catch {
    Vue = await import(&#39;url_2_to_vue)
}
</code></pre><h2 id="promise-allsettled-方法" tabindex="-1"><a class="header-anchor" href="#promise-allsettled-方法"><span>Promise.allSettled 方法</span></a></h2><p>等待多个 promise 返回结果时，我们可以用 <strong>Promise.all([promise_1, promise_2])</strong>。但问题是，如果其中一个请求失败了，就会抛出错误。然而，有时候我们希望某个请求失败后，其他请求的结果能够正常返回。针对这种情况 <strong>ES11</strong> 引入了 <strong>Promise.allSettled</strong> 。</p><pre><code class="language-js">promise_1 = Promise.resolve(&#39;hello&#39;)
promise_2 = new Promise((resolve, reject) =&gt; setTimeout(reject, 200, &#39;problem&#39;))

Promise.allSettled([promise_1, promise_2])
    .then(([promise_1_result, promise_2_result]) =&gt; {
        console.log(promise_1_result) // 输出：{status: &#39;fulfilled&#39;, value: &#39;hello&#39;}
        console.log(promise_2_result) // 输出：{status: &#39;rejected&#39;, reason: &#39;problem&#39;}
    })
</code></pre><p>成功的 promise 将返回一个包含 <strong>status</strong> 和 <strong>value</strong> 的对象，失败的 promise 将返回一个包含 <strong>status</strong> 和 <strong>reason</strong> 的对象。</p><h2 id="dynamic-import-动态引入" tabindex="-1"><a class="header-anchor" href="#dynamic-import-动态引入"><span>Dynamic Import 动态引入</span></a></h2><p>你也许在 <strong>webpack</strong> 的模块绑定中已经使用过动态引入。但对于该特性的原生支持已经到来：</p><pre><code class="language-js">// Alert.js
export default {
    show() {
        // 代码
    }
}


// 使用 Alert.js 的文件
import(&#39;/components/Alert.js&#39;)
    .then(Alert =&gt; {
        Alert.show()
    })
</code></pre><p>考虑到许多应用程序使用诸如 webpack 之类的模块打包器来进行代码的转译和优化，这个特性现在还没什么大作用。</p><h2 id="matchall-匹配所有项" tabindex="-1"><a class="header-anchor" href="#matchall-匹配所有项"><span>MatchAll 匹配所有项</span></a></h2><p>如果你想要查找字符串中所有正则表达式的匹配项和它们的位置，MatchAll 非常有用。</p><pre><code class="language-js">const regex = /\\b(apple)+\\b/;
const fruits = &quot;pear, apple, banana, apple, orange, apple&quot;;


for (const match of fruits.match(regex)) {
  console.log(match); 
}
// 输出 
// 
// &#39;apple&#39; 
// &#39;apple&#39;
</code></pre><p>相比之下，<strong>matchAll</strong> 返回更多的信息，包括找到匹配项的索引。</p><pre><code class="language-js">for (const match of fruits.matchAll(regex)) {
  console.log(match);
}

// 输出
// 
// [
//   &#39;apple&#39;,
//   &#39;apple&#39;,
//   index: 6,
//   input: &#39;pear, apple, banana, apple, orange, apple&#39;,
//   groups: undefined
// ],
// [
//   &#39;apple&#39;,
//   &#39;apple&#39;,
//   index: 21,
//   input: &#39;pear, apple, banana, apple, orange, apple&#39;,
//   groups: undefined
// ],
// [
//   &#39;apple&#39;,
//   &#39;apple&#39;,
//   index: 36,
//   input: &#39;pear, apple, banana, apple, orange, apple&#39;,
//   groups: undefined
// ]
</code></pre><h2 id="globalthis-全局对象" tabindex="-1"><a class="header-anchor" href="#globalthis-全局对象"><span>globalThis 全局对象</span></a></h2><p>JavaScript 可以在不同环境中运行，比如浏览器或者 Node.js。浏览器中可用的全局对象是变量 <strong>window</strong>，但在 Node.js 中是一个叫做 <strong>global</strong> 的对象。为了在不同环境中都使用统一的全局对象，引入了 <strong>globalThis</strong> 。</p><pre><code class="language-js">// 浏览器
window == globalThis // true

// node.js
global == globalThis // true
</code></pre><h2 id="bigint" tabindex="-1"><a class="header-anchor" href="#bigint"><span>BigInt</span></a></h2><p>JavaScript 中能够精确表达的最大数字是 2^53 - 1。而 BigInt 可以用来创建更大的数字。</p><pre><code class="language-js">const theBiggerNumber = 9007199254740991n
const evenBiggerNumber = BigInt(9007199254740991)
</code></pre>`,112),l=[r];function s(i,c){return n(),t("div",null,l)}const d=e(o,[["render",s],["__file","es9-es12.html.vue"]]),g=JSON.parse('{"path":"/frontend/basic-js/es/es9-es12.html","title":"ES9到ES12","lang":"zh-CN","frontmatter":{"description":"ES9到ES12 行分隔符（U + 2028）和段分隔符（U + 2029）符号现在允许在字符串文字中，与JSON匹配 更加友好的 JSON.stringify 新增了Array的flat()方法和flatMap()方法 新增了String的trimStart()方法和trimEnd()方法 Object.fromEntries() Symbol.pr...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-js/es/es9-es12.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"ES9到ES12"}],["meta",{"property":"og:description","content":"ES9到ES12 行分隔符（U + 2028）和段分隔符（U + 2029）符号现在允许在字符串文字中，与JSON匹配 更加友好的 JSON.stringify 新增了Array的flat()方法和flatMap()方法 新增了String的trimStart()方法和trimEnd()方法 Object.fromEntries() Symbol.pr..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-25T14:57:57.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-25T14:57:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ES9到ES12\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-25T14:57:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"1.行分隔符（U + 2028）和段分隔符（U + 2029）符号现在允许在字符串文字中，与JSON匹配","slug":"_1-行分隔符-u-2028-和段分隔符-u-2029-符号现在允许在字符串文字中-与json匹配","link":"#_1-行分隔符-u-2028-和段分隔符-u-2029-符号现在允许在字符串文字中-与json匹配","children":[]},{"level":2,"title":"2.更加友好的 JSON.stringify","slug":"_2-更加友好的-json-stringify","link":"#_2-更加友好的-json-stringify","children":[]},{"level":2,"title":"3.新增了Array的flat()方法和flatMap()方法","slug":"_3-新增了array的flat-方法和flatmap-方法","link":"#_3-新增了array的flat-方法和flatmap-方法","children":[{"level":3,"title":"Array.prototype.flat()","slug":"array-prototype-flat","link":"#array-prototype-flat","children":[]},{"level":3,"title":"Array.prototype.flatMap()","slug":"array-prototype-flatmap","link":"#array-prototype-flatmap","children":[]}]},{"level":2,"title":"4.新增了String的trimStart()方法和trimEnd()方法","slug":"_4-新增了string的trimstart-方法和trimend-方法","link":"#_4-新增了string的trimstart-方法和trimend-方法","children":[]},{"level":2,"title":"5.Object.fromEntries()","slug":"_5-object-fromentries","link":"#_5-object-fromentries","children":[]},{"level":2,"title":"6.Symbol.prototype.description","slug":"_6-symbol-prototype-description","link":"#_6-symbol-prototype-description","children":[]},{"level":2,"title":"7.String.prototype.matchAll","slug":"_7-string-prototype-matchall","link":"#_7-string-prototype-matchall","children":[{"level":3,"title":"matchAll可以更好的用于分组","slug":"matchall可以更好的用于分组","link":"#matchall可以更好的用于分组","children":[]}]},{"level":2,"title":"8.Function.prototype.toString()现在返回精确字符，包括空格和注释","slug":"_8-function-prototype-tostring-现在返回精确字符-包括空格和注释","link":"#_8-function-prototype-tostring-现在返回精确字符-包括空格和注释","children":[]},{"level":2,"title":"9.修改 catch 绑定","slug":"_9-修改-catch-绑定","link":"#_9-修改-catch-绑定","children":[]},{"level":2,"title":"10.新的基本数据类型BigInt","slug":"_10-新的基本数据类型bigint","link":"#_10-新的基本数据类型bigint","children":[]},{"level":2,"title":"ES11( ES2020)","slug":"es11-es2020","link":"#es11-es2020","children":[]},{"level":2,"title":"Optional Chaining 可选链式调用","slug":"optional-chaining-可选链式调用","link":"#optional-chaining-可选链式调用","children":[{"level":3,"title":"访问对象的属性","slug":"访问对象的属性","link":"#访问对象的属性","children":[]},{"level":3,"title":"访问数组","slug":"访问数组","link":"#访问数组","children":[]},{"level":3,"title":"调用函数","slug":"调用函数","link":"#调用函数","children":[]}]},{"level":2,"title":"Nullish Coalescing 空值合并","slug":"nullish-coalescing-空值合并","link":"#nullish-coalescing-空值合并","children":[]},{"level":2,"title":"Private Fields 私有字段","slug":"private-fields-私有字段","link":"#private-fields-私有字段","children":[]},{"level":2,"title":"Static Fields 静态字段","slug":"static-fields-静态字段","link":"#static-fields-静态字段","children":[]},{"level":2,"title":"Top Level Await 顶级 Await","slug":"top-level-await-顶级-await","link":"#top-level-await-顶级-await","children":[]},{"level":2,"title":"Promise.allSettled 方法","slug":"promise-allsettled-方法","link":"#promise-allsettled-方法","children":[]},{"level":2,"title":"Dynamic Import 动态引入","slug":"dynamic-import-动态引入","link":"#dynamic-import-动态引入","children":[]},{"level":2,"title":"MatchAll 匹配所有项","slug":"matchall-匹配所有项","link":"#matchall-匹配所有项","children":[]},{"level":2,"title":"globalThis 全局对象","slug":"globalthis-全局对象","link":"#globalthis-全局对象","children":[]},{"level":2,"title":"BigInt","slug":"bigint","link":"#bigint","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1658761077000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":10.31,"words":3093},"filePathRelative":"frontend/basic-js/es/es9-es12.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,g as data};
