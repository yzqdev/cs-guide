import{_ as t,c as e,o as a,d as r}from"./app-CbULZrmi.js";const o={},n=r(`<h1 id="添加静态文件" tabindex="-1"><a class="header-anchor" href="#添加静态文件"><span>添加静态文件</span></a></h1><h2 id="第一种-使用property文件" tabindex="-1"><a class="header-anchor" href="#第一种-使用property文件"><span>第一种,使用property文件</span></a></h2><pre><code class="language-ini">spring.mvc.static-path-pattern=/static/**
spring.resources.static-locations=classpath:/static/
</code></pre><h2 id="第二种-使用自定义" tabindex="-1"><a class="header-anchor" href="#第二种-使用自定义"><span>第二种,使用自定义</span></a></h2><pre><code class="language-java"> 
 
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
        registry.addResourceHandler(&quot;/static/**&quot;)
                .addResourceLocations(&quot;classpath:/static/&quot;);
    }
}
</code></pre><p>输入<a href="http://localhost:8080/static/java.png" target="_blank" rel="noopener noreferrer">http://localhost:8080/static/java.png</a>就可以访问了</p>`,6),i=[n];function s(c,p){return a(),e("div",null,i)}const d=t(o,[["render",s],["__file","add-static-files.html.vue"]]),h=JSON.parse('{"path":"/java-tutor/springboot/add-static-files.html","title":"添加静态文件","lang":"zh-CN","frontmatter":{"description":"添加静态文件 第一种,使用property文件 第二种,使用自定义 输入http://localhost:8080/static/java.png就可以访问了","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/add-static-files.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"添加静态文件"}],["meta",{"property":"og:description","content":"添加静态文件 第一种,使用property文件 第二种,使用自定义 输入http://localhost:8080/static/java.png就可以访问了"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"添加静态文件\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"第一种,使用property文件","slug":"第一种-使用property文件","link":"#第一种-使用property文件","children":[]},{"level":2,"title":"第二种,使用自定义","slug":"第二种-使用自定义","link":"#第二种-使用自定义","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.26,"words":77},"filePathRelative":"java-tutor/springboot/add-static-files.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,h as data};
