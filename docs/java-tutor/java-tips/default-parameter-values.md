# Java 是否支持默认的参数值？

> Java 不支持方法参数的默认值，但有多种替代方案可以实现类似效果。

在 C++ 中，常见到如下的方法定义（`param3` 默认为 `false`）：

```cpp
void MyParameterizedFunction(String param1, int param2, bool param3=false);
```

那在 Java 中，是否也支持这样的定义方式？

**答案是否定的**，不过我们可以通过多种方式处理这种参数默认值的情况。

---

## Builder 模式

使用创建者模式，你可以设定部分参数有默认值，部分参数是可选的：

```java
Student s1 = new StudentBuilder().name("Eli").buildStudent();
Student s2 = new StudentBuilder()
                 .name("Spicoli")
                 .age(16)
                 .motto("Aloha, Mr Hand")
                 .buildStudent();
```

## 方法（构造函数）重载

```java
void foo(String a, Integer b) {
    //...
}

void foo(String a) {
    foo(a, 0); // 0 是 b 的默认值
}

foo("a", 2);
foo("a");
```

构造函数重载比较适合参数较少的情况；当参数较多时，可考虑使用静态工厂方法或参数辅助对象。

## 传递 null

当有多个默认参数时，可以传递 `null`，方法内将 `null` 替换为默认值：

```java
void foo(String a, Integer b, Integer c) {
    b = b != null ? b : 0;
    c = c != null ? c : 0;
    //...
}

foo("a", null, 2);
```

## 可变参数（Varargs）

当有多个参数，且某些参数可以忽略不设置的情况下，可以考虑使用可变参数。

### 可选参数类型一致

```java
void foo(String a, Integer... b) {
    Integer b1 = b.length > 0 ? b[0] : 0;
    Integer b2 = b.length > 1 ? b[1] : 0;
    //...
}

foo("a");
foo("a", 1, 2);
```

### 可选参数类型不一致

```java
void foo(String a, Object... b) {
    Integer b1 = 0;
    String b2 = "";
    if (b.length > 0) {
        if (!(b[0] instanceof Integer)) { 
            throw new IllegalArgumentException("...");
        }
        b1 = (Integer) b[0];
    }
    if (b.length > 1) {
        if (!(b[1] instanceof String)) { 
            throw new IllegalArgumentException("...");
        }
        b2 = (String) b[1];
        //...
    }
    //...
}

foo("a");
foo("a", 1);
foo("a", 1, "b2");
```

## 使用 Map 作为参数

当参数很多且大部分使用默认值时，可以使用 `Map`：

```java
void foo(Map<String, Object> parameters) {
    String a = ""; 
    Integer b = 0;
    if (parameters.containsKey("a")) { 
        if (!(parameters.get("a") instanceof String)) { 
            throw new IllegalArgumentException("...");
        }
        a = (String) parameters.get("a");
    }
    if (parameters.containsKey("b")) { 
        //... 
    }
    //...
}

foo(ImmutableMap.<String, Object>of(
    "a", "a",
    "b", 2, 
    "d", "value")); 
```

---

参考：[StackOverflow: Does Java support default parameter values?](https://stackoverflow.com/questions/997482/does-java-support-default-parameter-values)
