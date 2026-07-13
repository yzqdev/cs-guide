# 集合类型

Rust 标准库提供了几种常用的集合类型：Vec、String、HashMap 等。

## 一、Vec（动态数组）

### 1. 创建与修改

```rust
fn main() {
    // 创建空 Vec
    let mut v: Vec<i32> = Vec::new();

    // 使用 vec! 宏创建
    let mut v = vec![1, 2, 3, 4, 5];

    // 添加元素
    v.push(6);
    v.push(7);

    // 删除末尾元素
    let last = v.pop();  // Some(7)

    // 插入
    v.insert(0, 0);      // 在索引 0 插入 0

    // 删除指定索引
    let third = v.remove(2);

    // 获取长度
    println!("长度：{}", v.len());  // 6

    // 清空
    v.clear();
}
```

### 2. 访问元素

```rust
fn main() {
    let v = vec![10, 20, 30, 40, 50];

    // 索引访问（可能越界 panic）
    let third: &i32 = &v[2];
    println!("第三个元素是 {}", third);

    // get 方法（安全访问，返回 Option）
    match v.get(2) {
        Some(value) => println!("第三个元素是 {}", value),
        None => println!("索引越界"),
    }

    // 遍历
    for i in &v {
        println!("{}", i);
    }

    // 遍历并修改
    let mut v = vec![1, 2, 3];
    for i in &mut v {
        *i *= 10;  // 解引用修改
    }
    println!("{:?}", v);  // [10, 20, 30]
}
```

### 3. Vec 与所有权

```rust
fn main() {
    // 在 Vec 中存储引用（需要生命周期）
    // let v: Vec<&str> = vec!["hello", "world"];  // &str 是引用

    // 存储拥有所有权的类型
    let mut v: Vec<String> = Vec::new();
    let s = String::from("hello");
    v.push(s);            // s 的所有权被移动到 v
    // println!("{}", s); // ❌ s 已被移动
}
```

## 二、String

### 1. 创建与更新

```rust
fn main() {
    // 创建
    let mut s = String::new();
    let s = String::from("hello");
    let s = "hello".to_string();

    // 追加
    let mut s = String::from("foo");
    s.push_str("bar");       // foobar
    s.push('!');             // foobar!

    // 拼接（+ 操作符会移动前面的 String）
    let s1 = String::from("Hello, ");
    let s2 = String::from("world!");
    let s3 = s1 + &s2;       // s1 被移动，不能再使用

    // format! 宏（不获取所有权）
    let s1 = String::from("Hello");
    let s2 = String::from("Rust");
    let s3 = format!("{} {}!", s1, s2);  // Hello Rust!
    println!("{} {} {}", s1, s2, s3);    // 所有变量都可用
}
```

### 2. 索引与切片

```rust
fn main() {
    let s = String::from("你好，Rust");

    // Rust 不支持直接索引
    // let c = s[0];  // ❌ 编译错误

    // 获取字节长度
    println!("字节数：{}", s.len());  // 12（中文占 3 字节）

    // 使用 chars() 遍历字符
    for c in s.chars() {
        println!("{}", c);
    }

    // 使用 bytes() 遍历字节
    for b in s.bytes() {
        println!("{}", b);
    }

    // 切片（按字节，必须在字符边界上）
    let hello = &s[0..9];   // "你好，"
    // let panic = &s[0..1]; // ❌ 运行时 panic，因为越过了字符边界
}
```

### 3. 字符串方法

```rust
fn main() {
    let s = String::from("hello world");

    // 查询
    println!("{}", s.contains("world"));           // true
    println!("{:?}", s.find("world"));             // Some(6)

    // 替换
    println!("{}", s.replace("world", "Rust"));    // hello Rust

    // 大小写
    println!("{}", "hello".to_uppercase());         // HELLO
    println!("{}", "HELLO".to_lowercase());         // hello

    // 修剪
    println!("{}", "  hello  ".trim());              // hello

    // 分割
    let words: Vec<&str> = s.split(' ').collect();
    println!("{:?}", words);                        // ["hello", "world"]

    // 判断
    println!("{}", "123".chars().all(|c| c.is_digit(10)));  // true
    println!("{}", s.starts_with("hello"));                  // true
}
```

## 三、HashMap

### 1. 创建与修改

