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
