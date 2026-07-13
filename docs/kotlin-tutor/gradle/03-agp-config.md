# Android 构建配置

## 一、AGP 版本与 Gradle 版本对应

| AGP 版本 | 最低 Gradle | Kotlin 版本 | 主要特性 |
|----------|------------|-------------|---------|
| 8.2 | 8.2 | 1.9.x | Android 14 支持，Non-Transitive R 类默认 |
| 8.1 | 8.0 | 1.9.x | 最低 API 19，Compose Compiler 独立 |
| 8.0 | 8.0 | 1.8.x | API 33+ 默认启用 AIDL 的 fastdeploy |
| 7.4 | 7.5 | 1.8.x | 稳定版，Credential Manager API |
| 7.3 | 7.4 | 1.7.x | Compose 稳定支持，Native SDK |
| 7.2 | 7.3.3 | 1.7.x | BOM 支持，lint 改进 |
| 7.0 | 7.0 | 1.5.x | Java 11 最低要求，AGP 7.0 重大更新 |

```kotlin
// settings.gradle.kts —— 配置 AGP 和 Kotlin 版本
plugins {
    id("com.android.application") version "8.2.2" apply false
    id("com.android.library") version "8.2.2" apply false
    id("org.jetbrains.kotlin.android") version "1.9.22" apply false
}
```

## 二、完整 Android 应用模块

```kotlin
// app/build.gradle.kts
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("kotlin-kapt")           // Room 等需要注解处理
}

android {
    namespace = "com.example.myapp"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.myapp"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

        // NDK ABI 过滤
        ndk { abiFilters += listOf("arm64-v8a", "armeabi-v7a") }
    }

    buildTypes {
        debug {
            isMinifyEnabled = false
            applicationIdSuffix = ".debug"
            versionNameSuffix = "-debug"
        }
        release {
            isMinifyEnabled = true          // 启用混淆
            isShrinkResources = true        // 资源收缩
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        isCoreLibraryDesugaringEnabled = true  // Java 8+ API 支持
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions { jvmTarget = "17" }

    buildFeatures {
        compose = true        // Jetpack Compose
        viewBinding = true    // ViewBinding
        buildConfig = true    // BuildConfig 生成
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.8"
    }

    packaging {
        resources { excludes += "/META-INF/{AL2.0,LGPL2.1}" }
    }
}

dependencies {
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.0.4")

    // Compose BOM
    val composeBom = platform("androidx.compose:compose-bom:2024.02.00")
    implementation(composeBom)
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.activity:activity-compose:1.8.2")
    debugImplementation("androidx.compose.ui:ui-tooling")
}
```

## 三、多渠道打包（Flavor）

```kotlin
// app/build.gradle.kts
android {
    flavorDimensions += "version"
    productFlavors {
        create("demo") {
            dimension = "version"
            applicationIdSuffix = ".demo"
            versionNameSuffix = "-demo"
        }
        create("full") {
            dimension = "version"
        }
    }
}
```

## 四、APK 签名配置

```kotlin
android {
    signingConfigs {
        create("release") {
            storeFile = file("../keystore/release.keystore")
            storePassword = System.getenv("STORE_PASSWORD") ?: "password"
            keyAlias = System.getenv("KEY_ALIAS") ?: "key0"
            keyPassword = System.getenv("KEY_PASSWORD") ?: "password"
        }
    }

    buildTypes {
        release {
            signingConfig = signingConfigs.getByName("release")
        }
    }
}
```

## 五、自定义 APK 名称

```kotlin
android {
    applicationVariants.all {
        val variant = this
        outputs.all {
            if (this is com.android.build.gradle.internal.api.ApkVariantOutputImpl) {
                val abi = this.filters.find { filter ->
                    filter.filterType ==
                        com.android.build.api.variant.FilterConfiguration.FilterType.ABI.name
                }?.identifier ?: "universal"

                this.outputFileName =
                    "MyApp_${variant.versionName}_${variant.buildType.name}_${abi}.apk"
            }
        }
    }
}
```

## 六、ABI 拆分

```kotlin
android {
    splits {
        abi {
            isEnable = true
            reset()
            include("arm64-v8a", "armeabi-v7a", "x86_64")
            isUniversalApk = true  // 同时生成通用包
        }
    }
}
```

## 七、BuildConfig 自定义字段

```kotlin
android {
    defaultConfig {
        buildConfigField("String", "API_BASE_URL", "\"https://api.example.com\"")
        buildConfigField("boolean", "IS_DEBUG", "true")
    }
    buildTypes {
        debug {
            buildConfigField("String", "API_BASE_URL", "\"https://dev-api.example.com\"")
        }
        release {
            buildConfigField("String", "API_BASE_URL", "\"https://api.example.com\"")
            buildConfigField("boolean", "IS_DEBUG", "false")
        }
    }
}
```

```kotlin
// 代码中使用
val baseUrl = BuildConfig.API_BASE_URL
val isDebug = BuildConfig.IS_DEBUG
```

## 八、库模块配置

```kotlin
// library/build.gradle.kts
plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.example.mylibrary"
    compileSdk = 34

    defaultConfig {
        minSdk = 26
        // 库模块不能设置 applicationId
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
}
```

## 九、调试与 Release 不冲突

```kotlin
android {
    buildTypes {
        debug {
            applicationIdSuffix = ".debug"     // 包名不同，可同时安装
            versionNameSuffix = "-debug"
        }
    }
}
```

## 十、Java 8+ API 支持（Desugar）

```kotlin
android {
    compileOptions {
        isCoreLibraryDesugaringEnabled = true
    }
}

dependencies {
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.0.4")
}
```

启用后可在低版本 Android 上使用 `java.time`、`java.util.stream` 等新 API：

```kotlin
val localDate = LocalDate.now()            // 需要 desugar
val stream = listOf(1, 2, 3).stream()       // 需要 desugar
```
