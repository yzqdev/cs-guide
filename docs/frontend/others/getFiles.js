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
    if (stat.isDirectory() || path.extname(item).toLowerCase() != ".md") {
      console.log("not markdown", item.toString());
    } else {
      dirPath.files.push(fullPath.replace("\\", "/"));
      // filesList.push(fullPath.replace("\\", "/"));
    }
  });
  filesList.push(dirPath);
  return filesList;
}
var filesList = [];
readFileList("./", filesList);

let md = "";
for (let link of filesList) {
  md += `\n# ${link.name}\n\n## 目录\n\n`;
  for (let file of link.files) {
    md += `- [${file.split(".")[0]}](./${file})\n`;
  }
}

console.log(md);
let fileName = "README.md";
try {
  const data = fs.writeFileSync(fileName, md);
  //文件写入成功。
  console.log(`${fileName}创建成功`);
} catch (err) {
  console.error(err);
}
