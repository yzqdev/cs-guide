---
order: 11
---

# 10 - 引用

## 左值引用

引用是变量的**别名**，创建后必须绑定，且不能重新绑定。

```cpp
int x = 42;
int& ref = x;    // ref 是 x 的别名

ref = 100;       // x 也变成了100
std::cout << x;  // 100
```

## 引用 vs 指针

| 特性 | 引用 | 指针 |
|------|------|------|
| 初始化 | 必须初始化 | 可以不初始化 |
| 可空 | 不能为null | 可以为nullptr |
| 重新绑定 | 不能 | 可以 |
| 语法 | 直接使用 | 需要 `*` 解引用 |
| 内存 | 可能不占空间（编译器优化） | 占一个指针的大小 |

## const 引用

```cpp
// 不能通过引用修改值
const int& ref = x;
// ref = 200;  // 错误

// 绑定到字面量
const int& ref = 42;  // OK
// int& ref = 42;     // 错误：字面量不是左值

// 绑定到临时对象（延长生命周期）
const std::string& ref = std::string("hello");
```

## 引用作为函数参数

```cpp
// 传递引用（避免拷贝，可修改）
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

// const引用（避免拷贝，不修改）
void print(const std::string& s) {
    std::cout << s;
}

// 传递大对象
void process(const std::vector<int>& v) {
    for (int x : v) {
        std::cout << x;
    }
}
```

## 引用作为返回值

```cpp
// 返回引用可以作为左值
class Container {
    int data[10];
public:
    int& operator[](int index) { return data[index]; }
};

Container c;
c[3] = 42;  // operator[] 返回引用，可以直接赋值

// 危险：不要返回局部变量的引用！
int& bad() {
    int x = 42;
    return x;  // x在函数结束后销毁，引用悬垂！
}
```

## 右值引用（C++11）

```cpp
// 右值引用绑定到临时对象（右值）
int&& rref = 42;              // 字面量是右值
int&& rref2 = 1 + 2;         // 表达式结果是右值

// std::move 将左值转换为右值引用
int x = 10;
int&& moved = std::move(x);   // x 的值被"移动"到moved
// x 现在处于有效但未指定的状态

// 移动语义的核心用途
std::string a = "hello";
std::string b = std::move(a);  // 高效：转移资源，不拷贝
// a 现在是空的（有效但未指定的状态）
```

## 完美转发

```cpp
// 转发引用保持参数的值类别
template<typename T>
void wrapper(T&& arg) {  // 转发引用
    target(std::forward<T>(arg));  // 保持左/右值属性
}

void target(int& x) { std::cout << "lvalue"; }
void target(int&& x) { std::cout << "rvalue"; }

int x = 10;
wrapper(x);          // 输出 "lvalue"
wrapper(42);         // 输出 "rvalue"
```

## 折叠引用（C++11）

```cpp
// 引用折叠规则
// T& &    → T&
// T& &&   → T&
// T&& &   → T&
// T&& &&  → T&&

// 所以 forward<T> 的工作原理
template<typename T>
T&& forward(T& arg) {
    return static_cast<T&&>(arg);
}
```

## 综合示例

```cpp
#include <iostream>
#include <string>
#include <vector>

class Student {
    std::string name;
    int age;
public:
    Student(const std::string& n, int a) : name(n), age(a) {}

    // const引用返回（只读访问）
    const std::string& getName() const { return name; }

    // 引用返回（可写访问）
    int& getAge() { return age; }

    // 移动构造函数
    Student(Student&& other) noexcept
        : name(std::move(other.name)), age(other.age) {}
};

int main() {
    Student s("Alice", 20);
    s.getAge() = 21;  // 可以直接赋值

    // 移动
    Student s2 = std::move(s);  // 高效转移
}
```

---

**下一步**: [11-类与对象](11-类与对象.md)
