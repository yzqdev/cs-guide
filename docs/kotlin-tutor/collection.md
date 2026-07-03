# 集合

Kotlin 的集合 API 非常强大，提供了丰富的函数式操作。官方文档：[Collections Overview](https://kotlinlang.org/docs/collections-overview.html)

## 集合类型

| 类型 | 可变 | 不可变 | 说明 |
|------|------|--------|------|
| List | `mutableListOf()` | `listOf()` | 有序集合 |
| Set | `mutableSetOf()` | `setOf()` | 无序不重复 |
| Map | `mutableMapOf()` | `mapOf()` | 键值对 |

## 创建集合

```kotlin
val list = listOf(1, 2, 3)             // 不可变 List
val mutableList = mutableListOf(1, 2, 3) // 可变 List
val set = setOf(1, 2, 3)                // 不可变 Set
val map = mapOf("a" to 1, "b" to 2)     // 不可变 Map
```

## 常用操作符

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

numbers.filter { it > 2 }     // [3, 4, 5]      过滤
numbers.map { it * 2 }        // [2, 4, 6, 8, 10] 映射
numbers.reduce { a, b -> a + b } // 15            聚合
numbers.any { it > 3 }        // true            任一满足
numbers.all { it > 0 }        // true            全部满足
numbers.first { it > 3 }      // 4               找到第一个
numbers.sortedDescending()    // [5, 4, 3, 2, 1] 降序排序
```

## Ranges（区间）

```kotlin
for (i in 1..4) print(i)          // 1234
for (i in 4 downTo 1) print(i)    // 4321 倒序
for (i in 1..8 step 2) print(i)   // 1357 步进
for (i in 1 until 10) {           // 123456789 不包含10
    print(i)
}
```

## Group（分组）

```kotlin
val numbers = listOf("one", "two", "three", "four", "five")

println(numbers.groupBy { it.first().uppercase() })
// 输出: {O=[one], T=[two, three], F=[four, five]}

println(numbers.groupBy(
    keySelector = { it.first() },
    valueTransform = { it.uppercase() }
))
// 输出: {o=[ONE], t=[TWO, THREE], f=[FOUR, FIVE]}
```

## 更多操作

```kotlin
// flatMap 展平
val nested = listOf(listOf(1, 2), listOf(3, 4))
println(nested.flatMap { it })  // [1, 2, 3, 4]

// zip 合并
val names = listOf("A", "B", "C")
val ages = listOf(20, 30, 40)
println(names.zip(ages))  // [(A, 20), (B, 30), (C, 40)]

// partition 分区
val (even, odd) = numbers.partition { it % 2 == 0 }
println(even)  // [2, 4]
println(odd)   // [1, 3, 5]
```
