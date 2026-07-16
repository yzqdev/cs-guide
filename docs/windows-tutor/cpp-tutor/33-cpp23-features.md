---
order: 34
---

# 33 - C++23 特性

## std::print / std::println

```cpp
#include <print>

// 替代std::cout的现代方式
std::print("Hello, {}!\n", "world");
std::println("Value: {}, Name: {}", 42, "answer");

// 格式化
std::print("{:>10}\n", "right");     // 右对齐
std::print("{:.2f}\n", 3.14159);     // 保留2位小数
std::print("{:#x}\n", 255);          // 十六进制: 0xff
```

## std::expected

```cpp
#include <expected>

// 比std::optional更好的错误处理
std::expected<int, std::string> divide(int a, int b) {
    if (b == 0) return std::unexpected("Division by zero");
    return a / b;
}

auto result = divide(10, 3);
if (result) {
    std::cout << *result;  // 3
} else {
    std::cout << result.error();  // Division by zero
}

// 链式操作
auto result2 = divide(10, 0)
    .transform([](int x) { return x * 2; })
    .or_else([](auto err) { return std::expected<int, std::string>(0); });
```

## std::generator

```cpp
#include <generator>

std::generator<int> fibonacci() {
    int a = 0, b = 1;
    while (true) {
        co_yield a;
        auto temp = a;
        a = b;
        b = temp + b;
    }
}

// 使用
for (int i : fibonacci() | std::views::take(10)) {
    std::cout << i << " ";  // 0 1 1 2 3 5 8 13 21 34
}
```

## std::flat_map / std::flat_set

```cpp
#include <flat_map>
#include <flat_set>

// 基于排序vector的有序容器（缓存友好）
std::flat_map<std::string, int> fm = {{"a", 1}, {"b", 2}};
std::flat_set<int> fs = {3, 1, 4, 1, 5};

// 比std::map快（内存连续），但插入慢
```

## std::mdspan（多维数组视图）

```cpp
#include <mdspan>

// 创建2D视图
std::vector<int> data = {1, 2, 3, 4, 5, 6};
std::mdspan<int, std::extents<size_t, 2, 3>> matrix(data.data());

// 访问
matrix[0, 0];  // 1
matrix[1, 2];  // 6
```

## std::stacktrace

```cpp
#include <stacktrace>

void func() {
    auto trace = std::stacktrace::current();
    std::cout << trace;
}
```

## std::move_only_function

```cpp
#include <functional>

// 只能移动的std::function
std::move_only_function<int()> f = [x = std::make_unique<int>(42)]() {
    return *x;
};

auto f2 = std::move(f);  // 可以移动
// auto f3 = f;  // 错误：不能拷贝
```

## std::to_underlying

```cpp
enum class Color : uint8_t { Red = 1, Green = 2, Blue = 3 };

uint8_t val = std::to_underlying(Color::Red);  // 1
```

## 其他改进

```cpp
// if consteval
if consteval {
    // 编译时路径
} else {
    // 运行时路径
}

// std::ranges::to
auto vec = std::views::iota(0, 5)
    | std::ranges::to<std::vector>();

// std::ranges::zip
std::vector<int> a = {1, 2, 3};
std::vector<std::string> b = {"a", "b", "c"};
for (auto [x, s] : std::views::zip(a, b)) {
    std::cout << x << s;
}
```

---

**下一步**: [34-文件IO](34-文件IO.md)
