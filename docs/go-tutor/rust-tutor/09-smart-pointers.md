# 智能指针

智能指针（Smart Pointer）是实现了 `Deref` 和 `Drop` trait 的数据结构。与普通引用不同，智能指针通常拥有数据的所有权。

## 一、Box&lt;T&gt;

`Box<T>` 是最简单的智能指针，它将数据分配在堆上，而不是栈上。

```rust
fn main() {
    // 在堆上存储 i32
    let b = Box::new(5);
    println!("b = {}", b);  // 自动解引用

    // 使用 Box 创建递归类型
    // 递归类型必须在编译时知道大小
    // 使用 Box 间接存储
    enum List {
        Cons(i32, Box<List>),
        Nil,
    }

    let list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));
}
```

### Box 的主要用途

```rust
// 1. 在堆上分配大数据，避免栈溢出
fn main() {
    let large_data = Box::new([0u8; 1024 * 1024]);  // 1MB 在堆上
}

// 2. 动态大小的类型
fn print_dyn(thing: Box<dyn std::fmt::Display>) {
    println!("{}", thing);
}

// 3. 实现未知大小的 trait 对象
trait Animal {
    fn make_sound(&self);
}

struct Dog;
impl Animal for Dog {
    fn make_sound(&self) { println!("汪汪！"); }
}

fn get_animal() -> Box<dyn Animal> {
    Box::new(Dog)
}
```

## 二、Deref trait

实现 `Deref` 可以让智能指针像普通引用一样使用：

```rust
use std::ops::Deref;

struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &T {
        &self.0
    }
}

fn main() {
    let x = 5;
    let y = MyBox::new(x);

    assert_eq!(5, x);
    assert_eq!(5, *y);  // 自动解引用
}
```

### 隐式 Deref 转换

```rust
fn hello(name: &str) {
    println!("Hello, {}!", name);
}

fn main() {
    let s = MyBox::new(String::from("Rust"));

    // MyBox<String> → &String → &str
    hello(&s);  // 通过 Deref 自动转换
}
```

## 三、Drop trait

`Drop` trait 在值离开作用域时自动调用，用于释放资源：

```rust
struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("正在销毁：{}", self.data);
    }
}

fn main() {
    let c = CustomSmartPointer {
        data: String::from("my stuff"),
    };
    let d = CustomSmartPointer {
        data: String::from("other stuff"),
    };
    println!("创建完毕");
    // 按创建顺序的逆序销毁：d 先，c 后
}
```

## 四、Rc&lt;T&gt;

`Rc<T>`（Reference Counted）允许多个所有者共享一个数据（只读）：

```rust
use std::rc::Rc;

fn main() {
    let a = Rc::new(String::from("hello"));

    let b = Rc::clone(&a);  // 引用计数 +1
    let c = Rc::clone(&a);  // 引用计数 +1

    println!("引用计数：{}", Rc::strong_count(&a));  // 3

    {
        let d = Rc::clone(&a);
        println!("引用计数：{}", Rc::strong_count(&a));  // 4
    }  // d 离开作用域，计数 -1

    println!("引用计数：{}", Rc::strong_count(&a));  // 3
}
```

### Rc 与 RefCell 配合实现可变性

```rust
use std::rc::Rc;
use std::cell::RefCell;

// Rc 本身不可变，结合 RefCell 获得内部可变性
fn main() {
    let value = Rc::new(RefCell::new(5));

    let a = Rc::clone(&value);
    let b = Rc::clone(&value);

    *value.borrow_mut() += 10;  // 通过 RefCell 修改

    println!("{:?}", a);  // 15
    println!("{:?}", b);  // 15
}
```

## 五、RefCell&lt;T&gt;

`RefCell<T>` 提供**内部可变性**——即使 `RefCell<T>` 本身不可变，也可以修改内部值：

```rust
use std::cell::RefCell;

fn main() {
    let cell = RefCell::new(5);

    // borrow —— 不可变借用
    {
        let v = cell.borrow();
        println!("{}", v);  // 5
    }

    // borrow_mut —— 可变借用
    {
        let mut v = cell.borrow_mut();
        *v = 10;
    }

    println!("{}", cell.borrow());  // 10
}
```

### RefCell 的运行时借用检查

```rust
// 编译通过，但运行时 panic
fn main() {
    let cell = RefCell::new(5);

    let _mut_ref = cell.borrow_mut();
    // let _another = cell.borrow();  // ❌ 运行时 panic：已经有一个可变借用
}
```

## 六、RefCell + Rc 实现多重所有权可变性

```rust
use std::rc::Rc;
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    children: Vec<Rc<RefCell<Node>>>,
}

fn main() {
    let leaf = Rc::new(RefCell::new(Node {
        value: 3,
        children: vec![],
    }));

    let branch = Rc::new(RefCell::new(Node {
        value: 5,
        children: vec![Rc::clone(&leaf)],
    }));

    // 修改 leaf
    leaf.borrow_mut().value = 10;

    println!("branch: {:#?}", branch);
}
```

## 七、Weak&lt;T&gt;

`Weak<T>` 是 `Rc` 的弱引用版本，不会增加引用计数，用于解决循环引用：

```rust
use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    println!("leaf 强引用：{}", Rc::strong_count(&leaf));  // 1
    println!("leaf 弱引用：{}", Rc::weak_count(&leaf));    // 0

    {
        let branch = Rc::new(Node {
            value: 5,
            parent: RefCell::new(Weak::new()),
            children: RefCell::new(vec![Rc::clone(&leaf)]),
        });

        *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

        println!("branch 强引用：{}", Rc::strong_count(&branch));  // 1
        println!("branch 弱引用：{}", Rc::weak_count(&branch));    // 1

        println!("leaf 强引用：{}", Rc::strong_count(&leaf));      // 2
        println!("leaf 弱引用：{}", Rc::weak_count(&leaf));        // 0
    }  // branch 被释放，leaf.parent 变成空

    // 通过 upgrade 获取弱引用的值
    println!("leaf 的父节点：{:?}", leaf.parent.borrow().upgrade());
    // None（branch 已释放）
}
```

## 八、智能指针选择指南

| 智能指针 | 所有权 | 可变性 | 线程安全 | 用途 |
|----------|--------|--------|----------|------|
| `Box<T>` | 单一 | 是 | 是 | 堆分配、递归类型、trait 对象 |
| `Rc<T>` | 共享 | 否 | 否 | 单线程下多重所有权 |
| `RefCell<T>` | 单一 | 运行时检查 | 否 | 内部可变性 |
| `Rc<RefCell<T>>` | 共享 | 运行时检查 | 否 | 多重所有权 + 可变 |
| `Arc<T>` | 共享 | 否 | 是 | 多线程共享所有权 |
| `Mutex<T>` | 单一 | 运行时检查 | 是 | 多线程内部可变性 |
| `Arc<Mutex<T>>` | 共享 | 运行时检查 | 是 | 多线程共享 + 可变 |
| `Weak<T>` | 不拥有 | 否 | 否 | 防止循环引用 |

## 九、练习

1. 使用 `Box` 实现一个链表（`Cons` 和 `Nil` 枚举）
2. 使用 `Rc` 和 `RefCell` 实现一个简单的图（节点可以互相引用）
3. 解释为什么需要 `Weak`，并举一个循环引用的例子
