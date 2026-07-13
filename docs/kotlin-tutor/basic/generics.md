# Kotlin 泛型

[官方文档](https://kotlinlang.org/docs/generics.html)

## 基本泛型

### 泛型函数

```kotlin
// 泛型函数
fun <T> identity(value: T): T = value

fun <T> List<T>.secondOrNull(): T? = if (size >= 2) this[1] else null

fun main() {
    println(identity("Hello"))       // Hello
    println(identity(42))            // 42
    println(listOf(1, 2, 3).secondOrNull()) // 2
}
```

### 泛型类

```kotlin
class Box<T>(val value: T)

data class Pair<A, B>(val first: A, val second: B)

fun main() {
    val box = Box(42)                  // 类型推断
    val strBox = Box<String>("Hello")  // 显式指定
    println(box.value)                 // 42

    val pair = Pair("张三", 25)
    println("${pair.first} - ${pair.second}")
}
```

### 泛型约束

```kotlin
// 上界约束：T 必须是 Number 的子类
fun <T : Number> sum(vararg items: T): Double {
    return items.sumOf { it.toDouble() }
}

// 多个约束
interface Printable
fun <T> printItem(item: T) where T : CharSequence, T : Comparable<T> {
    println(item)
}

// 可空类型约束
fun <T : Any> notNull(value: T): T = value  // T 不可为 null
fun <T : Any?> nullable(value: T?): T? = value // T 可为 null

fun main() {
    println(sum(1, 2, 3))     // 6.0
    println(sum(1.5, 2.5))    // 4.0
}
```

## 型变（Variance）

### 协变 out

```kotlin
// out = 只读（生产者），只能读取，不能写入
interface Producer<out T> {
    fun produce(): T
}

class StringProducer : Producer<String> {
    override fun produce() = "Hello"
}

fun main() {
    val producer: Producer<String> = StringProducer()
    val anyProducer: Producer<Any> = producer // ✅ 协变
    println(anyProducer.produce())
}
```

### 逆变 in

```kotlin
// in = 只写（消费者），只能写入，不能读取
interface Consumer<in T> {
    fun consume(item: T)
}

class AnyConsumer : Consumer<Any> {
    override fun consume(item: Any) = println(item)
}

fun main() {
    val anyConsumer: Consumer<Any> = AnyConsumer()
    val stringConsumer: Consumer<String> = anyConsumer // ✅ 逆变
    stringConsumer.consume("Hello")
}
```

### 声明处型变 vs 使用处型变

```kotlin
// 声明处型变（在类声明处加 out/in）
class Covariant<out T>(private val value: T) {
    fun get(): T = value
    // fun set(v: T) {} // ❌ out 位置不能设值
}

class Contravariant<in T> {
    fun process(value: T) { /* ... */ }
    // fun get(): T { ... } // ❌ in 位置不能取值
}

// 使用处型变（类型投影）
fun copy(from: Array<out Any>, to: Array<Any>) {
    for (i in from.indices) {
        to[i] = from[i]
    }
}

fun fill(dest: Array<in String>, value: String) {
    for (i in dest.indices) {
        dest[i] = value
    }
}
```

### 星投影 *

```kotlin
// * 表示"未知类型"
fun printList(list: List<*>) {
    for (item in list) println(item)
}

fun main() {
    printList(listOf(1, 2, 3))
    printList(listOf("A", "B"))
    printList(listOf(true, false))
}
```

## reified 实化类型

reified 关键字让泛型类型在运行时可用（需配合 inline）。

```kotlin
// reified：在运行时保留泛型类型信息
inline fun <reified T> isA(value: Any): Boolean {
    return value is T
}

inline fun <reified T> List<*>.filterIsInstance(): List<T> {
    return this.filterIsInstance<T>()
}

fun main() {
    println(isA<String>("Hello"))    // true
    println(isA<Int>("Hello"))       // false

    val mixed = listOf(1, "a", 2, "b", 3)
    val strings = mixed.filterIsInstance<String>()
    println(strings) // [a, b]
}

// reified 创建泛型实例
inline fun <reified T> createInstance(): T {
    return when (T::class) {
        String::class -> "默认" as T
        Int::class -> 0 as T
        Double::class -> 0.0 as T
        else -> throw Exception("未知类型")
    }
}

fun main() {
    val s: String = createInstance()
    val i: Int = createInstance()
    println("$s, $i") // 默认, 0
}
```

## 泛型函数案例

```kotlin
// 泛型单例
class SingletonHolder<T, A>(private val creator: (A) -> T) {
    @Volatile
    private var instance: T? = null

    fun getInstance(arg: A): T {
        return instance ?: synchronized(this) {
            instance ?: creator(arg).also { instance = it }
        }
    }
}

class Database private constructor(val url: String) {
    companion object {
        val instance = SingletonHolder(::Database)
    }
}

fun main() {
    val db = Database.instance.getInstance("localhost:3306")
    println(db.url)
}

// 泛型构建器
data class Query<T>(val table: String, val conditions: Map<String, T>)

class QueryBuilder<T> {
    private val conditions = mutableMapOf<String, T>()

    fun where(key: String, value: T): QueryBuilder<T> {
        conditions[key] = value
        return this
    }

    fun build(table: String) = Query(table, conditions)
}

fun main() {
    val query = QueryBuilder<Int>()
        .where("age", 25)
        .where("id", 1)
        .build("users")
    println(query) // Query(table=users, conditions={age=25, id=1})
}
```

## 泛型对比

| 概念 | 说明 | Kotlin | Java |
|------|------|--------|------|
| 协变 | 只读、生产者 | `out T` | `? extends T` |
| 逆变 | 只写、消费者 | `in T` | `? super T` |
| 星投影 | 未知类型 | `*` | `?` |
| 实化 | 运行时保留类型 | `reified` | 无 |
| 上界 | 类型上限 | `T : Number` | `T extends Number` |
