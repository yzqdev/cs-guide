---
order: 9
---

# 日志、验证与错误处理

> 日志记录、数据验证和错误处理的实用代码片段。

## 简单日志工具

```js
import fs from 'node:fs';
import path from 'node:path';

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

class Logger {
  constructor(options = {}) {
    this.level = options.level ?? 'INFO';
    this.logDir = options.logDir ?? './logs';
    this.consoleOutput = options.consoleOutput ?? true;

    if (this.logDir && !fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  formatMessage(level, message, meta) {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.padEnd(5)}] ${message}${metaStr}`;
  }

  log(level, message, meta) {
    const levelNum = LOG_LEVELS[level] ?? 1;
    if (levelNum < LOG_LEVELS[this.level]) return;

    const formatted = this.formatMessage(level, message, meta);

    if (this.consoleOutput) {
      const colors = { DEBUG: '\x1b[90m', INFO: '\x1b[36m', WARN: '\x1b[33m', ERROR: '\x1b[31m' };
      console.log(`${colors[level] ?? ''}${formatted}\x1b[0m`);
    }

    if (this.logDir) {
      const date = new Date().toISOString().slice(0, 10);
      fs.appendFileSync(path.join(this.logDir, `${date}.log`), formatted + '\n');
    }
  }

  debug(message, meta) { this.log('DEBUG', message, meta); }
  info(message, meta) { this.log('INFO', message, meta); }
  warn(message, meta) { this.log('WARN', message, meta); }
  error(message, meta) { this.log('ERROR', message, meta); }
}

// 使用示例
// const logger = new Logger({ level: 'DEBUG', logDir: './logs' });
// logger.info('服务器已启动', { port: 3000 });
// logger.error('数据库连接失败', { db: 'main', error: 'timeout' });
```

## 数据验证

```js
/**
 * 验证邮箱格式
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * 验证手机号（中国大陆）
 */
export function isValidPhone(phone) {
  return /^1[3-9]\d{9}$/.test(phone);
}

/**
 * 验证 URL
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 验证密码强度
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePassword(password) {
  if (password.length < 8) return { valid: false, message: '密码至少8位' };
  if (!/[A-Z]/.test(password)) return { valid: false, message: '密码需包含大写字母' };
  if (!/[a-z]/.test(password)) return { valid: false, message: '密码需包含小写字母' };
  if (!/[0-9]/.test(password)) return { valid: false, message: '密码需包含数字' };
  return { valid: true, message: '密码强度合格' };
}

/**
 * 验证是否为合法 JSON 字符串
 */
export function isValidJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

// 使用示例
console.log(isValidEmail('test@example.com'));  // true
console.log(isValidPhone('13800138000'));       // true
console.log(validatePassword('Abc12345'));      // { valid: true, ... }
```

## 对象验证器

```js
/**
 * 简单的对象验证器
 * @param {object} obj - 要验证的对象
 * @param {object} rules - 验证规则
 * @returns {{ valid: boolean, errors: object }}
 */
export function validate(obj, rules) {
  const errors = {};

  Object.entries(rules).forEach(([field, fieldRules]) => {
    const value = obj[field];
    const fieldErrors = [];

    fieldRules.forEach(rule => {
      if (rule.required && (value === undefined || value === null || value === '')) {
        fieldErrors.push(rule.message || `${field} 是必填项`);
      }
      if (value !== undefined && value !== null && value !== '') {
        if (rule.type === 'string' && typeof value !== 'string') {
          fieldErrors.push(rule.message || `${field} 必须是字符串`);
        }
        if (rule.type === 'number' && typeof value !== 'number') {
          fieldErrors.push(rule.message || `${field} 必须是数字`);
        }
        if (rule.minLength && value.length < rule.minLength) {
          fieldErrors.push(rule.message || `${field} 至少 ${rule.minLength} 个字符`);
        }
        if (rule.maxLength && value.length > rule.maxLength) {
          fieldErrors.push(rule.message || `${field} 最多 ${rule.maxLength} 个字符`);
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          fieldErrors.push(rule.message || `${field} 格式不正确`);
        }
        if (rule.custom && !rule.custom(value)) {
          fieldErrors.push(rule.message || `${field} 验证失败`);
        }
      }
    });

    if (fieldErrors.length) errors[field] = fieldErrors;
  });

  return { valid: Object.keys(errors).length === 0, errors };
}

