import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/flutter-tutor/Flutter-learning/00-environment-setup.html","title":"环境搭建与配置","lang":"zh-CN","frontmatter":{"order":0,"description":"环境搭建与配置 1. 系统要求 2. 安装 Flutter SDK Windows macOS Linux 3. 安装编辑器 VS Code Android Studio 4. 配置 Android 开发环境 5. 配置 iOS 开发环境（仅 macOS） 6. 配置 Chrome（Web 开发） 7. 创建第一个项目 8. 常用命令参考 9. 项目结构","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"环境搭建与配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/flutter-tutor/Flutter-learning/00-environment-setup.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"环境搭建与配置"}],["meta",{"property":"og:description","content":"环境搭建与配置 1. 系统要求 2. 安装 Flutter SDK Windows macOS Linux 3. 安装编辑器 VS Code Android Studio 4. 配置 Android 开发环境 5. 配置 iOS 开发环境（仅 macOS） 6. 配置 Chrome（Web 开发） 7. 创建第一个项目 8. 常用命令参考 9. 项目结构"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.69,"words":507},"filePathRelative":"flutter-tutor/Flutter-learning/00-environment-setup.md","autoDesc":true}`),a={name:`00-environment-setup.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="环境搭建与配置" tabindex="-1"><a class="header-anchor" href="#环境搭建与配置"><span>环境搭建与配置</span></a></h1><h2 id="_1-系统要求" tabindex="-1"><a class="header-anchor" href="#_1-系统要求"><span>1. 系统要求</span></a></h2><table><thead><tr><th>操作系统</th><th>版本要求</th></tr></thead><tbody><tr><td>Windows</td><td>Windows 10+ (64位)</td></tr><tr><td>macOS</td><td>macOS 10.15+</td></tr><tr><td>Linux</td><td>Linux 桌面版 (64位)</td></tr></tbody></table><h2 id="_2-安装-flutter-sdk" tabindex="-1"><a class="header-anchor" href="#_2-安装-flutter-sdk"><span>2. 安装 Flutter SDK</span></a></h2><h3 id="windows" tabindex="-1"><a class="header-anchor" href="#windows"><span>Windows</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 下载 Flutter SDK</span></span>
<span class="line"><span class="token comment"># 访问 https://flutter.dev/docs/get-started/install/windows</span></span>
<span class="line"><span class="token comment"># 解压到 C:\\src\\flutter</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置环境变量</span></span>
<span class="line"><span class="token comment"># 将 C:\\src\\flutter\\bin 添加到 PATH</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 验证安装</span></span>
<span class="line">flutter doctor</span>
<span class="line"></span></code></pre></div><h3 id="macos" tabindex="-1"><a class="header-anchor" href="#macos"><span>macOS</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 通过 Homebrew 安装</span></span>
<span class="line">brew <span class="token function">install</span> <span class="token parameter variable">--cask</span> flutter</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或手动下载解压</span></span>
<span class="line"><span class="token comment"># 下载后解压到 ~/development/flutter</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置环境变量（添加到 ~/.zshrc 或 ~/.bashrc）</span></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">&quot;<span class="token environment constant">$PATH</span>:<span class="token environment constant">$HOME</span>/development/flutter/bin&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 验证安装</span></span>
<span class="line">flutter doctor</span>
<span class="line"></span></code></pre></div><h3 id="linux" tabindex="-1"><a class="header-anchor" href="#linux"><span>Linux</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 下载 SDK</span></span>
<span class="line"><span class="token builtin class-name">cd</span> ~</span>
<span class="line"><span class="token function">tar</span> xf flutter_linux_*.tar.xz</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置环境变量（~/.bashrc）</span></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">&quot;<span class="token environment constant">$PATH</span>:<span class="token environment constant">$HOME</span>/flutter/bin&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 验证</span></span>
<span class="line">flutter doctor</span>
<span class="line"></span></code></pre></div><h2 id="_3-安装编辑器" tabindex="-1"><a class="header-anchor" href="#_3-安装编辑器"><span>3. 安装编辑器</span></a></h2><h3 id="vs-code" tabindex="-1"><a class="header-anchor" href="#vs-code"><span>VS Code</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装 Flutter 扩展</span></span>
<span class="line"><span class="token comment"># 扩展 ID: Dart-Code.flutter</span></span>
<span class="line"></span></code></pre></div><h3 id="android-studio" tabindex="-1"><a class="header-anchor" href="#android-studio"><span>Android Studio</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 下载 Android Studio</span></span>
<span class="line"><span class="token comment"># 安装 Flutter 插件：文件 &gt; 设置 &gt; 插件 &gt; Flutter</span></span>
<span class="line"><span class="token comment"># 安装 Dart 插件</span></span>
<span class="line"></span></code></pre></div><h2 id="_4-配置-android-开发环境" tabindex="-1"><a class="header-anchor" href="#_4-配置-android-开发环境"><span>4. 配置 Android 开发环境</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装 Android SDK</span></span>
<span class="line"><span class="token comment"># 通过 Android Studio &gt; SDK 管理器</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 接受 Android 许可</span></span>
<span class="line">flutter doctor --android-licenses</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置 Android 环境变量</span></span>
<span class="line"><span class="token comment"># ANDROID_HOME：Android SDK 路径</span></span>
<span class="line"></span></code></pre></div><h2 id="_5-配置-ios-开发环境-仅-macos" tabindex="-1"><a class="header-anchor" href="#_5-配置-ios-开发环境-仅-macos"><span>5. 配置 iOS 开发环境（仅 macOS）</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装 Xcode（App Store）</span></span>
<span class="line"><span class="token function">sudo</span> xcode-select <span class="token parameter variable">--switch</span> /Applications/Xcode.app/Contents/Developer</span>
<span class="line"><span class="token function">sudo</span> xcodebuild <span class="token parameter variable">-runFirstLaunch</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装 CocoaPods</span></span>
<span class="line"><span class="token function">sudo</span> gem <span class="token function">install</span> cocoapods</span>
<span class="line"></span></code></pre></div><h2 id="_6-配置-chrome-web-开发" tabindex="-1"><a class="header-anchor" href="#_6-配置-chrome-web-开发"><span>6. 配置 Chrome（Web 开发）</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装 Chrome 浏览器</span></span>
<span class="line"><span class="token comment"># Flutter 支持使用 Chrome 进行 Web 开发调试</span></span>
<span class="line"></span></code></pre></div><h2 id="_7-创建第一个项目" tabindex="-1"><a class="header-anchor" href="#_7-创建第一个项目"><span>7. 创建第一个项目</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 创建项目</span></span>
<span class="line">flutter create my_first_app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进入项目目录</span></span>
<span class="line"><span class="token builtin class-name">cd</span> my_first_app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行项目（默认使用 Chrome）</span></span>
<span class="line">flutter run</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 在指定设备上运行</span></span>
<span class="line">flutter run <span class="token parameter variable">-d</span> chrome     <span class="token comment"># Web</span></span>
<span class="line">flutter run <span class="token parameter variable">-d</span> windows    <span class="token comment"># Windows 桌面</span></span>
<span class="line">flutter run <span class="token parameter variable">-d</span> android    <span class="token comment"># Android</span></span>
<span class="line"></span></code></pre></div><h2 id="_8-常用命令参考" tabindex="-1"><a class="header-anchor" href="#_8-常用命令参考"><span>8. 常用命令参考</span></a></h2><table><thead><tr><th>命令</th><th>说明</th></tr></thead><tbody><tr><td><code>flutter create &lt;name&gt;</code></td><td>创建新项目</td></tr><tr><td><code>flutter run</code></td><td>运行项目</td></tr><tr><td><code>flutter build apk</code></td><td>构建 Android APK</td></tr><tr><td><code>flutter build ios</code></td><td>构建 iOS 应用</td></tr><tr><td><code>flutter build web</code></td><td>构建 Web 应用</td></tr><tr><td><code>flutter build windows</code></td><td>构建 Windows 应用</td></tr><tr><td><code>flutter pub get</code></td><td>获取依赖</td></tr><tr><td><code>flutter pub add &lt;package&gt;</code></td><td>添加依赖</td></tr><tr><td><code>flutter clean</code></td><td>清理构建缓存</td></tr><tr><td><code>flutter upgrade</code></td><td>升级 Flutter 版本</td></tr><tr><td><code>flutter devices</code></td><td>列出可用设备</td></tr></tbody></table><h2 id="_9-项目结构" tabindex="-1"><a class="header-anchor" href="#_9-项目结构"><span>9. 项目结构</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">my_app/</span>
<span class="line">├── android/          # Android 原生代码</span>
<span class="line">├── ios/              # iOS 原生代码</span>
<span class="line">├── lib/              # Dart 源码目录</span>
<span class="line">│   └── main.dart     # 入口文件</span>
<span class="line">├── test/             # 测试文件</span>
<span class="line">├── web/              # Web 配置</span>
<span class="line">├── windows/          # Windows 桌面配置</span>
<span class="line">├── pubspec.yaml      # 项目配置文件</span>
<span class="line">└── analysis_options.yaml  # 代码分析配置</span>
<span class="line"></span></code></pre></div>`,27)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};