# 生命周期

生命周期是 Rust 确保所有引用都有效的机制。每个引用都有一个生命周期，即引用保持有效的作用域。

## 一、为什么需要生命周期

```rust
fn main() {
    let r;

    {
        let x = 5;
        r = &x;  // ❌ x 在这里被 drop，r 成为悬垂引用
    }

    // println!("{}", r);  // 编译错误
}
```

生命周期标注不会改变引用的实际存活时间，只是告诉编译器引用之间的关系。

## 二、生命周期标注语法

```rust
// 生命周期参数以 ' 开头，通常使用 'a
&i32          // 一个引用
&'a i32       // 带有显式生命周期的引用
&'a mut i32   // 带有显式生命周期的可变引用
```

## 三、函数中的生命周期

```rust
// 错误：编译器无法推断返回值的生命周期
// fn longest(x: &str, y: &str) -> &str {
//     if x.len() > y.len() { x } else { y }
// }

// 正确：标注生命周期，表明返回值的生命周期与 x 和 y 相同
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let s1 = String::from("long");
    let s2 = String::from("longer");

    let result = longest(s1.as_str(), s2.as_str());
    println!("较长的字符串是：{}", result);
}

// 生命周期不同时的例子
fn main() {
    let s1 = String::from("long");
    let result;

    {
        let s2 = String::from("short");
        result = longest(s1.as_str(), s2.as_str());
        // result 引用了 s2
    }  // s2 被释放

    // println!("{}", result);  // ❌ 编译错误
}
```

## 四、结构体中的生命周期

```rust
// 当结构体中包含引用时，需要标注生命周期
struct Excerpt<'a> {
    part: &'a str,  // 引用必须在结构体存活期间有效
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().unwrap();
    let excerpt = Excerpt {
        part: first_sentence,
    };
    println!("{}", excerpt.part);
}
```

## 五、生命周期省略规则

在 Rust 1.0 之前，所有引用都需要显式标注生命周期。编译器通过三条规则自动推断：

```rust
// 规则 1：每个引用参数都有自己的生命周期
// 规则 2：如果只有一个输入生命周期，它被赋予所有输出引用
// 规则 3：如果有多个输入生命周期，但其中一个是 &self 或 &mut self，
//         则 self 的生命周期被赋予所有输出引用

// 以下代码可以编译，因为编译器应用了省略规则：

fn first_word(s: &str) -> &str {  // 规则 2：只有一个参数
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}

fn print(s: &str) {}               // 不需要

// 规则 3：方法中的 self
impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 { self.0 }         // 规则 3
    fn announce_and_return(&self, announcement: &str) -> &str {
        println!("{}", announcement);
        self.0  // 规则 3：返回 self 的生命周期
    }
}
```

## 六、方法中的生命周期

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}

impl<'a> ImportantExcerpt<'a> {
    // 规则 3 适用：返回值的生命周期与 &self 相同
    fn level(&self) -> i32 {
        3
    }

    // 需要显式标注：两个输入生命周期
    fn announce_and_return<'b>(&self, announcement: &'b str) -> &'a str
    where
        'a: 'b,  // 表示 'a 至少和 'b 一样长
    {
        println!("{}", announcement);
        self.part
    }
}
```

## 七、静态生命周期

`'static` 生命周期贯穿整个程序运行：

```rust
// 字符串字面量是 &'static str
let s: &'static str = "hello";

// 将泛型约束为 'static
fn generic_static<T: 'static>(t: T) {
    // T 不包含任何借用的引用
    // 即 T 拥有所有数据或全是 'static 引用
}

// 注意：'static 不意味着"永远有效"，而是"存活于整个程序"
// 通过 Box::leak 可以创建 'static 引用
fn leak_string() -> &'static str {
    let s = String::from("leaked");
    Box::leak(s.into_boxed_str())
}
```

## 八、生命周期约束

```rust
// T: 'a —— T 必须活得比 'a 长
// 'a: 'b —— 'a 至少和 'b 一样长

struct Ref<'a, T: 'a> {
    value: &'a T,
}

// 更复杂的约束
fn longest_with_announcement<'a, T>(
    x: &'a str,
    y: &'a str,
    ann: T,
) -> &'a str
where
    T: Display,
{
    println!("公告：{}", ann);
    if x.len() > y.len() { x } else { y }
}
```

## 九、NLL（Non-Lexical Lifetimes）

Rust 2018 引入的 NLL 让生命周期更智能：

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s;          // 不可变借用
    let r2 = &s;          // 不可变借用
    println!("{} {}", r1, r2);
    // r1 和 r2 在这里不再使用

    let r3 = &mut s;      // ✅ 可变借用
    r3.push_str(" world");
}
```

## 十、生命周期与泛型、Trait 结合

```rust
use std::fmt::Display;

// 同时使用泛型、Trait 约束和生命周期
fn longest_with_announcement<'a, T>(
    x: &'a str,
    y: &'a str,
    ann: T,
) -> &'a str
where
    T: Display,  // T 必须实现 Display
{
    println!("公告：{}", ann);
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let s1 = String::from("short");
    let s2 = String::from("longer");
    let result = longest_with_announcement(
        s1.as_str(),
        s2.as_str(),
        "比较完成！",
    );
    println!("较长的：{}", result);
}
```

## 十一、练习

1. 编写一个函数 `first_char(s: &str) -> &str`，返回字符串的第一个字符
2. 写一个结构体 `StrSplit`，包含 `&str` 和分隔符 `&str`，实现 `next` 方法返回分割后的下一段
3. 解释为什么下面的代码无法编译，并修复：

```rust
fn invalid() -> &str {
    let s = String::from("hello");
    &s
}
```
