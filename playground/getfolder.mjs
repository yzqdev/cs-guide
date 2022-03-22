import path from "path";
import fs from "fs";
console.log(path.resolve().split("\\").pop());
console.log("abd");
let pattern = /# [\u4E00-\u9FA5A-Za-z0-9_]{0,20}/;
let data = fs.readFileSync("a.md");
console.log(data.toString().match(pattern)[0].slice(2));
