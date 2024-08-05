import{_ as e,c as o,o as t,d as n}from"./app-CbULZrmi.js";const a={},i=n(`<h1 id="gradle技巧" tabindex="-1"><a class="header-anchor" href="#gradle技巧"><span>gradle技巧</span></a></h1><h2 id="gradle添加ext" tabindex="-1"><a class="header-anchor" href="#gradle添加ext"><span>gradle添加ext</span></a></h2><h2 id="使用extra" tabindex="-1"><a class="header-anchor" href="#使用extra"><span>使用extra</span></a></h2><p><strong>注意</strong></p><pre><code class="language-kotlin">ext{
    set(&quot;development&quot;,true)
}

</code></pre><p><a href="https://juejin.cn/post/6979872825561579533" target="_blank" rel="noopener noreferrer">https://juejin.cn/post/6979872825561579533</a><a href="https://developer.android.google.cn/studio/build/migrate-to-kts?hl=zh-cn" target="_blank" rel="noopener noreferrer">https://developer.android.google.cn/studio/build/migrate-to-kts?hl=zh-cn</a></p><p>Google 官方推荐的一个 Gradle 配置<a href="https://developer.android.google.cn/studio/build/gradle-tips?hl=zh-cn" target="_blank" rel="noopener noreferrer">最佳实践</a>是在项目最外层 build.gradle 文件的<code>ext</code>代码块中定义项目范围的属性，然后在所有模块间共享这些属性，比如我们通常会这样存放依赖的版本号。</p><pre><code class="language-groovy">// build.gradle

ext {
    compileSdkVersion = 28
    buildToolsVersion = &quot;28.0.3&quot;
    supportLibVersion = &quot;28.0.0&quot;
    ...
}
 
</code></pre><p>但是由于缺乏IDE的辅助(跳转查看、全局重构等都不支持)，实际使用体验欠佳。</p><p>在<code>KTL</code>中用<code>extra</code>来代替<code>Groovy</code>中的<code>ext</code></p><pre><code class="language-kotlin">// The extra object can be used for custom properties and makes them available to all
// modules in the project.
// The following are only a few examples of the types of properties you can define.
extra[&quot;compileSdkVersion&quot;] = 28
// You can also create properties to specify versions for dependencies.
// Having consistent versions between modules can avoid conflicts with behavior.
extra[&quot;supportLibVersion&quot;] = &quot;28.0.0&quot;
 
android {
    // Use the following syntax to access properties you defined at the project level:
    // rootProject.extra[&quot;property_name&quot;]
    compileSdkVersion(rootProject.extra[&quot;sdkVersion&quot;])

    // Alternatively, you can access properties using a type safe delegate:
    val sdkVersion: Int by rootProject.extra
    ...
    compileSdkVersion(sdkVersion)
}
...
dependencies {
    implementation(&quot;com.android.support:appcompat-v7:\${rootProject.ext.supportLibVersion}&quot;)
    ...
}
 
</code></pre><blockquote><p><code>build.gralde</code>中的<code>ext</code>数据是可以在<code>build.gradle.kts</code>中使用<code>extra</code>进行访问的。 使用</p></blockquote><pre><code class="language-kotlin"> minSdk=rootProject.extra[&quot;minSdk&quot;] as Int
targetSdk=rootProject.extra[&quot;targetSdk&quot;] as Int

</code></pre><h2 id="使用gradle-properties" tabindex="-1"><a class="header-anchor" href="#使用gradle-properties"><span>使用gradle.properties</span></a></h2><p>gradle.properties</p><pre><code class="language-ini">android.nonTransitiveRClass=true
compose_version=1.2.1
compiler_version=1.3.1
ktor_version=2.1.1
retrofitVersion=2.9.0
</code></pre><p>然后在子项目的build.gradle.kts中配置</p><pre><code class="language-kotlin">val compose_version: String by project
val compiler_version: String by project
plugins {
    id(&quot;com.android.application&quot;)
    id(&quot;org.jetbrains.kotlin.android&quot;)
}

android {
    compileSdk = rootProject.extra[&quot;compileSdk&quot;] as Int
    namespace = &quot;com.yzq.mobile.comp.qiqi&quot;
    defaultConfig {
        applicationId = &quot;com.yzq.mobile.comp.qiqi&quot;
        minSdk = rootProject.extra[&quot;minSdk&quot;] as Int
        targetSdk = rootProject.extra[&quot;targetSdk&quot;] as Int
        versionCode = 1
        versionName = &quot;1.0.1&quot;

        testInstrumentationRunner = &quot;androidx.test.runner.AndroidJUnitRunner&quot;
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        named(&quot;release&quot;) {
            isMinifyEnabled = false
            setProguardFiles(
                listOf(
                    getDefaultProguardFile(&quot;proguard-android-optimize.txt&quot;),
                    &quot;proguard-rules.pro&quot;
                )
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
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion =  libs.versions.composeVersion.get()//&quot;1.3.2&quot;
    }
    packagingOptions {
        resources {
            excludes += &quot;/META-INF/{AL2.0,LGPL2.1}&quot;
        }
    }
}

dependencies {

    implementation(&quot;androidx.core:core-ktx:1.9.0&quot;)
    implementation(&quot;androidx.compose.ui:ui:$compose_version&quot;)
    implementation(&quot;androidx.compose.material:material:$compose_version&quot;)
    implementation(&quot;androidx.compose.ui:ui-tooling-preview:$compose_version&quot;)
    implementation(&quot;androidx.lifecycle:lifecycle-runtime-ktx:2.5.1&quot;)
    implementation(&quot;androidx.activity:activity-compose:1.6.0&quot;)
    testImplementation(&quot;junit:junit:4.13.2&quot;)
    androidTestImplementation(&quot;androidx.test.ext:junit:1.1.3&quot;)
    androidTestImplementation(&quot;androidx.test.espresso:espresso-core:3.4.0&quot;)
    androidTestImplementation(&quot;androidx.compose.ui:ui-test-junit4:$compose_version&quot;)
    debugImplementation(&quot;androidx.compose.ui:ui-tooling:$compose_version&quot;)
    debugImplementation(&quot;androidx.compose.ui:ui-test-manifest:$compose_version&quot;)
}
</code></pre><h2 id="gradle引入外部gradle文件" tabindex="-1"><a class="header-anchor" href="#gradle引入外部gradle文件"><span>gradle引入外部gradle文件</span></a></h2><ul><li>compat.gradle文件</li></ul><pre><code class="language-groovy">  
def compatImp() {  
    return dependencies {  
        implementation(&quot;androidx.core:core-ktx:1.9.0&quot;)  
        implementation(&quot;androidx.annotation:annotation:1.5.0&quot;)  
        implementation(&quot;androidx.appcompat:appcompat:1.5.1&quot;)  
        implementation(&quot;com.google.android.material:material:1.6.1&quot;)  
        implementation(&quot;androidx.constraintlayout:constraintlayout:2.1.4&quot;)  
  
    }  
}  
def roomImp(){  
    return dependencies {  
        def room_version = &quot;2.5.2&quot;  
        // Room libraries  
        implementation(&quot;androidx.room:room-runtime:$room_version&quot;)  
        ksp(&quot;androidx.room:room-compiler:$room_version&quot;)  
        implementation(&quot;androidx.room:room-ktx:$room_version&quot;)  
    }  
}  
ext {  
    compatImpl = this.&amp;compatImp  
    roomImpl=this.&amp;roomImp  
}
</code></pre><ul><li>build.gradle.kts引用后使用</li></ul><pre><code class="language-kotlin">ext.set(&quot;coreDeps&quot;, &quot;y&quot;)  
ext.set(&quot;otherDeps&quot;, &quot;y&quot;)  
apply(from = &quot;../compat.gradle&quot;)  
  
val roomImpl: groovy.lang.Closure&lt;Any&gt; by ext  
roomImpl()
</code></pre><ul><li>build.gradle引用使用</li></ul><pre><code class="language-groovy">ext.set(&quot;coreDeps&quot;,&quot;y&quot;)  
apply from:&quot;../compat.gradle&quot;  
apply from:&quot;../sign.gradle&quot;
compatImpl()
</code></pre><h2 id="关于gradle插件" tabindex="-1"><a class="header-anchor" href="#关于gradle插件"><span>关于gradle插件</span></a></h2><p>agp(android gradle plugin)的定义</p><pre><code class="language-text">implementation &quot;com.android.tools.build:gradle:7.3.1&quot;
</code></pre><p>而为什么我们要在根目录的build.gradle.kts加上<code>com.android.application</code>?</p><p><code>com.android.application</code>的artifactid是</p><pre><code class="language-kotlin">// https://mvnrepository.com/artifact/com.android.application/com.android.application.gradle.plugin
implementation(&quot;com.android.application:com.android.application.gradle.plugin:7.3.1&quot;)

</code></pre><p>内部含有依赖<code>com.android.tools.build:gradle</code>,所以我们只需要引用<code>com.android.application</code>就可以了 同理<code>com.android.library</code></p><pre><code class="language-kotlin">// https://mvnrepository.com/artifact/com.android.library/com.android.library.gradle.plugin
implementation(&quot;com.android.library:com.android.library.gradle.plugin:7.3.1&quot;)

</code></pre><p>也包含了<code>com.android.tools.build:gradle</code> 我们最终只需要在根目录的build.gradle.kts加上</p><pre><code class="language-kotlin">plugins {
    id(&quot;com.android.application&quot;) version &quot;7.3.1&quot; apply false
    id(&quot;com.android.library&quot;) version &quot;7.3.1&quot; apply false
    id(&quot;org.jetbrains.kotlin.android&quot;) version &quot;1.7.10&quot; apply false
    id(&quot;org.jetbrains.kotlin.jvm&quot;) version &quot;1.7.10&quot; apply false
}
</code></pre><h3 id="修改生成apk名称和buildconfig中添加apk支持的cpu架构" tabindex="-1"><a class="header-anchor" href="#修改生成apk名称和buildconfig中添加apk支持的cpu架构"><span>修改生成apk名称和BuildConfig中添加apk支持的cpu架构</span></a></h3><pre><code class="language-kotlin">val abiCodes = mapOf(&quot;armeabi-v7a&quot; to 1, &quot;x86&quot; to 2, &quot;x86_64&quot; to 3)
android.applicationVariants.all {
    val buildType = this.buildType.name
    val variant = this
    outputs.all {
        val name =
            this.filters.find { it.filterType == com.android.build.api.variant.FilterConfiguration.FilterType.ABI.name }?.identifier
        val baseAbiCode = abiCodes[name]
        if (baseAbiCode != null) {
           //写入cpu架构信息
            variant.buildConfigField(&quot;String&quot;, &quot;CUP_ABI&quot;, &quot;\\&quot;\${name}\\&quot;&quot;)
        }
        if (this is com.android.build.gradle.internal.api.ApkVariantOutputImpl) {
            //修改apk名称
            if (buildType == &quot;release&quot;) {
                this.outputFileName = &quot;KotlinDSL_\${name}_\${buildType}.apk&quot;
            } else if (buildType == &quot;debug&quot;) {
                this.outputFileName = &quot;KotlinDSL_V\${variant.versionName}_\${name}_\${buildType}.apk&quot;
            }
        }
    }
}
 
</code></pre><h2 id="使用java8的timeapi不生效" tabindex="-1"><a class="header-anchor" href="#使用java8的timeapi不生效"><span>使用java8的timeapi不生效</span></a></h2><p>添加</p><pre><code class="language-KotlinDSL">   compileOptions {
      isCoreLibraryDesugaringEnabled=true
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
dependencies{
     coreLibraryDesugaring(&quot;com.android.tools:desugar_jdk_libs:1.2.2&quot;)
}
</code></pre><h2 id="gradle依赖引入" tabindex="-1"><a class="header-anchor" href="#gradle依赖引入"><span>Gradle依赖引入</span></a></h2><p>自Android studio版本更新至3.0后，连带着<strong>com.android.tools.build:gradle</strong> 工具也升级到了3.0.0，在3.0.0中使用了最新的<strong>Gralde 4.0</strong> 里程碑版本作为gradle的编译版本，该版本gradle编译速度有所加速；</p><h3 id="gradle新老版本关键字" tabindex="-1"><a class="header-anchor" href="#gradle新老版本关键字"><span>Gradle新老版本关键字</span></a></h3><table><thead><tr><th>4.x+版本配置</th><th>已弃用配置</th></tr></thead><tbody><tr><td>api</td><td>compile</td></tr><tr><td>implement</td><td>compile</td></tr><tr><td>compileOnly</td><td>provided</td></tr><tr><td>runtimeOnly</td><td>apk</td></tr><tr><td>testimplementation</td><td>testCompile</td></tr><tr><td>androidTestimplementation</td><td>androidTestCompile</td></tr><tr><td>debugimplementation</td><td>debugCompile</td></tr><tr><td>releaseimplementation</td><td>releaseCompile</td></tr></tbody></table><ul><li><strong>api</strong></li></ul><blockquote><p>与compile对应，功能完全一样，会添加依赖到编译路径，并且会将依赖打包到输出（aar或apk），与implementation不同，这个依赖可以传递，其他module无论在编译时和运行时都可以访问这个依赖的实现，也就是会泄漏一些不应该不使用的实现。举个例子，A依赖B，B依赖C，如果都是使用api配置的话，A可以直接使用C中的类（编译时和运行时），而如果是使用implementation配置的话，在编译时，A是无法访问C中的类的。</p></blockquote><div class="hint-container tip"><p class="hint-container-title">提示</p><p>详细说明:</p><p>假设你开发了一个工具包，你想将这个工具包打包成 <code>jar</code> 文件使得其他人可以使用，一般可以这样做：</p><pre><code class="language-groovy">plugins {
 id &#39;java-library&#39;
 id &#39;maven-publish&#39; // 使用这个插件打包
}
// ... 其他配置省略
dependencies {
 // 这个引入是为了说明 api 和其他方式的区别
 implementation(&quot;org.apache.commons:commons-lang3:3.8.1&quot;)
}


</code></pre><p>执行以下命令即可在项目目录下的 <code>build/libs</code> 下发现打好的 <code>jar</code> 文件。</p><pre><code>gradle clean build
或者
gradle clean publishToMavenLocal
这个如果是从远端引用依赖,而不是下载jar包就没问题,远端引用依赖会自动下载pom里面的依赖
</code></pre><p>此时将 <code>jar</code> 包拷贝给别人的 <code>lib</code> 目录下使用，发现对方无法使用 <code>org.apache.commons:commons-lang3</code> 包下的工具类，需要手动引入一下才行。因为用 <code>implementation</code> 方式引入的依赖在打包后只作用于 <code>runtime</code> ，只有使用 <code>api</code> 的方式才会同时作用于 <code>compile</code> 和 <code>runtime</code> ，同理， <code>compileOnlyApi</code> 就是只作用于 <code>compile</code> 。</p><pre><code class="language-groovy">plugins {
 id &#39;java-library&#39;
 id &#39;maven-publish&#39; // 使用这个插件打包
}
// ... 其他配置省略
dependencies {
 // 这个引入是为了说明 api 和其他方式的区别
 api(&quot;org.apache.commons:commons-lang3:3.8.1&quot;)
}


</code></pre><p>上面代码打包为jar,给别人引用就可以使用commons-lang3里面的方法了,</p><p>注意,只能是<code>api(project(&quot;:util&quot;))</code>这种,如果是使用打包的jar包,就不行,需要你的jar把依赖的文件打包进去</p><pre><code class="language-kotlin">dependencies{
api(fileTree(&quot;libs&quot;){  
  include(&quot;*.jar&quot;)  
})
}
</code></pre><p>java-library打包依赖到jar包的方法,注意这时候,api和implementation就不起作用了,因为已经打包进jar里面了</p><pre><code class="language-kotlin">tasks.jar {  
   
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
</code></pre><p>别人使用gradle引用的方法大概是这样</p><pre><code>dependencies {
 // 这个引入是为了说明 api 和其他方式的区别
 api(&quot;org.apache.commons:commons-lang3:3.8.1&quot;)
}

</code></pre></div><ul><li><strong>implementation</strong></li></ul><blockquote><p>与compile对应，会添加依赖到编译路径，并且会将依赖打包到输出（aar或apk），但是<strong>在编译时不会将依赖的实现暴露给其他module</strong>，也就是只有在运行时其他module才能访问这个依赖中的实现;((打包出来不包含他依赖的库,需要自行添加))</p></blockquote><blockquote><p>简单的说，就是使用implementation指令的依赖不会传递;</p></blockquote><blockquote><p>使用这个配置，可以显著提升构建时间，因为它可以减少重新编译的module的数量。Google建议尽量使用这个依赖配置;</p></blockquote><ul><li><strong>compileOnly</strong></li></ul><blockquote><p>与provided对应，Gradle把依赖加到编译路径，编译时使用，不会打包到输出（aar或apk）。这可以减少输出的体积，在只在编译时需要，在运行时可选的情况，很有用,比如lombok</p></blockquote><ul><li><strong>runtimeOnly</strong></li></ul><blockquote><p>表示引入的依赖不参与编译，只在运行时才用得到。比如： <code>数据库驱动</code>。</p></blockquote><ul><li><strong>testImplementation</strong></li></ul><blockquote><p>只在单元测试代码的编译以及最终打包测试apk时有效。</p></blockquote><ul><li><strong>androidTestImplementation</strong></li></ul><blockquote><p>只在Android相关单元测试代码的编译以及最终打包测试apk时有效。</p></blockquote><ul><li><strong>debugImplementation</strong></li></ul><blockquote><p>只在 debug 模式的编译和最终的 debug apk 打包时有效</p></blockquote><ul><li><strong>releaseImplementation</strong></li></ul><blockquote><p>仅仅针对 Release 模式的编译和最终的 Release apk 打包。</p></blockquote><hr><h3 id="引入依赖基本方式" tabindex="-1"><a class="header-anchor" href="#引入依赖基本方式"><span>引入依赖基本方式</span></a></h3><p>理论上gradle支持三种类型的引用，方式如下：</p><pre><code class="language-kotlin">dependencies {
    
    implementation(project(&quot;:projectABC&quot;))
    
    implementation(fileTree(dir: &quot;libs&quot;, include: [&quot;*.jar&quot;]))

    implementation(&quot;androidx.appcompat:appcompat:1.0.2&quot;)
}
</code></pre><h4 id="_1-本地项目依赖-module依赖" tabindex="-1"><a class="header-anchor" href="#_1-本地项目依赖-module依赖"><span>1. 本地项目依赖 --&gt; module依赖</span></a></h4><pre><code class="language-kotlin">dependencies {
    implementation(project(&quot;:projectABC&quot;))
}
</code></pre><p>这种依赖方式是直接依赖本地工程代码，比如这个 <strong>:projectABC</strong> 就是在整个工程项目配置的 <strong>settings.gradle</strong> 中进行include操作; 例如：</p><pre><code class="language-kotlin">dependencies {
   include (&quot;:projectABC&quot;)
}
</code></pre><h4 id="_2-本地二进制依赖-jar和so等文件" tabindex="-1"><a class="header-anchor" href="#_2-本地二进制依赖-jar和so等文件"><span>2. 本地二进制依赖 --&gt; jar和so等文件</span></a></h4><pre><code class="language-kotlin">dependencies {
    implementation(fileTree(dir: &quot;libs&quot;, include: [&quot;*.jar&quot;]))
}
</code></pre><p>这种依赖方式是依赖工程中 <strong>libs</strong> 目录下的Jar等文件；</p><p>如果还想进行单独某个文件的引用</p><pre><code class="language-kotlin">dependencies {
    implementation(files(&quot;libs/aaa.jar&quot;, &quot;libs/bbb.jar&quot;))
    implementation(files(&quot;x/y/z/ccc.jar&quot;))
}
</code></pre><blockquote><p>注意：Gradle的路径是相对于build.gradle文件来读取的，所以上面是这样的相对路径</p></blockquote><h4 id="_3-远端二进制依赖" tabindex="-1"><a class="header-anchor" href="#_3-远端二进制依赖"><span>3.远端二进制依赖</span></a></h4><pre><code class="language-kotlin">dependencies {
    implementation(&quot;androidx.appcompat:appcompat:1.0.2&quot;)
}
</code></pre><p>这是简洁写法，也可以进行完整写法，如：</p><pre><code class="language-kotlin">dependencies {
    implementation(group: &quot;androidx.appcompat&quot;, name:&quot;appcompat&quot;, version:&quot;1.0.2&quot;)
}
</code></pre><hr><h3 id="引入依赖复杂方式" tabindex="-1"><a class="header-anchor" href="#引入依赖复杂方式"><span>引入依赖复杂方式</span></a></h3><h4 id="根据task类型引入" tabindex="-1"><a class="header-anchor" href="#根据task类型引入"><span>根据Task类型引入</span></a></h4><p>有时候我们在引入的时候还需要考虑debug，release，test包的情况如</p><pre><code class="language-kotlin">dependencies {
    testimplementation(&quot;junit:junit:4.12&quot;)
    
    androidTestimplementation(&quot;com.android.support.test:runner:1.0.1&quot;)
    androidTestimplementation(&quot;com.android.support.test.espresso:espresso-core:3.0.1&quot;)
    
    debugimplementation(&quot;com.squareup.leakcanary:leakcanary-android:2.0-beta-2&quot;)
    releaseimplementation(&quot;com.squareup.leakcanary:leakcanary-android-no-op:2.0-beta-2&quot;)
}
</code></pre><h4 id="排除引用" tabindex="-1"><a class="header-anchor" href="#排除引用"><span>排除引用</span></a></h4><p>有时候为了解决引入的冲突，需要在引入远端包的同时排除这些包的某几个依赖</p><pre><code class="language-kotlin">dependencies {
    implementation(&quot;com.github.bumptech.glide:glide:4.9.0&quot;){
        exclude (group:&quot;com.android.support&quot;, module: &quot;support-fragment&quot;)
        exclude (group:&quot;com.android.support&quot;, module: &quot;support-core-ui&quot;)
        exclude (group:&quot;com.android.support&quot;, module: &quot;support-compat&quot;)
        exclude (group:&quot;com.android.support&quot;, module: &quot;support-annotations&quot;)
    }
}
</code></pre><h2 id="让debug和release不冲突" tabindex="-1"><a class="header-anchor" href="#让debug和release不冲突"><span>让debug和release不冲突</span></a></h2><p>添加下面的,包名会改变</p><pre><code class="language-kotlin">//kotlin kts
buildTypes{
     named(&quot;debug&quot;){
            applicationIdSuffix=&quot;.debug&quot;
        }
}
</code></pre><pre><code class="language-groovy">// groovy
buildTypes{
     debug{
            applicationIdSuffix=&quot;.debug&quot;
        }
}
</code></pre><p>或者</p><pre><code class="language-kotlin">productFlavors {
    free {
        applicationId &quot;net.company.appname.free&quot;
    }

    paid {
        applicationId &quot;net.company.appname.paid&quot;
    }
}
</code></pre><h2 id="split-api" tabindex="-1"><a class="header-anchor" href="#split-api"><span>split api</span></a></h2><pre><code class="language-kotlin">//kotlin kts 
  splits {
            abi {
                isEnable=true
                reset()
                // 设置包含，调用前需要先用 reset 将默认清除
                include(&quot;arm64-v8a&quot;,&quot;armeabi-v7a&quot;)
                isUniversalApk =true
            }
        }
</code></pre><pre><code class="language-groovy">defaultConfig{
     splits {
            abi {
                enable true
            }
        }
}
</code></pre><h2 id="gradle-设置builddir" tabindex="-1"><a class="header-anchor" href="#gradle-设置builddir"><span>gradle 设置buildDir</span></a></h2><p><code>Project.getBuildDir()</code> returns a non-lazy <code>File</code> which risks ordering issues between plugins and build file that read this before the value is changed.</p><p><code>ProjectLayout. getBuildDirectory()</code> was introduced in Gradle 4.1, so I think it&#39;s time to retire the old API by deprecating it in 8.0 and removing it in 9.0.</p><p>I am less concerned about <code>Project.setBuildDir()</code> has it&#39;s really the same as calling <code>ProjectLayout. getBuildDirectory().set()</code> but obviously deprecating/removing it would keep things consistent.</p><pre><code class="language-kotlin">allprojects{
    // 将构建文件统一输出到项目根目录下的 build 文件夹
    layout.buildDirectory = File(rootDir, &quot;build/\${path.replace(&#39;:&#39;, &#39;/&#39;)}&quot;)
}
</code></pre><h2 id="使用includebuild" tabindex="-1"><a class="header-anchor" href="#使用includebuild"><span>使用includeBuild</span></a></h2><p>添加插件</p><pre><code class="language-kotlin">pluginManagement {
    repositories {
      maven(&quot;https://jitpack.io&quot;)
        gradlePluginPortal()
        google()
        mavenCentral()
    }
  includeBuild(System.getenv(&quot;gradle_plugin_bom&quot;)+&quot;\\\\deps&quot;)
}
</code></pre><p>然后就可以在子项目使用插件了</p><pre><code class="language-kotlin">plugins {
    id(&quot;com.github.your-repo-name.your-plugin-name&quot;)
}
</code></pre><h3 id="添加外部library" tabindex="-1"><a class="header-anchor" href="#添加外部library"><span>添加外部library</span></a></h3><ul><li>第一种方法</li></ul><pre><code class="language-kotlin">//\`settings.gradle.kts\`
include(&quot;:compLib&quot;)
project(&quot;:compLib&quot;).projectDir=file(System.getenv(&quot;gradle_plugin_bom&quot;)+&quot;\\\\compLib&quot;)
//子项目中使用
dependencies {
 implementation(project(&quot;:compLib&quot;))
}
</code></pre><ul><li>第二中方法</li></ul><pre><code class="language-kotlin">//
includeBuild(System.getenv(&quot;gradle_plugin_bom&quot;)+&quot;\\\\klee&quot;)
//子项目中使用

implementation(&quot;ab.yzq.klee:klee:1.0.0&quot;)
</code></pre>`,113),r=[i];function l(d,p){return t(),o("div",null,r)}const s=e(a,[["render",l],["__file","gradle-tips.html.vue"]]),c=JSON.parse('{"path":"/kotlin-tutor/gradle/gradle-tips.html","title":"gradle技巧","lang":"zh-CN","frontmatter":{"description":"gradle技巧 gradle添加ext 使用extra 注意 https://juejin.cn/post/6979872825561579533 https://developer.android.google.cn/studio/build/migrate-to-kts?hl=zh-cn Google 官方推荐的一个 Gradle 配置最佳实践是...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/kotlin-tutor/gradle/gradle-tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"gradle技巧"}],["meta",{"property":"og:description","content":"gradle技巧 gradle添加ext 使用extra 注意 https://juejin.cn/post/6979872825561579533 https://developer.android.google.cn/studio/build/migrate-to-kts?hl=zh-cn Google 官方推荐的一个 Gradle 配置最佳实践是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-05T15:16:51.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-01-05T15:16:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"gradle技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-01-05T15:16:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"gradle添加ext","slug":"gradle添加ext","link":"#gradle添加ext","children":[]},{"level":2,"title":"使用extra","slug":"使用extra","link":"#使用extra","children":[]},{"level":2,"title":"使用gradle.properties","slug":"使用gradle-properties","link":"#使用gradle-properties","children":[]},{"level":2,"title":"gradle引入外部gradle文件","slug":"gradle引入外部gradle文件","link":"#gradle引入外部gradle文件","children":[]},{"level":2,"title":"关于gradle插件","slug":"关于gradle插件","link":"#关于gradle插件","children":[{"level":3,"title":"修改生成apk名称和BuildConfig中添加apk支持的cpu架构","slug":"修改生成apk名称和buildconfig中添加apk支持的cpu架构","link":"#修改生成apk名称和buildconfig中添加apk支持的cpu架构","children":[]}]},{"level":2,"title":"使用java8的timeapi不生效","slug":"使用java8的timeapi不生效","link":"#使用java8的timeapi不生效","children":[]},{"level":2,"title":"Gradle依赖引入","slug":"gradle依赖引入","link":"#gradle依赖引入","children":[{"level":3,"title":"Gradle新老版本关键字","slug":"gradle新老版本关键字","link":"#gradle新老版本关键字","children":[]},{"level":3,"title":"引入依赖基本方式","slug":"引入依赖基本方式","link":"#引入依赖基本方式","children":[{"level":4,"title":"1. 本地项目依赖 --> module依赖","slug":"_1-本地项目依赖-module依赖","link":"#_1-本地项目依赖-module依赖","children":[]},{"level":4,"title":"2. 本地二进制依赖 --> jar和so等文件","slug":"_2-本地二进制依赖-jar和so等文件","link":"#_2-本地二进制依赖-jar和so等文件","children":[]},{"level":4,"title":"3.远端二进制依赖","slug":"_3-远端二进制依赖","link":"#_3-远端二进制依赖","children":[]}]},{"level":3,"title":"引入依赖复杂方式","slug":"引入依赖复杂方式","link":"#引入依赖复杂方式","children":[{"level":4,"title":"根据Task类型引入","slug":"根据task类型引入","link":"#根据task类型引入","children":[]},{"level":4,"title":"排除引用","slug":"排除引用","link":"#排除引用","children":[]}]}]},{"level":2,"title":"让debug和release不冲突","slug":"让debug和release不冲突","link":"#让debug和release不冲突","children":[]},{"level":2,"title":"split api","slug":"split-api","link":"#split-api","children":[]},{"level":2,"title":"gradle 设置buildDir","slug":"gradle-设置builddir","link":"#gradle-设置builddir","children":[]},{"level":2,"title":"使用includeBuild","slug":"使用includebuild","link":"#使用includebuild","children":[{"level":3,"title":"添加外部library","slug":"添加外部library","link":"#添加外部library","children":[]}]}],"git":{"createdTime":1684738995000,"updatedTime":1704467811000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":8.57,"words":2572},"filePathRelative":"kotlin-tutor/gradle/gradle-tips.md","localizedDate":"2023年5月22日","autoDesc":true}');export{s as comp,c as data};
