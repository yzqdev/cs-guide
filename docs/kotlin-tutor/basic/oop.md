# Kotlin 面向对象编程

[官方文档](https://kotlinlang.org/docs/classes.html)

## 类声明

### 基本类

```kotlin
// 最简单的类
class Person

// 带属性的类
class Person(val name: String, var age: Int)

// 完整类
class Person(
    val name: String,
    var age: Int,
    var email: String = ""
) {
    fun introduce() = "我叫$name，${age}岁"
}

fun main() {
    val p = Person("张三", 25)
    println(p.name)          // 张三（自动生成 getter）
    p.age = 26               // 自动生成 setter
    println(p.introduce())   // 我叫张三，26岁
}
```

### 构造函数

```kotlin
// 主构造函数（在类名后）
class User(val name: String, var age: Int) {
    // init 代码块：构造函数执行时调用
    init {
        println("User 初始化: $name, $age")
        require(age >= 0) { "年龄不能为负数" }
    }

    // 次构造函数（必须委托给主构造）
    constructor(name: String) : this(name, 0) {
        println("次构造: $name")
    }

    constructor() : this("默认用户")
}

fun main() {
    val u1 = User("张三", 25)
    val u2 = User("李四")
    val u3 = User()
}
```

## 继承

```kotlin
// open 关键字允许继承
open class Animal(val name: String) {
    // open 方法允许重写
    open fun speak() = "$name 发出声音"
    fun eat() = println("$name 在吃东西")
}

class Dog(name: String) : Animal(name) {
    override fun speak() = "$name 说: 汪汪！"
}

class Cat(name: String) : Animal(name) {
    override fun speak() = "$name 说: 喵喵！"
}

fun main() {
    val animals: List<Animal> = listOf(Dog("旺财"), Cat("咪咪"))
    for (a in animals) {
        println(a.speak())
    }
}
// 输出：
// 旺财 说: 汪汪！
// 咪咪 说: 喵喵！
```

### 属性重写

```kotlin
open class Base {
    open val name: String = "Base"
    open fun describe() = name
}

class Derived(override val name: String) : Base() {
    override fun describe() = "Derived: $name"
}
```

## 抽象类与接口

```kotlin
// 抽象类
abstract class Shape {
    abstract fun area(): Double
    fun describe() = "面积为 ${area()}"
}

class Circle(val radius: Double) : Shape() {
    override fun area() = Math.PI * radius * radius
}

// 接口
interface Flyable {
    fun fly() // 抽象方法
    fun takeOff() = println("起飞") // 默认实现
}

interface Swimmable {
    fun swim()
}

// 实现多个接口
class Duck : Flyable, Swimmable {
    override fun fly() = println("鸭子飞")
    override fun swim() = println("鸭子游")
}

fun main() {
    val circle = Circle(5.0)
    println(circle.describe()) // 面积为 78.5398...

    val duck = Duck()
    duck.fly()   // 鸭子飞
    duck.swim()  // 鸭子游
    duck.takeOff() // 起飞
}
```

## 数据类 data class

```kotlin
// 自动生成：equals, hashCode, toString, copy, componentN
data class User(
    val id: Long,
    val name: String,
    val email: String = ""
)

fun main() {
    val u1 = User(1, "张三", "zs@test.com")
    val u2 = User(1, "张三", "zs@test.com")

    // 自动 toString
    println(u1) // User(id=1, name=张三, email=zs@test.com)

    // 自动 equals（值相等）
    println(u1 == u2) // true

    // copy 复制并修改部分属性
    val u3 = u1.copy(email = "new@test.com")
    println(u3) // User(id=1, name=张三, email=new@test.com)

    // 解构声明
    val (id, name, email) = u1
    println("$id, $name, $email") // 1, 张三, zs@test.com
}
```

## 密封类 sealed class

```kotlin
// 密封类：有限的子类型
sealed class Result {
    data class Success(val data: String) : Result()
    data class Error(val message: String) : Result()
    object Loading : Result()
}

fun handleResult(result: Result) = when (result) {
    is Result.Success -> println("成功: ${result.data}")
    is Result.Error -> println("错误: ${result.message}")
    Result.Loading -> println("加载中...")
    // when 是 exhaustive（穷尽的），不需要 else 分支
}
```

## 密封接口 sealed interface

```kotlin
sealed interface UiState
object Loading : UiState
data class Success(val data: List<String>) : UiState
data class Error(val msg: String) : UiState

fun render(state: UiState) = when (state) {
    Loading -> println("加载中...")
    is Success -> println("数据: ${state.data}")
    is Error -> println("错误: ${state.msg}")
}
```

## 伴生对象 companion object

```kotlin
class MyClass {
    companion object {
        const val TAG = "MyClass"
        fun create() = MyClass()
    }
}

// 调用伴生对象成员
fun main() {
    println(MyClass.TAG)      // MyClass
    val obj = MyClass.create() // 工厂方法
}

// 伴生对象可以命名
class Config {
    companion object Default {
        const val HOST = "localhost"
        const val PORT = 8080
    }
}

fun main() {
    println(Config.HOST)     // localhost
    println(Config.Default.PORT) // 8080
}
```

## 对象表达式与对象声明

### 对象表达式（匿名类）

```kotlin
val listener = object {
    val name = "匿名对象"
    fun onClick() = println("点击: $name")
}

// 实现接口的匿名类
val runnable = Runnable {
    println("运行中")
}

// 继承的匿名类
open class ClickHandler {
    open fun onClick() = println("默认点击")
}

val handler = object : ClickHandler() {
    override fun onClick() = println("自定义点击")
}
```

### 单例对象

```kotlin
// object 声明 = 单例
object DatabaseConfig {
    val url = "jdbc:mysql://localhost:3306"
    val user = "root"
    val password = "123456"

    fun connect() = println("连接数据库: $url")
}

fun main() {
    DatabaseConfig.connect()
    println(DatabaseConfig.url)
}
```

## 内部类与嵌套类

```kotlin
class Outer {
    private val bar: Int = 1

    // 嵌套类（不持有外部类引用）
    class Nested {
        fun foo() = 2
    }

    // 内部类（持有外部类引用）
    inner class Inner {
        fun foo() = bar  // 可访问外部类成员
    }
}

fun main() {
    val nested = Outer.Nested()
    println(nested.foo()) // 2

    val inner = Outer().Inner()
    println(inner.foo()) // 1
}
```

## 枚举类

```kotlin
enum class Direction(val code: Int) {
    NORTH(0),
    EAST(90),
    SOUTH(180),
    WEST(270);

    fun isHorizontal() = this == EAST || this == WEST
}

fun main() {
    println(Direction.NORTH.code)       // 0
    println(Direction.EAST.isHorizontal()) // true

    for (d in Direction.values()) {
        println("${d.name}: ${d.code}°")
    }
}
```

## 委托 by

```kotlin
// 类委托
interface Repository {
    fun getData(): String
}

class DatabaseRepository : Repository {
    override fun getData() = "数据库数据"
}

class CachedRepository(db: Repository) : Repository by db {
    override fun getData() = "缓存: ${db.getData()}"
}

fun main() {
    val db = DatabaseRepository()
    val cache = CachedRepository(db)
    println(cache.getData()) // 缓存: 数据库数据
}
```

## 实际案例

```kotlin
// 使用密封类 + when 处理网络请求状态
sealed class NetworkResult<out T> {
    data class Success<T>(val data: T) : NetworkResult<T>()
    data class Error(val exception: Throwable) : NetworkResult<Nothing>()
    object Loading : NetworkResult<Nothing>()
}

fun <T> handleResult(result: NetworkResult<T>) = when (result) {
    is NetworkResult.Loading -> println("加载中...")
    is NetworkResult.Success -> println("数据: ${result.data}")
    is NetworkResult.Error -> println("错误: ${result.exception.message}")
}

fun main() {
    handleResult(NetworkResult.Loading)
    handleResult(NetworkResult.Success(42))
    handleResult(NetworkResult.Error(Exception("网络错误")))
}
```
