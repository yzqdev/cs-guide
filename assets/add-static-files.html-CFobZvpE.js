import{_ as s,c as a,a as t,o as e}from"./app-C8DxhDIZ.js";const p={};function o(c,n){return e(),a("div",null,n[0]||(n[0]=[t(`<h1 id="添加静态文件" tabindex="-1"><a class="header-anchor" href="#添加静态文件"><span>添加静态文件</span></a></h1><h2 id="第一种-使用property文件" tabindex="-1"><a class="header-anchor" href="#第一种-使用property文件"><span>第一种,使用property文件</span></a></h2><div class="language-ini" data-highlighter="prismjs" data-ext="ini" data-title="ini"><pre><code><span class="line"><span class="token key attr-name">spring.mvc.static-path-pattern</span><span class="token punctuation">=</span><span class="token value attr-value">/static/**</span></span>
<span class="line"><span class="token key attr-name">spring.resources.static-locations</span><span class="token punctuation">=</span><span class="token value attr-value">classpath:/static/</span></span>
<span class="line"></span></code></pre></div><h2 id="第二种-使用自定义" tabindex="-1"><a class="header-anchor" href="#第二种-使用自定义"><span>第二种,使用自定义</span></a></h2><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"> </span>
<span class="line"> </span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">ResourceHandlerRegistry</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">WebMvcConfigurer</span></span><span class="token punctuation">;</span></span>
<span class="line"> </span>
<span class="line"><span class="token doc-comment comment">/**</span>
<span class="line"> * 静态资源映射</span>
<span class="line"> */</span></span>
<span class="line"><span class="token annotation punctuation">@Component</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyWebMvcConfig</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addResourceHandlers</span><span class="token punctuation">(</span><span class="token class-name">ResourceHandlerRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        registry<span class="token punctuation">.</span><span class="token function">addResourceHandler</span><span class="token punctuation">(</span><span class="token string">&quot;/static/**&quot;</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">addResourceLocations</span><span class="token punctuation">(</span><span class="token string">&quot;classpath:/static/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输入<a href="http://localhost:8080/static/java.png" target="_blank" rel="noopener noreferrer">http://localhost:8080/static/java.png</a>就可以访问了</p>`,6)]))}const l=s(p,[["render",o]]),r=JSON.parse('{"path":"/java-tutor/springboot/add-static-files.html","title":"添加静态文件","lang":"zh-CN","frontmatter":{"description":"添加静态文件 第一种,使用property文件 第二种,使用自定义 输入http://localhost:8080/static/java.png就可以访问了","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/add-static-files.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"添加静态文件"}],["meta",{"property":"og:description","content":"添加静态文件 第一种,使用property文件 第二种,使用自定义 输入http://localhost:8080/static/java.png就可以访问了"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"添加静态文件\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"第一种,使用property文件","slug":"第一种-使用property文件","link":"#第一种-使用property文件","children":[]},{"level":2,"title":"第二种,使用自定义","slug":"第二种-使用自定义","link":"#第二种-使用自定义","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.26,"words":77},"filePathRelative":"java-tutor/springboot/add-static-files.md","localizedDate":"2022年3月21日","autoDesc":true}');export{l as comp,r as data};
