---
order: 11
---

# Kotlin 语法糖总览

Kotlin 提供了大量语法糖，让代码更简洁、更具表现力。

## 字符串模板

```kotlin
val name = "张三"
val age = 25

// $ 插值
println("Hello, $name!")           // Hello, 张三!
println("${name}明年${age + 1}岁") // 张三明年26岁

// 表达式用 {}
println("大写: ${name.uppercase()}") // 大写: 张三
```

## 类型推断

```kotlin
val message = "Hello"    // 推断为 String
val count = 42           // 推断为 Int
val list = listOf(1, 2)  // 推断为 List<Int>
val map = mapOf("a" to 1) // 推断为 Map<String, Int>
```

## 智能转换（Smart Casts）

```kotlin
fun handle(obj: Any) {
    if (obj is String) {
        println(obj.length)      // 自动转换为 String
        println(obj.uppercase())
    }

    when (obj) {
        is Int -> println(obj + 1)
        is Boolean -> println(!obj)
    }
}
```

## 解构声明（Destructuring）

```kotlin
// data class 自动支持解构
data class Point(val x: Int, val y: Int)

fun main() {
    val point = Point(10, 20)
    val (x, y) = point
    println("x=$x, y=$y") // x=10, y=20

    // 忽略不需要的值
    val (_, yOnly) = point
    println(yOnly) // 20

    // List 解构
    val (a, b, c) = listOf(1, 2, 3)
    println("$a, $b, $c") // 1, 2, 3

    // Pair 和 Triple 解构
    val (name, age) = "张三" to 25
    val (x2, y2, z2) = Triple(1, 2, 3)
}
```

## Lambda 简化

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

// 完整 Lambda
numbers.filter({ n -> n > 2 })

// 括号外 Lambda（最后一个参数）
numbers.filter() { n -> n > 2 }

// 省略括号（唯一参数）
numbers.filter { n -> n > 2 }

// it 简化（单参数）
numbers.filter { it > 2 }

// 方法引用
numbers.forEach(::println)
numbers.filter(Int::isOdd)
```

## 中缀调用

```kotlin
// 标准库中的中缀函数
val pair = "张三" to 25        // to 是中缀函数
val map = mapOf("a" to 1, "b" to 2)
val range = 1..10              // .. 中缀

// 自定义中缀
infix fun Int.pow(x: Int): Int = Math.pow(this.toDouble(), x.toDouble()).toInt()
fun main() = println(2 pow 10) // 1024
```

## 操作符重载

```kotlin
data class Vector(val x: Int, val y: Int) {
    operator fun plus(other: Vector) = Vector(x + other.x, y + other.y)
    operator fun times(scalar: Int) = Vector(x * scalar, y * scalar)
    operator fun get(index: Int): Int = when (index) {
        0 -> x
        1 -> y
        else -> throw IndexOutOfBoundsException()
    }
}

fun main() {
    val v1 = Vector(1, 2)
    val v2 = Vector(3, 4)
    println(v1 + v2)      // Vector(x=4, y=6)
    println(v1 * 3)       // Vector(x=3, y=6)
    println(v1[0])        // 1
}
```

## 作用域函数

```kotlin
data class Person(var name: String, var age: Int)

fun main() {
    // apply：配置对象，返回对象本身
    val person = Person("", 0).apply {
        name = "张三"
        age = 25
    }
    println(person) // Person(name=张三, age=25)

    // let：非空处理，返回 Lambda 结果
    val len = "Hello".let {
        println(it)
        it.length
    }
    println(len) // 5

    // run：配置 + 计算
    val info = Person("李四", 30).run {
        "$name 今年 ${age}岁"
    }
    println(info) // 李四 今年 30岁

    // also：副作用操作
    "数据".also {
        println("开始处理: $it")
    }.let {
        println("处理: $it")
    }

    // with：对同一对象多次操作
    with(Person("王五", 28)) {
        println("$name, $age")
    }
}
```

## 区间

```kotlin
for (i in 1..5) print(i)        // 12345
for (i in 5 downTo 1) print(i)  // 54321
for (i in 1..10 step 2) print(i) // 13579
```

## 扩展函数 + 中缀

```kotlin
// 为 Int 添加扩展
infix fun Int.add(x: Int): Int = this + x
infix fun Int.repeat(times: Int): Int = this * times

fun main() {
    println(5 add 3)     // 8
    println(2 repeat 10) // 20
}
```

## 语法糖速查表

| 语法 | 说明 | 示例 |
|------|------|------|
| `$name` | 字符串插值 | `"Hello, $name"` |
| `?.` | 安全调用 | `str?.length` |
| `?:` | Elvis 运算符 | `a ?: b` |
| `!!` | 非空断言 | `str!!.length` |
| `as?` | 安全转换 | `obj as? String` |
| `is` | 类型检查 | `obj is String` |
| `==` | 结构相等 | `a == b` |
| `===` | 引用相等 | `a === b` |
| `..` | 区间 | `1..10` |
| `until` | 半开区间 | `1 until 10` |
| `downTo` | 倒序区间 | `10 downTo 1` |
| `step` | 步进 | `1..10 step 2` |
| `to` | 创建 Pair | `"a" to 1` |
| `by lazy` | 惰性初始化 | `val x by lazy { ... }` |
| `by` | 委托 | `class D by B` |
| `::` | 函数引用 | `::println` |
| `it` | 隐式参数 | `list.filter { it > 0 }` |
| `_` | 弃元 | `val (_, y) = point` |
| `*` | 展开运算符 | `fun(*args)` |
| `?.let` | 安全处理 | `str?.let { it }` |
| `inline` | 内联 | `inline fun foo()` |
| `reified` | 实化泛型 | `inline fun <reified T>` |
| `tailrec` | 尾递归 | `tailrec fun fact()` |
| `infix` | 中缀函数 | `infix fun Int.add()` |

## Kotlin vs Java 语法对比

| 特性 | Kotlin | Java |
|------|--------|------|
| 变量声明 | `val x = 1` / `var x = 1` | `final int x = 1` / `int x = 1` |
| 字符串拼接 | `"Hello, $name"` | `"Hello, " + name` |
| 空安全 | `str?.length ?: 0` | `str != null ? str.length() : 0` |
| 类型推断 | `val list = listOf(1)` | `List<Integer> list = List.of(1)` |
| 数据类 | `data class User(...)` | 需要手写 getter/setter/equals/hashCode |
| 单例 | `object Singleton` | `public class Singleton { ... }` |
| 扩展函数 | `fun String.foo()` | 不支持（需要工具类） |
| Lambda | `{ it > 0 }` | `n -> n > 0` |
| When/Switch | `when { ... }` | `switch { ... }` |
| 三目 | `if (a) b else c` | `a ? b : c` |
