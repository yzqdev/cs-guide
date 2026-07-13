# Gradle 插件编写

## 一、插件简介

Gradle 插件封装了可重用的构建逻辑，可以在不同项目间共享。插件可以添加 Task、扩展属性、配置依赖等。

### 插件类型

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| **脚本插件** | 通过 `apply(from:)` 引入的 `.gradle.kts` 文件 | 简单逻辑、项目内复用 |
| **buildSrc 插件** | 写在 `buildSrc/src/main/kotlin` 中 | 单项目多模块复用 |
| **复合构建** | 通过 `includeBuild` 引入的外部项目 | 多项目共享 |
| **预编译脚本插件** | `.gradle.kts` 文件放在 `buildSrc/src/main/kotlin` | 模块化共享 |
| **独立插件** | 单独发布到仓库的插件 | 跨项目、开源共享 |

## 二、脚本插件

最简单的插件形式——一个可被 apply 的 Gradle 脚本：

```kotlin
// build-logic/version.gradle.kts —— 脚本插件
ext {
    set("appVersion", "1.0.0")
    set("appVersionCode", 1)
}

tasks.register("printVersion") {
    doLast {
        println("Version: ${rootProject.extra["appVersion"]}")
    }
}
```

```kotlin
// build.gradle.kts —— 引用脚本插件
apply(from = "build-logic/version.gradle.kts")

// 现在可以使用插件定义的属性和 Task
tasks.named("printVersion") {
    doLast {
        println("Done")
    }
}
```

## 三、buildSrc 插件

### 1. 创建 buildSrc 目录

```text
project-root/
├── buildSrc/
│   ├── build.gradle.kts
│   └── src/main/kotlin/
│       └── com/example/
│           ├── GreetingPlugin.kt
│           └── MyExtension.kt
├── build.gradle.kts
└── settings.gradle.kts
```

### 2. buildSrc/build.gradle.kts

```kotlin
// buildSrc/build.gradle.kts
plugins {
    `kotlin-dsl`  // 添加 Kotlin DSL 支持
}

repositories {
    mavenCentral()
    google()
}

dependencies {
    // 可以添加 Gradle API 之外的依赖
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
}
```

### 3. 编写插件类

```kotlin
// buildSrc/src/main/kotlin/com/example/GreetingPlugin.kt
package com.example

import org.gradle.api.Plugin
import org.gradle.api.Project

class GreetingPlugin : Plugin<Project> {
    override fun apply(project: Project) {
        // 创建 Extension
        val extension = project.extensions.create("greeting", GreetingExtension::class.java)

        // 注册 Task
        project.tasks.register("greet") {
            doLast {
                val message = extension.message.get()
                val name = extension.name.get()
                println("$message, $name!")
            }
        }
    }
}

// Extension —— 插件的可配置属性
abstract class GreetingExtension {
    abstract val message: Property<String>
    abstract val name: Property<String>
}
```

### 4. 注册插件（自动发现）

Gradle 会自动发现 `buildSrc/src/main/kotlin` 下的插件类，直接在项目中使用：

```kotlin
// build.gradle.kts —— 使用 buildSrc 插件
plugins {
    id("com.example.greeting")  // 类名自动映射
}

greeting {
    message = "Hello"
    name = "Gradle"
}

// 运行：./gradlew greet
// 输出：Hello, Gradle!
```

### 5. 使用 `gradlePlugin` 块注册

```kotlin
// buildSrc/build.gradle.kts —— 显式注册插件
gradlePlugin {
    plugins {
        register("greeting") {
            id = "com.example.greeting"
            implementationClass = "com.example.GreetingPlugin"
        }
    }
}
```

## 四、预编译脚本插件

### 1. 创建 .gradle.kts 文件

在 `buildSrc/src/main/kotlin` 中创建 `.gradle.kts` 文件：

```kotlin
// buildSrc/src/main/kotlin/android-common.gradle.kts
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    compileSdk = 34
    defaultConfig {
        minSdk = 26
        targetSdk = 34
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

### 2. 在其他模块中使用

```kotlin
// app/build.gradle.kts
plugins {
    id("android-common")  // 文件名（不含后缀）
}

android {
    namespace = "com.example.myapp"
}
```

## 五、独立发布插件

### 1. 创建独立项目

```kotlin
// my-plugin/build.gradle.kts
plugins {
    `java-gradle-plugin`   // Gradle 插件开发
    `maven-publish`        // 发布到仓库
    `kotlin-dsl`           // Kotlin DSL 支持
}

group = "com.example"
version = "1.0.0"

gradlePlugin {
    plugins {
        register("myPlugin") {
            id = "com.example.my-plugin"
            implementationClass = "com.example.MyPlugin"
        }
    }
}

publishing {
    publications {
        create<MavenPublication>("pluginMaven") {
            from(components["java"])
        }
    }
}
```

### 2. 编写插件

```kotlin
// my-plugin/src/main/kotlin/com/example/MyPlugin.kt
package com.example

import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.api.tasks.Copy
import org.gradle.api.tasks.Delete

class MyPlugin : Plugin<Project> {
    override fun apply(project: Project) {
        // 添加 Extension 配置
        val extension = project.extensions.create("myConfig", MyPluginExtension::class.java)

        // 创建清理 Task
        project.tasks.register<Delete>("myClean") {
            delete("build/temp")
        }

        // 创建复制 Task
        project.tasks.register<Copy>("myBuild") {
            from("src/public")
            into("build/output")
            include("**/*")
        }

        // 配置完成后执行
        project.afterEvaluate {
            if (extension.enableLogging.get()) {
                project.logger.lifecycle("MyPlugin 已启用，版本：${extension.version.get()}")
            }
        }
    }
}

