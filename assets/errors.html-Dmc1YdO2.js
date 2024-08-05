import{_ as e,c as t,o as a,d as r}from"./app-CbULZrmi.js";const n="/cs-guide/assets/error1-C1FgSALM.png",o="/cs-guide/assets/error2-DI-sgWIL.png",s={},i=r(`<h1 id="springboot错误" tabindex="-1"><a class="header-anchor" href="#springboot错误"><span>springboot错误</span></a></h1><h2 id="yaml错误" tabindex="-1"><a class="header-anchor" href="#yaml错误"><span>yaml错误</span></a></h2><pre><code class="language-text">found character &#39;@&#39; that cannot start any token
</code></pre><p>这是idea没有识别出来项目,需要重新import一下</p><pre><code class="language-text">Error:(3, 38) java: 程序包org.springframework.stereotype不存在
Error:(4, 47) java: 程序包org.springframework.web.bind.annotation不存在
Error:(5, 47) java: 程序包org.springframework.web.bind.annotation不存在
Error:(7, 2) java: 找不到符号
 符号: 类 Controller
Error:(10, 6) java: 找不到符号
 符号:  类 ResponseBody
 位置: 类 com.test.controller.HelloController
Error:(11, 6) java: 找不到符号
 符号:  类 RequestMapping
 位置: 类 com.test.controller.HelloController
</code></pre><p>解决方案：<br><img src="`+n+'" alt="tip"><img src="'+o+`" alt="tip"></p><h2 id="failed-to-load-response-data" tabindex="-1"><a class="header-anchor" href="#failed-to-load-response-data"><span>failed to load response data</span></a></h2><p>当需要根据后台传回地址跳转页面时 即使使用preserve log 可以查看上一个页面获取地址请求，但是此时请求返回值为failed to load response data 当关闭页面跳转可以查看到接口返回值。 ​</p><h2 id="一直是cors的错误" tabindex="-1"><a class="header-anchor" href="#一直是cors的错误"><span>一直是cors的错误</span></a></h2><p>可能是应为interceptor里面不能注入bean,去掉@autowired和@resource改写为utils来查询 在Interceptor中通过@Autowired注入service报空指针错误。就把拦截器作为bean注入</p><pre><code class="language-java">@Configuration
public class MyWebAppConfigurer implements WebMvcConfigurer {
 
    /**
     * 将拦截器作为bean写入配置中
     * @return
     */
    @Bean
    public MyInterceptor myInterceptor() {
        return new MyInterceptor();
    }
 
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        /*
         * 多个拦截器组成一个拦截器链;
         * addPathPatterns用于添加拦截规则;
         * excludePathPatterns用户排除拦截;
         * 对来自/** 全路径请求进行拦截
         */ 
        registry.addInterceptor(myInterceptor()).addPathPatterns(&quot;/**&quot;);
    }
}
</code></pre><h2 id="springboot使用alibaba的fastjson-jsonfield不起作用的问题" tabindex="-1"><a class="header-anchor" href="#springboot使用alibaba的fastjson-jsonfield不起作用的问题"><span><a href="https://www.cnblogs.com/h-java/p/10220737.html" target="_blank" rel="noopener noreferrer">Springboot使用alibaba的fastJson,@JSONField不起作用的问题</a></span></a></h2><p>在Springboot中默认的JSON解析框架是jackson 今天引入alibaba的fastjson，使用@JSONField(serialize=false),让@RestController转换数据给前端的时候不序列化莫些字段，发现@JSONField根本不起作用 在网上查阅了一番，发现Springboot使用fastjson需要替换默认的json转换器的 具体解决方法有两种：<br> 本文借鉴地址： <a href="https://blog.csdn.net/qq_28929589/article/details/79245774" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/qq_28929589/article/details/79245774</a><br> 一、（1）启动类继承extends WebMvcConfigurerAdapter （2）覆盖方法configureMessageConverters<br> 二、（1）在App.java启动类中，注入Bean : HttpMessageConverters<br> 第一种方式：<br> 启动类继承WebMvcConfigurerAdapter，然后对configureMessageConverters方法进行重写</p><pre><code class="language-java">@Override

    public void configureMessageConverters(List&lt;HttpMessageConverter&lt;?&gt;&gt; converters) {

        super.configureMessageConverters(converters);
        FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();

        FastJsonConfig fastJsonConfig = new FastJsonConfig();
        fastJsonConfig.setSerializerFeatures(
                SerializerFeature.PrettyFormat
        );

        fastConverter.setFastJsonConfig(fastJsonConfig);
        converters.add(fastConverter);

    }
</code></pre><p>第二种方式：在App.java启动类中，注入Bean : HttpMessageConverters</p><pre><code class="language-java">@Bean
    public HttpMessageConverters fastJsonHttpMessageConverters() {
        FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();
        FastJsonConfig fastJsonConfig = new FastJsonConfig();
        fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
        fastConverter.setFastJsonConfig(fastJsonConfig);
        HttpMessageConverter&lt;?&gt; converter = fastConverter;
        return new HttpMessageConverters(converter);
    }
</code></pre><h2 id="springboot多模块运行" tabindex="-1"><a class="header-anchor" href="#springboot多模块运行"><span>springboot多模块运行</span></a></h2><p>见<a href="https://spring.io/guides/gs/multi-module/" target="_blank" rel="noopener noreferrer">官方文档</a></p><p>比如我有如下module</p><pre><code class="language-txt">root
    ├───common
    ├───main-module (main方法,包含springboot-maven-plugin)
    └───system-module

</code></pre><p>在root目录直接<code>mvn spring-boot:run -pl main-module</code>即可</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>关于 maven-compile-plugin和springboot-maven-plugin<br> maven-compiler-plugin 是用于在编译（compile）阶段加入定制化参数，而 spring-boot-maven-plugin 是用于 spring boot 项目的打包（package）阶段，两者没什么关系。</p></div><p>目标编译的Java版本可以通过属性指定， 不一定要在plugin的配置里，如</p><pre><code class="language-xml">  &lt;properties&gt;
    &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
    &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
    &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
    &lt;!-- 或者设置java版本 --&gt;
    &lt;java.version&gt;17&lt;/java.version&gt;
  &lt;/properties&gt;
</code></pre><h2 id="localdatetime传参数据不对" tabindex="-1"><a class="header-anchor" href="#localdatetime传参数据不对"><span>LocalDatetime传参数据不对</span></a></h2><p>使用过java8的朋友应该都知道LocalDateTime类型，它作为全新的日期和时间API ，对比Date类型有着很大的优势，极大的方便了我们对于时间和日期的操作。不过，如果在日常使用中，如果我们不对这个类型的字段进行处理的话，在打印或者直接返回到页面的时候往往看到的格式是这样的 2020-11-11T22:12:03.793 。显然这种格式对于用户来说阅读体验很差，那么，今天我们将通过这篇文章来介绍一下在使用LocalDateTime是如何在接受参数和返回信息时进行格式化。 比如我们有一个UserVo.java</p><pre><code class="language-java">public class UserVO {
 
    private String userName;
    private String sex;
    private LocalDateTime birthday;
    //省略Getter and Setter方法
 
}
</code></pre><h3 id="post请求使用formdata进行传参-这种情况下只需要在变量上添加-datetimeformat注解" tabindex="-1"><a class="header-anchor" href="#post请求使用formdata进行传参-这种情况下只需要在变量上添加-datetimeformat注解"><span>post请求使用formdata进行传参，这种情况下只需要在变量上添加@DateTimeFormat注解</span></a></h3><pre><code class="language-java">public class UserVO {
    private String userName;
    private String sex;
    @DateTimeFormat(pattern = &quot;yyyy-MM-dd HH:mm:ss&quot;)
    private LocalDateTime birthday;
    //省略Getter and Setter方法
}
</code></pre><h3 id="使用post请求传参-并将参数放在请求体中以json格式传参-此时-需要在接口的实体类前添加-requestbody注解-同时在localdatetime类型的变量上添加-jsonformat注解" tabindex="-1"><a class="header-anchor" href="#使用post请求传参-并将参数放在请求体中以json格式传参-此时-需要在接口的实体类前添加-requestbody注解-同时在localdatetime类型的变量上添加-jsonformat注解"><span>使用post请求传参，并将参数放在请求体中以json格式传参，此时，需要在接口的实体类前添加@RequestBody注解，同时在LocalDateTime类型的变量上添加 @JsonFormat注解</span></a></h3><pre><code class="language-java">public class UserVo{
    private String userName;
private String sex;
@JsonFormat(pattern = &quot;yyyy-MM-dd HH:mm:ss&quot;)
private LocalDateTime birthday;
}
</code></pre><h2 id="id为数组-使用雪花id-前端出现错误" tabindex="-1"><a class="header-anchor" href="#id为数组-使用雪花id-前端出现错误"><span>id为数组,使用雪花id,前端出现错误</span></a></h2><p>后端返回了一个超大的数字，前端拿到数据之后在控制台打印出来却跟后端返回的不一样。</p><pre><code class="language-js">const num = 4518777332709233930
console.log(num)  // 4518777332709234000
</code></pre><p>当时看了半天也没找到问题，后来发现其他数字也都跟后端返回的不一样，这个时候才隐约想起 JS 中处理超长数字有精度问题。JS 的最大和最小安全值可以这样获得：</p><pre><code class="language-js">console.log(Number.MAX_SAFE_INTEGER); //9007199254740991
console.log(Number.MIN_SAFE_INTEGER); //-9007199254740991
</code></pre><p>超过这个范围就会出现精度问题。</p><p>解决方法:</p><h3 id="id使用字符串" tabindex="-1"><a class="header-anchor" href="#id使用字符串"><span>id使用字符串</span></a></h3><p>见知乎回答<a href="https://www.zhihu.com/question/281123046" target="_blank" rel="noopener noreferrer">https://www.zhihu.com/question/281123046</a></p><h3 id="使用jsonserialize" tabindex="-1"><a class="header-anchor" href="#使用jsonserialize"><span>使用JsonSerialize</span></a></h3><pre><code class="language-java">// Jackson
@JsonSerialize(using = com.fasterxml.jackson.databind.ser.std.ToStringSerializer.class)
private long id;

// FastJson
@JSONField(serializeUsing = com.alibaba.fastjson.serializer.ToStringSerializer.class)
private long id;
</code></pre><p>这样前端接收的id就是字符串了</p>`,43),l=[i];function p(d,c){return a(),t("div",null,l)}const m=e(s,[["render",p],["__file","errors.html.vue"]]),u=JSON.parse('{"path":"/java-tutor/springboot/spring-errors/errors.html","title":"springboot错误","lang":"zh-CN","frontmatter":{"description":"springboot错误 yaml错误 这是idea没有识别出来项目,需要重新import一下 解决方案： tip tip failed to load response data 当需要根据后台传回地址跳转页面时 即使使用preserve log 可以查看上一个页面获取地址请求，但是此时请求返回值为failed to load response da...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/spring-errors/errors.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"springboot错误"}],["meta",{"property":"og:description","content":"springboot错误 yaml错误 这是idea没有识别出来项目,需要重新import一下 解决方案： tip tip failed to load response data 当需要根据后台传回地址跳转页面时 即使使用preserve log 可以查看上一个页面获取地址请求，但是此时请求返回值为failed to load response da..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-18T06:54:45.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-06-18T06:54:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"springboot错误\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-06-18T06:54:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"yaml错误","slug":"yaml错误","link":"#yaml错误","children":[]},{"level":2,"title":"failed to load response data","slug":"failed-to-load-response-data","link":"#failed-to-load-response-data","children":[]},{"level":2,"title":"一直是cors的错误","slug":"一直是cors的错误","link":"#一直是cors的错误","children":[]},{"level":2,"title":"Springboot使用alibaba的fastJson,@JSONField不起作用的问题","slug":"springboot使用alibaba的fastjson-jsonfield不起作用的问题","link":"#springboot使用alibaba的fastjson-jsonfield不起作用的问题","children":[]},{"level":2,"title":"springboot多模块运行","slug":"springboot多模块运行","link":"#springboot多模块运行","children":[]},{"level":2,"title":"LocalDatetime传参数据不对","slug":"localdatetime传参数据不对","link":"#localdatetime传参数据不对","children":[{"level":3,"title":"post请求使用formdata进行传参，这种情况下只需要在变量上添加@DateTimeFormat注解","slug":"post请求使用formdata进行传参-这种情况下只需要在变量上添加-datetimeformat注解","link":"#post请求使用formdata进行传参-这种情况下只需要在变量上添加-datetimeformat注解","children":[]},{"level":3,"title":"使用post请求传参，并将参数放在请求体中以json格式传参，此时，需要在接口的实体类前添加@RequestBody注解，同时在LocalDateTime类型的变量上添加 @JsonFormat注解","slug":"使用post请求传参-并将参数放在请求体中以json格式传参-此时-需要在接口的实体类前添加-requestbody注解-同时在localdatetime类型的变量上添加-jsonformat注解","link":"#使用post请求传参-并将参数放在请求体中以json格式传参-此时-需要在接口的实体类前添加-requestbody注解-同时在localdatetime类型的变量上添加-jsonformat注解","children":[]}]},{"level":2,"title":"id为数组,使用雪花id,前端出现错误","slug":"id为数组-使用雪花id-前端出现错误","link":"#id为数组-使用雪花id-前端出现错误","children":[{"level":3,"title":"id使用字符串","slug":"id使用字符串","link":"#id使用字符串","children":[]},{"level":3,"title":"使用JsonSerialize","slug":"使用jsonserialize","link":"#使用jsonserialize","children":[]}]}],"git":{"createdTime":1647861419000,"updatedTime":1655535285000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":4.22,"words":1267},"filePathRelative":"java-tutor/springboot/spring-errors/errors.md","localizedDate":"2022年3月21日","autoDesc":true}');export{m as comp,u as data};
