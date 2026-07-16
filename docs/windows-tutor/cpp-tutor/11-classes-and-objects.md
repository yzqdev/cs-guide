---
order: 12
---

# 11 - 类与对象

## 类的定义

```cpp
class Person {
public:     // 公有：外部可访问
    std::string name;
    int age;

    // 构造函数
    Person(const std::string& n, int a) : name(n), age(a) {}

    // 成员函数
    void introduce() {
        std::cout << "我是 " << name << ", 今年 " << age << " 岁\n";
    }

protected:  // 受保护：派生类可访问
    std::string secret;

private:    // 私有：仅类内部可访问
    int id;
};
```

## 访问控制

| 说明符 | 类内部 | 派生类 | 外部 |
|--------|--------|--------|------|
| `public` | ✓ | ✓ | ✓ |
| `protected` | ✓ | ✓ | ✗ |
| `private` | ✓ | ✗ | ✗ |

## struct vs class

```cpp
// struct 默认 public
struct Point {
    double x;   // 默认 public
    double y;
};

// class 默认 private
class Circle {
    double radius;  // 默认 private
public:
    Circle(double r) : radius(r) {}
};
```

## 构造函数

```cpp
class Rectangle {
    double width, height;
public:
    // 默认构造函数
    Rectangle() : width(0), height(0) {}

    // 参数化构造函数
    Rectangle(double w, double h) : width(w), height(h) {}

    // 委托构造函数（C++11）
    Rectangle(double side) : Rectangle(side, side) {}  // 正方形

    // 初始化列表（推荐，比在函数体内赋值更高效）
    Rectangle(double w, double h) : width{w}, height{h} {}
};
```

## 构造函数初始化列表

```cpp
class Student {
    const int id;         // 必须在初始化列表中初始化
    std::string name;
    int& ref;             // 引用必须在初始化列表中初始化
public:
    Student(int i, const std::string& n, int& r)
        : id(i), name(n), ref(r) {}  // 按声明顺序初始化
};
```

## 析构函数

```cpp
class Resource {
    int* data;
public:
    Resource() {
        data = new int[100];
        std::cout << "资源获取\n";
    }

    ~Resource() {  // 析构函数
        delete[] data;
        std::cout << "资源释放\n";
    }
};
```

## this 指针

```cpp
class Point {
    double x, y;
public:
    Point(double x, double y) : x(x), y(y) {
        // this->x 是成员，x 是参数（名字相同时必须用this）
    }

    Point& setX(double x) {
        this->x = x;   // 成员x = 参数x
        return *this;  // 返回自身引用（链式调用）
    }

    Point& setY(double y) {
        this->y = y;
        return *this;
    }
};

// 链式调用
Point p(0, 0);
p.setX(1).setY(2);  // 流式接口
```

## 成员初始化顺序

```cpp
class Example {
    int a, b, c;
public:
    // 成员按照声明顺序初始化，不是初始化列表中的顺序！
    Example(int x) : c{x}, b{x}, a{b} {}  // 可能出错：a用b初始化，但b还没初始化
    // 正确顺序：a, b, c
};
```

## 对象的创建与销毁

```cpp
// 栈上对象（自动管理生命周期）
Person p1("Alice", 25);  // 构造
// p1 离开作用域时自动析构

// 堆上对象
Person* p2 = new Person("Bob", 30);  // 构造
delete p2;  // 必须手动析构

// 数组
Person arr[3] = {
    Person("A", 1),
    Person("B", 2),
    Person("C", 3)
};
```

## 综合示例：银行账户

```cpp
#include <iostream>
#include <string>

class BankAccount {
    std::string owner;
    double balance;
    static int totalAccounts;  // 静态成员
    int id;

public:
    BankAccount(const std::string& owner, double initial)
        : owner(owner), balance(initial), id(++totalAccounts) {
        std::cout << "账户 #" << id << " 创建\n";
    }

    ~BankAccount() {
        std::cout << "账户 #" << id << " 关闭\n";
    }

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }

    void print() const {
        std::cout << owner << ": ¥" << balance << "\n";
    }

    static int getTotalAccounts() { return totalAccounts; }
};

int BankAccount::totalAccounts = 0;  // 静态成员定义

int main() {
    BankAccount a("Alice", 1000);
    BankAccount b("Bob", 2000);

    a.deposit(500);
    a.withdraw(200);
    a.print();  // Alice: ¥1300

    std::cout << "总账户数: " << BankAccount::getTotalAccounts() << "\n";
}
```

---

**下一步**: [12-成员函数](12-成员函数.md)
