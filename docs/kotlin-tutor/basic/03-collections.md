---
order: 3
---

# 集合

> Kotlin 的集合 API 非常强大，提供了丰富的函数式操作。官方文档：[Collections Overview](https://kotlinlang.org/docs/collections-overview.html)

## 集合类型

| 类型 | 可变 | 不可变 | 说明 |
|------|------|--------|------|
| **List** | `mutableListOf()` | `listOf()` | 有序集合，可重复 |
| **Set** | `mutableSetOf()` | `setOf()` | 无序不重复 |
| **Map** | `mutableMapOf()` | `mapOf()` | 键值对（Key-Value） |

## 创建集合

```kotlin
// List
val list = listOf(1, 2, 3)                // 不可变
val mutableList = mutableListOf(1, 2, 3)   // 可变
val emptyList = emptyList<String>()        // 空列表

// Set
val set = setOf(1, 2, 3)                  // 不可变
val mutableSet = mutableSetOf(1, 2, 3)     // 可变

// Map
val map = mapOf("a" to 1, "b" to 2)       // 不可变
val mutableMap = mutableMapOf("a" to 1)    // 可变
```

## 集合操作

### 基础操作

```kotlin
val list = mutableListOf(1, 2, 3)

list.add(4)              // 添加元素
list.remove(2)           // 移除元素
list[0]                  // 索引访问 → 1
list.size                // 大小 → 3
list.contains(3)         // 是否包含 → true
list.isEmpty()           // 是否为空 → false
```

### 遍历

```kotlin
val items = listOf("A", "B", "C")

// for 循环
for (item in items) println(item)

// forEach
items.forEach { println(it) }

// 带索引
items.forEachIndexed { index, value ->
    println("$index: $value")
}
```

## 常用操作符

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

numbers.filter { it > 2 }        // [3, 4, 5]      过滤
numbers.map { it * 2 }           // [2, 4, 6, 8, 10] 映射
numbers.reduce { a, b -> a + b } // 15              聚合
numbers.fold(0) { a, b -> a + b } // 15             带初始值聚合
numbers.any { it > 3 }           // true            任一满足
numbers.all { it > 0 }           // true            全部满足
numbers.none { it < 0 }          // true            都不满足
numbers.count { it > 3 }         // 2               计数
numbers.first { it > 3 }         // 4               找到第一个
numbers.last { it > 3 }          // 5               找到最后一个
numbers.sortedDescending()       // [5, 4, 3, 2, 1] 降序
numbers.take(3)                  // [1, 2, 3]       取前 N 个
numbers.drop(2)                  // [3, 4, 5]       去掉前 N 个
```

## 集合转换

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

// distinct 去重
listOf(1, 1, 2, 2, 3).distinct()  // [1, 2, 3]

// flatMap 展平
val nested = listOf(listOf(1, 2), listOf(3, 4))
nested.flatMap { it }  // [1, 2, 3, 4]

// zip 合并
val names = listOf("A", "B", "C")
val ages = listOf(20, 30, 40)
names.zip(ages)  // [(A, 20), (B, 30), (C, 40)]

// unzip 拆分
val pairs = listOf("A" to 1, "B" to 2)
val (letters, numbers) = pairs.unzip()
// letters = [A, B], numbers = [1, 2]

// partition 分区
val (even, odd) = numbers.partition { it % 2 == 0 }
// even = [2, 4], odd = [1, 3, 5]
```

## Ranges（区间）

```kotlin
for (i in 1..4) print(i)            // 1234
for (i in 4 downTo 1) print(i)      // 4321 倒序
for (i in 1..8 step 2) print(i)     // 1357 步进
for (i in 1 until 10) {             // 123456789 不包含10
    print(i)
}

// 区间判断
val isInRange = 5 in 1..10          // true
val isNotInRange = 15 !in 1..10     // true
```

## Group（分组）

```kotlin
val numbers = listOf("one", "two", "three", "four", "five")

// 按首字母分组
println(numbers.groupBy { it.first().uppercase() })
// 输出: {O=[one], T=[two, three], F=[four, five]}

// 分组 + 转换值
println(numbers.groupBy(
    keySelector = { it.first() },
    valueTransform = { it.uppercase() }
))
// 输出: {o=[ONE], t=[TWO, THREE], f=[FOUR, FIVE]}
```

## 可变集合操作

```kotlin
val list = mutableListOf(1, 2, 3)

list.add(4)           // [1, 2, 3, 4]
list.addAll(listOf(5, 6))  // [1, 2, 3, 4, 5, 6]
list.removeAt(0)      // [2, 3, 4, 5, 6]
list.remove(3)        // [2, 4, 5, 6]
list[0] = 10          // [10, 4, 5, 6]
list.clear()          // []

// 集合运算
val set1 = setOf(1, 2, 3)
val set2 = setOf(2, 3, 4)

set1.union(set2)       // [1, 2, 3, 4]     并集
set1.intersect(set2)   // [2, 3]            交集
set1.subtract(set2)    // [1]               差集
```

## 集合类型转换

```kotlin
val list = listOf(1, 2, 3)
val set = list.toSet()          // List → Set
val mutableList = list.toMutableList()  // 转为可变
val listFromSet = set.toList()  // Set → List

// Map 操作
val map = mapOf("a" to 1, "b" to 2)
map.keys      // [a, b]
map.values    // [1, 2]
map.entries   // [a=1, b=2]
```