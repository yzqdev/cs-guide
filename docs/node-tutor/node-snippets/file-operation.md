# 文件操作

## 与commonjs不同

```js
const __dirname = path.resolve(path.dirname(''))
```

## 读取文件树

```js
import fs from "fs";
import path from "path";
const componentDir = path.resolve();
console.log("componentDir: ", componentDir);
export function readDir(dir) {
  return fs.readdirSync(dir, (err, files) => {
    if (err) throw err;
    // console.log(`${dir}, files: `.green, files);
    // if (!files.length) console.log(`${dir}: 文件夹为空`.redBG);
    return files;
  });
}

// 判断制定路径是否是文件
export function isFile(dir) {
  return fs.statSync(dir).isFile();
}

// 获取目录名
export function getDirName(dir) {
  let tempdir = dir.substr(dir.lastIndexOf("/") + 1, dir.length);
  return tempdir;
}

// const components_out = readFile(path.resolve(__dirname, './components-dir-tree.json'));
// console.log('components-dir-tree: ', components_out);

// 读取指定目录的文件
export function readFile(dir) {
  let result = fs.readFileSync(dir, "utf-8");
  return result
    ? {
        dir: dir,
        result: result,
      }
    : null;
}

/**
 * 获取目录下的文件树
 * @param {读取的路径} dir
 * @returns 返回 dir 目录下的文件树
 */
export function getDirTree(dir) {
  let obj = {
    dir: dir, // 文件夹路径
    childFiles: [], // 子文件
    childDir: {}, // 子目录
  };
  let objStr = JSON.stringify(obj);
  if (isFile(dir)) return console.log(`${dir}: 不是文件夹`.redBG);

  // 读取目录
  let files = readDir(dir);
  if (!files.length) console.log(`${dir}: 文件夹为空`.redBG);

  // 遍历文件
  files.forEach((file) => {
    let tempdir = `${dir}/${file}`;
    if (isFile(tempdir)) {
      obj.childFiles.push({
        short: file, // 文件名
        full: tempdir, // 完整路径
      });
    } else {
      console.log("tempdir: ", tempdir);
      let dirname = getDirName(tempdir);
      // 在当前文件夹的对象下 childDir 属性(1)，以文件夹名作为key(2)，
      // (2)的值是该目录下 路径dir、childFiles子文件、childDir子文件夹组成的对象或null
      obj.childDir[dirname] = getDirTree(tempdir);
    }
  });
  return JSON.stringify(obj) === objStr ? null : obj;
}

const ComponentInit = (function init() {
  console.log("______ init ______", "\n");
  let treeObj = getDirTree(componentDir);
  // console.log('treeObj: ',treeObj);
  if (treeObj) {
    let curPath = `${path.resolve()}/`;
    let outdir = `${getDirName(componentDir)}-dir-tree.json`;
    // 写入文件
    fs.writeFile(outdir, JSON.stringify(treeObj, "", "\t"), "utf8", (err) => {
      if (err) throw err;
      console.log(`目录树已输出为文件保存: ${outdir}`);
    });
  }
  return init;
})();

ComponentInit();

```
