# spring跨域处理

## 官网使用addCorsMapping

:::caution
注意:addCorsMapping 会被interceptor覆盖..
:::
[链接](https://docs.spring.io/spring-framework/docs/5.3.9/reference/html/web.html#mvc-cors-global)​
这里可以使用allowedOriginsPattern("*")配置多个

```java
@Configuration(proxyBeanMethods = false)
public class MyConfiguration {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                .allowedOrigins("*") // 所有的外部域都可跨域访问。 如果是localhost则很难配置，因为在跨域请求的时候，外部域的解析可能是localhost、127.0.0.1、主机名
                        .allowCredentials(true) // 是否支持跨域用户凭证
                        .allowedMethods("*") // 当前站点支持的跨域请求类型是什么
                        .maxAge(3600); // 超时时长设置为1小时。 时间单位是秒。
            }
        };
    }
}
```

## 也可以使用拦截器:代码如下

:::caution
这里不能使用allowedOriginsPattern("*")配置多个
但是可以使用`response.setHeader("Access-Control-Allow-Origin", request.getHeader("origin") );`设置动态请求头实现跨域
:::

```java
/**
 * @Author: Yangzhengqian
 * @Description:
 * @Date:Created time 2020/8/7 17:07
 * @Modified By:
 */
@Component
public class InterceptorCORS implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}

```

然后添加webmvcconfig:

```java

@Configuration
public class WebMvcConf implements WebMvcConfigurer {
 
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String filePath =File.separator + "HellohaoData" + File.separator;
        //和页面有关的静态目录都放在项目的static目录下
       //registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
        //上传的图片在D盘下的OTA目录下，访问路径如：http://localhost:8081/OTA/d3cf0281-bb7f-40e0-ab77-406db95ccf2c.jpg
        //其中OTA表示访问的前缀。"file:D:/OTA/"是文件真实的存储路径
        //registry.addResourceHandler("/test/**").addResourceLocations("file:C:/test/");
     
        //registry.addResourceHandler("/static/**")
        //        .addResourceLocations("classpath:/static/");
        registry.addResourceHandler("/links/**").addResourceLocations("file:"+filePath);

    }
    @Resource
    private InterceptorCORS interceptorCORS;


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //添加跨域
        registry.addInterceptor(interceptorCORS).addPathPatterns("/**");
    }
}
```

:::caution
注意:使用springsecurity时会出现跨域问题!在websecurityconfig上面加上.cors()方法!!!!!!
:::
​

[https://blog.csdn.net/weixin_45059597/article/details/107490252](https://blog.csdn.net/weixin_45059597/article/details/107490252)

## 使用过滤器

```java
package com.site.blog.filters;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    private CorsConfiguration buildConfig() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOriginPattern("*" );
        //corsConfiguration.addAllowedOrigin("http://192.168.72.132");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.setAllowCredentials(true);
        return corsConfiguration;
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // 配置所有请求
        source.registerCorsConfiguration("/**", buildConfig());
        return new CorsFilter(source);
    }
}
```

或者(自己手动写请求头,推荐上面那种)

```java
import org.springframework.context.annotation.Configuration;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "CorsFilter ")
@Configuration
public class CorsFilter implements Filter {
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, PUT");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        chain.doFilter(req, res);
    }
}
```
