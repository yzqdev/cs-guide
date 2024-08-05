import{_ as e,c as t,o as n,d as r}from"./app-CbULZrmi.js";const i={},a=r(`<h1 id="spring-security" tabindex="-1"><a class="header-anchor" href="#spring-security"><span>spring-security</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p><a href="https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter" target="_blank" rel="noopener noreferrer">https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter</a></p></div><p>用过<code>WebSecurityConfigurerAdapter</code>的都知道对<strong>Spring Security</strong>十分重要，总管<strong>Spring Security</strong>的配置体系。但是马上这个类要废了，你没有看错，这个类将在5.7版本被<code>@Deprecated</code>所标记了，未来这个类将被移除。</p><p><a href="https://github.com/spring-projects/spring-security/issues/10822" target="_blank" rel="noopener noreferrer">https://github.com/spring-projects/spring-security/issues/10822</a></p><h2 id="httpsecurity语法对比" tabindex="-1"><a class="header-anchor" href="#httpsecurity语法对比"><span>HttpSecurity语法对比</span></a></h2><p>old：</p><pre><code class="language-java">@Configuration
static class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .antMatcher(&quot;/**&quot;)
            .authorizeRequests(authorize -&gt; authorize
                    .anyRequest().authenticated()
            );
    }
}
</code></pre><p>new：</p><pre><code class="language-java">@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
            .antMatcher(&quot;/**&quot;)
            .authorizeRequests(authorize -&gt; authorize
                    .anyRequest().authenticated()
            )
            .build();
}
</code></pre><p>使用<code>WebSecurity.ignoring()</code>忽略某些URL请求，这些请求将被<strong>Spring Security</strong>忽略，这意味着这些URL将有受到 CSRF、XSS、Clickjacking 等攻击的可能。以下示例仅仅作为演示，请勿使用在生产环境。</p><p>old：</p><pre><code class="language-java">@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web) {
        // 仅仅作为演示
        web.ignoring().antMatchers(&quot;/ignore1&quot;, &quot;/ignore2&quot;);
    }

}
</code></pre><p>new：</p><pre><code class="language-java">@Configuration
public class SecurityConfiguration {

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        // 仅仅作为演示
        return (web) -&gt; web.ignoring().antMatchers(&quot;/ignore1&quot;, &quot;/ignore2&quot;);
    }

}
</code></pre><blockquote><p>如果你需要忽略URL，请考虑通过<code>HttpSecurity.authorizeHttpRequests</code>的<code>permitAll</code>来实现。</p></blockquote><p><code>AuthenticationManager</code>配置主要分为全局的（Global ）、本地的（Local）。</p><p>old:</p><pre><code class="language-java">@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication();
    }
}
</code></pre><p>上面是通过<code>WebSecurityConfigurerAdapter</code>开启的是本地配置。开启全局配置需要覆写其<code>authenticationManagerBean()</code>方法并标记为Bean:</p><pre><code class="language-java">       @Bean(  name=&quot;myAuthenticationManager&quot;)
       @Override
       public AuthenticationManager authenticationManagerBean() throws Exception {
           return super.authenticationManagerBean();
       }
</code></pre><p>new:</p><p>本地配置通过<code>HttpSecurity.authenticationManager</code>实现：</p><pre><code class="language-java">@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests((authz) -&gt; authz
                .anyRequest().authenticated()
            )
            .httpBasic(withDefaults())
            .authenticationManager(new CustomAuthenticationManager());
    }

}
</code></pre><p>全局配置摆脱了依赖<code>WebSecurityConfigurerAdapter.authenticationManagerBean()</code>方法，只需要定义一个<code>AuthenticationManager</code>类型的Bean即可：</p><pre><code class="language-java">    @Bean
    AuthenticationManager ldapAuthenticationManager(
            BaseLdapPathContextSource contextSource) {
        LdapBindAuthenticationManagerFactory factory = 
            new LdapBindAuthenticationManagerFactory(contextSource);
        factory.setUserDnPatterns(&quot;uid={0},ou=people&quot;);
        factory.setUserDetailsContextMapper(new PersonContextMapper());
        return factory.createAuthenticationManager();
    }
</code></pre><p>当然还可以通过自定义<code>GlobalAuthenticationConfigurerAdapter</code>并注入<strong>Spring IoC</strong>来修改<code>AuthenticationManagerBuilder</code>，不限制数量，但是要注意有排序问题。相关的思维导图：</p><p><img src="https:////upload-images.jianshu.io/upload_images/15440995-c543c03c897c15a1.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp" alt="img"></p>`,27),o=[a];function c(p,u){return n(),t("div",null,o)}const g=e(i,[["render",c],["__file","security.html.vue"]]),d=JSON.parse('{"path":"/java-tutor/springboot/upgrade/security.html","title":"spring-security","lang":"zh-CN","frontmatter":{"description":"spring-security 提示 https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter 用过WebSecurityConfigurerAdapter的都知道对Spring Security十分重要，总管Spring Sec...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/upgrade/security.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"spring-security"}],["meta",{"property":"og:description","content":"spring-security 提示 https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter 用过WebSecurityConfigurerAdapter的都知道对Spring Security十分重要，总管Spring Sec..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https:////upload-images.jianshu.io/upload_images/15440995-c543c03c897c15a1.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-18T06:54:45.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-06-18T06:54:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"spring-security\\",\\"image\\":[\\"https:////upload-images.jianshu.io/upload_images/15440995-c543c03c897c15a1.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp\\"],\\"dateModified\\":\\"2022-06-18T06:54:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"HttpSecurity语法对比","slug":"httpsecurity语法对比","link":"#httpsecurity语法对比","children":[]}],"git":{"createdTime":1653319261000,"updatedTime":1655535285000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":1.52,"words":456},"filePathRelative":"java-tutor/springboot/upgrade/security.md","localizedDate":"2022年5月23日","autoDesc":true}');export{g as comp,d as data};
