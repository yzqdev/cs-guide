# 前端手写代码

## 实现call方法

```javascript
Function.prototype.myCall = function(context, ...args) {
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

getMessage.myCall(obj, 'name'); 

立即执行getMessage方法，不过是以obj.getMessage的方式，
所以这个时候getMessage内的this是obj，传入参数'name'。
（obj可能压根就没有getMessage方法）
```

## 实现apply方法

```javascript
Function.prototype.myApply = function(context, args) {
  context.fn = this;
  const result = context.fn(args);
  delete context.fn;
  return result;
}

getMessage.myApply(obj, ['name']); 
```

## 实现bind方法

```javascript
Function.prototype.myBind = function(context, ...args) {
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
 

```

## 实现new方法

```javascript
function createNew(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype);
  const ret = Ctor.apply(obj, args);
  return ret instanceof Object ? ret : obj;
}

1. 将构造函数的原型赋值给新建的obj的隐式原型__proto__。
2. 在obj下执行构造函数，并传入参数，
   这个时候构造函数内的this就是obj。
3. 如果这个'构造函数'没有return对象格式的结果，
   返回新创建的obj。

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function() {
  console.log(this.name);
}

const xm = createNew(Person, 'xiaoming', 22);

```

## 实现instanceof方法

```javascript
function myInstanceOf(left, right) {
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


```

## 实现forEach方法

```javascript
Array.prototype.myForEach = function(fn) {
  const arr = this;
  for(let i = 0; i < arr.length; i++) {
    fn(arr[i], i, arr);
  }
}

接受一个fn回调函数，传递给回调函数三个参数：
每项的值，下标，自身。第二个参数有人用么？

const arr = ['a','b','c'];
arr.myForEach(item => {
  console.log(item);  // a   b   c
})


```

## 实现map函数

```javascript
Array.prototype.myMap = function(fn) {
  const arr = this;
  const ret = [];
  for(let i = 0; i < arr.length; i++) {
    ret.push(fn(arr[i], i, arr));
  }
  return ret;
}

和forEach类似也是接受一个fn回调，
不过会将回调处理的结果放入一个新的数组，
所以map回调内的每一项需要return,
因为要组成新的数组结果。

const arr = ['a', 'b', 'c'];
const newArr = arr.myMap(item => {  // a1   b1   c1
  return item + 1; // 要return结果
})
//使用reduce实现
Array.prototype.myMap = function (fn) {
  return this.reduce((pre, cur, i) => {
    return [...pre, fn(cur, i, this)]
  }, [])
}


```

## 实现filter方法

```javascript
Array.prototype.myFilter = function(fn) {
  const arr = this;
  const ret = [];
  for(let i = 0; i < arr.length; i++) {
    if(fn(arr[i], i, arr)) {
      ret.push(arr[i]);
    }
  }
  return ret;
}

大同小异，过滤出处理条件为true的值。

返回数组中不重复的值：
function repeat(arr) {
  return arr.myFilter((v, i, a) => {
 return a.indexOf(v) === a.lastIndexOf(v);
  })
}

const arr = [1,2,3,4,1,2,3,5,6,8,3];
repeat(arr); // [4,5,6,8]


```

## 实现every函数

```javascript
Array.prototype.myEvery = function(fn) {
  const arr = this;
  for(let i = 0; i < arr.length; i++) {
    if(!fn(arr[i], i, arr)) {
      return false;
    }
  }
  return true;
}


```

## 实现reduce函数

```javascript
Array.prototype.myReduce = function(fn, second) {
  const arr = this;
  let index = 0;
  if(typeof second === 'undefined') { // 没传第二个参数
    index = 1;
    second = arr[0];
  }
  for(let i = index; i < arr.length; i++) {
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
  return arr.myReduce((f, s) => {
    return Object.is(s, value) ? f + 1 : f + 0;
  }, 0)
}

const arr = [1,2,3,4,1,2,3,2,1];
count(arr, 2); // 3


```

## debounce: 函数防抖

```javascript
function debounce(fn, delay = 1000) {
  let timer;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay)
  }
}
函数防抖指的是一定时间内没有再次触发函数，就执行该函数，否则重新计时。
wow为例：
2.5s施法的寒冰箭，再读条的过程中，
你身子抖动打断了施法，想再次触发技能时麻烦您重新读条。

```

## throttle：函数节流

