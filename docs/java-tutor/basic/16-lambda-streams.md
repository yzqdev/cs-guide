# Lambda 表达式与 Stream API

> Lambda 表达式（Java 8+）让 Java 支持函数式编程，Stream API 提供一套高效的数据处理管道。

## Lambda 表达式

### 为什么需要 Lambda？

```java
// 没有 Lambda — 匿名内部类
button.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        System.out.println("点击了按钮");
    }
});

// 使用 Lambda — 代码简洁
button.setOnClickListener(v -> System.out.println("点击了按钮"));
```

### 语法

```
(参数列表) -> { 方法体 }
```

```java
// 无参数
() -> System.out.println("Hello")

// 一个参数（可以省略括号）
x -> x * 2

// 多个参数
(x, y) -> x + y

// 带方法体
(String s) -> {
    System.out.println(s);
    return s.length();
}
```

### 函数式接口

函数式接口是**只有一个抽象方法**的接口，可以使用 `@FunctionalInterface` 注解：

```java
@FunctionalInterface
public interface Runnable {
    void run();
}

@FunctionalInterface
public interface Comparator<T> {
    int compare(T o1, T o2);
}
```

### Java 内置的函数式接口

| 接口 | 参数 | 返回值 | 示例 |
|------|------|--------|------|
| `Predicate<T>` | T | `boolean` | `s -> s.isEmpty()` |
| `Consumer<T>` | T | `void` | `s -> System.out.println(s)` |
| `Function<T, R>` | T | R | `s -> s.length()` |
| `Supplier<T>` | 无 | T | `() -> Math.random()` |
| `UnaryOperator<T>` | T | T | `x -> x * 2` |
| `BinaryOperator<T>` | (T, T) | T | `(a, b) -> a + b` |

```java
// Predicate — 判断
Predicate<String> isEmpty = s -> s.isEmpty();
System.out.println(isEmpty.test(""));  // true

// Consumer — 消费
Consumer<String> printer = s -> System.out.println(s);
printer.accept("Hello");  // Hello

// Function — 转换
Function<String, Integer> lengthFunc = s -> s.length();
System.out.println(lengthFunc.apply("Hello"));  // 5

// Supplier — 提供
Supplier<Double> random = () -> Math.random();
System.out.println(random.get());  // 随机数
```

### 方法引用

Lambda 的简化写法，用于直接引用已有方法：

```java
// 静态方法引用
Consumer<String> printer = System.out::println;  // s -> System.out.println(s)

// 实例方法引用
List<String> list = Arrays.asList("A", "B", "C");
list.forEach(System.out::println);

// 对象的实例方法引用
String prefix = ">> ";
list.forEach(prefix::concat);

// 构造方法引用
Supplier<List<String>> listSupplier = ArrayList::new;  // () -> new ArrayList<>()

// 任意对象的实例方法引用
list.sort(String::compareToIgnoreCase);  // (s1, s2) -> s1.compareToIgnoreCase(s2)
```

## Stream API

Stream 代表数据流，支持链式操作（流水线处理）。

### 创建 Stream

```java
// 从集合
List<String> list = Arrays.asList("A", "B", "C");
Stream<String> stream = list.stream();
Stream<String> parallelStream = list.parallelStream();  // 并行流

// 从数组
Stream<String> arrayStream = Arrays.stream(new String[]{"A", "B", "C"});

// 直接创建
Stream<String> ofStream = Stream.of("A", "B", "C");
Stream<Integer> iterateStream = Stream.iterate(0, n -> n + 1);  // 无限流
Stream<Double> generateStream = Stream.generate(Math::random);  // 无限流

// 范围
IntStream intStream = IntStream.range(1, 10);  // [1, 10)
IntStream intStreamClosed = IntStream.rangeClosed(1, 10);  // [1, 10]
```

### 中间操作（返回 Stream）

```java
List<String> list = Arrays.asList("Apple", "Banana", "Cherry", "Apple");

// filter — 过滤
list.stream()
    .filter(s -> s.startsWith("A"))
    .forEach(System.out::println);  // Apple, Apple

// map — 转换
list.stream()
    .map(String::toUpperCase)
    .forEach(System.out::println);  // APPLE, BANANA, CHERRY, APPLE

// flatMap — 扁平化
List<List<String>> nested = Arrays.asList(
    Arrays.asList("A", "B"),
    Arrays.asList("C", "D")
);
nested.stream()
    .flatMap(Collection::stream)
    .forEach(System.out::println);  // A, B, C, D

// distinct — 去重
list.stream()
    .distinct()
    .forEach(System.out::println);  // Apple, Banana, Cherry

// sorted — 排序
list.stream()
    .sorted()
    .forEach(System.out::println);

// limit / skip — 截取
list.stream()
    .skip(1)     // 跳过第一个
    .limit(2)    // 取两个
    .forEach(System.out::println);  // Banana, Cherry

// peek — 调试用（查看中间结果）
list.stream()
    .peek(s -> System.out.println("处理前: " + s))
    .map(String::toUpperCase)
    .peek(s -> System.out.println("处理后: " + s))
    .toList();
```

