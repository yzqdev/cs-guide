# 结构体与枚举

结构体（struct）和枚举（enum）是 Rust 中定义自定义数据类型的主要方式。

## 一、结构体

### 1. 定义与实例化

```rust
// 定义结构体
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

fn main() {
    // 实例化（所有字段必须赋值）
    let user1 = User {
        email: String::from("alice@example.com"),
        username: String::from("alice"),
        active: true,
        sign_in_count: 1,
    };

    // 访问字段
    println!("{}", user1.email);

    // 可变实例
    let mut user2 = User {
        email: String::from("bob@example.com"),
        username: String::from("bob"),
        active: true,
        sign_in_count: 1,
    };
    user2.email = String::from("bob_new@example.com");
}
```

### 2. 简化写法

```rust
fn build_user(email: String, username: String) -> User {
    User {
        email,           // 字段名与参数名相同时可简写
        username,
        active: true,
        sign_in_count: 1,
    }
}

fn main() {
    let user1 = build_user(
        String::from("user@example.com"),
        String::from("user123"),
    );

    // 使用其他实例的字段（结构体更新语法）
    let user2 = User {
        email: String::from("another@example.com"),
        ..user1           // 其余字段从 user1 获取
    };
    // 注意：username 被移动了，user1 不再可用
}
```

### 3. 元组结构体

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);

    // 解构
    let Color(r, g, b) = black;
    println!("RGB: {} {} {}", r, g, b);
}
```

### 4. 单元结构体

```rust
struct UnitStruct;  // 没有字段，用于 trait 实现

trait SomeTrait {
    fn do_something(&self);
}

impl SomeTrait for UnitStruct {
    fn do_something(&self) {
        println!("doing something");
    }
}
```

## 二、方法

方法是通过 `impl` 块定义在结构体上的函数：

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // 方法：&self 引用
    fn area(&self) -> u32 {
        self.width * self.height
    }

    // 方法：多个参数
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }

    // 关联函数（不是方法）：没有 &self
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let rect = Rectangle {
        width: 30,
        height: 50,
    };

    println!("面积：{}", rect.area());   // 1500

    let square = Rectangle::square(10);  // 调用关联函数
    println!("{:?}", square);            // Rectangle { width: 10, height: 10 }

    // 自动引用和解引用
    let rect_ref = &rect;
    println!("{}", rect_ref.area());     // 自动解引用
}
```

## 三、枚举

### 1. 定义枚举

```rust
enum IpAddrKind {
    V4,
    V6,
}

// 枚举可以关联数据
enum IpAddr {
    V4(u8, u8, u8, u8),  // 四个 u8 表示 IP 地址
    V6(String),
}

fn main() {
    let home = IpAddr::V4(127, 0, 0, 1);
    let loopback = IpAddr::V6(String::from("::1"));

    // 枚举可以携带不同类型和数量的数据
    enum Message {
        Quit,                       // 没有数据
        Move { x: i32, y: i32 },   // 匿名结构体
        Write(String),              // 单个字符串
        ChangeColor(i32, i32, i32), // 三个 i32
    }
}
```

### 2. 枚举方法

```rust
impl Message {
    fn call(&self) {
        match self {
            Message::Quit => println!("退出"),
            Message::Move { x, y } => println!("移动到 ({}, {})", x, y),
            Message::Write(text) => println!("写入：{}", text),
            Message::ChangeColor(r, g, b) => {
                println!("颜色：RGB({}, {}, {})", r, g, b);
            }
        }
    }
}
```

## 四、Option 枚举

Rust 没有 null，而是使用 `Option<T>` 枚举来表示值可能存在或不存在：

```rust
enum Option<T> {
    Some(T),
    None,
}

fn main() {
    let some_number = Some(5);
    let some_string = Some("hello");
    let absent_number: Option<i32> = None;  // 需要显式类型

    // Option<T> 和 T 是不同的类型
    let x: i8 = 5;
    let y: Option<i8> = Some(5);
    // let sum = x + y;  // ❌ 错误：不能直接相加

    // 需要使用 unwrap 或模式匹配
    match y {
        Some(value) => println!("{}", x + value),
        None => println!("y 是空的"),
    }
}
```

## 五、match 控制流

```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}

#[derive(Debug)]
enum UsState {
    Alabama,
    Alaska,
    California,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("来自 {:?} 州的 25 分硬币", state);
            25
        }
    }
}

// match 必须穷举所有可能
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        Some(i) => Some(i + 1),
        None => None,  // 必须处理 None
    }
}

// 使用 _ 通配符处理剩余情况
fn add_fancy_hat() {}
fn remove_fancy_hat() {}
fn move_player(num_spaces: u8) {}

let dice_roll = 9;
match dice_roll {
    3 => add_fancy_hat(),
    7 => remove_fancy_hat(),
    other => move_player(other),  // 使用 other 变量
    // _ => (),                    // 忽略剩余情况
}
```

## 六、if let 简洁控制

```rust
let some_value = Some(3);

// match 写法
match some_value {
    Some(3) => println!("three"),
    _ => (),
}

// if let 简写（只关心一种模式）
if let Some(3) = some_value {
    println!("three");
}

// if let 可以带 else
let mut count = 0;
if let Coin::Quarter(state) = coin {
    println!("来自 {:?} 州的 25 分硬币", state);
} else {
    count += 1;
}
```

## 七、综合示例

```rust
#[derive(Debug)]
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

struct Sheet {
    cells: Vec<SpreadsheetCell>,
}

impl Sheet {
    fn new() -> Sheet {
        Sheet { cells: Vec::new() }
    }

    fn add_cell(&mut self, cell: SpreadsheetCell) {
        self.cells.push(cell);
    }

    fn print_all(&self) {
        for cell in &self.cells {
            match cell {
                SpreadsheetCell::Int(val) => println!("整数：{}", val),
                SpreadsheetCell::Float(val) => println!("浮点数：{}", val),
                SpreadsheetCell::Text(val) => println!("文本：{}", val),
            }
        }
    }
}

fn main() {
    let mut sheet = Sheet::new();
    sheet.add_cell(SpreadsheetCell::Int(42));
    sheet.add_cell(SpreadsheetCell::Float(3.14));
    sheet.add_cell(SpreadsheetCell::Text(String::from("Hello")));
    sheet.print_all();
}
```

## 八、练习

1. 定义一个 `Book` 结构体，包含标题、作者、页数和是否已借出
2. 为 Book 实现方法：`borrow()` 和 `return_book()`，修改借出状态
3. 定义一个 `Temperature` 枚举，包含 `Celsius(f64)` 和 `Fahrenheit(f64)`，实现一个方法将摄氏转为华氏
