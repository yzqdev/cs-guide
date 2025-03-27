import{_ as s,c as a,a as e,o as t}from"./app-C8DxhDIZ.js";const p={};function o(l,n){return t(),a("div",null,n[0]||(n[0]=[e(`<h1 id="常用类" tabindex="-1"><a class="header-anchor" href="#常用类"><span>常用类</span></a></h1><p>fetch请求没用application/json会出现302错误</p><h2 id="常用的几个类" tabindex="-1"><a class="header-anchor" href="#常用的几个类"><span>常用的几个类</span></a></h2><h3 id="applicationcontextaware-用于获取applicationcontext" tabindex="-1"><a class="header-anchor" href="#applicationcontextaware-用于获取applicationcontext"><span>ApplicationContextAware 用于获取applicationcontext</span></a></h3><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token annotation punctuation">@Component</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringContextHolder</span> <span class="token keyword">implements</span> <span class="token class-name">ApplicationContextAware</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">static</span> <span class="token class-name">ApplicationContext</span> applicationContext<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token annotation punctuation">@Override</span></span>
<span class="line">  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">ApplicationContext</span> applicationContext<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">SpringContextHolder</span><span class="token punctuation">.</span>applicationContext <span class="token operator">=</span> applicationContext<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Object</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> applicationContext<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="applicationlistener用于监听事件" tabindex="-1"><a class="header-anchor" href="#applicationlistener用于监听事件"><span>ApplicationListener用于监听事件</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token annotation punctuation">@Configuration</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppListener</span> <span class="token keyword">implements</span> <span class="token class-name">ApplicationListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">WebServerInitializedEvent</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onApplicationEvent</span><span class="token punctuation">(</span><span class="token class-name">WebServerInitializedEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">int</span> port <span class="token operator">=</span> event<span class="token punctuation">.</span><span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getWebServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">InetAddress</span> address <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">            address <span class="token operator">=</span> <span class="token class-name">InetAddress</span><span class="token punctuation">.</span><span class="token function">getLocalHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;http://&quot;</span> <span class="token operator">+</span> address<span class="token punctuation">.</span><span class="token function">getHostAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">+</span> port <span class="token operator">+</span> <span class="token string">&quot;/swagger-ui/index.html&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;http://&quot;</span> <span class="token operator">+</span> address<span class="token punctuation">.</span><span class="token function">getHostAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">+</span> port<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">UnknownHostException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="commandlinerunner-获取命令行参数" tabindex="-1"><a class="header-anchor" href="#commandlinerunner-获取命令行参数"><span>CommandLineRunner 获取命令行参数</span></a></h3><p>ApplicationRunner ApplicationRunner与CommandLineRunner的主要区别体现在run方法的参数上，CommandLineRunner中的run方法的参数是参数数组；ApplicationRunner中的run方法的参数是Application 的arguments对象</p><h3 id="servletcontextlistener-监听tomcat启动、关闭" tabindex="-1"><a class="header-anchor" href="#servletcontextlistener-监听tomcat启动、关闭"><span>ServletContextListener 监听Tomcat启动、关闭</span></a></h3><p>当Servlet 容器启动或终止Web 应用时，会触发ServletContextEvent 事件，该事件由ServletContextListener 来处理。在 ServletContextListener 接口中定义了处理ServletContextEvent 事件的两个方法</p><h3 id="onceperrequestfilter-继承自-genericfilterbean" tabindex="-1"><a class="header-anchor" href="#onceperrequestfilter-继承自-genericfilterbean"><span>OncePerRequestFilter 继承自 GenericFilterBean</span></a></h3><p>在Spring中，Filter默认继承OncePerRequestFilter,我们若是在Spring环境下使用Filter的话，个人建议继承OncePerRequestFilter吧，而不是直接实现Filter接口。这是一个比较稳妥的选择</p><h3 id="handlerinterceptoradapter" tabindex="-1"><a class="header-anchor" href="#handlerinterceptoradapter"><span>HandlerInterceptorAdapter</span></a></h3><p>拦截器接口</p><h3 id="controlleradvice加responsebodyadvice" tabindex="-1"><a class="header-anchor" href="#controlleradvice加responsebodyadvice"><span>ControllerAdvice加ResponseBodyAdvice</span></a></h3><p>统一返回数据</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token annotation punctuation">@RestControllerAdvice</span></span>
<span class="line"><span class="token annotation punctuation">@Slf4j</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UnifiedAdvice</span> <span class="token keyword">implements</span> <span class="token class-name">ResponseBodyAdvice</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">supports</span><span class="token punctuation">(</span><span class="token class-name">MethodParameter</span> returnType<span class="token punctuation">,</span> <span class="token class-name">Class</span> converterType<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">//若加了@ResponseNotIntercept 则该方法不用做统一的拦截</span></span>
<span class="line">        <span class="token class-name">AnnotatedElement</span> annotatedElement <span class="token operator">=</span> returnType<span class="token punctuation">.</span><span class="token function">getParameterType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">ResponseNotIntercept</span> annotation <span class="token operator">=</span> <span class="token class-name">AnnotationUtils</span><span class="token punctuation">.</span><span class="token function">findAnnotation</span><span class="token punctuation">(</span>annotatedElement<span class="token punctuation">,</span> <span class="token class-name">ResponseNotIntercept</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> annotation <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">beforeBodyWrite</span><span class="token punctuation">(</span><span class="token class-name">Object</span> body<span class="token punctuation">,</span> <span class="token class-name">MethodParameter</span> returnType<span class="token punctuation">,</span> <span class="token class-name">MediaType</span> selectedContentType<span class="token punctuation">,</span> <span class="token class-name">Class</span> selectedConverterType<span class="token punctuation">,</span> <span class="token class-name">ServerHttpRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">ServerHttpResponse</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>body <span class="token keyword">instanceof</span> <span class="token class-name">CommonResult</span><span class="token punctuation">)</span> <span class="token keyword">return</span> body<span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> objectCommonResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">ResultCode</span><span class="token punctuation">.</span><span class="token constant">SUCCESS</span><span class="token punctuation">,</span> body<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">//若未封装 则对其进行封装</span></span>
<span class="line">        <span class="token keyword">return</span> objectCommonResult<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="configuration-proxybeanmethods-false-autoconfigration" tabindex="-1"><a class="header-anchor" href="#configuration-proxybeanmethods-false-autoconfigration"><span>@Configuration(proxyBeanMethods = false) (@AutoConfigration)</span></a></h3><p>proxyBeanMethods的含义了吧。为false的时候，@Bean标识的方法调用就是普通的方法调用，不会被代理。 如果你的同一个 Configuration 配置类中的多个Bean方法之间没有这样互相调用的需求，那么建议使用 Lite轻量级模式（设置 proxyBeanMethods=false），以提高 SpringBoot 的启动速度和性能</p><h3 id="initializingbean" tabindex="-1"><a class="header-anchor" href="#initializingbean"><span>InitializingBean</span></a></h3><p>初始化bean时调用的方法</p><h3 id="configureproperties" tabindex="-1"><a class="header-anchor" href="#configureproperties"><span>@ConfigureProperties</span></a></h3><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"></span>
<span class="line"><span class="token annotation punctuation">@Data</span></span>
<span class="line"><span class="token annotation punctuation">@Configuration</span></span>
<span class="line"><span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;mail&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigProperties</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">String</span> hostName<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">int</span> port<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">String</span> from<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>会读取application.properties文件</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"># Simple properties</span>
<span class="line"></span>
<span class="line">mail.hostname=&lt;host@mail.com&gt;</span>
<span class="line">mail.port=9000</span>
<span class="line">mail.from=&lt;mailer@mail.com&gt;</span>
<span class="line"></span></code></pre></div><h3 id="springdoc添加example" tabindex="-1"><a class="header-anchor" href="#springdoc添加example"><span>springdoc添加example</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"></span>
<span class="line"><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/addUserBody&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token annotation punctuation">@io.swagger.v3.oas.annotations.parameters.RequestBody</span><span class="token punctuation">(</span>content <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token annotation punctuation">@Content</span><span class="token punctuation">(</span>examples <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token annotation punctuation">@ExampleObject</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;</span>
<span class="line">        {</span>
<span class="line">          &quot;id&quot;: &quot;string&quot;,</span>
<span class="line">          &quot;username&quot;: &quot;string&quot;,</span>
<span class="line">          &quot;password&quot;: &quot;string&quot;,</span>
<span class="line">          &quot;age&quot;: 0,</span>
<span class="line">          &quot;email&quot;: &quot;string&quot;,</span>
<span class="line">          &quot;createTime&quot;: &quot;2024-03-21 11:11:11&quot;,</span>
<span class="line">          &quot;updateTime&quot;: &quot;2024-03-21 11:11:11&quot;</span>
<span class="line">        }&quot;&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token class-name">SysUser</span> <span class="token function">addUserBody</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token class-name">SysUser</span> sysUser<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> sysUser<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28)]))}const c=s(p,[["render",o]]),r=JSON.parse('{"path":"/java-tutor/springboot/tips/common-class.html","title":"常用类","lang":"zh-CN","frontmatter":{"description":"常用类 fetch请求没用application/json会出现302错误 常用的几个类 ApplicationContextAware 用于获取applicationcontext ApplicationListener用于监听事件 CommandLineRunner 获取命令行参数 ApplicationRunner ApplicationRunn...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/tips/common-class.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"常用类"}],["meta",{"property":"og:description","content":"常用类 fetch请求没用application/json会出现302错误 常用的几个类 ApplicationContextAware 用于获取applicationcontext ApplicationListener用于监听事件 CommandLineRunner 获取命令行参数 ApplicationRunner ApplicationRunn..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-24T08:24:01.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-24T08:24:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常用类\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-24T08:24:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"常用的几个类","slug":"常用的几个类","link":"#常用的几个类","children":[{"level":3,"title":"ApplicationContextAware 用于获取applicationcontext","slug":"applicationcontextaware-用于获取applicationcontext","link":"#applicationcontextaware-用于获取applicationcontext","children":[]},{"level":3,"title":"ApplicationListener用于监听事件","slug":"applicationlistener用于监听事件","link":"#applicationlistener用于监听事件","children":[]},{"level":3,"title":"CommandLineRunner 获取命令行参数","slug":"commandlinerunner-获取命令行参数","link":"#commandlinerunner-获取命令行参数","children":[]},{"level":3,"title":"ServletContextListener 监听Tomcat启动、关闭","slug":"servletcontextlistener-监听tomcat启动、关闭","link":"#servletcontextlistener-监听tomcat启动、关闭","children":[]},{"level":3,"title":"OncePerRequestFilter 继承自 GenericFilterBean","slug":"onceperrequestfilter-继承自-genericfilterbean","link":"#onceperrequestfilter-继承自-genericfilterbean","children":[]},{"level":3,"title":"HandlerInterceptorAdapter","slug":"handlerinterceptoradapter","link":"#handlerinterceptoradapter","children":[]},{"level":3,"title":"ControllerAdvice加ResponseBodyAdvice","slug":"controlleradvice加responsebodyadvice","link":"#controlleradvice加responsebodyadvice","children":[]},{"level":3,"title":"@Configuration(proxyBeanMethods = false) (@AutoConfigration)","slug":"configuration-proxybeanmethods-false-autoconfigration","link":"#configuration-proxybeanmethods-false-autoconfigration","children":[]},{"level":3,"title":"InitializingBean","slug":"initializingbean","link":"#initializingbean","children":[]},{"level":3,"title":"@ConfigureProperties","slug":"configureproperties","link":"#configureproperties","children":[]},{"level":3,"title":"springdoc添加example","slug":"springdoc添加example","link":"#springdoc添加example","children":[]}]}],"git":{"createdTime":1711268641000,"updatedTime":1711268641000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.86,"words":557},"filePathRelative":"java-tutor/springboot/tips/common-class.md","localizedDate":"2024年3月24日","autoDesc":true}');export{c as comp,r as data};
