# gradle配置

## 安卓使用libs

```groovy
 implementation fileTree(include: ['*.jar',"*.aar"], dir: 'libs')
```

使用kts

```kotlin
implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.jar", "*.aar"))))

implementation(fileTree("libs") {
        include("*.jar", "*.aar")
})
```

## 安卓权限

<https://www.jianshu.com/p/892a2ca5c41e>

## 安卓key

### groovy

```groovy
     signingConfigs {
             
            release {
                storeFile file("$rootDir/key.jks")
                storePassword "123456"
                keyAlias "applet"
                keyPassword "123456"
            }
        }

        buildTypes {
            release {
     
                signingConfig signingConfigs.release
                proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            }
        }
```

### kts

```kotlin
     signingConfigs {

            create("release") {
                // 别名
                keyAlias = "key0"
                // 别名密码
                keyPassword = "123456"
                // 路径
                storeFile = file("key.jks")
                // 签名文件密码
                storePassword = "123456"
            }

        }
        buildTypes {
            release {
                isMinifyEnabled = false
                signingConfig = signingConfigs.getByName("release")
                proguardFiles(
                    getDefaultProguardFile("proguard-android-optimize.txt"),
                    "proguard-rules.pro"
                )
            }
            debug{
                signingConfig = signingConfigs.getByName("release")
                proguardFiles(
                    getDefaultProguardFile("proguard-android-optimize.txt"),
                    "proguard-rules.pro"
                )
            }
        }
```

## 安卓教程

Apply Changes 是通过利用Android 8.0（API级别26）或更高版本中支持的 Android JVMTI（<https://docs.oracle.com/javase/8/docs/platform/jvmti/jvmti.html#bc1）技术。所以如果想使用Apply> Changes有两个条件：

Apk必须是debug包

必须在Android 8.0以上的手机上运行

Apply Changes按钮在菜单栏上，在运行的右侧新增两个按钮，如下图

1，Apply Changes and Restart Activity：尝试通过重新启动活动但不重新启动应用程序来应用资源和代码更改。如果有代码和资源的修改可以使用这个来使代码和资源即时生效。

2，Apply Code Changes：尝试仅应用代码更改而不重新启动任何内容。如果只有代码修改，可以使用这个来使代码生效。如果修改了代码和资源，请使用“Apply Changes and Restart Activity ”。

## adb命令

```
     adb shell getprop ro.product.name
```

## 升级gradlew

gradle init 脚本
<https://docs.gradle.org/current/userguide/init_scripts.html>

`$GRADLE_USER_HOME`是你gradle下载文件的位置
把下面这个命名为dependencyUpdate.gradle然后放到`$GRADLE_USER_HOME/init.d/`文件夹即可

```groovy

def isNonStable = { String version ->
    def stableKeyword = ['RELEASE', 'FINAL', 'GA'].any { it -> version.toUpperCase().contains(it) }
    def regex = /^[0-9,.v-]+(-r)?$/
    return !stableKeyword && !(version ==~ regex)
}

initscript {
    repositories {
        gradlePluginPortal()
    }

    dependencies {
        //noinspection GradleDynamicVersion
        classpath "com.github.ben-manes:gradle-versions-plugin:+"
    }
}

allprojects {
    apply plugin: com.github.benmanes.gradle.versions.VersionsPlugin

    tasks.named("dependencyUpdates").configure {
        rejectVersionIf {
            isNonStable(it.candidate.version)
        }
    }
}
```

## 仓库配置

安卓gradlekts必须这样写

```kotlin
    pluginManagement {
        repositories {
            maven {
                url = uri("https://maven.aliyun.com/repository/public/")
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
                url = uri("https://maven.aliyun.com/repository/public/")
            }
            maven {
                url = uri("https://maven.aliyun.com/repository/google/")
            }
            google()
            mavenCentral()
           maven{
                url= uri("https://jitpack.io")
            }
        }
    }
```

使用gradle

```groovy
pluginManagement {
    repositories {
        maven {
            url  "https://maven.aliyun.com/repository/public/" 
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
            url  "https://maven.aliyun.com/repository/public/" 
        }
        maven {
            url  "https://maven.aliyun.com/repository/google/" 
        }
        google()
        mavenCentral()
       maven{
            url "https://jitpack.io" 
        }
    }
}

```

不能`maven("https://maven.aliyun.com/repository/google/")`

### 安卓bom

<https://developer.android.google.cn/jetpack/compose/setup?hl=zh-cn#bom-version-mapping>

### gradle kts

