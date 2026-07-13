# 类与对象

> 类是创建对象的模板，对象是类的实例。Java 是面向对象的语言，一切皆对象。

## 类的定义

```java
// 定义一个类
public class Person {
    // 成员变量（属性）
    String name;
    int age;

    // 方法（行为）
    void sayHello() {
        System.out.println("大家好，我叫" + name);
    }
}
```

## 对象的创建与使用

```java
public class Main {
    public static void main(String[] args) {
        // 创建对象（使用 new 关键字）
        Person person = new Person();

        // 访问属性
        person.name = "张三";
        person.age = 25;

        // 调用方法
        person.sayHello();  // 大家好，我叫张三
    }
}
```

## 构造方法（Constructor）

构造方法用于初始化对象，名称与类名相同，没有返回值。

```java
public class Person {
    String name;
    int age;

    // 无参构造方法
    public Person() {
        this.name = "未知";
        this.age = 0;
    }

    // 带参构造方法
    public Person(String name, int age) {
        this.name = name;   // this 指向当前对象
        this.age = age;
    }

    // 构造方法重载
    public Person(String name) {
        this(name, 0);  // 通过 this() 调用另一个构造方法
    }
}

// 使用
Person p1 = new Person();               // 无参
Person p2 = new Person("张三", 25);     // 带参
Person p3 = new Person("李四");         // 一个参数
```

:::tip
如果类中没有定义任何构造方法，Java 会自动生成一个无参构造方法。如果定义了带参构造方法，则自动生成的无参构造方法**不会**再提供。
:::

## 成员变量与局部变量

```java
public class VariableDemo {
    // 成员变量（类内部，方法外部）
    // 有默认初始值
    int instanceVar;      // 实例变量（属于对象）
    static int classVar;  // 类变量（属于类，所有对象共享）

    public void method() {
        // 局部变量（方法内部）
        // 必须显式初始化，没有默认值
        int localVar = 10;

        System.out.println(instanceVar);  // 0（默认值）
        System.out.println(localVar);     // 10
    }
}
```

## this 关键字

`this` 代表当前对象的引用，常用于：

```java
public class Student {
    private String name;
    private int age;

    // 1. 区分成员变量与参数
    public void setName(String name) {
        this.name = name;  // this.name 是成员变量，name 是参数
    }

    // 2. 调用当前类的其他构造方法
    public Student() {
        this("默认", 18);  // 调用下面的构造方法
    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // 3. 返回当前对象
    public Student setAge(int age) {
        this.age = age;
        return this;  // 支持链式调用
    }
}
```

## static 关键字

`static` 表示属于类而不是某个对象，所有实例共享。

```java
public class Counter {
    // 类变量（所有对象共享）
    static int count = 0;

    // 实例变量（每个对象独立）
    int instanceCount = 0;

    public Counter() {
        count++;
        instanceCount++;
    }

    // 静态方法
    public static int getCount() {
        return count;           // ✅ 可以访问静态变量
        // return instanceCount; // ❌ 不能直接访问实例变量
    }

    // 实例方法
    public int getInstanceCount() {
        return instanceCount;   // ✅ 可以访问实例变量
    }
}

// 使用
Counter c1 = new Counter();
Counter c2 = new Counter();
Counter c3 = new Counter();

System.out.println(Counter.count);           // 3（类名.静态变量）
System.out.println(c1.instanceCount);        // 1
System.out.println(c2.instanceCount);        // 1
System.out.println(Counter.getCount());      // 3（类名.静态方法）
```

## 方法重载（Overload）

同一个类中，方法名相同但参数列表不同：

```java
public class Calculator {
    // 方法名相同，参数不同
    public int add(int a, int b) {
        return a + b;
    }

    public int add(int a, int b, int c) {
        return a + b + c;
    }

    public double add(double a, double b) {
        return a + b;
    }

    public int add(int[] numbers) {
        int sum = 0;
        for (int n : numbers) sum += n;
        return sum;
    }
}

// 调用时根据参数自动匹配
Calculator calc = new Calculator();
calc.add(1, 2);           // 3
calc.add(1, 2, 3);        // 6
calc.add(1.5, 2.5);       // 4.0
```

## 包（Package）

用于组织类，避免命名冲突。

```java
// 文件路径: src/com/example/demo/Hello.java

package com.example.demo;  // 包声明，必须是文件第一行

public class Hello {
    // ...
}
```

## 综合示例

```java
// BankAccount.java
public class BankAccount {
    // 静态变量 — 所有账户共享利率
    private static double interestRate = 0.03;
    private static int totalAccounts = 0;

    // 实例变量
    private String accountNumber;
    private String ownerName;
    private double balance;

    // 构造方法
    public BankAccount(String accountNumber, String ownerName) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = 0;
        totalAccounts++;  // 每创建一个账户，总数加 1
    }

    // 实例方法
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("存款 " + amount + " 元，余额: " + balance);
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("取款 " + amount + " 元，余额: " + balance);
        } else {
            System.out.println("余额不足");
        }
    }

    // 静态方法
    public static double getInterestRate() {
        return interestRate;
    }

    public static int getTotalAccounts() {
        return totalAccounts;
    }

    // Getter / Setter
    public String getOwnerName() { return ownerName; }
    public double getBalance() { return balance; }
}

// Main.java
public class Main {
    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount("1001", "张三");
        BankAccount acc2 = new BankAccount("1002", "李四");

        acc1.deposit(1000);
        acc1.withdraw(200);
        acc2.deposit(500);

        System.out.println("总账户数: " + BankAccount.getTotalAccounts());
        System.out.println("当前利率: " + BankAccount.getInterestRate());
    }
}
```

## 练习

```java
// 定义一个 Rectangle 类
public class Rectangle {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double getArea() {
        return width * height;
    }

    public double getPerimeter() {
        return 2 * (width + height);
    }

    public static void main(String[] args) {
        Rectangle rect = new Rectangle(5, 3);
        System.out.println("面积: " + rect.getArea());       // 15.0
        System.out.println("周长: " + rect.getPerimeter());   // 16.0
    }
}
```
