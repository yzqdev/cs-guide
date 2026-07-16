---
order: 24
---

# 23 - 异常处理

## 基本语法

```cpp
try {
    // 可能抛异常的代码
    throw std::runtime_error("Something went wrong");
} catch (const std::runtime_error& e) {
    std::cout << "Error: " << e.what() << "\n";
} catch (...) {
    // 捕获所有其他异常
    std::cout << "Unknown error\n";
}
```

## 标准异常层次

```
std::exception
├── std::logic_error
│   ├── std::invalid_argument
│   ├── std::domain_error
│   ├── std::length_error
│   └── std::out_of_range
├── std::runtime_error
│   ├── std::range_error
│   ├── std::overflow_error
│   └── std::underflow_error
└── std::bad_alloc
```

## 自定义异常

```cpp
class AppError : public std::runtime_error {
    int code;
public:
    AppError(const std::string& msg, int code)
        : std::runtime_error(msg), code(code) {}

    int getCode() const { return code; }
};

try {
    throw AppError("File not found", 404);
} catch (const AppError& e) {
    std::cout << "Code: " << e.getCode() << "\n";
    std::cout << "Message: " << e.what() << "\n";
}
```

## noexcept

```cpp
// 声明函数不会抛异常
void safeFunc() noexcept {
    // 编译器可以优化
}

// 条件noexcept
template<typename T>
void swap(T& a, T& b) noexcept(noexcept(T(std::move(a)))) {
    T temp = std::move(a);
    a = std::move(b);
    b = std::move(temp);
}
```

## 异常安全

```cpp
// 基本保证：异常后对象处于有效状态
// 强保证：异常后状态不变（回滚）
// 不抛保证：操作不会抛异常

// 强保证示例：copy-and-swap
class Widget {
    int* data;
public:
    Widget& operator=(const Widget& other) {
        Widget temp(other);  // 拷贝（可能抛异常）
        std::swap(data, temp.data);  // 不抛异常
        return *this;
    }
};
```

## RAII与异常

```cpp
// 智能指针自动释放资源
void func() {
    auto p = std::make_unique<int[]>(100);
    throw std::runtime_error("error");  // p仍然会被释放
}

// lock_guard自动释放锁
void thread_func() {
    std::lock_guard<std::mutex> lock(mtx);
    throw std::runtime_error("error");  // 锁仍然会被释放
}
```

---

**下一步**: [24-类型转换](24-类型转换.md)
