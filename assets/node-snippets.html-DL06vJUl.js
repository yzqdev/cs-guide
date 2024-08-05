import{_ as t,c as e,o as n,d as o}from"./app-CbULZrmi.js";const i={},s=o(`<h1 id="nodejs代码块" tabindex="-1"><a class="header-anchor" href="#nodejs代码块"><span>nodejs代码块</span></a></h1><h2 id="遍历文件夹并生成标题" tabindex="-1"><a class="header-anchor" href="#遍历文件夹并生成标题"><span>遍历文件夹并生成标题</span></a></h2><pre><code class="language-js">//getFiles.js
import fs from &quot;fs&quot;;
import path from &quot;path&quot;;

function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  let dirPath = { name: path.resolve().split(&quot;\\\\&quot;).pop(), files: [] };
  files.forEach((item, index) =&gt; {
    let fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    // console.log(path.extname(item));
    // console.log(fullPath);
    if (stat.isDirectory() || path.extname(item).toLowerCase() != &quot;.md&quot;) {
      //   console.log(&quot;not markdown&quot;, item.toString());
    } else {
      let data = fs.readFileSync(fullPath);
      let pattern = /# [\\S]{0,20}/;
      if (pattern.test(data.toString())) {
        dirPath.files.push({
          content: data.toString().match(pattern)[0].slice(2),
          filename: fullPath.replace(&quot;\\\\&quot;, &quot;/&quot;),
        });
      } else {
        console.log(fullPath);
        dirPath.files.push({
          content: fullPath.split(&quot;.&quot;)[0],
          filename: fullPath.replace(&quot;\\\\&quot;, &quot;/&quot;),
        });
      }

      // filesList.push(fullPath.replace(&quot;\\\\&quot;, &quot;/&quot;));
    }
  });
  filesList.push(dirPath);
  return filesList;
}
let filesList = [];
readFileList(&quot;./&quot;, filesList);
console.log(filesList);
let mdContent = &quot;&quot;;
for (let link of filesList) {
  mdContent += \`\\n# \${link.name}\\n\\n## 目录\\n\\n\`;
  for (let file of link.files) {
    mdContent += \`- [\${file.content}](./\${file.filename})\\n\`;
  }
}

console.log(mdContent);
let fileName = &quot;README.md&quot;;
try {
  const data = fs.writeFileSync(fileName, mdContent);
  //文件写入成功。
  console.log(\`\${fileName}创建成功\`);
} catch (err) {
  console.error(err);
}

</code></pre><div class="hint-container tip"><p class="hint-container-title">提示</p><p>生成</p><pre><code class="language-text">
# docs

## 目录

- [about](./about.md)
- [contact](./contact.md)
- [docs](./README.md)

</code></pre></div><h2 id="遍历文件夹里面的markdown" tabindex="-1"><a class="header-anchor" href="#遍历文件夹里面的markdown"><span>遍历文件夹里面的markdown</span></a></h2><pre><code class="language-js">//getFiles.mjs
 
import fs from &quot;fs&quot;;
import path from &quot;path&quot;;

function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  let dirPath = { name: path.resolve().split(&quot;\\\\&quot;).pop(), files: [] };
  files.forEach((item, index) =&gt; {
    let fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    // console.log(path.extname(item));
    // console.log(fullPath);
    if (stat.isDirectory() || path.extname(item).toLowerCase() != &quot;.md&quot;) {
      //   console.log(&quot;not markdown&quot;, item.toString());
    } else {
      let data = fs.readFileSync(fullPath);
      let pattern = /# [\\S]{0,20}/;
      if (pattern.test(data.toString())) {
        dirPath.files.push({
          content: data.toString().match(pattern)[0].slice(2),
          filename: fullPath.replace(&quot;\\\\&quot;, &quot;/&quot;),
        });
      } else {
        console.log(fullPath);
        dirPath.files.push({
          content: fullPath.split(&quot;.&quot;)[0],
          filename: fullPath.replace(&quot;\\\\&quot;, &quot;/&quot;),
        });
      }

      // filesList.push(fullPath.replace(&quot;\\\\&quot;, &quot;/&quot;));
    }
  });
  filesList.push(dirPath);
  return filesList;
}
let filesList = [];
readFileList(&quot;./&quot;, filesList);
console.log(filesList);
let mdContent = &quot;&quot;;
for (let link of filesList) {
  mdContent += \`\\n# \${link.name}\\n\\n## 目录\\n\\n\`;
  for (let file of link.files) {
    mdContent += \`- [\${file.content}](./\${file.filename})\\n\`;
  }
}

console.log(mdContent);
let fileName = &quot;README.md&quot;;
try {
  const data = fs.writeFileSync(fileName, mdContent);
  //文件写入成功。
  console.log(\`\${fileName}创建成功\`);
} catch (err) {
  console.error(err);
}

</code></pre><div class="hint-container tip"><p class="hint-container-title">提示</p><p>输出</p><pre><code class="language-markdown">
# nodejs

## 目录

- [express教程](./express教程.md)
- [koa教程](./koa教程.md)
- [nest教程](./nest教程.md)
- [nodejs-tutor](./nodejs-tutor.md)
- [README](./README.md)

</code></pre></div><h2 id="深层次遍历文件夹并输出markdown标题" tabindex="-1"><a class="header-anchor" href="#深层次遍历文件夹并输出markdown标题"><span>深层次遍历文件夹并输出markdown标题</span></a></h2><pre><code class="language-js">import fs from &quot;fs&quot;;
import path from &quot;path&quot;;
import { exec } from &quot;child_process&quot;;
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  let dirPath = { name: path.resolve(dir).split(&quot;\\\\&quot;).pop(), files: [] };
  files.forEach((item, index) =&gt; {
    let fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() &amp;&amp; item != &quot;res&quot; &amp;&amp; item != &quot;.vuepress&quot;) {
      console.log(path.join(dir, item));
      console.log(&quot;files=&quot;, filesList);
      readFileList(path.join(dir, item), filesList); //递归读取文件
    } else {
      if (path.extname(item) == &quot;.md&quot;) {
        dirPath.files.push(fullPath.split(path.sep).join(&quot;/&quot;));
      }
      // filesList.push(fullPath.replace(&quot;\\\\&quot;, &quot;/&quot;));
    }
  });
  filesList.push(dirPath);
  return filesList;
}
let filesList = [];
readFileList(&quot;./&quot;, filesList);
console.log(&quot;filelist=&quot;, filesList);
let md = &quot;&quot;;
let head = path.resolve().split(&quot;\\\\&quot;).pop();
for (let link of filesList) {
  md += \`\\n## \${link.name}\\n\\n\`;
  for (let file of link.files) {
    let data = fs.readFileSync(file);
    let pattern = /# [\\S]{0,20}/;
    if (pattern.test(data.toString())) {
      md += \`- [\${data.toString().match(pattern)[0].slice(2)}](./\${file})\\n\`;
    }
  }
}

let fileName = &quot;README.md&quot;;
let finalMd = \`# \${head}\\n\` + md;
try {
  const data = fs.writeFileSync(fileName, finalMd);
  //文件写入成功。
  console.log(\`\${fileName}创建成功\`);
} catch (err) {
  console.error(err);
}

</code></pre><div class="hint-container tip"><p class="hint-container-title">提示</p><p>生成</p><pre><code class="language-markdown"># windows-tutor

## autohotkey-tutor

- [一些好用的ahk脚本](./autohotkey-tutor/awesome-ahk.md)
- [autohotkey和autoit教程](./autohotkey-tutor/README.md)

## cpp-tutor

- [clion配置](./cpp-tutor/clion.md)
- [cpp的gui库](./cpp-tutor/cpp-gui-libs.md)
- [qt开源例子](./cpp-tutor/qt-opensource.md)
- [cpp教程](./cpp-tutor/README.md)

## golang-tutor

- [go命令行参数](./golang-tutor/go-cli.md)
- [依赖管理](./golang-tutor/go-deps.md)
- [Go命名规范](./golang-tutor/go-format.md)
- [常用框架](./golang-tutor/golang-opensource.md)
- [golang常用技巧](./golang-tutor/golang-tips.md)
- [golang配置](./golang-tutor/install-golang.md)
- [golang-tutor](./golang-tutor/README.md)

</code></pre></div><h2 id="获取一个文件夹所有的md文件" tabindex="-1"><a class="header-anchor" href="#获取一个文件夹所有的md文件"><span>获取一个文件夹所有的md文件</span></a></h2><pre><code class="language-js">//getFilename.mjs
import fs from &quot;fs&quot;;
import path from &quot;path&quot;;
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  let dirPath = { name: path.resolve().split(&quot;\\\\&quot;).pop(), files: [] };
  files.forEach((item, index) =&gt; {
    let fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    // console.log(path.extname(item));
    // console.log(fullPath);
    if (stat.isDirectory() || path.extname(item).toLowerCase() != &quot;.md&quot;) {
      //   console.log(&quot;not markdown&quot;, item.toString());
    } else {
      filesList.push(fullPath.replace(&quot;\\\\&quot;, &quot;/&quot;));
    }
  });
  // filesList.push(dirPath);
  return filesList;
}
let filesList = [];
readFileList(&quot;./&quot;, filesList);
console.log(filesList);
fs.writeFile(
  &quot;filelist.txt&quot;,
  filesList.join(\`\\n\`),
  { encoding: &quot;utf-8&quot; },
  (err, data) =&gt; {
    if (err) {
    } else {
      console.log(&quot;success&quot;);
    }
  }
);

</code></pre><div class="hint-container tip"><p class="hint-container-title">提示</p><p>输出</p><pre><code class="language-text">about.md
contact.md
README.md
</code></pre></div><h2 id="批量rst文件转为md文件" tabindex="-1"><a class="header-anchor" href="#批量rst文件转为md文件"><span>批量rst文件转为md文件</span></a></h2><pre><code class="language-js">// convert_rst_to_md.mjs
import { exec } from &quot;child_process&quot;;
import fs from &quot;fs&quot;;
import path from &quot;path&quot;;
function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  let dirPath = { name: path.resolve(dir).split(&quot;\\\\&quot;).pop(), files: [] };
  files.forEach((item, index) =&gt; {
    let fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() &amp;&amp; item != &quot;res&quot;) {
      readFileList(path.join(dir, item), filesList); //递归读取文件
    } else {
      if (path.extname(item) == &quot;.rst&quot;) {
        console.log(item);
        exec(\`pandoc \${item} -f rst -t markdown -o \${item.split(&quot;.&quot;)[0]}.md\`);
        dirPath.files.push(fullPath.replace(&quot;\\\\&quot;, &quot;/&quot;));
      }
      // filesList.push(fullPath.replace(&quot;\\\\&quot;, &quot;/&quot;));
    }
  });
  filesList.push(dirPath);
  return filesList;
}
let filesList = [];
readFileList(&quot;./&quot;, filesList);
//
console.log(filesList);

</code></pre><h2 id="在每个文件夹里都生成一个readme-md文件-vuepress文件夹除外" tabindex="-1"><a class="header-anchor" href="#在每个文件夹里都生成一个readme-md文件-vuepress文件夹除外"><span>在每个文件夹里都生成一个README.md文件(.vuepress文件夹除外)</span></a></h2><pre><code class="language-js">//操作文件
/*
  1、fs.stat 获取文件状态
  2、fs.readdir 读取文件夹数据
  3、fs.access 判断文件夹是否存在
  4、path.join 拼路径
*/
//操作文件
import fs from &quot;fs&quot;;
//操作路径
import path from &quot;path&quot;;
//1.接受命令行命令
//3.判断路径是否存在
//2.修正路径
let inputPath = &quot;./&quot;; //[2]是输入的路径名
if (!inputPath) {
  //判断有没有输入内容
  throw &quot;请输入文件名！&quot;;
}
//转换路径格式为绝对路径
inputPath = path.resolve(inputPath);
//输入的路径存在就执行递归
try {
  //扩展：&#39;.F_OK&#39;===&#39;检查目录中是否存在文件&#39;
  //&#39;.R_OK&#39;===&#39;检查文件是否可读&#39;,详细见nodejs文档
  //也可以这样写 ：判断是否存在，以及是否可读
  //fs.accessSync(inputPath,fs.constants.F_OK|fs.constants.R_OK);
  //这里的 fs.constants.F_OK 是默认值，不用写
  fs.accessSync(inputPath);
  genReadmeFiles(inputPath);
} catch (err) {
  console.log(err);
}

function genReadmeFiles(filePath) {
  let state = fs.statSync(filePath);
  if (state.isFile()) {
    //是文件
    // console.log(filePath);
  } else if (state.isDirectory() &amp;&amp; !filePath.includes(&quot;vuepress&quot;)) {
    //是文件夹
    //先读取

    if (fs.existsSync(path.resolve(filePath, &quot;README.md&quot;))) {
      console.log(\`\${filePath}已经有readme了\`);
    } else {
      let fileName = &quot;README.md&quot;;
      fs.writeFileSync(
        path.join(filePath, fileName),
        &quot;# &quot; + filePath.split(&quot;\\\\&quot;).pop()
      );
    }
    let files = fs.readdirSync(filePath);
    files.forEach((file) =&gt; {
      //   console.log(path.join(filePath, file) + &quot;，file&quot;);

      genReadmeFiles(path.join(filePath, file));
    });
  }
}


</code></pre><h2 id="循环遍历文件夹-并输出文件内容" tabindex="-1"><a class="header-anchor" href="#循环遍历文件夹-并输出文件内容"><span>循环遍历文件夹,并输出文件内容</span></a></h2><pre><code class="language-js">let fs = require(&quot;fs&quot;);
let path = require(&quot;path&quot;); //解析需要遍历的文件夹
let filePath = path.resolve(&quot;./&quot;);
//调用文件遍历方法
fileDisplay(filePath);
//文件遍历方法
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err);
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        let filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn(&quot;获取文件stats失败&quot;);
          } else {
            let isFile = stats.isFile(); //是文件
            let isDir = stats.isDirectory(); //是文件夹
            if (isFile) {
              console.log(filedir); // 读取文件内容
              let content = fs.readFileSync(filedir, &quot;utf-8&quot;);
              console.log(content);
            }
            if (isDir) {
              fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        });
      });
    }
  });
}

</code></pre><h2 id="把md文件里面的所有在线图片下载到res文件夹-并替换原来的md文件" tabindex="-1"><a class="header-anchor" href="#把md文件里面的所有在线图片下载到res文件夹-并替换原来的md文件"><span>把md文件里面的所有在线图片下载到res文件夹,并替换原来的md文件</span></a></h2><pre><code class="language-js">/**
 * 把md所有的在线链接图片下载到本地res目录,然后生成一个新的md文件
 */
import path from &quot;path&quot;;
import fs from &quot;fs&quot;;
import https from &quot;https&quot;;

let beforeName = \`transfer.md\`;
let afterName = \`transfer-tools.md\`;
let data = fs.readFileSync(beforeName);
let reg = new RegExp(/!\\[.*\\]\\(.+\\)/, &quot;gi&quot;);

let imgs = data.toString().match(reg);
for (let item of imgs) {
  console.log(&quot;img -length&quot;, imgs.length);
  let uri = replacerToUrl(item);
  let itemName = replacerFileName(item);
  await downloadFileAsync(uri, &quot;res/&quot; + itemName);
  await writeMd();
}
function replacerToUrl(match) {
  let str = match.match(/http.+\\)/)[0];

  return str.substring(0, str.length - 1);
}
/**
 * 生成如下的格式(1624847415629-4a7a5f1e-7644-4370-9ed7-e1f83ce4873f.png)
 * @param {s} match
 * @returns
 */
function replacerFileName(match) {
  console.log(match);
  let extReg = new RegExp(/\\d*-.*\\.(png|jpg|gif|webp)/, &quot;gi&quot;);
  let resArr = match.match(/\\/\\w*/gi);
  console.log(resArr[resArr.length - 1].slice(1));
  if (extReg.test(match)) {
    return match.match(extReg)[0];
  } else {
    return resArr[resArr.length - 1].slice(1) + &quot;.png&quot;;
  }
}
function replacerMd(match) {
  return \`![\${replacerFileName(match)}](./res/\${replacerFileName(match)})\`;
}
function writeMd() {
  let arr = data.toString().replaceAll(reg, replacerMd);
  fs.writeFileSync(afterName, arr);
}

function downloadFileAsync(uri, dest) {
  return new Promise((resolve, reject) =&gt; {
    // 确保dest路径存在
    const file = fs.createWriteStream(dest);

    https.get(uri, (res) =&gt; {
      if (res.statusCode !== 200) {
        reject(response.statusCode);
        return;
      }

      res.on(&quot;end&quot;, () =&gt; {
        console.log(&quot;download end&quot;);
      });

      // 进度、超时等

      file
        .on(&quot;finish&quot;, () =&gt; {
          console.log(&quot;finish write file&quot;);
          file.close(resolve);
        })
        .on(&quot;error&quot;, (err) =&gt; {
          fs.unlink(dest);
          reject(err.message);
        });

      res.pipe(file);
    });
  });
}


</code></pre>`,21),l=[s];function a(r,d){return n(),e("div",null,l)}const c=t(i,[["render",a],["__file","node-snippets.html.vue"]]),f=JSON.parse('{"path":"/cs-tips/frontend/snippets/node-snippets.html","title":"nodejs代码块","lang":"zh-CN","frontmatter":{"description":"nodejs代码块 遍历文件夹并生成标题 提示 生成 遍历文件夹里面的markdown 提示 输出 深层次遍历文件夹并输出markdown标题 提示 生成 获取一个文件夹所有的md文件 提示 输出 批量rst文件转为md文件 在每个文件夹里都生成一个README.md文件(.vuepress文件夹除外) 循环遍历文件夹,并输出文件内容 把md文件里面的...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/snippets/node-snippets.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"nodejs代码块"}],["meta",{"property":"og:description","content":"nodejs代码块 遍历文件夹并生成标题 提示 生成 遍历文件夹里面的markdown 提示 输出 深层次遍历文件夹并输出markdown标题 提示 生成 获取一个文件夹所有的md文件 提示 输出 批量rst文件转为md文件 在每个文件夹里都生成一个README.md文件(.vuepress文件夹除外) 循环遍历文件夹,并输出文件内容 把md文件里面的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nodejs代码块\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"遍历文件夹并生成标题","slug":"遍历文件夹并生成标题","link":"#遍历文件夹并生成标题","children":[]},{"level":2,"title":"遍历文件夹里面的markdown","slug":"遍历文件夹里面的markdown","link":"#遍历文件夹里面的markdown","children":[]},{"level":2,"title":"深层次遍历文件夹并输出markdown标题","slug":"深层次遍历文件夹并输出markdown标题","link":"#深层次遍历文件夹并输出markdown标题","children":[]},{"level":2,"title":"获取一个文件夹所有的md文件","slug":"获取一个文件夹所有的md文件","link":"#获取一个文件夹所有的md文件","children":[]},{"level":2,"title":"批量rst文件转为md文件","slug":"批量rst文件转为md文件","link":"#批量rst文件转为md文件","children":[]},{"level":2,"title":"在每个文件夹里都生成一个README.md文件(.vuepress文件夹除外)","slug":"在每个文件夹里都生成一个readme-md文件-vuepress文件夹除外","link":"#在每个文件夹里都生成一个readme-md文件-vuepress文件夹除外","children":[]},{"level":2,"title":"循环遍历文件夹,并输出文件内容","slug":"循环遍历文件夹-并输出文件内容","link":"#循环遍历文件夹-并输出文件内容","children":[]},{"level":2,"title":"把md文件里面的所有在线图片下载到res文件夹,并替换原来的md文件","slug":"把md文件里面的所有在线图片下载到res文件夹-并替换原来的md文件","link":"#把md文件里面的所有在线图片下载到res文件夹-并替换原来的md文件","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":5.64,"words":1692},"filePathRelative":"cs-tips/frontend/snippets/node-snippets.md","localizedDate":"2023年5月25日","autoDesc":true}');export{c as comp,f as data};
