---
title: "泛型"
order: 14
---

# 泛型

> 泛型（Generics）是 Java 5 引入的特性，允许在类、接口和方法中使用类型参数，实现类型安全的代码复用。

## 为什么需要泛型？

```java
// 没有泛型之前 — 需要强制转换，不安全
List list = new ArrayList();
list.add("Hello");
list.add(123);  // 可以添加任意类型

String str = (String) list.get(0);  // ✅
// String str2 = (String) list.get(1);  // ❌ ClassCastException（Integer 不能转 String）

// 使用泛型后 — 编译时类型检查
List<String> list = new ArrayList<>();
list.add("Hello");
// list.add(123);  // ❌ 编译错误，只能添加 String
String str = list.get(0);  // ✅ 不需要强制转换
```

## 泛型类

```java
// 定义泛型类 — T 是类型参数
public class Box<T> {
    private T content;

    public void set(T content) {
        this.content = content;
    }

    public T get() {
        return content;
    }
}

// 使用
Box<String> stringBox = new Box<>();
stringBox.set("Hello");
String str = stringBox.get();  // 不需要强制转换

Box<Integer> intBox = new Box<>();
intBox.set(123);
Integer num = intBox.get();

// 多个类型参数
public class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }
}

Pair<String, Integer> pair = new Pair<>("年龄", 25);
```

## 泛型接口

```java
// 定义泛型接口
public interface Repository<T> {
    T findById(Long id);
    void save(T entity);
    void delete(Long id);
}

// 实现时指定类型
public class UserRepository implements Repository<User> {
    @Override
    public User findById(Long id) {
        // 查询数据库...
        return new User(id, "张三");
    }

    @Override
    public void save(User user) {
        System.out.println("保存用户: " + user);
    }

    @Override
    public void delete(Long id) {
        System.out.println("删除用户: " + id);
    }
}
```

## 泛型方法

```java
public class GenericMethodDemo {

    // 泛型方法 — 类型参数在返回值之前声明
    public static <T> T getMiddle(T[] array) {
        return array[array.length / 2];
    }

    // 多个类型参数
    public static <T, U> T convert(U value, Class<T> targetType) {
        // 转换逻辑...
        return (T) value;
    }

    // 泛型方法 + 可变参数
    @SafeVarargs
    public static <T> List<T> asList(T... elements) {
        List<T> list = new ArrayList<>();
        for (T elem : elements) {
            list.add(elem);
        }
        return list;
    }
}

// 调用
String[] names = {"A", "B", "C", "D", "E"};
String middle = GenericMethodDemo.getMiddle(names);  // "C"

Integer[] numbers = {1, 2, 3, 4, 5};
Integer mid = GenericMethodDemo.getMiddle(numbers);  // 3

List<String> list = GenericMethodDemo.asList("A", "B", "C");
```

## 类型通配符 ?

```java
// 问题：以下方法只能接受 Box<Number>，不能接受 Box<Integer>
public void processNumber(Box<Number> box) { }

Box<Integer> intBox = new Box<>();
// processNumber(intBox);  // ❌ 编译错误

// 解决方案：使用通配符

// ? — 任意类型
public void processBox(Box<?> box) {
    Object content = box.get();
    // box.set(???);  // 不能写入（除了 null）
}

// ? extends T — 上限通配符（T 或 T 的子类）
public double sumOfNumbers(List<? extends Number> list) {
    double sum = 0;
    for (Number n : list) {
        sum += n.doubleValue();
    }
    return sum;
}

List<Integer> ints = Arrays.asList(1, 2, 3);
List<Double> doubles = Arrays.asList(1.5, 2.5, 3.5);
sumOfNumbers(ints);      // ✅
sumOfNumbers(doubles);   // ✅

// ? super T — 下限通配符（T 或 T 的父类）
public void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
    list.add(3);
}

List<Number> numbers = new ArrayList<>();
List<Object> objects = new ArrayList<>();
addNumbers(numbers);   // ✅
addNumbers(objects);   // ✅
// addNumbers(ints);   // ❌ List<Integer> 不是 List<? super Integer>
```

