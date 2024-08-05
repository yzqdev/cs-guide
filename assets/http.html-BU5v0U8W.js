import{_ as e,c as n,o as t,d as o}from"./app-CbULZrmi.js";const r={},s=o(`<h1 id="http" tabindex="-1"><a class="header-anchor" href="#http"><span>http</span></a></h1><h2 id="创建一个服务器" tabindex="-1"><a class="header-anchor" href="#创建一个服务器"><span>创建一个服务器</span></a></h2><pre><code class="language-js">import http from &#39;http&#39;
http.createServer(function (req, res) {
  res.write(&#39;Hello xkd&#39;); 
  res.end(); 
}).listen(8888);
</code></pre><p>或者</p><pre><code class="language-js">import http from &#39;http&#39;
let server = new http.Server();

server.on(&quot;request&quot;,function(req,res){
    res.writeHead(200,{        
      &quot;content-type&quot;:&quot;text/plain; charset=utf-8&quot;
    });
    res.write(&quot;xkd&quot;);
    res.end();
});
server.listen(8888);
</code></pre><h2 id="查询字符串" tabindex="-1"><a class="header-anchor" href="#查询字符串"><span>查询字符串</span></a></h2><p>拆分查询字符串</p><pre><code class="language-js">http.createServer(function (req, res) {
  res.writeHead(200, {&#39;Content-Type&#39;: &#39;text/html; charset=utf-8&#39;});
  let q = url.parse(req.url, true).query;
  let txt = q.year + &quot; &quot; + q.month;
  res.end(txt);
}).listen(8080);
</code></pre><h2 id="模拟加载很慢的请求" tabindex="-1"><a class="header-anchor" href="#模拟加载很慢的请求"><span>模拟加载很慢的请求</span></a></h2><pre><code class="language-js">http
  .createServer((req, res) =&gt; {
    const index = req.url.indexOf(&#39;?&#39;);
    if (index &gt;= 0) {
      const query = req.url.slice(index);
      const ss = new URLSearchParams(query);
      const timeout = ss.get(&#39;timeout&#39;);
      const type = ss.get(&#39;type&#39;);
      if (timeout &amp;&amp; Number(timeout)) {
        return setTimeout(() =&gt; {
          if (type === &#39;json&#39;) {
            res.writeHead(200, { &#39;Content-Type&#39;: &#39;application/json&#39; });
            res.end(JSON.stringify({ code: 0, msg: &#39;hello world&#39; }));
          } else if (type === &#39;image&#39;) {
            // 输出本地一个图片
          } else {
            res.end(\`delay \${timeout}ms response\`);
          }
        }, Number(timeout));
      }
    }
    res.end(&#39;hello world!&#39;);
  })
  .listen(port, ip);
</code></pre><p>延迟输出图片</p><pre><code class="language-js">const stream = fs.createReadStream(&#39;./img/s.jpg&#39;);
const responseData = []; //存储文件流
if (stream) {
  //判断状态
  stream.on(&#39;data&#39;, function (chunk) {
    responseData.push(chunk);
  });
  stream.on(&#39;end&#39;, function () {
    const finalData = Buffer.concat(responseData);
    // response.write();
    res.writeHead(200, { &#39;Content-Type&#39;: &#39;image/jpg&#39; });
    res.end(finalData);
  });
}
</code></pre><h2 id="实现接口的中转代理" tabindex="-1"><a class="header-anchor" href="#实现接口的中转代理"><span>实现接口的中转代理</span></a></h2><pre><code class="language-js"> 

const ip = process.env.IP || &#39;127.0.0.1&#39;;
const port = process.env.PORT || 3001;

http
  .createServer((req, res) =&gt; {
    const allowList = [&#39;joke.qq.com&#39;, &#39;www.qq.com&#39;];
    if (!req.headers || !req.headers.referer || allow) {
      res.writeHead(403, &#39;forbidden&#39;);
      res.end(&#39;403 forbidden&#39;);
      return;
    }
    console.log(&#39;发起请求&#39;, req.headers);
    https
      .get(&#39;https://www.v2ex.com/api/topics/latest.json&#39;, (response) =&gt; {
        let data = &#39;&#39;;
        response.on(&#39;data&#39;, (chunk) =&gt; {
          data += chunk;
        });
        response.on(&#39;end&#39;, () =&gt; {
          res.setHeader(&#39;Access-Control-Allow-Origin&#39;, (req.headers.referer || &#39;&#39;).replace(/\\/$/, &#39;&#39;));
          res.setHeader(&#39;Access-Control-Allow-Methods&#39;, &#39;GET, POST&#39;);
          res.setHeader(&#39;Access-Control-Allow-Headers&#39;, &#39;X-Requested-With,content-type&#39;);
          res.end(data);
        });
      })
      .on(&#39;error&#39;, (e) =&gt; {
        console.error(\`请求遇到问题: \${e.message}\`, e);
        res.end(&#39;error&#39;);
      });
  })
  .listen(port, ip);
console.log(\`server has started at \${ip}:\${port}\`);
</code></pre><p>NodeJS本来的用途是编写高性能Web服务器。我们首先在这里重复一下官方文档里的例子，使用NodeJS内置的<code>http</code>模块简单实现一个HTTP服务器。</p><pre><code class="language-js">import * as http from &#39;http&#39;

 http.createServer(function (request, response) {
  response.writeHead(200, { &#39;Content-Type&#39;: &#39;text-plain&#39; });
  response.end(&#39;Hello World\\n&#39;);
 }).listen(8124);
</code></pre><p>以上程序创建了一个HTTP服务器并监听<code>8124</code>端口，打开浏览器访问该端口<code>http://127.0.0.1:8124/</code>就能够看到效果。</p><blockquote><p>在Linux系统下，监听1024以下端口需要root权限。因此，如果想监听80或443端口的话，需要使用<code>sudo</code>命令启动程序。</p></blockquote><h2 id="api走马观花" tabindex="-1"><a class="header-anchor" href="#api走马观花"><span>API走马观花</span></a></h2><p>我们先大致看看NodeJS提供了哪些和网络操作有关的API。这里并不逐一介绍每个API的使用方法，官方文档已经做得很好了。</p><h3 id="http-1" tabindex="-1"><a class="header-anchor" href="#http-1"><span>HTTP</span></a></h3><blockquote><p><strong>官方文档：</strong> <a href="http://nodejs.org/api/http.html" target="_blank" rel="noopener noreferrer">http://nodejs.org/api/http.html</a></p></blockquote><p>&#39;http&#39;模块提供两种使用方式：</p><ul><li><p>作为服务端使用时，创建一个HTTP服务器，监听HTTP客户端请求并返回响应。</p></li><li><p>作为客户端使用时，发起一个HTTP客户端请求，获取服务端响应。</p></li></ul><p>首先我们来看看服务端模式下如何工作。如开门红中的例子所示，首先需要使用<code>.createServer</code>方法创建一个服务器，然后调用<code>.listen</code>方法监听端口。之后，每当来了一个客户端请求，创建服务器时传入的回调函数就被调用一次。可以看出，这是一种事件机制。</p><p>HTTP请求本质上是一个数据流，由请求头（headers）和请求体（body）组成。例如以下是一个完整的HTTP请求数据内容。</p><pre><code class="language-js"> POST / HTTP/1.1
 User-Agent: curl/7.26.0
 Host: localhost
 Accept: */*
 Content-Length: 11
 Content-Type: application/x-www-form-urlencoded

 Hello World
</code></pre><p>可以看到，空行之上是请求头，之下是请求体。HTTP请求在发送给服务器时，可以认为是按照从头到尾的顺序一个字节一个字节地以数据流方式发送的。而<code>http</code>模块创建的HTTP服务器在接收到完整的请求头后，就会调用回调函数。在回调函数中，除了可以使用<code>request</code>对象访问请求头数据外，还能把<code>request</code>对象当作一个只读数据流来访问请求体数据。以下是一个例子。</p><pre><code class="language-js"> http.createServer(function (request, response) {
  let body = [];

  console.log(request.method);
  console.log(request.headers);

  request.on(&#39;data&#39;, function (chunk) {
   body.push(chunk);
  });

  request.on(&#39;end&#39;, function () {
   body = Buffer.concat(body);
   console.log(body.toString());
  });
 }).listen(80);

 ------------------------------------
 POST
 { &#39;user-agent&#39;: &#39;curl/7.26.0&#39;,
   host: &#39;localhost&#39;,
   accept: &#39;*/*&#39;,
   &#39;content-length&#39;: &#39;11&#39;,
   &#39;content-type&#39;: &#39;application/x-www-form-urlencoded&#39; }
 Hello World
</code></pre><p>HTTP响应本质上也是一个数据流，同样由响应头（headers）和响应体（body）组成。例如以下是一个完整的HTTP请求数据内容。</p><p>HTTP/1.1 200 OK Content-Type: text/plain Content-Length: 11 Date: Tue, 05 Nov 2013 05:31:38 GMT Connection: keep-alive</p><p>Hello World</p><p>在回调函数中，除了可以使用<code>response</code>对象来写入响应头数据外，还能把<code>response</code>对象当作一个只写数据流来写入响应体数据。例如在以下例子中，服务端原样将客户端请求的请求体数据返回给客户端。</p><pre><code class="language-js"> http.createServer(function (request, response) {
  response.writeHead(200, { &#39;Content-Type&#39;: &#39;text/plain&#39; });

  request.on(&#39;data&#39;, function (chunk) {
   response.write(chunk);
  });

  request.on(&#39;end&#39;, function () {
   response.end();
  });
 }).listen(80);
</code></pre><p>接下来我们看看客户端模式下如何工作。为了发起一个客户端HTTP请求，我们需要指定目标服务器的位置并发送请求头和请求体，以下示例演示了具体做法。</p><pre><code class="language-js"> let options = {
   hostname: &#39;www.example.com&#39;,
   port: 80,
   path: &#39;/upload&#39;,
   method: &#39;POST&#39;,
   headers: {
    &#39;Content-Type&#39;: &#39;application/x-www-form-urlencoded&#39;
   }
  };

 let request = http.request(options, function (response) {});

 request.write(&#39;Hello World&#39;);
 request.end();
</code></pre><p>可以看到，<code>.request</code>方法创建了一个客户端，并指定请求目标和请求头数据。之后，就可以把<code>request</code>对象当作一个只写数据流来写入请求体数据和结束请求。另外，由于HTTP请求中<code>GET</code>请求是最常见的一种，并且不需要请求体，因此<code>http</code>模块也提供了以下便捷API。</p><p>http.get(&#39;http://www.example.com/&#39;, function (response) {});</p><p>当客户端发送请求并接收到完整的服务端响应头时，就会调用回调函数。在回调函数中，除了可以使用<code>response</code>对象访问响应头数据外，还能把<code>response</code>对象当作一个只读数据流来访问响应体数据。以下是一个例子。</p><pre><code class="language-js"> http.get(&#39;http://www.example.com/&#39;, function (response) {
  let body = [];

  console.log(response.statusCode);
  console.log(response.headers);

  response.on(&#39;data&#39;, function (chunk) {
   body.push(chunk);
  });

  response.on(&#39;end&#39;, function () {
   body = Buffer.concat(body);
   console.log(body.toString());
  });
 });

 ------------------------------------
 200
 { &#39;content-type&#39;: &#39;text/html&#39;,
   server: &#39;Apache&#39;,
   &#39;content-length&#39;: &#39;801&#39;,
   date: &#39;Tue, 05 Nov 2013 06:08:41 GMT&#39;,
   connection: &#39;keep-alive&#39; }
 &lt;!DOCTYPE html&gt;
 ...
</code></pre><h3 id="https" tabindex="-1"><a class="header-anchor" href="#https"><span>HTTPS</span></a></h3><blockquote><p><strong>官方文档：</strong> <a href="http://nodejs.org/api/https.html" target="_blank" rel="noopener noreferrer">http://nodejs.org/api/https.html</a></p></blockquote><p><code>https</code>模块与<code>http</code>模块极为类似，区别在于<code>https</code>模块需要额外处理SSL证书。</p><p>在服务端模式下，创建一个HTTPS服务器的示例如下。</p><pre><code class="language-js"> let options = {
   key: fs.readFileSync(&#39;./ssl/default.key&#39;),
   cert: fs.readFileSync(&#39;./ssl/default.cer&#39;)
  };

 let server = https.createServer(options, function (request, response) {
   // ...
  });
</code></pre><p>可以看到，与创建HTTP服务器相比，多了一个<code>options</code>对象，通过<code>key</code>和<code>cert</code>字段指定了HTTPS服务器使用的私钥和公钥。</p><p>另外，NodeJS支持SNI技术，可以根据HTTPS客户端请求使用的域名动态使用不同的证书，因此同一个HTTPS服务器可以使用多个域名提供服务。接着上例，可以使用以下方法为HTTPS服务器添加多组证书。</p><pre><code class="language-js"> server.addContext(&#39;foo.com&#39;, {
  key: fs.readFileSync(&#39;./ssl/foo.com.key&#39;),
  cert: fs.readFileSync(&#39;./ssl/foo.com.cer&#39;)
 });

 server.addContext(&#39;bar.com&#39;, {
  key: fs.readFileSync(&#39;./ssl/bar.com.key&#39;),
  cert: fs.readFileSync(&#39;./ssl/bar.com.cer&#39;)
 });
</code></pre><p>在客户端模式下，发起一个HTTPS客户端请求与<code>http</code>模块几乎相同，示例如下。</p><pre><code class="language-js"> let options = {
   hostname: &#39;www.example.com&#39;,
   port: 443,
   path: &#39;/&#39;,
   method: &#39;GET&#39;
  };

 let request = https.request(options, function (response) {});

 request.end();
</code></pre><p>但如果目标服务器使用的SSL证书是自制的，不是从颁发机构购买的，默认情况下<code>https</code>模块会拒绝连接，提示说有证书安全问题。在<code>options</code>里加入<code>rejectUnauthorized: false</code>字段可以禁用对证书有效性的检查，从而允许<code>https</code>模块请求开发环境下使用自制证书的HTTPS服务器。</p><h3 id="url" tabindex="-1"><a class="header-anchor" href="#url"><span>URL</span></a></h3><blockquote><p><strong>官方文档：</strong> <a href="http://nodejs.org/api/url.html" target="_blank" rel="noopener noreferrer">http://nodejs.org/api/url.html</a></p></blockquote><p>处理HTTP请求时<code>url</code>模块使用率超高，因为该模块允许解析URL、生成URL，以及拼接URL。首先我们来看看一个完整的URL的各组成部分。</p><pre><code class="language-text">                            href
  -----------------------------------------------------------------
                             host              path
                       --------------- ----------------------------
  http: // user:pass @ host.com : 8080 /p/a/t/h ?query=string #hash
  -----    ---------   --------   ---- -------- ------------- -----
 protocol     auth     hostname   port pathname     search     hash
                                                 ------------
                                                    query
</code></pre><p>我们可以使用<code>.parse</code>方法来将一个URL字符串转换为URL对象，示例如下。</p><pre><code class="language-js"> url.parse(&#39;http://user:pass@host.com:8080/p/a/t/h?query=string#hash&#39;);
 /*=&gt;
 { protocol: &#39;http:&#39;,
   auth: &#39;user:pass&#39;,
   host: &#39;host.com:8080&#39;,
   port: &#39;8080&#39;,
   hostname: &#39;host.com&#39;,
   hash: &#39;#hash&#39;,
   search: &#39;?query=string&#39;,
   query: &#39;query=string&#39;,
   pathname: &#39;/p/a/t/h&#39;,
   path: &#39;/p/a/t/h?query=string&#39;,
   href: &#39;http://user:pass@host.com:8080/p/a/t/h?query=string#hash&#39; }
 */
</code></pre><p>传给<code>.parse</code>方法的不一定要是一个完整的URL，例如在HTTP服务器回调函数中，<code>request.url</code>不包含协议头和域名，但同样可以用<code>.parse</code>方法解析。</p><pre><code class="language-js"> http.createServer(function (request, response) {
  let tmp = request.url; // =&gt; &quot;/foo/bar?a=b&quot;
  url.parse(tmp);
  /*=&gt;
  { protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: &#39;?a=b&#39;,
    query: &#39;a=b&#39;,
    pathname: &#39;/foo/bar&#39;,
    path: &#39;/foo/bar?a=b&#39;,
    href: &#39;/foo/bar?a=b&#39; }
  */
 }).listen(80);
</code></pre><p><code>.parse</code>方法还支持第二个和第三个布尔类型可选参数。第二个参数等于<code>true</code>时，该方法返回的URL对象中，<code>query</code>字段不再是一个字符串，而是一个经过<code>querystring</code>模块转换后的参数对象。第三个参数等于<code>true</code>时，该方法可以正确解析不带协议头的URL，例如<code>//www.example.com/foo/bar</code>。</p><p>反过来，<code>format</code>方法允许将一个URL对象转换为URL字符串，示例如下。</p><pre><code class="language-js"> url.format({
  protocol: &#39;http:&#39;,
  host: &#39;www.example.com&#39;,
  pathname: &#39;/p/a/t/h&#39;,
  search: &#39;query=string&#39;
 });
 /*=&gt;
 &#39;http://www.example.com/p/a/t/h?query=string&#39;
 */
</code></pre><p>另外，<code>.resolve</code>方法可以用于拼接URL，示例如下。</p><pre><code class="language-js"> url.resolve(&#39;http://www.example.com/foo/bar&#39;, &#39;../baz&#39;);
 /*=&gt;
 &lt;http://www.example.com/baz&gt;
 */
</code></pre><h3 id="query-string" tabindex="-1"><a class="header-anchor" href="#query-string"><span>Query String</span></a></h3><blockquote><p><strong>官方文档：</strong> <a href="http://nodejs.org/api/querystring.html" target="_blank" rel="noopener noreferrer">http://nodejs.org/api/querystring.html</a></p></blockquote><p><code>querystring</code>模块用于实现URL参数字符串与参数对象的互相转换，示例如下。</p><pre><code class="language-js"> querystring.parse(&#39;foo=bar&amp;baz=qux&amp;baz=quux&amp;corge&#39;);
 /*=&gt;
 { foo: &#39;bar&#39;, baz: [&#39;qux&#39;, &#39;quux&#39;], corge: &#39;&#39; }
 */

 querystring.stringify({ foo: &#39;bar&#39;, baz: [&#39;qux&#39;, &#39;quux&#39;], corge: &#39;&#39; });
 /*=&gt;
 &#39;foo=bar&amp;baz=qux&amp;baz=quux&amp;corge=&#39;
 */
</code></pre><h3 id="zlib" tabindex="-1"><a class="header-anchor" href="#zlib"><span>Zlib</span></a></h3><blockquote><p><strong>官方文档：</strong> <a href="http://nodejs.org/api/zlib.html" target="_blank" rel="noopener noreferrer">http://nodejs.org/api/zlib.html</a></p></blockquote><p><code>zlib</code>模块提供了数据压缩和解压的功能。当我们处理HTTP请求和响应时，可能需要用到这个模块。</p><p>首先我们看一个使用<code>zlib</code>模块压缩HTTP响应体数据的例子。这个例子中，判断了客户端是否支持gzip，并在支持的情况下使用<code>zlib</code>模块返回gzip之后的响应体数据。</p><pre><code class="language-js"> http.createServer(function (request, response) {
  let i = 1024,
   data = &#39;&#39;;

  while (i--) {
   data += &#39;.&#39;;
  }

  if ((request.headers[&#39;accept-encoding&#39;] || &#39;&#39;).indexOf(&#39;gzip&#39;) !== -1) {
   zlib.gzip(data, function (err, data) {
    response.writeHead(200, {
     &#39;Content-Type&#39;: &#39;text/plain&#39;,
     &#39;Content-Encoding&#39;: &#39;gzip&#39;
    });
    response.end(data);
   });
  } else {
   response.writeHead(200, {
    &#39;Content-Type&#39;: &#39;text/plain&#39;
   });
   response.end(data);
  }
 }).listen(80);
</code></pre><p>接着我们看一个使用<code>zlib</code>模块解压HTTP响应体数据的例子。这个例子中，判断了服务端响应是否使用gzip压缩，并在压缩的情况下使用<code>zlib</code>模块解压响应体数据。</p><pre><code class="language-js"> let options = {
   hostname: &#39;www.example.com&#39;,
   port: 80,
   path: &#39;/&#39;,
   method: &#39;GET&#39;,
   headers: {
    &#39;Accept-Encoding&#39;: &#39;gzip, deflate&#39;
   }
  };

 http.request(options, function (response) {
  let body = [];

  response.on(&#39;data&#39;, function (chunk) {
   body.push(chunk);
  });

  response.on(&#39;end&#39;, function () {
   body = Buffer.concat(body);

   if (response.headers[&#39;content-encoding&#39;] === &#39;gzip&#39;) {
    zlib.gunzip(body, function (err, data) {
     console.log(data.toString());
    });
   } else {
    console.log(data.toString());
   }
  });
 }).end();
</code></pre><h3 id="net" tabindex="-1"><a class="header-anchor" href="#net"><span>Net</span></a></h3><blockquote><p><strong>官方文档：</strong> <a href="http://nodejs.org/api/net.html" target="_blank" rel="noopener noreferrer">http://nodejs.org/api/net.html</a></p></blockquote><p><code>net</code>模块可用于创建Socket服务器或Socket客户端。由于Socket在前端领域的使用范围还不是很广，这里先不涉及到WebSocket的介绍，仅仅简单演示一下如何从Socket层面来实现HTTP请求和响应。</p><p>首先我们来看一个使用Socket搭建一个很不严谨的HTTP服务器的例子。这个HTTP服务器不管收到啥请求，都固定返回相同的响应。</p><pre><code class="language-js"> net.createServer(function (conn) {
  conn.on(&#39;data&#39;, function (data) {
   conn.write([
    &#39;HTTP/1.1 200 OK&#39;,
    &#39;Content-Type: text/plain&#39;,
    &#39;Content-Length: 11&#39;,
    &#39;&#39;,
    &#39;Hello World&#39;
   ].join(&#39;\\n&#39;));
  });
 }).listen(80);
</code></pre><p>接着我们来看一个使用Socket发起HTTP客户端请求的例子。这个例子中，Socket客户端在建立连接后发送了一个HTTP GET请求，并通过<code>data</code>事件监听函数来获取服务器响应。</p><pre><code class="language-js"> let options = {
   port: 80,
   host: &#39;www.example.com&#39;
  };

 let client = net.connect(options, function () {
   client.write([
    &#39;GET / HTTP/1.1&#39;,
    &#39;User-Agent: curl/7.26.0&#39;,
    &#39;Host: www.baidu.com&#39;,
    &#39;Accept: */*&#39;,
    &#39;&#39;,
    &#39;&#39;
   ].join(&#39;\\n&#39;));
  });

 client.on(&#39;data&#39;, function (data) {
  console.log(data.toString());
  client.end();
 });
</code></pre><h2 id="灵机一点" tabindex="-1"><a class="header-anchor" href="#灵机一点"><span>灵机一点</span></a></h2><p>使用NodeJS操作网络，特别是操作HTTP请求和响应时会遇到一些惊喜，这里对一些常见问题做解答。</p><ul><li>问： 为什么通过<code>headers</code>对象访问到的HTTP请求头或响应头字段不是驼峰的？</li></ul><p>答： 从规范上讲，HTTP请求头和响应头字段都应该是驼峰的。但现实是残酷的，不是每个HTTP服务端或客户端程序都严格遵循规范，所以NodeJS在处理从别的客户端或服务端收到的头字段时，都统一地转换为了小写字母格式，以便开发者能使用统一的方式来访问头字段，例如<code>headers[&#39;content-length&#39;]</code>。</p><ul><li>问： 为什么<code>http</code>模块创建的HTTP服务器返回的响应是<code>chunked</code>传输方式的？</li></ul><p>答： 因为默认情况下，使用<code>.writeHead</code>方法写入响应头后，允许使用<code>.write</code>方法写入任意长度的响应体数据，并使用<code>.end</code>方法结束一个响应。由于响应体数据长度不确定，因此NodeJS自动在响应头里添加了<code>Transfer-Encoding: chunked</code>字段，并采用<code>chunked</code>传输方式。但是当响应体数据长度确定时，可使用<code>.writeHead</code>方法在响应头里加上<code>Content-Length</code>字段，这样做之后NodeJS就不会自动添加<code>Transfer-Encoding</code>字段和使用<code>chunked</code>传输方式。</p><ul><li>问： 为什么使用<code>http</code>模块发起HTTP客户端请求时，有时候会发生<code>socket hang up</code>错误？</li></ul><p>答： 发起客户端HTTP请求前需要先创建一个客户端。<code>http</code>模块提供了一个全局客户端<code>http.globalAgent</code>，可以让我们使用<code>.request</code>或<code>.get</code>方法时不用手动创建客户端。但是全局客户端默认只允许5个并发Socket连接，当某一个时刻HTTP客户端请求创建过多，超过这个数字时，就会发生<code>socket hang up</code>错误。解决方法也很简单，通过<code>http.globalAgent.maxSockets</code>属性把这个数字改大些即可。另外，<code>https</code>模块遇到这个问题时也一样通过<code>https.globalAgent.maxSockets</code>属性来处理。</p>`,90),a=[s];function c(p,d){return t(),n("div",null,a)}const i=e(r,[["render",c],["__file","http.html.vue"]]),h=JSON.parse('{"path":"/node-tutor/apis/http.html","title":"http","lang":"zh-CN","frontmatter":{"description":"http 创建一个服务器 或者 查询字符串 拆分查询字符串 模拟加载很慢的请求 延迟输出图片 实现接口的中转代理 NodeJS本来的用途是编写高性能Web服务器。我们首先在这里重复一下官方文档里的例子，使用NodeJS内置的http模块简单实现一个HTTP服务器。 以上程序创建了一个HTTP服务器并监听8124端口，打开浏览器访问该端口http://1...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/apis/http.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"http"}],["meta",{"property":"og:description","content":"http 创建一个服务器 或者 查询字符串 拆分查询字符串 模拟加载很慢的请求 延迟输出图片 实现接口的中转代理 NodeJS本来的用途是编写高性能Web服务器。我们首先在这里重复一下官方文档里的例子，使用NodeJS内置的http模块简单实现一个HTTP服务器。 以上程序创建了一个HTTP服务器并监听8124端口，打开浏览器访问该端口http://1..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-08T04:01:15.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-04-08T04:01:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"http\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-08T04:01:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"创建一个服务器","slug":"创建一个服务器","link":"#创建一个服务器","children":[]},{"level":2,"title":"查询字符串","slug":"查询字符串","link":"#查询字符串","children":[]},{"level":2,"title":"模拟加载很慢的请求","slug":"模拟加载很慢的请求","link":"#模拟加载很慢的请求","children":[]},{"level":2,"title":"实现接口的中转代理","slug":"实现接口的中转代理","link":"#实现接口的中转代理","children":[]},{"level":2,"title":"API走马观花","slug":"api走马观花","link":"#api走马观花","children":[{"level":3,"title":"HTTP","slug":"http-1","link":"#http-1","children":[]},{"level":3,"title":"HTTPS","slug":"https","link":"#https","children":[]},{"level":3,"title":"URL","slug":"url","link":"#url","children":[]},{"level":3,"title":"Query String","slug":"query-string","link":"#query-string","children":[]},{"level":3,"title":"Zlib","slug":"zlib","link":"#zlib","children":[]},{"level":3,"title":"Net","slug":"net","link":"#net","children":[]}]},{"level":2,"title":"灵机一点","slug":"灵机一点","link":"#灵机一点","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1712548875000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":11.18,"words":3355},"filePathRelative":"node-tutor/apis/http.md","localizedDate":"2023年6月25日","autoDesc":true}');export{i as comp,h as data};
