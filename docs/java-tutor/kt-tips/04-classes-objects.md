# 类与对象

> Java → Kotlin 类、数据类、单例、伴生对象对比。

## class — 类声明

```java
// Java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}
```

```kotlin
// Kotlin — 主构造函数声明在类头
class Person constructor(name: String, age: Int) {
    var name: String = name
        get() = field.uppercase()   // 自定义 getter
        set(value) {
            field = value.trim()    // 自定义 setter
        }
    var age: Int = age
}

// constructor 关键字可省略
class Person(name: String, age: Int) {
    var name = name
    var age = age
}
```

## data class — 数据类

```java
// Java — 需要手写 equals/hashCode/toString/getter/setter
public class User {
    private String name;
    private int age;
    // 需要 IDE 生成或手动写一整套
}
```

```kotlin
// Kotlin — data class 自动生成所有
data class User(val name: String, var age: Int)
// 自动生成: toString(), equals(), hashCode(), copy(), componentN()

fun main() {
    val user = User("张三", 25)
    println(user)                   // User(name=张三, age=25)
    
    // copy — 复制并修改部分字段
    val older = user.copy(age = 30)
    
    // 解构声明
    val (name, age) = user
    println("$name, $age")
}
```

### 解构声明

```kotlin
data class Point(val x: Int, val y: Int)

val point = Point(10, 20)
val (x, y) = point      // 解构
println("x=$x, y=$y")

// 可用于遍历
val points = listOf(Point(1,2), Point(3,4))
for ((x, y) in points) {
    println("$x, $y")
}
```

## object — 单例

```java
// Java — 单例模式
public class Singleton {
    private static Singleton instance;
    private Singleton() {}
    public static Singleton getInstance() {
        if (instance == null) instance = new Singleton();
        return instance;
    }
}
```

```kotlin
// Kotlin — object 关键字，天生单例
object Singleton {
    fun doSomething() {
        println("Singleton method")
    }
}

// 直接使用
Singleton.doSomething()
```

## companion object — 伴生对象

Kotlin 没有 `static` 关键字，用 `companion object` 替代：

```java
// Java
public class MathUtils {
    public static final double PI = 3.14159;
    public static int add(int a, int b) {
        return a + b;
    }
}
double pi = MathUtils.PI;
int sum = MathUtils.add(1, 2);
```

```kotlin
// Kotlin — companion object
class MathUtils {
    companion object {
        const val PI = 3.14159
        fun add(a: Int, b: Int) = a + b
    }
}

val pi = MathUtils.PI
val sum = MathUtils.add(1, 2)
```

### 伴生对象可以有名字，可以实现接口

```kotlin
class MyClass {
    companion object Factory : Runnable {
        override fun run() {
            println("companion run")
        }
        fun create(): MyClass = MyClass()
    }
}

MyClass.create()
MyClass.Factory.run()
```

## 继承

```java
// Java
public class Animal {
    public void speak() { }
}

public class Dog extends Animal {
    @Override
    public void speak() {
        System.out.println("Woof");
    }
}
```

```kotlin
// Kotlin — 默认 final，需要 open 才能继承
open class Animal {
    open fun speak() { }
}

class Dog : Animal() {
    override fun speak() {
        println("Woof")
    }
}
```

| Java | Kotlin |
|------|--------|
| `extends` | `:` |
| `@Override` | `override`（关键字，非注解）|
| 默认可继承 | 默认 `final`，需加 `open` |
| 无 | `data class` |
| 无 | `object` 单例 |
| `static` | `companion object` |

## 小结代码

```kotlin
// 一个演示各种特性的综合示例
data class Product(
    val id: Long,
    var name: String,
    var price: Double = 0.0
)

object ProductRepository {
    private val products = mutableListOf<Product>()

    fun add(product: Product) {
        products.add(product)
    }

    fun findAll(): List<Product> = products.toList()
}

// 顶层函数（替代 Java 的静态工具方法）
fun Product.applyDiscount(discount: Double) = copy(price = price * (1 - discount))

fun main() {
    val phone = Product(1L, "手机", 4999.0)
    ProductRepository.add(phone)
    
    val discounted = phone.applyDiscount(0.1)
    println(discounted)  // Product(id=1, name=手机, price=4499.1)
}
```
