# build.gradle

## 例子

### kts

```kotlin
plugins {  
  id("com.android.application")  
  id("org.jetbrains.kotlin.android")  
  alias(libs.plugins.kapt)  
}  
apply(System.getenv("gradle_ext") + "\\sign.gradle")  
android {  
  namespace = "ab.yzq.tutor.xpagemini"  
  
  defaultConfig {  
    applicationId = "ab.yzq.tutor.xpagemini"  
    versionCode = 1  
    versionName = "1.0"  
  
    testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"  
  }  
  
  buildTypes {  
    release {  
      isMinifyEnabled = false  
      proguardFiles(  
        getDefaultProguardFile("proguard-android-optimize.txt"),  
        "proguard-rules.pro"  
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
}  
  
dependencies {  
  implementation(libs.bundles.core)  
  implementation(libs.xui)  
  implementation(libs.xpage)  
  implementation(libs.glide)  
  kapt(libs.xpage.compiler)  
}
```

### groovy
```groovy
plugins {  
  id 'com.android.application'  
  id "org.jetbrains.kotlin.kapt"  
  id 'kotlin-android'  
  id 'img-optimizer'  
}  
//打包时，记得设置true启用  
  
apply from: System.getenv("gradle_ext") + "\\sign.gradle"  
android {  
  
  
  defaultConfig {  
    applicationId "ab.yzq.tutor"  
  
    versionCode 1  
    versionName "1.0"  
    testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"  
  
    vectorDrawables.useSupportLibrary = true  
  
    javaCompileOptions {  
      annotationProcessorOptions {  
        arguments = [moduleName: project.getName()]  
      }  
    }  
  }  
buildTypes {  
  release{  
    buildConfigField "String", "APP_ID_UMENG", "appID"  
  }  
  debug{  
    buildConfigField "String", "APP_ID_UMENG", "aa"  
  }  
}  
  
  compileOptions {  
    sourceCompatibility JavaVersion.VERSION_1_8  
    targetCompatibility JavaVersion.VERSION_1_8  
  }  
  kotlinOptions {  
    jvmTarget = "1.8"  
  }  
  buildFeatures {  
    viewBinding true  
  }  
  namespace 'ab.yzq.tutor'  
  lint {  
    abortOnError false  
  }  
}  
  
dependencies {  
  implementation fileTree(dir: 'libs', include: ['*.jar'])  
  implementation(libs.bundles.core)  
  
}
```

## 添加依赖

```kotlin
implementation(files("./commonjar/3rdparty/gson-2.8.5.jar"))
implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.jar", "*.aar"))))
implementation(fileTree("libs") {
        include("*.jar", "*.aar")
    })
```

## 配置ndk
###  goovy

```groovy
defaultConfig {  
  ndk {  
    abiFilters "arm64-v8a"//, "armeabi-v7a"  
  }  
  
  minSdk 26  
  targetSdk 34  
  
  testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'  
}
```
### kts
```kotlin
```kotlin
 ndk {
        abiFilters += listOf("armeabi-v7a", "arm64-v8a", "x86", "x86_64")
    }
```


## 配置buildTypes

### groovy
```groovy
 signingConfigs {  
  debug {  
    storeFile file(System.getenv("gradle_ext") + "\\appkey.jks")//file("$rootDir/appkey.jks")  
    storePassword "123456"  
    keyAlias "appkey"  
    keyPassword "123456"  
  }  
  release {  
    storeFile file(System.getenv("gradle_ext") + "\\appkey.jks")//file("$rootDir/appkey.jks")  
    storePassword "123456"  
    keyAlias "appkey"  
    keyPassword "123456"  
  }  
}
   buildTypes {
        release {
            minifyEnabled true
            //后缀
			applicationIdSuffix '.jv.debug'  
            //版本名前缀
			versionNameSuffix '-DEBUG'
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.config
            //buildConfigField用于给BuildConfig文件添加一个字段
            //三个参数:1.要定义的常量的类型 2.该常量的命名 3.该常量的值
            buildConfigField("String", "HTTP_BASE", '"https://www.baidu.com/api/release/"')
            buildConfigField("String","HAHA","\"haahahah\"")
        }
        debug{
            buildConfigField("String", "HTTP_BASE", '"https://www.baidu.com/api/debug"')
            buildConfigField("String","HAHA","\"haahahah\"")
        }
    }
 
```
### kts

```kotlin
android {
    signingConfigs {
        getByName("debug") {
            keyAlias = "debug"
            keyPassword = "my debug key password"
            storeFile = file("/home/miles/keystore.jks")
            storePassword = "my keystore password"
        }
        create("release") {
            keyAlias = "release"
            keyPassword = "my release key password"
            storeFile = file("/home/miles/keystore.jks")
            storePassword = "my keystore password"
        }
    }
    compileSdkVersion(28)
    defaultConfig {
        applicationId = "com.mileskrell.someneatapp"
        minSdkVersion(19)
        targetSdkVersion(28)
        versionCode = 1
        versionName = "1.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            buildConfigField("String","myId",gradleLocalProperties(rootDir).getProperty("myId"))
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
            signingConfig = signingConfigs.getByName("release")
            isDebuggable = false
        }
        getByName("debug") {
        
           proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
           buildConfigField("String","myId",gradleLocalProperties(rootDir).getProperty("myId"))
            signingConfig = signingConfigs.getByName("debug")
            isDebuggable = true
        }
    }
}
```
## 配置jdk
```groovy
compileOptions {  
  sourceCompatibility = JavaVersion.VERSION_17  
  targetCompatibility = JavaVersion.VERSION_17  
}  
kotlinOptions {  
  jvmTarget = "17"  
}
```

## 其他

## apply
```
//groovy  
apply from: 'custom.gradle'  
  
// kotlin-dsl  
apply(from = "custom.gradle")

//groovy
apply plugin:"kotlin-android"
//kts
apply(plugin="kotlin-android")
```

## ext
### groovy
```groovy
ext {  
    compileSdkVersion = 28  
    buildToolsVersion = "28.0.3"  
  
    supportLibVersion = "28.0.0"  
    ...  
}
//使用
minSdk = rootProject.extra.get("minSdk") 
```

### kts

```kotlin

extra["minSdk"]=24
extra["compileSdk"]=34

//使用
minSdk = rootProject.extra["minSdk"] as Int
minSdk = rootProject.extra.get("minSdk") as Int
```

## 获取local.properties

## groovy

```groovy
 
Properties properties = new Properties()
properties.load(project.rootProject.file('local.properties').newDataInputStream())
def sdkDir = properties.getProperty('sdk.dir')
def ndkDir = properties.getProperty('ndk.dir')


 
Properties properties = new Properties()
if (rootProject.file("local.properties").exists()) {
    properties.load(rootProject.file("local.properties").newDataInputStream())
}

println properties.getProperty("sdk.dir", "")
```
```
## kts

```kotlin
//第一种
import java.util.*
// ...

val properties = Properties().apply {
    load(rootProject.file("local.properties").reader())
}
val myProp = properties["propName"]


//第二种

 
import com.android.build.gradle.internal.cxx.configure.gradleLocalProperties
// ...

val properties = gradleLocalProperties(rootDir)
val myProp = properties["propName"]
 
```