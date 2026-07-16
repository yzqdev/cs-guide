---
order: 27
---

# 26 - 命名空间

## 基本用法

```cpp
namespace MyLib {
    class Widget {
    public:
        void doSomething();
    };

    int helper() { return 42; }
}

// 使用
MyLib::Widget w;
MyLib::helper();
```

## 嵌套命名空间

```cpp
namespace Company {
    namespace Project {
        namespace Module {
            class Service {};
        }
    }
}

// C++17 简写
namespace Company::Project::Module {
    class Service {};
}
```

## using 声明

```cpp
namespace A {
    void func();
    int value;
}

// using声明：只引入特定名字
using A::func;
func();  // OK

// using指令：引入整个命名空间（避免在头文件中使用）
using namespace std;
cout << "hello";  // OK
```

## 命名空间别名

```cpp
namespace VeryLongNamespaceName {
    class Widget {};
}

// 别名
namespace VLN = VeryLongNamespaceName;
VLN::Widget w;

// C++17 内联命名空间
namespace Library {
    inline namespace V2 {  // 默认使用V2
        class Widget {};
    }
    namespace V1 {
        class OldWidget {};
    }
}

Library::Widget w;  // 使用V2
Library::V1::OldWidget ow;  // 显式使用V1
```

## 匿名命名空间

```cpp
namespace {
    // 只在本文件内可见（内部链接）
    int internalHelper() { return 42; }
    static int count = 0;
}

// 等价于
// static int internalHelper() { return 42; }
```

## ADL（参数依赖查找）

```cpp
namespace N {
    struct X {};
    void func(X x) { std::cout << "N::func\n"; }
}

N::X x;
func(x);  // 通过ADL找到N::func（不需要using）
```

## 头文件中的命名空间

```cpp
// mylib.h
#pragma once

namespace MyLib {
    class Widget {
    public:
        void doSomething();
    };
}

// mylib.cpp
#include "mylib.h"

namespace MyLib {
    void Widget::doSomething() {
        // 实现
    }
}
```

---

**下一步**: [27-Lambda表达式](27-Lambda表达式.md)
