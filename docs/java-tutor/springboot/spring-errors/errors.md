# springboot错误

## yaml错误

```text
found character '@' that cannot start any token
```

这是idea没有识别出来项目,需要重新import一下

```text
Error:(3, 38) java: 程序包org.springframework.stereotype不存在
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
```

**解决方案：**
![tip](./res/error1.png)
![tip](./res/error2.png)

## failed to load response data

当需要根据后台传回地址跳转页面时 即使使用preserve log 可以查看上一个页面获取地址请求，但是此时请求返回值为failed to load response data
当关闭页面跳转可以查看到接口返回值。
​

## 一直是cors的错误

可能是应为interceptor里面不能注入bean,去掉@autowired和@resource改写为utils来查询
在Interceptor中通过@Autowired注入service报空指针错误。就把拦截器作为bean注入

```java
@Configuration
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
        registry.addInterceptor(myInterceptor()).addPathPatterns("/**");
    }
}
```

## [Springboot使用alibaba的fastJson,@JSONField不起作用的问题](https://www.cnblogs.com/h-java/p/10220737.html)

在Springboot中默认的JSON解析框架是jackson
今天引入alibaba的fastjson，使用@JSONField(serialize=false),让@RestController转换数据给前端的时候不序列化莫些字段，发现@JSONField根本不起作用
在网上查阅了一番，发现Springboot使用fastjson需要替换默认的json转换器的
具体解决方法有两种：
本文借鉴地址：<https://blog.csdn.net/qq_28929589/article/details/79245774>
一、（1）启动类继承extends WebMvcConfigurerAdapter （2）覆盖方法configureMessageConverters
二、（1）在App.java启动类中，注入Bean : HttpMessageConverters
第一种方式：
启动类继承WebMvcConfigurerAdapter，然后对configureMessageConverters方法进行重写

```java
@Override

    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {

        super.configureMessageConverters(converters);
        FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();

        FastJsonConfig fastJsonConfig = new FastJsonConfig();
        fastJsonConfig.setSerializerFeatures(
                SerializerFeature.PrettyFormat
        );

        fastConverter.setFastJsonConfig(fastJsonConfig);
        converters.add(fastConverter);

    }
```

第二种方式：在App.java启动类中，注入Bean : HttpMessageConverters

```java
@Bean
    public HttpMessageConverters fastJsonHttpMessageConverters() {
        FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();
        FastJsonConfig fastJsonConfig = new FastJsonConfig();
        fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
        fastConverter.setFastJsonConfig(fastJsonConfig);
        HttpMessageConverter<?> converter = fastConverter;
        return new HttpMessageConverters(converter);
    }
```
