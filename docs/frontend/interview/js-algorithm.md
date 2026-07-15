# JavaScript 算法题

前端面试常考的 JavaScript 算法题和数据结构。

## 字符串

### 统计字符串中出现频率最高的字符

```javascript
function maxChar(str) {
  const map = {};
  let max = 0, char = '';
  for (const c of str) {
    map[c] = (map[c] || 0) + 1;
    if (map[c] > max) {
      max = map[c];
      char = c;
    }
  }
  return char;
}
console.log(maxChar("asdfghjklaqwertyuiopiaia")); // a
```

### 回文字符串判断

```javascript
function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}

// 不使用 reverse
function isPalindrome(str) {
  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}
```

### 翻转字符串

```javascript
function reverseString(str) {
  return [...str].reverse().join('');
}

// 不使用内置方法
function reverseString(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}
```

### 字符串中第一个不重复的字符

```javascript
function firstUniqueChar(str) {
  const map = {};
  for (const c of str) {
    map[c] = (map[c] || 0) + 1;
  }
  for (const c of str) {
    if (map[c] === 1) return c;
  }
  return null;
}
console.log(firstUniqueChar("aabccdeff")); // d
```

### 判断两个字符串是否为变位词

```javascript
function isAnagram(s1, s2) {
  if (s1.length !== s2.length) return false;
  const sort = str => str.split('').sort().join('');
  return sort(s1) === sort(s2);
}

// 更高效的方式
function isAnagram(s1, s2) {
  if (s1.length !== s2.length) return false;
  const map = {};
  for (const c of s1) map[c] = (map[c] || 0) + 1;
  for (const c of s2) {
    if (!map[c]) return false;
    map[c]--;
  }
  return true;
}
```

---

## 数组

### 数组去重

```javascript
// Set（最简洁）
const unique = arr => [...new Set(arr)];

// filter + indexOf
const unique = arr => arr.filter((item, index) => arr.indexOf(item) === index);

// reduce
const unique = arr => arr.reduce((acc, item) => {
  if (!acc.includes(item)) acc.push(item);
  return acc;
}, []);
```

### 扁平化数组（flat）

```javascript
// 递归实现
function flatten(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

// 迭代实现
function flatten(arr) {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }
  return result;
}

console.log(flatten([1, [2, [3, [4]]]])); // [1, 2, 3, 4]
```

### 数组分块

```javascript
function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1, 2], [3, 4], [5]]
```

### 数组中最大差值

```javascript
function maxDifference(arr) {
  let min = arr[0], max = 0;
  for (const val of arr) {
    if (val < min) min = val;
    const diff = val - min;
    if (diff > max) max = diff;
  }
  return max;
}

console.log(maxDifference([23, 4, 5, 2, 4, 5, 6, 6, 71, -3])); // 74
```

### 两个数组的交集

```javascript
function intersection(arr1, arr2) {
  const set = new Set(arr2);
  return arr1.filter(item => set.has(item));
}
```

### 两个数组的差集

```javascript
function difference(arr1, arr2) {
  const set = new Set(arr2);
  return arr1.filter(item => !set.has(item));
}
```

### 数组中超过一半的元素

```javascript
function majorityElement(arr) {
  let count = 0, candidate = null;
  for (const num of arr) {
    if (count === 0) candidate = num;
    count += num === candidate ? 1 : -1;
  }
  return candidate;
}
```

---

## 数字与数学

### 斐波那契数列

```javascript
// 递归（慢）
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

// 迭代（快）
function fib(n) {
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}
```

### 阶乘

```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// 迭代
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
```

### 判断素数

```javascript
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
```

### 不借助临时变量交换两个整数

```javascript
// 解构赋值
let a = 2, b = 3;
[b, a] = [a, b];

// 异或
a ^= b; b ^= a; a ^= b;

// 加减
b = b - a; a = a + b; b = a - b;
```

---

## 排序

### 冒泡排序

```javascript
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

### 选择排序

```javascript
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}
```

### 快速排序

```javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), ...middle, ...quickSort(right)];
}
```

### 归并排序

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i), right.slice(j));
}
```

---

## 栈与队列

### 用两个栈实现队列

```javascript
class MyQueue {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  push(x) {
    this.stack1.push(x);
  }
  pop() {
    if (!this.stack2.length) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2.pop();
  }
  peek() {
    if (!this.stack2.length) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2[this.stack2.length - 1];
  }
}
```

### 有效的括号

```javascript
function isValid(s) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };
  for (const c of s) {
    if (c in map) {
      if (stack.pop() !== map[c]) return false;
    } else {
      stack.push(c);
    }
  }
  return stack.length === 0;
}

console.log(isValid("()[]{}")); // true
console.log(isValid("(]"));     // false
```

---

## 动态规划

### 爬楼梯

```javascript
function climbStairs(n) {
  if (n <= 2) return n;
  let prev = 1, curr = 2;
  for (let i = 3; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}
```

### 最大子数组和

```javascript
function maxSubArray(nums) {
  let max = nums[0], cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    max = Math.max(max, cur);
  }
  return max;
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6
```

### 零钱兑换

```javascript
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

---

## 其他

### 数组分组求和

```javascript
function groupByKey(arr, key) {
  return arr.reduce((acc, item) => {
    const groupKey = item[key];
    acc[groupKey] = acc[groupKey] || [];
    acc[groupKey].push(item);
    return acc;
  }, {});
}

const data = [
  { shopId: 1, name: 'A', money: 10 },
  { shopId: 2, name: 'B', money: 20 },
  { shopId: 1, name: 'C', money: 30 },
];
const grouped = groupByKey(data, 'shopId');
// { 1: [{shopId:1,...}, {shopId:1,...}], 2: [{shopId:2,...}] }
```

### LRU 缓存

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}
```

### 实现简单的模板字符串解析

```javascript
function render(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });
}

console.log(render("Hello {{name}}, you are {{age}}", { name: "Tom", age: 18 }));
// Hello Tom, you are 18
```
