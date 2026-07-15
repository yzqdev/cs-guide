# 实战案例

Go 并发编程的实际应用。

## 并发 HTTP 请求

同时请求多个 URL，收集结果。

```go
package main

import (
    "context"
    "fmt"
    "io"
    "net/http"
    "sync"
    "time"
)

type Result struct {
    URL    string
    Status int
    Body   string
    Err    error
}

func fetchAll(urls []string) []Result {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    results := make([]Result, len(urls))
    var wg sync.WaitGroup

    for i, url := range urls {
        wg.Add(1)
        go func(i int, url string) {
            defer wg.Done()

            req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
            if err != nil {
                results[i] = Result{URL: url, Err: err}
                return
            }

            resp, err := http.DefaultClient.Do(req)
            if err != nil {
                results[i] = Result{URL: url, Err: err}
                return
            }
            defer resp.Body.Close()

            body, _ := io.ReadAll(resp.Body)
            results[i] = Result{
                URL:    url,
                Status: resp.StatusCode,
                Body:   string(body[:min(100, len(body))]),
            }
        }(i, url)
    }

    wg.Wait()
    return results
}

func main() {
    urls := []string{
        "https://go.dev",
        "https://github.com",
        "https://pkg.go.dev",
    }

    results := fetchAll(urls)
    for _, r := range results {
        if r.Err != nil {
            fmt.Printf("%s: error: %v\n", r.URL, r.Err)
        } else {
            fmt.Printf("%s: %d\n", r.URL, r.Status)
        }
    }
}
```

## 并发爬虫

限制并发数的网页爬虫。

```go
package main

import (
    "context"
    "fmt"
    "net/http"
    "sync"
)

type Crawler struct {
    concurrency int
    client      *http.Client
}

func NewCrawler(concurrency int) *Crawler {
    return &Crawler{
        concurrency: concurrency,
        client: &http.Client{
            Timeout: 10 * time.Second,
        },
    }
}

func (c *Crawler) Crawl(urls []string) map[string]int {
    results := make(map[string]int)
    var mu sync.Mutex
    var wg sync.WaitGroup

    // 使用带缓冲的 channel 控制并发
    sem := make(chan struct{}, c.concurrency)

    for _, url := range urls {
        wg.Add(1)
        sem <- struct{}{}  // 获取信号量

        go func(url string) {
            defer wg.Done()
            defer func() { <-sem }()  // 释放信号量

            resp, err := c.client.Get(url)
            if err != nil {
                mu.Lock()
                results[url] = 0
                mu.Unlock()
                return
            }
            defer resp.Body.Close()

            mu.Lock()
            results[url] = resp.StatusCode
            mu.Unlock()
        }(url)
    }

    wg.Wait()
    return results
}

func main() {
    crawler := NewCrawler(5)
    urls := []string{
        "https://go.dev",
        "https://github.com",
        "https://pkg.go.dev",
    }

    results := crawler.Crawl(urls)
    for url, status := range results {
        fmt.Printf("%s: %d\n", url, status)
    }
}
```

## 并发任务调度器

按优先级调度任务。

```go
package main

import (
    "fmt"
    "sync"
)

type Task struct {
    ID       int
    Priority int
    Data     string
}

type Scheduler struct {
    workers  int
    tasks    chan Task
    wg       sync.WaitGroup
}

func NewScheduler(workers, queueSize int) *Scheduler {
    return &Scheduler{
        workers: workers,
        tasks:   make(chan Task, queueSize),
    }
}

func (s *Scheduler) Start(handler func(Task)) {
    for i := 0; i < s.workers; i++ {
        s.wg.Add(1)
        go func(id int) {
            defer s.wg.Done()
            for task := range s.tasks {
                fmt.Printf("Worker %d: processing task %d (priority=%d)\n",
                    id, task.ID, task.Priority)
                handler(task)
            }
        }(i)
    }
}

func (s *Scheduler) Submit(task Task) {
    s.tasks <- task
}

func (s *Scheduler) Stop() {
    close(s.tasks)
    s.wg.Wait()
}

func main() {
    scheduler := NewScheduler(3, 100)

    scheduler.Start(func(task Task) {
        // 模拟处理
        time.Sleep(100 * time.Millisecond)
    })

    // 提交任务
    for i := 0; i < 20; i++ {
        scheduler.Submit(Task{
            ID:       i,
            Priority: i % 3,
            Data:     fmt.Sprintf("data-%d", i),
        })
    }

    scheduler.Stop()
}
```

## 批量处理

将大量数据分批并发处理。

```go
func batchProcess(items []string, batchSize, concurrency int) ([]string, error) {
    var (
        results = make([]string, len(items))
        mu      sync.Mutex
        wg      sync.WaitGroup
        sem     = make(chan struct{}, concurrency)
    )

    for i := 0; i < len(items); i += batchSize {
        end := min(i+batchSize, len(items))
        batch := items[i:end]

        wg.Add(1)
        sem <- struct{}{}

        go func(start int, batch []string) {
            defer wg.Done()
            defer func() { <-sem }()

            for j, item := range batch {
                // 模拟处理
                result := processItem(item)
                mu.Lock()
                results[start+j] = result
                mu.Unlock()
            }
        }(i, batch)
    }

    wg.Wait()
    return results, nil
}
```

## 限流器

```go
type RateLimiter struct {
    ticker *time.Ticker
    done   chan struct{}
}

func NewRateLimiter(rps int) *RateLimiter {
    return &RateLimiter{
        ticker: time.NewTicker(time.Second / time.Duration(rps)),
        done:   make(chan struct{}),
    }
}

func (rl *RateLimiter) Wait(ctx context.Context) error {
    select {
    case <-rl.ticker.C:
        return nil
    case <-ctx.Done():
        return ctx.Err()
    case <-rl.done:
        return fmt.Errorf("rate limiter stopped")
    }
}

func (rl *RateLimiter) Stop() {
    close(rl.done)
    rl.ticker.Stop()
}

func main() {
    limiter := NewRateLimiter(10)  // 每秒 10 个请求
    defer limiter.Stop()

    for i := 0; i < 100; i++ {
        if err := limiter.Wait(context.Background()); err != nil {
            break
        }
        go func(i int) {
            resp, err := http.Get("https://api.example.com")
            if err != nil {
                fmt.Println("error:", err)
                return
            }
            defer resp.Body.Close()
            fmt.Printf("request %d: %d\n", i, resp.StatusCode)
        }(i)
    }
}
```

## 超时重试

```go
func retry(ctx context.Context, maxRetries int, delay time.Duration, fn func() error) error {
    var lastErr error

    for i := 0; i <= maxRetries; i++ {
        if err := fn(); err != nil {
            lastErr = err
            if i < maxRetries {
                select {
                case <-time.After(delay):
                case <-ctx.Done():
                    return ctx.Err()
                }
            }
        } else {
            return nil
        }
    }

    return fmt.Errorf("after %d retries: %w", maxRetries, lastErr)
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    err := retry(ctx, 3, 2*time.Second, func() error {
        resp, err := http.Get("https://api.example.com")
        if err != nil {
            return err
        }
        defer resp.Body.Close()
        if resp.StatusCode != 200 {
            return fmt.Errorf("status %d", resp.StatusCode)
        }
        return nil
    })

    if err != nil {
        fmt.Println("failed:", err)
    }
}
```
