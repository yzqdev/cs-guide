# Buffer 与 Stream

## 一、Buffer（缓冲区）

Buffer 用于处理二进制数据流。由于 JavaScript 最初没有操作二进制数据的机制，Node.js 引入了 Buffer。

### 1. 创建 Buffer

```javascript
// 创建指定长度的 Buffer（填充 0）
const buf1 = Buffer.alloc(10);
console.log(buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// 创建指定长度的 Buffer（填充指定值）
const buf2 = Buffer.alloc(10, 0x2d);  // 填充 '-'
console.log(buf2.toString()); // ----------

// 从数组创建
const buf3 = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
console.log(buf3.toString()); // Hello

// 从字符串创建
const buf4 = Buffer.from('Hello Node.js', 'utf8');
console.log(buf4); // <Buffer 48 65 6c 6c 6f 20 4e 6f 64 65 2e 6a 73>

// 不安全创建（可能包含旧数据）
const buf5 = Buffer.allocUnsafe(10);
console.log(buf5); // 可能包含随机数据
```

### 2. 读写 Buffer

```javascript
const buf = Buffer.from('Hello');

// 读取字节
console.log(buf[0]);     // 72 (H 的 ASCII)
console.log(buf[1]);     // 101 (e 的 ASCII)

// 写入字节
buf[0] = 0x59;           // 将 H 改为 Y
console.log(buf.toString()); // Yello

// 写入字符串
buf.write('He');
console.log(buf.toString()); // Hello（前两个字符被替换）

// 截取
const slice = buf.slice(0, 3);
console.log(slice.toString()); // Hel

// 复制
const target = Buffer.alloc(5);
buf.copy(target);
console.log(target.toString()); // Hello
```

### 3. Buffer 与字符串转换

```javascript
const buf = Buffer.from('你好，Node.js', 'utf8');

// Buffer → 字符串
console.log(buf.toString('utf8'));        // 你好，Node.js
console.log(buf.toString('hex'));         // e4bda0e5a5bdefbc4e6f64652e6a73
console.log(buf.toString('base64'));      // 5L2g5aW977yMTm9kZS5qcw==

// 字符串 → Buffer
const str = 'Hello';
const fromStr = Buffer.from(str, 'utf8');
const fromHex = Buffer.from('48656c6c6f', 'hex');
const fromBase64 = Buffer.from('SGVsbG8=', 'base64');

console.log(fromStr.toString());   // Hello
console.log(fromHex.toString());   // Hello
console.log(fromBase64.toString());// Hello
```

### 4. Buffer 常用方法

```javascript
const buf1 = Buffer.from('Hello');
const buf2 = Buffer.from('World');

// 比较
console.log(buf1.compare(buf2));  // -1（H < W）
console.log(buf1.equals(buf2));   // false

// 拼接
const combined = Buffer.concat([buf1, Buffer.from(' '), buf2]);
console.log(combined.toString()); // Hello World

// 查找
const buf = Buffer.from('Hello World');
console.log(buf.indexOf('World')); // 6
console.log(buf.includes('Hello')); // true

// 长度
console.log(buf.length);  // 11（字节数，不是字符数）

// 中文支持（注意：中文字符占 3 个字节）
const chinese = Buffer.from('你好');
console.log(chinese.length);     // 6
console.log(chinese.toString()); // 你好
```

### 5. Buffer 和 TypedArray

```javascript
// Buffer 是 Uint8Array 的子类
const buf = Buffer.from([1, 2, 3]);
console.log(buf instanceof Uint8Array); // true

// 与 TypedArray 互转
const array = new Uint8Array([1, 2, 3]);
const bufFromArray = Buffer.from(array.buffer);

// 共享内存
const sharedBuf = Buffer.alloc(4);
const view = new Uint32Array(sharedBuf.buffer);
view[0] = 0x12345678;
console.log(sharedBuf); // <Buffer 78 56 34 12>（小端序）
```

