# 常见陷阱

Go 并发编程中容易犯的错误和最佳实践。

## 数据竞争

数据竞争发生在两个 goroutine 同时访问同一个变量，且至少有一个是写操作。

### 检测数据竞争

```bash
go run -race main.go
go test -race ./...
```

### 示例

```go
// 错误：数据竞争
var count int

func main() {
    for i := 0; i < 1000; i++ {
        go func() {
            count++  // 非原子操作
        }()
    }
    time.Sleep(time.Second)
    fmt.Println(count)  // 不确定的值
}

// 正确：使用 mutex
var (
    count int
    mu    sync.Mutex
)

func main() {
    for i := 0; i < 1000; i++ {
        go func() {
            mu.Lock()
            count++
            mu.Unlock()
        }()
    }
    time.Sleep(time.Second)
    fmt.Println(count)  // 1000
}
```

## goroutine 泄漏

goroutine 无法退出，永远阻塞。

### 常见原因

```go
// 1. 读取已关闭的 channel（不会 panic，会得到零值）
ch := make(chan int)
close(ch)
val := <-ch  // 0，不是阻塞

// 2. 读取无人发送的 channel
ch := make(chan int)
val := <-ch  // 永远阻塞

// 3. 向已满的无缓冲/有缓冲 channel 发送
ch := make(chan int)  // 无缓冲
ch <- 1  // 永远阻塞（没有接收者）

// 4. 死锁
ch1 := make(chan int)
ch2 := make(chan int)
go func() { ch1 <- <-ch2 }()  // ch1 需要接收者，但 main 也阻塞在 ch2
```

### 防止泄漏

```go
// 使用 context 控制退出
func worker(ctx context.Context) {
    for {
        select {
        case <-ctx.Done():
            return  // 退出
        case data := <-ch:
            process(data)
        }
    }
}

// 使用带缓冲的 channel
ch := make(chan int, 1)  // 不会阻塞发送方
```

## 循环变量捕获

```go
// Go 1.21 之前的问题
for i := 0; i < 5; i++ {
    go func() {
        fmt.Println(i)  // 所有 goroutine 都打印 5
    }()
}

// 解决方案 1：传参
for i := 0; i < 5; i++ {
    go func(n int) {
        fmt.Println(n)  // 正确
    }(i)
}

// 解决方案 2：Go 1.22+ 已修复
for i := 0; i < 5; i++ {
    go func() {
        fmt.Println(i)  // Go 1.22+ 正确
    }()
}
```

## WaitGroup 误用

```go
// 错误：Add 在 goroutine 内部调用
var wg sync.WaitGroup
for i := 0; i < 5; i++ {
    go func() {
        wg.Add(1)  // 可能在 Wait() 之后执行
        defer wg.Done()
        // ...
    }()
}
wg.Wait()  // 可能提前返回

// 正确：Add 在 goroutine 外部调用
var wg sync.WaitGroup
for i := 0; i < 5; i++ {
    wg.Add(1)
    go func() {
        defer wg.Done()
        // ...
    }()
}
wg.Wait()
```

## Mutex 复制

```go
// 错误：Mutex 被复制
type SafeMap struct {
    mu sync.Mutex
    m  map[string]string
}

func (s SafeMap) Get(key string) string {
    s.mu.Lock()  // 操作的是副本的锁
    defer s.mu.Unlock()
    return s.m[key]
}

// 正确：使用指针接收者
func (s *SafeMap) Get(key string) string {
    s.mu.Lock()
    defer s.mu.Unlock()
    return s.m[key]
}
```

## Channel 关闭问题

```go
// 错误：接收方关闭 channel
func consumer(ch <-chan int) {
    close(ch)  // panic
}

// 错误：多个 goroutine 关闭同一个 channel
go func() { close(ch) }()
go func() { close(ch) }()  // panic

// 正确：使用 sync.Once 或只在一个地方关闭
var closeOnce sync.Once
closeOnce.Do(func() { close(ch) })
```

## defer 在循环中

```go
// 注意：defer 在函数结束时执行，不是循环结束时
func process() {
    for i := 0; i < 1000; i++ {
        f, _ := os.Open("file.txt")
        defer f.Close()  // 1000 个文件句柄同时打开
    }
}

// 正确：封装为函数
func processFile(name string) error {
    f, err := os.Open(name)
    if err != nil {
        return err
    }
    defer f.Close()  // 函数返回时关闭
    // ...
    return nil
}
```

## 竞态条件

```go
// 错误：检查和操作不是原子的
if len(queue) > 0 {
    item := queue[0]  // 其他 goroutine 可能已经修改了 queue
    queue = queue[1:]
}

// 正确：加锁或使用 channel
mu.Lock()
if len(queue) > 0 {
    item := queue[0]
    queue = queue[1:]
}
mu.Unlock()
```

## 最佳实践

1. **优先使用 channel 而不是共享内存**
2. **使用 `-race` 检测数据竞争**
3. **用 context 控制 goroutine 生命周期**
4. **避免 goroutine 泄漏**
5. **不要复制 sync 原语**
6. **只由发送方关闭 channel**
7. **使用 errgroup 处理并发错误**
