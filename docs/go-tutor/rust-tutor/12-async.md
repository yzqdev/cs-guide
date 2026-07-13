# 异步编程

Rust 的异步编程基于 `Future` trait 和 `async/await` 语法，提供零成本的异步抽象。

## 一、async/await 基础

### 1. async 函数

```rust
use std::time::Duration;

// async 函数返回一个 Future
async fn greet() -> String {
    String::from("Hello, async!")
}

// 等价于：
// fn greet() -> impl Future<Output = String> {
//     async { String::from("Hello, async!") }
// }
```

### 2. 执行 Future

Future 需要执行器才能运行：

```rust
// 方式一：使用 futures::executor::block_on（简单场景）
// Cargo.toml: futures = "0.3"

fn main() {
    futures::executor::block_on(async {
        println!("Hello from async!");
    });
}

// 方式二：使用 tokio 运行时（生产环境）
// Cargo.toml: tokio = { version = "1", features = ["full"] }

#[tokio::main]
async fn main() {
    println!("Hello from tokio!");
}
```

## 二、Tokio 运行时

Tokio 是 Rust 最流行的异步运行时。

### 1. 安装

```toml
[dependencies]
tokio = { version = "1", features = ["full"] }
```

### 2. 基本使用

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    println!("开始");
    sleep(Duration::from_secs(1)).await;
    println!("1 秒后");
}
```

### 3. 多个任务并发

```rust
use tokio::time::{sleep, Duration};

async fn task(name: &str, seconds: u64) {
    println!("任务 {} 开始", name);
    sleep(Duration::from_secs(seconds)).await;
    println!("任务 {} 完成（{} 秒）", name, seconds);
}

#[tokio::main]
async fn main() {
    let start = std::time::Instant::now();

    // 并发执行两个任务
    let handle1 = tokio::spawn(task("A", 2));
    let handle2 = tokio::spawn(task("B", 1));

    // 等待两个任务完成
    handle1.await.unwrap();
    handle2.await.unwrap();

    println!("总耗时：{:?}", start.elapsed());
    // 约 2 秒（不是 3 秒，因为并发执行）
}
```

## 三、tokio::join!

使用 `tokio::join!` 同时等待多个 Future：

```rust
use tokio::time::{sleep, Duration};

async fn compute(id: u32) -> u32 {
    sleep(Duration::from_millis(500)).await;
    id * 2
}

#[tokio::main]
async fn main() {
    let start = std::time::Instant::now();

    // 同时等待所有 Future
    let (a, b, c) = tokio::join!(
        compute(1),
        compute(2),
        compute(3),
    );

    println!("结果：{}, {}, {}（耗时：{:?}）", a, b, c, start.elapsed());
    // 约 500ms，不是 1500ms
}
```

### try_join! 用于 Result

```rust
use tokio::time::{sleep, Duration};

async fn fetch(id: u32) -> Result<String, String> {
    sleep(Duration::from_millis(100)).await;
    if id == 0 {
        Err(format!("数据 {} 不存在", id))
    } else {
        Ok(format!("数据 {}", id))
    }
}

#[tokio::main]
async fn main() -> Result<(), String> {
    // 全部成功才返回 Ok，任一失败立即返回 Err
    let (a, b) = tokio::try_join!(
        fetch(1),
        fetch(2),
    )?;

    println!("{}, {}", a, b);
    Ok(())
}
```

## 四、tokio::select!

`tokio::select!` 等待多个 Future 中第一个完成的：

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    tokio::select! {
        v = compute_slow() => println!("慢计算完成：{}", v),
        v = compute_fast() => println!("快计算完成：{}", v),
        _ = tokio::time::sleep(Duration::from_secs(3)) => {
            println!("超时");
        }
    }
}

async fn compute_slow() -> u32 {
    sleep(Duration::from_secs(2)).await;
    100
}

async fn compute_fast() -> u32 {
    sleep(Duration::from_secs(1)).await;
    50
}
```

## 五、异步 TCP 服务器