## 二、Stream（流）

Stream 是 Node.js 处理流式数据的抽象接口。相比一次性读取整个文件到内存，流可以分批处理数据，大幅降低内存占用。

### 1. 为什么需要 Stream

```javascript
const fs = require('fs');

// ❌ 不推荐：一次性读入内存（大文件会耗尽内存）
fs.readFile('./huge-file.zip', (err, data) => {
    console.log(data.length);  // 整个文件在内存中
});

// ✅ 推荐：使用流分批处理
const stream = fs.createReadStream('./huge-file.zip');
stream.on('data', (chunk) => {
    console.log('收到数据块：', chunk.length, 'bytes');
});
stream.on('end', () => {
    console.log('文件读取完毕');
});
```

### 2. 四种流类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `Readable` | 可读流 | `fs.createReadStream` |
| `Writable` | 可写流 | `fs.createWriteStream` |
| `Duplex` | 可读可写流 | `net.Socket` |
| `Transform` | 转换流（读写时可修改） | `zlib.createGzip` |

### 3. 可读流（Readable）

```javascript
const fs = require('fs');

// 创建可读流
const readStream = fs.createReadStream('./input.txt', {
    highWaterMark: 64 * 1024, // 每次读取 64KB（默认）
    encoding: 'utf8',          // 直接转字符串
});

// 事件监听
readStream.on('open', (fd) => {
    console.log('文件已打开，fd：', fd);
});

readStream.on('data', (chunk) => {
    console.log('读取到数据块：', chunk.length);
    // 处理数据...
});

readStream.on('end', () => {
    console.log('文件读取完成');
});

readStream.on('close', () => {
    console.log('流已关闭');
});

readStream.on('error', (err) => {
    console.error('读取错误：', err);
});

// 暂停和恢复
readStream.pause();   // 暂停
setTimeout(() => readStream.resume(), 1000); // 1 秒后恢复
```

### 4. 可写流（Writable）

```javascript
const fs = require('fs');

// 创建可写流
const writeStream = fs.createWriteStream('./output.txt', {
    encoding: 'utf8',
});

// 写入数据
writeStream.write('第一行数据\n');
writeStream.write('第二行数据\n');

// 写入完成
writeStream.end('最后一行\n');

// 事件
writeStream.on('finish', () => {
    console.log('写入完成');
});

writeStream.on('error', (err) => {
    console.error('写入错误：', err);
});

// 背压（Backpressure）处理
function writeData(writer, data) {
    return new Promise((resolve) => {
        const ok = writer.write(data);
        if (ok) {
            resolve();
        } else {
            // 数据溢出了，等待 drain 事件
            writer.once('drain', resolve);
        }
    });
}
```

### 5. pipe —— 管道操作

```javascript
const fs = require('fs');
const zlib = require('zlib');

// 最简单的文件复制
const source = fs.createReadStream('./source.txt');
const dest = fs.createWriteStream('./dest.txt');
source.pipe(dest);

// 链式管道 —— 压缩文件
fs.createReadStream('./source.txt')
    .pipe(zlib.createGzip())      // 压缩
    .pipe(fs.createWriteStream('./source.txt.gz'));

// 链式管道 —— 解压文件
fs.createReadStream('./source.txt.gz')
    .pipe(zlib.createGunzip())    // 解压
    .pipe(fs.createWriteStream('./source-decompressed.txt'));

// pipe 自动管理背压
// 当 dest 写入慢时自动暂停 source 读取
// 当 dest 准备好时自动恢复 source 读取
```

### 6. 自定义 Transform 流

