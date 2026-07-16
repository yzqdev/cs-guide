---
order: 8
---

# 日期、JSON 与 CSV 处理

> 日期格式化、JSON 操作和 CSV 解析的实用代码片段。

## 日期格式化

```js
/**
 * 格式化日期
 * @param {Date|string|number} date - 日期对象或时间戳
 * @param {string} format - 格式模板 (YYYY-MM-DD HH:mm:ss)
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
  const d = new Date(date);
  const map = {
    'YYYY': d.getFullYear(),
    'MM': String(d.getMonth() + 1).padStart(2, '0'),
    'DD': String(d.getDate()).padStart(2, '0'),
    'HH': String(d.getHours()).padStart(2, '0'),
    'mm': String(d.getMinutes()).padStart(2, '0'),
    'ss': String(d.getSeconds()).padStart(2, '0'),
    'ms': String(d.getMilliseconds()).padStart(3, '0'),
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss|ms/g, match => map[match]);
}

// 使用示例
console.log(formatDate());                          // 2026-07-16 12:00:00
console.log(formatDate(new Date(), 'YYYY年MM月DD日')); // 2026年07月16日
console.log(formatDate(Date.now(), 'YYYY-MM-DD'));   // 2026-07-16
```

## 日期计算

```js
/**
 * 日期加减
 * @param {Date} date - 起始日期
 * @param {number} days - 天数（负数表示减）
 * @returns {Date}
 */
export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function addYears(date, years) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

// 获取日期差（天）
export function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24));
}

// 判断是否为同一天
export function isSameDay(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate();
}

// 获取当前时间戳（秒）
export function unixTimestamp() {
  return Math.floor(Date.now() / 1000);
}

// 使用示例
console.log(addDays(new Date(), 7));   // 7天后
console.log(daysBetween('2026-01-01', '2026-12-31'));  // 364
console.log(unixTimestamp());  // 当前 Unix 时间戳
```

## 相对时间

```js
/**
 * 将时间戳转换为"刚刚、N分钟前"等格式
 * @param {Date|string|number} date
 * @returns {string}
 */
export function timeAgo(date) {
  const now = Date.now();
  const diff = now - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) return '刚刚';
  if (minutes < 60) return `${minutes} 分钟前`;
  if (hours < 24) return `${hours} 小时前`;
  if (days < 30) return `${days} 天前`;
  if (months < 12) return `${months} 个月前`;
  return `${years} 年前`;
}

console.log(timeAgo(Date.now() - 300000));  // 5 分钟前
```

## JSON 深拷贝

```js
/**
 * 深拷贝对象/数组
 * 注意：无法复制函数、undefined、Symbol、循环引用
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 安全的深拷贝（支持函数、循环引用）
 */
export function deepCloneSafe(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (hash.has(obj)) return hash.get(obj);

  const clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone);

  for (const key of Object.keys(obj)) {
    clone[key] = deepCloneSafe(obj[key], hash);
  }
  return clone;
}
```

## JSON 操作工具

```js
// 安全解析 JSON（不会抛出异常）
export function safeJsonParse(str, defaultVal = null) {
  try {
    return JSON.parse(str);
  } catch {
    return defaultVal;
  }
}

// 格式化 JSON
export function prettyJson(obj, indent = 2) {
  return JSON.stringify(obj, null, indent);
}

// 从对象中挑选指定字段
export function pick(obj, keys) {
  return keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {});
}

// 排除指定字段
export function omit(obj, keys) {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
}

// 使用示例
const user = { id: 1, name: '张三', password: '123456', email: 'test@test.com' };
console.log(pick(user, ['id', 'name']));       // { id: 1, name: '张三' }
console.log(omit(user, ['password']));          // { id: 1, name: '张三', email: '...' }
```

## CSV 解析与生成

```js
import fs from 'node:fs';

/**
 * 解析 CSV 字符串
 * @param {string} csv - CSV 内容
 * @param {boolean} hasHeader - 是否有表头
 * @returns {object[]|string[][]}
 */
export function parseCsv(csv, hasHeader = true) {
  const lines = csv.trim().split('\n');
  const data = lines.map(line => {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  });

  if (!hasHeader) return data;

  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });
}

/**
 * 生成 CSV
 * @param {object[]} data - 数据数组
 * @returns {string} CSV 字符串
 */
export function toCsv(data) {
  if (!data.length) return '';
  const headers = Object.keys(data[0]);
  const lines = [headers.join(',')];

  data.forEach(row => {
    const values = headers.map(h => {
      const val = String(row[h] ?? '');
      return val.includes(',') || val.includes('"') ? `"${val}"` : val;
    });
    lines.push(values.join(','));
  });

  return lines.join('\n');
}

// 使用示例
// const csv = 'name,age\n张三,25\n李四,30';
// const parsed = parseCsv(csv);  // [{ name: '张三', age: '25' }, ...]
// const csvStr = toCsv([{ name: '张三', age: 25 }]);
// fs.writeFileSync('output.csv', csvStr);
```

## 节流与防抖

```js
/**
 * 防抖（debounce）：连续触发时只执行最后一次
 * @param {function} fn - 要执行的函数
 * @param {number} delay - 延迟（毫秒）
 */
export function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * 节流（throttle）：固定时间间隔内只执行一次
 * @param {function} fn - 要执行的函数
 * @param {number} interval - 间隔（毫秒）
 */
export function throttle(fn, interval = 300) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}
```