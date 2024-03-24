# 常用类

fetch请求没用application/json会出现302错误

## 常用的几个类

### ApplicationContextAware 用于获取applicationcontext

```java
@Component
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
```

### ApplicationListener用于监听事件

```java
@Configuration
public class AppListener implements ApplicationListener<WebServerInitializedEvent> {
    @Override
    public void onApplicationEvent(WebServerInitializedEvent event) {

        int port = event.getApplicationContext().getWebServer().getPort();
        InetAddress address = null;
        try {
            address = InetAddress.getLocalHost();
            System.out.println("http://" + address.getHostAddress() + ":" + port + "/swagger-ui/index.html");
            System.out.println("http://" + address.getHostAddress() + ":" + port);
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
    }
}
```

### CommandLineRunner 获取命令行参数

ApplicationRunner   ApplicationRunner与CommandLineRunner的主要区别体现在run方法的参数上，CommandLineRunner中的run方法的参数是参数数组；ApplicationRunner中的run方法的参数是Application 的arguments对象

### ServletContextListener 监听Tomcat启动、关闭

当Servlet 容器启动或终止Web 应用时，会触发ServletContextEvent 事件，该事件由ServletContextListener 来处理。在 ServletContextListener 接口中定义了处理ServletContextEvent 事件的两个方法

### OncePerRequestFilter 继承自 GenericFilterBean

在Spring中，Filter默认继承OncePerRequestFilter,我们若是在Spring环境下使用Filter的话，个人建议继承OncePerRequestFilter吧，而不是直接实现Filter接口。这是一个比较稳妥的选择

### HandlerInterceptorAdapter

拦截器接口

### ControllerAdvice加ResponseBodyAdvice

统一返回数据

```java
@RestControllerAdvice
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
        CommonResult<Object> objectCommonResult = new CommonResult<>(ResultCode.SUCCESS, body);
        //若未封装 则对其进行封装
        return objectCommonResult;
    }
}
```

### @Configuration(proxyBeanMethods = false) (@AutoConfigration)

proxyBeanMethods的含义了吧。为false的时候，@Bean标识的方法调用就是普通的方法调用，不会被代理。
如果你的同一个 Configuration 配置类中的多个Bean方法之间没有这样互相调用的需求，那么建议使用 Lite轻量级模式（设置 proxyBeanMethods=false），以提高 SpringBoot 的启动速度和性能

### InitializingBean

初始化bean时调用的方法

### @ConfigureProperties

```java

@Data
@Configuration
@ConfigurationProperties(prefix = "mail")
public class ConfigProperties {

    private String hostName;
    private int port;
    private String from;
}
```

会读取application.properties文件

```
# Simple properties

mail.hostname=<host@mail.com>
mail.port=9000
mail.from=<mailer@mail.com>
```

### springdoc添加example

```java

@PostMapping("/addUserBody")
@io.swagger.v3.oas.annotations.parameters.RequestBody(content = {@Content(examples = {@ExampleObject(value = """
        {
          "id": "string",
          "username": "string",
          "password": "string",
          "age": 0,
          "email": "string",
          "createTime": "2024-03-21 11:11:11",
          "updateTime": "2024-03-21 11:11:11"
        }""")})})
public SysUser addUserBody(@RequestBody() SysUser sysUser) {
  return sysUser;
}
```
