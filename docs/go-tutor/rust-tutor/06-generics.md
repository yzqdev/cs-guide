# 泛型与 Trait

泛型（Generics）和 Trait 是 Rust 实现代码复用和抽象的核心机制。

## 一、泛型函数

```rust
// 找出 Vec 中最大的元素
// T 必须是可比较的（实现了 PartialOrd）
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];
    println!("最大数：{}", largest(&number_list));

    let char_list = vec!['y', 'm', 'a', 'q'];
    println!("最大字符：{}", largest(&char_list));
}
```

### 多个泛型参数

```rust
use std::cmp::PartialOrd;

// 两个泛型参数
fn mix<T, U>(a: T, b: U) -> (T, U) {
    (a, b)
}

// 带约束的泛型
fn display<T: std::fmt::Display>(item: T) {
    println!("{}", item);
}
```

## 二、泛型结构体

```rust
struct Point<T> {
    x: T,
    y: T,
}

// 多个泛型参数
struct Pair<T, U> {
    first: T,
    second: U,
}

fn main() {
    let integer = Point { x: 5, y: 10 };
    let float = Point { x: 1.5, y: 4.5 };

    // 不同类型
    let pair = Pair {
        first: 42,
        second: "hello",
    };
}

// 为泛型结构体实现方法
impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

// 只为特定类型实现方法
impl Point<f64> {
    fn distance_from_origin(&self) -> f64 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}
```

## 三、泛型枚举

```rust
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}

// 使用示例
fn main() {
    let some_number: Option<i32> = Some(5);
    let some_string: Option<&str> = Some("hello");
    let absent_number: Option<i32> = None;

    let success: Result<i32, &str> = Ok(42);
    let failure: Result<i32, &str> = Err("出错了");
}
```

## 四、Trait 定义与实现

Trait 告诉 Rust 编译器某种类型具有哪些可以共享的功能。

### 1. 定义 Trait

```rust
pub trait Summary {
    fn summarize(&self) -> String;

    // 可以有默认实现
    fn summary_with_footer(&self) -> String {
        format!("{}\n-- 摘自某处", self.summarize())
    }
}
```

### 2. 实现 Trait

```rust
pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}，by {} ({})", self.headline, self.author, self.location)
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}
```

### 3. 使用 Trait

```rust
fn main() {
    let tweet = Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("hello rust"),
        reply: false,
        retweet: false,
    };

    println!("1 条新推文：{}", tweet.summarize());
    println!("{}", tweet.summary_with_footer());
}
```

## 五、Trait 作为参数

```rust
// 方式一：impl Trait 语法（简洁）
pub fn notify(item: impl Summary) {
    println!("快讯！{}", item.summarize());
}

// 方式二：Trait Bound 语法（可读性更好）
pub fn notify<T: Summary>(item: T) {
    println!("快讯！{}", item.summarize());
}

// 多个 Trait 约束
pub fn notify(item: impl Summary + Display) {}

// where 子句（当约束很多时）
fn some_function<T, U>(t: T, u: U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{
    42
}
```

## 六、返回实现 Trait 的类型

```rust
// 返回 impl Trait
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("hello world"),
        reply: false,
        retweet: false,
    }
}

// 注意：只能返回一种具体类型
// ❌ 下面的代码不能编译
// fn returns_summarizable(switch: bool) -> impl Summary {
//     if switch {
//         NewsArticle { ... }
//     } else {
//         Tweet { ... }
//     }
// }
```

## 七、使用 Trait Bound 的条件实现

```rust
struct Pair<T> {
    x: T,
    y: T,
}

// 所有 Pair<T> 都有 new 方法
impl<T> Pair<T> {
    fn new(x: T, y: T) -> Self {
        Self { x, y }
    }
}

// 只有实现了 Display + PartialOrd 的 T 才有 cmp_display 方法
impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("最大的是 x：{}", self.x);
        } else {
            println!("最大的是 y：{}", self.y);
        }
    }
}
```

## 八、标准库常用 Trait

| Trait | 说明 |
|-------|------|
| `Display` | 可显示的格式（`{}`） |
| `Debug` | 可调试的格式（`{:?}`） |
| `Clone` | 可克隆 |
| `Copy` | 可按位复制（栈上类型） |
| `PartialEq` | 可相等比较（`==`，`!=`） |
| `Eq` | 完全相等比较 |
| `PartialOrd` | 可部分比较（`<`，`>`，`<=`，`>=`） |
| `Ord` | 可排序 |
| `Hash` | 可哈希 |
| `Default` | 有默认值 |
| `Iterator` | 可迭代 |
| `IntoIterator` | 可转为迭代器 |
| `From` / `Into` | 类型转换 |
| `Deref` | 解引用 |
| `Drop` | 析构 |

```rust
// 使用 #[derive] 自动实现某些 Trait
#[derive(Debug, Clone, PartialEq, Default)]
struct User {
    name: String,
    age: u8,
}

fn main() {
    let u1 = User::default();
    let u2 = u1.clone();    // Clone
    println!("{:?}", u1);   // Debug
    println!("{}", u1 == u2); // PartialEq
}
```

## 九、泛型性能

Rust 的泛型是**零成本抽象**——编译器会为每种具体类型生成独立的代码（单态化），运行时没有任何开销。

```rust
// 编译时，以下代码会生成两个独立的函数
fn identity<T>(x: T) -> T { x }

fn main() {
    let a = identity(42);      // 生成 identity_i32
    let b = identity(3.14);    // 生成 identity_f64
}
```

## 十、练习

1. 定义一个 `Displayable` trait，包含 `fn display(&self) -> String` 方法
2. 为 `Book` 结构体实现该 trait
3. 编写一个泛型函数 `print_all(items: Vec<impl Displayable>)`，遍历并打印每个元素的 display 结果
