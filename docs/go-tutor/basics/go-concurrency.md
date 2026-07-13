# Go 并发编程

[官方文档](https://go.dev/tour/concurrency)

## Goroutine

Goroutine 是 Go 的轻量级线程，由 Go 运行时调度。

```go
func main() {
	// 启动 goroutine
	go fmt.Println("并发执行")
	
	fmt.Println("主 goroutine")
	time.Sleep(time.Second) // 等待 goroutine 执行
}
```

### 启动多个 goroutine

```go
func printNumbers(prefix string) {
	for i := 1; i <= 3; i++ {
		fmt.Printf("%s: %d\n", prefix, i)
		time.Sleep(100 * time.Millisecond)
	}
}

func main() {
	go printNumbers("A")
	go printNumbers("B")
	go printNumbers("C")

	time.Sleep(1 * time.Second) // 等待所有 goroutine
}
```

### 等待 goroutine 完成

```go
var wg sync.WaitGroup

func worker(id int) {
	defer wg.Done() // 完成时计数器减一
	fmt.Printf("Worker %d 开始\n", id)
	time.Sleep(time.Second)
	fmt.Printf("Worker %d 结束\n", id)
}

func main() {
	for i := 1; i <= 3; i++ {
		wg.Add(1) // 计数器加一
		go worker(i)
	}
	wg.Wait() // 等待所有完成
	fmt.Println("全部完成")
}
```

## Channel

Channel 用于 goroutine 间的通信。

### 创建和基本使用

```go
// 创建 channel
ch := make(chan int)      // 无缓冲
ch2 := make(chan string, 10) // 有缓冲

// 发送和接收
ch <- 42   // 发送
value := <-ch // 接收

// 关闭 channel
close(ch)
```

### 无缓冲 channel

```go
func main() {
	ch := make(chan string)

	go func() {
		fmt.Println("goroutine 开始工作")
		time.Sleep(time.Second)
		ch <- "工作完成" // 发送（阻塞直到接收）
	}()

	fmt.Println("等待结果...")
	result := <-ch // 接收（阻塞直到发送）
	fmt.Println(result)
}
```

### 有缓冲 channel

```go
func main() {
	ch := make(chan int, 3)

	// 缓冲区未满，不阻塞
	ch <- 1
	ch <- 2
	ch <- 3
	// ch <- 4 // 缓冲区满，阻塞

	fmt.Println(<-ch) // 1
	fmt.Println(<-ch) // 2
	fmt.Println(<-ch) // 3
}
```

### 遍历 channel

```go
func main() {
	ch := make(chan int)

	go func() {
		for i := 0; i < 5; i++ {
			ch <- i
			time.Sleep(100 * time.Millisecond)
		}
		close(ch) // 必须关闭，否则 range 死锁
	}()

	for value := range ch {
		fmt.Println(value) // 0, 1, 2, 3, 4
	}
}
```

### 单向 channel

```go
// 只读 channel
func reader(ch <-chan int) {
	for v := range ch {
		fmt.Println(v)
	}
}

// 只写 channel
func writer(ch chan<- int) {
	for i := 0; i < 5; i++ {
		ch <- i
	}
	close(ch)
}

func main() {
	ch := make(chan int, 5)
	go writer(ch)  // 自动转为只写
	reader(ch)     // 自动转为只读
}
```

## select 多路复用

```go
func main() {
	ch1 := make(chan string)
	ch2 := make(chan string)

	go func() {
		time.Sleep(1 * time.Second)
		ch1 <- "通道1"
	}()

	go func() {
		time.Sleep(2 * time.Second)
		ch2 <- "通道2"
	}()

	select {
	case msg := <-ch1:
		fmt.Println(msg)
	case msg := <-ch2:
		fmt.Println(msg)
	case <-time.After(3 * time.Second):
		fmt.Println("超时")
	}
}

// 非阻塞 select
func tryReceive(ch chan int) bool {
	select {
	case v := <-ch:
		fmt.Println("收到:", v)
		return true
	default:
		fmt.Println("没有数据")
		return false
	}
}
```

## 同步原语

### Mutex 互斥锁

```go
type Counter struct {
	mu    sync.Mutex
	value int
}

func (c *Counter) Increment() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.value++
}

func (c *Counter) Value() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.value
}

func main() {
	var wg sync.WaitGroup
	counter := &Counter{}

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			counter.Increment()
		}()
	}
	wg.Wait()
	fmt.Println(counter.Value()) // 1000
}
```

### RWMutex 读写锁

```go
type Cache struct {
	mu    sync.RWMutex
	data  map[string]string
}

func (c *Cache) Get(key string) string {
	c.mu.RLock()    // 读锁，可并发
	defer c.mu.RUnlock()
	return c.data[key]
}

func (c *Cache) Set(key, value string) {
	c.mu.Lock()     // 写锁，独占
	defer c.mu.Unlock()
	c.data[key] = value
}
```

### Once 单次执行

```go
var once sync.Once

func initialize() {
	fmt.Println("初始化...")
}

func main() {
	for i := 0; i < 5; i++ {
		go once.Do(initialize)
	}
	time.Sleep(time.Second)
	// 只输出一次 "初始化..."
}
```

## 并发模式

### Worker Pool

```go
func worker(id int, jobs <-chan int, results chan<- int) {
	for job := range jobs {
		fmt.Printf("Worker %d 处理任务 %d\n", id, job)
		time.Sleep(time.Second)
		results <- job * 2
	}
}

func main() {
	const numJobs = 10
	const numWorkers = 3

	jobs := make(chan int, numJobs)
	results := make(chan int, numJobs)

	// 启动 workers
	for w := 1; w <= numWorkers; w++ {
		go worker(w, jobs, results)
	}

	// 发送任务
	for j := 1; j <= numJobs; j++ {
		jobs <- j
	}
	close(jobs)

	// 收集结果
	for r := 1; r <= numJobs; r++ {
		<-results
	}
}
```

### Pipeline

```go
func gen(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		for _, n := range nums {
			out <- n
		}
		close(out)
	}()
	return out
}

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

func main() {
	// pipeline: gen → square → 打印
	nums := gen(1, 2, 3, 4, 5)
	squares := square(nums)

	for n := range squares {
		fmt.Println(n) // 1, 4, 9, 16, 25
	}
}
```

### Fan-in / Fan-out

```go
// Fan-in: 合并多个 channel
func fanIn(ch1, ch2 <-chan string) <-chan string {
	out := make(chan string)
	go func() {
		for {
			select {
			case v := <-ch1:
				out <- v
			case v := <-ch2:
				out <- v
			}
		}
	}()
	return out
}
```

## 实际案例

```go
// 并发下载器
func download(url string, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Printf("下载 %s...\n", url)
	time.Sleep(time.Second) // 模拟下载
	fmt.Printf("完成 %s\n", url)
}

func main() {
	urls := []string{
		"https://example.com/file1",
		"https://example.com/file2",
		"https://example.com/file3",
	}

	var wg sync.WaitGroup
	for _, url := range urls {
		wg.Add(1)
		go download(url, &wg)
	}
	wg.Wait()
	fmt.Println("所有下载完成")
}
```
