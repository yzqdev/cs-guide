---
order: 40
---

# 39 - 代码规范与最佳实践

## 命名规范

```cpp
// 变量和函数：snake_case 或 camelCase
int user_count;
std::string getUserName();

// 类和结构体：PascalCase
class HttpResponse;

// 常量：UPPER_SNAKE_CASE 或 camelCase
constexpr int MAX_BUFFER_SIZE = 1024;
constexpr double pi = 3.14159;

// 模板参数：PascalCase 或 单大写字母
template<typename T, typename ValueType>
class Container;

// 宏：UPPER_SNAKE_CASE（尽量避免宏）
#define BUFFER_SIZE 1024
```

## 头文件保护

```cpp
// 推荐：#pragma once（现代编译器都支持）
#pragma once

// 传统方式（跨平台兼容）
#ifndef MY_HEADER_H
#define MY_HEADER_H
// ...
#endif
```

## RAII 原则

```cpp
// 资源获取即初始化
class File {
    FILE* handle;
public:
    File(const char* name) : handle(fopen(name, "r")) {}
    ~File() { if (handle) fclose(handle); }

    File(const File&) = delete;
    File& operator=(const File&) = delete;
};

// 或用智能指针
auto file = std::make_unique<FileHandle>(fopen("test.txt", "r"));
```

## 智能指针使用指南

```cpp
// 1. 默认用 unique_ptr
auto p = std::make_unique<Widget>();

// 2. 需要共享时用 shared_ptr
auto shared = std::make_shared<Widget>();

// 3. 避免循环引用
class A {
    std::shared_ptr<B> bPtr;  // 强引用
};
class B {
    std::weak_ptr<A> aPtr;    // 弱引用（打破循环）
};

// 4. 不要混用 new/delete 和智能指针
// 错误
std::shared_ptr<Widget> p(new Widget());
// 正确
auto p = std::make_shared<Widget>();
```

## 异常安全

```cpp
// 基本保证：异常后对象有效
// 强保证：异常后状态不变（copy-and-swap）
// 不抛保证：标记noexcept

class Widget {
    std::vector<int> data;
public:
    // copy-and-swap惯用法
    Widget& operator=(Widget other) noexcept {
        std::swap(data, other.data);
        return *this;
    }
};
```

## const 正确性

```cpp
class Point {
    double x, y;
public:
    // 只读函数标记const
    double getX() const { return x; }
    double distanceTo(const Point& other) const;

    // 可修改函数不加const
    void setX(double x) { this->x = x; }

    // 参数优先用const引用
    void process(const std::vector<int>& data);
};
```

## 避免的陷阱

```cpp
// 1. 不要返回局部变量的引用
int& bad() {
    int x = 42;
    return x;  // 悬垂引用！
}

// 2. 不要忘记虚析构函数
class Base {
public:
    virtual ~Base() = default;  // 必须！
};

// 3. 不要使用裸指针管理资源
int* p = new int(42);  // 不推荐
// 用智能指针替代

// 4. 不要使用 using namespace 在头文件中
// mylib.h
// using namespace std;  // 不要这样做！

// 5. 不要过度使用宏
#define SQUARE(x) ((x)*(x))  // 不推荐
constexpr int square(int x) { return x * x; }  // 推荐

// 6. 不要忽略编译器警告
// -Wall -Wextra -Werror
```

## 代码组织

```
project/
├── CMakeLists.txt
├── include/
│   └── mylib/
│       ├── widget.h
│       └── utils.h
├── src/
│   ├── widget.cpp
│   └── utils.cpp
├── tests/
│   ├── widget_test.cpp
│   └── utils_test.cpp
└── examples/
    └── demo.cpp
```

---

**下一步**: [40-设计模式](40-设计模式.md)
