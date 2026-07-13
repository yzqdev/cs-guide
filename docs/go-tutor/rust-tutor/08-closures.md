# 闭包与迭代器

## 一、闭包

闭包是可以捕获其环境的匿名函数。

### 1. 基本语法

```rust
fn main() {
    // 完整的闭包定义
    let add_one = |x: i32| -> i32 { x + 1 };

    // 类型推断（大多数情况可以省略类型）
    let add_one = |x| x + 1;

    let result = add_one(5);
    println!("{}", result);  // 6
}
```

### 2. 捕获环境

```rust
fn main() {
    let x = 5;

    // 闭包可以捕获其所在作用域的变量
    let add = |y| x + y;

    println!("{}", add(3));  // 8
}
```

### 3. 三种捕获方式

```rust
fn main() {
    let s = String::from("hello");

    // 1. 不可变借用（Fn trait）
    let print = || println!("{}", s);
    print();                 // 可以多次调用
    println!("{}", s);       // s 仍然可用

    // 2. 可变借用（FnMut trait）
    let mut s = String::from("hello");
    let mut append = || s.push_str(" world");
    append();
    // append();             // 再次调用需要在上一次借用结束后
    println!("{}", s);       // hello world

    // 3. 获取所有权（FnOnce trait）
    let s = String::from("hello");
    let consume = || {
        let _ = s;           // s 被移动到闭包中
    };
    consume();
    // consume();            // 只能调用一次
    // println!("{}", s);    // ❌ s 已被移动
}
```

### 4. move 关键字

```rust
fn main() {
    let s = String::from("hello");

    // move 强制闭包获取所有权
    // 常用于多线程场景
    let closure = move || {
        println!("{}", s);
    };

    // println!("{}", s);  // ❌ s 已被移动到闭包

    closure();  // 可以调用
}
```

### 5. 闭包作为参数

```rust
// Fn：不可变借用
// FnMut：可变借用
// FnOnce：获取所有权

fn apply<F>(f: F) where F: Fn() {
    f();
}

fn apply_twice<F>(mut f: F) where F: FnMut() {
    f();
    f();
}

fn apply_once<F>(f: F) where F: FnOnce() {
    f();
}

fn main() {
    let x = 5;

    // Fn：不修改环境
    let print = || println!("{}", x);
    apply(print);

    // FnMut：修改环境
    let mut count = 0;
    let mut increment = || count += 1;
    apply_twice(increment);
    println!("{}", count);  // 2

    // FnOnce：消耗环境
    let s = String::from("hello");
    let consume = || drop(s);
    apply_once(consume);
}
```

## 二、迭代器

### 1. 创建迭代器

```rust
fn main() {
    let v = vec![1, 2, 3, 4, 5];

    // iter() —— 不可变引用
    let it = v.iter();

    // into_iter() —— 获取所有权
    let it = v.into_iter();

    // iter_mut() —— 可变引用
    let mut v = vec![1, 2, 3];
    let it = v.iter_mut();
}
```

### 2. 消费者适配器

```rust
fn main() {
    let v = vec![1, 2, 3, 4, 5];

    // collect —— 收集到集合
    let doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();
    println!("{:?}", doubled);  // [2, 4, 6, 8, 10]

    // sum —— 求和
    let sum: i32 = v.iter().sum();
    println!("{}", sum);  // 15

    // any —— 是否存在满足条件的元素
    let has_even = v.iter().any(|x| x % 2 == 0);
    println!("{}", has_even);  // true

    // all —— 是否全部满足条件
    let all_positive = v.iter().all(|x| x > 0);
    println!("{}", all_positive);  // true

    // count —— 计数
    let count = v.iter().count();
    println!("{}", count);  // 5

    // max / min
    let max = v.iter().max();
    println!("{:?}", max);  // Some(5)

    // fold —— 累积
    let factorial = (1..=5).fold(1, |acc, x| acc * x);
    println!("{}", factorial);  // 120
}
```

### 3. 迭代器适配器

