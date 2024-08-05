import{_ as t,c as e,o as r,d as o}from"./app-CbULZrmi.js";const a={},n=o(`<h1 id="flutter开发技巧" tabindex="-1"><a class="header-anchor" href="#flutter开发技巧"><span>flutter开发技巧</span></a></h1><h2 id="去除过渡动画" tabindex="-1"><a class="header-anchor" href="#去除过渡动画"><span>去除过渡动画</span></a></h2><ul><li>vrouter 在themedata加上这个</li></ul><pre><code> transitionDuration: Duration(seconds: 0),
</code></pre><ul><li>auto_route</li></ul><pre><code class="language-dart"> @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      theme: ThemeData(
        pageTransitionsTheme: PageTransitionsTheme(
          builders: {
            TargetPlatform.android: ZoomPageTransitionsBuilder(),
            TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
            TargetPlatform.windows: CupertinoPageTransitionsBuilder()//注意这里
          },
        ),
      ),
      routerDelegate: _appRouter.delegate(),
      routeInformationParser: _appRouter.defaultRouteParser(),
    );
  }
}
</code></pre><h2 id="错误" tabindex="-1"><a class="header-anchor" href="#错误"><span>错误</span></a></h2><p>debug Flutter Android应用时报错。报错内容如下：</p><pre><code>Error connecting to the service protocol: failed to connect to  &lt;http://127.0.0.1:57455/toyCz5p8HME=/&gt;
</code></pre><p>手机调试flutter APP时，不能热加载,报错如下图： <img src="https://s2.51cto.com/images/202210/49c050f1846897a30e5614eab8f9f4b6f8b0d5.png" alt="图片"></p><p><em>问题原因</em> PC和手机未处于同一个局域网内</p><p><em>解决方法：</em><br> 将手机和PC连接同一个网络 处于同一网络后报错消失</p>`,12),i=[n];function l(d,p){return r(),e("div",null,i)}const c=t(a,[["render",l],["__file","flutter-tips.html.vue"]]),u=JSON.parse('{"path":"/flutter-tutor/flutter-tips.html","title":"flutter开发技巧","lang":"zh-CN","frontmatter":{"description":"flutter开发技巧 去除过渡动画 vrouter 在themedata加上这个 auto_route 错误 debug Flutter Android应用时报错。报错内容如下： 手机调试flutter APP时，不能热加载,报错如下图： 图片 问题原因 PC和手机未处于同一个局域网内 解决方法： 将手机和PC连接同一个网络 处于同一网络后报错消失","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/flutter-tutor/flutter-tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"flutter开发技巧"}],["meta",{"property":"og:description","content":"flutter开发技巧 去除过渡动画 vrouter 在themedata加上这个 auto_route 错误 debug Flutter Android应用时报错。报错内容如下： 手机调试flutter APP时，不能热加载,报错如下图： 图片 问题原因 PC和手机未处于同一个局域网内 解决方法： 将手机和PC连接同一个网络 处于同一网络后报错消失"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://s2.51cto.com/images/202210/49c050f1846897a30e5614eab8f9f4b6f8b0d5.png "}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"flutter开发技巧\\",\\"image\\":[\\"https://s2.51cto.com/images/202210/49c050f1846897a30e5614eab8f9f4b6f8b0d5.png \\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"去除过渡动画","slug":"去除过渡动画","link":"#去除过渡动画","children":[]},{"level":2,"title":"错误","slug":"错误","link":"#错误","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.49,"words":147},"filePathRelative":"flutter-tutor/flutter-tips.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,u as data};
