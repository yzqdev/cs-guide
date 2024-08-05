import{_ as e,c as t,o as n,d as o}from"./app-CbULZrmi.js";const r={},i=o(`<h1 id="文件操作" tabindex="-1"><a class="header-anchor" href="#文件操作"><span>文件操作</span></a></h1><h2 id="与commonjs不同" tabindex="-1"><a class="header-anchor" href="#与commonjs不同"><span>与commonjs不同</span></a></h2><pre><code class="language-js">const __dirname = path.resolve(path.dirname(&#39;&#39;))
</code></pre><h2 id="读取文件树" tabindex="-1"><a class="header-anchor" href="#读取文件树"><span>读取文件树</span></a></h2><pre><code class="language-js">import fs from &quot;fs&quot;;
import path from &quot;path&quot;;
const componentDir = path.resolve();
console.log(&quot;componentDir: &quot;, componentDir);
export function readDir(dir) {
  return fs.readdirSync(dir, (err, files) =&gt; {
    if (err) throw err;
    // console.log(\`\${dir}, files: \`.green, files);
    // if (!files.length) console.log(\`\${dir}: 文件夹为空\`.redBG);
    return files;
  });
}

// 判断制定路径是否是文件
export function isFile(dir) {
  return fs.statSync(dir).isFile();
}

// 获取目录名
export function getDirName(dir) {
  let tempdir = dir.substr(dir.lastIndexOf(&quot;/&quot;) + 1, dir.length);
  return tempdir;
}

// const components_out = readFile(path.resolve(__dirname, &#39;./components-dir-tree.json&#39;));
// console.log(&#39;components-dir-tree: &#39;, components_out);

// 读取指定目录的文件
export function readFile(dir) {
  let result = fs.readFileSync(dir, &quot;utf-8&quot;);
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
  if (isFile(dir)) return console.log(\`\${dir}: 不是文件夹\`.redBG);

  // 读取目录
  let files = readDir(dir);
  if (!files.length) console.log(\`\${dir}: 文件夹为空\`.redBG);

  // 遍历文件
  files.forEach((file) =&gt; {
    let tempdir = \`\${dir}/\${file}\`;
    if (isFile(tempdir)) {
      obj.childFiles.push({
        short: file, // 文件名
        full: tempdir, // 完整路径
      });
    } else {
      console.log(&quot;tempdir: &quot;, tempdir);
      let dirname = getDirName(tempdir);
      // 在当前文件夹的对象下 childDir 属性(1)，以文件夹名作为key(2)，
      // (2)的值是该目录下 路径dir、childFiles子文件、childDir子文件夹组成的对象或null
      obj.childDir[dirname] = getDirTree(tempdir);
    }
  });
  return JSON.stringify(obj) === objStr ? null : obj;
}

const ComponentInit = (function init() {
  console.log(&quot;______ init ______&quot;, &quot;\\n&quot;);
  let treeObj = getDirTree(componentDir);
  // console.log(&#39;treeObj: &#39;,treeObj);
  if (treeObj) {
    let curPath = \`\${path.resolve()}/\`;
    let outdir = \`\${getDirName(componentDir)}-dir-tree.json\`;
    // 写入文件
    fs.writeFile(outdir, JSON.stringify(treeObj, &quot;&quot;, &quot;\\t&quot;), &quot;utf8&quot;, (err) =&gt; {
      if (err) throw err;
      console.log(\`目录树已输出为文件保存: \${outdir}\`);
    });
  }
  return init;
})();

ComponentInit();

</code></pre>`,5),l=[i];function s(d,a){return n(),t("div",null,l)}const p=e(r,[["render",s],["__file","file-operation.html.vue"]]),m=JSON.parse('{"path":"/node-tutor/node-snippets/file-operation.html","title":"文件操作","lang":"zh-CN","frontmatter":{"description":"文件操作 与commonjs不同 读取文件树","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/node-snippets/file-operation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"文件操作"}],["meta",{"property":"og:description","content":"文件操作 与commonjs不同 读取文件树"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"文件操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"与commonjs不同","slug":"与commonjs不同","link":"#与commonjs不同","children":[]},{"level":2,"title":"读取文件树","slug":"读取文件树","link":"#读取文件树","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.31,"words":394},"filePathRelative":"node-tutor/node-snippets/file-operation.md","localizedDate":"2023年6月25日","autoDesc":true}');export{p as comp,m as data};
