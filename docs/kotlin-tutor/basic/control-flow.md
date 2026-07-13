# Kotlin 控制流

[官方文档](https://kotlinlang.org/docs/control-flow.html)

## if 表达式

Kotlin 的 if 是**表达式**（有返回值），不是语句。

```kotlin
fun main() {
    val a = 10
    val b = 20

    // if 作为表达式（有返回值）
    val max = if (a > b) a else b
    println(max) // 20

    // if 代码块，最后一行是返回值
    val result = if (a > b) {
        println("a 更大")
        a
    } else {
        println("b 更大")
        b
    }

    // 传统 if 用法
    if (a > b) {
        println("a > b")
    } else if (a == b) {
        println("a == b")
    } else {
        println("a < b")
    }
}
```

## when 表达式

Kotlin 的 `when` 替代了 Java 的 `switch`，功能更强大。

### 基本用法

```kotlin
fun describe(obj: Any): String = when (obj) {
    1 -> "一"
    "Hello" -> "问候语"
    is Long -> "Long 类型"
    !is String -> "不是字符串"
    in 1..10 -> "在 1..10 范围内"
    else -> "未知"
}

fun main() {
    println(describe(1))           // 一
    println(describe("Hello"))     // 问候语
    println(describe(100L))        // Long 类型
    println(describe(5))           // 在 1..10 范围内
}
```

### when 不带参数

```kotlin
fun getGrade(score: Int): String = when {
    score >= 90 -> "A"
    score >= 80 -> "B"
    score >= 70 -> "C"
    score >= 60 -> "D"
    else -> "F"
}

fun main() {
    println(getGrade(85))  // B
    println(getGrade(55))  // F
}
```

### when 多条件合并

```kotlin
fun isVowel(c: Char): Boolean = when (c) {
    'a', 'e', 'i', 'o', 'u' -> true
    else -> false
}

fun main() {
    println(isVowel('a'))  // true
    println(isVowel('b'))  // false
}
```

### when 与区间

```kotlin
fun classify(x: Int) = when (x) {
    in Int.MIN_VALUE until 0 -> "负数"
    0 -> "零"
    in 1..100 -> "1-100 之间"
    else -> "大于100"
}
```

## for 循环

```kotlin
fun main() {
    // 遍历区间
    for (i in 1..5) print(i)     // 12345

    // 遍历数组/列表
    val items = listOf("苹果", "香蕉", "橘子")
    for (item in items) {
        println(item)
    }

    // 带索引遍历
    for ((index, value) in items.withIndex()) {
        println("$index: $value")
    }

    // 遍历 Map
    val map = mapOf("a" to 1, "b" to 2, "c" to 3)
    for ((key, value) in map) {
        println("$key -> $value")
    }

    // forEach Lambda
    items.forEach { println(it) }
    items.forEachIndexed { index, item ->
        println("$index: $item")
    }
}
```

## while 循环

```kotlin
fun main() {
    var x = 5
    while (x > 0) {
        println(x--)
    }

    var y = 5
    do {
        println(y--)
    } while (y > 0)
}
```

## break 和 continue

```kotlin
fun main() {
    // break 跳出循环
    for (i in 1..10) {
        if (i == 5) break
        print(i)  // 1234
    }

    println()

    // continue 跳过当前
    for (i in 1..10) {
        if (i % 2 == 0) continue
        print(i)  // 13579
    }

    println()

    // 标签跳转
    outer@ for (i in 1..3) {
        for (j in 1..3) {
            if (i * j > 4) break@outer
            print("($i,$j) ")
        }
    }
    // 输出: (1,1) (1,2) (1,3) (2,1) (2,2)
}
```

## return 与 Lambda

```kotlin
fun main() {
    val list = listOf(1, 2, 3, 4, 5)

    // 隐式标签（返回 forEach 的 Lambda）
    list.forEach {
        if (it == 3) return@forEach
        print(it)  // 1245
    }

    println()

    // 显式标签
    list.forEach label@{
        if (it == 3) return@label
        print(it)
    }
}
```

## 实际案例

```kotlin
// 计算器
fun calculator(a: Int, b: Int, op: String): Int = when (op) {
    "+" -> a + b
    "-" -> a - b
    "*" -> a * b
    "/" -> if (b != 0) a / b else throw Exception("除数不能为零")
    else -> throw Exception("未知运算符")
}

fun main() {
    println(calculator(10, 5, "+"))  // 15
    println(calculator(10, 5, "*"))  // 50
}

// FizzBuzz
fun fizzBuzz(n: Int) {
    for (i in 1..n) {
        when {
            i % 15 == 0 -> print("FizzBuzz ")
            i % 3 == 0 -> print("Fizz ")
            i % 5 == 0 -> print("Buzz ")
            else -> print("$i ")
        }
    }
}
```
