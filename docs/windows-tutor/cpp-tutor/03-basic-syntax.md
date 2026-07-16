---
order: 4
---

# 03 - 基本语法

## 语句与分号

C++ 中每条语句以 **分号** 结束：

```cpp
int x = 5;          // 变量声明语句
x = x + 1;          // 赋值语句
std::cout << x;     // 输出语句
```

## 代码块

用 `{}` 包裹的语句序列构成一个**块（block）**：

```cpp
{
    int a = 1;
    int b = 2;
    int c = a + b;
}
// a, b, c 在这里不可见（作用域结束）
```

## 注释

```cpp
// 单行注释

/*
   多行注释
*/

/**
 * @brief 文档注释（Doxygen风格）
 */
```

## 标识符命名规则

```cpp
int myVar;      // 合法
int _count;     // 合法（不推荐以下划线开头）
int MAX_SIZE;   // 合法（宏/常量的惯例）

// int 2name;   // 非法：不能以数字开头
// int my-var;  // 非法：不能包含连字符
// int class;   // 非法：关键字不能用作标识符
```

**命名风格（现代C++惯例）**：

| 类型 | 风格 | 示例 |
|------|------|------|
| 变量/函数 | 小驼峰或蛇形 | `userName` / `user_name` |
| 类/结构体 | 大驼峰 | `HttpResponse` |
| 常量 | 全大写或小驼峰 | `MAX_SIZE` / `maxSize` |
| 宏 | 全大写 + 下划线 | `#define BUFFER_SIZE 1024` |
| 模板参数 | 大写或大驼峰 | `T` / `ValueType` |

## 基本数据类型

```cpp
// 整型
short           // 2字节, -32768 ~ 32767
int             // 4字节, ±21亿
long            // 4或8字节（平台相关）
long long       // 8字节

// 无符号整型
unsigned int    // 4字节, 0 ~ 42亿

// 浮点型
float           // 4字节, 约6-7位有效数字
double          // 8字节, 约15-16位有效数字
long double     // 8/12/16字节（平台相关）

// 字符型
char            // 1字节, 存储ASCII字符

// 布尔型
bool            // true 或 false
```

## 变量声明与初始化

```cpp
// C++11 统一初始化（推荐）
int x = 0;
int x(0);
int x{0};         // 列表初始化，禁止窄化转换
int x = {0};

// 多变量声明
int a, b, c;           // 未初始化（不推荐）
int a = 1, b = 2, c = 3;

// auto 类型推导
auto i = 42;           // int
auto d = 3.14;         // double
auto s = "hello";      // const char*

// C++11 显式类型
int i = int{42};       // 显式指定类型
```

## sizeof 运算符

```cpp
std::cout << sizeof(char);     // 1
std::cout << sizeof(int);      // 4
std::cout << sizeof(double);   // 8
std::cout << sizeof(bool);     // 1
```

## 字面量

```cpp
42          // int
42L         // long
42LL        // long long
42U         // unsigned int
42ULL       // unsigned long long

3.14        // double
3.14f       // float
3.14L       // long double

'a'         // char
'\n'        // 换行符
'\0'        // 空字符

"hello"     // const char[]
u8"hello"   // UTF-8 字符串 (C++11)
L"hello"    // 宽字符字符串

true        // bool
false       // bool
```

## 类型别名

```cpp
// typedef（C风格）
typedef unsigned long ulong;

// using（C++11推荐）
using ulong = unsigned long;

ulong x = 100;  // 和 unsigned long 等价
```

## auto 与 decltype

```cpp
auto x = 42;                    // int
auto y = 3.14;                  // double
auto z = "hello";               // const char*
auto v = std::vector<int>{1,2}; // std::vector<int>

// decltype 获取表达式的类型（不求值）
int a = 10;
decltype(a) b = 20;  // b 的类型是 int

// 用于模板返回类型（C++14）
template<typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
    return a + b;
}
```

---

**下一步**: [04-变量与数据类型](04-变量与数据类型.md)