```javascript
const { Transform } = require('stream');
const fs = require('fs');

// 自定义转换流：全部转大写
class UpperCaseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        // chunk 是 Buffer，转成字符串再转大写
        const transformed = chunk.toString().toUpperCase();
        this.push(transformed);
        callback();
    }

    _flush(callback) {
        // 所有数据处理完毕后调用
        this.push('\n--- 转换完成 ---\n');
        callback();
    }
}

// 使用
const readStream = fs.createReadStream('./input.txt', { encoding: 'utf8' });
const writeStream = fs.createWriteStream('./output-upper.txt');
const upperTransform = new UpperCaseTransform();

readStream
    .pipe(upperTransform)
    .pipe(writeStream);

writeStream.on('finish', () => {
    console.log('文件已转换为大写');
});
```

### 7. 实际应用场景

```javascript
const fs = require('fs');
const http = require('http');
const zlib = require('zlib');
const { Transform } = require('stream');

// 场景 1：大文件下载服务器（不占内存）
http.createServer((req, res) => {
    const filePath = './big-video.mp4';
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': stat.size,
    });

    fs.createReadStream(filePath).pipe(res);
}).listen(3000);

// 场景 2：日志文件行数统计（逐行处理）
const readline = require('readline');

async function countLines(filePath) {
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath, { encoding: 'utf8' }),
        crlfDelay: Infinity,
    });

    let count = 0;
    for await (const line of rl) {
        if (line.includes('ERROR')) {
            count++;
        }
    }
    return count;
}

// 场景 3：CSV 文件处理
function processCSV(inputPath, outputPath) {
    const csvTransform = new Transform({
        objectMode: true,  // 以对象模式运行
        transform(chunk, encoding, callback) {
            const line = chunk.toString().trim();
            if (line && !line.startsWith('#')) {
                // 假设 CSV 格式：name,age,email
                const [name, age, email] = line.split(',');
                this.push(`${name} (${age}) - ${email}\n`);
            }
            callback();
        },
    });

    const readStream = fs.createReadStream(inputPath, { encoding: 'utf8' });
    const writeStream = fs.createWriteStream(outputPath);

    // 按行读取
    const rl = readline.createInterface({ input: readStream });

    rl.on('line', (line) => {
        csvTransform.write(line + '\n');
    });

    rl.on('close', () => {
        csvTransform.end();
    });

    csvTransform.pipe(writeStream);
}
```

## 三、Buffer 与 Stream 综合示例

### 实现一个文件哈希计算器

```javascript
const fs = require('fs');
const crypto = require('crypto');

function computeHash(filePath, algorithm = 'sha256') {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash(algorithm);
        const stream = fs.createReadStream(filePath);

        stream.on('data', (chunk) => {
            hash.update(chunk);
        });

        stream.on('end', () => {
            resolve(hash.digest('hex'));
        });

        stream.on('error', reject);
    });
}

// 使用示例
async function main() {
    const hash = await computeHash('./large-file.zip');
    console.log('SHA256：', hash);
}
```

### 实现一个进度条复制工具

```javascript
const fs = require('fs');

function copyWithProgress(source, dest) {
    return new Promise((resolve, reject) => {
        const stat = fs.statSync(source);
        const totalSize = stat.size;
        let copiedSize = 0;

        const readStream = fs.createReadStream(source);
        const writeStream = fs.createWriteStream(dest);

        readStream.on('data', (chunk) => {
            copiedSize += chunk.length;
            const progress = ((copiedSize / totalSize) * 100).toFixed(1);
            process.stdout.write(`\r复制进度：${progress}%`);
        });

        readStream.pipe(writeStream);

        writeStream.on('finish', () => {
            console.log('\n复制完成！');
            resolve();
        });

        writeStream.on('error', reject);
    });
}

copyWithProgress('./big-file.zip', './big-file-copy.zip').catch(console.error);
```

## 四、练习

1. 使用 Stream 实现一个简单的 HTTP 文件下载器（将远程文件流式写入本地）
2. 编写一个 Transform 流，将文本中的 `{name}` 替换为实际值（简易模板引擎）
3. 实现统计日志文件中 ERROR 级别的错误条数（使用 Stream + readline）
