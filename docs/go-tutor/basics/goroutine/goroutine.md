# Goroutine 基础

## 什么是 Goroutine

Goroutine 是 Go 运行时管理的轻量级线程。与操作系统线程相比：

| 特性 | OS Thread | Goroutine |
|------|-----------|-----------|
| 初始栈大小 | 1-8 MB | 2 KB |
| 创建成本 | 高（系统调用） | 低（用户态） |
| 切换成本 | 高（内核态切换） | 低（用户态切换） |
| 数量上限 | 数千 | 数十万甚至百万 |

## 创建 Goroutine

```go
// 启动匿名函数
go func() {
    fmt.Println("并发执行")
}()

// 启动命名函数
go worker(jobs, results)

// 启动方法
go obj.DoSomething()
```

## 等待 Goroutine 完成

### sync.WaitGroup

```go
package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)  // 在启动 goroutine 之前调用
        go func(id int) {
            defer wg.Done()  // 完成时调用
            fmt.Println("Worker", id)
        }(i)
    }

    wg.Wait()  // 阻塞直到所有 goroutine 完成
    fmt.Println("All done")
}
```

:::warning
`wg.Add()` 必须在 goroutine 启动之前调用，否则可能 `Wait()` 先于 `Add()` 执行导致提前返回。
:::

### 使用 channel 等待

```go
func main() {
    done := make(chan struct{})

    go func() {
        fmt.Println("Working...")
        close(done)  // 发送完成信号
    }()

    <-done  // 阻塞直到 channel 关闭
    fmt.Println("All done")
}
```

## GOMAXPROCS

`GOMAXPROCS` 设置可同时执行 goroutine 的最大 CPU 核数。

```go
import "runtime"

// 获取当前设置
n := runtime.GOMAXPROCS(0)  // 传 0 只查询不设置

// 设置为 CPU 核数
runtime.GOMAXPROCS(runtime.NumCPU())

// Go 1.5+ 默认设置为 CPU 核数
```

### Go 调度器模型（GMP）

```
G (Goroutine) ──→ P (Processor) ──→ M (Machine/OS Thread)

G: goroutine，包含栈、状态、指令指针
P: 逻辑处理器，持有本地 goroutine 队列
M: 操作系统线程，执行 goroutine 代码
```

- 每个 P 有一个本地 goroutine 队列
- 所有 P 共享一个全局 goroutine 队列
- M 与 P 绑定后执行 goroutine
- 当 M 阻塞时，P 会解绑并找新的 M 继续执行

## goroutine 泄漏

goroutine 无法被外部终止，如果永远阻塞在 channel 操作上就会泄漏。

```go
// 错误：goroutine 永远不会退出
func leak() {
    go func() {
        ch := make(chan int)
        <-ch  // 永远阻塞
    }()
}

// 正确：使用 context 或 done channel 控制退出
func correct(ctx context.Context) {
    go func(ctx context.Context) {
        select {
        case <-ctx.Done():
            return
        case data := <-ch:
            process(data)
        }
    }(ctx)
}
```

## runtime 包常用函数

```go
runtime.Goexit()           // 终止当前 goroutine（defer 仍会执行）
runtime.Gosched()          // 让出 CPU 时间片给其他 goroutine
runtime.NumGoroutine()     // 返回当前 goroutine 数量
runtime.Stack(buf []byte, all bool)  // 获取 goroutine 栈信息
```
