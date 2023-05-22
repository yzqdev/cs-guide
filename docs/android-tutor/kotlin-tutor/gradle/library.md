# 安卓开发组件库

## 组件库kts

```kotlin
plugins {
  id("com.android.library")
  id("org.jetbrains.kotlin.android")

}
android {
  compileSdk = rootProject.extra["compileSdk"] as Int
  defaultConfig {
    minSdk=rootProject.extra["minSdk"] as Int
    targetSdk=rootProject.extra["targetSdk"] as Int}
}

dependencies {
  implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.jar","*.aar"))))
  implementation(androidEx.appcompat)
}
```

## demo演示kts

```kotlin
plugins {
  id("com.android.application")
  id("org.jetbrains.kotlin.android")
}
android {
  compileSdk = rootProject.extra["compileSdk"] as Int
  namespace = "com.yzq.demo"

  defaultConfig {
    applicationId = "com.yzq.demo"
    minSdk = rootProject.extra["minSdk"] as Int
    targetSdk = rootProject.extra["targetSdk"] as Int
    versionCode = 1
    versionName = "1.0"
  }
  buildFeatures{
    viewBinding{
      enable=true
    }
  }
  buildTypes {
    named("release") {
      isMinifyEnabled = false
      setProguardFiles(
        listOf(
          getDefaultProguardFile("proguard-android.txt"),
          "proguard-rules.pro"
        )
      )
    }
  }
}

dependencies {
  implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.jar", "*.aar"))))

  implementation(project(":ArcLayout"))
  implementation(androidEx.bundles.common)
  testImplementation(jTest.core)
  androidTestImplementation(jTest.ext)
  androidTestImplementation(jTest.espresso)

}
```
