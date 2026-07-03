# Compose 常用技巧

> 使用 Jetpack Compose 开发时的一些实用技巧与最佳实践。

## 常用控件参考

[Jetpack Compose 控件速查](https://juejin.cn/post/6965127022217543693)

## Compose BOM（版本物料清单）

自 Jetpack Compose 1.3.0 起，Google 提供了 **Compose BOM（Bill of Materials）** 用于快速指定版本。

BOM 是一个 Maven 模块，它声明一组库和版本的对应关系，将能极大地简化你在 Gradle 依赖块中定义 Compose 库版本的方式。您现在只需要定义一个 BOM 版本，就可以同时指定所有的 Compose 库版本，而不是分别定义每个版本（当库版本开始不同时，这可能会变得很麻烦并且容易出错）。每当 Compose 有一个新的稳定版本时，我们都将发布一个新的 BOM 版本，因此从稳定版本迁移到新的稳定版本将会十分轻松。

### 使用 BOM

具体来说，当你在 `build.gradle.kts` 中引入 BOM 后：

```kotlin
// Import the Compose BOM
implementation(platform("androidx.compose:compose-bom:2024.02.00"))
```

再引入其它 Compose 相关的库就不需要手动指定版本号了，它们会由 BOM 指定：

```kotlin
implementation("androidx.compose.ui:ui")
implementation("androidx.compose.material:material")
implementation("androidx.compose.ui:ui-tooling-preview")
```

### 覆写版本

BOM 指定的版本都是稳定版，你也可以选择覆写部分版本到 alpha 版本，如下：

```kotlin
// Override Material Design 3 library version with a pre-release version
implementation("androidx.compose.material3:material3:1.2.0-alpha01")
```

需要注意的是，这样可能会使部分其它的 Compose 库也升级为对应的 alpha 版本，以确保兼容性。

### 在版本目录中使用 BOM

```kotlin
val composeBom = platform(libs.androidx.compose.bom)
implementation(composeBom)
androidTestImplementation(composeBom)
```

BOM 和库版本的映射可以在 [Quick Start | Jetpack Compose | Android Developers](https://developer.android.google.cn/jetpack/compose/setup) 找到。

## 关于主题

[Compose 主题配置详解](https://www.jianshu.com/p/e73d2f2556a8)

## 常用 Modifier

| Modifier | 作用 |
|----------|------|
| `Modifier.fillMaxWidth()` | 填充最大宽度 |
| `Modifier.padding(16.dp)` | 外边距 |
| `Modifier.size(48.dp)` | 尺寸 |
| `Modifier.clip(CircleShape)` | 裁剪为圆形 |
| `Modifier.background(Color.Red)` | 背景色 |
| `Modifier.clickable { }` | 点击事件 |
| `Modifier.weight(1f)` | 权重（类似 LinearLayout） |
