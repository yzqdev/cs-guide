import{_ as t,c as e,o,d as a}from"./app-CbULZrmi.js";const r={},n=a(`<h1 id="打包" tabindex="-1"><a class="header-anchor" href="#打包"><span>打包</span></a></h1><h2 id="gradle打包" tabindex="-1"><a class="header-anchor" href="#gradle打包"><span>gradle打包</span></a></h2><pre><code>./gradlew bootJar
</code></pre><p>依赖分离打包</p><p>在build.gradle.kts中加入下面的代码,然后运行<code>./gradlew thin</code>和<code>./gradlew bootJar</code>同时打包thin包和fatjar</p><pre><code class="language-kotlin">tasks.register&lt;Delete&gt;(&quot;clearLib&quot;) { //清除lib  
  
  delete(layout.buildDirectory.dir(&quot;libs/lib&quot;).get())  
}  
  
tasks.register&lt;Copy&gt;(&quot;copyLib&quot;) { //拷贝lib  
  from(configurations.runtimeClasspath) //从运行时目录  
  into(layout.buildDirectory.dir(&quot;libs/lib&quot;).get())  //到打包目录  
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
</code></pre>`,8),i=[n];function s(u,l){return o(),e("div",null,i)}const d=t(r,[["render",s],["__file","package.html.vue"]]),p=JSON.parse('{"path":"/java-tutor/springboot/package.html","title":"打包","lang":"zh-CN","frontmatter":{"description":"打包 gradle打包 依赖分离打包 在build.gradle.kts中加入下面的代码,然后运行./gradlew thin和./gradlew bootJar同时打包thin包和fatjar groovy版本","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/package.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"打包"}],["meta",{"property":"og:description","content":"打包 gradle打包 依赖分离打包 在build.gradle.kts中加入下面的代码,然后运行./gradlew thin和./gradlew bootJar同时打包thin包和fatjar groovy版本"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-20T19:28:54.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-06-20T19:28:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"打包\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-20T19:28:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"gradle打包","slug":"gradle打包","link":"#gradle打包","children":[]}],"git":{"createdTime":1697339432000,"updatedTime":1718911734000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":0.97,"words":292},"filePathRelative":"java-tutor/springboot/package.md","localizedDate":"2023年10月15日","autoDesc":true}');export{d as comp,p as data};
