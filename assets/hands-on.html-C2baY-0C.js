import{_ as e,c as n,o as t,d as r}from"./app-CbULZrmi.js";const a={},s=r(`<h1 id="前端手写代码" tabindex="-1"><a class="header-anchor" href="#前端手写代码"><span>前端手写代码</span></a></h1><h2 id="实现call方法" tabindex="-1"><a class="header-anchor" href="#实现call方法"><span>实现call方法</span></a></h2><pre><code class="language-javascript">Function.prototype.myCall = function(context, ...args) {
   if (context === null || context === undefined) {
       // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
        context = window 
    } else {
        context = Object(context) // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
    }
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
}

getMessage.myCall(obj, &#39;name&#39;); 

立即执行getMessage方法，不过是以obj.getMessage的方式，
所以这个时候getMessage内的this是obj，传入参数&#39;name&#39;。
（obj可能压根就没有getMessage方法）
</code></pre><h2 id="实现apply方法" tabindex="-1"><a class="header-anchor" href="#实现apply方法"><span>实现apply方法</span></a></h2><pre><code class="language-javascript">Function.prototype.myApply = function(context, args) {
  context.fn = this;
  const result = context.fn(args);
  delete context.fn;
  return result;
}

getMessage.myApply(obj, [&#39;name&#39;]); 
</code></pre><h2 id="实现bind方法" tabindex="-1"><a class="header-anchor" href="#实现bind方法"><span>实现bind方法</span></a></h2><pre><code class="language-javascript">Function.prototype.myBind = function(context, ...args) {
    const fn = this
    const bindFn = function (...newFnArgs) {
        return fn.call(
            this instanceof bindFn ? this : context,
            ...args, ...newFnArgs
        )
    }
    bindFn.prototype = Object.create(fn.prototype)
    return bindFn
}
 

</code></pre><h2 id="实现new方法" tabindex="-1"><a class="header-anchor" href="#实现new方法"><span>实现new方法</span></a></h2><pre><code class="language-javascript">function createNew(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype);
  const ret = Ctor.apply(obj, args);
  return ret instanceof Object ? ret : obj;
}

1. 将构造函数的原型赋值给新建的obj的隐式原型__proto__。
2. 在obj下执行构造函数，并传入参数，
   这个时候构造函数内的this就是obj。
3. 如果这个&#39;构造函数&#39;没有return对象格式的结果，
   返回新创建的obj。

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function() {
  console.log(this.name);
}

const xm = createNew(Person, &#39;xiaoming&#39;, 22);

</code></pre><h2 id="实现instanceof方法" tabindex="-1"><a class="header-anchor" href="#实现instanceof方法"><span>实现instanceof方法</span></a></h2><pre><code class="language-javascript">function myInstanceOf(left, right) {
  let proto=Object.getPrototypeOf(left);
  while(true) {
    if(proto==null) {
      return false;
    }
    if(left === right.prototype) {
      return true;
    }
    left =Object.getPrototypeOf(proto);
  }
}

instanceof的原理就是通过原型链查找，
所以一直向上查找左侧的隐式原型__ptoto__是否等于右侧显式原型，
原型链的尽头是null，没找到就返回false。

myInstanceOf([1,2], Array);  // true


</code></pre><h2 id="实现foreach方法" tabindex="-1"><a class="header-anchor" href="#实现foreach方法"><span>实现forEach方法</span></a></h2><pre><code class="language-javascript">Array.prototype.myForEach = function(fn) {
  const arr = this;
  for(let i = 0; i &lt; arr.length; i++) {
    fn(arr[i], i, arr);
  }
}

接受一个fn回调函数，传递给回调函数三个参数：
每项的值，下标，自身。第二个参数有人用么？

const arr = [&#39;a&#39;,&#39;b&#39;,&#39;c&#39;];
arr.myForEach(item =&gt; {
  console.log(item);  // a   b   c
})


</code></pre><h2 id="实现map函数" tabindex="-1"><a class="header-anchor" href="#实现map函数"><span>实现map函数</span></a></h2><pre><code class="language-javascript">Array.prototype.myMap = function(fn) {
  const arr = this;
  const ret = [];
  for(let i = 0; i &lt; arr.length; i++) {
    ret.push(fn(arr[i], i, arr));
  }
  return ret;
}

和forEach类似也是接受一个fn回调，
不过会将回调处理的结果放入一个新的数组，
所以map回调内的每一项需要return,
因为要组成新的数组结果。

const arr = [&#39;a&#39;, &#39;b&#39;, &#39;c&#39;];
const newArr = arr.myMap(item =&gt; {  // a1   b1   c1
  return item + 1; // 要return结果
})
//使用reduce实现
Array.prototype.myMap = function (fn) {
  return this.reduce((pre, cur, i) =&gt; {
    return [...pre, fn(cur, i, this)]
  }, [])
}


</code></pre><h2 id="实现filter方法" tabindex="-1"><a class="header-anchor" href="#实现filter方法"><span>实现filter方法</span></a></h2><pre><code class="language-javascript">Array.prototype.myFilter = function(fn) {
  const arr = this;
  const ret = [];
  for(let i = 0; i &lt; arr.length; i++) {
    if(fn(arr[i], i, arr)) {
      ret.push(arr[i]);
    }
  }
  return ret;
}

大同小异，过滤出处理条件为true的值。

返回数组中不重复的值：
function repeat(arr) {
  return arr.myFilter((v, i, a) =&gt; {
 return a.indexOf(v) === a.lastIndexOf(v);
  })
}

const arr = [1,2,3,4,1,2,3,5,6,8,3];
repeat(arr); // [4,5,6,8]


</code></pre><h2 id="实现every函数" tabindex="-1"><a class="header-anchor" href="#实现every函数"><span>实现every函数</span></a></h2><pre><code class="language-javascript">Array.prototype.myEvery = function(fn) {
  const arr = this;
  for(let i = 0; i &lt; arr.length; i++) {
    if(!fn(arr[i], i, arr)) {
      return false;
    }
  }
  return true;
}


</code></pre><h2 id="实现reduce函数" tabindex="-1"><a class="header-anchor" href="#实现reduce函数"><span>实现reduce函数</span></a></h2><pre><code class="language-javascript">Array.prototype.myReduce = function(fn, second) {
  const arr = this;
  let index = 0;
  if(typeof second === &#39;undefined&#39;) { // 没传第二个参数
    index = 1;
    second = arr[0];
  }
  for(let i = index; i &lt; arr.length; i++) {
    const invoked = fn(second, arr[i], i, arr);
    second = invoked;
  }
  return second;
}

一般会传入第二个参数作为初始值，如果没有传入，
初始值就是数组的第一项，将处理的结果进行累计，
最后返回累计的结果。

返回数组中指定参数重复的次数：
function count(arr, value) {
  return arr.myReduce((f, s) =&gt; {
    return Object.is(s, value) ? f + 1 : f + 0;
  }, 0)
}

const arr = [1,2,3,4,1,2,3,2,1];
count(arr, 2); // 3


</code></pre><h2 id="debounce-函数防抖" tabindex="-1"><a class="header-anchor" href="#debounce-函数防抖"><span>debounce: 函数防抖</span></a></h2><pre><code class="language-javascript">function debounce(fn, delay = 1000) {
  let timer;
  return () =&gt; {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() =&gt; {
      fn.apply(this, arguments);
    }, delay)
  }
}
函数防抖指的是一定时间内没有再次触发函数，就执行该函数，否则重新计时。
wow为例：
2.5s施法的寒冰箭，再读条的过程中，
你身子抖动打断了施法，想再次触发技能时麻烦您重新读条。

</code></pre><h2 id="throttle-函数节流" tabindex="-1"><a class="header-anchor" href="#throttle-函数节流"><span>throttle：函数节流</span></a></h2><pre><code class="language-javascript">function throttle(fn, delay = 100) {
  let timer;
  return () =&gt; {
    if (!timer) {
      timer = setTimeout(() =&gt; {
        fn.apply(this, arguments);
        timer = null;
      }, delay)
    }
  }
}
函数节流指的是规定某个时间内只能执行一次函数。
wow为例：
火冲为瞬发技能，不过你规定cd为8s，
所以即使8s内按了10次，也只能来1发，节省点体力吧。
</code></pre><h2 id="deepclone-深拷贝" tabindex="-1"><a class="header-anchor" href="#deepclone-深拷贝"><span>deepClone：深拷贝</span></a></h2><pre><code class="language-javascript">一般够用型
function deepClone(source) {
  if (typeof source !== &#39;object&#39; || source == null) {
    return source;
  }
  const target = Array.isArray(source) ? [] : {};
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === &#39;object&#39; &amp;&amp; source[key] !== null) {
        target[key] = deepClone(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
解决循环引用和symblo类型
function cloneDeep(source, hash = new WeakMap()) {
  if (typeof source !== &#39;object&#39; || source === null) {
    return source;
  }
  if (hash.has(source)) {
    return hash.get(source);
  }
  const ret = Array.isArray(source) ? [] : {};
  Reflect.ownKeys(source).forEach(key =&gt; {
    const val = source[key];
    if (typeof val === &#39;object&#39; &amp;&amp; val != null) {
      ret[key] = cloneDeep(val, hash);
    } else {
      ret[key] = val;
    }
  })
  return ret;
}
复制代码
</code></pre><h2 id="promise-手写简易版" tabindex="-1"><a class="header-anchor" href="#promise-手写简易版"><span>Promise：手写简易版</span></a></h2><pre><code class="language-javascript">class MyPromise {
  constructor(fn) {
    this.state = &#39;PENDING&#39;;
    this.value = null
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []
    const resolve = value =&gt; {
      if (this.state === &#39;PENDING&#39;) {
        this.state = &#39;RESOLVED&#39;
        this.value = value
        this.resolvedCallbacks.map(cb =&gt; cb())
      }
    }
    const reject = value =&gt; {
      if (this.state === &#39;PENDING&#39;) {
        this.state = &#39;REJECTED&#39;
        this.value = value
        this.rejectedCallbacks.map(cb =&gt; cb())
      }
    }
    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === &#39;function&#39; ? onFulfilled : v =&gt; v
    onRejected = typeof onRejected === &#39;function&#39; ? onRejected : r =&gt; { throw r }
    if (this.state === &#39;PENDING&#39;) {
      this.resolvedCallbacks.push(() =&gt; {
        onFulfilled(this.value) 
      })
      this.rejectedCallbacks.push(() =&gt; {
        onRejected(this.value) 
      })
    }
    if (this.state === &#39;RESOLVED&#39;) {
      onFulfilled(this.value)
    }
    if (this.state === &#39;REJECTED&#39;) {
      onRejected(this.value)
    }
  }
  
  catch(fn) {
    return this.then(null, fn);
  }
  
  static resolve(val) {
    return new MyPromise(resolve =&gt; {
      resolve(val);
    })
  }
  
  static reject(err) {
    return new MyPromise((resolve, reject) =&gt; {
      reject(err);
    })
  }
  
  static race(promises) {
    return new MyPromise((resolve, reject) =&gt; {
      for (let i = 0; i &lt; promises.length; i++) {
        promises[i].then(resolve, reject);
      }
    })
  }
  
  static all(promises) {
    const arr = [];
    let i = 0;
    function processData(index, data, resolve) {
      arr[index] = data;
      i++;
      if (i === promises.length) {
        resolve(arr);
      }
    }
    return new MyPromise((resolve, reject) =&gt; {
      for (let i = 0; i &lt; promises.length; i++) {
        promises[i].then(data =&gt; {
          processData(i, data, resolve);
        }, reject);
      }
    })
  }
}
 
</code></pre><h2 id="iterator-不使用generator函数创建迭代器" tabindex="-1"><a class="header-anchor" href="#iterator-不使用generator函数创建迭代器"><span>iterator：不使用<code>Generator</code>函数创建迭代器</span></a></h2><pre><code class="language-javascript">function myIterator(items) {
  let i = 0;
  return {
    next() {
      const done = i &gt;= items.length;
      const value = !done ? items[i++] : undefined;
      return {
        done,  // 是否全部迭代完成
        value  // 返回迭代的值
      }
    }
  }
}
const interator = myIterator([1, 2, 3]);
interator.next();
 
</code></pre><h4 id="events-事件中心管理" tabindex="-1"><a class="header-anchor" href="#events-事件中心管理"><span>Events：事件中心管理</span></a></h4><pre><code class="language-javascript">class Events {
  constructor() {
    this._evnets = Object.create(null);
  }
  
  on(event, fn) {  // 往事件中心添加事件
    if (Array.isArray(event)) {
      for (let i = 0; i &lt; event.length; i++) {
        this.on(evnet[i], fn);
      }
    } else {
      (this._evnets[event] || (this._evnets[event] = [])).push(fn);
    }
  }
  
  emit(event, ...args) {  // 触发事件中心对应事件
    const cbs = this._evnets[event];
    if (cbs) {
      for (let i = 0; i &lt; cbs.length; i++) {
        cbs[i].apply(this, args);
      }
    }
  }
  
  off(event, fn) {  // 移除事件
    if (!arguments) {
      this._evnets = Object.create(null);
      return this;
    }
    if (Array.isArray(event)) {
      for (let i = 0; i &lt; event.length; i++) {
        this.off(event[i], fn);
      }
      return this;
    }
    if (!fn) {
      this._evnets[event] = null;
      return this;
    }
    const cbs = this._evnets[event];
    let i = cbs.length;
    while (i--) {
      const cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return this;
  }
  
  once(evnet, fn) {  // 只执行一次
    function on() {
      this.off(evnet, on);
      fn.apply(this, arguments);
    }
    on.fn = fn;
    this.on(evnet, on);
    return this;
  }
}
const event = new Event();
event.on(&#39;test&#39;, (name, sex) =&gt; { // 添加事件
  console.log(\`\${name}:\${sex}\`);
})
event.emit(&#39;test&#39;, &#39;cc&#39;, &#39;man&#39;);  // 传参并触发事件
evnet.off();  // 清空所有事件
 
</code></pre><h2 id="迭代器" tabindex="-1"><a class="header-anchor" href="#迭代器"><span>迭代器</span></a></h2><pre><code class="language-javascript">const queue = []
const iterator = (hook, next) =&gt; {
  hook(route, currnet, to =&gt; {
    next(to)
  })
}
const runQueue(queue, fn, cb) {
  const step = index =&gt; {
    if (index &gt;= queue.length) {
      cb()
    } else {
      if (queue[index]) {
        fn(queue[index], () =&gt; {
          step(index + 1)
        })
      } else {
       step(index + 1)
      }
    }
  }
  step(0)
}
runQueue(queue, iterator, () =&gt; {
  onComplete()
})
复制代码
</code></pre><h2 id="setinterval-使用settimeout模拟-并随时取消" tabindex="-1"><a class="header-anchor" href="#setinterval-使用settimeout模拟-并随时取消"><span>setInterval: 使用setTimeout模拟，并随时取消</span></a></h2><pre><code class="language-javascript">function mySetInterval(fn, delay) {
  let timer;
  const loop = () =&gt; {
    timer = setTimeout(() =&gt; {
      loop();
      fn();
    }, delay);
  };
  loop();
  return () =&gt; {
    clearInterval(timer)
  }
}
const stop = mySetInterval(() =&gt; {
  console.log(&#39;test&#39;)
}, 200);
stop() // 停止
复制代码
</code></pre><h2 id="setinterval-使用requestanimationframe模拟" tabindex="-1"><a class="header-anchor" href="#setinterval-使用requestanimationframe模拟"><span>setInterval: 使用requestAnimationFrame模拟</span></a></h2><pre><code class="language-javascript">function mySetInterval(fn, interval) {
  const now = Date.now;
  let startTime = now();
  const loop = () =&gt; {
    const timer = requestAnimationFrame(loop);
    if (now() - startTime &gt;= interval) {
      startTime = now();
      fn.call(this, timer);
    }
  }
  loop();
}
一般来说是不建议使用setInterval的，
如内部函数复杂就不能保证一定在规定时间内自动执行。
一般是通过setTimeout模仿setInterval。
那为什么要实现setInterval？
因为它内部的实现是使用requestAnimationFrame实现的，
该方法自带函数节流。
如有持续的动画需要执行，
基本会保证在16.6毫秒内执行一次，
提高动画性能并延时也是精确的。
mySetInterval(timer =&gt; {
  console.log(&#39;a&#39;);
  // cancelAnimationFram(timer); 取消当前定时器
})
</code></pre>`,39),o=[s];function i(l,c){return t(),n("div",null,o)}const d=e(a,[["render",i],["__file","hands-on.html.vue"]]),u=JSON.parse('{"path":"/frontend/interview/hands-on.html","title":"前端手写代码","lang":"zh-CN","frontmatter":{"description":"前端手写代码 实现call方法 实现apply方法 实现bind方法 实现new方法 实现instanceof方法 实现forEach方法 实现map函数 实现filter方法 实现every函数 实现reduce函数 debounce: 函数防抖 throttle：函数节流 deepClone：深拷贝 Promise：手写简易版 iterator：不...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/interview/hands-on.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"前端手写代码"}],["meta",{"property":"og:description","content":"前端手写代码 实现call方法 实现apply方法 实现bind方法 实现new方法 实现instanceof方法 实现forEach方法 实现map函数 实现filter方法 实现every函数 实现reduce函数 debounce: 函数防抖 throttle：函数节流 deepClone：深拷贝 Promise：手写简易版 iterator：不..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T15:30:24.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T15:30:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"前端手写代码\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T15:30:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"实现call方法","slug":"实现call方法","link":"#实现call方法","children":[]},{"level":2,"title":"实现apply方法","slug":"实现apply方法","link":"#实现apply方法","children":[]},{"level":2,"title":"实现bind方法","slug":"实现bind方法","link":"#实现bind方法","children":[]},{"level":2,"title":"实现new方法","slug":"实现new方法","link":"#实现new方法","children":[]},{"level":2,"title":"实现instanceof方法","slug":"实现instanceof方法","link":"#实现instanceof方法","children":[]},{"level":2,"title":"实现forEach方法","slug":"实现foreach方法","link":"#实现foreach方法","children":[]},{"level":2,"title":"实现map函数","slug":"实现map函数","link":"#实现map函数","children":[]},{"level":2,"title":"实现filter方法","slug":"实现filter方法","link":"#实现filter方法","children":[]},{"level":2,"title":"实现every函数","slug":"实现every函数","link":"#实现every函数","children":[]},{"level":2,"title":"实现reduce函数","slug":"实现reduce函数","link":"#实现reduce函数","children":[]},{"level":2,"title":"debounce: 函数防抖","slug":"debounce-函数防抖","link":"#debounce-函数防抖","children":[]},{"level":2,"title":"throttle：函数节流","slug":"throttle-函数节流","link":"#throttle-函数节流","children":[]},{"level":2,"title":"deepClone：深拷贝","slug":"deepclone-深拷贝","link":"#deepclone-深拷贝","children":[]},{"level":2,"title":"Promise：手写简易版","slug":"promise-手写简易版","link":"#promise-手写简易版","children":[]},{"level":2,"title":"iterator：不使用Generator函数创建迭代器","slug":"iterator-不使用generator函数创建迭代器","link":"#iterator-不使用generator函数创建迭代器","children":[{"level":4,"title":"Events：事件中心管理","slug":"events-事件中心管理","link":"#events-事件中心管理","children":[]}]},{"level":2,"title":"迭代器","slug":"迭代器","link":"#迭代器","children":[]},{"level":2,"title":"setInterval: 使用setTimeout模拟，并随时取消","slug":"setinterval-使用settimeout模拟-并随时取消","link":"#setinterval-使用settimeout模拟-并随时取消","children":[]},{"level":2,"title":"setInterval: 使用requestAnimationFrame模拟","slug":"setinterval-使用requestanimationframe模拟","link":"#setinterval-使用requestanimationframe模拟","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1649172624000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":6.21,"words":1862},"filePathRelative":"frontend/interview/hands-on.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,u as data};
