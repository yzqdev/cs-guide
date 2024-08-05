import{_ as t,c as e,o as a,d as o}from"./app-CbULZrmi.js";const n={},i=o(`<h1 id="gradle插件相关" tabindex="-1"><a class="header-anchor" href="#gradle插件相关"><span>gradle插件相关</span></a></h1><h2 id="用gradle构建lib分离的jar包" tabindex="-1"><a class="header-anchor" href="#用gradle构建lib分离的jar包"><span>用Gradle构建lib分离的jar包</span></a></h2><p>首先Jar包内是有一个<code>META-INF/MANIFEST.MF</code>这样的文件，里面我只挑能够达成jar包跟lib分离目的的参数：</p><ul><li>Main-Class<br> 这是指定程序入口的参数，一般就是main方法所在的class，Kotlin的class需要加上Kt的后缀才正确。<br> 这个一般打成jar运行是基础配置，不然无法运行。</li><li>Class-Path<br> 这个就是需要加载的lib的配置了，需要对每个lib包都做声明，空格分割。</li></ul><p>下一步是对Gradle的jar任务做修改，让其排除所有的*.jar文件，并自定义一个删除以及拷贝lib的任务让其依赖。这需要了解一下Gradle如何自定义一个task以及jar任务如何修改。</p><p>然后直接修改jar这个task</p><pre><code class="language-kotlin">tasks.register&lt;Delete&gt;(&quot;clearLib&quot;) { //清除lib  
  
  delete(layout.buildDirectory.dir(&quot;libs/lib&quot;).get())  
}  
  
tasks.register&lt;Copy&gt;(&quot;copyLib&quot;) { //拷贝lib  
  from(configurations.runtimeClasspath) //从运行时目录  
  into(layout.buildDirectory.dir(&quot;libs/lib&quot;).get())  //到打包目录  
}
  
tasks.jar {  
  dependsOn(&quot;clearLib&quot;) //依赖清除和拷贝lib任务  
  dependsOn(&quot;copyLib&quot;)  
  exclude(&quot;**/*.jar&quot;) //打包时排除jar文件（不打包成fat jar）  
  manifest {  
    attributes[&quot;Manifest-Version&quot;] = &quot;1.0&quot;  
    attributes[&quot;Multi-Release&quot;] = &quot;true&quot;  
    attributes[&quot;Main-Class&quot;] = &quot;ab.yzq.javalindemo.Main&quot; //main方法所在的class，我这个例子是用的Kotlin所以带有Kt后缀  
    attributes[&quot;Class-Path&quot;] =  
      configurations.runtimeClasspath.get().files.joinToString(&quot; &quot;) { &quot;lib/\${it.name}&quot; }  //构建出 lib/包名 的字符串并用空格分隔  
  }  
}
</code></pre><p>打包出来就是一个main.jar和一个lib文件夹</p><p>对于springboot项目,也可以打包分离依赖</p><pre><code class="language-groovy">// 将依赖包复制到lib目录
task copyJar(type: Copy) {
    // 清除现有的lib目录
    delete &quot;$buildDir/libs/lib&quot;
    from configurations.runtimeClasspath
    into &quot;$buildDir/libs/lib&quot;
}

// 拷贝配置文件
task copyResources(type: Copy) {
    // 清除现有的配置目录
    delete &quot;$buildDir/libs/config&quot;
    from &quot;src/main/resources&quot;
    into &quot;$buildDir/libs/config&quot;
    // 只复制yml配置文件
    include &quot;*.yml&quot;
    // 排除指定文件
    // exclude &quot;application.yml&quot;
}

// 配置bootJar进行打包
bootJar {
    // 排除lib目录及yml配置文件
    excludes = [&quot;*.jar&quot;, &quot;*.yml&quot;]
    // 引入需要的文件(多模块项目下可引入指定jar包)
    // includes = [&#39;common-\${project.version}.jar&#39;]
    // lib目录的清除和复制任务
    dependsOn copyJar
    // 配置目录的清除和复制任务
    dependsOn copyResources
    // 指定依赖包的路径
    manifest {
        attributes &quot;Manifest-Version&quot;: 1.0,
                &#39;Class-Path&#39;: &#39;config/ &#39; + configurations.runtimeClasspath.files.collect { &quot;lib/$it.name&quot; }.join(&#39; &#39;)
    }
}
</code></pre><h2 id="打包java-library然后把依赖也打包进去" tabindex="-1"><a class="header-anchor" href="#打包java-library然后把依赖也打包进去"><span>打包java-library然后把依赖也打包进去</span></a></h2><pre><code class="language-kotlin">
tasks.jar {  
   
  from(configurations.runtimeClasspath.get().map {  
    if (it.isDirectory) it else zipTree(it)  
  })  
  val sourcesMain = sourceSets.main.get()  
  sourcesMain.allSource.forEach { println(&quot;add from sources: \${it.name}&quot;) }  
  from(sourcesMain.output)  
  manifest {  
    attributes[&quot;Manifest-Version&quot;] = &quot;1.0&quot;  
    attributes[&quot;Multi-Release&quot;] = &quot;true&quot;  
  
  }  
  
}
</code></pre>`,12),r=[i];function l(s,u){return a(),e("div",null,r)}const d=t(n,[["render",l],["__file","gradle-build.html.vue"]]),p=JSON.parse('{"path":"/kotlin-tutor/gradle/gradle-build.html","title":"gradle插件相关","lang":"zh-CN","frontmatter":{"description":"gradle插件相关 用Gradle构建lib分离的jar包 首先Jar包内是有一个META-INF/MANIFEST.MF这样的文件，里面我只挑能够达成jar包跟lib分离目的的参数： Main-Class 这是指定程序入口的参数，一般就是main方法所在的class，Kotlin的class需要加上Kt的后缀才正确。 这个一般打成jar运行是基础配...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/kotlin-tutor/gradle/gradle-build.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"gradle插件相关"}],["meta",{"property":"og:description","content":"gradle插件相关 用Gradle构建lib分离的jar包 首先Jar包内是有一个META-INF/MANIFEST.MF这样的文件，里面我只挑能够达成jar包跟lib分离目的的参数： Main-Class 这是指定程序入口的参数，一般就是main方法所在的class，Kotlin的class需要加上Kt的后缀才正确。 这个一般打成jar运行是基础配..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-20T19:28:54.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-06-20T19:28:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"gradle插件相关\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-20T19:28:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"用Gradle构建lib分离的jar包","slug":"用gradle构建lib分离的jar包","link":"#用gradle构建lib分离的jar包","children":[]},{"level":2,"title":"打包java-library然后把依赖也打包进去","slug":"打包java-library然后把依赖也打包进去","link":"#打包java-library然后把依赖也打包进去","children":[]}],"git":{"createdTime":1696975127000,"updatedTime":1718911734000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":2.01,"words":604},"filePathRelative":"kotlin-tutor/gradle/gradle-build.md","localizedDate":"2023年10月10日","autoDesc":true}');export{d as comp,p as data};
