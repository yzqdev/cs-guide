# 从 Java 到 Kotlin

> 如果你熟悉 Java，下面的对照表可以帮你快速上手 Kotlin。Kotlin 的设计目标之一就是"对 Java 开发者友好"。

## Java 与 Kotlin 语法对照

| Java | Kotlin | 说明 |
|------|--------|------|
| `String name = "Hello";` | `var name = "Hello"` | 可变变量 |
| `final String name = "Hello";` | `val name = "Hello"` | 不可变变量 |
| `String` | `String?` | 可空类型 |
| `if (x != null) { ... }` | `x?.let { ... }` | 安全调用 |
| `public class Main { ... }` | `class Main { ... }` | Kotlin 默认 public |
| `new ArrayList<String>()` | `listOf<String>()` | 集合创建 |
| `@Override` | `override` | 方法重写 |
| `switch (x) { ... }` | `when (x) { ... }` | 分支匹配 |
| `String.format(...)` | `"... $var"` | 字符串模板 |
| `System.out.println()` | `println()` | 打印输出 |
| `boolean` | `Boolean` | 布尔类型 |
| `int` | `Int` | 整数类型 |
| `extends` | `:` | 继承 |
| `implements` | `:` | 实现接口 |
| `static` | `companion object` | 伴生对象 |
| `try-with-resources` | `use {}` | 自动资源管理 |
| `stream().map().filter()` | `.map { }.filter { }` | 链式操作 |

## 快速转换示例

### POJO 类

```java
// Java
public class User {
    private String name;
    private int age;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}
```

```kotlin
// Kotlin
data class User(var name: String, var age: Int)
```

### 单例

```java
// Java
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
// Kotlin
object Singleton
```

### 工具类

```java
// Java
public final class StringUtils {
    private StringUtils() {}
    public static boolean isEmpty(String s) {
        return s == null || s.isEmpty();
    }
}
```

```kotlin
// Kotlin（顶层函数，无需类包装）
fun String?.isEmpty(): Boolean = this == null || this.isEmpty()
```

## Kotlin 没有的东西

| Java 有 | Kotlin 替代 |
|---------|-----------|
| `static` 关键字 | `companion object` / 顶层函数 |
| `new` 关键字 | 直接调用构造函数 |
| 三元运算符 `a ? b : c` | `if (a) b else c`（if 是表达式） |
| 通配符 `? extends T` | `out T`（声明处型变） |
| 受检异常（checked exception） | 没有受检异常 |
| `break` / `continue`（在 Lambda 中） | 用 `forEach` 中的 `return@label` |
