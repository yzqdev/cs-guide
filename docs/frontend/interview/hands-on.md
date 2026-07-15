# 手写 JavaScript 代码

前端面试高频手写题，覆盖基础 API、设计模式、异步等方向。

## 实现 call 方法

```javascript
Function.prototype.myCall = function (context, ...args) {
  if (context === null || context === undefined) {
    context = window;
  } else {
    context = Object(context);
  }
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
```

## 实现 apply 方法

```javascript
Function.prototype.myApply = function (context, args = []) {
  if (context === null || context === undefined) {
    context = window;
  } else {
    context = Object(context);
  }
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
```

## 实现 bind 方法

```javascript
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  const boundFn = function (...newArgs) {
    return fn.call(
      this instanceof boundFn ? this : context,
      ...args,
      ...newArgs
    );
  };
  boundFn.prototype = Object.create(fn.prototype);
  return boundFn;
};
```

## 实现 new 操作符

```javascript
function createNew(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype);
  const ret = Ctor.apply(obj, args);
  return ret instanceof Object ? ret : obj;
}
```

## 实现 instanceof

```javascript
function myInstanceOf(left, right) {
  let proto = Object.getPrototypeOf(left);
  while (proto !== null) {
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
```

## 实现 Object.create

```javascript
function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}
```

---

## 数组方法

### 实现 forEach

```javascript
Array.prototype.myForEach = function (fn) {
  for (let i = 0; i < this.length; i++) {
    fn(this[i], i, this);
  }
};
```

### 实现 map

```javascript
Array.prototype.myMap = function (fn) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(fn(this[i], i, this));
  }
  return result;
};

// 用 reduce 实现
Array.prototype.myMap = function (fn) {
  return this.reduce((acc, cur, i) => [...acc, fn(cur, i, this)], []);
};
```

### 实现 filter

```javascript
Array.prototype.myFilter = function (fn) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) result.push(this[i]);
  }
  return result;
};
```

### 实现 reduce

```javascript
Array.prototype.myReduce = function (fn, initialValue) {
  let acc = initialValue !== undefined ? initialValue : this[0];
  const startIndex = initialValue !== undefined ? 0 : 1;
  for (let i = startIndex; i < this.length; i++) {
    acc = fn(acc, this[i], i, this);
  }
  return acc;
};
```

### 实现 flat

```javascript
Array.prototype.myFlat = function (depth = 1) {
  return depth > 0
    ? this.reduce((acc, cur) =>
        acc.concat(Array.isArray(cur) ? cur.myFlat(depth - 1) : cur), [])
    : this.slice();
};
```

---

## 异步与并发

### 防抖 debounce

```javascript
function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

### 节流 throttle

```javascript
function throttle(fn, interval = 300) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}

// 时间戳 + 定时器版本（保证最后一次也执行）
function throttle(fn, interval = 300) {
  let timer = null, last = 0;
  return function (...args) {
    const now = Date.now();
    const remaining = interval - (now - last);
    clearTimeout(timer);
    if (remaining <= 0) {
      last = now;
      fn.apply(this, args);
    } else {
      timer = setTimeout(() => {
        last = Date.now();
        fn.apply(this, args);
      }, remaining);
    }
  };
}
```

### Promise.all

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let count = 0;
    if (!promises.length) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p).then(res => {
        results[i] = res;
        count++;
        if (count === promises.length) resolve(results);
      }, reject);
    });
  });
}
```

### Promise.race

```javascript
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p).then(resolve, reject);
    });
  });
}
```

### Promise.allSettled

```javascript
function promiseAllSettled(promises) {
  return new Promise(resolve => {
    const results = [];
    let count = 0;
    if (!promises.length) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p).then(
        val => { results[i] = { status: 'fulfilled', value: val }; },
        err => { results[i] = { status: 'rejected', reason: err }; }
      ).finally(() => {
        count++;
        if (count === promises.length) resolve(results);
      });
    });
  });
}
```

### Promise.any

