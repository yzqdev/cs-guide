# 集合框架与操作符

> Java → Kotlin 集合创建、遍历、Lambda 操作符对比。

## 创建集合

```java
// Java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");

List<String> immutableList = Arrays.asList("A", "B", "C");

Map<String, Integer> map = new HashMap<>();
map.put("A", 1);
map.put("B", 2);

Set<String> set = new HashSet<>();
set.add("X");
```

```kotlin
// Kotlin — 一行创建
val list = listOf("A", "B", "C")            // 不可变 List
val mutableList = mutableListOf("A", "B")    // 可变 List
val map = mapOf("A" to 1, "B" to 2)         // 不可变 Map
val mutableMap = mutableMapOf("A" to 1)      // 可变 Map
val set = setOf("X", "Y")                   // 不可变 Set
```

### 可变 vs 不可变

Kotlin 明确区分可变和不可变集合，这有助于写出更安全的代码：

| Java | Kotlin 不可变 | Kotlin 可变 |
|------|---------------|------------|
| `ArrayList` | `listOf()` | `mutableListOf()` |
| `HashMap` | `mapOf()` | `mutableMapOf()` |
| `HashSet` | `setOf()` | `mutableSetOf()` |

## 遍历

```java
// Java
for (String item : list) {
    System.out.println(item);
}

for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}
```

```kotlin
// Kotlin
for (item in list) {
    println(item)
}

list.forEach { println(it) }

// 带索引
for ((index, value) in list.withIndex()) {
    println("$index: $value")
}

list.forEachIndexed { index, value ->
    println("$index: $value")
}
```

## Lambda 操作符（替代 Java Stream）

### filter — 过滤

```java
// Java
list.stream()
    .filter(x -> x > 2)
    .collect(Collectors.toList());
```

```kotlin
// Kotlin
list.filter { it > 2 }
```

### map — 转换

```java
// Java
list.stream()
    .map(x -> x * 2)
    .collect(Collectors.toList());
```

```kotlin
// Kotlin
list.map { it * 2 }
```

### groupBy — 分组

```kotlin
val words = listOf("apple", "banana", "avocado", "blueberry")
val grouped = words.groupBy { it.first() }
// = {a=[apple, avocado], b=[banana, blueberry]}
```

### sorted / sortedBy — 排序

```kotlin
list.sorted()
list.sortedBy { it.length }
list.sortedDescending()
```

### flatMap — 扁平化

```kotlin
val nested = listOf(listOf(1,2), listOf(3,4))
val flat = nested.flatMap { it }  // [1, 2, 3, 4]
```

### fold / reduce — 聚合

```kotlin
val sum = listOf(1, 2, 3).fold(0) { acc, i -> acc + i }  // 6
val product = listOf(1, 2, 3).reduce { acc, i -> acc * i } // 6
```

### any / all / none — 条件检查

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
numbers.any { it > 3 }   // true（任一大于3）
numbers.all { it > 0 }   // true（全部大于0）
numbers.none { it < 0 }  // true（没有小于0的）
```

### take / drop — 取子集

```kotlin
val list = listOf(1, 2, 3, 4, 5)
list.take(3)          // [1, 2, 3]
list.drop(2)          // [3, 4, 5]
list.takeLast(2)      // [4, 5]
list.takeWhile { it < 4 }  // [1, 2, 3]
```

### distinct — 去重

```kotlin
listOf(1, 2, 2, 3, 3, 3).distinct()  // [1, 2, 3]
```

### associate — 转为 Map

```kotlin
val list = listOf("A", "B", "C")
list.associateWith { it.hashCode() }          // {A=65, B=66, C=67}
list.associateBy { it.uppercase() }           // {A=A, B=B, C=C}
```

### Sequence — 惰性求值

当集合数据量大时，`Stream` 的 Kotlin 等效是 `Sequence`：

```java
// Java Stream（惰性求值）
list.stream()
    .filter(x -> x > 2)
    .map(x -> x * 2)
    .collect(Collectors.toList());
```

```kotlin
// Kotlin — .asSequence() 实现惰性求值
list.asSequence()
    .filter { it > 2 }
    .map { it * 2 }
    .toList()

// 或直接创建序列
sequenceOf(1, 2, 3, 4, 5)
    .filter { it > 2 }
    .map { it * 2 }
    .toList()
```

## 完整对比示例

```java
// Java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");
List<String> result = names.stream()
    .filter(n -> n.length() > 3)
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());
// ["ALICE", "CHARLIE", "DAVID"]
```

```kotlin
// Kotlin — 更简洁
val names = listOf("Alice", "Bob", "Charlie", "David")
val result = names.filter { it.length > 3 }
    .map { it.uppercase() }
    .sorted()
// [ALICE, CHARLIE, DAVID]
```

## 小结

| Java | Kotlin |
|------|--------|
| `list.stream().filter()` | `list.filter { }` |
| `list.stream().map()` | `list.map { }` |
| `list.stream().sorted()` | `list.sortedBy { }` |
| `Collectors.groupingBy()` | `list.groupBy { }` |
| `list.stream().flatMap()` | `list.flatMap { }` |
| `Stream.of(...)` | `sequenceOf(...)` |
| `.collect(Collectors.toList())` | `.toList()`（无需收集） |
| 只能 Java 8+ | 所有版本 |
