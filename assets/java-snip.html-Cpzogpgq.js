import{_ as t,c as a,o as e,d as n}from"./app-CbULZrmi.js";const o={},i=n(`<h1 id="一些java常用的片段" tabindex="-1"><a class="header-anchor" href="#一些java常用的片段"><span>一些java常用的片段</span></a></h1><h2 id="更改java版本" tabindex="-1"><a class="header-anchor" href="#更改java版本"><span>更改java版本</span></a></h2><p>我想用java17怎么办呢? ​</p><p>在plugin里面加这个,就可以了</p><pre><code class="language-xml">         &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-compiler-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.8.1&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;source&gt;17&lt;/source&gt;
                    &lt;target&gt;17&lt;/target&gt;
                    &lt;encoding&gt;utf-8&lt;/encoding&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
</code></pre><h2 id="时间转换" tabindex="-1"><a class="header-anchor" href="#时间转换"><span>时间转换</span></a></h2><pre><code class="language-java">1.Timestamp 转 LocalDateTime 
Timestamp time = Timestamp.from(Instant.now());
LocalDateTime localDateTime = time.toLocalDateTime();
2.LocalDateTime  转 Timestamp
 DateTimeFormatter dtf = DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd&quot;);
Timestamp time = Timestamp.valueOf(LocalDateTime.now().format(dtf);
</code></pre>`,7),r=[i];function l(p,c){return e(),a("div",null,r)}const m=t(o,[["render",l],["__file","java-snip.html.vue"]]),d=JSON.parse('{"path":"/java-tutor/java-tips/java-snip.html","title":"一些java常用的片段","lang":"zh-CN","frontmatter":{"description":"一些java常用的片段 更改java版本 我想用java17怎么办呢? ​ 在plugin里面加这个,就可以了 时间转换","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/java-tips/java-snip.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"一些java常用的片段"}],["meta",{"property":"og:description","content":"一些java常用的片段 更改java版本 我想用java17怎么办呢? ​ 在plugin里面加这个,就可以了 时间转换"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T15:17:32.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T15:17:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"一些java常用的片段\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T15:17:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"更改java版本","slug":"更改java版本","link":"#更改java版本","children":[]},{"level":2,"title":"时间转换","slug":"时间转换","link":"#时间转换","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1649171852000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.29,"words":88},"filePathRelative":"java-tutor/java-tips/java-snip.md","localizedDate":"2022年3月21日","autoDesc":true}');export{m as comp,d as data};
