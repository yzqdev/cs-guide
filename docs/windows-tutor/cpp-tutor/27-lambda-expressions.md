---
order: 28
---

# 27 - Lambda 表达式

## 基本语法

```cpp
// [捕获列表](参数列表) -> 返回类型 { 函数体 }
auto add = [](int a, int b) -> int { return a + b; };
std::cout << add(3, 4);  // 7

// 返回类型可推导
auto mul = [](int a, int b) { return a * b; };

// 无参数
auto sayHello = []() { std::cout << "Hello!\n"; };
sayHello();
```

## 捕获列表

```cpp
int factor = 10;
int offset = 5;

// 值捕获（拷贝）
auto f1 = [factor](int x) { return x * factor; };

// 引用捕获
auto f2 = [&factor](int x) { factor += x; };

// 隐式值捕获
auto f3 = [=](int x) { return x * factor + offset; };

// 隐式引用捕获
auto f4 = [&](int x) { factor += x; offset += x; };

// 混合捕获
auto f5 = [=, &factor](int x) { return x * factor + offset; };

// 初始化捕获（C++14，移动捕获）
auto ptr = std::make_unique<int>(42);
auto f6 = [p = std::move(ptr)]() { return *p; };

// C++14 初始化捕获（创建新变量）
auto f7 = [x = std::string("hello"), y = 42]() {
    std::cout << x << y;
};
```

## 泛型 Lambda（C++14）

```cpp
auto print = [](const auto& x) { std::cout << x << "\n"; };
print(42);       // OK
print(3.14);     // OK
print("hello");  // OK

auto add = [](auto a, auto b) { return a + b; };
```

## constexpr Lambda（C++17）

```cpp
constexpr auto square = [](int x) { return x * x; };
constexpr int val = square(5);  // 编译时计算
```

## Lambda 作为函数参数

```cpp
void apply(int a, int b, int (*func)(int, int)) {
    std::cout << func(a, b);
}

apply(3, 4, [](int a, int b) { return a + b; });

// C++14: auto参数
void apply2(int a, int b, auto func) {
    std::cout << func(a, b);
}
```

## Lambda 作为返回值

```cpp
auto make_adder(int n) {
    return [n](int x) { return x + n; };
}

auto add5 = make_adder(5);
std::cout << add5(10);  // 15
```

## Lambda 与 STL

```cpp
std::vector<int> v = {3, 1, 4, 1, 5, 9};

// 排序
std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });

// 查找
auto it = std::find_if(v.begin(), v.end(), [](int x) { return x > 5; });

// 计数
int count = std::count_if(v.begin(), v.end(), [](int x) { return x % 2 == 0; });

// 变换
std::vector<int> squares;
std::transform(v.begin(), v.end(), std::back_inserter(squares),
    [](int x) { return x * x; });
```

## Mutable Lambda

```cpp
int counter = 0;
auto increment = [counter]() mutable {  // mutable允许修改值捕获的副本
    return ++counter;
};

std::cout << increment();  // 1
std::cout << increment();  // 2
std::cout << counter;      // 0（原始值没变）
```

## Lambda 类型

```cpp
// 每个lambda都有唯一的类型（即使捕获列表相同）
auto f1 = [] {};
auto f2 = [] {};
// f1 和 f2 类型不同！

// 但可以用std::function包装
std::function<int(int, int)> add = [](int a, int b) { return a + b; };

// 或用auto存储（编译时确定类型）
auto func = [](int a, int b) { return a + b; };
```

---

**下一步**: [28-移动语义](28-移动语义.md)
