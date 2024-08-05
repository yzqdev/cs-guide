import{_ as e,c as n,o as t,d as o}from"./app-CbULZrmi.js";const a={},r=o(`<h1 id="正确面对跨域-别慌" tabindex="-1"><a class="header-anchor" href="#正确面对跨域-别慌"><span>正确面对跨域，别慌</span></a></h1><blockquote><p>前端开发中，跨域使我们经常遇到的一个问题，也是面试中经常被问到的一些问题，所以，这里，我们做个总结。小小问题，不足担心</p></blockquote><p>原文地址：<a href="https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FNealyang%2FYOU-SHOULD-KNOW-JS" target="_blank" rel="noopener noreferrer">YOU-SHOULD-KNOW-JS</a></p><h2 id="什么是跨域" tabindex="-1"><a class="header-anchor" href="#什么是跨域"><span>什么是跨域</span></a></h2><p>跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对JavaScript实施的安全限制。</p><p>同源策略限制了一下行为：</p><ul><li>Cookie、LocalStorage 和 IndexDB 无法读取</li><li>DOM 和 JS 对象无法获取</li><li>Ajax请求发送不出去</li></ul><h2 id="常见的跨域场景" tabindex="-1"><a class="header-anchor" href="#常见的跨域场景"><span>常见的跨域场景</span></a></h2><p>所谓的同源是指，域名、协议、端口均为相同。</p><pre><code>http://www.nealyang.cn/index.html 调用   http://www.nealyang.cn/server.php  非跨域

http://www.nealyang.cn/index.html 调用   http://www.neal.cn/server.php  跨域,主域不同

http://abc.nealyang.cn/index.html 调用   http://def.neal.cn/server.php  跨域,子域名不同

http://www.nealyang.cn:8080/index.html 调用   http://www.nealyang.cn/server.php  跨域,端口不同

https://www.nealyang.cn/index.html 调用   http://www.nealyang.cn/server.php  跨域,协议不同

localhost   调用 127.0.0.1 跨域

</code></pre><h2 id="跨域的解决办法" tabindex="-1"><a class="header-anchor" href="#跨域的解决办法"><span>跨域的解决办法</span></a></h2><h3 id="jsonp跨域" tabindex="-1"><a class="header-anchor" href="#jsonp跨域"><span>jsonp跨域</span></a></h3><p>jsonp跨域其实也是JavaScript设计模式中的一种代理模式。在html页面中通过相应的标签从不同域名下加载静态资源文件是被浏览器允许的，所以我们可以通过这个“犯罪漏洞”来进行跨域。一般，我们可以动态的创建script标签，再去请求一个带参网址来实现跨域通信</p><pre><code class="language-js">//原生的实现方式
let script = document.createElement(&#39;script&#39;);

script.src = &#39;http://www.nealyang.cn/login?username=Nealyang&amp;callback=callback&#39;;

document.body.appendChild(script);

function callback(res) {
  console.log(res);
}

</code></pre><p>当然，jquery也支持jsonp的实现方式</p><pre><code class="language-js">$.ajax({
    url:&#39;http://www.nealyang.cn/login&#39;,
    type:&#39;GET&#39;,
    dataType:&#39;jsonp&#39;,//请求方式为jsonp
    jsonpCallback:&#39;callback&#39;,
    data:{
        &quot;username&quot;:&quot;Nealyang&quot;
    }
})


</code></pre><p>虽然这种方式非常好用，但是一个最大的缺陷是，只能够实现get请求</p><h3 id="document-domain-iframe-跨域" tabindex="-1"><a class="header-anchor" href="#document-domain-iframe-跨域"><span>document.domain + iframe 跨域</span></a></h3><p>这种跨域的方式最主要的是要求主域名相同。什么是主域名相同呢？ www.nealyang.cn aaa.nealyang.cn ba.ad.nealyang.cn 这三个主域名都是nealyang.cn,而主域名不同的就不能用此方法。</p><p>假设目前a.nealyang.cn 和 b.nealyang.cn 分别对应指向不同ip的服务器。</p><p>a.nealyang.cn 下有一个test.html文件</p><pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;html&lt;/title&gt;
    &lt;script type=&quot;text/javascript&quot; src = &quot;jquery-1.12.1.js&quot;&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div&gt;A页面&lt;/div&gt;
    &lt;iframe 
    style = &quot;display : none&quot; 
    name = &quot;iframe1&quot; 
    id = &quot;iframe&quot; 
    src=&quot;http://b.nealyang.cn/1.html&quot; frameborder=&quot;0&quot;&gt;&lt;/iframe&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
        $(function(){
            try{
                document.domain = &quot;nealyang.cn&quot;
            }catch(e){}
            $(&quot;#iframe&quot;).load(function(){
                let jq = document.getElementById(&#39;iframe&#39;).contentWindow.$
                jq.get(&quot;http://nealyang.cn/test.json&quot;,function(data){
                    console.log(data);
                });
            })
        })
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;

</code></pre><p>利用 iframe 加载 其他域下的文件（nealyang.cn/1.html）, 同时 document.domain 设置成 nealyang.cn ，当 iframe 加载完毕后就可以获取 nealyang.cn 域下的全局对象， 此时尝试着去请求 nealyang.cn 域名下的 test.json （此时可以请求接口），就会发现数据请求失败了~~ 惊不惊喜，意不意外！！！！！！！</p><p>数据请求失败，目的没有达到，自然是还少一步：</p><pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;html&lt;/title&gt;
    &lt;script type=&quot;text/javascript&quot; src = &quot;jquery-1.12.1.js&quot;&gt;&lt;/script&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
        $(function(){
            try{
                document.domain = &quot;nealyang.com&quot;
            }catch(e){}
        })
    &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id = &quot;div1&quot;&gt;B页面&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;

</code></pre><p>此时在进行刷新浏览器，就会发现数据这次真的是成功了~~~~~</p><h3 id="window-name-iframe-跨域" tabindex="-1"><a class="header-anchor" href="#window-name-iframe-跨域"><span>window.name + iframe 跨域</span></a></h3><p>window.name属性可设置或者返回存放窗口名称的一个字符串。他的神器之处在于name值在不同页面或者不同域下加载后依旧存在，没有修改就不会发生变化，并且可以存储非常长的name(2MB)</p><p>假设index页面请求远端服务器上的数据，我们在该页面下创建iframe标签，该iframe的src指向服务器文件的地址（iframe标签src可以跨域），服务器文件里设置好window.name的值，然后再在index.html里面读取改iframe中的window.name的值。完美~</p><pre><code class="language-html">&lt;body&gt;
  &lt;script type=&quot;text/javascript&quot;&gt; 
    iframe = document.createElement(&#39;iframe&#39;),
    iframe.src = &#39;http://localhost:8080/data.php&#39;;
    document.body.appendChild(iframe);
    iframe.onload = function() {
      console.log(iframe.contentWindow.name)
    };
  &lt;/script&gt;
&lt;/body&gt;

</code></pre><p>当然，这样还是不够的。</p><p>因为规定如果index.html页面和和该页面里的iframe框架的src如果不同源，则也无法操作框架里的任何东西，所以就取不到iframe框架的name值了，告诉你我们不是一家的，你也休想得到我这里的数据。 既然要同源，那就换个src去指，前面说了无论怎样加载window.name值都不会变化，于是我们在index.html相同目录下，新建了个proxy.html的空页面，修改代码如下：</p><pre><code class="language-html">&lt;body&gt;
  &lt;script type=&quot;text/javascript&quot;&gt; 
    iframe = document.createElement(&#39;iframe&#39;),
    iframe.src = &#39;http://localhost:8080/data.php&#39;;
    document.body.appendChild(iframe);
    iframe.onload = function() {
      iframe.src = &#39;http://localhost:81/cross-domain/proxy.html&#39;;
      console.log(iframe.contentWindow.name)
    };
  &lt;/script&gt;
&lt;/body&gt;

</code></pre><p>理想似乎很美好，在iframe载入过程中，迅速重置iframe.src的指向，使之与index.html同源，那么index页面就能去获取它的name值了！但是现实是残酷的，iframe在现实中的表现是一直不停地刷新， 也很好理解，每次触发onload时间后，重置src，相当于重新载入页面，又触发onload事件，于是就不停地刷新了（但是需要的数据还是能输出的）。修改后代码如下：</p><pre><code class="language-html">&lt;body&gt;
  &lt;script type=&quot;text/javascript&quot;&gt; 
    iframe = document.createElement(&#39;iframe&#39;);
    iframe.style.display = &#39;none&#39;;
    let state = 0;
    
    iframe.onload = function() {
      if(state === 1) {
          let data = JSON.parse(iframe.contentWindow.name);
          console.log(data);
          iframe.contentWindow.document.write(&#39;&#39;);
          iframe.contentWindow.close();
        document.body.removeChild(iframe);
      } else if(state === 0) {
          state = 1;
          iframe.contentWindow.location = &#39;http://localhost:81/cross-domain/proxy.html&#39;;
      }
    };

    iframe.src = &#39;http://localhost:8080/data.php&#39;;
    document.body.appendChild(iframe);
  &lt;/script&gt;
&lt;/body&gt;

</code></pre><p>所以如上，我们就拿到了服务器返回的数据，但是有几个条件是必不可少的：</p><ul><li>iframe标签的跨域能力</li><li>window.names属性值在文档刷新后依然存在的能力</li></ul><h3 id="location-hash-iframe-跨域" tabindex="-1"><a class="header-anchor" href="#location-hash-iframe-跨域"><span>location.hash + iframe 跨域</span></a></h3><p>此跨域方法和上面介绍的比较类似，一样是动态插入一个iframe然后设置其src为服务端地址，而服务端同样输出一端js代码，也同时通过与子窗口之间的通信来完成数据的传输。</p><p>关于锚点相信大家都已经知道了，其实就是设置锚点，让文档指定的相应的位置。锚点的设置用a标签，然后href指向要跳转到的id，当然，前提是你得有个滚动条，不然也不好滚动嘛是吧。</p><p>而location.hash其实就是url的锚点。比如<a href="http://www.nealyang.cn#Nealyang%E7%9A%84%E7%BD%91%E5%9D%80%E6%89%93%E5%BC%80%E5%90%8E%EF%BC%8C%E5%9C%A8%E6%8E%A7%E5%88%B6%E5%8F%B0%E8%BE%93%E5%85%A5location.hash%E5%B0%B1%E4%BC%9A%E8%BF%94%E5%9B%9E#Nealyang" target="_blank" rel="noopener noreferrer">http://www.nealyang.cn#Nealyang的网址打开后，在控制台输入location.hash就会返回#Nealyang</a>的字段。</p><p>基础知识补充完毕，下面我们来说下如何实现跨域</p><p>如果index页面要获取远端服务器的数据，动态的插入一个iframe，将iframe的src执行服务器的地址，这时候的top window 和包裹这个iframe的子窗口是不能通信的，因为同源策略，所以改变子窗口的路径就可以了，将数据当做改变后的路径的hash值加载路径上，然后就可以通信了。将数据加在index页面地址的hash上， index页面监听hash的变化，h5的hashchange方法</p><pre><code class="language-html">&lt;body&gt;
  &lt;script type=&quot;text/javascript&quot;&gt;
    function getData(url, fn) {
      let iframe = document.createElement(&#39;iframe&#39;);
      iframe.style.display = &#39;none&#39;;
      iframe.src = url;

      iframe.onload = function() {
        fn(iframe.contentWindow.location.hash.substring(1));
        window.location.hash = &#39;&#39;;
        document.body.removeChild(iframe);
      };

      document.body.appendChild(iframe);
    }

    // get data from server
    let url = &#39;http://localhost:8080/data.php&#39;;
    getData(url, function(data) {
      let jsondata = JSON.parse(data);
      console.log(jsondata.name + &#39; &#39; + jsondata.age);
    });
  &lt;/script&gt;
&lt;/body&gt;

</code></pre><blockquote><p>补充说明：其实location.hash和window.name都是差不多的，都是利用全局对象属性的方法，然后这两种方法和jsonp也是一样的，就是只能够实现get请求</p></blockquote><h3 id="postmessage跨域" tabindex="-1"><a class="header-anchor" href="#postmessage跨域"><span>postMessage跨域</span></a></h3><p>这是由H5提出来的一个炫酷的API，IE8+，chrome,ff都已经支持实现了这个功能。这个功能也是非常的简单，其中包括接受信息的Message时间，和发送信息的postMessage方法。</p><p>发送信息的postMessage方法是向外界窗口发送信息</p><pre><code class="language-js">otherWindow.postMessage(message,targetOrigin);

</code></pre><p>otherWindow指的是目标窗口，也就是要给哪一个window发送消息，是window.frames属性的成员或者是window.open方法创建的窗口。 Message是要发送的消息，类型为String，Object(IE8、9不支持Obj)，targetOrigin是限定消息接受范围，不限制就用星号 *</p><p>接受信息的message事件</p><pre><code class="language-js">let onmessage = function(event) {
  let data = event.data;
  let origin = event.origin;
}

if(typeof window.addEventListener != &#39;undefined&#39;){
    window.addEventListener(&#39;message&#39;,onmessage,false);
}else if(typeof window.attachEvent != &#39;undefined&#39;){
    window.attachEvent(&#39;onmessage&#39;, onmessage);
}

</code></pre><p>举个栗子</p><p>a.html(<a href="http://www.nealyang.cn/a.html" target="_blank" rel="noopener noreferrer">http://www.nealyang.cn/a.html</a>)</p><pre><code class="language-html">&lt;iframe id=&quot;iframe&quot; src=&quot;http://www.neal.cn/b.html&quot; style=&quot;display:none;&quot;&gt;&lt;/iframe&gt;
&lt;script&gt;       
    let iframe = document.getElementById(&#39;iframe&#39;);
    iframe.onload = function() {
        let data = {
            name: &#39;aym&#39;
        };
        // 向neal传送跨域数据
        iframe.contentWindow.postMessage(JSON.stringify(data), &#39;http://www.neal.cn&#39;);
    };

    // 接受domain2返回数据
    window.addEventListener(&#39;message&#39;, function(e) {
        alert(&#39;data from neal ---&gt; &#39; + e.data);
    }, false);
&lt;/script&gt;

</code></pre><p>b.html(<a href="http://www.neal.cn/b.html" target="_blank" rel="noopener noreferrer">http://www.neal.cn/b.html</a>)</p><pre><code class="language-html">&lt;script&gt;
    // 接收domain1的数据
    window.addEventListener(&#39;message&#39;, function(e) {
        alert(&#39;data from nealyang ---&gt; &#39; + e.data);

        let data = JSON.parse(e.data);
        if (data) {
            data.number = 16;

            // 处理后再发回nealyang
            window.parent.postMessage(JSON.stringify(data), &#39;http://www.nealyang.cn&#39;);
        }
    }, false);
&lt;/script&gt;

</code></pre><h3 id="跨域资源共享-cors" tabindex="-1"><a class="header-anchor" href="#跨域资源共享-cors"><span>跨域资源共享 CORS</span></a></h3><p>因为是目前主流的跨域解决方案。所以这里多介绍点。</p><h4 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h4><p>CORS是一个W3C标准，全称是&quot;跨域资源共享&quot;（Cross-origin resource sharing）。 它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。</p><p>CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。IE8+：IE8/9需要使用XDomainRequest对象来支持CORS。</p><p>整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。 因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。</p><h4 id="两种请求" tabindex="-1"><a class="header-anchor" href="#两种请求"><span>两种请求</span></a></h4><p>说起来很搞笑，分为两种请求，一种是简单请求，另一种是非简单请求。只要满足下面条件就是简单请求</p><ul><li>请求方式为HEAD、POST 或者 GET</li><li>http头信息不超出一下字段：Accept、Accept-Language 、 Content-Language、 Last-Event-ID、 Content-Type(限于三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain)</li></ul><p>为什么要分为简单请求和非简单请求，因为浏览器对这两种请求方式的处理方式是不同的。</p><h4 id="简单请求" tabindex="-1"><a class="header-anchor" href="#简单请求"><span>简单请求</span></a></h4><h5 id="基本流程" tabindex="-1"><a class="header-anchor" href="#基本流程"><span>基本流程</span></a></h5><p>对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个Origin字段。 下面是一个例子，浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个Origin字段。</p><pre><code class="language-http">GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0
...

</code></pre><p>Origin字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。</p><p>如果Origin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。 浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段（详见下文），就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。</p><p>注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。</p><p>如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。</p><pre><code class="language-http">   Access-Control-Allow-Origin: http://api.bob.com
   Access-Control-Allow-Credentials: true
   Access-Control-Expose-Headers: FooBar
   Content-Type: text/html; charset=utf-8

</code></pre><p>上面的头信息之中，有三个与CORS请求相关的字段，都以Access-Control-开头</p><ul><li>Access-Control-Allow-Origin :该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求</li><li>Access-Control-Allow-Credentials: 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。</li><li>Access-Control-Expose-Headers:该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。</li></ul><h5 id="withcredentials-属性" tabindex="-1"><a class="header-anchor" href="#withcredentials-属性"><span>withCredentials 属性</span></a></h5><p>上面说到，CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定Access-Control-Allow-Credentials字段。</p><p>另一方面，开发者必须在AJAX请求中打开withCredentials属性。</p><pre><code class="language-js">let xhr = new XMLHttpRequest(); // IE8/9需用window.XDomainRequest兼容

// 前端设置是否带cookie
xhr.withCredentials = true;

xhr.open(&#39;post&#39;, &#39;http://www.domain2.com:8080/login&#39;, true);
xhr.setRequestHeader(&#39;Content-Type&#39;, &#39;application/x-www-form-urlencoded&#39;);
xhr.send(&#39;user=admin&#39;);

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 &amp;&amp; xhr.status == 200) {
        alert(xhr.responseText);
    }
};

// jquery
$.ajax({
    ...
   xhrFields: {
       withCredentials: true    // 前端设置是否带cookie
   },
   crossDomain: true,   // 会让请求头中包含跨域的额外信息，但不会含cookie
    ...
});

</code></pre><p>否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。 但是，如果省略withCredentials设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭withCredentials。</p><p>需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。</p><h4 id="非简单请求" tabindex="-1"><a class="header-anchor" href="#非简单请求"><span>非简单请求</span></a></h4><p>非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。</p><p>非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为&quot;预检&quot;请求（preflight）。</p><p>浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。</p><pre><code class="language-js">let url = &#39;http://api.alice.com/cors&#39;;
let xhr = new XMLHttpRequest();
xhr.open(&#39;PUT&#39;, url, true);
xhr.setRequestHeader(&#39;X-Custom-Header&#39;, &#39;value&#39;);
xhr.send();

</code></pre><p>浏览器发现，这是一个非简单请求，就自动发出一个&quot;预检&quot;请求，要求服务器确认可以这样请求。下面是这个&quot;预检&quot;请求的HTTP头信息。</p><pre><code>    OPTIONS /cors HTTP/1.1
   Origin: http://api.bob.com
   Access-Control-Request-Method: PUT
   Access-Control-Request-Headers: X-Custom-Header
   Host: api.alice.com
   Accept-Language: en-US
   Connection: keep-alive
   User-Agent: Mozilla/5.0...

</code></pre><p>&quot;预检&quot;请求用的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是Origin，表示请求来自哪个源。</p><p>除了Origin字段，&quot;预检&quot;请求的头信息包括两个特殊字段。</p><ul><li>Access-Control-Request-Method：该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。</li><li>Access-Control-Request-Headers：该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header</li></ul><h5 id="预检请求的回应" tabindex="-1"><a class="header-anchor" href="#预检请求的回应"><span>预检请求的回应</span></a></h5><p>服务器收到&quot;预检&quot;请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应</p><pre><code>HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain

</code></pre><p>上面的HTTP回应中，关键的是Access-Control-Allow-Origin字段，表示<a href="http://api.bob.com" target="_blank" rel="noopener noreferrer">http://api.bob.com</a>可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。</p><p>如果浏览器否定了&quot;预检&quot;请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出如下的报错信息。</p><p>服务器回应的其他CORS相关字段如下：</p><pre><code>Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000

</code></pre><ul><li>Access-Control-Allow-Methods：该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次&quot;预检&quot;请求。</li><li>Access-Control-Allow-Headers：如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在&quot;预检&quot;中请求的字段。</li><li>Access-Control-Allow-Credentials： 该字段与简单请求时的含义相同。</li><li>Access-Control-Max-Age： 该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。</li></ul><h5 id="浏览器正常请求回应" tabindex="-1"><a class="header-anchor" href="#浏览器正常请求回应"><span>浏览器正常请求回应</span></a></h5><p>一旦服务器通过了&quot;预检&quot;请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。</p><pre><code>PUT /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
X-Custom-Header: value
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...

</code></pre><p>浏览器的正常CORS请求。上面头信息的Origin字段是浏览器自动添加的。下面是服务器正常的回应。</p><pre><code>Access-Control-Allow-Origin: http://api.bob.com
Content-Type: text/html; charset=utf-8

</code></pre><p>Access-Control-Allow-Origin字段是每次回应都必定包含的</p><h4 id="结束语" tabindex="-1"><a class="header-anchor" href="#结束语"><span>结束语</span></a></h4><p>CORS与JSONP的使用目的相同，但是比JSONP更强大。JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。</p><h3 id="websocket协议跨域" tabindex="-1"><a class="header-anchor" href="#websocket协议跨域"><span>WebSocket协议跨域</span></a></h3><p>WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现。</p><p>原生WebSocket API使用起来不太方便，我们使用Socket.io，它很好地封装了webSocket接口，提供了更简单、灵活的接口，也对不支持webSocket的浏览器提供了向下兼容。</p><p>前端代码：</p><pre><code>&lt;div&gt;user input：&lt;input type=&quot;text&quot;&gt;&lt;/div&gt;
&lt;script src=&quot;./socket.io.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
let socket = io(&#39;http://www.domain2.com:8080&#39;);

// 连接成功处理
socket.on(&#39;connect&#39;, function() {
    // 监听服务端消息
    socket.on(&#39;message&#39;, function(msg) {
        console.log(&#39;data from server: ---&gt; &#39; + msg); 
    });

    // 监听服务端关闭
    socket.on(&#39;disconnect&#39;, function() { 
        console.log(&#39;Server socket has closed.&#39;); 
    });
});

document.getElementsByTagName(&#39;input&#39;)[0].onblur = function() {
    socket.send(this.value);
};
&lt;/script&gt;

</code></pre><p>node Server</p><pre><code>let http = require(&#39;http&#39;);
let socket = require(&#39;socket.io&#39;);

// 启http服务
let server = http.createServer(function(req, res) {
    res.writeHead(200, {
        &#39;Content-type&#39;: &#39;text/html&#39;
    });
    res.end();
});

server.listen(&#39;8080&#39;);
console.log(&#39;Server is running at port 8080...&#39;);

// 监听socket连接
socket.listen(server).on(&#39;connection&#39;, function(client) {
    // 接收信息
    client.on(&#39;message&#39;, function(msg) {
        client.send(&#39;hello：&#39; + msg);
        console.log(&#39;data from client: ---&gt; &#39; + msg);
    });

    // 断开处理
    client.on(&#39;disconnect&#39;, function() {
        console.log(&#39;Client socket has closed.&#39;); 
    });
});

</code></pre><h3 id="node代理跨域" tabindex="-1"><a class="header-anchor" href="#node代理跨域"><span>node代理跨域</span></a></h3><p>node中间件实现跨域代理，是通过启一个代理服务器，实现数据的转发，也可以通过设置cookieDomainRewrite参数修改响应头中cookie中域名，实现当前域的cookie写入，方便接口登录认证。</p><p>利用node + express + http-proxy-middleware搭建一个proxy服务器</p><p>前端代码</p><pre><code>let xhr = new XMLHttpRequest();

// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;

// 访问http-proxy-middleware代理服务器
xhr.open(&#39;get&#39;, &#39;http://www.domain1.com:3000/login?user=admin&#39;, true);
xhr.send();

</code></pre><p>后端代码</p><pre><code>imoprt express from &#39;express&#39;
let proxy = require(&#39;http-proxy-middleware&#39;);
let app = express();

app.use(&#39;/&#39;, proxy({
    // 代理跨域目标接口
    target: &#39;http://www.domain2.com:8080&#39;,
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
        res.header(&#39;Access-Control-Allow-Origin&#39;, &#39;http://www.domain1.com&#39;);
        res.header(&#39;Access-Control-Allow-Credentials&#39;, &#39;true&#39;);
    },

    // 修改响应信息中的cookie域名
    cookieDomainRewrite: &#39;www.domain1.com&#39;  // 可以为false，表示不修改
}));

app.listen(3000);
console.log(&#39;Proxy server is listen at port 3000...&#39;);

</code></pre><h3 id="nginx代理跨域" tabindex="-1"><a class="header-anchor" href="#nginx代理跨域"><span>nginx代理跨域</span></a></h3><p>在Nginx配置文件中添加如下配置：</p><pre><code class="language-bash">server {
listen 80;
server_name 127.0.0.1;

location / {
proxy_pass http://127.0.0.1:3000;
}

location ~ /api/ {
proxy_pass http://172.30.1.123:8081;
}
}
</code></pre><p>上面的配置的可以理解为：</p><p>监听80端口（Nginx默认启动了<code>80</code>端口），将<code>http://127.0.0.1</code>的所有请求服务转发到<code>127.0.0.1</code>端口为<code>3000</code>； 将<code>http://127.0.0.1/api/</code>或者<code>http://127.0.0.1/api/getList</code>请求转发到<code>http://172.30.1.123:8081</code></p><blockquote><p>当我们需要获取真实IP的业务时，还需要添加关于真实IP的配置</p></blockquote><div class="hint-container tip"><p class="hint-container-title">提示</p><p>Nginx每一条配置语句后面都必须要加分好; 否则会报配置错误</p></div><pre><code class="language-shell">server {
 listen 80;
 server_name 127.0.0.1;

 location / {
 proxy_pass http://127.0.0.1:3000;
 proxy_set_header Host $host:80;
 proxy_set_header X-Real-IP $remote_addr;
 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 }

 location ~ /api/ {
 proxy_pass http://172.30.1.123:8081;
 proxy_set_header Host $host:80;
 proxy_set_header X-Real-IP $remote_addr;
 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 }
}
</code></pre><p>proxy_set_header这个配置是改变HTTP的请求头，而Host是请求的主机名，X-Real-IP是请求的真实IP，X-Forwarded-For表示请求是由谁发起的。</p><p>因为我们的Nginx在这里属于代理服务器，通过proxy_set_header配置这些信息目的是让服务端获取到真实的请求头</p>`,134),l=[r];function i(s,c){return t(),n("div",null,l)}const d=e(a,[["render",i],["__file","face-cors.html.vue"]]),h=JSON.parse('{"path":"/cs-tips/frontend/others/face-cors.html","title":"正确面对跨域，别慌","lang":"zh-CN","frontmatter":{"description":"正确面对跨域，别慌 前端开发中，跨域使我们经常遇到的一个问题，也是面试中经常被问到的一些问题，所以，这里，我们做个总结。小小问题，不足担心 原文地址：YOU-SHOULD-KNOW-JS 什么是跨域 跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对JavaScript实施的安全限制。 同源策略限制了一下行为： Cooki...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/others/face-cors.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"正确面对跨域，别慌"}],["meta",{"property":"og:description","content":"正确面对跨域，别慌 前端开发中，跨域使我们经常遇到的一个问题，也是面试中经常被问到的一些问题，所以，这里，我们做个总结。小小问题，不足担心 原文地址：YOU-SHOULD-KNOW-JS 什么是跨域 跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对JavaScript实施的安全限制。 同源策略限制了一下行为： Cooki..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"正确面对跨域，别慌\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"什么是跨域","slug":"什么是跨域","link":"#什么是跨域","children":[]},{"level":2,"title":"常见的跨域场景","slug":"常见的跨域场景","link":"#常见的跨域场景","children":[]},{"level":2,"title":"跨域的解决办法","slug":"跨域的解决办法","link":"#跨域的解决办法","children":[{"level":3,"title":"jsonp跨域","slug":"jsonp跨域","link":"#jsonp跨域","children":[]},{"level":3,"title":"document.domain + iframe 跨域","slug":"document-domain-iframe-跨域","link":"#document-domain-iframe-跨域","children":[]},{"level":3,"title":"window.name + iframe 跨域","slug":"window-name-iframe-跨域","link":"#window-name-iframe-跨域","children":[]},{"level":3,"title":"location.hash + iframe 跨域","slug":"location-hash-iframe-跨域","link":"#location-hash-iframe-跨域","children":[]},{"level":3,"title":"postMessage跨域","slug":"postmessage跨域","link":"#postmessage跨域","children":[]},{"level":3,"title":"跨域资源共享 CORS","slug":"跨域资源共享-cors","link":"#跨域资源共享-cors","children":[{"level":4,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":4,"title":"两种请求","slug":"两种请求","link":"#两种请求","children":[]},{"level":4,"title":"简单请求","slug":"简单请求","link":"#简单请求","children":[{"level":5,"title":"基本流程","slug":"基本流程","link":"#基本流程","children":[]},{"level":5,"title":"withCredentials 属性","slug":"withcredentials-属性","link":"#withcredentials-属性","children":[]}]},{"level":4,"title":"非简单请求","slug":"非简单请求","link":"#非简单请求","children":[{"level":5,"title":"预检请求的回应","slug":"预检请求的回应","link":"#预检请求的回应","children":[]},{"level":5,"title":"浏览器正常请求回应","slug":"浏览器正常请求回应","link":"#浏览器正常请求回应","children":[]}]},{"level":4,"title":"结束语","slug":"结束语","link":"#结束语","children":[]}]},{"level":3,"title":"WebSocket协议跨域","slug":"websocket协议跨域","link":"#websocket协议跨域","children":[]},{"level":3,"title":"node代理跨域","slug":"node代理跨域","link":"#node代理跨域","children":[]},{"level":3,"title":"nginx代理跨域","slug":"nginx代理跨域","link":"#nginx代理跨域","children":[]}]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":17.54,"words":5263},"filePathRelative":"cs-tips/frontend/others/face-cors.md","localizedDate":"2023年5月25日","autoDesc":true}');export{d as comp,h as data};
