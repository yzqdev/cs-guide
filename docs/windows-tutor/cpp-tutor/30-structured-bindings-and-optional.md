---
order: 31
---

# 30 - 结构化绑定与 optional/variant/any

## 结构化绑定（C++17）

```cpp
// 数组
int arr[] = {1, 2, 3};
auto [a, b, c] = arr;  // a=1, b=2, c=3

// pair/tuple
std::pair<int, std::string> p = {1, "hello"};
auto [id, name] = p;  // id=1, name="hello"

std::tuple<int, double, std::string> t = {1, 3.14, "pi"};
auto [i, d, s] = t;

// struct
struct Point { double x, y; };
Point p{1.0, 2.0};
auto [x, y] = p;

// map遍历
std::map<std::string, int> m = {{"a", 1}, {"b", 2}};
for (const auto& [key, value] : m) {
    std::cout << key << ": " << value;
}

// if中使用
if (auto [it, inserted] = m.insert({"c", 3}); inserted) {
    std::cout << "Inserted";
}
```

## std::optional（C++17）

```cpp
#include <optional>

// 表示可能不存在的值
std::optional<int> findUser(int id) {
    if (id == 1) return 42;
    return std::nullopt;  // 不存在
}

auto result = findUser(1);
if (result.has_value()) {
    std::cout << *result;  // 42
}

// 更简洁的写法
if (result) {
    std::cout << result.value();  // 42
}

// 默认值
int val = findUser(999).value_or(-1);  // -1

// 链式操作
auto name = findUser(1)
    .transform([](int id) { return "User" + std::to_string(id); })
    .value_or("Unknown");
```

## std::variant（C++17）

```cpp
#include <variant>

// 类型安全的联合体
std::variant<int, double, std::string> v = "hello";

// 访问
std::cout << std::get<std::string>(v);  // hello
// std::get<int>(v);  // 抛 std::bad_variant_access

// 检查当前类型
if (auto* p = std::get_if<std::string>(&v)) {
    std::cout << *p;
}

// std::visit 访问
std::visit([](const auto& val) {
    std::cout << val;
}, v);

// 带默认值的visit
struct Overloaded {
    void operator()(int i) { std::cout << "int: " << i; }
    void operator()(double d) { std::cout << "double: " << d; }
    void operator()(const std::string& s) { std::cout << "string: " << s; }
};

std::visit(Overloaded{}, v);
```

## std::any（C++17）

```cpp
#include <any>

// 类型擦除的容器
std::any a = 42;
std::any b = std::string("hello");
std::any c = 3.14;

// 读取
int i = std::any_cast<int>(a);
std::string s = std::any_cast<std::string>(b);

// 检查类型
if (a.type() == typeid(int)) {
    // 是int
}

// 安全转换
if (auto* p = std::any_cast<int>(&a)) {
    std::cout << *p;
}
```

## std::bitset

```cpp
#include <bitset>

std::bitset<8> b1(42);        // 00101010
std::bitset<8> b2("11001100"); // 11001100

b1.set(0);       // 设置第0位
b1.reset(2);     // 清除第2位
b1.flip();       // 翻转所有位

bool bit = b1[3];  // 访问第3位

std::cout << b1.to_string();  // "11011011"
std::cout << b1.to_ulong();   // 转为unsigned long
```

## 综合示例

```cpp
#include <iostream>
#include <optional>
#include <variant>
#include <map>

// 使用optional处理可能失败的操作
std::optional<double> safeDivide(double a, double b) {
    if (b == 0) return std::nullopt;
    return a / b;
}

int main() {
    // optional
    auto result = safeDivide(10, 3);
    if (result) {
        std::cout << "Result: " << *result << "\n";
    }

    // variant
    std::variant<int, std::string, double> data = 42;
    std::visit([](const auto& v) {
        std::cout << "Value: " << v << "\n";
    }, data);

    // 结构化绑定
    std::map<std::string, int> scores = {{"Alice", 95}, {"Bob", 87}};
    for (const auto& [name, score] : scores) {
        std::cout << name << ": " << score << "\n";
    }
}
```

---

**下一步**: [31-C++17特性](31-C++17特性.md)
