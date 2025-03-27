import{_ as a,c as s,a as t,o as p}from"./app-C8DxhDIZ.js";const e={};function o(c,n){return p(),s("div",null,n[0]||(n[0]=[t(`<h1 id="spring-security" tabindex="-1"><a class="header-anchor" href="#spring-security"><span>spring-security</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p><a href="https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter" target="_blank" rel="noopener noreferrer">https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter</a></p></div><p>用过<code>WebSecurityConfigurerAdapter</code>的都知道对<strong>Spring Security</strong>十分重要，总管<strong>Spring Security</strong>的配置体系。但是马上这个类要废了，你没有看错，这个类将在5.7版本被<code>@Deprecated</code>所标记了，未来这个类将被移除。</p><p><a href="https://github.com/spring-projects/spring-security/issues/10822" target="_blank" rel="noopener noreferrer">https://github.com/spring-projects/spring-security/issues/10822</a></p><h2 id="httpsecurity语法对比" tabindex="-1"><a class="header-anchor" href="#httpsecurity语法对比"><span>HttpSecurity语法对比</span></a></h2><p>old：</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token annotation punctuation">@Configuration</span></span>
<span class="line"><span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SecurityConfig</span> <span class="token keyword">extends</span> <span class="token class-name">WebSecurityConfigurerAdapter</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span></span>
<span class="line">        http</span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">antMatcher</span><span class="token punctuation">(</span><span class="token string">&quot;/**&quot;</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">authorizeRequests</span><span class="token punctuation">(</span>authorize <span class="token operator">-&gt;</span> authorize</span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>new：</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token annotation punctuation">@Bean</span></span>
<span class="line"><span class="token class-name">SecurityFilterChain</span> <span class="token function">filterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> http</span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">antMatcher</span><span class="token punctuation">(</span><span class="token string">&quot;/**&quot;</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">authorizeRequests</span><span class="token punctuation">(</span>authorize <span class="token operator">-&gt;</span> authorize</span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>使用<code>WebSecurity.ignoring()</code>忽略某些URL请求，这些请求将被<strong>Spring Security</strong>忽略，这意味着这些URL将有受到 CSRF、XSS、Clickjacking 等攻击的可能。以下示例仅仅作为演示，请勿使用在生产环境。</p><p>old：</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token annotation punctuation">@Configuration</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecurityConfiguration</span> <span class="token keyword">extends</span> <span class="token class-name">WebSecurityConfigurerAdapter</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">WebSecurity</span> web<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 仅仅作为演示</span></span>
<span class="line">        web<span class="token punctuation">.</span><span class="token function">ignoring</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">&quot;/ignore1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/ignore2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>new：</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token annotation punctuation">@Configuration</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecurityConfiguration</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Bean</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">WebSecurityCustomizer</span> <span class="token function">webSecurityCustomizer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 仅仅作为演示</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token punctuation">(</span>web<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> web<span class="token punctuation">.</span><span class="token function">ignoring</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">&quot;/ignore1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/ignore2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><blockquote><p>如果你需要忽略URL，请考虑通过<code>HttpSecurity.authorizeHttpRequests</code>的<code>permitAll</code>来实现。</p></blockquote><p><code>AuthenticationManager</code>配置主要分为全局的（Global ）、本地的（Local）。</p><p>old:</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token annotation punctuation">@Configuration</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecurityConfiguration</span> <span class="token keyword">extends</span> <span class="token class-name">WebSecurityConfigurerAdapter</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span></span>
<span class="line">        auth<span class="token punctuation">.</span><span class="token function">jdbcAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>上面是通过<code>WebSecurityConfigurerAdapter</code>开启的是本地配置。开启全局配置需要覆写其<code>authenticationManagerBean()</code>方法并标记为Bean:</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">       <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>  name<span class="token operator">=</span><span class="token string">&quot;myAuthenticationManager&quot;</span><span class="token punctuation">)</span></span>
<span class="line">       <span class="token annotation punctuation">@Override</span></span>
<span class="line">       <span class="token keyword">public</span> <span class="token class-name">AuthenticationManager</span> <span class="token function">authenticationManagerBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span></span>
<span class="line">           <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">authenticationManagerBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">       <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>new:</p><p>本地配置通过<code>HttpSecurity.authenticationManager</code>实现：</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token annotation punctuation">@Configuration</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecurityConfiguration</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Bean</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">filterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span></span>
<span class="line">        http</span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span><span class="token punctuation">(</span>authz<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> authz</span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">httpBasic</span><span class="token punctuation">(</span><span class="token function">withDefaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">authenticationManager</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CustomAuthenticationManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>全局配置摆脱了依赖<code>WebSecurityConfigurerAdapter.authenticationManagerBean()</code>方法，只需要定义一个<code>AuthenticationManager</code>类型的Bean即可：</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">    <span class="token annotation punctuation">@Bean</span></span>
<span class="line">    <span class="token class-name">AuthenticationManager</span> <span class="token function">ldapAuthenticationManager</span><span class="token punctuation">(</span></span>
<span class="line">            <span class="token class-name">BaseLdapPathContextSource</span> contextSource<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">LdapBindAuthenticationManagerFactory</span> factory <span class="token operator">=</span> </span>
<span class="line">            <span class="token keyword">new</span> <span class="token class-name">LdapBindAuthenticationManagerFactory</span><span class="token punctuation">(</span>contextSource<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        factory<span class="token punctuation">.</span><span class="token function">setUserDnPatterns</span><span class="token punctuation">(</span><span class="token string">&quot;uid={0},ou=people&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        factory<span class="token punctuation">.</span><span class="token function">setUserDetailsContextMapper</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PersonContextMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> factory<span class="token punctuation">.</span><span class="token function">createAuthenticationManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>当然还可以通过自定义<code>GlobalAuthenticationConfigurerAdapter</code>并注入<strong>Spring IoC</strong>来修改<code>AuthenticationManagerBuilder</code>，不限制数量，但是要注意有排序问题。相关的思维导图：</p><p><img src="https:////upload-images.jianshu.io/upload_images/15440995-c543c03c897c15a1.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp" alt="img"></p>`,27)]))}const l=a(e,[["render",o]]),u=JSON.parse('{"path":"/java-tutor/springboot/upgrade/security.html","title":"spring-security","lang":"zh-CN","frontmatter":{"description":"spring-security 提示 https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter 用过WebSecurityConfigurerAdapter的都知道对Spring Security十分重要，总管Spring Sec...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/upgrade/security.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"spring-security"}],["meta",{"property":"og:description","content":"spring-security 提示 https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter 用过WebSecurityConfigurerAdapter的都知道对Spring Security十分重要，总管Spring Sec..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https:////upload-images.jianshu.io/upload_images/15440995-c543c03c897c15a1.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-18T06:54:45.000Z"}],["meta",{"property":"article:modified_time","content":"2022-06-18T06:54:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"spring-security\\",\\"image\\":[\\"https:////upload-images.jianshu.io/upload_images/15440995-c543c03c897c15a1.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp\\"],\\"dateModified\\":\\"2022-06-18T06:54:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"HttpSecurity语法对比","slug":"httpsecurity语法对比","link":"#httpsecurity语法对比","children":[]}],"git":{"createdTime":1653319261000,"updatedTime":1655535285000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.52,"words":456},"filePathRelative":"java-tutor/springboot/upgrade/security.md","localizedDate":"2022年5月23日","autoDesc":true}');export{l as comp,u as data};
