---
order: 30
---

# 29 - 智能指针进阶

## make_unique 与 make_shared

```cpp
// make_unique（C++14）
auto p1 = std::make_unique<int>(42);
auto p2 = std::make_unique<std::vector<int>>(5, 10);  // 5个10

// make_shared（C++11）
auto p3 = std::make_shared<int>(42);
auto p4 = std::make_shared<std::string>("hello");

// 优势：异常安全 + 性能（单次内存分配）
// 危险写法（可能内存泄漏）
process(std::shared_ptr<Widget>(new Widget()), compute());
// 如果compute()抛异常，Widget已分配但shared_ptr未构造
// 安全写法
process(std::make_shared<Widget>(), compute());
```

## shared_ptr 控制块

```
shared_ptr 内部结构：
┌─────────────────┐
│ 指针 → 对象      │
├─────────────────┤
│ 指针 → 控制块    │
└─────────────────┘

控制块：
┌─────────────────┐
│ 强引用计数       │
├─────────────────┤
│ 弱引用计数       │
├─────────────────┤
│ 删除器          │
├─────────────────┤
│ 分配器          │
└─────────────────┘
```

## 循环引用问题

```cpp
class B;

class A {
public:
    std::shared_ptr<B> bPtr;
    ~A() { std::cout << "A destroyed\n"; }
};

class B {
public:
    std::shared_ptr<A> aPtr;  // 强引用 → 循环引用！
    ~B() { std::cout << "B destroyed\n"; }
};

{
    auto a = std::make_shared<A>();
    auto b = std::make_shared<B>();
    a->bPtr = b;  // A引用B
    b->aPtr = a;  // B引用A（循环！）
}
// A和B都不会被销毁！内存泄漏！
```

### 解决方案：weak_ptr

```cpp
class B {
public:
    std::weak_ptr<A> aPtr;  // 弱引用 → 打破循环
    ~B() { std::cout << "B destroyed\n"; }
};

// 使用时检查
if (auto a = b->aPtr.lock()) {
    a->doSomething();
}
```

## 自定义删除器详解

```cpp
// unique_ptr删除器（作为类型的一部分）
auto fileDeleter = [](FILE* f) { if (f) fclose(f); };
std::unique_ptr<FILE, decltype(fileDeleter)> file(fopen("test.txt", "r"), fileDeleter);

// shared_ptr删除器（不在类型中）
std::shared_ptr<FILE> file(fopen("test.txt", "r"), [](FILE* f) {
    if (f) fclose(f);
});

// 网络连接示例
class Connection {
    int fd;
public:
    Connection(int fd) : fd(fd) {}
    ~Connection() { close(fd); }
    void send(const char* data) { /* ... */ }
};

auto conn = std::make_shared<Connection>(socket(AF_INET, SOCK_STREAM, 0));
```

## shared_ptr 与 this

```cpp
class Widget : public std::enable_shared_from_this<Widget> {
public:
    std::shared_ptr<Widget> getShared() {
        return shared_from_this();  // 安全获取shared_ptr
    }
};

auto w = std::make_shared<Widget>();
auto w2 = w->getShared();  // 两个shared_ptr共享同一对象
```

## 弱引用的高级用法

```cpp
// 缓存
class Image {
    mutable std::weak_ptr<std::vector<char>> cache;
public:
    std::shared_ptr<std::vector<char>> getData() const {
        if (auto data = cache.lock()) {
            return data;  // 缓存有效
        }
        // 加载数据
        auto data = std::make_shared<std::vector<char>>(loadImage());
        cache = data;
        return data;
    }
};

// 观察者模式
class Subject;
class Observer {
    std::weak_ptr<Subject> subject;
public:
    void observe(std::shared_ptr<Subject> s) {
        subject = s;
    }
    void update() {
        if (auto s = subject.lock()) {
            // 处理更新
        }
    }
};
```

## 线程安全

```cpp
// shared_ptr引用计数是线程安全的
// 但对所指向对象的访问不是线程安全的

std::shared_ptr<int> shared = std::make_shared<int>(0);

// 线程安全：引用计数操作
std::thread t1([shared]() { auto p = shared; });  // 拷贝shared_ptr是安全的
std::thread t2([shared]() { auto p = shared; });

// 不安全：同时读写对象
// 线程1: *shared = 1;
// 线程2: std::cout << *shared;  // 数据竞争！
```

---

**下一步**: [30-结构化绑定与optional](30-结构化绑定与optional.md)
