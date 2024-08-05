import{_ as e,c as o,o as t,d as n}from"./app-CbULZrmi.js";const r={},i=n(`<h1 id="build-gradle" tabindex="-1"><a class="header-anchor" href="#build-gradle"><span>build.gradle</span></a></h1><h2 id="例子" tabindex="-1"><a class="header-anchor" href="#例子"><span>例子</span></a></h2><h3 id="kts" tabindex="-1"><a class="header-anchor" href="#kts"><span>kts</span></a></h3><pre><code class="language-kotlin">plugins {  
  id(&quot;com.android.application&quot;)  
  id(&quot;org.jetbrains.kotlin.android&quot;)  
  alias(libs.plugins.kapt)  
}  
apply(System.getenv(&quot;gradle_ext&quot;) + &quot;\\\\sign.gradle&quot;)  
android {  
  namespace = &quot;ab.yzq.tutor.xpagemini&quot;  
  
  defaultConfig {  
    applicationId = &quot;ab.yzq.tutor.xpagemini&quot;  
    versionCode = 1  
    versionName = &quot;1.0&quot;  
  
    testInstrumentationRunner = &quot;androidx.test.runner.AndroidJUnitRunner&quot;  
  }  
  
  buildTypes {  
    release {  
      isMinifyEnabled = false  
      proguardFiles(  
        getDefaultProguardFile(&quot;proguard-android-optimize.txt&quot;),  
        &quot;proguard-rules.pro&quot;  
      )  
    }  
  }  
  compileOptions {  
    sourceCompatibility = JavaVersion.VERSION_1_8  
    targetCompatibility = JavaVersion.VERSION_1_8  
  }  
  kotlinOptions {  
    jvmTarget = &quot;1.8&quot;  
  }  
}  
  
dependencies {  
  implementation(libs.bundles.core)  
  implementation(libs.xui)  
  implementation(libs.xpage)  
  implementation(libs.glide)  
  kapt(libs.xpage.compiler)  
}
</code></pre><h3 id="groovy" tabindex="-1"><a class="header-anchor" href="#groovy"><span>groovy</span></a></h3><pre><code class="language-groovy">plugins {  
  id &#39;com.android.application&#39;  
  id &quot;org.jetbrains.kotlin.kapt&quot;  
  id &#39;kotlin-android&#39;  
  id &#39;img-optimizer&#39;  
}  
//打包时，记得设置true启用  
  
apply from: System.getenv(&quot;gradle_ext&quot;) + &quot;\\\\sign.gradle&quot;  
android {  
  
  
  defaultConfig {  
    applicationId &quot;ab.yzq.tutor&quot;  
  
    versionCode 1  
    versionName &quot;1.0&quot;  
    testInstrumentationRunner &quot;androidx.test.runner.AndroidJUnitRunner&quot;  
  
    vectorDrawables.useSupportLibrary = true  
  
    javaCompileOptions {  
      annotationProcessorOptions {  
        arguments = [moduleName: project.getName()]  
      }  
    }  
  }  
buildTypes {  
  release{  
    buildConfigField &quot;String&quot;, &quot;APP_ID_UMENG&quot;, &quot;appID&quot;  
  }  
  debug{  
    buildConfigField &quot;String&quot;, &quot;APP_ID_UMENG&quot;, &quot;aa&quot;  
  }  
}  
  
  compileOptions {  
    sourceCompatibility JavaVersion.VERSION_1_8  
    targetCompatibility JavaVersion.VERSION_1_8  
  }  
  kotlinOptions {  
    jvmTarget = &quot;1.8&quot;  
  }  
  buildFeatures {  
    viewBinding true  
  }  
  namespace &#39;ab.yzq.tutor&#39;  
  lint {  
    abortOnError false  
  }  
}  
  
dependencies {  
  implementation fileTree(dir: &#39;libs&#39;, include: [&#39;*.jar&#39;])  
  implementation(libs.bundles.core)  
  
}
</code></pre><h2 id="添加依赖" tabindex="-1"><a class="header-anchor" href="#添加依赖"><span>添加依赖</span></a></h2><pre><code class="language-kotlin">implementation(files(&quot;./commonjar/3rdparty/gson-2.8.5.jar&quot;))
implementation(fileTree(mapOf(&quot;dir&quot; to &quot;libs&quot;, &quot;include&quot; to listOf(&quot;*.jar&quot;, &quot;*.aar&quot;))))
implementation(fileTree(&quot;libs&quot;) {
        include(&quot;*.jar&quot;, &quot;*.aar&quot;)
    })
</code></pre><h2 id="配置ndk" tabindex="-1"><a class="header-anchor" href="#配置ndk"><span>配置ndk</span></a></h2><h3 id="goovy" tabindex="-1"><a class="header-anchor" href="#goovy"><span>goovy</span></a></h3><pre><code class="language-groovy">defaultConfig {  
  ndk {  
    abiFilters &quot;arm64-v8a&quot;//, &quot;armeabi-v7a&quot;  
  }  
  
  minSdk 26  
  targetSdk 34  
  
  testInstrumentationRunner &#39;androidx.test.runner.AndroidJUnitRunner&#39;  
}
</code></pre><h3 id="kts-1" tabindex="-1"><a class="header-anchor" href="#kts-1"><span>kts</span></a></h3><pre><code class="language-kotlin">\`\`\`kotlin
 ndk {
        abiFilters += listOf(&quot;armeabi-v7a&quot;, &quot;arm64-v8a&quot;, &quot;x86&quot;, &quot;x86_64&quot;)
    }
</code></pre><h2 id="配置buildtypes" tabindex="-1"><a class="header-anchor" href="#配置buildtypes"><span>配置buildTypes</span></a></h2><h3 id="groovy-1" tabindex="-1"><a class="header-anchor" href="#groovy-1"><span>groovy</span></a></h3><pre><code class="language-groovy"> signingConfigs {  
  debug {  
    storeFile file(System.getenv(&quot;gradle_ext&quot;) + &quot;\\\\appkey.jks&quot;)//file(&quot;$rootDir/appkey.jks&quot;)  
    storePassword &quot;123456&quot;  
    keyAlias &quot;appkey&quot;  
    keyPassword &quot;123456&quot;  
  }  
  release {  
    storeFile file(System.getenv(&quot;gradle_ext&quot;) + &quot;\\\\appkey.jks&quot;)//file(&quot;$rootDir/appkey.jks&quot;)  
    storePassword &quot;123456&quot;  
    keyAlias &quot;appkey&quot;  
    keyPassword &quot;123456&quot;  
  }  
}
   buildTypes {
        release {
            minifyEnabled true
            //后缀
			applicationIdSuffix &#39;.jv.debug&#39;  
            //版本名前缀
			versionNameSuffix &#39;-DEBUG&#39;
            proguardFiles getDefaultProguardFile(&#39;proguard-android.txt&#39;), &#39;proguard-rules.pro&#39;
            signingConfig signingConfigs.config
            //buildConfigField用于给BuildConfig文件添加一个字段
            //三个参数:1.要定义的常量的类型 2.该常量的命名 3.该常量的值
            buildConfigField(&quot;String&quot;, &quot;HTTP_BASE&quot;, &#39;&quot;https://www.baidu.com/api/release/&quot;&#39;)
            buildConfigField(&quot;String&quot;,&quot;HAHA&quot;,&quot;\\&quot;haahahah\\&quot;&quot;)
        }
        debug{
            buildConfigField(&quot;String&quot;, &quot;HTTP_BASE&quot;, &#39;&quot;https://www.baidu.com/api/debug&quot;&#39;)
            buildConfigField(&quot;String&quot;,&quot;HAHA&quot;,&quot;\\&quot;haahahah\\&quot;&quot;)
        }
    }
 
</code></pre><h3 id="kts-2" tabindex="-1"><a class="header-anchor" href="#kts-2"><span>kts</span></a></h3><pre><code class="language-kotlin">android {
    signingConfigs {
        getByName(&quot;debug&quot;) {
            keyAlias = &quot;debug&quot;
            keyPassword = &quot;my debug key password&quot;
            storeFile = file(&quot;/home/miles/keystore.jks&quot;)
            storePassword = &quot;my keystore password&quot;
        }
        create(&quot;release&quot;) {
            keyAlias = &quot;release&quot;
            keyPassword = &quot;my release key password&quot;
            storeFile = file(&quot;/home/miles/keystore.jks&quot;)
            storePassword = &quot;my keystore password&quot;
        }
    }
    compileSdkVersion(28)
    defaultConfig {
        applicationId = &quot;com.mileskrell.someneatapp&quot;
        minSdkVersion(19)
        targetSdkVersion(28)
        versionCode = 1
        versionName = &quot;1.0&quot;
        testInstrumentationRunner = &quot;androidx.test.runner.AndroidJUnitRunner&quot;
    }
    buildTypes {
        getByName(&quot;release&quot;) {
            isMinifyEnabled = false
            buildConfigField(&quot;String&quot;,&quot;myId&quot;,gradleLocalProperties(rootDir).getProperty(&quot;myId&quot;))
            proguardFiles(getDefaultProguardFile(&quot;proguard-android-optimize.txt&quot;), &quot;proguard-rules.pro&quot;)
            signingConfig = signingConfigs.getByName(&quot;release&quot;)
            isDebuggable = false
        }
        getByName(&quot;debug&quot;) {
        
           proguardFiles(getDefaultProguardFile(&quot;proguard-android-optimize.txt&quot;), &quot;proguard-rules.pro&quot;)
           buildConfigField(&quot;String&quot;,&quot;myId&quot;,gradleLocalProperties(rootDir).getProperty(&quot;myId&quot;))
            signingConfig = signingConfigs.getByName(&quot;debug&quot;)
            isDebuggable = true
        }
    }
}
</code></pre><h2 id="配置jdk" tabindex="-1"><a class="header-anchor" href="#配置jdk"><span>配置jdk</span></a></h2><pre><code class="language-groovy">compileOptions {  
  sourceCompatibility = JavaVersion.VERSION_17  
  targetCompatibility = JavaVersion.VERSION_17  
}  
kotlinOptions {  
  jvmTarget = &quot;17&quot;  
}
</code></pre><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h2><h2 id="apply" tabindex="-1"><a class="header-anchor" href="#apply"><span>apply</span></a></h2><pre><code>//groovy  
apply from: &#39;custom.gradle&#39;  
  
// kotlin-dsl  
apply(from = &quot;custom.gradle&quot;)

//groovy
apply plugin:&quot;kotlin-android&quot;
//kts
apply(plugin=&quot;kotlin-android&quot;)
</code></pre><h2 id="ext" tabindex="-1"><a class="header-anchor" href="#ext"><span>ext</span></a></h2><h3 id="groovy-2" tabindex="-1"><a class="header-anchor" href="#groovy-2"><span>groovy</span></a></h3><pre><code class="language-groovy">ext {  
    compileSdkVersion = 28  
    buildToolsVersion = &quot;28.0.3&quot;  
  
    supportLibVersion = &quot;28.0.0&quot;  
    ...  
}
//使用
minSdk = rootProject.extra.get(&quot;minSdk&quot;) 
</code></pre><h3 id="kts-3" tabindex="-1"><a class="header-anchor" href="#kts-3"><span>kts</span></a></h3><pre><code class="language-kotlin">
extra[&quot;minSdk&quot;]=24
extra[&quot;compileSdk&quot;]=34

//使用
minSdk = rootProject.extra[&quot;minSdk&quot;] as Int
minSdk = rootProject.extra.get(&quot;minSdk&quot;) as Int
</code></pre><h2 id="获取local-properties" tabindex="-1"><a class="header-anchor" href="#获取local-properties"><span>获取local.properties</span></a></h2><h2 id="groovy-3" tabindex="-1"><a class="header-anchor" href="#groovy-3"><span>groovy</span></a></h2><pre><code class="language-groovy"> 
Properties properties = new Properties()
properties.load(project.rootProject.file(&#39;local.properties&#39;).newDataInputStream())
def sdkDir = properties.getProperty(&#39;sdk.dir&#39;)
def ndkDir = properties.getProperty(&#39;ndk.dir&#39;)


 
Properties properties = new Properties()
if (rootProject.file(&quot;local.properties&quot;).exists()) {
    properties.load(rootProject.file(&quot;local.properties&quot;).newDataInputStream())
}

println properties.getProperty(&quot;sdk.dir&quot;, &quot;&quot;)
</code></pre><pre><code>## kts

\`\`\`kotlin
//第一种
import java.util.*
// ...

val properties = Properties().apply {
    load(rootProject.file(&quot;local.properties&quot;).reader())
}
val myProp = properties[&quot;propName&quot;]


//第二种

 
import com.android.build.gradle.internal.cxx.configure.gradleLocalProperties
// ...

val properties = gradleLocalProperties(rootDir)
val myProp = properties[&quot;propName&quot;]
 
</code></pre>`,32),a=[i];function l(s,u){return t(),o("div",null,a)}const p=e(r,[["render",l],["__file","buildgradle-config.html.vue"]]),g=JSON.parse('{"path":"/android-tips/buildgradle-config.html","title":"build.gradle","lang":"zh-CN","frontmatter":{"description":"build.gradle 例子 kts groovy 添加依赖 配置ndk goovy kts 配置buildTypes groovy kts 配置jdk 其他 apply ext groovy kts 获取local.properties groovy","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/buildgradle-config.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"build.gradle"}],["meta",{"property":"og:description","content":"build.gradle 例子 kts groovy 添加依赖 配置ndk goovy kts 配置buildTypes groovy kts 配置jdk 其他 apply ext groovy kts 获取local.properties groovy"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-20T18:32:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-09-20T18:32:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"build.gradle\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-20T18:32:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"例子","slug":"例子","link":"#例子","children":[{"level":3,"title":"kts","slug":"kts","link":"#kts","children":[]},{"level":3,"title":"groovy","slug":"groovy","link":"#groovy","children":[]}]},{"level":2,"title":"添加依赖","slug":"添加依赖","link":"#添加依赖","children":[]},{"level":2,"title":"配置ndk","slug":"配置ndk","link":"#配置ndk","children":[{"level":3,"title":"goovy","slug":"goovy","link":"#goovy","children":[]},{"level":3,"title":"kts","slug":"kts-1","link":"#kts-1","children":[]}]},{"level":2,"title":"配置buildTypes","slug":"配置buildtypes","link":"#配置buildtypes","children":[{"level":3,"title":"groovy","slug":"groovy-1","link":"#groovy-1","children":[]},{"level":3,"title":"kts","slug":"kts-2","link":"#kts-2","children":[]}]},{"level":2,"title":"配置jdk","slug":"配置jdk","link":"#配置jdk","children":[]},{"level":2,"title":"其他","slug":"其他","link":"#其他","children":[]},{"level":2,"title":"apply","slug":"apply","link":"#apply","children":[]},{"level":2,"title":"ext","slug":"ext","link":"#ext","children":[{"level":3,"title":"groovy","slug":"groovy-2","link":"#groovy-2","children":[]},{"level":3,"title":"kts","slug":"kts-3","link":"#kts-3","children":[]}]},{"level":2,"title":"获取local.properties","slug":"获取local-properties","link":"#获取local-properties","children":[]},{"level":2,"title":"groovy","slug":"groovy-3","link":"#groovy-3","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1695234758000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.86,"words":559},"filePathRelative":"android-tips/buildgradle-config.md","localizedDate":"2023年6月25日","autoDesc":true}');export{p as comp,g as data};