```rust
fn main() {
    let v = vec![1, 2, 3, 4, 5, 6];

    // map —— 转换
    let doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();

    // filter —— 过滤
    let evens: Vec<&i32> = v.iter().filter(|x| *x % 2 == 0).collect();

    // take —— 取前 n 个
    let first_three: Vec<&i32> = v.iter().take(3).collect();

    // skip —— 跳过 n 个
    let after_three: Vec<&i32> = v.iter().skip(3).collect();

    // chain —— 链式连接
    let c: Vec<i32> = vec![1, 2].into_iter().chain(vec![3, 4]).collect();

    // zip —— 拉链合并
    let keys = vec!["a", "b", "c"];
    let values = vec![1, 2, 3];
    let zipped: Vec<(&str, i32)> = keys.into_iter().zip(values.into_iter()).collect();
    println!("{:?}", zipped);  // [("a", 1), ("b", 2), ("c", 3)]

    // enumerate —— 带索引
    for (index, value) in v.iter().enumerate() {
        println!("索引 {} 的值是 {}", index, value);
    }

    // filter_map —— filter + map 组合
    let nums = vec!["1", "2", "abc", "4"];
    let parsed: Vec<i32> = nums.iter()
        .filter_map(|s| s.parse::<i32>().ok())
        .collect();
    println!("{:?}", parsed);  // [1, 2, 4]
}
```

### 4. 惰性求值

```rust
fn main() {
    let v = vec![1, 2, 3, 4, 5];

    // 迭代器适配器是惰性的——只有调用消费者时才会执行
    let mapped = v.iter().map(|x| {
        println!("处理：{}", x);
        x * 2
    });

    println!("还没开始处理");

    // 调用 collect 时才真正执行
    let result: Vec<i32> = mapped.collect();
    println!("{:?}", result);
}
```

## 三、自定义迭代器

```rust
struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}

// 为 Counter 实现 Iterator trait
impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        self.count += 1;
        if self.count < 6 {
            Some(self.count)
        } else {
            None
        }
    }
}

fn main() {
    let mut counter = Counter::new();

    // 手动调用 next
    assert_eq!(counter.next(), Some(1));
    assert_eq!(counter.next(), Some(2));
    assert_eq!(counter.next(), Some(3));

    // 使用迭代器适配器
    let sum: u32 = Counter::new()
        .zip(Counter::new().skip(1))
        .map(|(a, b)| a * b)
        .filter(|x| x % 3 == 0)
        .sum();
    println!("{}", sum);
}
```

## 四、闭包与迭代器综合示例

```rust
#[derive(Debug)]
struct Student {
    name: String,
    score: u32,
}

impl Student {
    fn new(name: &str, score: u32) -> Self {
        Student {
            name: String::from(name),
            score,
        }
    }
}

fn main() {
    let students = vec![
        Student::new("Alice", 85),
        Student::new("Bob", 72),
        Student::new("Charlie", 95),
        Student::new("David", 63),
        Student::new("Eve", 88),
    ];

    // 找出成绩 >= 80 的学生，按成绩降序排列
    let mut top_students: Vec<&Student> = students.iter()
        .filter(|s| s.score >= 80)
        .collect();

    top_students.sort_by(|a, b| b.score.cmp(&a.score));

    println!("优秀学生：");
    for s in top_students {
        println!("  {} ({})", s.name, s.score);
    }

    // 计算平均分
    let avg: f64 = students.iter()
        .map(|s| s.score)
        .sum::<u32>() as f64
        / students.len() as f64;
    println!("平均分：{:.1}", avg);

    // 找出最高分
    let max_score = students.iter()
        .map(|s| s.score)
        .max()
        .unwrap_or(0);
    println!("最高分：{}", max_score);
}
```

## 五、练习

1. 使用迭代器实现一个函数 `is_sorted(v: &[i32]) -> bool`，判断数组是否已排序
2. 使用 `map` 和 `filter` 将 `Vec<&str>` 中长度大于 3 的字符串转为大写
3. 自定义一个 `Fibonacci` 迭代器，实现 `Iterator` trait
