# 构建脚本与依赖管理

## 一、Kotlin DSL 基础

Gradle 支持两种 DSL：**Groovy**（`.gradle`）和 **Kotlin**（`.gradle.kts`）。Kotlin DSL 拥有类型安全、IDE 智能提示等优势，是新项目的推荐选择。

### Groovy vs Kotlin DSL 对照

| 场景 | Groovy DSL | Kotlin DSL |
|------|-----------|-----------|
| 插件声明 | `id 'com.android.application'` | `id("com.android.application")` |
| 依赖声明 | `implementation 'xxx:yyy:1.0'` | `implementation("xxx:yyy:1.0")` |
| 属性赋值 | `compileSdkVersion 34` | `compileSdk = 34` |
| 真值 | `true` / `false` | `true` / `false` |
| 字符串拼接 | `"${name}"` | `"${name}"` |
| 代码块 | `android { }` | `android { }` |
| 方法调用 | `apply plugin: 'xxx'` | `plugins { id("xxx") }` |

## 二、依赖管理

### 依赖配置说明

```kotlin
dependencies {
    // 编译时和运行时都可用，会传递依赖（类似 compile）
    api("com.example:lib:1.0")

    // 编译时和运行时都可用，不传递依赖（推荐）
    implementation("com.example:lib:1.0")

    // 仅在编译时可用，不会打包到输出中
    compileOnly("com.example:lib:1.0")

    // 仅在运行时可用，不参与编译
    runtimeOnly("com.example:lib:1.0")

    // 本地文件依赖
    implementation(fileTree("libs") { include("*.jar") })
    implementation(files("libs/aaa.jar", "libs/bbb.jar"))

    // 项目模块依赖
    implementation(project(":core"))
    implementation(project(":common"))

    // 测试相关
    testImplementation("junit:junit:4.13.2")
    testImplementation("org.jetbrains.kotlin:kotlin-test")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")

    // 构建类型限定
    debugImplementation("com.squareup.leakcanary:leakcanary-android:2.13")
    releaseImplementation("com.squareup.leakcanary:leakcanary-android-no-op:2.13")
}
```

### API vs Implementation

```text
api：依赖会传递
  A 依赖 B（api），B 依赖 C（api）
  → A 可以直接使用 C 中的类

implementation：依赖不会传递（推荐）
  A 依赖 B（implementation），B 依赖 C（implementation）
  → A 无法直接使用 C 中的类
  → 好处：减少编译范围，加快构建速度
```

## 三、依赖排除与替换

```kotlin
dependencies {
    // 排除传递依赖
    implementation("com.github.bumptech.glide:glide:4.16.0") {
        exclude(group = "com.android.support")
        exclude(module = "support-fragment")
    }

    // 强制指定版本
    implementation("androidx.appcompat:appcompat:1.6.1") {
        force = true
    }

    // 禁止依赖传递
    implementation("com.example:lib:1.0") {
        isTransitive = false
    }
}
```

## 四、依赖约束

```kotlin
// 在 build.gradle.kts 中统一约束版本
dependencies {
    constraints {
        implementation("androidx.core:core-ktx:1.12.0") {
            because("需要 Android 14 支持的特性")
        }
        implementation("com.google.android.material:material:1.11.0") {
            because("需要 Material 3 新组件")
        }
    }
}
```

## 五、依赖版本统一管理

### 方式一：gradle.properties

```properties
# gradle.properties
appcompatVersion=1.6.1
coreKtxVersion=1.12.0
materialVersion=1.11.0
retrofitVersion=2.9.0
okhttpVersion=4.12.0
```

```kotlin
// build.gradle.kts
val appcompatVersion: String by project
val coreKtxVersion: String by project
val materialVersion: String by project

dependencies {
    implementation("androidx.appcompat:appcompat:$appcompatVersion")
    implementation("androidx.core:core-ktx:$coreKtxVersion")
    implementation("com.google.android.material:material:$materialVersion")
}
```

### 方式二：extra 扩展属性

```kotlin
// build.gradle.kts
extra.apply {
    set("compileSdk", 34)
    set("minSdk", 26)
    set("targetSdk", 34)
    set("composeBom", "2024.02.00")
}

// 在子模块中使用
android {
    compileSdk = rootProject.extra["compileSdk"] as Int
    defaultConfig {
        minSdk = rootProject.extra["minSdk"] as Int
        targetSdk = rootProject.extra["targetSdk"] as Int
    }
}
```

### 方式三：Version Catalog（推荐）

参见 [06-version-catalog.md](./06-version-catalog.md)。

## 六、自定义 Task

```kotlin
// 注册任务
tasks.register("greet") {
    doLast {
        println("Hello from Gradle!")
    }
}

// 依赖其他任务
tasks.register("buildAndGreet") {
    dependsOn("build")
    doLast {
        println("Build completed!")
    }
}

// 自定义任务类
abstract class PrintVersionTask : DefaultTask() {
    @get:Input
    abstract val version: Property<String>

    @TaskAction
    fun print() {
        println("Version: ${version.get()}")
    }
}

tasks.register<PrintVersionTask>("printVersion") {
    version.set("1.0.0")
}
```

## 七、自定义 Plugin

```kotlin
// buildSrc/src/main/kotlin/MyPlugin.kt
class MyPlugin : Plugin<Project> {
    override fun apply(project: Project) {
        project.tasks.register("myTask") {
            doLast {
                println("My custom plugin is running!")
            }
        }
    }
}
```

```kotlin
// 应用插件
plugins {
    id("my-plugin")
}
// 或
apply<MyPlugin>()
```
