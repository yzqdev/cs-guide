---
order: 23
---

# 22 - 智能指针

## std::unique_ptr（独占所有权）

```cpp
#include <memory>

// 创建
auto p1 = std::make_unique<int>(42);           // 推荐
std::unique_ptr<int> p2(new int(42));          // 也可以

// 访问
*p1 = 100;
p1->method();

// 所有权转移
auto p3 = std::move(p1);  // p1变为空，p3拥有资源
// p1 == nullptr

// 数组
auto arr = std::make_unique<int[]>(10);
arr[0] = 42;

// 自定义删除器
auto deleter = [](FILE* f) { fclose(f); };
std::unique_ptr<FILE, decltype(deleter)> file(fopen("test.txt", "r"), deleter);
```

## std::shared_ptr（共享所有权）

```cpp
// 创建
auto p1 = std::make_shared<int>(42);  // 推荐（一次分配）
std::shared_ptr<int> p2(new int(42)); // 两次分配（不推荐）

// 引用计数
auto p3 = p1;  // 引用计数=2
std::cout << p1.use_count();  // 2

// 检查是否唯一
if (p1.use_count() == 1) {
    // 独占
}

// 弱引用打破循环
class B;
class A {
    std::shared_ptr<B> bPtr;
public:
    void setB(std::shared_ptr<B> b) { bPtr = b; }
};

class B {
    std::weak_ptr<A> aPtr;  // 用weak_ptr避免循环引用
public:
    void setA(std::shared_ptr<A> a) { aPtr = a; }
};
```

## std::weak_ptr（弱引用）

```cpp
std::weak_ptr<int> wp;

{
    auto sp = std::make_shared<int>(42);
    wp = sp;  // 不增加引用计数

    // 使用前必须先lock
    if (auto locked = wp.lock()) {
        std::cout << *locked;  // 42
    }
}

// sp销毁后
if (auto locked = wp.lock()) {
    // 不会执行到这里
} else {
    std::cout << "对象已销毁";
}
```

## 自定义删除器

```cpp
// unique_ptr的删除器
auto closer = [](FILE* f) { if (f) fclose(f); };
std::unique_ptr<FILE, decltype(closer)> file(fopen("test.txt", "r"), closer);

// shared_ptr的删除器
auto deleter = [](int* p) {
    std::cout << "Deleting " << *p << "\n";
    delete p;
};
std::shared_ptr<int> sp(new int(42), deleter);

// 用于C接口
std::shared_ptr<SDL_Window> window(
    SDL_CreateWindow("Test", 0, 0, 800, 600, 0),
    [](SDL_Window* w) { SDL_DestroyWindow(w); }
);
```

## 别名构造

```cpp
struct Owner {
    int data;
    std::string name;
};

auto owner = std::make_shared<Owner>(Owner{42, "test"});

// 创建指向成员的shared_ptr（不增加Owner的引用计数）
std::shared_ptr<int> dataPtr(owner, &owner->data);
std::cout << *dataPtr;  // 42
```

## make_unique / make_shared

```cpp
// 推荐使用make系列函数
auto p1 = std::make_unique<int>(42);     // 一次内存分配
auto p2 = std::make_shared<int>(42);     // 一次内存分配

// 不推荐
std::unique_ptr<int> p3(new int(42));    // 两次内存分配
std::shared_ptr<int> p4(new int(42));    // 两次内存分配

// 注意：make系列不支持自定义删除器
auto p5 = std::unique_ptr<FILE, decltype(closer)>(
    fopen("test.txt", "r"), closer
);
```

## 综合示例

```cpp
#include <iostream>
#include <memory>
#include <vector>

class Resource {
    std::string name;
public:
    Resource(const std::string& n) : name(n) {
        std::cout << name << " 构造\n";
    }
    ~Resource() {
        std::cout << name << " 析构\n";
    }
    void use() { std::cout << name << " 使用中\n"; }
};

int main() {
    // unique_ptr管理资源
    auto res = std::make_unique<Resource>("A");
    res->use();

    // vector管理多个资源
    std::vector<std::unique_ptr<Resource>> resources;
    resources.push_back(std::make_unique<Resource>("B"));
    resources.push_back(std::make_unique<Resource>("C"));

    for (const auto& r : resources) {
        r->use();
    }

    // shared_ptr共享
    auto shared = std::make_shared<Resource>("Shared");
    auto copy = shared;  // 引用计数=2
    std::cout << "引用计数: " << shared.use_count() << "\n";

    return 0;
}
// 析构顺序：C, B, A, Shared
```

---

**下一步**: [23-异常处理](23-异常处理.md)
