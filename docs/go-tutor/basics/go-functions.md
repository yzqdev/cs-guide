# Go 函数深入

[官方文档](https://go.dev/tour/basics)

## 函数定义

```go
// 基本语法
func add(x int, y int) int {
	return x + y
}

// 参数类型合并（相同类型可省略）
func add(x, y int) int {
	return x + y
}

// 多返回值
func swap(x, y string) (string, string) {
	return y, x
}

// 命名返回值
func divide(a, b int) (quotient, remainder int) {
	quotient = a / b
	remainder = a % b
	return // 裸返回
}

func main() {
	q, r := divide(10, 3)
	fmt.Println(q, r) // 3 1
}
```

## 参数传递

### 值传递

```go
// Go 默认值传递，函数内修改不影响原变量
func increment(x int) {
	x++ // 只修改副本
}

func main() {
	n := 10
	increment(n)
	fmt.Println(n) // 10（未改变）
}
```

### 指针传递

```go
func incrementPtr(x *int) {
	*x++ // 修改原值
}

func main() {
	n := 10
	incrementPtr(&n)
	fmt.Println(n) // 11
}
```

## 可变参数

```go
// ... 表示可变参数
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
	numbers := []int{1, 2, 3, 4, 5}
	fmt.Println(sum(numbers...)) // 15
}

// 混合参数（可变参数必须是最后一个）
func greet(prefix string, names ...string) {
	for _, name := range names {
		fmt.Printf("%s %s\n", prefix, name)
	}
}

greet("你好", "张三", "李四", "王五")
```

## 函数作为值

```go
// 函数是"一等公民"，可以赋值给变量
func main() {
	// 赋值给变量
	add := func(a, b int) int {
		return a + b
	}
	fmt.Println(add(3, 4)) // 7

	// 作为参数传递
	compute := func(fn func(int, int) int, a, b int) int {
		return fn(a, b)
	}
	fmt.Println(compute(add, 10, 20)) // 30
}

// 函数作为返回值
func makeMultiplier(factor int) func(int) int {
	return func(x int) int {
		return x * factor
	}
}

func main() {
	double := makeMultiplier(2)
	triple := makeMultiplier(3)
	fmt.Println(double(5)) // 10
	fmt.Println(triple(5)) // 15
}
```

## 闭包（Closure）

```go
// 闭包捕获外部变量
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

	c2 := counter()
	fmt.Println(c2()) // 1（新的闭包）
}
```

## defer 延迟执行

```go
// defer 在函数返回前执行（后进先出）
func main() {
	defer fmt.Println("最后执行")
	defer fmt.Println("倒数第二")
	fmt.Println("先执行")
}
// 输出：
// 先执行
// 倒数第二
// 最后执行

// defer 用于资源清理
func readFile() {
	f, err := os.Open("test.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close() // 函数结束时关闭文件

	// 读取文件...
}

// defer 参数即时求值
func main() {
	x := 10
	defer fmt.Println(x) // 10（defer 时已确定值）
	x = 20
	fmt.Println(x) // 20
}
```

## init 函数

```go
// init 在 main 之前自动执行
var db *sql.DB

func init() {
	fmt.Println("初始化数据库连接...")
	// 初始化逻辑
}

func init() {
	fmt.Println("第二个 init...")
}

func main() {
	fmt.Println("main 执行")
}
// 输出：
// 初始化数据库连接...
// 第二个 init...
// main 执行
```

## panic 和 recover

```go
// panic 中断程序
func main() {
	fmt.Println("开始")
	panic("出错了！") // 程序崩溃
	fmt.Println("结束") // 不会执行
}

// recover 恢复 panic
func safeDivide(a, b int) (result int) {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("捕获 panic:", r)
			result = 0
		}
	}()
	return a / b
}

func main() {
	fmt.Println(safeDivide(10, 2)) // 5
	fmt.Println(safeDivide(10, 0)) // 捕获 panic: runtime error... → 0
}
```

## 实际案例

```go
// 链式操作
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

// 装饰器模式
func loggingMiddleware(next func(string)) func(string) {
	return func(s string) {
		fmt.Println("开始处理:", s)
		next(s)
		fmt.Println("处理完成")
	}
}

func process(s string) {
	fmt.Println("处理数据:", s)
}

func main() {
	wrapped := loggingMiddleware(process)
	wrapped("测试数据")
}
```
