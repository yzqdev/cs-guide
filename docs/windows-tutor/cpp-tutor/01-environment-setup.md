---
order: 2
---

# 01 - 环境搭建

## 编译器选择

| 编译器 | 平台 | 说明 |
|--------|------|------|
| GCC (g++) | Linux/macOS/MinGW | 开源，C++标准支持最快 |
| Clang | 跨平台 | 错误信息友好，Apple 默认 |
| MSVC | Windows | Visual Studio 自带，Windows 原生最佳 |

**推荐**: Linux/macOS 用 GCC 或 Clang，Windows 用 MSVC 或 WSL2 + GCC。

## Windows 安装

### 方式一：Visual Studio（推荐）

1. 下载 [Visual Studio Community](https://visualstudio.microsoft.com/)
2. 安装时勾选 **"使用 C++ 的桌面开发"**
3. 打开 **"Developer Command Prompt for VS"**，输入：

```bash
cl /EHsc /std:c++20 hello.cpp
```

### 方式二：WSL2 + GCC

```bash
# 在 WSL2 中
sudo apt update && sudo apt install g++ build-essential
g++ --version
```

### 方式三：MinGW-w64

从 [MSYS2](https://www.msys2.org/) 安装后：

```bash
pacman -S mingw-w64-x86_64-gcc
g++ --version
```

## macOS 安装

```bash
# 安装 Xcode Command Line Tools
xcode-select --install

# 验证
g++ --version
```

## Linux 安装

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install g++ build-essential

# Fedora
sudo dnf install gcc-c++ make

# Arch
sudo pacman -S gcc make
```

## IDE / 编辑器推荐

| 工具 | 说明 |
|------|------|
| **CLion** | JetBrains 出品，C++ 专属 IDE，重构/调试最强 |
| **VS Code** | 轻量 + C/C++ 扩展 + CMake Tools |
| **Visual Studio** | Windows 下全功能 IDE |
| **Vim/Neovim + clangd** | 终端党首选 |

## 构建工具

### CMake（必学）

```bash
# 安装 CMake
# Ubuntu: sudo apt install cmake
# macOS: brew install cmake
# Windows: Visual Studio 自带

# 验证
cmake --version
```

### 一个最小 CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.20)
project(MyApp LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(main main.cpp)
```

### 构建和运行

```bash
mkdir build && cd build
cmake ..
cmake --build .
./main          # Linux/macOS
main.exe        # Windows
```

## 快速验证安装

保存为 `test.cpp`：

```cpp
#include <iostream>
#include <format>  // C++20

int main() {
    std::cout << std::format("C++ version: {}.{}\n",
        __cplusplus / 100 % 100, __cplusplus % 100);
    return 0;
}
```

```bash
g++ -std=c++20 -o test test.cpp && ./test
# 输出: C++ version: 20.xx
```

---

**下一步**: [02-第一个程序](02-第一个程序.md)
