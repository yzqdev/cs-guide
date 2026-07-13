# Optional 用法

> Optional 是 Java 8 引入的容器类，用于优雅地处理可能为 null 的值，从而避免 NullPointerException。

## 1. 简介

Optional 是 `java.util` 包的一部分，引入它的主要目的是为使用可选值代替 `null` 提供类型级解决方案。

```java
import java.util.Optional;
```

## 2. 创建 Optional 对象

### 创建空 Optional

```java
Optional<Object> empty = Optional.empty();
assertFalse(empty.isPresent());
```

### 使用 of 创建（值不能为 null）

```java
String val = "not null";
Optional<String> hasVal = Optional.of(val);
assertTrue(hasVal.isPresent());

// 传入 null 会抛出 NullPointerException
String val = null;
Optional<String> hasVal = Optional.of(val); // 抛出异常
```

### 使用 ofNullable 创建（值可以为 null）

```java
String val = null;
Optional<String> hasVal = Optional.ofNullable(val);
assertFalse(hasVal.isPresent());
```

## 3. 检查值是否存在

### isPresent() — Java 8+

```java
Optional<String> opt = Optional.of("has value");
assertTrue(opt.isPresent());

opt = Optional.ofNullable(null);
assertFalse(opt.isPresent());
```

### isEmpty() — Java 11+

```java
Optional<String> opt = Optional.of("has value");
assertFalse(opt.isEmpty());

opt = Optional.ofNullable(null);
assertTrue(opt.isEmpty());
```

## 4. 使用 ifPresent() 进行条件处理

当值存在时执行指定的操作：

```java
Optional<String> opt = Optional.of("baeldung");
opt.ifPresent(name -> System.out.println(name.length()));
```

对比传统判空写法：

```java
// 传统写法
if (name != null) {
    System.out.println(name.length());
}

// Optional 写法
Optional.ofNullable(name).ifPresent(n -> System.out.println(n.length()));
```

## 5. 获取封装的值

### orElse — 提供默认值

当 Optional 为空时返回默认值：

```java
Optional<String> hasVal = Optional.of("Hello");
String val = hasVal.orElse("no value");       // "Hello"

Optional<String> noVal = Optional.empty();
String defaultVal = noVal.orElse("default");  // "default"
```

### orElseGet — 使用 Supplier 提供默认值

```java
Optional<String> hasVal = Optional.of("Hello");
String val = hasVal.orElseGet(() -> "no value");  // "Hello"

Optional<String> noVal = Optional.empty();
String defaultVal = noVal.orElseGet(() -> "default");  // "default"
```

### orElse 与 orElseGet 的区别

**关键区别：** 当 Optional 有值时，`orElse` 仍然会执行获取默认值的操作（即使不需要），而 `orElseGet` 不会。

```java
private String getDefaultValue() {
    System.out.println("enter method get default value");
    try {
        TimeUnit.SECONDS.sleep(5);  // 模拟耗时操作
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return "default value";
}

@Test
public void test_difference() {
    Optional<String> hasVal = Optional.of("value");
    
    System.out.println("enter orElse method");
    String var0 = hasVal.orElse(getDefaultValue());  // 会执行 getDefaultValue()
    
    System.out.println("enter orElseGet method");
    String var1 = hasVal.orElseGet(this::getDefaultValue);  // 不会执行
}

// 输出：
// enter orElse method
// enter method get default value
// enter orElseGet method
```

:::tip
为了更好的性能，优先使用 `orElseGet` 获取 Optional 的值。
:::

### orElseThrow — 抛异常

```java
String nullName = null;
String name = Optional.ofNullable(nullName)
    .orElseThrow(IllegalArgumentException::new);
```

### get() — 不推荐使用

`get()` 在 Optional 为空时会抛出 `NoSuchElementException`，与 Optional 的设计目标相悖，未来可能被废弃。

```java
Optional<String> opt = Optional.of("value");
String name = opt.get();  // "value"

Optional<String> empty = Optional.empty();
empty.get();  // 抛出 NoSuchElementException
```

:::warning
**不要使用 `get()`**，应优先使用 `orElse`、`orElseGet` 或 `orElseThrow`。
:::

## 6. 使用 filter() 进行过滤

根据某个规则对 Optional 封装的值进行测试：

```java
Optional<Integer> passTest = Optional.of(101);
assertTrue(passTest.filter(i -> i > 100).isPresent());

Optional<Integer> notPassTest = Optional.of(99);
assertFalse(notPassTest.filter(i -> i > 100).isPresent());
```

### 实际应用：价格检查

```java
public class Phone {
    private Double price;
    // getter / setter
}

// 传统方式
public boolean checkPriceWithoutOptional(Phone phone) {
    boolean isInRange = false;
    if (phone != null && phone.getPrice() != null
            && phone.getPrice() >= 3000
            && phone.getPrice() <= 5000) {
        isInRange = true;
    }
    return isInRange;
}

// Optional 方式（更优雅）
public boolean checkPriceWithOptional(Phone phone) {
    return Optional.ofNullable(phone)
            .map(Phone::getPrice)
            .filter(p -> p >= 3000)
            .filter(p -> p <= 5000)
            .isPresent();
}
```

## 7. 使用 map() 进行值变换

对 Optional 封装的值进行变换并返回新的 Optional：

```java
List<String> companyNames = Arrays.asList("Java", "C++", "Python");
Optional<List<String>> listOptional = Optional.of(companyNames);

int size = listOptional
        .map(List::size)
        .orElse(0);
assertEquals(3, size);
```

链式调用 map 和 filter：

```java
String password = " password ";
Optional<String> passOpt = Optional.of(password);

// 先 trim 再校验
boolean correct = passOpt
        .map(String::trim)
        .filter(pass -> pass.equals("password"))
        .isPresent();
assertTrue(correct);
```

## 8. 使用 flatMap() 进行值变换

`flatMap` 与 `map` 的区别：`flatMap` 在处理值之前先进行"去封装"操作，避免嵌套的 `Optional<Optional<T>>`。

```java
public class Person {
    private String name;
    public Optional<String> getName() {
        return Optional.ofNullable(name);
    }
}

Person person = new Person("john", 26, "pwd");
Optional<Person> personOptional = Optional.of(person);

// 使用 map — 得到 Optional<Optional<String>>
Optional<Optional<String>> nameWrapper = personOptional.map(Person::getName);
String name1 = nameWrapper.orElseThrow(...).orElse("");

// 使用 flatMap — 直接得到 Optional<String>
String name = personOptional
        .flatMap(Person::getName)
        .orElse("");
```

## 9. 总结

- 使用 `Optional` 代替显式的 `null` 检查，使代码更健壮
- 优先使用 `orElseGet` 而非 `orElse`（避免不必要的默认值计算）
- 避免使用 `get()`，优先使用 `orElse` / `orElseGet` / `orElseThrow`
- `map` 和 `flatMap` 的区别在于是否"去封装"
