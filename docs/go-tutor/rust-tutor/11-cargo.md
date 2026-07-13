# Cargo 深入

Cargo 是 Rust 的构建系统和包管理器。项目管理、依赖管理、构建配置都由 Cargo 完成。

## 一、Cargo 基础

### 1. 创建项目

```bash
# 创建二进制项目
cargo new my-project

# 创建库项目
cargo new my-lib --lib

# 目录结构
my-project/
├── Cargo.toml    # 项目配置文件
├── src/
│   └── main.rs   # 入口文件
└── .gitignore
```

### 2. 常用命令

```bash
cargo build           # 调试构建
cargo build --release # 发布构建（优化）
cargo run             # 构建并运行
cargo check           # 快速检查（不生成二进制文件）
cargo test            # 运行测试
cargo doc             # 生成文档
cargo doc --open      # 生成文档并打开
cargo clean           # 清理构建产物
cargo update          # 更新依赖
```

## 二、Cargo.toml 配置

### 1. 基本配置

```toml
[package]
name = "my-app"
version = "0.1.0"
edition = "2021"
description = "一个示例 Rust 项目"
authors = ["Your Name <you@example.com>"]
license = "MIT"
repository = "https://github.com/yourname/my-app"
readme = "README.md"
keywords = ["rust", "example"]
categories = ["command-line-utilities"]
```

### 2. 依赖管理

```toml
[dependencies]
# 从 crates.io 获取
serde = "1.0"
serde_json = "1.0"

# 指定版本范围
tokio = "1"           # >=1.0.0, <2.0.0
tokio = "^1.25"       # >=1.25.0, <2.0.0
tokio = "~1.25.0"     # >=1.25.0, <1.26.0
tokio = "=1.25.0"     # 精确版本

# Git 仓库依赖
regex = { git = "https://github.com/rust-lang/regex", branch = "master" }

# 本地路径依赖
my-lib = { path = "../my-lib" }

# 可选依赖
[features]
default = ["serde"]
json = ["serde_json"]

[dependencies.serde]
version = "1.0"
optional = true
```

### 3. 开发依赖

```toml
# 只在测试和开发时使用
[dev-dependencies]
pretty_assertions = "1.4"
criterion = "0.5"

# 构建依赖（build.rs 中使用）
[build-dependencies]
cc = "1.0"
```

## 三、构建配置（Profile）

```toml
[profile.dev]
opt-level = 0          # 优化级别 0-3
debug = true           # 包含调试信息
overflow-checks = true # 算术溢出检查
lto = false            # 链接时优化
incremental = true     # 增量编译

[profile.release]
opt-level = 3          # 最高优化
debug = false
lto = true             # 链接时优化
codegen-units = 1      # 单代单元（更好的优化）
strip = "symbols"      # 去除符号表（减小体积）
```

## 四、工作空间（Workspace）

```toml
# Cargo.toml（根目录）
[workspace]
members = [
    "crates/core",
    "crates/cli",
    "crates/server",
]

# 依赖同一工作空间中的 crate
[dependencies]
core = { path = "crates/core" }
```

```bash
# 工作空间命令
cargo build --workspace
cargo test --workspace
cargo run -p cli       # 运行工作空间中指定的 crate
```

## 五、Cargo 配置（.cargo/config.toml）

```toml
# $HOME/.cargo/config.toml 或项目下的 .cargo/config.toml

# 镜像源（国内加速）
[source.crates-io]
replace-with = "rsproxy"

[source.rsproxy]
registry = "https://rsproxy.cn/crates.io-index"

# 别名
[alias]
b = "build"
c = "check"
t = "test"
r = "run"
rr = "run --release"
```

## 六、条件编译

```rust
// main.rs
#[cfg(target_os = "linux")]
fn get_os() -> &'static str {
    "Linux"
}

#[cfg(target_os = "windows")]
fn get_os() -> &'static str {
    "Windows"
}

#[cfg(target_os = "macos")]
fn get_os() -> &'static str {
    "macOS"
}

#[cfg(not(target_os = "windows"))]
fn unix_only() {
    println!("只在类 Unix 系统运行");
}

#[cfg(feature = "json")]
fn process_json() {
    // 需要 json feature 开启
}

fn main() {
    println!("当前操作系统：{}", get_os());
}
```

## 七、功能特性（Features）

```toml
[features]
default = ["std"]
std = []                  # 标准库支持
full = ["json", "http"]   # 完整功能
json = ["serde", "serde_json"]
http = ["reqwest"]
```

```rust
// lib.rs
#[cfg(feature = "json")]
pub mod json_utils;

#[cfg(not(feature = "std"))]
extern crate alloc;
```

```bash
# 使用特定功能
cargo build --features "json,http"
cargo build --no-default-features  # 禁用默认功能
```

## 八、构建脚本（build.rs）

```rust
// build.rs（在项目根目录）
fn main() {
    // 编译 C 代码
    // cc::Build::new()
    //     .file("src/native/helper.c")
    //     .compile("helper");

    // 生成代码
    // println!("cargo:rerun-if-changed=build.rs");

    // 设置环境变量
    println!("cargo:rustc-env=BUILD_DATE={}", chrono::Utc::now().to_rfc3339());

    // 传递链接参数
    // println!("cargo:rustc-link-lib=static=foo");
    // println!("cargo:rustc-link-search=/path/to/lib");
}
```

## 九、测试配置

```rust
// src/lib.rs
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }

    #[test]
    #[should_panic(expected = "除数为零")]
    fn test_divide_by_zero() {
        panic!("除数为零");
    }

    #[test]
    #[ignore]  // 默认忽略，用 cargo test --ignored 运行
    fn expensive_test() {
        // 耗时的测试
    }
}
```

```bash
# 运行测试
cargo test                     # 所有测试
cargo test test_add            # 运行名字匹配的测试
cargo test -- --nocapture      # 显示 println 输出
cargo test -- --test-threads=1 # 单线程运行
cargo test --ignored           # 运行被忽略的测试
cargo test --release           # 发布模式运行测试
```

## 十、发布到 crates.io

```bash
# 1. 登录
cargo login <your-api-token>

# 2. 检查包是否正确
cargo package

# 3. 发布
cargo publish

# 4. 版本管理
cargo version patch   # 0.1.0 → 0.1.1
cargo version minor   # 0.1.0 → 0.2.0
cargo version major   # 0.1.0 → 1.0.0
```

## 十一、练习

1. 创建一个包含两个 crate 的工作空间（一个库 crate 和一个二进制 crate）
2. 为你的库 crate 添加测试，覆盖正常情况和边界情况
3. 配置 release profile，设置 `opt-level = 3` 和 `lto = true`
