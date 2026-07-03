# 类

Kotlin 中的类使用 `class` 关键字声明，默认是 `public final` 的。Kotlin 提供了比 Java 更简洁的类声明方式——数据类、密封类、密封接口等都内置在语言中。

## 基本类声明

```kotlin
// 声明一个类（默认是 final 的，不可继承）
class Person(val name: String, var age: Int)

// 使用
val p = Person("Alice", 30)
println(p.name)  // 直接访问属性
```

## 继承

Kotlin 使用 `open` 关键字允许类被继承，使用 `:` 代替 Java 的 `extends`：

```kotlin
open class Shape

class Rectangle: Shape()
```

## Kotlin 扩展函数

Kotlin 允许在不修改原类的情况下为类添加新函数，这称为**扩展函数**。

```kotlin
open class Shape

class Rectangle: Shape()

fun Shape.getName() = "Shape"

fun Rectangle.getName() = "Rectangle"

fun printClassName(s: Shape) {
    println(s.getName())
}    

printClassName(Rectangle())  // 输出: Shape（静态分发）
fun main(arg:Array<String>){
    var rect=Rectangle()
    rect.getName()
}
```

> 注意：扩展函数是**静态分发**的，取决于变量的声明类型而非实际类型。

像 Compose 中的 `18.dp` 就是扩展属性的典型用法：

```kotlin
val Float.dp
  get() = TypedValue.applyDimension(
    TypedValue.COMPLEX_UNIT_DIP,
    this,
    Resources.getSystem().displayMetrics
  )

...

val RADIUS = 200f.dp
```

## 数据类

```kotlin
data class User(val name: String, val age: Int)
// 自动生成: equals(), hashCode(), toString(), copy(), componentN()
```

## 密封类

```kotlin
sealed class Result {
    data class Success(val data: String) : Result()
    data class Error(val message: String) : Result()
}
```

## 常用类特性速查

| 特性 | 关键字 | 说明 |
|------|--------|------|
| 继承 | `open` | 允许类被继承 |
| 抽象 | `abstract` | 抽象类，不能实例化 |
| 只读引用 | `val` | 不可变属性 |
| 可变引用 | `var` | 可变属性 |
| 延迟初始化 | `lateinit` | 稍后初始化非空属性 |
| 惰性初始化 | `by lazy` | 第一次访问时初始化 |
