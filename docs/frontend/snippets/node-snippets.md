# 一些nodejs代码块

## 遍历文件夹并生成标题

```js
//getFiles.js
import fs from "fs";
import path from "path";

function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  let dirPath = { name: path.resolve().split("\\").pop(), files: [] };
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    // console.log(path.extname(item));
    // console.log(fullPath);
    if (stat.isDirectory() || path.extname(item).toLowerCase() != ".md") {
      //   console.log("not markdown", item.toString());
    } else {
      let data = fs.readFileSync(fullPath);
      let pattern = /# [\S]{0,20}/;
      if (pattern.test(data.toString())) {
        dirPath.files.push({
          content: data.toString().match(pattern)[0].slice(2),
          filename: fullPath.replace("\\", "/"),
        });
      } else {
        console.log(fullPath);
        dirPath.files.push({
          content: fullPath.split(".")[0],
          filename: fullPath.replace("\\", "/"),
        });
      }

      // filesList.push(fullPath.replace("\\", "/"));
    }
  });
  filesList.push(dirPath);
  return filesList;
}
var filesList = [];
readFileList("./", filesList);
console.log(filesList);
let mdContent = "";
for (let link of filesList) {
  mdContent += `\n# ${link.name}\n\n## 目录\n\n`;
  for (let file of link.files) {
    mdContent += `- [${file.content}](./${file.filename})\n`;
  }
}

console.log(mdContent);
let fileName = "README.md";
try {
  const data = fs.writeFileSync(fileName, mdContent);
  //文件写入成功。
  console.log(`${fileName}创建成功`);
} catch (err) {
  console.error(err);
}

```

:::tip
生成

```text

# docs

## 目录

- [about](./about.md)
- [contact](./contact.md)
- [docs](./README.md)

```

:::

## 遍历文件夹里面的markdown

```js
//getFiles.mjs
 
import fs from "fs";
import path from "path";

function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  let dirPath = { name: path.resolve().split("\\").pop(), files: [] };
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    // console.log(path.extname(item));
    // console.log(fullPath);
    if (stat.isDirectory() || path.extname(item).toLowerCase() != ".md") {
      //   console.log("not markdown", item.toString());
    } else {
      let data = fs.readFileSync(fullPath);
      let pattern = /# [\S]{0,20}/;
      if (pattern.test(data.toString())) {
        dirPath.files.push({
          content: data.toString().match(pattern)[0].slice(2),
          filename: fullPath.replace("\\", "/"),
        });
      } else {
        console.log(fullPath);
        dirPath.files.push({
          content: fullPath.split(".")[0],
          filename: fullPath.replace("\\", "/"),
        });
      }

      // filesList.push(fullPath.replace("\\", "/"));
    }
  });
  filesList.push(dirPath);
  return filesList;
}
var filesList = [];
readFileList("./", filesList);
console.log(filesList);
let mdContent = "";
for (let link of filesList) {
  mdContent += `\n# ${link.name}\n\n## 目录\n\n`;
  for (let file of link.files) {
    mdContent += `- [${file.content}](./${file.filename})\n`;
  }
}

console.log(mdContent);
let fileName = "README.md";
try {
  const data = fs.writeFileSync(fileName, mdContent);
  //文件写入成功。
  console.log(`${fileName}创建成功`);
} catch (err) {
  console.error(err);
}

```

:::tip
输出

```markdown

# nodejs

## 目录

- [express教程](./express教程.md)
- [koa教程](./koa教程.md)
- [nest教程](./nest教程.md)
- [nodejs-tutor](./nodejs-tutor.md)
- [README](./README.md)

```

:::

## 深层次遍历文件夹并输出markdown标题

```js
import fs from "fs";
import path from "path";
import { exec } from "child_process";
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  let dirPath = { name: path.resolve(dir).split("\\").pop(), files: [] };
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && item != "res" && item != ".vuepress") {
      console.log(path.join(dir, item));
      console.log("files=", filesList);
      readFileList(path.join(dir, item), filesList); //递归读取文件
    } else {
      if (path.extname(item) == ".md") {
        dirPath.files.push(fullPath.split(path.sep).join("/"));
      }
      // filesList.push(fullPath.replace("\\", "/"));
    }
  });
  filesList.push(dirPath);
  return filesList;
}
var filesList = [];
readFileList("./", filesList);
console.log("filelist=", filesList);
let md = "";
let head = path.resolve().split("\\").pop();
for (let link of filesList) {
  md += `\n## ${link.name}\n\n`;
  for (let file of link.files) {
    let data = fs.readFileSync(file);
    let pattern = /# [\S]{0,20}/;
    if (pattern.test(data.toString())) {
      md += `- [${data.toString().match(pattern)[0].slice(2)}](./${file})\n`;
    }
  }
}

