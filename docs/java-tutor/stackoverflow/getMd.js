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
      filesList.push(fullPath.replace("\\", "/"));
    }
  });
  filesList.push(dirPath);
  return filesList;
}
var filesList = [];
readFileList("./", filesList);
console.log(filesList);
