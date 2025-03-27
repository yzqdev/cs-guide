import{_ as e,c as a,a as p,o}from"./app-C8DxhDIZ.js";const c={};function r(t,s){return o(),a("div",null,s[0]||(s[0]=[p(`<h1 id="process-对象" tabindex="-1"><a class="header-anchor" href="#process-对象"><span>process 对象</span></a></h1><p><code>process</code>对象是 Node 原生提供的对象，表示当前运行的 Node 进程。它不用引入模块，可以直接使用。</p><h2 id="process-argv" tabindex="-1"><a class="header-anchor" href="#process-argv"><span>process.argv</span></a></h2><p><code>process.argv</code>是一个数组，表示启动脚本时的命令行参数。</p><p>它的前两项是固定的。</p><ul><li>第一项是 Node 可执行文件的路径</li><li>第二项是 JavaScript 脚本的路径</li></ul><p>后面的数组成员都是命令行参数。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">node</span> index.js <span class="token parameter variable">--watch</span></span>
<span class="line"></span></code></pre></div><p>上面这个命令执行后，在<code>index.js</code>脚本里面，<code>process.argv</code>数组共有三项。</p><ul><li><code>process.argv[0]</code>：/path/to/node</li><li><code>process.argv[1]</code>：/path/to/index.js</li><li><code>process.argv[2]</code>：--watch</li></ul><p>如果只需要命令行参数，可以用解构赋值获取。</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">const</span> <span class="token punctuation">[</span> <span class="token punctuation">,</span> <span class="token punctuation">,</span> <span class="token operator">...</span>args <span class="token punctuation">]</span> <span class="token operator">=</span> process<span class="token punctuation">.</span>argv<span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// &quot;--watch&quot;</span></span>
<span class="line"></span></code></pre></div><p>上面代码，<code>args</code>数组就是通过解构赋值，拿到的所有命令行参数。</p><h2 id="process-cwd" tabindex="-1"><a class="header-anchor" href="#process-cwd"><span>process.cwd()</span></a></h2><p>当前js文件执行路径,跟系统pwd一样</p><h2 id="process-memoryusage" tabindex="-1"><a class="header-anchor" href="#process-memoryusage"><span>process.memoryUsage()</span></a></h2><p>获取当前进程所使用的的内存</p><h2 id="process-cpuusage" tabindex="-1"><a class="header-anchor" href="#process-cpuusage"><span>process.cpuUsage()</span></a></h2><p>获取cpu占用</p><h2 id="process-versions-process-arch-process-env-process-platform" tabindex="-1"><a class="header-anchor" href="#process-versions-process-arch-process-env-process-platform"><span>process.versions,process.arch,process.env,process.platform</span></a></h2><p>获取系统相关信息</p><h2 id="process-execpath" tabindex="-1"><a class="header-anchor" href="#process-execpath"><span>process.execPath</span></a></h2><p>获取执行目录</p><h2 id="process-uptime-process-pid" tabindex="-1"><a class="header-anchor" href="#process-uptime-process-pid"><span>process.uptime(),process.pid</span></a></h2><p>获取运行时间,当前pid</p>`,25)]))}const i=e(c,[["render",r]]),l=JSON.parse('{"path":"/node-tutor/apis/process.html","title":"process 对象","lang":"zh-CN","frontmatter":{"description":"process 对象 process对象是 Node 原生提供的对象，表示当前运行的 Node 进程。它不用引入模块，可以直接使用。 process.argv process.argv是一个数组，表示启动脚本时的命令行参数。 它的前两项是固定的。 第一项是 Node 可执行文件的路径 第二项是 JavaScript 脚本的路径 后面的数组成员都是命令行...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/apis/process.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"process 对象"}],["meta",{"property":"og:description","content":"process 对象 process对象是 Node 原生提供的对象，表示当前运行的 Node 进程。它不用引入模块，可以直接使用。 process.argv process.argv是一个数组，表示启动脚本时的命令行参数。 它的前两项是固定的。 第一项是 Node 可执行文件的路径 第二项是 JavaScript 脚本的路径 后面的数组成员都是命令行..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"process 对象\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"process.argv","slug":"process-argv","link":"#process-argv","children":[]},{"level":2,"title":"process.cwd()","slug":"process-cwd","link":"#process-cwd","children":[]},{"level":2,"title":"process.memoryUsage()","slug":"process-memoryusage","link":"#process-memoryusage","children":[]},{"level":2,"title":"process.cpuUsage()","slug":"process-cpuusage","link":"#process-cpuusage","children":[]},{"level":2,"title":"process.versions,process.arch,process.env,process.platform","slug":"process-versions-process-arch-process-env-process-platform","link":"#process-versions-process-arch-process-env-process-platform","children":[]},{"level":2,"title":"process.execPath","slug":"process-execpath","link":"#process-execpath","children":[]},{"level":2,"title":"process.uptime(),process.pid","slug":"process-uptime-process-pid","link":"#process-uptime-process-pid","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.86,"words":258},"filePathRelative":"node-tutor/apis/process.md","localizedDate":"2023年6月25日","autoDesc":true}');export{i as comp,l as data};