abstract class MyPluginExtension {
    abstract val version: Property<String>
    abstract val enableLogging: Property<Boolean>
}
```

### 3. 发布到本地

```bash
./gradlew :my-plugin:publishToMavenLocal
```

### 4. 在其他项目中使用

```kotlin
// settings.gradle.kts —— 引用本地插件
pluginManagement {
    repositories {
        mavenLocal()
        gradlePluginPortal()
    }
}
```

```kotlin
// build.gradle.kts
plugins {
    id("com.example.my-plugin") version "1.0.0"
}

myConfig {
    version = "2.0.0"
    enableLogging = true
}
```

## 六、完整插件示例：版本管理插件

```kotlin
// buildSrc/src/main/kotlin/com/example/version/VersionPlugin.kt
package com.example.version

import org.gradle.api.Plugin
import org.gradle.api.Project
import java.io.File
import java.util.Properties

class VersionPlugin : Plugin<Project> {
    override fun apply(project: Project) {
        val extension = project.extensions.create("versionConfig", VersionExtension::class.java)

        // 读取版本文件
        project.tasks.register("loadVersion") {
            doLast {
                val props = Properties()
                val file = File(project.projectDir, extension.versionFile.get())
                if (file.exists()) {
                    file.inputStream().use { props.load(it) }
                    println("加载版本：${props["versionName"]} (${props["versionCode"]})")
                    project.extra["loadedVersionName"] = props["versionName"]
                    project.extra["loadedVersionCode"] = props["versionCode"]
                }
            }
        }

        // 自动版本号递增
        project.tasks.register("bumpVersion") {
            doLast {
                val props = Properties()
                val file = File(project.projectDir, extension.versionFile.get())
                if (file.exists()) {
                    file.inputStream().use { props.load(it) }
                    val code = (props["versionCode"] as String).toInt() + 1
                    props["versionCode"] = code.toString()
                    file.outputStream().use { props.store(it, "Auto increment by bumpVersion task") }
                    println("版本号已递增到：${props["versionName"]} ($code)")
                }
            }
        }
    }
}

abstract class VersionExtension {
    abstract val versionFile: Property<String>
    init {
        versionFile.convention("version.properties")
    }
}
```

使用插件：

```kotlin
// build.gradle.kts
plugins {
    id("com.example.version")
}

versionConfig {
    versionFile = "version.properties"
}

tasks.register("printInfo") {
    dependsOn("loadVersion")
    doLast {
        println("当前版本名：${rootProject.extra["loadedVersionName"]}")
        println("当前版本号：${rootProject.extra["loadedVersionCode"]}")
    }
}
```

## 七、插件测试

```kotlin
// buildSrc/src/test/kotlin/com/example/GreetingPluginTest.kt
import org.gradle.testfixtures.ProjectBuilder
import kotlin.test.Test
import kotlin.test.assertNotNull

class GreetingPluginTest {
    @Test
    fun `plugin registers task`() {
        // 创建测试项目
        val project = ProjectBuilder.builder().build()

        // 应用插件
        project.pluginManager.apply("com.example.greeting")

        // 验证 Task 存在
        val task = project.tasks.findByName("greet")
        assertNotNull(task, "greet task 应被注册")
    }
}
```

## 八、插件最佳实践

### 1. 使用延迟配置

```kotlin
class BestPracticePlugin : Plugin<Project> {
    override fun apply(project: Project) {
        // 使用 lazy 避免配置时执行耗时操作
        val extension = project.extensions.create("practice", PracticeExtension::class.java)

        // 注册 Task 时不要立即执行
        project.tasks.register("doWork") {
            // 使用 provider 延迟获取值
            val message = extension.message
            doLast {
                println("消息：${message.get()}")
            }
        }
    }
}
```

### 2. 避免在配置阶段执行耗时操作

```kotlin
// ❌ 错误：配置阶段执行耗时操作
tasks.register("badTask") {
    // 这里会在配置阶段执行
    val files = fileTree("src").toList()
    println("找到了 ${files.size} 个文件")
}

// ✅ 正确：执行阶段再执行
tasks.register("goodTask") {
    doLast {
        val files = fileTree("src").toList()
        println("找到了 ${files.size} 个文件")
    }
}
```

### 3. 使用 Convention 提供默认值

```kotlin
abstract class MyExtension {
    abstract val outputDir: DirectoryProperty

    init {
        // 使用 convention 设置默认值
        outputDir.convention(layout.buildDirectory.dir("my-output"))
    }
}
```

### 4. 插件命名规范

```kotlin
// 插件 ID 应使用反向域名格式
// ✅ com.example.my-plugin
// ❌ my-plugin

// Extension 命名应使用驼峰
// ✅ myConfig { }
// ❌ my_config { }
```

## 九、插件常用场景

| 场景 | 实现方式 |
|------|---------|
| 统一版本管理 | Version Catalog + 自定义插件 |
| 代码生成 | 通过 Task 生成源文件 |
| 代码检查 | 集成 Detekt、ktlint |
| 自动发布 | 集成 Maven Publishing |
| 构建报告 | 收集构建统计信息 |
| 环境配置 | 根据环境注入不同配置 |
