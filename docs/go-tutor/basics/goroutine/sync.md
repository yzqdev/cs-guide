# Sync 同步原语

`sync` 包提供多种同步原语，用于协调 goroutine。

## sync.WaitGroup

等待一组 goroutine 完成。

```go
var wg sync.WaitGroup

for i := 0; i < 5; i++ {
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        fmt.Println("Worker", id)
    }(i)
}

wg.Wait()
fmt.Println("All done")
```

### 注意事项

- `Add()` 必须在 goroutine 启动之前调用
- `Done()` 建议用 `defer` 确保一定调用
- 不要复制 WaitGroup

## sync.Mutex

互斥锁，保证同一时刻只有一个 goroutine 访问共享资源。

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
```

### Lock / Unlock

```go
mu := sync.Mutex{}

mu.Lock()     // 加锁
// 临界区代码
mu.Unlock()   // 解锁

// 推荐使用 defer
mu.Lock()
defer mu.Unlock()
```

## sync.RWMutex

读写锁，允许多个读操作同时进行，但写操作是排他的。

```go
type Cache struct {
    mu   sync.RWMutex
    data map[string]string
}

func (c *Cache) Get(key string) (string, bool) {
    c.mu.RLock()         // 读锁（共享）
    defer c.mu.RUnlock()
    val, ok := c.data[key]
    return val, ok
}

func (c *Cache) Set(key, value string) {
    c.mu.Lock()          // 写锁（排他）
    defer c.mu.Unlock()
    c.data[key] = value
}
```

### Lock vs RLock

| 操作 | Mutex | RWMutex |
|------|-------|---------|
| 读 | `Lock()` | `RLock()`（共享） |
| 写 | `Lock()` | `Lock()`（排他） |

## sync.Once

确保函数只执行一次，常用于单例模式和初始化。

```go
var once sync.Once
var instance *Database

func GetDB() *Database {
    once.Do(func() {
        instance = &Database{}
        // 初始化数据库连接
    })
    return instance
}
```

### 使用场景

- 单例初始化
- 配置加载
- 一次性资源准备

## sync.Pool

对象池，用于缓存临时对象以减少 GC 压力。

```go
var pool = sync.Pool{
    New: func() any {
        return new(bytes.Buffer)
    },
}

func process(data []byte) {
    buf := pool.Get().(*bytes.Buffer)  // 获取
    defer func() {
        buf.Reset()
        pool.Put(buf)  // 归还
    }()

    buf.Write(data)
    result := buf.Bytes()
    // 使用 result
}
```

### 注意事项

- Pool 中的对象可能在任意时刻被 GC 回收
- 不适合存储需要持久化的对象
- 适合高频率创建/销毁的临时对象（如 `bytes.Buffer`）

## sync.Map

并发安全的 map，适用于读多写少的场景。

```go
var m sync.Map

// 存储
m.Store("key", "value")

// 读取
val, ok := m.Load("key")

// 删除
m.Delete("key")

// 遍历
m.Range(func(key, value any) bool {
    fmt.Println(key, value)
    return true  // 返回 false 停止遍历
})

// LoadOrStore：如果存在返回已有值，不存在则存储
actual, loaded := m.LoadOrStore("key", "value")
```

### sync.Map vs 普通 map + Mutex

| 场景 | 推荐 |
|------|------|
| 读多写少 | `sync.Map` |
| 写多 | `map + sync.Mutex` |
| 需要统计长度 | `map + sync.Mutex` |

## sync.Cond

条件变量，用于 goroutine 之间的等待和通知。

```go
var (
    mu    sync.Mutex
    cond  = sync.NewCond(&mu)
    ready bool
)

// 等待方
go func() {
    mu.Lock()
    for !ready {
        cond.Wait()  // 等待信号
    }
    mu.Unlock()
    fmt.Println("ready!")
}()

// 通知方
time.Sleep(time.Second)
mu.Lock()
ready = true
cond.Signal()     // 通知一个等待的 goroutine
// cond.Broadcast()  // 通知所有等待的 goroutine
mu.Unlock()
```

## sync.ErrGroup

并发执行多个任务，收集第一个错误。

```go
import "golang.org/x/sync/errgroup"

func main() {
    g, ctx := errgroup.WithContext(context.Background())

    g.Go(func() error {
        return doTask1(ctx)
    })

    g.Go(func() error {
        return doTask2(ctx)
    })

    if err := g.Wait(); err != nil {
        fmt.Println("error:", err)
    }
}
```

## sync/atomic

原子操作，适用于简单的计数器。

```go
import "sync/atomic"

var count int64

// 原子加
atomic.AddInt64(&count, 1)

// 原子读
val := atomic.LoadInt64(&count)

// 原子写
atomic.StoreInt64(&count, 0)

// 原子比较并交换
atomic.CompareAndSwapInt64(&count, old, new)
```

### atomic.Value

```go
var config atomic.Value

// 存储
config.Store(map[string]string{"key": "value"})

// 加载
val := config.Load().(map[string]string)
```
