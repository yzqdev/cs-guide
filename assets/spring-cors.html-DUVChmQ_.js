import{_ as e,c as t,o as n,d as r}from"./app-CbULZrmi.js";const o={},s=r(`<h1 id="spring跨域处理" tabindex="-1"><a class="header-anchor" href="#spring跨域处理"><span>spring跨域处理</span></a></h1><div class="hint-container warning"><p class="hint-container-title">注意</p><p>注意:使用springsecurity时会出现跨域问题!在websecurityconfig上面加上.cors()方法!!!!!!</p></div><p>​</p><p><a href="https://blog.csdn.net/weixin_45059597/article/details/107490252" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/weixin_45059597/article/details/107490252</a></p><h2 id="使用过滤器" tabindex="-1"><a class="header-anchor" href="#使用过滤器"><span>使用过滤器</span></a></h2><p>过滤器其实不是spring管理的,而是servelet管理的,常用的<code>GenericFilterBean</code>,<code>OncePerRequestFilter</code>,spring管理的Interceptor</p><h3 id="第一种" tabindex="-1"><a class="header-anchor" href="#第一种"><span>第一种</span></a></h3><pre><code class="language-java"> 

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    private CorsConfiguration buildConfig() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOriginPattern(&quot;*&quot; );
        //corsConfiguration.addAllowedOrigin(&quot;http://192.168.72.132&quot;);
        corsConfiguration.addAllowedHeader(&quot;*&quot;);
        corsConfiguration.addAllowedMethod(&quot;*&quot;);
        corsConfiguration.setAllowCredentials(true);
        return corsConfiguration;
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // 配置所有请求
        source.registerCorsConfiguration(&quot;/**&quot;, buildConfig());
        return new CorsFilter(source);
    }
}
</code></pre><h3 id="第二种写法" tabindex="-1"><a class="header-anchor" href="#第二种写法"><span>第二种写法</span></a></h3><pre><code class="language-java">@WebFilter(value = &quot;/*&quot;)
@Component
public class CorsFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        httpServletResponse.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, httpServletRequest.getHeader(HttpHeaders.ORIGIN));
        httpServletResponse.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, &quot;Origin, X-Requested-With, Content-Type, Accept&quot;);
        httpServletResponse.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, &quot;GET, POST, PUT, DELETE, OPTIONS&quot;);
        httpServletResponse.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, &quot;true&quot;);
        httpServletResponse.setHeader(HttpHeaders.ACCESS_CONTROL_MAX_AGE, &quot;3600&quot;);

        if (!CorsUtils.isPreFlightRequest(httpServletRequest)) {
            chain.doFilter(httpServletRequest, httpServletResponse);
        }
    }

}
</code></pre><p>或者(自己手动写请求头,推荐上面那种)</p><pre><code class="language-java">import org.springframework.context.annotation.Configuration;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = &quot;CorsFilter &quot;)
@Configuration
public class CorsFilter implements Filter {
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader(&quot;Access-Control-Allow-Origin&quot;,&quot;*&quot;);
        response.setHeader(&quot;Access-Control-Allow-Credentials&quot;, &quot;true&quot;);
        response.setHeader(&quot;Access-Control-Allow-Methods&quot;, &quot;POST, GET, PATCH, DELETE, PUT&quot;);
        response.setHeader(&quot;Access-Control-Max-Age&quot;, &quot;3600&quot;);
        response.setHeader(&quot;Access-Control-Allow-Headers&quot;, &quot;Origin, X-Requested-With, Content-Type, Accept&quot;);
        chain.doFilter(req, res);
    }
}
</code></pre><h2 id="也可以使用拦截器-代码如下" tabindex="-1"><a class="header-anchor" href="#也可以使用拦截器-代码如下"><span>也可以使用拦截器:代码如下</span></a></h2><div class="hint-container warning"><p class="hint-container-title">注意</p><p>这里不能使用allowedOriginsPattern(&quot;*&quot;)配置多个 但是可以使用<code>response.setHeader(&quot;Access-Control-Allow-Origin&quot;, request.getHeader(&quot;origin&quot;) );</code>设置动态请求头实现跨域</p></div><pre><code class="language-java">/**
 * @Author: Yangzhengqian
 * @Description:
 * @Date:Created time 2020/8/7 17:07
 * @Modified By:
 */
@Component
public class InterceptorCORS implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        response.setHeader(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;);
        response.setHeader(&quot;Access-Control-Allow-Methods&quot;, &quot;*&quot;);
        response.setHeader(&quot;Access-Control-Max-Age&quot;, &quot;3600&quot;);
        response.setHeader(&quot;Access-Control-Allow-Headers&quot;,
                &quot;Origin, X-Requested-With, Content-Type, Accept&quot;);
                 //浏览器会先发送一个试探请求OPTIONS,然后才会发送真正的请求，为了避免拦截器拦截两次请求，所以不能让OPTIONS请求通过
         if (request.getMethod().equals(HttpMethod.OPTIONS.name())){
            response.setStatus(HttpServletResponse.SC_OK);
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}

</code></pre><p>然后添加webmvcconfig:</p><pre><code class="language-java">
@Configuration
public class WebMvcConf implements WebMvcConfigurer {
 
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String filePath =File.separator + &quot;HellohaoData&quot; + File.separator;
        //和页面有关的静态目录都放在项目的static目录下
       //registry.addResourceHandler(&quot;/static/**&quot;).addResourceLocations(&quot;classpath:/static/&quot;);
        //上传的图片在D盘下的OTA目录下，访问路径如：http://localhost:8081/OTA/d3cf0281-bb7f-40e0-ab77-406db95ccf2c.jpg
        //其中OTA表示访问的前缀。&quot;file:D:/OTA/&quot;是文件真实的存储路径
        //registry.addResourceHandler(&quot;/test/**&quot;).addResourceLocations(&quot;file:C:/test/&quot;);
     
        //registry.addResourceHandler(&quot;/static/**&quot;)
        //        .addResourceLocations(&quot;classpath:/static/&quot;);
        registry.addResourceHandler(&quot;/links/**&quot;).addResourceLocations(&quot;file:&quot;+filePath);

    }
    @Resource
    private InterceptorCORS interceptorCORS;


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //添加跨域
        registry.addInterceptor(interceptorCORS).addPathPatterns(&quot;/**&quot;);
    }
}
</code></pre><h2 id="官网使用addcorsmapping-但是限制太多-不推荐用" tabindex="-1"><a class="header-anchor" href="#官网使用addcorsmapping-但是限制太多-不推荐用"><span>官网使用addCorsMapping,但是限制太多,不推荐用</span></a></h2><div class="hint-container warning"><p class="hint-container-title">注意</p><p>注意:addCorsMapping 会被interceptor覆盖,后续如果添加自定义的拦截器（包括Spring security），addCorsMappings方法实现的统一跨域配置就会失效，其原因在于请求经过的先后顺序：</p><blockquote><p>当请求到来时会先进入拦截器中，而不是进入Mapping映射中，所以返回的头信息中并没有配置的跨域信息。浏览器就会报跨域异常</p></blockquote></div><p><a href="https://docs.spring.io/spring-framework/docs/5.3.9/reference/html/web.html#mvc-cors-global" target="_blank" rel="noopener noreferrer">链接</a>​ 这里可以使用allowedOriginsPattern(&quot;*&quot;)配置多个</p><pre><code class="language-java">@Configuration(proxyBeanMethods = false)
public class MyConfiguration implements WebMvcConfigurer  {

    
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping(&quot;/api/**&quot;)
                .allowedOrigins(&quot;*&quot;) // 所有的外部域都可跨域访问。 如果是localhost则很难配置，因为在跨域请求的时候，外部域的解析可能是localhost、127.0.0.1、主机名
                        .allowCredentials(true) // 是否支持跨域用户凭证
                        .allowedMethods(&quot;*&quot;) // 当前站点支持的跨域请求类型是什么
                        .maxAge(3600); // 超时时长设置为1小时。 时间单位是秒。
            }
        };
    
}
</code></pre>`,21),i=[s];function a(p,l){return n(),t("div",null,i)}const d=e(o,[["render",a],["__file","spring-cors.html.vue"]]),u=JSON.parse('{"path":"/java-tutor/springboot/spring-cors.html","title":"spring跨域处理","lang":"zh-CN","frontmatter":{"description":"spring跨域处理 注意 注意:使用springsecurity时会出现跨域问题!在websecurityconfig上面加上.cors()方法!!!!!! ​ https://blog.csdn.net/weixin_45059597/article/details/107490252 使用过滤器 过滤器其实不是spring管理的,而是servel...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/spring-cors.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"spring跨域处理"}],["meta",{"property":"og:description","content":"spring跨域处理 注意 注意:使用springsecurity时会出现跨域问题!在websecurityconfig上面加上.cors()方法!!!!!! ​ https://blog.csdn.net/weixin_45059597/article/details/107490252 使用过滤器 过滤器其实不是spring管理的,而是servel..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-21T03:08:27.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-21T03:08:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"spring跨域处理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-21T03:08:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"使用过滤器","slug":"使用过滤器","link":"#使用过滤器","children":[{"level":3,"title":"第一种","slug":"第一种","link":"#第一种","children":[]},{"level":3,"title":"第二种写法","slug":"第二种写法","link":"#第二种写法","children":[]}]},{"level":2,"title":"也可以使用拦截器:代码如下","slug":"也可以使用拦截器-代码如下","link":"#也可以使用拦截器-代码如下","children":[]},{"level":2,"title":"官网使用addCorsMapping,但是限制太多,不推荐用","slug":"官网使用addcorsmapping-但是限制太多-不推荐用","link":"#官网使用addcorsmapping-但是限制太多-不推荐用","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1710990507000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":2.9,"words":870},"filePathRelative":"java-tutor/springboot/spring-cors.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,u as data};
