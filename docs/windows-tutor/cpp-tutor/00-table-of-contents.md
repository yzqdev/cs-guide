---
order: 1
---

# C++ 完整教程 — 目录

> 一份从零到精通的 C++ 学习路线，覆盖 C++11/14/17/20 核心特性。

---

## 入门篇

| 序号 | 文件 | 内容 |
|------|------|------|
| 00 | [目录与导航](#) | 本文件 |
| 01 | `01-环境搭建.md` | 编译器、IDE、构建工具安装 |
| 02 | `02-第一个程序.md` | Hello World、编译运行流程 |
| 03 | `03-基本语法.md` | 语句、注释、标识符、关键字 |

## 核心篇

| 序号 | 文件 | 内容 |
|------|------|------|
| 04 | `04-变量与数据类型.md` | 基本类型、类型转换、const、constexpr |
| 05 | `05-运算符.md` | 算术、逻辑、位运算、优先级 |
| 06 | `06-控制流.md` | if/else、switch、循环、break/continue |
| 07 | `07-函数.md` | 定义、参数传递、重载、内联、递归 |
| 08 | `08-数组与字符串.md` | C数组、std::array、std::string |
| 09 | `09-指针.md` | 指针运算、void指针、const指针、指针与数组 |
| 10 | `10-引用.md` | 左值引用、右值引用、const引用、转发引用 |

## 面向对象篇

| 序号 | 文件 | 内容 |
|------|------|------|
| 11 | `11-类与对象.md` | 类定义、访问控制、构造/析构、this |
| 12 | `12-成员函数.md` | 普通成员、const成员、static成员、友元 |
| 13 | `13-运算符重载.md` | 常见运算符重载规则与示例 |
| 14 | `14-继承.md` | 单继承、多继承、虚继承、菱形继承 |
| 15 | `15-多态.md` | 虚函数、纯虚函数、RTTI、动态绑定 |
| 16 | `16-特殊成员函数.md` | 拷贝/移动构造、赋值、五/零法则 |

## 泛型编程篇

| 序号 | 文件 | 内容 |
|------|------|------|
| 17 | `17-模板.md` | 函数模板、类模板、模板特化、可变参数模板 |
| 18 | `18-STL容器.md` | vector、list、deque、map、set、unordered容器 |
| 19 | `19-STL算法.md` | sort、find、transform、reduce、ranges |
| 20 | `20-STL迭代器与适配器.md` | 迭代器类别、插入/流迭代器、lambda作为策略 |

## 进阶篇

| 序号 | 文件 | 内容 |
|------|------|------|
| 21 | `21-内存管理.md` | new/delete、内存模型、内存对齐、placement new |
| 22 | `22-智能指针.md` | unique_ptr、shared_ptr、weak_ptr、自定义删除器 |
| 23 | `23-异常处理.md` | try/catch、异常层次、noexcept、异常安全 |
| 24 | `24-类型转换.md` | static_cast、dynamic_cast、const_cast、reinterpret_cast |
| 25 | `25-预处理器.md` | 宏、条件编译、include guard、#pragma |
| 26 | `26-命名空间.md` | 命名空间定义、using声明、匿名命名空间 |

## 现代 C++ 篇

| 序号 | 文件 | 内容 |
|------|------|------|
| 27 | `27-Lambda表达式.md` | 捕获列表、泛型lambda、constexpr lambda |
| 28 | `28-移动语义.md` | 右值引用、移动构造、完美转发、std::move |
| 29 | `29-智能指针进阶.md` | make_unique/make_shared、弱引用循环、自定义删除器 |
| 30 | `30-结构化绑定与optional.md` | auto [x,y]、std::optional/variant/any |
| 31 | `31-C++17特性.md` | if constexpr、折叠表达式、std::filesystem |
| 32 | `32-C++20特性.md` | Concepts、Ranges、Coroutines、Modules、三路比较 |
| 33 | `33-C++23特性.md` | std::print、std::expected、std::generator 等 |

## 文件与系统篇

| 序号 | 文件 | 内容 |
|------|------|------|
| 34 | `34-文件IO.md` | fstream、 stringstream、格式化 |
| 35 | `35-多线程.md` | thread、mutex、condition_variable、atomic |
| 36 | `36-正则表达式.md` | std::regex、匹配、搜索、替换 |

## 工程实践篇

| 序号 | 文件 | 内容 |
|------|------|------|
| 37 | `37-编译与链接.md` | 编译过程、链接、静态库、动态库、CMake |
| 38 | `38-调试与测试.md` | GDB、AddressSanitizer、单元测试(GTest) |
| 39 | `39-代码规范与最佳实践.md` | 命名、RAII、SOLID、常见陷阱 |
| 40 | `40-设计模式.md` | 单例、工厂、观察者、策略、RAII |

---

**建议学习顺序**: 01 → 10 基础，11 → 16 OOP，17 → 20 泛型，21 → 26 进阶，27 → 33 现代C++，34 → 40 工程实践。
