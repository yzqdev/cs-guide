# 添加静态文件

## 第一种,使用property文件

```java
spring.mvc.static-path-pattern=/static/**
spring.resources.static-locations=classpath:/static/
```

## 第二种,使用自定义

```java
 
 
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
 
/**
 * 静态资源映射
 */
@Component
public class MyWebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
    }
}
```

输入[http://localhost:8080/static/java.png](http://localhost:8080/static/java.png)就可以访问了
