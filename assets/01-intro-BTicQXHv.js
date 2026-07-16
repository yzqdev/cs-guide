import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/kotlin-tutor/gradle/01-intro.html","title":"Gradle 简介与基础","lang":"zh-CN","frontmatter":{"description":"Gradle 简介与基础 一、什么是 Gradle Gradle 是一个开源的自动化构建工具，基于 Groovy 或 Kotlin DSL 编写构建脚本。它是 Android 的官方构建系统，也广泛用于 Java/Kotlin 多平台项目。 核心特点 声明式构建：通过 DSL 描述项目结构和依赖 增量构建：只重新编译有变更的部分，大幅提升构建速度 依赖...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Gradle 简介与基础\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T05:51:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/kotlin-tutor/gradle/01-intro.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Gradle 简介与基础"}],["meta",{"property":"og:description","content":"Gradle 简介与基础 一、什么是 Gradle Gradle 是一个开源的自动化构建工具，基于 Groovy 或 Kotlin DSL 编写构建脚本。它是 Android 的官方构建系统，也广泛用于 Java/Kotlin 多平台项目。 核心特点 声明式构建：通过 DSL 描述项目结构和依赖 增量构建：只重新编译有变更的部分，大幅提升构建速度 依赖..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T05:51:09.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T05:51:09.000Z"}]]},"git":{"createdTime":1783921869000,"updatedTime":1783921869000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.34,"words":1003},"filePathRelative":"kotlin-tutor/gradle/01-intro.md","autoDesc":true}`),a={name:`01-intro.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="gradle-简介与基础" tabindex="-1"><a class="header-anchor" href="#gradle-简介与基础"><span>Gradle 简介与基础</span></a></h1><h2 id="一、什么是-gradle" tabindex="-1"><a class="header-anchor" href="#一、什么是-gradle"><span>一、什么是 Gradle</span></a></h2><p>Gradle 是一个开源的自动化构建工具，基于 Groovy 或 Kotlin DSL 编写构建脚本。它是 Android 的官方构建系统，也广泛用于 Java/Kotlin 多平台项目。</p><h3 id="核心特点" tabindex="-1"><a class="header-anchor" href="#核心特点"><span>核心特点</span></a></h3><ul><li><strong>声明式构建</strong>：通过 DSL 描述项目结构和依赖</li><li><strong>增量构建</strong>：只重新编译有变更的部分，大幅提升构建速度</li><li><strong>依赖管理</strong>：自动解析和管理项目依赖</li><li><strong>多项目支持</strong>：轻松管理大型多模块项目</li><li><strong>灵活的构建生命周期</strong>：可自定义 Task 和 Plugin</li></ul><h2 id="二、安装-gradle" tabindex="-1"><a class="header-anchor" href="#二、安装-gradle"><span>二、安装 Gradle</span></a></h2><h3 id="方式一-通过-sdkman-推荐" tabindex="-1"><a class="header-anchor" href="#方式一-通过-sdkman-推荐"><span>方式一：通过 SDKMAN（推荐）</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装 SDKMAN</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token string">&quot;https://get.sdkman.io&quot;</span> <span class="token operator">|</span> <span class="token function">bash</span></span>
<span class="line"><span class="token comment"># 安装 Gradle</span></span>
<span class="line">sdk <span class="token function">install</span> gradle <span class="token number">8.7</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 验证</span></span>
<span class="line">gradle <span class="token parameter variable">--version</span></span>
<span class="line"></span></code></pre></div><h3 id="方式二-通过-homebrew-macos" tabindex="-1"><a class="header-anchor" href="#方式二-通过-homebrew-macos"><span>方式二：通过 Homebrew（macOS）</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">brew <span class="token function">install</span> gradle</span>
<span class="line"></span></code></pre></div><h3 id="方式三-使用-gradle-wrapper-无需安装" tabindex="-1"><a class="header-anchor" href="#方式三-使用-gradle-wrapper-无需安装"><span>方式三：使用 Gradle Wrapper（无需安装）</span></a></h3><p>每个 Gradle 项目都包含 <code>gradlew</code>/<code>gradlew.bat</code> 脚本，会自动下载并使用指定版本：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 生成 Wrapper</span></span>
<span class="line">gradle wrapper --gradle-version <span class="token number">8.7</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用 Wrapper 构建（推荐）</span></span>
<span class="line">./gradlew build</span>
<span class="line"></span></code></pre></div><h2 id="三、gradle-wrapper" tabindex="-1"><a class="header-anchor" href="#三、gradle-wrapper"><span>三、Gradle Wrapper</span></a></h2><p>Wrapper 是 Gradle 推荐的项目构建方式，它确保所有开发者使用相同的 Gradle 版本。</p><h3 id="wrapper-文件结构" tabindex="-1"><a class="header-anchor" href="#wrapper-文件结构"><span>Wrapper 文件结构</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">my-project/</span>
<span class="line">├── gradlew              # Unix 可执行脚本</span>
<span class="line">├── gradlew.bat          # Windows 可执行脚本</span>
<span class="line">├── gradle/</span>
<span class="line">│   └── wrapper/</span>
<span class="line">│       ├── gradle-wrapper.jar      # Wrapper JAR</span>
<span class="line">│       └── gradle-wrapper.properties  # 版本配置</span>
<span class="line">└── build.gradle.kts     # 构建脚本</span>
<span class="line"></span></code></pre></div><h3 id="配置-wrapper-版本" tabindex="-1"><a class="header-anchor" href="#配置-wrapper-版本"><span>配置 Wrapper 版本</span></a></h3><div class="language-properties" data-highlighter="prismjs" data-ext="properties"><pre><code class="language-properties"><span class="line"><span class="token comment"># gradle/wrapper/gradle-wrapper.properties</span></span>
<span class="line"><span class="token key attr-name">distributionBase</span><span class="token punctuation">=</span><span class="token value attr-value">GRADLE_USER_HOME</span></span>
<span class="line"><span class="token key attr-name">distributionPath</span><span class="token punctuation">=</span><span class="token value attr-value">wrapper/dists</span></span>
<span class="line"><span class="token key attr-name">distributionUrl</span><span class="token punctuation">=</span><span class="token value attr-value">https\\://services.gradle.org/distributions/gradle-8.7-all.zip</span></span>
<span class="line"><span class="token key attr-name">networkTimeout</span><span class="token punctuation">=</span><span class="token value attr-value">10000</span></span>
<span class="line"><span class="token key attr-name">validateDistributionUrl</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"><span class="token key attr-name">zipStoreBase</span><span class="token punctuation">=</span><span class="token value attr-value">GRADLE_USER_HOME</span></span>
<span class="line"><span class="token key attr-name">zipStorePath</span><span class="token punctuation">=</span><span class="token value attr-value">wrapper/dists</span></span>
<span class="line"></span></code></pre></div><h3 id="wrapper-常用命令" tabindex="-1"><a class="header-anchor" href="#wrapper-常用命令"><span>Wrapper 常用命令</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 更新 Wrapper 版本</span></span>
<span class="line">./gradlew wrapper --gradle-version <span class="token number">8.7</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用本地已下载的 Gradle（跳过下载）</span></span>
<span class="line">./gradlew wrapper --gradle-version <span class="token number">8.7</span> --distribution-type all</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 构建项目</span></span>
<span class="line">./gradlew build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清理构建产物</span></span>
<span class="line">./gradlew clean</span>
<span class="line"></span></code></pre></div><h2 id="四、项目结构" tabindex="-1"><a class="header-anchor" href="#四、项目结构"><span>四、项目结构</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">project/</span>
<span class="line">├── app/                          # 应用模块</span>
<span class="line">│   ├── build.gradle.kts          # 模块构建脚本</span>
<span class="line">│   └── src/                      # 源代码</span>
<span class="line">├── library/                      # 库模块</span>
<span class="line">│   ├── build.gradle.kts</span>
<span class="line">│   └── src/</span>
<span class="line">├── build.gradle.kts              # 根构建脚本</span>
<span class="line">├── settings.gradle.kts           # 项目设置</span>
<span class="line">├── gradle.properties             # 全局属性</span>
<span class="line">├── gradle/</span>
<span class="line">│   └── wrapper/</span>
<span class="line">│       └── gradle-wrapper.properties</span>
<span class="line">├── gradlew                       # Unix Wrapper</span>
<span class="line">├── gradlew.bat                   # Windows Wrapper</span>
<span class="line">└── local.properties              # 本地属性（不提交到 Git）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、settings-gradle-kts" tabindex="-1"><a class="header-anchor" href="#五、settings-gradle-kts"><span>五、settings.gradle.kts</span></a></h2><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt"><pre><code class="language-kotlin"><span class="line"><span class="token comment">// settings.gradle.kts —— 项目设置</span></span>
<span class="line">rootProject<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;MyApp&quot;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 包含模块</span></span>
<span class="line"><span class="token function">include</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;:app&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">include</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;:library&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">include</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;:core&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 模块路径重映射</span></span>
<span class="line"><span class="token function">project</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;:core&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>projectDir <span class="token operator">=</span> <span class="token function">file</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;../core-library&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 依赖版本管理</span></span>
<span class="line">dependencyResolutionManagement <span class="token punctuation">{</span></span>
<span class="line">    repositoriesMode<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>RepositoriesMode<span class="token punctuation">.</span>FAIL_ON_PROJECT_REPOS<span class="token punctuation">)</span></span>
<span class="line">    repositories <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">google</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、build-gradle-kts" tabindex="-1"><a class="header-anchor" href="#六、build-gradle-kts"><span>六、build.gradle.kts</span></a></h2><h3 id="根构建脚本" tabindex="-1"><a class="header-anchor" href="#根构建脚本"><span>根构建脚本</span></a></h3><div class="language-kotlin" data-highlighter="prismjs" data-ext="kt"><pre><code class="language-kotlin"><span class="line"><span class="token comment">// build.gradle.kts —— 根构建脚本</span></span>
<span class="line">plugins <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">id</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;com.android.application&quot;</span></span><span class="token punctuation">)</span> version <span class="token string-literal singleline"><span class="token string">&quot;8.2.2&quot;</span></span> apply <span class="token boolean">false</span></span>
<span class="line">    <span class="token function">id</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;com.android.library&quot;</span></span><span class="token punctuation">)</span> version <span class="token string-literal singleline"><span class="token string">&quot;8.2.2&quot;</span></span> apply <span class="token boolean">false</span></span>
<span class="line">    <span class="token function">id</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;org.jetbrains.kotlin.android&quot;</span></span><span class="token punctuation">)</span> version <span class="token string-literal singleline"><span class="token string">&quot;1.9.22&quot;</span></span> apply <span class="token boolean">false</span></span>
<span class="line">    <span class="token function">id</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;org.jetbrains.kotlin.jvm&quot;</span></span><span class="token punctuation">)</span> version <span class="token string-literal singleline"><span class="token string">&quot;1.9.22&quot;</span></span> apply <span class="token boolean">false</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="模块构建脚本" tabindex="-1"><a class="header-anchor" href="#模块构建脚本"><span>模块构建脚本</span></a></h3><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt"><pre><code class="language-kotlin"><span class="line"><span class="token comment">// app/build.gradle.kts —— 模块构建脚本</span></span>
<span class="line">plugins <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">id</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;com.android.application&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">id</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;org.jetbrains.kotlin.android&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">android <span class="token punctuation">{</span></span>
<span class="line">    namespace <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;com.example.myapp&quot;</span></span></span>
<span class="line">    compileSdk <span class="token operator">=</span> <span class="token number">34</span></span>
<span class="line"></span>
<span class="line">    defaultConfig <span class="token punctuation">{</span></span>
<span class="line">        applicationId <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;com.example.myapp&quot;</span></span></span>
<span class="line">        minSdk <span class="token operator">=</span> <span class="token number">26</span></span>
<span class="line">        targetSdk <span class="token operator">=</span> <span class="token number">34</span></span>
<span class="line">        versionCode <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">        versionName <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;1.0&quot;</span></span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    buildTypes <span class="token punctuation">{</span></span>
<span class="line">        release <span class="token punctuation">{</span></span>
<span class="line">            isMinifyEnabled <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">            <span class="token function">proguardFiles</span><span class="token punctuation">(</span><span class="token function">getDefaultProguardFile</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;proguard-android-optimize.txt&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;proguard-rules.pro&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    compileOptions <span class="token punctuation">{</span></span>
<span class="line">        sourceCompatibility <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_17</span>
<span class="line">        targetCompatibility <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_17</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    kotlinOptions <span class="token punctuation">{</span></span>
<span class="line">        jvmTarget <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;17&quot;</span></span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">dependencies <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;androidx.core:core-ktx:1.12.0&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;androidx.appcompat:appcompat:1.6.1&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;com.google.android.material:material:1.11.0&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">testImplementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;junit:junit:4.13.2&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="七、gradle-构建生命周期" tabindex="-1"><a class="header-anchor" href="#七、gradle-构建生命周期"><span>七、Gradle 构建生命周期</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">初始化阶段 → 配置阶段 → 执行阶段</span>
<span class="line"></span></code></pre></div><table><thead><tr><th>阶段</th><th>说明</th></tr></thead><tbody><tr><td><strong>初始化</strong></td><td>解析 <code>settings.gradle.kts</code>，确定哪些模块参与构建</td></tr><tr><td><strong>配置</strong></td><td>执行所有模块的 <code>build.gradle.kts</code>，创建 Task 对象图</td></tr><tr><td><strong>执行</strong></td><td>按依赖顺序执行指定的 Task</td></tr></tbody></table><h3 id="hook-点" tabindex="-1"><a class="header-anchor" href="#hook-点"><span>Hook 点</span></a></h3><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt"><pre><code class="language-kotlin"><span class="line"><span class="token comment">// 在配置阶段前执行</span></span>
<span class="line">gradle<span class="token punctuation">.</span><span class="token function">beforeSettings</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;初始化：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span></span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 每个项目配置前</span></span>
<span class="line">gradle<span class="token punctuation">.</span><span class="token function">beforeProject</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;开始配置：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 每个项目配置后</span></span>
<span class="line">gradle<span class="token punctuation">.</span><span class="token function">afterProject</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;配置完成：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 构建完成</span></span>
<span class="line">gradle<span class="token punctuation">.</span><span class="token function">buildFinished</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;构建完成&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="八、project-与-task" tabindex="-1"><a class="header-anchor" href="#八、project-与-task"><span>八、Project 与 Task</span></a></h2><h3 id="task-基本概念" tabindex="-1"><a class="header-anchor" href="#task-基本概念"><span>Task 基本概念</span></a></h3><p>Task 是 Gradle 的最小执行单元，每个 Task 执行一个具体的操作（如编译、打包、测试）。</p><div class="language-kotlin" data-highlighter="prismjs" data-ext="kt"><pre><code class="language-kotlin"><span class="line"><span class="token comment">// 注册一个简单的 Task</span></span>
<span class="line">tasks<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;hello&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    doLast <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Hello, Gradle!&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 执行</span></span>
<span class="line"><span class="token comment">// ./gradlew hello</span></span>
<span class="line"></span></code></pre></div><h3 id="内置-task" tabindex="-1"><a class="header-anchor" href="#内置-task"><span>内置 Task</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看所有 Task</span></span>
<span class="line">./gradlew tasks</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 编译</span></span>
<span class="line">./gradlew build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清理</span></span>
<span class="line">./gradlew clean</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行测试</span></span>
<span class="line">./gradlew <span class="token builtin class-name">test</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查依赖</span></span>
<span class="line">./gradlew :app:dependencies</span>
<span class="line"></span></code></pre></div><h2 id="九、gradle-properties" tabindex="-1"><a class="header-anchor" href="#九、gradle-properties"><span>九、gradle.properties</span></a></h2><div class="language-properties line-numbers-mode" data-highlighter="prismjs" data-ext="properties"><pre><code class="language-properties"><span class="line"><span class="token comment"># 项目全局属性</span></span>
<span class="line"><span class="token comment"># JVM 参数</span></span>
<span class="line"><span class="token key attr-name">org.gradle.jvmargs</span><span class="token punctuation">=</span><span class="token value attr-value">-Xmx2048m -Dfile.encoding=UTF-8</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 并行构建</span></span>
<span class="line"><span class="token key attr-name">org.gradle.parallel</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 构建缓存</span></span>
<span class="line"><span class="token key attr-name">org.gradle.caching</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置缓存（Gradle 7.0+）</span></span>
<span class="line"><span class="token key attr-name">org.gradle.configuration-cache</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 自定义版本号</span></span>
<span class="line"><span class="token key attr-name">appVersionName</span><span class="token punctuation">=</span><span class="token value attr-value">1.0.0</span></span>
<span class="line"><span class="token key attr-name">appVersionCode</span><span class="token punctuation">=</span><span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">compileSdk</span><span class="token punctuation">=</span><span class="token value attr-value">34</span></span>
<span class="line"><span class="token key attr-name">minSdk</span><span class="token punctuation">=</span><span class="token value attr-value">26</span></span>
<span class="line"><span class="token key attr-name">targetSdk</span><span class="token punctuation">=</span><span class="token value attr-value">34</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十、常见命令速查" tabindex="-1"><a class="header-anchor" href="#十、常见命令速查"><span>十、常见命令速查</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 构建</span></span>
<span class="line">./gradlew build                   <span class="token comment"># 完整构建</span></span>
<span class="line">./gradlew assemble                <span class="token comment"># 仅编译打包</span></span>
<span class="line">./gradlew assembleDebug           <span class="token comment"># Debug 构建</span></span>
<span class="line">./gradlew assembleRelease         <span class="token comment"># Release 构建</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清理</span></span>
<span class="line">./gradlew clean                   <span class="token comment"># 清理构建产物</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 测试</span></span>
<span class="line">./gradlew <span class="token builtin class-name">test</span>                    <span class="token comment"># 运行单元测试</span></span>
<span class="line">./gradlew lint                    <span class="token comment"># 代码检查</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 依赖</span></span>
<span class="line">./gradlew :app:dependencies       <span class="token comment"># 查看依赖树</span></span>
<span class="line">./gradlew :app:buildEnvironment   <span class="token comment"># 查看构建环境</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 性能</span></span>
<span class="line">./gradlew build <span class="token parameter variable">--scan</span>             <span class="token comment"># 生成构建扫描报告</span></span>
<span class="line">./gradlew build <span class="token parameter variable">--parallel</span>         <span class="token comment"># 并行构建</span></span>
<span class="line">./gradlew build --build-cache      <span class="token comment"># 启用构建缓存</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,45)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};