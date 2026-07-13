# Go 方法与函数

[官方文档](https://go.dev/tour/methods)

## 函数

Go 函数是一等公民，可以赋值给变量、作为参数传递、作为返回值。

### 函数定义

```go
// 基本函数
func add(x int, y int) int {
	return x + y
}

// 相邻同类型参数可合并
func add(x, y int) int {
	return x + y
}

// 多返回值
func swap(a, b string) (string, string) {
	return b, a
}

// 命名返回值
func divide(a, b int) (quotient, remainder int) {
	quotient = a / b
	remainder = a % b
	return // 裸返回
}

// 大写开头 = 导出（公开），小写 = 私有
func ExportedFunc()  {} // 其他包可以访问
func privateFunc()   {} // 仅当前包
```

### 可变参数

```go
func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

func main() {
	fmt.Println(sum(1, 2))       // 3
	fmt.Println(sum(1, 2, 3, 4)) // 10

	// 展开切片
	numbers := []int{1, 2, 3}
	fmt.Println(sum(numbers...)) // 6
}
```

### 函数作为值

```go
func main() {
	// 赋值给变量
	add := func(a, b int) int {
		return a + b
	}
	fmt.Println(add(3, 4)) // 7

	// 作为参数传递
	apply := func(fn func(int, int) int, a, b int) int {
		return fn(a, b)
	}
	fmt.Println(apply(add, 10, 20)) // 30
}
```

### 闭包

```go
// 闭包：函数 + 环境引用
func counter() func() int {
	count := 0
	return func() int {
		count++
		return count
	}
}

func main() {
	c := counter()
	fmt.Println(c()) // 1
	fmt.Println(c()) // 2
	fmt.Println(c()) // 3

	// 每个闭包独立
	c2 := counter()
	fmt.Println(c2()) // 1
}
```

## 方法

Go 方法是在函数名前加一个接收者(receiver)。

### 定义方法

```go
type User struct {
	Name string
	Age  int
}

// 值接收者
func (u User) Greet() string {
	return fmt.Sprintf("你好，我是%s", u.Name)
}

// 指针接收者（可以修改原值）
func (u *User) Birthday() {
	u.Age++
}

func main() {
	u := User{Name: "张三", Age: 25}
	fmt.Println(u.Greet()) // 你好，我是张三

	u.Birthday()
	fmt.Println(u.Age) // 26
}
```

### 值接收者 vs 指针接收者

```go
type Counter struct {
	value int
}

// 值接收者：操作副本，不影响原值
func (c Counter) Add1() {
	c.value++
}

// 指针接收者：操作原值
func (c *Counter) Add2() {
	c.value++
}

func main() {
	c := Counter{value: 10}

	c.Add1()            // 值接收者
	fmt.Println(c.value) // 10（不变）

	c.Add2()            // 指针接收者
	fmt.Println(c.value) // 11（已变）
}
```

### 方法链

```go
type Calculator struct {
	value float64
}

func (c *Calculator) Add(x float64) *Calculator {
	c.value += x
	return c
}

func (c *Calculator) Sub(x float64) *Calculator {
	c.value -= x
	return c
}

func (c *Calculator) Mul(x float64) *Calculator {
	c.value *= x
	return c
}

func (c *Calculator) Result() float64 {
	return c.value
}

func main() {
	result := (&Calculator{}).Add(10).Sub(3).Mul(2).Result()
	fmt.Println(result) // 14
}
```

## 选择准则

| 场景 | 推荐接收者 | 原因 |
|------|-----------|------|
| 需要修改接收者 | 指针 `*T` | 修改原值 |
| 大型结构体 | 指针 `*T` | 避免复制开销 |
| 小型不可变结构体 | 值 `T` | 简洁、安全 |
| 方法中需要 nil 判断 | 指针 `*T` | 允许 nil 接收者 |
| 一致性 | 统一 | 同类方法应统一 |

## 完整示例

```go
type Rectangle struct {
	Width  float64
	Height float64
}

// 值接收者：计算不修改
func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

// 指针接收者：缩放修改
func (r *Rectangle) Scale(factor float64) {
	r.Width *= factor
	r.Height *= factor
}

// 构造函数
func NewRectangle(w, h float64) *Rectangle {
	return &Rectangle{Width: w, Height: h}
}

func main() {
	rect := NewRectangle(10, 5)
	fmt.Println(rect.Area()) // 50

	rect.Scale(2)
	fmt.Println(rect.Area()) // 200
}
```