let fileName = "README.md";
let finalMd = `# ${head}\n` + md;
try {
  const data = fs.writeFileSync(fileName, finalMd);
  //文件写入成功。
  console.log(`${fileName}创建成功`);
} catch (err) {
  console.error(err);
}

```

:::tip
生成

```markdown
# windows-tutor

## autohotkey-tutor

- [一些好用的ahk脚本](./autohotkey-tutor/awesome-ahk.md)
- [autohotkey和autoit教程](./autohotkey-tutor/README.md)

## cpp-tutor

- [clion配置](./cpp-tutor/clion.md)
- [cpp的gui库](./cpp-tutor/cpp-gui-libs.md)
- [qt开源例子](./cpp-tutor/qt-opensource.md)
- [cpp教程](./cpp-tutor/README.md)

## golang-tutor

- [go命令行参数](./golang-tutor/go-cli.md)
- [依赖管理](./golang-tutor/go-deps.md)
- [Go命名规范](./golang-tutor/go-format.md)
- [常用框架](./golang-tutor/golang-opensource.md)
- [golang常用技巧](./golang-tutor/golang-tips.md)
- [golang配置](./golang-tutor/install-golang.md)
- [golang-tutor](./golang-tutor/README.md)

```

:::

## 获取一个文件夹所有的md文件

```js
//getFilename.mjs
import fs from "fs";
import path from "path";
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  let dirPath = { name: path.resolve().split("\\").pop(), files: [] };
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    // console.log(path.extname(item));
    // console.log(fullPath);
    if (stat.isDirectory() || path.extname(item).toLowerCase() != ".md") {
      //   console.log("not markdown", item.toString());
    } else {
      filesList.push(fullPath.replace("\\", "/"));
    }
  });
  // filesList.push(dirPath);
  return filesList;
}
var filesList = [];
readFileList("./", filesList);
console.log(filesList);
fs.writeFile(
  "filelist.txt",
  filesList.join(`\n`),
  { encoding: "utf-8" },
  (err, data) => {
    if (err) {
    } else {
      console.log("success");
    }
  }
);

```

:::tip
输出

```text
about.md
contact.md
README.md
```

:::

## 批量rst文件转为md文件

```js
// convert_rst_to_md.mjs
import { exec } from "child_process";
import fs from "fs";
import path from "path";
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  let dirPath = { name: path.resolve(dir).split("\\").pop(), files: [] };
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && item != "res") {
      readFileList(path.join(dir, item), filesList); //递归读取文件
    } else {
      if (path.extname(item) == ".rst") {
        console.log(item);
        exec(`pandoc ${item} -f rst -t markdown -o ${item.split(".")[0]}.md`);
        dirPath.files.push(fullPath.replace("\\", "/"));
      }
      // filesList.push(fullPath.replace("\\", "/"));
    }
  });
  filesList.push(dirPath);
  return filesList;
}
var filesList = [];
readFileList("./", filesList);
//
console.log(filesList);

```

## 在每个文件夹里都生成一个README.md文件(.vuepress文件夹除外)

```js
//操作文件
/*
  1、fs.stat 获取文件状态
  2、fs.readdir 读取文件夹数据
  3、fs.access 判断文件夹是否存在
  4、path.join 拼路径
*/
//操作文件
import fs from "fs";
//操作路径
import path from "path";
//1.接受命令行命令
//3.判断路径是否存在
//2.修正路径
let inputPath = "./"; //[2]是输入的路径名
if (!inputPath) {
  //判断有没有输入内容
  throw "请输入文件名！";
}
//转换路径格式为绝对路径
inputPath = path.resolve(inputPath);
//输入的路径存在就执行递归
try {
  //扩展：'.F_OK'==='检查目录中是否存在文件'
  //'.R_OK'==='检查文件是否可读',详细见nodejs文档
  //也可以这样写 ：判断是否存在，以及是否可读
  //fs.accessSync(inputPath,fs.constants.F_OK|fs.constants.R_OK);
  //这里的 fs.constants.F_OK 是默认值，不用写
  fs.accessSync(inputPath);
  genReadmeFiles(inputPath);
} catch (err) {
  console.log(err);
}