```kotlin
    import org.gradle.kotlin.dsl.apply
    import org.gradle.kotlin.dsl.dependencies
    import org.gradle.kotlin.dsl.kotlin
    import org.gradle.kotlin.dsl.*
    import org.jetbrains.kotlin.config.KotlinCompilerVersion

    plugins {
        id("com.android.application")
        kotlin("android")
        kotlin("android.extensions")
    }

    //apply {
    //    from("$rootDir/tools/grgit.gradle")
    //    from("$rootDir/buildSrc/quality.gradle.kts")
    //    from("$rootDir/tools/ktlint.gradle")
    //    from("$rootDir/tools/detekt.gradle")
    //}

    android {
        compileSdkVersion(28)
        flavorDimensions("default")
        splits {
                abi {
                    isEnable = true
                    reset()
                    // 设置包含，调用前需要先用 reset 将默认清除
                    include("arm64-v8a", "armeabi-v7a")
                    isUniversalApk = true
                }
            }
        defaultConfig {
            applicationId = "com.onmyway133.myapp"
            minSdkVersion(26)
            targetSdkVersion(28)
    //        versionCode = ext.get("gitCommitCount") as? Int
            versionCode = 1
            versionName = "1.0"
               ndk {
                // 设置支持的SO库架构（开发者可以根据需要，选择一个或多个平台的so）
                abiFilters.add("arm64-v8a")
            }
             
            testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        }

        signingConfigs {
            create("release") {
                keyAlias = "keyalias"
                keyPassword = "keypassword"
                storePassword = "storepassword"
                storeFile = file("/Users/khoa/Android/Key/keystore")
            }
        }

        buildTypes {
            getByName("debug") {
                signingConfig = signingConfigs.getByName("debug")
                isMinifyEnabled = true
                proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "$project.rootDir/tools/proguard-rules-debug.pro")
            }

            getByName("release") {
                signingConfig = signingConfigs.getByName("release")
                isMinifyEnabled = true
                isShrinkResources = true
                proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "$project.rootDir/tools/proguard-rules.pro")
            }
        }

        productFlavors {
            create("staging") {

            }

            create("production") {

            }
        }

        lintOptions {
            lintConfig = file("$project.rootDir/tools/lint-rules.xml")
            htmlOutput = file("$project.buildDir/outputs/lint/lint.html")
            xmlReport = false
            htmlReport = true
        }
    }

    dependencies {
        implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.jar"))))
        implementation(kotlin("stdlib-jdk7", KotlinCompilerVersion.VERSION))
        implementation("androidx.appcompat:appcompat:1.0.2")
        implementation("androidx.core:core-ktx:1.0.2")
        implementation("androidx.constraintlayout:constraintlayout:1.1.3")
        implementation("com.google.android.material:material:1.0.0")
        testImplementation("junit:junit:4.12")
        androidTestImplementation("androidx.test:runner:1.1.1")
        androidTestImplementation("androidx.test.espresso:espresso-core:3.1.1")
    }

    tasks.getByName("check").dependsOn("lint")
```

### spit abi

在defaultConfig中配置

```groovy
     splits {
                abi {
                    isEnable = true
                    reset()
                    // 设置包含，调用前需要先用 reset 将默认清除
                    include("arm64-v8a", "armeabi-v7a")
                    isUniversalApk = true
                }
            }
```

### 安卓baseactivity的viewbinding

<https://stackoverflow.com/questions/62407823/how-to-use-viewbinding-with-an-abstract-base-class>

```kotlin
/*
 * In Activity
 * source : https://chetangupta.net/viewbinding/
 * Author : ChetanGupta.net
 */
abstract class ViewBindingActivity<VB : ViewBinding> : AppCompatActivity() {

    private var _binding: ViewBinding? = null
    abstract val bindingInflater: (LayoutInflater) -> VB

    @Suppress("UNCHECKED_CAST")
    protected val binding: VB
        get() = _binding as VB

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        _binding = bindingInflater.invoke(layoutInflater)
        setContentView(requireNotNull(_binding).root)
        setup()
    }

    abstract fun setup()

    override fun onDestroy() {
        super.onDestroy()
        _binding = null
    }
}
```

```kotlin
/*
 * In Fragment
 * source : https://chetangupta.net/viewbinding/
 * Author : ChetanGupta.net
 */
abstract class ViewBindingFragment<VB : ViewBinding> : Fragment() {

    private var _binding: ViewBinding? = null
    abstract val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> VB

    @Suppress("UNCHECKED_CAST")
    protected val binding: VB
        get() = _binding as VB

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = bindingInflater.invoke(inflater, container, false)
        return requireNotNull(_binding).root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setup()
    }

    abstract fun setup()

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
```

### dart 服务端

<https://github.com/VeryGoodOpenSource/dart_frog>

### flutter添加到android

<https://flutter.cn/docs/development/add-to-app>

### splitabi

优化ApK大小之ABI Filters 和 APK split

想要打出的 apk 包含多个架构的 so库 需要下面的配置：

