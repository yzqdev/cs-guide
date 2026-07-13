# Kotlin 空安全机制

[官方文档](https://kotlinlang.org/docs/null-safety.html)

Kotlin 的类型系统致力于消除空引用（NullPointerException）。

## 可空类型 ?

```kotlin
// 默认不可为 null
var name: String = "张三"
// name = null // ❌ 编译错误

// 加 ? 变为可空
var nullable: String? = null
nullable = "Hello"
nullable = null

// 函数参数
fun printLength(s: String?) {
    // ...
}
```

## 安全调用 ?.

```kotlin
data class Address(val city: String, val street: String?)
data class Person(val name: String, val address: Address?)

fun main() {
    val person: Person? = Person("张三", Address("北京", null))

    // 传统 null 检查
    val city: String? = if (person != null && person.address != null) {
        person.address.city
    } else null

    // 安全调用 ?.（一行搞定）
    val city2 = person?.address?.city

    // 链式调用
    println(city2?.length)      // 2（北京）
    println(city2?.uppercase()) // 北京

    // ?. 与 let 配合
    person?.address?.city?.let {
        println("城市: $it")   // 只在非 null 时执行
    }
}
```

## Elvis 运算符 ?:

当左侧为 null 时返回右侧值。

```kotlin
fun main() {
    val name: String? = null

    // 传统写法
    val displayName = if (name != null) name else "匿名用户"

    // Elvis 写法
    val displayName2 = name ?: "匿名用户"

    // 链式使用
    val person: Person? = null
    val city = person?.address?.city ?: "未知城市"

    // ?: 与 throw 配合
    val result = name ?: throw IllegalArgumentException("name 不能为空")

    // ?: 与 return 配合
    fun getName(person: Person?): String {
        return person?.name ?: return "未知"
    }
}
```

## 非空断言 !!

确定值不为 null 时使用，为 null 则抛 NPE。

```kotlin
fun main() {
    var name: String? = "张三"

    // !! 告诉编译器"我确定不为 null"
    val length = name!!.length
    println(length) // 2

    name = null
    // val l = name!!.length // ❌ NullPointerException
}
```

## 安全转换 as?

类型转换失败时返回 null 而非抛异常。

```kotlin
fun main() {
    val obj: Any = "123"

    // 普通转换：失败抛 ClassCastException
    val str = obj as String  // ✅ 可以

    // as? 安全转换：失败返回 null
    val num = obj as? Int    // null（String 不能转 Int）
    println(num) // null

    val num2 = (obj as? String)?.toIntOrNull()
    println(num2) // 123
}
```

## 可空类型的集合

```kotlin
fun main() {
    val list: List<Int?> = listOf(1, null, 3, null, 5)

    // filterNotNull 过滤 null
    val nonNull = list.filterNotNull()
    println(nonNull) // [1, 3, 5]

    // map 中处理 null
    val result = list.map { it?.toString() ?: "null" }
    println(result) // ["1", "null", "3", "null", "5"]

    // 安全遍历
    for (item in list) {
        item?.let { println(it) } // 只打印非 null
    }
}
```

## let + ?. 非空处理

```kotlin
fun main() {
    val name: String? = "张三"

    // 常见模式：非空时才执行代码块
    name?.let {
        println(it.length)
        println(it.uppercase())
    }

    // 多个可空参数
    val firstName: String? = "张"
    val lastName: String? = "三"
    firstName?.let { f ->
        lastName?.let { l ->
            println("全名: $f$l")
        }
    }
}
```

## lateinit 延迟初始化

```kotlin
class AppConfig {
    // lateinit：稍后初始化，不能是基本类型
    lateinit var database: String
    lateinit var apiKey: String

    fun init() {
        database = "localhost:3306"
        apiKey = "abc123"
    }

    fun print() {
        // 使用前必须初始化
        if (::database.isInitialized) {
            println(database)
        }
    }
}
```

## by lazy 惰性初始化

```kotlin
class HeavyService {
    init {
        println("HeavyService 创建了")
    }
    fun doWork() = "处理完成"
}

class App {
    // lazy：第一次访问时初始化，之后缓存
    val service: HeavyService by lazy {
        HeavyService()
    }

    fun start() {
        println("应用启动")
        println(service.doWork())  // 此时才创建
        println(service.doWork())  // 使用缓存
    }
}

fun main() {
    val app = App()
    println("App 已创建")
    app.start()
}
// 输出：
// App 已创建
// 应用启动
// HeavyService 创建了
// 处理完成
// 处理完成
```

## 可空类型最佳实践

```kotlin
// 1. 用 ?. 代替 if != null
val len = str?.length ?: 0

// 2. 用 let 处理非空
str?.let { process(it) }

// 3. 用 ?: 提供默认值
val display = name ?: "默认"

// 4. 用 as? 安全转换
val num = obj as? Int

// 5. 避免使用 !!
// 可以使用 requireNotNull 或 checkNotNull
val nonNull = requireNotNull(name) { "name 不能为 null" }

// 6. 返回可空类型
fun findUser(id: Int): String? {
    return null // 可能找不到
}
```
