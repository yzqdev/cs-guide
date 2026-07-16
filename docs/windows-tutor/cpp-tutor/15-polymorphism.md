---
order: 16
---

# 15 - 多态

## 虚函数

```cpp
class Animal {
public:
    virtual void speak() const {   // virtual关键字
        std::cout << "...\n";
    }
    virtual ~Animal() = default;   // 虚析构（必须！）
};

class Dog : public Animal {
public:
    void speak() const override {  // override关键字（推荐）
        std::cout << "Woof!\n";
    }
};

class Cat : public Animal {
public:
    void speak() const override {
        std::cout << "Meow!\n";
    }
};

// 多态
Animal* animals[] = { new Dog(), new Cat(), new Animal() };
for (Animal* a : animals) {
    a->speak();  // 输出: Woof! Meow! ...
}
```

## 虚析构函数

```cpp
class Base {
public:
    Base()  { std::cout << "Base构造\n"; }
    ~Base() { std::cout << "Base析构\n"; }  // 没有virtual！
};

class Derived : public Base {
    int* data;
public:
    Derived() : data(new int[100]) {}
    ~Derived() { delete[] data; std::cout << "Derived析构\n"; }
};

Base* p = new Derived();
delete p;
// 输出: Base析构
// Derived析构没有调用！→ 内存泄漏！
// 解决：加 virtual ~Base() = default;
```

## 纯虚函数与抽象类

```cpp
class Shape {
public:
    virtual double area() const = 0;     // 纯虚函数
    virtual double perimeter() const = 0;
    virtual void draw() const = 0;
    virtual ~Shape() = default;
};

// Shape s;  // 错误：不能实例化抽象类

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
    double perimeter() const override { return 2 * 3.14159 * radius; }
    void draw() const override { std::cout << "Drawing circle\n"; }
};

class Rect : public Shape {
    double w, h;
public:
    Rect(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
    double perimeter() const override { return 2 * (w + h); }
    void draw() const override { std::cout << "Drawing rect\n"; }
};
```

## override 与 final

```cpp
class Base {
public:
    virtual void func();
    virtual void func2();
};

class Derived : public Base {
public:
    void func() override;     // 正确重写
    // void func(int) override;  // 错误：不是重写（参数不同）
    // void func2() const override;  // 错误：const不同

    void func3() final;  // 禁止进一步重写
};

class MoreDerived : public Derived {
    // void func3() override;  // 错误：func3是final
};
```

## RTTI（运行时类型识别）

```cpp
#include <typeinfo>

class Base { virtual void f() {} };
class Derived : public Base {};

Base* p = new Derived();

// typeid
std::cout << typeid(*p).name();  // 输出平台相关的类名

// dynamic_cast（需要RTTI和虚函数）
Derived* d = dynamic_cast<Derived*>(p);
if (d) {
    // 转换成功
}

// 注意：dynamic_cast在转换失败时
// 指针返回nullptr，引用抛std::bad_cast
```

## 多态的实际应用

```cpp
// 工厂模式
class Shape {
public:
    enum Type { CIRCLE, RECT, TRIANGLE };
    virtual double area() const = 0;
    virtual ~Shape() = default;

    static std::unique_ptr<Shape> create(Type type, double a, double b = 0);
};

// 纯虚函数实现（定义在类外）
std::unique_ptr<Shape> Shape::create(Type type, double a, double b) {
    switch (type) {
        case CIRCLE:   return std::make_unique<Circle>(a);
        case RECT:     return std::make_unique<Rect>(a, b);
        case TRIANGLE: return std::make_unique<Triangle>(a, b);
    }
    return nullptr;
}
```

## vtable 原理（了解即可）

```
对象内存布局（简化）:
+------------------+
| vptr (虚表指针)    |  → 指向 vtable
+------------------+
| 成员变量           |
+------------------+

vtable (每个类一个):
+------------------+
| &Dog::speak      |
+------------------+
| &Dog::~Dog       |
+------------------+
```

---

**下一步**: [16-特殊成员函数](16-特殊成员函数.md)
