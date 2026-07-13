# 从 Groovy DSL 迁移到 Kotlin DSL

## 一、为什么要迁移

| 特性 | Groovy DSL | Kotlin DSL |
|------|-----------|-----------|
| 类型安全 | ❌ 运行时才能发现错误 | ✅ 编译时检查 |
| IDE 智能提示 | ❌ 有限 | ✅ 完整自动补全 |
| 代码导航 | ❌ 无法跳转 | ✅ 点击跳转到定义 |
| 重构支持 | ❌ 不支持 | ✅ 安全重构 |
| 性能 | 相同 | 相同 |
| 学习成本 | 低 | 中（需要 Kotlin 基础） |

## 二、迁移步骤

### 1. 修改 settings.gradle → settings.gradle.kts

```kotlin
// settings.gradle.kts
rootProject.name = "MyApp"

pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

include(":app")
include(":library")
```

### 2. 修改根 build.gradle → build.gradle.kts

```kotlin
// build.gradle.kts（根目录）
plugins {
    id("com.android.application") version "8.2.2" apply false
    id("com.android.library") version "8.2.2" apply false
    id("org.jetbrains.kotlin.android") version "1.9.22" apply false
}
```

### 3. 修改模块 build.gradle → build.gradle.kts

```kotlin
// app/build.gradle.kts
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.example.myapp"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.myapp"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
}
```

## 三、对照参考表

| Groovy DSL | Kotlin DSL |
|-----------|-----------|
| `compileSdkVersion 34` | `compileSdk = 34` |
| `minSdkVersion 26` | `minSdk = 26` |
| `targetSdkVersion 34` | `targetSdk = 34` |
| `buildToolsVersion "34.0.0"` | 已弃用，无需配置 |
| `applicationId "com.example"` | `applicationId = "com.example"` |
| `versionCode 1` | `versionCode = 1` |
| `versionName "1.0"` | `versionName = "1.0"` |
| `testInstrumentationRunner "..."` | `testInstrumentationRunner = "..."` |
| `buildTypes { release { minifyEnabled true } }` | `buildTypes { release { isMinifyEnabled = true } }` |
| `signingConfigs { release { } }` | `signingConfigs { create("release") { } }` |
| `flavorDimensions "tier"` | `flavorDimensions += "tier"` |
| `productFlavors { demo { } }` | `productFlavors { create("demo") { } }` |
| `proguardFiles getDefaultProguardFile(...)` | `proguardFiles(getDefaultProguardFile(...))` |
| `ext { ver = "1.0" }` | `extra["ver"] = "1.0"` |
| `apply plugin: 'xxx'` | `plugins { id("xxx") }` |
| `apply from: 'file.gradle'` | `apply(from = "file.gradle")` |
| `implementation 'com.xxx:yyy:1.0'` | `implementation("com.xxx:yyy:1.0")` |
| `implementation project(':core')` | `implementation(project(":core"))` |
| `debugImplementation '...'` | `debugImplementation("...")` |
| `testImplementation '...'` | `testImplementation("...")` |
| `androidTestImplementation '...'` | `androidTestImplementation("...")` |
| `compileOnly '...'` | `compileOnly("...")` |
| `runtimeOnly '...'` | `runtimeOnly("...")` |

## 四、常见迁移问题

### 1. 访问 ext 属性

```groovy
// Groovy
ext {
    compileSdk = 34
    minSdk = 26
}
```

```kotlin
// Kotlin DSL
android {
    compileSdk = rootProject.extra["compileSdk"] as Int
    defaultConfig {
        minSdk = rootProject.extra["minSdk"] as Int
    }
}

// 使用委托属性更简洁
val compileSdk: Int by rootProject.extra
val minSdk: Int by rootProject.extra

android {
    compileSdk = compileSdk
    defaultConfig {
        minSdk = minSdk
    }
}
```

### 2. 在 KTS 中使用 Groovy 闭包

当通过 `apply(from = "...")` 引用 Groovy 脚本时，其中的闭包可以这样调用：

```kotlin
// 引用 Groovy 脚本
apply(from = "../compat.gradle")

// 调用 Groovy 闭包
val roomImpl: groovy.lang.Closure<Any> by ext
roomImpl()
```

### 3. Named 方法

```groovy
// Groovy
buildTypes {
    release {
        minifyEnabled true
    }
}
```

```kotlin
// Kotlin DSL
buildTypes {
    named("release") {
        isMinifyEnabled = true
    }
}
```

### 4. 字符串模板

```groovy
// Groovy
implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
```

```kotlin
// Kotlin DSL
implementation("org.jetbrains.kotlin:kotlin-stdlib:${rootProject.extra["kotlinVersion"]}")
// 或使用 by project 委托
val kotlinVersion: String by project
implementation("org.jetbrains.kotlin:kotlin-stdlib:$kotlinVersion")
```

## 五、官方工具

Gradle 提供了自动迁移工具：

```bash
# 运行迁移任务，自动转换 .gradle 到 .gradle.kts
./gradlew init

# 或手动模式：复制 .gradle 内容到 .gradle.kts，Gradle 会自动转换
```

- [官方迁移文档](https://docs.gradle.org/current/userguide/migrating_from_groovy_to_kotlin_dsl.html)
- [Android KTS 迁移指南](https://developer.android.google.cn/studio/build/migrate-to-kts)
