# 函数定义与 Lambda

> Java → Kotlin 函数、Lambda 与高阶函数对比。

## 函数声明

```java
// Java
public int add(int a, int b) {
    return a + b;
}

public void printSum(int a, int b) {
    System.out.println(a + b);
}
```

```kotlin
// Kotlin — fun 关键字
fun add(a: Int, b: Int): Int {
    return a + b
}

// 单表达式函数（省略返回值类型和花括号）
fun add(a: Int, b: Int) = a + b

// 无返回值 Unit（可省略）
fun printSum(a: Int, b: Int) {
    println(a + b)
}
```

## 默认参数

```java
// Java — 必须用方法重载实现
void foo(String a, Integer b) {
    // ...
}
void foo(String a) {
    foo(a, 0);
}
```

```kotlin
// Kotlin — 直接指定默认值
fun foo(a: String, b: Int = 0) {
    // ...
}
foo("a")
foo("a", 2)
```

## 命名参数

Kotlin 允许指定参数名传参，可以省略有默认值的参数：

```kotlin
fun createUser(
    name: String,
    age: Int = 18,
    city: String = "北京"
) {
    println("$name, $age岁, $city")
}

// 按名称传参，可调整顺序
createUser(name = "张三", age = 25, city = "上海")
createUser(name = "李四")                      // 使用默认值
createUser(city = "广州", name = "王五")        // 顺序可调
```

## 扩展函数

Kotlin 可以为现有类添加新函数，Java 需要写工具类：

```java
// Java — 工具类
public final class StringUtils {
    public static boolean isEmail(String s) {
        return s != null && s.contains("@") && s.contains(".");
    }
}
boolean result = StringUtils.isEmail("test@test.com");
```

```kotlin
// Kotlin — 扩展函数，直接加到 String 上
fun String.isEmail(): Boolean {
    return contains("@") && contains(".")
}

// 像成员方法一样调用
val result = "test@test.com".isEmail()
```

更多扩展函数的例子：

```kotlin
// 为 List 添加扩展
fun <T> List<T>.secondOrNull(): T? = if (size >= 2) this[1] else null

// 扩展属性
val String.isEmail: Boolean
    get() = contains("@") && contains(".")

fun main() {
    println(listOf(1, 2, 3).secondOrNull())  // 2
    println("a@b.com".isEmail)               // true
}
```

## 高阶函数

函数可以作为**参数**和**返回值**：

```java
// Java — 需使用函数式接口
button.setOnClickListener(v -> {
    System.out.println("clicked");
});
```

```kotlin
// Kotlin — 函数类型 (Param) -> Return
fun calculate(x: Int, y: Int, op: (Int, Int) -> Int): Int {
    return op(x, y)
}

// 函数作为返回值
fun getOperation(type: String): (Int, Int) -> Int = when (type) {
    "+" -> { a, b -> a + b }
    "-" -> { a, b -> a - b }
    else -> { _, _ -> 0 }
}

fun main() {
    println(calculate(10, 5) { a, b -> a + b })  // 15
    println(calculate(10, 5, ::multiply))          // 函数引用
}
```

## Lambda 语法

```java
// Java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
list.stream()
    .filter(x -> x > 2)
    .map(x -> x * 2)
    .forEach(System.out::println);
```

```kotlin
// Kotlin — 更简洁
val list = listOf(1, 2, 3, 4, 5)
list.filter { it > 2 }
    .map { it * 2 }
    .forEach { println(it) }

// it — 单参数隐式名称
list.forEach { println(it) }            // it 替代 item
list.filter { it > 2 }                  // it 替代 n -> n > 2

// 如果 Lambda 是最后一个参数，可以提到括号外面
list.fold(0) { acc, i -> acc + i }
```

## inline 内联函数

```kotlin
// inline 消除 Lambda 创建开销
inline fun <T> measureTime(block: () -> T): T {
    val start = System.nanoTime()
    val result = block()
    println("耗时: ${(System.nanoTime() - start) / 1_000_000} ms")
    return result
}

fun main() {
    val result = measureTime {
        Thread.sleep(100)
        42
    }
    println(result)  // 42
}
```

## 小结

| Java | Kotlin |
|------|--------|
| `void foo(int x)` | `fun foo(x: Int)` |
| 方法重载实现默认值 | 直接支持默认参数 |
| `@FunctionalInterface` | 函数类型 `(T) -> R` |
| 无 | 扩展函数 / 扩展属性 |
| `stream().map().filter()` | `.map { }.filter { }` |
| `Stream.of(...)` | `sequenceOf(...)` |
