---
order: 10
---

# 09 - 指针

## 什么是指针

指针是一个变量，其**值是另一个变量的内存地址**。

```cpp
int x = 42;
int* p = &x;     // p 存储 x 的地址

std::cout << p;   // 输出内存地址（如 0x7ffd5c3e）
std::cout << *p;  // 解引用：通过地址访问值 → 42
```

## 指针的声明与初始化

```cpp
int* p1;        // 未初始化（危险！野指针）
int* p2 = nullptr;  // 初始化为空（推荐）
int* p3 = &x;   // 指向 x

// 多变量声明的陷阱
int* a, b;      // a是int*，b是int！（不是两个int指针）
int *a, *b;     // 两个int指针
```

## 指针运算

```cpp
int arr[] = {10, 20, 30, 40, 50};
int* p = arr;    // 数组名退化为指针

p + 1;    // 移动到下一个int（+4字节），指向20
p++;      // p现在指向20
p--;      // p又指向10
p += 2;   // p指向30

// 指针差
int* start = &arr[0];
int* end = &arr[4];
ptrdiff_t diff = end - start;  // 4（相差4个元素）
```

## 指针与数组

```cpp
int arr[5] = {1, 2, 3, 4, 5};
int* p = arr;  // 数组名退化为指针

// 以下等价
arr[2];      // 2
*(p + 2);   // 2
p[2];        // 2

// 注意区别
sizeof(arr);  // 20（整个数组大小）
sizeof(p);    // 4或8（指针大小）
```

## void 指针

```cpp
void* vp;
int x = 42;
vp = &x;            // void* 可以指向任何类型
// *vp;             // 错误：不能解引用void指针
int* ip = static_cast<int*>(vp);  // 必须转换后才能使用
std::cout << *ip;   // 42
```

## const 与指针

```cpp
int x = 10, y = 20;

// 指向const的指针（不能通过指针修改值）
const int* p1 = &x;
// *p1 = 30;        // 错误
p1 = &y;           // 可以改变指向

// const指针（指向不能改变）
int* const p2 = &x;
*p2 = 30;          // 可以修改值
// p2 = &y;        // 错误：不能改变指向

// 指向const的const指针
const int* const p3 = &x;
// *p3 = 30;       // 错误
// p3 = &y;        // 错误
```

**口诀**: `const` 在 `*` 左边 → 值不能改；`const` 在 `*` 右边 → 指向不能改。

## 多级指针

```cpp
int x = 42;
int* p = &x;
int** pp = &p;   // 指向指针的指针

std::cout << *pp;   // 输出p的地址
std::cout << **pp;  // 输出x的值：42
```

## 函数指针

```cpp
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }

// 函数指针
int (*op)(int, int) = add;
std::cout << op(3, 4);  // 7

// 用作参数
int compute(int a, int b, int (*func)(int, int)) {
    return func(a, b);
}
compute(3, 4, add);  // 7
compute(3, 4, sub);  // -1

// 用别名简化
using BinaryOp = int(*)(int, int);
int compute2(int a, int b, BinaryOp func) {
    return func(a, b);
}
```

## 动态内存分配

```cpp
// C风格（不推荐，容易出错）
int* p = new int(42);     // 分配单个int
int* arr = new int[10];   // 分配数组

delete p;                  // 释放单个
delete[] arr;              // 释放数组

// 必须手动释放，否则内存泄漏！
// 建议用智能指针替代（见第22章）
```

## 常见指针陷阱

```cpp
// 1. 野指针
int* p;         // 未初始化
// *p = 10;     // 未定义行为！

// 2. 悬垂指针
int* p;
{
    int x = 42;
    p = &x;
}
// *p = 10;     // x已销毁，悬垂指针！

// 3. 内存泄漏
int* p = new int(42);
// 忘记 delete p;

// 4. 双重释放
int* p = new int(42);
delete p;
// delete p;   // 未定义行为！

// 5. 使用已释放的内存
int* p = new int(42);
delete p;
// *p = 10;    // 未定义行为！
```

---

**下一步**: [10-引用](10-引用.md)
