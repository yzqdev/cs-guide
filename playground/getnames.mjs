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

    console.log("完整路径=", fullPath);
    // console.log(stat);
    if (stat.isDirectory()) {
      //   console.log("not markdown", item.toString());
      console.log("是路径");

      readFileList(path.resolve(item));
    } else {
      if (path.extname(item).toLowerCase() != ".md") {
      } else {
        let data = fs.readFileSync(fullPath);
        let pattern = /# [\S]{0,20}/;
        if (pattern.test(data.toString())) {
          dirPath.files.push({
            content: data.toString().match(pattern)[0].slice(2),
            filename: fullPath.replace("\\", "/"),
          });
        } else {
          dirPath.files.push({
            content: fullPath.split(".")[0],
            filename: fullPath.replace("\\", "/"),
          });
        }
      }

      // filesList.push(fullPath.replace("\\", "/"));
    }
  });
  filesList.push(dirPath);
  return filesList;
}
var filesList = [];
readFileList("./", filesList);
console.log("文件列表");
console.log(JSON.stringify(filesList));
let mdContent = "";
for (let link of filesList) {
  mdContent += `\n# ${link.name}\n\n## 目录\n\n`;
  for (let file of link.files) {
    mdContent += `- [${file.content}](./${file.filename})\n`;
  }
}
console.log("readme内容---------------------------------------------");
console.log(mdContent);
console.log("readme内容---------------------------------------------");
let fileName = "README.md";
try {
  const data = fs.writeFileSync(fileName, mdContent);
  //文件写入成功。
  console.log(`${fileName}创建成功`);
} catch (err) {
  console.error(err);
}