```javascript
function throttle(fn, delay = 100) {
  let timer;
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
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
```

## deepClone：深拷贝

```javascript
一般够用型
function deepClone(source) {
  if (typeof source !== 'object' || source == null) {
    return source;
  }
  const target = Array.isArray(source) ? [] : {};
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
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
  if (typeof source !== 'object' || source === null) {
    return source;
  }
  if (hash.has(source)) {
    return hash.get(source);
  }
  const ret = Array.isArray(source) ? [] : {};
  Reflect.ownKeys(source).forEach(key => {
    const val = source[key];
    if (typeof val === 'object' && val != null) {
      ret[key] = cloneDeep(val, hash);
    } else {
      ret[key] = val;
    }
  })
  return ret;
}
复制代码
```

## Promise：手写简易版

```javascript
class MyPromise {
  constructor(fn) {
    this.state = 'PENDING';
    this.value = null
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []
    const resolve = value => {
      if (this.state === 'PENDING') {
        this.state = 'RESOLVED'
        this.value = value
        this.resolvedCallbacks.map(cb => cb())
      }
    }
    const reject = value => {
      if (this.state === 'PENDING') {
        this.state = 'REJECTED'
        this.value = value
        this.rejectedCallbacks.map(cb => cb())
      }
    }
    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r }
    if (this.state === 'PENDING') {
      this.resolvedCallbacks.push(() => {
        onFulfilled(this.value) 
      })
      this.rejectedCallbacks.push(() => {
        onRejected(this.value) 
      })
    }
    if (this.state === 'RESOLVED') {
      onFulfilled(this.value)
    }
    if (this.state === 'REJECTED') {
      onRejected(this.value)
    }
  }
  
  catch(fn) {
    return this.then(null, fn);
  }
  
  static resolve(val) {
    return new MyPromise(resolve => {
      resolve(val);
    })
  }
  
  static reject(err) {
    return new MyPromise((resolve, reject) => {
      reject(err);
    })
  }
  
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
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
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(data => {
          processData(i, data, resolve);
        }, reject);
      }
    })
  }
}
 
```

## iterator：不使用`Generator`函数创建迭代器

```javascript
function myIterator(items) {
  let i = 0;
  return {
    next() {
      const done = i >= items.length;
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
 
```

#### Events：事件中心管理

```javascript
class Events {
  constructor() {
    this._evnets = Object.create(null);
  }
  
  on(event, fn) {  // 往事件中心添加事件
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        this.on(evnet[i], fn);
      }
    } else {
      (this._evnets[event] || (this._evnets[event] = [])).push(fn);
    }
  }
  
  emit(event, ...args) {  // 触发事件中心对应事件
    const cbs = this._evnets[event];
    if (cbs) {
      for (let i = 0; i < cbs.length; i++) {
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
      for (let i = 0; i < event.length; i++) {
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
event.on('test', (name, sex) => { // 添加事件
  console.log(`${name}:${sex}`);
})
event.emit('test', 'cc', 'man');  // 传参并触发事件
evnet.off();  // 清空所有事件
 
```

## 迭代器

```javascript
const queue = []
const iterator = (hook, next) => {
  hook(route, currnet, to => {
    next(to)
  })
}
const runQueue(queue, fn, cb) {
  const step = index => {
    if (index >= queue.length) {
      cb()
    } else {
      if (queue[index]) {
        fn(queue[index], () => {
          step(index + 1)
        })
      } else {
       step(index + 1)
      }
    }
  }
  step(0)
}
runQueue(queue, iterator, () => {
  onComplete()
})
复制代码
```

## setInterval: 使用setTimeout模拟，并随时取消

```javascript
function mySetInterval(fn, delay) {
  let timer;
  const loop = () => {
    timer = setTimeout(() => {
      loop();
      fn();
    }, delay);
  };
  loop();
  return () => {
    clearInterval(timer)
  }
}
const stop = mySetInterval(() => {
  console.log('test')
}, 200);
stop() // 停止
复制代码
```

## setInterval: 使用requestAnimationFrame模拟

```javascript
function mySetInterval(fn, interval) {
  const now = Date.now;
  let startTime = now();
  const loop = () => {
    const timer = requestAnimationFrame(loop);
    if (now() - startTime >= interval) {
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
mySetInterval(timer => {
  console.log('a');
  // cancelAnimationFram(timer); 取消当前定时器
})
```