### 通配符使用原则（PECS）

> **Producer Extends, Consumer Super** — 生产者用 extends，消费者用 super。

```java
// 生产者 — 只读数据（使用 extends）
public void readAll(List<? extends Number> producer) {
    for (Number n : producer) {  // ✅ 可以读取
        System.out.println(n);
    }
    // producer.add(1);  // ❌ 不能写入
}

// 消费者 — 只写数据（使用 super）
public void writeAll(List<? super Integer> consumer) {
    consumer.add(1);  // ✅ 可以写入
    consumer.add(2);
    // Integer i = consumer.get(0);  // ❌ 读取不安全（可能是 Object）
}
```

## 类型擦除

泛型信息在**编译后**被擦除（Type Erasure），运行时不存在泛型信息：

```java
List<String> stringList = new ArrayList<>();
List<Integer> integerList = new ArrayList<>();

System.out.println(stringList.getClass() == integerList.getClass());  // true
// 运行时都是 ArrayList.class

// 擦除规则
// Box<T> → Box（T 被替换为 Object 或边界类型）
// Box<T extends Number> → Box（T 被替换为 Number）
```

### 桥方法

```java
// 由于类型擦除，编译器可能生成桥方法来保持多态
public class MyList extends ArrayList<String> {
    @Override
    public String get(int index) {
        return super.get(index).toUpperCase();
    }

    // 编译器生成的桥方法（隐藏）
    // public Object get(int index) {
    //     return (String) this.get(index);
    // }
}
```

## 泛型的限制

```java
// 1. 不能使用基本类型作为类型参数
// Box<int> box;  // ❌
Box<Integer> box;  // ✅ 必须用包装类

// 2. 不能创建泛型数组
// T[] array = new T[10];  // ❌

// 3. 不能在静态上下文中使用类的类型参数
public class GenericClass<T> {
    // private static T instance;  // ❌
    // public static void method(T t) { }  // ❌
}

// 4. 不能使用 instanceof
// if (box instanceof Box<String>) { }  // ❌ 运行时已被擦除

// 5. 不能使用 new T()
// public T create() { return new T(); }  // ❌
```

## 泛型最佳实践

```java
// 1. 使用有意义的类型参数名
// E — Element（集合元素）
// K — Key（键）
// V — Value（值）
// N — Number（数字）
// T — Type（类型）
// S, U, V — 第二、三、四个类型

// 2. 优先使用泛型方法
public class Utils {
    // ✅ 泛型方法，而不是将整个类泛型化
    public static <T> T requireNonNull(T obj) {
        if (obj == null) throw new NullPointerException();
        return obj;
    }
}

// 3. 使用边界通配符增加灵活性
// ✅ 推荐
public void process(List<? extends Comparable> list) { }
// ❌ 不灵活
public void process(List<Comparable> list) { }
```

## 练习

```java
// 1. 实现一个通用的缓存类
public class Cache<K, V> {
    private Map<K, V> map = new HashMap<>();

    public void put(K key, V value) {
        map.put(key, value);
    }

    public V get(K key) {
        return map.get(key);
    }

    public int size() {
        return map.size();
    }
}

// 使用
Cache<String, User> userCache = new Cache<>();
userCache.put("user:1", new User(1L, "张三"));
User user = userCache.get("user:1");

// 2. 通用的最大值查找方法
public static <T extends Comparable<T>> T max(T[] array) {
    if (array == null || array.length == 0) return null;
    T max = array[0];
    for (T item : array) {
        if (item.compareTo(max) > 0) {
            max = item;
        }
    }
    return max;
}

Integer[] nums = {1, 5, 3, 9, 2};
System.out.println(max(nums));  // 9

String[] names = {"Alice", "Bob", "Charlie"};
System.out.println(max(names));  // "Charlie"（按字母序）
```
