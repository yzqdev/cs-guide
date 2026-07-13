# 镜像与仓库配置

## 一、Gradle 仓库概述

Gradle 从仓库（Repository）中下载依赖。默认使用 Maven Central 和 Google 的 Maven 仓库，但在国内网络环境下速度较慢，需要配置国内镜像。

### 推荐镜像源

| 镜像 | 地址 | 说明 |
|------|------|------|
| 阿里云 | `https://maven.aliyun.com/repository/public/` | 稳定，推荐 |
| 腾讯云 | `https://mirrors.tencent.com/nexus/repository/maven-public/` | 速度快 |
| 华为云 | `https://repo.huaweicloud.com/repository/maven/` | 稳定 |
| 科大源 | `https://mirrors.ustc.edu.cn/` | 教育网优先 |

## 二、单项目配置（推荐）

### 在 settings.gradle.kts 中配置

```kotlin
// settings.gradle.kts
pluginManagement {
    repositories {
        maven { url = uri("https://maven.aliyun.com/repository/public") }
        google { url = uri("https://maven.aliyun.com/repository/google") }
        gradlePluginPortal()
        mavenCentral()
        maven { url = uri("https://jitpack.io") }
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        maven { url = uri("https://maven.aliyun.com/repository/public") }
        google { url = uri("https://maven.aliyun.com/repository/google") }
        mavenCentral()
        maven { url = uri("https://jitpack.io") }
    }
}
```

### Groovy DSL 版本

```groovy
// settings.gradle
pluginManagement {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/public' }
        google { url 'https://maven.aliyun.com/repository/google' }
        gradlePluginPortal()
        mavenCentral()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        maven { url 'https://maven.aliyun.com/repository/public' }
        google { url 'https://maven.aliyun.com/repository/google' }
        mavenCentral()
    }
}
```

## 三、全局镜像源配置（推荐）

在 `~/.gradle/init.d/mirror.init.gradle.kts` 中配置全局镜像，所有项目自动生效：

```kotlin
// ~/.gradle/init.d/mirror.init.gradle.kts

val urlMappings = mapOf(
    "https://repo.maven.apache.org/maven2" to "https://maven.aliyun.com/repository/public/",
    "https://dl.google.com/dl/android/maven2" to "https://maven.aliyun.com/repository/google/",
    "https://plugins.gradle.org/m2" to "https://maven.aliyun.com/repository/gradle-plugin/",
    "https://jcenter.bintray.com/" to "https://maven.aliyun.com/repository/public/"
)

fun RepositoryHandler.enableMirror() {
    all {
        if (this is MavenArtifactRepository) {
            val originalUrl = this.url.toString().removeSuffix("/")
            urlMappings[originalUrl]?.let { mirrorUrl ->
                logger.lifecycle("仓库 $originalUrl 已镜像到 $mirrorUrl")
                this.setUrl(mirrorUrl)
            }
        }
    }
}

gradle.beforeSettings {
    pluginManagement.repositories.enableMirror()
    dependencyResolutionManagement.repositories.enableMirror()
}

gradle.allprojects {
    buildscript { repositories.enableMirror() }
    repositories.enableMirror()
}
```

### Groovy 版本

```groovy
// ~/.gradle/init.d/mirror.init.gradle

def urlMappings = [
    'https://repo.maven.apache.org/maven2': 'https://maven.aliyun.com/repository/public/',
    'https://dl.google.com/dl/android/maven2': 'https://maven.aliyun.com/repository/google/'
]

allprojects {
    buildscript {
        repositories {
            all { ArtifactRepository repo ->
                if (repo instanceof MavenArtifactRepository) {
                    def url = repo.url.toString()
                    if (urlMappings.containsKey(url)) {
                        println "镜像：${url} → ${urlMappings[url]}"
                        remove repo
                    }
                }
            }
            maven { url 'https://maven.aliyun.com/repository/public' }
            google { url 'https://maven.aliyun.com/repository/google' }
        }
    }
    repositories {
        all { ArtifactRepository repo ->
            if (repo instanceof MavenArtifactRepository) {
                def url = repo.url.toString()
                if (urlMappings.containsKey(url)) {
                    println "镜像：${url} → ${urlMappings[url]}"
                    remove repo
                }
            }
        }
        maven { url 'https://maven.aliyun.com/repository/public' }
        google { url 'https://maven.aliyun.com/repository/google' }
    }
}
```

## 四、Gradle Wrapper 下载加速

### 修改 distributionUrl

```properties
# gradle/wrapper/gradle-wrapper.properties
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.7-all.zip
```

### 手动下载放置

```bash
# 下载 gradle-8.7-all.zip 后放到 Wrapper 缓存目录
# Windows: %USERPROFILE%\.gradle\wrapper\dists\gradle-8.7-all\xxxx\
# macOS/Linux: ~/.gradle/wrapper/dists/gradle-8.7-all/xxxx/
```

### 使用代理下载

```properties
# ~/.gradle/gradle.properties
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=7890
systemProp.jdk.http.auth.tunneling.disabledSchemes=
```

## 五、JitPack 仓库

```kotlin
// settings.gradle.kts
dependencyResolutionManagement {
    repositories {
        maven { url = uri("https://jitpack.io") }
    }
}
```

```groovy
// settings.gradle
dependencyResolutionManagement {
    repositories {
        maven { url 'https://jitpack.io' }
    }
}
```

## 六、本地仓库

```kotlin
// 使用本地 Maven 仓库
repositories {
    mavenLocal()
}

// 使用自定义目录
repositories {
    flatDir {
        dirs("libs")
    }
}
```
