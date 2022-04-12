/**
 * 把md所有的在线链接图片下载到本地res目录,然后生成一个新的md文件
 */
import path from "path";
import fs from "fs";
import https from "https";

let beforeName = `pip.md`;
let afterName = `pipline.md`;
let data = fs.readFileSync(beforeName);
let reg = new RegExp(/!\[img\]\(.+\)/, "gi");

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
function replacerFileName(match) {
  let matchLen = match.split("/");
  //类似格式112233-2343.png
  let str = match.split("/")[matchLen.length - 1];
  return str.substring(0, str.length - 1);
}
function replacerMd(match) {
  let matchLen = match.split("/");
  //类似格式112233-2343.png
  let str = match.split("/")[matchLen.length - 1];
  return `![${str.substring(0, str.length - 1)}](./res/${str.substring(
    0,
    str.length - 1
  )})`;
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
