import{_ as t,c as e,o as n,d as o}from"./app-CbULZrmi.js";const i={},l=o(`<h1 id="视频操作" tabindex="-1"><a class="header-anchor" href="#视频操作"><span>视频操作</span></a></h1><h2 id="在一个视频文件夹生成index-html" tabindex="-1"><a class="header-anchor" href="#在一个视频文件夹生成index-html"><span>在一个视频文件夹生成index.html</span></a></h2><h3 id="清除文件名中的不规则字符" tabindex="-1"><a class="header-anchor" href="#清除文件名中的不规则字符"><span>清除文件名中的不规则字符</span></a></h3><pre><code class="language-js">//removeSpace.mjs
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

    if (stat.isDirectory()) {
      //   console.log(&quot;not markdown&quot;, item.toString());
    } else {
      const pathToFile = path.join(path.resolve(&quot;./&quot;), item);
      const newPathToFile = path.join(
        path.resolve(&quot;./&quot;),
        item.replace(/#/gm, &quot;-&quot;)
      );
      fs.rename(pathToFile, newPathToFile, (err) =&gt; {
        if (err) {
          throw err;
        } else {
          console.log(&quot;Successfully renamed the file!&quot;);
        }
      });
      console.log(newPathToFile);
      filesList.push(fullPath.replace(&quot;\\\\&quot;, &quot;/&quot;));
    }
  });
  // filesList.push(dirPath);
  return filesList;
}
let files = [];
readFileList(&quot;./&quot;, files);
console.log(files);

</code></pre><h3 id="生成index-html" tabindex="-1"><a class="header-anchor" href="#生成index-html"><span>生成index.html</span></a></h3><pre><code class="language-js">//getFilename.mjs
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
    if (stat.isDirectory() || path.extname(item).toLowerCase() != &quot;.mp4&quot;) {
      //   console.log(&quot;not markdown&quot;, item.toString());
    } else {
      filesList.push(fullPath.replace(&quot;\\\\&quot;, &quot;/&quot;));
    }
  });
  // filesList.push(dirPath);
  return filesList;
}
let head = \`&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot; /&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot; /&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;
    &lt;title&gt;Document&lt;/title&gt;
    &lt;script src=&quot;https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js&quot;&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body style=&#39;display:flex&#39;&gt;\`;
let videos = [];
let filesList = [];
readFileList(&quot;./&quot;, filesList);
console.log(filesList);
for (let index = 0; index &lt; filesList.length; index++) {
  const element = filesList[index];
  videos.push(
    \`&lt;video style=&#39;width:25%&#39; controls&gt;&lt;source src=&quot;\${element}&quot; type=&quot;video/mp4&quot;&gt;&lt;/video&gt;\`
  );
}
let end = \`  &lt;/body&gt;
&lt;/html&gt;
\`;
fs.writeFile(
  &quot;index.html&quot;,
  head + videos.join(\`\\n\`) + end,
  { encoding: &quot;utf-8&quot; },
  (err, data) =&gt; {
    if (err) {
    } else {
      console.log(&quot;success&quot;);
    }
  }
);

</code></pre>`,6),s=[l];function a(r,d){return n(),e("div",null,s)}const h=t(i,[["render",a],["__file","gen-videopage.html.vue"]]),u=JSON.parse('{"path":"/node-tutor/node-snippets/gen-videopage.html","title":"视频操作","lang":"zh-CN","frontmatter":{"description":"视频操作 在一个视频文件夹生成index.html 清除文件名中的不规则字符 生成index.html","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/node-snippets/gen-videopage.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"视频操作"}],["meta",{"property":"og:description","content":"视频操作 在一个视频文件夹生成index.html 清除文件名中的不规则字符 生成index.html"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"视频操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"在一个视频文件夹生成index.html","slug":"在一个视频文件夹生成index-html","link":"#在一个视频文件夹生成index-html","children":[{"level":3,"title":"清除文件名中的不规则字符","slug":"清除文件名中的不规则字符","link":"#清除文件名中的不规则字符","children":[]},{"level":3,"title":"生成index.html","slug":"生成index-html","link":"#生成index-html","children":[]}]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.97,"words":290},"filePathRelative":"node-tutor/node-snippets/gen-videopage.md","localizedDate":"2023年6月25日","autoDesc":true}');export{h as comp,u as data};
