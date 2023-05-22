# gradle用法

:::tip
对单个项目生效，在项目中的build.gradle修改内容
:::

```groovy
 

allprojects {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/google/' }
        maven { url 'https://maven.aliyun.com/repository/jcenter/'}
    }
}


```

## 对所有项目生效，在${USER_HOME}/.gradle/下创建init.gradle文件

```groovy
allprojects{
    repositories {
        def ALIYUN_REPOSITORY_URL = 'https://maven.aliyun.com/repository/public/'
        def ALIYUN_JCENTER_URL = 'https://maven.aliyun.com/repository/jcenter/'
        def ALIYUN_GOOGLE_URL = 'https://maven.aliyun.com/repository/google/'
        def ALIYUN_GRADLE_PLUGIN_URL = 'https://maven.aliyun.com/repository/gradle-plugin/'
        all { ArtifactRepository repo ->
            if(repo instanceof MavenArtifactRepository){
                def url = repo.url.toString()
                if (url.startsWith('https://repo1.maven.org/maven2/')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_REPOSITORY_URL."
                    remove repo
                }
                if (url.startsWith('https://jcenter.bintray.com/')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_JCENTER_URL."
                    remove repo
                }
                if (url.startsWith('https://dl.google.com/dl/android/maven2/')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_GOOGLE_URL."
                    remove repo
                }
                if (url.startsWith('https://plugins.gradle.org/m2/')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_GRADLE_PLUGIN_URL."
                    remove repo
                }
            }
        }
        maven { url ALIYUN_REPOSITORY_URL }
        maven { url ALIYUN_JCENTER_URL }
        maven { url ALIYUN_GOOGLE_URL }
        maven { url ALIYUN_GRADLE_PLUGIN_URL }
    }
}

```

## gradle添加ext

## 使用extra

**注意**

```kotlin
ext{
    set("development",true)
}

```

<https://juejin.cn/post/6979872825561579533>
<https://developer.android.google.cn/studio/build/migrate-to-kts?hl=zh-cn>

