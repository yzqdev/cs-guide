# Go 指针与内存

[官方文档](https://go.dev/tour/moretypes)

## 指针基础

### 声明与使用

```go
func main() {
	var x int = 42
	
	// & 取地址
	var p *int = &x
	
	fmt.Println(p)  // 0xc0000a0000（内存地址）
	fmt.Println(*p) // 42（解引用）
	
	// 通过指针修改值
	*p = 100
	fmt.Println(x) // 100
}
```

### 指针的零值

```go
var p *int
fmt.Println(p) // nil

// 不能直接解引用 nil 指针
// fmt.Println(*p) // panic: runtime error
```

### 指向指针的指针

```go
x := 42
p := &x
pp := &p

fmt.Println(**pp) // 42
**pp = 100
fmt.Println(x) // 100
```

## new 函数

`new(T)` 分配内存，返回 `*T`，值为零值。

```go
// new 分配
p := new(int)   // *int，值为 0
*p = 42
fmt.Println(*p) // 42

// 对比：直接声明
var n int   // 值类型，直接可用
n = 42

// new 结构体
type Point struct {
	X, Y int
}
pt := new(Point)
fmt.Println(pt.X, pt.Y) // 0 0
pt.X = 10
pt.Y = 20
```

### new vs &

```go
// 这两种等效
p1 := new(Point)
p2 := &Point{}

// 但更推荐 &Point{} 字面量
p3 := &Point{X: 10, Y: 20}
```

## make 函数

`make` 只用于 slice、map、channel 的初始化。

```go
// slice：make([]T, len, cap)
s := make([]int, 5, 10)      // len=5, cap=10
s2 := make([]int, 3)         // len=3, cap=3
s[0] = 1

// map：make(map[K]V, size)
m := make(map[string]int)    // 空 map
m2 := make(map[string]int, 100) // 预分配

// channel：make(chan T, buffer)
ch := make(chan int)          // 无缓冲
ch2 := make(chan int, 10)     // 有缓冲
```

## new vs make 对比

| 特性 | new | make |
|------|-----|------|
| 返回值 | `*T`（指针） | `T`（值，非指针） |
| 适用类型 | 所有类型 | slice, map, channel  |
| 初始化 | 零值 | 初始化内部数据结构 |
| 使用频率 | 较少 | 较多 |

```go
// ❌ 错误用法：map 未初始化
var m map[string]int
m["key"] = 1 // panic: assignment to entry in nil map

// ✅ 正确：使用 make
m := make(map[string]int)
m["key"] = 1

// ❌ 错误用法：slice append nil 切片可以
var s []int
s = append(s, 1) // ✅ OK（append 处理 nil 切片）

// 但不能索引赋值
// s[0] = 1 // ❌ panic

// ✅ 正确：使用 make 或字面量
s := make([]int, 3)
s[0] = 1
```

## 指针在函数中的应用

### 修改参数

```go
// 值传递：不修改原值
func setZeroVal(n int) {
	n = 0
}

// 指针传递：修改原值
func setZeroPtr(n *int) {
	*n = 0
}

func main() {
	x := 5
	setZeroVal(x)
	fmt.Println(x) // 5（未变）

	setZeroPtr(&x)
	fmt.Println(x) // 0（已变）
}
```

### 大型结构体传参

```go
type BigData struct {
	Items [10000]int
	Meta  map[string]string
}

// 值传递：复制整个结构体（开销大）
func processByValue(data BigData) {
	// ...
}

// 指针传递：只复制指针（推荐）
func processByPtr(data *BigData) {
	// ...
}
```

### 方法接收者

```go
type Counter struct {
	value int
}

// 值接收者：不能修改原值
func (c Counter) Add1() {
	c.value++
}

// 指针接收者：可以修改原值
func (c *Counter) Add2() {
	c.value++
}

func main() {
	c := Counter{value: 10}

	c.Add1()  // 值接收者，不生效
	fmt.Println(c.value) // 10

	c.Add2()  // 指针接收者，生效
	fmt.Println(c.value) // 11
}
```

## 指针与 nil

```go
type Config struct {
	Host string
	Port int
}

func NewConfig() *Config {
	// 返回指针，调用方判断 nil
	return &Config{Host: "localhost", Port: 8080}
}

func (c *Config) IsValid() bool {
	return c != nil && c.Port > 0
}

func main() {
	cfg := NewConfig()
	if cfg != nil {
		fmt.Println(cfg.Host)
	}

	// 方法中处理 nil 接收者
	var c *Config
	fmt.Println(c.IsValid()) // false（不会 panic）
}
```

## 指针最佳实践

```go
// 1. 对于需要修改的参数用指针
func normalize(s *string) {
	*s = strings.TrimSpace(strings.ToLower(*s))
}

// 2. 大型结构体用指针
func saveRecord(r *Record) error { /* ... */ }

// 3. 可选参数用指针
func FindUser(id int, name *string) (*User, error) {
	// name 可以为 nil（不传）
}

// 4. 方法接收者：需要修改时用指针
func (p *Person) SetAge(age int) { p.Age = age }

// 5. 避免返回指向局部变量的指针（逃逸分析）
// 实际上 Go 编译器会处理逃逸，所以可以安全返回局部指针
func NewPoint(x, y int) *Point {
	return &Point{X: x, Y: y} // 安全
}
```
