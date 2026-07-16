---
order: 5
---

# 静态资源映射

> Spring Boot 中配置静态文件访问的多种方式。

## 什么是静态资源？

静态资源是指不需要服务器端处理就能直接返回给客户端的文件，如：

| 类型 | 示例 |
|------|------|
| HTML | `index.html`、`about.html` |
| CSS | `style.css`、`bootstrap.min.css` |
| JavaScript | `app.js`、`jquery.js` |
| 图片 | `logo.png`、`banner.jpg`、`icon.svg` |
| 字体 | `roboto.woff2`、`iconfont.ttf` |

## 默认静态资源路径

Spring Boot 默认从以下目录提供静态文件：

```
classpath:/META-INF/resources/
classpath:/resources/
classpath:/static/
classpath:/public/
```

只要将文件放在 `src/main/resources/static/` 目录下，就可以直接访问：

```
src/main/resources/static/
├── css/
│   └── style.css
├── js/
│   └── app.js
├── images/
│   └── logo.png
└── index.html
```

访问 `http://localhost:8080/css/style.css` 即可获取。

## 方式一：配置文件（application.properties）

```properties
# 自定义静态资源访问路径前缀
spring.mvc.static-path-pattern=/static/**

# 指定静态资源目录位置（多个用逗号分隔）
spring.web.resources.static-locations=classpath:/static/,file:./uploads/

# 禁用默认的静态资源路径
spring.web.resources.add-mappings=false
```

访问 `http://localhost:8080/static/java.png` 即可映射到 `classpath:/static/java.png`。

## 方式二：Java 配置类

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 映射 classpath 下的静态资源
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");

        // 映射外部目录（如上传文件）
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:./uploads/");

        // 映射多个路径
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("classpath:/static/", "classpath:/public/");
    }
}
```

## 方式三：外部文件目录映射

上传的文件通常保存在服务器本地磁盘，需要映射才能访问：

```java
@Configuration
public class FileUploadConfig implements WebMvcConfigurer {

    @Value("${file.upload.path}")
    private String uploadPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 将 /files/** 映射到本地文件系统目录
        registry.addResourceHandler("/files/**")
                .addResourceLocations("file:" + uploadPath);
    }
}
```

```properties
# application.properties
file.upload.path=./uploads/
```

## 资源缓存策略

```java
@Configuration
public class CacheConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS)
                        .cachePublic());
    }
}
```

## 浏览器缓存示例

```java
@Configuration
public class ResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(3600)  // 缓存 1 小时（秒）
                .resourceChain(true)   // 启用资源链
                .addResolver(new VersionResourceResolver()
                        .addContentVersionStrategy("/**"));
    }
}
```

## 常见问题

### 1. 访问 404

```bash
# 检查是否正确配置
# 确保文件在正确的目录下
# 注意路径区分大小写
```

### 2. 与控制器路由冲突

```java
// 如果控制器有 @RequestMapping("/static/**")，会覆盖静态资源
// 建议将静态资源路径和 API 路径区分开
// 静态资源：/static/**
// API：/api/**
```

### 3. 修改后不生效

```bash
# 清理缓存后重新启动
mvn clean package
# 或清空浏览器缓存
```