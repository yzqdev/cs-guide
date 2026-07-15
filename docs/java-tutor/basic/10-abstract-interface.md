---
title: "抽象类与接口"
order: 10
---

# 抽象类与接口

> 抽象类和接口都是 Java 实现抽象设计的方式，用于定义规范，让子类去实现具体细节。

## 抽象类（Abstract Class）

### 什么是抽象类？

用 `abstract` 关键字修饰的类就是抽象类。抽象类可以包含抽象方法（只有声明，没有实现）和普通方法。

```java
// 抽象类
public abstract class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    // 抽象方法 — 只有声明，没有方法体
    public abstract void makeSound();

    // 普通方法 — 有具体实现
    public void sleep() {
        System.out.println(name + " 在睡觉");
    }
}

// 子类必须实现所有抽象方法
public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    @Override
    public void makeSound() {
        System.out.println(name + " 汪汪叫");
    }
}

public class Cat extends Animal {
    public Cat(String name) {
        super(name);
    }

    @Override
    public void makeSound() {
        System.out.println(name + " 喵喵叫");
    }
}
```

### 抽象类的特点

- 用 `abstract` 修饰
- **不能实例化**（不能 `new Animal()`）
- 可以包含构造方法（用于子类调用）
- 可以包含成员变量、普通方法、静态方法
- 子类必须实现所有抽象方法（除非子类也是抽象类）

## 接口（Interface）

### 什么是接口？

接口定义了一组方法规范，用 `interface` 关键字声明。类通过 `implements` 实现接口。

```java
// 接口定义
public interface Flyable {
    // 抽象方法（默认是 public abstract）
    void fly();

    // Java 8+：默认方法（有方法体）
    default void glide() {
        System.out.println("滑翔中...");
    }

    // Java 8+：静态方法
    static boolean isBird(Flyable f) {
        return f instanceof Bird;
    }
}

// 实现接口
public class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("鸟儿在飞翔");
    }
}

public class Airplane implements Flyable {
    @Override
    public void fly() {
        System.out.println("飞机在飞行");
    }
}
```

### 接口的特性

- 用 `interface` 声明
- **不能实例化**
- 方法默认是 `public abstract`（可以省略）
- 变量默认是 `public static final`（即常量）
- Java 8+：可以包含 `default` 方法和 `static` 方法
- Java 9+：可以包含 `private` 方法（辅助 default 方法）

### 多实现

Java 类可以实现多个接口，弥补单继承的不足：

```java
public interface Swimmable {
    void swim();
}

public interface Flyable {
    void fly();
}

public class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("鸭子飞起来了");
    }

    @Override
    public void swim() {
        System.out.println("鸭子在游泳");
    }
}
```

## 抽象类 vs 接口

| 对比维度 | 抽象类 | 接口 |
|----------|--------|------|
| 关键字 | `abstract class` | `interface` |
| 继承/实现 | `extends`（单继承） | `implements`（多实现） |
| 构造方法 | 可以有 | 不能有 |
| 成员变量 | 任意类型 | `public static final`（常量） |
| 方法 | 抽象方法 + 普通方法 | 抽象方法 + default/static 方法 |
| 访问修饰符 | 任意 | 默认 `public` |
| 设计思想 | "是不是"的关系 | "有没有"的能力 |

### 选择原则

> **继承（抽象类）是一个"是不是"的关系，而接口实现是"有没有"的关系。**

**使用抽象类：** 当子类之间有"is-a"（是一个）的关系，且需要共享代码时。
**使用接口：** 当需要定义"can-do"（能做）的能力，且需要多实现时。

## 实际应用示例

### 示例：定义一个支付系统

```java
// 接口：定义支付能力
public interface Payable {
    void pay(double amount);
    void refund(double amount);
}

// 抽象类：实现通用的支付逻辑
public abstract class BasePayment implements Payable {
    protected String merchantId;
    
    public BasePayment(String merchantId) {
        this.merchantId = merchantId;
    }
    
    // 通用的日志记录
    protected void log(String message) {
        System.out.println("[支付] " + message);
    }
}

// 具体实现类
public class Alipay extends BasePayment {
    public Alipay(String merchantId) {
        super(merchantId);
    }

    @Override
    public void pay(double amount) {
        log("支付宝支付 " + amount + " 元");
        // 调用支付宝 API
    }

    @Override
    public void refund(double amount) {
        log("支付宝退款 " + amount + " 元");
        // 调用支付宝 API
    }
}

public class WechatPay extends BasePayment {
    public WechatPay(String merchantId) {
        super(merchantId);
    }

    @Override
    public void pay(double amount) {
        log("微信支付 " + amount + " 元");
    }

    @Override
    public void refund(double amount) {
        log("微信退款 " + amount + " 元");
    }
}
```

## Java 8+ 接口新特性

### default 方法

```java
public interface Vehicle {
    void start();

    // default 方法 — 可以在接口中提供默认实现
    default void honk() {
        System.out.println("按喇叭：滴滴！");
    }

    // 可以被子类重写
    default void stop() {
        System.out.println("车辆停止");
    }
}

public class Car implements Vehicle {
    @Override
    public void start() {
        System.out.println("汽车启动");
    }

    // 可以选择重写 default 方法
    @Override
    public void honk() {
        System.out.println("汽车喇叭：叭叭！");
    }
}
```

### 接口中的静态方法

```java
public interface MathUtils {
    static int add(int a, int b) {
        return a + b;
    }

    static boolean isEven(int n) {
        return n % 2 == 0;
    }
}

// 调用
MathUtils.add(5, 3);       // 直接通过接口名调用
MathUtils.isEven(10);      // true
```

### 接口的多实现冲突

当一个类实现了多个有相同 default 方法的接口时，必须手动解决冲突：

```java
public interface A {
    default void hello() {
        System.out.println("Hello from A");
    }
}

public interface B {
    default void hello() {
        System.out.println("Hello from B");
    }
}

public class MyClass implements A, B {
    // 必须重写，解决冲突
    @Override
    public void hello() {
        A.super.hello();  // 选择 A 的实现
        // B.super.hello();  // 或者选择 B 的实现
        // 或者提供自己的实现
    }
}
```

## 练习

```java
// 设计一个游戏角色系统
public interface Attacker {
    void attack();
}

public interface Defensible {
    void defend();
}

public interface Movable {
    void move();
}

public abstract class GameCharacter implements Attacker, Movable {
    protected String name;
    protected int health;

    public GameCharacter(String name, int health) {
        this.name = name;
        this.health = health;
    }

    public void takeDamage(int damage) {
        health -= damage;
        System.out.println(name + " 受到 " + damage + " 点伤害，剩余 " + health);
    }

    public boolean isAlive() {
        return health > 0;
    }
}

public class Warrior extends GameCharacter implements Defensible {
    public Warrior(String name) {
        super(name, 100);
    }

    @Override
    public void attack() {
        System.out.println(name + " 用剑攻击");
    }

    @Override
    public void move() {
        System.out.println(name + " 向前冲锋");
    }

    @Override
    public void defend() {
        System.out.println(name + " 举起盾牌防御");
    }
}

public class Mage extends GameCharacter {
    public Mage(String name) {
        super(name, 60);
    }

    @Override
    public void attack() {
        System.out.println(name + " 释放火球术");
    }

    @Override
    public void move() {
        System.out.println(name + " 闪现");
    }
}
```
