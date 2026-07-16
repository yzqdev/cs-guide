---
order: 10
---

# 包与导入

> Kotlin 的包引入机制与 Java 类似，但更加灵活——不仅可以导入类，还可以导入顶层函数、属性和枚举常量。

## 包声明

```kotlin
// 文件顶部声明包（与 Java 相同）
package com.example.myapp

// 不声明包时，文件属于默认包（default package）
```

## 导入类

```kotlin
import org.example.Message

// 导入包中所有内容（包括类和顶层函数）
import org.example.*

// 导入多个类
import org.example.Message
import org.example.User
```

## Kotlin 特有的导入

Kotlin 不仅可以导入类，还可以导入：

### 导入顶层函数和属性

```kotlin
// 文件: org/example/utils.kt
package org.example
fun myFunction() = "Hello"
val myProperty = "World"

// 使用
import org.example.myFunction   // 导入顶层函数
import org.example.myProperty   // 导入顶层属性

fun main() {
    println(myFunction())  // Hello
    println(myProperty)    // World
}
```

### 导入 object 中的方法和属性

```kotlin
import org.example.MyObject.myMethod
import org.example.MyObject.myProperty
```

### 导入 enum 常量

```kotlin
import org.example.MyEnum.VALUE1
import org.example.MyEnum.VALUE2
```

### 别名导入（解决命名冲突）

```kotlin
import org.example.Message as Msg1
import org.other.Message as Msg2

fun main() {
    val msg1 = Msg1("Hello")
    val msg2 = Msg2("World")
}
```

### 导入扩展函数

```kotlin
// 文件: extensions.kt
fun String.isEmail(): Boolean = this.contains("@")

// 使用
import extensions.isEmail

fun main() {
    println("test@example.com".isEmail())  // true
}
```

## 默认导入

Kotlin 默认导入以下包，无需手动声明：

```kotlin
// 基础包
kotlin.*
kotlin.annotation.*
kotlin.collections.*
kotlin.comparisons.*
kotlin.io.*
kotlin.ranges.*
kotlin.sequences.*
kotlin.text.*

// JVM 特定
java.lang.*
kotlin.jvm.*

// JS 特定（Kotlin/JS）
kotlin.js.*
```

## 导入对比（Java vs Kotlin）

| 特性 | Java | Kotlin |
|------|------|--------|
| 导入类 | ✅ | ✅ |
| 导入静态方法 | ✅ `import static` | ✅ 直接导入 |
| 导入顶层函数 | ❌ | ✅ |
| 导入扩展函数 | ❌ | ✅ |
| 导入属性 | ❌ | ✅ |
| 导入 enum 常量 | ❌（需类名限定） | ✅ |
| 别名 | ❌ | ✅ `as` |
| `import *` | ❌（IDE 建议展开） | ✅ |

## 最佳实践

```kotlin
// ✅ 明确导入具体类
import com.example.User
import com.example.UserRepository

// ❌ 避免使用通配符（除非真的需要很多类）
import com.example.*

// ✅ 命名冲突时使用别名
import com.example.data.Message as DataMessage
import com.example.ui.Message as UiMessage

// ✅ 导入顶层函数时明确来源
import com.example.utils.formatDate
import com.example.utils.validateEmail
```