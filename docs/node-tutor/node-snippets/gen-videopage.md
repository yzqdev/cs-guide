# 视频操作

## 在一个视频文件夹生成index.html

### 清除文件名中的不规则字符

```js
//removeSpace.mjs
import fs from "fs";
import path from "path";
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  let dirPath = { name: path.resolve().split("\\").pop(), files: [] };
  files.forEach((item, index) => {
    let fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    // console.log(path.extname(item));
    // console.log(fullPath);

    if (stat.isDirectory()) {
      //   console.log("not markdown", item.toString());
    } else {
      const pathToFile = path.join(path.resolve("./"), item);
      const newPathToFile = path.join(
        path.resolve("./"),
        item.replace(/#/gm, "-")
      );
      fs.rename(pathToFile, newPathToFile, (err) => {
        if (err) {
          throw err;
        } else {
          console.log("Successfully renamed the file!");
        }
      });
      console.log(newPathToFile);
      filesList.push(fullPath.replace("\\", "/"));
    }
  });
  // filesList.push(dirPath);
  return filesList;
}
let files = [];
readFileList("./", files);
console.log(files);

```

### 生成index.html

```js
//getFilename.mjs
import fs from "fs";
import path from "path";
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  let dirPath = { name: path.resolve().split("\\").pop(), files: [] };
  files.forEach((item, index) => {
    let fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    // console.log(path.extname(item));
    // console.log(fullPath);
    if (stat.isDirectory() || path.extname(item).toLowerCase() != ".mp4") {
      //   console.log("not markdown", item.toString());
    } else {
      filesList.push(fullPath.replace("\\", "/"));
    }
  });
  // filesList.push(dirPath);
  return filesList;
}
let head = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  </head>
  <body style='display:flex'>`;
let videos = [];
let filesList = [];
readFileList("./", filesList);
console.log(filesList);
for (let index = 0; index < filesList.length; index++) {
  const element = filesList[index];
  videos.push(
    `<video style='width:25%' controls><source src="${element}" type="video/mp4"></video>`
  );
}
let end = `  </body>
</html>
`;
fs.writeFile(
  "index.html",
  head + videos.join(`\n`) + end,
  { encoding: "utf-8" },
  (err, data) => {
    if (err) {
    } else {
      console.log("success");
    }
  }
);

```
