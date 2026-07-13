# 控制流对比

> Java → Kotlin 控制流对比：if、when（替代 switch）、for、while。

## if — 表达式 vs 语句

在 Kotlin 中，`if` 是**表达式**（有返回值），而非语句：

```java
// Java — if 是语句
int max;
if (a > b) {
    max = a;
} else {
    max = b;
}

// 三元运算符
int max = a > b ? a : b;
```

```kotlin
// Kotlin — if 是表达式，可直接赋值
val max = if (a > b) a else b

// 也可以写代码块，最后一行就是返回值
val max = if (a > b) {
    println("a is larger")
    a
} else {
    println("b is larger")
    b
}
```

:::tip
Kotlin **没有**三元运算符 `a ? b : c`，因为 `if` 本身就是表达式。
:::

## when — 替代 switch

`when` 是 Kotlin 对 `switch` 的强化版，功能强大得多：

```java
// Java — switch
String result;
switch (x) {
    case 1:
        result = "一";
        break;
    case 2:
    case 3:
        result = "二或三";
        break;
    default:
        result = "其他";
        break;
}
```

```kotlin
// Kotlin — when（无需 break）
val result = when (x) {
    1 -> "一"
    2, 3 -> "二或三"      // 逗号合并多个分支
    in 4..10 -> "四到十"  // 区间判断
    !in 0..100 -> "负数"  // !in 取反
    else -> "其他"
}
```

### when 的更多用法

```kotlin
// 任意表达式作为条件
when (x) {
    is String -> println("是字符串，长度 ${x.length}")
    in 1..100 -> println("在 1 到 100 之间")
    x % 2 == 0 -> println("偶数")
    else -> println("其他")
}

// 无参数的 when（替代 if-else 链）
when {
    score >= 90 -> "优秀"
    score >= 80 -> "良好"
    score >= 60 -> "及格"
    else -> "不及格"
}
```

## for 循环

```java
// Java — for-each
for (String item : list) {
    System.out.println(item);
}

// 索引循环
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

// 增强 for
for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}
```

```kotlin
// Kotlin
for (item in list) {
    println(item)
}

// 区间循环
for (i in 0 until 10) {        // 0..9
    println(i)
}

// 带步进
for (i in 0..10 step 2) {      // 0, 2, 4, 6, 8, 10
    println(i)
}

// 倒序
for (i in 10 downTo 0) {       // 10, 9, 8, ..., 0
    println(i)
}

// 带索引
for ((index, value) in list.withIndex()) {
    println("$index: $value")
}
```

## while 循环

```java
// Java
while (condition) {
    // ...
}

do {
    // ...
} while (condition);
```

```kotlin
// Kotlin — 语法与 Java 完全相同
while (condition) {
    // ...
}

do {
    // ...
} while (condition)
```

## break / continue 与标签

Kotlin 支持标签（label），可以跳出指定循环：

```kotlin
outer@ for (i in 1..3) {
    for (j in 1..3) {
        if (i == 2 && j == 2) break@outer  // 跳出外层循环
        println("($i, $j)")
    }
}
// 输出: (1,1) (1,2) (1,3) (2,1) — 遇到 (2,2) 时全部跳出

// Lambda 中的 return — 使用标签
list.forEach {
    if (it == 2) return@forEach  // 相当于 continue
    println(it)
}
```

## 小结

| Java | Kotlin |
|------|--------|
| `if` 语句 | `if` 表达式（可赋值） |
| `a ? b : c` | `if (a) b else c` |
| `switch (x) { case ... }` | `when (x) { ... }` |
| `for (int i = 0; i < n; i++)` | `for (i in 0 until n)` |
| `for (int i = 0; i <= n; i++)` | `for (i in 0..n)` |
| 无标签 | `label@` + `break@label` |
