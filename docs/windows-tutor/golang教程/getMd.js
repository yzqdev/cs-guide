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
