# 泛型

> 泛型（Generic）即"参数化类型"，允许在类、接口和方法中使用类型参数，实现类型安全的代码复用。

## 1. 什么是泛型？

泛型，即"参数化类型"。一提到参数，最熟悉的就是定义方法时有形参，然后调用此方法时传递实参。参数化类型怎么理解呢？顾名思义，就是将类型由原来的具体的类型参数化，类似于方法中的变量参数，此时类型也定义成参数形式（可以称之为类型形参），然后在使用/调用时传入具体的类型（类型实参）。

**泛型的本质是为了参数化类型**（在不创建新的类型的情况下，通过泛型指定的不同类型来控制形参具体限制的类型）。也就是说在泛型使用过程中，操作的数据类型被指定为一个参数，这种参数类型可以用在类、接口和方法中，分别被称为泛型类、泛型接口、泛型方法。

## 2. 一个栗子

```java
List arrayList = new ArrayList();
arrayList.add("aaaa");
arrayList.add(100);

for (int i = 0; i < arrayList.size(); i++) {
    String item = (String) arrayList.get(i);
    Log.d("泛型测试", "item = " + item);
}
```

毫无疑问，程序的运行结果会以崩溃结束：

```java
java.lang.ClassCastException: java.lang.Integer cannot be cast to java.lang.String
```

ArrayList 可以存放任意类型，例子中添加了一个 String 类型，添加了一个 Integer 类型，再使用时都以 String 的方式使用，因此程序崩溃了。为了解决类似这样的问题（在编译阶段就可以解决），泛型应运而生：

```java
List<String> arrayList = new ArrayList<String>();
// arrayList.add(100);  // 编译阶段就会报错
```

## 3. 特性

**泛型只在编译阶段有效。** 看下面的代码：

```java
List<String> stringArrayList = new ArrayList<String>();
List<Integer> integerArrayList = new ArrayList<Integer>();

Class classStringArrayList = stringArrayList.getClass();
Class classIntegerArrayList = integerArrayList.getClass();

if (classStringArrayList.equals(classIntegerArrayList)) {
    Log.d("泛型测试", "类型相同");
}
```

输出结果：`D/泛型测试: 类型相同`

通过上面的例子可以证明，在编译之后程序会采取去泛型化的措施。也就是说 Java 中的泛型只在编译阶段有效。在编译过程中，正确检验泛型结果后，会将泛型的相关信息擦除，并且在对象进入和离开方法的边界处添加类型检查和类型转换的方法。泛型信息不会进入到运行时阶段。

**总结：** 泛型类型在逻辑上看可以看成是多个不同的类型，实际上都是相同的基本类型。

## 4. 泛型的使用

泛型有三种使用方式：**泛型类**、**泛型接口**、**泛型方法**。

### 4.1 泛型类

```java
// 此处 T 可以随便写为任意标识，常见的如 T、E、K、V 等
// 在实例化泛型类时，必须指定 T 的具体类型
public class Generic<T> { 
    // key 这个成员变量的类型为 T，由外部指定
    private T key;

    public Generic(T key) {
        this.key = key;
    }

    public T getKey() {
        return key;
    }
}

// 泛型的类型参数只能是类类型，不能是简单类型
Generic<Integer> genericInteger = new Generic<Integer>(123456);
Generic<String> genericString = new Generic<String>("key_value");
```

也可以不传入泛型实参：

```java
Generic generic = new Generic("111111");
Generic generic1 = new Generic(4444);
Generic generic2 = new Generic(55.55);
Generic generic3 = new Generic(false);
```

**注意：**
- 泛型的类型参数只能是类类型，不能是简单类型
- 不能对确切的泛型类型使用 `instanceof` 操作，如 `if (ex_num instanceof Generic<Number>)` 编译时会出错

### 4.2 泛型接口

```java
// 定义泛型接口
public interface Generator<T> {
    public T next();
}
```

**实现方式一：** 未传入泛型实参

```java
class FruitGenerator<T> implements Generator<T> {
    @Override
    public T next() {
        return null;
    }
}
```

**实现方式二：** 传入泛型实参

```java
public class FruitGenerator implements Generator<String> {
    private String[] fruits = new String[]{"Apple", "Banana", "Pear"};

    @Override
    public String next() {
        Random rand = new Random();
        return fruits[rand.nextInt(3)];
    }
}
```

### 4.3 泛型通配符 ?

我们知道 `Integer` 是 `Number` 的子类，但 `Generic<Integer>` 与 `Generic<Number>` 实际上是相同的基本类型。

```java
public void showKeyValue1(Generic<Number> obj) {
    Log.d("泛型测试", "key value is " + obj.getKey());
}

Generic<Integer> gInteger = new Generic<Integer>(123);
Generic<Number> gNumber = new Generic<Number>(456);

showKeyValue(gNumber);
// showKeyValue(gInteger);  // 编译报错！Generic<Integer> 不能视为 Generic<Number> 的子类
```

