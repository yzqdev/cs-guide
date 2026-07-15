# 并发模式

Go 并发编程的常见设计模式。

## Pipeline

将处理过程分成多个阶段，每个阶段是一组 goroutine，通过 channel 连接。

```go
// 阶段 1：生成数据
func generate(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

// 阶段 2：平方
func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}

// 阶段 3：过滤
func filter(in <-chan int, predicate func(int) bool) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            if predicate(n) {
                out <- n
            }
        }
        close(out)
    }()
    return out
}

func main() {
    // Pipeline: 生成 → 平方 → 过滤
    ch := generate(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    ch = square(ch)
    ch = filter(ch, func(n int) bool { return n > 20 })

    for result := range ch {
        fmt.Println(result)  // 25, 36, 49, 64, 81, 100
    }
}
```

## Fan-out / Fan-in

Fan-out：多个 goroutine 从同一个 channel 读取。
Fan-in：多个 channel 合并到一个 channel。

```go
func fanOut(input <-chan int, workers int) []<-chan int {
    channels := make([]<-chan int, workers)
    for i := 0; i < workers; i++ {
        channels[i] = process(input)
    }
    return channels
}

func fanIn(channels ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    merged := make(chan int)

    for _, ch := range channels {
        wg.Add(1)
        go func(ch <-chan int) {
            defer wg.Done()
            for val := range ch {
                merged <- val
            }
        }(ch)
    }

    go func() {
        wg.Wait()
        close(merged)
    }()

    return merged
}

func main() {
    input := generate(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

    // Fan-out: 3 个 worker 并行处理
    channels := fanOut(input, 3)

    // Fan-in: 合并结果
    for val := range fanIn(channels...) {
        fmt.Println(val)
    }
}
```

## Worker Pool

固定数量的 worker 并发处理任务。

```go
func workerPool(jobs <-chan int, results chan<- int, workers int) {
    var wg sync.WaitGroup

    for i := 0; i < workers; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for job := range jobs {
                fmt.Printf("Worker %d processing job %d\n", id, job)
                time.Sleep(time.Second)
                results <- job * 2
            }
        }(i)
    }

    wg.Wait()
    close(results)
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    // 启动 3 个 worker
    go workerPool(jobs, results, 3)

    // 发送任务
    for i := 0; i < 9; i++ {
        jobs <- i
    }
    close(jobs)

    // 收集结果
    for result := range results {
        fmt.Println(result)
    }
}
```

## Rate Limiting

限制操作的执行频率。

```go
// 使用 time.Ticker
func rateLimiter() <-chan time.Time {
    return time.Tick(200 * time.Millisecond)
}

func main() {
    requests := make(chan int, 5)
    for i := 0; i < 5; i++ {
        requests <- i
    }
    close(requests)

    limiter := rateLimiter()

    for req := range requests {
        <-limiter
        fmt.Println("request", req, time.Now())
    }
}
```

### 使用 golang.org/x/time/rate

```go
import "golang.org/x/time/rate"

func main() {
    limiter := rate.NewLimiter(rate.Limit(10), 20)  // 每秒 10 个，突发允许 20 个

    for i := 0; i < 10; i++ {
        if limiter.Allow() {
            fmt.Println("request", i, "allowed")
        } else {
            fmt.Println("request", i, "denied")
        }
    }
}
```

## Timeout Pattern

```go
func doWork(ctx context.Context) (string, error) {
    resultCh := make(chan string, 1)

    go func() {
        // 模拟耗时操作
        time.Sleep(3 * time.Second)
        resultCh <- "done"
    }()

    select {
    case result := <-resultCh:
        return result, nil
    case <-ctx.Done():
        return "", ctx.Err()
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
    defer cancel()

    result, err := doWork(ctx)
    if err != nil {
        fmt.Println("error:", err)  // timeout
        return
    }
    fmt.Println(result)
}
```

## Done Channel Pattern

```go
func worker(done chan<- bool) {
    fmt.Println("working...")
    time.Sleep(2 * time.Second)
    fmt.Println("done")
    done <- true
}

func main() {
    done := make(chan bool, 1)
    go worker(done)
    <-done
}
```

## Semaphore Pattern

使用带缓冲的 channel 实现信号量。

```go
func semaphore(n int) chan struct{} {
    return make(chan struct{}, n)
}

func main() {
    sem := semaphore(3)  // 最多 3 个并发

    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            sem <- struct{}{}        // 获取信号量
            defer func() { <-sem }() // 释放信号量

            fmt.Println("task", id)
            time.Sleep(time.Second)
        }(i)
    }
    wg.Wait()
}
```

## Context Propagation

```go
func handleRequest(ctx context.Context) error {
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()

    if err := step1(ctx); err != nil {
        return err
    }
    if err := step2(ctx); err != nil {
        return err
    }
    return nil
}

func step1(ctx context.Context) error {
    // 使用 ctx 调用外部服务
    req, _ := http.NewRequestWithContext(ctx, "GET", "https://api.example.com", nil)
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    return nil
}
```
