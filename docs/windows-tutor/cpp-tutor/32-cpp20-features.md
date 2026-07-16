---
order: 33
---

# 32 - C++20 特性

## Concepts（概念）

```cpp
#include <concepts>

// 定义概念
template<typename T>
concept Numeric = std::is_arithmetic_v<T>;

template<typename T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
};

// 使用概念
template<Numeric T>
T add(T a, T b) { return a + b; }

// 简写
auto multiply(Numeric auto a, Numeric auto b) { return a * b; }

// requires子句
template<typename T>
    requires Numeric<T>
T divide(T a, T b) { return a / b; }
```

## Ranges（范围库）

```cpp
#include <ranges>

std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// 管道风格
auto result = v
    | std::views::filter([](int x) { return x % 2 == 0; })
    | std::views::transform([](int x) { return x * x; })
    | std::views::take(3);

for (int x : result) {
    std::cout << x << " ";  // 4 16 36
}

// 常用视图
auto evens = v | std::views::filter([](int x) { return x % 2 == 0; });
auto squared = v | std::views::transform([](int x) { return x * x; });
auto reversed = v | std::views::reverse;
auto chunked = v | std::views::chunk(3);
auto taken = v | std::views::take(5);
auto dropped = v | std::views::drop(5);
auto joined = ... | std::views::join;

// C++23
auto zipped = std::views::zip(v1, v2);
auto counted = std::views::counted(v.begin(), 5);
```

## Coroutines（协程）

```cpp
#include <coroutine>

// 生成器
generator<int> range(int start, int end) {
    for (int i = start; i < end; ++i) {
        co_yield i;  // 暂停并返回值
    }
}

for (int i : range(0, 10)) {
    std::cout << i << " ";
}
```

## Modules（模块）

```cpp
// hello.cppm（模块接口）
export module hello;

export void hello() {
    std::cout << "Hello!\n";
}

// main.cpp
import hello;
int main() {
    hello();
}
```

## 三路比较（太空船运算符）

```cpp
#include <compare>

struct Point {
    int x, y;
    auto operator<=>(const Point&) const = default;  // 自动生成所有比较
};

// 或者自定义
struct Version {
    int major, minor;
    auto operator<=>(const Version& other) const {
        if (auto cmp = major <=> other.major; cmp != 0) return cmp;
        return minor <=> other.minor;
    }
};
```

## 指定初始化器

```cpp
struct Config {
    int width = 800;
    int height = 600;
    bool fullscreen = false;
};

Config cfg{.width = 1920, .height = 1080};  // C++20
```

## constexpr 增强

```cpp
// C++20: std::is_constant_evaluated()
constexpr int f(int x) {
    if (std::is_constant_evaluated()) {
        // 编译时路径
        return x * x;
    } else {
        // 运行时路径
        return x + 1;
    }
}

// C++20: 动态分配可以在constexpr中
constexpr auto makeVec() {
    std::vector<int> v = {1, 2, 3};  // OK in C++20
    return v;
}
```

## 其他改进

```cpp
// std::format（格式化字符串）
std::string s = std::format("Hello, {}! You are {}.", "Alice", 25);

// [[likely]] / [[unlikely]]
if (x > 0) [[likely]] {
    // 优化提示：这个分支更可能执行
}

// consteval
consteval int square(int x) { return x * x; }  // 必须在编译时求值

// constinit
constinit int global = 42;  // 确保编译时初始化
```

---

**下一步**: [33-C++23特性](33-C++23特性.md)
