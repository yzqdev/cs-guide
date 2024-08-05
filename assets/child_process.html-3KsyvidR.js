import{_ as e,c as o,o as c,d as n}from"./app-CbULZrmi.js";const s={},d=n(`<h1 id="child-process" tabindex="-1"><a class="header-anchor" href="#child-process"><span>child_process</span></a></h1><p>NodeJS自带的<code>fs</code>模块比较基础，把一个目录里的所有文件和子目录都拷贝到另一个目录里需要写不少代码。另外我们也知道，终端下的<code>cp</code>命令比较好用，一条<code>cp -r source/* target</code>命令就能搞定目录拷贝。那我们首先看看如何使用NodeJS调用终端命令来简化目录拷贝，示例代码如下：</p><pre><code class="language-js"> let child_process = require(&#39;child_process&#39;);
 let util = require(&#39;util&#39;);

 function copy(source, target, callback) {
  child_process.exec(
   util.format(&#39;cp -r %s/* %s&#39;, source, target), callback);
 }

 copy(&#39;a&#39;, &#39;b&#39;, function (err) {
  // ...
 });
</code></pre><p>从以上代码中可以看到，子进程是异步运行的，通过回调函数返回执行结果。</p><h2 id="api走马观花" tabindex="-1"><a class="header-anchor" href="#api走马观花"><span>API走马观花</span></a></h2><p>我们先大致看看NodeJS提供了哪些和进程管理有关的API。这里并不逐一介绍每个API的使用方法，官方文档已经做得很好了。</p><h3 id="process" tabindex="-1"><a class="header-anchor" href="#process"><span>Process</span></a></h3><blockquote><p><strong>官方文档：</strong> <a href="http://nodejs.org/api/process.html" target="_blank" rel="noopener noreferrer">http://nodejs.org/api/process.html</a></p></blockquote><p>任何一个进程都有启动进程时使用的命令行参数，有标准输入标准输出，有运行权限，有运行环境和运行状态。在NodeJS中，可以通过<code>process</code>对象感知和控制NodeJS自身进程的方方面面。另外需要注意的是，<code>process</code>不是内置模块，而是一个全局对象，因此在任何地方都可以直接使用。</p><h3 id="child-process-1" tabindex="-1"><a class="header-anchor" href="#child-process-1"><span>Child Process</span></a></h3><blockquote><p><strong>官方文档：</strong> <a href="http://nodejs.org/api/child_process.html" target="_blank" rel="noopener noreferrer">http://nodejs.org/api/child_process.html</a></p></blockquote><p>使用<code>child_process</code>模块可以创建和控制子进程。该模块提供的API中最核心的是<code>.spawn</code>，其余API都是针对特定使用场景对它的进一步封装，算是一种语法糖。</p><h3 id="cluster" tabindex="-1"><a class="header-anchor" href="#cluster"><span>Cluster</span></a></h3><blockquote><p><strong>官方文档：</strong> <a href="http://nodejs.org/api/cluster.html" target="_blank" rel="noopener noreferrer">http://nodejs.org/api/cluster.html</a></p></blockquote><p><code>cluster</code>模块是对<code>child_process</code>模块的进一步封装，专用于解决单进程NodeJS Web服务器无法充分利用多核CPU的问题。使用该模块可以简化多进程服务器程序的开发，让每个核上运行一个工作进程，并统一通过主进程监听端口和分发请求。</p><h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景"><span>应用场景</span></a></h2><p>和进程管理相关的API单独介绍起来比较枯燥，因此这里从一些典型的应用场景出发，分别介绍一些重要API的使用方法。</p><h3 id="如何获取命令行参数" tabindex="-1"><a class="header-anchor" href="#如何获取命令行参数"><span>如何获取命令行参数</span></a></h3><p>在NodeJS中可以通过<code>process.argv</code>获取命令行参数。但是比较意外的是，<code>node</code>执行程序路径和主模块文件路径固定占据了<code>argv[0]</code>和<code>argv[1]</code>两个位置，而第一个命令行参数从<code>argv[2]</code>开始。为了让<code>argv</code>使用起来更加自然，可以按照以下方式处理。</p><pre><code class="language-js"> function main(argv) {
  // ...
 }

 main(process.argv.slice(2));
</code></pre><h3 id="如何退出程序" tabindex="-1"><a class="header-anchor" href="#如何退出程序"><span>如何退出程序</span></a></h3><p>通常一个程序做完所有事情后就正常退出了，这时程序的退出状态码为<code>0</code>。或者一个程序运行时发生了异常后就挂了，这时程序的退出状态码不等于<code>0</code>。如果我们在代码中捕获了某个异常，但是觉得程序不应该继续运行下去，需要立即退出，并且需要把退出状态码设置为指定数字，比如<code>1</code>，就可以按照以下方式：</p><pre><code class="language-js"> try {
  // ...
 } catch (err) {
  // ...
  process.exit(1);
 }
</code></pre><h3 id="如何控制输入输出" tabindex="-1"><a class="header-anchor" href="#如何控制输入输出"><span>如何控制输入输出</span></a></h3><p>NodeJS程序的标准输入流（stdin）、一个标准输出流（stdout）、一个标准错误流（stderr）分别对应<code>process.stdin</code>、<code>process.stdout</code>和<code>process.stderr</code>，第一个是只读数据流，后边两个是只写数据流，对它们的操作按照对数据流的操作方式即可。例如，<code>console.log</code>可以按照以下方式实现。</p><pre><code class="language-js"> function log() {
  process.stdout.write(
   util.format.apply(util, arguments) + &#39;\\n&#39;);
 }
</code></pre><h3 id="如何降权" tabindex="-1"><a class="header-anchor" href="#如何降权"><span>如何降权</span></a></h3><p>在Linux系统下，我们知道需要使用root权限才能监听1024以下端口。但是一旦完成端口监听后，继续让程序运行在root权限下存在安全隐患，因此最好能把权限降下来。以下是这样一个例子。</p><pre><code class="language-js"> http.createServer(callback).listen(80, function () {
  let env = process.env,
   uid = parseInt(env[&#39;SUDO_UID&#39;] || process.getuid(), 10),
   gid = parseInt(env[&#39;SUDO_GID&#39;] || process.getgid(), 10);

  process.setgid(gid);
  process.setuid(uid);
 });
</code></pre><p>上例中有几点需要注意：</p><ol><li><p>如果是通过<code>sudo</code>获取root权限的，运行程序的用户的UID和GID保存在环境变量<code>SUDO_UID</code>和<code>SUDO_GID</code>里边。如果是通过<code>chmod +s</code>方式获取root权限的，运行程序的用户的UID和GID可直接通过<code>process.getuid</code>和<code>process.getgid</code>方法获取。</p></li><li><p><code>process.setuid</code>和<code>process.setgid</code>方法只接受<code>number</code>类型的参数。</p></li><li><p>降权时必须先降GID再降UID，否则顺序反过来的话就没权限更改程序的GID了。</p></li></ol><h3 id="如何创建子进程" tabindex="-1"><a class="header-anchor" href="#如何创建子进程"><span>如何创建子进程</span></a></h3><p>以下是一个创建NodeJS子进程的例子。</p><pre><code class="language-js"> let child = child_process.spawn(&#39;node&#39;, [ &#39;xxx.js&#39; ]);

 child.stdout.on(&#39;data&#39;, function (data) {
  console.log(&#39;stdout: &#39; + data);
 });

 child.stderr.on(&#39;data&#39;, function (data) {
  console.log(&#39;stderr: &#39; + data);
 });

 child.on(&#39;close&#39;, function (code) {
  console.log(&#39;child process exited with code &#39; + code);
 });
</code></pre><p>上例中使用了<code>.spawn(exec, args, options)</code>方法，该方法支持三个参数。第一个参数是执行文件路径，可以是执行文件的相对或绝对路径，也可以是根据PATH环境变量能找到的执行文件名。第二个参数中，数组中的每个成员都按顺序对应一个命令行参数。第三个参数可选，用于配置子进程的执行环境与行为。</p><p>另外，上例中虽然通过子进程对象的<code>.stdout</code>和<code>.stderr</code>访问子进程的输出，但通过<code>options.stdio</code>字段的不同配置，可以将子进程的输入输出重定向到任何数据流上，或者让子进程共享父进程的标准输入输出流，或者直接忽略子进程的输入输出。</p><h3 id="进程间如何通讯" tabindex="-1"><a class="header-anchor" href="#进程间如何通讯"><span>进程间如何通讯</span></a></h3><p>在Linux系统下，进程之间可以通过信号互相通信。以下是一个例子。</p><pre><code class="language-js"> /*parent.js*/
 let child = child_process.spawn(&#39;node&#39;, [ &#39;child.js&#39; ]);

 child.kill(&#39;SIGTERM&#39;);

 /*child.js*/
 process.on(&#39;SIGTERM&#39;, function () {
  cleanUp();
  process.exit(0);
 });
</code></pre><p>在上例中，父进程通过<code>.kill</code>方法向子进程发送<code>SIGTERM</code>信号，子进程监听<code>process</code>对象的<code>SIGTERM</code>事件响应信号。不要被<code>.kill</code>方法的名称迷惑了，该方法本质上是用来给进程发送信号的，进程收到信号后具体要做啥，完全取决于信号的种类和进程自身的代码。</p><p>另外，如果父子进程都是NodeJS进程，就可以通过IPC（进程间通讯）双向传递数据。以下是一个例子。</p><pre><code class="language-js"> /*parent.js*/
 let child = child_process.spawn(&#39;node&#39;, [ &#39;child.js&#39; ], {
   stdio: [ 0, 1, 2, &#39;ipc&#39; ]
  });

 child.on(&#39;message&#39;, function (msg) {
  console.log(msg);
 });

 child.send({ hello: &#39;hello&#39; });

 /*child.js*/
 process.on(&#39;message&#39;, function (msg) {
  msg.hello = msg.hello.toUpperCase();
  process.send(msg);
 });
</code></pre><p>可以看到，父进程在创建子进程时，在<code>options.stdio</code>字段中通过<code>ipc</code>开启了一条IPC通道，之后就可以监听子进程对象的<code>message</code>事件接收来自子进程的消息，并通过<code>.send</code>方法给子进程发送消息。在子进程这边，可以在<code>process</code>对象上监听<code>message</code>事件接收来自父进程的消息，并通过<code>.send</code>方法向父进程发送消息。数据在传递过程中，会先在发送端使用<code>JSON.stringify</code>方法序列化，再在接收端使用<code>JSON.parse</code>方法反序列化。</p><h3 id="如何守护子进程" tabindex="-1"><a class="header-anchor" href="#如何守护子进程"><span>如何守护子进程</span></a></h3><p>守护进程一般用于监控工作进程的运行状态，在工作进程不正常退出时重启工作进程，保障工作进程不间断运行。以下是一种实现方式。</p><pre><code class="language-js"> /*daemon.js*/
 function spawn(mainModule) {
  let worker = child_process.spawn(&#39;node&#39;, [ mainModule ]);

  worker.on(&#39;exit&#39;, function (code) {
   if (code !== 0) {
    spawn(mainModule);
   }
  });
 }

 spawn(&#39;worker.js&#39;);
</code></pre><p>可以看到，工作进程非正常退出时，守护进程立即重启工作进程。</p><h2 id="exec" tabindex="-1"><a class="header-anchor" href="#exec"><span>exec</span></a></h2><pre><code class="language-js">import { exec} from &#39;child_process&#39;

let ls = exec(&#39;ls -l&#39;, function (error, stdout, stderr) {
  if (error) {
    console.log(error.stack);
    console.log(&#39;Error code: &#39; + error.code);
  }
  console.log(&#39;Child Process STDOUT: &#39; + stdout);
});
</code></pre><h2 id="execfile" tabindex="-1"><a class="header-anchor" href="#execfile"><span>execFile</span></a></h2><pre><code class="language-js">import child_process from &#39;child_process&#39;

let path = &quot;.&quot;;
child_process.execFile(&#39;/bin/ls&#39;, [&#39;-l&#39;, path], function (err, result) {
    console.log(result)
});
</code></pre><p>等同于</p><pre><code class="language-js">let child = exec(&#39;ls -l&#39;);

child.stdout.on(&#39;data&#39;, function(data) {
  console.log(&#39;stdout: &#39; + data);
});
child.stderr.on(&#39;data&#39;, function(data) {
  console.log(&#39;stdout: &#39; + data);
});
child.on(&#39;close&#39;, function(code) {
  console.log(&#39;closing code: &#39; + code);
});
</code></pre><h2 id="execsync" tabindex="-1"><a class="header-anchor" href="#execsync"><span>execSync</span></a></h2><pre><code class="language-js">import execSync from &quot;child_process&quot; 

let SEPARATOR = process.platform === &#39;win32&#39; ? &#39;;&#39; : &#39;:&#39;;
let env = Object.assign({}, process.env);

env.PATH = path.resolve(&#39;./node_modules/.bin&#39;) + SEPARATOR + env.PATH;

function myExecSync(cmd) {
  let output = execSync(cmd, {
    cwd: process.cwd(),
    env: env
  });

  console.log(output);
}

myExecSync(&#39;eslint .&#39;);
</code></pre><p>上面代码中，<code>execSync</code>方法的第二个参数是一个对象。该对象的cwd属性指定脚本的当前目录，env属性指定环境变量。上面代码将<code>./node_modules/.bin</code>目录，存入<code>$PATH</code>变量。这样就可以不加路径，引用项目内部的模块命令了，比如eslint命令实际执行的是<code>./node_modules/.bin/eslint</code>。</p><h2 id="spawn" tabindex="-1"><a class="header-anchor" href="#spawn"><span>spawn</span></a></h2><p>spawn方法创建一个子进程来执行特定命令，用法与execFile方法类似，但是没有回调函数，只能通过监听事件，来获取运行结果。它属于异步执行，适用于子进程长时间运行的情况。</p><pre><code class="language-js">import child_process from &#39;child_process&#39;

let path = &#39;.&#39;;
let ls = child_process.spawn(&#39;/bin/ls&#39;, [&#39;-l&#39;, path]);
ls.stdout.on(&#39;data&#39;, function (data) {
  console.log(&#39;stdout: &#39; + data);
});

ls.stderr.on(&#39;data&#39;, function (data) {
  console.log(&#39;stderr: &#39; + data);
});

ls.on(&#39;close&#39;, function (code) {
  console.log(&#39;child process exited with code &#39; + code);
});
</code></pre><h2 id="fork" tabindex="-1"><a class="header-anchor" href="#fork"><span>fork()</span></a></h2><p>fork方法直接创建一个子进程，执行Node脚本，<code>fork(&#39;./child.js&#39;)</code> 相当于 <code>spawn(&#39;node&#39;, [&#39;./child.js&#39;])</code> 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。</p><pre><code class="language-js">let n = child_process.fork(&#39;./child.js&#39;);
n.on(&#39;message&#39;, function(m) {
  console.log(&#39;PARENT got message:&#39;, m);
});
n.send({ hello: &#39;world&#39; });
</code></pre><p>上面代码中，fork方法返回一个代表进程间通信管道的对象，对该对象可以监听message事件，用来获取子进程返回的信息，也可以向子进程发送信息。</p><p>child.js脚本的内容如下。</p><pre><code class="language-js">process.on(&#39;message&#39;, function(m) {
  console.log(&#39;CHILD got message:&#39;, m);
});
process.send({ foo: &#39;bar&#39; });
</code></pre><p>上面代码中，子进程监听message事件，并向父进程发送信息。</p><h2 id="send" tabindex="-1"><a class="header-anchor" href="#send"><span>send()</span></a></h2><p>使用 child_process.fork() 生成新进程之后，就可以用 <code>child.send(message, [sendHandle])</code> 向新进程发送消息。新进程中通过监听message事件，来获取消息。</p><p>下面的例子是主进程的代码。</p><pre><code class="language-js">import cp from &#39;child_process&#39;

let n = cp.fork(__dirname + &#39;/sub.js&#39;);

n.on(&#39;message&#39;, function(m) {
  console.log(&#39;PARENT got message:&#39;, m);
});

n.send({ hello: &#39;world&#39; });
</code></pre><p>下面是子进程sub.js代码。</p><pre><code class="language-js">process.on(&#39;message&#39;, function(m) {
  console.log(&#39;CHILD got message:&#39;, m);
});

process.send({ foo: &#39;bar&#39; });
</code></pre>`,72),l=[d];function r(a,t){return c(),o("div",null,l)}const i=e(s,[["render",r],["__file","child_process.html.vue"]]),h=JSON.parse('{"path":"/node-tutor/apis/child_process.html","title":"child_process","lang":"zh-CN","frontmatter":{"description":"child_process NodeJS自带的fs模块比较基础，把一个目录里的所有文件和子目录都拷贝到另一个目录里需要写不少代码。另外我们也知道，终端下的cp命令比较好用，一条cp -r source/* target命令就能搞定目录拷贝。那我们首先看看如何使用NodeJS调用终端命令来简化目录拷贝，示例代码如下： 从以上代码中可以看到，子进程是异步运...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/apis/child_process.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"child_process"}],["meta",{"property":"og:description","content":"child_process NodeJS自带的fs模块比较基础，把一个目录里的所有文件和子目录都拷贝到另一个目录里需要写不少代码。另外我们也知道，终端下的cp命令比较好用，一条cp -r source/* target命令就能搞定目录拷贝。那我们首先看看如何使用NodeJS调用终端命令来简化目录拷贝，示例代码如下： 从以上代码中可以看到，子进程是异步运..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-08T04:01:15.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-04-08T04:01:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"child_process\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-08T04:01:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"API走马观花","slug":"api走马观花","link":"#api走马观花","children":[{"level":3,"title":"Process","slug":"process","link":"#process","children":[]},{"level":3,"title":"Child Process","slug":"child-process-1","link":"#child-process-1","children":[]},{"level":3,"title":"Cluster","slug":"cluster","link":"#cluster","children":[]}]},{"level":2,"title":"应用场景","slug":"应用场景","link":"#应用场景","children":[{"level":3,"title":"如何获取命令行参数","slug":"如何获取命令行参数","link":"#如何获取命令行参数","children":[]},{"level":3,"title":"如何退出程序","slug":"如何退出程序","link":"#如何退出程序","children":[]},{"level":3,"title":"如何控制输入输出","slug":"如何控制输入输出","link":"#如何控制输入输出","children":[]},{"level":3,"title":"如何降权","slug":"如何降权","link":"#如何降权","children":[]},{"level":3,"title":"如何创建子进程","slug":"如何创建子进程","link":"#如何创建子进程","children":[]},{"level":3,"title":"进程间如何通讯","slug":"进程间如何通讯","link":"#进程间如何通讯","children":[]},{"level":3,"title":"如何守护子进程","slug":"如何守护子进程","link":"#如何守护子进程","children":[]}]},{"level":2,"title":"exec","slug":"exec","link":"#exec","children":[]},{"level":2,"title":"execFile","slug":"execfile","link":"#execfile","children":[]},{"level":2,"title":"execSync","slug":"execsync","link":"#execsync","children":[]},{"level":2,"title":"spawn","slug":"spawn","link":"#spawn","children":[]},{"level":2,"title":"fork()","slug":"fork","link":"#fork","children":[]},{"level":2,"title":"send()","slug":"send","link":"#send","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1712548875000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":8.24,"words":2473},"filePathRelative":"node-tutor/apis/child_process.md","localizedDate":"2023年6月25日","autoDesc":true}');export{i as comp,h as data};
