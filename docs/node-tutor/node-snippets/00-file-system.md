---
order: 0
---

# 文件系统操作

> 常见的文件与文件夹操作代码片段，使用 ES Module 语法。

## 读取目录内容

```js
import fs from 'node:fs';
import path from 'node:path';

// 同步读取目录
export function readDir(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).map(dirent => ({
    name: dirent.name,
    isFile: dirent.isFile(),
    isDirectory: dirent.isDirectory(),
  }));
}

// 异步读取目录
export async function readDirAsync(dir) {
  const files = await fs.promises.readdir(dir, { withFileTypes: true });
  return files.map(dirent => ({
    name: dirent.name,
    isFile: dirent.isFile(),
    isDirectory: dirent.isDirectory(),
  }));
}
```

## 判断路径类型

```js
import fs from 'node:fs';

export function isFile(dir) {
  return fs.statSync(dir).isFile();
}

export function isDirectory(dir) {
  return fs.statSync(dir).isDirectory();
}

export async function isFileAsync(dir) {
  return (await fs.promises.stat(dir)).isFile();
}
```

## 读取文件

```js
import fs from 'node:fs';

// 同步读取为字符串
export function readFileSync(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

// 异步读取
export async function readFileAsync(filePath) {
  return await fs.promises.readFile(filePath, 'utf-8');
}

// 读取 JSON 文件
export function readJsonSync(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export async function readJsonAsync(filePath) {
  const content = await fs.promises.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}
```

## 写入文件

```js
import fs from 'node:fs';

// 写入字符串
export function writeFileSync(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf-8');
}

export async function writeFileAsync(filePath, content) {
  await fs.promises.writeFile(filePath, content, 'utf-8');
}

// 写入 JSON
export function writeJsonSync(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// 追加内容到文件
export function appendToFile(filePath, content) {
  fs.appendFileSync(filePath, content + '\n', 'utf-8');
}
```

## 复制文件/文件夹

```js
import fs from 'node:fs';
import path from 'node:path';

// 复制文件
export async function copyFile(src, dest) {
  await fs.promises.copyFile(src, dest);
}

// 复制文件夹（递归）
export async function copyDir(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true });
  const entries = await fs.promises.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}
```

## 删除文件/文件夹

```js
import fs from 'node:fs';

// 删除文件
export async function deleteFile(filePath) {
  await fs.promises.unlink(filePath);
}

// 删除文件夹（递归）
export async function deleteDir(dirPath) {
  await fs.promises.rm(dirPath, { recursive: true, force: true });
}

// 清空文件夹（删除所有内容但不删除文件夹本身）
export async function emptyDir(dirPath) {
  const entries = await fs.promises.readdir(dirPath);
  for (const entry of entries) {
    await fs.promises.rm(path.join(dirPath, entry), { recursive: true, force: true });
  }
}
```

## 获取文件树

```js
import fs from 'node:fs';
import path from 'node:path';

/**
 * 获取目录下的文件树
 * @param {string} dir - 要读取的目录
 * @returns {object|null} 文件树对象
 */
export function getDirTree(dir) {
  if (!fs.statSync(dir).isDirectory()) return null;

  const obj = {
    dir,
    childFiles: [],
    childDir: {},
  };

  const files = fs.readdirSync(dir);
  if (!files.length) return null;

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isFile()) {
      obj.childFiles.push({ short: file, full: fullPath });
    } else {
      obj.childDir[file] = getDirTree(fullPath);
    }
  });

  return obj;
}
```

## 文件监听

```js
import fs from 'node:fs';

// 监听文件变化
export function watchFile(filePath, callback) {
  fs.watchFile(filePath, (curr, prev) => {
    console.log(`文件变化: ${filePath}`);
    callback(curr, prev);
  });
}

// 监听目录变化
export function watchDir(dirPath, callback) {
  const watcher = fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
    console.log(`事件: ${eventType}, 文件: ${filename}`);
    callback(eventType, filename);
  });
  return watcher; // 调用 watcher.close() 停止监听
}
```

## 临时文件

```js
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// 创建临时文件
export function createTempFile(prefix = 'tmp') {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  return tempDir;
}

// 创建临时目录并返回路径
export async function createTempDir(prefix = 'tmp') {
  return await fs.promises.mkdtemp(path.join(os.tmpdir(), prefix));
}
```

## 批量重命名文件

```js
import fs from 'node:fs';
import path from 'node:path';

// 替换文件名中的指定字符
export function renameFiles(dir, pattern, replacement) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const newName = file.replace(pattern, replacement);
    if (newName !== file) {
      fs.renameSync(path.join(dir, file), path.join(dir, newName));
      console.log(`重命名: ${file} → ${newName}`);
    }
  });
}

// 批量添加前缀
export function addPrefixToFiles(dir, prefix) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const newName = prefix + file;
    fs.renameSync(path.join(dir, file), path.join(dir, newName));
  });
}
```

## 获取文件信息

```js
import fs from 'node:fs';

export function getFileInfo(filePath) {
  const stat = fs.statSync(filePath);
  return {
    size: stat.size,                    // 文件大小（字节）
    created: stat.birthtime,            // 创建时间
    modified: stat.mtime,               // 修改时间
    accessed: stat.atime,               // 访问时间
    isFile: stat.isFile(),
    isDirectory: stat.isDirectory(),
    sizeInKB: (stat.size / 1024).toFixed(2),
    sizeInMB: (stat.size / 1024 / 1024).toFixed(2),
  };
}

// 格式化文件大小
export function formatFileSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}
```