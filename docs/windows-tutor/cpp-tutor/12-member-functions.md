---
order: 13
---

# 12 - 成员函数

## 普通成员函数

```cpp
class Calculator {
    double result = 0;
public:
    Calculator& add(double x) { result += x; return *this; }
    Calculator& sub(double x) { result -= x; return *this; }
    Calculator& mul(double x) { result *= x; return *this; }
    double get() const { return result; }  // const成员函数
};

// 链式调用
double r = Calculator().add(10).sub(3).mul(2).get();  // 14
```

## const 成员函数

```cpp
class Point {
    double x, y;
public:
    Point(double x, double y) : x(x), y(y) {}

    double getX() const { return x; }   // 不修改对象
    double getY() const { return y; }

    // const对象只能调用const成员函数
    // Point const p(1,2); p.getX();  // OK
    // Point const p(1,2); p.setX(3); // 错误！
};
```

## static 成员

```cpp
class Employee {
    std::string name;
    static int count;  // 所有对象共享

public:
    Employee(const std::string& n) : name(n) { ++count; }
    ~Employee() { --count; }

    // 非静态成员函数可以访问静态成员
    void print() const {
        std::cout << name << " (共 " << count << " 人)\n";
    }

    // 静态成员函数（没有this指针）
    static int getCount() { return count; }
};

int Employee::count = 0;  // 必须在类外定义

int main() {
    Employee a("Alice");
    Employee b("Bob");
    a.print();            // Alice (共 2 人)
    std::cout << Employee::getCount();  // 2
}
```

## 友元

```cpp
class Box {
    double width;
public:
    Box(double w) : width(w) {}

    // 声明友元函数（可以访问私有成员）
    friend void printWidth(const Box& b);
    // 声明友元类
    friend class BoxFactory;
};

void printWidth(const Box& b) {
    std::cout << b.width;  // 可以访问私有成员
}

class BoxFactory {
public:
    Box create(double w) { return Box(w); }  // 可以访问私有构造
};
```

## 静态成员函数 vs 非静态成员函数

| 特性 | 非静态成员函数 | 静态成员函数 |
|------|---------------|-------------|
| this指针 | 有 | 无 |
| 访问非静态成员 | 可以 | 不可以 |
| 调用方式 | 对象.函数() | 类名::函数() |
| 生命周期 | 依赖对象 | 类级别 |

## 成员函数指针

```cpp
class MyClass {
public:
    void func(int x) { std::cout << x; }
    static void staticFunc(int x) { std::cout << x; }
};

// 成员函数指针
void (MyClass::*fp)(int) = &MyClass::func;
MyClass obj;
(obj.*fp)(42);   // 通过对象调用
MyClass* ptr = &obj;
(ptr->*fp)(42);  // 通过指针调用

// 静态成员函数指针（和普通函数指针一样）
void (*sfp)(int) = &MyClass::staticFunc;
sfp(42);
```

## 内联函数

```cpp
class Point {
    double x, y;
public:
    // 在类内定义的函数默认inline
    double getX() const { return x; }
    double getY() const { return y; }

    // 类外定义但声明为inline
    double distanceTo(const Point& other) const;
};

// 类外定义时加inline
inline double Point::distanceTo(const Point& other) const {
    double dx = x - other.x;
    double dy = y - other.y;
    return std::sqrt(dx*dx + dy*dy);
}
```

## 可变参数成员函数（C++11）

```cpp
class Logger {
public:
    template<typename... Args>
    void log(Args... args) {
        (std::cout << ... << args) << "\n";  // 折叠表达式(C++17)
    }
};

Logger logger;
logger.log("Error: ", 42, " at ", "line 10");
```

---

**下一步**: [13-运算符重载](13-运算符重载.md)
