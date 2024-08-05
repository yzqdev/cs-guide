import{_ as e,c as n,o as t,d as o}from"./app-CbULZrmi.js";const a={},r=o(`<h1 id="gradle配置" tabindex="-1"><a class="header-anchor" href="#gradle配置"><span>gradle配置</span></a></h1><h2 id="安卓使用libs" tabindex="-1"><a class="header-anchor" href="#安卓使用libs"><span>安卓使用libs</span></a></h2><pre><code class="language-groovy"> implementation fileTree(include: [&#39;*.jar&#39;,&quot;*.aar&quot;], dir: &#39;libs&#39;)
</code></pre><p>使用kts</p><pre><code class="language-kotlin">implementation(fileTree(mapOf(&quot;dir&quot; to &quot;libs&quot;, &quot;include&quot; to listOf(&quot;*.jar&quot;, &quot;*.aar&quot;))))

implementation(fileTree(&quot;libs&quot;) {
        include(&quot;*.jar&quot;, &quot;*.aar&quot;)
})
</code></pre><h2 id="安卓权限" tabindex="-1"><a class="header-anchor" href="#安卓权限"><span>安卓权限</span></a></h2><p><a href="https://www.jianshu.com/p/892a2ca5c41e" target="_blank" rel="noopener noreferrer">https://www.jianshu.com/p/892a2ca5c41e</a></p><h2 id="安卓key" tabindex="-1"><a class="header-anchor" href="#安卓key"><span>安卓key</span></a></h2><h3 id="groovy" tabindex="-1"><a class="header-anchor" href="#groovy"><span>groovy</span></a></h3><pre><code class="language-groovy">     signingConfigs {
             
            release {
                storeFile file(&quot;$rootDir/key.jks&quot;)
                storePassword &quot;123456&quot;
                keyAlias &quot;applet&quot;
                keyPassword &quot;123456&quot;
            }
        }

        buildTypes {
            release {
     
                signingConfig signingConfigs.release
                proguardFiles getDefaultProguardFile(&#39;proguard-android.txt&#39;), &#39;proguard-rules.pro&#39;
            }
        }
</code></pre><h3 id="kts" tabindex="-1"><a class="header-anchor" href="#kts"><span>kts</span></a></h3><pre><code class="language-kotlin">     signingConfigs {

            create(&quot;release&quot;) {
                // 别名
                keyAlias = &quot;key0&quot;
                // 别名密码
                keyPassword = &quot;123456&quot;
                // 路径
                storeFile = file(&quot;key.jks&quot;)
                // 签名文件密码
                storePassword = &quot;123456&quot;
            }

        }
        buildTypes {
            release {
                isMinifyEnabled = false
                signingConfig = signingConfigs.getByName(&quot;release&quot;)
                proguardFiles(
                    getDefaultProguardFile(&quot;proguard-android-optimize.txt&quot;),
                    &quot;proguard-rules.pro&quot;
                )
            }
            debug{
                signingConfig = signingConfigs.getByName(&quot;release&quot;)
                proguardFiles(
                    getDefaultProguardFile(&quot;proguard-android-optimize.txt&quot;),
                    &quot;proguard-rules.pro&quot;
                )
            }
        }
</code></pre><h2 id="安卓教程" tabindex="-1"><a class="header-anchor" href="#安卓教程"><span>安卓教程</span></a></h2><p>Apply Changes 是通过利用Android 8.0（API级别26）或更高版本中支持的 Android JVMTI（<a href="https://docs.oracle.com/javase/8/docs/platform/jvmti/jvmti.html#bc1%EF%BC%89%E6%8A%80%E6%9C%AF%E3%80%82%E6%89%80%E4%BB%A5%E5%A6%82%E6%9E%9C%E6%83%B3%E4%BD%BF%E7%94%A8Apply" target="_blank" rel="noopener noreferrer">https://docs.oracle.com/javase/8/docs/platform/jvmti/jvmti.html#bc1）技术。所以如果想使用Apply</a> Changes有两个条件：</p><p>Apk必须是debug包</p><p>必须在Android 8.0以上的手机上运行</p><p>Apply Changes按钮在菜单栏上，在运行的右侧新增两个按钮，如下图</p><p>1，Apply Changes and Restart Activity：尝试通过重新启动活动但不重新启动应用程序来应用资源和代码更改。如果有代码和资源的修改可以使用这个来使代码和资源即时生效。</p><p>2，Apply Code Changes：尝试仅应用代码更改而不重新启动任何内容。如果只有代码修改，可以使用这个来使代码生效。如果修改了代码和资源，请使用“Apply Changes and Restart Activity ”。</p><h2 id="adb命令" tabindex="-1"><a class="header-anchor" href="#adb命令"><span>adb命令</span></a></h2><pre><code>adb shell getprop ro.product.name
</code></pre><h2 id="升级gradlew" tabindex="-1"><a class="header-anchor" href="#升级gradlew"><span>升级gradlew</span></a></h2><p>gradle init 脚本 <a href="https://docs.gradle.org/current/userguide/init_scripts.html" target="_blank" rel="noopener noreferrer">https://docs.gradle.org/current/userguide/init_scripts.html</a></p><p><code>$GRADLE_USER_HOME</code>是你gradle下载文件的位置 把下面这个命名为dependencyUpdate.gradle然后放到<code>$GRADLE_USER_HOME/init.d/</code>文件夹即可</p><pre><code class="language-groovy">
def isNonStable = { String version -&gt;
    def stableKeyword = [&#39;RELEASE&#39;, &#39;FINAL&#39;, &#39;GA&#39;].any { it -&gt; version.toUpperCase().contains(it) }
    def regex = /^[0-9,.v-]+(-r)?$/
    return !stableKeyword &amp;&amp; !(version ==~ regex)
}

initscript {
    repositories {
        gradlePluginPortal()
    }

    dependencies {
        //noinspection GradleDynamicVersion
        classpath &quot;com.github.ben-manes:gradle-versions-plugin:+&quot;
    }
}

allprojects {
    apply plugin: com.github.benmanes.gradle.versions.VersionsPlugin

    tasks.named(&quot;dependencyUpdates&quot;).configure {
        rejectVersionIf {
            isNonStable(it.candidate.version)
        }
    }
}
</code></pre><h2 id="仓库配置" tabindex="-1"><a class="header-anchor" href="#仓库配置"><span>仓库配置</span></a></h2><p>安卓gradlekts必须这样写</p><pre><code class="language-kotlin">    pluginManagement {
        repositories {
            maven {
                url = uri(&quot;https://maven.aliyun.com/repository/public/&quot;)
            }
            gradlePluginPortal()
            google()
            mavenCentral()
        }
    }
    dependencyResolutionManagement {
        repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
        repositories {

            maven {
                url = uri(&quot;https://maven.aliyun.com/repository/public/&quot;)
            }
            maven {
                url = uri(&quot;https://maven.aliyun.com/repository/google/&quot;)
            }
            google()
            mavenCentral()
           maven{
                url= uri(&quot;https://jitpack.io&quot;)
            }
        }
    }
</code></pre><p>使用gradle</p><pre><code class="language-groovy">pluginManagement {
    repositories {
        maven {
            url  &quot;https://maven.aliyun.com/repository/public/&quot; 
        }
        gradlePluginPortal()
        google()
        mavenCentral()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {

        maven {
            url  &quot;https://maven.aliyun.com/repository/public/&quot; 
        }
        maven {
            url  &quot;https://maven.aliyun.com/repository/google/&quot; 
        }
        google()
        mavenCentral()
       maven{
            url &quot;https://jitpack.io&quot; 
        }
    }
}

</code></pre><p>不能<code>maven(&quot;https://maven.aliyun.com/repository/google/&quot;)</code></p><h3 id="安卓bom" tabindex="-1"><a class="header-anchor" href="#安卓bom"><span>安卓bom</span></a></h3><p><a href="https://developer.android.google.cn/jetpack/compose/setup?hl=zh-cn#bom-version-mapping" target="_blank" rel="noopener noreferrer">https://developer.android.google.cn/jetpack/compose/setup?hl=zh-cn#bom-version-mapping</a></p><h3 id="gradle-kts" tabindex="-1"><a class="header-anchor" href="#gradle-kts"><span>gradle kts</span></a></h3><pre><code class="language-kotlin">    import org.gradle.kotlin.dsl.apply
    import org.gradle.kotlin.dsl.dependencies
    import org.gradle.kotlin.dsl.kotlin
    import org.gradle.kotlin.dsl.*
    import org.jetbrains.kotlin.config.KotlinCompilerVersion

    plugins {
        id(&quot;com.android.application&quot;)
        kotlin(&quot;android&quot;)
        kotlin(&quot;android.extensions&quot;)
    }

    //apply {
    //    from(&quot;$rootDir/tools/grgit.gradle&quot;)
    //    from(&quot;$rootDir/buildSrc/quality.gradle.kts&quot;)
    //    from(&quot;$rootDir/tools/ktlint.gradle&quot;)
    //    from(&quot;$rootDir/tools/detekt.gradle&quot;)
    //}

    android {
        compileSdkVersion(28)
        flavorDimensions(&quot;default&quot;)
        splits {
                abi {
                    isEnable = true
                    reset()
                    // 设置包含，调用前需要先用 reset 将默认清除
                    include(&quot;arm64-v8a&quot;, &quot;armeabi-v7a&quot;)
                    isUniversalApk = true
                }
            }
        defaultConfig {
            applicationId = &quot;com.onmyway133.myapp&quot;
            minSdkVersion(26)
            targetSdkVersion(28)
    //        versionCode = ext.get(&quot;gitCommitCount&quot;) as? Int
            versionCode = 1
            versionName = &quot;1.0&quot;
               ndk {
                // 设置支持的SO库架构（开发者可以根据需要，选择一个或多个平台的so）
                abiFilters.add(&quot;arm64-v8a&quot;)
            }
             
            testInstrumentationRunner = &quot;androidx.test.runner.AndroidJUnitRunner&quot;
        }

        signingConfigs {
            create(&quot;release&quot;) {
                keyAlias = &quot;keyalias&quot;
                keyPassword = &quot;keypassword&quot;
                storePassword = &quot;storepassword&quot;
                storeFile = file(&quot;/Users/khoa/Android/Key/keystore&quot;)
            }
        }

        buildTypes {
            getByName(&quot;debug&quot;) {
                signingConfig = signingConfigs.getByName(&quot;debug&quot;)
                isMinifyEnabled = true
                proguardFiles(getDefaultProguardFile(&quot;proguard-android-optimize.txt&quot;), &quot;$project.rootDir/tools/proguard-rules-debug.pro&quot;)
            }

            getByName(&quot;release&quot;) {
                signingConfig = signingConfigs.getByName(&quot;release&quot;)
                isMinifyEnabled = true
                isShrinkResources = true
                proguardFiles(getDefaultProguardFile(&quot;proguard-android-optimize.txt&quot;), &quot;$project.rootDir/tools/proguard-rules.pro&quot;)
            }
        }

        productFlavors {
            create(&quot;staging&quot;) {

            }

            create(&quot;production&quot;) {

            }
        }

        lintOptions {
            lintConfig = file(&quot;$project.rootDir/tools/lint-rules.xml&quot;)
            htmlOutput = file(&quot;$project.buildDir/outputs/lint/lint.html&quot;)
            xmlReport = false
            htmlReport = true
        }
    }

    dependencies {
        implementation(fileTree(mapOf(&quot;dir&quot; to &quot;libs&quot;, &quot;include&quot; to listOf(&quot;*.jar&quot;))))
        implementation(kotlin(&quot;stdlib-jdk7&quot;, KotlinCompilerVersion.VERSION))
        implementation(&quot;androidx.appcompat:appcompat:1.0.2&quot;)
        implementation(&quot;androidx.core:core-ktx:1.0.2&quot;)
        implementation(&quot;androidx.constraintlayout:constraintlayout:1.1.3&quot;)
        implementation(&quot;com.google.android.material:material:1.0.0&quot;)
        testImplementation(&quot;junit:junit:4.12&quot;)
        androidTestImplementation(&quot;androidx.test:runner:1.1.1&quot;)
        androidTestImplementation(&quot;androidx.test.espresso:espresso-core:3.1.1&quot;)
    }

    tasks.getByName(&quot;check&quot;).dependsOn(&quot;lint&quot;)
</code></pre><h3 id="spit-abi" tabindex="-1"><a class="header-anchor" href="#spit-abi"><span>spit abi</span></a></h3><p>在defaultConfig中配置</p><pre><code class="language-groovy">     splits {
                abi {
                    isEnable = true
                    reset()
                    // 设置包含，调用前需要先用 reset 将默认清除
                    include(&quot;arm64-v8a&quot;, &quot;armeabi-v7a&quot;)
                    isUniversalApk = true
                }
            }
</code></pre><h3 id="dart-服务端" tabindex="-1"><a class="header-anchor" href="#dart-服务端"><span>dart 服务端</span></a></h3><p><a href="https://github.com/VeryGoodOpenSource/dart_frog" target="_blank" rel="noopener noreferrer">https://github.com/VeryGoodOpenSource/dart_frog</a></p><h3 id="flutter添加到android" tabindex="-1"><a class="header-anchor" href="#flutter添加到android"><span>flutter添加到android</span></a></h3><p><a href="https://flutter.cn/docs/development/add-to-app" target="_blank" rel="noopener noreferrer">https://flutter.cn/docs/development/add-to-app</a></p><h3 id="splitabi" tabindex="-1"><a class="header-anchor" href="#splitabi"><span>splitabi</span></a></h3><p>优化ApK大小之ABI Filters 和 APK split</p><p>想要打出的 apk 包含多个架构的 so库 需要下面的配置：</p><pre><code class="language-groovy">android {
    ... // 其它配置
    defaultConfig {
       ...  // 默认配置
       ndk {
           //选择要添加的对应cpu类型的.so库。
            abiFilters &#39;armeabi&#39;, &#39;armeabi-v7a&#39;
            // 还可以添加
            // &#39;arm64-v8a&#39;, 64 bit ARM architecture,it can use v7 version
            //              unless you are too much concerned about performance
            // mips,mips64, There are no devices with MIPS
            //  x86_64, No android devices and anyway it can use X86 version
            //  armeabi, very old architecture. Unsupported after Android 4.4
            // &#39;x86&#39;, Intel based devices
        }
    }
    ... // 其它配置
}

</code></pre><p>想要构架多个不同架构的 apk 包，可以使用 ABI 拆分，需要下面的配置：</p><pre><code class="language-groovy">android {
    ... // 其它配置
    splits {
        abi {
            reset()//重置 ABI 列表为只包含一个空字符串（与 include 一起使用可以表示要使用哪一个 ABI，而不是要 exclude 哪些 ABI）
            enable true // 设为true，才能启用ABI拆分机制在打包时根据架构生成不同的apk文件
            universalApk false  // If true, 构建支持所有平台abi类型，构建一个包，包含多个架构的so(只要代码中有的都会打进去)
            include &quot;armeabi-v7a&quot;, &quot;armeabi&quot; // 设置所有要支持的abi类型，构建多个包，每个包只包含一个架构的so
            exclude &quot;x86&quot;   // 设置所有不要支持的abi类型
        }
    }
}

</code></pre><p>这种配置是没有办法让打出的 apk 只包含自己想要的多种架构的~！ ERROR</p><p>如果两个一起配置那么报下面的错误： ERROR: Conflicting configuration : &#39;arm64-v8a&#39; in ndk abiFilters cannot be present when splits abi filters are set : armeabi</p><p>因为 ABI 拆分当中的 include 是和 ndk abiFilters 互斥的操作！！</p><ul><li>如果两种方式分开配置都可以运行；</li><li>两种方式一起配置在不报错的情况下（ABI拆分注调include），ABI 拆分不生效；</li><li>多架构的apk只能使用abiFilters</li></ul><h3 id="groovy版本的" tabindex="-1"><a class="header-anchor" href="#groovy版本的"><span>groovy版本的</span></a></h3><pre><code class="language-groovy">      splits {
            abi {
                enable true
                reset()
                universalApk false  // If true, also generate a universal APK
                include &quot;armeabi-v7a&quot;,   &quot;arm64-v8a&quot;
            }
        }
          defaultConfig {
            applicationId &quot;cn.yzq.android_flut&quot;
            minSdk 24
            targetSdk 33
            versionCode 1
            versionName &quot;1.0&quot;

    //        ndk {
    //            // Filter for architectures supported by Flutter.
    //            abiFilters &#39;armeabi-v7a&#39;, &#39;arm64-v8a&#39;
    //        }

            testInstrumentationRunner &quot;androidx.test.runner.AndroidJUnitRunner&quot;
        }

&lt;!----&gt;

      signingConfigs {
            release {
                keyAlias &#39;key0&#39;
                keyPassword &#39;123456&#39;
                storeFile file(&#39;key.jks&#39;)
                storePassword &#39;123456&#39;
            }
        }
        buildTypes {
            release {
                signingConfig signingConfigs.release
                minifyEnabled true
                proguardFiles getDefaultProguardFile(&#39;proguard-android-optimize.txt&#39;), &#39;proguard-rules.pro&#39;
            }
            debug {
                signingConfig signingConfigs.release
                minifyEnabled false
                proguardFiles getDefaultProguardFile(&#39;proguard-android-optimize.txt&#39;), &#39;proguard-rules.pro&#39;
            }
        }
</code></pre><h2 id="kotlin-dsl" tabindex="-1"><a class="header-anchor" href="#kotlin-dsl"><span>kotlin dsl</span></a></h2><p>如果 api()无法使用,需要在头部添加<code>java-library</code></p><pre><code class="language-kotlin">    plugins {
        java
        kotlin(&quot;jvm&quot;) version &quot;1.8.0&quot;
        \`java-library\`
        id(&quot;org.springframework.boot&quot;) version &quot;3.0.2&quot;
        id(&quot;io.spring.dependency-management&quot;) version &quot;1.1.0&quot;
    }
</code></pre><p>命令设置语句</p><pre><code class="language-java">     MaterialButton button = new MaterialButton(requireContext());
                button.setText(v);

                button.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT)); /* Gives as much height for multi line*/
                button.setOnClickListener(view1 -&gt; {
                    try {
                        UniUtil.openUniapp(requireContext(), v);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                });
</code></pre><h2 id="gradle引用其他脚本的方法" tabindex="-1"><a class="header-anchor" href="#gradle引用其他脚本的方法"><span>gradle引用其他脚本的方法</span></a></h2><p>在build.gradle里导入自己写的脚本是用apply这个方法的map参数。设置from这个key对应的value为my.gradle的uri。这个在apply文档中有写明</p><blockquote><p>build.gradle</p></blockquote><pre><code class="language-csharp">apply([plugin: &#39;com.android.application&#39;,from:project.uri(file(&quot;my.gradle&quot;))])
</code></pre><p>已经把自己的脚本加入到build.gradle里面了，那么我们就可以在my.gradle里面写方法了。 这里我只找到了一种方法来实现，那就是使用包！！！定义好包后，就把这个包添加到project的扩展属性里面。</p><blockquote><p>my.gradle</p></blockquote><pre><code class="language-kotlin">def add = {
    a,b-&gt;
    return a+b;
}
ext{
    fun = add
}
</code></pre><p>现在我们就可以在build.gradle里面调用这个add方法了。</p><blockquote><p>build.gradle</p></blockquote><pre><code class="language-kotlin">println &quot;resutl:&quot;+ ext.fun.call(1,2);
</code></pre><p>在build.gradle里导入自己写的脚本是用apply这个方法的map参数。设置from这个key对应的value为my.gradle的uri。这个在apply文档中有写明。</p><blockquote><p>build.gradle</p></blockquote><pre><code class="language-csharp">apply([plugin: &#39;com.android.application&#39;,from:project.uri(file(&quot;my.gradle&quot;))])
</code></pre><p>已经把自己的脚本加入到build.gradle里面了，那么我们就可以在my.gradle里面写方法了。 这里我只找到了一种方法来实现，那就是使用包！！！定义好包后，就把这个包添加到project的扩展属性里面。</p><blockquote><p>my.gradle</p></blockquote><pre><code class="language-kotlin">def add = {
    a,b-&gt;
    return a+b;
}
ext{
    fun = add
}
</code></pre><p>现在我们就可以在build.gradle里面调用这个add方法了。</p><blockquote><p>build.gradle</p></blockquote><pre><code class="language-kotlin">println &quot;resutl:&quot;+ ext.fun.call(1,2);
</code></pre>`,78),i=[r];function l(s,d){return t(),n("div",null,i)}const p=e(a,[["render",l],["__file","gradle.html.vue"]]),g=JSON.parse('{"path":"/cs-tips/android/gradle.html","title":"gradle配置","lang":"zh-CN","frontmatter":{"description":"gradle配置 安卓使用libs 使用kts 安卓权限 https://www.jianshu.com/p/892a2ca5c41e 安卓key groovy kts 安卓教程 Apply Changes 是通过利用Android 8.0（API级别26）或更高版本中支持的 Android JVMTI（https://docs.oracle.com/...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/android/gradle.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"gradle配置"}],["meta",{"property":"og:description","content":"gradle配置 安卓使用libs 使用kts 安卓权限 https://www.jianshu.com/p/892a2ca5c41e 安卓key groovy kts 安卓教程 Apply Changes 是通过利用Android 8.0（API级别26）或更高版本中支持的 Android JVMTI（https://docs.oracle.com/..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"gradle配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安卓使用libs","slug":"安卓使用libs","link":"#安卓使用libs","children":[]},{"level":2,"title":"安卓权限","slug":"安卓权限","link":"#安卓权限","children":[]},{"level":2,"title":"安卓key","slug":"安卓key","link":"#安卓key","children":[{"level":3,"title":"groovy","slug":"groovy","link":"#groovy","children":[]},{"level":3,"title":"kts","slug":"kts","link":"#kts","children":[]}]},{"level":2,"title":"安卓教程","slug":"安卓教程","link":"#安卓教程","children":[]},{"level":2,"title":"adb命令","slug":"adb命令","link":"#adb命令","children":[]},{"level":2,"title":"升级gradlew","slug":"升级gradlew","link":"#升级gradlew","children":[]},{"level":2,"title":"仓库配置","slug":"仓库配置","link":"#仓库配置","children":[{"level":3,"title":"安卓bom","slug":"安卓bom","link":"#安卓bom","children":[]},{"level":3,"title":"gradle kts","slug":"gradle-kts","link":"#gradle-kts","children":[]},{"level":3,"title":"spit abi","slug":"spit-abi","link":"#spit-abi","children":[]},{"level":3,"title":"dart 服务端","slug":"dart-服务端","link":"#dart-服务端","children":[]},{"level":3,"title":"flutter添加到android","slug":"flutter添加到android","link":"#flutter添加到android","children":[]},{"level":3,"title":"splitabi","slug":"splitabi","link":"#splitabi","children":[]},{"level":3,"title":"groovy版本的","slug":"groovy版本的","link":"#groovy版本的","children":[]}]},{"level":2,"title":"kotlin dsl","slug":"kotlin-dsl","link":"#kotlin-dsl","children":[]},{"level":2,"title":"gradle引用其他脚本的方法","slug":"gradle引用其他脚本的方法","link":"#gradle引用其他脚本的方法","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":5}]},"readingTime":{"minutes":5.96,"words":1788},"filePathRelative":"cs-tips/android/gradle.md","localizedDate":"2023年5月25日","autoDesc":true}');export{p as comp,g as data};
