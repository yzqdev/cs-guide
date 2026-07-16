---
order: 7
---

# 进程、环境变量与命令行

> 子进程管理、环境变量操作和命令行参数解析。

## 执行系统命令

```js
import { exec, spawn } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

// 执行命令并获取输出
export async function runCommand(command) {
  const { stdout, stderr } = await execAsync(command);
  if (stderr) console.error(stderr);
  return stdout.trim();
}

// 使用示例
// const files = await runCommand('ls -la');
// const gitLog = await runCommand('git log --oneline -5');
// const nodeVersion = await runCommand('node --version');
```

## 实时输出子进程

```js
import { spawn } from 'node:child_process';

/**
 * 运行命令并实时输出
 * @param {string} command - 命令
 * @param {string[]} args - 参数数组
 * @param {object} options - 选项
 */
export function runWithOutput(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options,
    });

    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`命令退出码: ${code}`));
    });
    proc.on('error', reject);
  });
}

// 使用示例
// await runWithOutput('npm', ['install']);
// await runWithOutput('npx', ['tsc', '--watch']);
```

## 并行执行多个命令

```js
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

/**
 * 并行执行多个命令
 * @param {string[]} commands - 命令数组
 * @param {number} concurrency - 并发数
 */
export async function runParallel(commands, concurrency = 3) {
  const results = [];
  const queue = [...commands];

  async function worker() {
    while (queue.length > 0) {
      const cmd = queue.shift();
      try {
        const { stdout } = await execAsync(cmd);
        results.push({ cmd, stdout: stdout.trim(), error: null });
      } catch (err) {
        results.push({ cmd, stdout: null, error: err.message });
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, commands.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

// 使用示例
// const results = await runParallel([
//   'echo task1',
//   'echo task2',
//   'echo task3',
// ], 2);
```

## 环境变量管理

```js
// 读取环境变量（带默认值）
export function getEnv(key, defaultValue = '') {
  return process.env[key] || defaultValue;
}

// 读取数字环境变量
export function getEnvInt(key, defaultValue = 0) {
  const value = process.env[key];
  return value ? parseInt(value, 10) : defaultValue;
}

// 读取布尔环境变量
export function getEnvBool(key, defaultValue = false) {
  const value = process.env[key]?.toLowerCase();
  if (value === 'true' || value === '1') return true;
  if (value === 'false' || value === '0') return false;
  return defaultValue;
}

// 检查环境
export function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

// 加载 .env 文件（dotenv）
// npm install dotenv
// import 'dotenv/config';
// 然后直接使用 process.env 即可
```

## 命令行参数解析

```js
// 获取命令行参数
export function getArgs() {
  return process.argv.slice(2);
}

// 解析命令行参数（简单版）
export function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};
  const positional = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const value = args[i + 1] && !args[i + 1].startsWith('-') ? args[++i] : true;
      options[key] = value;
    } else if (args[i].startsWith('-')) {
      const key = args[i].slice(1);
      const value = args[i + 1] && !args[i + 1].startsWith('-') ? args[++i] : true;
      options[key] = value;
    } else {
      positional.push(args[i]);
    }
  }

  return { options, positional };
}

// 使用示例
// node app.js --name John --age 25 input.txt output.txt
// const { options, positional } = parseArgs();
// console.log(options);       // { name: 'John', age: '25' }
// console.log(positional);    // ['input.txt', 'output.txt']
```

## 交互式命令行

```bash
npm install prompts
```

```js
import prompts from 'prompts';

export async function askQuestions() {
  const response = await prompts([
    {
      type: 'text',
      name: 'name',
      message: '你的名字是什么？',
      initial: '张三',
    },
    {
      type: 'number',
      name: 'age',
      message: '你的年龄？',
      validate: value => value < 0 ? '年龄不能为负数' : true,
    },
    {
      type: 'select',
      name: 'color',
      message: '你喜欢的颜色？',
      choices: [
        { title: '红色', value: 'red' },
        { title: '蓝色', value: 'blue' },
        { title: '绿色', value: 'green' },
      ],
    },
    {
      type: 'confirm',
      name: 'confirmed',
      message: '确认以上信息？',
    },
  ]);

  console.log('回答:', response);
}

// askQuestions();
```

## 获取系统信息

```js
import os from 'node:os';

export function getSystemInfo() {
  return {
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
    cpuCores: os.cpus().length,
    cpuModel: os.cpus()[0]?.model,
    totalMemory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
    freeMemory: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
    memoryUsage: process.memoryUsage(),
    uptime: `${Math.floor(process.uptime() / 60)} 分钟`,
    hostname: os.hostname(),
    osType: os.type(),
    osRelease: os.release(),
    homedir: os.homedir(),
    tmpdir: os.tmpdir(),
  };
}

console.table(getSystemInfo());
```