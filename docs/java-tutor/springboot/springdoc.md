# spring-openapi-ui使用

:::warning

不推荐使用

:::

## swaggerui配置

### 添加swaggerui依赖

```xml
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-boot-starter</artifactId>
            <version>3.0.0</version>
        </dependency>
```

### 在主类添加注解: `@EnableOpenApi`

### 最后添加配置类和拦截器类

配置类

```java

@Configuration
@EnableOpenApi
//@ComponentScan("com.qgzx.mapper")
public class SwaggerConfig {
    @Bean
    public Docket docker() {
        // 构造函数传入初始化规范，这是swagger2规范
        return new Docket(DocumentationType.OAS_30)
                //apiInfo： 添加api详情信息，参数为ApiInfo类型的参数，这个参数包含了第二部分的所有信息比如标题、描述、版本之类的，开发中一般都会自定义这些信息
                .apiInfo(apiInfo())
                .groupName("group")
                //配置是否启用Swagger，如果是false，在浏览器将无法访问，默认是true
                .enable(true)
                .select()
                //apis： 添加过滤条件,
                .apis(RequestHandlerSelectors.basePackage("cn.hellohao.controller"))
                //paths： 这里是控制哪些路径的api会被显示出来，比如下方的参数就是除了/user以外的其它路径都会生成api文档

                .build();
    }

    private ApiInfo apiInfo() {
        Contact contact = new Contact("名字：name", "个人链接：http://xxx.xxx.com/", "邮箱：XXX");
        return new ApiInfo(
                "标题内容",
                "描述内容",
                "版本内容：v1.0",
                "链接：http://terms.service.url/",
                contact,
                "许可：Apach 2.0 ",
                "许可链接：XXX",
                new ArrayList<>()
        );
    }
}
```

 拦截器类:

```java
@Component
public class SwaggerUiWebMvcConfigurer implements WebMvcConfigurer {
    private final String baseUrl;

    public SwaggerUiWebMvcConfigurer(
            @Value("${springfox.documentation.swagger-ui.base-url:}") String baseUrl) {
        this.baseUrl = baseUrl;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String baseUrl = StringUtils.trimTrailingCharacter(this.baseUrl, '/');

        registry.
                addResourceHandler(baseUrl + "/swagger-ui/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/springfox-swagger-ui/")
                .resourceChain(false);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController(baseUrl + "/swagger-ui/")
                .setViewName("forward:" + baseUrl + "/swagger-ui/index.html");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/api/pet")
                .allowedOrigins("http://editor.swagger.io");
        registry
                .addMapping("/v2/api-docs.*")
                .allowedOrigins("http://editor.swagger.io");
    }
}
```

## 配置token

待续...

可以替换为

```xml
<dependency>
      <groupId>org.springdoc</groupId>
      <artifactId>springdoc-openapi-ui</artifactId>
      <version>latest-version</version>
   </dependency>
```

