import{_ as e,c as n,o as t,d as a}from"./app-CbULZrmi.js";const r={},o=a(`<h1 id="js中的异步" tabindex="-1"><a class="header-anchor" href="#js中的异步"><span>js中的异步</span></a></h1><p>Chrome 55 中默认情况下启用异步函数，坦率地讲，它们的作用相当不可思议。 可以利用它们像编写同步代码那样编写基于 Promise 的代码，而且还不会阻塞主线程。 它们可以让异步代码“智商”下降、可读性提高。</p><p>异步函数的工作方式是这样的:</p><pre><code class="language-js">async function myFirstAsyncFunction() {
  try {
    const fulfilledValue = await promise;
  }
  catch (rejectedValue) {
    // …
  }
}
</code></pre><p>如果在函数定义之前使用了 <code>async</code> 关键字，就可以在函数内使用 <code>await</code>。 当您 <code>await</code> 某个 Promise 时，函数暂停执行，直至该 Promise 产生结果，并且暂停并不会阻塞主线程。 如果 Promise 执行，则会返回值。 如果 Promise 拒绝，则会抛出拒绝的值。</p><p><strong>Note:</strong> 如果不熟悉 Promise，可以看一看<a href="https://developers.google.cn/web/fundamentals/getting-started/primers/promises" target="_blank" rel="noopener noreferrer">我们的 Promise 指南</a>。</p><h2 id="示例-记录获取日志" tabindex="-1"><a class="header-anchor" href="#示例-记录获取日志"><span>示例: 记录获取日志</span></a></h2><p>假设我们想获取某个网址并以文本形式记录响应日志。以下是利用 Promise 编写的代码:</p><pre><code class="language-js">function logFetch(url) {
  return fetch(url)
    .then(response =&gt; response.text())
    .then(text =&gt; {
      console.log(text);
    }).catch(err =&gt; {
      console.error(&#39;fetch failed&#39;, err);
    });
}
</code></pre><p>以下是利用异步函数具有相同作用的代码:</p><pre><code class="language-js">async function logFetch(url) {
  try {
    const response = await fetch(url);
    console.log(await response.text());
  }
  catch (err) {
    console.log(&#39;fetch failed&#39;, err);
  }
}
</code></pre><p>代码行数虽然相同，但去掉了所有回调。这可以提高代码的可读性，对不太熟悉 Promise 的人而言，帮助就更大了。</p><p><strong>Note:</strong> 您 <code>await</code> 的任何内容都通过 <code>Promise.resolve()</code> 传递，这样您就可以安全地 <code>await</code> 非原生 Promise。</p><h2 id="异步函数返回值" tabindex="-1"><a class="header-anchor" href="#异步函数返回值"><span>异步函数返回值</span></a></h2><p>无论是否使用 <code>await</code>，异步函数_都会_返回 Promise。该 Promise 解析时返回异步函数返回的任何值，拒绝时返回异步函数抛出的任何值。</p><p>因此，对于:</p><pre><code class="language-js">// wait ms milliseconds
function wait(ms) {
  return new Promise(r =&gt; setTimeout(r, ms));
}

async function hello() {
  await wait(500);
  return &#39;world&#39;;
}
</code></pre><p>…调用 <code>hello()</code> 返回的 Promise 会在_执行_时返回 <code>&quot;world&quot;</code>。</p><pre><code class="language-js">async function foo() {
  await wait(500);
  throw Error(&#39;bar&#39;);
}
</code></pre><p>…调用 <code>foo()</code> 返回的 Promise 会在_拒绝_时返回 <code>Error(&#39;bar&#39;)</code>。</p><h2 id="示例-流式传输响应" tabindex="-1"><a class="header-anchor" href="#示例-流式传输响应"><span>示例: 流式传输响应</span></a></h2><p>异步函数在更复杂示例中更有用武之地。假设我们想在流式传输响应的同时记录数据块日志，并返回数据块最终大小。</p><p><strong>Note:</strong> 一看到“记录数据块日志”这几个字就让我感到不舒服。</p><p>以下是使用 Promise 编写的代码:</p><pre><code class="language-js">function getResponseSize(url) {
  return fetch(url).then(response =&gt; {
    const reader = response.body.getReader();
    let total = 0;

    return reader.read().then(function processResult(result) {
      if (result.done) return total;

      const value = result.value;
      total += value.length;
      console.log(&#39;Received chunk&#39;, value);

      return reader.read().then(processResult);
    })
  });
}
</code></pre><p>请“Promise 大师”Jake Archibald 给我检查一下。看到我是如何在 <code>processResult</code> 内调用其自身来建立异步循环了吧？ 这样编写的代码让我觉得_很智能_。 但就像大多数“智能”代码那样，你得盯着它看上半天才能弄明白它的作用，要拿出揣摩上世纪 90 年代流行的魔眼图片的那种劲头才行。</p><p>我们再用异步函数来编写上面这段代码:</p><pre><code class="language-js">async function getResponseSize(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  let result = await reader.read();
  let total = 0;

  while (!result.done) {
    const value = result.value;
    total += value.length;
    console.log(&#39;Received chunk&#39;, value);
    // get the next result
    result = await reader.read();
  }

  return total;
}
</code></pre><p>所有“智能”都不见了。让我大有飘飘然之感的异步循环被替换成可靠却单调乏味的 while 循环。 但简明性得到大幅提高。未来，我们将获得<a href="https://github.com/tc39/proposal-async-iteration" target="_blank" rel="noopener noreferrer">异步迭代器</a>，这些迭代器<a href="https://gist.github.com/jakearchibald/0b37865637daf884943cf88c2cba1376" target="_blank" rel="noopener noreferrer">会将 <code>while</code> 循环替换成 for-of 循环</a>，从而进一步提高代码的简明性。</p><p><strong>Note:</strong> 我有点偏爱卡片信息流。如果不熟悉流式传输，可以<a href="https://jakearchibald.com/2016/streams-ftw/#streams-the-fetch-api" target="_blank" rel="noopener noreferrer">看一看我的指南</a>。</p><h2 id="其他异步函数语法" tabindex="-1"><a class="header-anchor" href="#其他异步函数语法"><span>其他异步函数语法</span></a></h2><p>我们已经见识了 <code>async function() {}</code>，但 <code>async</code> 关键字还可用于其他函数语法:</p><h3 id="箭头函数" tabindex="-1"><a class="header-anchor" href="#箭头函数"><span>箭头函数</span></a></h3><pre><code class="language-js">// map some URLs to json-promises
const jsonPromises = urls.map(async url =&gt; {
  const response = await fetch(url);
  return response.json();
});
</code></pre><p><strong>Note:</strong> <code>array.map(func)</code> 不在乎我提供给它的是不是异步函数，只把它当作一个返回 Promise 的函数来看待。 它不会等到第一个函数执行完毕就会调用第二个函数。</p><h3 id="对象方法" tabindex="-1"><a class="header-anchor" href="#对象方法"><span>对象方法</span></a></h3><pre><code class="language-js">const storage = {
  async getAvatar(name) {
    const cache = await caches.open(&#39;avatars&#39;);
    return cache.match(\`/avatars/\${name}.jpg\`);
  }
};

storage.getAvatar(&#39;jaffathecake&#39;).then(…);
</code></pre><h3 id="类方法" tabindex="-1"><a class="header-anchor" href="#类方法"><span>类方法</span></a></h3><pre><code class="language-js">class Storage {
  constructor() {
    this.cachePromise = caches.open(&#39;avatars&#39;);
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(\`/avatars/\${name}.jpg\`);
  }
}

const storage = new Storage();
storage.getAvatar(&#39;jaffathecake&#39;).then(…);
</code></pre><p><strong>Note:</strong> 类构造函数以及 getter/settings 方法不能是异步的。</p><h2 id="注意-避免太过循序" tabindex="-1"><a class="header-anchor" href="#注意-避免太过循序"><span>注意！避免太过循序</span></a></h2><p>尽管您编写的是看似同步的代码，也一定不要错失并行执行的机会。</p><pre><code class="language-js">async function series() {
  await wait(500);
  await wait(500);
  return &quot;done!&quot;;
}
</code></pre><p>以上代码执行完毕需要 1000 毫秒，再看看这段代码:</p><pre><code class="language-js">async function parallel() {
  const wait1 = wait(500);
  const wait2 = wait(500);
  await wait1;
  await wait2;
  return &quot;done!&quot;;
}
</code></pre><p>…以上代码只需 500 毫秒就可执行完毕，因为两个 wait 是同时发生的。让我们看一个实例…</p><h3 id="示例-按顺序输出获取的数据" tabindex="-1"><a class="header-anchor" href="#示例-按顺序输出获取的数据"><span>示例: 按顺序输出获取的数据</span></a></h3><p>假定我们想获取一系列网址，并尽快按正确顺序将它们记录到日志中。</p><p><em>深呼吸</em> - 以下是使用 Promise 编写的代码:</p><pre><code class="language-js">function logInOrder(urls) {
  // fetch all the URLs
  const textPromises = urls.map(url =&gt; {
    return fetch(url).then(response =&gt; response.text());
  });

  // log them in order
  textPromises.reduce((chain, textPromise) =&gt; {
    return chain.then(() =&gt; textPromise)
      .then(text =&gt; console.log(text));
  }, Promise.resolve());
}
</code></pre><p>是的，没错，我使用 <code>reduce</code> 来链接 Promise 序列。我是不是_很智能_。 但这种有点_很智能_的编码还是不要为好。</p><p>不过，如果使用异步函数改写以上代码，又容易让代码变得_过于循序_:</p><p><strong>不推荐的编码方式</strong> - 过于循序</p><pre><code class="language-js">async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
</code></pre><p>代码简洁得多，但我的第二次获取要等到第一次获取读取完毕才能开始，以此类推。 其执行效率要比并行执行获取的 Promise 示例低得多。 幸运的是，还有一种理想的中庸之道:</p><p><strong>推荐的编码方式</strong> - 可读性强、并行效率高</p><pre><code class="language-js">async function logInOrder(urls) {
  // fetch all the URLs in parallel
  const textPromises = urls.map(async url =&gt; {
    const response = await fetch(url);
    return response.text();
  });

  // log them in sequence
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
</code></pre><p>在本例中，以并行方式获取和读取网址，但将“智能”的 <code>reduce</code> 部分替换成标准单调乏味但可读性强的 for 循环。</p><h2 id="浏览器支持与解决方法" tabindex="-1"><a class="header-anchor" href="#浏览器支持与解决方法"><span>浏览器支持与解决方法</span></a></h2><p>在写作本文时，Chrome 55 中默认情况下启用异步函数，但它们在所有主流浏览器中正处于开发阶段:</p><ul><li>Edge - <a href="https://developer.microsoft.com/en-us/microsoft-edge/platform/status/asyncfunctions/" target="_blank" rel="noopener noreferrer">在 14342+ 编译版本中隐藏在一个标志后</a></li><li>Firefox - <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1185106" target="_blank" rel="noopener noreferrer">开发中</a></li><li>Safari - <a href="https://bugs.webkit.org/show_bug.cgi?id=156147" target="_blank" rel="noopener noreferrer">开发中</a></li></ul><h3 id="解决方法-生成器" tabindex="-1"><a class="header-anchor" href="#解决方法-生成器"><span>解决方法 - 生成器</span></a></h3><p>如果目标是支持生成器的浏览器（其中包括<a href="http://kangax.github.io/compat-table/es6/#test-generators" target="_blank" rel="noopener noreferrer">每一个主流浏览器的最新版本</a>），可以通过 polyfill 使用异步函数。</p><p><a href="https://babeljs.io/" target="_blank" rel="noopener noreferrer">Babel</a> 可以为您实现此目的，<a href="https://goo.gl/0Cg1Sq" target="_blank" rel="noopener noreferrer">以下是通过 Babel REPL 实现的示例</a></p><ul><li>注意到转译的代码有多相似了吧。这一转换是 <a href="http://babeljs.io/docs/plugins/preset-es2017/" target="_blank" rel="noopener noreferrer">Babel es2017 预设</a>的一部分。</li></ul><p><strong>Note:</strong> Babel REPL 说起来很有趣。试试就知道。</p><p>我建议采用转译方法，因为目标浏览器支持异步函数后，直接将其关闭即可，但如果_实在_不想使用转译器，可以亲自试用一下 <a href="https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25" target="_blank" rel="noopener noreferrer">Babel 的 polyfill</a>。</p><p>原本的异步函数代码:</p><pre><code class="language-js">async function slowEcho(val) {
  await wait(1000);
  return val;
}
</code></pre><p>…如果使用 <a href="https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25" target="_blank" rel="noopener noreferrer">polyfill</a>，就需要这样编写:</p><pre><code class="language-js">const slowEcho = createAsyncFunction(function*(val) {
  yield wait(1000);
  return val;
});
</code></pre><p>请注意，需要将生成器 (<code>function*</code>) 传递给 <code>createAsyncFunction</code>，并使用 <code>yield</code> 来替代 <code>await</code>。 其他方面的工作方式是相同的。</p><h3 id="解决方法-再生器" tabindex="-1"><a class="header-anchor" href="#解决方法-再生器"><span>解决方法 - 再生器</span></a></h3><p>如果目标是旧版浏览器，Babel 还可转译生成器，让您能在版本低至 IE8 的浏览器上使用异步函数。 为此，您需要 <a href="http://babeljs.io/docs/plugins/preset-es2017/" target="_blank" rel="noopener noreferrer">Babel 的 es2017 预设</a><em>和</em> <a href="http://babeljs.io/docs/plugins/preset-es2015/" target="_blank" rel="noopener noreferrer">es2015 预设</a>。</p><p><a href="https://goo.gl/jlXboV" target="_blank" rel="noopener noreferrer">输出不够美观</a>，因此要注意避免发生代码膨胀。</p><h2 id="全面异步化" tabindex="-1"><a class="header-anchor" href="#全面异步化"><span>全面异步化</span></a></h2><p>一旦异步函数登陆所有浏览器，就在每一个返回 Promise 的函数上尽情使用吧！ 它们不但能让代码更加整洁美观，还能确保该函数_始终_都能返回 Promise。</p><h2 id="tips" tabindex="-1"><a class="header-anchor" href="#tips"><span>tips</span></a></h2><p>node异步用的是async/await这两个关键字。一般这两个关键字要成对出现。 <strong>但是，如果不需要等待返回值的话，await可以不加,await会阻塞函数内部同步代码的运行</strong>,并不是阻塞函数 <a href="https://juejin.cn/post/6844903613530144781" target="_blank" rel="noopener noreferrer">https://juejin.cn/post/6844903613530144781</a><a href="https://juejin.cn/post/7033647059378896903" target="_blank" rel="noopener noreferrer">https://juejin.cn/post/7033647059378896903</a></p><pre><code class="language-ts">async function fn1() {
  console.log(1);
  await pr1();
  await pr2();
  console.log(2);
}

function fn2() {
  console.log(3);
}

function pr1() {
  return new Promise&lt;void&gt;((resolve, reject) =&gt; {
    setTimeout(() =&gt; {
      console.log(4);
      resolve();
    }, 2000);
  });
}

function pr2() {
  return new Promise&lt;void&gt;((resolve, reject) =&gt; {
    setTimeout(() =&gt; {
      console.log(5);
      resolve();
    }, 2000);
  });
}

fn1();
fn2();

//如果会阻塞，输出应该是14523，结果是13452，这就表示async/await是不会阻塞，会阻塞的只是使用await的函数内部。
</code></pre><pre><code class="language-ts">let num=50
function wait(ms:number) {
    let flas=1
  return new Promise&lt;void&gt;((r) =&gt;  {
    for (let index = 0; index &lt; ms; index++) {
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
  return &quot;done!&quot;;
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
  return &quot;done!&quot;;
}
///这里的await会把series和parallel同步执行,耗时更多
( async  ()=&gt; {
  await series();
 console.log(&#39;接下来进行paraller&#39;);
  parallel();
})();
 
  //输出
  // a: 1.017s
  // b: num06.249ms
  ///这里的两个函数异步执行,parallel先执行完
 (  () =&gt; {
    series();
    parallel();
  }
)();
//输出
//b: num0num.781ms
// a: 1.020s

</code></pre><p>下面是另一个例子</p><pre><code class="language-ts">let num = 50;
function wait(flag: string, ms: number) {
  let flas = 1;
  return new Promise&lt;void&gt;((r) =&gt; {
    for (let index = 0; index &lt; ms; index++) {
      flas += index;
    }
    console.log(flag, flas);
    r();
  });
}
async function a() {
  let start = performance.now();
  await wait(&quot;a1&quot;, num);
  await wait(&quot;a2&quot;, num);
  await wait(&quot;a3&quot;, num);
  let end = performance.now();
  console.log(&quot;ayonghu&quot;);
  console.log(end - start);
}
async function b() {
  let start = performance.now();
  wait(&quot;b1&quot;, num);
  wait(&quot;b2&quot;, num);
  wait(&quot;b3&quot;, num);
  let end = performance.now();
  console.log(&quot;bbb&quot;);
  console.log(end - start);
}
(async () =&gt; {
  a();
  b();
})();

</code></pre><p>输出</p><pre><code class="language-txt">a1 1226
b1 1226
b2 1226
b3 1226
bbb
0.9326000064611435
a2 1226
a3 1226
ayonghu
4.515999995172024
</code></pre><p>上面看出,a函数和b函数是异步进行的,但 进行第一个函数a1时,由于a函数内部阻塞,b函数直接异步运行完了,所以会出现a1函数后面是b1,b2,b2函数,最后才是a2,a3</p><p>下面的说明来自 <a href="https://github.com/mqyqingfeng/Blog/issues/100" target="_blank" rel="noopener noreferrer">https://github.com/mqyqingfeng/Blog/issues/100</a></p><h2 id="async-地狱" tabindex="-1"><a class="header-anchor" href="#async-地狱"><span>async 地狱</span></a></h2><p>async 地狱主要是指开发者贪图语法上的简洁而让原本可以并行执行的内容变成了顺序执行，从而影响了性能，但用地狱形容有点夸张了点……</p><h3 id="例子一" tabindex="-1"><a class="header-anchor" href="#例子一"><span>例子一</span></a></h3><p>举个例子：</p><pre><code class="language-js">(async () =&gt; {
  const getList = await getList();
  const getAnotherList = await getAnotherList();
})();
</code></pre><p>getList() 和 getAnotherList() 其实并没有依赖关系，但是现在的这种写法，虽然简洁，却导致了 getAnotherList() 只能在 getList() 返回后才会执行，从而导致了多一倍的请求时间。</p><p>为了解决这个问题，我们可以改成这样：</p><pre><code class="language-js">(async () =&gt; {
  const listPromise = getList();
  const anotherListPromise = getAnotherList();
  await listPromise;
  await anotherListPromise;
})();
</code></pre><p>也可以使用 Promise.all()：</p><pre><code class="language-js">(async () =&gt; {
  Promise.all([getList(), getAnotherList()]).then(...);
})();
</code></pre><p>也可以用.then</p><pre><code class="language-js">  a().then((val) =&gt; {
    console.log(&#39;suce&#39;);
  })
  b().then((val ) =&gt; {
    console.log(&#39;d&#39;);
  })
</code></pre><h3 id="例子二" tabindex="-1"><a class="header-anchor" href="#例子二"><span>例子二</span></a></h3><p>当然上面这个例子比较简单，我们再来扩充一下：</p><pre><code class="language-js">(async () =&gt; {
  const listPromise = await getList();
  const anotherListPromise = await getAnotherList();

  // do something

  await submit(listData);
  await submit(anotherListData);

})();
</code></pre><p>下面的代码演示了各个方法</p><pre><code class="language-js">
import got from &quot;got&quot;;

function a() {
  return new Promise(async (resolve) =&gt; {
    let data = await got(
      &quot;http://cdn.apc.360.cn/index.php?c=WallPaper&amp;a=getAllCategoriesV2&amp;from=360chrome&quot;
    ).json();
    resolve(data);
  });
}
function b() {
  return new Promise(async (resolve) =&gt; {
    let data = await got(
      &quot;https://bbs-api-static.mihoyo.com/misc/api/emoticon_set?gids=2&quot;
    ).json();
    resolve(data);
  });
}
(async () =&gt; {
  let start = performance.now();
  //第一种, 耗时4ms

  // a().then((val) =&gt; {
  //   console.log(val);
  // });
  // b().then((val) =&gt; {
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
  Promise.all([a(),b()]).then((val ) =&gt; {
    console.log(val[0]);
    console.log(val[1]);
  })
  //第五种
  // [a, b].forEach(async (item) =&gt; {
  //   return await item();
  // });
  let end = performance.now();
  console.log(end - start);
})();
</code></pre><p>因为 await 的特性，整个例子有明显的先后顺序，然而 getList() 和 getAnotherList() 其实并无依赖，submit(listData) 和 submit(anotherListData) 也没有依赖关系，那么对于这种例子，我们该怎么改写呢？</p><p>基本分为三个步骤：</p><p><strong>1. 找出依赖关系</strong></p><p>在这里，submit(listData) 需要在 getList() 之后，submit(anotherListData) 需要在 anotherListPromise() 之后。</p><p><strong>2. 将互相依赖的语句包裹在 async 函数中</strong></p><pre><code class="language-js">async function handleList() {
  const listPromise = await getList();
  // ...
  await submit(listData);
}

async function handleAnotherList() {
  const anotherListPromise = await getAnotherList()
  // ...
  await submit(anotherListData)
}
</code></pre><p><strong>3.并发执行 async 函数</strong></p><pre><code class="language-js">async function handleList() {
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
(async () =&gt; {
  const handleListPromise = handleList()
  const handleAnotherListPromise = handleAnotherList()
  await handleListPromise
  await handleAnotherListPromise
})()

// 方法二
(async () =&gt; {
  Promise.all([handleList(), handleAnotherList()]).then()
})()
</code></pre><h2 id="继发与并发" tabindex="-1"><a class="header-anchor" href="#继发与并发"><span>继发与并发</span></a></h2><p><strong>问题：给定一个 URL 数组，如何实现接口的继发和并发？</strong></p><p>async 继发实现：</p><pre><code class="language-js">// 继发一
async function loadData() {
  var res1 = await fetch(url1);
  var res2 = await fetch(url2);
  var res3 = await fetch(url3);
  return &quot;whew all done&quot;;
}
// 继发二
async function loadData(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
</code></pre><p>async 并发实现：</p><pre><code class="language-js">// 并发一
async function loadData() {
  var res = await Promise.all([fetch(url1), fetch(url2), fetch(url3)]);
  return &quot;whew all done&quot;;
}
// 并发二
async function loadData(urls) {
  // 并发读取 url
  const textPromises = urls.map(async url =&gt; {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
</code></pre><h2 id="async-错误捕获" tabindex="-1"><a class="header-anchor" href="#async-错误捕获"><span>async 错误捕获</span></a></h2><p>尽管我们可以使用 try catch 捕获错误，但是当我们需要捕获多个错误并做不同的处理时，很快 try catch 就会导致代码杂乱，就比如：</p><pre><code class="language-js">async function asyncTask(cb) {
    try {
       const user = await UserModel.findById(1);
       if(!user) return cb(&#39;No user found&#39;);
    } catch(e) {
        return cb(&#39;Unexpected error occurred&#39;);
    }

    try {
       const savedTask = await TaskModel({userId: user.id, name: &#39;Demo Task&#39;});
    } catch(e) {
        return cb(&#39;Error occurred while saving task&#39;);
    }

    if(user.notificationsEnabled) {
        try {
            await NotificationService.sendNotification(user.id, &#39;Task Created&#39;);
        } catch(e) {
            return cb(&#39;Error while sending notification&#39;);
        }
    }

    if(savedTask.assignedUser.id !== user.id) {
        try {
            await NotificationService.sendNotification(savedTask.assignedUser.id, &#39;Task was created for you&#39;);
        } catch(e) {
            return cb(&#39;Error while sending notification&#39;);
        }
    }

    cb(null, savedTask);
}
</code></pre><p>为了简化这种错误的捕获，我们可以给 await 后的 promise 对象添加 catch 函数，为此我们需要写一个 helper:</p><pre><code class="language-js">// to.js
export default function to(promise) {
   return promise.then(data =&gt; {
      return [null, data];
   })
   .catch(err =&gt; [err]);
}
</code></pre><p>整个错误捕获的代码可以简化为：</p><pre><code class="language-js">import to from &#39;./to.js&#39;;

async function asyncTask() {
     let err, user, savedTask;

     [err, user] = await to(UserModel.findById(1));
     if(!user) throw new CustomerError(&#39;No user found&#39;);

     [err, savedTask] = await to(TaskModel({userId: user.id, name: &#39;Demo Task&#39;}));
     if(err) throw new CustomError(&#39;Error occurred while saving task&#39;);

    if(user.notificationsEnabled) {
       const [err] = await to(NotificationService.sendNotification(user.id, &#39;Task Created&#39;));
       if (err) console.error(&#39;Just log the error and continue flow&#39;);
    }
}
</code></pre>`,125),s=[o];function l(i,c){return t(),n("div",null,s)}const d=e(r,[["render",l],["__file","async-await.html.vue"]]),u=JSON.parse('{"path":"/frontend/basic-js/es/async-await.html","title":"js中的异步","lang":"zh-CN","frontmatter":{"description":"js中的异步 Chrome 55 中默认情况下启用异步函数，坦率地讲，它们的作用相当不可思议。 可以利用它们像编写同步代码那样编写基于 Promise 的代码，而且还不会阻塞主线程。 它们可以让异步代码“智商”下降、可读性提高。 异步函数的工作方式是这样的: 如果在函数定义之前使用了 async 关键字，就可以在函数内使用 await。 当您 awai...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-js/es/async-await.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"js中的异步"}],["meta",{"property":"og:description","content":"js中的异步 Chrome 55 中默认情况下启用异步函数，坦率地讲，它们的作用相当不可思议。 可以利用它们像编写同步代码那样编写基于 Promise 的代码，而且还不会阻塞主线程。 它们可以让异步代码“智商”下降、可读性提高。 异步函数的工作方式是这样的: 如果在函数定义之前使用了 async 关键字，就可以在函数内使用 await。 当您 awai..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-26T03:09:46.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-02-26T03:09:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"js中的异步\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-26T03:09:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例: 记录获取日志","slug":"示例-记录获取日志","link":"#示例-记录获取日志","children":[]},{"level":2,"title":"异步函数返回值","slug":"异步函数返回值","link":"#异步函数返回值","children":[]},{"level":2,"title":"示例: 流式传输响应","slug":"示例-流式传输响应","link":"#示例-流式传输响应","children":[]},{"level":2,"title":"其他异步函数语法","slug":"其他异步函数语法","link":"#其他异步函数语法","children":[{"level":3,"title":"箭头函数","slug":"箭头函数","link":"#箭头函数","children":[]},{"level":3,"title":"对象方法","slug":"对象方法","link":"#对象方法","children":[]},{"level":3,"title":"类方法","slug":"类方法","link":"#类方法","children":[]}]},{"level":2,"title":"注意！避免太过循序","slug":"注意-避免太过循序","link":"#注意-避免太过循序","children":[{"level":3,"title":"示例: 按顺序输出获取的数据","slug":"示例-按顺序输出获取的数据","link":"#示例-按顺序输出获取的数据","children":[]}]},{"level":2,"title":"浏览器支持与解决方法","slug":"浏览器支持与解决方法","link":"#浏览器支持与解决方法","children":[{"level":3,"title":"解决方法 - 生成器","slug":"解决方法-生成器","link":"#解决方法-生成器","children":[]},{"level":3,"title":"解决方法 - 再生器","slug":"解决方法-再生器","link":"#解决方法-再生器","children":[]}]},{"level":2,"title":"全面异步化","slug":"全面异步化","link":"#全面异步化","children":[]},{"level":2,"title":"tips","slug":"tips","link":"#tips","children":[]},{"level":2,"title":"async 地狱","slug":"async-地狱","link":"#async-地狱","children":[{"level":3,"title":"例子一","slug":"例子一","link":"#例子一","children":[]},{"level":3,"title":"例子二","slug":"例子二","link":"#例子二","children":[]}]},{"level":2,"title":"继发与并发","slug":"继发与并发","link":"#继发与并发","children":[]},{"level":2,"title":"async 错误捕获","slug":"async-错误捕获","link":"#async-错误捕获","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1677380986000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":12.04,"words":3611},"filePathRelative":"frontend/basic-js/es/async-await.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,u as data};
