import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/android-tips/hybrid/react-native/01-quick-start.html","title":"React Native 快速开始","lang":"zh-CN","frontmatter":{"order":1,"description":"React Native 快速开始 环境要求 Node.js 18+ Java 17 (Android) Android Studio (Android 开发) Xcode (iOS 开发，仅 macOS) 创建项目 常用命令 项目结构 添加依赖 常见问题 1. Metro 缓存问题 2. Gradle 版本不匹配 3. 真机调试","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"React Native 快速开始\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/hybrid/react-native/01-quick-start.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"React Native 快速开始"}],["meta",{"property":"og:description","content":"React Native 快速开始 环境要求 Node.js 18+ Java 17 (Android) Android Studio (Android 开发) Xcode (iOS 开发，仅 macOS) 创建项目 常用命令 项目结构 添加依赖 常见问题 1. Metro 缓存问题 2. Gradle 版本不匹配 3. 真机调试"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.1,"words":330},"filePathRelative":"android-tips/hybrid/react-native/01-quick-start.md","autoDesc":true}`),a={name:`01-quick-start.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="react-native-快速开始" tabindex="-1"><a class="header-anchor" href="#react-native-快速开始"><span>React Native 快速开始</span></a></h1><h2 id="环境要求" tabindex="-1"><a class="header-anchor" href="#环境要求"><span>环境要求</span></a></h2><ul><li>Node.js 18+</li><li>Java 17 (Android)</li><li>Android Studio (Android 开发)</li><li>Xcode (iOS 开发，仅 macOS)</li></ul><h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目"><span>创建项目</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 使用 React Native CLI</span></span>
<span class="line">npx @react-native-community/cli init MyApp</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或使用模板</span></span>
<span class="line">npx @react-native-community/cli init MyApp <span class="token parameter variable">--template</span> react-native-template-typescript</span>
<span class="line"></span></code></pre></div><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 运行 Android</span></span>
<span class="line">npx react-native run-android</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行 iOS</span></span>
<span class="line">npx react-native run-ios</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定设备/模拟器</span></span>
<span class="line">npx react-native run-android <span class="token parameter variable">--deviceId</span><span class="token operator">=</span>emulator-5554</span>
<span class="line">npx react-native run-ios <span class="token parameter variable">--simulator</span><span class="token operator">=</span><span class="token string">&quot;iPhone 15&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 发布模式</span></span>
<span class="line">npx react-native run-android <span class="token parameter variable">--variant</span><span class="token operator">=</span>release</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动 Metro bundler</span></span>
<span class="line">npx react-native start</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清除缓存</span></span>
<span class="line">npx react-native start --reset-cache</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构"><span>项目结构</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">MyApp/</span>
<span class="line">├── android/          # Android 原生工程</span>
<span class="line">├── ios/              # iOS 原生工程</span>
<span class="line">├── src/              # 源代码</span>
<span class="line">│   ├── components/   # 组件</span>
<span class="line">│   ├── screens/      # 页面</span>
<span class="line">│   ├── navigation/   # 导航</span>
<span class="line">│   └── utils/        # 工具</span>
<span class="line">├── App.tsx           # 入口组件</span>
<span class="line">├── package.json</span>
<span class="line">└── tsconfig.json</span>
<span class="line"></span></code></pre></div><h2 id="添加依赖" tabindex="-1"><a class="header-anchor" href="#添加依赖"><span>添加依赖</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 导航</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> @react-navigation/native @react-navigation/native-stack</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 网络请求</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> axios</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 本地存储</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> @react-native-async-storage/async-storage</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 图标</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> react-native-vector-icons</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 图片加载</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> react-native-fast-image</span>
<span class="line"></span></code></pre></div><h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题"><span>常见问题</span></a></h2><h3 id="_1-metro-缓存问题" tabindex="-1"><a class="header-anchor" href="#_1-metro-缓存问题"><span>1. Metro 缓存问题</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 清除缓存</span></span>
<span class="line">npx react-native start --reset-cache</span>
<span class="line"><span class="token builtin class-name">cd</span> android <span class="token operator">&amp;&amp;</span> ./gradlew clean</span>
<span class="line"></span></code></pre></div><h3 id="_2-gradle-版本不匹配" tabindex="-1"><a class="header-anchor" href="#_2-gradle-版本不匹配"><span>2. Gradle 版本不匹配</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看 Gradle 版本</span></span>
<span class="line"><span class="token builtin class-name">cd</span> android <span class="token operator">&amp;&amp;</span> ./gradlew <span class="token parameter variable">--version</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改 android/gradle/wrapper/gradle-wrapper.properties</span></span>
<span class="line"><span class="token comment"># 修改 android/build.gradle 中的 Gradle 插件版本</span></span>
<span class="line"></span></code></pre></div><h3 id="_3-真机调试" tabindex="-1"><a class="header-anchor" href="#_3-真机调试"><span>3. 真机调试</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 在手机上打开开发者模式</span></span>
<span class="line"><span class="token comment"># 连接 USB 并开启 USB 调试</span></span>
<span class="line"><span class="token comment"># 运行</span></span>
<span class="line">npx react-native run-android</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 如无法连接，尝试反向代理</span></span>
<span class="line">adb reverse tcp:8081 tcp:8081</span>
<span class="line"></span></code></pre></div>`,18)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};