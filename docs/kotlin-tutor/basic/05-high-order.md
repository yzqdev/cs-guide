---
order: 5
---

# 高阶函数与 Lambda

> 高阶函数（Higher-Order Function）是指**将函数作为参数或返回值**的函数。这是 Kotlin 函数式编程的核心特性。

## 函数作为参数

```kotlin
fun calculate(x: Int, y: Int, operation: (Int, Int) -> Int): Int {
    return operation(x, y)
}

fun sum(x: Int, y: Int) = x + y

fun main() {
    val sumResult = calculate(4, 5, ::sum)            // 通过 :: 引用函数
    val mulResult = calculate(4, 5) { a, b -> a * b } // 直接传 Lambda
    println("sumResult $sumResult, mulResult $mulResult")
}
```

## 函数作为返回值

```kotlin
fun operation(): (Int) -> Int {
    return ::square
}

fun square(x: Int) = x * x

fun main() {
    val func = operation()
    println(func(2))  // 4
}

// 返回 Lambda
fun getMultiplier(factor: Int): (Int) -> Int {
    return { x -> x * factor }
}

fun main() {
    val double = getMultiplier(2)
    val triple = getMultiplier(3)
    println(double(5))  // 10
    println(triple(5))  // 15
}
```

## Lambda 语法详解

```kotlin
// 完整写法
val sum: (Int, Int) -> Int = { x: Int, y: Int -> x + y }

// 类型推断简写
val sum = { x: Int, y: Int -> x + y }

// 单个参数用 it
val numbers = listOf(1, 2, 3, 4, 5)
numbers.filter { it > 2 }  // 等价于 { it -> it > 2 }

// 如果 Lambda 是最后一个参数，可以提到括号外面
calculate(4, 5) { a, b -> a * b }

// 如果 Lambda 是唯一参数，可以省略括号
repeat(3) { println("Hello") }

// 下划线表示未使用的参数（Kotlin 1.1+）
map.forEach { (_, value) -> println(value) }
```

## 函数类型

```kotlin
// 无参无返回值
val a: () -> Unit = { println("Hello") }

// 一参一返回值
val b: (Int) -> String = { it.toString() }

// 多参有返回值
val c: (Int, String) -> Boolean = { age, name -> age > 18 && name.isNotEmpty() }

// 可空函数类型
val d: ((Int) -> Unit)? = null

// 高阶函数参数
fun execute(action: () -> Unit) {
    action()
}
```

## 内联函数（inline）

使用 `inline` 可以消除 Lambda 带来的对象创建开销：

```kotlin
inline fun measureTime(block: () -> Unit) {
    val start = System.nanoTime()
    block()
    val end = System.nanoTime()
    println("耗时: ${end - start}ns")
}

fun main() {
    measureTime {
        Thread.sleep(100)
    }
}
```

### noinline 与 crossinline

```kotlin
// noinline：排除某个 Lambda 不被内联
inline fun foo(inlined: () -> Unit, noinline notInlined: () -> Unit) {
    inlined()
    notInlined()
}

// crossinline：禁止 Lambda 中的非局部返回
inline fun bar(crossinline block: () -> Unit) {
    Runnable { block() }  // 必须用 crossinline 才能在另一个上下文中调用
}
```

## 常用内置高阶函数

| 函数 | 作用 | 示例 |
|------|------|------|
| `filter` | 过滤 | `list.filter { it > 0 }` |
| `map` | 映射 | `list.map { it * 2 }` |
| `forEach` | 遍历 | `list.forEach { println(it) }` |
| `reduce` | 累加（无初始值） | `list.reduce { a, b -> a + b }` |
| `fold` | 带初始值的累加 | `list.fold(0) { a, b -> a + b }` |
| `any` | 任一满足 | `list.any { it > 0 }` |
| `all` | 全部满足 | `list.all { it > 0 }` |
| `none` | 都不满足 | `list.none { it < 0 }` |
| `find` | 找到第一个 | `list.find { it > 3 }` |
| `groupBy` | 分组 | `list.groupBy { it.length }` |
| `sortedBy` | 排序 | `list.sortedBy { it.length }` |
| `flatMap` | 展平映射 | `list.flatMap { it.split(",") }` |

## 实际案例：函数组合

```kotlin
// 链式调用
val result = listOf(1, 2, 3, 4, 5, 6)
    .filter { it % 2 == 0 }     // [2, 4, 6]
    .map { it * it }            // [4, 16, 36]
    .sortedDescending()         // [36, 16, 4]
    .take(2)                    // [36, 16]
    .sum()                      // 52

println(result)  // 52
```