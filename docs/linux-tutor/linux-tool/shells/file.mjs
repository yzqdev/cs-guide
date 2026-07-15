import fs from "fs";

fs.readdir("./", function (err, files) {
  if (err) {
    console.log("Error", err);
  } else {
    let arr = [];

    for (let item of files) {
      let str = `## ${item}`;
      arr.push(str.slice(0, str.length - 3) + `\n`);
      arr.push(`@[code shell](./shells/${item})\n\n`);
    }
    console.log(arr.join(""));
    fs.writeFileSync("a.md", arr.join(""));
  }
});
