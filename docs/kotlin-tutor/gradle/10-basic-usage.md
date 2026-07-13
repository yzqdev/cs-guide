# Gradle 基础用法

## 一、构建脚本基础

### 1. Project 与 Task

Gradle 构建的核心模型：**Project**（项目）包含多个 **Task**（任务），每个 Task 执行一个具体的构建操作。

```kotlin
// 注册一个简单的 Task
tasks.register("hello") {
    doLast {
        println("Hello, Gradle!")
    }
}

// 运行：./gradlew hello
```

### 2. Task 生命周期

每个 Task 都有完整的生命周期：

```kotlin
tasks.register("lifecycle") {
    // 配置阶段执行（始终执行）
    println("配置阶段：定义 Task")

    doFirst {   // 执行阶段，最先执行
        println("执行阶段：doFirst")
    }

    doLast {    // 执行阶段，最后执行（等价于 <<）
        println("执行阶段：doLast")
    }
}
```

### 3. Task 依赖

```kotlin
tasks.register("taskA") {
    doLast { println("Task A") }
}

tasks.register("taskB") {
    dependsOn("taskA")  // taskB 依赖 taskA
    doLast { println("Task B") }
}

// 运行 ./gradlew taskB → 输出 Task A, Task B

// 多重依赖
tasks.register("taskC") {
    dependsOn("taskA", "taskB")
    doLast { println("Task C") }
}

// 必须执行的任务
tasks.register("mustRunAfter") {
    mustRunAfter("taskA")  // 必须排在 taskA 之后
}
```

### 4. Task 类型

```kotlin
// Copy —— 复制文件
tasks.register<Copy>("copyFiles") {
    from("src/files")
    into("build/files")
    include("*.txt")       // 只复制 txt 文件
    exclude("**/temp*")    // 排除临时文件
}

// Delete —— 删除文件
tasks.register<Delete>("cleanup") {
    delete("build/temp", "build/cache")
}

// Zip —— 打包
tasks.register<Zip>("archive") {
    from("build/output")
    archiveFileName.set("output.zip")
    destinationDirectory.set(layout.buildDirectory.dir("dist"))
}

// Exec —— 执行命令行
tasks.register<Exec>("runScript") {
    commandLine("bash", "-c", "echo hello > output.txt")
}

// JavaExec —— 运行 Java 主类
tasks.register<JavaExec>("runMain") {
    classpath = sourceSets.main.get().runtimeClasspath
    mainClass.set("com.example.MainKt")
}

// CopySpec —— 文件选择语法
tasks.register<Copy>("selectiveCopy") {
    from("src") {
        include("**/*.kt", "**/*.java")
        exclude("**/test/**")
    }
    into("build/src")
}
```

## 二、文件操作

### 1. 文件与路径

```kotlin
// 文件对象
val myFile = file("config.properties")
val myDir = file("src/main")

// 文件集合
val allFiles = fileTree("src") {
    include("**/*.kt")
    exclude("**/test/**")
}

// 遍历文件
allFiles.forEach { file ->
    println(file.name)
}

// 读取文件内容
val content = file("version.txt").readText()

// 写入文件
file("output.txt").writeText("Hello Gradle")

// 判断文件
if (file("config.json").exists()) {
    println("配置文件存在")
}

// 目录操作
mkdir(layout.buildDirectory.dir("dist"))
delete(layout.buildDirectory.dir("temp"))
```

### 2. 文件集合操作

```kotlin
// 创建文件集合
val files = files("file1.txt", "file2.txt", "dir/file3.txt")

// 文件树
val tree = fileTree("src/main") {
    include("**/*.kt")
    exclude("**/*Test*")
}

// 过滤
val ktFiles = tree.filter { f -> f.name.endsWith(".kt") }

// 转换为集合
val fileList = tree.toList()

// 复制文件集
tasks.register<Copy>("copySources") {
    from(fileTree("src") { include("**/*.kt") })
    into(layout.buildDirectory.dir("sources"))
}
```

