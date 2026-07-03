# 迁移到 Kotlin DSL（KTS）

> 将 Groovy DSL（`.gradle`）迁移到 Kotlin DSL（`.gradle.kts`），可以获得 IDE 的自动补全、类型安全检查和更好的可维护性。

## 官方迁移指南

- [Gradle 官方迁移文档](https://docs.gradle.org/current/userguide/migrating_from_groovy_to_kotlin_dsl.html)
- [SegmentFault 迁移教程](https://segmentfault.com/a/1190000040188771)

## 迁移对照

| Groovy DSL | Kotlin DSL | 说明 |
|-----------|-----------|------|
| `compileSdkVersion 33` | `compileSdk = 33` | 属性赋值 |
| `minSdkVersion 21` | `minSdk = 21` | 属性赋值 |
| `buildToolsVersion "33.0.0"` | `buildToolsVersion = "33.0.0"` | 属性赋值 |
| `implementation 'xxx'` | `implementation("xxx")` | 函数调用 |
| `apply plugin: 'xxx'` | `plugins { id("xxx") }` | 插件声明 |
| `ext { ver = "1.0" }` | `extra["ver"] = "1.0"` | 扩展属性 |
| `task myTask { }` | `tasks.register("myTask") { }` | 任务注册 |
| `buildTypes { release { } }` | `buildTypes { named("release") { } }` | 构建类型 |

## 常见问题

### 1. 在 KTS 中访问 ext 属性

Groovy 中定义的 `ext` 属性，在 KTS 中通过 `extra` 访问：

```kotlin
// Groovy (build.gradle)
ext {
    compileSdkVersion = 33
    minSdkVersion = 21
}
```

```kotlin
// KTS (build.gradle.kts)
android {
    compileSdk = rootProject.extra["compileSdkVersion"] as Int
    defaultConfig {
        minSdk = rootProject.extra["minSdkVersion"] as Int
    }
}
```

### 2. KTS 中使用 groovy 闭包

```kotlin
ext.set("coreDeps", "y")
apply(from = "../compat.gradle")

val roomImpl: groovy.lang.Closure<Any> by ext
roomImpl()
```

### 3. 字符串模板

```groovy
// Groovy
implementation "com.example:lib:$version"
```

```kotlin
// KTS
implementation("com.example:lib:$version")
```
