# 所有权与借用

所有权（Ownership）是 Rust 最独特的概念，它让 Rust 无需垃圾回收器就能保证内存安全。

## 一、所有权规则

```text
1. 每个值在 Rust 中都有一个所有者（owner）
2. 同一时间只能有一个所有者
3. 当所有者离开作用域，值将被丢弃
```

```rust
fn main() {
    // String 类型演示所有权的移动
    let s1 = String::from("hello");

    // s1 的所有权被移动到 s2
    let s2 = s1;

    // println!("{}", s1);  // ❌ 编译错误：s1 已被移动
    println!("{}", s2);      // ✅ hello
}
```

## 二、移动（Move）

对于存储在堆上的类型，赋值操作默认是**移动**：

```rust
// 堆类型：String, Vec, Box 等
let v1 = vec![1, 2, 3];
let v2 = v1;                    // 所有权移动

// 栈类型：i32, f64, bool, char 等实现了 Copy trait
let x = 42;
let y = x;                      // 复制（Copy）
println!("{}, {}", x, y);       // 两个都可以用

// 自定义类型默认没有 Copy
#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

let p1 = Point { x: 1, y: 2 };
let p2 = p1;                    // 移动
// println!("{:?}", p1);        // ❌ 编译错误
```

## 三、克隆（Clone）

如果需要深拷贝堆数据，使用 `.clone()`：

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();

    println!("s1 = {}, s2 = {}", s1, s2);  // 两个都可以用

    let v1 = vec![1, 2, 3];
    let v2 = v1.clone();

    println!("{:?}, {:?}", v1, v2);
}
```

## 四、函数与所有权

```rust
fn main() {
    let s = String::from("hello");

    // 所有权移入函数
    take_ownership(s);
    // println!("{}", s);  // ❌ s 已被移动

    let x = 5;
    makes_copy(x);          // i32 实现了 Copy，x 仍然可用
    println!("{}", x);      // ✅

    // 所有权从函数返回
    let s1 = gives_ownership();
    let s2 = String::from("hello");
    let s3 = takes_and_gives_back(s2);
    // s2 已被移动
}

fn take_ownership(some_string: String) {
    println!("{}", some_string);
}  // 这里 some_string 被 drop

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
}

fn gives_ownership() -> String {
    String::from("yours")
}

fn takes_and_gives_back(a_string: String) -> String {
    a_string
}
```

## 五、引用与借用

引用允许访问值而不获取所有权，称为**借用**：

```rust
fn main() {
    let s1 = String::from("hello");

    // &s1 创建引用，不转移所有权
    let len = calculate_length(&s1);

    println!("'{}' 的长度是 {}", s1, len);  // s1 仍然可用
}

// s 是对 String 的引用
fn calculate_length(s: &String) -> usize {
    s.len()
}  // s 不拥有所有权，所以不会被 drop
```

## 六、可变引用

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("{}", s);  // hello, world!
}

fn change(s: &mut String) {
    s.push_str(", world!");
}
```

### 可变引用的限制

**同一作用域中，一个数据只能有一个可变引用：**

```rust
let mut s = String::from("hello");

let r1 = &mut s;
// let r2 = &mut s;  // ❌ 错误：不能同时有两个可变引用

println!("{}", r1);

// 可以通过创建新作用域解决
{
    let r1 = &mut s;
}  // r1 在这里释放
let r2 = &mut s;  // ✅
```

**不能同时有可变引用和不可变引用：**

```rust
let mut s = String::from("hello");

let r1 = &s;      // 不可变引用
let r2 = &s;      // 不可变引用
// let r3 = &mut s; // ❌ 错误：已经有了不可变引用

println!("{} {}", r1, r2);
// r1, r2 不再使用后，可以创建可变引用
let r3 = &mut s;   // ✅
println!("{}", r3);
```

## 七、悬垂引用

Rust 编译器保证不会产生悬垂引用：

```rust
// ❌ 错误：返回局部变量的引用
// fn dangle() -> &String {
//     let s = String::from("hello");
//     &s
// }  // s 被 drop，引用指向无效内存

// ✅ 正确：直接返回所有权
fn no_dangle() -> String {
    String::from("hello")
}
```

## 八、引用的规则总结

```text
1. 同一时间，你可以拥有要么一个可变引用，要么任意多个不可变引用
2. 引用必须总是有效的（编译器检查）
3. 引用默认也是不可变的
4. 引用不拥有所有权，所以离开作用域时不会 drop 值
```

## 九、切片（Slice）

切片是一种不拥有所有权的"视图"类型：

```rust
fn main() {
    // 字符串切片
    let s = String::from("hello world");
    let hello = &s[0..5];     // "hello"
    let world = &s[6..11];    // "world"
    let whole = &s[..];       // 整个字符串

    println!("{} {}", hello, world);

    // 数组切片
    let a = [1, 2, 3, 4, 5];
    let slice = &a[1..3];     // [2, 3]
    println!("{:?}", slice);
}

// 使用 &str 作为参数类型，可以同时接收 &String 和 &str
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}
```

## 十、练习

1. 编写一个函数 `sum(v: &Vec<i32>) -> i32`，计算向量元素之和（使用借用）
2. 编写一个函数 `append_world(s: &mut String)`，在字符串末尾追加 " world"
3. 思考：为什么 `&str` 比 `&String` 更适合作为函数参数？
