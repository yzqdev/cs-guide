import{_ as e,c as t,o as n,d as r}from"./app-CbULZrmi.js";const a={},i=r(`<h1 id="dart的方法" tabindex="-1"><a class="header-anchor" href="#dart的方法"><span>dart的方法</span></a></h1><h2 id="位置参数" tabindex="-1"><a class="header-anchor" href="#位置参数"><span>位置参数</span></a></h2><pre><code class="language-dart">int insertUser(int id, String name) {
  // ...省略无关代码
}
</code></pre><p>在主程序中调用insertUser()函数时，必须按照对应的位置提供int类型的id和String类型的name</p><pre><code class="language-dart">insertUser(1, &#39;xiaoming&#39;);

// insertUser(&#39;xiaoming&#39;, 1); // 错误，参数位置必须与函数声明中相对应
</code></pre><p>因为调用函数时的参数位置固定，所以这种声明方式下的参数又称为位置参数。Dart允许开发者在函数中声明可选的位置参数，如下面这段代码所示。</p><pre><code class="language-dart">String insertUser(int id, String name, [int age]) {
  // ...
}
</code></pre><p>可选参数用[]包裹，因此在调用函数时可以传递也可以省略age参数</p><pre><code class="language-dart">insertUser(1, &#39;xiaoming&#39;);

insertUser(2, &#39;xiaohong&#39;, 20); // 正确
</code></pre><h2 id="命名参数" tabindex="-1"><a class="header-anchor" href="#命名参数"><span>命名参数</span></a></h2><p>另一种常用的参数声明方式是使用命名参数。这种方式下，自定义函数时的参数都需要用花括号括起来。</p><pre><code class="language-dart">String insertUser({int id, String name, int age}) {
      // ...
}
</code></pre><p>在调用时只需要根据对应的名称传递命名参数各自的值。</p><pre><code class="language-dart">insertUser(id: 1, name: &#39;xiaoming&#39;);

insertUser(name: &#39;xiaohong&#39;, id: 2);// 正确，命名参数位置不固定
</code></pre><p>所有的命名参数默认都是无序并且可选的，因此只要指定要传入的对应参数名称，就可以在任何位置传入它的值，也可以选择不传入值。对于必须要传递的命名参数，可以使用 @required来声明</p><pre><code class="language-dart">String insertUser({@required int id, String name, int age}) {
      // ...
}

</code></pre><p>这里，insertUser()函数的参数id就被指定为必须要传递的参数，我们在调用这个函数时就必须要传递id参数。</p><h2 id="默认参数" tabindex="-1"><a class="header-anchor" href="#默认参数"><span>默认参数</span></a></h2><pre><code class="language-dart">String insertUser({int id, String name, int age = 20}) { // 在命名参数下为age指定默认值

}

String insertUser(int id, String name, [int age = 20]) { // 在可选位置参数下为age指定默认值

}

</code></pre>`,19),d=[i];function o(s,c){return n(),t("div",null,d)}const l=e(a,[["render",o],["__file","dart-method.html.vue"]]),g=JSON.parse('{"path":"/flutter-tutor/dart/dart-method.html","title":"dart的方法","lang":"zh-CN","frontmatter":{"description":"dart的方法 位置参数 在主程序中调用insertUser()函数时，必须按照对应的位置提供int类型的id和String类型的name 因为调用函数时的参数位置固定，所以这种声明方式下的参数又称为位置参数。Dart允许开发者在函数中声明可选的位置参数，如下面这段代码所示。 可选参数用[]包裹，因此在调用函数时可以传递也可以省略age参数 命名参数 ...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/flutter-tutor/dart/dart-method.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"dart的方法"}],["meta",{"property":"og:description","content":"dart的方法 位置参数 在主程序中调用insertUser()函数时，必须按照对应的位置提供int类型的id和String类型的name 因为调用函数时的参数位置固定，所以这种声明方式下的参数又称为位置参数。Dart允许开发者在函数中声明可选的位置参数，如下面这段代码所示。 可选参数用[]包裹，因此在调用函数时可以传递也可以省略age参数 命名参数 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"dart的方法\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"位置参数","slug":"位置参数","link":"#位置参数","children":[]},{"level":2,"title":"命名参数","slug":"命名参数","link":"#命名参数","children":[]},{"level":2,"title":"默认参数","slug":"默认参数","link":"#默认参数","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.6,"words":479},"filePathRelative":"flutter-tutor/dart/dart-method.md","localizedDate":"2023年5月22日","autoDesc":true}');export{l as comp,g as data};
