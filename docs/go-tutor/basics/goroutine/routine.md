# Goroutine 与 Channel

> 详细内容请查看 [go-concurrency.md](../go-concurrency)

## Goroutine

Goroutine 是 Go 的轻量级线程，由 Go 运行时管理。

```go
// 启动 goroutine
go func() {
	fmt.Println("并发执行")
}()

// 启动函数
go worker(jobs, results)

// 等待完成（使用 sync.WaitGroup）
var wg sync.WaitGroup
for i := 0; i < 3; i++ {
	wg.Add(1)
	go func(id int) {
		defer wg.Done()
		fmt.Println("Worker", id)
	}(i)
}
wg.Wait()
```
