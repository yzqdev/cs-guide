# 版本目录（Version Catalog）

## 一、什么是 Version Catalog

Version Catalog 是 Gradle 7.0+ 引入的统一版本管理方案。通过 `libs.versions.toml` 文件集中管理依赖版本，所有模块共享同一份版本定义。

### 优势

- **类型安全**：IDE 自动补全，编译时检查
- **集中管理**：一处修改，全局生效
- **版本共享**：多模块间自动同步
- **内置 BOM 支持**：便捷管理 Compose 等 BOM 依赖

## 二、创建 TOML 文件

在项目根目录创建 `gradle/libs.versions.toml`：

```toml
# gradle/libs.versions.toml

[versions]
kotlin = "1.9.22"
agp = "8.2.2"
composeBom = "2024.02.00"
composeCompiler = "1.5.8"
coreKtx = "1.12.0"
appcompat = "1.6.1"
material = "1.11.0"
retrofit = "2.9.0"
okhttp = "4.12.0"
coroutines = "1.7.3"
room = "2.6.1"
hilt = "2.50"

[libraries]
# 单个库
core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
appcompat = { module = "androidx.appcompat:appcompat", version.ref = "appcompat" }
material = { module = "com.google.android.material:material", version.ref = "material" }

# 多个 artifact 从同一模块
retrofit-core = { module = "com.squareup.retrofit2:retrofit", version.ref = "retrofit" }
retrofit-gson = { module = "com.squareup.retrofit2:converter-gson", version.ref = "retrofit" }
okhttp-core = { module = "com.squareup.okhttp3:okhttp", version.ref = "okhttp" }
okhttp-logging = { module = "com.squareup.okhttp3:logging-interceptor", version.ref = "okhttp" }

# 使用 BOM
compose-bom = { module = "androidx.compose:compose-bom", version.ref = "composeBom" }
compose-ui = { module = "androidx.compose.ui:ui" }
compose-material3 = { module = "androidx.compose.material3:material3" }
compose-tooling-preview = { module = "androidx.compose.ui:ui-tooling-preview" }
compose-tooling = { module = "androidx.compose.ui:ui-tooling" }

# Room
room-runtime = { module = "androidx.room:room-runtime", version.ref = "room" }
room-ktx = { module = "androidx.room:room-ktx", version.ref = "room" }
room-compiler = { module = "androidx.room:room-compiler", version.ref = "room" }

# Coroutines
coroutines-core = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "coroutines" }
coroutines-android = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-android", version.ref = "coroutines" }

# Hilt
hilt-android = { module = "com.google.dagger:hilt-android", version.ref = "hilt" }
hilt-compiler = { module = "com.google.dagger:hilt-compiler", version.ref = "hilt" }

[bundles]
# 依赖包（一组依赖，方便导入）
compose = ["compose-ui", "compose-material3", "compose-tooling-preview"]
retrofit = ["retrofit-core", "retrofit-gson", "okhttp-core", "okhttp-logging"]
coroutines = ["coroutines-core", "coroutines-android"]
room = ["room-runtime", "room-ktx", "room-compiler"]

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
android-library = { id = "com.android.library", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
kotlin-kapt = { id = "org.jetbrains.kotlin.kapt", version.ref = "kotlin" }
hilt = { id = "com.google.dagger.hilt.android", version.ref = "hilt" }
```

## 三、在构建脚本中使用

### settings.gradle.kts 中启用

```kotlin
// settings.gradle.kts
enableFeaturePreview("VERSION_CATALOGS")
// Gradle 7.4+ 默认启用，无需单独配置
```

### 在 build.gradle.kts 中使用

```kotlin
// 根 build.gradle.kts
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.android.library) apply false
    alias(libs.plugins.kotlin.android) apply false
}
```

```kotlin
// app/build.gradle.kts
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.kapt)
}

android {
    compileSdk = 34
    defaultConfig {
        minSdk = 26
    }
}

dependencies {
    // 单个库
    implementation(libs.core.ktx)
    implementation(libs.appcompat)
    implementation(libs.material)

    // BOM 方式
    implementation(platform(libs.compose.bom))
    implementation(libs.compose.ui)
    implementation(libs.compose.material3)

    // Bundle 方式
    implementation(libs.bundles.retrofit)
    implementation(libs.bundles.coroutines)

    // KAPT
    kapt(libs.room.compiler)
}
```

### 版本目录的命名规则

| TOML 键名 | 生成的访问器 |
|-----------|-------------|
| `core-ktx` | `libs.core.ktx` |
| `compose-bom` | `libs.compose.bom` |
| `compose-ui` | `libs.compose.ui` |
| `retrofit-core` | `libs.retrofit.core` |

**注意**：Gradle 会将 TOML 中的 `-` 转换为访问器中的 `.`。

## 四、在 settings.gradle.kts 中直接声明

```kotlin
// settings.gradle.kts —— 不依赖 TOML 文件
dependencyResolutionManagement {
    versionCatalogs {
        create("libs") {
            // 版本号
            version("kotlin", "1.9.22")
            version("agp", "8.2.2")

            // 库
            library("core-ktx", "androidx.core", "core-ktx").version("1.12.0")
            library("appcompat", "androidx.appcompat:appcompat:1.6.1")
            library("retrofit-core", "com.squareup.retrofit2", "retrofit").versionRef("retrofit")

            // Bundle
            bundle("compose", listOf("compose-ui", "compose-material3"))

            // 插件
            plugin("android-application", "com.android.application").versionRef("agp")
        }
    }
}
```

## 五、BOM 使用

```kotlin
// 方式一：通过 TOML
// libs.versions.toml 中的 BOM 定义
// compose-bom = { module = "androidx.compose:compose-bom", version.ref = "composeBom" }
// compose-ui = { module = "androidx.compose.ui:ui" }

dependencies {
    implementation(platform(libs.compose.bom))
    implementation(libs.compose.ui)         // 版本由 BOM 提供
    implementation(libs.compose.material3)  // 版本由 BOM 提供
    androidTestImplementation(platform(libs.compose.bom))
    debugImplementation("androidx.compose.ui:ui-tooling")
}
```

## 六、多目录

```kotlin
// settings.gradle.kts —— 多个版本目录
dependencyResolutionManagement {
    versionCatalogs {
        create("libs") {
            from(files("../gradle/libs.versions.toml"))
        }
        create("androidx") {
            library("core-ktx", "androidx.core", "core-ktx").version("1.12.0")
            library("appcompat", "androidx.appcompat", "appcompat").version("1.6.1")
        }
    }
}
```

## 七、外部引用 Version Catalog

```kotlin
// settings.gradle.kts —— 引用外部 TOML 文件
dependencyResolutionManagement {
    versionCatalogs {
        create("libs") {
            from(files(System.getenv("GRADLE_EXT") + "/libs.versions.toml"))
        }
    }
}
```

## 八、自定义仓库中引用

```kotlin
// 在 version catalog 中使用自定义仓库
dependencyResolutionManagement {
    repositories {
        maven { url = uri("https://jitpack.io") }
        google()
        mavenCentral()
    }
}
```
