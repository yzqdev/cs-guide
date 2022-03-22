# nodejs教程

## 遍历文件夹里面的markdown

```js
//getFiles.js
var fs = require("fs");
var path = require("path");
var exec = require("child_process").exec;
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
      let pattern = /# [\u4E00-\u9FA5A-Za-z0-9_]{0,20}/;
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

## 深层次遍历文件夹

```js
var fs = require("fs");
var path = require("path");
var exec = require("child_process").exec;
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  let dirPath = { name: path.resolve(dir).split("\\").pop(), files: [] };
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && item != "res") {
      readFileList(path.join(dir, item), filesList); //递归读取文件
    } else {
      if (path.extname(item) == ".md") {
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
console.log("filelist=", filesList);
let md = "";
let head = path.resolve().split("\\").pop();
for (let link of filesList) {
  md += `\n## ${link.name}\n\n`;
  for (let file of link.files) {
    md += `- [${file.split(".")[0].split("/").pop()}](./${file})\n`;
  }
}

let fileName = "README.md";
let finalMd = `# ${head}\n` + md;
console.log(finalMd);
try {
  const data = fs.writeFileSync(fileName, finalMd);
  //文件写入成功。
  console.log(`${fileName}创建成功`);
} catch (err) {
  console.error(err);
}

```

生成

```markdown
# java-tutor

## java学习教程

- [java-snip](./java学习教程/java-snip.md)
- [java8之后兼容性](./java学习教程/java8之后兼容性.md)
- [java匿名内部类](./java学习教程/java匿名内部类.md)
- [java发送邮件](./java学习教程/java发送邮件.md)
- [java抽象类](./java学习教程/java抽象类.md)
- [java方法引用](./java学习教程/java方法引用.md)
- [java泛型](./java学习教程/java泛型.md)
- [java错误](./java学习教程/java错误.md)
- [Optional语法](./java学习教程/Optional语法.md)
- [README](./java学习教程/README.md)
- [关于dao,dto,vo,pojo](./java学习教程/关于dao,dto,vo,pojo.md)
- [安装Java](./java学习教程/安装Java.md)

## playground

- [java匿名内部类](./java匿名内部类.md)
- [Optional语法](./Optional语法.md)
- [README](./README.md)
- [关于dao,dto,vo,pojo](./关于dao,dto,vo,pojo.md)
- [安装Java](./安装Java.md)

```
