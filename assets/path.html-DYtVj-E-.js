import{_ as e,c as t,o as a,d as s}from"./app-CbULZrmi.js";const n={},p=s(`<h1 id="path" tabindex="-1"><a class="header-anchor" href="#path"><span>path</span></a></h1><p>path模块提供和系统路径相关的api</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p><code>path.sep</code>在windows上是<code>\\</code>,在linux上是<code>/</code><code>path.delimiter</code>在windows上是<code>;</code>在linux上是<code>/</code></p></div><h2 id="path-basename" tabindex="-1"><a class="header-anchor" href="#path-basename"><span>path.basename()</span></a></h2><p>获取基础路径</p><pre><code class="language-ts">import {basename } from &#39;path&#39;
basename(&#39;/test/something&#39;); // something
basename(&#39;/test/something.txt&#39;); // something.txt
basename(&#39;/test/something.txt&#39;, &#39;.txt&#39;); // something
</code></pre><h2 id="path-dirname" tabindex="-1"><a class="header-anchor" href="#path-dirname"><span>path.dirname()</span></a></h2><p>获取路径名称</p><pre><code class="language-ts">dirname(&#39;/test/something&#39;); // /test
dirname(&#39;/test/something/file.txt&#39;); // /test/something
</code></pre><h2 id="path-extname" tabindex="-1"><a class="header-anchor" href="#path-extname"><span>path.extname()</span></a></h2><p>获取后缀</p><pre><code class="language-ts">extname(&#39;/test/something&#39;); // &#39;&#39;
extname(&#39;/test/something/file.txt&#39;); // &#39;.txt&#39;
</code></pre><h2 id="path-format" tabindex="-1"><a class="header-anchor" href="#path-format"><span>path.format()</span></a></h2><p><code>path.parse</code>的反面</p><pre><code class="language-ts">// POSIX
format({ dir: &#39;/Users/joe&#39;, base: &#39;test.txt&#39; }); //  &#39;/Users/joe/test.txt&#39;
format({ root: &#39;/Users/joe&#39;, name: &#39;test&#39;, ext: &#39;.txt&#39; }); //  &#39;/Users/joe/test.txt&#39;
//windows
format({ dir: &#39;C:\\\\Users\\\\joe&#39;, base: &#39;test.txt&#39; }); //  &#39;C:\\\\Users\\\\joe\\\\test.txt&#39;
</code></pre><h2 id="path-isabsolute" tabindex="-1"><a class="header-anchor" href="#path-isabsolute"><span>path.isAbsolute()</span></a></h2><p>是否是绝对路径</p><pre><code class="language-ts">isAbsolute(&#39;/test/something&#39;); // true
isAbsolute(&#39;./test/something&#39;); // false

</code></pre><h2 id="path-join" tabindex="-1"><a class="header-anchor" href="#path-join"><span>path.join</span></a></h2><pre><code class="language-ts">const name = &#39;joe&#39;;
 join(&#39;/&#39;, &#39;users&#39;, name, &#39;notes.txt&#39;); // &#39;/users/joe/notes.txt&#39;
</code></pre><p>使用平台特定的分隔符（window：/）作为定界符,将所有给定的path片段连接在一起,然后规范化生成的路径</p><pre><code class="language-js">path.join(&#39;a&#39;, &#39;b&#39;, &#39;c&#39;)   // 输出结果为： &#39;/a/b/c&#39;
path.join(&#39;a&#39;, &#39;/b&#39;, &#39;c&#39;)  // 输出结果为： &#39;/a/b/c&#39;
path.join(&#39;a/b&#39;, &#39;../&#39;, &#39;c&#39;) // 输出结果为： &#39;/a/c&#39;
path.join(&#39;a&#39;, &#39;./&#39;, &#39;c&#39;) // 输出结果为：&#39;/a/c&#39;
</code></pre><h2 id="path-resolve" tabindex="-1"><a class="header-anchor" href="#path-resolve"><span>path.resolve()</span></a></h2><p>将路径或者路径片段序列化为绝对路径</p><pre><code class="language-js">// 假设当前绝对路径为/admin/user
path.resolve(&#39;a&#39;, &#39;b&#39;, &#39;c&#39;) // 输出结果为：&#39;/admin/user/a/a/c&#39;
path.resolve(&#39;a&#39;, &#39;/b&#39;, &#39;c&#39;) // 输出结果为： &#39;/b/c&#39;
path.resolve(&#39;a/b&#39;, &#39;../&#39;, &#39;c&#39;) // 输出结果为：&#39;/admin/user/a/c&#39;
path.resolve(&#39;a&#39;, &#39;./&#39;, &#39;c&#39;) // 输出结果为：&#39;admin/user/a/c&#39;
resolve(&#39;joe.txt&#39;); // &#39;/Users/joe/joe.txt&#39; if run from my home folder
resolve(&#39;tmp&#39;, &#39;joe.txt&#39;); // &#39;/Users/joe/tmp/joe.txt&#39; if run from my home folder
resolve(&#39;/etc&#39;, &#39;joe.txt&#39;); // &#39;/etc/joe.txt&#39;
注意\`/\`的存在, &#39;/a&#39;代表的是根目录下的a, &#39;a&#39;代表的是当前目录下的a
</code></pre><p>为了要获取到符合 <code>/</code> 格式的路径，我们可以使用 <code>PATH</code> 模块提供的 <code>path.sep</code> <a href="https://nodejs.org/dist/latest-v12.x/docs/api/path.html#path_path_sep" target="_blank" rel="noopener noreferrer">接口</a>进行字符串匹配截取，接口会根据系统环境的不同进行匹配截取。</p><p>在 Unix 系统下</p><pre><code class="language-js">foo/bar/baz&#39;.split(path.sep);
// Returns: [&#39;foo&#39;, &#39;bar&#39;, &#39;baz&#39;]
</code></pre><p>Windows 系统下</p><pre><code class="language-js">foo\\\\bar\\\\baz&#39;.split(path.sep);
// Returns: [&#39;foo&#39;, &#39;bar&#39;, &#39;baz&#39;]
</code></pre><p><code>path.sep</code> 的赋值也是根据操作系统来决定是 <code>/</code> 还是 \`\\</p><p>最终的方案自然是 <code>string.split(path.sep).join(&#39;/&#39;)</code> 来进行分隔符的替换。</p><h2 id="path-normalize" tabindex="-1"><a class="header-anchor" href="#path-normalize"><span>path.normalize()</span></a></h2><p>计算最合适的路径</p><pre><code class="language-ts">normalize(&#39;/users/joe/..//test.txt&#39;); // &#39;/users/test.txt&#39;
</code></pre><h2 id="path-parse" tabindex="-1"><a class="header-anchor" href="#path-parse"><span>path.parse()</span></a></h2><p>解析路径</p><pre><code class="language-ts">parse(&#39;/users/test.txt&#39;);
//结果
{
  root: &#39;/&#39;,
  dir: &#39;/users&#39;,
  base: &#39;test.txt&#39;,
  ext: &#39;.txt&#39;,
  name: &#39;test&#39;
}
</code></pre><h2 id="path-relative" tabindex="-1"><a class="header-anchor" href="#path-relative"><span>path.relative()</span></a></h2><p>获取相对路径</p><pre><code class="language-ts">relative(&#39;/Users/joe&#39;, &#39;/Users/joe/test.txt&#39;); // &#39;test.txt&#39;
relative(&#39;/Users/joe&#39;, &#39;/Users/joe/something/test.txt&#39;); // &#39;something/test.txt&#39;

</code></pre>`,41),o=[p];function r(h,i){return a(),t("div",null,o)}const d=e(n,[["render",r],["__file","path.html.vue"]]),c=JSON.parse('{"path":"/node-tutor/apis/path.html","title":"path","lang":"zh-CN","frontmatter":{"description":"path path模块提供和系统路径相关的api 提示 path.sep在windows上是\\\\,在linux上是/ path.delimiter在windows上是;在linux上是/ path.basename() 获取基础路径 path.dirname() 获取路径名称 path.extname() 获取后缀 path.format() path....","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/apis/path.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"path"}],["meta",{"property":"og:description","content":"path path模块提供和系统路径相关的api 提示 path.sep在windows上是\\\\,在linux上是/ path.delimiter在windows上是;在linux上是/ path.basename() 获取基础路径 path.dirname() 获取路径名称 path.extname() 获取后缀 path.format() path...."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"path\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"path.basename()","slug":"path-basename","link":"#path-basename","children":[]},{"level":2,"title":"path.dirname()","slug":"path-dirname","link":"#path-dirname","children":[]},{"level":2,"title":"path.extname()","slug":"path-extname","link":"#path-extname","children":[]},{"level":2,"title":"path.format()","slug":"path-format","link":"#path-format","children":[]},{"level":2,"title":"path.isAbsolute()","slug":"path-isabsolute","link":"#path-isabsolute","children":[]},{"level":2,"title":"path.join","slug":"path-join","link":"#path-join","children":[]},{"level":2,"title":"path.resolve()","slug":"path-resolve","link":"#path-resolve","children":[]},{"level":2,"title":"path.normalize()","slug":"path-normalize","link":"#path-normalize","children":[]},{"level":2,"title":"path.parse()","slug":"path-parse","link":"#path-parse","children":[]},{"level":2,"title":"path.relative()","slug":"path-relative","link":"#path-relative","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.84,"words":553},"filePathRelative":"node-tutor/apis/path.md","localizedDate":"2023年6月25日","autoDesc":true}');export{d as comp,c as data};
