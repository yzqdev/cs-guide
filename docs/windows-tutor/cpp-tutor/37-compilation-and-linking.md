---
order: 38
---

# 37 - 编译与链接

## 编译过程

```
源代码(.cpp) → 预处理 → 编译 → 汇编 → 链接 → 可执行文件
                ↓         ↓       ↓       ↓
              .i文件    .s文件   .o文件   ELF/EXE
```

## 编译命令

```bash
# 基本编译
g++ -std=c++20 -o program main.cpp

# 优化
g++ -O2 -std=c++20 -o program main.cpp

# 调试信息
g++ -g -std=c++20 -o program main.cpp

# 警告
g++ -Wall -Wextra -Werror -std=c++20 -o program main.cpp

# 多文件编译
g++ -std=c++20 -o program main.cpp utils.cpp parser.cpp
```

## 分步编译

```bash
# 1. 编译为对象文件
g++ -c -std=c++20 main.cpp -o main.o
g++ -c -std=c++20 utils.cpp -o utils.o

# 2. 链接
g++ main.o utils.o -o program
```

## 头文件与源文件

```cpp
// mylib.h（头文件）
#pragma once

class MyClass {
    int data;
public:
    MyClass(int val);
    int get() const;
};

// mylib.cpp（源文件）
#include "mylib.h"

MyClass::MyClass(int val) : data(val) {}
int MyClass::get() const { return data; }
```

## CMake 构建

```cmake
cmake_minimum_required(VERSION 3.20)
project(MyApp LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 添加可执行文件
add_executable(main main.cpp utils.cpp)

# 添加库
add_library(mylib STATIC utils.cpp)  # 静态库
# add_library(mylib SHARED utils.cpp)  # 动态库

# 链接库
target_link_libraries(main PRIVATE mylib)

# 头文件搜索路径
target_include_directories(main PRIVATE ${CMAKE_SOURCE_DIR}/include)
```

## 构建命令

```bash
mkdir build && cd build
cmake ..
cmake --build .
```

## 静态库与动态库

```bash
# 静态库（.a / .lib）
g++ -c utils.cpp -o utils.o
ar rcs libutils.a utils.o

# 动态库（.so / .dll）
g++ -shared -fPIC -o libutils.so utils.o

# 使用
g++ main.cpp -L. -lutils -o program
```

## 常用编译选项

| 选项 | 说明 |
|------|------|
| `-std=c++20` | 指定C++标准 |
| `-O0` ~ `-O3` | 优化级别 |
| `-g` | 生成调试信息 |
| `-Wall -Wextra` | 启用警告 |
| `-Werror` | 警告视为错误 |
| `-fsanitize=address` | 地址检查 |
| `-fsanitize=undefined` | 未定义行为检查 |
| `-fPIC` | 位置无关代码（动态库） |
| `-pthread` | 启用多线程 |
| `-M` | 生成依赖关系 |

---

**下一步**: [38-调试与测试](38-调试与测试.md)
