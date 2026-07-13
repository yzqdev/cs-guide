# 路径与操作系统模块

## 一、path 模块

`path` 模块用于处理和转换文件路径，可以跨平台处理路径分隔符（Windows 使用 `\`，Linux/Mac 使用 `/`）。

### 1. 路径拼接

```javascript
const path = require('path');

// join —— 拼接路径片段
const fullPath = path.join('/users', 'alice', 'docs', 'readme.md');
console.log(fullPath);
// Linux:   /users/alice/docs/readme.md
// Windows: \users\alice\docs\readme.md

// 处理 .. 和 .
console.log(path.join('/a', 'b', '..', 'c'));  // /a/c
console.log(path.join('a', 'b', '.', 'c'));    // a/b/c

// resolve —— 解析为绝对路径
console.log(path.resolve('app.js'));
// /current/working/dir/app.js

console.log(path.resolve('/etc', 'app.js'));
// /etc/app.js

console.log(path.resolve('..', 'config.json'));
// /current/working/config.json
```

### 2. 路径信息提取

```javascript
const path = require('path');

const filePath = '/users/alice/docs/readme.md';

// 获取目录名
console.log(path.dirname(filePath));
// /users/alice/docs

// 获取文件名（含扩展名）
console.log(path.basename(filePath));
// readme.md

// 获取文件名（不含扩展名）
console.log(path.basename(filePath, '.md'));
// readme

// 获取扩展名
console.log(path.extname(filePath));
// .md
```

### 3. 路径解析

```javascript
const path = require('path');

// parse —— 解析路径为对象
const parsed = path.parse('/users/alice/docs/readme.md');
console.log(parsed);
// {
//   root: '/',
//   dir: '/users/alice/docs',
//   base: 'readme.md',
//   ext: '.md',
//   name: 'readme'
// }

// format —— 将对象转换回路径
const formatted = path.format({
    root: '/',
    dir: '/users/alice/docs',
    base: 'readme.md',
});
console.log(formatted);  // /users/alice/docs/readme.md

// 相对路径计算
const from = '/data/images/2026';
const to = '/data/docs/report.pdf';
console.log(path.relative(from, to));
// ../../docs/report.pdf
```

### 4. 路径判断

```javascript
const path = require('path');

// 是否为绝对路径
console.log(path.isAbsolute('/foo/bar'));  // true
console.log(path.isAbsolute('./foo'));     // false
console.log(path.isAbsolute('C:\\foo'));   // true (Windows)

// 获取路径分隔符
console.log(path.sep);
// Linux:   /
// Windows: \

// 获取环境变量路径分隔符
console.log(path.delimiter);
// Linux:   :
// Windows: ;
```

### 5. 文件名安全处理

```javascript
const path = require('path');

// 防止目录遍历攻击（安全清理文件名）
function safeJoin(base, userInput) {
    const safePath = path.normalize(userInput).replace(/^(\.\.(\/|\\|$))+/, '');
    return path.join(base, safePath);
}

// ❌ 恶意输入
const malicious = '../../../etc/passwd';
console.log(path.join('/app/data', malicious));
// /app/etc/passwd（越权！）

// ✅ 安全处理
console.log(safeJoin('/app/data', malicious));
// /app/data/../../../etc/passwd（但需要进一步校验）

// 更好的方式：使用 path.resolve 判断是否在限定目录内
function isPathInside(target, base) {
    const resolved = path.resolve(target);
    const basePath = path.resolve(base);
    return resolved.startsWith(basePath);
}

console.log(isPathInside('/app/data/file.txt', '/app/data'));  // true
console.log(isPathInside('/etc/passwd', '/app/data'));          // false
```

## 二、os 模块

`os` 模块提供与操作系统相关的信息。

### 1. 系统信息

```javascript
const os = require('os');

// CPU 架构
console.log('CPU 架构：', os.arch());        // x64  / arm64

// 操作系统平台
console.log('平台：', os.platform());        // win32 / darwin / linux

// 操作系统类型
console.log('类型：', os.type());            // Windows_NT / Darwin / Linux

// 操作系统版本
console.log('版本：', os.release());         // 10.0.19045

// 主机名
console.log('主机名：', os.hostname());

// 系统运行时间（秒）
console.log('运行时间：', os.uptime(), '秒');

// 用户信息
console.log('用户信息：', os.userInfo());
// { uid: 501, gid: 20, username: 'alice', homedir: '/Users/alice', shell: '/bin/zsh' }
```

### 2. CPU 信息

```javascript
const os = require('os');

// CPU 核心数
console.log('CPU 核心数：', os.cpus().length);

// 每个核心的详细信息
os.cpus().forEach((cpu, index) => {
    console.log(`CPU ${index}: ${cpu.model} (${cpu.speed} MHz)`);
});

