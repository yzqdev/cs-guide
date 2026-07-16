---
order: 17
---

# 16 - 特殊成员函数

## 五法则（C++11之前）

C++类有5个特殊成员函数：

```cpp
class MyClass {
    int* data;
    size_t size;
public:
    // 1. 构造函数
    MyClass(size_t n) : data(new int[n]{}), size(n) {}

    // 2. 析构函数
    ~MyClass() { delete[] data; }

    // 3. 拷贝构造函数
    MyClass(const MyClass& other) : data(new int[other.size]), size(other.size) {
        std::copy(other.data, other.data + size, data);
    }

    // 4. 拷贝赋值运算符
    MyClass& operator=(const MyClass& other) {
        if (this != &other) {
            delete[] data;
            size = other.size;
            data = new int[size];
            std::copy(other.data, other.data + size, data);
        }
        return *this;
    }

    // 5. 移动构造函数（C++11新增）
    MyClass(MyClass&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }
};
```

## 零法则（C++11推荐）

如果你能用RAII包装类管理资源，就不需要手动定义任何特殊成员函数：

```cpp
class MyClass {
    std::vector<int> data;   // vector自己管理内存
    std::string name;        // string自己管理内存
public:
    MyClass(size_t n, const std::string& n) : data(n), name(n) {}

    // 不需要手动定义：
    // - 析构函数（vector和string自动释放）
    // - 拷贝构造（vector和string自动深拷贝）
    // - 拷贝赋值（同上）
    // - 移动构造（vector和string自动移动）
    // - 移动赋值（同上）
};
```

## 默认、删除、显式

```cpp
class MyClass {
public:
    MyClass() = default;           // 使用编译器默认实现
    MyClass(const MyClass&) = delete;  // 禁止拷贝
    MyClass(MyClass&&) = default;      // 使用编译器默认移动
    explicit MyClass(int x);           // 禁止隐式转换
};

// C++20 = default on definition
class MyClass2 {
    int x = 0;         // 默认成员初始化器
    MyClass2() = default;  // 与 = 0 等效
};
```

## 移动语义详解

```cpp
class Buffer {
    char* data;
    size_t size;
public:
    // 移动构造函数
    Buffer(Buffer&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }

    // 移动赋值运算符
    Buffer& operator=(Buffer&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            size = other.size;
            other.data = nullptr;
            other.size = 0;
        }
        return *this;
    }
};

// std::move 触发移动语义
Buffer a(1024);
Buffer b = std::move(a);  // 移动，不是拷贝！a变为空
```

## 拷贝省略（Copy Elision）

```cpp
// C++17 强制拷贝省略（RVO/NRVO）
MyClass create() {
    return MyClass(100);  // 直接在调用者处构造，无拷贝/移动
}

MyClass obj = create();  // C++17：直接构造，没有拷贝
// 之前版本可能有一次移动
```

## 五法则的现代写法

```cpp
class Resource {
    std::unique_ptr<int[]> data;
    size_t size;
public:
    Resource(size_t n) : data(std::make_unique<int[]>(n)), size(n) {}

    // 使用 = default 或 = delete
    Resource(const Resource&) = delete;      // 禁止拷贝
    Resource& operator=(const Resource&) = delete;
    Resource(Resource&&) = default;          // 允许移动
    Resource& operator=(Resource&&) = default;
    ~Resource() = default;
};
```

## Pimpl惯用法

```cpp
// widget.h
class Widget {
public:
    Widget();
    ~Widget();
    Widget(Widget&&) noexcept;
    Widget& operator=(Widget&&) noexcept;
    void doWork();
private:
    struct Impl;        // 前向声明
    std::unique_ptr<Impl> pImpl;  // 指向实现
};

// widget.cpp
struct Widget::Impl {
    std::string name;
    std::vector<int> data;
    void doWorkImpl() { /* ... */ }
};

Widget::Widget() : pImpl(std::make_unique<Impl>()) {}
Widget::~Widget() = default;
Widget::Widget(Widget&&) noexcept = default;
Widget& Widget::operator=(Widget&&) noexcept = default;
void Widget::doWork() { pImpl->doWorkImpl(); }
```

---

**下一步**: [17-模板](17-模板.md)
