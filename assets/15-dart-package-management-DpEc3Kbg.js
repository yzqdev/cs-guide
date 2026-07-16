import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/flutter-tutor/dart/15-dart-package-management.html","title":"Dart 包管理","lang":"zh-CN","frontmatter":{"order":15,"description":"Dart 包管理 官方文档 pubspec.yaml 每个 Dart/Flutter 项目根目录都有一个 pubspec.yaml 文件，定义项目的元数据和依赖。 常用 pub 命令 获取依赖 添加/移除依赖 更新依赖 其他命令 版本管理 版本约束语法 环境变量配置 配置镜像源 由于网络原因，国内需要配置镜像以提高依赖下载速度。 配置包缓存路径 依赖管...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Dart 包管理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/flutter-tutor/dart/15-dart-package-management.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Dart 包管理"}],["meta",{"property":"og:description","content":"Dart 包管理 官方文档 pubspec.yaml 每个 Dart/Flutter 项目根目录都有一个 pubspec.yaml 文件，定义项目的元数据和依赖。 常用 pub 命令 获取依赖 添加/移除依赖 更新依赖 其他命令 版本管理 版本约束语法 环境变量配置 配置镜像源 由于网络原因，国内需要配置镜像以提高依赖下载速度。 配置包缓存路径 依赖管..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1687669238000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.41,"words":723},"filePathRelative":"flutter-tutor/dart/15-dart-package-management.md","autoDesc":true}`),a={name:`15-dart-package-management.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="dart-包管理" tabindex="-1"><a class="header-anchor" href="#dart-包管理"><span>Dart 包管理</span></a></h1><p><a href="https://dart.dev/tools/pub/versioning" target="_blank" rel="noopener noreferrer">官方文档</a></p><h2 id="pubspec-yaml" tabindex="-1"><a class="header-anchor" href="#pubspec-yaml"><span>pubspec.yaml</span></a></h2><p>每个 Dart/Flutter 项目根目录都有一个 <code>pubspec.yaml</code> 文件，定义项目的元数据和依赖。</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> my_app</span>
<span class="line"><span class="token key atrule">description</span><span class="token punctuation">:</span> 一个 Dart 应用</span>
<span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> 1.0.0</span>
<span class="line"><span class="token key atrule">publish_to</span><span class="token punctuation">:</span> none <span class="token comment"># 不发布到 pub.dev</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">sdk</span><span class="token punctuation">:</span> <span class="token string">&#39;&gt;=3.0.0 &lt;4.0.0&#39;</span> <span class="token comment"># SDK 版本范围</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">dependencies</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">http</span><span class="token punctuation">:</span> ^1.1.0          <span class="token comment"># 常规依赖</span></span>
<span class="line">  <span class="token key atrule">path</span><span class="token punctuation">:</span> ^1.8.0</span>
<span class="line">  <span class="token key atrule">flutter</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">sdk</span><span class="token punctuation">:</span> flutter        <span class="token comment"># Flutter SDK 依赖</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">dev_dependencies</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">test</span><span class="token punctuation">:</span> ^1.24.0         <span class="token comment"># 仅开发环境使用</span></span>
<span class="line">  <span class="token key atrule">lints</span><span class="token punctuation">:</span> ^3.0.0</span>
<span class="line">  <span class="token key atrule">flutter_test</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">sdk</span><span class="token punctuation">:</span> flutter</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用-pub-命令" tabindex="-1"><a class="header-anchor" href="#常用-pub-命令"><span>常用 pub 命令</span></a></h2><h3 id="获取依赖" tabindex="-1"><a class="header-anchor" href="#获取依赖"><span>获取依赖</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 根据 pubspec.yaml 下载依赖</span></span>
<span class="line">dart pub get</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 在 Flutter 项目中</span></span>
<span class="line">flutter pub get</span>
<span class="line"></span></code></pre></div><h3 id="添加-移除依赖" tabindex="-1"><a class="header-anchor" href="#添加-移除依赖"><span>添加/移除依赖</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 添加依赖</span></span>
<span class="line">dart pub <span class="token function">add</span> http</span>
<span class="line">dart pub <span class="token function">add</span> path</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加 dev 依赖</span></span>
<span class="line">dart pub <span class="token function">add</span> <span class="token parameter variable">--dev</span> <span class="token builtin class-name">test</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加指定版本</span></span>
<span class="line">dart pub <span class="token function">add</span> http@^1.1.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 移除依赖</span></span>
<span class="line">dart pub remove http</span>
<span class="line"></span></code></pre></div><h3 id="更新依赖" tabindex="-1"><a class="header-anchor" href="#更新依赖"><span>更新依赖</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看可更新的包</span></span>
<span class="line">dart pub outdated</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 更新所有依赖（在 pubspec.yaml 约束范围内）</span></span>
<span class="line">dart pub upgrade</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 更新到最新版本（忽略 pubspec.yaml 约束）</span></span>
<span class="line">dart pub upgrade --major-versions</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 更新特定包</span></span>
<span class="line">dart pub upgrade http</span>
<span class="line"></span></code></pre></div><h3 id="其他命令" tabindex="-1"><a class="header-anchor" href="#其他命令"><span>其他命令</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 分析项目</span></span>
<span class="line">dart analyze</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 格式化代码</span></span>
<span class="line">dart <span class="token function">format</span> <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行测试</span></span>
<span class="line">dart <span class="token builtin class-name">test</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 编译为可执行文件</span></span>
<span class="line">dart compile exe bin/main.dart</span>
<span class="line"></span></code></pre></div><h2 id="版本管理" tabindex="-1"><a class="header-anchor" href="#版本管理"><span>版本管理</span></a></h2><h3 id="版本约束语法" tabindex="-1"><a class="header-anchor" href="#版本约束语法"><span>版本约束语法</span></a></h3><table><thead><tr><th>语法</th><th>含义</th><th>示例</th></tr></thead><tbody><tr><td><code>^1.2.3</code></td><td>乐观版本（&gt;=1.2.3 &lt;2.0.0）</td><td><code>^1.0.0</code></td></tr><tr><td><code>&gt;=1.0.0 &lt;2.0.0</code></td><td>范围约束</td><td><code>&gt;=1.0.0 &lt;2.0.0</code></td></tr><tr><td><code>any</code></td><td>任意版本</td><td><code>any</code></td></tr><tr><td><code>1.2.3</code></td><td>精确版本</td><td><code>1.2.3</code></td></tr><tr><td><code>&gt;=1.0.0</code></td><td>最小版本</td><td><code>&gt;=1.0.0</code></td></tr></tbody></table><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token key atrule">dependencies</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 乐观版本约束（推荐）</span></span>
<span class="line">  <span class="token key atrule">http</span><span class="token punctuation">:</span> ^1.1.0       <span class="token comment"># &gt;=1.1.0 且 &lt;2.0.0</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 范围约束</span></span>
<span class="line">  <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">&#39;&gt;=1.8.0 &lt;2.0.0&#39;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 精确版本</span></span>
<span class="line">  <span class="token key atrule">collection</span><span class="token punctuation">:</span> 1.17.0</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># Git 仓库依赖</span></span>
<span class="line">  <span class="token key atrule">my_package</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">git</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/example/my_package.git</span>
<span class="line">      <span class="token key atrule">ref</span><span class="token punctuation">:</span> main <span class="token comment"># 分支或 tag</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 本地路径依赖</span></span>
<span class="line">  <span class="token key atrule">my_local_package</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">path</span><span class="token punctuation">:</span> ../my_local_package</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="环境变量配置" tabindex="-1"><a class="header-anchor" href="#环境变量配置"><span>环境变量配置</span></a></h2><h3 id="配置镜像源" tabindex="-1"><a class="header-anchor" href="#配置镜像源"><span>配置镜像源</span></a></h3><p>由于网络原因，国内需要配置镜像以提高依赖下载速度。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 配置 PUB_HOSTED_URL 环境变量</span></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">PUB_HOSTED_URL</span><span class="token operator">=</span>https://pub.flutter-io.cn</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Windows PowerShell</span></span>
<span class="line"><span class="token variable">$env</span>:PUB_HOSTED_URL<span class="token operator">=</span><span class="token string">&#39;https://pub.flutter-io.cn&#39;</span></span>
<span class="line"></span></code></pre></div><h3 id="配置包缓存路径" tabindex="-1"><a class="header-anchor" href="#配置包缓存路径"><span>配置包缓存路径</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 设置 PUB_CACHE 指定依赖包下载位置</span></span>
<span class="line"><span class="token assign-left variable">PUB_CACHE</span><span class="token operator">=</span>D:<span class="token punctuation">\\</span>flutter<span class="token punctuation">\\</span>.pub-cache</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Dart 默认缓存：%LOCALAPPDATA%\\Pub\\Cache</span></span>
<span class="line"><span class="token comment"># Flutter 默认缓存：flutter\\.pub-cache</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置 PUB_CACHE 后，dart pub get 会使用该路径</span></span>
<span class="line"></span></code></pre></div><h2 id="依赖管理最佳实践" tabindex="-1"><a class="header-anchor" href="#依赖管理最佳实践"><span>依赖管理最佳实践</span></a></h2><h3 id="锁文件-pubspec-lock" tabindex="-1"><a class="header-anchor" href="#锁文件-pubspec-lock"><span>锁文件（pubspec.lock）</span></a></h3><p><code>pubspec.lock</code> 记录了实际安装的精确版本号，应提交到版本控制。</p><div class="language-yaml" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token comment"># pubspec.lock 示例（自动生成，不要手动修改）</span></span>
<span class="line"><span class="token key atrule">packages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">http</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">dependency</span><span class="token punctuation">:</span> <span class="token string">&quot;direct main&quot;</span></span>
<span class="line">    <span class="token key atrule">source</span><span class="token punctuation">:</span> hosted</span>
<span class="line">    <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;1.1.0&quot;</span></span>
<span class="line">  <span class="token key atrule">path</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">dependency</span><span class="token punctuation">:</span> <span class="token string">&quot;direct main&quot;</span></span>
<span class="line">    <span class="token key atrule">source</span><span class="token punctuation">:</span> hosted</span>
<span class="line">    <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;1.8.3&quot;</span></span>
<span class="line"></span></code></pre></div><h3 id="依赖类型" tabindex="-1"><a class="header-anchor" href="#依赖类型"><span>依赖类型</span></a></h3><div class="language-yaml" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token key atrule">dependencies</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 主依赖：应用运行必须</span></span>
<span class="line">  <span class="token key atrule">http</span><span class="token punctuation">:</span> ^1.1.0</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">dev_dependencies</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 开发依赖：仅开发/测试时需要</span></span>
<span class="line">  <span class="token key atrule">test</span><span class="token punctuation">:</span> ^1.24.0</span>
<span class="line">  <span class="token key atrule">build_runner</span><span class="token punctuation">:</span> ^2.4.0</span>
<span class="line">  <span class="token key atrule">json_serializable</span><span class="token punctuation">:</span> ^6.7.0</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">dependency_overrides</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 覆盖约束：强制使用特定版本（解决冲突）</span></span>
<span class="line">  <span class="token key atrule">collection</span><span class="token punctuation">:</span> 1.17.0</span>
<span class="line"></span></code></pre></div><h3 id="常用依赖" tabindex="-1"><a class="header-anchor" href="#常用依赖"><span>常用依赖</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token key atrule">dependencies</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># HTTP 请求</span></span>
<span class="line">  <span class="token key atrule">http</span><span class="token punctuation">:</span> ^1.1.0</span>
<span class="line">  <span class="token comment"># JSON 序列化</span></span>
<span class="line">  <span class="token key atrule">json_annotation</span><span class="token punctuation">:</span> ^4.8.0</span>
<span class="line">  <span class="token comment"># 状态管理</span></span>
<span class="line">  <span class="token key atrule">provider</span><span class="token punctuation">:</span> ^6.1.0</span>
<span class="line">  <span class="token comment"># 路由</span></span>
<span class="line">  <span class="token key atrule">go_router</span><span class="token punctuation">:</span> ^12.0.0</span>
<span class="line">  <span class="token comment"># 日志</span></span>
<span class="line">  <span class="token key atrule">logging</span><span class="token punctuation">:</span> ^1.2.0</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">dev_dependencies</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 测试</span></span>
<span class="line">  <span class="token key atrule">test</span><span class="token punctuation">:</span> ^1.24.0</span>
<span class="line">  <span class="token comment"># 代码生成</span></span>
<span class="line">  <span class="token key atrule">build_runner</span><span class="token punctuation">:</span> ^2.4.0</span>
<span class="line">  <span class="token key atrule">json_serializable</span><span class="token punctuation">:</span> ^6.7.0</span>
<span class="line">  <span class="token comment"># 代码规范</span></span>
<span class="line">  <span class="token key atrule">lints</span><span class="token punctuation">:</span> ^3.0.0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="编译为可执行文件" tabindex="-1"><a class="header-anchor" href="#编译为可执行文件"><span>编译为可执行文件</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 编译为 JIT（默认，需要 SDK 运行）</span></span>
<span class="line">dart run bin/main.dart</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 编译为 AOT 可执行文件</span></span>
<span class="line">dart compile exe bin/main.dart <span class="token parameter variable">-o</span> my_app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 编译为 AOT 共享库</span></span>
<span class="line">dart compile aot-snapshot bin/main.dart</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 编译为 JS（Web 项目）</span></span>
<span class="line">dart compile js bin/main.dart</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 输出文件在 build/ 目录下</span></span>
<span class="line">./my_app  <span class="token comment"># Windows: my_app.exe</span></span>
<span class="line"></span></code></pre></div>`,34)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};