// CPU 使用率计算示例
function getCPUUsage() {
    const startMeasure = os.cpus().map(cpu => ({
        idle: cpu.times.idle,
        total: Object.values(cpu.times).reduce((a, b) => a + b),
    }));

    setTimeout(() => {
        const endMeasure = os.cpus().map(cpu => ({
            idle: cpu.times.idle,
            total: Object.values(cpu.times).reduce((a, b) => a + b),
        }));

        startMeasure.forEach((start, i) => {
            const idleDiff = endMeasure[i].idle - start.idle;
            const totalDiff = endMeasure[i].total - start.total;
            const usage = 100 - (idleDiff / totalDiff) * 100;
            console.log(`CPU ${i}: ${usage.toFixed(1)}%`);
        });
    }, 1000);
}

getCPUUsage();
```

### 3. 内存信息

```javascript
const os = require('os');

function formatBytes(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

// 总内存
console.log('总内存：', formatBytes(os.totalmem()));
// 总内存：16.00 GB

// 空闲内存
console.log('空闲内存：', formatBytes(os.freemem()));
// 空闲内存：6.32 GB

// 内存使用率
const memUsage = ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(1);
console.log(`内存使用率：${memUsage}%`);
```

### 4. 网络信息

```javascript
const os = require('os');

const interfaces = os.networkInterfaces();

for (const [name, nets] of Object.entries(interfaces)) {
    for (const net of nets) {
        // 只显示 IPv4，跳过内部地址
        if (net.family === 'IPv4' && !net.internal) {
            console.log(`${name}: ${net.address}`);
            // 例如：以太网: 192.168.1.100
            console.log(`  MAC: ${net.mac}`);
            console.log(`  子网掩码: ${net.netmask}`);
        }
    }
}
```

### 5. 其他实用信息

```javascript
const os = require('os');

// 临时目录
console.log('临时目录：', os.tmpdir());
// Windows: C:\Users\alice\AppData\Local\Temp
// Linux:   /tmp

// 主目录
console.log('主目录：', os.homedir());
// /Users/alice

// 系统内存页大小（字节）
console.log('内存页大小：', os.constants.pagesize, 'bytes');

// 查看当前进程优先级
console.log('进程优先级：', os.getPriority());

// 查看系统负载（Linux/Mac）
console.log('系统负载：', os.loadavg());
// [1.23, 0.87, 0.65] — 1/5/15 分钟平均负载
```

## 三、path 和 os 综合示例

### 示例 1：获取项目配置路径

```javascript
const path = require('path');
const os = require('os');

function getConfigPath(appName) {
    const home = os.homedir();
    const configDir = path.join(home, '.config', appName);

    // 根据平台返回不同路径
    switch (os.platform()) {
        case 'win32':
            return path.join(process.env.APPDATA, appName, 'config.json');
        case 'darwin':
            return path.join(home, 'Library', 'Application Support', appName, 'config.json');
        default:
            return path.join(configDir, 'config.json');
    }
}

console.log('配置文件路径：', getConfigPath('my-app'));
```

### 示例 2：日志文件按日期轮转

```javascript
const fs = require('fs');
const path = require('path');
const os = require('os');

class Logger {
    constructor(logDir) {
        this.logDir = logDir;
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
    }

    getLogFilePath() {
        const now = new Date();
        const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        return path.join(this.logDir, `${date}.log`);
    }

    log(level, message) {
        const timestamp = new Date().toISOString();
        const host = os.hostname();
        const line = `[${timestamp}] [${level}] [${host}] ${message}${os.EOL}`;

        fs.appendFileSync(this.getLogFilePath(), line);
    }

    info(message) { this.log('INFO', message); }
    warn(message) { this.log('WARN', message); }
    error(message) { this.log('ERROR', message); }
}

// 使用示例
const logger = new Logger('./logs');
logger.info('应用启动');
logger.warn('磁盘空间不足');
logger.error('数据库连接失败');
```

### 示例 3：系统健康检查

```javascript
const os = require('os');

function systemHealthCheck() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const memUsagePercent = ((totalMem - freeMem) / totalMem * 100).toFixed(1);

    const uptimeDays = (os.uptime() / 86400).toFixed(2);

    const cpus = os.cpus();
    const loadAvg = os.loadavg();

    return {
        status: memUsagePercent > 90 ? 'CRITICAL' : 'OK',
        hostname: os.hostname(),
        platform: `${os.type()} ${os.release()}`,
        arch: os.arch(),
        uptime: `${uptimeDays} days`,
        cpu: {
            cores: cpus.length,
            model: cpus[0]?.model,
            loadAverage: {
                '1min': loadAvg[0]?.toFixed(2),
                '5min': loadAvg[1]?.toFixed(2),
                '15min': loadAvg[2]?.toFixed(2),
            },
        },
        memory: {
            total: `${(totalMem / 1024 / 1024 / 1024).toFixed(2)} GB`,
            free: `${(freeMem / 1024 / 1024 / 1024).toFixed(2)} GB`,
            usage: `${memUsagePercent}%`,
        },
    };
}

console.log('系统健康检查：');
console.table(systemHealthCheck());
```
