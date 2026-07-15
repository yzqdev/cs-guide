---
title: "方法详解"
order: 8
---

# 方法详解

> 方法是执行特定功能的代码块，用于实现代码复用和模块化。

## 方法定义

```java
// 语法: [修饰符] 返回值类型 方法名(参数列表) { 方法体 }

// 示例
public static int add(int a, int b) {
    return a + b;
}
```

### 方法组成部分

| 部分 | 说明 | 必须？ |
|------|------|--------|
| 修饰符 | `public` `static` `final` 等 | 否 |
| 返回值类型 | 基本类型、引用类型或 `void` | 是 |
| 方法名 | 遵循驼峰命名 | 是 |
| 参数列表 | 零个或多个参数 | 否 |
| 方法体 | 执行代码 | 是（抽象方法除外） |
| `return` | 返回值，`void` 方法可省略 | 视返回值类型而定 |

## 方法分类

### 按是否属于对象

```java
public class MethodDemo {
    // 实例方法 — 属于对象，需要创建对象后调用
    public void instanceMethod() {
        System.out.println("实例方法");
    }

    // 静态方法 — 属于类，直接用类名调用
    public static void staticMethod() {
        System.out.println("静态方法");
    }
}

// 调用
MethodDemo demo = new MethodDemo();
demo.instanceMethod();         // 实例方法
MethodDemo.staticMethod();     // 静态方法
```

### 按是否有返回值

```java
// 有返回值
public int sum(int a, int b) {
    return a + b;
}

// 无返回值（void）
public void printMessage(String msg) {
    System.out.println(msg);
    // return;  // 可以省略
}
```

## 参数传递

Java 中：**基本类型传值**，**引用类型传引用**（实际上是传引用值的副本）。

### 基本类型传值

```java
public static void changeValue(int x) {
    x = 100;  // 修改的是副本，不影响原变量
}

int num = 10;
changeValue(num);
System.out.println(num);  // 10（原值不变）
```

### 引用类型传引用

```java
public static void changeName(Person p) {
    p.setName("李四");  // 修改对象内容
}

public static void changeReference(Person p) {
    p = new Person("王五");  // 重新赋值，不影响原引用
}

Person person = new Person("张三");
changeName(person);
System.out.println(person.getName());  // "李四"（对象内容被修改）

changeReference(person);
System.out.println(person.getName());  // "李四"（对象引用未被修改）
```

## 方法重载（Overload）

同一个类中，方法名相同，参数列表不同（个数、类型、顺序）：

```java
public class Printer {
    public void print(int i) {
        System.out.println("整数: " + i);
    }

    public void print(double d) {
        System.out.println("浮点数: " + d);
    }

    public void print(String s) {
        System.out.println("字符串: " + s);
    }

    public void print(String prefix, int value) {
        System.out.println(prefix + ": " + value);
    }
}

Printer p = new Printer();
p.print(10);              // 整数: 10
p.print(3.14);            // 浮点数: 3.14
p.print("Hello");         // 字符串: Hello
p.print("成绩", 95);      // 成绩: 95
```

## 可变参数（Varargs）

```java
// 语法: 类型... 参数名
public static int sum(int... numbers) {
    int total = 0;
    for (int n : numbers) {
        total += n;
    }
    return total;
}

// 调用
sum(1, 2, 3);             // 6
sum(1, 2, 3, 4, 5);      // 15
sum();                    // 0（可以不传参）

// 注意：可变参数必须是最后一个参数
public void method(String prefix, int... values) { }
```

## return 语句

```java
// 返回值
public int add(int a, int b) {
    return a + b;  // 返回计算结果
}

// 提前退出 void 方法
public void process(String data) {
    if (data == null) {
        return;  // 数据为空，提前结束
    }
    System.out.println(data.length());
}
```

## 方法递归

方法调用自身，适合解决可以分解为子问题的问题。

```java
// 计算阶乘
public static int factorial(int n) {
    if (n <= 1) return 1;           // 终止条件
    return n * factorial(n - 1);    // 递归调用
}

// 斐波那契数列
public static int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 递归遍历文件目录
public static void listFiles(File dir, String indent) {
    File[] files = dir.listFiles();
    if (files == null) return;

    for (File file : files) {
        System.out.println(indent + file.getName());
        if (file.isDirectory()) {
            listFiles(file, indent + "  ");
        }
    }
}
```

:::warning
递归必须有**终止条件**，否则会抛出 `StackOverflowError`。
:::

## 方法的内存模型

```java
public class MemoryDemo {
    public static void main(String[] args) {
        int result = add(5, 3);           // main 栈帧
        System.out.println(result);
    }

    public static int add(int a, int b) {  // add 栈帧
        int sum = a + b;
        return sum;
    }
}
```

方法调用时，Java 虚拟机在栈中为每个方法分配一个**栈帧**（Stack Frame），存储局部变量、参数和返回值。方法执行完毕，栈帧被销毁。

## 链式调用

```java
public class StringBuilderDemo {
    public static void main(String[] args) {
        // StringBuilder 的 append 方法返回 this，支持链式调用
        String result = new StringBuilder()
            .append("Hello")
            .append(", ")
            .append("World")
            .toString();

        System.out.println(result);  // "Hello, World"
    }
}
```

## 练习

```java
// 1. 判断质数的方法
public static boolean isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) return false;
    }
    return true;
}

// 2. 重载：计算不同形状的面积
public static double area(double radius) {           // 圆面积
    return Math.PI * radius * radius;
}

public static double area(double width, double height) { // 矩形面积
    return width * height;
}

public static double area(double a, double b, double c) { // 三角形面积（海伦公式）
    double s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// 3. 汉诺塔递归
public static void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        System.out.println("移动盘子 1 从 " + from + " 到 " + to);
        return;
    }
    hanoi(n - 1, from, aux, to);
    System.out.println("移动盘子 " + n + " 从 " + from + " 到 " + to);
    hanoi(n - 1, aux, to, from);
}
```