## 三、日志输出

```kotlin
// 不同级别的日志
logger.error("错误信息")
logger.warn("警告信息")
logger.quiet("重要信息")
logger.info("一般信息")
logger.debug("调试信息")
logger.lifecycle("生命周期信息")  // 默认级别

// 格式化输出
logger.lifecycle("版本：{}", project.version)
logger.lifecycle("项目名称：$name，路径：$projectDir")
```

## 四、外部命令执行

```kotlin
// 执行系统命令
tasks.register<Exec>("gitStatus") {
    workingDir = file(".")   // 工作目录
    commandLine("git", "status")
}

// 获取命令输出
tasks.register("gitInfo") {
    doLast {
        val output = providers.exec {
            commandLine("git", "rev-parse", "--short", "HEAD")
        }.standardOutput.asText.get().trim()
        println("Git Commit: $output")
    }
}
```

## 五、文件监听与增量构建

```kotlin
// 增量构建 —— 声明输入输出
abstract class IncrementalTask : DefaultTask() {
    @get:InputFile
    abstract val inputFile: RegularFileProperty

    @get:OutputFile
    abstract val outputFile: RegularFileProperty

    @TaskAction
    fun process() {
        val input = inputFile.get().asFile.readText()
        outputFile.get().asFile.writeText(input.uppercase())
    }
}

tasks.register<IncrementalTask>("processFile") {
    inputFile.set(file("input.txt"))
    outputFile.set(layout.buildDirectory.file("output.txt"))
}
// 只有当 input.txt 变更或 output.txt 不存在时才执行
```

### Input/Output 注解

| 注解 | 说明 |
|------|------|
| `@Input` | 输入参数 |
| `@InputFile` | 输入文件 |
| `@InputDirectory` | 输入目录 |
| `@InputFiles` | 输入文件集合 |
| `@OutputFile` | 输出文件 |
| `@OutputDirectory` | 输出目录 |
| `@OutputFiles` | 输出文件集合 |
| `@Internal` | 不参与增量检查 |
| `@Optional` | 可选输入 |

## 六、BuildCache 集成

```kotlin
// 读取 BuildConfig 中的自定义字段
val baseUrl = BuildConfig.API_BASE_URL
val isDebug = BuildConfig.IS_DEBUG
```

```kotlin
// 在 gradle.properties 中配置
// org.gradle.caching=true
// org.gradle.caching.http.url=https://build-cache.example.com/cache/
```

## 七、多模块配置

```kotlin
// settings.gradle.kts
rootProject.name = "MultiModuleProject"
include(":app", ":core", ":common", ":feature:login", ":feature:home")

// 批量配置模块
rootProject.children.forEach { module ->
    module.buildFileName = "${module.name}.gradle.kts"
}
```

```kotlin
// 在 build.gradle.kts 中统一配置子模块
subprojects {
    apply(plugin = "org.jetbrains.kotlin.jvm")

    dependencies {
        implementation(kotlin("stdlib"))
    }

    tasks.withType<Test>().configureEach {
        useJUnitPlatform()
    }
}

// 仅配置 app 模块
project(":app") {
    apply(plugin = "com.android.application")
}
```

## 八、Build Scan 集成

```kotlin
// build.gradle.kts —— 启用 Build Scan
plugins {
    id("com.gradle.build-scan") version "3.16.1"
}

buildScan {
    termsOfServiceUrl = "https://gradle.com/terms-of-service"
    termsOfServiceAgree = "yes"
    publishAlways()
}
```

```bash
# 单次启用 Build Scan
./gradlew build --scan
```

## 九、Gradle 配置常见模式

### 从环境变量读取配置

```kotlin
val storePassword = System.getenv("STORE_PASSWORD") ?: ""
val apiKey = providers.environmentVariable("API_KEY").orElse("default")
```
