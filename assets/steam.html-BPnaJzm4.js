import{_ as e,c as t,o as a,d as r}from"./app-CbULZrmi.js";const n={},o=r(`<h1 id="异步之-stream-详解" tabindex="-1"><a class="header-anchor" href="#异步之-stream-详解"><span>异步之 Stream 详解</span></a></h1><p>关于Dart 语言的Stream 部分，应该回到语言本身去寻找答案，许多资料在Flutter框架中囫囵吞枣式的解释<code>Stream</code>，总有一种让人云山雾罩的感觉，事实上从Dart语言本身去了解Stream并不复杂，接下来就花点时间好好学习一下<code>Stream</code>吧！</p><p><code>Stream</code>和 <code>Future</code>都是Dart中异步编程的核心内容，在之前的文章中已经详细叙述了关于<code>Future</code>的知识，请查看 <a href="https://blog.csdn.net/yingshukun/article/details/89840009" target="_blank" rel="noopener noreferrer">Dart 异步编程详解</a>，本篇文章则主要基于 Dart2.5 介绍<code>Stream</code>的知识。</p><h2 id="什么是stream" tabindex="-1"><a class="header-anchor" href="#什么是stream"><span>什么是Stream</span></a></h2><p><code>Stream</code>是Dart语言中的所谓异步数据序列的东西，简单理解，其实就是一个异步数据队列而已。我们知道队列的特点是先进先出的，<code>Stream</code>也正是如此</p><p>更形象的比喻，<code>Stream</code>就像一个传送带。可以将一侧的物品自动运送到另一侧。如上图，在另一侧，如果没有人去抓取，物品就会掉落消失。</p><p>但如果我们在末尾设置一个监听，当物品到达末端时，就可以触发相应的响应行为。</p><blockquote><p>在Dart语言中，<code>Stream</code>有两种类型，一种是点对点的单订阅流（Single-subscription），另一种则是广播流。</p></blockquote><h2 id="单订阅流" tabindex="-1"><a class="header-anchor" href="#单订阅流"><span>单订阅流</span></a></h2><p>单订阅流的特点是只允许存在一个监听器，即使该监听器被取消后，也不允许再次注册监听器。</p><h3 id="创建-stream" tabindex="-1"><a class="header-anchor" href="#创建-stream"><span>创建 Stream</span></a></h3><p>创建一个<code>Stream</code>有9个构造方法，其中一个是构造广播流的，这里主要看一下其中5个构造单订阅流的方法</p><h4 id="periodic" tabindex="-1"><a class="header-anchor" href="#periodic"><span>periodic</span></a></h4><pre><code class="language-java">void main(){
  test();
}

test() async{
  // 使用 periodic 创建流，第一个参数为间隔时间，第二个参数为回调函数
  Stream&lt;int&gt; stream = Stream&lt;int&gt;.periodic(Duration(seconds: 1), callback);
  // await for循环从流中读取
  await for(var i in stream){
    print(i);
  }
}

// 可以在回调函数中对值进行处理，这里直接返回了
int callback(int value){
  return value;
}
</code></pre><p>打印结果：</p><pre><code>0
1
2
3
4
...
</code></pre><p>该方法从整数0开始，在指定的间隔时间内生成一个自然数列，以上设置为每一秒生成一次，<code>callback</code>函数用于对生成的整数进行处理，处理后再放入<code>Stream</code>中。这里并未处理，直接返回了。要注意，这个流是无限的，它没有任何一个约束条件使之停止。在后面会介绍如何给流设置条件。</p><h4 id="fromfuture" tabindex="-1"><a class="header-anchor" href="#fromfuture"><span>fromFuture</span></a></h4><pre><code class="language-java">void main(){
  test();
}

test() async{
  print(&quot;test start&quot;);
  Future&lt;String&gt; fut = Future((){
      return &quot;async task&quot;;
  });

  // 从Future创建Stream
  Stream&lt;String&gt; stream = Stream&lt;String&gt;.fromFuture(fut);
  await for(var s in stream){
    print(s);
  }
  print(&quot;test end&quot;);
}
</code></pre><p>打印结果：</p><pre><code>test start
async task
test end
</code></pre><p>该方法从一个<code>Future</code>创建<code>Stream</code>，当<code>Future</code>执行完成时，就会放入<code>Stream</code>中，而后从<code>Stream</code>中将任务完成的结果取出。这种用法，很像异步任务队列。</p><h4 id="fromfutures" tabindex="-1"><a class="header-anchor" href="#fromfutures"><span>fromFutures</span></a></h4><p>从多个<code>Future</code>创建<code>Stream</code>，即将一系列的异步任务放入<code>Stream</code>中，每个<code>Future</code>按顺序执行，执行完成后放入<code>Stream</code></p><pre><code class="language-java">import  &#39;dart:io&#39;;

void main() {
  test();
}

test() async{
  print(&quot;test start&quot;);
  Future&lt;String&gt; fut1 = Future((){
      // 模拟耗时5秒
      sleep(Duration(seconds:5));
      return &quot;async task1&quot;;
  });
    Future&lt;String&gt; fut2 = Future((){
      return &quot;async task2&quot;;
  });

  // 将多个Future放入一个列表中，将该列表传入
  Stream&lt;String&gt; stream = Stream&lt;String&gt;.fromFutures([fut1,fut2]);
  await for(var s in stream){
    print(s);
  }
  print(&quot;test end&quot;);
}
</code></pre><h4 id="fromiterable" tabindex="-1"><a class="header-anchor" href="#fromiterable"><span>fromIterable</span></a></h4><p>该方法从一个集合创建<code>Stream</code>，用法与上面例子大致相同</p><pre><code class="language-java">// 从一个列表创建\`Stream\`
Stream&lt;int&gt; stream = Stream&lt;int&gt;.fromIterable([1,2,3]);
</code></pre><h4 id="value" tabindex="-1"><a class="header-anchor" href="#value"><span>value</span></a></h4><p>这是Dart2.5 新增的方法，用于从单个值创建<code>Stream</code></p><pre><code class="language-java">test() async{
  Stream&lt;bool&gt; stream = Stream&lt;bool&gt;.value(false);
  // await for循环从流中读取
  await for(var i in stream){
    print(i);
  }
}
</code></pre><h3 id="监听-stream" tabindex="-1"><a class="header-anchor" href="#监听-stream"><span>监听 Stream</span></a></h3><p>监听<code>Stream</code>，并从中获取数据也有三种方式，一种就是我们上文中使用的<code>await for</code>循环，这也是官方推荐的方式，看起来更简洁友好，除此之外，另两种方式分别是使用<code>forEach</code>方法或<code>listen</code>方法</p><pre><code class="language-java">  Stream&lt;int&gt; stream = Stream&lt;int&gt;.periodic(Duration(seconds: 1), callback);
  // 使用forEach，传入一个函数进去获取并处理数据
  stream.forEach((int x){
    print(x);
  });
</code></pre><p>使用 <code>listen</code> 监听 <code>StreamSubscription&lt;T&gt; listen(void onData(T event), {Function onError, void onDone(), bool cancelOnError})</code></p><pre><code class="language-java">  Stream&lt;int&gt; stream = Stream&lt;int&gt;.periodic(Duration(seconds: 1), callback);
  stream.listen((x){
    print(x);
  });
</code></pre><p>还可以使用几个可选的参数</p><pre><code class="language-java">test() async{
  Stream&lt;int&gt; stream = Stream&lt;int&gt;.periodic(Duration(seconds: 1), callback);
  stream = stream.take(5);
  stream.listen(
    (x)=&gt;print(x),
  onError: (e)=&gt;print(e),
  onDone: ()=&gt;print(&quot;onDone&quot;));
}
</code></pre><ul><li><code>onError</code>：发生Error时触发</li><li><code>onDone</code>：完成时触发</li><li><code>unsubscribeOnError</code>：遇到第一个Error时是否取消监听，默认为<code>false</code></li></ul><h3 id="stream-的一些方法" tabindex="-1"><a class="header-anchor" href="#stream-的一些方法"><span>Stream 的一些方法</span></a></h3><h4 id="take-和-takewhile" tabindex="-1"><a class="header-anchor" href="#take-和-takewhile"><span>take 和 takeWhile</span></a></h4><p><code>Stream&lt;T&gt; take(int count)</code> 用于限制<code>Stream</code>中的元素数量</p><pre><code class="language-java">test() async{
  Stream&lt;int&gt; stream = Stream&lt;int&gt;.periodic(Duration(seconds: 1), callback);
  // 当放入三个元素后，监听会停止，Stream会关闭
  stream = stream.take(3);

  await for(var i in stream){
    print(i);
  }
}
</code></pre><p>打印结果：</p><pre><code>0
1
2
</code></pre><p><code>Stream&lt;T&gt;.takeWhile(bool test(T element))</code> 与 <code>take</code>作用相似，只是它的参数是一个函数类型，且返回值必须是一个<code>bool</code>值</p><pre><code class="language-java">  stream = stream.takeWhile((x){
    // 对当前元素进行判断，不满足条件则取消监听
    return x &lt;= 3;
  });

</code></pre><h4 id="skip-和-skipwhile" tabindex="-1"><a class="header-anchor" href="#skip-和-skipwhile"><span>skip 和 skipWhile</span></a></h4><pre><code class="language-java">test() async{
  Stream&lt;int&gt; stream = Stream&lt;int&gt;.periodic(Duration(seconds: 1), callback);
  stream = stream.take(5);
  // 表示从Stream中跳过两个元素
  stream = stream.skip(2);

  await for(var i in stream){
    print(i);
  }
}
</code></pre><p>打印结果：</p><pre><code>2
3
4
</code></pre><p>请注意，该方法只是从<code>Stream</code>中获取元素时跳过，被跳过的元素依然是被执行了的，所耗费的时间依然存在，其实只是跳过了执行完的结果而已。</p><p><code>Stream&lt;T&gt; skipWhile(bool test(T element))</code> 方法与<code>takeWhile</code>用法是相同的，传入一个函数对结果进行判断，表示跳过满足条件的。</p><h4 id="tolist" tabindex="-1"><a class="header-anchor" href="#tolist"><span>toList</span></a></h4><p><code>Future&lt;List&lt;T&gt;&gt; toList()</code> 表示将<code>Stream</code>中所有数据存储在List中</p><pre><code class="language-java">test() async{
  Stream&lt;int&gt; stream = Stream&lt;int&gt;.periodic(Duration(seconds: 1), callback);
  stream = stream.take(5);
  List &lt;int&gt; data = await stream.toList(); 
  for(var i in data){ 
      print(i);
   } 
}
</code></pre><h4 id="属性-length" tabindex="-1"><a class="header-anchor" href="#属性-length"><span>属性 length</span></a></h4><p>等待并获取流中所有数据的数量</p><pre><code class="language-java">test() async{
  Stream&lt;int&gt; stream = Stream&lt;int&gt;.periodic(Duration(seconds: 1), callback);
  stream = stream.take(5);
  var len = await stream.length;
  print(len);
}
</code></pre><h3 id="streamcontroller" tabindex="-1"><a class="header-anchor" href="#streamcontroller"><span>StreamController</span></a></h3><p>它实际上就是<code>Stream</code>的一个帮助类，可用于整个 <code>Stream</code> 过程的控制。</p><pre><code class="language-java">import &#39;dart:async&#39;;

void main() {
  test();
}

test() async{
  // 创建
  StreamController streamController = StreamController();
  // 放入事件
  streamController.add(&#39;element_1&#39;);
  streamController.addError(&quot;this is error&quot;);
  streamController.sink.add(&#39;element_2&#39;);
  streamController.stream.listen(
    print,
  onError: print,
  onDone: ()=&gt;print(&quot;onDone&quot;));
}
</code></pre><p>使用该类时，需要导入<code>&#39;dart:async&#39;</code>，其<code>add</code>方法和<code>sink.add</code>方法是相同的，都是用于放入一个元素，<code>addError</code>方法用于产生一个错误，监听方法中的<code>onError</code>可获取错误。</p><p>还可以在<code>StreamController</code>中传入一个指定的<code>stream</code></p><pre><code class="language-java">test() async{
  Stream&lt;int&gt; stream = Stream&lt;int&gt;.periodic(Duration(seconds: 1), (e)=&gt;e);
  stream = stream.take(5);

  StreamController sc = StreamController();
  // 将 Stream 传入
  sc.addStream(stream);
  // 监听
  sc.stream.listen(
    print,
  onDone: ()=&gt;print(&quot;onDone&quot;));
}
</code></pre><p>现在来看一下<code>StreamController</code>的原型，它有5个可选参数</p><pre><code class="language-dart">factory StreamController(
      {void onListen(),
      void onPause(),
      void onResume(),
      onCancel(),
      bool sync: false})
</code></pre><ul><li><code>onListen</code> 注册监听时回调</li><li><code>onPause</code> 当流暂停时回调</li><li><code>onResume</code> 当流恢复时回调</li><li><code>onCancel</code> 当监听器被取消时回调</li><li><code>sync</code> 当值为<code>true</code>时表示同步控制器<code>SynchronousStreamController</code>，默认值为<code>false</code>，表示异步控制器</li></ul><pre><code class="language-java">test() async{
  // 创建
  StreamController sc = StreamController(
    onListen: ()=&gt;print(&quot;onListen&quot;),
    onPause: ()=&gt;print(&quot;onPause&quot;),
    onResume: ()=&gt;print(&quot;onResume&quot;),
    onCancel: ()=&gt;print(&quot;onCancel&quot;),
    sync:false
  );

  StreamSubscription ss = sc.stream.listen(print);

  sc.add(&#39;element_1&#39;);

  // 暂停
  ss.pause();
  // 恢复
  ss.resume();
  // 取消
  ss.cancel();

  // 关闭流
  sc.close();
}
</code></pre><p>打印结果：</p><pre><code>onListen
onPause
onCancel
</code></pre><p>因为监听器被取消了，且关闭了流，导致<code>&quot;element_1&quot;</code>未被输出，<code>&quot;onResume&quot;</code>亦未输出</p><h2 id="广播流" tabindex="-1"><a class="header-anchor" href="#广播流"><span>广播流</span></a></h2><p>如下，在普通的单订阅流中调用两次<code>listen</code>会报错</p><pre><code class="language-java">test() async{
  Stream&lt;int&gt; stream = Stream&lt;int&gt;.periodic(Duration(seconds: 1), (e)=&gt;e);
  stream = stream.take(5);

  stream.listen(print);
  stream.listen(print);
}
</code></pre><pre><code>Unhandled exception:
Bad state: Stream has already been listened to.
</code></pre><p>前面已经说了单订阅流的特点，而广播流则可以允许多个监听器存在，就如同广播一样，凡是监听了广播流，每个监听器都能获取到数据。要注意，如果在触发事件时将监听者正添加到广播流，则该监听器将不会接收当前正在触发的事件。如果取消监听，监听者会立即停止接收事件。</p><p>有两种方式创建广播流，一种直接从<code>Stream</code>创建，另一种使用<code>StreamController</code>创建</p><pre><code class="language-java">test() async{
  // 调用 Stream 的 asBroadcastStream 方法创建
  Stream&lt;int&gt; stream = Stream&lt;int&gt;.periodic(Duration(seconds: 1), (e)=&gt;e)
  .asBroadcastStream();
  stream = stream.take(5);

  stream.listen(print);
  stream.listen(print);
}
</code></pre><p>使用<code>StreamController</code></p><pre><code class="language-java">test() async{
  // 创建广播流
  StreamController sc = StreamController.broadcast();

  sc.stream.listen(print);
  sc.stream.listen(print);

  sc.add(&quot;event1&quot;);
  sc.add(&quot;event2&quot;);
}
</code></pre><h2 id="streamtransformer" tabindex="-1"><a class="header-anchor" href="#streamtransformer"><span>StreamTransformer</span></a></h2><p>该类可以使我们在<code>Stream</code>上执行数据转换。然后，这些转换被推回到流中，以便该流注册的所有监听器可以接收</p><p><strong>构造方法原型</strong></p><pre><code class="language-dart">factory StreamTransformer.fromHandlers({
      void handleData(S data, EventSink&lt;T&gt; sink),
      void handleError(Object error, StackTrace stackTrace, EventSink&lt;T&gt; sink),
      void handleDone(EventSink&lt;T&gt; sink)
})
</code></pre><ul><li><code>handleData</code>：响应从流中发出的任何数据事件。提供的参数是来自发出事件的数据，以及<code>EventSink&lt;T&gt;</code>，表示正在进行此转换的当前流的实例</li><li><code>handleError</code>：响应从流中发出的任何错误事件</li><li><code>handleDone</code>：当流不再有数据要处理时调用。通常在流的<code>close()</code>方法被调用时回调</li></ul><pre><code class="language-java">void test() {
  StreamController sc = StreamController&lt;int&gt;();
  
  // 创建 StreamTransformer对象
  StreamTransformer stf = StreamTransformer&lt;int, double&gt;.fromHandlers(
    handleData: (int data, EventSink sink) {
      // 操作数据后，转换为 double 类型
      sink.add((data * 2).toDouble());
    }, 
    handleError: (error, stacktrace, sink) {
      sink.addError(&#39;wrong: $error&#39;);
    }, 
    handleDone: (sink) {
      sink.close();
    },
  );
  
  // 调用流的transform方法，传入转换对象
  Stream stream = sc.stream.transform(stf);

  stream.listen(print);

  // 添加数据，这里的类型是int
  sc.add(1);
  sc.add(2); 
  sc.add(3); 
  
  // 调用后，触发handleDone回调
  // sc.close();
}
</code></pre><p>打印结果：</p><pre><code>2.0
4.0
6.0
</code></pre><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>与流相关的操作，主要有四个类</p><ul><li><code>Stream</code></li><li><code>StreamController</code></li><li><code>StreamSink</code></li><li><code>StreamSubscription</code></li></ul><p><code>Stream</code>是基础，为了更方便控制和管理<code>Stream</code>，出现了<code>StreamController</code>类。在<code>StreamController</code>类中， 提供了<code>StreamSink</code> 作为事件输入口，当我们调用<code>add</code>时，实际上是调用的<code>sink.add</code>，通过<code>sink</code>属性可以获取<code>StreamController</code>类中的<code>StreamSink</code> ，而<code>StreamSubscription</code>类则用于管理事件的注册、暂停与取消等，通过调用<code>stream.listen</code>方法返回一个<code>StreamSubscription</code>对象。</p>`,93),s=[o];function c(l,d){return a(),t("div",null,s)}const m=e(n,[["render",c],["__file","steam.html.vue"]]),p=JSON.parse('{"path":"/flutter-tutor/dart/steam.html","title":"异步之 Stream 详解","lang":"zh-CN","frontmatter":{"description":"异步之 Stream 详解 关于Dart 语言的Stream 部分，应该回到语言本身去寻找答案，许多资料在Flutter框架中囫囵吞枣式的解释Stream，总有一种让人云山雾罩的感觉，事实上从Dart语言本身去了解Stream并不复杂，接下来就花点时间好好学习一下Stream吧！ Stream和 Future都是Dart中异步编程的核心内容，在之前的文...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/flutter-tutor/dart/steam.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"异步之 Stream 详解"}],["meta",{"property":"og:description","content":"异步之 Stream 详解 关于Dart 语言的Stream 部分，应该回到语言本身去寻找答案，许多资料在Flutter框架中囫囵吞枣式的解释Stream，总有一种让人云山雾罩的感觉，事实上从Dart语言本身去了解Stream并不复杂，接下来就花点时间好好学习一下Stream吧！ Stream和 Future都是Dart中异步编程的核心内容，在之前的文..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"异步之 Stream 详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"什么是Stream","slug":"什么是stream","link":"#什么是stream","children":[]},{"level":2,"title":"单订阅流","slug":"单订阅流","link":"#单订阅流","children":[{"level":3,"title":"创建 Stream","slug":"创建-stream","link":"#创建-stream","children":[{"level":4,"title":"periodic","slug":"periodic","link":"#periodic","children":[]},{"level":4,"title":"fromFuture","slug":"fromfuture","link":"#fromfuture","children":[]},{"level":4,"title":"fromFutures","slug":"fromfutures","link":"#fromfutures","children":[]},{"level":4,"title":"fromIterable","slug":"fromiterable","link":"#fromiterable","children":[]},{"level":4,"title":"value","slug":"value","link":"#value","children":[]}]},{"level":3,"title":"监听 Stream","slug":"监听-stream","link":"#监听-stream","children":[]},{"level":3,"title":"Stream 的一些方法","slug":"stream-的一些方法","link":"#stream-的一些方法","children":[{"level":4,"title":"take 和 takeWhile","slug":"take-和-takewhile","link":"#take-和-takewhile","children":[]},{"level":4,"title":"skip 和 skipWhile","slug":"skip-和-skipwhile","link":"#skip-和-skipwhile","children":[]},{"level":4,"title":"toList","slug":"tolist","link":"#tolist","children":[]},{"level":4,"title":"属性 length","slug":"属性-length","link":"#属性-length","children":[]}]},{"level":3,"title":"StreamController","slug":"streamcontroller","link":"#streamcontroller","children":[]}]},{"level":2,"title":"广播流","slug":"广播流","link":"#广播流","children":[]},{"level":2,"title":"StreamTransformer","slug":"streamtransformer","link":"#streamtransformer","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":8.31,"words":2493},"filePathRelative":"flutter-tutor/dart/steam.md","localizedDate":"2023年5月22日","autoDesc":true}');export{m as comp,p as data};
