---
order: 1
---

# Kotlin 变量与数据类型

[官方文档](https://kotlinlang.org/docs/basic-types.html)

## Hello World

```kotlin
fun main() {
    println("Hello, Kotlin!")
}
```

## 变量声明：val vs var

```kotlin
// val — 不可变引用（类似 final）
val name = "张三"
// name = "李四" // ❌ 编译错误

// var — 可变引用
var age = 25
age = 26 // ✅ 可以修改

// 类型推断
val message = "Hello"          // String
val count = 42                 // Int
val price = 19.99              // Double
val isActive = true            // Boolean

// 显式指定类型
val str: String = "Hello"
val num: Int = 42
```

## 基本数据类型

### 数字

```kotlin
// 整数类型
val b: Byte = 127
val s: Short = 32767
val i: Int = 2_147_483_647     // 可以用下划线分隔
val l: Long = 9_223_372_036_854_775_807L  // L 后缀

// 浮点类型
val f: Float = 3.14F           // F 后缀
val d: Double = 3.14159265358979

// 类型转换（Kotlin 没有隐式转换）
val x: Int = 42
val y: Long = x.toLong()       // 显式转换
val z: Double = x.toDouble()

// 进制
val hex = 0xFF                 // 十六进制
val bin = 0b1010               // 二进制
```

### 布尔

```kotlin
val a = true
val b = false

// 逻辑运算
println(a && b)   // false
println(a || b)   // true
println(!a)       // false
```

### 字符

```kotlin
val ch: Char = 'A'
println(ch.isDigit())          // false
println(ch.isLetter())         // true
println(ch.isUpperCase())      // true

// 转义字符
val tab = '\t'
val newline = '\n'
```

### 字符串

```kotlin
val s = "Hello, Kotlin!"

// 字符串模板（最常用的语法糖）
val name = "张三"
val age = 25
println("我叫${name}，今年${age}岁")
println("明年${age + 1}岁")     // 表达式用 {}
println("我的名字是$name")      // 单个变量可省略 {}

// 多行字符串（trimMargin/trimIndent）
val text = """
    第一行
    第二行
    第三行
""".trimIndent()
println(text)

// 带前缀的 trimMargin
val text2 = """
    |第一行
    |第二行
    |第三行
""".trimMargin()
println(text2)
```

### 数组

```kotlin
// 基本类型数组
val arr = intArrayOf(1, 2, 3, 4, 5)
val arr2 = arrayOf("A", "B", "C")

// 修改和访问
println(arr[0])      // 1
arr[0] = 99

// 遍历
for (item in arr) println(item)
arr.forEach { println(it) }

// 空数组
val empty = emptyArray<String>()
```

## 可空类型 ?

```kotlin
// 默认不可为 null
var name: String = "张三"
// name = null // ❌ 编译错误

// 加 ? 变为可空
var nullable: String? = null
nullable = "Hello"

// 安全调用 ?.
val len: Int? = nullable?.length  // null 则返回 null

// Elvis 运算符 :? 
val length = nullable?.length ?: 0  // null 时用 0

// 非空断言 !!
val forcedLen = nullable!!.length   // null 时抛异常

// 安全转换 as?
val obj: Any = "123"
val num: Int? = obj as? Int        // 失败返回 null，不抛异常
```

## 类型检查与智能转换

```kotlin
fun printLength(obj: Any) {
    // is 检查类型，之后自动智能转换
    if (obj is String) {
        println(obj.length)  // 自动转换为 String
    }

    when (obj) {
        is String -> println(obj.length)
        is Int -> println(obj + 1)
        is Boolean -> println(if (obj) "true" else "false")
    }
}
```

## 区间（Range）

```kotlin
// 闭区间 ..
for (i in 1..5) print(i)        // 12345

// 半开区间 until
for (i in 1 until 5) print(i)   // 1234

// 倒序 downTo
for (i in 5 downTo 1) print(i)  // 54321

// 步进 step
for (i in 1..10 step 2) print(i) // 13579

// 字符区间
for (c in 'a'..'e') print(c)     // abcde

// 判断是否在区间内
val x = 5
println(x in 1..10)              // true
println(x !in 1..3)              // true
```

## 类型别名

```kotlin
typealias UserId = Long
typealias Name = String
typealias Callback = (Int) -> Unit

val id: UserId = 10001L
val callback: Callback = { println(it) }
```

## 完整示例

```kotlin
data class Person(
    val name: String,
    var age: Int,
    val email: String? = null
)

fun main() {
    val person = Person(name = "张三", age = 25)
    
    // 字符串模板
    println("姓名: ${person.name}")
    println("年龄: ${person.age}")
    
    // 安全调用
    val email = person.email ?: "未设置"
    println("邮箱: $email")
    
    // 类型转换
    val strAge = person.age.toString()
    println("年龄字符串: $strAge")
    
    // 区间
    if (person.age in 18..60) {
        println("成年人")
    }
}
```
