# 面向对象核心：封装、继承、多态

> 面向对象编程（OOP）的三大特征：封装（Encapsulation）、继承（Inheritance）、多态（Polymorphism）。

## 封装

封装隐藏对象的内部细节，只对外暴露必要的接口。通过访问修饰符实现。

```java
public class Student {
    // 私有成员变量 — 外部不能直接访问
    private String name;
    private int age;
    private double score;

    // 公开的 getter / setter — 控制访问方式
    public String getName() {
        return name;
    }

    public void setName(String name) {
        // 可以在 setter 中添加校验逻辑
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("姓名不能为空");
        }
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("年龄不合法");
        }
        this.age = age;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("分数必须在 0-100 之间");
        }
        this.score = score;
    }

    // 只读属性（只有 getter，没有 setter）
    public String getGrade() {
        if (score >= 90) return "优秀";
        if (score >= 80) return "良好";
        if (score >= 60) return "及格";
        return "不及格";
    }
}
```

### 封装的好处

1. **隐藏实现细节** — 使用者无需关心内部实现
2. **数据校验** — 在 setter 中做合法性检查
3. **灵活修改** — 修改内部实现不影响外部代码
4. **安全性** — 防止外部随意修改敏感数据

## 继承

子类继承父类的非私有成员，实现代码复用。

```java
// 父类
public class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public void eat() {
        System.out.println(name + " 在吃东西");
    }

    public void sleep() {
        System.out.println(name + " 在睡觉");
    }
}

// 子类
public class Dog extends Animal {
    public Dog(String name) {
        super(name);  // 调用父类构造方法
    }

    // 子类独有的方法
    public void bark() {
        System.out.println(name + " 汪汪叫");
    }

    // 重写父类方法
    @Override
    public void eat() {
        System.out.println(name + " 在啃骨头");
    }
}

public class Cat extends Animal {
    public Cat(String name) {
        super(name);
    }

    public void meow() {
        System.out.println(name + " 喵喵叫");
    }

    @Override
    public void eat() {
        System.out.println(name + " 在吃鱼");
    }
}
```

### super 关键字

```java
public class Child extends Parent {
    public Child() {
        super();      // 调用父类无参构造方法（默认有，可省略）
    }

    public Child(String name) {
        super(name);  // 调用父类带参构造方法
    }

    @Override
    public void doSomething() {
        super.doSomething();  // 调用父类被重写的方法
        // 添加子类的额外逻辑
    }
}
```

### 继承的规则

- Java 只支持**单继承**（一个类只能有一个直接父类）
- 所有类都隐式继承 `Object` 类
- 子类继承父类的 `public` 和 `protected` 成员
- 子类可以通过 `super` 访问父类成员
- 构造方法不能被继承，但子类必须调用父类构造方法

### final 关键字

```java
final class FinalClass { }  // 不能被继承
// class Child extends FinalClass { }  // ❌ 编译错误

class Parent {
    public final void finalMethod() { }  // 不能被重写
}
```

## 多态

多态指同一个方法在不同对象上有不同的行为。多态的三个必要条件：

1. 继承（或实现接口）
2. 方法重写（Override）
3. 父类引用指向子类对象

```java
// 多态示例
public class Main {
    public static void main(String[] args) {
        // 父类引用指向子类对象（向上转型）
        Animal animal1 = new Dog("旺财");
        Animal animal2 = new Cat("咪咪");

        // 调用重写的方法 — 表现多态
        animal1.eat();  // 旺财 在啃骨头（Dog 的 eat）
        animal2.eat();  // 咪咪 在吃鱼（Cat 的 eat）

        // animal1.bark();  // ❌ 编译错误：父类引用不能调用子类特有的方法

        // 向下转型（强制转换）
        if (animal1 instanceof Dog) {
            Dog dog = (Dog) animal1;
            dog.bark();  // 旺财 汪汪叫
        }
    }

    // 多态作为方法参数 — 接受所有 Animal 的子类
    public static void feed(Animal animal) {
        animal.eat();
    }
}
```

### 对象转型

```java
// 向上转型（Upcasting）— 自动，安全
Dog dog = new Dog("旺财");
Animal animal = dog;  // 自动转换

// 向下转型（Downcasting）— 需要强制转换，可能不安全
Animal animal = new Dog("旺财");
Dog dog = (Dog) animal;     // ✅ 正确

Animal animal2 = new Cat("咪咪");
// Dog dog2 = (Dog) animal2; // ❌ ClassCastException

// 安全转换 — 使用 instanceof
if (animal2 instanceof Dog) {
    Dog dog2 = (Dog) animal2;
} else if (animal2 instanceof Cat) {
    Cat cat2 = (Cat) animal2;
}
```

### instanceof 模式匹配（Java 16+）

```java
// 传统写法
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// 模式匹配写法（Java 16+）
if (obj instanceof String s) {
    System.out.println(s.length());  // 自动转换
}
```

## 方法重写（Override）

子类对父类的方法进行重新实现：

```java
class Parent {
    public void display() {
        System.out.println("父类 display");
    }

    // 父类的 protected 方法
    protected void doSomething() {
        System.out.println("父类 doSomething");
    }
}

class Child extends Parent {
    @Override
    public void display() {           // 权限可以扩大
        System.out.println("子类 display");
    }

    @Override
    protected void doSomething() {    // 权限不能缩小
        System.out.println("子类 doSomething");
    }
}
```

### 重写规则

- 参数列表必须相同
- 返回值类型必须相同或为其子类型（协变返回类型）
- 访问权限不能比父类更严格
- 父类的 `final` 方法不能被重写
- 父类的 `static` 方法不能被重写（只能被隐藏）
- 构造方法不能被重写

### 重写 vs 重载

| 对比 | 重写（Override） | 重载（Overload） |
|------|-----------------|-----------------|
| 场景 | 子类对父类方法重新实现 | 同一个类中多个同名方法 |
| 方法名 | 相同 | 相同 |
| 参数列表 | 完全相同 | 必须不同 |
| 返回值 | 相同或子类型 | 可以不同 |
| 修饰符 | 不能缩小访问权限 | 无限制 |
| 关键字 | 建议使用 `@Override` | 无 |

## Object 类

所有类的根类，常用方法：

```java
public class ObjectMethodsDemo {
    private String name;
    private int age;

    // 默认：类名@哈希码 → 建议重写为有意义的描述
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }

    // 默认：比较引用地址 → 建议重写为比较值
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ObjectMethodsDemo that = (ObjectMethodsDemo) o;
        return age == that.age && Objects.equals(name, that.name);
    }

    // 重写 equals 必须重写 hashCode
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```

## 练习

```java
// 1. 设计一个形状继承体系
abstract class Shape {
    public abstract double getArea();
    public abstract double getPerimeter();
}

class Circle extends Shape {
    private double radius;
    public Circle(double radius) { this.radius = radius; }
    @Override public double getArea() { return Math.PI * radius * radius; }
    @Override public double getPerimeter() { return 2 * Math.PI * radius; }
}

class Rectangle extends Shape {
    private double width, height;
    public Rectangle(double width, double height) {
        this.width = width; this.height = height;
    }
    @Override public double getArea() { return width * height; }
    @Override public double getPerimeter() { return 2 * (width + height); }
}

// 多态应用
public static void printShapeInfo(Shape shape) {
    System.out.println("面积: " + shape.getArea());
    System.out.println("周长: " + shape.getPerimeter());
}

// 调用
printShapeInfo(new Circle(5));
printShapeInfo(new Rectangle(3, 4));
```
