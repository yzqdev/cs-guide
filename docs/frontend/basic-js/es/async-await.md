# js中的异步

Chrome 55 中默认情况下启用异步函数，坦率地讲，它们的作用相当不可思议。 可以利用它们像编写同步代码那样编写基于 Promise 的代码，而且还不会阻塞主线程。 它们可以让异步代码“智商”下降、可读性提高。

异步函数的工作方式是这样的:

```js
async function myFirstAsyncFunction() {
  try {
    const fulfilledValue = await promise;
  }
  catch (rejectedValue) {
    // …
  }
}
```

如果在函数定义之前使用了 `async` 关键字，就可以在函数内使用 `await`。 当您 `await` 某个 Promise 时，函数暂停执行，直至该 Promise 产生结果，并且暂停并不会阻塞主线程。 如果 Promise 执行，则会返回值。 如果 Promise 拒绝，则会抛出拒绝的值。

**Note:** 如果不熟悉 Promise，可以看一看[我们的 Promise 指南](https://developers.google.cn/web/fundamentals/getting-started/primers/promises)。

## 示例: 记录获取日志

假设我们想获取某个网址并以文本形式记录响应日志。以下是利用 Promise 编写的代码:

```js
function logFetch(url) {
  return fetch(url)
    .then(response => response.text())
    .then(text => {
      console.log(text);
    }).catch(err => {
      console.error('fetch failed', err);
    });
}
```

以下是利用异步函数具有相同作用的代码:

```js
async function logFetch(url) {
  try {
    const response = await fetch(url);
    console.log(await response.text());
  }
  catch (err) {
    console.log('fetch failed', err);
  }
}
```

代码行数虽然相同，但去掉了所有回调。这可以提高代码的可读性，对不太熟悉 Promise 的人而言，帮助就更大了。

**Note:** 您 `await` 的任何内容都通过 `Promise.resolve()` 传递，这样您就可以安全地 `await` 非原生 Promise。

## 异步函数返回值

无论是否使用 `await`，异步函数_都会_返回 Promise。该 Promise 解析时返回异步函数返回的任何值，拒绝时返回异步函数抛出的任何值。

因此，对于:

```js
// wait ms milliseconds
function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function hello() {
  await wait(500);
  return 'world';
}
```

…调用 `hello()` 返回的 Promise 会在_执行_时返回 `"world"`。

```js
async function foo() {
  await wait(500);
  throw Error('bar');
}
```

…调用 `foo()` 返回的 Promise 会在_拒绝_时返回 `Error('bar')`。

## 示例: 流式传输响应

异步函数在更复杂示例中更有用武之地。假设我们想在流式传输响应的同时记录数据块日志，并返回数据块最终大小。

**Note:** 一看到“记录数据块日志”这几个字就让我感到不舒服。

以下是使用 Promise 编写的代码:

```js
function getResponseSize(url) {
  return fetch(url).then(response => {
    const reader = response.body.getReader();
    let total = 0;

    return reader.read().then(function processResult(result) {
      if (result.done) return total;

      const value = result.value;
      total += value.length;
      console.log('Received chunk', value);

      return reader.read().then(processResult);
    })
  });
}
```

请“Promise 大师”Jake Archibald 给我检查一下。看到我是如何在 `processResult` 内调用其自身来建立异步循环了吧？ 这样编写的代码让我觉得_很智能_。 但就像大多数“智能”代码那样，你得盯着它看上半天才能弄明白它的作用，要拿出揣摩上世纪 90 年代流行的魔眼图片的那种劲头才行。

我们再用异步函数来编写上面这段代码:

```js
async function getResponseSize(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  let result = await reader.read();
  let total = 0;

  while (!result.done) {
    const value = result.value;
    total += value.length;
    console.log('Received chunk', value);
    // get the next result
    result = await reader.read();
  }

  return total;
}
```

所有“智能”都不见了。让我大有飘飘然之感的异步循环被替换成可靠却单调乏味的 while 循环。 但简明性得到大幅提高。未来，我们将获得[异步迭代器](https://github.com/tc39/proposal-async-iteration)，这些迭代器[会将 `while` 循环替换成 for-of 循环](https://gist.github.com/jakearchibald/0b37865637daf884943cf88c2cba1376)，从而进一步提高代码的简明性。

**Note:** 我有点偏爱卡片信息流。如果不熟悉流式传输，可以[看一看我的指南](https://jakearchibald.com/2016/streams-ftw/#streams-the-fetch-api)。

## 其他异步函数语法

我们已经见识了 `async function() {}`，但 `async` 关键字还可用于其他函数语法:

### 箭头函数

```js
// map some URLs to json-promises
const jsonPromises = urls.map(async url => {
  const response = await fetch(url);
  return response.json();
});
```

**Note:** `array.map(func)` 不在乎我提供给它的是不是异步函数，只把它当作一个返回 Promise 的函数来看待。 它不会等到第一个函数执行完毕就会调用第二个函数。

### 对象方法

```js
const storage = {
  async getAvatar(name) {
    const cache = await caches.open('avatars');
    return cache.match(`/avatars/${name}.jpg`);
  }
};

storage.getAvatar('jaffathecake').then(…);
```

### 类方法

```js
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jaffathecake').then(…);
```

**Note:** 类构造函数以及 getter/settings 方法不能是异步的。

## 注意！避免太过循序

尽管您编写的是看似同步的代码，也一定不要错失并行执行的机会。

```js
async function series() {
  await wait(500);
  await wait(500);
  return "done!";
}
```

以上代码执行完毕需要 1000 毫秒，再看看这段代码:

```js
async function parallel() {
  const wait1 = wait(500);
  const wait2 = wait(500);
  await wait1;
  await wait2;
  return "done!";
}
```

…以上代码只需 500 毫秒就可执行完毕，因为两个 wait 是同时发生的。让我们看一个实例…

### 示例: 按顺序输出获取的数据

假定我们想获取一系列网址，并尽快按正确顺序将它们记录到日志中。

_深呼吸_ - 以下是使用 Promise 编写的代码:

```js
function logInOrder(urls) {
  // fetch all the URLs
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // log them in order
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
```

是的，没错，我使用 `reduce` 来链接 Promise 序列。我是不是_很智能_。 但这种有点_很智能_的编码还是不要为好。

不过，如果使用异步函数改写以上代码，又容易让代码变得_过于循序_:

**不推荐的编码方式** - 过于循序

```js
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
```

代码简洁得多，但我的第二次获取要等到第一次获取读取完毕才能开始，以此类推。 其执行效率要比并行执行获取的 Promise 示例低得多。 幸运的是，还有一种理想的中庸之道:

**推荐的编码方式** - 可读性强、并行效率高

```js
async function logInOrder(urls) {
  // fetch all the URLs in parallel
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // log them in sequence
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```

在本例中，以并行方式获取和读取网址，但将“智能”的 `reduce` 部分替换成标准单调乏味但可读性强的 for 循环。

## 浏览器支持与解决方法

在写作本文时，Chrome 55 中默认情况下启用异步函数，但它们在所有主流浏览器中正处于开发阶段:

- Edge - [在 14342+ 编译版本中隐藏在一个标志后](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/asyncfunctions/)
- Firefox - [开发中](https://bugzilla.mozilla.org/show_bug.cgi?id=1185106)
- Safari - [开发中](https://bugs.webkit.org/show_bug.cgi?id=156147)

### 解决方法 - 生成器

如果目标是支持生成器的浏览器（其中包括[每一个主流浏览器的最新版本](http://kangax.github.io/compat-table/es6/#test-generators)），可以通过 polyfill 使用异步函数。

[Babel](https://babeljs.io/) 可以为您实现此目的，[以下是通过 Babel REPL 实现的示例](https://goo.gl/0Cg1Sq)

- 注意到转译的代码有多相似了吧。这一转换是 [Babel es2017 预设](http://babeljs.io/docs/plugins/preset-es2017/)的一部分。

**Note:** Babel REPL 说起来很有趣。试试就知道。

我建议采用转译方法，因为目标浏览器支持异步函数后，直接将其关闭即可，但如果_实在_不想使用转译器，可以亲自试用一下 [Babel 的 polyfill](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25)。

原本的异步函数代码:

```js
async function slowEcho(val) {
  await wait(1000);
  return val;
}
```

…如果使用 [polyfill](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25)，就需要这样编写:

```js
const slowEcho = createAsyncFunction(function*(val) {
  yield wait(1000);
  return val;
});
```

请注意，需要将生成器 (`function*`) 传递给 `createAsyncFunction`，并使用 `yield` 来替代 `await`。 其他方面的工作方式是相同的。

### 解决方法 - 再生器

如果目标是旧版浏览器，Babel 还可转译生成器，让您能在版本低至 IE8 的浏览器上使用异步函数。 为此，您需要 [Babel 的 es2017 预设](http://babeljs.io/docs/plugins/preset-es2017/)_和_ [es2015 预设](http://babeljs.io/docs/plugins/preset-es2015/)。

[输出不够美观](https://goo.gl/jlXboV)，因此要注意避免发生代码膨胀。

## 全面异步化

一旦异步函数登陆所有浏览器，就在每一个返回 Promise 的函数上尽情使用吧！ 它们不但能让代码更加整洁美观，还能确保该函数_始终_都能返回 Promise。

## tips

node异步用的是async/await这两个关键字。一般这两个关键字要成对出现。
**但是，如果不需要等待返回值的话，await可以不加,await会阻塞函数内部同步代码的运行**,并不是阻塞函数
<https://juejin.cn/post/6844903613530144781>
<https://juejin.cn/post/7033647059378896903>

```ts
async function fn1() {
  console.log(1);
  await pr1();
  await pr2();
  console.log(2);
}

function fn2() {
  console.log(3);
}

function pr1() {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log(4);
      resolve();
    }, 2000);
  });
}

function pr2() {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log(5);
      resolve();
    }, 2000);
  });
}

fn1();
fn2();

//如果会阻塞，输出应该是14523，结果是13452，这就表示async/await是不会阻塞，会阻塞的只是使用await的函数内部。
```

```ts
let num=50
function wait(ms:number) {
    let flas=1
  return new Promise<void>((r) =>  {
    for (let index = 0; index < ms; index++) {
         flas+=index
       
    }
    console.log(flas);
     r();
  });
}

async function series() {
 let start=performance.now()
  await wait(num);
  await wait(num);
  await wait(num);
 let end=performance.now()
 console.log(end-start);
  return "done!";
}

async function parallel() {
let start=performance.now()
//下面wait(num)已经resolve了所以跟
  const wait1 = wait(num);
  const wait2 = wait(num);
  const wait3= wait(num);
  await wait1;
  await wait2;
  await wait3
 let end=performance.now()
 console.log(end-start);
  return "done!";
}
///这里的await会把series和parallel同步执行,耗时更多
( async  ()=> {
  await series();
 console.log('接下来进行paraller');
  parallel();
})();
 
  //输出
  // a: 1.017s
  // b: num06.249ms
  ///这里的两个函数异步执行,parallel先执行完
 (  () => {
    series();
    parallel();
  }
)();
//输出
//b: num0num.781ms
// a: 1.020s

```

下面是另一个例子

```ts
let num = 50;
function wait(flag: string, ms: number) {
  let flas = 1;
  return new Promise<void>((r) => {
    for (let index = 0; index < ms; index++) {
      flas += index;
    }
    console.log(flag, flas);
    r();
  });
}
async function a() {
  let start = performance.now();
  await wait("a1", num);
  await wait("a2", num);
  await wait("a3", num);
  let end = performance.now();
  console.log("ayonghu");
  console.log(end - start);
}
async function b() {
  let start = performance.now();
  wait("b1", num);
  wait("b2", num);
  wait("b3", num);
  let end = performance.now();
  console.log("bbb");
  console.log(end - start);
}
(async () => {
  a();
  b();
})();

```

输出

```txt
a1 1226
b1 1226
b2 1226
b3 1226
bbb
0.9326000064611435
a2 1226
a3 1226
ayonghu
4.515999995172024
```

上面看出,a函数和b函数是异步进行的,但 进行第一个函数a1时,由于a函数内部阻塞,b函数直接异步运行完了,所以会出现a1函数后面是b1,b2,b2函数,最后才是a2,a3

下面的说明来自
<https://github.com/mqyqingfeng/Blog/issues/100>

## async 地狱

async 地狱主要是指开发者贪图语法上的简洁而让原本可以并行执行的内容变成了顺序执行，从而影响了性能，但用地狱形容有点夸张了点……

### 例子一

举个例子：

```js
(async () => {
  const getList = await getList();
  const getAnotherList = await getAnotherList();
})();
```

getList() 和 getAnotherList() 其实并没有依赖关系，但是现在的这种写法，虽然简洁，却导致了 getAnotherList() 只能在 getList() 返回后才会执行，从而导致了多一倍的请求时间。

为了解决这个问题，我们可以改成这样：

```js
(async () => {
  const listPromise = getList();
  const anotherListPromise = getAnotherList();
  await listPromise;
  await anotherListPromise;
})();
```

也可以使用 Promise.all()：

```js
(async () => {
  Promise.all([getList(), getAnotherList()]).then(...);
})();
```

也可以用.then

```js
  a().then((val) => {
    console.log('suce');
  })
  b().then((val ) => {
    console.log('d');
  })
```

### 例子二

当然上面这个例子比较简单，我们再来扩充一下：

```js
(async () => {
  const listPromise = await getList();
  const anotherListPromise = await getAnotherList();

  // do something

  await submit(listData);
  await submit(anotherListData);

})();
```

下面的代码演示了各个方法

```js

import got from "got";

function a() {
  return new Promise(async (resolve) => {
    let data = await got(
      "http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome"
    ).json();
    resolve(data);
  });
}
function b() {
  return new Promise(async (resolve) => {
    let data = await got(
      "https://bbs-api-static.mihoyo.com/misc/api/emoticon_set?gids=2"
    ).json();
    resolve(data);
  });
}
(async () => {
  let start = performance.now();
  //第一种, 耗时4ms

  // a().then((val) => {
  //   console.log(val);
  // });
  // b().then((val) => {
  //   console.log(val);
  // });
  //第二种 耗时120ms
  // let res1 = a();
  // let res2 = b();
  // let data1 = await res1;
  // let data2 = await res2;
  // console.log(data1);
  // console.log(data2);
  //第三种 耗时200ms
  // console.log(await a());
  // console.log(await b());
  //第四种 耗时4毫秒
  Promise.all([a(),b()]).then((val ) => {
    console.log(val[0]);
    console.log(val[1]);
  })
  //第五种
  // [a, b].forEach(async (item) => {
  //   return await item();
  // });
  let end = performance.now();
  console.log(end - start);
})();
```

因为 await 的特性，整个例子有明显的先后顺序，然而 getList() 和 getAnotherList() 其实并无依赖，submit(listData) 和 submit(anotherListData) 也没有依赖关系，那么对于这种例子，我们该怎么改写呢？

基本分为三个步骤：

**1. 找出依赖关系**

在这里，submit(listData) 需要在 getList() 之后，submit(anotherListData) 需要在 anotherListPromise() 之后。

**2. 将互相依赖的语句包裹在 async 函数中**

```js
async function handleList() {
  const listPromise = await getList();
  // ...
  await submit(listData);
}

async function handleAnotherList() {
  const anotherListPromise = await getAnotherList()
  // ...
  await submit(anotherListData)
}
```

**3.并发执行 async 函数**

```js
async function handleList() {
  const listPromise = await getList();
  // ...
  await submit(listData);
}

async function handleAnotherList() {
  const anotherListPromise = await getAnotherList()
  // ...
  await submit(anotherListData)
}

// 方法一
(async () => {
  const handleListPromise = handleList()
  const handleAnotherListPromise = handleAnotherList()
  await handleListPromise
  await handleAnotherListPromise
})()

// 方法二
(async () => {
  Promise.all([handleList(), handleAnotherList()]).then()
})()
```

## 继发与并发

**问题：给定一个 URL 数组，如何实现接口的继发和并发？**

async 继发实现：

```js
// 继发一
async function loadData() {
  var res1 = await fetch(url1);
  var res2 = await fetch(url2);
  var res3 = await fetch(url3);
  return "whew all done";
}
// 继发二
async function loadData(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
```

async 并发实现：

```js
// 并发一
async function loadData() {
  var res = await Promise.all([fetch(url1), fetch(url2), fetch(url3)]);
  return "whew all done";
}
// 并发二
async function loadData(urls) {
  // 并发读取 url
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```

## async 错误捕获

尽管我们可以使用 try catch 捕获错误，但是当我们需要捕获多个错误并做不同的处理时，很快 try catch 就会导致代码杂乱，就比如：

```js
async function asyncTask(cb) {
    try {
       const user = await UserModel.findById(1);
       if(!user) return cb('No user found');
    } catch(e) {
        return cb('Unexpected error occurred');
    }

    try {
       const savedTask = await TaskModel({userId: user.id, name: 'Demo Task'});
    } catch(e) {
        return cb('Error occurred while saving task');
    }

    if(user.notificationsEnabled) {
        try {
            await NotificationService.sendNotification(user.id, 'Task Created');
        } catch(e) {
            return cb('Error while sending notification');
        }
    }

    if(savedTask.assignedUser.id !== user.id) {
        try {
            await NotificationService.sendNotification(savedTask.assignedUser.id, 'Task was created for you');
        } catch(e) {
            return cb('Error while sending notification');
        }
    }

    cb(null, savedTask);
}
```

为了简化这种错误的捕获，我们可以给 await 后的 promise 对象添加 catch 函数，为此我们需要写一个 helper:

```js
// to.js
export default function to(promise) {
   return promise.then(data => {
      return [null, data];
   })
   .catch(err => [err]);
}
```

整个错误捕获的代码可以简化为：

```js
import to from './to.js';

async function asyncTask() {
     let err, user, savedTask;

     [err, user] = await to(UserModel.findById(1));
     if(!user) throw new CustomerError('No user found');

     [err, savedTask] = await to(TaskModel({userId: user.id, name: 'Demo Task'}));
     if(err) throw new CustomError('Error occurred while saving task');

    if(user.notificationsEnabled) {
       const [err] = await to(NotificationService.sendNotification(user.id, 'Task Created'));
       if (err) console.error('Just log the error and continue flow');
    }
}
```
