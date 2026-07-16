import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/cs-tips/tool/dart.html","title":"Dart 命令","lang":"zh-CN","frontmatter":{"description":"Dart 命令 安装全局工具 常用命令 资源 Dart 官网：https://dart.dev Pub 包管理：https://pub.dev 全局工具文档：https://dart.dev/tools/pub/cmd/pub-global","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Dart 命令\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T05:51:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/tool/dart.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Dart 命令"}],["meta",{"property":"og:description","content":"Dart 命令 安装全局工具 常用命令 资源 Dart 官网：https://dart.dev Pub 包管理：https://pub.dev 全局工具文档：https://dart.dev/tools/pub/cmd/pub-global"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T05:51:09.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T05:51:09.000Z"}]]},"git":{"createdTime":1684989246000,"updatedTime":1783921869000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.48,"words":143},"filePathRelative":"cs-tips/tool/dart.md","autoDesc":true}`),a={name:`dart.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="dart-命令" tabindex="-1"><a class="header-anchor" href="#dart-命令"><span>Dart 命令</span></a></h1><h2 id="安装全局工具" tabindex="-1"><a class="header-anchor" href="#安装全局工具"><span>安装全局工具</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 激活全局工具</span></span>
<span class="line">dart pub global activate webdev</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 列出全局工具</span></span>
<span class="line">dart pub global list</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除全局工具</span></span>
<span class="line">dart pub global deactivate webdev</span>
<span class="line"></span></code></pre></div><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 创建项目</span></span>
<span class="line">dart create my_app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行</span></span>
<span class="line">dart run</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 编译</span></span>
<span class="line">dart compile exe bin/myapp.dart   <span class="token comment"># 打包为 exe</span></span>
<span class="line">dart compile js bin/myapp.dart    <span class="token comment"># 编译为 JS</span></span>
<span class="line">dart compile aot-snapshot bin/myapp.dart  <span class="token comment"># AOT 快照</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 分析代码</span></span>
<span class="line">dart analyze</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 格式化</span></span>
<span class="line">dart <span class="token function">format</span> <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 测试</span></span>
<span class="line">dart <span class="token builtin class-name">test</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 依赖管理</span></span>
<span class="line">dart pub get</span>
<span class="line">dart pub upgrade</span>
<span class="line">dart pub outdated</span>
<span class="line">dart pub <span class="token function">add</span> package_name</span>
<span class="line">dart pub remove package_name</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="资源" tabindex="-1"><a class="header-anchor" href="#资源"><span>资源</span></a></h2><ul><li>Dart 官网：https://dart.dev</li><li>Pub 包管理：https://pub.dev</li><li>全局工具文档：https://dart.dev/tools/pub/cmd/pub-global</li></ul>`,7)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};