import{_ as t,c as e,o as a,d as n}from"./app-CbULZrmi.js";const l={},r=n(`<h1 id="maven注意事项" tabindex="-1"><a class="header-anchor" href="#maven注意事项"><span>maven注意事项</span></a></h1><h2 id="maven命令" tabindex="-1"><a class="header-anchor" href="#maven命令"><span>maven命令</span></a></h2><pre><code class="language-powershell">mvn compile

mvn clean

mvn install 
#跳过测试
mvn package -DskipTests #这个还是会编译的,推荐用下面的
mvn package -Dmaven.test.skip=true  # 不编译测试class
# powershell上需要
mvn package &quot;-Dmaven.test.skip=true&quot;
mvn clean package -pl module-a


# 多模块带有依赖需要加上-am

mvn clean package -pl log-app -am

等同于
mvn install &amp;&amp; mvn clean package -pl log-app

</code></pre><div class="hint-container warning"><p class="hint-container-title">注意</p><p>对于idea ,多模块打包必须先install,上面带参数这种方法不适用 多模块要指定<code>&lt;relativePath&gt;../pom.xml&lt;/relativePath&gt;</code></p></div><h2 id="打包注意" tabindex="-1"><a class="header-anchor" href="#打包注意"><span>打包注意</span></a></h2><p>maven 默认的打包类型为 jar， 在项目聚合的时候，需要显式的将 父项目的 packing 指定为 pom，子项目可以定义为jar或者war 然后再指定所属的子模块，如下所示： ​</p><pre><code class="language-xml">&lt;packing&gt;pom&lt;/packing&gt;
&lt;modules&gt;
       &lt;module&gt;kern-base&lt;/module&gt;
       &lt;module&gt;kern-dao&lt;/module&gt;
       &lt;module&gt;kern-service&lt;/module&gt;
       &lt;module&gt;kern-control&lt;/module&gt;
&lt;/modules&gt;
</code></pre><p>如果没有将packing 指定为pom ，那么子模块之间将无法正常的进行依赖传递。 我们执行的maven命令的时候将首先对父项目执行，而后当 父项目 的packing 类型为 pom 时，将对所有的子模块执行同样的命令，否则将无法执行同样的命令，那么依赖的传递将无法由maven 编译或者打包命令 得以执行。 参考官网： <a href="http://maven.apache.org/guides/introduction/introduction-to-the-pom.html" target="_blank" rel="noopener noreferrer">http://maven.apache.org/guides/introduction/introduction-to-the-pom.html</a></p><h2 id="maven配置项目jdk版本" tabindex="-1"><a class="header-anchor" href="#maven配置项目jdk版本"><span>maven配置项目jdk版本</span></a></h2><p><a href="https://www.baeldung.com/maven-java-version" target="_blank" rel="noopener noreferrer">https://www.baeldung.com/maven-java-version</a></p><h2 id="maven跳过测试" tabindex="-1"><a class="header-anchor" href="#maven跳过测试"><span>maven跳过测试</span></a></h2><h3 id="maven跳过测试编译过程" tabindex="-1"><a class="header-anchor" href="#maven跳过测试编译过程"><span>maven跳过测试编译过程</span></a></h3><pre><code class="language-powershell">mvn -Dmaven.test.skip package

# powershell使用

mvn package \`-Dmaven.test.skip=true
#  或者
mvn package &#39;-Dmaven.test.skip=true&#39;
# 或者
mvn clean package --% -Dmaven.test.skip=true

mvnd  -pl aspect-main package --%  -Dmaven.test.skip
 
</code></pre><p>使用配置文件pom.xml</p><pre><code class="language-xml">&lt;properties&gt;
    &lt;maven.test.skip&gt;true&lt;/maven.test.skip&gt;
&lt;/properties&gt;
</code></pre><h3 id="maven跳过测试执行过程" tabindex="-1"><a class="header-anchor" href="#maven跳过测试执行过程"><span>maven跳过测试执行过程</span></a></h3><pre><code class="language-powershell">mvn -DskipTests package
</code></pre><h2 id="maven打包可执行jar" tabindex="-1"><a class="header-anchor" href="#maven打包可执行jar"><span>maven打包可执行jar</span></a></h2><p><a href="https://www.baeldung.com/executable-jar-with-maven" target="_blank" rel="noopener noreferrer">https://www.baeldung.com/executable-jar-with-maven</a></p><h2 id="配置项目内镜像" tabindex="-1"><a class="header-anchor" href="#配置项目内镜像"><span>配置项目内镜像</span></a></h2><pre><code class="language-xml">
&lt;repositories&gt;  
  &lt;repository&gt;  
    &lt;id&gt;central&lt;/id&gt;  
    &lt;name&gt;aliyun&lt;/name&gt;  
    &lt;layout&gt;default&lt;/layout&gt;  
    &lt;url&gt;https://maven.aliyun.com/repository/central&lt;/url&gt;  
    &lt;releases&gt;  
      &lt;enabled&gt;true&lt;/enabled&gt;  
    &lt;/releases&gt;  
    &lt;snapshots&gt;  
      &lt;enabled&gt;false&lt;/enabled&gt;  
    &lt;/snapshots&gt;  
  &lt;/repository&gt;  
&lt;/repositories&gt;
</code></pre><h2 id="错误-maven-non-resolvable-parent-pom" tabindex="-1"><a class="header-anchor" href="#错误-maven-non-resolvable-parent-pom"><span>错误 <a href="https://stackoverflow.com/questions/7612309/maven-non-resolvable-parent-pom" target="_blank" rel="noopener noreferrer">Maven: Non-resolvable parent POM</a></span></a></h2><p>需要先在主目录<code>mvn install</code>一下,然后再打包<code>mvn -pl app package</code> 或者<code>mvn -pl app -am package</code></p><h2 id="maven打包fatjar" tabindex="-1"><a class="header-anchor" href="#maven打包fatjar"><span>maven打包fatjar</span></a></h2><p>最好使用maven-shade-plugin,专门用来打fatjar(uber-jar)的</p><h3 id="使用maven-assembly-plugin" tabindex="-1"><a class="header-anchor" href="#使用maven-assembly-plugin"><span>使用maven-assembly-plugin</span></a></h3><p><a href="https://maven.apache.org/plugins/maven-dependency-plugin/examples/copying-project-dependencies.html" target="_blank" rel="noopener noreferrer">https://maven.apache.org/plugins/maven-dependency-plugin/examples/copying-project-dependencies.html</a></p><p>自定义的打包结构，也可以定制依赖项等</p><pre><code class="language-xml">&lt;plugins&gt;  
  &lt;plugin&gt;  
    &lt;artifactId&gt;maven-assembly-plugin&lt;/artifactId&gt;  
    &lt;version&gt;3.6.0&lt;/version&gt;  
    &lt;configuration&gt;  
      &lt;archive&gt;  
        &lt;manifest&gt;  
          &lt;mainClass&gt;cn.yzq.javademo.Main&lt;/mainClass&gt;  
        &lt;/manifest&gt;  
      &lt;/archive&gt;  
      &lt;descriptorRefs&gt;  
        &lt;descriptorRef&gt;jar-with-dependencies&lt;/descriptorRef&gt;  
      &lt;/descriptorRefs&gt;  
    &lt;/configuration&gt;  
    &lt;executions&gt;  
      &lt;execution&gt;  
        &lt;id&gt;make-assembly&lt;/id&gt;  
        &lt;phase&gt;package&lt;/phase&gt;  
        &lt;goals&gt;  
          &lt;goal&gt;single&lt;/goal&gt;  
        &lt;/goals&gt;  
      &lt;/execution&gt;  
    &lt;/executions&gt;  
  &lt;/plugin&gt;  
&lt;/plugins&gt;

</code></pre><h3 id="使用maven-jar-plugin" tabindex="-1"><a class="header-anchor" href="#使用maven-jar-plugin"><span>使用maven-jar-plugin</span></a></h3><p>默认的打包方式，用来打普通的project JAR包，<strong>此方式是没有真正打包到一个独立jar</strong></p><p><a href="https://maven.apache.org/shared/maven-archiver/examples/classpath.html" target="_blank" rel="noopener noreferrer">https://maven.apache.org/shared/maven-archiver/examples/classpath.html</a></p><pre><code class="language-xml">&lt;plugin&gt;
    &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
    &lt;artifactId&gt;maven-jar-plugin&lt;/artifactId&gt;
    &lt;configuration&gt;
        &lt;archive&gt;
            &lt;manifest&gt;
                &lt;addClasspath&gt;true&lt;/addClasspath&gt;
                &lt;classpathPrefix&gt;lib/&lt;/classpathPrefix&gt;
                &lt;mainClass&gt;ab.yzq.tutor.Main&lt;/mainClass&gt;
            &lt;/manifest&gt;
        &lt;/archive&gt;
    &lt;/configuration&gt;
&lt;/plugin&gt;
\`\`\`xml
&lt;!-- 拷贝依赖包 --&gt;
&lt;plugin&gt;
 &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
 &lt;artifactId&gt;maven-dependency-plugin&lt;/artifactId&gt;
 &lt;executions&gt;
  &lt;execution&gt;
   &lt;id&gt;copy&lt;/id&gt;
   &lt;phase&gt;package&lt;/phase&gt;
   &lt;goals&gt;
    &lt;goal&gt;copy-dependencies&lt;/goal&gt;
   &lt;/goals&gt;
   &lt;configuration&gt;
    &lt;outputDirectory&gt;\${project.build.directory}/lib&lt;/outputDirectory&gt;
   &lt;/configuration&gt;
  &lt;/execution&gt;
 &lt;/executions&gt;
&lt;/plugin&gt;
</code></pre><h3 id="使用maven-shade-plugin" tabindex="-1"><a class="header-anchor" href="#使用maven-shade-plugin"><span>使用maven-shade-plugin</span></a></h3><p>用来打可执行jar包，也就是所谓的uber jar包; <a href="https://maven.apache.org/plugins/maven-shade-plugin/examples/executable-jar.html" target="_blank" rel="noopener noreferrer">https://maven.apache.org/plugins/maven-shade-plugin/examples/executable-jar.html</a></p><pre><code class="language-xml">
&lt;plugin&gt;  
  &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;  
  &lt;artifactId&gt;maven-shade-plugin&lt;/artifactId&gt;  
  &lt;version&gt;3.5.0&lt;/version&gt;  
  &lt;executions&gt;  
    &lt;execution&gt;  
      &lt;phase&gt;package&lt;/phase&gt;  
      &lt;goals&gt;  
        &lt;goal&gt;shade&lt;/goal&gt;  
      &lt;/goals&gt;  
      &lt;configuration&gt;  
        &lt;transformers&gt;  
          &lt;transformer implementation=&quot;org.apache.maven.plugins.shade.resource.ManifestResourceTransformer&quot;&gt;  
            &lt;mainClass&gt;cn.yzq.javademo.Main&lt;/mainClass&gt;  
          &lt;/transformer&gt;  
        &lt;/transformers&gt;  
        &lt;filters&gt;  
          &lt;filter&gt;  
            &lt;artifact&gt;*:*&lt;/artifact&gt;  
            &lt;excludes&gt;  
              &lt;exclude&gt;META-INF/*.SF&lt;/exclude&gt;  
              &lt;exclude&gt;META-INF/*.DSA&lt;/exclude&gt;  
              &lt;exclude&gt;META-INF/*.RSA&lt;/exclude&gt;  
            &lt;/excludes&gt;  
          &lt;/filter&gt;  
        &lt;/filters&gt;  
      &lt;/configuration&gt;  
    &lt;/execution&gt;  
  &lt;/executions&gt;  
&lt;/plugin&gt;
</code></pre><h2 id="使用javapackager" tabindex="-1"><a class="header-anchor" href="#使用javapackager"><span>使用javapackager</span></a></h2><p><a href="https://github.com/fvarrui/JavaPackager" target="_blank" rel="noopener noreferrer">https://github.com/fvarrui/JavaPackager</a></p><pre><code class="language-xml">
&lt;plugin&gt;
    &lt;groupId&gt;io.github.fvarrui&lt;/groupId&gt;
    &lt;artifactId&gt;javapackager&lt;/artifactId&gt;
    &lt;version&gt;{latest.version}&lt;/version&gt;
    &lt;executions&gt;
        &lt;execution&gt;
            &lt;phase&gt;package&lt;/phase&gt;
            &lt;goals&gt;
                &lt;goal&gt;package&lt;/goal&gt;
            &lt;/goals&gt;
            &lt;configuration&gt;
                &lt;!-- mandatory --&gt;
                &lt;mainClass&gt;path.to.your.mainClass&lt;/mainClass&gt;
                &lt;!-- optional --&gt;
                &lt;bundleJre&gt;true|false&lt;/bundleJre&gt;
                &lt;generateInstaller&gt;true|false&lt;/generateInstaller&gt;
                &lt;administratorRequired&gt;true|false&lt;/administratorRequired&gt;
                &lt;platform&gt;auto|linux|mac|windows&lt;/platform&gt;
                &lt;additionalResources&gt;
                    &lt;additionalResource&gt;file path&lt;/additionalResource&gt;
                    &lt;additionalResource&gt;folder path&lt;/additionalResource&gt;
                    &lt;additionalResource&gt;...&lt;/additionalResource&gt;
                &lt;/additionalResources&gt;
                &lt;linuxConfig&gt;...&lt;/linuxConfig&gt;
                &lt;macConfig&gt;...&lt;/macConfig&gt;
                &lt;winConfig&gt;...&lt;/winConfig&gt;
                [...]
            &lt;/configuration&gt;
        &lt;/execution&gt;
    &lt;/executions&gt;
&lt;/plugin&gt;
</code></pre><p>这个可能会遇到找不到依赖的问题</p><p>需要再项目中的pom.xml配置 注意这个\`edu.sc.seis.launch4j:launch4j不在maven仓库而是再gradle plugin 仓库</p><pre><code class="language-xml">&lt;repositories&gt;  
  &lt;repository&gt;  
    &lt;id&gt;aliyun-repo&lt;/id&gt;  
    &lt;name&gt;aliyun&lt;/name&gt;  
    &lt;layout&gt;default&lt;/layout&gt;  
    &lt;url&gt;https://maven.aliyun.com/repository/gradle-plugin&lt;/url&gt;  
  
  &lt;/repository&gt;  
&lt;/repositories&gt;  
  
&lt;pluginRepositories&gt;  
  &lt;pluginRepository&gt;  
    &lt;id&gt;aliyun-repo&lt;/id&gt;  
    &lt;name&gt;aliyuddn&lt;/name&gt;  
  
    &lt;url&gt;https://maven.aliyun.com/repository/gradle-plugin&lt;/url&gt;  
  
  &lt;/pluginRepository&gt;  
&lt;/pluginRepositories&gt;
</code></pre><p>然后.m2/settings.xml中需要把这个id exclude掉,避免全局的仓库覆盖本地仓库</p><pre><code class="language-xml">&lt;mirror&gt;  
  &lt;id&gt;nexus-tencentyun&lt;/id&gt;  
  &lt;mirrorOf&gt;*,!spring-shell,!papermc-repo,!spigotmc-repo,!placeholderapi,!citizens-repo,!jitpack.io,!dmulloy2-repo,!commons-codec,!aliyun-repo&lt;/mirrorOf&gt;  
  &lt;name&gt;Nexus tencentyun&lt;/name&gt;  
  &lt;url&gt;http://mirrors.cloud.tencent.com/nexus/repository/maven-public/&lt;/url&gt;  
&lt;/mirror&gt;
</code></pre><h2 id="gradle打包" tabindex="-1"><a class="header-anchor" href="#gradle打包"><span>gradle打包</span></a></h2><pre><code>./gradlew bootJar
</code></pre><p>依赖分离打包</p><p>在build.gradle.kts中加入下面的代码,然后运行<code>./gradlew thin</code>和<code>./gradlew bootJar</code>同时打包thin包和fatjar</p><pre><code class="language-kotlin">  tasks.register&lt;Delete&gt;(&quot;clearLib&quot;) { //清除lib  
  
  delete(layout.buildDirectory.dir(&quot;libs/lib&quot;).get())  
}  
  
tasks.register&lt;Copy&gt;(&quot;copyLib&quot;) { //拷贝lib  
  from(configurations.runtimeClasspath) //从运行时目录  
  into(layout.buildDirectory.dir(&quot;libs/lib&quot;).get())  //到打包目录  
}

tasks.register&lt;BootJar&gt;(&quot;thin&quot;) {  
  dependsOn(&quot;clearLib&quot;) //依赖清除和拷贝lib任务  
  dependsOn(&quot;copyLib&quot;)  
  exclude(&quot;**/*.jar&quot;) //打包时排除jar文件（不打包成fat jar）  
  mainClass.set(&quot;ab.yzq.jv.mini.MiniApp&quot;)  
  archiveBaseName=&quot;spring-min-thin&quot;  
  targetJavaVersion = JavaVersion.VERSION_17  
  manifest {  
    attributes[&quot;Manifest-Version&quot;] = &quot;1.0&quot;  
    attributes[&quot;Multi-Release&quot;] = &quot;true&quot;  
//    attributes[&quot;Main-Class&quot;] = &quot;org.springframework.boot.loader.JarLauncher&quot; //main方法所在的class，我这个例子是用的Kotlin所以带有Kt后缀  
    attributes[&quot;Class-Path&quot;] =  
      configurations.runtimeClasspath.get().files.joinToString(&quot; &quot;) { &quot;lib/\${it.name}&quot; }  //构建出 lib/包名 的字符串并用空格分隔  
  }  
  with(tasks.named(&quot;bootJar&quot;).get() as CopySpec)  
}
</code></pre><p>groovy版本</p><pre><code class="language-groovy">task customJar(type: BootJar) {  
  archiveBaseName = &#39;custom-spring-boot&#39;  
  version = &#39;0.1.0&#39;  
  mainClass = &#39;ab.yzq.springdemo.SpringDemoApp&#39;  
  targetJavaVersion = JavaVersion.VERSION_17  
  dependsOn(&quot;clearLib&quot;) //依赖清除和拷贝lib任务  
  dependsOn(&quot;copyLib&quot;)  
  exclude(&quot;**/*.jar&quot;) //打包时排除jar文件（不打包成fat jar）  
  manifest {  
    attributes[&quot;Manifest-Version&quot;] = &quot;1.0&quot;  
    attributes[&quot;Multi-Release&quot;] = &quot;true&quot;  
//    attributes[&quot;Main-Class&quot;] = &quot;org.springframework.boot.loader.JarLauncher&quot; //main方法所在的class，我这个例子是用的Kotlin所以带有Kt后缀  
    attributes[&#39;Class-Path&#39;] = configurations.runtimeClasspath.collect { &#39;lib/&#39; + it.getName() }.join(&#39; &#39;)  
  }  
  println(&quot;below is bootjar&quot;)  
  print(bootJar)  
  with bootJar    
}
</code></pre>`,51),o=[r];function i(s,g){return a(),e("div",null,o)}const c=t(l,[["render",i],["__file","maven-tips.html.vue"]]),u=JSON.parse('{"path":"/java-tutor/package-manager/maven-tips.html","title":"maven注意事项","lang":"zh-CN","frontmatter":{"description":"maven注意事项 maven命令 注意 对于idea ,多模块打包必须先install,上面带参数这种方法不适用 多模块要指定<relativePath>../pom.xml</relativePath> 打包注意 maven 默认的打包类型为 jar， 在项目聚合的时候，需要显式的将 父项目的 packing 指定为 pom，子项目可以定义为jar...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/package-manager/maven-tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"maven注意事项"}],["meta",{"property":"og:description","content":"maven注意事项 maven命令 注意 对于idea ,多模块打包必须先install,上面带参数这种方法不适用 多模块要指定<relativePath>../pom.xml</relativePath> 打包注意 maven 默认的打包类型为 jar， 在项目聚合的时候，需要显式的将 父项目的 packing 指定为 pom，子项目可以定义为jar..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-20T19:28:54.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-06-20T19:28:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"maven注意事项\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-20T19:28:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"maven命令","slug":"maven命令","link":"#maven命令","children":[]},{"level":2,"title":"打包注意","slug":"打包注意","link":"#打包注意","children":[]},{"level":2,"title":"maven配置项目jdk版本","slug":"maven配置项目jdk版本","link":"#maven配置项目jdk版本","children":[]},{"level":2,"title":"maven跳过测试","slug":"maven跳过测试","link":"#maven跳过测试","children":[{"level":3,"title":"maven跳过测试编译过程","slug":"maven跳过测试编译过程","link":"#maven跳过测试编译过程","children":[]},{"level":3,"title":"maven跳过测试执行过程","slug":"maven跳过测试执行过程","link":"#maven跳过测试执行过程","children":[]}]},{"level":2,"title":"maven打包可执行jar","slug":"maven打包可执行jar","link":"#maven打包可执行jar","children":[]},{"level":2,"title":"配置项目内镜像","slug":"配置项目内镜像","link":"#配置项目内镜像","children":[]},{"level":2,"title":"错误   Maven: Non-resolvable parent POM","slug":"错误-maven-non-resolvable-parent-pom","link":"#错误-maven-non-resolvable-parent-pom","children":[]},{"level":2,"title":"maven打包fatjar","slug":"maven打包fatjar","link":"#maven打包fatjar","children":[{"level":3,"title":"使用maven-assembly-plugin","slug":"使用maven-assembly-plugin","link":"#使用maven-assembly-plugin","children":[]},{"level":3,"title":"使用maven-jar-plugin","slug":"使用maven-jar-plugin","link":"#使用maven-jar-plugin","children":[]},{"level":3,"title":"使用maven-shade-plugin","slug":"使用maven-shade-plugin","link":"#使用maven-shade-plugin","children":[]}]},{"level":2,"title":"使用javapackager","slug":"使用javapackager","link":"#使用javapackager","children":[]},{"level":2,"title":"gradle打包","slug":"gradle打包","link":"#gradle打包","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1718911734000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":7}]},"readingTime":{"minutes":4.32,"words":1295},"filePathRelative":"java-tutor/package-manager/maven-tips.md","localizedDate":"2022年3月21日","autoDesc":true}');export{c as comp,u as data};
