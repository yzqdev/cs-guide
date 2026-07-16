import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/kotlin-tutor/gradle/05-cli-wrapper.html","title":"命令行与 Wrapper","lang":"zh-CN","frontmatter":{"description":"命令行与 Wrapper 一、Gradle Wrapper Wrapper 是 Gradle 推荐的项目构建方式，它确保所有开发者使用相同的 Gradle 版本。 生成 Wrapper Wrapper 配置文件 更新 Wrapper 版本 二、常用命令速查 三、Gradle 守护进程 Gradle 守护进程（Daemon）是一个后台进程，在首次构建时启...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"命令行与 Wrapper\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T05:51:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/kotlin-tutor/gradle/05-cli-wrapper.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"命令行与 Wrapper"}],["meta",{"property":"og:description","content":"命令行与 Wrapper 一、Gradle Wrapper Wrapper 是 Gradle 推荐的项目构建方式，它确保所有开发者使用相同的 Gradle 版本。 生成 Wrapper Wrapper 配置文件 更新 Wrapper 版本 二、常用命令速查 三、Gradle 守护进程 Gradle 守护进程（Daemon）是一个后台进程，在首次构建时启..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T05:51:09.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T05:51:09.000Z"}]]},"git":{"createdTime":1783921869000,"updatedTime":1783921869000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.41,"words":724},"filePathRelative":"kotlin-tutor/gradle/05-cli-wrapper.md","autoDesc":true}`),a={name:`05-cli-wrapper.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="命令行与-wrapper" tabindex="-1"><a class="header-anchor" href="#命令行与-wrapper"><span>命令行与 Wrapper</span></a></h1><h2 id="一、gradle-wrapper" tabindex="-1"><a class="header-anchor" href="#一、gradle-wrapper"><span>一、Gradle Wrapper</span></a></h2><p>Wrapper 是 Gradle 推荐的项目构建方式，它确保所有开发者使用相同的 Gradle 版本。</p><h3 id="生成-wrapper" tabindex="-1"><a class="header-anchor" href="#生成-wrapper"><span>生成 Wrapper</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 使用系统安装的 Gradle 生成 Wrapper</span></span>
<span class="line">gradle wrapper --gradle-version <span class="token number">8.7</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定下载类型（all 包含源码和文档）</span></span>
<span class="line">gradle wrapper --gradle-version <span class="token number">8.7</span> --distribution-type all</span>
<span class="line"></span></code></pre></div><h3 id="wrapper-配置文件" tabindex="-1"><a class="header-anchor" href="#wrapper-配置文件"><span>Wrapper 配置文件</span></a></h3><div class="language-properties" data-highlighter="prismjs" data-ext="properties"><pre><code class="language-properties"><span class="line"><span class="token comment"># gradle/wrapper/gradle-wrapper.properties</span></span>
<span class="line"><span class="token key attr-name">distributionBase</span><span class="token punctuation">=</span><span class="token value attr-value">GRADLE_USER_HOME</span></span>
<span class="line"><span class="token key attr-name">distributionPath</span><span class="token punctuation">=</span><span class="token value attr-value">wrapper/dists</span></span>
<span class="line"><span class="token key attr-name">distributionUrl</span><span class="token punctuation">=</span><span class="token value attr-value">https\\://services.gradle.org/distributions/gradle-8.7-all.zip</span></span>
<span class="line"><span class="token key attr-name">networkTimeout</span><span class="token punctuation">=</span><span class="token value attr-value">10000</span></span>
<span class="line"><span class="token key attr-name">validateDistributionUrl</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token key attr-name">zipStoreBase</span><span class="token punctuation">=</span><span class="token value attr-value">GRADLE_USER_HOME</span></span>
<span class="line"><span class="token key attr-name">zipStorePath</span><span class="token punctuation">=</span><span class="token value attr-value">wrapper/dists</span></span>
<span class="line"></span></code></pre></div><h3 id="更新-wrapper-版本" tabindex="-1"><a class="header-anchor" href="#更新-wrapper-版本"><span>更新 Wrapper 版本</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 更新到指定版本</span></span>
<span class="line">./gradlew wrapper --gradle-version <span class="token number">8.7</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 更新到最新版</span></span>
<span class="line">./gradlew wrapper --gradle-version latest</span>
<span class="line"></span></code></pre></div><h2 id="二、常用命令速查" tabindex="-1"><a class="header-anchor" href="#二、常用命令速查"><span>二、常用命令速查</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># ===== 构建 =====</span></span>
<span class="line">./gradlew build                   <span class="token comment"># 完整构建（编译 + 测试 + 打包）</span></span>
<span class="line">./gradlew assemble                <span class="token comment"># 仅编译打包（不运行测试）</span></span>
<span class="line">./gradlew assembleDebug           <span class="token comment"># Debug 构建</span></span>
<span class="line">./gradlew assembleRelease         <span class="token comment"># Release 构建</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ===== 清理 =====</span></span>
<span class="line">./gradlew clean                   <span class="token comment"># 清理构建产物</span></span>
<span class="line">./gradlew cleanBuildCache         <span class="token comment"># 清理构建缓存</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ===== 测试 =====</span></span>
<span class="line">./gradlew <span class="token builtin class-name">test</span>                    <span class="token comment"># 运行单元测试</span></span>
<span class="line">./gradlew lint                    <span class="token comment"># 代码风格检查</span></span>
<span class="line">./gradlew check                   <span class="token comment"># 运行所有检查（test + lint 等）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ===== 安装 =====</span></span>
<span class="line">./gradlew installDebug            <span class="token comment"># 安装 Debug APK</span></span>
<span class="line">./gradlew installRelease          <span class="token comment"># 安装 Release APK</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ===== 依赖 =====</span></span>
<span class="line">./gradlew :app:dependencies       <span class="token comment"># 查看 app 模块依赖树</span></span>
<span class="line">./gradlew buildEnvironment        <span class="token comment"># 查看构建环境</span></span>
<span class="line">./gradlew dependencyUpdates       <span class="token comment"># 检查依赖更新（需插件）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ===== 性能 =====</span></span>
<span class="line">./gradlew build <span class="token parameter variable">--scan</span>            <span class="token comment"># 生成构建扫描报告</span></span>
<span class="line">./gradlew build <span class="token parameter variable">--parallel</span>        <span class="token comment"># 并行构建</span></span>
<span class="line">./gradlew build --build-cache     <span class="token comment"># 启用构建缓存</span></span>
<span class="line">./gradlew build <span class="token parameter variable">--daemon</span>          <span class="token comment"># 使用守护进程（默认启用）</span></span>
<span class="line">./gradlew build --no-daemon       <span class="token comment"># 不使用守护进程</span></span>
<span class="line">./gradlew build <span class="token parameter variable">--offline</span>         <span class="token comment"># 离线模式（不下载依赖）</span></span>
<span class="line">./gradlew build --refresh-dependencies  <span class="token comment"># 刷新依赖缓存</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、gradle-守护进程" tabindex="-1"><a class="header-anchor" href="#三、gradle-守护进程"><span>三、Gradle 守护进程</span></a></h2><p>Gradle 守护进程（Daemon）是一个后台进程，在首次构建时启动，后续构建复用，可显著提升构建速度。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看守护进程状态</span></span>
<span class="line">./gradlew <span class="token parameter variable">--status</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 停止所有守护进程</span></span>
<span class="line">./gradlew <span class="token parameter variable">--stop</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置守护进程 JVM 参数</span></span>
<span class="line"><span class="token comment"># gradle.properties</span></span>
<span class="line"><span class="token assign-left variable">org.gradle.jvmargs</span><span class="token operator">=</span>-Xmx2048m <span class="token parameter variable">-XX:MaxMetaspaceSize</span><span class="token operator">=</span>512m</span>
<span class="line"></span></code></pre></div><h2 id="四、task-管理" tabindex="-1"><a class="header-anchor" href="#四、task-管理"><span>四、Task 管理</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看所有可用 Task</span></span>
<span class="line">./gradlew tasks</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看 Task 详情</span></span>
<span class="line">./gradlew <span class="token builtin class-name">help</span> <span class="token parameter variable">--task</span> build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行指定 Task</span></span>
<span class="line">./gradlew :app:compileDebugKotlin</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 跳过测试</span></span>
<span class="line">./gradlew build <span class="token parameter variable">-x</span> <span class="token builtin class-name">test</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 断点续传（从上次失败处继续）</span></span>
<span class="line">./gradlew build <span class="token parameter variable">--continue</span></span>
<span class="line"></span></code></pre></div><h2 id="五、构建缓存" tabindex="-1"><a class="header-anchor" href="#五、构建缓存"><span>五、构建缓存</span></a></h2><div class="language-properties" data-highlighter="prismjs" data-ext="properties"><pre><code class="language-properties"><span class="line"><span class="token comment"># gradle.properties —— 启用构建缓存</span></span>
<span class="line"><span class="token key attr-name">org.gradle.caching</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 本地构建缓存（默认在 ~/.gradle/caches/）</span></span>
<span class="line">./gradlew build --build-cache</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 远程构建缓存（需配置）</span></span>
<span class="line"><span class="token comment"># gradle.properties</span></span>
<span class="line"><span class="token assign-left variable">org.gradle.caching</span><span class="token operator">=</span>true</span>
<span class="line"><span class="token assign-left variable">org.gradle.caching.http.url</span><span class="token operator">=</span>https://cache.example.com/</span>
<span class="line"></span></code></pre></div><h2 id="六、配置缓存-gradle-7-0" tabindex="-1"><a class="header-anchor" href="#六、配置缓存-gradle-7-0"><span>六、配置缓存（Gradle 7.0+）</span></a></h2><div class="language-properties" data-highlighter="prismjs" data-ext="properties"><pre><code class="language-properties"><span class="line"><span class="token comment"># gradle.properties —— 启用配置缓存</span></span>
<span class="line"><span class="token key attr-name">org.gradle.configuration-cache</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"></span></code></pre></div><p>配置缓存可以缓存构建脚本的配置阶段结果，大幅优化后续构建速度：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 首次构建会生成配置缓存</span></span>
<span class="line">./gradlew build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 后续构建会使用缓存</span></span>
<span class="line"><span class="token comment"># 配置缓存命中时，配置阶段几乎瞬时完成</span></span>
<span class="line"></span></code></pre></div><h2 id="七、自定义构建参数" tabindex="-1"><a class="header-anchor" href="#七、自定义构建参数"><span>七、自定义构建参数</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 传递项目属性</span></span>
<span class="line">./gradlew build <span class="token parameter variable">-PmyProperty</span><span class="token operator">=</span>myValue</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用系统属性</span></span>
<span class="line">./gradlew build <span class="token parameter variable">-Dorg.gradle.project.version</span><span class="token operator">=</span><span class="token number">2.0</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定构建文件</span></span>
<span class="line">./gradlew <span class="token parameter variable">-b</span> other.gradle.kts build</span>
<span class="line"></span></code></pre></div><h2 id="八、开发常用工作流" tabindex="-1"><a class="header-anchor" href="#八、开发常用工作流"><span>八、开发常用工作流</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 日常开发</span></span>
<span class="line">./gradlew assembleDebug          <span class="token comment"># 编译 Debug</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 提交前检查</span></span>
<span class="line">./gradlew clean <span class="token builtin class-name">test</span> lint        <span class="token comment"># 清理 + 测试 + 检查</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 发布前构建</span></span>
<span class="line">./gradlew clean assembleRelease  <span class="token comment"># 清理并构建 Release</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 依赖冲突排查</span></span>
<span class="line">./gradlew :app:dependencies <span class="token parameter variable">--configuration</span> debugRuntimeClasspath</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 构建性能分析</span></span>
<span class="line">./gradlew build <span class="token parameter variable">--scan</span>           <span class="token comment"># 打开浏览器查看报告</span></span>
<span class="line"></span></code></pre></div>`,27)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};