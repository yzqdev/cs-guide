# Rust 学习笔记

<Catalog />

## 目录

| 章节 | 标题 | 内容 |
|------|------|------|
| 01 | [基础语法](./01-basics.md) | 变量、数据类型、函数、控制流、字符串、所有权入门 |
| 02 | [所有权与借用](./02-ownership.md) | 移动、克隆、引用、可变引用、切片、借用规则 |
| 03 | [结构体与枚举](./03-structs.md) | struct、方法、enum、Option、match、if let |
| 04 | [集合类型](./04-collections.md) | Vec、String、HashMap、HashSet、BTreeMap、迭代器 |
| 05 | [错误处理](./05-error-handling.md) | panic!、Result、? 运算符、自定义错误、错误转换 |
| 06 | [泛型与 Trait](./06-generics.md) | 泛型函数/结构体、Trait 定义与实现、Trait Bound、派生 |
| 07 | [生命周期](./07-lifetime.md) | 生命周期标注、函数/结构体中的生命周期、省略规则、'static |
| 08 | [闭包与迭代器](./08-closures.md) | 闭包捕获、Fn/FnMut/FnOnce、迭代器适配器、自定义迭代器 |
| 09 | [智能指针](./09-smart-pointers.md) | Box、Deref、Drop、Rc、RefCell、Weak、选择指南 |
| 10 | [并发编程](./10-concurrency.md) | 线程、Channel、Mutex、Arc、Send/Sync、Rayon |
| 11 | [Cargo 深入](./11-cargo.md) | Cargo.toml、Profile、工作空间、条件编译、Features |
| 12 | [异步编程](./12-async.md) | async/await、Tokio、join!/select!、TCP 服务器、Stream |

## 已保留的原始文件

- [安装 Rust](./install.md) — Rust 安装、镜像配置、config.toml
- [命令行工具](./cli-tools.md) — CLI 工具
- [Tauri 教程](./tauri.md) — Tauri 桌面应用配置
- [测试入门](./test.md) — Rust 测试基础
- [常用库](./libs.md) — Rust 生态常用资源

## 推荐学习路径

1. **入门**：01 → 02 → 03（打好所有权和类型系统基础）
2. **核心**：04 → 05 → 06 → 07 → 08（掌握通用编程概念）
3. **进阶**：09 → 10 → 12（智能指针、并发、异步）
4. **工程**：11（项目管理与构建配置）