Google 官方推荐的一个 Gradle 配置[最佳实践](https://developer.android.google.cn/studio/build/gradle-tips?hl=zh-cn)是在项目最外层 build.gradle 文件的`ext`代码块中定义项目范围的属性，然后在所有模块间共享这些属性，比如我们通常会这样存放依赖的版本号。

```groovy
// build.gradle

ext {
    compileSdkVersion = 28
    buildToolsVersion = "28.0.3"
    supportLibVersion = "28.0.0"
    ...
}
 
```

但是由于缺乏IDE的辅助(跳转查看、全局重构等都不支持)，实际使用体验欠佳。

在`KTL`中用`extra`来代替`Groovy`中的`ext`

```kotlin
// The extra object can be used for custom properties and makes them available to all
// modules in the project.
// The following are only a few examples of the types of properties you can define.
extra["compileSdkVersion"] = 28
// You can also create properties to specify versions for dependencies.
// Having consistent versions between modules can avoid conflicts with behavior.
extra["supportLibVersion"] = "28.0.0"
 
android {
    // Use the following syntax to access properties you defined at the project level:
    // rootProject.extra["property_name"]
    compileSdkVersion(rootProject.extra["sdkVersion"])

    // Alternatively, you can access properties using a type safe delegate:
    val sdkVersion: Int by rootProject.extra
    ...
    compileSdkVersion(sdkVersion)
}
...
dependencies {
    implementation("com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}")
    ...
}
 
```

> `build.gralde`中的`ext`数据是可以在`build.gradle.kts`中使用`extra`进行访问的。
使用

```kotlin
 minSdk=rootProject.extra["minSdk"] as Int
targetSdk=rootProject.extra["targetSdk"] as Int

```

## 使用gradle.properties

gradle.properties

```ini
android.nonTransitiveRClass=true
compose_version=1.2.1
compiler_version=1.3.1
ktor_version=2.1.1
retrofitVersion=2.9.0
```

然后在子项目的build.gradle.kts中配置

```kotlin
val compose_version: String by project
val compiler_version: String by project
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    compileSdk = rootProject.extra["compileSdk"] as Int
    namespace = "com.yzq.mobile.comp.qiqi"
    defaultConfig {
        applicationId = "com.yzq.mobile.comp.qiqi"
        minSdk = rootProject.extra["minSdk"] as Int
        targetSdk = rootProject.extra["targetSdk"] as Int
        versionCode = 1
        versionName = "1.0.1"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        named("release") {
            isMinifyEnabled = false
            setProguardFiles(
                listOf(
                    getDefaultProguardFile("proguard-android-optimize.txt"),
                    "proguard-rules.pro"
                )
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion =  libs.versions.composeVersion.get()//"1.3.2"
    }
    packagingOptions {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {

    implementation("androidx.core:core-ktx:1.9.0")
    implementation("androidx.compose.ui:ui:$compose_version")
    implementation("androidx.compose.material:material:$compose_version")
    implementation("androidx.compose.ui:ui-tooling-preview:$compose_version")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.5.1")
    implementation("androidx.activity:activity-compose:1.6.0")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.3")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.4.0")
    androidTestImplementation("androidx.compose.ui:ui-test-junit4:$compose_version")
    debugImplementation("androidx.compose.ui:ui-tooling:$compose_version")
    debugImplementation("androidx.compose.ui:ui-test-manifest:$compose_version")
}
```

## 关于gradle插件  

agp(android gradle plugin)的定义

```text
implementation "com.android.tools.build:gradle:7.3.1"
```

而为什么我们要在根目录的build.gradle.kts加上`com.android.application`?

`com.android.application`的artifactid是

```kotlin
// https://mvnrepository.com/artifact/com.android.application/com.android.application.gradle.plugin
implementation("com.android.application:com.android.application.gradle.plugin:7.3.1")

```

内部含有依赖`com.android.tools.build:gradle`,所以我们只需要引用`com.android.application`就可以了
同理`com.android.library`

```kotlin
// https://mvnrepository.com/artifact/com.android.library/com.android.library.gradle.plugin
implementation("com.android.library:com.android.library.gradle.plugin:7.3.1")

```

也包含了`com.android.tools.build:gradle`
我们最终只需要在根目录的build.gradle.kts加上

```kotlin
plugins {
    id("com.android.application") version "7.3.1" apply false
    id("com.android.library") version "7.3.1" apply false
    id("org.jetbrains.kotlin.android") version "1.7.10" apply false
    id("org.jetbrains.kotlin.jvm") version "1.7.10" apply false
}
```

### 修改生成apk名称和BuildConfig中添加apk支持的cpu架构

```kotlin
val abiCodes = mapOf("armeabi-v7a" to 1, "x86" to 2, "x86_64" to 3)
android.applicationVariants.all {
    val buildType = this.buildType.name
    val variant = this
    outputs.all {
        val name =
            this.filters.find { it.filterType == com.android.build.api.variant.FilterConfiguration.FilterType.ABI.name }?.identifier
        val baseAbiCode = abiCodes[name]
        if (baseAbiCode != null) {
           //写入cpu架构信息
            variant.buildConfigField("String", "CUP_ABI", "\"${name}\"")
        }
        if (this is com.android.build.gradle.internal.api.ApkVariantOutputImpl) {
            //修改apk名称
            if (buildType == "release") {
                this.outputFileName = "KotlinDSL_${name}_${buildType}.apk"
            } else if (buildType == "debug") {
                this.outputFileName = "KotlinDSL_V${variant.versionName}_${name}_${buildType}.apk"
            }
        }
    }
}
 
```

## 使用java8的timeapi不生效

添加

```KotlinDSL
   compileOptions {
      isCoreLibraryDesugaringEnabled=true
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
dependencies{
     coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:1.2.2")
}
```

## Gradle依赖引入

自Android studio版本更新至3.0后，连带着**com.android.tools.build:gradle** 工具也升级到了3.0.0，在3.0.0中使用了最新的**Gralde 4.0** 里程碑版本作为gradle的编译版本，该版本gradle编译速度有所加速；

### Gradle新老版本关键字

| 4.x+版本配置              | 已弃用配置         |
| ------------------------- | ------------------ |
| api                       | compile            |
| implement                 | compile            |
| compileOnly               | provided           |
| runtimeOnly               | apk                |
| testimplementation       | testCompile        |
| androidTestimplementation| androidTestCompile |
| debugimplementation      | debugCompile       |
| releaseimplementation    | releaseCompile     |

- **api**

> 与compile对应，功能完全一样，会添加依赖到编译路径，并且会将依赖打包到输出（aar或apk），与implementation不同，这个依赖可以传递，其他module无论在编译时和运行时都可以访问这个依赖的实现，也就是会泄漏一些不应该不使用的实现。举个例子，A依赖B，B依赖C，如果都是使用api配置的话，A可以直接使用C中的类（编译时和运行时），而如果是使用implementation配置的话，在编译时，A是无法访问C中的类的。

- **implementation**

> 与compile对应，会添加依赖到编译路径，并且会将依赖打包到输出（aar或apk），但是**在编译时不会将依赖的实现暴露给其他module**，也就是只有在运行时其他module才能访问这个依赖中的实现;

> 简单的说，就是使用implementation指令的依赖不会传递;

> 使用这个配置，可以显著提升构建时间，因为它可以减少重新编译的module的数量。Google建议尽量使用这个依赖配置;

- **compileOnly**

> 与provided对应，Gradle把依赖加到编译路径，编译时使用，不会打包到输出（aar或apk）。这可以减少输出的体积，在只在编译时需要，在运行时可选的情况，很有用

- **apk**

> 只在生成apk的时候参与打包，编译时不会参与，很少用。

- **testImplementation**

> 只在单元测试代码的编译以及最终打包测试apk时有效。

- **androidTestImplementation**

> 只在Android相关单元测试代码的编译以及最终打包测试apk时有效。

- **debugImplementation**

> 只在 debug 模式的编译和最终的 debug apk 打包时有效

- **releaseImplementation**

> 仅仅针对 Release 模式的编译和最终的 Release apk 打包。

------

### 引入依赖基本方式

理论上gradle支持三种类型的引用，方式如下：

```kotlin
dependencies {
    
    implementation(project(":projectABC"))
    
    implementation(fileTree(dir: "libs", include: ["*.jar"]))

    implementation("androidx.appcompat:appcompat:1.0.2")
}
```

#### 1. 本地项目依赖 --> module依赖

```kotlin
dependencies {
    implementation(project(":projectABC"))
}
```

这种依赖方式是直接依赖本地工程代码，比如这个 **:projectABC** 就是在整个工程项目配置的 **settings.gradle** 中进行include操作;
 例如：

```kotlin
dependencies {
   include (":projectABC")
}
```

#### 2. 本地二进制依赖 --> jar和so等文件

```kotlin
dependencies {
    implementation(fileTree(dir: "libs", include: ["*.jar"]))
}
```

这种依赖方式是依赖工程中 **libs** 目录下的Jar等文件；

如果还想进行单独某个文件的引用

```kotlin
dependencies {
    implementation(files("libs/aaa.jar", "libs/bbb.jar"))
    implementation(files("x/y/z/ccc.jar"))
}
```

> 注意：Gradle的路径是相对于build.gradle文件来读取的，所以上面是这样的相对路径

#### 3.远端二进制依赖

```kotlin
dependencies {
    implementation("androidx.appcompat:appcompat:1.0.2")
}
```

这是简洁写法，也可以进行完整写法，如：

```kotlin
dependencies {
    implementation(group: "androidx.appcompat", name:"appcompat", version:"1.0.2")
}
```

------

### 引入依赖复杂方式

#### 根据Task类型引入

有时候我们在引入的时候还需要考虑debug，release，test包的情况如

```kotlin
dependencies {
    testimplementation("junit:junit:4.12")
    
    androidTestimplementation("com.android.support.test:runner:1.0.1")
    androidTestimplementation("com.android.support.test.espresso:espresso-core:3.0.1")
    
    debugimplementation("com.squareup.leakcanary:leakcanary-android:2.0-beta-2")
    releaseimplementation("com.squareup.leakcanary:leakcanary-android-no-op:2.0-beta-2")
}
```

#### 排除引用

有时候为了解决引入的冲突，需要在引入远端包的同时排除这些包的某几个依赖

```kotlin
dependencies {
    implementation("com.github.bumptech.glide:glide:4.9.0"){
        exclude (group:"com.android.support", module: "support-fragment")
        exclude (group:"com.android.support", module: "support-core-ui")
        exclude (group:"com.android.support", module: "support-compat")
        exclude (group:"com.android.support", module: "support-annotations")
    }
}
```

## 让debug和release不冲突

添加下面的,包名会改变

```kotlin
//kotlin kts
buildTypes{
     named("debug"){
            applicationIdSuffix=".debug"
        }
}
```

```groovy
// groovy
buildTypes{
     debug{
            applicationIdSuffix=".debug"
        }
}
```

或者

```kotlin
productFlavors {
    free {
        applicationId "net.company.appname.free"
    }

    paid {
        applicationId "net.company.appname.paid"
    }
}
```

## split api

```kotlin
//kotlin kts 
  splits {
            abi {
                isEnable=true
                reset()
                // 设置包含，调用前需要先用 reset 将默认清除
                include("arm64-v8a","armeabi-v7a")
                isUniversalApk =true
            }
        }
```

```groovy
defaultConfig{
     splits {
            abi {
                enable true
            }
        }
}
```
