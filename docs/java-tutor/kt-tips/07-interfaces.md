# 接口与监听器

> Java → Kotlin 接口、匿名内部类、SAM 转换对比。

## 接口定义

```java
// Java
public interface OnClickListener {
    void onClick(View v);
}

// 实现接口
public class MyActivity extends Activity implements OnClickListener {
    @Override
    public void onClick(View v) {
        // ...
    }
}
```

```kotlin
// Kotlin
interface OnClickListener {
    fun onClick(v: View)
}

// 实现接口
class MyActivity : Activity, OnClickListener {
    override fun onClick(v: View?) {
        // ...
    }
}
```

## 匿名内部类（原有内容保留并完善）

这是 `java-tips` 中原有的示例，现在放入专题文件中：

### 监听器设置

```java
// Java — 匿名内部类
button.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        System.out.println("clicked");
    }
});

// Java 8 — Lambda 简化
button.setOnClickListener((v) -> {
    System.out.println("clicked");
});
```

```kotlin
// Kotlin — 匿名对象（object:）
button.setOnClickListener(object : View.OnClickListener {
    override fun onClick(v: View?) {
        println("clicked")
    }
})

// Kotlin — Lambda 简化（SAM 转换）
button.setOnClickListener {
    println("clicked")
}
```

### 带参数的回调

```java
// Java — 函数式接口
public interface Callback<T> {
    void onResult(T result);
    void onError(Throwable t);
}

api.fetchData(new Callback<Data>() {
    @Override
    public void onResult(Data result) {
        // handle
    }
    @Override
    public void onError(Throwable t) {
        // handle
    }
});
```

```kotlin
// Kotlin — 使用 Lambda 简化
// 定义：高阶函数
fun fetchData(onResult: (Data) -> Unit, onError: (Throwable) -> Unit) {
    // ...
}

// 调用
fetchData(
    onResult = { data -> /* handle */ },
    onError = { error -> /* handle */ }
)
```

## SAM 转换（Single Abstract Method）

Kotlin 自动支持 Java 接口的 SAM 转换：

```java
// Java 接口
public interface Runnable {
    void run();
}
```

```kotlin
// Kotlin — SAM 转换，可以用 Lambda 替代匿名对象
val executor = Executors.newSingleThreadExecutor()

// 匿名对象方式
executor.submit(object : Runnable {
    override fun run() {
        println("task")
    }
})

// Lambda 方式（SAM 转换）
executor.submit {
    println("task")
}
```

## Kotlin 接口特性

Kotlin 接口比 Java 接口更灵活，支持属性声明和默认实现：

```kotlin
interface Clickable {
    // 抽象方法
    fun click()

    // 默认实现（类似 Java 的 default 方法）
    fun showOff() = println("I'm clickable!")
}

// 属性可以在接口中声明
interface Focusable {
    val hasFocus: Boolean  // 抽象属性
    val priority: Int get() = 0  // 带默认实现的属性
}

class Button : Clickable, Focusable {
    override fun click() = println("Button clicked")
    override val hasFocus = false
}
```

## 函数式（SAM）接口

Kotlin 1.4+ 可以用 `fun interface` 声明函数式接口：

```kotlin
// 定义函数式接口（只能有一个抽象方法）
fun interface IntPredicate {
    fun accept(i: Int): Boolean
}

// 使用 Lambda
val isEven = IntPredicate { it % 2 == 0 }
println(isEven.accept(4))  // true
```

## 小结

| Java | Kotlin |
|------|--------|
| `new Interface() { ... }` | `object : Interface { ... }` |
| Lambda（Java 8+） | Lambda + SAM 转换 |
| `default` 方法 | 接口中直接写方法体 |
| 无 | `fun interface`（函数式接口） |
| 无 | 接口中声明属性 |
