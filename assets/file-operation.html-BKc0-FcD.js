import{_ as e,c as t,o as n,d as i}from"./app-CbULZrmi.js";const r={},o=i(`<h1 id="标准输入输出流" tabindex="-1"><a class="header-anchor" href="#标准输入输出流"><span>标准输入输出流</span></a></h1><ul><li><code>stdin</code></li><li><code>stdout</code></li><li><code>stderr</code></li></ul><pre><code class="language-dart">// 导入io包
import &#39;dart:io&#39;;

void main() {
  // 向标准输出流写字符串
  stdout.write(&#39;root\\$:&#39;);
  // 从标准输入流读取一行字符串
  var input = stdin.readLineSync();
  // 带换行符的写数据
  stdout.writeln(&quot;input data:$input&quot;);
  // 向标准错误流写数据
  stderr.writeln(&quot;has not error&quot;);
}
</code></pre><p><code>stdin</code>除了可以使用<code>readLineSync</code>读一行字符串，还可以使用<code>readByteSync</code>读取一个字节。</p><h1 id="文件操作" tabindex="-1"><a class="header-anchor" href="#文件操作"><span>文件操作</span></a></h1><h2 id="写文件" tabindex="-1"><a class="header-anchor" href="#写文件"><span>写文件</span></a></h2><p>一种简便的操作方式，无需手动关闭文件，文件写入完成后会自动关闭</p><pre><code class="language-dart">import &#39;dart:io&#39;;

void main() async{
  // 创建文件
  File file = new File(&#39;test.txt&#39;);
  String content = &#39;The easiest way to write text to a file is to create a File&#39;;

  try {
    // 向文件写入字符串
    await file.writeAsString(content);
    print(&#39;Data written.&#39;);
  } catch (e) {
    print(e);
  }
}
</code></pre><p><code>writeAsString</code>原型</p><pre><code class="language-dart">  Future&lt;File&gt; writeAsString(String contents,
      {FileMode mode: FileMode.write,
      Encoding encoding: utf8,
      bool flush: false})
</code></pre><ul><li><code>mode</code> 文件模式，这里默认为写模式</li><li><code>encoding</code> 字符编码，默认为utf-8</li><li><code>flush</code> 是否立刻刷新缓存，默认为false</li></ul><p>文件模式<code>FileMode</code>的常量</p><table><thead><tr><th style="text-align:left;">常量值</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:left;">read</td><td style="text-align:left;">只读模式</td></tr><tr><td style="text-align:left;">write</td><td style="text-align:left;">可读可写模式，如果文件存在则会覆盖</td></tr><tr><td style="text-align:left;">append</td><td style="text-align:left;">追加模式，可读可写，文件存在则往末尾追加</td></tr><tr><td style="text-align:left;">writeOnly</td><td style="text-align:left;">只写模式</td></tr><tr><td style="text-align:left;">writeOnlyAppend</td><td style="text-align:left;">只写模式下的追加模式，不可读</td></tr></tbody></table><p>除了<code>writeAsString</code>方法外，还可以使用<code>writeAsBytes</code>写入一个字节列表。需要注意的是，这两个方法都是异步执行的，返回值都是<code>Future</code>，如果有必要，也可以使用同步方法执行写入操作</p><ul><li><code>writeAsStringSync</code></li><li><code>writeAsBytesSync</code></li></ul><p>如需要更灵活的控制，可以使用如下方式操作文件，但是需要手动关闭文件</p><pre><code class="language-dart">import &#39;dart:io&#39;;

void main() async{
  // 创建文件
  File file = new File(&#39;test.txt&#39;);
  // 文件模式设置为追加
  IOSink isk = file.openWrite(mode: FileMode.append);

  // 多次写入
  isk.write(&#39;A woman is like a tea bag&#39;);
  isk.writeln(&#39;you never know how strong it is until it\\&#39;s in hot water.&#39;);
  isk.writeln(&#39;-Eleanor Roosevelt&#39;);
  await isk.close();
  print(&#39;Done!&#39;);
}
</code></pre><h2 id="读文件" tabindex="-1"><a class="header-anchor" href="#读文件"><span>读文件</span></a></h2><p>简便的方式</p><ul><li><code>readAsBytes</code></li><li><code>readAsBytesSync</code></li><li><code>readAsString</code></li><li><code>readAsStringSync</code></li><li><code>readAsLines</code></li><li><code>readAsLinesSync</code></li></ul><pre><code class="language-dart">void main() async{
  File file = new File(&#39;test.txt&#39;);
  try{
    String content = await file.readAsString();
    print(content);
  }catch(e){
    print(e);
  }
}
</code></pre><p>另一种更低级别的方式</p><pre><code class="language-dart">import &#39;dart:io&#39;;
import &#39;dart:convert&#39;;

void main() async{
  try {
    // LineSplitter Dart语言封装的换行符，此处将文本按行分割
    Stream lines = new File(&#39;test.txt&#39;).openRead()
     .transform(utf8.decoder).transform(const LineSplitter());

    await for (var line in lines) {
      print(line);
    }
  } catch (_) {}
}
</code></pre><h2 id="文件的其他操作" tabindex="-1"><a class="header-anchor" href="#文件的其他操作"><span>文件的其他操作</span></a></h2><pre><code class="language-dart">import &#39;dart:io&#39;;

void main() async{
  File file = new File(&#39;test.txt&#39;);

  // 判断文件是否存在
  if(await file.exists()){
    print(&quot;文件存在&quot;);
  }else{
    print(&quot;文件不存在&quot;);
  }

  // 复制文件
  await file.copy(&quot;test-1.txt&quot;);

  // 修改文件名。当传入不同路径时，可用来移动文件
  await file.rename(&quot;test-2.txt&quot;);
  
  // 获取文件 size
  print(await file.length());
}
</code></pre><p>相应的，这些方法还有一个带<code>Sync</code>后缀的同步版本方法，例如<code>copySync</code>、<code>renameSync</code>等。</p><p>要获取文件更多的信息，还可以使用<code>File</code>等多个类的超类<code>FileSystemEntity</code>来操作</p><pre><code class="language-dart">import &#39;dart:io&#39;;

void main() async{
  String path = &#39;test.txt&#39;;

  // 判断路径是否是文件夹
  if (!await FileSystemEntity.isDirectory(path)) {
    print(&#39;$path is not a directory&#39;);
  } 

 Directory dir = Directory(r&#39;D:\\workspace\\dart_space\\Tutorial&#39;);
 // 目录是否存在
 if(await dir.exists()){
   // 从目录的list方法获取FileSystemEntity对象
   Stream&lt;FileSystemEntity&gt; fse = await dir.list();
   await for (FileSystemEntity entity in fse) {
     if(entity is File){
       print(&quot;entity is file&quot;);
     }

     // 打印文件信息
     print(await entity.stat());
     // 删除
     await entity.delete();
   }
 }else{
   // 不存在则创建。recursive为true时，创建路径上所有不存在的目录
   await dir.create(recursive: true);
 }
}
</code></pre><p>需注意，<code>delete</code>中包含一个可选的参数，原型<code>Future&lt;FileSystemEntity&gt; delete({bool recursive: false})</code>，<code>recursive</code>默认为false，当删除目录时，目录必须为空才能删除；当<code>recursive</code>设置为true时，将删除目录下的所有子目录及文件。</p>`,29),a=[o];function d(l,c){return n(),t("div",null,a)}const p=e(r,[["render",d],["__file","file-operation.html.vue"]]),y=JSON.parse('{"path":"/flutter-tutor/dart/file-operation.html","title":"标准输入输出流","lang":"zh-CN","frontmatter":{"description":"标准输入输出流 stdin stdout stderr stdin除了可以使用readLineSync读一行字符串，还可以使用readByteSync读取一个字节。 文件操作 写文件 一种简便的操作方式，无需手动关闭文件，文件写入完成后会自动关闭 writeAsString原型 mode 文件模式，这里默认为写模式 encoding 字符编码，默认为u...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/flutter-tutor/dart/file-operation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"标准输入输出流"}],["meta",{"property":"og:description","content":"标准输入输出流 stdin stdout stderr stdin除了可以使用readLineSync读一行字符串，还可以使用readByteSync读取一个字节。 文件操作 写文件 一种简便的操作方式，无需手动关闭文件，文件写入完成后会自动关闭 writeAsString原型 mode 文件模式，这里默认为写模式 encoding 字符编码，默认为u..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"标准输入输出流\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"写文件","slug":"写文件","link":"#写文件","children":[]},{"level":2,"title":"读文件","slug":"读文件","link":"#读文件","children":[]},{"level":2,"title":"文件的其他操作","slug":"文件的其他操作","link":"#文件的其他操作","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.03,"words":909},"filePathRelative":"flutter-tutor/dart/file-operation.md","localizedDate":"2023年5月22日","autoDesc":true}');export{p as comp,y as data};
