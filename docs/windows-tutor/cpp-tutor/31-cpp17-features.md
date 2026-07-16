---
order: 32
---

# 31 - C++17 特性

## if with 初始化语句

```cpp
if (auto it = m.find(key); it != m.end()) {
    std::cout << "Found: " << it->second;
} else {
    std::cout << "Not found";
}
// it 在这里不可见
```

## if constexpr

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
```

## 折叠表达式

```cpp
template<typename... Args>
auto sum(Args... args) { return (args + ...); }           // 一元右折叠

template<typename... Args>
void print(Args... args) { ((std::cout << args << " "), ...); }  // 逗号折叠

template<typename... Args>
bool allTrue(Args... args) { return (... && args); }      // 二元左折叠
```

## std::optional

```cpp
#include <optional>

std::optional<int> find(int id) {
    if (id == 1) return 42;
    return std::nullopt;
}

auto r = find(1);
int val = r.value_or(-1);
```

## std::variant

```cpp
#include <variant>

std::variant<int, std::string, double> v = "hello";

// std::visit
std::visit([](const auto& x) { std::cout << x; }, v);
```

## std::any

```cpp
#include <any>

std::any a = 42;
int i = std::any_cast<int>(a);
```

## 结构化绑定

```cpp
auto [x, y] = std::pair(1, 2);
auto [a, b, c] = std::tuple(1, 3.14, "pi");
```

## 类模板参数推导（CTAD）

```cpp
std::pair p(1, 3.14);           // pair<int, double>
std::vector v = {1, 2, 3};     // vector<int>
std::optional o = 42;           // optional<int>
```

## std::filesystem

```cpp
#include <filesystem>
namespace fs = std::filesystem;

// 遍历目录
for (const auto& entry : fs::directory_iterator("/path")) {
    std::cout << entry.path() << "\n";
}

// 文件操作
fs::copy_file("src.txt", "dst.txt", fs::copy_options::overwrite_existing);
fs::create_directories("a/b/c");
bool exists = fs::exists("file.txt");
auto size = fs::file_size("file.txt");
fs::remove("file.txt");
```

## std::string_view

```cpp
#include <string_view>

void print(std::string_view sv) {
    std::cout << sv;
}

print("literal");               // 零拷贝
print(std::string("constructed")); // 零拷贝
```

## 其他改进

```cpp
// 并行算法
std::sort(std::execution::par, v.begin(), v.end());

// std::invoke
std::invoke([]{ std::cout << "hello"; });

// 类内聚合初始化
struct S {
    int x = 0;
    int y = 0;
};
S s{.x = 1, .y = 2};  // C++20指定初始化器
```

---

**下一步**: [32-C++20特性](32-C++20特性.md)
