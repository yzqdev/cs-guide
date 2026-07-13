# 高级技巧

## 一、ext / extra 属性

### 在 Groovy 中使用

```groovy
// build.gradle
ext {
    compileSdk = 34
    minSdk = 26
    targetSdk = 34
    versionName = "1.0.0"
}
```

### 在 Kotlin DSL 中使用

```kotlin
// build.gradle.kts
extra.apply {
    set("compileSdk", 34)
    set("minSdk", 26)
    set("targetSdk", 34)
}

// 子模块中访问
android {
    compileSdk = rootProject.extra["compileSdk"] as Int
    defaultConfig {
        minSdk = rootProject.extra["minSdk"] as Int
    }
}

// 使用委托属性（推荐）
val compileSdk: Int by rootProject.extra
val minSdk: Int by rootProject.extra
```

### 通过 gradle.properties

```properties
# gradle.properties
compileSdk=34
minSdk=26
targetSdk=34
```

```kotlin
// build.gradle.kts —— 读取 gradle.properties
val compileSdk: String by project
val minSdk: String by project

android {
    compileSdk = compileSdk.toInt()
    defaultConfig {
        minSdk = minSdk.toInt()
    }
}
```

## 二、引入外部 Gradle 脚本

```kotlin
// compat.gradle —— 外部脚本
ext {
    set("compatDeps", listOf(
        "androidx.core:core-ktx:1.12.0",
        "androidx.appcompat:appcompat:1.6.1",
        "com.google.android.material:material:1.11.0"
    ))
}

// 或者返回闭包
def compatImp() {
    return dependencies {
        implementation("androidx.core:core-ktx:1.12.0")
        implementation("androidx.appcompat:appcompat:1.6.1")
    }
}
ext.compatImp = this.&compatImp
```

```kotlin
// build.gradle.kts —— 引用外部脚本
apply(from = "../compat.gradle")

// 访问 ext 属性
val deps: List<String> by ext
deps.forEach { implementation(it) }

// 调用 Groovy 闭包
val compatImp: groovy.lang.Closure<Any> by ext
compatImp()
```

## 三、修改 build 输出目录

```kotlin
// 将所有模块的 build 输出集中到项目根目录
allprojects {
    layout.buildDirectory = File(rootDir, "build/${path.replace(':', '/')}")
}
```

## 四、获取 git 信息

```kotlin
// build.gradle.kts —— 在 BuildConfig 中添加 git 信息
import org.gradle.api.tasks.Exec

val gitCommitCount by lazy {
    try {
        val process = ProcessBuilder("git", "rev-list", "--count", "HEAD")
            .directory(projectDir)
            .redirectErrorStream(true)
            .start()
        process.inputStream.bufferedReader().readText().trim().toInt()
    } catch (e: Exception) {
        0
    }
}

val gitCommitHash by lazy {
    try {
        val process = ProcessBuilder("git", "rev-parse", "--short", "HEAD")
            .directory(projectDir)
            .redirectErrorStream(true)
            .start()
        process.inputStream.bufferedReader().readText().trim()
    } catch (e: Exception) {
        "unknown"
    }
}

android {
    defaultConfig {
        buildConfigField("int", "GIT_COMMIT_COUNT", "$gitCommitCount")
        buildConfigField("String", "GIT_COMMIT_HASH", "\"$gitCommitHash\"")
    }
}
```

## 五、按版本生成不同 APK

```kotlin
// 修改 APK 输出名称
android {
    applicationVariants.all {
        val variant = this
        outputs.all {
            if (this is com.android.build.gradle.internal.api.ApkVariantOutputImpl) {
                this.outputFileName =
                    "MyApp_${variant.versionName}_${variant.buildType.name}.apk"
            }
        }
    }
}

// 同时安装 Debug 和 Release
android {
    buildTypes {
        debug {
            applicationIdSuffix = ".debug"
        }
    }
}
```

## 六、Split ABI

```kotlin
android {
    splits {
        abi {
            isEnable = true
            reset()
            include("arm64-v8a", "armeabi-v7a")
            isUniversalApk = true
        }
    }
}
```

## 七、NDK 过滤

```kotlin
android {
    defaultConfig {
        ndk {
            // 只保留指定架构的 so 库
            abiFilters += listOf("arm64-v8a", "armeabi-v7a")
        }
    }
}
```

## 八、includeBuild

```kotlin
// settings.gradle.kts —— 引用外部项目
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
    includeBuild("../shared-build-logic")
}

// 或通过环境变量
includeBuild(System.getenv("GRADLE_PLUGIN_BOM") + "/deps")
```

## 九、Compose Compiler 版本

```kotlin
// 在 build.gradle.kts 中配置 Compose Compiler
kotlin {
    // Kotlin 1.9.0+，Compose Compiler 独立维护
    // 参考：https://developer.android.com/jetpack/androidx/releases/compose-kotlin
}

android {
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.8"  // 需与 Kotlin 版本匹配
    }
}
```

| Kotlin 版本 | Compiler 版本 |
|------------|--------------|
| 1.9.22 | 1.5.10 |
| 1.9.21 | 1.5.9 |
| 1.9.20 | 1.5.5+ |
| 1.9.10 | 1.5.4 |
| 1.9.0 | 1.5.3+ |

## 十、Desugar JDK

```kotlin
android {
    compileOptions {
        isCoreLibraryDesugaringEnabled = true
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.0.4")
}
```

## 十一、依赖解决冲突

```kotlin
// 强制版本
implementation("androidx.appcompat:appcompat:1.6.1") {
    force = true
}

// 排除传递依赖
implementation("com.example:lib:1.0") {
    exclude(group = "com.example", module = "sub-lib")
}

// 全局配置
configurations.all {
    resolutionStrategy {
        // 强制版本
        force("androidx.core:core-ktx:1.12.0")
        // 使用最新的冲突版本
        failOnVersionConflict()
        // 缓存动态版本 10 分钟
        cacheDynamicVersionsFor(10, "minutes")
    }
}
```

## 十二、Task 依赖分析

```bash
# 查看 Task 依赖树
./gradlew :app:assembleDebug --dry-run

# 配置文件缓存统计
./gradlew build --configuration-cache

# 查看构建耗时
./gradlew build --profile

# 生成构建扫描（浏览器查看）
./gradlew build --scan
```
