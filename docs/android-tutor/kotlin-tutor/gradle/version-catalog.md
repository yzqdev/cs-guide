# gradle统一版本控制VERSION_CATALOG

[官方文档](https://docs.gradle.org/current/userguide/platforms.html)

## 使用

[源文档](https://blog.csdn.net/qq_24889033/article/details/125307004)

### 开启

在`settings.gradle.kts`添加下面内容

```kotlin
 enableFeaturePreview("VERSION_CATALOGS")

```

再加入依赖管理  

```kotlin
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
    //注意，重点在这里
    versionCatalogs {
        create("lib") {
            library("core-ktx", "androidx.core", "core-ktx").version("1.7.0")
            library("appcompat", "androidx.appcompat", "appcompat").version("1.4.1")
        }
    }
}
```

create中的lib为创建的目录名，可以自己定义,将来使用`implementation(libs.core.ktx)`,`-`会被转化为`.`

### 添加版本号

第一种

```kotlin
 //入参是别名和完整的依赖和版本号，比如上面的appcompat可以写成：
 versionCatalogs {
        create("lib") {
            library("appcompat","androidx.appcompat:appcompat:1.4.1")
        }
    }
```

第二种  

```kotlin
 //入参为{别名},{group},{artifact}
 versionCatalogs {
  create("lib") {
   library("core-ktx", "androidx.core", "core-ktx").version("1.7.0")
  }
 }
```

也可以创建多个目录  

```kotlin
//settings.gradle.kts
 versionCatalogs {
  crete("lib"){
   library("fastjson", "com.alibaba", "fastjson").version("1.2.79")
   library("fastjson2", "com.alibaba.fastjson2", "fastjson2").version("2.0.4")
   library("fastjson2-kotlin", "com.alibaba.fastjson2", "fastjson2-kotlin").version("2.0.4")
  }
  
  create("androidx"){
   library("core-ktx", "androidx.core", "core-ktx").version("1.7.0")
   library("appcompat", "androidx.appcompat", "appcompat").version("1.4.1")
   library("activity-ktx", "androidx.activity", "activity-ktx").version("1.4.0")
   library("fragment-ktx", "androidx.fragment", "fragment-ktx").version("1.4.1")
  }
 }
```

然后为每个子组生成别名会创建成类型安全访问器。例如，给定名为 的版本目录中的以下别名libs：
`appcompat`,`core-ktx`,`activity-kts`,`androidx.fragment.kts`
将会自动生成一下类型安全的访问器：

```
lib.appcompat
lib.core.kts
lib.activity.kts
lib.androidx.fragment.kts
```

前缀lib来自版本目录名称。

如果您想避免生成子组访问器，我们建议依靠大小写来区分。例如，别名activityKts,coreKtx和fastjson2Kotlin将分别映射到libs.groovyCore,libs.groovyJson和libs.groovyXml访问器。

### 管理版本

```kotlin
//settings.gradle.kts
 version("minSdk","24")
 version("targetSdk","31")
 
 //build.gradle.kts(:app)
 android {
  defaultConfig {
   minSdk = libs.versions.minSdk.get().toInt()
   targetSdk = libs.versions.targetSdk.get().toInt()
   ...
  }
 }
```

也可以在**根目录**的`build.gradle.kts`加入

```kotlin
extra["compileSdk"]=33
extra["minSdk"]=21
extra["targetSdk"]=33
``
然后在app目录的`build.gradle.kts`使用
```kotlin
android {
    compileSdk=rootProject.extra["compileSdk"] as Int

    defaultConfig {
        applicationId = "com.yzq.sample"
        minSdk=rootProject.extra["minSdk"] as Int
        targetSdk=rootProject.extra["targetSdk"] as Int
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
}
```

### 使用包

其实就是一个别名包含一大堆依赖

```kotlin
    versionCatalog {
        version("kotlin", "1.7.0")
        library("stdlib", "org.jetbrains.kotlin", "kotlin-stdlib").versionRef("kotlin")
        library("reflect", "org.jetbrains.kotlin", "kotlin-reflect").versionRef("kotlin")
        //bundle的入参分别为，alias（别名），需要依赖的别名集合
        bundle("kotlin", listOf("stdlib", "reflect"))
        
     create("androidEx") {
                //------------------------------ androidx start ----------------------------
                library("core", "androidx.core:core-ktx:1.9.0")
                library("appcompat", "androidx.appcompat:appcompat:1.5.1")
                library("fragmentKtx", "androidx.fragment:fragment-ktx:1.5.3")
                library("material", "com.google.android.material:material:1.6.1")
                library(
                    "constraintlayout",
                    "androidx.constraintlayout:constraintlayout:2.1.4"
                )
                library(
                    "navigationFragmentKtx",
                    "androidx.navigation:navigation-fragment-ktx:2.5.2"
                )
                library("navigationUiKtx", "androidx.navigation:navigation-ui-ktx:2.5.2")

                bundle("common",listOf("core","appcompat","fragmentKtx","material","constraintlayout","navigationFragmentKtx","navigationUiKtx"))
            }

       
}
```

然后在子模块中

```kotlin
dependencies{
 api(lib.bundles.kotlin)
    api(lib.bundles.coroutines)
    //所有module只需要这一句就能依赖所有
    api(androidEx.bundles.common)
}
```

:::tip
tips:不同类型的别名是可以重复的，他们之间相互独立。
允许以下方式使用：

```
version("kotlin",""),
library("kotlin",""),
bundle("kotlin",listOf("",""))
```

:::
