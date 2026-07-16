---
order: 0
---

# 安装与开发环境搭建

> Kotlin 的安装方式取决于你的使用场景——Android 开发、后端开发、或命令行学习。

:::tip 官方文档
<https://kotlinlang.org/docs/home.html>
:::

## 方式一：在线 Playground（无需安装）

最快体验 Kotlin 的方式，浏览器即可运行：

- <https://play.kotlinlang.org/>

## 方式二：命令行工具（Kotlin Compiler）

### Windows

```powershell
# 使用 Scoop 安装
scoop install kotlin

# 或使用 Chocolatey
choco install kotlin
```

### macOS

```bash
# 使用 Homebrew 安装
brew install kotlin
```

### Linux

```bash
# 使用 SDKMAN
curl -s https://get.sdkman.io | bash
sdk install kotlin

# 或使用 apt（Ubuntu/Debian）
sudo apt install kotlin
```

### 验证安装

```bash
kotlin -version
# 输出: Kotlin version 2.1.0 (JRE 21+)
```

### 编译运行第一个 Kotlin 程序

```kotlin
// hello.kt
fun main() {
    println("Hello, Kotlin!")
}
```

```bash
# 编译
kotlinc hello.kt -include-runtime -d hello.jar

# 运行
java -jar hello.jar

# 或直接运行 .kt 文件（Kotlin 1.3+）
kotlin hello.kt
```

## 方式三：IntelliJ IDEA（推荐）

IDEA 是 Kotlin 官方 IDE，开箱即用。

- 下载：[JetBrains IntelliJ IDEA](https://www.jetbrains.com/idea/download/)
- Community 版免费，支持 Kotlin 全部功能

### 创建 Kotlin 项目

1. 打开 IDEA → **New Project**
2. 选择 **Kotlin** → **JVM | IDEA**
3. 填写项目名称和路径
4. 点击 **Finish**

## 方式四：Android Studio

如果你做 Android 开发，Android Studio 已内置 Kotlin 支持。

- 新建项目时选择 **Empty Views Activity**
- 语言选择 **Kotlin**
- 最低 SDK 选择 **API 24+**

## 方式五：VS Code + 插件

1. 安装 VS Code
2. 搜索安装以下扩展：
   - **Kotlin Extension**（kotlin-lang）
   - **Code Runner**（快速运行代码片段）
3. 安装 Kotlin 编译器后即可在 VS Code 中编写和运行

## 创建项目对比

| 方式 | 适合场景 | 启动速度 | 功能完整度 |
|------|---------|---------|-----------|
| Playground | 快速测试语法 | 即时 | 低 |
| 命令行 | 脚本、小工具 | 快 | 中 |
| IntelliJ IDEA | 项目开发 | 较慢 | 高 |
| Android Studio | Android 开发 | 较慢 | 高 |
| VS Code | 轻量编辑 | 快 | 中 |

## 下一步

安装完成后，开始学习 [变量与数据类型](./01-variables.md)。