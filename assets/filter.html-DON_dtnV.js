import{_ as e,c as t,o as r,d as n}from"./app-CbULZrmi.js";const i={},a=n(`<h1 id="过滤器" tabindex="-1"><a class="header-anchor" href="#过滤器"><span>过滤器</span></a></h1><p>SpringMVC中的Filter两个基类GenericFilterBean与OncePerRequestFilter</p><h2 id="定义filter" tabindex="-1"><a class="header-anchor" href="#定义filter"><span>定义Filter</span></a></h2><pre><code class="language-java">@Component
@Order(1)
public class TransactionFilter implements Filter {

    @Override
    public void doFilter(
      ServletRequest request, 
      ServletResponse response, 
      FilterChain chain) throws ServletException {
 
        HttpServletRequest req = (HttpServletRequest) request;
        LOG.info(
          &quot;Starting a transaction for req : {}&quot;, 
          req.getRequestURI());
 
        chain.doFilter(request, response);
        LOG.info(
          &quot;Committing a transaction for req : {}&quot;, 
          req.getRequestURI());
    }

    // other methods 
}


</code></pre><h2 id="filterregistrationbean" tabindex="-1"><a class="header-anchor" href="#filterregistrationbean"><span>FilterRegistrationBean</span></a></h2><pre><code class="language-java">@Bean
public FilterRegistrationBean&lt;RequestResponseLoggingFilter&gt; loggingFilter(){
    FilterRegistrationBean&lt;RequestResponseLoggingFilter&gt; registrationBean 
      = new FilterRegistrationBean&lt;&gt;();
        
    registrationBean.setFilter(new RequestResponseLoggingFilter());
    registrationBean.addUrlPatterns(&quot;/users/*&quot;);
    registrationBean.setOrder(2);
        
    return registrationBean;    
}
</code></pre>`,6),o=[a];function s(l,c){return r(),t("div",null,o)}const g=e(i,[["render",s],["__file","filter.html.vue"]]),d=JSON.parse('{"path":"/java-tutor/springboot/tips/filter.html","title":"过滤器","lang":"zh-CN","frontmatter":{"description":"过滤器 SpringMVC中的Filter两个基类GenericFilterBean与OncePerRequestFilter 定义Filter FilterRegistrationBean","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/tips/filter.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"过滤器"}],["meta",{"property":"og:description","content":"过滤器 SpringMVC中的Filter两个基类GenericFilterBean与OncePerRequestFilter 定义Filter FilterRegistrationBean"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-11T09:37:51.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-06-11T09:37:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"过滤器\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-11T09:37:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"定义Filter","slug":"定义filter","link":"#定义filter","children":[]},{"level":2,"title":"FilterRegistrationBean","slug":"filterregistrationbean","link":"#filterregistrationbean","children":[]}],"git":{"createdTime":1655535285000,"updatedTime":1718098671000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.28,"words":83},"filePathRelative":"java-tutor/springboot/tips/filter.md","localizedDate":"2022年6月18日","autoDesc":true}');export{g as comp,d as data};
