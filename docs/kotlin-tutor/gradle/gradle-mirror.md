# gradle添加镜像源

 添加镜像源
参见阿里云的依赖教程
[https://maven.aliyun.com/mvn/guide](https://maven.aliyun.com/mvn/guide)

## 全局镜像源

## dependencyResolutionManagement(gradle7使用)

 在`.gradle`文件夹添加下面这个`<UserDir>/.gradle/init.d/init.gradle.kts`:

```kotlin
 val urlMappings1 = mapOf(
    "https://repo.maven.apache.org/maven2" to "https://maven.aliyun.com/repository/public/",
    "https://dl.google.com/dl/android/maven2" to "https://maven.aliyun.com/repository/google/",
    "https://plugins.gradle.org/m2" to "https://maven.aliyun.com/repository/gradle-plugin/"
)
val urlMappings = mapOf(
    "https://repo.maven.apache.org/maven2" to "https://mirrors.tencent.com/nexus/repository/maven-public/",
    "https://dl.google.com/dl/android/maven2" to "https://mirrors.tencent.com/nexus/repository/maven-public/",
    "https://plugins.gradle.org/m2" to "https://mirrors.tencent.com/nexus/repository/gradle-plugins/"
)

fun RepositoryHandler.enableMirror() {
    all {
        if (this is MavenArtifactRepository) {
            val originalUrl = this.url.toString().removeSuffix("/")
            urlMappings[originalUrl]?.let {
                logger.lifecycle("Repository[$url] is mirrored to $it")
                this.setUrl(it)
            }
        }
    }
}
gradle.beforeSettings {
   rootProject{
       println("当前gradle版本:"+gradle.gradleVersion)
   }
}
// init.gradle.kts
gradle.afterProject {
    val wrapperPropertiesFile = file("gradle/wrapper/gradle-wrapper.properties")
    if (wrapperPropertiesFile.exists()) {
        val properties = java.util.Properties()
        wrapperPropertiesFile.inputStream().use { properties.load(it) }

        // Modify the distributionUrl here
        val newDistributionUrl =
            "https://services.gradle.org/distributions/gradle-" + System.getenv("gradleVersion") + "-all.zip"

        val useGradle7 = this.extra.has("useGradle7")
        if (useGradle7  ) {
            properties["distributionUrl"] ="https://services.gradle.org/distributions/gradle-7.6.2-all.zip"
            println("change dist url=> " + newDistributionUrl)
            wrapperPropertiesFile.outputStream().use { properties.store(it, null) }
        }else{
            properties["distributionUrl"] = newDistributionUrl
            println("change dist url=> " + newDistributionUrl)
            wrapperPropertiesFile.outputStream().use { properties.store(it, null) }
        }

        // Save the modified properties back to the file

    }
}

gradle.allprojects {
    buildscript {
        repositories.enableMirror()
    }
    repositories.enableMirror()
}

gradle.beforeSettings {
    pluginManagement.repositories.enableMirror()
    dependencyResolutionManagement.repositories.enableMirror()
}

 
```

## 修改单个项目

需要在根路径的`setting.gradle`添加

```kotlin
pluginManagement {
    repositories {
        gradlePluginPortal()
        maven { url 'https://jitpack.io' }
        google()
        mavenCentral()
        
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
         maven { url 'https://jitpack.io' }
        google()
        mavenCentral()
    
    }
}

```

## 配置国内镜像(低于gradle7)

<https://doc.nju.edu.cn/books/35f4a/page/gradle>
第一种

```groovy

settingsEvaluated { settings ->
    settings.dependencyResolutionManagement {
        repositories {
            maven {
            url "https://maven.aliyun.com/repository/public"
        }
        google {
            url "https://maven.aliyun.com/repository/google"
        }
        }
    }
}
allprojects {
    repositories {
        maven {
            url "https://maven.aliyun.com/repository/public"
        }
        google {
            url "https://maven.aliyun.com/repository/google"
        }
    }

    buildscript {
        repositories {
            maven {
                url "https://maven.aliyun.com/repository/public"
            }
            google {
                url "https://maven.aliyun.com/repository/google"
            }
        }
    }
}

```

第二种

```groovy

def repoConfig = {
    all { ArtifactRepository repo ->
        if (repo instanceof MavenArtifactRepository) {
            def url = repo.url.toString()
            if (url.contains('maven.org')||url.contains("maven.apache.org") || url.startsWith('https://jcenter.bintray.com/')||url.contains('dl.google.com')) {
                println "gradle init: (${repo.name}: ${repo.url}) removed"
                println("(${repo.name}: ${repo.url})已被移除")
                remove repo
            }
        }
    }
    // maven { url 'http://mirrors.cloud.tencent.com/nexus/repository/maven-public/' }
    maven { url 'https://maven.aliyun.com/repository/central' }
    maven { url 'https://maven.aliyun.com/repository/jcenter' }
    maven { url 'https://maven.aliyun.com/repository/google' }
    maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
    maven{
        url "https://jitpack.io"
    }
}

allprojects {
    buildscript {
        repositories repoConfig
    }
    repositories repoConfig
}

```

或者

```groovy
gradle.projectsLoaded {
    rootProject.allprojects {
        buildscript {
            repositories {
                def JCENTER_URL = 'https://maven.aliyun.com/repository/public'
                def GOOGLE_URL = 'https://maven.aliyun.com/repository/google'
                def NEXUS_URL = 'https://maven.aliyun.com/repository/central'
                all { ArtifactRepository repo ->
                    if (repo instanceof MavenArtifactRepository) {
                        def url = repo.url.toString()
                        if (url.startsWith('https://jcenter.bintray.com/')) {
                            project.logger.lifecycle "Repository ${repo.url} replaced by $JCENTER_URL."
                            println("buildscript ${repo.url} replaced by $JCENTER_URL.")
                            remove repo
                        }
                        else if (url.startsWith('https://dl.google.com/dl/android/maven2/')) {
                            project.logger.lifecycle "Repository ${repo.url} replaced by $GOOGLE_URL."
                            println("buildscript ${repo.url} replaced by $GOOGLE_URL.")
                            remove repo
                        }
                        else if (url.startsWith('https://repo1.maven.org/maven2')) {
                            project.logger.lifecycle "Repository ${repo.url} replaced by $REPOSITORY_URL."
                            println("buildscript ${repo.url} replaced by $REPOSITORY_URL.")
                            remove repo
                        }
                    }
                }
                jcenter {
                    url JCENTER_URL
                }
                google {
                    url GOOGLE_URL
                }
                maven {
                    url NEXUS_URL
                }
            }
        }
        repositories {
            def JCENTER_URL = 'https://maven.aliyun.com/repository/public'
            def GOOGLE_URL = 'https://maven.aliyun.com/repository/google'
            def NEXUS_URL = 'https://maven.aliyun.com/repository/central'
            all { ArtifactRepository repo ->
                if (repo instanceof MavenArtifactRepository) {
                    def url = repo.url.toString()
                    if (url.startsWith('https://jcenter.bintray.com/')) {
                        project.logger.lifecycle "Repository ${repo.url} replaced by $JCENTER_URL."
                        println("buildscript ${repo.url} replaced by $JCENTER_URL.")
                        remove repo
                    }
                    else if (url.startsWith('https://dl.google.com/dl/android/maven2/')) {
                        project.logger.lifecycle "Repository ${repo.url} replaced by $GOOGLE_URL."
                        println("buildscript ${repo.url} replaced by $GOOGLE_URL.")
                        remove repo
                    }
                    else if (url.startsWith('https://repo1.maven.org/maven2')) {
                        project.logger.lifecycle "Repository ${repo.url} replaced by $REPOSITORY_URL."
                        println("buildscript ${repo.url} replaced by $REPOSITORY_URL.")
                        remove repo
                    }
                }
            }
            jcenter {
                url JCENTER_URL
            }
            google {
                url GOOGLE_URL
            }
            maven {
                url NEXUS_URL
            }
        }
    }
}
```

## groovy dsl转kotlin dsl

<https://docs.gradle.org/current/userguide/migrating_from_groovy_to_kotlin_dsl.html>
