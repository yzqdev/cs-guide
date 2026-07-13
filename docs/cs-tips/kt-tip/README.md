# Kotlin 实用技巧

## 一、基础语法

### 变量与常量

```kotlin
fun main() {
    // 可变变量
    var name: String = "Kotlin"
    name = "Kotlin 1.9"

    // 不可变变量（推荐）
    val version = 1.9  // 类型推断
    val pi = 3.14159

    // 空安全
    var nullable: String? = null
    val length = nullable?.length ?: 0     // Elvis 操作符
    val str = nullable!!                    // 非空断言（谨慎使用）
}
```

### 条件与循环

```kotlin
// if 表达式（有返回值）
val max = if (a > b) a else b

// when 表达式（类似 switch）
val result = when (score) {
    in 90..100 -> "优秀"
    in 60..89 -> "及格"
    else -> "不及格"
}

// for 循环
for (i in 1..10) { println(i) }        // 包含 10
for (i in 1 until 10) { }               // 不包含 10
for (i in 10 downTo 1 step 2) { }      // 递减步长 2
for ((index, value) in list.withIndex()) { }

// while
while (x > 0) { x-- }
do { x-- } while (x > 0)
```

## 二、集合操作

```kotlin
fun main() {
    val list = listOf(1, 2, 3, 4, 5)      // 不可变列表
    val mutableList = mutableListOf(1, 2)  // 可变列表
    val set = setOf(1, 2, 3)               // 不可变集合
    val map = mapOf("a" to 1, "b" to 2)    // 不可变映射

    // 集合函数式操作
    val doubled = list.map { it * 2 }               // [2, 4, 6, 8, 10]
    val evens = list.filter { it % 2 == 0 }         // [2, 4]
    val sum = list.reduce { acc, i -> acc + i }     // 15
    val grouped = list.groupBy { it % 2 == 0 }      // 按条件分组
    val any = list.any { it > 3 }                   // true
    val all = list.all { it > 0 }                   // true

    // 序列（惰性求值，适合大数据集）
    val result = list.asSequence()
        .filter { it > 2 }
        .map { it * 2 }
        .toList()
}
```

## 三、函数式特性

```kotlin
// 高阶函数
fun <T, R> List<T>.myMap(transform: (T) -> R): List<R> {
    val result = mutableListOf<R>()
    for (item in this) {
        result.add(transform(item))
    }
    return result
}

// lambda
val square: (Int) -> Int = { it * it }
println(square(5))  // 25

// 内联函数
inline fun measureTime(action: () -> Unit) {
    val start = System.nanoTime()
    action()
    val end = System.nanoTime()
    println("耗时：${(end - start) / 1_000_000} ms")
}

// 扩展函数
fun String.isEmail(): Boolean {
    return this.contains("@") && this.contains(".")
}

fun main() {
    println("hello@example.com".isEmail())  // true
}
```

## 四、数据类与密封类

```kotlin
// 数据类 —— 自动生成 equals/hashCode/toString/copy
data class User(val name: String, val age: Int)

fun main() {
    val user1 = User("Alice", 25)
    val user2 = user1.copy(age = 26)  // 复制并修改
    val (name, age) = user1           // 解构

    println(user1)  // User(name=Alice, age=25)
}

// 密封类 —— 受限的类层次结构
sealed class Result {
    data class Success(val data: String) : Result()
    data class Error(val message: String) : Result()
    object Loading : Result()
}

fun handle(result: Result) = when (result) {
    is Result.Success -> println("数据：${result.data}")
    is Result.Error -> println("错误：${result.message}")
    is Result.Loading -> println("加载中")
}
```

## 五、协程

```kotlin
// 需要在 build.gradle 添加依赖：
// implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core")

import kotlinx.coroutines.*

suspend fun fetchData(): String {
    delay(1000)  // 模拟网络请求
    return "数据"
}

fun main() = runBlocking {
    // 并发执行
    val result = async { fetchData() }
    val result2 = async { fetchData() }

    println("结果：${result.await()} ${result2.await()}")

    // 启动协程
    launch {
        delay(500)
        println("协程完成")
    }
}
```

## 六、委托

```kotlin
// 懒加载
val lazyValue: String by lazy {
    println("只计算一次")
    "Hello"
}

// 可观察属性
var name: String by Delegates.observable("初始值") {
    prop, old, new -> println("$old → $new")
}

// 类委托
interface Base { fun print() }
class BaseImpl(val x: Int) : Base {
    override fun print() { println(x) }
}
class Derived(b: Base) : Base by b  // 委托
```

## 七、常用扩展

```kotlin
// 日期格式化
fun Date.format(pattern: String = "yyyy-MM-dd"): String {
    val sdf = SimpleDateFormat(pattern, Locale.getDefault())
    return sdf.format(this)
}

// dp to px
fun Int.dpToPx(): Int {
    return (this * Resources.getSystem().displayMetrics.density).toInt()
}

// Toast 简写
fun Context.toast(message: String) {
    Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
}

// View 扩展
fun View.show() { this.visibility = View.VISIBLE }
fun View.hide() { this.visibility = View.GONE }
```

## 八、Android 开发常用

```kotlin
// Activity 扩展
inline fun <reified T : Activity> Context.startActivity() {
    startActivity(Intent(this, T::class.java))
}

// ViewBinding
class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.button.setOnClickListener {
            binding.textView.text = "点击了"
        }
    }
}

// SharedPreferences 委托
class PreferenceManager(context: Context) {
    private val prefs = context.getSharedPreferences("app", Context.MODE_PRIVATE)

    var isFirstLaunch: Boolean
        get() = prefs.getBoolean("first_launch", true)
        set(value) = prefs.edit().putBoolean("first_launch", value).apply()
}
```
