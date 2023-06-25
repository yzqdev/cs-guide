---
order: 15
---
# 15.js 中的那些最佳实践

**这个章节需要大家帮忙补充，一次性想不完那么多**

----

### JavaScript 语言精粹

<http://book.douban.com/subject/3590768/>

![](https://github.com/alsotang/node-lessons/blob/master/lesson14/1.png)

这本书很薄，只有 155 页，但该讲的几乎都讲了。大家想办法搞来看看吧（我总不能很没节操地给个电子版 PDF 链接在这里吧）。

js 这门语言，水很浅。没有太复杂的地方可以钻，但特么的坑又多。

上面的那本书是一定要看的。这本书专注在讲 js 语法，其他 js 的书都过多地涉及了浏览器知识。

### 继承

js 前端不懂有什么好办法，后端的话，很方便。

用 node 官方的 `util` 库，下面是直接从官网摘抄来的：

```js
import util from 'util'
import 'events from 'events'

function MyStream() {
    events.EventEmitter.call(this);
}

util.inherits(MyStream, events.EventEmitter);

MyStream.prototype.write = function(data) {
    this.emit("data", data);
}

let stream = new MyStream();

console.log(stream instanceof events.EventEmitter); // true
console.log(MyStream.super_ === events.EventEmitter); // true

stream.on("data", function(data) {
    console.log('Received data: "' + data + '"');
})
stream.write("It works!"); // Received data: "It works!"
```

js 是面向对象的，但是是“基于原型的面向对象”，没有类。没有多重继承，没有接口。没有结构体，没有枚举类型。

但它的字面量哈希和 function 都足够灵活，拼拼凑凑，上面那些东西都能“模拟”着用。

说到没有类的这个问题，很多人总是要纠正其他人关于 js 原型的理解的。我觉得这是没有必要的。基于原型又不是很牛逼，ES6不是照样给出了 class 关键字吗。不管类还是原型都是为了抽象，烂的东西始终烂，不好理解的始终不好理解。

最近学习 ios 的 swift，看见里面有不少相比 objc 舒服的改进。比如 objc 的“方法调用”，学的是 smalltalk 那一套，那不叫方法调用，而是消息传递。结果 swift 里面不照样是方法调用的形式？

### callback hell

用 eventproxy 和 async 已经能解决大部分问题。剩下的小部分问题，肯定是设计错误。：）

参见：

* 《使用 eventproxy 控制并发》：<https://github.com/alsotang/node-lessons/tree/master/lesson4>
* 《使用 async 控制并发》：<https://github.com/alsotang/node-lessons/tree/master/lesson5>

### 数据类型

写 js 很少去定义类。Object 的便利在多数其他语言需要定义类的场景下都能直接用。

js 中，用好 Number，String，Array，Object 和 Function 就够了。有时用用 RegExp。

用于 js 这门语言本身的残废，大多数时候都采用“约定胜于配置”的思想来交互合作。

### 控制流

很常规，C 语言那套。

### 基本运算符

C 语言那套。二进制操作并不会降低效率，V8 很聪明的。

### 计算型属性

也就是帮一个对象的属性定义 get 和 set 方法，通过 `obj.value` 和 `obj.value=` 的形式来调用。

koa(<http://koajs.com/> ) 把这套玩得炉火纯青。

### 运算符重载

无

### 类型转换

手动帮你需要转换的类型的类定义 `.toxxx` 方法，比如 `.toString`，`.toJSON`，`toNumber`。

js 的隐式类型转换用一次坑一次。

### 相等比较

在 js 中，务必使用 `===` 三个等于号来比较对象，或者自定义方法来比较，不要使用 `==`。

我最近做一个项目，从数据库中取出的数据，虽然应该是字符型的，但有时它们是 String 的表示，有时是 Number 的表示。为了省事，会有人直接用 `==` 来对它们进行比较。这种时候，建议在比较时，把它们都转成 String 类型，然后用 `===` 来比较。

比如 `let x = 31243; let y = '31243'`，比较时，这么做：`String(x) === String(y)`

### 嵌套类型

随便弄。

function 构造函数、闭包、字面量哈希，都可以混在一起写，多少层都行，无限制。

### 拓展

当无法接触一个类的源码，又想帮这个类新增方法的时候。操作它的 prototype 就好了。但不推荐！

### 函数式编程

js 中，匿名函数非常的方便，有效利用函数式编程的特性可以使人写代码时心情愉悦。

使用 lodash：<https://lodash.com/docs>

### 泛型

类型都经常忽略还泛型！every parammeter is 泛型 in js

### 权限控制

类定义中，没有 public private 等关键词，都靠约定。而且经常有人突破约定。

有些 http 方面的库，时不时就去 stub 原生 http 库的方法，0.11 时的 node.js 完全不按章法出牌，所以很多这些库都出现兼容性问题。

### 设计模式

《解密设计模式-王垠》

<https://github.com/alsotang/node-lessons/blob/master/lesson14/%E8%A7%A3%E5%AF%86%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E7%8E%8B%E5%9E%A0.md>

### 构建大型项目

从 npm 上面寻找质量高的库，并用质量高的方式拼凑起来。

## 设计模式

　　有些人问我，你说学习操作系统的最好办法是学习程序设计。那我们是不是应该学习一些“设计模式”（design patterns）。这是一个我很早就有定论，而且经过实践检验的问题，所以想在这里做一个总结。

　　总的来说，如果光从字面上讲，程序里总是有一些“模式”可以发掘的。因为你总是可以借鉴以前的经验，来构造新的程序。你可以把这种“经验”叫做“模式”。可是自从《设计模式》（通常叫做 GoF，“Gang of Four”）这本书在 1994 年发表以来，“设计模式”这个词有了新的，扭曲的含义。它变成了一种教条，带来了公司里程序的严重复杂化。

　　GoF 借鉴的是一个叫 Christopher Alexander 的建筑师的做法。Alexander 给一些建筑学里的“设计模式”起了名字，试图让建筑师们有一些“共同语言”。可惜的是，Alexander 后来自己都承认，他的实验失败了。因为这些固定的模式，并没有有效地传递精髓的知识，没有能让新手设计出好的建筑。照搬模式东拼西凑，而不能看透事物的本质，其实是设计不出好东西的。

　　当我听说这本书的时候，我已经学会了函数式编程，正在 Cornell 读 PhD，专攻程序语言设计。有一天由于好奇这书为什么名气这么大，我从图书馆借了一本回来看。我很快的发现，其实这本书的作者只是给早已经存在的编程方法起了一些新的名字而已。当时我就拿起一张纸，把所有的 20 来个设计模式跟我常用的编程概念做了一个映射。这个映射居然是“多对一”（many-to-one）的。也就是说，多个 GoF 设计模式，居然只对应同一个我每天都用的概念。有些概念是如此的不值一提，以至于我根本不需要一个名字来描述它，更不要说多个名字！

　　其中极少数值得一提的“模式”，也许是 visitor 和 interpreter。很可惜的是，只有很少的人明白如何使用它们。所谓的 visitor，其实本质上就是函数式语言里的含有“模式匹配”（pattern matching）的递归函数。在函数式语言里，这是多么轻松的事情。可是因为 Java 没有模式匹配，所以很多人使用 visitor pattern。为了所谓的“通用性”，他们往往把 visitor pattern 搞出多层继承关系，让你转几道弯也搞不清楚到底哪个 visitor 才是干实事的。

　　其实，函数式语言的研究者们早就知道 visitor pattern 是怎么得来的。如果你想知道如何从无到有，“发明”出 Java 的 visitor pattern，可以参考 Dan Friedman 跟他的学生 Matthias Felleisen 合写的的另一本“小人书”《A Little Java, A Few Patterns》（发表于 1997 年）。

　　而 interpreter （解释器）模式呢？看了作者们写的例子程序之后，我发现他们其实并不会写解释器，或者说他们不知道如何写出优雅的，正确的解释器。如果你想知道如何写出好的解释器，可以参考我的博文《怎样写一个解释器》。

　　你说我在贬低这本书的真正价值，因为 GoF 说了：“我们的贡献，就是给这些编程方式起名字。这样让广大程序员有共同的语言。” 如果这也叫贡献的话，我就可以写本书，给“空气”，“水”，“猪肉”这些东西全都起个新名字，让大家有“共同的语言”。这不是搞笑吗。

　　这不是我的一家之言，Peter Norvig 在 1998 年就做了一个演讲，指出在“动态语言”里面，GoF 的 20 几个模式，其中绝大部分都“透明”了。也就是说，你根本感觉不到它们的存在。这就像我刚才告诉你的。

　　在这里 Norvig 的观点是正确的，不过需要小心一个概念错误。高级的“静态语言”（能传递函数作为参数的），其实也可以避免大部分 GoF 设计模式。而“动态语言”这个概念，在程序语言的理论里面，其实是没有明确的定义的。“动态语言”其实也能进行某些“静态类型检查”。不过在 1998 年，我还是个啥都不懂屁孩，所以这里就不跟 Norvig 大叔计较了。

　　既然老人们都有历史局限性，那么为啥我还跟 GoF 找茬？本来这本书很老了，如果没有人再被它误导的话，这篇博文也就不必存在了。可是当我在 Google 实习的时候，我发现几乎每个程序员的书架上都有一本 GoF！我在 Google 实习了两次，第一次的时候代码全都是我一个人写的，所以没有使用任何 GoF 设计模式。代码直接，精巧而简单。当我第二次回到 Google，发现我的代码里已经被加入了各种 factory，visitor，…… 其实啥好事也没做，只不过让我的代码弯了几道弯，让人难以理解。

　　可见一本坏书，毁掉的不只是一代程序员。鉴于如此，特发此文。各位新手，希望你们敲响警钟，不要再走上这条老路，写出代码来让大家痛苦。

　　至于如何学会写真正好的代码，我在另一篇博文里再讲。
