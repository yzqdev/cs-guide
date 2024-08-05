import{_ as t,c as e,o,d as n}from"./app-CbULZrmi.js";const a={},r=n(`<h1 id="安卓开发组件库" tabindex="-1"><a class="header-anchor" href="#安卓开发组件库"><span>安卓开发组件库</span></a></h1><p>appcompat源码</p><p>https://github.com/androidx/androidx/blob/androidx-main/appcompat/appcompat/build.gradle</p><h2 id="组件库kts" tabindex="-1"><a class="header-anchor" href="#组件库kts"><span>组件库kts</span></a></h2><pre><code class="language-kotlin">plugins {
  id(&quot;com.android.library&quot;)
  id(&quot;org.jetbrains.kotlin.android&quot;)

}
android {
  compileSdk = rootProject.extra[&quot;compileSdk&quot;] as Int
  defaultConfig {
    minSdk=rootProject.extra[&quot;minSdk&quot;] as Int
    targetSdk=rootProject.extra[&quot;targetSdk&quot;] as Int}
}

dependencies {
  implementation(fileTree(mapOf(&quot;dir&quot; to &quot;libs&quot;, &quot;include&quot; to listOf(&quot;*.jar&quot;,&quot;*.aar&quot;))))
  implementation(androidEx.appcompat)
}
</code></pre><h2 id="demo演示kts" tabindex="-1"><a class="header-anchor" href="#demo演示kts"><span>demo演示kts</span></a></h2><pre><code class="language-kotlin">plugins {
  id(&quot;com.android.application&quot;)
  id(&quot;org.jetbrains.kotlin.android&quot;)
}
android {
  compileSdk = rootProject.extra[&quot;compileSdk&quot;] as Int
  namespace = &quot;com.yzq.demo&quot;

  defaultConfig {
    applicationId = &quot;com.yzq.demo&quot;
    minSdk = rootProject.extra[&quot;minSdk&quot;] as Int
    targetSdk = rootProject.extra[&quot;targetSdk&quot;] as Int
    versionCode = 1
    versionName = &quot;1.0&quot;
  }
  buildFeatures{
    viewBinding{
      enable=true
    }
  }
  buildTypes {
    named(&quot;release&quot;) {
      isMinifyEnabled = false
      setProguardFiles(
        listOf(
          getDefaultProguardFile(&quot;proguard-android.txt&quot;),
          &quot;proguard-rules.pro&quot;
        )
      )
    }
  }
}

dependencies {
  implementation(fileTree(mapOf(&quot;dir&quot; to &quot;libs&quot;, &quot;include&quot; to listOf(&quot;*.jar&quot;, &quot;*.aar&quot;))))

  implementation(project(&quot;:ArcLayout&quot;))
  implementation(androidEx.bundles.common)
  testImplementation(jTest.core)
  androidTestImplementation(jTest.ext)
  androidTestImplementation(jTest.espresso)

}
</code></pre>`,7),i=[r];function d(p,l){return o(),e("div",null,i)}const u=t(a,[["render",d],["__file","library.html.vue"]]),c=JSON.parse('{"path":"/kotlin-tutor/gradle/library.html","title":"安卓开发组件库","lang":"zh-CN","frontmatter":{"description":"安卓开发组件库 appcompat源码 https://github.com/androidx/androidx/blob/androidx-main/appcompat/appcompat/build.gradle 组件库kts demo演示kts","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/kotlin-tutor/gradle/library.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"安卓开发组件库"}],["meta",{"property":"og:description","content":"安卓开发组件库 appcompat源码 https://github.com/androidx/androidx/blob/androidx-main/appcompat/appcompat/build.gradle 组件库kts demo演示kts"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"安卓开发组件库\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"组件库kts","slug":"组件库kts","link":"#组件库kts","children":[]},{"level":2,"title":"demo演示kts","slug":"demo演示kts","link":"#demo演示kts","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.43,"words":128},"filePathRelative":"kotlin-tutor/gradle/library.md","localizedDate":"2023年5月22日","autoDesc":true}');export{u as comp,c as data};