```rust
use tokio::net::TcpListener;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let listener = TcpListener::bind("127.0.0.1:8080").await?;
    println!("服务器运行在 127.0.0.1:8080");

    loop {
        let (mut socket, addr) = listener.accept().await?;
        println!("新的连接：{}", addr);

        // 为每个连接创建一个新任务
        tokio::spawn(async move {
            let mut buf = vec![0; 1024];
            loop {
                match socket.read(&mut buf).await {
                    // 连接关闭
                    Ok(0) => {
                        println!("{} 断开连接", addr);
                        return;
                    }
                    Ok(n) => {
                        // 原样返回收到的数据
                        if let Err(e) = socket.write_all(&buf[..n]).await {
                            eprintln!("写入错误：{}", e);
                            return;
                        }
                    }
                    Err(e) => {
                        eprintln!("读取错误：{}", e);
                        return;
                    }
                }
            }
        });
    }
}
```

## 六、异步 HTTP 请求

```toml
[dependencies]
tokio = { version = "1", features = ["full"] }
reqwest = { version = "0.11", features = ["json"] }
serde = { version = "1", features = ["derive"] }
```

```rust
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct Todo {
    userId: u32,
    id: u32,
    title: String,
    completed: bool,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 单个请求
    let todo: Todo = reqwest::Client::new()
        .get("https://jsonplaceholder.typicode.com/todos/1")
        .send()
        .await?
        .json()
        .await?;
    println!("{:?}", todo);

    // 多个并发请求
    let start = std::time::Instant::now();
    let todos: Vec<Todo> = futures::future::join_all(
        (1..=5).map(|id| async move {
            reqwest::get(format!("https://jsonplaceholder.typicode.com/todos/{}", id))
                .await
                .unwrap()
                .json::<Todo>()
                .await
                .unwrap()
        })
    ).await;

    println!("获取了 {} 条记录（耗时：{:?}）", todos.len(), start.elapsed());
    Ok(())
}
```

## 七、异步文件操作

Tokio 提供了异步的文件系统操作：

```rust
use tokio::fs::File;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 写入文件
    let mut file = File::create("hello.txt").await?;
    file.write_all(b"Hello, async file!").await?;
    file.sync_all().await?;  // 刷入磁盘

    // 读取文件
    let mut file = File::open("hello.txt").await?;
    let mut contents = String::new();
    file.read_to_string(&mut contents).await?;
    println!("文件内容：{}", contents);

    // 异步读取目录
    let mut entries = tokio::fs::read_dir(".").await?;
    while let Some(entry) = entries.next_entry().await? {
        println!("{:?}", entry.file_name());
    }

    Ok(())
}
```

## 八、Stream 与异步迭代器

```rust
use tokio_stream::StreamExt;

#[tokio::main]
async fn main() {
    // 创建异步流
    let stream = tokio_stream::iter(vec![1, 2, 3, 4, 5]);

    // 使用 StreamExt 的方法
    let doubled: Vec<i32> = stream
        .map(|x| x * 2)
        .collect()
        .await;

    println!("{:?}", doubled);

    // 异步的间隔流
    use tokio::time::{interval, Duration};
    let mut stream = interval(Duration::from_millis(500));

    for _ in 0..3 {
        stream.tick().await;
        println!("tick");
    }
}
```

## 九、Async trait（async-trait）

```rust
// 在 trait 中定义 async 方法需要使用 async-trait 库
// Cargo.toml: async-trait = "0.1"

use async_trait::async_trait;

#[async_trait]
trait Repository {
    async fn find_by_id(&self, id: u32) -> Option<String>;
    async fn save(&self, data: String) -> u32;
}

struct Database;

#[async_trait]
impl Repository for Database {
    async fn find_by_id(&self, id: u32) -> Option<String> {
        Some(format!("data-{}", id))
    }

    async fn save(&self, data: String) -> u32 {
        println!("保存：{}", data);
        1
    }
}

#[tokio::main]
async fn main() {
    let db = Database;
    let data = db.find_by_id(42).await;
    println!("{:?}", data);
}
```

## 十、练习

1. 使用 Tokio 编写一个并发下载器，同时下载 5 个文件，所有下载完成后打印结果
2. 实现一个简单的异步 TCP echo 服务器
3. 使用 `tokio::select!` 实现一个任务超时机制：如果 2 秒内未完成则超时退出
