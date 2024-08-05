import{_ as e,c as t,o as a,d as n}from"./app-CbULZrmi.js";const r="/cs-guide/assets/maven-version-Bc4gNG4S.png",o="/cs-guide/assets/maven-index-IH0z2WjU.webp",l={},s=n(`<h1 id="添加镜像源" tabindex="-1"><a class="header-anchor" href="#添加镜像源"><span>添加镜像源</span></a></h1><h2 id="全局镜像源" tabindex="-1"><a class="header-anchor" href="#全局镜像源"><span>全局镜像源</span></a></h2><p>maven的默认配置文件在 <code>$home/.m2/settings.xml</code> 需要自己从maven配置文件(maven/conf/settings.xml)复制过来 参见阿里云的依赖教程 <a href="https://maven.aliyun.com/mvn/guide" target="_blank" rel="noopener noreferrer">https://maven.aliyun.com/mvn/guide</a></p><pre><code class="language-xml"># 加入如下代码
# 这是本地储存依赖的位置
&lt;localRepository&gt;D:\\configuration\\repomaven&lt;/localRepository&gt;
# 加入阿里镜像源
  &lt;mirror&gt;
      &lt;id&gt;aliyunmaven&lt;/id&gt;
      &lt;mirrorOf&gt;*,!papermc-repo,!spigotmc-repo,!placeholderapi,!citizens-repo,!jitpack.io,!dmulloy2-repo&lt;/mirrorOf&gt;
      &lt;name&gt;阿里云公共仓库&lt;/name&gt;

      &lt;url&gt;https://maven.aliyun.com/repository/public&lt;/url&gt;
    &lt;/mirror&gt;
</code></pre><h2 id="单项目配置" tabindex="-1"><a class="header-anchor" href="#单项目配置"><span>单项目配置</span></a></h2><p>在项目的pom.xml中添加类似下面的</p><pre><code class="language-xml">&lt;repositories&gt;
    &lt;repository&gt;
        &lt;id&gt;aliyunmaven&lt;/id&gt;
        &lt;url&gt;https://maven.aliyun.com/repository/public&lt;/url&gt;
    &lt;/repository&gt;
&lt;/repositories&gt;
</code></pre><h2 id="版本管理" tabindex="-1"><a class="header-anchor" href="#版本管理"><span>版本管理</span></a></h2><p>maven其实也可以使用版本范围<br><img src="`+r+`" alt="版本"></p><p>因为JSON协议以及fastjson库的兼容性和稳定性都非常好，所以才可以考虑自动升级到最新版本，pom.xml中依赖配置这样写，将自动引用版本大于等于1.2.60的fastjson</p><pre><code class="language-xml">&lt;dependency&gt;
    &lt;groupId&gt;com.alibaba&lt;/groupId&gt;
    &lt;artifactId&gt;fastjson&lt;/artifactId&gt;
    &lt;version&gt;[1.2.60, )&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><p>注意<code>[1.2.60, )</code>这种方式会下载1.2.60到最新版直接所有的包的索引,强迫症患者慎用</p><p><img src="`+o+`" alt="索引"></p><h2 id="指定maven中jdk版本" tabindex="-1"><a class="header-anchor" href="#指定maven中jdk版本"><span>指定maven中jdk版本</span></a></h2><h3 id="方法一" tabindex="-1"><a class="header-anchor" href="#方法一"><span>方法一</span></a></h3><pre><code class="language-xml">&lt;properties&gt;
 &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
 &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
 &lt;maven.test.skip&gt;true&lt;/maven.test.skip&gt;
&lt;/properties&gt;
</code></pre><h3 id="方法二" tabindex="-1"><a class="header-anchor" href="#方法二"><span>方法二</span></a></h3><pre><code class="language-xml">
&lt;build&gt;
    &lt;plugins&gt;
        &lt;plugin&gt;
            &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
            &lt;artifactId&gt;maven-compiler-plugin&lt;/artifactId&gt;
            &lt;configuration&gt;
                &lt;source&gt;17&lt;/source&gt;
                &lt;target&gt;17&lt;/target&gt;
            &lt;/configuration&gt;
        &lt;/plugin&gt;
    &lt;/plugins&gt;
&lt;/build&gt;
</code></pre><p>对于java9以上,可以用新的方法</p><pre><code class="language-xml">&lt;properties&gt;
    &lt;maven.compiler.release&gt;17&lt;/maven.compiler.release&gt;
&lt;/properties&gt;
</code></pre><h3 id="本地maven设置" tabindex="-1"><a class="header-anchor" href="#本地maven设置"><span>本地maven设置</span></a></h3><p>我们也可以设置本地的maven的配置，一劳永逸。 在settings.xml中配置，可以找到如下的配置模式 这里就是maven自带的配置样式，根据这个我们改写为17</p><pre><code class="language-xml">&lt;profile&gt;
    &lt;id&gt;jdk-17&lt;/id&gt;
    &lt;activation&gt;
     &lt;activeByDefault&gt;true&lt;/activeByDefault&gt;
     &lt;jdk&gt;17&lt;/jdk&gt;
    &lt;/activation&gt;
    &lt;properties&gt;
     &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
     &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
     &lt;maven.compiler.compilerVersion&gt;17&lt;/maven.compiler.compilerVersion&gt;
    &lt;/properties&gt;
&lt;/profile&gt;
</code></pre><h2 id="vue项目添加到springboot" tabindex="-1"><a class="header-anchor" href="#vue项目添加到springboot"><span>vue项目添加到springboot</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>把打包好的资源文件放到<code>resources</code>文件夹下的<code>front</code>文件夹即可,然后按照下面的方法配置</p></div><h3 id="第一种-在webmvcconfig里面设置静态文件目录" tabindex="-1"><a class="header-anchor" href="#第一种-在webmvcconfig里面设置静态文件目录"><span>第一种,在<code>webmvcconfig</code>里面设置静态文件目录</span></a></h3><pre><code class="language-java">  @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(&quot;/**&quot;)
                .addResourceLocations(&quot;classpath:/front/&quot;);
    }
</code></pre><h2 id="第二种-在properties文件里面配置" tabindex="-1"><a class="header-anchor" href="#第二种-在properties文件里面配置"><span>第二种,在properties文件里面配置</span></a></h2><p>在 properties文件里面设置 <code>spring.resources.static-locations=classpath:/front</code><br><code>spring.resources.static-locations</code>的默认值是：<code>classpath:/META-INF/resources/,classpath:/resources/,classpath:/static/,classpath:/public/</code><br> 区别：<code>spring.mvc.static-path-pattern</code>，这个配置的意思是什么样的路径，才到<code>spring.resources.static-locations</code>中查找静态文件, 默认的配置就是<code>/**</code>，就是全部的路径<br> 如：<code>spring.mvc.static-path-pattern=/static/**</code>, 当访问<code>/static/css/demo.css</code>时，会拿<code>/css/demo.css</code>到<code>spring.resources.static-locations</code>配置的目录中去查找。</p><h3 id="在windows上后台运行jar包-类似nohup" tabindex="-1"><a class="header-anchor" href="#在windows上后台运行jar包-类似nohup"><span>在windows上后台运行jar包(类似nohup)</span></a></h3><p>只需要</p><pre><code class="language-shell">javaw -jar zfile.jar
</code></pre><p>如何关闭呢</p><p>写一个<code>powershell</code>文件</p><pre><code class="language-powershell">
$process =&quot;*javaw*&quot;
# 查找和javaw相关的进程
Get-CimInstance Win32_Process | Where {$_.CommandLine -like $process } | select -ExpandProperty CommandLine # | Measure-Object -Line
# 关闭javaw进程
Get-CimInstance Win32_Process | Where {$_.CommandLine -like $process} | Remove-CimInstance
</code></pre><h2 id="mvn-wrapper" tabindex="-1"><a class="header-anchor" href="#mvn-wrapper"><span>mvn wrapper</span></a></h2><p><a href="https://maven.apache.org/wrapper/" target="_blank" rel="noopener noreferrer">https://maven.apache.org/wrapper/</a> 只需要在原项目里面</p><pre><code class="language-shell">mvn wrapper:wrapper

</code></pre><p>然后就可以在目录下面运行</p><pre><code class="language-shell">./mvnw clean install

</code></pre><h2 id="mvnd" tabindex="-1"><a class="header-anchor" href="#mvnd"><span>mvnd</span></a></h2><p><a href="https://github.com/apache/maven-mvnd" target="_blank" rel="noopener noreferrer">https://github.com/apache/maven-mvnd</a></p>`,42),i=[s];function c(p,d){return a(),t("div",null,i)}const g=e(l,[["render",c],["__file","maven-configuration.html.vue"]]),h=JSON.parse('{"path":"/java-tutor/package-manager/maven-configuration.html","title":"添加镜像源","lang":"zh-CN","frontmatter":{"description":"添加镜像源 全局镜像源 maven的默认配置文件在 $home/.m2/settings.xml 需要自己从maven配置文件(maven/conf/settings.xml)复制过来 参见阿里云的依赖教程 https://maven.aliyun.com/mvn/guide 单项目配置 在项目的pom.xml中添加类似下面的 版本管理 maven其实...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/package-manager/maven-configuration.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"添加镜像源"}],["meta",{"property":"og:description","content":"添加镜像源 全局镜像源 maven的默认配置文件在 $home/.m2/settings.xml 需要自己从maven配置文件(maven/conf/settings.xml)复制过来 参见阿里云的依赖教程 https://maven.aliyun.com/mvn/guide 单项目配置 在项目的pom.xml中添加类似下面的 版本管理 maven其实..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-04T19:25:57.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-04T19:25:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"添加镜像源\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-04T19:25:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"全局镜像源","slug":"全局镜像源","link":"#全局镜像源","children":[]},{"level":2,"title":"单项目配置","slug":"单项目配置","link":"#单项目配置","children":[]},{"level":2,"title":"版本管理","slug":"版本管理","link":"#版本管理","children":[]},{"level":2,"title":"指定maven中jdk版本","slug":"指定maven中jdk版本","link":"#指定maven中jdk版本","children":[{"level":3,"title":"方法一","slug":"方法一","link":"#方法一","children":[]},{"level":3,"title":"方法二","slug":"方法二","link":"#方法二","children":[]},{"level":3,"title":"本地maven设置","slug":"本地maven设置","link":"#本地maven设置","children":[]}]},{"level":2,"title":"vue项目添加到springboot","slug":"vue项目添加到springboot","link":"#vue项目添加到springboot","children":[{"level":3,"title":"第一种,在webmvcconfig里面设置静态文件目录","slug":"第一种-在webmvcconfig里面设置静态文件目录","link":"#第一种-在webmvcconfig里面设置静态文件目录","children":[]}]},{"level":2,"title":"第二种,在properties文件里面配置","slug":"第二种-在properties文件里面配置","link":"#第二种-在properties文件里面配置","children":[{"level":3,"title":"在windows上后台运行jar包(类似nohup)","slug":"在windows上后台运行jar包-类似nohup","link":"#在windows上后台运行jar包-类似nohup","children":[]}]},{"level":2,"title":"mvn wrapper","slug":"mvn-wrapper","link":"#mvn-wrapper","children":[]},{"level":2,"title":"mvnd","slug":"mvnd","link":"#mvnd","children":[]}],"git":{"createdTime":1648972940000,"updatedTime":1699125957000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":7}]},"readingTime":{"minutes":2.34,"words":703},"filePathRelative":"java-tutor/package-manager/maven-configuration.md","localizedDate":"2022年4月3日","autoDesc":true}');export{g as comp,h as data};
