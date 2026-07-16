---
order: 3
---

# 02 - 第一个程序

## Hello World

```cpp
#include <iostream>  // 包含输入输出流头文件

int main() {         // 程序入口
    std::cout << "Hello, World!" << std::endl;
    return 0;        // 返回 0 表示正常退出
}
```

## 逐行解释

| 代码 | 作用 |
|------|------|
| `#include <iostream>` | 预处理指令，引入标准输入输出库 |
| `int main()` | 主函数，程序从这里开始执行 |
| `std::cout` | 标准字符输出流（console out） |
| `<<` | 插入运算符，将数据送入输出流 |
| `std::endl` | 换行并刷新缓冲区 |
| `return 0;` | 返回操作系统，0 表示成功 |

## 编译与运行

```bash
# GCC/Clang
g++ -std=c++20 -o hello hello.cpp
./hello

# MSVC
cl /EHsc /std:c++20 hello.cpp
hello.exe
```

## 常见编译错误

```cpp
// 错误1: 忘记分号
std::cout << "Hi"   // error: expected ';' before '}' token

// 错误2: 拼写错误
std::cout << "Hi"   // 注意不是 std::coutt

// 错误3: 未包含头文件
std::cout << "Hi";  // error: 'cout' was not declared
```

## using 声明 — 简化代码

```cpp
#include <iostream>

// 方式1: using声明（推荐，避免污染）
using std::cout;
using std::endl;

int main() {
    cout << "Hello" << endl;
}

// 方式2: using指令（小型练习可以用，大型项目避免）
using namespace std;

int main() {
    cout << "Hello" << endl;
}
```

## 输入示例

```cpp
#include <iostream>
#include <string>

int main() {
    std::string name;
    int age;

    std::cout << "请输入你的名字: ";
    std::cin >> name;           // 读取一个单词

    std::cout << "请输入你的年龄: ";
    std::cin >> age;

    std::cout << "你好, " << name << "! 你今年 " << age << " 岁。" << std::endl;
    return 0;
}
```

> `std::cin >>` 遇到空格/换行会停止读取。读取整行用 `std::getline(std::cin, str)`。

## 程序结构总结

```
#include <...>     ← 预处理区
using ...;        ← 命名空间声明（可选）

int main() {      ← 主函数
    // 你的代码
    return 0;
}
```

---

**下一步**: [03-基本语法](03-基本语法.md)
