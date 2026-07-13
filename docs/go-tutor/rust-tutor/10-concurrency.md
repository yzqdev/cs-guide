# 并发编程

Rust 的所有权系统和类型系统提供了强大的并发安全保障，编译器可以在编译时防止数据竞争。

## 一、线程

### 1. 创建线程

```rust
use std::thread;
use std::time::Duration;

fn main() {
    // 创建新线程
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("子线程：{}", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    // 主线程继续执行
    for i in 1..5 {
        println!("主线程：{}", i);
        thread::sleep(Duration::from_millis(1));
    }

    // 等待子线程结束
    handle.join().unwrap();
}
```

### 2. move 闭包

```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    // move 将所有权转移到子线程
    let handle = thread::spawn(move || {
        println!("向量：{:?}", v);
    });

    // println!("{:?}", v);  // ❌ v 已被移动

    handle.join().unwrap();
}
```

## 二、消息传递（Channel）

Rust 通过 channel 实现消息传递并发（`std::sync::mpsc`）：

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    // 创建通道
    let (tx, rx) = mpsc::channel();

    // 生产者线程
    thread::spawn(move || {
        let vals = vec![
            String::from("hello"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    // 消费者（主线程）
    for received in rx {
        println!("收到：{}", received);
    }
}
```

### 多生产者

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    let tx1 = tx.clone();
    thread::spawn(move || {
        tx1.send("来自线程 1").unwrap();
    });

    let tx2 = tx.clone();
    thread::spawn(move || {
        tx2.send("来自线程 2").unwrap();
    });

    // 主线程接收
    for received in rx {
        println!("{}", received);
    }
}
```

## 三、互斥锁（Mutex）

`Mutex<T>` 提供互斥访问，同一时间只允许一个线程访问数据：

```rust
use std::sync::Mutex;

fn main() {
    let m = Mutex::new(5);

    {
        let mut num = m.lock().unwrap();
        *num = 6;
    }  // 锁自动释放

    println!("m = {:?}", m);  // Mutex { data: 6 }
}
```

### Arc&lt;Mutex&lt;T&gt;&gt; 多线程共享数据

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // Arc 是线程安全的 Rc
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("结果：{}", *counter.lock().unwrap());  // 10
}
```

## 四、Send 和 Sync

Send 和 Sync 是 Rust 并发安全的关键 trait：

| Trait | 含义 |
|-------|------|
| `Send` | 类型的所有权可以在线程间转移 |
| `Sync` | 类型的引用可以在线程间共享（即 `&T` 是 Send）|

```rust
// 大多数类型都是 Send 和 Sync
// Rc<T> 不是 Send（引用计数非线程安全）
// RefCell<T> 不是 Sync（运行时借用检查非线程安全）
// Mutex<T> 是 Send + Sync
// Arc<T> 是 Send + Sync（当 T: Send + Sync 时）

// 手动实现 Send 和 Sync 是不安全的
struct MyBox(*const u8);
// unsafe impl Send for MyBox {}
// unsafe impl Sync for MyBox {}
```

## 五、原子类型

原子类型提供无锁的线程安全操作：

```rust
use std::sync::atomic::{AtomicBool, AtomicUsize, Ordering};
use std::sync::Arc;
use std::thread;

fn main() {
    // AtomicBool
    let flag = Arc::new(AtomicBool::new(true));

    let flag_clone = Arc::clone(&flag);
    thread::spawn(move || {
        thread::sleep(std::time::Duration::from_secs(1));
        flag_clone.store(false, Ordering::SeqCst);
    });

    while flag.load(Ordering::SeqCst) {
        println!("等待...");
        thread::sleep(std::time::Duration::from_millis(200));
    }
    println!("完成！");

    // AtomicUsize 原子计数器
    let counter = Arc::new(AtomicUsize::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            counter.fetch_add(1, Ordering::SeqCst);
        }));
    }

    for h in handles {
        h.join().unwrap();
    }

    println!("计数器：{}", counter.load(Ordering::SeqCst));  // 10
}
```

## 六、线程池与 Rayon

使用 `rayon` 库可以方便地进行数据并行处理：

```toml
# Cargo.toml
[dependencies]
rayon = "1"
```

```rust
use rayon::prelude::*;

fn main() {
    // 顺序计算
    let sum: u64 = (1..=1000000).sum();

    // 并行计算（自动利用多核）
    let parallel_sum: u64 = (1..=1000000).into_par_iter().sum();

    println!("{} == {}", sum, parallel_sum);  // 结果相同

    // 并行 map
    let numbers: Vec<i32> = (0..1000).collect();
    let doubled: Vec<i32> = numbers.par_iter().map(|n| n * 2).collect();

    // 并行 filter
    let evens: Vec<&i32> = numbers.par_iter().filter(|n| *n % 2 == 0).collect();
}
```

## 七、Barrier 和 Condvar

```rust
use std::sync::{Arc, Barrier};
use std::thread;

// Barrier —— 等待所有线程到达同步点
fn main() {
    let mut handles = Vec::with_capacity(5);
    let barrier = Arc::new(Barrier::new(5));

    for id in 0..5 {
        let barrier = Arc::clone(&barrier);
        handles.push(thread::spawn(move || {
            println!("线程 {} 到达屏障", id);
            barrier.wait();  // 等待所有 5 个线程
            println!("线程 {} 通过屏障", id);
        }));
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
```

## 八、OnceCell 和 OnceLock

```rust
use std::sync::OnceLock;

// 全局单例初始化（线程安全）
static CONFIG: OnceLock<String> = OnceLock::new();

fn get_config() -> &'static str {
    CONFIG.get_or_init(|| {
        // 只初始化一次
        std::fs::read_to_string("config.toml").unwrap_or_default()
    })
}

fn main() {
    println!("配置：{}", get_config());
}
```

## 九、Send 和 Sync 检查示例

```rust
use std::rc::Rc;
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let rc = Rc::new(5);
    // thread::spawn(move || {
    //     println!("{}", rc);
    // });
    // ❌ Rc<i32> 不是 Send，不能在线程间转移

    let arc = Arc::new(Mutex::new(5));
    let arc2 = Arc::clone(&arc);
    thread::spawn(move || {
        let mut val = arc2.lock().unwrap();
        *val += 1;
    });

    thread::sleep(std::time::Duration::from_millis(100));
    println!("{}", *arc.lock().unwrap());
}
```

## 十、练习

1. 使用 Channel 实现一个简单的"生产者-消费者"模型
2. 使用 `Arc<Mutex<Vec<i32>>>` 让多个线程并发地向同一个 Vec 中添加数据
3. 使用 Rayon 并行计算 1 到 1_000_000 中所有偶数的平方和
