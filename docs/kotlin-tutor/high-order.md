# 高阶函数

高阶函数（Higher-Order Function）是指**将函数作为参数或返回值**的函数。这是 Kotlin 函数式编程的核心特性。

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
```

## Lambda 语法

```kotlin
// 完整写法
val sum = { x: Int, y: Int -> x + y }

// 如果 Lambda 是最后一个参数，可以提到括号外面
calculate(4, 5) { a, b -> a * b }

// 如果只有一个参数，可以用 it 代替
val numbers = listOf(1, 2, 3, 4, 5)
numbers.filter { it > 2 }  // 等价于 { it -> it > 2 }
```

## 常用内置高阶函数

| 函数 | 作用 | 示例 |
|------|------|------|
| `filter` | 过滤 | `list.filter { it > 0 }` |
| `map` | 映射 | `list.map { it * 2 }` |
| `forEach` | 遍历 | `list.forEach { println(it) }` |
| `reduce` | 累加 | `list.reduce { a, b -> a + b }` |
| `fold` | 带初始值的累加 | `list.fold(0) { a, b -> a + b }` |
| `any` | 任一满足 | `list.any { it > 0 }` |
| `all` | 全部满足 | `list.all { it > 0 }` |
