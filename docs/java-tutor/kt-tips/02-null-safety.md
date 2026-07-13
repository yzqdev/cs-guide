# 空安全机制

> Kotlin 的类型系统致力于消除 NullPointerException。Java 中处处需要判空，Kotlin 将其融入类型系统。

## 可空类型 ?

| Java | Kotlin |
|------|--------|
| `String`（可为 null）| `String?`（显式声明可空）|
| 无区别（任何引用都可为 null）| `String`（**不可**为 null）|

```java
// Java — 任何引用都可能为 null，全靠开发者自觉
String name = null;  // ✅
name.length();       // ❌ NullPointerException
```

```kotlin
// Kotlin — 默认不可为 null
var name: String = "张三"
// name = null  // ❌ 编译错误

// 加 ? 显式声明可空
var nullable: String? = null
nullable = "Hello"
nullable = null
```

## 安全调用 ?.

```java
// Java — 需要嵌套判空
if (person != null) {
    Address address = person.getAddress();
    if (address != null) {
        String city = address.getCity();
        System.out.println(city.length());
    }
}
```

```kotlin
// Kotlin — ?. 链式调用，任一环节为 null 则整个表达式为 null
val city = person?.address?.city
println(city?.length)

// 与 let 配合，仅在非 null 时执行
person?.address?.city?.let {
    println("城市: $it")
}
```

## Elvis 运算符 ?:

```java
// Java
String displayName = (name != null) ? name : "匿名用户";
```

```kotlin
// Kotlin — Elvis 运算符 ?:
val displayName = name ?: "匿名用户"

// 链式搭配
val city = person?.address?.city ?: "未知城市"

// 与 throw 配合
val result = name ?: throw IllegalArgumentException("name 不能为空")

// 与 return / break 配合
fun getName(person: Person?): String {
    return person?.name ?: return "未知"
}
```

## 非空断言 !!

```java
// Java — 开发者自己保证不为 null
String name = nullableName;  // 可能为 null
name.length();               // 相信开发者不会传 null
```

```kotlin
// Kotlin — !! 告诉编译器"我确定不为 null"
val length = name!!.length  // 为 null 则抛 NPE

// 尽量避免使用 !!，可以改用:
val length = name?.length ?: 0           // 提供默认值
val nonNull = requireNotNull(name)       // 抛出 IllegalArgumentException
val nonNull = checkNotNull(name)         // 抛出 IllegalStateException
```

## 安全转换 as?

```java
// Java — 类型转换失败抛 ClassCastException
Object obj = "123";
Integer num = (Integer) obj;  // ❌ ClassCastException
```

```kotlin
// Kotlin — as? 安全转换，失败返回 null
val obj: Any = "123"
val num = obj as? Int          // null（不抛异常）
val str = obj as? String       // "123"
```

## 可空类型的集合

```kotlin
val list: List<Int?> = listOf(1, null, 3, null, 5)

// filterNotNull 过滤 null
val nonNull = list.filterNotNull()   // [1, 3, 5]

// 安全遍历
for (item in list) {
    item?.let { println(it) }  // 只打印非 null
}
```

## lateinit vs by lazy

| 特性 | lateinit | by lazy |
|------|----------|---------|
| 适用 | var 属性 | val 属性 |
| 类型 | 引用类型（非基本类型） | 任意类型 |
| 初始化时机 | 开发者手动赋值 | 第一次访问时自动初始化 |
| 线程安全 | 否 | 是（默认） |

```kotlin
class AppConfig {
    // lateinit — 稍后手动初始化
    lateinit var database: String

    // lazy — 第一次访问时自动初始化
    val config: String by lazy {
        loadConfig()
    }

    fun init() {
        database = "localhost:3306"
    }
}
```

## 最佳实践

```kotlin
// ✅ 优先用 ?. 代替 if != null
val len = str?.length ?: 0

// ✅ 用 let 处理非空
str?.let { process(it) }

// ✅ 用 ?: 提供默认值
val display = name ?: "默认"

// ✅ 用 as? 安全转换
val num = obj as? Int

// ❌ 避免使用 !!
// 改为 requireNotNull / checkNotNull
val nonNull = requireNotNull(name) { "name 不能为 null" }
```
