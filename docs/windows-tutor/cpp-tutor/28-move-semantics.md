---
order: 29
---

# 28 - 移动语义

## 左值与右值

```cpp
// 左值：有名字，可以取地址
int x = 42;     // x 是左值
int* p = &x;    // 可以取地址

// 右值：临时对象，没有名字
42;              // 字面量是右值
1 + 2;           // 表达式结果是右值
std::string("hello");  // 临时对象是右值

// C++11 引用分类
int& lref = x;        // 左值引用
int&& rref = 42;      // 右值引用
```

## std::move

```cpp
// std::move 不移动任何东西，只是将左值转换为右值引用
int x = 42;
int&& rref = std::move(x);  // x 现在处于有效但未指定的状态

// 实际用途：触发移动构造/移动赋值
std::string a = "hello";
std::string b = std::move(a);  // 移动构造，a变为空
// 比 a = b 高效得多（避免了内存分配和拷贝）
```

## 移动构造函数

```cpp
class Buffer {
    int* data;
    size_t size;
public:
    // 普通构造
    Buffer(size_t n) : data(new int[n]{}), size(n) {}

    // 拷贝构造（深拷贝，慢）
    Buffer(const Buffer& other) : data(new int[other.size]), size(other.size) {
        std::copy(other.data, other.data + size, data);
    }

    // 移动构造（转移资源，快）
    Buffer(Buffer&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;  // 源对象变为空
        other.size = 0;
    }

    ~Buffer() { delete[] data; }
};

Buffer createBuffer() {
    return Buffer(1024);  // 返回时触发移动（或RVO）
}

Buffer b = createBuffer();  // 移动构造，无深拷贝
Buffer b2 = std::move(b);   // 移动构造
```

## 移动赋值运算符

```cpp
Buffer& operator=(Buffer&& other) noexcept {
    if (this != &other) {
        delete[] data;         // 释放旧资源
        data = other.data;     // 接管资源
        size = other.size;
        other.data = nullptr;
        other.size = 0;
    }
    return *this;
}
```

## 完美转发

```cpp
// 转发引用保持参数的值类别
template<typename T>
void wrapper(T&& arg) {
    target(std::forward<T>(arg));  // 保持左/右值属性
}

void target(int& x) { std::cout << "lvalue\n"; }
void target(int&& x) { std::cout << "rvalue\n"; }

int x = 10;
wrapper(x);       // 输出 "lvalue"（x是左值）
wrapper(42);      // 输出 "rvalue"（42是右值）
```

## 移动语义规则

```cpp
// 1. 移动后源对象处于有效但未指定的状态
// 2. 可以安全地销毁或重新赋值
// 3. 不要使用已移动的对象（除了销毁或重新赋值）

std::string a = "hello";
std::string b = std::move(a);
// a 现在是空的（有效但未指定）
a = "new value";  // OK：重新赋值
// std::cout << a.length();  // 未定义行为（可能，取决于实现）
```

## 移动语义与容器

```cpp
std::vector<Buffer> v;
v.push_back(Buffer(1024));     // 可能触发移动
v.emplace_back(1024);          // 直接构造（最高效）

// 插入时的移动
std::vector<std::string> v = {"hello", "world"};
std::string s = "test";
v.push_back(std::move(s));  // 移动s到vector
// s 现在是空的
```

## 移动语义最佳实践

```cpp
// 1. 总是为移动操作标记noexcept
class MyClass {
public:
    MyClass(MyClass&& other) noexcept;
    MyClass& operator=(MyClass&& other) noexcept;
};

// 2. 使用std::move触发移动
void process(std::vector<int> v) { /* ... */ }
std::vector<int> data = {1, 2, 3};
process(std::move(data));  // 移动而非拷贝

// 3. 返回值优化优先于std::move
Buffer create() {
    return Buffer(1024);  // RVO，不需要std::move
}

// 4. 不要过度使用std::move
std::string s = "hello";
std::string s2 = s;        // 拷贝（通常OK）
std::string s3 = std::move(s);  // 只在你需要s变空时使用
```

---

**下一步**: [29-智能指针进阶](29-智能指针进阶.md)
