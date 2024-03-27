import{_ as s,r as t,o as l,c as i,d as n,e,b as r,a as o}from"./app-BO2oONDQ.js";const p={},c=n("h1",{id:"flutter介绍",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#flutter介绍"},[n("span",null,"flutter介绍")])],-1),d={class:"hint-container tip"},u=n("p",{class:"hint-container-title"},"提示",-1),m={href:"https://flutter.dev/",target:"_blank",rel:"noopener noreferrer"},v=o(`<h2 id="说明" tabindex="-1"><a class="header-anchor" href="#说明"><span>说明</span></a></h2><p>Flutter 是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面。Flutter可以与现有的代码一起工作。在全世界，Flutter正在被越来越多的开发者和组织使用，并且Flutter是完全免费、开源的。</p><ul><li>快速开发<br> 毫秒级的热加载，修改后，您的应用界面会立即更新。使用丰富的、完全可定制的widget 在几分钟内构件原生界面 富有表现力和灵活的UI<br> 快速发布聚焦原生体验的功能。分层的架构允许您完全自定义，从而实现难以置信的快速渲染和富有表现力、灵活的设计。</li><li>原生性能<br> Flutter 包含了许多核心的 widget，如滚动、导航、图表和字体等，这些都可以在iOS和Android上达到原生应用一样的性能。</li><li>跨平台引擎</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>国内网络原因,部分依赖可能无法下载,需要设置两个环境变量</p><div class="language-env line-numbers-mode" data-ext="env" data-title="env"><pre class="language-env"><code>FLUTTER_STORAGE_BASE_URL: https://storage.flutter-io.cn
PUB_HOSTED_URL: https://pub.flutter-io.cn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h2><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token comment"># 给现有的项目添加支持</span>
flutter create <span class="token operator">--</span>platforms=windows<span class="token punctuation">,</span>macos<span class="token punctuation">,</span>linux <span class="token punctuation">.</span>

<span class="token comment"># 创建flutter应用</span>
flutter create my_app
<span class="token comment"># 创建包名</span>
flutter create <span class="token operator">--</span>org com<span class="token punctuation">.</span>yzq<span class="token punctuation">.</span>mobile<span class="token punctuation">.</span>study <span class="token operator">--</span>project-name mini_calendar <span class="token operator">--</span>platforms=android  <span class="token punctuation">.</span>
flutter create <span class="token operator">--</span>org com<span class="token punctuation">.</span>yourdomain your_app_name
<span class="token comment"># 运行程序</span>
flutter run 
flutter run <span class="token operator">-</span>d windows
flutter run <span class="token operator">-</span>d macos
flutter run <span class="token operator">-</span>d linux
flutter run <span class="token operator">-</span>d chrome
<span class="token comment"># 发布</span>
flutter build windows
flutter build web
flutter build apk <span class="token operator">--</span>release

<span class="token comment"># 分开打包</span>
flutter build apk <span class="token operator">--</span><span class="token function">split-per</span><span class="token operator">-</span>abi
<span class="token comment"># 升级flutter</span>
flutter upgrade
<span class="token comment"># 加入flutter windows支持(注意最后一个点)</span>
flutter create <span class="token operator">--</span>platforms=windows <span class="token punctuation">.</span>
flutter config <span class="token operator">--</span><span class="token function">enable-windows</span><span class="token operator">-</span>desktop <span class="token punctuation">.</span> 
flutter config <span class="token operator">--</span><span class="token function">enable-linux</span><span class="token operator">-</span>desktop <span class="token punctuation">.</span>
<span class="token comment"># 查看设备</span>
flutter devices
<span class="token comment"># 查看是否有问题</span>
flutter doctor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="依赖管理" tabindex="-1"><a class="header-anchor" href="#依赖管理"><span>依赖管理</span></a></h2><p>安装插件(from github)</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code>  <span class="token key atrule">window_size</span><span class="token punctuation">:</span>
    <span class="token key atrule">git</span><span class="token punctuation">:</span>
      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/google/flutter<span class="token punctuation">-</span>desktop<span class="token punctuation">-</span>embedding.git
      <span class="token key atrule">path</span><span class="token punctuation">:</span> plugins/window_size
      <span class="token key atrule">ref</span><span class="token punctuation">:</span> <span class="token string">&quot;master&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>flutter pub get
<span class="token comment"># pub get命令</span>

<span class="token comment"># 用于检索当前 Package 所依赖的其它 Package。如果 pubspec.lock 文件已经存在，则根据该文件中保存的依赖项版本获取对应的依赖项。如有必要，将会创建或更新该文件。</span>
flutter pu outdated
<span class="token comment"># pub outdated命令</span>
<span class="token comment"># 查看当前软件包所依赖的每个 package，确定哪些 package 的依赖项已过时，并为您提供有关如何更新它们的建议。当您要更新 package 的依赖性时，请使用此命令。</span>
flutter pub upgrade
<span class="token comment"># pub upgrade命令</span>
<span class="token comment"># 用于检索当前 Package 所依赖的其它 Package 的最新版本。如果 pubspec.lock 文件已经存在，则忽略其保存的版本并以 pubspec 文件中指定的最新版本为主。如有必要，将会创建或更新该文件。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项</span></a></h2><p>在谷歌浏览器运行,有时候会有错误,可以手动设置port和localhost</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>flutter run <span class="token parameter variable">-d</span> chrome --web-port<span class="token operator">=</span><span class="token number">8080</span> --web-hostname<span class="token operator">=</span><span class="token number">127.0</span>.0.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在android studio中,如何在android studio中运行chrome web, 以便支持热更新, 进行以下配置:</p><p>Run&gt; Run...&gt;Edit configurations&gt; Additional run args 增加参数: <code>--web-port=8080 --web-hostname=127.0.0.1</code></p>`,15);function b(k,h){const a=t("ExternalLinkIcon");return l(),i("div",null,[c,n("div",d,[u,n("p",null,[e("官网包括移动版和桌面版 "),n("a",m,[e("官网"),r(a)])])]),v])}const f=s(p,[["render",b],["__file","intro.html.vue"]]),_=JSON.parse('{"path":"/flutter-tutor/intro.html","title":"flutter介绍","lang":"zh-CN","frontmatter":{"description":"flutter介绍 提示 官网包括移动版和桌面版 官网 说明 Flutter 是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面。Flutter可以与现有的代码一起工作。在全世界，Flutter正在被越来越多的开发者和组织使用，并且Flutter是完全免费、开源的。 快速开发 毫秒级的热加载，修改后，您的应用界面会立即更新...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/flutter-tutor/intro.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"flutter介绍"}],["meta",{"property":"og:description","content":"flutter介绍 提示 官网包括移动版和桌面版 官网 说明 Flutter 是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面。Flutter可以与现有的代码一起工作。在全世界，Flutter正在被越来越多的开发者和组织使用，并且Flutter是完全免费、开源的。 快速开发 毫秒级的热加载，修改后，您的应用界面会立即更新..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"flutter介绍\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"说明","slug":"说明","link":"#说明","children":[]},{"level":2,"title":"常用命令","slug":"常用命令","link":"#常用命令","children":[]},{"level":2,"title":"依赖管理","slug":"依赖管理","link":"#依赖管理","children":[]},{"level":2,"title":"注意事项","slug":"注意事项","link":"#注意事项","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.49,"words":747},"filePathRelative":"flutter-tutor/intro.md","localizedDate":"2023年6月25日","autoDesc":true}');export{f as comp,_ as data};
