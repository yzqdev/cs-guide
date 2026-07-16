---
order: 22
---

# 21 - 内存管理

## 内存区域

```
高地址
┌─────────────────┐
│     栈 (Stack)    │  ← 局部变量，自动管理，向低地址增长
├─────────────────┤
│       ↓         │
│       ↑         │
├─────────────────┤
│   堆 (Heap)      │  ← new/delete，向高地址增长
├─────────────────┤
│  全局/静态数据区   │  ← 全局变量，static变量
├─────────────────┤
│  代码区 (Text)    │  ← 程序指令
└─────────────────┘
低地址
```

## new 与 delete

```cpp
// 基本用法
int* p = new int(42);        // 分配单个int
delete p;                     // 释放

// 数组
int* arr = new int[100];     // 分配数组
delete[] arr;                 // 释放数组（必须用delete[]）

// 初始化
int* p = new int();           // 值初始化为0
int* p = new int{};           // 同上
int* p = new int{42};         // 初始化为42
int* arr = new int[5]();      // 全部初始化为0
int* arr = new int[5]{1,2,3}; // 部分初始化

// 失败时返回nullptr（C++nothrow）
int* p = new (std::nothrow) int(42);
if (p == nullptr) {
    // 分配失败
}
```

## RAII（资源获取即初始化）

```cpp
// 传统C++（容易出错）
void func() {
    int* arr = new int[100];
    // ... 中间可能抛异常 ...
    delete[] arr;  // 可能执行不到！
}

// RAII（推荐）
void func() {
    std::vector<int> arr(100);  // 构造时获取，析构时释放
    // ... 无论如何都会正确释放 ...
}
```

## 内存对齐

```cpp
struct Bad {
    char a;      // 1字节
    int b;       // 4字节（需要对齐到4）
    char c;      // 1字节
};
// sizeof(Bad) = 12（有填充字节）

struct Good {
    int b;       // 4字节
    char a;      // 1字节
    char c;      // 1字节
};
// sizeof(Good) = 8（更紧凑）

// C++11 alignof
std::cout << alignof(int);      // 4
std::cout << alignof(double);   // 8

// C++11 alignas
struct alignas(16) Aligned {
    int x;
};
// sizeof(Aligned) = 16（对齐到16字节）
```

## Placement new

```cpp
// 在预分配的内存上构造对象
char buffer[sizeof(int)];
int* p = new (buffer) int(42);  // placement new

// 必须手动调用析构函数（不能delete）
p->~int();
```

## 内存泄漏检测

```cpp
// Valgrind（Linux/macOS）
// valgrind --leak-check=full ./program

// AddressSanitizer（推荐，编译器内置）
// g++ -fsanitize=address -g -o program program.cpp

// Windows: CRT Debug Heap
// _CrtDumpMemoryLeaks();  // 在程序退出前调用
```

## 内存池

```cpp
// 简单的内存池示例
template<typename T, size_t PoolSize = 100>
class MemoryPool {
    union Slot {
        T object;
        Slot* next;
        Slot() {}
        ~Slot() {}
    };

    Slot pool[PoolSize];
    Slot* freeList;

public:
    MemoryPool() : freeList(pool) {
        for (size_t i = 0; i < PoolSize - 1; i++) {
            pool[i].next = &pool[i + 1];
        }
        pool[PoolSize - 1].next = nullptr;
    }

    T* allocate() {
        if (!freeList) return nullptr;
        Slot* slot = freeList;
        freeList = freeList->next;
        return reinterpret_cast<T*>(slot);
    }

    void deallocate(T* ptr) {
        Slot* slot = reinterpret_cast<Slot*>(ptr);
        slot->next = freeList;
        freeList = slot;
    }
};
```

---

**下一步**: [22-智能指针](22-智能指针.md)
