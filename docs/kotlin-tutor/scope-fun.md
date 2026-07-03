# 作用域函数

> Kotlin 提供了 5 个作用域函数：`let`、`run`、`with`、`apply`、`also`。它们的作用是在对象的上下文中执行代码块，区别在于**上下文对象引用方式**和**返回值**。

## 快速对比

| 函数 | 上下文对象引用 | 返回值 | 适用场景 |
|------|---------------|--------|---------|
| **let** | `it` | Lambda 结果 | 非空检查、链式调用 |
| **run** | `this` | Lambda 结果 | 对象配置 + 计算结果 |
| **with** | `this` | Lambda 结果 | 对同一对象做多次操作 |
| **apply** | `this` | 对象自身 | 对象属性初始化 |
| **also** | `it` | 对象自身 | 副作用操作（日志、校验） |

## let

let 函数把当前对象作为闭包的 `it` 参数，返回值是函数里面最后一行，或者指定 return。

**适用场景**：非空安全调用、链式操作、局部变量限定作用域。

```kotlin
@Test
fun letFun(){
    val empty = "test".let {
        customPrint(it)
        it.isEmpty()
    }
    println(" is empty: $empty")
}
```

## run

run 函数类似于 apply 函数，但是 run 函数返回的是最后一行的值，上下文对象用 `this` 引用。

**适用场景**：对象配置 + 计算结果。

```kotlin
@Test
fun runFun(){
    fun getNullableLength(ns: String?) {
        println("for \"$ns\":")
        ns?.run {
            println("\tis empty? " + isEmpty())
            println("\tlength = $length")
            length
        }
    }
    getNullableLength(null)
    getNullableLength("")
    getNullableLength("some string with Kotlin")
}
```

## with

with 函数会把对象结构到上下文中，可以直接使用对象的属性。它不是扩展函数，而是将对象作为参数传入。

**适用场景**：对同一对象做多次操作，不需要返回值。

```kotlin
@Test
fun withFun(){
    val configuration = Configuration(host = "127.0.0.1", port = 9000)

    with(configuration) {
        println("with scope$host:$port")
    }

    // instead of:
    println("${configuration.host}:${configuration.port}")
}
```

## apply

apply 函数是指在函数块内可以通过 `this` 指代该对象，返回值为该对象自己。

**适用场景**：对象属性初始化（Builder 模式替代）。

```kotlin
@Test
fun applyFun(){
    val jake = Person()
    val stringDescription = jake.apply {
        name = "Jake"
        age = 30
    }.toString()
    println(stringDescription)
}
```

## also

also 对于执行一些将上下文对象作为参数的操作很有用。对于需要引用对象而不是其属性与函数的操作，或者不想屏蔽来自外部作用域的 `this` 引用时，请使用 also。

**适用场景**：日志、打印、断点调试、附加操作。

```kotlin
@Test
fun alsoFun(){
    val jake = Person("Jake", 30, "Android developer")
        .also {
            writeCreationLog(it)
        }
    println(jake)
}
```
