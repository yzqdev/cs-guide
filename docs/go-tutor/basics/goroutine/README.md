# Go 并发编程教程

[官方文档](https://go.dev/tour/concurrency) | [Go Memory Model](https://go.dev/ref/mem)

Go 语言原生支持并发，通过 **goroutine**（轻量级线程）和 **channel**（通信机制）实现 CSP（Communicating Sequential Processes）并发模型。

> "Don't communicate by sharing memory; share memory by communicating."
> — Go Proverb

## 目录

| 主题 | 文件 | 说明 |
|------|------|------|
| Goroutine 基础 | [goroutine.md](goroutine.md) | 创建、调度、生命周期、GOMAXPROCS |
| Channel 详解 | [channel.md](channel.md) | 有缓冲/无缓冲、方向、关闭、range |
| Select 多路复用 | [select.md](select.md) | select 语句、超时控制、非阻塞操作 |
| Sync 同步原语 | [sync.md](sync.md) | WaitGroup、Mutex、Once、Pool、Map |
| Context 上下文 | [context.md](context.md) | WithCancel、WithTimeout、传值 |
| 并发模式 | [patterns.md](patterns.md) | Pipeline、Fan-out/Fan-in、Worker Pool、Rate Limiting |
| 常见陷阱 | [pitfalls.md](pitfalls.md) | 数据竞争、goroutine 泄漏、竞态条件 |
| 实战案例 | [examples.md](examples.md) | HTTP 并发请求、爬虫、定时任务 |

## 快速开始

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    ch := make(chan string)

    go func() {
        time.Sleep(time.Second)
        ch <- "Hello from goroutine!"
    }()

    fmt.Println(<-ch)
}
```
