# Channel 详解

Channel 是 goroutine 之间通信的管道，遵循 "Don't communicate by sharing memory; share memory by communicating" 的理念。

## 基本操作

```go
ch := make(chan int)      // 创建无缓冲 channel
ch <- 42                  // 发送
value := <-ch             // 接收
close(ch)                 // 关闭 channel
```

## 无缓冲 Channel

无缓冲 channel 是同步的：发送方阻塞直到接收方准备好。

```go
func main() {
    ch := make(chan string)

    go func() {
        ch <- "Hello"  // 发送方阻塞
    }()

    msg := <-ch  // 接收方接收后，发送方才解除阻塞
    fmt.Println(msg)
}
```

**特点**：
- 发送和接收必须同时就绪
- 适合 goroutine 同步

## 有缓冲 Channel

有缓冲 channel 是异步的：发送方在缓冲区未满时不阻塞。

```go
ch := make(chan int, 5)  // 缓冲区大小为 5

ch <- 1  // 不阻塞
ch <- 2  // 不阻塞
// ... 直到缓冲区满才阻塞

// 接收
<-ch  // 不阻塞
```

### 缓冲区满/空时的行为

```go
ch := make(chan int, 2)

ch <- 1  // OK
ch <- 2  // OK
ch <- 3  // 阻塞！缓冲区已满

<-ch     // 取出 1，腾出空间
ch <- 3  // 现在 OK
```

## Channel 方向

可以限制 channel 的方向（只发送或只接收）。

```go
// 只发送 channel
func producer(ch chan<- int) {
    ch <- 42
}

// 只接收 channel
func consumer(ch <-chan int) {
    val := <-ch
    fmt.Println(val)
}

// 双向 channel 可以隐式转换为单向 channel
ch := make(chan int)
go producer(ch)  // chan int → chan<- int
go consumer(ch)  // chan int → <-chan int
```

### 使用方向限制参数

```go
// 这个函数只能从 ch 接收，不能发送
func merge(chs ...<-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for _, ch := range chs {
            for val := range ch {
                out <- val
            }
        }
        close(out)
    }()
    return out
}
```

## 关闭 Channel

```go
ch := make(chan int)

// 发送方关闭
close(ch)

// 接收方可以继续接收剩余值
val, ok := <-ch  // ok 为 false 表示 channel 已关闭且无数据
if !ok {
    fmt.Println("channel closed")
}
```

### 关闭规则

1. **只有发送方应该关闭 channel**（接收方关闭会 panic）
2. **不要关闭一个正在向其发送数据的 channel**（会 panic）
3. **channel 不是必须关闭的**，GC 会回收

```go
// 错误：接收方关闭
func consumer(ch <-chan int) {
    close(ch)  // panic: close of receive-only channel
}

// 错误：发送方关闭后继续发送
ch := make(chan int)
close(ch)
ch <- 1  // panic: send on closed channel
```

## for range 遍历 Channel

```go
ch := make(chan int, 5)
ch <- 1
ch <- 2
ch <- 3
close(ch)

// for range 会自动接收，直到 channel 关闭
for val := range ch {
    fmt.Println(val)
}
// 输出: 1, 2, 3
```

## Channel 类型总结

| 类型 | 声明 | 用途 |
|------|------|------|
| 双向 channel | `chan int` | 可发送和接收 |
| 只发送 channel | `chan<- int` | 只能发送 |
| 只接收 channel | `<-chan int` | 只能接收 |
| 无缓冲 | `make(chan int)` | 同步通信 |
| 有缓冲 | `make(chan int, n)` | 异步通信 |

## 常用模式

### Done Channel

```go
func worker(done chan<- bool) {
    fmt.Println("working...")
    time.Sleep(time.Second)
    done <- true
}

func main() {
    done := make(chan bool, 1)
    go worker(done)
    <-done
}
```

### Signal Channel

```go
// 用 channel 关闭信号控制退出
quit := make(chan struct{})

go func() {
    for {
        select {
        case <-quit:
            fmt.Println("shutting down")
            return
        default:
            // 正常工作
        }
    }
}()

// 发送关闭信号
close(quit)
```

### Generator Pattern

```go
func generator(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func main() {
    for val := range generator(1, 2, 3, 4, 5) {
        fmt.Println(val)
    }
}
```