为解决这个问题，引入 **类型通配符 `?`**：

```java
public void showKeyValue1(Generic<?> obj) {
    Log.d("泛型测试", "key value is " + obj.getKey());
}
```

此处 `?` 是类型实参，而不是类型形参。可以把 `?` 看成所有类型的父类。

### 4.4 泛型方法

> 泛型类是在实例化类的时候指明泛型的具体类型；泛型方法是在调用方法的时候指明泛型的具体类型。

```java
/**
 * 泛型方法的基本介绍
 * @param tClass 传入的泛型实参
 * @return T 返回值为 T 类型
 * 说明：
 * 1) public 与返回值之间的 <T> 非常重要，可以理解为声明此方法为泛型方法
 * 2) 只有声明了 <T> 的方法才是泛型方法
 * 3) <T> 表明该方法将使用泛型类型 T
 */
public <T> T genericMethod(Class<T> tClass) throws InstantiationException, IllegalAccessException {
    T instance = tClass.newInstance();
    return instance;
}

Object obj = genericMethod(Class.forName("com.test.test"));
```

#### 区分泛型类中的普通方法与泛型方法

```java
public class Generic<T> {     
    private T key;

    public Generic(T key) {
        this.key = key;
    }

    // 这不是泛型方法，只是泛型类中的普通成员方法
    public T getKey() {
        return key;
    }

    // 这才是真正的泛型方法
    public <T> T showKeyName(Generic<T> container) {
        System.out.println("container key :" + container.getKey());
        T test = container.getKey();
        return test;
    }
}
```

#### 类中的泛型方法

```java
class GenerateTest<T> {
    public void show_1(T t) {
        System.out.println(t.toString());
    }

    // 泛型方法，使用泛型 E（可以与 T 不同）
    public <E> void show_3(E t) {
        System.out.println(t.toString());
    }

    // 泛型方法，使用泛型 T（全新的类型，与类的 T 无关）
    public <T> void show_2(T t) {
        System.out.println(t.toString());
    }
}
```

#### 泛型方法与可变参数

```java
public <T> void printMsg(T... args) {
    for (T t : args) {
        Log.d("泛型测试", "t is " + t);
    }
}

printMsg("111", 222, "aaaa", "2323.4", 55.55);
```

#### 静态方法与泛型

静态方法无法访问类上定义的泛型；如果静态方法要使用泛型，必须将其定义成泛型方法：

```java
public class StaticGenerator<T> {
    /**
     * 静态方法使用泛型需要添加额外的泛型声明
     */
    public static <T> void show(T t) {
        // ...
    }
}
```

#### 泛型方法总结

- 优先使用泛型方法而非将整个类泛型化
- `static` 方法要使用泛型能力，必须使其成为泛型方法

### 4.5 泛型上下边界

```java
// 上边界：传入的类型必须是 Number 或其子类
public void showKeyValue1(Generic<? extends Number> obj) {
    Log.d("泛型测试", "key value is " + obj.getKey());
}

Generic<String> generic1 = new Generic<String>("11111");  // 编译错误
Generic<Integer> generic2 = new Generic<Integer>(2222);   // 正确
Generic<Float> generic3 = new Generic<Float>(2.4f);       // 正确
```

在泛型类上添加上边界：

```java
public class Generic<T extends Number> {
    private T key;
    // ...
}

Generic<String> generic1 = new Generic<String>("11111");  // 编译错误
```

在泛型方法中添加上下边界：

```java
// 正确：边界在泛型声明处添加
public <T extends Number> T showKeyName(Generic<T> container) {
    // ...
}
```

### 4.6 泛型数组

在 Java 中**不能创建一个确切的泛型类型的数组**：

```java
List<String>[] ls = new ArrayList<String>[10];  // 编译错误
```

使用通配符创建泛型数组是允许的：

```java
List<?>[] ls = new ArrayList<?>[10];  // 正确
List<String>[] ls = new ArrayList[10];  // 正确（但有警告）
```

**为什么禁止？**

```java
List<String>[] lsa = new List<String>[10];  // 不允许
Object o = lsa;
Object[] oa = (Object[]) o;
List<Integer> li = new ArrayList<Integer>();
li.add(new Integer(3));
oa[1] = li;  // 可以赋值
String s = lsa[1].get(0);  // 运行时 ClassCastException
```

由于 JVM 泛型的擦除机制，允许泛型数组声明会导致运行时类型安全问题。使用通配符方式可以避免此问题：

```java
List<?>[] lsa = new List<?>[10];
Object o = lsa;
Object[] oa = (Object[]) o;
List<Integer> li = new ArrayList<Integer>();
li.add(new Integer(3));
oa[1] = li;  // 正确
Integer i = (Integer) lsa[1].get(0);  // 需要显式转换
```
