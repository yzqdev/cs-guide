# Rust 基础语法

Rust 是一门系统编程语言，专注于安全、并发和性能。它的语法与 C++ 类似，但提供了内存安全保证。

## 一、Hello World

```rust
fn main() {
    println!("Hello, Rust!");
}
```

```bash
# 创建项目
cargo new hello_rust
cd hello_rust

# 运行
cargo run
```

## 二、变量与可变性

```rust
// 变量默认不可变（immutable）
let x = 5;
// x = 6;  // 错误：不能对不可变变量二次赋值

// mut 关键字声明可变变量
let mut y = 5;
y = 6;         // 正确

// 常量（必须指定类型）
const MAX_POINTS: u32 = 100_000;

// 变量遮蔽（shadowing）
let spaces = "   ";
let spaces = spaces.len();  // 改变了类型
```

## 三、基本数据类型

### 标量类型

```rust
// 整数
let a: i32 = -100;     // 有符号 32 位
let b: u32 = 100;      // 无符号 32 位
let c: i64 = 100_000;  // 可以用下划线分隔
let d: usize = 0;      // 指针宽度（取决于架构）

// 浮点数
let x: f64 = 3.14;     // 默认 f64（双精度）
let y: f32 = 2.5;      // f32（单精度）

// 布尔值
let t: bool = true;
let f: bool = false;

// 字符（4 字节，支持 Unicode）
let c: char = 'A';
let emoji: char = '🦀';
```

### 复合类型

```rust
// 元组（不同类型可以混合）
let tup: (i32, f64, char) = (42, 3.14, 'R');
let (x, y, z) = tup;      // 解构
let first = tup.0;         // 索引访问

// 数组（固定长度，相同类型）
let arr: [i32; 5] = [1, 2, 3, 4, 5];
let first = arr[0];
let slice = &arr[1..4];    // 切片
```

## 四、函数

```rust
// 基本函数
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

// 表达式（没有分号就是返回值）
fn add(x: i32, y: i32) -> i32 {
    x + y  // 注意没有分号
}

// 早期返回
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        return Err("除数不能为零".to_string());
    }
    Ok(a / b)
}

fn main() {
    println!("{}", greet("Rust"));   // Hello, Rust!
    println!("{}", add(3, 5));       // 8
}
```

## 五、控制流

```rust
// if 表达式
let number = 7;
if number < 10 {
    println!("小于 10");
} else if number == 10 {
    println!("等于 10");
} else {
    println!("大于 10");
}

// if 作为表达式
let condition = true;
let result = if condition { 100 } else { 200 };

// loop 循环
let mut counter = 0;
let result = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2;  // 带返回值
    }
};

// while 循环
let mut n = 3;
while n > 0 {
    println!("{}!", n);
    n -= 1;
}

// for 循环（最常用）
let arr = [10, 20, 30, 40, 50];
for element in arr.iter() {
    println!("值是：{}", element);
}

// range
for number in (1..4).rev() {
    println!("{}!", number);
}
```

## 六、字符串

```rust
// &str —— 字符串切片（不可变）
let s: &str = "hello";

// String —— 可变字符串
let mut s = String::from("hello");
s.push_str(", world!");       // 追加字符串
s.push('!');                  // 追加字符
println!("{}", s);            // hello, world!!

// 创建 String
let s1 = String::from("hello");
let s2 = "world".to_string();

// 拼接
let s3 = s1 + " " + &s2;     // s1 被移动了
let s4 = format!("{} {}", s3, "Rust");

// 索引（注意：Rust 字符串不支持直接索引）
let s = "你好";
let len = s.len();            // 6（UTF-8 字节数）
let chars: Vec<char> = s.chars().collect();  // ['你', '好']

// 切片（按字节，注意边界）
let hello = "Здравствуйте";
let s = &hello[0..4];         // "Зд"
```

## 七、所有权基础

```rust
fn main() {
    // 所有权规则：
    // 1. 每个值都有一个所有者
    // 2. 一次只能有一个所有者
    // 3. 所有者离开作用域时值被丢弃

    // 移动（Move）
    let s1 = String::from("hello");
    let s2 = s1;               // s1 被移动到 s2
    // println!("{}", s1);     // 错误：s1 已失效

    // 克隆（Clone）—— 深拷贝
    let s1 = String::from("hello");
    let s2 = s1.clone();
    println!("{} {}", s1, s2); // 都可以用

    // 拷贝（Copy）—— 栈数据自动复制
    let x = 5;
    let y = x;                 // Copy trait，x 仍然可用
    println!("{} {}", x, y);
}
```

## 八、借用与引用

```rust
// 引用（借用）—— 不获取所有权
fn calculate_length(s: &String) -> usize {
    s.len()
}  // 离开作用域时不释放，因为不拥有所有权

// 可变引用
fn change(s: &mut String) {
    s.push_str(" world");
}

// 可变引用的限制：同一作用域只能有一个可变引用
let mut s = String::from("hello");
let r1 = &s;                  // 多个不可变引用可以
let r2 = &s;
let r3 = &mut s;              // 错误：不能同时有可变和不可变引用

fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("{}", s);         // hello world
}
```

## 九、输出与格式化

```rust
fn main() {
    // println! 宏
    let name = "Rust";
    let year = 2015;
    println!("{} 的第一个稳定版发布于 {}", name, year);

    // 格式化占位符
    println!("{0} 是 {1}，{1} 很 {0}", "Rust", "棒");

    // 命名参数
    println!("{name} 发布于 {year}", name = "Rust 1.0", year = 2015);

    // 格式化数字
    println!("{:b}", 255);     // 二进制：11111111
    println!("{:x}", 255);     // 十六进制：ff
    println!("{:o}", 255);     // 八进制：377
    println!("{:.2}", 3.14159);// 保留两位小数：3.14
    println!("{:010}", 42);    // 补齐 10 位：0000000042
    println!("{:<5}", "左");   // 左对齐
    println!("{:>5}", "右");   // 右对齐
    println!("{:^5}", "中");   // 居中

    // 格式化字符串
    let s = format!("{} 是一个系统编程语言", name);
    println!("{}", s);
}
```

## 十、练习

1. 编写一个程序，计算斐波那契数列的第 n 项
2. 编写一个函数，接收两个字符串引用，返回拼接后的新 String
3. 使用 for 循环打印 9x9 乘法表
