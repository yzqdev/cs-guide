---
order: 18
---

# 17 - 模板

## 函数模板

```cpp
// 通用的max函数
template<typename T>
T maxOf(T a, T b) {
    return (a > b) ? a : b;
}

maxOf(3, 4);           // 推导为 int
maxOf(3.5, 2.1);       // 推导为 double
maxOf<std::string>("a", "b");  // 显式指定

// 多个模板参数
template<typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
    return a + b;
}
```

## 类模板

```cpp
template<typename T>
class Stack {
    std::vector<T> data;
public:
    void push(const T& val) { data.push_back(val); }
    void pop() { data.pop_back(); }
    T& top() { return data.back(); }
    bool empty() const { return data.empty(); }
    size_t size() const { return data.size(); }
};

Stack<int> s;
s.push(1);
s.push(2);
std::cout << s.top();  // 2

// C++17 类模板参数推导（CTAD）
std::pair p(1, 3.14);         // 推导为 pair<int, double>
std::vector v = {1, 2, 3};    // 推导为 vector<int>
```

## 模板特化

```cpp
// 通用模板
template<typename T>
class Printer {
public:
    void print(const T& val) { std::cout << val; }
};

// 特化：针对 bool 类型
template<>
class Printer<bool> {
public:
    void print(bool val) { std::cout << (val ? "true" : "false"); }
}

// 偏特化：针对指针类型
template<typename T>
class Printer<T*> {
public:
    void print(T* val) {
        if (val) std::cout << *val;
        else std::cout << "nullptr";
    }
};
```

## 非类型模板参数

```cpp
template<typename T, int N>
class FixedArray {
    T data[N];
public:
    T& operator[](int i) { return data[i]; }
    constexpr int size() const { return N; }
};

FixedArray<int, 10> arr;  // 10个int的数组
```

## 可变参数模板（C++11）

```cpp
// 递归展开
void print() {}  // 终止

template<typename T, typename... Args>
void print(const T& first, const Args&... rest) {
    std::cout << first;
    if constexpr (sizeof...(rest) > 0) {
        std::cout << ", ";
        print(rest...);
    }
}

print(1, "hello", 3.14);  // 1, hello, 3.14

// 折叠表达式（C++17，更简洁）
template<typename... Args>
auto sum(Args... args) {
    return (args + ...);  // 一元右折叠
}

sum(1, 2, 3, 4);  // 10

// 二元折叠
template<typename... Args>
void printAll(Args... args) {
    ((std::cout << args << " "), ...);  // 逗号折叠
}
```

## SFINAE 与 enable_if

```cpp
// 只在类型是整数时启用
template<typename T>
std::enable_if_t<std::is_integral_v<T>, T>
safeDiv(T a, T b) {
    if (b == 0) throw std::runtime_error("division by zero");
    return a / b;
}

// C++20 Concepts（更优雅）
template<typename T>
concept Numeric = std::is_arithmetic_v<T>;

template<Numeric T>
T add(T a, T b) { return a + b; }

// 或者
template<typename T> requires Numeric<T>
T add2(T a, T b) { return a + b; }

// C++20 简写
auto add3(Numeric auto a, Numeric auto b) { return a + b; }
```

## 模板的编译模型

```cpp
// 模板定义通常放在头文件中（因为编译器需要看到完整定义）

// mylib.h
template<typename T>
class MyContainer {
    std::vector<T> data;
public:
    void add(const T& val);
    T get(int i) const;
};

// 显式实例化（放在.cpp中减少编译时间）
template class MyContainer<int>;    // 只实例化int版本
template class MyContainer<double>; // 只实例化double版本
```

## constexpr if（C++17）

```cpp
template<typename T>
auto process(T val) {
    if constexpr (std::is_integral_v<T>) {
        return val * 2;
    } else if constexpr (std::is_floating_point_v<T>) {
        return val + 0.5;
    } else {
        return val;
    }
}

// 编译时分支，非匹配的分支不会被实例化
```

---

**下一步**: [18-STL容器](18-STL容器.md)
