# Go 并发编程

[官方文档](https://go.dev/tour/concurrency)

Go 语言内置并发支持，通过 **goroutine**（轻量级线程）和 **channel**（通信机制）实现。

详细内容请查看 [go-concurrency.md](../go-concurrency)。

## 快速示例

```go
func main() {
	ch := make(chan string)

	go func() {
		ch <- "Hello from goroutine!"
	}()

	msg := <-ch
	fmt.Println(msg)
}
```
