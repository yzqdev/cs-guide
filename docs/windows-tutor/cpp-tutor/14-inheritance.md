---
order: 15
---

# 14 - 继承

## 基本继承

```cpp
class Animal {
public:
    std::string name;
    Animal(const std::string& n) : name(n) {}
    void speak() const { std::cout << name << " makes a sound\n"; }
};

class Dog : public Animal {
public:
    Dog(const std::string& n) : Animal(n) {}  // 调用基类构造
    void fetch() const { std::cout << name << " fetches the ball\n"; }
};

Dog rex("Rex");
rex.speak();   // 来自Animal
rex.fetch();   // 来自Dog
```

## 访问控制

```cpp
class Base {
public:
    int pub;
protected:
    int prot;
private:
    int priv;
};

class Derived : public Base {     // public继承
    void func() {
        pub;    // OK
        prot;   // OK
        // priv; // 错误
    }
};

class Derived2 : protected Base {  // protected继承
    void func() {
        pub;    // OK（变成protected）
        prot;   // OK
    }
};

class Derived3 : private Base {   // private继承（默认）
    void func() {
        pub;    // OK（变成private）
        prot;   // OK（变成private）
    }
};
```

## 继承方式对成员可见性的影响

| 基类成员 | public继承 | protected继承 | private继承 |
|---------|-----------|--------------|------------|
| public | public | protected | private |
| protected | protected | protected | private |
| private | 不可见 | 不可见 | 不可见 |

## 构造与析构顺序

```cpp
class Base {
public:
    Base()  { std::cout << "Base构造\n"; }
    ~Base() { std::cout << "Base析构\n"; }
};

class Derived : public Base {
public:
    Derived()  { std::cout << "Derived构造\n"; }
    ~Derived() { std::cout << "Derived析构\n"; }
};

// 输出：
// Base构造
// Derived构造
// Derived析构
// Base析构
// 构造：先基类后派生类
// 析构：先派生类后基类
```

## 多继承

```cpp
class Printable {
public:
    virtual void print() const = 0;
    virtual ~Printable() = default;
};

class Serializable {
public:
    virtual std::string serialize() const = 0;
    virtual ~Serializable() = default;
};

class Document : public Printable, public Serializable {
    std::string content;
public:
    Document(const std::string& c) : content(c) {}

    void print() const override {
        std::cout << content;
    }

    std::string serialize() const override {
        return "{\"content\":\"" + content + "\"}";
    }
};
```

## 菱形继承与虚继承

```cpp
class Animal {
public:
    int age;
};

class Dog : public Animal {};     // Dog有一个age
class Cat : public Animal {};     // Cat有一个age

// 菱形继承问题
class DogCat : public Dog, public Cat {};  // DogCat有两个age！

// 解决：虚继承
class VAnimal {
public:
    int age;
};

class VDog : virtual public VAnimal {};   // 虚继承
class VCat : virtual public VAnimal {};   // 虚继承

class DogCat2 : public VDog, public VCat {};  // 只有一个age
```

## 基类指针/引用

```cpp
class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
};

class Rect : public Shape {
    double w, h;
public:
    Rect(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
};

// 基类指针指向派生类对象
Shape* shapes[] = { new Circle(5), new Rect(4, 6) };
for (Shape* s : shapes) {
    std::cout << s->area() << "\n";  // 多态
}
```

## 避免继承的替代方案

```cpp
// 1. 组合优于继承
class Engine {
public:
    void start() { std::cout << "Engine start\n"; }
};

class Car {
    Engine engine;  // 组合：has-a
public:
    void start() { engine.start(); }
};

// 2. 私有继承 + using声明暴露接口
class Base {
public:
    void func();
};

class Derived : private Base {
public:
    using Base::func;  // 选择性暴露
};

// 3. C++20 final
class Final final : public Base {};  // 禁止再被继承
```

---

**下一步**: [15-多态](15-多态.md)
