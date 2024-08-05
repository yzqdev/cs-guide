import{_ as e,c as a,o as t,d as n}from"./app-CbULZrmi.js";const r={},i=n(`<h1 id="java片段" tabindex="-1"><a class="header-anchor" href="#java片段"><span>java片段</span></a></h1><h2 id="java用法" tabindex="-1"><a class="header-anchor" href="#java用法"><span>java用法</span></a></h2><p><a href="https://runnable.run/archives/shou-ba-shou-jiang-ni-de-javamaven-xiang-mu-tong-guo-graalvm-da-bao-cheng-windows-ke-zhi-xing-cheng-xu#%E5%AE%89%E8%A3%85graalvm-jdk" target="_blank" rel="noopener noreferrer">https://runnable.run/archives/shou-ba-shou-jiang-ni-de-javamaven-xiang-mu-tong-guo-graalvm-da-bao-cheng-windows-ke-zhi-xing-cheng-xu#安装graalvm-jdk</a></p><h2 id="格式化字符串" tabindex="-1"><a class="header-anchor" href="#格式化字符串"><span>格式化字符串</span></a></h2><pre><code class="language-java"> String versionTxt=String.format(&quot;%s,%s,版本名称:%s 版本号:%s&quot;,v.getTitle(),v.getAppId(),v.getVersionName(),UniUtil.getAppVersion(v.getAppId()).get(&quot;code&quot;));
String ms = MessageFormat.format(&quot;{0,number,#.##}&quot;, 3.656);
</code></pre><h2 id="maven-bom" tabindex="-1"><a class="header-anchor" href="#maven-bom"><span>maven bom</span></a></h2><p><a href="https://www.baeldung.com/spring-maven-bom" target="_blank" rel="noopener noreferrer">https://www.baeldung.com/spring-maven-bom</a></p><h2 id="springboot" tabindex="-1"><a class="header-anchor" href="#springboot"><span>springboot</span></a></h2><p>spring api 版本控制 <a href="https://github.com/lkqm/spring-api-versioning" target="_blank" rel="noopener noreferrer">https://github.com/lkqm/spring-api-versioning</a></p><pre><code class="language-xml">  &lt;dependency&gt;
            &lt;groupId&gt;com.github.lkqm&lt;/groupId&gt;
            &lt;artifactId&gt;spring-api-versioning&lt;/artifactId&gt;
            &lt;version&gt;1.4.0&lt;/version&gt;
        &lt;/dependency&gt;

</code></pre><h2 id="java读取文件" tabindex="-1"><a class="header-anchor" href="#java读取文件"><span>java读取文件</span></a></h2><pre><code class="language-java">try(BufferedReader br = Files.newBufferedReader(Paths.get(&quot;testBufferedWriter.txt&quot;))){
    String inValue;
    while((inValue = br.readLine())!=null){
        System.out.println(&quot;Files.newBufferedReader=&quot;+inValue);
    }
}

List&lt;String&gt; lines = Files.readAllLines(Paths.get(&quot;testBufferedWriter.txt&quot;));

for(String line:lines)System.out.println(&quot;Files.readAllLines==&quot;+line);

try(BufferedWriter bw = Files.newBufferedWriter(Paths.get(&quot;testNewBufferedWriter.txt&quot;))){
    for(String d:data){
        bw.write(d);
        bw.newLine();

    }
}
</code></pre><h2 id="gradle-java编码" tabindex="-1"><a class="header-anchor" href="#gradle-java编码"><span>gradle java编码</span></a></h2><pre><code class="language-kotlin">allprojects {
  // 将构建文件统一输出到项目根目录下的 build 文件夹
  layout.buildDirectory = File(rootDir, &quot;build/\${path.replace(&#39;:&#39;, &#39;/&#39;)}&quot;)
  tasks.withType&lt;JavaCompile&gt; {
    options.encoding = &quot;UTF-8&quot;
  }
}

</code></pre>`,14),o=[i];function s(l,p){return t(),a("div",null,o)}const g=e(r,[["render",s],["__file","snippet.html.vue"]]),c=JSON.parse('{"path":"/cs-tips/java-tip/snippet.html","title":"java片段","lang":"zh-CN","frontmatter":{"description":"java片段 java用法 https://runnable.run/archives/shou-ba-shou-jiang-ni-de-javamaven-xiang-mu-tong-guo-graalvm-da-bao-cheng-windows-ke-zhi-xing-cheng-xu#安装graalvm-jdk 格式化字符串 maven bom...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/java-tip/snippet.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"java片段"}],["meta",{"property":"og:description","content":"java片段 java用法 https://runnable.run/archives/shou-ba-shou-jiang-ni-de-javamaven-xiang-mu-tong-guo-graalvm-da-bao-cheng-windows-ke-zhi-xing-cheng-xu#安装graalvm-jdk 格式化字符串 maven bom..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-15T01:13:35.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-15T01:13:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java片段\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-15T01:13:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"java用法","slug":"java用法","link":"#java用法","children":[]},{"level":2,"title":"格式化字符串","slug":"格式化字符串","link":"#格式化字符串","children":[]},{"level":2,"title":"maven bom","slug":"maven-bom","link":"#maven-bom","children":[]},{"level":2,"title":"springboot","slug":"springboot","link":"#springboot","children":[]},{"level":2,"title":"java读取文件","slug":"java读取文件","link":"#java读取文件","children":[]},{"level":2,"title":"gradle java编码","slug":"gradle-java编码","link":"#gradle-java编码","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1710465215000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":0.62,"words":187},"filePathRelative":"cs-tips/java-tip/snippet.md","localizedDate":"2023年5月25日","autoDesc":true}');export{g as comp,c as data};