function genReadmeFiles(filePath) {
  let state = fs.statSync(filePath);
  if (state.isFile()) {
    //是文件
    // console.log(filePath);
  } else if (state.isDirectory() && !filePath.includes("vuepress")) {
    //是文件夹
    //先读取

    if (fs.existsSync(path.resolve(filePath, "README.md"))) {
      console.log(`${filePath}已经有readme了`);
    } else {
      let fileName = "README.md";
      fs.writeFileSync(
        path.join(filePath, fileName),
        "# " + filePath.split("\\").pop()
      );
    }
    let files = fs.readdirSync(filePath);
    files.forEach((file) => {
      //   console.log(path.join(filePath, file) + "，file");

      genReadmeFiles(path.join(filePath, file));
    });
  }
}


```

## 循环遍历文件夹,并输出文件内容

```js
let fs = require("fs");
let path = require("path"); //解析需要遍历的文件夹
let filePath = path.resolve("./");
//调用文件遍历方法
fileDisplay(filePath);
//文件遍历方法
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err);
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        let filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn("获取文件stats失败");
          } else {
            let isFile = stats.isFile(); //是文件
            let isDir = stats.isDirectory(); //是文件夹
            if (isFile) {
              console.log(filedir); // 读取文件内容
              let content = fs.readFileSync(filedir, "utf-8");
              console.log(content);
            }
            if (isDir) {
              fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        });
      });
    }
  });
}

```

## 把md文件里面的所有在线图片下载到res文件夹,并替换原来的md文件

```js
/**
 * 把md所有的在线链接图片下载到本地res目录,然后生成一个新的md文件
 */
import path from "path";
import fs from "fs";
import https from "https";

let beforeName = `transfer.md`;
let afterName = `transfer-tools.md`;
let data = fs.readFileSync(beforeName);
let reg = new RegExp(/!\[.*\]\(.+\)/, "gi");

let imgs = data.toString().match(reg);
for (let item of imgs) {
  console.log("img -length", imgs.length);
  let uri = replacerToUrl(item);
  let itemName = replacerFileName(item);
  await downloadFileAsync(uri, "res/" + itemName);
  await writeMd();
}
function replacerToUrl(match) {
  let str = match.match(/http.+\)/)[0];

  return str.substring(0, str.length - 1);
}
/**
 * 生成如下的格式(1624847415629-4a7a5f1e-7644-4370-9ed7-e1f83ce4873f.png)
 * @param {s} match
 * @returns
 */
function replacerFileName(match) {
  console.log(match);
  let extReg = new RegExp(/\d*-.*\.(png|jpg|gif|webp)/, "gi");
  let resArr = match.match(/\/\w*/gi);
  console.log(resArr[resArr.length - 1].slice(1));
  if (extReg.test(match)) {
    return match.match(extReg)[0];
  } else {
    return resArr[resArr.length - 1].slice(1) + ".png";
  }
}
function replacerMd(match) {
  return `![${replacerFileName(match)}](./res/${replacerFileName(match)})`;
}
function writeMd() {
  let arr = data.toString().replaceAll(reg, replacerMd);
  fs.writeFileSync(afterName, arr);
}

function downloadFileAsync(uri, dest) {
  return new Promise((resolve, reject) => {
    // 确保dest路径存在
    const file = fs.createWriteStream(dest);

    https.get(uri, (res) => {
      if (res.statusCode !== 200) {
        reject(response.statusCode);
        return;
      }

      res.on("end", () => {
        console.log("download end");
      });

      // 进度、超时等

      file
        .on("finish", () => {
          console.log("finish write file");
          file.close(resolve);
        })
        .on("error", (err) => {
          fs.unlink(dest);
          reject(err.message);
        });

      res.pipe(file);
    });
  });
}


```
