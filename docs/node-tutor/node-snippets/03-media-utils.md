---
order: 3
---

# 媒体与视频处理

> 视频、图片等媒体文件的处理脚本。

## 视频文件夹生成 HTML 播放页

```js
import fs from 'node:fs';
import path from 'node:path';

/**
 * 读取目录中的 mp4 文件
 */
function getVideoFiles(dir) {
  const files = fs.readdirSync(dir);
  return files.filter(file => path.extname(file).toLowerCase() === '.mp4');
}

/**
 * 生成视频播放页面
 */
function generateVideoPage() {
  const files = getVideoFiles('./');
  if (!files.length) {
    console.log('未找到 mp4 文件');
    return;
  }

  const videos = files.map(file =>
    `<video style="width:25%" controls>
      <source src="${file}" type="video/mp4">
    </video>`
  );

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>视频列表</title>
  <style>
    body { display: flex; flex-wrap: wrap; gap: 10px; padding: 20px; }
    video { border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
  </style>
</head>
<body>
  ${videos.join('\n  ')}
</body>
</html>`;

  fs.writeFileSync('index.html', html, 'utf-8');
  console.log('视频播放页面已生成: index.html');
}

// generateVideoPage();
```

## 清除文件名中的特殊字符

```js
import fs from 'node:fs';
import path from 'node:path';

/**
 * 替换文件名中的特殊字符
 * @param {string} dir - 目录路径
 * @param {RegExp} pattern - 要替换的字符模式
 * @param {string} replacement - 替换为
 */
function cleanFilenames(dir, pattern = /[#%&{}<>*?$!:'"|]/g, replacement = '-') {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isFile()) {
      const newName = file.replace(pattern, replacement);
      if (newName !== file) {
        fs.renameSync(fullPath, path.join(dir, newName));
        console.log(`重命名: ${file} → ${newName}`);
      }
    }
  });
}

// cleanFilenames('./');
```

## 图片处理（sharp）

```bash
npm install sharp
```

```js
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

// 压缩图片
export async function compressImage(inputPath, outputPath, quality = 80) {
  await sharp(inputPath)
    .jpeg({ quality })
    .toFile(outputPath);
  console.log(`图片已压缩: ${outputPath}`);
}

// 调整图片大小
export async function resizeImage(inputPath, outputPath, width, height) {
  await sharp(inputPath)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .toFile(outputPath);
  console.log(`图片已调整大小: ${outputPath}`);
}

// 转换为 WebP 格式
export async function toWebP(inputPath, outputPath, quality = 80) {
  await sharp(inputPath)
    .webp({ quality })
    .toFile(outputPath);
  console.log(`已转换为 WebP: ${outputPath}`);
}

// 批量处理目录中的图片
export async function batchProcessImages(dir, processFn) {
  const files = fs.readdirSync(dir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  for (const file of imageFiles) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, `optimized-${file}`);
    await processFn(inputPath, outputPath);
  }
}

// 使用示例
// await compressImage('photo.jpg', 'photo-compressed.jpg', 70);
// await resizeImage('photo.jpg', 'photo-thumb.jpg', 300, 200);
// await toWebP('photo.jpg', 'photo.webp', 90);
```

## 生成文件校验和

```js
import fs from 'node:fs';
import crypto from 'node:crypto';

/**
 * 计算文件的 MD5 / SHA256 校验和
 * @param {string} filePath - 文件路径
 * @param {string} algorithm - 算法（md5, sha1, sha256）
 * @returns {string} 校验和
 */
export function fileHash(filePath, algorithm = 'md5') {
  const content = fs.readFileSync(filePath);
  return crypto.createHash(algorithm).update(content).digest('hex');
}

// 使用示例
console.log('MD5:', fileHash('file.txt', 'md5'));
console.log('SHA256:', fileHash('file.txt', 'sha256'));

// 批量计算目录下所有文件的哈希
export function batchHash(dir, algorithm = 'md5') {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isFile()) {
      console.log(`${file}: ${fileHash(filePath, algorithm)}`);
    }
  });
}
```