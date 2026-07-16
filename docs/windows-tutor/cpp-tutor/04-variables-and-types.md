---
order: 5
---

# 04 - 变量与数据类型

## 基本类型详解

### 整型

```cpp
#include <iostream>
#include <limits>

int main() {
    std::cout << "char:     " << sizeof(char)     << " bytes, range: "
              << (int)std::numeric_limits<char>::min() << " ~ "
              << (int)std::numeric_limits<char>::max() << "\n";

    std::cout << "int:      " << sizeof(int)      << " bytes, range: "
              << std::numeric_limits<int>::min() << " ~ "
              << std::numeric_limits<int>::max() << "\n";

    std::cout << "long long:" << sizeof(long long) << " bytes, range: "
              << std::numeric_limits<long long>::min() << " ~ "
              << std::numeric_limits<long long>::max() << "\n";
}
```

### 固定宽度整型（C++11）

```cpp
#include <cstdint>

int8_t   a = -128;        // 精确 8 位有符号
uint8_t  b = 255;         // 精确 8 位无符号
int16_t  c = -32768;      // 精确 16 位
uint16_t d = 65535;
int32_t  e = -2147483648;  // 精确 32 位
uint32_t f = 4294967295;
int64_t  g = -9223372036854775808LL;  // 精确 64 位
uint64_t h = 18446744073709551615ULL;
```

### 浮点型

```cpp
float f = 3.14f;       // 单精度
double d = 3.14;       // 双精度（默认）
long double ld = 3.14L; // 扩展精度

// 特殊值
double inf = std::numeric_limits<double>::infinity();
double nan = std::numeric_limits<double>::quiet_NaN();
```

### 字符与字符串

```cpp
char c = 'A';                    // 单个字符
char arr[] = "Hello";            // C字符串（以'\0'结尾）
const char* ptr = "Hello";       // C风格字符串指针

// C++字符串（推荐）
std::string s = "Hello";         // std::string
```

## 类型转换

### 隐式转换

```cpp
int i = 3.14;       // double → int（截断，丢失精度）
double d = 42;      // int → double（安全）
bool b = 1;         // int → bool（0=false, 非0=true）
char c = 65;        // int → char（ASCII）
```

### 显式转换（C风格 — 不推荐）

```cpp
int i = (int)3.14;     // C风格转换
int j = int(3.14);     // 函数风格转换
```

### C++ 四种命名转换（推荐）

```cpp
// 1. static_cast — 编译时安全的类型转换
double d = 3.14;
int i = static_cast<int>(d);  // 截断为3

// 2. dynamic_cast — 运行时多态类型转换（需要RTTI）
class Base { virtual void f() {} };
class Derived : public Base {};
Base* b = new Derived();
Derived* d = dynamic_cast<Derived*>(b);  // 成功

// 3. const_cast — 添加/移除 const
const int* p = &i;
int* q = const_cast<int*>(p);  // 可以修改了，但修改const对象是未定义行为

// 4. reinterpret_cast — 低级别位模式重解释
int n = 0x41424344;
char* p = reinterpret_cast<char*>(&n);
```

## const 与 constexpr

```cpp
const int MAX = 100;           // 运行时常量（可能在栈上）
constexpr int SIZE = 10;       // 编译时常量（确定值在编译期）
constexpr double PI = 3.14159265358979;

// constexpr函数
constexpr int factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}
constexpr int f5 = factorial(5);  // 编译时计算 = 120

// const成员函数承诺不修改对象
class MyClass {
    int x;
public:
    int getX() const { return x; }  // const成员函数
};
```

## volatile

```cpp
// 告诉编译器：这个变量可能被外部修改，不要优化掉读取
volatile int hardware_register;

while (hardware_register != 0) {
    // 编译器不会把这里优化成只读一次
}
```

## auto 推导规则

```cpp
auto x = 42;             // int
auto y = 42.0;           // double
auto z = 'c';            // char
auto s = "str";          // const char*（不是std::string!）

// 引用会去掉
int& ref = x;
auto r = ref;            // r 是 int，不是 int&

// 加&保留引用
auto& r2 = ref;          // r2 是 int&

// const
const int cx = 10;
auto cr = cx;            // cr 是 int（const被去掉）

// C++14 返回类型推导
auto func() { return 42; }  // 返回int
```

## struct 初始化

```cpp
struct Point {
    double x;
    double y;
};

// 聚合初始化
Point p1 = {1.0, 2.0};    // C++11
Point p2{3.0, 4.0};       // C++11
Point p3 = {.x=5, .y=6};  // C++20 指定初始化器

// std::initializer_list
std::vector<int> v = {1, 2, 3, 4, 5};
std::map<std::string, int> m = {{"a", 1}, {"b", 2}};
```

---

**下一步**: [05-运算符](05-运算符.md)
