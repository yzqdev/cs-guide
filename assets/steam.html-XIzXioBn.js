import{_ as e,c as t,o as n,d as a}from"./app-CbULZrmi.js";const r={},o=a(`<h1 id="流" tabindex="-1"><a class="header-anchor" href="#流"><span>流</span></a></h1><h2 id="读取流" tabindex="-1"><a class="header-anchor" href="#读取流"><span>读取流</span></a></h2><pre><code class="language-js">let data = &#39;&#39;;

// 创建可读流
let readerStream = fs.createReadStream(&#39;input.txt&#39;);

// 设置编码为 utf8。
readerStream.setEncoding(&#39;UTF8&#39;);

// 处理流事件 --&gt; data, end, and error
readerStream.on(&#39;data&#39;, function(chunk) {
   data += chunk;
});

readerStream.on(&#39;end&#39;,function(){
   console.log(data);
});

readerStream.on(&#39;error&#39;, function(err){
   console.log(err.stack);
});

console.log(&quot;程序执行完毕&quot;);
</code></pre><h2 id="写入流" tabindex="-1"><a class="header-anchor" href="#写入流"><span>写入流</span></a></h2><pre><code class="language-js">let data = &#39;菜鸟教程官网地址：www.runoob.com&#39;;

// 创建一个可以写入的流，写入到文件 output.txt 中
let writerStream = fs.createWriteStream(&#39;output.txt&#39;);

// 使用 utf8 编码写入数据
writerStream.write(data,&#39;UTF8&#39;);

// 标记文件末尾
writerStream.end();

// 处理流事件 --&gt; finish、error
writerStream.on(&#39;finish&#39;, function() {
    console.log(&quot;写入完成。&quot;);
});

writerStream.on(&#39;error&#39;, function(err){
   console.log(err.stack);
});

console.log(&quot;程序执行完毕&quot;);

</code></pre><h2 id="创建一个大文件" tabindex="-1"><a class="header-anchor" href="#创建一个大文件"><span>创建一个大文件</span></a></h2><pre><code class="language-js">import fs from &#39;fs&#39;
const file = fs.createWriteStream(&#39;./bigfile.txt&#39;);

for(let i=0; i&lt;= 500; i++) {
  file.write(&#39;Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\\n&#39;);
}

file.end();
</code></pre><p>Node的fs模块给我们提供了一个可以操作任何文件的可读流,通过createReadStream方法创建。我们可以把它和response对象连接起来。</p><pre><code class="language-js">import fs from &#39;fs&#39;
import { createServer } from &#39;http&#39;;
let server=createServer()
server.on(&quot;request&quot;, (req, res) =&gt; {
  const src = fs.createReadStream(&quot;./bigfile.txt&quot;);
  src.pipe(res);
});

server.listen(8000);

</code></pre><h2 id="链式流" tabindex="-1"><a class="header-anchor" href="#链式流"><span>链式流</span></a></h2><p>链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。</p><p>接下来我们就是用管道和链式来压缩和解压文件。</p><pre><code class="language-js">压缩
// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream(&#39;input.txt&#39;)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(&#39;input.txt.gz&#39;));
  
console.log(&quot;文件压缩完成。&quot;);
</code></pre><p>解压</p><pre><code class="language-js">// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream(&#39;input.txt.gz&#39;)
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream(&#39;input.txt&#39;));
  
console.log(&quot;文件解压完成。&quot;);

</code></pre><h2 id="实现一个可写流" tabindex="-1"><a class="header-anchor" href="#实现一个可写流"><span>实现一个可写流</span></a></h2><p>你输入什么,他输出什么</p><pre><code class="language-js">import {Writable} from &#39;stream&#39;

const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },
});

process.stdin.pipe(outStream);
</code></pre><h2 id="创建一个可读流" tabindex="-1"><a class="header-anchor" href="#创建一个可读流"><span>创建一个可读流</span></a></h2><pre><code class="language-js">import {Readable} from &#39;stream&#39;

const inStream = new Readable();
inStream.push(&quot;ABCDEFGHIJKLM&quot;);
inStream.push(&quot;NOPQRSTUVWXYZ&quot;);
inStream.push(null); // No more data
inStream.pipe(process.stdout);
</code></pre>`,20),i=[o];function s(c,l){return n(),t("div",null,i)}const p=e(r,[["render",s],["__file","steam.html.vue"]]),u=JSON.parse('{"path":"/node-tutor/apis/steam.html","title":"流","lang":"zh-CN","frontmatter":{"description":"流 读取流 写入流 创建一个大文件 Node的fs模块给我们提供了一个可以操作任何文件的可读流,通过createReadStream方法创建。我们可以把它和response对象连接起来。 链式流 链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。 接下来我们就是用管道和链式来压缩和解压文件。 解压 实现一个可写流 你输入...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/apis/steam.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"流"}],["meta",{"property":"og:description","content":"流 读取流 写入流 创建一个大文件 Node的fs模块给我们提供了一个可以操作任何文件的可读流,通过createReadStream方法创建。我们可以把它和response对象连接起来。 链式流 链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。 接下来我们就是用管道和链式来压缩和解压文件。 解压 实现一个可写流 你输入..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"流\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"读取流","slug":"读取流","link":"#读取流","children":[]},{"level":2,"title":"写入流","slug":"写入流","link":"#写入流","children":[]},{"level":2,"title":"创建一个大文件","slug":"创建一个大文件","link":"#创建一个大文件","children":[]},{"level":2,"title":"链式流","slug":"链式流","link":"#链式流","children":[]},{"level":2,"title":"实现一个可写流","slug":"实现一个可写流","link":"#实现一个可写流","children":[]},{"level":2,"title":"创建一个可读流","slug":"创建一个可读流","link":"#创建一个可读流","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.63,"words":488},"filePathRelative":"node-tutor/apis/steam.md","localizedDate":"2023年6月25日","autoDesc":true}');export{p as comp,u as data};