### 终端操作（产生结果）

```java
List<String> list = Arrays.asList("Apple", "Banana", "Cherry");

// forEach — 遍历
list.stream().forEach(System.out::println);

// collect — 收集到集合
List<String> newList = list.stream()
    .filter(s -> s.length() > 5)
    .collect(Collectors.toList());  // [Banana, Cherry]

Set<String> set = list.stream().collect(Collectors.toSet());
String joined = list.stream().collect(Collectors.joining(", "));  // "Apple, Banana, Cherry"

// toList() — Java 16+ 快捷方法
List<String> result = list.stream().filter(s -> s.length() > 5).toList();

// toMap
Map<String, Integer> map = list.stream()
    .collect(Collectors.toMap(s -> s, String::length));

// 分组
Map<Integer, List<String>> groupedByLength = list.stream()
    .collect(Collectors.groupingBy(String::length));
// {5=[Apple], 6=[Banana, Cherry]}

// reduce — 归约
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
int sum = numbers.stream().reduce(0, Integer::sum);      // 15
int product = numbers.stream().reduce(1, (a, b) -> a * b); // 120

// count — 计数
long count = list.stream().filter(s -> s.contains("e")).count();  // 3

// anyMatch / allMatch / noneMatch
boolean anyMatch = list.stream().anyMatch(s -> s.startsWith("A"));  // true
boolean allMatch = list.stream().allMatch(s -> s.length() >= 5);    // true
boolean noneMatch = list.stream().noneMatch(s -> s.isEmpty());      // true

// findFirst / findAny
Optional<String> first = list.stream().filter(s -> s.length() > 5).findFirst();
first.ifPresent(System.out::println);  // Banana

// min / max
Optional<String> max = list.stream().max(String::compareTo);
```

### Optional

`Optional` 是一个容器，用于优雅地处理可能为 null 的值。

```java
// 创建
Optional<String> empty = Optional.empty();
Optional<String> nonNull = Optional.of("Hello");     // 值不能为 null
Optional<String> nullable = Optional.ofNullable(null); // 值可以为 null

// 检查
nonNull.isPresent();   // true
empty.isEmpty();       // true (Java 11+)

// 获取（推荐使用 orElse 系列）
String result = nullable.orElse("默认值");             // 提供默认值
String result2 = nullable.orElseGet(() -> "默认值");   // Supplier 提供
String result3 = nullable.orElseThrow(IllegalArgumentException::new);  // 抛异常

// 不推荐使用 get()
// nullable.get();  // 值为 null 时抛 NoSuchElementException

// 条件处理
nonNull.ifPresent(s -> System.out.println(s));  // 值存在时执行

// 转换
int length = nonNull.map(String::length).orElse(0);  // 5

// 过滤
nonNull.filter(s -> s.length() > 3).ifPresent(System.out::println);
```

## 完整示例

```java
public class LambdaStreamDemo {
    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
            new Person("张三", 25, "北京"),
            new Person("李四", 30, "上海"),
            new Person("王五", 20, "北京"),
            new Person("赵六", 35, "广州")
        );

        // 找出北京地区、年龄大于 20 的人，按年龄排序，只取名字
        List<String> result = people.stream()
            .filter(p -> "北京".equals(p.getCity()))
            .filter(p -> p.getAge() > 20)
            .sorted(Comparator.comparing(Person::getAge))
            .map(Person::getName)
            .collect(Collectors.toList());

        System.out.println(result);  // [张三]

        // 按城市分组
        Map<String, List<Person>> byCity = people.stream()
            .collect(Collectors.groupingBy(Person::getCity));

        // 统计平均年龄
        double avgAge = people.stream()
            .mapToInt(Person::getAge)
            .average()
            .orElse(0);

        System.out.printf("平均年龄: %.1f%n", avgAge);  // 27.5
    }
}
```

## 练习

```java
// 1. 用 Stream 处理数字
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// 过滤偶数、平方、求和
int sum = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .reduce(0, Integer::sum);
System.out.println(sum);  // 220 (4+16+36+64+100)

// 2. 找出最长字符串
List<String> words = Arrays.asList("Java", "Python", "Kotlin", "JavaScript");
String longest = words.stream()
    .max(Comparator.comparing(String::length))
    .orElse("");
System.out.println(longest);  // JavaScript

// 3. 自定义 Lambda：列表转 Map
List<String> fruits = Arrays.asList("apple", "banana", "cherry");
Map<String, Integer> fruitMap = fruits.stream()
    .collect(Collectors.toMap(
        Function.identity(),   // key: 字符串本身
        String::length,        // value: 字符串长度
        (v1, v2) -> v1         // 冲突处理
    ));
System.out.println(fruitMap);  // {apple=5, banana=6, cherry=6}
```
