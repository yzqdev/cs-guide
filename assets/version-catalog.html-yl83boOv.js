import{_ as t,c as o,o as e,d as n}from"./app-CbULZrmi.js";const a={},r=n(`<h1 id="gradle统一版本控制version-catalog" tabindex="-1"><a class="header-anchor" href="#gradle统一版本控制version-catalog"><span>gradle统一版本控制VERSION_CATALOG</span></a></h1><p><a href="https://docs.gradle.org/current/userguide/platforms.html" target="_blank" rel="noopener noreferrer">官方文档</a></p><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2><p><a href="https://blog.csdn.net/qq_24889033/article/details/125307004" target="_blank" rel="noopener noreferrer">源文档</a></p><h2 id="加入依赖管理" tabindex="-1"><a class="header-anchor" href="#加入依赖管理"><span>加入依赖管理</span></a></h2><pre><code class="language-kotlin">dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
    //注意，重点在这里
    versionCatalogs {
        create(&quot;lib&quot;) {
            library(&quot;core-ktx&quot;, &quot;androidx.core&quot;, &quot;core-ktx&quot;).version(&quot;1.7.0&quot;)
            library(&quot;appcompat&quot;, &quot;androidx.appcompat&quot;, &quot;appcompat&quot;).version(&quot;1.4.1&quot;)
        }
    }
}
</code></pre><p>create中的lib为创建的目录名，可以自己定义,将来使用<code>implementation(libs.core.ktx)</code>,<code>-</code>会被转化为<code>.</code></p><h2 id="引入外部libs-version-toml文件" tabindex="-1"><a class="header-anchor" href="#引入外部libs-version-toml文件"><span>引入外部<code>libs.version.toml</code>文件</span></a></h2><p>groovy版本</p><pre><code class="language-groovy">versionCatalogs {  
  libs {  
    from(files( System.getenv(&quot;gradle_ext&quot;)+&quot;\\\\libs.versions.toml&quot;))  
  }  
}
</code></pre><p>kts版本</p><pre><code class="language-kotlin">versionCatalogs {  
  create(&quot;libs&quot;) {  
    from(files( System.getenv(&quot;gradle_ext&quot;)+&quot;\\\\libs.versions.toml&quot;))  
  }  
}

</code></pre><h3 id="添加版本号" tabindex="-1"><a class="header-anchor" href="#添加版本号"><span>添加版本号</span></a></h3><p>第一种</p><pre><code class="language-kotlin"> //入参是别名和完整的依赖和版本号，比如上面的appcompat可以写成：
 versionCatalogs {
        create(&quot;lib&quot;) {
            library(&quot;appcompat&quot;,&quot;androidx.appcompat:appcompat:1.4.1&quot;)
        }
    }
</code></pre><p>第二种</p><pre><code class="language-kotlin"> //入参为{别名},{group},{artifact}
 versionCatalogs {
  create(&quot;lib&quot;) {
   library(&quot;core-ktx&quot;, &quot;androidx.core&quot;, &quot;core-ktx&quot;).version(&quot;1.7.0&quot;)
  }
 }
</code></pre><p>也可以创建多个目录</p><pre><code class="language-kotlin">//settings.gradle.kts
 versionCatalogs {
  crete(&quot;lib&quot;){
   library(&quot;fastjson&quot;, &quot;com.alibaba&quot;, &quot;fastjson&quot;).version(&quot;1.2.79&quot;)
   library(&quot;fastjson2&quot;, &quot;com.alibaba.fastjson2&quot;, &quot;fastjson2&quot;).version(&quot;2.0.4&quot;)
   library(&quot;fastjson2-kotlin&quot;, &quot;com.alibaba.fastjson2&quot;, &quot;fastjson2-kotlin&quot;).version(&quot;2.0.4&quot;)
  }
  
  create(&quot;androidx&quot;){
   library(&quot;core-ktx&quot;, &quot;androidx.core&quot;, &quot;core-ktx&quot;).version(&quot;1.7.0&quot;)
   library(&quot;appcompat&quot;, &quot;androidx.appcompat&quot;, &quot;appcompat&quot;).version(&quot;1.4.1&quot;)
   library(&quot;activity-ktx&quot;, &quot;androidx.activity&quot;, &quot;activity-ktx&quot;).version(&quot;1.4.0&quot;)
   library(&quot;fragment-ktx&quot;, &quot;androidx.fragment&quot;, &quot;fragment-ktx&quot;).version(&quot;1.4.1&quot;)
  }
 }
</code></pre><p>然后为每个子组生成别名会创建成类型安全访问器。例如，给定名为 的版本目录中的以下别名libs： <code>appcompat</code>,<code>core-ktx</code>,<code>activity-kts</code>,<code>androidx.fragment.kts</code> 将会自动生成一下类型安全的访问器：</p><pre><code>lib.appcompat
lib.core.kts
lib.activity.kts
lib.androidx.fragment.kts
</code></pre><p>前缀lib来自版本目录名称。</p><p>如果您想避免生成子组访问器，我们建议依靠大小写来区分。例如，别名activityKts,coreKtx和fastjson2Kotlin将分别映射到libs.groovyCore,libs.groovyJson和libs.groovyXml访问器。</p><h3 id="管理版本" tabindex="-1"><a class="header-anchor" href="#管理版本"><span>管理版本</span></a></h3><pre><code class="language-kotlin">//settings.gradle.kts
 version(&quot;minSdk&quot;,&quot;24&quot;)
 version(&quot;targetSdk&quot;,&quot;31&quot;)
 
 //build.gradle.kts(:app)
 android {
  defaultConfig {
   minSdk = libs.versions.minSdk.get().toInt()
   targetSdk = libs.versions.targetSdk.get().toInt()
   ...
  }
 }
</code></pre><p>也可以在<strong>根目录</strong>的<code>build.gradle.kts</code>加入</p><pre><code class="language-kotlin">extra[&quot;compileSdk&quot;]=33
extra[&quot;minSdk&quot;]=21
extra[&quot;targetSdk&quot;]=33
\`\`
然后在app目录的\`build.gradle.kts\`使用
\`\`\`kotlin
android {
    compileSdk=rootProject.extra[&quot;compileSdk&quot;] as Int

    defaultConfig {
        applicationId = &quot;com.yzq.sample&quot;
        minSdk=rootProject.extra[&quot;minSdk&quot;] as Int
        targetSdk=rootProject.extra[&quot;targetSdk&quot;] as Int
        versionCode = 1
        versionName = &quot;1.0&quot;

        testInstrumentationRunner = &quot;androidx.test.runner.AndroidJUnitRunner&quot;
    }
}
</code></pre><h3 id="使用包" tabindex="-1"><a class="header-anchor" href="#使用包"><span>使用包</span></a></h3><p>其实就是一个别名包含一大堆依赖</p><pre><code class="language-kotlin">    versionCatalog {
        version(&quot;kotlin&quot;, &quot;1.7.0&quot;)
        library(&quot;stdlib&quot;, &quot;org.jetbrains.kotlin&quot;, &quot;kotlin-stdlib&quot;).versionRef(&quot;kotlin&quot;)
        library(&quot;reflect&quot;, &quot;org.jetbrains.kotlin&quot;, &quot;kotlin-reflect&quot;).versionRef(&quot;kotlin&quot;)
        //bundle的入参分别为，alias（别名），需要依赖的别名集合
        bundle(&quot;kotlin&quot;, listOf(&quot;stdlib&quot;, &quot;reflect&quot;))
        
     create(&quot;androidEx&quot;) {
                //------------------------------ androidx start ----------------------------
                library(&quot;core&quot;, &quot;androidx.core:core-ktx:1.9.0&quot;)
                library(&quot;appcompat&quot;, &quot;androidx.appcompat:appcompat:1.5.1&quot;)
                library(&quot;fragmentKtx&quot;, &quot;androidx.fragment:fragment-ktx:1.5.3&quot;)
                library(&quot;material&quot;, &quot;com.google.android.material:material:1.6.1&quot;)
                library(
                    &quot;constraintlayout&quot;,
                    &quot;androidx.constraintlayout:constraintlayout:2.1.4&quot;
                )
                library(
                    &quot;navigationFragmentKtx&quot;,
                    &quot;androidx.navigation:navigation-fragment-ktx:2.5.2&quot;
                )
                library(&quot;navigationUiKtx&quot;, &quot;androidx.navigation:navigation-ui-ktx:2.5.2&quot;)

                bundle(&quot;common&quot;,listOf(&quot;core&quot;,&quot;appcompat&quot;,&quot;fragmentKtx&quot;,&quot;material&quot;,&quot;constraintlayout&quot;,&quot;navigationFragmentKtx&quot;,&quot;navigationUiKtx&quot;))
            }

       
}
</code></pre><p>然后在子模块中</p><pre><code class="language-kotlin">dependencies{
  api(lib.bundles.kotlin)
    api(lib.bundles.coroutines)
    //所有module只需要这一句就能依赖所有
    api(androidEx.bundles.common)
}
</code></pre><div class="hint-container tip"><p class="hint-container-title">提示</p><p>tips:不同类型的别名是可以重复的，他们之间相互独立。 允许以下方式使用：</p><pre><code>version(&quot;kotlin&quot;,&quot;&quot;),
library(&quot;kotlin&quot;,&quot;&quot;),
bundle(&quot;kotlin&quot;,listOf(&quot;&quot;,&quot;&quot;))
</code></pre></div><h2 id="如何使用bom" tabindex="-1"><a class="header-anchor" href="#如何使用bom"><span>如何使用bom</span></a></h2><pre><code class="language-toml">//libs.versions.toml
[libraries]
deps_okhttp_bom = &quot;com.squareup.okhttp3:okhttp-bom:4.9.1&quot;
deps_okhttp_lib = { module  =&quot;com.squareup.okhttp3:okhttp&quot; }
deps_okhttp_logging_interceptor = { module= &quot;com.squareup.okhttp3:logging-interceptor&quot;}

//build.xml
dependencies {
  implementation platform(libs.deps.okhttp.bom)
  implementation libs.deps.okhttp.lib
  implementation libs.deps.okhttp.logging.interceptor
}
</code></pre><p>例子</p><pre><code class="language-kotlin">val composeBom=platform(libs.composeBom)  
implementation(composeBom)  
androidTestImplementation(composeBom)  
implementation(libs.bundles.compose)  
implementation(libs.composeMaterial)
</code></pre>`,37),i=[r];function l(u,s){return e(),o("div",null,i)}const p=t(a,[["render",l],["__file","version-catalog.html.vue"]]),q=JSON.parse('{"path":"/kotlin-tutor/gradle/version-catalog.html","title":"gradle统一版本控制VERSION_CATALOG","lang":"zh-CN","frontmatter":{"description":"gradle统一版本控制VERSION_CATALOG 官方文档 使用 源文档 加入依赖管理 create中的lib为创建的目录名，可以自己定义,将来使用implementation(libs.core.ktx),-会被转化为. 引入外部libs.version.toml文件 groovy版本 kts版本 添加版本号 第一种 第二种 也可以创建多个目录...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/kotlin-tutor/gradle/version-catalog.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"gradle统一版本控制VERSION_CATALOG"}],["meta",{"property":"og:description","content":"gradle统一版本控制VERSION_CATALOG 官方文档 使用 源文档 加入依赖管理 create中的lib为创建的目录名，可以自己定义,将来使用implementation(libs.core.ktx),-会被转化为. 引入外部libs.version.toml文件 groovy版本 kts版本 添加版本号 第一种 第二种 也可以创建多个目录..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-05T15:16:51.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-01-05T15:16:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"gradle统一版本控制VERSION_CATALOG\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-01-05T15:16:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"使用","slug":"使用","link":"#使用","children":[]},{"level":2,"title":"加入依赖管理","slug":"加入依赖管理","link":"#加入依赖管理","children":[]},{"level":2,"title":"引入外部libs.version.toml文件","slug":"引入外部libs-version-toml文件","link":"#引入外部libs-version-toml文件","children":[{"level":3,"title":"添加版本号","slug":"添加版本号","link":"#添加版本号","children":[]},{"level":3,"title":"管理版本","slug":"管理版本","link":"#管理版本","children":[]},{"level":3,"title":"使用包","slug":"使用包","link":"#使用包","children":[]}]},{"level":2,"title":"如何使用bom","slug":"如何使用bom","link":"#如何使用bom","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1704467811000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":2.28,"words":685},"filePathRelative":"kotlin-tutor/gradle/version-catalog.md","localizedDate":"2023年5月22日","autoDesc":true}');export{p as comp,q as data};