```javascript
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let count = 0;
    if (!promises.length) return reject(new AggregateError([], 'All promises were rejected'));
    promises.forEach((p, i) => {
      Promise.resolve(p).then(resolve, err => {
        errors[i] = err;
        count++;
        if (count === promises.length) reject(new AggregateError(errors, 'All promises were rejected'));
      });
    });
  });
}
```

### 并发控制

```javascript
async function asyncPool(limit, tasks, iteratorFn) {
  const results = [];
  const executing = new Set();

  for (const [index, task] of tasks.entries()) {
    const p = Promise.resolve().then(() => iteratorFn(task, index));
    results.push(p);
    executing.add(p);

    const clean = () => executing.delete(p);
    p.then(clean, clean);

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}
```

### 发布订阅模式

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, fn) {
    (this.events[event] = this.events[event] || []).push(fn);
    return this;
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach(fn => fn.apply(this, args));
    return this;
  }
  off(event, fn) {
    if (!fn) {
      this.events[event] = [];
    } else {
      this.events[event] = (this.events[event] || []).filter(f => f !== fn);
    }
    return this;
  }
  once(event, fn) {
    const onceFn = (...args) => {
      fn.apply(this, args);
      this.off(event, onceFn);
    };
    this.on(event, onceFn);
    return this;
  }
}
```

---

## 深拷贝

```javascript
// 基础版
function deepClone(source) {
  if (typeof source !== 'object' || source === null) return source;
  const target = Array.isArray(source) ? [] : {};
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = typeof source[key] === 'object' && source[key] !== null
        ? deepClone(source[key])
        : source[key];
    }
  }
  return target;
}

// 完整版（处理循环引用、Symbol、Date、RegExp）
function deepClone(source, hash = new WeakMap()) {
  if (source === null || typeof source !== 'object') return source;
  if (source instanceof Date) return new Date(source);
  if (source instanceof RegExp) return new RegExp(source);
  if (hash.has(source)) return hash.get(source);

  const target = Array.isArray(source) ? [] : {};
  hash.set(source, target);

  const keys = [...Object.keys(source), ...Object.getOwnPropertySymbols(source)];
  for (const key of keys) {
    target[key] = deepClone(source[key], hash);
  }
  return target;
}
```

## 深合并

```javascript
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object') {
      if (!target[key]) target[key] = Array.isArray(source[key]) ? [] : {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
```

---

## 柯里化

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

// 使用
const add = curry((a, b, c) => a + b + c);
add(1)(2)(3);    // 6
add(1, 2)(3);    // 6
add(1)(2, 3);    // 6
```

## 组合函数

```javascript
function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

// 从左到右
function pipe(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}
```

## 延迟执行 / 异步串行

```javascript
// 按顺序执行 Promise 数组
function serial(tasks) {
  return tasks.reduce((prev, cur) => prev.then(cur), Promise.resolve());
}
```

---

## 使用 setTimeout 模拟 setInterval

```javascript
function mySetInterval(fn, delay) {
  let timer;
  const loop = () => {
    timer = setTimeout(() => {
      fn();
      loop();
    }, delay);
  };
  loop();
  return () => clearTimeout(timer);
}
```

## 使用 requestAnimationFrame 模拟

```javascript
function mySetInterval(fn, interval) {
  let start = Date.now();
  const loop = () => {
    const timer = requestAnimationFrame(loop);
    if (Date.now() - start >= interval) {
      start = Date.now();
      fn(timer);
    }
  };
  loop();
}
```

---

## 迭代器协议

```javascript
function createIterator(items) {
  let i = 0;
  return {
    next() {
      const done = i >= items.length;
      return { done, value: done ? undefined : items[i++] };
    },
    [Symbol.iterator]() {
      return this;
    }
  };
}
```

## 生成器模拟异步

```javascript
function* fetchGenerator() {
  const data1 = yield fetch('/api/1').then(r => r.json());
  const data2 = yield fetch('/api/2').then(r => r.json());
  return [data1, data2];
}

function runGenerator(gen) {
  const g = gen();
  function step(value) {
    const result = g.next(value);
    if (result.done) return Promise.resolve(result.value);
    return Promise.resolve(result.value).then(val => step(val));
  }
  return step();
}
```
