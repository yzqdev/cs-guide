import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/java-tutor/springboot/basic/02-project-structure.html","title":"项目结构与配置详解","lang":"zh-CN","frontmatter":{"title":"项目结构与配置详解","order":2,"description":"项目结构与配置详解 深入理解 Spring Boot 的项目结构、启动原理和配置体系。 Maven 项目结构 pom.xml 详解 关键点 spring-boot-starter-parent 提供了依赖版本管理，无需指定版本号 spring-boot-maven-plugin 负责打包为可执行 JAR Gradle 项目结构 主启动类 @Spring...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"项目结构与配置详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T03:22:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/basic/02-project-structure.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"项目结构与配置详解"}],["meta",{"property":"og:description","content":"项目结构与配置详解 深入理解 Spring Boot 的项目结构、启动原理和配置体系。 Maven 项目结构 pom.xml 详解 关键点 spring-boot-starter-parent 提供了依赖版本管理，无需指定版本号 spring-boot-maven-plugin 负责打包为可执行 JAR Gradle 项目结构 主启动类 @Spring..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T03:22:12.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T03:22:12.000Z"}]]},"git":{"createdTime":1784172132000,"updatedTime":1784172132000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.58,"words":773},"filePathRelative":"java-tutor/springboot/basic/02-project-structure.md","autoDesc":true}`),a={name:`02-project-structure.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="项目结构与配置详解" tabindex="-1"><a class="header-anchor" href="#项目结构与配置详解"><span>项目结构与配置详解</span></a></h1><blockquote><p>深入理解 Spring Boot 的项目结构、启动原理和配置体系。</p></blockquote><h2 id="maven-项目结构" tabindex="-1"><a class="header-anchor" href="#maven-项目结构"><span>Maven 项目结构</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">my-app/</span>
<span class="line">├── pom.xml                                  # Maven 项目描述文件</span>
<span class="line">├── src/</span>
<span class="line">│   ├── main/</span>
<span class="line">│   │   ├── java/com/example/myapp/</span>
<span class="line">│   │   │   ├── MyApplication.java           # 主启动类</span>
<span class="line">│   │   │   ├── config/                      # 配置类</span>
<span class="line">│   │   │   ├── controller/                  # 控制器</span>
<span class="line">│   │   │   ├── service/                     # 服务层</span>
<span class="line">│   │   │   ├── repository/                  # 数据访问层</span>
<span class="line">│   │   │   ├── entity/                      # 实体类</span>
<span class="line">│   │   │   ├── dto/                         # 数据传输对象</span>
<span class="line">│   │   │   ├── common/                      # 通用类</span>
<span class="line">│   │   │   │   ├── Result.java              # 统一响应</span>
<span class="line">│   │   │   │   └── GlobalExceptionHandler.java</span>
<span class="line">│   │   │   └── util/                        # 工具类</span>
<span class="line">│   │   └── resources/</span>
<span class="line">│   │       ├── application.yml              # 主配置文件</span>
<span class="line">│   │       ├── application-dev.yml          # 开发环境配置</span>
<span class="line">│   │       ├── application-prod.yml         # 生产环境配置</span>
<span class="line">│   │       ├── static/                      # 静态资源（CSS/JS/图片）</span>
<span class="line">│   │       ├── templates/                   # 模板文件（Thymeleaf 等）</span>
<span class="line">│   │       ├── messages.properties          # 国际化文件</span>
<span class="line">│   │       └── db/</span>
<span class="line">│   │           └── migration/               # Flyway 迁移脚本</span>
<span class="line">│   └── test/</span>
<span class="line">│       └── java/com/example/myapp/</span>
<span class="line">│           ├── MyApplicationTests.java</span>
<span class="line">│           ├── controller/</span>
<span class="line">│           └── service/</span>
<span class="line">└── Dockerfile                               # Docker 部署文件</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pom-xml-详解" tabindex="-1"><a class="header-anchor" href="#pom-xml-详解"><span>pom.xml 详解</span></a></h2><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml"><pre><code class="language-xml"><span class="line"><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://maven.apache.org/POM/4.0.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modelVersion</span><span class="token punctuation">&gt;</span></span>4.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modelVersion</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 继承 Spring Boot 父工程 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.3.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>relativePath</span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">&lt;!-- 项目坐标 --&gt;</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.example<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>my-app<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>0.0.1-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>my-app<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>description</span><span class="token punctuation">&gt;</span></span>My Spring Boot Application<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>description</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>java.version</span><span class="token punctuation">&gt;</span></span>17<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>java.version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关键点" tabindex="-1"><a class="header-anchor" href="#关键点"><span>关键点</span></a></h3><ul><li><code>spring-boot-starter-parent</code> 提供了依赖版本管理，无需指定版本号</li><li><code>spring-boot-maven-plugin</code> 负责打包为可执行 JAR</li></ul><h2 id="gradle-项目结构" tabindex="-1"><a class="header-anchor" href="#gradle-项目结构"><span>Gradle 项目结构</span></a></h2><div class="language-groovy line-numbers-mode" data-highlighter="prismjs" data-ext="groovy"><pre><code class="language-groovy"><span class="line"><span class="token comment">// build.gradle</span></span>
<span class="line">plugins <span class="token punctuation">{</span></span>
<span class="line">    id <span class="token string">&#39;java&#39;</span></span>
<span class="line">    id <span class="token string">&#39;org.springframework.boot&#39;</span> version <span class="token string">&#39;3.3.0&#39;</span></span>
<span class="line">    id <span class="token string">&#39;io.spring.dependency-management&#39;</span> version <span class="token string">&#39;1.1.5&#39;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">group <span class="token operator">=</span> <span class="token string">&#39;com.example&#39;</span></span>
<span class="line">version <span class="token operator">=</span> <span class="token string">&#39;0.0.1-SNAPSHOT&#39;</span></span>
<span class="line"></span>
<span class="line">java <span class="token punctuation">{</span></span>
<span class="line">    sourceCompatibility <span class="token operator">=</span> <span class="token string">&#39;17&#39;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">repositories <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">dependencies <span class="token punctuation">{</span></span>
<span class="line">    implementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-web&#39;</span></span>
<span class="line">    testImplementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-test&#39;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">tasks<span class="token punctuation">.</span><span class="token function">named</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">useJUnitPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="主启动类" tabindex="-1"><a class="header-anchor" href="#主启动类"><span>主启动类</span></a></h2><div class="language-java" data-highlighter="prismjs" data-ext="java"><pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>myapp</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span></span><span class="token class-name">SpringApplication</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span></span><span class="token class-name">SpringBootApplication</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token annotation punctuation">@SpringBootApplication</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyApplication</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">MyApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="springbootapplication-组合注解" tabindex="-1"><a class="header-anchor" href="#springbootapplication-组合注解"><span>@SpringBootApplication 组合注解</span></a></h3><table><thead><tr><th>注解</th><th>作用</th></tr></thead><tbody><tr><td><code>@SpringBootConfiguration</code></td><td>标记为配置类，等同于 <code>@Configuration</code></td></tr><tr><td><code>@EnableAutoConfiguration</code></td><td>启用自动配置机制</td></tr><tr><td><code>@ComponentScan</code></td><td>扫描当前包及其子包下的组件</td></tr></tbody></table><h3 id="spring-boot-启动流程" tabindex="-1"><a class="header-anchor" href="#spring-boot-启动流程"><span>Spring Boot 启动流程</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">main() 方法</span>
<span class="line">    ↓</span>
<span class="line">SpringApplication.run()</span>
<span class="line">    ↓</span>
<span class="line">判断应用类型（Reactive / Servlet）</span>
<span class="line">    ↓</span>
<span class="line">加载 ApplicationContextInitializer</span>
<span class="line">    ↓</span>
<span class="line">加载 ApplicationListener</span>
<span class="line">    ↓</span>
<span class="line">准备 Environment（加载配置文件）</span>
<span class="line">    ↓</span>
<span class="line">创建 ApplicationContext</span>
<span class="line">    ↓</span>
<span class="line">执行自动配置（Auto-Configuration）</span>
<span class="line">    ↓</span>
<span class="line">启动内嵌 Web 服务器</span>
<span class="line">    ↓</span>
<span class="line">执行 CommandLineRunner / ApplicationRunner</span>
<span class="line">    ↓</span>
<span class="line">应用启动完成</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置文件体系" tabindex="-1"><a class="header-anchor" href="#配置文件体系"><span>配置文件体系</span></a></h2><h3 id="配置文件优先级-从高到低" tabindex="-1"><a class="header-anchor" href="#配置文件优先级-从高到低"><span>配置文件优先级（从高到低）</span></a></h3><ol><li>命令行参数：<code>--server.port=9090</code></li><li>JNDI 属性</li><li>系统环境变量</li><li><code>application-{profile}.properties/yml</code></li><li><code>application.properties/yml</code></li><li><code>@PropertySource</code> 加载的配置</li></ol><h3 id="yaml-基础语法" tabindex="-1"><a class="header-anchor" href="#yaml-基础语法"><span>YAML 基础语法</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token comment"># 基本键值对</span></span>
<span class="line"><span class="token key atrule">server</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 对象</span></span>
<span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">datasource</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/db</span>
<span class="line">    <span class="token key atrule">username</span><span class="token punctuation">:</span> root</span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 数组</span></span>
<span class="line"><span class="token key atrule">my</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">servers</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> dev.example.com</span>
<span class="line">    <span class="token punctuation">-</span> prod.example.com</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 多文档 YAML（用 --- 分隔）</span></span>
<span class="line"><span class="token key atrule">server</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span></span>
<span class="line"><span class="token punctuation">---</span></span>
<span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">config</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">activate</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">on-profile</span><span class="token punctuation">:</span> prod</span>
<span class="line"><span class="token key atrule">server</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多环境配置" tabindex="-1"><a class="header-anchor" href="#多环境配置"><span>多环境配置</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token comment"># application.yml（主配置）</span></span>
<span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">profiles</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">active</span><span class="token punctuation">:</span> dev</span>
<span class="line"><span class="token punctuation">---</span></span>
<span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">config</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">activate</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">on-profile</span><span class="token punctuation">:</span> dev</span>
<span class="line"><span class="token key atrule">server</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span></span>
<span class="line"><span class="token punctuation">---</span></span>
<span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">config</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">activate</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">on-profile</span><span class="token punctuation">:</span> prod</span>
<span class="line"><span class="token key atrule">server</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或使用多个文件：</p><ul><li><code>application-dev.yml</code></li><li><code>application-prod.yml</code></li><li><code>application-test.yml</code></li></ul><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 激活指定环境</span></span>
<span class="line"><span class="token function">java</span> <span class="token parameter variable">-jar</span> my-app.jar <span class="token parameter variable">--spring.profiles.active</span><span class="token operator">=</span>prod</span>
<span class="line"></span></code></pre></div><h2 id="常用配置项" tabindex="-1"><a class="header-anchor" href="#常用配置项"><span>常用配置项</span></a></h2><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token key atrule">server</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>                    <span class="token comment"># 服务端口</span></span>
<span class="line">  <span class="token key atrule">servlet</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">context-path</span><span class="token punctuation">:</span> /api          <span class="token comment"># 上下文路径</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">application</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>app                <span class="token comment"># 应用名称</span></span>
<span class="line">  <span class="token key atrule">profiles</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">active</span><span class="token punctuation">:</span> dev                 <span class="token comment"># 激活的 profile</span></span>
<span class="line">  <span class="token key atrule">jackson</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">date-format</span><span class="token punctuation">:</span> yyyy<span class="token punctuation">-</span>MM<span class="token punctuation">-</span>dd HH<span class="token punctuation">:</span>mm<span class="token punctuation">:</span>ss</span>
<span class="line">    <span class="token key atrule">time-zone</span><span class="token punctuation">:</span> Asia/Shanghai</span>
<span class="line">  <span class="token key atrule">main</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">banner-mode</span><span class="token punctuation">:</span> off            <span class="token comment"># 关闭启动 Banner</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">logging</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">level</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">root</span><span class="token punctuation">:</span> info</span>
<span class="line">    <span class="token key atrule">com.example</span><span class="token punctuation">:</span> debug</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习"><span>练习</span></a></h2><ol><li>创建一个项目，分别配置 <code>dev</code> 和 <code>prod</code> 两个环境</li><li>在 <code>dev</code> 环境下使用 H2 内存数据库，<code>prod</code> 下使用 MySQL</li><li>通过命令行参数启动时覆盖端口号</li></ol>`,30)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};