// 使用示例
const user = { name: '张三', email: 'invalid-email' };
const result = validate(user, {
  name: [
    { required: true, message: '用户名不能为空' },
    { minLength: 2, message: '用户名至少2个字符' },
    { maxLength: 50, message: '用户名最多50个字符' },
  ],
  email: [
    { required: true, message: '邮箱不能为空' },
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '邮箱格式不正确',
    },
  ],
  age: [
    { type: 'number', message: '年龄必须是数字' },
  ],
});

console.log(result);
// { valid: false, errors: { email: ['邮箱格式不正确'], age: ['年龄必须是数字'] } }
```

## 错误处理包装

```js
/**
 * 包装异步函数，自动捕获错误
 * @param {function} fn - 异步函数
 * @returns {function} 包装后的函数
 */
export function wrapAsync(fn) {
  return async function (...args) {
    try {
      return await fn(...args);
    } catch (err) {
      console.error(`[${fn.name || 'anonymous'}] 错误:`, err.message);
      throw err;
    }
  };
}

/**
 * 安全的异步执行，返回 [data, error]
 * @param {Promise} promise
 * @returns {Promise<[any, null]|[null, Error]>}
 */
export async function safeAsync(promise) {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}

// 使用示例
const [data, error] = await safeAsync(fetchJson('https://api.example.com'));
if (error) {
  console.error('请求失败:', error.message);
} else {
  console.log('数据:', data);
}
```

## 重试机制

```js
/**
 * 带重试的异步操作
 * @param {function} fn - 异步函数
 * @param {object} options - 配置
 * @param {number} options.retries - 最大重试次数
 * @param {number} options.delay - 初始延迟（毫秒）
 * @param {boolean} options.exponentialBackoff - 是否指数退避
 */
export async function retry(fn, options = {}) {
  const { retries = 3, delay = 1000, exponentialBackoff = true } = options;
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < retries - 1) {
        const waitTime = exponentialBackoff ? delay * Math.pow(2, i) : delay;
        console.log(`第 ${i + 1} 次重试 (${waitTime}ms 后)...`);
        await new Promise(r => setTimeout(r, waitTime));
      }
    }
  }

  throw lastError;
}

// 使用示例
// const data = await retry(
//   () => fetchJson('https://api.example.com/data'),
//   { retries: 5, delay: 1000, exponentialBackoff: true }
// );
```

## 配置加载

```js
import fs from 'node:fs';
import path from 'node:path';

/**
 * 加载配置文件（支持 JSON 和 JS）
 * 按环境加载: config.default.json + config.{env}.json 合并
 */
export function loadConfig(name = 'config') {
  const env = process.env.NODE_ENV || 'development';
  const basePath = path.resolve(process.cwd(), `${name}.default.json`);
  const envPath = path.resolve(process.cwd(), `${name}.${env}.json`);
  const localPath = path.resolve(process.cwd(), `${name}.local.json`);

  let config = {};

  // 基础配置
  if (fs.existsSync(basePath)) {
    config = { ...config, ...JSON.parse(fs.readFileSync(basePath, 'utf-8')) };
  }

  // 环境配置（覆盖基础配置）
  if (fs.existsSync(envPath)) {
    config = { ...config, ...JSON.parse(fs.readFileSync(envPath, 'utf-8')) };
  }

  // 本地配置（最高优先级，不提交到 git）
  if (fs.existsSync(localPath)) {
    config = { ...config, ...JSON.parse(fs.readFileSync(localPath, 'utf-8')) };
  }

  return config;
}

// 使用示例
// const config = loadConfig('app');
// console.log(config.port, config.database);
```

## 测量代码执行时间

```js
/**
 * 测量异步函数执行时间
 * @param {function} fn - 要测量的函数
 * @param {string} label - 标签
 */
export async function measureTime(fn, label = '执行时间') {
  const start = process.hrtime.bigint();
  const result = await fn();
  const end = process.hrtime.bigint();
  const duration = Number(end - start) / 1e6; // 转换为毫秒
  console.log(`${label}: ${duration.toFixed(2)}ms`);
  return result;
}

// 使用示例
// const data = await measureTime(
//   () => fetchJson('https://api.github.com/users/octocat'),
//   'GitHub API 请求'
// );
```