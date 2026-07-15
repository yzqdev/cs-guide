# Select 多路复用

`select` 语句用于在多个 channel 操作中选择一个执行，类似于 switch 但针对 channel。

## 基本语法

```go
select {
case v := <-ch1:
    fmt.Println("received from ch1:", v)
case ch2 <- 42:
    fmt.Println("sent to ch2")
case v, ok := <-ch3:
    if ok {
        fmt.Println("received from ch3:", v)
    }
default:
    fmt.Println("no channel ready")
}
```

## 规则

1. **所有 case 都未就绪时**：阻塞等待（除非有 `default`）
2. **多个 case 同时就绪**：随机选择一个执行
3. **有 default 时**：所有 case 都未就绪则执行 default（非阻塞）

## 超时控制

```go
func main() {
    ch := make(chan string)

    go func() {
        time.Sleep(2 * time.Second)
        ch <- "result"
    }()

    select {
    case msg := <-ch:
        fmt.Println(msg)
    case <-time.After(1 * time.Second):
        fmt.Println("timeout!")
    }
}
// 输出: timeout!
```

### 封装超时函数

```go
func withTimeout(timeout time.Duration, fn func() (any, error)) (any, error) {
    result := make(chan struct {
        val any
        err error
    }, 1)

    go func() {
        val, err := fn()
        result <- struct {
            val any
            err error
        }{val, err}
    }()

    select {
    case res := <-result:
        return res.val, res.err
    case <-time.After(timeout):
        return nil, fmt.Errorf("timeout after %v", timeout)
    }
}
```

## 非阻塞操作

```go
// 非阻塞接收
select {
case msg := <-ch:
    fmt.Println("received:", msg)
default:
    fmt.Println("no message")
}

// 非阻塞发送
select {
case ch <- msg:
    fmt.Println("sent")
default:
    fmt.Println("channel full, skipping")
}
```

## 使用 nil Channel

向 nil channel 发送或接收会永远阻塞。利用这个特性可以动态禁用 select case。

```go
var ch1, ch2 chan int

// 随机启用一个
ch1 = make(chan int)
ch2 = make(chan int)

go func() {
    for {
        select {
        case v := <-ch1:
            fmt.Println("ch1:", v)
            ch1 = nil  // 禁用 ch1
        case v := <-ch2:
            fmt.Println("ch2:", v)
            ch2 = nil  // 禁用 ch2
        }
    }
}()
```

## Done Channel 模式

```go
func worker(done <-chan struct{}) {
    for {
        select {
        case <-done:
            fmt.Println("stopping...")
            return
        default:
            fmt.Println("working...")
            time.Sleep(500 * time.Millisecond)
        }
    }
}

func main() {
    done := make(chan struct{})
    go worker(done)

    time.Sleep(2 * time.Second)
    close(done)  // 通知所有 goroutine 停止
    time.Sleep(time.Second)
}
```

## 使用 select 实现随机数

```go
func randInt(min, max int) int {
    ch := make(chan int)
    go func() {
        ch <- rand.Intn(max - min + 1) + min
    }()
    return <-ch
}
```

## 遍历多个 channel

```go
func fanIn(chs ...<-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup

    for _, ch := range chs {
        wg.Add(1)
        go func(ch <-chan int) {
            defer wg.Done()
            for val := range ch {
                out <- val
            }
        }(ch)
    }

    go func() {
        wg.Wait()
        close(out)
    }()

    return out
}
```
