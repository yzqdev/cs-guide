# Gradle 简介与基础

## 一、什么是 Gradle

Gradle 是一个开源的自动化构建工具，基于 Groovy 或 Kotlin DSL 编写构建脚本。它是 Android 的官方构建系统，也广泛用于 Java/Kotlin 多平台项目。

### 核心特点

- **声明式构建**：通过 DSL 描述项目结构和依赖
- **增量构建**：只重新编译有变更的部分，大幅提升构建速度
- **依赖管理**：自动解析和管理项目依赖
- **多项目支持**：轻松管理大型多模块项目
- **灵活的构建生命周期**：可自定义 Task 和 Plugin

## 二、安装 Gradle

### 方式一：通过 SDKMAN（推荐）

```bash
# 安装 SDKMAN
curl -s "https://get.sdkman.io" | bash
# 安装 Gradle
sdk install gradle 8.7

# 验证
gradle --version
```

### 方式二：通过 Homebrew（macOS）

```bash
brew install gradle
```

### 方式三：使用 Gradle Wrapper（无需安装）

每个 Gradle 项目都包含 `gradlew`/`gradlew.bat` 脚本，会自动下载并使用指定版本：

```bash
# 生成 Wrapper
gradle wrapper --gradle-version 8.7

# 使用 Wrapper 构建（推荐）
./gradlew build
```

## 三、Gradle Wrapper

Wrapper 是 Gradle 推荐的项目构建方式，它确保所有开发者使用相同的 Gradle 版本。

### Wrapper 文件结构

```text
my-project/
├── gradlew              # Unix 可执行脚本
├── gradlew.bat          # Windows 可执行脚本
├── gradle/
│   └── wrapper/
│       ├── gradle-wrapper.jar      # Wrapper JAR
│       └── gradle-wrapper.properties  # 版本配置
└── build.gradle.kts     # 构建脚本
```

### 配置 Wrapper 版本

```properties
# gradle/wrapper/gradle-wrapper.properties
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-8.7-all.zip
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
```

### Wrapper 常用命令

```bash
# 更新 Wrapper 版本
./gradlew wrapper --gradle-version 8.7

# 使用本地已下载的 Gradle（跳过下载）
./gradlew wrapper --gradle-version 8.7 --distribution-type all

# 构建项目
./gradlew build

# 清理构建产物
./gradlew clean
```

## 四、项目结构

```text
project/
├── app/                          # 应用模块
│   ├── build.gradle.kts          # 模块构建脚本
│   └── src/                      # 源代码
├── library/                      # 库模块
│   ├── build.gradle.kts
│   └── src/
├── build.gradle.kts              # 根构建脚本
├── settings.gradle.kts           # 项目设置
├── gradle.properties             # 全局属性
├── gradle/
│   └── wrapper/
│       └── gradle-wrapper.properties
├── gradlew                       # Unix Wrapper
├── gradlew.bat                   # Windows Wrapper
└── local.properties              # 本地属性（不提交到 Git）
```

## 五、settings.gradle.kts

```kotlin
// settings.gradle.kts —— 项目设置
rootProject.name = "MyApp"

// 包含模块
include(":app")
include(":library")
include(":core")

// 模块路径重映射
project(":core").projectDir = file("../core-library")

// 依赖版本管理
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
```

## 六、build.gradle.kts

### 根构建脚本

```kotlin
// build.gradle.kts —— 根构建脚本
plugins {
    id("com.android.application") version "8.2.2" apply false
    id("com.android.library") version "8.2.2" apply false
    id("org.jetbrains.kotlin.android") version "1.9.22" apply false
    id("org.jetbrains.kotlin.jvm") version "1.9.22" apply false
}
```

### 模块构建脚本

```kotlin
// app/build.gradle.kts —— 模块构建脚本
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
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
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
    implementation("com.google.android.material:material:1.11.0")
    testImplementation("junit:junit:4.13.2")
}
```

## 七、Gradle 构建生命周期

```text
初始化阶段 → 配置阶段 → 执行阶段
```

| 阶段 | 说明 |
|------|------|
| **初始化** | 解析 `settings.gradle.kts`，确定哪些模块参与构建 |
| **配置** | 执行所有模块的 `build.gradle.kts`，创建 Task 对象图 |
| **执行** | 按依赖顺序执行指定的 Task |

### Hook 点

```kotlin
// 在配置阶段前执行
gradle.beforeSettings {
    println("初始化：${this}")
}

// 每个项目配置前
gradle.beforeProject {
    println("开始配置：${name}")
}

// 每个项目配置后
gradle.afterProject {
    println("配置完成：${name}")
}

// 构建完成
gradle.buildFinished {
    println("构建完成")
}
```

## 八、Project 与 Task

### Task 基本概念

Task 是 Gradle 的最小执行单元，每个 Task 执行一个具体的操作（如编译、打包、测试）。

```kotlin
// 注册一个简单的 Task
tasks.register("hello") {
    doLast {
        println("Hello, Gradle!")
    }
}

// 执行
// ./gradlew hello
```

### 内置 Task

```bash
# 查看所有 Task
./gradlew tasks

# 编译
./gradlew build

# 清理
./gradlew clean

# 运行测试
./gradlew test

# 检查依赖
./gradlew :app:dependencies
```

## 九、gradle.properties

```properties
# 项目全局属性
# JVM 参数
org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8

# 并行构建
org.gradle.parallel=true

# 构建缓存
org.gradle.caching=true

# 配置缓存（Gradle 7.0+）
org.gradle.configuration-cache=true

# 自定义版本号
appVersionName=1.0.0
appVersionCode=1
compileSdk=34
minSdk=26
targetSdk=34
```

## 十、常见命令速查

```bash
# 构建
./gradlew build                   # 完整构建
./gradlew assemble                # 仅编译打包
./gradlew assembleDebug           # Debug 构建
./gradlew assembleRelease         # Release 构建

# 清理
./gradlew clean                   # 清理构建产物

# 测试
./gradlew test                    # 运行单元测试
./gradlew lint                    # 代码检查

# 依赖
./gradlew :app:dependencies       # 查看依赖树
./gradlew :app:buildEnvironment   # 查看构建环境

# 性能
./gradlew build --scan             # 生成构建扫描报告
./gradlew build --parallel         # 并行构建
./gradlew build --build-cache      # 启用构建缓存
```