```groovy
android {
    ... // 其它配置
    defaultConfig {
       ...  // 默认配置
       ndk {
           //选择要添加的对应cpu类型的.so库。
            abiFilters 'armeabi', 'armeabi-v7a'
            // 还可以添加
            // 'arm64-v8a', 64 bit ARM architecture,it can use v7 version
            //              unless you are too much concerned about performance
            // mips,mips64, There are no devices with MIPS
            //  x86_64, No android devices and anyway it can use X86 version
            //  armeabi, very old architecture. Unsupported after Android 4.4
            // 'x86', Intel based devices
        }
    }
    ... // 其它配置
}

```

想要构架多个不同架构的 apk 包，可以使用 ABI 拆分，需要下面的配置：

```groovy
android {
    ... // 其它配置
    splits {
        abi {
            reset()//重置 ABI 列表为只包含一个空字符串（与 include 一起使用可以表示要使用哪一个 ABI，而不是要 exclude 哪些 ABI）
            enable true // 设为true，才能启用ABI拆分机制在打包时根据架构生成不同的apk文件
            universalApk false  // If true, 构建支持所有平台abi类型，构建一个包，包含多个架构的so(只要代码中有的都会打进去)
            include "armeabi-v7a", "armeabi" // 设置所有要支持的abi类型，构建多个包，每个包只包含一个架构的so
            exclude "x86"   // 设置所有不要支持的abi类型
        }
    }
}

```

这种配置是没有办法让打出的 apk 只包含自己想要的多种架构的\~！
ERROR

如果两个一起配置那么报下面的错误：
ERROR: Conflicting configuration : 'arm64-v8a' in ndk abiFilters cannot be present when splits abi filters are set : armeabi

因为 ABI 拆分当中的 include 是和 ndk abiFilters 互斥的操作！！

* 如果两种方式分开配置都可以运行；
* 两种方式一起配置在不报错的情况下（ABI拆分注调include），ABI 拆分不生效；
* 多架构的apk只能使用abiFilters

### groovy版本的

```groovy
      splits {
            abi {
                enable true
                reset()
                universalApk false  // If true, also generate a universal APK
                include "armeabi-v7a",   "arm64-v8a"
            }
        }
          defaultConfig {
            applicationId "cn.yzq.android_flut"
            minSdk 24
            targetSdk 33
            versionCode 1
            versionName "1.0"

    //        ndk {
    //            // Filter for architectures supported by Flutter.
    //            abiFilters 'armeabi-v7a', 'arm64-v8a'
    //        }

            testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        }

<!---->

      signingConfigs {
            release {
                keyAlias 'key0'
                keyPassword '123456'
                storeFile file('key.jks')
                storePassword '123456'
            }
        }
        buildTypes {
            release {
                signingConfig signingConfigs.release
                minifyEnabled true
                proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            }
            debug {
                signingConfig signingConfigs.release
                minifyEnabled false
                proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            }
        }
```

## kotlin dsl

如果 api()无法使用,需要在头部添加`java-library`

```kotlin
    plugins {
        java
        kotlin("jvm") version "1.8.0"
        `java-library`
        id("org.springframework.boot") version "3.0.2"
        id("io.spring.dependency-management") version "1.1.0"
    }
```

命令设置语句

```java
     MaterialButton button = new MaterialButton(requireContext());
                button.setText(v);

                button.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT)); /* Gives as much height for multi line*/
                button.setOnClickListener(view1 -> {
                    try {
                        UniUtil.openUniapp(requireContext(), v);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                });
```

## gradle引用其他脚本的方法

在build.gradle里导入自己写的脚本是用apply这个方法的map参数。设置from这个key对应的value为my.gradle的uri。这个在apply文档中有写明

> build.gradle

```csharp
apply([plugin: 'com.android.application',from:project.uri(file("my.gradle"))])
```

已经把自己的脚本加入到build.gradle里面了，那么我们就可以在my.gradle里面写方法了。
 这里我只找到了一种方法来实现，那就是使用包！！！定义好包后，就把这个包添加到project的扩展属性里面。

> my.gradle

```kotlin
def add = {
    a,b->
    return a+b;
}
ext{
    fun = add
}
```

现在我们就可以在build.gradle里面调用这个add方法了。

> build.gradle

```kotlin
println "resutl:"+ ext.fun.call(1,2);
```

在build.gradle里导入自己写的脚本是用apply这个方法的map参数。设置from这个key对应的value为my.gradle的uri。这个在apply文档中有写明。

> build.gradle

```csharp
apply([plugin: 'com.android.application',from:project.uri(file("my.gradle"))])
```

已经把自己的脚本加入到build.gradle里面了，那么我们就可以在my.gradle里面写方法了。
 这里我只找到了一种方法来实现，那就是使用包！！！定义好包后，就把这个包添加到project的扩展属性里面。

> my.gradle

```kotlin
def add = {
    a,b->
    return a+b;
}
ext{
    fun = add
}
```

现在我们就可以在build.gradle里面调用这个add方法了。

> build.gradle

```kotlin
println "resutl:"+ ext.fun.call(1,2);
```
