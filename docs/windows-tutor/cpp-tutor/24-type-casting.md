---
order: 25
---

# 24 - 类型转换

## C++ 四种命名转换

### static_cast

```cpp
// 编译时类型检查
double d = 3.14;
int i = static_cast<int>(d);  // 截断 → 3

// 向上转换（安全）
class Base {};
class Derived : public Base {};
Derived d;
Base* b = static_cast<Base*>(&d);  // OK

// 向下转换（不安全，需要确保类型正确）
Base* bp = new Derived();
Derived* dp = static_cast<Derived*>(bp);  // 不检查，直接转换
```

### dynamic_cast

```cpp
// 运行时类型检查，需要虚函数
class Base { virtual void f() {} };
class Derived : public Base {};

Base* bp = new Derived();

// 指针转换
Derived* dp = dynamic_cast<Derived*>(bp);
if (dp) {
    // 转换成功
} else {
    // 转换失败（bp不是Derived类型）
}

// 引用转换（失败抛异常）
try {
    Derived& dr = dynamic_cast<Derived&>(*bp);
} catch (const std::bad_cast& e) {
    std::cout << "Cast failed\n";
}
```

### const_cast

```cpp
// 添加/移除 const
const int* p1 = &i;
int* p2 = const_cast<int*>(p1);  // 移除const
*p2 = 10;  // 如果原始对象是非const，OK；否则是未定义行为

// 典型用途：调用不接受const的C接口
void c_function(char* str);  // C接口
const char* cstr = "hello";
c_function(const_cast<char*>(cstr));  // 可以但危险
```

### reinterpret_cast

```cpp
// 低级别位模式重解释
int n = 0x41424344;
char* p = reinterpret_cast<char*>(&n);

// 指针与整数互转
int* ptr = reinterpret_cast<int*>(0x12345678);
auto addr = reinterpret_cast<uintptr_t>(ptr);

// 不同函数指针类型互转（危险）
void (*fp)() = reinterpret_cast<void(*)()>(some_other_func_ptr);
```

## 转换安全表

| 转换 | 编译时 | 运行时 | 安全性 |
|------|--------|--------|--------|
| static_cast | ✓ | ✗ | 编译器信任你 |
| dynamic_cast | ✗ | ✓ | 自动检查 |
| const_cast | ✓ | ✗ | 只改const |
| reinterpret_cast | ✓ | ✗ | 最危险 |

## C风格转换（不推荐）

```cpp
// 等价于const_cast + static_cast
(int)d;           // C风格
static_cast<int>(d);  // C++风格（推荐）
```

---

**下一步**: [25-预处理器](25-预处理器.md)