```rust
use std::collections::HashMap;

fn main() {
    // 创建
    let mut scores = HashMap::new();

    // 插入键值对
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    // 使用 collect 从元组 Vec 创建
    let teams = vec![String::from("Blue"), String::from("Red")];
    let initial_scores = vec![10, 50];
    let scores: HashMap<_, _> = teams.iter().zip(initial_scores.iter()).collect();

    // 获取值
    let team_name = String::from("Blue");
    let score = scores.get(&team_name);  // Option<&&i32>

    match score {
        Some(s) => println!("Blue 的分数是 {}", s),
        None => println!("没有该队伍"),
    }

    // 遍历
    for (key, value) in &scores {
        println!("{}: {}", key, value);
    }
}
```

### 2. 更新策略

```rust
use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();
    scores.insert(String::from("Blue"), 10);

    // 覆盖旧值
    scores.insert(String::from("Blue"), 20);
    println!("{:?}", scores);  // {"Blue": 20}

    // 只在键不存在时插入
    scores.entry(String::from("Yellow")).or_insert(50);
    scores.entry(String::from("Blue")).or_insert(50);
    println!("{:?}", scores);  // {"Blue": 20, "Yellow": 50}

    // 根据旧值更新
    let text = "hello world wonderful world";
    let mut map = HashMap::new();
    for word in text.split_whitespace() {
        let count = map.entry(word).or_insert(0);
        *count += 1;
    }
    println!("{:?}", map);
    // {"hello": 1, "world": 2, "wonderful": 1}
}
```

### 3. HashMap 与所有权

```rust
use std::collections::HashMap;

fn main() {
    let field_name = String::from("Favorite color");
    let field_value = String::from("Blue");

    let mut map = HashMap::new();
    map.insert(field_name, field_value);
    // field_name 和 field_value 的所有权被移动到 map
    // println!("{}", field_name);  // ❌ 已被移动

    // 如果插入引用，需要保证引用的生命周期有效
    let key = "name";
    let value = "Alice";
    let mut map2 = HashMap::new();
    map2.insert(&key, &value);  // 存储引用
}
```

## 四、其他集合

| 集合 | 说明 |
|------|------|
| `VecDeque` | 双端队列，可在头尾插入删除 |
| `LinkedList` | 双向链表 |
| `HashSet` | 基于哈希表的集合，元素唯一 |
| `BTreeMap` | 基于 B 树的有序 Map |
| `BTreeSet` | 基于 B 树的有序 Set |
| `BinaryHeap` | 优先队列（最大堆） |

```rust
use std::collections::{HashSet, BTreeMap, BinaryHeap};

fn main() {
    // HashSet：去重
    let mut set = HashSet::new();
    set.insert(1);
    set.insert(2);
    set.insert(1);  // 重复，被忽略
    println!("{:?}", set);  // {1, 2}

    // BTreeMap：有序
    let mut map = BTreeMap::new();
    map.insert("c", 3);
    map.insert("a", 1);
    map.insert("b", 2);
    for (k, v) in &map {
        println!("{}: {}", k, v);  // a:1, b:2, c:3
    }

    // BinaryHeap：最大堆
    let mut heap = BinaryHeap::new();
    heap.push(3);
    heap.push(5);
    heap.push(1);
    println!("{:?}", heap.peek());  // Some(5)
}
```

## 五、迭代器方法

```rust
fn main() {
    let v = vec![1, 2, 3, 4, 5];

    // map：转换每个元素
    let doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();
    println!("{:?}", doubled);  // [2, 4, 6, 8, 10]

    // filter：过滤
    let evens: Vec<&i32> = v.iter().filter(|x| *x % 2 == 0).collect();
    println!("{:?}", evens);  // [2, 4]

    // fold：累积
    let sum = v.iter().fold(0, |acc, x| acc + x);
    println!("{}", sum);  // 15

    // any / all
    let has_even = v.iter().any(|x| x % 2 == 0);  // true
    let all_positive = v.iter().all(|x| x > 0);   // true
}
```

## 六、练习

1. 编写一个函数，接收 `&[i32]`，返回中位数和众数
2. 使用 HashMap 统计一段文本中每个单词出现的次数
3. 使用 Vec 实现一个简单的栈（push / pop / peek）
