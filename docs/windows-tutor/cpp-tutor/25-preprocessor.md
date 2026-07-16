---
order: 26
---

# 25 - 预处理器

## 宏定义

```cpp
#define PI 3.14159265358979
#define SQUARE(x) ((x) * (x))     // 函数宏（注意括号！）
#define MAX(a,b) ((a) > (b) ? (a) : (b))

// 宏的陷阱
#define BAD Square(x)  // 没有括号
BAD 5 + 3 → Square(5) + 3 → 5 * 5 + 3 = 28（不是64）
```

## 条件编译

```cpp
#define DEBUG

#ifdef DEBUG
    std::cout << "Debug mode\n";
#endif

#ifndef NDEBUG
    std::cout << "Release mode\n";
#endif

#if defined(WIN32)
    // Windows代码
#elif defined(__linux__)
    // Linux代码
#elif defined(__APPLE__)
    // macOS代码
#endif

// C++17: __has_include
#if __has_include(<optional>)
    #include <optional>
#endif
```

## Include Guard

```cpp
// 传统方式
#ifndef MY_HEADER_H
#define MY_HEADER_H
// ... 内容 ...
#endif

// C++17 推荐
#pragma once
// ... 内容 ...
```

## 预定义宏

```cpp
__cplusplus          // C++标准版本（如202100L表示C++23）
__LINE__             // 当前行号
__FILE__             // 当前文件名
__DATE__             // 编译日期
__TIME__             // 编译时间
__func__             // 当前函数名（C++11）
__VA_ARGS__          // 可变参数宏
```

## 预处理器运算

```cpp
// 字符串化
#define STRINGIFY(x) #x
std::cout << STRINGIFY(hello);  // "hello"

// 拼接
#define CONCAT(a, b) a##b
int xy = 42;
std::cout << CONCAT(x, y);  // 42

// 可变参数宏
#define LOG(fmt, ...) printf(fmt "\n", __VA_ARGS__)
LOG("Error %d: %s", 404, "not found");
```

## 预处理器最佳实践

```cpp
// 1. 用constexpr代替常量宏
constexpr double PI = 3.14159265358979;

// 2. 用inline函数代替函数宏
inline int square(int x) { return x * x; }

// 3. 用模板代替类型宏

// 4. 必须用宏时，给参数加括号
#define SAFE_MAX(a, b) ((a) > (b) ? (a) : (b))

// 5. 避免用宏定义全局变量
```

---

**下一步**: [26-命名空间](26-命名空间.md)
