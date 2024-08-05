import{_ as e,c as t,o as n,d as r}from"./app-CbULZrmi.js";const a={},o=r(`<h1 id="dart-网络编程" tabindex="-1"><a class="header-anchor" href="#dart-网络编程"><span>Dart 网络编程</span></a></h1><p>以下提供Dart 关于网络编程方面的各种代码示例，对于具体的协议方面知识，请自行学习。</p><h2 id="相关的库" tabindex="-1"><a class="header-anchor" href="#相关的库"><span>相关的库</span></a></h2><p><a href="https://pub.dev/packages/shelf" target="_blank" rel="noopener noreferrer">shelf</a></p><h2 id="tcp-服务端" tabindex="-1"><a class="header-anchor" href="#tcp-服务端"><span>TCP 服务端</span></a></h2><pre><code class="language-dart">import &#39;dart:convert&#39;;
import &#39;dart:io&#39;;

void main() {
  //绑定本地localhost的8081端口(即绑定：127.0.0.1)
  ServerSocket.bind(InternetAddress.loopbackIPv4, 8081)
  .then((serverSocket) {
    serverSocket.listen((socket) {
      socket.cast&lt;List&lt;int&gt;&gt;().transform(utf8.decoder).listen(print);
    });
  });
}
</code></pre><p>以上为简洁示例，不是非常清晰，等价于以下代码</p><pre><code class="language-dart">import &#39;dart:io&#39;;
import &#39;dart:convert&#39;;

void main() {
  startTCPServer();
}

// TCP 服务端
void startTCPServer() async{
  ServerSocket serverSocket = await ServerSocket.bind(InternetAddress.loopbackIPv4, 8081);

  //遍历所有连接到服务器的套接字
  await for(Socket socket in serverSocket) {
    // 先将字节流以utf-8进行解码
    socket.cast&lt;List&lt;int&gt;&gt;().transform(utf8.decoder).listen((data) {
      print(&quot;from \${socket.remoteAddress.address} data:&quot; + data);
      socket.add(utf8.encode(&#39;hello client!&#39;));
    });
  }
}
</code></pre><h2 id="tcp-客户端" tabindex="-1"><a class="header-anchor" href="#tcp-客户端"><span>TCP 客户端</span></a></h2><p>对应的简洁表达如下</p><pre><code class="language-dart">import &#39;dart:convert&#39;;
import &#39;dart:io&#39;;

void main() {
  // 连接127.0.0.1的8081端口
  Socket.connect(&#39;127.0.0.1&#39;, 8081).then((socket) {
    socket.write(&#39;Hello, Server!&#39;);
    socket.cast&lt;List&lt;int&gt;&gt;().transform(utf8.decoder).listen(print);
  });
}
</code></pre><p>更清晰写法如下</p><pre><code class="language-dart">import &#39;dart:convert&#39;;
import &#39;dart:io&#39;;

void main() {
  startTCPClient();
}

// TCP 客户端
void startTCPClient() async {
  //连接服务器的8081端口
  Socket socket = await Socket.connect(&#39;127.0.0.1&#39;, 8081);
  socket.write(&#39;Hello, Server!&#39;);
  socket.cast&lt;List&lt;int&gt;&gt;().transform(utf8.decoder).listen(print);
}
</code></pre><h2 id="udp-服务端" tabindex="-1"><a class="header-anchor" href="#udp-服务端"><span>UDP 服务端</span></a></h2><pre><code class="language-dart">import &#39;dart:io&#39;;
import &#39;dart:convert&#39;;

void main() {
  startUDPServer();
}

// UDP 服务端
void startUDPServer() async {
  RawDatagramSocket rawDgramSocket = await RawDatagramSocket.bind(InternetAddress.loopbackIPv4, 8081);

  //监听套接字事件
  await for (RawSocketEvent event in rawDgramSocket) {
    // 数据包套接字不能监听数据，而是监听事件。
    // 当事件为RawSocketEvent.read的时候才能通过receive函数接收数据
    if(event == RawSocketEvent.read) {
        print(utf8.decode(rawDgramSocket.receive().data));
        rawDgramSocket.send(utf8.encode(&quot;UDP Server:already received!&quot;), InternetAddress.loopbackIPv4, 8082);
      }
  }
}
</code></pre><h2 id="udp-客户端" tabindex="-1"><a class="header-anchor" href="#udp-客户端"><span>UDP 客户端</span></a></h2><pre><code class="language-dart">import &#39;dart:convert&#39;;
import &#39;dart:io&#39;;

void main() {
  startUDPClent();
}

// UDP 客户端
void startUDPClent() async {
   RawDatagramSocket rawDgramSocket = await RawDatagramSocket.bind(&#39;127.0.0.1&#39;, 8082);

   rawDgramSocket.send(utf8.encode(&quot;hello,world!&quot;), InternetAddress(&#39;127.0.0.1&#39;), 8081);

  //监听套接字事件
  await for (RawSocketEvent event in rawDgramSocket) {
    if(event == RawSocketEvent.read) {
        // 接收数据
        print(utf8.decode(rawDgramSocket.receive().data));
      }
  }
}
</code></pre><h2 id="http服务器与请求" tabindex="-1"><a class="header-anchor" href="#http服务器与请求"><span>HTTP服务器与请求</span></a></h2><p>关于HTTP的详细说明，可参加本人 <a href="https://blog.csdn.net/yingshukun/category_9281313.html" target="_blank" rel="noopener noreferrer">相关博客</a></p><pre><code class="language-dart">import &#39;dart:io&#39;;

void main() {
  HttpServer
      .bind(InternetAddress.loopbackIPv4, 8080)
      .then((server) {
        server.listen((HttpRequest request) {
         // 打印请求的path
          print(request.uri.path);
          if(request.uri.path.startsWith(&quot;/greet&quot;)){
            var subPathList = request.uri.path.split(&quot;/&quot;);

            if(subPathList.length &gt;=3){
              request.response.write(&#39;Hello, \${subPathList[2]}&#39;);
              request.response.close();
            }else{
             request.response.write(&#39;Hello, &#39;);
             request.response.close();
            }
          }else{
            request.response.write(&#39;Welcome to test server!&#39;);
            request.response.close();
          }
        });
      });
}
</code></pre><p>浏览器输入<code>http://localhost:8080/greet/zhangsan</code>访问</p><p>以上是使用浏览器向服务器发出请求，接下来我们使用代码模拟浏览器发请求</p><pre><code class="language-dart">import &#39;dart:convert&#39;;
import &#39;dart:io&#39;;

void main() {
  HttpClient client = HttpClient();

  client.getUrl(Uri.parse(&quot;https://www.baidu.com/&quot;))
    .then((HttpClientRequest request) {
      // 设置请求头
      request.headers.add(HttpHeaders.userAgentHeader,
      &quot;Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36&quot;);
      return request.close();
    })
    .then((HttpClientResponse response) {
      // 处理响应
      response.transform(utf8.decoder).listen((contents) {
        print(contents);
      });
    });
}
</code></pre><p>通常的，我们并不会直接使用Dart 标准库提供的<code>http</code> 网络请求API，因为标准库库使用上仍然过于繁琐，第三方库则更加简洁强大。在Flutter上，主要使用<code>dio</code>库，功能十分强大，另外还可以使用官方推出的<code>http</code>库，更加简洁精炼，链接如下</p><ul><li><a href="https://pub.dev/packages/http" target="_blank" rel="noopener noreferrer">http</a></li><li><a href="https://pub.dev/packages/dio" target="_blank" rel="noopener noreferrer">dio</a></li></ul><h2 id="websocket" tabindex="-1"><a class="header-anchor" href="#websocket"><span>WebSocket</span></a></h2><blockquote><p><strong>WebSocket</strong>是一种在单个<a href="https://baike.baidu.com/item/TCP" target="_blank" rel="noopener noreferrer">TCP</a>连接上进行<a href="https://baike.baidu.com/item/%E5%85%A8%E5%8F%8C%E5%B7%A5" target="_blank" rel="noopener noreferrer">全双工</a>通信的协议。它的出现使得客户端和服务端都可以主动的推送消息，可以是文本也可以是二进制数据。而且没有同源策略的限制，不存在跨域问题。协议的标识符就是<code>ws</code>。像https一样如果加密的话就是<code>wxs</code>。</p></blockquote><p>WebSocket 是独立的、创建在 TCP 上的协议。</p><p>Websocket 通过<a href="https://baike.baidu.com/item/HTTP" target="_blank" rel="noopener noreferrer">HTTP</a>/1.1 协议的101状态码进行握手。</p><p>为了创建Websocket连接，需要通过浏览器发出请求，之后服务器进行回应，这个过程通常称为“握手”（handshaking）</p><h3 id="服务端" tabindex="-1"><a class="header-anchor" href="#服务端"><span>服务端</span></a></h3><p>Web套接字服务器使用普通的HTTP服务器来接受Web套接字连接。初始握手是HTTP请求，然后将其升级为Web套接字连接。服务器使用<a href="https://api.dart.dev/stable/2.7.1/dart-io/WebSocketTransformer-class.html" target="_blank" rel="noopener noreferrer">WebSocketTransformer</a>升级请求， 并侦听返回的Web套接字上的数据</p><pre><code class="language-dart">import &#39;dart:io&#39;;

void main() async {
  HttpServer server = await HttpServer.bind(InternetAddress.loopbackIPv4, 8083);
  await for (HttpRequest req in server) {
    if (req.uri.path == &#39;/ws&#39;) {
      // 将一个HttpRequest转为WebSocket连接
      WebSocket socket = await WebSocketTransformer.upgrade(req);
      socket.listen((data) {
        print(&quot;from IP \${req.connectionInfo.remoteAddress.address}:\${data}&quot;);
        socket.add(&quot;WebSocket Server:already received!&quot;);
      });
    }
  }
}
</code></pre><h3 id="客户端" tabindex="-1"><a class="header-anchor" href="#客户端"><span>客户端</span></a></h3><pre><code class="language-dart">import &#39;dart:io&#39;;

void main() async {
  WebSocket socket = await WebSocket.connect(&#39;ws://127.0.0.1:8083/ws&#39;);
  socket.add(&#39;Hello, World!&#39;);

  await for (var data in socket) {
    print(&quot;from Server: $data&quot;);

    // 关闭连接
    socket.close();
  }
}

</code></pre>`,35),s=[o];function c(i,d){return n(),t("div",null,s)}const p=e(a,[["render",c],["__file","network.html.vue"]]),h=JSON.parse('{"path":"/flutter-tutor/dart/network.html","title":"Dart 网络编程","lang":"zh-CN","frontmatter":{"description":"Dart 网络编程 以下提供Dart 关于网络编程方面的各种代码示例，对于具体的协议方面知识，请自行学习。 相关的库 shelf TCP 服务端 以上为简洁示例，不是非常清晰，等价于以下代码 TCP 客户端 对应的简洁表达如下 更清晰写法如下 UDP 服务端 UDP 客户端 HTTP服务器与请求 关于HTTP的详细说明，可参加本人 相关博客 浏览器输入...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/flutter-tutor/dart/network.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Dart 网络编程"}],["meta",{"property":"og:description","content":"Dart 网络编程 以下提供Dart 关于网络编程方面的各种代码示例，对于具体的协议方面知识，请自行学习。 相关的库 shelf TCP 服务端 以上为简洁示例，不是非常清晰，等价于以下代码 TCP 客户端 对应的简洁表达如下 更清晰写法如下 UDP 服务端 UDP 客户端 HTTP服务器与请求 关于HTTP的详细说明，可参加本人 相关博客 浏览器输入..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Dart 网络编程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"相关的库","slug":"相关的库","link":"#相关的库","children":[]},{"level":2,"title":"TCP 服务端","slug":"tcp-服务端","link":"#tcp-服务端","children":[]},{"level":2,"title":"TCP 客户端","slug":"tcp-客户端","link":"#tcp-客户端","children":[]},{"level":2,"title":"UDP 服务端","slug":"udp-服务端","link":"#udp-服务端","children":[]},{"level":2,"title":"UDP 客户端","slug":"udp-客户端","link":"#udp-客户端","children":[]},{"level":2,"title":"HTTP服务器与请求","slug":"http服务器与请求","link":"#http服务器与请求","children":[]},{"level":2,"title":"WebSocket","slug":"websocket","link":"#websocket","children":[{"level":3,"title":"服务端","slug":"服务端","link":"#服务端","children":[]},{"level":3,"title":"客户端","slug":"客户端","link":"#客户端","children":[]}]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.5,"words":1049},"filePathRelative":"flutter-tutor/dart/network.md","localizedDate":"2023年5月22日","autoDesc":true}');export{p as comp,h as data};
