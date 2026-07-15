# Context 上下文

`context` 包用于在 goroutine 之间传递取消信号、截止时间和请求范围的值。

## 为什么需要 Context

- 取消信号：当用户取消请求时，取消所有相关的 goroutine
- 超时控制：为操作设置截止时间
- 传值：在请求链中传递请求范围的数据

## 基本用法

### context.Background

```go
ctx := context.Background()  // 根 context，永远不会取消
```

### context.TODO

```go
ctx := context.TODO()  // 占位符，表示不确定用哪个 context
```

## 取消信号

### WithCancel

```go
ctx, cancel := context.WithCancel(context.Background())

go func(ctx context.Context) {
    for {
        select {
        case <-ctx.Done():
            fmt.Println("cancelled:", ctx.Err())
            return
        default:
            fmt.Println("working...")
            time.Sleep(500 * time.Millisecond)
        }
    }
}(ctx)

time.Sleep(2 * time.Second)
cancel()  // 发送取消信号
time.Sleep(time.Second)
```

### WithTimeout

```go
ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
defer cancel()  // 即使超时也要调用 cancel 释放资源

select {
case <-time.After(5 * time.Second):
    fmt.Println("done")
case <-ctx.Done():
    fmt.Println("timeout:", ctx.Err())
}
// 输出: timeout: context deadline exceeded
```

### WithDeadline

```go
deadline := time.Now().Add(5 * time.Second)
ctx, cancel := context.WithDeadline(context.Background(), deadline)
defer cancel()

select {
case <-ctx.Done():
    fmt.Println("deadline exceeded:", ctx.Err())
}
```

## 传值

### WithValue

```go
type contextKey string

const (
    userIDKey contextKey = "userID"
    tokenKey  contextKey = "token"
)

// 服务端
func handler(w http.ResponseWriter, r *http.Request) {
    ctx := context.WithValue(r.Context(), userIDKey, "12345")
    processRequest(ctx)
}

// 下游
func processRequest(ctx context.Context) {
    userID := ctx.Value(userIDKey).(string)
    fmt.Println("user:", userID)
}
```

:::warning
WithValue 只用于传递请求范围的数据（如 trace ID、认证信息），不要用于传递函数参数。
:::

## 常用模式

### HTTP 请求链

```go
func handler(w http.ResponseWriter, r *http.Request) {
    ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
    defer cancel()

    result, err := queryDatabase(ctx)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    fmt.Fprint(w, result)
}

func queryDatabase(ctx context.Context) (string, error) {
    // 使用 r.Context() 而不是 context.Background()
    // 这样客户端取消请求时，数据库查询也会被取消
    return db.QueryContext(ctx, "SELECT ...")
}
```

### 并发任务超时

```go
func fetchAll(ctx context.Context, urls []string) ([]string, error) {
    ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
    defer cancel()

    results := make([]string, len(urls))
    var wg sync.WaitGroup

    for i, url := range urls {
        wg.Add(1)
        go func(i int, url string) {
            defer wg.Done()
            req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)
            resp, err := http.DefaultClient.Do(req)
            if err != nil {
                return
            }
            defer resp.Body.Close()
            body, _ := io.ReadAll(resp.Body)
            results[i] = string(body)
        }(i, url)
    }

    wg.Wait()
    return results, nil
}
```

### 取消级联

```go
func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()

    // 子 context 继承父 context 的取消信号
    childCtx, _ := context.WithCancel(ctx)

    go func(ctx context.Context) {
        <-ctx.Done()
        fmt.Println("child cancelled:", ctx.Err())
    }(childCtx)

    cancel()  // 取消父 context，子 context 也会被取消
    time.Sleep(time.Second)
}
```

## Context 树

```
Background / TODO
├── WithCancel
│   ├── WithTimeout
│   └── WithValue
├── WithDeadline
└── WithValue
    └── WithCancel
```

- 子 context 继承父 context 的取消信号
- 调用 cancel() 会取消所有子 context
- WithValue 的值在子 context 链中查找

## 最佳实践

1. **将 Context 作为函数第一个参数**
2. **不要将 Context 存储在结构体中**
3. **即使超时也要调用 cancel()**
4. **使用 WithValue 传递请求范围的数据**
5. **不要传递 nil Context，用 context.TODO() 代替**
