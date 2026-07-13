# 错误处理

Rust 将错误分为两类：**可恢复错误**（用 `Result<T, E>`）和**不可恢复错误**（用 `panic!`）。

## 一、panic! 与不可恢复错误

```rust
fn main() {
    // 主动触发 panic
    // panic!("程序崩溃了！");

    // 数组越界会触发 panic
    let v = vec![1, 2, 3];
    // v[99];  // 运行时 panic

    // 使用 RUST_BACKTRACE 查看堆栈
    // 运行：RUST_BACKTRACE=1 cargo run
}
```

## 二、Result 与可恢复错误

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

### 1. 基本用法

```rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => {
            panic!("打开文件失败：{:?}", error)
        },
    };
}
```

### 2. 匹配不同错误类型

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("创建文件失败：{:?}", e),
            },
            other_error => {
                panic!("打开文件失败：{:?}", other_error)
            }
        },
    };
}
```

### 3. unwrap 和 expect

```rust
fn main() {
    // unwrap：Ok 时返回值，Err 时 panic
    let f = File::open("hello.txt").unwrap();

    // expect：可以自定义 panic 消息
    let f = File::open("hello.txt")
        .expect("无法打开 hello.txt");
}
```

## 三、传播错误

```rust
use std::fs::File;
use std::io::{self, Read};

// 将错误返回给调用者
fn read_username_from_file() -> Result<String, io::Error> {
    let f = File::open("hello.txt");

    let mut f = match f {
        Ok(file) => file,
        Err(e) => return Err(e),
    };

    let mut s = String::new();

    match f.read_to_string(&mut s) {
        Ok(_) => Ok(s),
        Err(e) => Err(e),
    }
}
```

## 四、? 运算符

`?` 运算符是传播错误的简写：

```rust
use std::fs::File;
use std::io::{self, Read};

// 使用 ? 简化错误传播
fn read_username_from_file() -> Result<String, io::Error> {
    let mut f = File::open("hello.txt")?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}

// 更简写的方式
fn read_username_from_file_short() -> Result<String, io::Error> {
    let mut s = String::new();
    File::open("hello.txt")?.read_to_string(&mut s)?;
    Ok(s)
}

// 更简单的：使用 fs::read_to_string
use std::fs;
fn read_username() -> Result<String, io::Error> {
    fs::read_to_string("hello.txt")
}
```

### ? 运算符的特性

```rust
use std::num::ParseIntError;

// ? 会自动转换错误类型（通过 From trait）
fn parse_number(s: &str) -> Result<i32, ParseIntError> {
    let num: i32 = s.parse()?;  // 返回 Err(ParseIntError)
    Ok(num)
}

// 在 main 函数中使用 ?
// main 可以返回 Result
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let f = File::open("hello.txt")?;
    Ok(())
}
```

## 五、自定义错误类型

```rust
use std::fmt;

#[derive(Debug)]
enum MyError {
    NotFound(String),
    PermissionDenied,
    InvalidData { field: String, message: String },
}

// 实现 Display 以便错误可以被打印
impl fmt::Display for MyError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            MyError::NotFound(name) => write!(f, "未找到：{}", name),
            MyError::PermissionDenied => write!(f, "权限不足"),
            MyError::InvalidData { field, message } => {
                write!(f, "字段 {} 数据无效：{}", field, message)
            }
        }
    }
}

impl std::error::Error for MyError {}  // 实现 Error trait

// 使用自定义错误
fn find_user(id: u32) -> Result<String, MyError> {
    match id {
        0 => Err(MyError::NotFound(format!("用户 {}", id))),
        1 => Ok(String::from("Alice")),
        _ => Err(MyError::InvalidData {
            field: "id".to_string(),
            message: "超出范围".to_string(),
        }),
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let user = find_user(0)?;
    println!("{}", user);
    Ok(())
}
```

## 六、错误转换

```rust
use std::num::ParseIntError;
use std::fmt;

// 定义错误类型并实现 From trait
#[derive(Debug)]
struct AppError {
    kind: String,
    message: String,
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}: {}", self.kind, self.message)
    }
}

impl From<ParseIntError> for AppError {
    fn from(error: ParseIntError) -> Self {
        AppError {
            kind: "ParseError".to_string(),
            message: error.to_string(),
        }
    }
}

impl From<std::io::Error> for AppError {
    fn from(error: std::io::Error) -> Self {
        AppError {
            kind: "IOError".to_string(),
            message: error.to_string(),
        }
    }
}

// 使用 ? 自动转换
fn process_data(path: &str) -> Result<i32, AppError> {
    let content = std::fs::read_to_string(path)?;  // io::Error → AppError
    let num: i32 = content.trim().parse()?;         // ParseIntError → AppError
    Ok(num)
}
```

## 七、Option 与 Result 组合

```rust
fn main() {
    // Option 的 OK 和 ok_or
    let value = Some(42);
    let result: Result<i32, &str> = value.ok_or("值为空");
    let result: Result<i32, &str> = value.ok_or_else(|| "值为空");

    // Result 的 ok
    let result: Result<i32, &str> = Ok(42);
    let option: Option<i32> = result.ok();

    // 链式调用
    let nums = vec!["1", "2", "abc", "4"];
    let sum: i32 = nums.iter()
        .map(|s| s.parse::<i32>())
        .filter_map(Result::ok)  // 忽略 Err
        .sum();
    println!("{}", sum);  // 1 + 2 + 4 = 7
}
```

## 八、常用错误处理方法

```rust
use std::fs;
use std::io;

// 处理文件不存在的默认值
fn read_or_default(path: &str) -> String {
    fs::read_to_string(path).unwrap_or_default()
}

// 处理复杂的错误场景
fn load_config(path: &str) -> String {
    fs::read_to_string(path).unwrap_or_else(|_| {
        // 读取失败时返回默认配置
        String::from("{\"debug\": true}")
    })
}

// 传播错误并添加上下文
fn read_config(path: &str) -> Result<String, io::Error> {
    fs::read_to_string(path).map_err(|e| {
        eprintln!("读取配置文件失败：{}", e);
        e
    })
}
```

## 九、练习

1. 编写一个函数 `divide(a: f64, b: f64) -> Result<f64, String>`，除数为零时返回错误
2. 编写一个函数，从文件读取数字列表并计算平均值，使用 ? 传播错误
3. 创建一个自定义错误类型 `ConfigError`，包含 `FileNotFound(String)` 和 `ParseError(ParseIntError)` 两种变体
