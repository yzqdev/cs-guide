---
order: 2
---

# Markdown 自动化工具

> 批量处理 Markdown 文件的实用脚本。

## 遍历文件夹并生成目录

```js
import fs from 'node:fs';
import path from 'node:path';

/**
 * 遍历文件夹，读取所有 .md 文件并提取标题
 * @param {string} dir - 目录路径
 * @param {Array} filesList - 文件列表（递归用）
 * @returns {Array} 文件列表
 */
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && item !== 'res' && item !== '.vuepress' && item !== 'node_modules') {
      readFileList(fullPath, filesList); // 递归读取
    } else if (path.extname(item) === '.md') {
      filesList.push(fullPath.split(path.sep).join('/'));
    }
  });

  return filesList;
}

/**
 * 生成 README.md 目录
 * @param {string} dir - 起始目录
 */
function generateReadme(dir = './') {
  const filesList = [];
  readFileList(dir, filesList);
  let md = `# ${path.resolve(dir).split(path.sep).pop()}\n\n`;

  // 按目录分组
  const groups = {};
  filesList.forEach(file => {
    const dirName = path.dirname(file).split('/').pop();
    if (!groups[dirName]) groups[dirName] = [];
    groups[dirName].push(file);
  });

  Object.entries(groups).forEach(([dirName, files]) => {
    md += `## ${dirName}\n\n`;
    files.forEach(file => {
      const data = fs.readFileSync(file, 'utf-8');
      const match = data.match(/# [\S\s]{0,50}/);
      const title = match ? match[0].slice(2).split('\n')[0] : path.basename(file, '.md');
      md += `- [${title}](${file})\n`;
    });
    md += '\n';
  });

  fs.writeFileSync('README.md', md);
  console.log('README.md 生成成功');
}

// generateReadme('./docs');
```

## 批量提取 Markdown 标题

```js
import fs from 'node:fs';
import path from 'node:path';

function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      readFileList(fullPath, filesList);
    } else if (path.extname(item) === '.md') {
      filesList.push(fullPath);
    }
  });
  return filesList;
}

const filesList = [];
readFileList('./', filesList);

filesList.forEach(file => {
  const data = fs.readFileSync(file, 'utf-8');
  const title = data.match(/# .+/)?.[0]?.slice(2) || path.basename(file, '.md');
  console.log(`${file} → ${title}`);
});
```

## 下载 Markdown 中的在线图片到本地

```js
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const beforeName = 'source.md';
const afterName = 'output.md';
const data = fs.readFileSync(beforeName, 'utf-8');
const imgRegex = /!\[.*\]\((.+?)\)/g;

let match;
const downloads = [];

while ((match = imgRegex.exec(data)) !== null) {
  downloads.push(match[1]);
}

// 创建 res 目录
if (!fs.existsSync('res')) fs.mkdirSync('res');

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`下载失败: ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(resolve); });
    }).on('error', reject);
  });
}

async function main() {
  let newContent = data;
  for (const url of downloads) {
    const fileName = path.basename(new URL(url).pathname);
    const dest = `res/${fileName}`;
    await downloadFile(url, dest);
    console.log(`下载完成: ${fileName}`);
    newContent = newContent.replace(url, `./res/${fileName}`);
  }
  fs.writeFileSync(afterName, newContent);
  console.log('Markdown 文件已更新');
}

// main();
```

## 批量转换 RST 为 Markdown

```js
import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && item !== 'res') {
      readFileList(fullPath, filesList);
    } else if (path.extname(item) === '.rst') {
      filesList.push(fullPath);
    }
  });
  return filesList;
}

async function convertRstToMd() {
  const files = readFileList('./');
  for (const file of files) {
    const mdFile = file.replace('.rst', '.md');
    await execAsync(`pandoc "${file}" -f rst -t markdown -o "${mdFile}"`);
    console.log(`转换完成: ${file} → ${mdFile}`);
  }
}

// convertRstToMd();
```

## 获取所有 Markdown 文件列表

```js
import fs from 'node:fs';
import path from 'node:path';

function getMdFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getMdFiles(fullPath, filesList);
    } else if (path.extname(item) === '.md') {
      filesList.push(fullPath.replace(/\\/g, '/'));
    }
  });
  return filesList;
}

const mdFiles = getMdFiles('./');
console.log(mdFiles);

// 输出到文件
fs.writeFileSync('filelist.txt', mdFiles.join('\n'));
console.log('文件列表已保存到 filelist.txt');
```

## 在每个文件夹生成 README.md

```js
import fs from 'node:fs';
import path from 'node:path';

function generateReadmeFiles(filePath) {
  const stat = fs.statSync(filePath);
  if (stat.isFile()) return;

  if (stat.isDirectory() && !filePath.includes('vuepress') && !filePath.includes('node_modules')) {
    const readmePath = path.join(filePath, 'README.md');
    if (!fs.existsSync(readmePath)) {
      const dirName = path.basename(filePath);
      fs.writeFileSync(readmePath, `# ${dirName}\n\n<Catalog />\n`);
      console.log(`创建 README: ${readmePath}`);
    }
    const files = fs.readdirSync(filePath);
    files.forEach((file) => {
      generateReadmeFiles(path.join(filePath, file));
    });
  }
}

// generateReadmeFiles('./');
```

## 验证 Markdown 链接是否有效

```js
import fs from 'node:fs';
import path from 'node:path';

/**
 * 检查 Markdown 文件中的本地链接是否有效
 * @param {string} mdFile - Markdown 文件路径
 */
function validateLinks(mdFile) {
  const content = fs.readFileSync(mdFile, 'utf-8');
  const linkRegex = /\[.+?\]\((.+?)\)/g;
  const baseDir = path.dirname(mdFile);
  let match;
  let broken = 0;

  while ((match = linkRegex.exec(content)) !== null) {
    const link = match[1];
    // 跳过外部链接
    if (link.startsWith('http://') || link.startsWith('https://')) continue;
    // 跳过锚点链接
    if (link.startsWith('#')) continue;

    const fullPath = path.resolve(baseDir, link);
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ 链接失效: ${link} (在 ${mdFile} 中)`);
      broken++;
    }
  }
  return broken;
}

// 检查所有 md 文件
const files = [];
// ... 获取所有 md 文件的逻辑
let totalBroken = 0;
files.forEach(file => { totalBroken += validateLinks(file); });
console.log(`共发现 ${totalBroken} 个失效链接`);
```