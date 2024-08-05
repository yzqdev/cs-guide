import{_ as e,c as t,o as n,d as o}from"./app-CbULZrmi.js";const r={},i=o(`<h1 id="spring-openapi-ui使用" tabindex="-1"><a class="header-anchor" href="#spring-openapi-ui使用"><span>spring-openapi-ui使用</span></a></h1><div class="hint-container warning"><p class="hint-container-title">注意</p><p>不推荐使用</p></div><h2 id="swaggerui配置" tabindex="-1"><a class="header-anchor" href="#swaggerui配置"><span>swaggerui配置</span></a></h2><h3 id="添加swaggerui依赖" tabindex="-1"><a class="header-anchor" href="#添加swaggerui依赖"><span>添加swaggerui依赖</span></a></h3><pre><code class="language-xml">        &lt;dependency&gt;
            &lt;groupId&gt;io.springfox&lt;/groupId&gt;
            &lt;artifactId&gt;springfox-boot-starter&lt;/artifactId&gt;
            &lt;version&gt;3.0.0&lt;/version&gt;
        &lt;/dependency&gt;
</code></pre><h3 id="在主类添加注解-enableopenapi" tabindex="-1"><a class="header-anchor" href="#在主类添加注解-enableopenapi"><span>在主类添加注解: <code>@EnableOpenApi</code></span></a></h3><h3 id="最后添加配置类和拦截器类" tabindex="-1"><a class="header-anchor" href="#最后添加配置类和拦截器类"><span>最后添加配置类和拦截器类</span></a></h3><p>配置类</p><pre><code class="language-java">
@Configuration
@EnableOpenApi
//@ComponentScan(&quot;com.qgzx.mapper&quot;)
public class SwaggerConfig {
    @Bean
    public Docket docker() {
        // 构造函数传入初始化规范，这是swagger2规范
        return new Docket(DocumentationType.OAS_30)
                //apiInfo： 添加api详情信息，参数为ApiInfo类型的参数，这个参数包含了第二部分的所有信息比如标题、描述、版本之类的，开发中一般都会自定义这些信息
                .apiInfo(apiInfo())
                .groupName(&quot;group&quot;)
                //配置是否启用Swagger，如果是false，在浏览器将无法访问，默认是true
                .enable(true)
                .select()
                //apis： 添加过滤条件,
                .apis(RequestHandlerSelectors.basePackage(&quot;cn.hellohao.controller&quot;))
                //paths： 这里是控制哪些路径的api会被显示出来，比如下方的参数就是除了/user以外的其它路径都会生成api文档

                .build();
    }

    private ApiInfo apiInfo() {
        Contact contact = new Contact(&quot;名字：name&quot;, &quot;个人链接：http://xxx.xxx.com/&quot;, &quot;邮箱：XXX&quot;);
        return new ApiInfo(
                &quot;标题内容&quot;,
                &quot;描述内容&quot;,
                &quot;版本内容：v1.0&quot;,
                &quot;链接：http://terms.service.url/&quot;,
                contact,
                &quot;许可：Apach 2.0 &quot;,
                &quot;许可链接：XXX&quot;,
                new ArrayList&lt;&gt;()
        );
    }
}
</code></pre><p>拦截器类:</p><pre><code class="language-java">@Component
public class SwaggerUiWebMvcConfigurer implements WebMvcConfigurer {
    private final String baseUrl;

    public SwaggerUiWebMvcConfigurer(
            @Value(&quot;\${springfox.documentation.swagger-ui.base-url:}&quot;) String baseUrl) {
        this.baseUrl = baseUrl;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String baseUrl = StringUtils.trimTrailingCharacter(this.baseUrl, &#39;/&#39;);

        registry.
                addResourceHandler(baseUrl + &quot;/swagger-ui/**&quot;)
                .addResourceLocations(&quot;classpath:/META-INF/resources/webjars/springfox-swagger-ui/&quot;)
                .resourceChain(false);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController(baseUrl + &quot;/swagger-ui/&quot;)
                .setViewName(&quot;forward:&quot; + baseUrl + &quot;/swagger-ui/index.html&quot;);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping(&quot;/api/pet&quot;)
                .allowedOrigins(&quot;http://editor.swagger.io&quot;);
        registry
                .addMapping(&quot;/v2/api-docs.*&quot;)
                .allowedOrigins(&quot;http://editor.swagger.io&quot;);
    }
}
</code></pre><h2 id="配置token" tabindex="-1"><a class="header-anchor" href="#配置token"><span>配置token</span></a></h2><p>待续...</p><p>可以替换为</p><pre><code class="language-xml">&lt;dependency&gt;
      &lt;groupId&gt;org.springdoc&lt;/groupId&gt;
      &lt;artifactId&gt;springdoc-openapi-ui&lt;/artifactId&gt;
      &lt;version&gt;latest-version&lt;/version&gt;
   &lt;/dependency&gt;
</code></pre><p>文档在这里 <a href="https://springdoc.org/#migrating-from-springfox" target="_blank" rel="noopener noreferrer">https://springdoc.org/#migrating-from-springfox</a> ​</p><p><a href="https://blog.csdn.net/m0_47333020/article/details/109776819" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/m0_47333020/article/details/109776819</a> ​</p><h2 id="添加全局token" tabindex="-1"><a class="header-anchor" href="#添加全局token"><span>添加全局token</span></a></h2><pre><code class="language-java">
@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = &quot;Swagger3&quot;,
                version = &quot;1.0&quot;,
                description = &quot;Swagger3使用演示&quot;,
                contact = @Contact(name = &quot;TOM&quot;)
        ),
        security = @SecurityRequirement(name = &quot;token&quot;),
        externalDocs = @ExternalDocumentation(description = &quot;参考文档&quot;,
                url = &quot;https://github.com/swagger-api/swagger-core/wiki/Swagger-2.X---Annotations&quot;
        )
)
@SecurityScheme(type = SecuritySchemeType.APIKEY, name = &quot;token&quot;, in = SecuritySchemeIn.HEADER)

public class SwaggerConfig {
    @Bean
    public GroupedOpenApi docker() {
        return GroupedOpenApi.builder()
                .packagesToScan(&quot;com.example.springtransfer.controller&quot;)
                .group(&quot;api&quot;)
                .pathsToMatch(&quot;/**&quot;).build();


    }


}
</code></pre><h2 id="添加多个header" tabindex="-1"><a class="header-anchor" href="#添加多个header"><span>添加多个header</span></a></h2><pre><code class="language-java">
@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = &quot;Swagger3&quot;,
                version = &quot;1.0&quot;,
                description = &quot;Swagger3使用演示&quot;,
                contact = @Contact(name = &quot;TOM&quot;)
        ),
        security ={ @SecurityRequirement(name = &quot;usersOrigin&quot;), @SecurityRequirement(name = &quot;Authorization&quot;)},
        externalDocs = @ExternalDocumentation(description = &quot;参考文档&quot;,
                url = &quot;https://github.com/swagger-api/swagger-core/wiki/Swagger-2.X---Annotations&quot;
        )
)

@SecuritySchemes({@SecurityScheme(type = SecuritySchemeType.APIKEY, name = &quot;Authorization&quot;, in = SecuritySchemeIn.HEADER), @SecurityScheme(type = SecuritySchemeType.APIKEY, name = &quot;usersOrigin&quot;, in = SecuritySchemeIn.HEADER)})
public class SwaggerConfig {
    @Bean
    public GroupedOpenApi docker() {
        return GroupedOpenApi.builder()
                .packagesToScan(&quot;com.example.springtransfer.controller&quot;)
                .group(&quot;api&quot;)
                .pathsToMatch(&quot;/**&quot;).build();


    }


}
</code></pre><h2 id="添加参数注解" tabindex="-1"><a class="header-anchor" href="#添加参数注解"><span>添加参数注解</span></a></h2><pre><code class="language-java">
@Tag(name = &quot;操作接口&quot;, description = &quot;操作描述&quot;)
@RestController
@RequestMapping(&quot;hs&quot;)
public class HsApi {

    @Resource
    private HsService hsService;

    @Resource
    private HsTypeService hsTypeService;

    @Operation(summary = &quot;添加&quot;, description = &quot;添加描述&quot;)
    @Parameters({
            @Parameter(name = &quot;name&quot;, description = &quot;名字&quot;, required = true),
            @Parameter(name = &quot;typeId&quot;, description = &quot;类型ID&quot;, required = true)
    })
    @PutMapping(&quot;add&quot;)
    public JSONObject add(String name, Long typeId) {
        HsType hsType = hsTypeService.findById(typeId);
        Hs hs = new Hs();
        hs.setName(name);
        hs.setType(hsType);
        hs.setDateCreated(new Date());
        hs = hsService.save(hs);
        return JSONObject.parseObject(JSONObject.toJSONString(hs));
    }

    @Operation(summary = &quot;获取&quot;)
    @GetMapping(&quot;get&quot;)
    public JSONObject get(@Parameter(name = &quot;id&quot;, description = &quot;数据ID&quot;) Long id) {
        Hs hs = hsService.findById(id);
        return JSONObject.parseObject(JSONObject.toJSONString(hs));
    }
}
</code></pre><h2 id="spring-security和shiro屏蔽了swagger-ui的api" tabindex="-1"><a class="header-anchor" href="#spring-security和shiro屏蔽了swagger-ui的api"><span>spring-security和shiro屏蔽了swagger-ui的api</span></a></h2><p>对于spring-security</p><pre><code class="language-java">    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(&quot;/css/**&quot;, &quot;/js/**&quot;, &quot;/index.html&quot;, &quot;/img/**&quot;, &quot;/fonts/**&quot;, &quot;/favicon.ico&quot;, &quot;/verifyCode&quot;,&quot;/swagger-ui/*&quot;,&quot;/v2/api-docs/**&quot;,&quot;/v3/api-docs/**&quot;,
                &quot;/swagger-resources&quot;,
                &quot;/swagger-resources/**&quot;,
                &quot;/configuration/ui&quot;,
                &quot;/configuration/security&quot;,
                &quot;/swagger-ui/**&quot;,
                &quot;/webjars/**&quot; );
    }
</code></pre><p>对于shiro</p><pre><code class="language-java">@Bean(&quot;shiroFilter&quot;)
    public ShiroFilterFactoryBean shiroFilter(SecurityManager securityManager) {
        if (UtilValidate.isEmpty(loginpage)) loginpage = &quot;login.html&quot;;
        ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
        shiroFilter.setSecurityManager(securityManager);
        shiroFilter.setLoginUrl(&quot;/&quot; + loginpage);
        shiroFilter.setUnauthorizedUrl(&quot;/&quot;);

        Map&lt;String, String&gt; filterMap = new LinkedHashMap&lt;&gt;();

        filterMap.put(&quot;/pobstyle.css&quot;, &quot;anon&quot;);
        filterMap.put(&quot;/webjars/**&quot;, &quot;anon&quot;);
        filterMap.put(&quot;/statics/**&quot;, &quot;anon&quot;);
        filterMap.put(&quot;/&quot; + loginpage, &quot;anon&quot;);
        filterMap.put(&quot;/sys/login&quot;, &quot;anon&quot;);
        filterMap.put(&quot;/favicon.ico&quot;, &quot;anon&quot;);
        filterMap.put(&quot;/captcha.jpg&quot;, &quot;anon&quot;);

     

        //swagger请求不拦截
        filterMap.put(&quot;/swagger/**&quot;, &quot;anon&quot;);
        filterMap.put(&quot;/v3/api-docs&quot;, &quot;anon&quot;);
        filterMap.put(&quot;/swagger-ui.html&quot;, &quot;anon&quot;);
        filterMap.put(&quot;/swagger-resources/**&quot;, &quot;anon&quot;);
        shiroFilter.setFilterChainDefinitionMap(filterMap);

        filterMap.put(&quot;/**&quot;, &quot;authc&quot;);
        shiroFilter.setFilterChainDefinitionMap(filterMap);
        return shiroFilter;
    }
</code></pre><p>springboot shiro swagger的项目，shiro已经对swagger的资源放行了，但是只要有@RequiresPermissions注解的controller，swagger就读取不到</p><p>需要设置aop</p><pre><code class="language-java">@Bean
public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
    DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator = 
            new DefaultAdvisorAutoProxyCreator();
    defaultAdvisorAutoProxyCreator.setUsePrefix(true);
    
    return defaultAdvisorAutoProxyCreator;
}
</code></pre>`,31),a=[i];function u(s,p){return n(),t("div",null,a)}const c=e(r,[["render",u],["__file","springdoc.html.vue"]]),l=JSON.parse('{"path":"/java-tutor/springboot/springdoc.html","title":"spring-openapi-ui使用","lang":"zh-CN","frontmatter":{"description":"spring-openapi-ui使用 注意 不推荐使用 swaggerui配置 添加swaggerui依赖 在主类添加注解: @EnableOpenApi 最后添加配置类和拦截器类 配置类 拦截器类: 配置token 待续... 可以替换为 文档在这里 https://springdoc.org/#migrating-from-springfox ​...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/springdoc.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"spring-openapi-ui使用"}],["meta",{"property":"og:description","content":"spring-openapi-ui使用 注意 不推荐使用 swaggerui配置 添加swaggerui依赖 在主类添加注解: @EnableOpenApi 最后添加配置类和拦截器类 配置类 拦截器类: 配置token 待续... 可以替换为 文档在这里 https://springdoc.org/#migrating-from-springfox ​..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-15T03:10:32.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-10-15T03:10:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"spring-openapi-ui使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-15T03:10:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"swaggerui配置","slug":"swaggerui配置","link":"#swaggerui配置","children":[{"level":3,"title":"添加swaggerui依赖","slug":"添加swaggerui依赖","link":"#添加swaggerui依赖","children":[]},{"level":3,"title":"在主类添加注解: @EnableOpenApi","slug":"在主类添加注解-enableopenapi","link":"#在主类添加注解-enableopenapi","children":[]},{"level":3,"title":"最后添加配置类和拦截器类","slug":"最后添加配置类和拦截器类","link":"#最后添加配置类和拦截器类","children":[]}]},{"level":2,"title":"配置token","slug":"配置token","link":"#配置token","children":[]},{"level":2,"title":"添加全局token","slug":"添加全局token","link":"#添加全局token","children":[]},{"level":2,"title":"添加多个header","slug":"添加多个header","link":"#添加多个header","children":[]},{"level":2,"title":"添加参数注解","slug":"添加参数注解","link":"#添加参数注解","children":[]},{"level":2,"title":"spring-security和shiro屏蔽了swagger-ui的api","slug":"spring-security和shiro屏蔽了swagger-ui的api","link":"#spring-security和shiro屏蔽了swagger-ui的api","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1697339432000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":5}]},"readingTime":{"minutes":2.85,"words":854},"filePathRelative":"java-tutor/springboot/springdoc.md","localizedDate":"2022年3月21日","autoDesc":true}');export{c as comp,l as data};
