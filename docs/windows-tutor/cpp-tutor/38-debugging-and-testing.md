---
order: 39
---

# 38 - 调试与测试

## GDB 基础

```bash
# 编译时加调试信息
g++ -g -std=c++20 -o program main.cpp

# 启动GDB
gdb ./program

# 常用命令
(gdb) break main          # 设置断点
(gdb) break MyClass::func # 函数断点
(gdb) run                 # 运行
(gdb) next                # 单步（不进入函数）
(gdb) step                # 单步（进入函数）
(gdb) continue            # 继续运行
(gdb) print variable      # 打印变量
(gdb) backtrace           # 调用栈
(gdb) watch variable      # 监视变量
(gdb) info locals         # 所有局部变量
```

## AddressSanitizer

```bash
# 检测内存错误
g++ -fsanitize=address -g -o program main.cpp
./program

# 检测未定义行为
g++ -fsanitize=undefined -g -o program main.cpp

# 线程检查
g++ -fsanitize=thread -g -o program main.cpp -pthread
```

## 单元测试（Google Test）

```cpp
#include <gtest/gtest.h>

int add(int a, int b) { return a + b; }

TEST(AddTest, PositiveNumbers) {
    EXPECT_EQ(add(2, 3), 5);
}

TEST(AddTest, NegativeNumbers) {
    EXPECT_EQ(add(-1, -1), -2);
}

TEST(AddTest, Mixed) {
    EXPECT_EQ(add(-1, 1), 0);
}
```

### CMake 配置 GTest

```cmake
include(FetchContent)
FetchContent_Declare(
    googletest
    URL https://github.com/google/googletest/archive/refs/tags/v1.14.0.tar.gz
)
FetchContent_MakeAvailable(googletest)

add_executable(tests tests.cpp)
target_link_libraries(tests GTest::gtest_main)

include(GoogleTest)
gtest_discover_tests(tests)
```

## 断言

```cpp
#include <cassert>

int divide(int a, int b) {
    assert(b != 0 && "Division by zero");  // Debug模式检查
    return a / b;
}

// C++17: assert with message
static_assert(sizeof(int) == 4, "int must be 4 bytes");
```

## 性能分析

```bash
# perf（Linux）
perf record ./program
perf report

# Valgrind
valgrind --tool=callgrind ./program
valgrind --tool=cachegrind ./program
valgrind --tool=massif ./program

# 快速计时
#include <chrono>
auto start = std::chrono::high_resolution_clock::now();
// ... 代码 ...
auto end = std::chrono::high_resolution_clock::now();
auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
std::cout << ms.count() << "ms\n";
```

## 内存泄漏检测

```bash
# Valgrind
valgrind --leak-check=full --show-leak-kinds=all ./program

# AddressSanitizer（推荐）
g++ -fsanitize=address -g -o program main.cpp
# 运行时会自动报告内存泄漏
```

---

**下一步**: [39-代码规范与最佳实践](39-代码规范与最佳实践.md)