文档在这里
[https://springdoc.org/#migrating-from-springfox](https://springdoc.org/#migrating-from-springfox)
​

[https://blog.csdn.net/m0_47333020/article/details/109776819](https://blog.csdn.net/m0_47333020/article/details/109776819)
​

## 添加全局token

```java

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Swagger3",
                version = "1.0",
                description = "Swagger3使用演示",
                contact = @Contact(name = "TOM")
        ),
        security = @SecurityRequirement(name = "token"),
        externalDocs = @ExternalDocumentation(description = "参考文档",
                url = "https://github.com/swagger-api/swagger-core/wiki/Swagger-2.X---Annotations"
        )
)
@SecurityScheme(type = SecuritySchemeType.APIKEY, name = "token", in = SecuritySchemeIn.HEADER)

public class SwaggerConfig {
    @Bean
    public GroupedOpenApi docker() {
        return GroupedOpenApi.builder()
                .packagesToScan("com.example.springtransfer.controller")
                .group("api")
                .pathsToMatch("/**").build();


    }


}
```

## 添加多个header

```java

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Swagger3",
                version = "1.0",
                description = "Swagger3使用演示",
                contact = @Contact(name = "TOM")
        ),
        security ={ @SecurityRequirement(name = "usersOrigin"), @SecurityRequirement(name = "Authorization")},
        externalDocs = @ExternalDocumentation(description = "参考文档",
                url = "https://github.com/swagger-api/swagger-core/wiki/Swagger-2.X---Annotations"
        )
)

@SecuritySchemes({@SecurityScheme(type = SecuritySchemeType.APIKEY, name = "Authorization", in = SecuritySchemeIn.HEADER), @SecurityScheme(type = SecuritySchemeType.APIKEY, name = "usersOrigin", in = SecuritySchemeIn.HEADER)})
public class SwaggerConfig {
    @Bean
    public GroupedOpenApi docker() {
        return GroupedOpenApi.builder()
                .packagesToScan("com.example.springtransfer.controller")
                .group("api")
                .pathsToMatch("/**").build();


    }


}
```

## 添加参数注解

```java

@Tag(name = "操作接口", description = "操作描述")
@RestController
@RequestMapping("hs")
public class HsApi {

    @Resource
    private HsService hsService;

    @Resource
    private HsTypeService hsTypeService;

    @Operation(summary = "添加", description = "添加描述")
    @Parameters({
            @Parameter(name = "name", description = "名字", required = true),
            @Parameter(name = "typeId", description = "类型ID", required = true)
    })
    @PutMapping("add")
    public JSONObject add(String name, Long typeId) {
        HsType hsType = hsTypeService.findById(typeId);
        Hs hs = new Hs();
        hs.setName(name);
        hs.setType(hsType);
        hs.setDateCreated(new Date());
        hs = hsService.save(hs);
        return JSONObject.parseObject(JSONObject.toJSONString(hs));
    }

    @Operation(summary = "获取")
    @GetMapping("get")
    public JSONObject get(@Parameter(name = "id", description = "数据ID") Long id) {
        Hs hs = hsService.findById(id);
        return JSONObject.parseObject(JSONObject.toJSONString(hs));
    }
}
```

## spring-security和shiro屏蔽了swagger-ui的api

对于spring-security

```java
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/css/**", "/js/**", "/index.html", "/img/**", "/fonts/**", "/favicon.ico", "/verifyCode","/swagger-ui/*","/v2/api-docs/**","/v3/api-docs/**",
                "/swagger-resources",
                "/swagger-resources/**",
                "/configuration/ui",
                "/configuration/security",
                "/swagger-ui/**",
                "/webjars/**" );
    }
```

对于shiro

```java
@Bean("shiroFilter")
    public ShiroFilterFactoryBean shiroFilter(SecurityManager securityManager) {
        if (UtilValidate.isEmpty(loginpage)) loginpage = "login.html";
        ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
        shiroFilter.setSecurityManager(securityManager);
        shiroFilter.setLoginUrl("/" + loginpage);
        shiroFilter.setUnauthorizedUrl("/");

        Map<String, String> filterMap = new LinkedHashMap<>();

        filterMap.put("/pobstyle.css", "anon");
        filterMap.put("/webjars/**", "anon");
        filterMap.put("/statics/**", "anon");
        filterMap.put("/" + loginpage, "anon");
        filterMap.put("/sys/login", "anon");
        filterMap.put("/favicon.ico", "anon");
        filterMap.put("/captcha.jpg", "anon");

     

        //swagger请求不拦截
        filterMap.put("/swagger/**", "anon");
        filterMap.put("/v3/api-docs", "anon");
        filterMap.put("/swagger-ui.html", "anon");
        filterMap.put("/swagger-resources/**", "anon");
        shiroFilter.setFilterChainDefinitionMap(filterMap);

        filterMap.put("/**", "authc");
        shiroFilter.setFilterChainDefinitionMap(filterMap);
        return shiroFilter;
    }
```

springboot shiro swagger的项目，shiro已经对swagger的资源放行了，但是只要有@RequiresPermissions注解的controller，swagger就读取不到

需要设置aop

```java
@Bean
public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
    DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator = 
            new DefaultAdvisorAutoProxyCreator();
    defaultAdvisorAutoProxyCreator.setUsePrefix(true);
    
    return defaultAdvisorAutoProxyCreator;
}
```
