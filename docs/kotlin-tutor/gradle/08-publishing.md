# 打包与发布

## 一、JAR 打包

### 1. 标准 JAR

```kotlin
// build.gradle.kts
plugins {
    java
    `java-library`
}

tasks.jar {
    manifest {
        attributes(
            "Manifest-Version" to "1.0",
            "Main-Class" to "com.example.MainKt",
            "Implementation-Title" to "MyApp",
            "Implementation-Version" to project.version,
        )
    }
}
```

### 2. Fat JAR（包含依赖）

```kotlin
// build.gradle.kts —— 将所有依赖打包进 JAR
plugins {
    java
    kotlin("jvm")
}

tasks.jar {
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE

    // 将依赖的 class 文件解压并合并到 JAR
    from(configurations.runtimeClasspath.get().map {
        if (it.isDirectory) it else zipTree(it)
    })

    manifest {
        attributes("Main-Class" to "com.example.MainKt")
    }
}
```

### 3. JAR + lib 分离

```kotlin
// build.gradle.kts —— JAR 与依赖库分离
plugins {
    java
    kotlin("jvm")
}

// 清理 lib 目录
tasks.register<Delete>("clearLib") {
    delete(layout.buildDirectory.dir("libs/lib"))
}

// 拷贝依赖到 lib 目录
tasks.register<Copy>("copyLib") {
    from(configurations.runtimeClasspath)
    into(layout.buildDirectory.dir("libs/lib"))
}

tasks.jar {
    dependsOn("clearLib", "copyLib")
    exclude("**/*.jar")  // 排除所有 JAR 文件

    manifest {
        attributes(
            "Manifest-Version" to "1.0",
            "Main-Class" to "com.example.MainKt",
            "Class-Path" to configurations.runtimeClasspath.get()
                .files.joinToString(" ") { "lib/${it.name}" },
        )
    }
}
```

## 二、Spring Boot 打包

```groovy
// build.gradle
plugins {
    id("org.springframework.boot") version "3.2.0"
    id("io.spring.dependency-management") version "1.1.4"
}

// 打包分离依赖
bootJar {
    excludes = ["*.jar", "*.yml"]   // 排除 JAR 和配置文件
    dependsOn copyJar, copyResources // 依赖复制任务

    manifest {
        attributes(
            "Manifest-Version" to "1.0",
            "Class-Path" to "config/ " + configurations.runtimeClasspath
                .files.collect { "lib/$it.name" }.join(" "),
        )
    }
}

// 复制依赖
task copyJar(type: Copy) {
    delete "$buildDir/libs/lib"
    from configurations.runtimeClasspath
    into "$buildDir/libs/lib"
}

// 复制配置
task copyResources(type: Copy) {
    delete "$buildDir/libs/config"
    from "src/main/resources"
    into "$buildDir/libs/config"
    include "*.yml"
}
```

## 三、Android AAR 打包

```kotlin
// library/build.gradle.kts —— Android 库模块
plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.example.mylibrary"
    compileSdk = 34

    defaultConfig {
        minSdk = 26
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

### 发布到 Maven 本地

```kotlin
// library/build.gradle.kts —— 发布到本地 Maven
plugins {
    id("maven-publish")
}

afterEvaluate {
    publishing {
        publications {
            create<MavenPublication>("release") {
                from(components["release"])
                groupId = "com.example"
                artifactId = "mylibrary"
                version = "1.0.0"
            }
        }
    }
}
```

```bash
# 发布到本地 Maven 仓库
./gradlew :library:publishReleasePublicationToLocalRepository
```

## 四、Compose Desktop 打包

```kotlin
// compose-desktop/build.gradle.kts
plugins {
    kotlin("jvm")
    id("org.jetbrains.compose") version "1.6.1"
}

compose.desktop {
    application {
        mainClass = "MainKt"

        nativeDistributions {
            targetFormats(
                org.jetbrains.compose.desktop.application.dsl.TargetFormat.Dmg,
                org.jetbrains.compose.desktop.application.dsl.TargetFormat.Msi,
                org.jetbrains.compose.desktop.application.dsl.TargetFormat.Exe,
            )
            packageName = "MyApp"
            packageVersion = "1.0.0"
            description = "My Desktop Application"
            vendor = "Example Inc."

            windows {
                menuGroup = "MyApp"
                upgradeUuid = "your-uuid-here"
                // 配置 NSIS 安装程序
                installerOptions = listOf(
                    "/DESTINATION=$PROGRAMFILES64\\MyApp",
                    "/LANG=2052"  // 中文
                )
            }

            macOS {
                bundleID = "com.example.myapp"
            }

            linux {
                packageName = "myapp"
            }
        }
    }
}
```

```bash
# 打包命令
./gradlew packageMsi                  # 打包 MSI 安装程序（Windows）
./gradlew packageExe                  # 打包 EXE 安装程序（Windows）
./gradlew packageDmg                  # 打包 DMG（macOS）
./gradlew packageDeb                  # 打包 DEB（Linux）
./gradlew packageUberJarForCurrentOS  # 打包可执行 JAR
./gradlew createDistributable         # 打包绿色版（无需安装）
```

### 手动解决 Wix 下载慢

```bash
# 手动下载 wix311-binaries.zip
# 放到以下目录，重新运行打包命令
# Windows: %LocalAppData%/tauri/WixTools/wix311.zip
```

## 五、发布到 Maven Central

```kotlin
// build.gradle.kts —— 发布到 Maven Central
plugins {
    `java-library`
    `maven-publish`
    signing
}

java {
    withJavadocJar()
    withSourcesJar()
}

publishing {
    publications {
        create<MavenPublication>("release") {
            from(components["java"])
            groupId = "com.example"
            artifactId = "my-library"
            version = "1.0.0"

            pom {
                name.set("My Library")
                description.set("A useful library")
                url.set("https://github.com/example/my-library")
                licenses {
                    license {
                        name.set("Apache-2.0")
                        url.set("https://opensource.org/licenses/Apache-2.0")
                    }
                }
                developers {
                    developer {
                        id.set("your-id")
                        name.set("Your Name")
                        email.set("you@example.com")
                    }
                }
                scm {
                    connection.set("scm:git:github.com/example/my-library.git")
                }
            }
        }
    }
    repositories {
        maven {
            val releasesUrl = uri("https://s01.oss.sonatype.org/service/local/staging/deploy/maven2/")
            val snapshotsUrl = uri("https://s01.oss.sonatype.org/content/repositories/snapshots/")
            url = if (version.toString().endsWith("SNAPSHOT")) snapshotsUrl else releasesUrl
            credentials {
                username = System.getenv("OSSRH_USERNAME") ?: ""
                password = System.getenv("OSSRH_PASSWORD") ?: ""
            }
        }
    }
}
```
