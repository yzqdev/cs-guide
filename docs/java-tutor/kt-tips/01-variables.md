# 变量声明与类型系统

> Java → Kotlin 变量与基本类型对比。

## val 与 var

| Java | Kotlin |
|------|--------|
| `String name = "Hello";` | `var name = "Hello"` |
| `final String name = "Hello";` | `val name = "Hello"` |

```kotlin
// val — 不可变引用（类似 final），推荐优先使用
val name = "张三"
// name = "李四"  // ❌ 编译错误

// var — 可变引用
var age = 25
age = 26  // ✅ 可以修改
```

## 类型推断

Kotlin 支持自动类型推断，大部分情况下无需显式声明类型：

```kotlin
val message = "Hello"          // String
val count = 42                 // Int
val price = 19.99              // Double
val isActive = true            // Boolean
```

也可以显式指定类型：

```kotlin
val str: String = "Hello"
val num: Int = 42
```

## 基本数据类型对比

| Java | Kotlin | 说明 |
|------|--------|------|
| `int` | `Int` | 32 位整数 |
| `long` | `Long` | 64 位整数 |
| `float` | `Float` | 32 位浮点 |
| `double` | `Double` | 64 位浮点 |
| `boolean` | `Boolean` | 布尔值 |
| `char` | `Char` | 字符 |
| `byte` | `Byte` | 8 位字节 |
| `short` | `Short` | 16 位整数 |

Kotlin 中所有类型都是对象，没有 Java 的原始类型（primitive type），但在运行时仍会优化为原生类型。

### 数字字面量

```kotlin
val l = 9_223_372_036_854_775_807L    // Long，下划线分隔
val f = 3.14F                          // Float
val hex = 0xFF                         // 十六进制
val bin = 0b1010                       // 二进制
```

### 显式类型转换

Kotlin **没有**隐式类型转换，必须显式调用：

```java
// Java — 隐式转换
int x = 42;
long y = x;  // ✅
```

```kotlin
// Kotlin — 必须显式转换
val x: Int = 42
val y: Long = x.toLong()
val z: Double = x.toDouble()
// val y: Long = x  // ❌ 编译错误
```

## 字符串模板

Java 使用 `String.format()` 或拼接，Kotlin 使用 `$` 表达式：

```java
// Java
String name = "张三";
int age = 25;
String msg = String.format("我叫%s，今年%d岁", name, age);
```

```kotlin
// Kotlin — 字符串模板
val name = "张三"
val age = 25
println("我叫${name}，今年${age}岁")    // 表达式用 {}
println("我的名字是$name")              // 单个变量可省略 {}
println("明年${age + 1}岁")             // 可以写任意表达式
```

### 多行字符串

```kotlin
val text = """
    第一行
    第二行
    第三行
""".trimIndent()

// 带前缀
val text2 = """
    |第一行
    |第二行
""".trimMargin()
```

## 数组

```java
// Java
int[] arr = {1, 2, 3};
String[] strArr = {"A", "B", "C"};
```

```kotlin
// Kotlin
val arr = intArrayOf(1, 2, 3)       // 基本类型数组
val strArr = arrayOf("A", "B", "C")  // 对象数组
val empty = emptyArray<String>()     // 空数组

// 访问和修改
println(arr[0])   // 1
arr[0] = 99

// 遍历
for (item in arr) println(item)
arr.forEach { println(it) }
```

## 区间（Range）

Kotlin 提供了简洁的区间语法，Java 没有直接等价的方式：

```kotlin
for (i in 1..5) print(i)         // 12345  — 闭区间
for (i in 1 until 5) print(i)    // 1234   — 半开区间
for (i in 5 downTo 1) print(i)   // 54321  — 倒序
for (i in 1..10 step 2) print(i) // 13579  — 步进

// 判断是否在区间内
val x = 5
println(x in 1..10)   // true
```

## 类型别名

```kotlin
typealias UserId = Long
typealias Callback = (Int) -> Unit

val id: UserId = 10001L
```

## 类型检查与智能转换

```java
// Java — 必须显式强制转换
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}
```

```kotlin
// Kotlin — is 检查后自动智能转换
if (obj is String) {
    println(obj.length)  // 自动转换为 String，无需显式强转
}

when (obj) {
    is String -> println(obj.length)
    is Int -> println(obj + 1)
}
```
