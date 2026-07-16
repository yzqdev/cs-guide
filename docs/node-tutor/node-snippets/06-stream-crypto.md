---
order: 6
---

# 流、加密与压缩

> 处理流数据、加密解密和文件压缩的代码片段。

## 流式读取文件

```js
import fs from 'node:fs';
import readline from 'node:readline';

// 逐行读取大文件（适合 GB 级文件）
export async function readLargeFile(filePath, onLine) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    onLine(line);
  }
}

// 使用示例
// let lineCount = 0;
// await readLargeFile('huge-file.log', (line) => {
//   lineCount++;
//   if (lineCount % 10000 === 0) console.log(`已读取 ${lineCount} 行`);
// });
```

## 管道操作

```js
import fs from 'node:fs';
import zlib from 'node:zlib';

// 压缩文件
export function gzipFile(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(inputPath);
    const writeStream = fs.createWriteStream(outputPath);
    const gzip = zlib.createGzip();

    readStream
      .pipe(gzip)
      .pipe(writeStream)
      .on('finish', resolve)
      .on('error', reject);

    readStream.on('error', reject);
    writeStream.on('error', reject);
  });
}

// 解压文件
export function gunzipFile(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(inputPath);
    const writeStream = fs.createWriteStream(outputPath);
    const gunzip = zlib.createGunzip();

    readStream
      .pipe(gunzip)
      .pipe(writeStream)
      .on('finish', resolve)
      .on('error', reject);
  });
}

// 使用示例
// await gzipFile('data.txt', 'data.txt.gz');
// await gunzipFile('data.txt.gz', 'data-restored.txt');
```

## 加密与哈希

```js
import crypto from 'node:crypto';

// MD5 哈希
export function md5(text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

// SHA256 哈希
export function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

// HMAC 签名
export function hmac(key, text, algorithm = 'sha256') {
  return crypto.createHmac(algorithm, key).update(text).digest('hex');
}

// 随机字符串
export function randomString(length = 32) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

// UUID v4
export function uuid() {
  return crypto.randomUUID();
}

// 使用示例
console.log('MD5:', md5('hello'));
console.log('SHA256:', sha256('hello'));
console.log('随机字符串:', randomString(16));
console.log('UUID:', uuid());
```

## AES 加密解密

```js
import crypto from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY = crypto.randomBytes(32); // 生产环境应从配置文件或环境变量读取

/**
 * AES 加密
 * @param {string} text - 明文
 * @returns {object} { encrypted, iv, tag }
 */
export function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');
  return { encrypted, iv: iv.toString('hex'), tag };
}

/**
 * AES 解密
 * @param {object} data - { encrypted, iv, tag }
 * @returns {string} 明文
 */
export function decrypt(data) {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(data.iv, 'hex')
  );
  decipher.setAuthTag(Buffer.from(data.tag, 'hex'));
  let decrypted = decipher.update(data.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// 使用示例
// const encrypted = encrypt('Hello World');
// console.log('加密:', encrypted);
// const decrypted = decrypt(encrypted);
// console.log('解密:', decrypted);
```

## 压缩与解压（archiver）

```bash
npm install archiver extract-zip
```

```js
import archiver from 'archiver';
import fs from 'node:fs';
import path from 'node:path';

/**
 * 压缩文件夹为 ZIP
 * @param {string} sourceDir - 源目录
 * @param {string} outputPath - 输出 ZIP 路径
 */
export function zipDirectory(sourceDir, outputPath) {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(outputPath);

    stream.on('close', () => resolve());
    archive.on('error', (err) => reject(err));

    archive.pipe(stream);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

/**
 * 压缩文件列表为 ZIP
 * @param {string[]} files - 文件路径数组
 * @param {string} outputPath - 输出 ZIP 路径
 */
export function zipFiles(files, outputPath) {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(outputPath);

    stream.on('close', () => resolve());
    archive.on('error', (err) => reject(err));

    archive.pipe(stream);
    files.forEach(file => {
      archive.file(file, { name: path.basename(file) });
    });
    archive.finalize();
  });
}

// 使用示例
// await zipDirectory('./dist', './dist.zip');
// await zipFiles(['file1.txt', 'file2.txt'], './files.zip');
```

## 解压 ZIP

```js
import { extract } from 'extract-zip';

export async function unzip(zipPath, outputDir) {
  await extract(zipPath, { dir: outputDir });
  console.log(`解压完成: ${zipPath} → ${outputDir}`);
}

// 使用示例
// await unzip('archive.zip', './output');
```