import{_ as e,c as t,o as n,d as o}from"./app-CbULZrmi.js";const a={},i=o(`<h1 id="常用类" tabindex="-1"><a class="header-anchor" href="#常用类"><span>常用类</span></a></h1><p>fetch请求没用application/json会出现302错误</p><h2 id="常用的几个类" tabindex="-1"><a class="header-anchor" href="#常用的几个类"><span>常用的几个类</span></a></h2><h3 id="applicationcontextaware-用于获取applicationcontext" tabindex="-1"><a class="header-anchor" href="#applicationcontextaware-用于获取applicationcontext"><span>ApplicationContextAware 用于获取applicationcontext</span></a></h3><pre><code class="language-java">@Component
public class SpringContextHolder implements ApplicationContextAware {
  static ApplicationContext applicationContext;

  @Override
  public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
    SpringContextHolder.applicationContext = applicationContext;
  }

  public static Object getBean(String name) {
    return applicationContext.getBean(name);
  }
}
</code></pre><h3 id="applicationlistener用于监听事件" tabindex="-1"><a class="header-anchor" href="#applicationlistener用于监听事件"><span>ApplicationListener用于监听事件</span></a></h3><pre><code class="language-java">@Configuration
public class AppListener implements ApplicationListener&lt;WebServerInitializedEvent&gt; {
    @Override
    public void onApplicationEvent(WebServerInitializedEvent event) {

        int port = event.getApplicationContext().getWebServer().getPort();
        InetAddress address = null;
        try {
            address = InetAddress.getLocalHost();
            System.out.println(&quot;http://&quot; + address.getHostAddress() + &quot;:&quot; + port + &quot;/swagger-ui/index.html&quot;);
            System.out.println(&quot;http://&quot; + address.getHostAddress() + &quot;:&quot; + port);
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
    }
}
</code></pre><h3 id="commandlinerunner-获取命令行参数" tabindex="-1"><a class="header-anchor" href="#commandlinerunner-获取命令行参数"><span>CommandLineRunner 获取命令行参数</span></a></h3><p>ApplicationRunner ApplicationRunner与CommandLineRunner的主要区别体现在run方法的参数上，CommandLineRunner中的run方法的参数是参数数组；ApplicationRunner中的run方法的参数是Application 的arguments对象</p><h3 id="servletcontextlistener-监听tomcat启动、关闭" tabindex="-1"><a class="header-anchor" href="#servletcontextlistener-监听tomcat启动、关闭"><span>ServletContextListener 监听Tomcat启动、关闭</span></a></h3><p>当Servlet 容器启动或终止Web 应用时，会触发ServletContextEvent 事件，该事件由ServletContextListener 来处理。在 ServletContextListener 接口中定义了处理ServletContextEvent 事件的两个方法</p><h3 id="onceperrequestfilter-继承自-genericfilterbean" tabindex="-1"><a class="header-anchor" href="#onceperrequestfilter-继承自-genericfilterbean"><span>OncePerRequestFilter 继承自 GenericFilterBean</span></a></h3><p>在Spring中，Filter默认继承OncePerRequestFilter,我们若是在Spring环境下使用Filter的话，个人建议继承OncePerRequestFilter吧，而不是直接实现Filter接口。这是一个比较稳妥的选择</p><h3 id="handlerinterceptoradapter" tabindex="-1"><a class="header-anchor" href="#handlerinterceptoradapter"><span>HandlerInterceptorAdapter</span></a></h3><p>拦截器接口</p><h3 id="controlleradvice加responsebodyadvice" tabindex="-1"><a class="header-anchor" href="#controlleradvice加responsebodyadvice"><span>ControllerAdvice加ResponseBodyAdvice</span></a></h3><p>统一返回数据</p><pre><code class="language-java">@RestControllerAdvice
@Slf4j
public class UnifiedAdvice implements ResponseBodyAdvice {
    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        //若加了@ResponseNotIntercept 则该方法不用做统一的拦截
        AnnotatedElement annotatedElement = returnType.getParameterType();
        ResponseNotIntercept annotation = AnnotationUtils.findAnnotation(annotatedElement, ResponseNotIntercept.class);
        return annotation == null;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        if (body instanceof CommonResult) return body;
        CommonResult&lt;Object&gt; objectCommonResult = new CommonResult&lt;&gt;(ResultCode.SUCCESS, body);
        //若未封装 则对其进行封装
        return objectCommonResult;
    }
}
</code></pre><h3 id="configuration-proxybeanmethods-false-autoconfigration" tabindex="-1"><a class="header-anchor" href="#configuration-proxybeanmethods-false-autoconfigration"><span>@Configuration(proxyBeanMethods = false) (@AutoConfigration)</span></a></h3><p>proxyBeanMethods的含义了吧。为false的时候，@Bean标识的方法调用就是普通的方法调用，不会被代理。 如果你的同一个 Configuration 配置类中的多个Bean方法之间没有这样互相调用的需求，那么建议使用 Lite轻量级模式（设置 proxyBeanMethods=false），以提高 SpringBoot 的启动速度和性能</p><h3 id="initializingbean" tabindex="-1"><a class="header-anchor" href="#initializingbean"><span>InitializingBean</span></a></h3><p>初始化bean时调用的方法</p><h3 id="configureproperties" tabindex="-1"><a class="header-anchor" href="#configureproperties"><span>@ConfigureProperties</span></a></h3><pre><code class="language-java">
@Data
@Configuration
@ConfigurationProperties(prefix = &quot;mail&quot;)
public class ConfigProperties {

    private String hostName;
    private int port;
    private String from;
}
</code></pre><p>会读取application.properties文件</p><pre><code># Simple properties

mail.hostname=&lt;host@mail.com&gt;
mail.port=9000
mail.from=&lt;mailer@mail.com&gt;
</code></pre><h3 id="springdoc添加example" tabindex="-1"><a class="header-anchor" href="#springdoc添加example"><span>springdoc添加example</span></a></h3><pre><code class="language-java">
@PostMapping(&quot;/addUserBody&quot;)
@io.swagger.v3.oas.annotations.parameters.RequestBody(content = {@Content(examples = {@ExampleObject(value = &quot;&quot;&quot;
        {
          &quot;id&quot;: &quot;string&quot;,
          &quot;username&quot;: &quot;string&quot;,
          &quot;password&quot;: &quot;string&quot;,
          &quot;age&quot;: 0,
          &quot;email&quot;: &quot;string&quot;,
          &quot;createTime&quot;: &quot;2024-03-21 11:11:11&quot;,
          &quot;updateTime&quot;: &quot;2024-03-21 11:11:11&quot;
        }&quot;&quot;&quot;)})})
public SysUser addUserBody(@RequestBody() SysUser sysUser) {
  return sysUser;
}
</code></pre>`,28),r=[i];function p(l,s){return n(),t("div",null,r)}const d=e(a,[["render",p],["__file","common-class.html.vue"]]),u=JSON.parse('{"path":"/java-tutor/springboot/tips/common-class.html","title":"常用类","lang":"zh-CN","frontmatter":{"description":"常用类 fetch请求没用application/json会出现302错误 常用的几个类 ApplicationContextAware 用于获取applicationcontext ApplicationListener用于监听事件 CommandLineRunner 获取命令行参数 ApplicationRunner ApplicationRunn...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/tips/common-class.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"常用类"}],["meta",{"property":"og:description","content":"常用类 fetch请求没用application/json会出现302错误 常用的几个类 ApplicationContextAware 用于获取applicationcontext ApplicationListener用于监听事件 CommandLineRunner 获取命令行参数 ApplicationRunner ApplicationRunn..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-24T08:24:01.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-24T08:24:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常用类\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-24T08:24:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"常用的几个类","slug":"常用的几个类","link":"#常用的几个类","children":[{"level":3,"title":"ApplicationContextAware 用于获取applicationcontext","slug":"applicationcontextaware-用于获取applicationcontext","link":"#applicationcontextaware-用于获取applicationcontext","children":[]},{"level":3,"title":"ApplicationListener用于监听事件","slug":"applicationlistener用于监听事件","link":"#applicationlistener用于监听事件","children":[]},{"level":3,"title":"CommandLineRunner 获取命令行参数","slug":"commandlinerunner-获取命令行参数","link":"#commandlinerunner-获取命令行参数","children":[]},{"level":3,"title":"ServletContextListener 监听Tomcat启动、关闭","slug":"servletcontextlistener-监听tomcat启动、关闭","link":"#servletcontextlistener-监听tomcat启动、关闭","children":[]},{"level":3,"title":"OncePerRequestFilter 继承自 GenericFilterBean","slug":"onceperrequestfilter-继承自-genericfilterbean","link":"#onceperrequestfilter-继承自-genericfilterbean","children":[]},{"level":3,"title":"HandlerInterceptorAdapter","slug":"handlerinterceptoradapter","link":"#handlerinterceptoradapter","children":[]},{"level":3,"title":"ControllerAdvice加ResponseBodyAdvice","slug":"controlleradvice加responsebodyadvice","link":"#controlleradvice加responsebodyadvice","children":[]},{"level":3,"title":"@Configuration(proxyBeanMethods = false) (@AutoConfigration)","slug":"configuration-proxybeanmethods-false-autoconfigration","link":"#configuration-proxybeanmethods-false-autoconfigration","children":[]},{"level":3,"title":"InitializingBean","slug":"initializingbean","link":"#initializingbean","children":[]},{"level":3,"title":"@ConfigureProperties","slug":"configureproperties","link":"#configureproperties","children":[]},{"level":3,"title":"springdoc添加example","slug":"springdoc添加example","link":"#springdoc添加example","children":[]}]}],"git":{"createdTime":1711268641000,"updatedTime":1711268641000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.86,"words":557},"filePathRelative":"java-tutor/springboot/tips/common-class.md","localizedDate":"2024年3月24日","autoDesc":true}');export{d as comp,u as data};
