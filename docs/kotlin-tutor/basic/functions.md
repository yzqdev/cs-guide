# Kotlin 函数详解

[官方文档](https://kotlinlang.org/docs/functions.html)

## 函数声明

### 基本语法

```kotlin
// 基本函数
fun add(a: Int, b: Int): Int {
    return a + b
}

// 单表达式函数（省略返回值类型和花括号）
fun add(a: Int, b: Int) = a + b

// 无返回值（Unit 可省略）
fun printSum(a: Int, b: Int): Unit {
    println(a + b)
}
fun printSum(a: Int, b: Int) { // Unit 省略
    println(a + b)
}
```

### 默认参数

```kotlin
// 参数有默认值，调用时可省略
fun greet(name: String = "游客", greeting: String = "你好") {
    println("$greeting, $name!")
}

fun main() {
    greet()                              // 你好, 游客!
    greet("张三")                         // 你好, 张三!
    greet(greeting = "Hello")            // Hello, 游客!
    greet("李四", "Hi")                  // Hi, 李四!
    greet(name = "王五", greeting = "嗨") // 嗨, 王五!
}
```

### 命名参数

```kotlin
fun createUser(
    name: String,
    age: Int = 18,
    city: String = "北京",
    email: String? = null
) {
    println("$name, $age岁, $city, $email")
}

fun main() {
    // 按名称传参，可以调整顺序
    createUser(name = "张三", age = 25, city = "上海")
    createUser(name = "李四", email = "li@test.com")
    createUser(city = "广州", age = 30, name = "王五")
}
```

### 可变参数 vararg

```kotlin
fun <T> joinToString(vararg items: T, separator: String = ", "): String {
    return items.joinToString(separator)
}

fun main() {
    println(joinToString(1, 2, 3))               // 1, 2, 3
    println(joinToString("A", "B", "C"))          // A, B, C
    println(joinToString(1, 2, 3, separator = "-")) // 1-2-3

    // 展开运算符 *
    val numbers = intArrayOf(4, 5, 6)
    println(joinToString(*numbers.toTypedArray(), separator = "|"))
}
```

## 扩展函数

Kotlin 允许为现有类添加新函数。

```kotlin
// 为 String 添加扩展函数
fun String.isEmail(): Boolean {
    return contains("@") && contains(".")
}

fun String.addExclamation() = "$this!"

// 为 List 添加扩展函数
fun <T> List<T>.middle(): T? {
    if (isEmpty()) return null
    return this[size / 2]
}

// 泛型扩展
fun <T> List<T>.secondOrNull(): T? = if (size >= 2) this[1] else null

fun main() {
    println("test@example.com".isEmail()) // true
    println("hello".addExclamation())     // hello!

    val list = listOf(1, 2, 3, 4, 5)
    println(list.middle())       // 3
    println(listOf(1).middle())  // 1

    println(listOf(1, 2, 3).secondOrNull()) // 2
    println(listOf(1).secondOrNull())       // null
}
```

### 扩展属性

```kotlin
val String.isEmail: Boolean
    get() = contains("@") && contains(".")

val <T> List<T>.lastIndex: Int
    get() = size - 1

fun main() {
    println("a@b.com".isEmail)  // true
    println(listOf(1, 2, 3).lastIndex) // 2
}
```

## 中缀函数 infix

```kotlin
// 中缀函数：单参数函数可以用空格调用
infix fun Int.add(x: Int): Int = this + x
infix fun String.repeat(n: Int): String = this.repeat(n)

data class Person(val name: String, val age: Int)
infix fun Person.isOlderThan(other: Person): Boolean = this.age > other.age

fun main() {
    println(5 add 3)                // 8
    println("Ha" repeat 3)          // HaHaHa

    val p1 = Person("张三", 30)
    val p2 = Person("李四", 25)
    println(p1 isOlderThan p2)      // true
}
```

## 高阶函数

函数可以作为**参数**和**返回值**。

```kotlin
// 函数作为参数
fun calculate(x: Int, y: Int, op: (Int, Int) -> Int): Int {
    return op(x, y)
}

// 函数作为返回值
fun getOperation(type: String): (Int, Int) -> Int = when (type) {
    "+" -> { a, b -> a + b }
    "-" -> { a, b -> a - b }
    "*" -> { a, b -> a * b }
    else -> { _, _ -> 0 }
}

fun main() {
    // 传入 Lambda
    println(calculate(10, 5) { a, b -> a + b })  // 15
    println(calculate(10, 5) { a, b -> a * b })  // 50

    // 传入函数引用 ::
    fun multiply(a: Int, b: Int) = a * b
    println(calculate(10, 5, ::multiply)) // 50

    // 返回函数
    val add = getOperation("+")
    println(add(10, 20)) // 30
}
```

## Lambda 语法

```kotlin
fun main() {
    // 完整写法
    val sum: (Int, Int) -> Int = { x: Int, y: Int -> x + y }

    // 类型推断简写
    val sum2 = { x: Int, y: Int -> x + y }

    // it 关键字（单参数隐式名称）
    val numbers = listOf(1, 2, 3, 4, 5)
    numbers.filter { it > 2 }       // 等价于 { n -> n > 2 }
    numbers.map { it * 2 }          // 等价于 { n -> n * 2 }
    numbers.forEach { println(it) }  // 等价于 { n -> println(n) }

    // 下划线 _ 表示未使用的参数
    numbers.forEachIndexed { index, _ ->
        println("位置: $index")
    }

    // Lambda 作为最后一个参数可提到外面
    numbers.fold(0) { acc, i ->
        acc + i
    }
}
```

## 内联函数 inline

```kotlin
// inline 消除 Lambda 创建开销
inline fun <T> measureTime(block: () -> T): T {
    val start = System.nanoTime()
    val result = block()
    val end = System.nanoTime()
    println("耗时: ${(end - start) / 1_000_000} ms")
    return result
}

fun main() {
    val result = measureTime {
        Thread.sleep(100)
        42
    }
    println(result) // 42
}

// noinline 和内联参数
inline fun foo(inlined: () -> Unit, noinline notInlined: () -> Unit) {
    inlined()
    notInlined()
}

// crossinline 禁止非局部返回
inline fun bar(crossinline block: () -> Unit) {
    Runnable { block() }.run()
}
```

## 尾递归优化 tailrec

```kotlin
// tailrec 优化递归（避免栈溢出）
tailrec fun factorial(n: Int, acc: Long = 1): Long {
    return if (n <= 1) acc else factorial(n - 1, n * acc)
}

fun main() {
    println(factorial(5))  // 120
    println(factorial(20)) // 2432902008176640000
}
```
